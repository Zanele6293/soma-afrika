import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_PHYSICAL_SCANS, SampleScan } from '../data/sampleScans';
import { AfricaLogo } from './AfricaLogo';
import {
  Camera,
  Upload,
  Sparkles,
  Send,
  GitBranch,
  CheckCircle,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Zap,
  Lock,
  Clock,
  Info,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const Screen05MultimodalOCR: React.FC = () => {
  const { profile, addOrUpdateStruggleNode, navigateTo, startStudySession } = useApp();

  const [selectedScan, setSelectedScan] = useState<SampleScan>(SAMPLE_PHYSICAL_SCANS[0]);
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Extracted Knowledge state
  const [extractedData, setExtractedData] = useState(SAMPLE_PHYSICAL_SCANS[0].simulatedExtraction);

  // Socratic Chat state
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: 'user' | 'assistant'; text: string }>
  >([
    {
      role: 'assistant',
      text: `Hello ${profile.firstName}! I have carefully reviewed this study page. As your SomaAfrika Socratic mentor, my sacred duty is to TEACH you how to understand and solve this step-by-step. I will never simply give you direct answers or shortcuts, because true mastery comes from thinking through the principles. Look at the problem—what is the very first piece of information given to us?`,
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  // Focus Kiosk launcher modal for this snapshot
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusError, setFocusError] = useState<string | null>(null);

  // Handle sample selection
  const handleSelectSample = (scan: SampleScan) => {
    setSelectedScan(scan);
    setCustomImageBase64(null);
    setExtractedData(scan.simulatedExtraction);
    setChatMessages([
      {
        role: 'assistant',
        text: `I've opened "${scan.title}". Let's examine this carefully together. Remember: I am here to teach you the concepts, not to hand you the answers. What concept or formula do you think connects with this problem?`,
      },
    ]);
  };

  // Handle custom image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const base64 = evt.target?.result as string;
      setCustomImageBase64(base64);
      setIsAnalyzing(true);

      try {
        const res = await fetch('/api/ocr-vision-analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64,
            subject: selectedScan.subject,
            curriculumCode: profile.curriculumCode,
            gradeLevel: profile.gradeLevel,
          }),
        });

        const data = await res.json();
        if (data.extraction) {
          setExtractedData(data.extraction);
          setChatMessages([
            {
              role: 'assistant',
              text: `I've analyzed your snapshot from your notebook! Let's explore "${data.extraction.syllabusTopic || 'this topic'}". I will guide you step-by-step so you understand the logic. What is the question asking us to determine?`,
            },
          ]);
          // Automatically log to struggle graph
          addOrUpdateStruggleNode(
            data.extraction.conceptLabel,
            data.extraction.syllabusTopic,
            selectedScan.subject,
            data.extraction.extractedText
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Launch Deep Study from this Snapshot
  const handleLaunchDeepStudyFromSnapshot = () => {
    setFocusError(null);
    const result = startStudySession(
      focusMinutes,
      extractedData.syllabusTopic || selectedScan.title,
      selectedScan.subject,
      extractedData.extractedText,
      {
        sourceType: 'PHYSICAL_SNAPSHOT_CAPTURE',
        capturedImageUrl: customImageBase64 || selectedScan.sampleImageUrl,
        capturedTextSnippet: extractedData.extractedText,
        keyObjectives: [extractedData.learningObjective],
        conceptsStudied: [extractedData.conceptLabel, extractedData.syllabusTopic],
      }
    );

    if (!result.success) {
      setFocusError(result.message || 'Validation failed');
    } else {
      setIsFocusModalOpen(false);
    }
  };

  // Socratic chat submission
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim() || isReplying) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    const newMsgs = [...chatMessages, { role: 'user' as const, text: userText }];
    setChatMessages(newMsgs);
    setIsReplying(true);

    try {
      const response = await fetch('/api/socratic-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          context: `OCR Snapshot Problem: "${extractedData.extractedText}". Concept: "${extractedData.conceptLabel}". Syllabus: "${extractedData.syllabusTopic}". Rule: STRICT SOCRATIC TEACHING ONLY. NEVER PROVIDE DIRECT ANSWERS OR FORMULA SOLUTIONS. TEACH BY ASKING GUIDING QUESTIONS AND OFFERING AFRICAN CULTURAL ANALOGIES.`,
          country: profile.country,
          gradeLevel: profile.gradeLevel,
          subject: selectedScan.subject,
        }),
      });

      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.response || 'Think about what principle applies here...',
        },
      ]);

      // Tag to struggle graph
      addOrUpdateStruggleNode(
        extractedData.conceptLabel,
        extractedData.syllabusTopic,
        selectedScan.subject,
        userText
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsReplying(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Dual Option Banner: Option for Books or Picture */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-950/80 via-stone-900 to-amber-950/80 border border-orange-500/40 p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center shrink-0 shadow">
            <Camera className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 font-mono">
                Study Option 2 of 2: Picture / Snapshot Mode
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/40">
                Multimodal Socratic Mentoring
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-white">
              Study from Your Paper Book, Notebook, or Exam Sheet
            </h2>
            <p className="text-[11px] text-stone-400">
              Take a picture or select an approved scan. Your mentor analyzes the snapshot, breaks down the steps, and teaches you how to solve it without spoonfeeding the answer!
            </p>
          </div>
        </div>

        {/* Button to Switch to Option 1: Digital Textbooks */}
        <button
          onClick={() => navigateTo('EREADER')}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-950/40 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02] shrink-0"
          title="Switch to Option 1: Read complete 100-500+ page curriculum textbooks"
        >
          <BookOpen className="w-4 h-4" />
          <span>Option 1: Official Textbooks</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5" />
            <span>Multimodal Snap & Study • Socratic Guidance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Share What You Are Studying: Paper Book & Notebook Ingestion
          </h1>
          <p className="text-stone-400 text-xs max-w-2xl leading-relaxed">
            If you don't have a digital textbook, simply take a photo of your paper school book, printed past exam, or handwritten notes. Your Socratic mentor will read it, teach you the underlying principles, and help you master the material—<strong>teaching you how to think, never just handing you the answers!</strong>
          </p>
        </div>

        {/* Upload Custom CTA & Launch Deep Study Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <label className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setIsFocusModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
            title="Lock into Focus Kiosk while studying this snapshot"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Study in Focus Kiosk</span>
          </button>
        </div>
      </div>

      {/* Preset Physical Scans Selector */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center justify-between">
          <span>Or Select from Approved Physical Textbook Scans:</span>
          <span className="text-[11px] text-amber-400 font-mono">
            {profile.curriculumCode} • Grade {profile.gradeLevel}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_PHYSICAL_SCANS.map((scan) => {
            const isSelected = selectedScan.id === scan.id && !customImageBase64;
            return (
              <button
                key={scan.id}
                onClick={() => handleSelectSample(scan)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-950/70 border-amber-500 text-white shadow-md'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800/80'
                }`}
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-800 shrink-0 border border-stone-700">
                  <img
                    src={scan.sampleImageUrl}
                    alt={scan.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.5 overflow-hidden">
                  <div className="text-[10px] text-amber-400 font-mono font-bold">
                    {scan.thumbnailBadge}
                  </div>
                  <div className="text-xs font-bold truncate">{scan.title}</div>
                  <div className="text-[10px] text-stone-400 truncate">{scan.subject}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace: Left (Image Viewfinder & Knowledge Extractor) | Right (Socratic Teaching Tutor) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image & OCR Extraction */}
        <div className="lg:col-span-6 space-y-4">
          {/* Viewfinder Preview Box */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 shadow-xl min-h-[300px] flex items-center justify-center">
            {customImageBase64 ? (
              <img
                src={customImageBase64}
                alt="Student uploaded problem"
                className="w-full h-auto max-h-[360px] object-contain"
              />
            ) : (
              <img
                src={selectedScan.sampleImageUrl}
                alt={selectedScan.title}
                className="w-full h-auto max-h-[360px] object-contain opacity-90"
              />
            )}

            {/* OCR Processing Overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
                <div className="text-sm font-bold text-white">Extracting Scientific Text & Formulas...</div>
                <div className="text-xs text-stone-400 font-mono max-w-xs">
                  Running Gemini 3.8-Flash Multimodal OCR • Identifying syllabus topics & LaTeX equations
                </div>
              </div>
            )}

            {/* Ingestion Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-stone-900/90 border border-stone-700 text-[10px] font-mono text-stone-300 flex items-center gap-1.5 shadow">
              <Camera className="w-3 h-3 text-emerald-400" />
              <span>{customImageBase64 ? 'Live Upload' : 'National Worksheet Archive'}</span>
            </div>
          </div>

          {/* Extracted Scientific Content Box */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-200 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Extracted Curriculum Text & Problem</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-600/30 font-mono">
                OCR Parsed
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed bg-stone-950 p-3.5 rounded-xl border border-stone-800">
              {extractedData.extractedText}
            </p>

            {/* Extracted LaTeX Formulas */}
            {extractedData.extractedFormulas && extractedData.extractedFormulas.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] text-stone-400 uppercase font-mono">
                  Identified Formulas (LaTeX):
                </div>
                <div className="space-y-1">
                  {extractedData.extractedFormulas.map((f, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-stone-950 border border-amber-500/20 text-amber-300 font-mono text-xs text-center"
                    >
                      ${f}$
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curricular Topic & Learning Objective */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-stone-800/80">
              <div className="p-2.5 rounded-lg bg-stone-800/50">
                <div className="text-[10px] text-stone-400 uppercase">Syllabus Topic:</div>
                <div className="font-semibold text-stone-200 text-xs mt-0.5">
                  {extractedData.syllabusTopic}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-800/50">
                <div className="text-[10px] text-stone-400 uppercase">Struggle Node Tag:</div>
                <div className="font-mono text-[11px] text-rose-400 mt-0.5">
                  {extractedData.conceptLabel}
                </div>
              </div>
            </div>

            {/* Study Session & Struggle Graph logging notice */}
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between text-[11px] text-amber-200">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                <span>When you study this, your Exit-Gate Quiz will test what was extracted here!</span>
              </div>
              <button
                onClick={() => setIsFocusModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shrink-0 cursor-pointer"
              >
                Study Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Socratic Dialogue Pane */}
        <div className="lg:col-span-6 bg-stone-900 border border-stone-800 rounded-2xl flex flex-col justify-between shadow-xl min-h-[560px]">
          {/* Socratic Chat Header */}
          <div className="p-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <AfricaLogo size={36} />
              <div>
                <h3 className="font-bold text-xs text-white">Socratic Mentor: Guided Learning</h3>
                <p className="text-[10px] text-stone-400">
                  Strict Rule: Teaches you the concepts step-by-step; zero direct answers
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600/40 text-[10px] font-mono">
              Teacher Mode
            </span>
          </div>

          {/* Message Thread */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] p-4 rounded-2xl leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-600 text-white rounded-br-none shadow-md'
                      : 'bg-stone-950 text-stone-200 border border-stone-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}

            {isReplying && (
              <div className="flex items-center gap-2 text-stone-400 text-xs italic p-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Formulating pedagogical stepping-stone question...</span>
              </div>
            )}
          </div>

          {/* Quick African Context Suggestions */}
          <div className="p-2 border-t border-stone-800 bg-stone-950/60 flex items-center gap-1.5 overflow-x-auto text-[11px] text-stone-300">
            <button
              onClick={() => {
                setInputQuery('Can you explain the main concept first before we calculate?');
              }}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 shrink-0 border border-stone-700 cursor-pointer"
            >
              📖 Teach Core Concept
            </button>
            <button
              onClick={() => {
                setInputQuery('Can you give an African daily life or market analogy for this?');
              }}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 shrink-0 border border-stone-700 cursor-pointer"
            >
              🌾 African Daily Analogy
            </button>
            <button
              onClick={() => {
                setInputQuery('What is the very first step I should write down?');
              }}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 shrink-0 border border-stone-700 cursor-pointer"
            >
              🎯 First Stepping Stone
            </button>
          </div>

          {/* Chat Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-stone-800 bg-stone-950 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask a question or explain what you think the first step is..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isReplying}
              className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white disabled:opacity-50 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Focus Kiosk Setup Modal for this Snapshot */}
      {isFocusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-stone-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-950 border border-orange-500/40 text-orange-400 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Study This Snapshot in Focus Kiosk</h3>
                  <p className="text-[11px] text-stone-400">Lock distractions while studying your paper book</p>
                </div>
              </div>
              <button
                onClick={() => setIsFocusModalOpen(false)}
                className="text-stone-400 hover:text-stone-200 text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                <Info className="w-3.5 h-3.5" />
                <span>Recorded Learning Telemetry:</span>
              </div>
              <p className="text-stone-400 text-[11px] leading-relaxed">
                • What you study from this snapshot is logged into your active study record.
                <br />
                • When your timer elapses, your <strong>Exit-Gate Quiz</strong> will specifically test you on the concepts extracted from this snapshot!
              </p>
            </div>

            {/* Slider Duration Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-stone-300">Planned Duration:</span>
                <span className="text-base font-extrabold text-amber-400 font-mono">
                  {focusMinutes} Minutes
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="120"
                step="1"
                value={focusMinutes}
                onChange={(e) => setFocusMinutes(Number(e.target.value))}
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
              <div className="text-[10px] uppercase font-semibold text-stone-400">Snapshot Topic:</div>
              <div className="font-bold text-stone-200">{extractedData.syllabusTopic || selectedScan.title}</div>
              <div className="text-[11px] text-amber-400">{selectedScan.subject}</div>
            </div>

            {focusError && (
              <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{focusError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsFocusModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLaunchDeepStudyFromSnapshot}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-orange-950/40 flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock In & Study</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
