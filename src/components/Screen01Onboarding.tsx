import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COUNTRIES } from '../data/curriculumData';
import { CountryCode, StreamType } from '../types';
import { AfricaLogo } from './AfricaLogo';
import { CheckCircle2, Globe, Sparkles, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

export const Screen01Onboarding: React.FC = () => {
  const { profile, updateProfile, navigateTo, setToastMessage } = useApp();

  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [country, setCountry] = useState<CountryCode>(profile.country);
  const [province, setProvince] = useState(profile.province);
  const [gradeLevel, setGradeLevel] = useState<number>(profile.gradeLevel);
  const [stream, setStream] = useState<StreamType>(profile.stream);
  const [isSyncingBlueprint, setIsSyncingBlueprint] = useState(false);

  const selectedCountryInfo = COUNTRIES.find((c) => c.code === country) || COUNTRIES[0];

  const handleCountryChange = (newCode: CountryCode) => {
    setCountry(newCode);
    const countryData = COUNTRIES.find((c) => c.code === newCode);
    if (countryData && countryData.provinces.length > 0) {
      setProvince(countryData.provinces[0]);
    }
  };

  const handleSaveAndLaunch = () => {
    setIsSyncingBlueprint(true);
    setTimeout(() => {
      updateProfile({
        firstName: firstName.trim() || 'Learner',
        lastName: lastName.trim() || 'Africa',
        country,
        province,
        gradeLevel,
        stream: gradeLevel <= 9 ? 'GENERAL' : stream,
        curriculumCode: selectedCountryInfo.curriculumCode,
        hasOnboarded: true,
      });
      setIsSyncingBlueprint(false);
      setToastMessage(`✨ Syllabus synced! Welcome to ${selectedCountryInfo.curriculumCode} Grade ${gradeLevel}.`);
      navigateTo('DASHBOARD');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header Hero */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="mb-4">
            <AfricaLogo size={56} />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Pan-African K-12 AI Academic Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Configure Your Academic Curriculum
          </h1>
          <p className="text-stone-400 text-sm max-w-xl mx-auto">
            SomaAfrika partitions curriculum syllabi, open-access textbooks, and Socratic mentor models to match your exact national examination board.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm space-y-6">
          {/* Row 1: Student Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Zanele"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Dube"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>
          </div>

          {/* Row 2: Country Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              Select African Country
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {COUNTRIES.map((c) => {
                const isSelected = country === c.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleCountryChange(c.code)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      isSelected
                        ? 'bg-amber-950/70 border-amber-500 text-white shadow-md shadow-amber-950/30'
                        : 'bg-stone-800/60 border-stone-700/80 hover:bg-stone-800 text-stone-300'
                    }`}
                  >
                    <span className="text-2xl">{c.flag}</span>
                    <div className="leading-tight">
                      <div className="font-semibold text-xs text-white">{c.name}</div>
                      <div className="text-[10px] text-amber-400 font-mono mt-0.5">
                        {c.curriculumCode}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Regional / Provincial Alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                Province / Region ({selectedCountryInfo.name})
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              >
                {selectedCountryInfo.provinces.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Grade Level Selector (4 to 12) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Grade Level (4 to 12)
                </label>
                <span className="text-xs font-bold text-amber-400">Grade {gradeLevel}</span>
              </div>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              >
                {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => {
                  let label = `Grade ${g}`;
                  if (country === 'ZA') {
                    if (g === 8) label = 'Grade 8 (Senior Phase - DBE)';
                    else if (g === 9) label = 'Grade 9 (GET Phase Exit Year)';
                    else if (g === 12) label = 'Grade 12 (National Senior Certificate - Matric)';
                    else if (g >= 10) label = `Grade ${g} (FET Phase)`;
                  } else if (country === 'ZW') {
                    if (g === 8) label = 'Form 1 / Grade 8 (ZIMSEC Junior)';
                    else if (g === 9) label = 'Form 2 / Grade 9 (ZIMSEC Junior)';
                    else if (g === 10) label = 'Form 3 / Grade 10 (ZIMSEC O-Level)';
                    else if (g === 11) label = 'Form 4 / Grade 11 (ZIMSEC O-Level Exam)';
                    else if (g === 12) label = 'Form 6 / Grade 12 (ZIMSEC A-Level)';
                  } else if (country === 'NG') {
                    if (g === 8) label = 'JSS 2 / Grade 8 (NERDC Basic)';
                    else if (g === 9) label = 'JSS 3 / Grade 9 (BECE Exam Year)';
                    else if (g === 10) label = 'SSS 1 / Grade 10 (Senior Secondary)';
                    else if (g === 11) label = 'SSS 2 / Grade 11 (Senior Secondary)';
                    else if (g === 12) label = 'SSS 3 / Grade 12 (WAEC WASSCE Exam)';
                  } else if (country === 'MW') {
                    if (g === 8) label = 'Form 1 / Grade 8 (MANEB Junior)';
                    else if (g === 9) label = 'Form 2 / Grade 9 (JCE Exam Year)';
                    else if (g >= 10) label = `Form ${g - 7} / Grade ${g} (MSCE Senior)`;
                  } else if (country === 'KE') {
                    if (g === 8) label = 'Grade 8 (KICD Junior Secondary - CBC)';
                    else if (g === 9) label = 'Grade 9 (KJSEA National Exit Year)';
                    else if (g >= 10) label = `Grade ${g} (Senior Secondary / KCSE)`;
                  } else if (country === 'GH') {
                    if (g === 8) label = 'JHS 2 / Grade 8 (NaCCA Basic Education)';
                    else if (g === 9) label = 'JHS 3 / Grade 9 (BECE Exam Year)';
                    else if (g >= 10) label = `SHS ${g - 9} / Grade ${g} (WASSCE Senior)`;
                  }
                  return (
                    <option key={g} value={g}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Row 4: Academic Stream Assignment (Auto-hidden for 4-9; Selectable for 10-12) */}
          {gradeLevel >= 10 ? (
            <div className="pt-2 border-t border-stone-800">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                Senior Academic Stream (Grades 10–12)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setStream('SCIENCE_AND_TECH')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    stream === 'SCIENCE_AND_TECH'
                      ? 'bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-400'
                      : 'bg-stone-800/60 border-stone-700/80 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="text-xs font-bold text-emerald-400 mb-1">🧪 Science & Technology</div>
                  <p className="text-[11px] text-stone-400 leading-snug">
                    Physics, Chemistry, Life Sciences, Pure Maths, Computer Science, Technical Drawing.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setStream('BUSINESS_COMMERCE')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    stream === 'BUSINESS_COMMERCE'
                      ? 'bg-blue-950/60 border-blue-500 text-white ring-1 ring-blue-400'
                      : 'bg-stone-800/60 border-stone-700/80 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="text-xs font-bold text-blue-400 mb-1">📈 Business & Commerce</div>
                  <p className="text-[11px] text-stone-400 leading-snug">
                    Accounting, Commerce, Economics, Business Studies, Entrepreneurship.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setStream('HUMANITIES_ARTS')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    stream === 'HUMANITIES_ARTS'
                      ? 'bg-purple-950/60 border-purple-500 text-white ring-1 ring-purple-400'
                      : 'bg-stone-800/60 border-stone-700/80 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="text-xs font-bold text-purple-400 mb-1">🎨 Humanities & Arts</div>
                  <p className="text-[11px] text-stone-400 leading-snug">
                    History, Government, Literature in English, African Languages (isiZulu, Shona, etc.).
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-stone-800/50 border border-stone-700/60 text-xs text-stone-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Foundational Stream active for Grade {gradeLevel}: Encompasses General Mathematics, Natural Sciences, Social Sciences, Technology, and EMS.
              </span>
            </div>
          )}

          {/* Curriculum Blueprint Summary Badge */}
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedCountryInfo.flag}</span>
              <div>
                <div className="font-semibold text-stone-200">
                  {selectedCountryInfo.curriculumName}
                </div>
                <div className="text-stone-400 text-[11px]">
                  Region: {province} • Stream: {gradeLevel <= 9 ? 'Foundational Phase' : stream}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Ministry-Approved OER Linked</span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            onClick={handleSaveAndLaunch}
            disabled={isSyncingBlueprint}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm shadow-xl shadow-orange-950/40 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isSyncingBlueprint ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Syncing Vector Syllabus & Socratic Weights...</span>
              </>
            ) : (
              <>
                <span>Save & Enter Academic Library</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
