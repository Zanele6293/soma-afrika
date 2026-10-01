import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QuizQuestion, StudySessionState, StudentProfile, ExitQuizRequestPayload } from '../types';
import { AfricaLogo } from './AfricaLogo';
import { 
  AlertCircle, 
  ArrowRight, 
  Award, 
  CheckCircle, 
  Clock, 
  FileText, 
  HelpCircle, 
  Lock, 
  RefreshCw, 
  RotateCcw, 
  ShieldAlert, 
  Sparkles, 
  Trophy, 
  Unlock, 
  XCircle 
} from 'lucide-react';

interface Screen04ExitQuizProps {
  session: StudySessionState;
  profile: StudentProfile;
  quizPayload: ExitQuizRequestPayload;
  questions: QuizQuestion[];
  nextChapterTitle?: string;
  hasNextChapter: boolean;
  onPassQuiz: (tokensEarned: number, advanceToNextChapter: boolean) => void;
  onRetakeStudy: () => void;
  onReturnHome: () => void;
}

export const Screen04ExitQuiz: React.FC<Screen04ExitQuizProps> = ({
  session,
  profile,
  quizPayload,
  questions,
  nextChapterTitle,
  hasNextChapter,
  onPassQuiz,
  onRetakeStudy,
  onReturnHome
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHintFor, setShowHintFor] = useState<number | null>(null);

  // Animated token counter state
  const [displayTokens, setDisplayTokens] = useState(profile.tokens);
  const [isTokenAnimating, setIsTokenAnimating] = useState(false);

  // Remedial 5-minute countdown for failed attempts (Requirement 4)
  const [remedialSeconds, setRemedialSeconds] = useState(300); // 5 minutes
  const [isRemedialActive, setIsRemedialActive] = useState(false);

  const currentQ = questions[currentQuestionIndex];
  const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

  // Format page range for the prominent title
  const pagesSorted = (quizPayload.pagesRead && quizPayload.pagesRead.length > 0)
    ? [...quizPayload.pagesRead].sort((a, b) => a - b)
    : [quizPayload.lastReadPageNumber || 1];

  const pageRangeLabel = pagesSorted.length === 1
    ? `Page ${pagesSorted[0]}`
    : `Pages ${pagesSorted[0]} to ${pagesSorted[pagesSorted.length - 1]}`;

  const masteryCheckTitle = `Mastery Check: ${quizPayload.chapterTitle} — Testing ${pageRangeLabel}`;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  // Calculate score
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });

  const scorePercentage = Math.round((correctCount / questions.length) * 100);
  const isPassed = scorePercentage >= 75;

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);

    if (isPassed) {
      // Trigger canvas-confetti celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#F97316', '#3B82F6']
        });
      } catch (e) {
        console.warn('Confetti error', e);
      }

      // Animate +50 tokens
      setIsTokenAnimating(true);
      const startTokens = profile.tokens;
      const targetTokens = profile.tokens + 50;
      let current = startTokens;
      const step = () => {
        current += 2;
        if (current <= targetTokens) {
          setDisplayTokens(current);
          requestAnimationFrame(step);
        } else {
          setDisplayTokens(targetTokens);
          setIsTokenAnimating(false);
        }
      };
      requestAnimationFrame(step);
    } else {
      // Failed: start the strict 5-minute locked review countdown
      setIsRemedialActive(true);
    }
  };

  // Remedial timer countdown
  useEffect(() => {
    if (!isRemedialActive) return;
    const timer = setInterval(() => {
      setRemedialSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRemedialActive]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#13110e] text-[#f4efe6] flex flex-col justify-between font-sans antialiased p-4 md:p-8">
      
      {/* Top Banner with Token Balance & Progress Telemetry */}
      <header className="max-w-2xl mx-auto w-full flex items-center justify-between pb-6 border-b border-stone-800">
        <AfricaLogo size="sm" />
        
        <div className="flex items-center gap-3">
          {/* Animated Token Balance */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
            isTokenAnimating 
              ? 'bg-amber-500 text-stone-950 border-amber-400 font-extrabold scale-110 shadow-lg' 
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold'
          } text-xs`}>
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{displayTokens} Tokens</span>
            {isTokenAnimating && <span className="text-[10px] text-emerald-900 font-black">+50!</span>}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span>Exit-Gate Mastery Gating</span>
          </div>
        </div>
      </header>

      {/* Main Assessment Container */}
      <main className="max-w-2xl mx-auto w-full flex-1 my-6 flex flex-col justify-center">
        
        {/* Results Screen: VICTORY OR FAILURE MODAL (REQUIREMENT 4) */}
        {isSubmitted ? (
          <div className="bg-[#1c1916] rounded-3xl border border-stone-800 p-6 md:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
            
            {isPassed ? (
              /* REQUIREMENT 4: IF SCORE >= 75% (MASTERY ACHIEVED) */
              <div className="space-y-6 animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/60 ring-8 ring-emerald-500/10">
                  <Unlock className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600 text-xs font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CHAPTER MASTERY UNLOCKED: {scorePercentage}%</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-extrabold brand-font text-stone-100">
                    Mastery Achieved, {profile.name}!
                  </h2>
                  <p className="text-xs md:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                    You passed with <strong className="text-emerald-400 font-bold">{scorePercentage}%</strong> ({correctCount}/{questions.length} correct) covering Pages <strong className="text-amber-400">{quizPayload.pagesRead.join(', ')}</strong> of <span className="text-stone-100">{quizPayload.chapterTitle}</span>.
                  </p>
                </div>

                {/* Animated Tokens Reward Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-500/40 flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xl shadow-lg">
                    🏆
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-extrabold text-amber-300">+50 Knowledge Tokens Credited!</div>
                    <div className="text-xs text-stone-400">Balance increased from {profile.tokens} to {profile.tokens + 50}</div>
                  </div>
                </div>

                {/* REQUIREMENT 4: AUTOMATIC CHAPTER PROGRESSION ACTION */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  {hasNextChapter ? (
                    <button
                      onClick={() => onPassQuiz(50, true)}
                      className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-black text-sm tracking-wide shadow-lg shadow-amber-950/60 flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-95"
                    >
                      <span>Proceed to Chapter: {nextChapterTitle || 'Next Unit'} ➔</span>
                    </button>
                  ) : (
                    <div className="w-full sm:flex-1 p-3 rounded-2xl bg-emerald-950/60 border border-emerald-700 text-emerald-300 text-xs font-bold">
                      🎉 Full Curriculum Syllabus Completed for this Subject!
                    </div>
                  )}

                  <button
                    onClick={() => onPassQuiz(50, false)}
                    className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs cursor-pointer transition"
                  >
                    Return to Study Hub
                  </button>
                </div>
              </div>
            ) : (
              /* REQUIREMENT 4: IF SCORE < 75% (MASTERY NOT ACHIEVED) */
              <div className="space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-red-950/80 text-red-400 border border-red-700 flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-red-950 text-red-300 border border-red-800 text-xs font-black uppercase tracking-wider">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    <span>SESSION LOCKED: MASTERY NOT REACHED ({scorePercentage}%)</span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold brand-font text-stone-100">
                    75% Required to Unlock & Advance (You Scored {correctCount}/{questions.length})
                  </h2>
                  <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                    You cannot bypass the kiosk without proving understanding. Review the Socratic feedback on missed concepts from Pages {quizPayload.pagesRead.join(', ')} below.
                  </p>
                </div>

                {/* 5-Minute Guided Review Countdown Timer */}
                <div className="p-3.5 rounded-2xl bg-red-950/30 border border-red-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-red-300 font-semibold">
                    <Clock className="w-4 h-4 text-red-400" />
                    <span>5-Minute Guided Review Lock Active:</span>
                  </div>
                  <span className="font-mono text-sm font-black text-amber-400">
                    {formatTime(remedialSeconds)}
                  </span>
                </div>

                {/* Socratic Diagnostics on Missed Questions with Page Source */}
                <div className="text-left space-y-2.5 max-h-60 overflow-y-auto p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-xs">
                  <span className="text-[11px] uppercase font-bold text-amber-400 block mb-1">
                    Concepts Requiring Review:
                  </span>
                  {questions.map((q, idx) => {
                    const isCorrect = selectedAnswers[idx] === q.correctIndex;
                    if (isCorrect) return null; // Only show missed
                    return (
                      <div key={q.id} className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1.5">
                        <div className="flex items-center justify-between font-bold text-red-300">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                            <span>{q.question || q.prompt}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono shrink-0">
                            {q.pageSource || (q.pageSourceNumber ? `Page ${q.pageSourceNumber}` : 'Read Page')}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-700/40 text-amber-200 text-[11px]">
                          <strong className="block text-amber-400 font-bold mb-0.5">Socratic Stepping Stone:</strong>
                          {q.pedagogicalHintIfFailed || q.socraticHint || `Review the studied section from ${q.pageSource || 'this page'}.`}
                        </div>
                        <p className="text-[11px] text-stone-400 italic">
                          Concept: {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentQuestionIndex(0);
                      setSelectedAnswers({});
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold cursor-pointer transition"
                  >
                    Retry Quiz Variant
                  </button>

                  <button
                    onClick={onRetakeStudy}
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold cursor-pointer transition shadow"
                  >
                    5-Min Review in Textbook
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Active Question Step (Strictly Grounded in Visited Pages) */
          <div className="bg-[#1c1916] rounded-3xl border border-stone-800 p-6 md:p-8 space-y-6 shadow-2xl relative">
            
            {/* Prominent Mastery Check Title Bar */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400 block">
                  Official Academic Assessment
                </span>
                <h2 className="text-sm md:text-base font-extrabold text-stone-100">
                  {masteryCheckTitle}
                </h2>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-stone-900 border border-stone-700 text-amber-400 text-[11px] font-mono font-bold self-start sm:self-auto shrink-0">
                75% Pass Standard
              </span>
            </div>

            {/* Header with Progress Steps and Page Source Indicator */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-amber-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <h3 className="text-xs text-stone-400 font-medium">
                  {currentQ.concept || `Evaluating: ${quizPayload.chapterTitle}`}
                </h3>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-600/50 text-amber-300 text-[11px] font-mono font-bold">
                  Source: {currentQ.pageSource || (currentQ.pageSourceNumber ? `Page ${currentQ.pageSourceNumber}` : `Page ${pagesSorted[0]}`)}
                </span>
                
                <div className="flex gap-1.5">
                  {questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2.5 h-2.5 rounded-full ${
                        idx === currentQuestionIndex
                          ? 'bg-amber-500 ring-2 ring-amber-500/40'
                          : selectedAnswers[idx] !== undefined
                          ? 'bg-emerald-500'
                          : 'bg-stone-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Question Prompt */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-stone-400">Concept: {currentQ.concept || 'Curriculum Principle'}</span>
              <p className="text-base md:text-lg font-bold text-stone-100 leading-snug">
                {currentQ.question || currentQ.prompt}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                const letter = String.fromCharCode(65 + optIdx);
                const cleanedText = option.replace(/^[A-D][.):\s-]\s*/i, '');

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs md:text-sm font-medium transition cursor-pointer flex items-center gap-3.5 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 ring-1 ring-amber-500/50'
                        : 'bg-[#24201c] border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-[#2b2621]'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                    }`}>
                      {letter}
                    </span>
                    <span className="flex-1 leading-relaxed">{cleanedText}</span>
                  </button>
                );
              })}
            </div>

            {/* Socratic / Pedagogical Hint Drawer */}
            {showHintFor === currentQuestionIndex ? (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-xs flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-400 font-bold mb-0.5">Socratic Stepping Stone:</strong>
                  {currentQ.pedagogicalHintIfFailed || currentQ.socraticHint || `Review the concepts on ${currentQ.pageSource || 'Page ' + (currentQ.pageSourceNumber || 1)}.`}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowHintFor(currentQuestionIndex)}
                className="text-stone-400 hover:text-amber-400 text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Need a Socratic clue?</span>
              </button>
            )}

            {/* Navigation / Next Question Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={!isAnswered}
                onClick={handleNext}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-40"
              >
                <span>{currentQuestionIndex === questions.length - 1 ? 'Submit & Verify Mastery' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto w-full text-center text-xs text-stone-500 pt-4 border-t border-stone-800">
        Exit Gate Assessment enforces mastery verification across Pages {quizPayload.pagesRead.join(', ')} before unlocking.
      </footer>
    </div>
  );
};
