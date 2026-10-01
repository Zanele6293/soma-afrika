import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

function buildSubjectFallbackQuestions(payload: any) {
  const {
    countryCode = 'ZA',
    curriculumCode = 'National Syllabus',
    subjectName = 'Academic Curriculum',
    chapterTitle = 'Core Unit',
    pagesRead = [1],
    lastReadPageNumber = 1
  } = payload || {};

  const isMathOrPhysics = /math|phys|chem|further/i.test(subjectName);
  const isEnglishOrLang = /eng|lit|kiswahili|chichewa|indigenous|language/i.test(subjectName);
  const isCivicsOrLO = /civic|life orientation|social|heritage|govt|history/i.test(subjectName);
  const isAccountingOrEcon = /account|bus|econ|commerce/i.test(subjectName);
  const isAgriOrBio = /agri|bio|life sci/i.test(subjectName);

  if (isEnglishOrLang) {
    return [
      {
        id: 'fb-q1',
        prompt: `Based on Page 1 of ${chapterTitle} (${subjectName}): What is the primary linguistic or grammatical rule established for this unit?`,
        options: [
          'Sentences must maintain strict grammatical concord, proper syntactic voice, and appropriate register',
          'Slang and colloquialisms can replace standard grammatical structures in formal essays',
          'Passive voice should be used indiscriminately without identifying the agent or action',
          'Verb tenses never backshift in indirect discourse'
        ],
        correctIndex: 0,
        concept: `${subjectName} Syntactic Framework`,
        explanation: `Under the ${curriculumCode} syllabus, mastery of sentence structures, voice transformation, and concord is required for Paper 1 and 2.`,
        socraticHint: 'Review what was established on Page 1 regarding grammatical syntax and register.',
        pageSourceNumber: 1
      },
      {
        id: 'fb-q2',
        prompt: `Regarding literary and rhetorical analysis in ${chapterTitle}: How should figurative devices (metaphor, tone, dramatic irony) be analyzed?`,
        options: [
          'Identify the specific vehicle and tenor comparison, then explain how it enhances the central theme and mood',
          'Simply state that the author uses a figure of speech without explaining its thematic significance',
          'Assume figurative devices are accidental with no intended poetic or dramatic effect',
          'Replace analytical critique with personal biographical opinions about the author\'s private life'
        ],
        correctIndex: 0,
        concept: 'Literary & Figurative Analysis',
        explanation: 'Examination councils award marks for explaining the exact thematic effect and emotional atmosphere created by figurative diction.',
        socraticHint: 'Look at the pedagogical worked example in your textbook: how did the step-by-step method analyze the metaphor?',
        pageSourceNumber: pagesRead[0] || 1
      },
      {
        id: 'fb-q3',
        prompt: `African Literary Context: How does modern African literature in ${countryCode} reflect societal and cultural transformation?`,
        options: [
          'It explores the dynamic dialogue between ancestral traditions, cultural identity, and contemporary socio-economic realities',
          'It completely rejects all African cultural history and indigenous folklore',
          'It is strictly confined to external translations without indigenous African relevance',
          'It avoids addressing social challenges or community values'
        ],
        correctIndex: 0,
        concept: 'African Contextual Synthesis',
        explanation: 'SomaAfrika modules highlight the role of African authors and orators in articulating human dignity and social cohesion.',
        socraticHint: 'Reflect on the African Real-World Context box highlighted in this lesson.',
        pageSourceNumber: lastReadPageNumber
      },
      {
        id: 'fb-q4',
        prompt: `Mastery Standard (${chapterTitle}): What is required to achieve full credit in ${curriculumCode} examinations for ${subjectName}?`,
        options: [
          'Flawless grammatical precision, well-structured arguments, and accurate terminology matching the official marking guide',
          'Memorizing model answers without understanding the underlying analytical question',
          'Writing brief, fragmented sentences without cohesive paragraph transitions',
          'Ignoring the prescribed word count in précis and summary questions'
        ],
        correctIndex: 0,
        concept: 'National Examination Standard',
        explanation: 'National exam boards evaluate coherence, syntactic accuracy, and direct relevance to the prompt.',
        socraticHint: 'Think about how exam markers award marks for content, planning, and language accuracy.',
        pageSourceNumber: lastReadPageNumber
      }
    ];
  }

  if (isCivicsOrLO) {
    return [
      {
        id: 'fb-q1',
        prompt: `Based on Page 1 of ${chapterTitle} (${subjectName}): What is the primary constitutional or ethical foundation established?`,
        options: [
          'Human dignity, rule of law, and active citizen responsibility form the indispensable bedrock of democratic society',
          'Citizens have no legal recourse when public officials abuse administrative power',
          'Fundamental human rights are completely absolute and can never be limited under any circumstance',
          'Individual self-interest overrides communal welfare and democratic peace'
        ],
        correctIndex: 0,
        concept: `${subjectName} Foundational Standard`,
        explanation: `As detailed in the ${curriculumCode} syllabus for ${countryCode}, constitutional supremacy and ethical citizenship protect societal harmony.`,
        socraticHint: 'Recall what was established as the primary constitutional principle on Page 1.',
        pageSourceNumber: 1
      },
      {
        id: 'fb-q2',
        prompt: `Democratic Governance: What is the constitutional purpose of independent oversight institutions (e.g. Chapter 9 bodies, Ombudsman, anti-corruption bureaus)?`,
        options: [
          'To investigate executive misconduct, protect human rights, and ensure transparent public accountability without political interference',
          'To replace the courts and pass legislative statutes unilaterally',
          'To enforce partisan party loyalty on civil servants',
          'To operate under direct executive command without parliamentary reporting'
        ],
        correctIndex: 0,
        concept: 'Checks & Balances',
        explanation: 'Democratic watchdogs are constitutionally established to prevent corruption and guarantee citizen rights.',
        socraticHint: 'Look at the role of independent democratic institutions explained in your textbook.',
        pageSourceNumber: pagesRead[0] || 1
      },
      {
        id: 'fb-q3',
        prompt: `African Real-World Context: How does the indigenous philosophy of Unhu / Ubuntu directly inform modern African civic life?`,
        options: [
          'It affirms that individual dignity is realized through communal solidarity, mutual care, and restorative justice ("A person is a person through other persons")',
          'It promotes unbridled materialism and corporate exploitation',
          'It mandates the exclusion of youth and women from community discussions',
          'It teaches that power belongs exclusively to the wealthiest individuals'
        ],
        correctIndex: 0,
        concept: 'African Philosophical Heritage',
        explanation: 'Unhu/Ubuntu guides ethical community decisions, peaceful conflict resolution, and communal safety nets.',
        socraticHint: 'Reflect on the African Real-World Context box on communal solidarity.',
        pageSourceNumber: lastReadPageNumber
      },
      {
        id: 'fb-q4',
        prompt: `Mastery Standard (${chapterTitle}): How do examiners assess case studies in ${curriculumCode} for ${subjectName}?`,
        options: [
          'By evaluating how effectively the student applies constitutional rights and reasoned ethical solutions to real-world dilemmas',
          'By penalizing students who offer balanced, multi-perspective arguments',
          'By requiring rote recitation of statutes without conceptual understanding',
          'By ignoring evidence of practical community problem solving'
        ],
        correctIndex: 0,
        concept: 'Examination Criteria',
        explanation: 'National exam boards award top marks for evaluating the balance between rights, responsibilities, and civic remedies.',
        socraticHint: 'Consider how exam markers grade proposed solutions to case scenarios.',
        pageSourceNumber: lastReadPageNumber
      }
    ];
  }

  if (isAccountingOrEcon) {
    return [
      {
        id: 'fb-q1',
        prompt: `Based on Page 1 of ${chapterTitle} (${subjectName}): What is the governing accounting or economic principle established?`,
        options: [
          'Every transaction impacts the financial equilibrium (Assets = Equity + Liabilities), requiring corresponding double-entry debits and credits',
          'Revenue can be recognized without generating an invoice or receiving economic benefit',
          'Debits and credits can balance arbitrarily at the discretion of the accountant',
          'The accounting equation does not apply to African commercial enterprises'
        ],
        correctIndex: 0,
        concept: 'Accounting Equation & Equilibrium',
        explanation: `Under ${curriculumCode}, the fundamental accounting equation and duality principle govern all financial ledgers.`,
        socraticHint: 'Recall the dual-aspect rule: for every debit, there must be an equal credit.',
        pageSourceNumber: 1
      },
      {
        id: 'fb-q2',
        prompt: `Financial Ledger Methodology: Which of the following correctly reflects the double-entry rule for asset and expense accounts?`,
        options: [
          'An increase in an asset or expense is debited, while a decrease is credited',
          'An increase in an asset is credited, while a decrease is debited',
          'Expenses and assets are always credited regardless of transaction direction',
          'Liabilities and assets follow identical debit/credit posting directions'
        ],
        correctIndex: 0,
        concept: 'Double-Entry Ledger Rules',
        explanation: 'Assets and expenses carry debit balances; increases are recorded on the debit side and decreases on the credit side.',
        socraticHint: 'Remember DEAD CLIC: Debit Expenses, Assets, Drawings.',
        pageSourceNumber: pagesRead[0] || 1
      },
      {
        id: 'fb-q3',
        prompt: `African Economic Context: How does the African Continental Free Trade Area (AfCFTA) and digital mobile money transform commerce in ${countryCode}?`,
        options: [
          'By eliminating regional tariff barriers, formalizing SME ledgers, and accelerating cross-border payments across African trade corridors',
          'By mandating cash-only barter trade between neighbouring nations',
          'By preventing African enterprises from accessing regional markets',
          'By raising import tariffs between African Union member states'
        ],
        correctIndex: 0,
        concept: 'African Trade & Digital Finance',
        explanation: 'AfCFTA and digital financial rails streamline trade, lower transaction fees, and spur industrialization.',
        socraticHint: 'Review the African Real-World Context on Pan-African regional trade.',
        pageSourceNumber: lastReadPageNumber
      },
      {
        id: 'fb-q4',
        prompt: `Mastery Standard (${chapterTitle}): What condition is required for full marks in ${curriculumCode} financial examination papers?`,
        options: [
          'Accurate ledger classifications, precise trial balance reconciliations, and strict adherence to GAAP / IFRS standards',
          'Guessing trial balance totals without reconciling ledger discrepancies',
          'Ignoring bank reconciliation statement timing differences',
          'Recording gross figures without accounting for VAT or discounts'
        ],
        correctIndex: 0,
        concept: 'Financial Examination Standard',
        explanation: 'Examiners award marks for methodical folio cross-referencing, correct calculations, and ledger balancing.',
        socraticHint: 'Think about how exam markers evaluate audit trails and ledger balancing.',
        pageSourceNumber: lastReadPageNumber
      }
    ];
  }

  if (isAgriOrBio) {
    return [
      {
        id: 'fb-q1',
        prompt: `Based on Page 1 of ${chapterTitle} (${subjectName}): What biological or agronomic mechanism is fundamental to this unit?`,
        options: [
          'Biological systems rely on nutrient cycles, cellular energy pathways, and dynamic homeostatic feedback mechanisms',
          'Living organisms and crops operate independently of water, nitrogen, and photosynthesis',
          'Soil fertility is static and unaffected by pH or organic matter content',
          'Genetic traits are distributed at random without chromosomal inheritance'
        ],
        correctIndex: 0,
        concept: 'Biological / Agricultural Foundations',
        explanation: `Under ${curriculumCode}, cellular and agronomic processes follow rigorous scientific principles of energy flow and nutrient retention.`,
        socraticHint: 'Review the foundational biological or soil principles on Page 1.',
        pageSourceNumber: 1
      },
      {
        id: 'fb-q2',
        prompt: `Scientific Methodology: What is essential when analyzing experimental data or physiological feedback loops in ${subjectName}?`,
        options: [
          'Identify the stimulus, receptor, control centre, and effector response that restores physiological set-point',
          'Draw conclusions without testing negative control variables',
          'Assume correlation indicates biological causation without testing',
          'Omit labeled biological diagrams and SI units in experimental reporting'
        ],
        correctIndex: 0,
        concept: 'Scientific Analysis & Feedback Loops',
        explanation: 'Negative feedback loops reverse initial deviations to preserve dynamic biological equilibrium.',
        socraticHint: 'Trace the receptor-to-effector pathway demonstrated in your textbook.',
        pageSourceNumber: pagesRead[0] || 1
      },
      {
        id: 'fb-q3',
        prompt: `African Agricultural & Environmental Context: How do climate-smart techniques (e.g. drip irrigation, drought-tolerant seed varieties) benefit farming in ${countryCode}?`,
        options: [
          'They maximize crop water-use efficiency, conserve fragile topsoil from erosion, and ensure household food security during droughts',
          'They deplete groundwater reserves and accelerate soil salinization',
          'They have no relevance to smallholder farming in Africa',
          'They prevent beneficial nitrogen-fixing soil bacteria from thriving'
        ],
        correctIndex: 0,
        concept: 'African Agronomic Adaptation',
        explanation: 'Climate-resilient agronomy protects African harvests against erratic rainfall and extreme weather.',
        socraticHint: 'Review the African Real-World Application box on agricultural innovation.',
        pageSourceNumber: lastReadPageNumber
      },
      {
        id: 'fb-q4',
        prompt: `Mastery Standard (${chapterTitle}): What criteria do ${curriculumCode} examiners require in ${subjectName} exam responses?`,
        options: [
          'Precise biological terminology, structured reasoning, correct diagram captions, and verifiable scientific explanations',
          'Vague everyday descriptions without proper scientific terminology',
          'Unlabeled sketches without magnification scales',
          'Ignoring the biological mechanism and writing purely subjective opinions'
        ],
        correctIndex: 0,
        concept: 'Scientific Examination Standard',
        explanation: 'National exam boards award marks for specific scientific terms, labeled anatomical diagrams, and mechanistic clarity.',
        socraticHint: 'Remember that examiners look for precise scientific keywords and complete physiological steps.',
        pageSourceNumber: lastReadPageNumber
      }
    ];
  }

  // Math, Physics, and Technical Subjects
  return [
    {
      id: 'fb-q1',
      prompt: `Based on Page 1 of ${chapterTitle} (${subjectName}): What is the governing mathematical formula or physical law established?`,
      options: [
        'The foundational equation and coordinate sign conventions established on Page 1',
        'Estimating without standard sign conventions or unit checks',
        'Skipping the identification of known and unknown variables',
        'Ignoring vector directions in kinematics and force systems'
      ],
      correctIndex: 0,
      concept: `${subjectName} Foundational Standard`,
      explanation: `As detailed in the ${curriculumCode} syllabus for ${countryCode}, understanding the foundational definitions on Page 1 is required before complex problem solving.`,
      socraticHint: 'Recall what was established as the primary law or definition on Page 1.',
      pageSourceNumber: 1
    },
    {
      id: 'fb-q2',
      prompt: `Regarding calculation and methodology in ${chapterTitle}: What is the first essential step when solving problems in ${subjectName}?`,
      options: [
        'List all known and unknown variables, state the governing formula, and verify standard SI units',
        'Write down a single number without showing working steps',
        'Use arbitrary equations without checking boundary conditions',
        'Disregard negative signs in vector displacements and accelerations'
      ],
      correctIndex: 0,
      concept: 'Methodology and Working Steps',
      explanation: 'Official national examination councils award method marks for properly stating the formula and substituting known variables.',
      socraticHint: 'Look at the step-by-step worked examples provided in your textbook pages.',
      pageSourceNumber: pagesRead[0] || 1
    },
    {
      id: 'fb-q3',
      prompt: `African Engineering Context: How does ${subjectName} directly connect to regional industrial or infrastructure development in ${countryCode}?`,
      options: [
        'It directly informs regional electrical grid design, transport engineering, mining acoustics, or renewable power systems',
        'It has no practical connection to African engineering or industry',
        'It is strictly theoretical and never applied outside a classroom',
        'It contradicts real-world physical and engineering data'
      ],
      correctIndex: 0,
      concept: 'African Contextual Synthesis',
      explanation: 'SomaAfrika curriculum modules emphasize direct applications across African engineering and infrastructure.',
      socraticHint: 'Reflect on the African Real-World Context highlighted in your study session.',
      pageSourceNumber: lastReadPageNumber
    },
    {
      id: 'fb-q4',
      prompt: `Mastery Synthesis (${chapterTitle}): What condition is required to achieve full credit in ${curriculumCode} examinations for this topic?`,
      options: [
        'Complete conceptual accuracy, correct formula application, explicit working steps, and clear final units with appropriate signs',
        'Guessing answers without showing working',
        'Memorizing answers without understanding underlying physical mechanisms',
        'Omitting units and vector direction in final answers'
      ],
      correctIndex: 0,
      concept: 'National Examination Standard',
      explanation: 'National exam boards require conceptual clarity, correct formula derivation, and precision in final units.',
      socraticHint: 'Think about how exam markers evaluate method, substitution, and answer marks.',
      pageSourceNumber: lastReadPageNumber
    }
  ];
}

