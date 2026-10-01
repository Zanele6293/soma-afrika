import React, { useState } from 'react';
import { CountryCode, StudentProfile } from '../types';
import { COUNTRIES } from '../data/curriculumData';
import { AfricaLogo } from './AfricaLogo';
import { ArrowRight, BookOpen, GraduationCap, MapPin, Sparkles, User } from 'lucide-react';

interface Screen01SignupProps {
  onComplete: (profile: StudentProfile) => void;
}

export const Screen01Signup: React.FC<Screen01SignupProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [country, setCountry] = useState<CountryCode>('ZA');
  const [province, setProvince] = useState(COUNTRIES['ZA'].provinces[0]);
  const [grade, setGrade] = useState(COUNTRIES['ZA'].gradeLevels[0].id);
  const [error, setError] = useState('');

  const currentCountryInfo = COUNTRIES[country];

  const handleCountryChange = (newCountry: CountryCode) => {
    setCountry(newCountry);
    setProvince(COUNTRIES[newCountry].provinces[0]);
    setGrade(COUNTRIES[newCountry].gradeLevels[0].id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your first name');
      return;
    }
    if (!surname.trim()) {
      setError('Please enter your surname');
      return;
    }

    const profile: StudentProfile = {
      name: name.trim(),
      surname: surname.trim(),
      country,
      province,
      grade,
      tokens: 25,
      streakDays: 3,
      totalStudyMinutes: 48,
      joinedAt: new Date().toISOString(),
      completedChapterIds: [],
      subjectProgress: {}
    };

    onComplete(profile);
  };

  return (
    <div className="min-h-screen bg-[#14120e] text-[#f4efe6] flex flex-col justify-between relative overflow-hidden font-sans">
      {/* African Geometric Pattern Borders */}
      <div className="absolute top-0 left-0 bottom-0 w-4 md:w-8 bg-repeat-y opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#d97706 1.5px, transparent 1.5px), radial-gradient(#92400e 1.5px, #1c1917 1.5px)`,
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 8px 8px'
        }}
      />
      <div className="absolute top-0 right-0 bottom-0 w-4 md:w-8 bg-repeat-y opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#d97706 1.5px, transparent 1.5px), radial-gradient(#92400e 1.5px, #1c1917 1.5px)`,
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 8px 8px'
        }}
      />

      {/* Top Banner Header */}
      <header className="px-6 py-5 border-b border-stone-800/80 bg-stone-900/60 backdrop-blur flex items-center justify-between z-10">
        <AfricaLogo size="md" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Pan-African Academic K-12</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col md:flex-row items-center gap-8 md:gap-12 z-10 w-full">
        {/* Left Side: Pitch and African Identity matching the mockup style */}
        <div className="flex-1 space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-800/80 text-stone-300 text-xs tracking-wider uppercase font-semibold border border-stone-700">
            <span>Official Curriculum Network</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black brand-font tracking-tight text-stone-100 leading-tight">
            Learn. Question. <span className="text-amber-500">Understand.</span>
          </h1>

          <p className="text-stone-300 text-sm md:text-base leading-relaxed">
            Welcome to <strong className="text-stone-100 font-semibold">SomaAfrika</strong>. Tailored specifically to your country’s national syllabus, textbooks, and examination council.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-200">Official Syllabi</h4>
                <p className="text-[11px] text-stone-400">CAPS, ZIMSEC, WAEC, MANEB, CBC</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-200">Socratic Mentor</h4>
                <p className="text-[11px] text-stone-400">Guiding steps without direct answers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Step 1 Sign-Up Form */}
        <div className="w-full md:w-[420px] bg-[#1e1b18] p-6 md:p-8 rounded-2xl border border-stone-800 shadow-2xl shadow-black/80 relative">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-800">
            <div>
              <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-500" />
                Student Sign-In / Register
              </h2>
              <p className="text-xs text-stone-400">Enter your details to open your study portal</p>
            </div>
            <span className="text-2xl">{currentCountryInfo.flag}</span>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* First Name & Surname */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sipho"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700/80 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">Surname</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dube"
                  value={surname}
                  onChange={(e) => { setSurname(e.target.value); setError(''); }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700/80 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                />
              </div>
            </div>

            {/* Country Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                Country Currently At
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(COUNTRIES) as CountryCode[]).map((cCode) => {
                  const c = COUNTRIES[cCode];
                  const isSelected = country === cCode;
                  return (
                    <button
                      key={cCode}
                      type="button"
                      onClick={() => handleCountryChange(cCode)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300 ring-1 ring-amber-500/50'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      <span className="text-xl mb-1">{c.flag}</span>
                      <span className="truncate w-full text-center">{c.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Province / Region */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">Province / State / Region</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700/80 text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              >
                {currentCountryInfo.provinces.map((prov) => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>

            {/* Grade Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                Select Your Current Grade / Level
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700/80 text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              >
                {currentCountryInfo.gradeLevels.map((gl) => (
                  <option key={gl.id} value={gl.id}>
                    {gl.label} — {gl.stage}
                  </option>
                ))}
              </select>
            </div>

            {/* Action CTA */}
            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-[0.98]"
            >
              <span>Enter Study Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      {/* Footer Branding Ribbon */}
      <footer className="py-4 px-6 border-t border-stone-800/80 bg-stone-950/80 text-stone-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2">
          <span>Active Curriculum:</span>
          <span className="font-semibold text-stone-300">{currentCountryInfo.curriculum}</span>
          <span className="text-stone-600">•</span>
          <span className="text-stone-400">{currentCountryInfo.board}</span>
        </div>
        <div className="text-amber-500/80 font-medium tracking-wider uppercase text-[11px]">
          Learn. Question. Understand.
        </div>
      </footer>
    </div>
  );
};
