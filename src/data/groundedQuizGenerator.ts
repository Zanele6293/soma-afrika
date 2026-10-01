import { QuizQuestion, ExitQuizRequestPayload, ExitQuizResponse } from '../types';

export interface StudiedPageExcerpt {
  pageNumber: number;
  title: string;
  subtitle: string;
  sections: { heading: string; text: string }[];
  keyTerms: { term: string; definition: string }[];
  keyTakeaways: string[];
  africanContext?: string;
  workedExample?: string;
  practiceReflection?: string;
  rawText: string;
}

/**
 * Builds the strict academic examiner prompt for Gemini 3.8 Flash
 */
export function buildExaminerPrompt(payload: {
  countryCode?: string;
  curriculumCode?: string;
  subjectName?: string;
  chapterTitle?: string;
  chapterNumber?: number;
  pagesRead?: number[];
  lastReadPage?: number;
  lastReadPageNumber?: number;
  exactContentStudied?: string;
  pageContents?: string;
}): string {
  const pagesRead = (payload.pagesRead && payload.pagesRead.length > 0)
    ? [...payload.pagesRead].sort((a, b) => a - b)
    : [payload.lastReadPage || payload.lastReadPageNumber || 1];
  const chapterTitle = payload.chapterTitle || 'Academic Unit';
  const exactContentStudied = payload.exactContentStudied || payload.pageContents || '';

  return `You are an uncompromising academic examiner for SomaAfrika.
You are provided with the EXACT text excerpt that a student read during their study session from Pages: ${pagesRead.join(', ')}.

EXACT MATERIAL STUDIED BY THE STUDENT:
"""
${exactContentStudied}
"""

CRITICAL RULES:
1. Generate exactly 4 multiple-choice questions grounded EXCLUSIVELY in the text provided above.
2. If the student only read Page 1, EVERY question must come directly from Page 1.
3. If the student read Page 1 and Page 2, questions must assess concepts spanning Pages 1 and 2.
4. DO NOT introduce facts, formulas, or concepts from future unread pages, other chapters, or outside knowledge.
5. The student must be able to answer all 4 questions purely from what is written in the excerpt above.
6. Return strictly valid JSON:
{
  "title": "Mastery Check: ${chapterTitle} (Pages ${pagesRead.join(', ')})",
  "passingThreshold": 75,
  "questions": [
    {
      "id": "q1",
      "pageSource": "Page X",
      "question": "Clear question derived from the excerpt?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctIndex": 0,
      "explanation": "Quote or proof from the text explaining why this is correct",
      "pedagogicalHintIfFailed": "Hint referring back to Page X"
    }
  ]
}`;
}

/**
 * Parses exactContentStudied into structured page models
 */
export function parseStudiedContent(
  exactContentStudied: string,
  pagesRead: number[]
): Map<number, StudiedPageExcerpt> {
  const pageMap = new Map<number, StudiedPageExcerpt>();
  if (!exactContentStudied || !exactContentStudied.trim()) {
    return pageMap;
  }

  // Look for markers like "--- PAGE 1: Title ---"
  const pageRegex = /---\s*PAGE\s*(\d+)[:\s-]*([^\n]*)\s*---/gi;
  const matches = Array.from(exactContentStudied.matchAll(pageRegex));

  if (matches.length === 0) {
    // Single un-demarcated page, map to first page read
    const pNum = pagesRead[0] || 1;
    pageMap.set(pNum, parsePageChunk(pNum, 'Study Unit', exactContentStudied));
    return pageMap;
  }

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const pNum = parseInt(m[1], 10);
    const pTitle = m[2]?.trim() || `Page ${pNum}`;
    const startIdx = (m.index || 0) + m[0].length;
    const endIdx = (i < matches.length - 1) ? (matches[i + 1].index || exactContentStudied.length) : exactContentStudied.length;
    const chunk = exactContentStudied.substring(startIdx, endIdx).trim();

    pageMap.set(pNum, parsePageChunk(pNum, pTitle, chunk));
  }

  return pageMap;
}

