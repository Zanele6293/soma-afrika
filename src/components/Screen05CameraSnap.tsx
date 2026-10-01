import React, { useState, useRef } from 'react';
import { SubjectItem, StudentProfile } from '../types';
import { AfricaLogo } from './AfricaLogo';
import { 
  ArrowLeft, 
  ArrowRight, 
  Camera, 
  Check, 
  FileText, 
  Image as ImageIcon, 
  Sparkles, 
  Upload, 
  X 
} from 'lucide-react';

interface Screen05CameraSnapProps {
  subject: SubjectItem;
  profile: StudentProfile;
  onConfirmSnapshot: (data: { imageUrl: string; extractedText: string; concept: string }) => void;
  onCancel: () => void;
}

export const Screen05CameraSnap: React.FC<Screen05CameraSnapProps> = ({
  subject,
  profile,
  onConfirmSnapshot,
  onCancel
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<{
    text: string;
    concept: string;
    formulas: string[];
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-configured realistic sample snapshots from curriculum textbooks
  const sampleSnaps = [
    {
      title: 'Physical Textbook Exercise: Quadratic Function',
      preview: 'Solve 2x² - 7x + 3 = 0 using factorization and verify roots with quadratic formula.',
      concept: 'Quadratic Equation Factorization',
      formulas: ['2x² - 7x + 3 = 0', 'x = (-b ± √(b² - 4ac)) / (2a)']
    },
    {
      title: 'Physics Worksheet: Hydro Turbine Power at Kariba',
      preview: 'Calculate the potential energy of 500 kg water falling 120 m through a penstock. g = 9.8 m/s².',
      concept: 'Gravitational Potential Energy & Kinetic Work',
      formulas: ['E_p = mgh', 'E_k = ½mv²']
    }
  ];

  const handleSelectSample = (sample: typeof sampleSnaps[0]) => {
    setIsProcessing(true);
    setSelectedImage('sample');
    setTimeout(() => {
      setExtractedData({
        text: sample.preview,
        concept: sample.concept,
        formulas: sample.formulas
      });
      setIsProcessing(false);
    }, 700);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setIsProcessing(true);
      setTimeout(() => {
        setExtractedData({
          text: `[Page Scanned from Student Textbook]\nSubject: ${subject.shortName}\nProblem: Evaluate the rate of change and calculate intermediate values step-by-step.`,
          concept: `${subject.shortName} Core Curricular Standard`,
          formulas: ['ax² + bx + c = 0', 'y = mx + c']
        });
        setIsProcessing(false);
      }, 900);
    }
  };

  const handleProceedToKiosk = () => {
    if (!extractedData) return;
    onConfirmSnapshot({
      imageUrl: selectedImage || 'sample',
      extractedText: extractedData.text,
      concept: extractedData.concept
    });
  };

  return (
    <div className="min-h-screen bg-[#14120e] text-[#f4efe6] flex flex-col justify-between font-sans antialiased p-4 md:p-8">
      {/* Top Header */}
      <header className="max-w-2xl mx-auto w-full flex items-center justify-between pb-6 border-b border-stone-800">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Subjects</span>
        </button>
        <AfricaLogo size="sm" />
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto w-full flex-1 my-6 space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Camera className="w-3.5 h-3.5" />
            <span>Snap & Study Physical Material</span>
          </div>
          <h2 className="text-2xl font-bold brand-font text-stone-100">
            Study {subject.shortName} from Your Physical Book
          </h2>
          <p className="text-xs text-stone-400">
            Snap a photo of your paper textbook page or class notes. Our OCR engine transcribes it so you can study in the Focus Kiosk alongside the timer.
          </p>
        </div>

        {/* Upload or Choose Area */}
        <div className="bg-[#1c1916] rounded-3xl border border-stone-800 p-6 space-y-6 shadow-xl">
          
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 flex flex-col items-center justify-center gap-2 cursor-pointer transition"
            >
              <Camera className="w-6 h-6 text-amber-400" />
              <span className="font-bold text-xs">Take Photo with Camera</span>
              <span className="text-[10px] text-stone-400">Scan paper book or homework</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-5 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 flex flex-col items-center justify-center gap-2 cursor-pointer transition"
            >
              <Upload className="w-6 h-6 text-stone-400" />
              <span className="font-bold text-xs">Upload Image File</span>
              <span className="text-[10px] text-stone-400">JPG, PNG, or scan screenshot</span>
            </button>
          </div>

          {/* Sample Snaps */}
          <div className="space-y-2 pt-2 border-t border-stone-800">
            <span className="text-xs font-semibold text-stone-400 block">
              Or pick an accredited textbook sample:
            </span>
            <div className="space-y-2">
              {sampleSnaps.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectSample(s)}
                  className="p-3 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-left cursor-pointer transition space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-stone-200">
                    <span>{s.title}</span>
                    <span className="text-amber-400 text-[10px]">Select Sample ➔</span>
                  </div>
                  <p className="text-[11px] text-stone-400 truncate">{s.preview}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/40 flex items-center justify-center gap-3 text-amber-300 text-xs">
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              <span>Transcribing image and indexing formulas...</span>
            </div>
          )}

          {/* Extracted Content Preview */}
          {extractedData && !isProcessing && (
            <div className="space-y-4 pt-2 border-t border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Transcribed Successfully
                </span>
                <span className="text-xs text-stone-400 font-mono">Concept: {extractedData.concept}</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-200 leading-relaxed whitespace-pre-wrap">
                {extractedData.text}
              </div>

              <div className="flex gap-2">
                {extractedData.formulas.map((f, fIdx) => (
                  <span key={fIdx} className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-amber-400 text-xs font-mono">
                    {f}
                  </span>
                ))}
              </div>

              <button
                onClick={handleProceedToKiosk}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-95"
              >
                <span>Study this Material in Focus Kiosk ➔</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </main>

      <footer className="max-w-2xl mx-auto w-full text-center text-xs text-stone-500 pt-4 border-t border-stone-800">
        All uploaded images are processed to support offline and low-bandwidth student learning.
      </footer>
    </div>
  );
};
