import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  StudySessionState, 
  TextbookPage, 
  QuizQuestion, 
  SocraticMessage, 
  StudentProfile, 
  ExitQuizRequestPayload 
} from '../types';
import { AfricaLogo } from './AfricaLogo';
import { MathRenderer } from './MathRenderer';
import { COUNTRIES } from '../data/curriculumData';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Camera, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  HelpCircle, 
  Lightbulb, 
  ListChecks, 
  Lock, 
  Maximize2, 
  MessageSquare, 
  Minimize2, 
  Pause, 
  Play, 
  Send, 
  ShieldAlert, 
  Sparkles, 
  Timer, 
  Volume2, 
  X, 
  ZoomIn, 
  ZoomOut 
} from 'lucide-react';

interface Screen03StudyKioskProps {
  session: StudySessionState;
  profile: StudentProfile;
  onUpdateSession: (updated: Partial<StudySessionState>) => void;
  onCompleteSession: (payload: ExitQuizRequestPayload) => void;
  onExitEarly: () => void;
}

export const Screen03StudyKiosk: React.FC<Screen03StudyKioskProps> = ({
  session,
  profile,
  onUpdateSession,
  onCompleteSession,
  onExitEarly
}) => {
  const pages = session.chapterPages || [session.activePage];
  const [currentPageIndex, setCurrentPageIndex] = useState(session.pageIndex || 0);
  const [secondsRemaining, setSecondsRemaining] = useState(session.remainingSeconds);
  const [pageTimeSeconds, setPageTimeSeconds] = useState(session.pageTimeSeconds || 0);
  const [isPaused, setIsPaused] = useState(session.isPaused || false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showMentorDrawer, setShowMentorDrawer] = useState(true);
  const [showFinishModal, setShowFinishModal] = useState(false);

  // Requirement: Telemetry tracking (unique pages visited & aggregated content strictly for read pages)
  const [pagesReadSet, setPagesReadSet] = useState<Set<number>>(() => {
    return new Set(session.pagesReadInSession || [pages[0]?.pageNumber || 1]);
  });

  const activePage = pages[currentPageIndex] || session.activePage;
  const countryInfo = COUNTRIES[profile.country];

  // Socratic chat state
  const [messages, setMessages] = useState<SocraticMessage[]>([
    {
      id: 'm1',
      sender: 'mentor',
      text: `Greetings ${profile.name}! I am your Socratic Mentor for ${session.subjectName}. As you read Page ${activePage.pageNumber} of ${pages.length} ("${activePage.title}"), ask me any question or test the anti-cheat guardrails below!`,
      timestamp: 'Now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Master Timer Interval
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTriggerFinish(); // Timer is up, auto-trigger exit quiz
          return 0;
        }
        return prev - 1;
      });

      setPageTimeSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Page tracking when current page changes
  useEffect(() => {
    setPagesReadSet((prev) => {
      const updated = new Set(prev);
      updated.add(activePage.pageNumber);
      return updated;
    });

    // Reset page timer for this new page view
    setPageTimeSeconds(0);
  }, [currentPageIndex]);

  // Build exact text content across ONLY the visited pages during the active session
  const visitedPagesText = useMemo(() => {
    const sessionReadPages = Array.from(pagesReadSet).sort((a, b) => a - b);
    return pages
      .filter((page) => sessionReadPages.includes(page.pageNumber))
      .map((page) => {
        const theoryText = (page.theorySections || []).map((sec) => {
          const terms = (sec.keyTerms || []).map((kt) => `- ${kt.term}: ${kt.definition}`).join('\n');
          return `Section: ${sec.heading}\n${sec.paragraphs.join('\n')}${terms ? '\nKey Terms:\n' + terms : ''}`;
        }).join('\n\n');

        const formulasText = (page.keyFormulas || []).length > 0
          ? `Formulas:\n` + page.keyFormulas!.map((f) => `- ${f.name}: ${f.latex}`).join('\n')
          : '';

        const africanContextText = page.africanContext?.realWorldApplication
          ? `African Real-World Context (${page.africanContext.title}):\n${page.africanContext.realWorldApplication}`
          : '';

        const workedExampleText = page.workedExample
          ? `Worked Example (${page.workedExample.problemStatement}):\n` + page.workedExample.pedagogicalSteps.map((s) => `Step ${s.step} [${s.description}]: ${s.mathematicalForm}`).join('\n')
          : '';

        const practiceText = page.practiceQuestion?.prompt
          ? `Practice Reflection:\n${page.practiceQuestion.prompt}`
          : '';

        const takeawaysText = (page.keyTakeaways || []).length > 0
          ? `Key Takeaways:\n` + page.keyTakeaways.map((t) => `- ${t}`).join('\n')
          : '';

        const allParts = [
          `--- PAGE ${page.pageNumber}: ${page.title} ---`,
          page.subtitle ? `Subtitle: ${page.subtitle}` : '',
          theoryText,
          formulasText,
          africanContextText,
          workedExampleText,
          practiceText,
          takeawaysText
        ].filter(Boolean);

        return allParts.join('\n\n');
      })
      .join('\n\n');
  }, [pagesReadSet, pages]);

  // Sync state back to parent session
  useEffect(() => {
    onUpdateSession({
      remainingSeconds: secondsRemaining,
      pageTimeSeconds: pageTimeSeconds,
      pageIndex: currentPageIndex,
      pageNumber: activePage.pageNumber,
      activePage: activePage,
      lastReadPageNumber: activePage.pageNumber,
      pagesReadInSession: Array.from(pagesReadSet).sort((a, b) => a - b),
      cumulativePageContent: visitedPagesText
    });
  }, [secondsRemaining, pageTimeSeconds, currentPageIndex, activePage, pagesReadSet, visitedPagesText]);

  // Navigate to Previous Page
  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  // Navigate to Next Page
  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  // Build exit payload & trigger quiz strictly grounded in visited pages
  const handleTriggerFinish = () => {
    const sessionReadPages = Array.from(pagesReadSet).sort((a, b) => a - b);
    const lastReadPage = activePage.pageNumber;

    const payload: ExitQuizRequestPayload = {
      countryCode: profile.country,
      curriculumCode: countryInfo.curriculum,
      subjectName: session.subjectName,
      chapterTitle: session.chapterTitle,
      chapterNumber: session.chapterIndex,
      pagesRead: sessionReadPages,
      lastReadPage: lastReadPage,
      lastReadPageNumber: lastReadPage,
      exactContentStudied: visitedPagesText,
      pageContents: visitedPagesText
    };
    onCompleteSession(payload);
  };

  // Formatter for MM:SS
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Progress percentage of target study block
  const totalTargetSec = session.totalTargetMinutes * 60;
  const progressPercent = Math.min(100, Math.max(0, ((totalTargetSec - secondsRemaining) / totalTargetSec) * 100));

  // Process Socratic Question (Guiding steps, never answers)
  const processSocraticQuery = (queryText: string) => {
    const userMsg: SocraticMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    setTimeout(() => {
      let mentorReply = '';
      const lower = queryText.toLowerCase();
      const sName = session.subjectName.toLowerCase();

      const isEnglish = sName.includes('english') || sName.includes('literature') || sName.includes('kiswahili') || sName.includes('chichewa') || sName.includes('indigenous') || sName.includes('language');
      const isCivics = sName.includes('civic') || sName.includes('life orientation') || sName.includes('social') || sName.includes('heritage') || sName.includes('government') || sName.includes('history');
      const isAgri = sName.includes('agri');
      const isAccounting = sName.includes('account') || sName.includes('business') || sName.includes('econ') || sName.includes('commerce');
      const isBio = sName.includes('bio') || sName.includes('life sci');

      if (lower.includes('just give me the answer') || lower.includes('answer to question') || lower.includes('give me answer') || lower.includes('tell me the answer') || lower.includes('what is the answer')) {
        if (isEnglish) {
          mentorReply = `I cannot give you the direct answer. Let's look at Page ${activePage.pageNumber}: who is the grammatical agent performing the action, and what is the direct object? How does changing the syntactic voice or diction affect the meaning?`;
        } else if (isCivics) {
          mentorReply = `As a Socratic mentor, I guide your thinking rather than hand out answers. Look at Page ${activePage.pageNumber}: which constitutional right or ethical civic duty is under dispute? How would the law or the principle of Unhu/Ubuntu resolve this fairly?`;
        } else if (isAgri) {
          mentorReply = `I want you to think it through! Look at Page ${activePage.pageNumber}: what are the soil characteristics, drainage properties, or NPK nutrient requirements? How would changing these factors impact plant root development?`;
        } else if (isAccounting) {
          mentorReply = `I cannot give you the final figures. Apply the fundamental double-entry rule: for this transaction, which account receives economic value (Debit), and which account gives economic value (Credit)?`;
        } else if (isBio) {
          mentorReply = `I cannot give you the direct answer. Trace the negative feedback loop on Page ${activePage.pageNumber}: what is the initial stimulus, what receptor detects it, and what hormone or organ acts as the effector?`;
        } else {
          mentorReply = `I cannot give you the direct answer. Let's look at Page ${activePage.pageNumber}: what physical principle connects your known values to the unknown variable you need to solve?`;
        }
      } else if (lower.includes('summarize') || lower.includes('summary') || lower.includes('simple')) {
        mentorReply = `On Page ${activePage.pageNumber} (${activePage.title}), the core academic takeaway is: ${activePage.keyTakeaways?.[0] || 'Master the foundational definitions before proceeding to practical examination problems.'}`;
      } else if (isEnglish) {
        if (lower.includes('passive') || lower.includes('active') || lower.includes('voice') || lower.includes('grammar') || lower.includes('syntax')) {
          mentorReply = `Notice how voice alters the spotlight! In active voice, the subject acts. In passive voice, the object receives the action, which is valuable in formal reports when the agent is unknown. Check the worked transformation on Page ${activePage.pageNumber}.`;
        } else if (lower.includes('metaphor') || lower.includes('poem') || lower.includes('irony') || lower.includes('tone')) {
          mentorReply = `Examine the author's diction on Page ${activePage.pageNumber}: what sensory images are evoked? Does the speaker sound nostalgic, defiant, or sorrowful? How does that figurative comparison reinforce the central message?`;
        } else {
          mentorReply = `Great inquiry on "${activePage.title}". Notice how the author crafts the sentence syntax and vocabulary. What specific argument or emotional tone stands out to you on this page?`;
        }
      } else if (isCivics) {
        if (lower.includes('right') || lower.includes('constitution') || lower.includes('law') || lower.includes('ubuntu') || lower.includes('unhu')) {
          mentorReply = `Think about constitutional balance: rights come with corresponding civic obligations. Section 36 reminds us that rights can be reasonably limited to protect public health or communal safety. How does this apply to the case on Page ${activePage.pageNumber}?`;
        } else {
          mentorReply = `In civic and social ethics, we must weigh individual liberties against community welfare. Review the African context on Page ${activePage.pageNumber}: how did traditional or modern institutions maintain justice here?`;
        }
      } else if (isAgri) {
        if (lower.includes('soil') || lower.includes('water') || lower.includes('irrigation') || lower.includes('crop') || lower.includes('fertilizer') || lower.includes('npk')) {
          mentorReply = `Consider the pedological soil structure: sandy soils drain rapidly and leach nitrogen, while clay soils retain water but risk waterlogging root zones. Which irrigation method (drip vs furrow) minimizes evaporation on this farm?`;
        } else {
          mentorReply = `Agronomy is about optimizing the agricultural ecosystem. Look at the key takeaways on Page ${activePage.pageNumber}: what environmental conditions determine high harvest yields?`;
        }
      } else if (isAccounting) {
        if (lower.includes('debit') || lower.includes('credit') || lower.includes('ledger') || lower.includes('balance') || lower.includes('journal')) {
          mentorReply = `Remember the Golden Rule of Bookkeeping: Debit the receiver, Credit the giver! For every transaction, Assets = Equity + Liabilities must stay perfectly balanced. Which account is increasing on Page ${activePage.pageNumber}?`;
        } else {
          mentorReply = `Commercial management relies on accurate audit trails. Review the worked financial example on Page ${activePage.pageNumber}: what is the first ledger entry recorded?`;
        }
      } else if (isBio) {
        if (lower.includes('cell') || lower.includes('dna') || lower.includes('hormone') || lower.includes('insulin') || lower.includes('blood')) {
          mentorReply = `Notice how physiological homeostasis operates like a thermostat. When a disturbance occurs, the control center activates an effector to reverse the deviation back toward the set point. Trace that loop on Page ${activePage.pageNumber}.`;
        } else {
          mentorReply = `Life Sciences requires precise biological mechanisms. Look at the diagram and key terms on Page ${activePage.pageNumber}: what cellular or physiological organ is carrying out this function?`;
        }
      } else {
        // Math and Physics
        if (lower.includes('taxi') || lower.includes('minibus') || lower.includes('analogy') || lower.includes('motion') || lower.includes('force')) {
          mentorReply = `Consider a loaded minibus taxi on the highway. Because it has large mass m, changing its velocity requires substantial net force (F_net = ma). That's why braking distances scale with the square of speed!`;
        } else {
          mentorReply = `Great inquiry on "${activePage.title}". Look at the worked example on this page: what is the foundational first step? What known values can you substitute before calculating?`;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          sender: 'mentor',
          text: mentorReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsThinking(false);
    }, 500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isThinking) return;
    const text = chatInput.trim();
    setChatInput('');
    processSocraticQuery(text);
  };

  return (
    <div className="min-h-screen bg-[#110f0d] text-[#f4efe6] flex flex-col justify-between font-sans relative overflow-hidden select-none">
      
      {/* Top Kiosk Lockdown Bar */}
      <header className="sticky top-0 z-40 bg-[#191613] border-b border-stone-800 px-3 md:px-6 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/90 border border-red-800/80 text-red-300 text-xs font-bold">
            <Lock className="w-3.5 h-3.5 text-red-400" />
            <span className="uppercase tracking-wider text-[11px] md:text-xs">Lock Kiosk Active</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-stone-300">
            <span className="text-base">{countryInfo.flag}</span>
            <span className="font-bold text-stone-100">{countryInfo.hallName}</span>
            <span className="text-stone-500">•</span>
            <span className="text-amber-400 font-semibold">{session.subjectName}</span>
          </div>
        </div>

        {/* Master Countdown Timer & Real-time Page Time Telemetry Display */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Individual Page Study Time (Requirement 2) */}
          <div className="flex items-center gap-1.5 px-2.5 md:px-3 py-1 rounded-xl bg-stone-900 border border-stone-700/80 text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline text-stone-400">Page {activePage.pageNumber} Time:</span>
            <span className="font-mono font-bold text-amber-300">{formatTime(pageTimeSeconds)}</span>
          </div>

          {/* Master Session Remaining Timer */}
          <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/40 text-xs">
            <Timer className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline text-stone-400">Session Remaining:</span>
            <span className="font-mono font-black text-xs md:text-sm text-amber-400">{formatTime(secondsRemaining)}</span>
          </div>

          {/* Socratic Mentor Drawer Toggle */}
          <button
            onClick={() => setShowMentorDrawer(!showMentorDrawer)}
            className={`p-1.5 md:px-3 md:py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition ${
              showMentorDrawer ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mentor</span>
          </button>

          {/* Finish Chapter & Take Mastery Quiz CTA (Requirement 3) */}
          <button
            onClick={() => setShowFinishModal(true)}
            className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-extrabold text-xs shadow-md cursor-pointer transition transform active:scale-95"
          >
            Finish Chapter & Take Quiz
          </button>
        </div>
      </header>

      {/* Progress Bar of Study Session */}
      <div className="w-full bg-stone-900 h-1 relative">
        <div 
          className="bg-gradient-to-r from-amber-500 to-orange-500 h-1 transition-all duration-1000 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Multi-Page Book Reader Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Main Book Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full">
          
          {/* REQUIREMENT 1: MULTI-PAGE NAVIGATION CONTROLS & PROGRESS INDICATOR BAR */}
          <div className="bg-[#1c1916] rounded-2xl border border-stone-800 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            
            {/* Page indicator & Chapter title */}
            <div className="flex items-center gap-2.5 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-extrabold border border-amber-500/40">
                Page {activePage.pageNumber} of {pages.length}
              </span>
              <span className="text-stone-300 font-bold">
                {session.chapterTitle}
              </span>
              <span className="hidden md:inline text-stone-500">•</span>
              <span className="hidden md:inline text-stone-400 font-mono text-[11px]">
                {activePage.syllabusRef}
              </span>
            </div>

            {/* Navigation buttons: Previous & Next Page */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-stone-800 text-stone-200 text-xs font-bold flex items-center gap-1 cursor-pointer transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Page</span>
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPageIndex === pages.length - 1}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-30 disabled:hover:bg-amber-500 text-stone-950 text-xs font-bold flex items-center gap-1 cursor-pointer transition shadow"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Zoom controls */}
              <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-stone-800">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
                  className="p-1.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-stone-400 font-mono text-[10px] w-8 text-center">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                  className="p-1.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Reading Telemetry Breadcrumb: Shows which pages were read in this session */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900/60 border border-stone-800/80 text-xs text-stone-400">
            <span className="font-semibold text-stone-300">Session Reading Telemetry:</span>
            <div className="flex items-center gap-1.5">
              {pages.map((p, idx) => {
                const isRead = pagesReadSet.has(p.pageNumber);
                const isCurrent = idx === currentPageIndex;
                return (
                  <button
                    key={p.pageNumber}
                    onClick={() => setCurrentPageIndex(idx)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-500 text-stone-950 shadow'
                        : isRead
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/60'
                        : 'bg-stone-800 text-stone-500'
                    }`}
                  >
                    P{p.pageNumber} {isRead && !isCurrent && '✓'}
                  </button>
                );
              })}
            </div>
            <span className="text-[11px] text-stone-500 ml-auto">
              {pagesReadSet.size} of {pages.length} pages covered
            </span>
          </div>

          {/* Actual Academic Textbook Page Content */}
          <article 
            className="bg-[#1a1714] rounded-3xl border border-stone-800 p-5 md:p-10 space-y-8 shadow-xl transition-all"
            style={{ fontSize: `${zoomLevel}%` }}
          >
            {/* Page Header */}
            <div className="border-b border-stone-800 pb-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider">
                <span>{countryInfo.curriculum} • {session.subjectName} ({profile.grade})</span>
                <span className="text-stone-400 font-mono">Page {activePage.pageNumber} of {pages.length}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold brand-font text-stone-100">
                {activePage.title}
              </h1>
              <p className="text-stone-400 text-sm font-medium">
                {activePage.subtitle}
              </p>
            </div>

            {/* Theory Sections */}
            {activePage.theorySections.map((sec, idx) => (
              <section key={idx} className="space-y-3 text-stone-200 leading-relaxed text-sm md:text-base">
                <h2 className="text-base md:text-lg font-bold text-amber-400/90 flex items-center gap-2">
                  <span>{sec.heading}</span>
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-stone-300 leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.keyTerms && (
                  <div className="mt-3 p-4 rounded-2xl bg-[#221e1a] border border-stone-800 space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Key Syllabus Terms
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {sec.keyTerms.map((term, tIdx) => (
                        <div key={tIdx} className="text-xs">
                          <strong className="text-stone-100 block">{term.term}</strong>
                          <span className="text-stone-400">{term.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* Clean KaTeX Formatted Formulas */}
            {activePage.keyFormulas && activePage.keyFormulas.length > 0 && (
              <div className="p-5 md:p-6 rounded-2xl bg-[#231f1b] border-2 border-amber-600/40 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <BookOpen className="w-4 h-4" />
                  <span>Governing Examination Formulas (Page {activePage.pageNumber})</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {activePage.keyFormulas.map((f, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-stone-400 font-semibold border-b border-stone-900 pb-1.5">
                        <span>{f.name}</span>
                        <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono">Standard Form</span>
                      </div>
                      
                      <div className="text-center py-2 text-lg md:text-2xl text-amber-300 font-serif">
                        <MathRenderer formula={f.latex} displayMode={true} />
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-400 pt-1 border-t border-stone-900">
                        {f.variables.map((v, vIdx) => (
                          <span key={vIdx} className="text-[11px]">• {v}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pedagogical Worked Example */}
            {activePage.workedExample && (
              <div className="p-5 md:p-6 rounded-2xl bg-[#1e1b18] border border-stone-700/80 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Worked Curriculum Example
                  </span>
                  <span className="text-xs text-stone-400">Page {activePage.pageNumber} Method</span>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-xs md:text-sm font-semibold text-stone-200">
                  {activePage.workedExample.problemStatement}
                </div>

                <div className="space-y-3">
                  {activePage.workedExample.pedagogicalSteps.map((s) => (
                    <div key={s.step} className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 text-xs space-y-1.5">
                      <div className="flex items-center gap-2 font-bold text-stone-300">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] shrink-0">
                          {s.step}
                        </span>
                        <span>{s.description}</span>
                      </div>
                      
                      <div className="pl-7 py-1 text-amber-300 font-mono text-sm overflow-x-auto">
                        <MathRenderer formula={s.mathematicalForm} displayMode={false} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/40 text-xs text-amber-200">
                  <strong className="block text-amber-400 font-bold mb-1">Teacher Examination Tip:</strong>
                  {activePage.workedExample.socraticTeacherTip}
                </div>
              </div>
            )}

            {/* African Real-World Application Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#201c18] to-[#261f18] border border-amber-600/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <AfricaLogo size="sm" showSubtitle={false} />
                <span>African Real-World Context: {activePage.africanContext.regionName}</span>
              </div>
              <h4 className="text-sm font-bold text-stone-100">
                {activePage.africanContext.title}
              </h4>
              <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                {activePage.africanContext.realWorldApplication}
              </p>
            </div>

            {/* REQUIREMENT 1: KEY LEARNING TAKEAWAYS SPECIFIC TO THIS PAGE */}
            <div className="p-5 rounded-2xl bg-[#221e1a] border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <ListChecks className="w-4 h-4 text-amber-400" />
                <span>Key Learning Takeaways (Page {activePage.pageNumber})</span>
              </div>
              <ul className="space-y-1.5 text-xs md:text-sm text-stone-300">
                {activePage.keyTakeaways.map((takeaway, tkIdx) => (
                  <li key={tkIdx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Page Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-800">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-30 text-stone-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Page</span>
              </button>

              <span className="text-xs text-stone-400 font-mono">
                Page {activePage.pageNumber} of {pages.length}
              </span>

              {currentPageIndex < pages.length - 1 ? (
                <button
                  onClick={handleNextPage}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition shadow"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowFinishModal(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-stone-950 text-xs font-black flex items-center gap-1.5 cursor-pointer transition shadow-lg"
                >
                  <span>Take Mastery Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </article>
        </main>

        {/* Socratic AI Mentor Drawer */}
        {showMentorDrawer && (
          <aside className="w-80 md:w-96 bg-[#181512] border-l border-stone-800 flex flex-col justify-between z-30 shadow-2xl shrink-0">
            <div className="p-3.5 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-100">Socratic Academic Mentor</h4>
                  <p className="text-[10px] text-amber-500 font-medium">Page {activePage.pageNumber} Assistance</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMentorDrawer(false)} 
                className="text-stone-400 hover:text-stone-200 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Test Prompt Chips */}
            <div className="p-3 bg-[#1e1b18] border-b border-stone-800/80 space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                ⚡ Quick Socratic Chips:
              </div>
              
              <button
                type="button"
                onClick={() => processSocraticQuery("Explain this with a minibus taxi analogy.")}
                className="w-full text-left p-2 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-700/80 text-[11px] text-stone-200 transition cursor-pointer flex items-center gap-2"
              >
                <span>💡</span>
                <span className="truncate">"Minibus taxi analogy"</span>
              </button>

              <button
                type="button"
                onClick={() => processSocraticQuery("Just give me the answer to question 2.")}
                className="w-full text-left p-2 rounded-xl bg-red-950/40 hover:bg-red-950/70 border border-red-800/70 text-[11px] text-red-300 transition cursor-pointer flex items-center gap-2"
              >
                <span>🚫</span>
                <span className="font-semibold text-red-200 truncate">Anti-Cheat: "Give me the answer"</span>
              </button>

              <button
                type="button"
                onClick={() => processSocraticQuery("Summarize Page " + activePage.pageNumber)}
                className="w-full text-left p-2 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-700/80 text-[11px] text-stone-200 transition cursor-pointer flex items-center gap-2"
              >
                <span>📖</span>
                <span className="truncate">"Summarize Page {activePage.pageNumber}"</span>
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-amber-600 text-stone-950 font-medium ml-4'
                      : 'bg-[#25211d] text-stone-200 border border-stone-800 mr-4 shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <span className={`text-[10px] block mt-1 ${m.sender === 'user' ? 'text-stone-900/70' : 'text-stone-500'}`}>
                    {m.timestamp}
                  </span>
                </div>
              ))}
              {isThinking && (
                <div className="p-3 rounded-2xl bg-[#25211d] border border-stone-800 text-stone-400 text-xs italic flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span>Thinking Socratically...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-stone-800 bg-[#161310]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask a question on this page..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isThinking}
                  className="absolute right-1.5 p-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 disabled:opacity-40 cursor-pointer transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </aside>
        )}
      </div>

      {/* Confirmation Modal to Finish Chapter & Take Exit Quiz (Requirement 3) */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e1b18] border border-stone-700 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-100">Ready for Mastery Quiz?</h3>
                <p className="text-xs text-stone-400">Questions will evaluate all pages read in this session.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 space-y-1.5">
              <div className="flex justify-between">
                <span>Subject:</span>
                <span className="font-bold text-stone-100">{session.subjectName}</span>
              </div>
              <div className="flex justify-between">
                <span>Chapter:</span>
                <span className="font-bold text-amber-400">{session.chapterTitle}</span>
              </div>
              <div className="flex justify-between">
                <span>Pages Covered:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {Array.from(pagesReadSet).sort((a, b) => a - b).join(', ')} (Last: Page {activePage.pageNumber})
                </span>
              </div>
              <p className="text-[11px] text-stone-400 pt-1 border-t border-stone-800">
                Score <strong>≥ 75%</strong> to unlock the next chapter and earn +50 Knowledge Tokens!
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowFinishModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
              >
                Keep Reading
              </button>
              <button
                onClick={() => {
                  setShowFinishModal(false);
                  handleTriggerFinish();
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 text-xs font-black cursor-pointer shadow-lg"
              >
                Take Mastery Quiz ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Study Kiosk Ribbon */}
      <footer className="w-full bg-[#181512] border-t border-stone-800 text-stone-400 py-2 px-6 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-200">{session.subjectName}</span>
          <span className="text-stone-600">•</span>
          <span>{session.chapterTitle} (Page {activePage.pageNumber} of {pages.length})</span>
        </div>
        <div className="text-amber-500 font-bold uppercase tracking-wider text-[11px]">
          Learn. Question. Understand.
        </div>
      </footer>
    </div>
  );
};
