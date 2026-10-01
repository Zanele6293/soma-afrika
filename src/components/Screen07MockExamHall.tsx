import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_EXAM_PAPERS } from '../data/curriculumData';
import { ExamPaper, ExamQuestion, QuestionTelemetry, ExamSubmission } from '../types';
import {
  ShieldAlert,
  Clock,
  HelpCircle,
  Flag,
  Send,
  Sparkles,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  CheckCircle,
  X,
  Volume2,
} from 'lucide-react';

export const Screen07MockExamHall: React.FC = () => {
  const {
    activeExam,
    setActiveExam,
    submitExam,
    profile,
    navigateTo,
  } = useApp();

  const examPaper: ExamPaper = activeExam || MOCK_EXAM_PAPERS[0];

  // Exam runtime state
  const [remainingSeconds, setRemainingSeconds] = useState(examPaper.allocatedMinutes * 60);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState<Record<string, string>>({});
  const [telemetry, setTelemetry] = useState<Record<string, QuestionTelemetry>>({});

  // Pacing deviation alert banner state
  const [pacingAlert, setPacingAlert] = useState<string | null>(null);

  // Socratic Clarification Drawer (Exam Mode: Strict Silence Protocol)
  const [isProctorDrawerOpen, setIsProctorDrawerOpen] = useState(false);
  const [proctorQuery, setProctorQuery] = useState('');
  const [proctorMessages, setProctorMessages] = useState<
    Array<{ role: 'user' | 'assistant'; text: string }>
  >([
    {
      role: 'assistant',
      text: 'Strict Silence Protocol Active: I may ONLY clarify English vocabulary or examination command words (e.g. "Evaluate", "Differentiate", "Determine"). I am programmatically barred from giving hints or confirming solutions.',
    },
  ]);
  const [isProctorReplying, setIsProctorReplying] = useState(false);

  // Initialize telemetry for questions
  useEffect(() => {
    const initialTel: Record<string, QuestionTelemetry> = {};
    examPaper.questions.forEach((q) => {
      initialTel[q.id] = {
        questionId: q.id,
        timeSpentSeconds: 0,
        dwellStartTimestamp: Date.now(),
        isFlaggedForReview: false,
        isAnswered: false,
      };
    });
    setTelemetry(initialTel);
  }, [examPaper.id]);

  // Exam global timer loop & pacing telemetry tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });

      // Update dwell time on current question
      const currentQ = examPaper.questions[currentQuestionIdx];
      if (currentQ) {
        setTelemetry((prevTel) => {
          const currentData = prevTel[currentQ.id] || {
            questionId: currentQ.id,
            timeSpentSeconds: 0,
            isFlaggedForReview: false,
            isAnswered: false,
          };
          const updatedTime = currentData.timeSpentSeconds + 1;

          // Pacing alert trigger: spent more than 1.6x recommended time
          const recommendedSecs = currentQ.recommendedMinutes * 60;
          if (updatedTime > recommendedSecs * 1.5 && updatedTime % 30 === 0) {
            const spentMins = Math.round(updatedTime / 60);
            setPacingAlert(
              `⚠️ Pacing Alert: You have spent ${spentMins}m on a ${currentQ.marks}-mark question. Suggested pace: ${currentQ.recommendedMinutes}m.`
            );
          }

          return {
            ...prevTel,
            [currentQ.id]: {
              ...currentData,
              timeSpentSeconds: updatedTime,
            },
          };
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIdx, examPaper.id]);

  const currentQ = examPaper.questions[currentQuestionIdx];

  const handleToggleFlag = () => {
    setTelemetry((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        isFlaggedForReview: !prev[currentQ.id]?.isFlaggedForReview,
      },
    }));
  };

  const handleAnswerChange = (val: string) => {
    setStudentAnswers((prev) => ({ ...prev, [currentQ.id]: val }));
    setTelemetry((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        isAnswered: true,
      },
    }));
  };

  const handleAutoSubmit = () => {
    handleSubmitExam();
  };

  const handleSubmitExam = () => {
    // Grade exam based on answers
    let score = 0;
    const struggled: string[] = [];
    const anomalies: string[] = [];

    examPaper.questions.forEach((q) => {
      const ans = studentAnswers[q.id] || '';
      const tel = telemetry[q.id];

      // multiple choice or structured grading heuristic
      if (q.options && q.correctAnswer) {
        if (ans.trim().toUpperCase().startsWith(q.correctAnswer.toUpperCase())) {
          score += q.marks;
        } else {
          struggled.push(q.conceptTag);
        }
      } else {
        // give partial rubric simulation for realistic structured answer
        if (ans.length > 30) {
          const awarded = Math.round(q.marks * 0.75);
          score += awarded;
        } else {
          struggled.push(q.conceptTag);
        }
      }

      if (tel && tel.timeSpentSeconds > q.recommendedMinutes * 60 * 1.4) {
        anomalies.push(`Q${q.questionNumber}: Spent ${Math.round(tel.timeSpentSeconds / 60)}m (Allotted: ${q.recommendedMinutes}m)`);
      }
    });

    const percentage = Math.round((score / examPaper.totalMarks) * 100);
    const passed = percentage >= examPaper.passMarkPercentage;

    const submission: ExamSubmission = {
      id: `sub_${Date.now()}`,
      examPaperId: examPaper.id,
      examTitle: examPaper.title,
      nationalBoard: examPaper.nationalBoard,
      totalTimeTakenSeconds: examPaper.allocatedMinutes * 60 - remainingSeconds,
      scoreEarned: score,
      totalMarks: examPaper.totalMarks,
      percentage,
      passed,
      questionTelemetry: telemetry,
      pacingAnomalies: anomalies,
      struggledConcepts: Array.from(new Set(struggled)),
      submittedAt: new Date().toLocaleTimeString(),
    };

    submitExam(submission);
  };

  // Socratic Exam Proctor Clarification call
  const handleAskProctor = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!proctorQuery.trim() || isProctorReplying) return;

    const qText = proctorQuery.trim();
    setProctorQuery('');
    setProctorMessages((prev) => [...prev, { role: 'user', text: qText }]);
    setIsProctorReplying(true);

    try {
      const res = await fetch('/api/exam-clarify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: qText,
          questionText: currentQ.questionText,
        }),
      });
      const data = await res.json();
      setProctorMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.response || 'Exam conditions active: Clarifications are restricted to command words and comprehension.',
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProctorReplying(false);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-4 select-none">
      {/* Official Exam Hall Header Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
              Strict National Examination Mode
            </span>
            <span className="text-xs font-mono text-stone-400">{examPaper.nationalBoard}</span>
          </div>
          <h2 className="text-base font-extrabold text-white truncate max-w-sm sm:max-w-xl">
            {examPaper.title}
          </h2>
        </div>

        {/* Live Examination Countdown Clock */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-stone-950 border border-rose-500/40 text-center font-mono shadow-inner">
            <div className="text-[10px] text-stone-500 uppercase tracking-wider font-sans">
              Official Exam Clock
            </div>
            <div className="text-xl sm:text-2xl font-black text-rose-400 tracking-tight">
              {formatTimer(remainingSeconds)}
            </div>
          </div>

          {/* Socratic Proctor Clarification Drawer CTA */}
          <button
            onClick={() => setIsProctorDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
            title="Clarify command words or English terms"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Clarify Command Words</span>
          </button>
        </div>
      </div>

      {/* Pacing Alert Deviation Banner */}
      {pacingAlert && (
        <div className="p-3.5 rounded-xl bg-amber-950/70 border border-amber-500 text-amber-200 text-xs flex items-center justify-between gap-3 animate-bounce">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{pacingAlert}</span>
          </div>
          <button
            onClick={() => setPacingAlert(null)}
            className="text-amber-400 font-bold hover:text-white text-xs px-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Question Selector Ribbon */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-2.5 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-2 shrink-0">
          Questions:
        </span>
        {examPaper.questions.map((q, idx) => {
          const tel = telemetry[q.id];
          const isSelected = currentQuestionIdx === idx;
          const isAnswered = tel?.isAnswered;
          const isFlagged = tel?.isFlaggedForReview;

          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIdx(idx)}
              className={`w-8 h-8 rounded-lg font-bold font-mono text-xs flex items-center justify-center transition-all relative shrink-0 ${
                isSelected
                  ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                  : isAnswered
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
              }`}
            >
              <span>{q.questionNumber}</span>
              {isFlagged && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Split-Screen: Question Paper on Left, Answer Sheet / Scratchpad on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Official Question Paper Presentation */}
        <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs">
            <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
              {currentQ.section}
            </span>
            <div className="flex items-center gap-2 font-mono text-stone-400">
              <span>{currentQ.marks} Marks</span>
              <span>•</span>
              <span>Rec: {currentQ.recommendedMinutes} min</span>
            </div>
          </div>

          {/* Main Question Statement */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              Question {currentQ.questionNumber}
            </h3>
            <p className="text-stone-200 text-sm leading-relaxed">{currentQ.questionText}</p>
          </div>

          {/* Multiple Choice Options or Subquestions */}
          {currentQ.options && (
            <div className="space-y-2.5 pt-2">
              <div className="text-[11px] font-semibold text-stone-400 uppercase">
                Choose the correct alternative:
              </div>
              <div className="space-y-2">
                {currentQ.options.map((opt, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 font-mono"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentQ.subQuestions && (
            <div className="space-y-3 pt-2">
              {currentQ.subQuestions.map((sub, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-stone-950 border border-stone-800/80 space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-300">
                    <span className="text-amber-400 font-mono">{sub.label}</span>
                    <span className="text-stone-500 font-mono text-[11px]">[{sub.marks} marks]</span>
                  </div>
                  <p className="text-stone-300 text-xs leading-relaxed">{sub.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Question Telemetry Badge */}
          <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>
                Time on this question:{' '}
                <strong className="text-amber-400 font-mono">
                  {Math.round((telemetry[currentQ.id]?.timeSpentSeconds || 0) / 60)} min
                </strong>
              </span>
            </div>

            <button
              onClick={handleToggleFlag}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                telemetry[currentQ.id]?.isFlaggedForReview
                  ? 'bg-rose-950 border-rose-500 text-rose-300'
                  : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>
                {telemetry[currentQ.id]?.isFlaggedForReview ? 'Flagged for Review' : 'Flag Question'}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Digital Answer Sheet & Scratchpad */}
        <div className="lg:col-span-5 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs">
              <span className="font-bold text-stone-200 uppercase tracking-wider">
                Candidate Response Sheet
              </span>
              <span className="font-mono text-emerald-400 text-[11px]">
                {telemetry[currentQ.id]?.isAnswered ? 'Saved locally' : 'Pending'}
              </span>
            </div>

            {/* Answer Field */}
            {currentQ.options ? (
              <div className="space-y-2">
                <label className="block text-xs font-medium text-stone-400">
                  Select Your Final Option:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['A', 'B', 'C', 'D'].map((letter) => {
                    const isSelected = studentAnswers[currentQ.id] === letter;
                    return (
                      <button
                        key={letter}
                        onClick={() => handleAnswerChange(letter)}
                        className={`p-3 rounded-xl border text-sm font-bold font-mono transition-all ${
                          isSelected
                            ? 'bg-amber-600 border-amber-400 text-white shadow-md ring-1 ring-amber-300'
                            : 'bg-stone-950 border-stone-800 text-stone-300 hover:bg-stone-800'
                        }`}
                      >
                        Option {letter}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-medium text-stone-400">
                  Working Steps & Calculation:
                </label>
                <textarea
                  rows={9}
                  value={studentAnswers[currentQ.id] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Show all formulae, substitution, and step-by-step reasoning..."
                  className="w-full p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-600 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                />
              </div>
            )}
          </div>

          {/* Bottom Actions: Question Navigation & Submit Paper */}
          <div className="pt-4 border-t border-stone-800 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                disabled={currentQuestionIdx === 0}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() =>
                  setCurrentQuestionIdx((p) => Math.min(examPaper.questions.length - 1, p + 1))
                }
                disabled={currentQuestionIdx === examPaper.questions.length - 1}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleSubmitExam}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-700 to-orange-700 hover:from-rose-600 hover:to-orange-600 text-white font-bold text-xs shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>Submit Examination Paper</span>
            </button>
          </div>
        </div>
      </div>

      {/* Proctor Clarification Drawer (Exam Mode: Strict Silence Protocol) */}
      {isProctorDrawerOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          <div className="p-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <div>
                <h3 className="font-bold text-xs text-white">Exam Proctor: Clarification Only</h3>
                <p className="text-[10px] text-stone-400">Strict Silence Protocol Active</p>
              </div>
            </div>
            <button
              onClick={() => setIsProctorDrawerOpen(false)}
              className="p-1 rounded-lg bg-stone-800 text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {proctorMessages.map((msg, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-2xl leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-rose-950 text-rose-200 border border-rose-800 ml-8'
                    : 'bg-stone-950 text-stone-300 border border-stone-800 mr-8'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Quick Command Word Clarifications */}
          <div className="p-2 border-t border-stone-800 bg-stone-950 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            {['Evaluate', 'Differentiate', 'Deduce', 'State'].map((word) => (
              <button
                key={word}
                onClick={() => setProctorQuery(`What does the command word "${word}" mean?`)}
                className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 shrink-0 border border-stone-700"
              >
                Clarify &quot;{word}&quot;
              </button>
            ))}
          </div>

          <form onSubmit={handleAskProctor} className="p-3 border-t border-stone-800 bg-stone-950 flex gap-2">
            <input
              type="text"
              value={proctorQuery}
              onChange={(e) => setProctorQuery(e.target.value)}
              placeholder="Ask meaning of command word or term..."
              className="flex-1 px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              type="submit"
              disabled={!proctorQuery.trim() || isProctorReplying}
              className="p-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-white disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
