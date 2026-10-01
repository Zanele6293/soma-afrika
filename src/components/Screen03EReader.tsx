import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getTextbookModule, COUNTRIES } from '../data/curriculumData';
import { COUNTRY_BRANDING } from '../data/countryBranding';
import { AfricaLogo } from './AfricaLogo';
import {
  BookOpen,
  Lock,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Coffee,
  ZoomIn,
  ZoomOut,
  Sparkles,
  AlertTriangle,
  Info,
  CheckCircle,
  FileText,
  Clock,
  Layers,
  GraduationCap,
  Download,
  Share2,
  Camera,
  Book,
  BookmarkCheck,
  ShieldCheck,
  Library,
  Eye,
  ExternalLink,
  MessageSquare,
  Send,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  BookMarked,
  Search,
} from 'lucide-react';

export const Screen03EReader: React.FC = () => {
  const {
    profile,
    subjects,
    selectedSubjectId,
    setSelectedSubjectId,
    selectedChapterId,
    setSelectedChapterId,
    navigateTo,
    startStudySession,
    addOrUpdateStruggleNode,
  } = useApp();

  // Reader display styling
  const [themeMode, setThemeMode] = useState<'dark' | 'sepia' | 'light'>('dark');
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1); // 0: sm, 1: base, 2: lg
  const [readerViewMode, setReaderViewMode] = useState<'STUDY' | 'PDF_PAGE'>('STUDY');
  const [pdfZoom, setPdfZoom] = useState<number>(100);

  // Active page state inside active chapter
  const [activeSubPageIndex, setActiveSubPageIndex] = useState<number>(0);
  const [jumpPageInput, setJumpPageInput] = useState<string>('');

  // Socratic Mentor Assistant state inside Reader
  const [isMentorOpen, setIsMentorOpen] = useState(true);
  const [mentorInput, setMentorInput] = useState('');
  const [isMentorReplying, setIsMentorReplying] = useState(false);
  const [mentorMessages, setMentorMessages] = useState<
    Array<{ role: 'user' | 'assistant'; text: string }>
  >([
    {
      role: 'assistant',
      text: `Greetings, ${profile.firstName}! I am your SomaAfrika Socratic Academic Mentor. As you read through your ${profile.gradeLevel >= 10 ? 'Senior Secondary' : 'Junior Phase'} textbook, ask me about any formula, proof, worked example, or exercise. I will guide you with African analogies and step-by-step questions—teaching you how to think, never giving direct answers!`,
    },
  ]);

  // Bookshelf / Curriculum Library drawer modal
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  // Deep study setup modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionMinutes, setSessionMinutes] = useState(25); // default 25 min Pomodoro-style
  const [modalError, setModalError] = useState<string | null>(null);

  const currentCountry = COUNTRIES.find((c) => c.code === profile.country) || COUNTRIES[0];
  const branding = COUNTRY_BRANDING[profile.country] || COUNTRY_BRANDING.ZA;
  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  const currentModule = getTextbookModule(currentSubject.id, currentSubject, profile.country, profile.gradeLevel);

  const currentChapter =
    currentModule.chapters.find((c) => c.id === selectedChapterId) || currentModule.chapters[0];

  const subPages = currentChapter.pages || [];
  const activeSubPage = subPages[activeSubPageIndex] || subPages[0];

  // Calculate global page number
  const currentGlobalPageNumber = activeSubPage
    ? activeSubPage.pageNumber
    : currentChapter.pageStart || 1;

  // Reset sub-page when chapter changes
  useEffect(() => {
    setActiveSubPageIndex(0);
  }, [selectedChapterId]);

  // Page flipping logic
  const handleNextPage = () => {
    if (activeSubPageIndex < subPages.length - 1) {
      setActiveSubPageIndex((prev) => prev + 1);
    } else {
      // Advance to next chapter if available
      const currentChapterIndex = currentModule.chapters.findIndex((c) => c.id === currentChapter.id);
      if (currentChapterIndex < currentModule.chapters.length - 1) {
        setSelectedChapterId(currentModule.chapters[currentChapterIndex + 1].id);
        setActiveSubPageIndex(0);
      }
    }
  };

  const handlePrevPage = () => {
    if (activeSubPageIndex > 0) {
      setActiveSubPageIndex((prev) => prev - 1);
    } else {
      // Go back to previous chapter's last page if available
      const currentChapterIndex = currentModule.chapters.findIndex((c) => c.id === currentChapter.id);
      if (currentChapterIndex > 0) {
        const prevChapter = currentModule.chapters[currentChapterIndex - 1];
        setSelectedChapterId(prevChapter.id);
        const prevPages = prevChapter.pages || [];
        setActiveSubPageIndex(Math.max(0, prevPages.length - 1));
      }
    }
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput.trim(), 10);
    if (isNaN(pageNum) || pageNum < 1 || pageNum > (currentModule.totalPages || 384)) return;

    // Find the chapter that contains this page
    const matchedChapter = currentModule.chapters.find(
      (ch) => pageNum >= (ch.pageStart || 1) && pageNum <= (ch.pageEnd || 384)
    );

    if (matchedChapter) {
      setSelectedChapterId(matchedChapter.id);
      const chPages = matchedChapter.pages || [];
      const matchedPageIndex = chPages.findIndex((p) => p.pageNumber >= pageNum);
      setActiveSubPageIndex(matchedPageIndex >= 0 ? matchedPageIndex : 0);
    }
    setJumpPageInput('');
  };

  // Launch Deep Study Focus Session
  const handleLaunchDeepStudy = () => {
    setModalError(null);
    const chapterPracticeQuestions = (currentChapter.pages || []).flatMap(
      (page) => page.exerciseQuestions || []
    );

    const result = startStudySession(
      sessionMinutes,
      currentChapter.title,
      currentSubject.name,
      currentChapter.contentMarkdown,
      {
        sourceType: 'TEXTBOOK_E_READER',
        textbookTitle: currentModule.title,
        publisher: currentModule.publisher,
        pagesStudied: `Chapter ${currentChapter.chapterNumber} · pp. ${currentChapter.pageStart || 1}–${currentChapter.pageEnd || 384}`,
        keyObjectives: currentChapter.keyObjectives,
        conceptsStudied: currentChapter.concepts,
        activeChapterId: currentChapter.id,
        activeChapterNumber: currentChapter.chapterNumber,
        activeChapterTitle: currentChapter.title,
        activeChapterObjectives: currentChapter.keyObjectives,
        activeChapterConcepts: currentChapter.concepts,
        activeChapterContent: currentChapter.contentMarkdown,
        activeChapterPracticeQuestions: chapterPracticeQuestions,
        pagesReadInChapter: [],
        lastReadPageNumber: currentChapter.pageStart || 1,
      }
    );

    if (!result.success) {
      setModalError(result.message || 'Session validation failed');
    } else {
      setIsModalOpen(false);
    }
  };

  // Ask Socratic Mentor about this page
  const handleSendMentorQuery = async (queryText?: string) => {
    const textToSend = (queryText || mentorInput).trim();
    if (!textToSend || isMentorReplying) return;

    setMentorInput('');
    const newMsgs = [...mentorMessages, { role: 'user' as const, text: textToSend }];
    setMentorMessages(newMsgs);
    setIsMentorReplying(true);

    try {
      const pageContext = `Textbook: "${currentModule.title}". Subject: "${currentSubject.name}". Chapter ${currentChapter.chapterNumber}: "${currentChapter.title}". Page: ${currentGlobalPageNumber}. Sub-section: "${activeSubPage?.subTitle || currentChapter.title}".
Textbook Page Content: """${activeSubPage?.contentMarkdown || currentChapter.contentMarkdown.slice(0, 800)}"""
Formulas on page: ${currentChapter.formulas.join(', ') || 'N/A'}.
Student Query: "${textToSend}".
Rule: STRICT SOCRATIC MENTORING. NEVER REVEAL THE DIRECT NUMERICAL ANSWER OR EXAM MULTIPLE-CHOICE LETTER. TEACH BY ASKING A GUIDING QUESTION, DRAWING AN AFRICAN REAL-WORLD ANALOGY, AND BREAKING DOWN THE LOGIC STEP BY STEP.`;

      const res = await fetch('/api/socratic-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: pageContext,
          country: profile.country,
          gradeLevel: profile.gradeLevel,
          subject: currentSubject.name,
        }),
      });

      const data = await res.json();
      setMentorMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.response || 'Think carefully about the foundational principle here...',
        },
      ]);

      // Automatically register to Struggle Graph if student asks for help
      if (currentChapter.concepts.length > 0) {
        addOrUpdateStruggleNode(
          currentChapter.concepts[0],
          currentChapter.title,
          currentSubject.name,
          textToSend
        );
      }
    } catch (err) {
      console.error(err);
      setMentorMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'What is the very first piece of information given in this chapter problem? Let us break down the governing equation step by step.',
        },
      ]);
    } finally {
      setIsMentorReplying(false);
    }
  };

  // Font size class mapping
  const fontSizeClass = fontSizeLevel === 0 ? 'text-xs' : fontSizeLevel === 2 ? 'text-base' : 'text-sm';

  // Theme styling mapping
  const themeStyles = {
    dark: 'bg-stone-900 text-stone-200 border-stone-800',
    sepia: 'bg-[#FBF0D9] text-[#433422] border-[#E8D7B8]',
    light: 'bg-white text-stone-900 border-stone-200',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-4">
      {/* Top Banner: Dual Study Mode Option with National Branding */}
      <div className={`rounded-2xl border border-stone-800 bg-gradient-to-r ${branding.bannerGradient} p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4`}>
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/20 flex items-center justify-center shrink-0 shadow">
            <BookOpen className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-base">{branding.flag}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                {branding.ministryName}
              </span>
              <span className="text-stone-400">·</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-emerald-300 border border-emerald-500/40">
                {currentModule.totalPages || 384} Pages • {currentModule.chapters.length} Chapters
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-extrabold text-white">
              {currentModule.title}
            </h1>
            <p className="text-[11px] text-stone-300">
              Government-approved curriculum volume for {branding.shortName} ({profile.curriculumCode}). Verified by {branding.boardName}.
            </p>
          </div>
        </div>

        {/* Dual Option Switcher Action: Option for Books or Picture */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsLibraryOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Browse all grade textbooks"
          >
            <Library className="w-4 h-4 text-amber-400" />
            <span>Switch Textbook</span>
          </button>

          {/* Picture / Snapshot Alternative Option */}
          <button
            onClick={() => navigateTo('MULTIMODAL_OCR')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-orange-950/40 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
            title="Prefer using your own paper textbook, workbook, or handwritten notebook? Snap a photo and study with your mentor!"
          >
            <Camera className="w-4 h-4" />
            <span>Option 2: Snap Paper Book (Picture)</span>
          </button>
        </div>
      </div>

      {/* Reader Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900 border border-stone-800 rounded-2xl p-3 shadow-md">
        {/* Navigation & Subject Switcher Dropdown */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('DASHBOARD')}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
            title="Back to Academic Dashboard"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-amber-400 font-mono bg-stone-800 px-2 py-0.5 rounded border border-stone-700">
                {currentSubject.code}
              </span>
              <span className="text-[11px] text-stone-400 truncate max-w-xs sm:max-w-md hidden sm:inline">
                {currentModule.publisher}
              </span>
            </div>

            {/* Quick Subject Switcher Selector */}
            <div className="flex items-center gap-2">
              <select
                value={currentSubject.id}
                onChange={(e) => {
                  setSelectedSubjectId(e.target.value);
                }}
                className="bg-stone-800 border border-stone-700 hover:border-amber-500/60 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer max-w-xs sm:max-w-md truncate"
                title="Switch textbook subject"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Center: Real Page Navigation Bar */}
        <div className="flex items-center gap-2 bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800">
          <button
            onClick={handlePrevPage}
            className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer disabled:opacity-40"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-amber-400 font-bold px-1">
            Page {currentGlobalPageNumber} of {currentModule.totalPages || 384}
          </span>

          <button
            onClick={handleNextPage}
            className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer disabled:opacity-40"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Jump to page form */}
          <form onSubmit={handleJumpToPage} className="flex items-center gap-1 pl-2 border-l border-stone-800">
            <input
              type="number"
              min="1"
              max={currentModule.totalPages || 384}
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              placeholder="Jump"
              className="w-14 px-2 py-0.5 bg-stone-900 border border-stone-700 rounded text-center text-xs font-mono text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-[11px] text-stone-300 font-semibold cursor-pointer"
            >
              Go
            </button>
          </form>
        </div>

        {/* View Controls: View Mode Toggle, Socratic Mentor Toggle, Theme, Font Size */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Toggle: Interactive Study vs PDF Book Page Mode */}
          <div className="flex items-center bg-stone-800 p-1 rounded-xl border border-stone-700 text-xs">
            <button
              onClick={() => setReaderViewMode('STUDY')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                readerViewMode === 'STUDY'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>Study Mode</span>
            </button>
            <button
              onClick={() => setReaderViewMode('PDF_PAGE')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                readerViewMode === 'PDF_PAGE'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>PDF Book View</span>
            </button>
          </div>

          {/* Socratic Mentor Toggle Button */}
          <button
            onClick={() => setIsMentorOpen(!isMentorOpen)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isMentorOpen
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow'
                : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-stone-200'
            }`}
            title="Toggle in-reader Socratic mentor assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Mentor Guide</span>
          </button>

          {/* Theme switcher */}
          <div className="flex items-center bg-stone-800 p-1 rounded-xl border border-stone-700 text-xs">
            <button
              onClick={() => setThemeMode('dark')}
              className={`p-1.5 rounded-lg cursor-pointer ${themeMode === 'dark' ? 'bg-stone-900 text-amber-400' : 'text-stone-400'}`}
              title="Night Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setThemeMode('sepia')}
              className={`p-1.5 rounded-lg cursor-pointer ${themeMode === 'sepia' ? 'bg-[#FBF0D9] text-amber-900 font-bold' : 'text-stone-400'}`}
              title="Sepia Mode"
            >
              <Coffee className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setThemeMode('light')}
              className={`p-1.5 rounded-lg cursor-pointer ${themeMode === 'light' ? 'bg-white text-stone-900 font-bold' : 'text-stone-400'}`}
              title="Day Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Font Zoom */}
          <div className="flex items-center bg-stone-800 p-1 rounded-xl border border-stone-700 text-xs">
            <button
              onClick={() => setFontSizeLevel((prev) => Math.max(0, prev - 1))}
              disabled={fontSizeLevel === 0}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 disabled:opacity-40 cursor-pointer"
              title="Decrease Font Size"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-mono text-[11px] text-stone-300">
              {fontSizeLevel === 0 ? 'S' : fontSizeLevel === 1 ? 'M' : 'L'}
            </span>
            <button
              onClick={() => setFontSizeLevel((prev) => Math.min(2, prev + 1))}
              disabled={fontSizeLevel === 2}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 disabled:opacity-40 cursor-pointer"
              title="Increase Font Size"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main E-Reader Reader Layout (Split with Chapter Sidebar, Content, and Mentor Assistant) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Full Table of Contents (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          {/* Active Book Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-md space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-12 h-16 rounded-xl bg-gradient-to-br ${currentModule.coverAccentColor || 'from-amber-600 to-orange-900'} border border-amber-400/40 flex flex-col justify-between p-2 shadow-md shrink-0`}
              >
                <AfricaLogo size={16} />
                <span className="text-[9px] font-mono text-amber-200 font-bold leading-none">
                  GR.{profile.gradeLevel}
                </span>
              </div>
              <div className="space-y-0.5 overflow-hidden">
                <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider font-mono">
                  {currentCountry.curriculumCode}
                </div>
                <h2 className="text-xs font-bold text-white truncate" title={currentModule.title}>
                  {currentModule.title}
                </h2>
                <div className="text-[10px] text-stone-400 truncate">
                  {currentModule.totalPages || 384} Pages • {currentModule.chapters.length} Chapters
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-[10px] text-stone-400 space-y-1">
              <div className="flex justify-between">
                <span>Accreditation:</span>
                <span className="font-semibold text-stone-300">{currentCountry.curriculumCode}</span>
              </div>
              <div className="flex justify-between">
                <span>ISBN:</span>
                <span className="font-mono text-stone-400">{currentModule.isbn || '978-0-OER-2024'}</span>
              </div>
              <div className="flex justify-between">
                <span>Access:</span>
                <span className="text-emerald-400 font-semibold">100% Free Open OER</span>
              </div>
            </div>
          </div>

          {/* Full Table of Contents List */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-md space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="font-semibold uppercase tracking-wider text-stone-300 text-[11px] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Curriculum Chapters ({currentModule.chapters.length})</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Full Year Syllabus</span>
            </div>

            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {currentModule.chapters.map((ch) => {
                const isSelected = ch.id === currentChapter.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setSelectedChapterId(ch.id);
                      setActiveSubPageIndex(0);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all border text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/70 border-amber-500/80 text-white font-medium shadow-sm'
                        : 'bg-stone-800/40 border-stone-800 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-amber-400/90 font-mono mb-0.5">
                      <span>Chapter {ch.chapterNumber}</span>
                      <span>pp. {ch.pageStart || 1}–{ch.pageEnd || 40}</span>
                    </div>
                    <div className="leading-snug line-clamp-2">{ch.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Syllabus Objectives Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-md space-y-2 text-xs">
            <div className="font-semibold text-stone-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chapter Outcomes</span>
            </div>
            <ul className="space-y-1.5 text-stone-400 text-[11px] list-disc list-inside">
              {currentChapter.keyObjectives.map((obj, i) => (
                <li key={i} className="leading-relaxed">
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center / Reading Pane (5 or 6 cols depending on mentor panel) */}
        <div className={isMentorOpen ? 'lg:col-span-5 space-y-3' : 'lg:col-span-9 space-y-3'}>
          {/* Chapter Sub-page Tabs: Theory, Proofs, Worked Examples, African Case Studies, Past Exam Practice */}
          {subPages.length > 0 && (
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-stone-900 p-1.5 rounded-2xl border border-stone-800 text-xs">
              {subPages.map((page, pIdx) => {
                const isSelected = pIdx === activeSubPageIndex;
                return (
                  <button
                    key={pIdx}
                    onClick={() => setActiveSubPageIndex(pIdx)}
                    className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-sm font-bold'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                    }`}
                  >
                    <BookMarked className="w-3 h-3" />
                    <span>p. {page.pageNumber}: {page.subTitle.split(' ').slice(1, 4).join(' ')}</span>
                  </button>
                );
              })}
            </div>
          )}

          {readerViewMode === 'PDF_PAGE' ? (
            /* =========================================================
               AUTHENTIC DIGITAL PDF BOOK PAGE VIEW
               ========================================================= */
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
              {/* PDF Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800 text-rose-300 font-mono text-[10px] font-bold">
                    PDF E-BOOK
                  </span>
                  <span className="font-semibold text-stone-200 text-xs truncate max-w-xs">
                    {currentModule.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-stone-400">
                    Page {currentGlobalPageNumber} of {currentModule.totalPages || 384}
                  </span>
                  <button
                    onClick={() => setPdfZoom((prev) => Math.max(80, prev - 10))}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] text-amber-400">{pdfZoom}%</span>
                  <button
                    onClick={() => setPdfZoom((prev) => Math.min(130, prev + 10))}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Simulated Printed Textbook Page */}
              <div
                className="mx-auto max-w-3xl bg-white text-stone-900 rounded-lg shadow-2xl p-6 sm:p-10 border border-stone-300 transition-all font-serif min-h-[640px] flex flex-col justify-between"
                style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top center' }}
              >
                <div>
                  {/* Header of printed page */}
                  <div className="flex items-center justify-between border-b-2 border-stone-800 pb-2 mb-4 text-[10px] font-sans uppercase tracking-widest text-stone-600">
                    <span className="font-bold flex items-center gap-1.5">
                      <span>{branding.flag} {branding.countryName} • {branding.ministryName}</span>
                    </span>
                    <span className="font-mono">
                      Chapter {currentChapter.chapterNumber} • {currentSubject.code} • Page {currentGlobalPageNumber}
                    </span>
                  </div>

                  {/* Section Title */}
                  <div className="mb-4">
                    <div className="text-[10px] uppercase tracking-wider font-sans font-bold text-amber-800 mb-0.5">
                      Chapter {currentChapter.chapterNumber} • {currentChapter.title}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 border-b border-stone-200 pb-2">
                      {activeSubPage?.subTitle || currentChapter.title}
                    </h2>
                  </div>

                  {/* Page Text & Markdown */}
                  <div className="text-xs sm:text-sm leading-relaxed space-y-3 text-stone-800 font-sans">
                    {(activeSubPage?.contentMarkdown || currentChapter.contentMarkdown)
                      .split('\n\n')
                      .map((paragraph, index) => {
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h3 key={index} className="text-sm sm:text-base font-bold text-stone-900 pt-2 border-b border-stone-200 pb-1">
                              {paragraph.replace('### ', '')}
                            </h3>
                          );
                        }
                        if (paragraph.startsWith('#### ')) {
                          return (
                            <h4 key={index} className="text-xs sm:text-sm font-bold text-stone-800 pt-1.5">
                              {paragraph.replace('#### ', '')}
                            </h4>
                          );
                        }
                        if (paragraph.startsWith('$$') && paragraph.endsWith('$$')) {
                          return (
                            <div
                              key={index}
                              className="p-2.5 my-2 rounded bg-amber-50/90 border border-amber-300 text-amber-950 font-mono text-center text-xs font-bold"
                            >
                              {paragraph.replaceAll('$$', '')}
                            </div>
                          );
                        }
                        if (paragraph.startsWith('> ')) {
                          return (
                            <blockquote
                              key={index}
                              className="p-3 my-2 rounded bg-stone-100 border-l-4 border-amber-600 text-stone-800 text-xs italic"
                            >
                              {paragraph.replace('> ', '')}
                            </blockquote>
                          );
                        }
                        return (
                          <p key={index} className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                            {paragraph}
                          </p>
                        );
                      })}
                  </div>
                </div>

                {/* Footer of printed page */}
                <div className="pt-4 mt-6 border-t border-stone-300 flex items-center justify-between text-[10px] font-sans text-stone-500">
                  <span>{currentModule.publisher}</span>
                  <span className="font-mono font-bold text-stone-900">
                    Page {currentGlobalPageNumber} of {currentModule.totalPages || 384}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================
               INTERACTIVE STUDY READER MODE
               ========================================================= */
            <div
              className={`rounded-2xl border p-5 sm:p-7 shadow-xl transition-colors min-h-[580px] flex flex-col justify-between ${themeStyles[themeMode]}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-current/10 mb-4 text-xs">
                  <span className="font-mono opacity-70">
                    Chapter {currentChapter.chapterNumber} • {currentSubject.name}
                  </span>
                  <span className="font-medium opacity-80 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Page {currentGlobalPageNumber} of {currentModule.totalPages || 384}</span>
                  </span>
                </div>

                {/* Sub-page Title */}
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight mb-3 text-amber-400">
                  {activeSubPage?.subTitle || currentChapter.title}
                </h1>

                {/* Formula Ribbon */}
                {currentChapter.formulas.length > 0 && (
                  <div className="my-4 p-3.5 rounded-xl bg-black/25 border border-current/15">
                    <div className="text-[10px] uppercase tracking-wider font-semibold opacity-75 mb-1.5 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Governing Curricular Formulae:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 font-mono text-xs">
                      {currentChapter.formulas.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-black/30 border border-current/20 text-amber-400 font-semibold"
                        >
                          ${f}$
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cultural Context Box if present */}
                {activeSubPage?.culturalContextBox && (
                  <div className="my-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <AfricaLogo size={16} />
                      <span>{activeSubPage.culturalContextBox.title}</span>
                    </div>
                    <p className="opacity-90 leading-relaxed text-[11px]">
                      {activeSubPage.culturalContextBox.body}
                    </p>
                  </div>
                )}

                {/* Markdown Structured Content */}
                <div className={`prose prose-invert max-w-none space-y-3 leading-relaxed ${fontSizeClass}`}>
                  {(activeSubPage?.contentMarkdown || currentChapter.contentMarkdown)
                    .split('\n\n')
                    .map((paragraph, index) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={index} className="text-sm sm:text-base font-bold text-amber-400 pt-2 border-b border-current/10 pb-1">
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('#### ')) {
                        return (
                          <h4 key={index} className="text-xs sm:text-sm font-semibold text-stone-200 pt-1.5">
                            {paragraph.replace('#### ', '')}
                          </h4>
                        );
                      }
                      if (paragraph.startsWith('$$') && paragraph.endsWith('$$')) {
                        return (
                          <div
                            key={index}
                            className="p-2.5 my-2 rounded-lg bg-black/40 border border-amber-500/30 text-amber-300 font-mono text-center text-xs font-semibold"
                          >
                            {paragraph.replaceAll('$$', '')}
                          </div>
                        );
                      }
                      if (paragraph.startsWith('> ')) {
                        return (
                          <blockquote
                            key={index}
                            className="p-3 my-2 rounded-xl bg-black/30 border-l-4 border-amber-500 text-xs italic opacity-95"
                          >
                            {paragraph.replace('> ', '')}
                          </blockquote>
                        );
                      }
                      return (
                        <p key={index} className="opacity-90 text-xs sm:text-sm">
                          {paragraph}
                        </p>
                      );
                    })}
                </div>
              </div>

              {/* Bottom Quick Page Actions */}
              <div className="mt-6 pt-4 border-t border-current/15 flex items-center justify-between text-xs">
                <button
                  onClick={handlePrevPage}
                  className="px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/40 border border-current/20 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Deep Study Focus Kiosk</span>
                </button>

                <button
                  onClick={handleNextPage}
                  className="px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/40 border border-current/20 flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: In-Reader Socratic Academic Mentor Panel (4 cols) */}
        {isMentorOpen && (
          <div className="lg:col-span-4 bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between h-full min-h-[600px]">
            <div className="space-y-3">
              {/* Mentor Header: Human Verified Teacher */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center font-bold text-xs text-emerald-300 shrink-0">
                    {profile.country === 'ZW' ? 'ZM' : profile.country === 'ZA' ? 'SA' : 'ED'}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{profile.country === 'ZW' ? 'Mr. Moyo / Mrs. Sibanda' : profile.country === 'ZA' ? 'Mrs. Dlamini / Mr. Van der Merwe' : 'Academic Socratic Mentor'}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-sans">Verified Teacher</span>
                    </h3>
                    <p className="text-[10px] text-stone-400">
                      {branding.shortName} • Page {currentGlobalPageNumber} Academic TA
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMentorOpen(false)}
                  className="text-stone-500 hover:text-stone-300 text-xs p-1"
                  title="Close mentor drawer"
                >
                  ✕
                </button>
              </div>

              {/* Socratic Pedagogy Badge */}
              <div className="p-2.5 rounded-xl bg-stone-950 border border-amber-500/30 text-[11px] text-stone-300 space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Direct Answer Block Active:</span>
                </div>
                <p className="text-[10px] text-stone-400 leading-snug">
                  I guide you step-by-step with African analogies. I will never hand you direct answers, so you master the material!
                </p>
              </div>

              {/* Quick Inquiry Chips */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                  Quick Page Prompts:
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => handleSendMentorQuery('Can you guide me through the worked example on this page step-by-step?')}
                    className="w-full text-left p-2 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 text-[11px] text-stone-300 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>🤔 Walk me through this worked example</span>
                    <ArrowRight className="w-3 h-3 text-amber-400 shrink-0" />
                  </button>

                  <button
                    onClick={() => handleSendMentorQuery('Explain the core formula on this page using a practical African real-life analogy.')}
                    className="w-full text-left p-2 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 text-[11px] text-stone-300 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>💡 Explain formula with a real African analogy</span>
                    <ArrowRight className="w-3 h-3 text-amber-400 shrink-0" />
                  </button>

                  <button
                    onClick={() => handleSendMentorQuery('Ask me a challenging question to test my understanding of this page.')}
                    className="w-full text-left p-2 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 text-[11px] text-stone-300 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>✍️ Test my understanding with a question</span>
                    <ArrowRight className="w-3 h-3 text-amber-400 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Chat Messages Stream */}
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {mentorMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      msg.role === 'assistant'
                        ? 'bg-stone-950 border border-stone-800 text-stone-200'
                        : 'bg-amber-950/70 border border-amber-500/40 text-amber-100 ml-4'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold text-amber-400 mb-1">
                      {msg.role === 'assistant' ? 'SomaAfrika Socratic Mentor' : `${profile.firstName}`}
                    </div>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                ))}
                {isMentorReplying && (
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-amber-400 flex items-center gap-2 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Your mentor is formulating Socratic guiding questions...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMentorQuery();
              }}
              className="mt-3 pt-3 border-t border-stone-800 flex gap-2"
            >
              <input
                type="text"
                value={mentorInput}
                onChange={(e) => setMentorInput(e.target.value)}
                placeholder={`Ask mentor about page ${currentGlobalPageNumber}...`}
                className="flex-1 px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={!mentorInput.trim() || isMentorReplying}
                className="p-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white cursor-pointer transition-colors"
                title="Send query to mentor"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Bookshelf / Open Curriculum Library Modal */}
      {isLibraryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-5 text-stone-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <AfricaLogo size={36} />
                <div>
                  <h3 className="font-bold text-base text-white">
                    {currentCountry.name} (Grade {profile.gradeLevel}) Curriculum Textbooks
                  </h3>
                  <p className="text-xs text-stone-400">
                    Comprehensive 100-500+ Page Open Educational Resources • Free for African Students
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLibraryOpen(false)}
                className="text-stone-400 hover:text-white p-2 rounded-lg bg-stone-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pr-2 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {subjects.map((subj) => {
                  const mod = getTextbookModule(subj.id, subj, profile.country, profile.gradeLevel);
                  const isCurrent = subj.id === currentSubject.id;
                  return (
                    <div
                      key={subj.id}
                      onClick={() => {
                        setSelectedSubjectId(subj.id);
                        setIsLibraryOpen(false);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                        isCurrent
                          ? 'bg-amber-950/60 border-amber-500 shadow-md'
                          : 'bg-stone-950 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                      }`}
                    >
                      <div
                        className={`w-12 h-18 rounded-lg bg-gradient-to-br ${mod.coverAccentColor || 'from-amber-600 to-orange-900'} border border-amber-400/30 flex flex-col justify-between p-1.5 shrink-0 shadow`}
                      >
                        <AfricaLogo size={14} />
                        <span className="text-[8px] font-mono text-amber-200 font-bold leading-none">
                          GR.{profile.gradeLevel}
                        </span>
                      </div>
                      <div className="space-y-1 overflow-hidden">
                        <div className="text-[10px] text-amber-400 font-mono font-bold uppercase">
                          {subj.code}
                        </div>
                        <h4 className="text-xs font-bold text-white truncate" title={subj.name}>
                          {subj.name}
                        </h4>
                        <div className="text-[10px] text-stone-400">
                          {mod.totalPages || 384} Pages • {mod.chapters.length} Chapters
                        </div>
                        <div className="flex items-center gap-1.5 pt-1 text-[10px] text-emerald-400 font-medium">
                          <CheckCircle className="w-3 h-3" />
                          <span>Open Free Textbook</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Modal Switch to Picture Mode */}
            <div className="pt-3 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
              <span>Have a physical paper textbook or handwritten notebook?</span>
              <button
                onClick={() => {
                  setIsLibraryOpen(false);
                  navigateTo('MULTIMODAL_OCR');
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold cursor-pointer transition-all flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>Snap Paper Book with Camera</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Deep Study Session Setup with 18m - 120m rules */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-stone-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-950 border border-orange-500/40 text-orange-400 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Configure Deep Study Kiosk</h3>
                  <p className="text-[11px] text-stone-400">Strict hardware distraction lockdown</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-200 text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Operational Boundaries Explanation */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                <Info className="w-3.5 h-3.5" />
                <span>Flow State & Burnout Boundaries:</span>
              </div>
              <p className="text-stone-400 text-[11px] leading-relaxed">
                • <strong>Minimum 18m:</strong> Scientific minimum threshold required to enter deep cognitive focus.
                <br />
                • <strong>Maximum 120m:</strong> Burnout prevention ceiling. After 2 hours, cognitive retention drops sharply.
                <br />
                • <strong>Exit-Gate Quiz:</strong> App cannot simply be closed when time elapses; passing the 75% quiz unlocks your device!
              </p>
            </div>

            {/* Slider Duration Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-stone-300">Planned Duration:</span>
                <span className="text-base font-extrabold text-amber-400 font-mono">
                  {sessionMinutes} Minutes
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="120"
                step="1"
                value={sessionMinutes}
                onChange={(e) => setSessionMinutes(Number(e.target.value))}
                className="w-full accent-amber-500 bg-stone-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>18m (Min Flow)</span>
                <span>45m</span>
                <span>60m (Recommended)</span>
                <span>90m</span>
                <span>120m (Burnout Cap)</span>
              </div>
            </div>

            {/* Topic Verification */}
            <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700/60 text-xs space-y-1">
              <div className="text-[10px] uppercase font-semibold text-stone-400">Focus Topic:</div>
              <div className="font-bold text-stone-200">{currentChapter.title}</div>
              <div className="text-[11px] text-amber-400">
                {currentSubject.name} • pp. {currentChapter.pageStart || 1}–{currentChapter.pageEnd || 384}
              </div>
            </div>

            {/* Error banner if triggered */}
            {modalError && (
              <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Confirm Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLaunchDeepStudy}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-orange-950/40 flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Engage Focus Kiosk</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
