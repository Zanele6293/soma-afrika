import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getTextbookModule } from '../data/curriculumData';
import { AfricaLogo } from './AfricaLogo';
import {
  Lock,
  MessageSquare,
  Camera,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Upload,
  Image as ImageIcon,
  Loader2,
  FileText,
  CheckCircle2,
  AlertOctagon,
  Clock,
  Maximize2,
  Minimize2,
  Send,
  Sparkles,
  ShieldAlert,
  ChevronUp,
  X,
  Volume2,
} from 'lucide-react';

export const Screen04FocusKiosk: React.FC = () => {
  const {
    studySession,
    extendStudySession,
    updateStudySession,
    completeStudySession,
    terminateStudySessionEmergency,
    startStudySession,
    profile,
    subjects,
    addOrUpdateStruggleNode,
    isOfflineMode,
  } = useApp();

  // Fullscreen kiosk simulation
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [isSocraticDrawerOpen, setIsSocraticDrawerOpen] = useState(false);
  const [studySurface, setStudySurface] = useState<'TEXTBOOK' | 'MY_WORK'>('TEXTBOOK');
  const [readerPageIndex, setReaderPageIndex] = useState(0);
  const [readerChapterIndex, setReaderChapterIndex] = useState(0);
  const [workImage, setWorkImage] = useState<string | null>(studySession?.capturedImageUrl || null);
  const [workText, setWorkText] = useState(studySession?.capturedTextSnippet || '');
  const [isAnalyzingWork, setIsAnalyzingWork] = useState(false);
  const [workError, setWorkError] = useState<string | null>(null);

  useEffect(() => {
    const topic = studySession?.topicTitle;
    const chapters = subjects.find((s) => s.name === studySession?.subjectName)
      ? getTextbookModule(
          subjects.find((s) => s.name === studySession?.subjectName)!.id,
          subjects.find((s) => s.name === studySession?.subjectName)!,
          profile.country,
          profile.gradeLevel
        ).chapters
      : [];
    const index = chapters.findIndex((chapter) => chapter.title === topic);
    setReaderChapterIndex(index >= 0 ? index : 0);
    setReaderPageIndex(0);
  }, [studySession?.topicTitle, studySession?.subjectName, profile.country, profile.gradeLevel, subjects]);

  // Socratic Drawer Chat state
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: 'user' | 'assistant'; text: string; timestamp: string }>
  >([
    {
      role: 'assistant',
      text: `Hello ${profile.firstName}! I am your SomaAfrika Socratic Mentor. Remember our golden rule: I will never hand you direct shortcuts or final answers. Ask me anything, and we will reason through the stepping stones together!`,
      timestamp: 'Session start',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // If no session active, provide quick launch
  if (!studySession || studySession.state === 'IDLE') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-stone-900 border border-stone-800 text-amber-500 mx-auto flex items-center justify-center text-2xl shadow-xl">
          🔒
        </div>
        <h2 className="text-xl font-bold text-white">Focus Kiosk Inactive</h2>
        <p className="text-stone-400 text-xs max-w-md mx-auto">
          Start a Deep Study block from the E-Reader to engage hardware kiosk lockdown, or initialize a quick 25-minute focus session right now.
        </p>
        <button
          onClick={() =>
            startStudySession(
              25,
              'Conservation of Mechanical Energy in Isolated Systems',
              'Physical Sciences'
            )
          }
          className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-lg transition-all"
        >
          Initialize 25m Focus Kiosk
        </button>
      </div>
    );
  }

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(
    100,
    Math.max(
      0,
      ((studySession.plannedDurationMin * 60 - studySession.remainingSeconds) /
        (studySession.plannedDurationMin * 60)) *
        100
    )
  );

  const currentSubject = subjects.find((s) => s.name === studySession.subjectName) || subjects[0];
  const currentModule = currentSubject
    ? getTextbookModule(currentSubject.id, currentSubject, profile.country, profile.gradeLevel)
    : null;
  const matchedChapter = currentModule?.chapters.find((chapter) => chapter.title === studySession.topicTitle) || currentModule?.chapters[0];
  const readerChapter = currentModule?.chapters[readerChapterIndex] || matchedChapter;
  const readerPages = readerChapter?.pages || [];
  const readerPage = readerPages[readerPageIndex] || readerPages[0];
  const totalReaderPages = readerPages.length || 1;

  const syncChapterStudyContext = (chapter: typeof readerChapter, pageIndex: number) => {
    if (!chapter) return;
    const page = chapter.pages?.[pageIndex];
    const practiceQuestions = (chapter.pages || []).flatMap((p) => p.exerciseQuestions || []);
    const priorPages = studySession.pagesReadInChapter || [];
    const nextPages = page ? Array.from(new Set([...priorPages, page.pageNumber])).sort((a, b) => a - b) : priorPages;

    updateStudySession({
      topicTitle: chapter.title,
      pagesStudied: `Chapter ${chapter.chapterNumber} · pp. ${chapter.pageStart || 1}–${chapter.pageEnd || 384}`,
      keyObjectives: chapter.keyObjectives,
      conceptsStudied: chapter.concepts,
      activeChapterId: chapter.id,
      activeChapterNumber: chapter.chapterNumber,
      activeChapterTitle: chapter.title,
      activeChapterObjectives: chapter.keyObjectives,
      activeChapterConcepts: chapter.concepts,
      activeChapterContent: chapter.contentMarkdown,
      activeChapterPracticeQuestions: practiceQuestions,
      pagesReadInChapter: nextPages,
      lastReadPageNumber: page?.pageNumber,
      activeReadingHistory: Array.from(new Set([...(studySession.activeReadingHistory || []), chapter.title])),
      readingNotes: chapter.contentMarkdown,
      exitQuizPassed: false,
    });
  };

  const compressImage = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const maxSize = 1600;
          const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Could not prepare image'));
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.78));
        };
        img.onerror = () => reject(new Error('Could not read image'));
        img.src = reader.result as string;
      };
      reader.onerror = () => reject(new Error('Could not load file'));
      reader.readAsDataURL(file);
    });

  const handleWorkPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setWorkError(null);
    setIsAnalyzingWork(true);
    try {
      const compressed = await compressImage(file);
      setWorkImage(compressed);
      updateStudySession({
        sourceType: 'PHYSICAL_SNAPSHOT_CAPTURE',
        capturedImageUrl: compressed,
        capturedTextSnippet: '',
        readingNotes: `Student is working from a photo captured during the focus session for ${studySession.topicTitle}.`,
      });

      const response = await fetch('/api/ocr-vision-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: compressed,
          subject: studySession.subjectName,
          curriculumCode: profile.curriculumCode,
          gradeLevel: profile.gradeLevel,
        }),
      });
      const data = await response.json();
      const extracted = data.extraction?.extractedText || '';
      setWorkText(extracted);
      updateStudySession({
        capturedTextSnippet: extracted,
        readingNotes: extracted || `Student is working from a photo captured during the focus session for ${studySession.topicTitle}.`,
      });
      if (data.extraction?.conceptLabel && data.extraction?.syllabusTopic) {
        addOrUpdateStruggleNode(
          data.extraction.conceptLabel,
          data.extraction.syllabusTopic,
          studySession.subjectName,
          extracted || 'Student uploaded a study-work image.'
        );
      }
    } catch (error) {
      console.error(error);
      setWorkError('The picture was saved, but the study analyzer could not read it right now. You can still work from the image.');
    } finally {
      setIsAnalyzingWork(false);
      e.target.value = '';
    }
  };

  const toggleFullscreenKiosk = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim() || isGenerating) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    const newMsgs = [
      ...chatMessages,
      {
        role: 'user' as const,
        text: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setChatMessages(newMsgs);
    setIsGenerating(true);

    try {
      const chapterContent = studySession.activeChapterContent || readerChapter?.contentMarkdown || studySession.readingNotes || '';
      const currentPageContent = readerPage?.contentMarkdown || '';
      const mentorContext = [
        `Chapter: ${studySession.activeChapterTitle || studySession.topicTitle}`,
        `Subject: ${studySession.subjectName}`,
        `Learning objectives: ${(studySession.activeChapterObjectives || studySession.keyObjectives || []).join(' | ')}`,
        `Concepts: ${(studySession.activeChapterConcepts || studySession.conceptsStudied || []).join(' | ')}`,
        `Current page: ${readerPage?.pageNumber || studySession.lastReadPageNumber || 'not recorded'}`,
        `Current page material:
${currentPageContent}`,
        `Chapter material:
${chapterContent}`.slice(0, 22000),
        workText || studySession.capturedTextSnippet ? `Student uploaded work / OCR:
${workText || studySession.capturedTextSnippet}` : '',
      ].filter(Boolean).join('\n\n');

      const response = await fetch('/api/socratic-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: chatMessages.slice(-8),
          context: mentorContext,
          country: profile.country,
          gradeLevel: profile.gradeLevel,
          subject: studySession.subjectName,
        }),
      });

      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.response || 'Let us break this down into the very first step...',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      // If student asked about friction or esterification, log to Struggle Graph
      if (
        userText.toLowerCase().includes('why') ||
        userText.toLowerCase().includes('confused') ||
        userText.toLowerCase().includes('struggle') ||
        userText.toLowerCase().includes('how do i')
      ) {
        addOrUpdateStruggleNode(
          'phys_mechanics_energy_work',
          'Mechanical Energy & Work-Energy Conservation',
          studySession.subjectName,
          userText
        );
      }
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Let us step back: Before applying the full formula, what is the single most basic law of conservation at play here?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] bg-stone-950 text-stone-100 flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Top Kiosk Hardware Bar */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-950 border border-orange-500/60 text-orange-400 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                Deep Kiosk Engaged
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
                Min 18m | Max 120m Rules Active
              </span>
            </div>
            <div className="text-sm font-semibold text-white truncate max-w-sm sm:max-w-md">
              {studySession.topicTitle}
            </div>
          </div>
        </div>

        {/* Live Timer Pill */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-stone-950 border border-orange-500/40 text-center font-mono shadow-inner">
            <div className="text-[10px] text-stone-500 uppercase tracking-wider font-sans">
              Time Remaining
            </div>
            <div className="text-2xl sm:text-3xl font-black text-orange-400 tracking-tight">
              {formatTimer(studySession.remainingSeconds)}
            </div>
          </div>

          {/* Fullscreen Kiosk toggle */}
          <button
            onClick={toggleFullscreenKiosk}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title="Toggle Device Fullscreen Kiosk"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress Bar of Cognitive Deep Flow */}
      <div className="my-3 space-y-1">
        <div className="flex items-center justify-between text-[11px] text-stone-400">
          <span>Flow Progress: {Math.round(progressPercent)}%</span>
          <span>Target: {studySession.plannedDurationMin} mins total</span>
        </div>
        <div className="w-full bg-stone-900 h-2.5 rounded-full overflow-hidden border border-stone-800">
          <div
            className="bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-500 h-full transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Center Study Sanctuary */}
      <div className="flex-1 bg-stone-900/60 border border-stone-800/80 rounded-2xl p-4 sm:p-6 flex flex-col my-2 shadow-inner min-h-[520px]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>Focus Kiosk stays active</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">Learn first. Prove understanding second.</h1>
            <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Read the exact chapter you selected, work from a photo when you need it, and ask the mentor to teach or simplify concepts. When you finish, SomaAfrika generates a chapter-specific mastery quiz before the session can unlock.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-950 border border-stone-800 shrink-0">
            <button
              onClick={() => setStudySurface('TEXTBOOK')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${studySurface === 'TEXTBOOK' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'}`}
            >
              <BookOpen className="w-4 h-4" />
              Read Textbook
            </button>
            <button
              onClick={() => setStudySurface('MY_WORK')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${studySurface === 'MY_WORK' ? 'bg-orange-600 text-white' : 'text-stone-400 hover:text-white'}`}
            >
              <Camera className="w-4 h-4" />
              My Work / Picture
            </button>
          </div>
        </div>

        {studySurface === 'TEXTBOOK' ? (
          <div className="flex-1 rounded-2xl border border-stone-800 bg-stone-950 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-stone-800 bg-stone-900/90 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-amber-400">Digital Textbook · Focus Reading</div>
                <div className="text-sm font-bold text-white mt-0.5">{currentModule?.title || studySession.topicTitle}</div>
                <div className="text-[11px] text-stone-500">{currentModule?.publisher || 'Curriculum textbook'} · {studySession.subjectName}</div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={readerChapterIndex}
                  onChange={(e) => {
                    const nextChapterIndex = Number(e.target.value);
                    setReaderChapterIndex(nextChapterIndex);
                    setReaderPageIndex(0);
                    const nextChapter = currentModule?.chapters[nextChapterIndex];
                    if (nextChapter) syncChapterStudyContext(nextChapter, 0);
                  }}
                  className="max-w-[190px] bg-stone-800 border border-stone-700 rounded-lg px-2 py-1.5 text-[10px] text-stone-200 focus:outline-none focus:border-amber-500"
                  title="Choose textbook chapter"
                >
                  {(currentModule?.chapters || []).map((chapter, index) => (
                    <option key={chapter.id} value={index}>
                      Ch {chapter.chapterNumber}: {chapter.title}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    if (readerPageIndex > 0) {
                      const nextPageIndex = readerPageIndex - 1;
                      setReaderPageIndex(nextPageIndex);
                      syncChapterStudyContext(readerChapter, nextPageIndex);
                    } else if (readerChapterIndex > 0) {
                      const previousChapter = currentModule?.chapters[readerChapterIndex - 1];
                      const nextPageIndex = Math.max(0, (previousChapter?.pages?.length || 1) - 1);
                      setReaderChapterIndex((p) => p - 1);
                      setReaderPageIndex(nextPageIndex);
                      if (previousChapter) syncChapterStudyContext(previousChapter, nextPageIndex);
                    }
                  }}
                  disabled={readerPageIndex === 0 && readerChapterIndex === 0}
                  className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-stone-200"
                  title="Previous textbook page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono text-amber-400 min-w-20 text-center">
                  {readerPage ? `Page ${readerPage.pageNumber}` : `Chapter ${matchedChapter?.chapterNumber || 1}`}
                </span>
                <button
                  onClick={() => {
                    if (readerPageIndex < totalReaderPages - 1) {
                      const nextPageIndex = readerPageIndex + 1;
                      setReaderPageIndex(nextPageIndex);
                      syncChapterStudyContext(readerChapter, nextPageIndex);
                    } else if (currentModule && readerChapterIndex < currentModule.chapters.length - 1) {
                      const nextChapter = currentModule.chapters[readerChapterIndex + 1];
                      setReaderChapterIndex((p) => p + 1);
                      setReaderPageIndex(0);
                      if (nextChapter) syncChapterStudyContext(nextChapter, 0);
                    }
                  }}
                  disabled={readerPageIndex >= totalReaderPages - 1 && (!currentModule || readerChapterIndex >= currentModule.chapters.length - 1)}
                  className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-stone-200"
                  title="Next textbook page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="px-4 py-2.5 border-b border-stone-200 bg-amber-50 text-stone-800 flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-black text-amber-800">Understanding target</span>
              {(readerChapter?.keyObjectives || []).slice(0, 2).map((objective, i) => (
                <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white border border-amber-200 text-stone-700">{objective}</span>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#fdfbf7] text-stone-900">
              {readerPage ? (
                <article className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-amber-700 font-bold mb-3">
                    <FileText className="w-3.5 h-3.5" />
                    {readerChapter?.title}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold mb-4">{readerPage.subTitle}</h2>
                  <div className="prose prose-sm max-w-none whitespace-pre-wrap leading-7 text-stone-700">
                    {readerPage.contentMarkdown}
                  </div>
                  {readerPage.formulas && readerPage.formulas.length > 0 && (
                    <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
                      <div className="text-[10px] uppercase tracking-wider font-bold text-amber-800 mb-2">Key formulas</div>
                      <div className="space-y-1 font-mono text-sm text-stone-800">{readerPage.formulas.map((formula, i) => <div key={i}>{formula}</div>)}</div>
                    </div>
                  )}
                </article>
              ) : (
                <article className="max-w-3xl mx-auto">
                  <div className="text-[10px] uppercase tracking-wider text-amber-700 font-bold mb-3">Chapter reading</div>
                  <h2 className="text-xl sm:text-2xl font-extrabold mb-4">{readerChapter?.title || studySession.topicTitle}</h2>
                  <div className="whitespace-pre-wrap leading-7 text-stone-700">{matchedChapter?.contentMarkdown || studySession.readingNotes}</div>
                </article>
              )}
            </div>

            <div className="px-4 py-3 border-t border-stone-800 bg-stone-900 flex items-center justify-between text-[10px] text-stone-400">
              <span>Reading is allowed while the kiosk timer continues.</span>
              <span className="font-mono text-amber-400">{readerPageIndex + 1} / {totalReaderPages}</span>
            </div>
          </div>
        ) : (
          <div className="flex-1 grid lg:grid-cols-2 gap-4 min-h-0">
            <div className="rounded-2xl border border-stone-800 bg-stone-950 p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h2 className="font-bold text-white">Show your current work</h2>
                  <p className="text-[11px] text-stone-500">Notebook · textbook page · worksheet · exam question</p>
                </div>
              </div>

              <label className="flex-1 min-h-64 rounded-2xl border-2 border-dashed border-stone-700 hover:border-orange-500/60 bg-stone-900/60 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors overflow-hidden">
                {workImage ? (
                  <img src={workImage} alt="Student work" className="max-h-72 max-w-full object-contain rounded-xl" />
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 text-stone-600 mb-3" />
                    <span className="text-sm font-bold text-stone-200">Upload a picture</span>
                    <span className="text-[11px] text-stone-500 mt-1">Choose a photo from your device. It stays inside this focus session.</span>
                  </>
                )}
                <input type="file" accept="image/*" capture="environment" onChange={handleWorkPhoto} className="hidden" />
              </label>

              <div className="flex items-center justify-between gap-2 mt-3">
                <span className="text-[10px] text-stone-500">Tip: take a clear picture with the whole question visible.</span>
                <label className="px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  {workImage ? 'Change picture' : 'Choose picture'}
                  <input type="file" accept="image/*" capture="environment" onChange={handleWorkPhoto} className="hidden" />
                </label>
              </div>
              {isAnalyzingWork && <div className="mt-3 text-[11px] text-amber-300 flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Reading the picture with study vision…</div>}
              {workError && <div className="mt-3 text-[11px] text-rose-300 bg-rose-950/30 border border-rose-900/50 rounded-lg p-2.5">{workError}</div>}
            </div>

            <div className="rounded-2xl border border-stone-800 bg-stone-950 p-5 flex flex-col">
              <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 mb-2">What the mentor can use</div>
              <h2 className="text-lg font-extrabold text-white mb-2">Your working material</h2>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">The image can be used as the context for your Socratic mentor without leaving the kiosk.</p>
              <div className="flex-1 rounded-xl bg-stone-900 border border-stone-800 p-4 overflow-y-auto">
                {workText ? (
                  <>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-2">Detected text</div>
                    <p className="text-xs text-stone-300 whitespace-pre-wrap leading-relaxed">{workText}</p>
                  </>
                ) : (
                  <div className="h-full min-h-40 flex items-center justify-center text-center text-xs text-stone-600">
                    Upload your work and the detected question or notes will appear here.
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsSocraticDrawerOpen(true)}
                disabled={!workImage}
                className="mt-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Ask Mentor about this work
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Kiosk Control Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Option A: Extend timer in 15m increments */}
          <button
            onClick={() => extendStudySession(15)}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Extend (+15 min)</span>
          </button>

          {/* Option B: Complete Session -> Triggers Exit-Gate Quiz */}
          <button
            onClick={completeStudySession}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finish Chapter & Take Mastery Quiz</span>
          </button>

          {/* Emergency Override */}
          <button
            onClick={() => setShowEmergencyModal(true)}
            className="px-3 py-2.5 rounded-xl bg-stone-900 hover:bg-rose-950/50 border border-stone-800 hover:border-rose-800 text-stone-400 hover:text-rose-300 text-xs transition-colors flex items-center gap-1.5"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Emergency Exit</span>
          </button>
        </div>

      {/* Floating Kiosk Tools Dock */}
      <div className="flex items-center justify-between pt-4">
        {/* Study surface switcher */}
        <button
          onClick={() => setStudySurface(studySurface === 'TEXTBOOK' ? 'MY_WORK' : 'TEXTBOOK')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold transition-all shadow-md"
        >
          {studySurface === 'TEXTBOOK' ? <Camera className="w-4 h-4 text-orange-400" /> : <BookOpen className="w-4 h-4 text-amber-400" />}
          <span>{studySurface === 'TEXTBOOK' ? 'Switch to My Work' : 'Back to Textbook'}</span>
        </button>

        {/* Socratic AI Mentor Companion Drawer Toggle */}
        <button
          onClick={() => setIsSocraticDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-lg shadow-orange-950/40 transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Open Socratic Mentor</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </div>

      {/* Socratic Mentor Bottom / Slide-over Drawer */}
      {isSocraticDrawerOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <AfricaLogo size={34} />
              <div>
                <h3 className="font-bold text-xs text-white">SomaAfrika Socratic Mentor</h3>
                <p className="text-[10px] text-amber-400 font-mono">Strict Zero-Direct-Answer Guardrails</p>
              </div>
            </div>
            <button
              onClick={() => setIsSocraticDrawerOpen(false)}
              className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-600 text-white rounded-br-none'
                      : 'bg-stone-800 text-stone-200 border border-stone-700/60 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-stone-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isGenerating && (
              <div className="flex items-center gap-2 text-stone-400 text-xs italic p-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Formulating Socratic stepping-stone question...</span>
              </div>
            )}
          </div>

          {/* One-tap learning intents keep the mentor easy to navigate. */}
          <div className="p-2 border-t border-stone-800/80 bg-stone-950/60 flex items-center gap-1.5 overflow-x-auto text-[11px] text-stone-300">
            <button
              onClick={() => setInputQuery('Give me a simple summary of this chapter and the key things I must understand.')}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 shrink-0 border border-stone-700"
            >
              📚 Summarise chapter
            </button>
            <button
              onClick={() => setInputQuery('Explain the main concept in simple terms, like you are teaching me from the beginning.')}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 shrink-0 border border-stone-700"
            >
              💡 Explain simply
            </button>
            <button
              onClick={() => setInputQuery('Teach me this step by step. Start with the smallest idea I need to understand first.')}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 shrink-0 border border-stone-700"
            >
              🧩 Teach step by step
            </button>
            <button
              onClick={() => setInputQuery('What should I be able to explain in my own words after studying this chapter?')}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 shrink-0 border border-stone-700"
            >
              ✅ Check understanding
            </button>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-stone-800 bg-stone-950 flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask a question or explain your reasoning..."
              className="flex-1 px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isGenerating}
              className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Emergency Cancellation Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-stone-100 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-950 border border-rose-800 text-rose-400 flex items-center justify-center text-xl mx-auto">
              ⚠️
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-base text-white">Emergency Kiosk Override</h3>
              <p className="text-xs text-stone-400">
                Are you sure you need to abort this Deep Study block? Doing so forfeits your session completion token bonus.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
              >
                Resume Study
              </button>
              <button
                onClick={() => {
                  setShowEmergencyModal(false);
                  terminateStudySessionEmergency();
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-800 hover:bg-rose-700 text-white text-xs font-semibold"
              >
                Confirm Abort
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
