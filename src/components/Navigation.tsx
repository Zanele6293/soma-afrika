import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COUNTRIES } from '../data/curriculumData';
import { COUNTRY_BRANDING } from '../data/countryBranding';
import { AfricaLogo } from './AfricaLogo';
import { CountryCode } from '../types';
import {
  BookOpen,
  Lock,
  Camera,
  GraduationCap,
  Flame,
  Coins,
  Wifi,
  WifiOff,
  GitBranch,
  ShieldAlert,
  ChevronDown,
  Globe2,
  Check,
  Bell,
  Search,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const {
    profile,
    updateProfile,
    activeScreen,
    navigateTo,
    studySession,
    isOfflineMode,
    toggleOfflineMode,
  } = useApp();

  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const branding = COUNTRY_BRANDING[profile.country] || COUNTRY_BRANDING.ZA;
  const currentCountry = COUNTRIES.find((c) => c.code === profile.country) || COUNTRIES[0];

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectCountry = (code: CountryCode) => {
    updateProfile({ country: code });
    setIsCountryDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1f2023] border-b border-stone-800 text-stone-100 shadow-md">
      {/* Top Application Bar - Facebook / Study Portal Header */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        {/* Left Section: Brand & Instant National Country Selector */}
        <div className="flex items-center gap-3">
          {/* Logo & Platform Name */}
          <div
            onClick={() => navigateTo('DASHBOARD')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            title="SomaAfrika National Academic Portal"
          >
            <div className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center p-1 border border-stone-700">
              <AfricaLogo size={28} />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-amber-400 transition-colors">
                SomaAfrika
              </span>
              <span className="block text-[10px] text-stone-400 leading-none">
                National Study Portal
              </span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-stone-800 hidden sm:block" />

          {/* Interactive National Curriculum & Country Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800/90 hover:bg-stone-700/90 border border-stone-700 text-xs font-semibold text-stone-200 transition-colors cursor-pointer"
              title="Switch national curriculum (South Africa, Zimbabwe, Kenya, Nigeria, etc.)"
            >
              <span className="text-base">{branding.flag}</span>
              <div className="text-left leading-tight hidden xs:block">
                <span className="font-bold text-white block">
                  {branding.shortName}
                </span>
                <span className="text-[10px] text-amber-400 font-mono">
                  {branding.ministryShort}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {/* Dropdown Menu */}
            {isCountryDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-72 rounded-xl bg-stone-900 border border-stone-700 shadow-2xl z-50 py-1 text-xs">
                <div className="px-3 py-2 border-b border-stone-800 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                  Select National Education System:
                </div>
                {COUNTRIES.map((c) => {
                  const b = COUNTRY_BRANDING[c.code];
                  const isSelected = c.code === profile.country;
                  return (
                    <button
                      key={c.code}
                      onClick={() => handleSelectCountry(c.code)}
                      className={`w-full px-3 py-2.5 text-left flex items-center justify-between hover:bg-stone-800 transition-colors cursor-pointer ${
                        isSelected ? 'bg-amber-950/40 text-amber-300 font-bold' : 'text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{b.flag}</span>
                        <div>
                          <div className="font-semibold text-white">{b.countryName}</div>
                          <div className="text-[10px] text-stone-400">{b.curriculumName}</div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Center: Live Deep Focus Alert if locked */}
        {studySession && studySession.state === 'ACTIVE' && (
          <div
            onClick={() => navigateTo('FOCUS_KIOSK')}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/90 border border-orange-600/70 text-orange-200 text-xs font-semibold cursor-pointer shadow-md"
          >
            <Lock className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span className="hidden md:inline">Focus Locked:</span>
            <span className="font-mono font-bold text-orange-300">
              {formatTimer(studySession.remainingSeconds)}
            </span>
          </div>
        )}

        {/* Right Section: Student Telemetry, Rural Sync, & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Rural Offline Mode Toggle */}
          <button
            onClick={toggleOfflineMode}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
              isOfflineMode
                ? 'bg-amber-950/60 text-amber-300 border-amber-600/60'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-white'
            }`}
            title="Toggle rural offline caching"
          >
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline font-medium">
              {isOfflineMode ? 'Offline Mode' : 'Cloud Sync'}
            </span>
          </button>

          {/* Daily Streak */}
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-orange-400 font-semibold"
            title={`${profile.streakDays} consecutive study days`}
          >
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span className="font-mono">{profile.streakDays}d</span>
          </div>

          {/* Knowledge Tokens */}
          <div
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-amber-300 font-semibold"
            title={`${profile.rewardTokens} knowledge tokens earned`}
          >
            <Coins className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-mono">{profile.rewardTokens.toLocaleString()}</span>
          </div>

          {/* Student Profile Avatar */}
          <div
            onClick={() => navigateTo('ONBOARDING')}
            className="flex items-center gap-2 p-1 pl-2 rounded-full bg-stone-800 hover:bg-stone-700 border border-stone-700 cursor-pointer transition-colors"
            title={`${profile.firstName} ${profile.lastName} (${branding.shortName} • Grade ${profile.gradeLevel})`}
          >
            <span className="text-xs font-semibold text-stone-200 hidden md:inline">
              {profile.firstName}
            </span>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 to-emerald-700 flex items-center justify-center font-bold text-xs text-white">
              {profile.firstName[0]}
            </div>
          </div>
        </div>
      </div>

      {/* Main Study Navigation Tabs (Facebook / LMS Style Tabs) */}
      <nav className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto no-scrollbar text-xs border-t border-stone-800 bg-[#191a1d]">
        <button
          onClick={() => navigateTo('DASHBOARD')}
          className={`px-4 py-2.5 font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeScreen === 'DASHBOARD'
              ? 'border-amber-500 text-white bg-stone-800/40'
              : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/20'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Study Desk</span>
        </button>

        <button
          onClick={() => navigateTo('EREADER')}
          className={`px-4 py-2.5 font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeScreen === 'EREADER'
              ? 'border-amber-500 text-white bg-stone-800/40'
              : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/20'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <span>Official Textbooks</span>
        </button>

        <button
          onClick={() => navigateTo('MULTIMODAL_OCR')}
          className={`px-4 py-2.5 font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeScreen === 'MULTIMODAL_OCR'
              ? 'border-orange-500 text-white bg-stone-800/40'
              : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/20'
          }`}
        >
          <Camera className="w-4 h-4 text-orange-400" />
          <span>Snap & Study (Picture)</span>
        </button>

        <button
          onClick={() => navigateTo('FOCUS_KIOSK')}
          className={`px-4 py-2.5 font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeScreen === 'FOCUS_KIOSK'
              ? 'border-orange-500 text-white bg-stone-800/40'
              : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/20'
          }`}
        >
          <Lock className="w-4 h-4 text-orange-400" />
          <span>Focus Kiosk</span>
          {studySession && studySession.state === 'ACTIVE' && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          )}
        </button>

        <button
          onClick={() => navigateTo('MOCK_EXAM')}
          className={`px-4 py-2.5 font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeScreen === 'MOCK_EXAM' || activeScreen === 'EXAM_DIAGNOSTICS'
              ? 'border-amber-500 text-white bg-stone-800/40'
              : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/20'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>{profile.country === 'ZW' ? 'ZIMSEC Exam Hall' : profile.country === 'ZA' ? 'CAPS Matric Hall' : 'National Exam Hall'}</span>
        </button>

        <button
          onClick={() => navigateTo('STRUGGLE_GRAPH')}
          className={`px-4 py-2.5 font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeScreen === 'STRUGGLE_GRAPH'
              ? 'border-amber-500 text-white bg-stone-800/40'
              : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/20'
          }`}
        >
          <GitBranch className="w-4 h-4 text-purple-400" />
          <span>Struggles & Mastery</span>
        </button>
      </nav>
    </header>
  );
};