import { 
  buildExaminerPrompt, 
  generateGroundedFallbackQuestions, 
  normalizeQuestion 
} from '../src/data/groundedQuizGenerator';

const handleQuiz = async (req: express.Request, res: express.Response) => {
  const payload = req.body || {};
  const { 
    countryCode = 'ZA',
    curriculumCode = 'National Curriculum',
    subjectName = 'Academic Subject', 
    chapterTitle = 'Core Unit', 
    chapterNumber = 0, 
    lastReadPage,
    lastReadPageNumber = 1, 
    pagesRead = [1], 
    exactContentStudied,
    pageContents 
  } = payload;

  const resolvedPagesRead = (Array.isArray(pagesRead) && pagesRead.length > 0)
    ? [...pagesRead].sort((a: number, b: number) => a - b)
    : [lastReadPage || lastReadPageNumber || 1];

  const resolvedContent = exactContentStudied || pageContents || '';
  const pageRangeLabel = resolvedPagesRead.length === 1
    ? `Page ${resolvedPagesRead[0]}`
    : `Pages ${resolvedPagesRead[0]} to ${resolvedPagesRead[resolvedPagesRead.length - 1]}`;
  const defaultTitle = `Mastery Check: ${chapterTitle} — Testing ${pageRangeLabel}`;

  try {
    if (ai && resolvedContent.trim().length > 0) {
      try {
        const examinerPrompt = buildExaminerPrompt({
          countryCode,
          curriculumCode,
          subjectName,
          chapterTitle,
          chapterNumber,
          pagesRead: resolvedPagesRead,
          lastReadPage: lastReadPage || lastReadPageNumber,
          exactContentStudied: resolvedContent
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: examinerPrompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          let rawList: any[] = [];
          let quizTitle = defaultTitle;

          if (Array.isArray(parsed)) {
            rawList = parsed;
          } else if (parsed && typeof parsed === 'object') {
            if (Array.isArray(parsed.questions)) {
              rawList = parsed.questions;
            }
            if (parsed.title) {
              quizTitle = parsed.title;
            }
          }

          if (rawList.length >= 4) {
            const normalized = rawList.slice(0, 4).map((q: any, idx: number) => 
              normalizeQuestion(q, idx, resolvedPagesRead[idx % resolvedPagesRead.length])
            );
            return res.status(200).json({ 
              success: true, 
              title: quizTitle,
              passingThreshold: 75,
              questions: normalized 
            });
          }
        }
      } catch (aiErr) {
        console.warn('Gemini 3.8 Flash fallback engaged:', aiErr);
      }
    }

    const fallbackQuestions = generateGroundedFallbackQuestions(payload);
    return res.status(200).json({ 
      success: true, 
      title: defaultTitle,
      passingThreshold: 75,
      questions: fallbackQuestions, 
      isFallback: true 
    });
  } catch (err) {
    const safeQuestions = generateGroundedFallbackQuestions(payload);
    return res.status(200).json({ 
      success: true, 
      title: defaultTitle,
      passingThreshold: 75,
      questions: safeQuestions, 
      isFallback: true 
    });
  }
};

app.post('/api/generate-exit-quiz', handleQuiz);
app.post('/generate-exit-quiz', handleQuiz);
app.post('/', handleQuiz);

export default app;
