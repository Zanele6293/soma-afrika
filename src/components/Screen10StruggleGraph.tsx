import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StruggleNode } from '../types';
import {
  GitBranch,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Sparkles,
  HelpCircle,
  TrendingUp,
  RotateCcw,
  Target,
} from 'lucide-react';

export const Screen10StruggleGraph: React.FC = () => {
  const { struggleNodes, startStudySession, resolveStruggleNode, navigateTo } = useApp();

  const [filterFriction, setFilterFriction] = useState<string>('ALL');
  const [selectedNode, setSelectedNode] = useState<StruggleNode | null>(
    struggleNodes[0] || null
  );

  const filteredNodes = struggleNodes.filter((node) => {
    if (filterFriction === 'ALL') return true;
    return node.frictionLevel === filterFriction;
  });

  const handleLaunchPractice = (node: StruggleNode) => {
    startStudySession(25, node.conceptName, node.subject);
  };

  const handleSimulateMastery = (node: StruggleNode) => {
    resolveStruggleNode(node.conceptLabel, 0.25);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
              <GitBranch className="w-3.5 h-3.5" />
              <span>Adaptive Cognitive Friction Graph</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Personalized Struggle Graph & Remediation Engine
            </h1>
            <p className="text-stone-400 text-xs max-w-2xl leading-relaxed">
              Every concept where you ask for Socratic help, upload a physical scan, or hesitate during mock exams is automatically logged. The system injects these high-friction nodes into 40% of your Exit-Gate Quizzes until mastery hits 100%.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-950 p-3 rounded-xl border border-stone-800 text-center shrink-0">
            <div>
              <div className="text-[10px] text-stone-500 font-mono uppercase">Logged Weaknesses</div>
              <div className="text-2xl font-black text-purple-400 font-mono">
                {struggleNodes.length} Nodes
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-stone-400 mr-1 text-[11px] font-semibold">Filter Friction:</span>
            {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterFriction(lvl)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filterFriction === lvl
                    ? 'bg-purple-900/80 text-purple-200 border border-purple-500/80'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="text-xs text-stone-400">
            Targeting Exit-Gate Quizzes & Mock Past Papers
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Graph Nodes on Left, Node Deep-Dive on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Struggle Node Cards */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
            Active Struggle Nodes ({filteredNodes.length}):
          </div>

          <div className="space-y-2.5">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const masteryPercent = Math.round(node.masteryScore * 100);

              let badgeBg = 'bg-rose-950 text-rose-300 border-rose-800';
              if (node.frictionLevel === 'MEDIUM') {
                badgeBg = 'bg-amber-950 text-amber-300 border-amber-800';
              } else if (node.frictionLevel === 'LOW') {
                badgeBg = 'bg-emerald-950 text-emerald-300 border-emerald-800';
              }

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'bg-stone-900 border-purple-500 shadow-lg ring-1 ring-purple-400'
                      : 'bg-stone-900/60 border-stone-800 hover:bg-stone-900 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}>
                          {node.frictionLevel} FRICTION
                        </span>
                        <span className="text-[11px] font-mono text-stone-400">
                          {node.conceptLabel}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-stone-100 mt-1">
                        {node.conceptName}
                      </h4>
                      <p className="text-[11px] text-stone-400">{node.subject}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-stone-500 uppercase font-mono">Mastery</div>
                      <div className="text-base font-black font-mono text-purple-300">
                        {masteryPercent}%
                      </div>
                    </div>
                  </div>

                  {/* Mastery Progress Bar */}
                  <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800">
                    <div
                      className={`h-full transition-all ${
                        masteryPercent >= 75
                          ? 'bg-emerald-500'
                          : masteryPercent >= 45
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${masteryPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span>Logged: {node.frequencyCount} query instances</span>
                    <span>Last triggered: {node.lastStruggledAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Node Diagnostics & 1-Tap Remediation */}
        <div className="lg:col-span-5">
          {selectedNode ? (
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-5 sticky top-24">
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase text-purple-400 font-semibold">
                  Node Remediation Plan
                </div>
                <h3 className="font-bold text-base text-white">{selectedNode.conceptName}</h3>
                <p className="text-xs text-stone-400">{selectedNode.subject}</p>
              </div>

              {/* Student Query Sample */}
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5 text-xs">
                <div className="text-[10px] text-stone-500 uppercase font-mono">
                  Origin Query / OCR Capture:
                </div>
                <p className="text-stone-300 italic leading-relaxed">
                  &quot;{selectedNode.rawStudentQuery}&quot;
                </p>
              </div>

              {/* Adaptive Feedback Rule */}
              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/60 text-xs space-y-1 text-purple-200">
                <div className="font-bold flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-purple-400" />
                  <span>Adaptive System Action:</span>
                </div>
                <p className="text-[11px] text-purple-300/90 leading-relaxed">
                  This struggle node is actively assigned to upcoming Exit-Gate Quizzes and weekly Exam Simulator papers to guarantee active recall.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleLaunchPractice(selectedNode)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Launch 25m Socratic Deep Study</span>
                </button>

                <button
                  onClick={() => handleSimulateMastery(selectedNode)}
                  className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mark Mastery Progress (+25%)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 text-center text-xs text-stone-400">
              Select a concept node to view diagnostics and launch a dedicated study session.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
