import React from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_EXAM_PAPERS } from '../data/curriculumData';
import {
  ShieldCheck,
  Clock,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Award,
  ArrowRight,
  BookOpen,
  GitBranch,
  RotateCcw,
} from 'lucide-react';

export const Screen08ExamDiagnostics: React.FC = () => {
  const { latestExamSubmission, navigateTo, startStudySession, addOrUpdateStruggleNode } = useApp();

  if (!latestExamSubmission) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-stone-900 border border-stone-800 text-stone-400 mx-auto flex items-center justify-center text-2xl">
          📊
        </div>
        <h2 className="text-xl font-bold text-white">No Exam Submissions Yet</h2>
        <p className="text-stone-400 text-xs">
          Take a timed national past paper simulation in the Mock Exam Hall to generate telemetry and pacing diagnostics.
        </p>
        <button
          onClick={() => navigateTo('MOCK_EXAM')}
          className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition-all"
        >
          Enter Mock Exam Hall
        </button>
      </div>
    );
  }

  const {
    examTitle,
    nationalBoard,
    percentage,
    passed,
    scoreEarned,
    totalMarks,
    totalTimeTakenSeconds,
    questionTelemetry,
    pacingAnomalies,
    struggledConcepts,
  } = latestExamSubmission;

  const examPaper = MOCK_EXAM_PAPERS.find((p) => p.id === latestExamSubmission.examPaperId) || MOCK_EXAM_PAPERS[0];

  // Pass boundaries determination
  let gradeBand = 'Needs Improvement';
  let badgeColor = 'bg-rose-950 text-rose-300 border-rose-800';
  if (percentage >= 80) {
    gradeBand = 'Distinction (Level 7 / A*)';
    badgeColor = 'bg-emerald-950 text-emerald-300 border-emerald-600';
  } else if (percentage >= 60) {
    gradeBand = 'Merit (Level 5 / B)';
    badgeColor = 'bg-blue-950 text-blue-300 border-blue-600';
  } else if (percentage >= 40) {
    gradeBand = 'Pass (Level 3 / C)';
    badgeColor = 'bg-amber-950 text-amber-300 border-amber-600';
  }

  const formatMinutes = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleRouteToRevision = (conceptTag: string) => {
    addOrUpdateStruggleNode(
      conceptTag,
      `Exam Remediation: ${conceptTag}`,
      examPaper.subjectName,
      'Missed during timed mock exam'
    );
    startStudySession(25, `Remediation: ${conceptTag}`, examPaper.subjectName);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Diagnostic Summary Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                {gradeBand}
              </span>
              <span className="text-xs font-mono text-stone-400">{nationalBoard}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">{examTitle}</h1>
            <p className="text-stone-400 text-xs">
              Official Examination Mark Breakdown & High-Resolution Pacing Telemetry
            </p>
          </div>

          {/* Marks & Percentage Box */}
          <div className="flex items-center gap-4 bg-stone-950 border border-stone-800 p-4 rounded-xl shrink-0">
            <div className="text-center">
              <div className="text-[10px] text-stone-500 uppercase font-mono">Raw Marks</div>
              <div className="text-2xl font-black text-white font-mono">
                {scoreEarned} <span className="text-stone-500 text-base">/ {totalMarks}</span>
              </div>
            </div>

            <div className="h-10 w-px bg-stone-800" />

            <div className="text-center">
              <div className="text-[10px] text-stone-500 uppercase font-mono">Total Score</div>
              <div
                className={`text-3xl font-black font-mono ${
                  passed ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {percentage}%
              </div>
            </div>
          </div>
        </div>

        {/* 3 Metric Summary Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800/80">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <span>Time Consumed:</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg font-bold text-white font-mono">
              {formatMinutes(totalTimeTakenSeconds)}
            </div>
            <div className="text-[10px] text-stone-500">
              Of {examPaper.allocatedMinutes}m official duration
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800/80">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <span>Pacing Deviations:</span>
              <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
            </div>
            <div className="text-lg font-bold text-orange-400 font-mono">
              {pacingAnomalies.length} Flagged Questions
            </div>
            <div className="text-[10px] text-stone-500">Exceeded recommended pace by &gt;1.4x</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800/80">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <span>Struggle Graph Sync:</span>
              <GitBranch className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-lg font-bold text-purple-400 font-mono">
              {struggledConcepts.length} Concept Nodes
            </div>
            <div className="text-[10px] text-stone-500">Targeted for adaptive Socratic review</div>
          </div>
        </div>
      </div>

      {/* Question Pacing Telemetry Table & Heatmap */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-stone-200 uppercase tracking-wider">
            Time-Management Telemetry: Actual vs. Target Pace
          </h3>
          <span className="text-[11px] text-stone-400 font-mono">Pacing Heatmap</span>
        </div>

        <div className="space-y-3">
          {examPaper.questions.map((q) => {
            const tel = questionTelemetry[q.id];
            const actualSec = tel?.timeSpentSeconds || 0;
            const recSec = q.recommendedMinutes * 60;
            const ratio = actualSec / recSec;

            let barColor = 'bg-emerald-500';
            let statusText = 'Paced Well';
            if (ratio > 1.4) {
              barColor = 'bg-rose-500';
              statusText = 'Time Sink (Slow)';
            } else if (ratio < 0.6 && actualSec > 0) {
              barColor = 'bg-blue-400';
              statusText = 'Fast';
            }

            return (
              <div
                key={q.id}
                className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-mono">
                      Q{q.questionNumber} ({q.marks} marks)
                    </span>
                    <span className="text-stone-400 truncate max-w-xs">{q.conceptTag}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-stone-400">Target: {q.recommendedMinutes}m</span>
                    <span className="font-bold text-white">Actual: {Math.round(actualSec / 60)}m</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-sans ${barColor} text-black font-bold`}>
                      {statusText}
                    </span>
                  </div>
                </div>

                {/* Progress bar comparison */}
                <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden flex">
                  <div
                    className={`${barColor} h-full transition-all`}
                    style={{ width: `${Math.min(100, Math.round(ratio * 70))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Struggle Identifiers & 1-Tap Socratic Revision Actions */}
      {struggledConcepts.length > 0 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>High-Friction Concepts Identified from this Exam</span>
          </div>

          <p className="text-stone-400 text-xs">
            Our diagnostic telemetry detected hesitation or lost marks on these concepts. Launch a dedicated Deep Study session to remediate them before your final exams.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {struggledConcepts.map((concept, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-950 border border-rose-900/60 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-stone-200">{concept}</div>
                  <div className="text-[10px] text-stone-400">Tagged in Struggle Graph</div>
                </div>

                <button
                  onClick={() => handleRouteToRevision(concept)}
                  className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Study Now</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Nav CTA */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => navigateTo('MOCK_EXAM')}
          className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake Past Paper</span>
        </button>

        <button
          onClick={() => navigateTo('DASHBOARD')}
          className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-950/40"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};