function parsePageChunk(pageNumber: number, title: string, text: string): StudiedPageExcerpt {
  const keyTerms: { term: string; definition: string }[] = [];
  const keyTakeaways: string[] = [];
  const sections: { heading: string; text: string }[] = [];
  let subtitle = '';
  let africanContext = '';
  let workedExample = '';
  let practiceReflection = '';

  const lines = text.split('\n');
  let currentSectionHeading = 'Core Theory';
  let currentSectionLines: string[] = [];
  let parsingState: 'none' | 'terms' | 'takeaways' | 'african' | 'example' | 'practice' = 'none';

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.toLowerCase().startsWith('subtitle:')) {
      subtitle = line.substring(9).trim();
      continue;
    }

    if (line.toLowerCase().startsWith('key terms:')) {
      parsingState = 'terms';
      continue;
    }

    if (line.toLowerCase().startsWith('key takeaways:')) {
      parsingState = 'takeaways';
      continue;
    }

    if (line.toLowerCase().startsWith('african real-world context') || line.toLowerCase().startsWith('african context')) {
      parsingState = 'african';
      continue;
    }

    if (line.toLowerCase().startsWith('worked example')) {
      parsingState = 'example';
      continue;
    }

    if (line.toLowerCase().startsWith('practice reflection:')) {
      practiceReflection = line.substring(20).trim();
      parsingState = 'practice';
      continue;
    }

    if (line.toLowerCase().startsWith('section:')) {
      if (currentSectionLines.length > 0) {
        sections.push({ heading: currentSectionHeading, text: currentSectionLines.join(' ') });
        currentSectionLines = [];
      }
      currentSectionHeading = line.substring(8).trim();
      parsingState = 'none';
      continue;
    }

    // Process based on state
    if (parsingState === 'terms' && line.startsWith('-')) {
      const parts = line.substring(1).split(':');
      if (parts.length >= 2) {
        keyTerms.push({
          term: parts[0].trim(),
          definition: parts.slice(1).join(':').trim()
        });
      }
    } else if (parsingState === 'takeaways' && (line.startsWith('-') || line.startsWith('•'))) {
      keyTakeaways.push(line.replace(/^[-•]\s*/, '').trim());
    } else if (parsingState === 'african') {
      africanContext += (africanContext ? ' ' : '') + line;
    } else if (parsingState === 'example') {
      workedExample += (workedExample ? ' ' : '') + line;
    } else if (parsingState === 'practice') {
      practiceReflection += (practiceReflection ? ' ' : '') + line;
    } else {
      currentSectionLines.push(line);
    }
  }

  if (currentSectionLines.length > 0) {
    sections.push({ heading: currentSectionHeading, text: currentSectionLines.join(' ') });
  }

  return {
    pageNumber,
    title,
    subtitle,
    sections,
    keyTerms,
    keyTakeaways,
    africanContext,
    workedExample,
    practiceReflection,
    rawText: text
  };
}

/**
 * Normalizes question object returned from Gemini or Fallback
 */
export function normalizeQuestion(raw: any, index: number, fallbackPage: number): QuizQuestion {
  const promptText = (raw.question || raw.prompt || `Assessment Question ${index + 1}`).trim();
  
  // Clean options of duplicate letter badges like "A. Option"
  const rawOptions = Array.isArray(raw.options) && raw.options.length >= 2 
    ? raw.options 
    : ['Option A', 'Option B', 'Option C', 'Option D'];

  const cleanedOptions = rawOptions.map((opt: any) => {
    const s = String(opt || '').trim();
    return s.replace(/^[A-D][.):\s-]\s*/i, '').trim();
  });

  // Ensure 4 options
  while (cleanedOptions.length < 4) {
    cleanedOptions.push(`Alternative perspective ${cleanedOptions.length + 1}`);
  }

  // Extract page source number
  let pageNum = fallbackPage;
  if (typeof raw.pageSourceNumber === 'number') {
    pageNum = raw.pageSourceNumber;
  } else if (typeof raw.pageSource === 'string') {
    const match = raw.pageSource.match(/\d+/);
    if (match) pageNum = parseInt(match[0], 10);
  }

  const pageSourceStr = raw.pageSource || `Page ${pageNum}`;
  const hintStr = raw.pedagogicalHintIfFailed || raw.socraticHint || `Review the concepts on ${pageSourceStr}.`;
  const explanationStr = raw.explanation || `As established on ${pageSourceStr}, this matches the official curriculum standard.`;
  const conceptStr = raw.concept || `Core Concept (${pageSourceStr})`;
  const correctIdx = typeof raw.correctIndex === 'number' && raw.correctIndex >= 0 && raw.correctIndex < 4 
    ? raw.correctIndex 
    : 0;

  return {
    id: raw.id || `q-${index + 1}-${Date.now()}`,
    prompt: promptText,
    question: promptText,
    options: cleanedOptions,
    correctIndex: correctIdx,
    concept: conceptStr,
    explanation: explanationStr,
    socraticHint: hintStr,
    pedagogicalHintIfFailed: hintStr,
    pageSource: pageSourceStr,
    pageSourceNumber: pageNum
  };
}

