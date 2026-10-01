import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ExitGateQuiz, ExitGateQuestion } from '../types';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  Coins,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Clock,
  RotateCcw,
} from 'lucide-react';

export const Screen06ExitGateQuiz: React.FC = () => {
  const {
    profile,
    studySession,
    struggleNodes,
    unlockAfterQuiz,
    navigateTo,
    resolveStruggleNode,
    finishUnlockedStudySession,
  } = useApp();

  const [isLoading, setIsLoading] = useState(true);
  const [quiz, setQuiz] = useState<ExitGateQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);
  const [isPassed, setIsPassed] = useState<boolean | null>(null);

  // Mandatory 5-min review timer if failed (< 75%)
  const [reviewCountdown, setReviewCountdown] = useState<number>(300); // 5 mins = 300 seconds

  // Build the quiz from the exact chapter captured by the focus session.
  const loadQuiz = async (attemptNumber: number) => {
    setIsLoading(true);
    setIsSubmitted(false);
    setCalculatedScore(null);
    setIsPassed(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});

    try {
      const highFrictionNodes = struggleNodes.filter((n) => n.frictionLevel === 'HIGH');
      const res = await fetch('/api/generate-exit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionTopic: studySession?.activeChapterTitle || studySession?.topicTitle || 'Core Curriculum Concept',
          activeChapterId: studySession?.activeChapterId,
          activeChapterNumber: studySession?.activeChapterNumber,
          chapterTitle: studySession?.activeChapterTitle,
          chapterObjectives: studySession?.activeChapterObjectives || studySession?.keyObjectives || [],
          chapterConcepts: studySession?.activeChapterConcepts || studySession?.conceptsStudied || [],
          chapterContent: studySession?.activeChapterContent || studySession?.readingNotes || '',
          chapterPracticeQuestions: studySession?.activeChapterPracticeQuestions || [],
          textbookTitle: studySession?.textbookTitle,
          pagesStudied: studySession?.pagesStudied,
          pagesReadInChapter: studySession?.pagesReadInChapter || [],
          lastReadPageNumber: studySession?.lastReadPageNumber,
          sourceType: studySession?.sourceType || 'TEXTBOOK_E_READER',
          conceptsStudied: studySession?.activeChapterConcepts || studySession?.conceptsStudied || [],
          readingNotes: studySession?.activeChapterContent || studySession?.readingNotes || 'Core syllabus concepts covered in this study session.',
          curriculumCode: profile.curriculumCode,
          gradeLevel: profile.gradeLevel,
          country: profile.country,
          attemptNumber,
          struggleConcepts: highFrictionNodes.map((n) => ({
            conceptLabel: n.conceptLabel,
            conceptName: n.conceptName,
          })),
        }),
      });

      const data = await res.json();
      if (data.quiz?.questions?.length) {
        setQuiz({
          id: `quiz_${Date.now()}`,
          sessionId: studySession?.id || 'session_1',
          passingThreshold: Number(data.quiz.passingThreshold) || 75,
          questions: data.quiz.questions,
          studentAnswers: {},
          scorePercentage: null,
          isPassed: null,
          retestRemainingSeconds: 300,
        });
      } else {
        throw new Error('No chapter quiz questions returned');
      }
    } catch (err) {
      console.error(err);
      setQuiz(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadQuiz(0);
  }, []);

  // Review countdown timer when failed
  useEffect(() => {
    if (isSubmitted && isPassed === false && reviewCountdown > 0) {
      const timer = setInterval(() => {
        setReviewCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isSubmitted, isPassed, reviewCountdown]);

  if (isLoading || !quiz) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <Sparkles className="w-10 h-10 animate-spin text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Building Your Chapter Mastery Check...</h2>
        <p className="text-stone-400 text-xs">
          These questions are built from the chapter you just studied, your recorded study material, and the concepts you needed help with.
        </p>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleNextOrSubmit = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      quiz.questions.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctIndex) {
          correctCount++;
          // If this was a struggle graph node question and student got it right, boost mastery!
          if (q.sourceType === 'STRUGGLE_GRAPH_TARGET') {
            resolveStruggleNode(q.conceptTested, 0.3);
          }
        }
      });

      const scorePercent = Math.round((correctCount / totalQuestions) * 100);
      const passed = scorePercent >= quiz.passingThreshold;

      setCalculatedScore(scorePercent);
      setIsPassed(passed);
      setIsSubmitted(true);
      unlockAfterQuiz(scorePercent, passed);
    }
  };

  const formatReviewTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Banner: Lockdown or Celebration */}
      <div
        className={`rounded-2xl border p-5 shadow-xl transition-all ${
          isSubmitted && isPassed
            ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-100'
            : isSubmitted && isPassed === false
            ? 'bg-rose-950/80 border-rose-600/80 text-rose-100'
            : 'bg-stone-900 border-stone-800 text-stone-100'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold border ${
                isSubmitted && isPassed
                  ? 'bg-emerald-900 border-emerald-400 text-emerald-200'
                  : isSubmitted && isPassed === false
                  ? 'bg-rose-900 border-rose-400 text-rose-200'
                  : 'bg-stone-800 border-stone-700 text-amber-400'
              }`}
            >
              {isSubmitted && isPassed ? (
                <Unlock className="w-6 h-6 text-emerald-300" />
              ) : isSubmitted && isPassed === false ? (
                <Lock className="w-6 h-6 text-rose-300" />
              ) : (
                <Lock className="w-6 h-6 text-amber-400" />
              )}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                {isSubmitted && isPassed
                  ? 'Chapter Mastered: Focus Session Unlocked!'
                  : isSubmitted && isPassed === false
                  ? 'More Practice Needed'
                  : 'Exit-Gate Assessment Engaged'}
              </h2>
              <p className="text-xs opacity-80">
                {isSubmitted && isPassed
                  ? `Score: ${calculatedScore}%. Your focus kiosk lock has been released.`
                  : isSubmitted && isPassed === false
                  ? `Score: ${calculatedScore}%. Review the missed concepts, then take a fresh question variant.`
                  : 'Finish this chapter-specific mastery check with at least 75% to complete the session.'}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-[11px] opacity-75 font-mono uppercase">Pass Threshold</div>
            <div className="text-xl font-black font-mono">≥ 75%</div>
          </div>
        </div>
      </div>

      {/* When Failed: Mandatory 5-minute review box */}
      {isSubmitted && isPassed === false && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between text-xs text-rose-300 border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2 font-semibold">
              <Clock className="w-4 h-4 text-rose-400" />
              <span>Mandatory Concept Review Timer:</span>
            </div>
            <span className="font-mono text-base font-bold text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded border border-rose-800">
              {formatReviewTime(reviewCountdown)}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="font-bold text-stone-200">Reviewing Missed Concepts:</div>
            {quiz.questions.map((q, idx) => {
              const studentChoice = selectedAnswers[q.id];
              const isCorrect = studentChoice === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`p-3.5 rounded-xl border ${
                    isCorrect
                      ? 'bg-emerald-950/30 border-emerald-800/40 text-stone-300'
                      : 'bg-rose-950/40 border-rose-800/60 text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-stone-400">Question {idx + 1}</span>
                    <span
                      className={`font-semibold ${
                        isCorrect ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isCorrect ? '✓ Correct' : '✗ Missed'}
                    </span>
                  </div>
                  <p className="font-medium mb-1.5">{q.question}</p>
                  <p className="text-[11px] text-amber-300/90 italic">
                    🧠 Learning checkpoint: {q.pedagogicalHintIfFailed || 'Return to the relevant section and explain the concept in your own words.'}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-end">
            <button
              onClick={() => {
                navigateTo('FOCUS_KIOSK');
              }}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 font-semibold text-xs flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              Return to Learn
            </button>
            <button
              onClick={() => void loadQuiz(Date.now())}
              disabled={reviewCountdown > 0}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs disabled:opacity-40 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{reviewCountdown > 0 ? `Review Locked (${formatReviewTime(reviewCountdown)})` : 'Take a Fresh Chapter Variant'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Session Provenance Context */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
            📖
          </div>
          <div>
            <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
              Chapter Used For This Quiz:
            </div>
            <div className="font-bold text-white text-xs">
              {studySession?.activeChapterTitle || studySession?.topicTitle || 'Curriculum Syllabus Module'}
            </div>
            <div className="text-[11px] text-amber-400">
              {studySession?.textbookTitle
                ? `${studySession.textbookTitle} • ${studySession.pagesStudied || 'assigned chapter'}`
                : studySession?.sourceType === 'PHYSICAL_SNAPSHOT_CAPTURE'
                ? 'Ingested Physical Notebook / Past Paper Snapshot'
                : studySession?.subjectName}
            </div>
          </div>
        </div>
        <div className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
          Duration: {studySession?.plannedDurationMin || 25} mins
        </div>
      </div>

      {/* Normal Quiz Question Flow */}
      {!isSubmitted && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Question Header & Origin Tag */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-400 font-mono text-sm">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                  currentQ.sourceType === 'STRUGGLE_GRAPH_TARGET'
                    ? 'bg-purple-950 text-purple-300 border-purple-600/40'
                    : 'bg-blue-950 text-blue-300 border-blue-600/40'
                }`}
              >
                {currentQ.sourceType === 'STRUGGLE_GRAPH_TARGET'
                  ? '🎯 Struggle Graph Remediation'
                  : '📖 Session Reading Content'}
              </span>
            </div>

            <span className="text-stone-400 text-[11px]">{currentQ.conceptTested}</span>
          </div>

          {/* Question Statement */}
          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-950/80 border-amber-500 text-white font-medium shadow-md shadow-amber-950/30 ring-1 ring-amber-400'
                      : 'bg-stone-800/60 border-stone-700/80 text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-700 text-stone-400'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="leading-snug pt-0.5">{option}</div>
                </button>
              );
            })}
          </div>

          {/* Next / Submit Navigation */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
            <div className="text-xs text-stone-400">
              {Object.keys(selectedAnswers).length} of {totalQuestions} answered
            </div>

            <button
              onClick={handleNextOrSubmit}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-orange-950/40 disabled:opacity-40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isLastQuestion ? 'Submit Exit-Gate Quiz' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* When Passed: Unlock & Rewards banner */}
      {isSubmitted && isPassed && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto text-2xl shadow-lg">
            🎉
          </div>
          <h3 className="text-xl font-bold text-white">Mastery Verified! Device Unlocked</h3>
          <p className="text-xs text-stone-300 max-w-md mx-auto">
            You achieved {calculatedScore}% (&ge; 75%). The concept nodes have been updated in your Struggle Graph, and Knowledge Tokens have been disbursed to your student balance.
          </p>
          <div className="pt-2">
            <button
              onClick={finishUnlockedStudySession}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
            >
              Continue to Academic Library
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