/**
 * Strictly Grounded Fallback Engine:
 * Generates 4 questions strictly from the read pages and exact text studied.
 */
export function generateGroundedFallbackQuestions(payload: {
  countryCode?: string;
  curriculumCode?: string;
  subjectName?: string;
  chapterTitle?: string;
  chapterNumber?: number;
  pagesRead?: number[];
  lastReadPage?: number;
  lastReadPageNumber?: number;
  exactContentStudied?: string;
  pageContents?: string;
}): QuizQuestion[] {
  const pagesRead = (payload.pagesRead && payload.pagesRead.length > 0)
    ? [...payload.pagesRead].sort((a, b) => a - b)
    : [payload.lastReadPage || payload.lastReadPageNumber || 1];

  const chapterTitle = payload.chapterTitle || 'Core Unit';
  const subjectName = payload.subjectName || 'Academic Subject';
  const textContent = payload.exactContentStudied || payload.pageContents || '';
  const parsedPages = parseStudiedContent(textContent, pagesRead);

  const questions: QuizQuestion[] = [];

  // Determine question page distribution
  // CRITICAL RULE 2: If student read Page 1 only -> All 4 questions come from Page 1
  // CRITICAL RULE 3: If student read Page 1 and 2 -> Questions assess concepts spanning Pages 1 and 2
  const targetPageSequence: number[] = [];
  if (pagesRead.length === 1) {
    targetPageSequence.push(pagesRead[0], pagesRead[0], pagesRead[0], pagesRead[0]);
  } else if (pagesRead.length === 2) {
    targetPageSequence.push(pagesRead[0], pagesRead[0], pagesRead[1], pagesRead[1]);
  } else if (pagesRead.length === 3) {
    targetPageSequence.push(pagesRead[0], pagesRead[1], pagesRead[2], pagesRead[0]);
  } else {
    // 4 or more pages
    for (let i = 0; i < 4; i++) {
      targetPageSequence.push(pagesRead[i % pagesRead.length]);
    }
  }

  // Build each question strictly from its target page
  for (let qIdx = 0; qIdx < 4; qIdx++) {
    const targetPageNum = targetPageSequence[qIdx];
    const pageData = parsedPages.get(targetPageNum) || {
      pageNumber: targetPageNum,
      title: `Page ${targetPageNum}`,
      subtitle: '',
      sections: [],
      keyTerms: [],
      keyTakeaways: [],
      rawText: textContent
    };

    let prompt = '';
    let correctOption = '';
    let distractors: string[] = [];
    let concept = '';
    let explanation = '';
    let socraticHint = '';

    // Slot 0 (or first question for this page): Key Term / Primary Definition
    if (qIdx === 0 || (qIdx === 2 && pagesRead.length === 2)) {
      if (pageData.keyTerms.length > 0) {
        const termItem = pageData.keyTerms[qIdx % pageData.keyTerms.length];
        prompt = `According to Page ${targetPageNum} of ${chapterTitle}, what is the precise definition of "${termItem.term}"?`;
        correctOption = termItem.definition;
        distractors = [
          `An arbitrary convention that is not recognized in official ${subjectName} examinations`,
          `A secondary factor that has no measurable effect on ${pageData.title}`,
          `An outdated terminology that has been completely replaced in modern practice`
        ];
        concept = `${termItem.term} (Page ${targetPageNum})`;
        explanation = `On Page ${targetPageNum}, "${termItem.term}" is defined as: ${termItem.definition}.`;
        socraticHint = `Review the Key Terms section on Page ${targetPageNum} for the definition of ${termItem.term}.`;
      } else if (pageData.sections.length > 0) {
        const sec = pageData.sections[0];
        prompt = `Based on Page ${targetPageNum} (${pageData.title}), what fundamental principle is established under "${sec.heading}"?`;
        correctOption = sec.text.length > 120 ? sec.text.substring(0, 115) + '...' : sec.text;
        distractors = [
          `That fundamental principles in ${subjectName} can be omitted without consequence`,
          `That empirical observations contradict the theoretical framework`,
          `That concepts from this topic have no relationship to real-world applications`
        ];
        concept = `${sec.heading} (Page ${targetPageNum})`;
        explanation = `As stated in "${sec.heading}" on Page ${targetPageNum}: ${correctOption}`;
        socraticHint = `Check what was established under "${sec.heading}" on Page ${targetPageNum}.`;
      }
    }

    // Slot 1 (or second question for this page): Key Takeaway
    if (!prompt && pageData.keyTakeaways.length > 0) {
      const takeaway = pageData.keyTakeaways[qIdx % pageData.keyTakeaways.length];
      prompt = `What essential takeaway is highlighted on Page ${targetPageNum} regarding ${pageData.title}?`;
      correctOption = takeaway;
      distractors = [
        `That calculations and principles on this page apply only under laboratory conditions`,
        `That memorization is rewarded over conceptual understanding in this topic`,
        `That opposite conventions can be chosen at random during problem-solving`
      ];
      concept = `Core Takeaway (Page ${targetPageNum})`;
      explanation = `The official Key Takeaways on Page ${targetPageNum} emphasize: "${takeaway}".`;
      socraticHint = `Review the Key Takeaways box on Page ${targetPageNum}.`;
    }

    // Slot 2: African Context or Worked Example or Section 2
    if (!prompt && pageData.africanContext) {
      prompt = `African Real-World Context (Page ${targetPageNum}): How does the material studied on Page ${targetPageNum} apply to regional development?`;
      correctOption = pageData.africanContext.length > 130 
        ? pageData.africanContext.substring(0, 125) + '...' 
        : pageData.africanContext;
      distractors = [
        `It is strictly confined to external jurisdictions with zero relevance to the African continent`,
        `It has been deemed economically unfeasible for regional infrastructure`,
        `It contradicts local environmental and community safety standards`
      ];
      concept = `African Real-World Application (Page ${targetPageNum})`;
      explanation = `Page ${targetPageNum} highlights: ${correctOption}`;
      socraticHint = `Read the African Real-World Context panel on Page ${targetPageNum}.`;
    }

    // Slot 3 / Fallback for any remaining slot: Synthesis of studied material on that page
    if (!prompt) {
      if (pageData.sections.length > 1) {
        const sec = pageData.sections[1];
        prompt = `Regarding "${sec.heading}" on Page ${targetPageNum}: What rule or procedure is established?`;
        correctOption = sec.text.length > 120 ? sec.text.substring(0, 115) + '...' : sec.text;
      } else {
        prompt = `Based strictly on Page ${targetPageNum} of ${chapterTitle}: What is required to demonstrate mastery of this topic?`;
        correctOption = `Thoroughly understanding and applying the definitions, rules, and examples presented on Page ${targetPageNum}`;
      }
      distractors = [
        `Guessing numerical values or terminology without consulting the page rules`,
        `Applying external assumptions that contradict what is written on Page ${targetPageNum}`,
        `Treating the topic as purely theoretical with zero procedural accuracy`
      ];
      concept = `Pedagogical Standard (Page ${targetPageNum})`;
      explanation = `According to the syllabus material studied on Page ${targetPageNum}, full credit requires adherence to the established rules.`;
      socraticHint = `Re-read Page ${targetPageNum} to verify the procedural rules.`;
    }

    // Assemble options with deterministic shuffling so correct answer isn't always A
    const allOptions = [correctOption, ...distractors];
    // Rotate options so correctIndex varies across questions: Q0 -> A, Q1 -> B, Q2 -> C, Q3 -> A
    const shift = (qIdx + targetPageNum) % 4;
    const finalOptions: string[] = [];
    for (let o = 0; o < 4; o++) {
      finalOptions.push(allOptions[(o - shift + 4) % 4]);
    }
    const finalCorrectIndex = shift;

    questions.push({
      id: `grounded-fb-q${qIdx + 1}`,
      prompt,
      question: prompt,
      options: finalOptions,
      correctIndex: finalCorrectIndex,
      concept,
      explanation,
      socraticHint,
      pedagogicalHintIfFailed: socraticHint,
      pageSource: `Page ${targetPageNum}`,
      pageSourceNumber: targetPageNum
    });
  }

  return questions;
}
