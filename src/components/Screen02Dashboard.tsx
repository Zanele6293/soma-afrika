import React, { useState, useEffect } from 'react';
import { CountryCode, StudentProfile, SubjectItem, ReadingMemoryItem } from '../types';
import { COUNTRIES, getCurriculumSubjects } from '../data/curriculumData';
import { AfricaLogo } from './AfricaLogo';
import { 
  ArrowRight, 
  Award, 
  BookMarked, 
  BookOpen, 
  Camera, 
  CheckCircle, 
  ChevronDown, 
  Clock, 
  Compass, 
  Feather, 
  Filter, 
  GraduationCap, 
  HelpCircle, 
  Home, 
  Lock, 
  LogOut, 
  Menu, 
  Play, 
  RotateCcw, 
  Search, 
  Send, 
  Sparkles, 
  Tag, 
  Timer, 
  Trophy, 
  Unlock, 
  User, 
  X 
} from 'lucide-react';

interface Screen02DashboardProps {
  profile: StudentProfile;
  onSelectSubject: (subject: SubjectItem, mode: 'textbook' | 'camera', chapterIndex?: number, startPage?: number) => void;
  onStartFocusStudy: (subject: SubjectItem, durationMin: number, mode: 'textbook' | 'camera', chapterIndex?: number, startPage?: number) => void;
  onOpenLiterature: () => void;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onLogout: () => void;
}

export const Screen02Dashboard: React.FC<Screen02DashboardProps> = ({
  profile,
  onSelectSubject,
  onStartFocusStudy,
  onOpenLiterature,
  onUpdateProfile,
  onLogout
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem | null>(null);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);
  const [selectedStartPage, setSelectedStartPage] = useState<number>(1);
  const [showKioskModal, setShowKioskModal] = useState(false);
  const [kioskDuration, setKioskDuration] = useState<number>(25);
  const [kioskMode, setKioskMode] = useState<'textbook' | 'camera'>('textbook');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [quickSocraticQuestion, setQuickSocraticQuestion] = useState('');
  const [quickQuestionReply, setQuickQuestionReply] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const [readingMemory, setReadingMemory] = useState<Record<string, ReadingMemoryItem>>({});

  // Load reading memory from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('soma_reading_memory');
      if (saved) {
        setReadingMemory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load reading memory', e);
    }
  }, []);

  const countryInfo = COUNTRIES[profile.country];
  const subjects = getCurriculumSubjects(profile.country, profile.grade);

  // Filter subjects by search query and academic stream
  const filteredSubjects = subjects.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedStream === 'all') return true;
    if (selectedStream === 'compulsory') return s.isCompulsory;
    return s.category === selectedStream;
  });

  const handleOpenFocusModal = (
    subj: SubjectItem, 
    mode: 'textbook' | 'camera' = 'textbook', 
    chapterIndex: number = 0,
    startPage: number = 1
  ) => {
    setSelectedSubject(subj);
    setSelectedChapterIndex(chapterIndex);
    setSelectedStartPage(startPage);
    setKioskMode(mode);
    setShowKioskModal(true);
  };

  const handleLaunchKiosk = () => {
    if (!selectedSubject) return;
    setShowKioskModal(false);
    onStartFocusStudy(selectedSubject, kioskDuration, kioskMode, selectedChapterIndex, selectedStartPage);
  };

  const handleCountrySwitch = (cCode: CountryCode) => {
    setShowCountryDropdown(false);
    onUpdateProfile({
      country: cCode,
      province: COUNTRIES[cCode].provinces[0],
      grade: COUNTRIES[cCode].gradeLevels[0].id
    });
  };

  const handleQuickQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSocraticQuestion.trim()) return;

    setIsAsking(true);
    setTimeout(() => {
      setIsAsking(false);
      setQuickQuestionReply(
        `Let's break that down Socratically: Before looking at the final solution, what key principle or formula from your ${countryInfo.curriculum} syllabus applies here? What is the first known variable?`
      );
    }, 500);
  };

  // Stream categories
  const streamCategories = [
    { id: 'all', label: 'All Subjects' },
    { id: 'compulsory', label: '⭐ Compulsory Core' },
    { id: 'science', label: 'Sciences & Tech' },
    { id: 'commercial', label: 'Business & Commercial' },
    { id: 'humanities', label: 'Humanities & Arts' },
    { id: 'applied', label: 'Applied & Technical' }
  ];

  return (
    <div className="min-h-screen bg-[#14120e] text-[#f4efe6] flex flex-col justify-between font-sans antialiased relative pb-16 md:pb-0">
      
      {/* Top Navigation Bar with Dynamic Pan-African Country Switcher */}
      <header className="sticky top-0 z-40 bg-[#1a1714]/95 backdrop-blur border-b border-stone-800 px-3 md:px-8 py-3 flex items-center justify-between shadow-md">
        <AfricaLogo size="md" subtitleText={countryInfo.hallName} />

        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Dynamic Pan-African Country Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-700/80 hover:border-amber-500 text-xs font-bold transition cursor-pointer"
              title="Switch Country Curriculum"
            >
              <span className="text-base">{countryInfo.flag}</span>
              <span className="hidden sm:inline font-bold text-stone-200">{countryInfo.name}</span>
              <span className="text-stone-500 font-normal">({countryInfo.code})</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {/* Dropdown Menu */}
            {showCountryDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-[#1c1916] border border-stone-700 rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500 border-b border-stone-800">
                  Select National Ministry / Exam Board:
                </div>
                {(Object.keys(COUNTRIES) as CountryCode[]).map((cCode) => {
                  const c = COUNTRIES[cCode];
                  const isSelected = profile.country === cCode;
                  return (
                    <button
                      key={cCode}
                      onClick={() => handleCountrySwitch(cCode)}
                      className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between text-xs font-semibold transition cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' 
                          : 'text-stone-300 hover:bg-stone-850 hover:text-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{c.flag}</span>
                        <div>
                          <div className="text-stone-100 font-bold">{c.name}</div>
                          <div className="text-[10px] text-amber-400 font-mono">{c.curriculum}</div>
                        </div>
                      </div>
                      {isSelected && <span className="text-amber-400 font-bold text-sm">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tokens Balance Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{profile.tokens} Tokens</span>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition cursor-pointer"
            aria-label="Open navigation menu"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end">
          <div className="w-80 bg-[#1c1916] h-full p-6 border-l border-stone-800 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <AfricaLogo size="sm" subtitleText={countryInfo.hallName} />
                <button onClick={() => setShowMobileMenu(false)} className="text-stone-400 hover:text-stone-100 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Student info */}
              <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-xs space-y-1.5">
                <p className="text-stone-400">Active Student:</p>
                <p className="font-bold text-stone-100 text-sm">{profile.name} {profile.surname}</p>
                <p className="text-amber-400 font-semibold">{countryInfo.flag} {countryInfo.name} ({profile.province})</p>
                <p className="text-stone-300 font-medium">{countryInfo.hallName}</p>
                <p className="text-stone-400">{profile.grade} • {countryInfo.curriculum}</p>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    onOpenLiterature();
                  }}
                  className="w-full p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2 cursor-pointer transition"
                >
                  <Feather className="w-4 h-4 text-amber-400" />
                  <span>African Literature & Novels (No Quizzes)</span>
                </button>
              </div>

              {/* Switch Grade */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Switch Grade Level</label>
                <select
                  value={profile.grade}
                  onChange={(e) => onUpdateProfile({ grade: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                >
                  {countryInfo.gradeLevels.map((gl) => (
                    <option key={gl.id} value={gl.id}>{gl.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full py-2.5 px-4 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition mt-6"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out / Switch Student</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Study Hub Body */}
      <main className="max-w-5xl mx-auto w-full px-4 py-5 md:py-8 flex-1 space-y-6">
        
        {/* Main Card Container */}
        <div className="bg-[#1b1815] rounded-3xl border border-stone-800/80 shadow-2xl p-5 md:p-8 space-y-6 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

          {/* Dynamic National Hall Badge & Compulsory Subjects Notice */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <span className="text-base">{countryInfo.flag}</span>
                <span>{countryInfo.hallName}</span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-300">{countryInfo.board}</span>
              </div>

              <span className="text-[11px] text-stone-400 font-mono">
                {profile.grade} Syllabus Aligned
              </span>
            </div>

            {/* Compulsory subjects summary banner */}
            <div className="p-3 rounded-2xl bg-[#221e1a] border border-stone-800 text-xs text-stone-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-500 shrink-0" />
                <span><strong className="text-amber-400 font-semibold">National Core Policy:</strong> {countryInfo.compulsoryNotes}</span>
              </div>
            </div>
          </div>

          {/* Greeting Section */}
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold brand-font text-stone-100">
              Hello, <span className="text-amber-500 font-black">{profile.name}</span>
            </h1>
            <p className="text-stone-300 text-sm md:text-base font-medium">
              What subject or national chapter would you like to master today?
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleQuickQuestionSubmit} className="relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search subject, syllabus topic, formula, or concept..."
                value={quickSocraticQuestion}
                onChange={(e) => {
                  setQuickSocraticQuestion(e.target.value);
                  setQuickQuestionReply(null);
                }}
                className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-[#26231f] border border-stone-700/80 text-stone-100 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition shadow-inner"
              />
              <button
                type="submit"
                disabled={isAsking}
                className="absolute right-2 w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 flex items-center justify-center shadow-md cursor-pointer transition transform active:scale-95 disabled:opacity-50"
                aria-label="Submit question"
              >
                <ArrowRight className="w-4 h-4 font-bold" />
              </button>
            </div>
          </form>

          {/* Socratic Instant Reply Drawer */}
          {quickQuestionReply && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-xs md:text-sm space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Socratic Academic Mentor:</span>
              </div>
              <p className="leading-relaxed">{quickQuestionReply}</p>
              <div className="pt-1 flex justify-end">
                <button
                  onClick={() => setQuickQuestionReply(null)}
                  className="text-stone-400 hover:text-stone-200 text-xs underline cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* DEDICATED PROMINENT AFRICAN LITERATURE TAB CTA (ZERO QUIZZES) */}
          <div 
            onClick={onOpenLiterature}
            className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-[#2c1d14] via-[#24170e] to-[#1c120a] border border-amber-600/50 flex items-center justify-between cursor-pointer hover:border-amber-400 transition group shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
                <Feather className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-stone-100 group-hover:text-amber-400 transition">
                    Dedicated African Literature & Story Library
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-black text-[10px]">
                    ZERO QUIZZES
                  </span>
                </div>
                <p className="text-xs text-stone-300 mt-0.5">
                  Read The Epic of Sundiata, Anansi the Spider, Queen Nzinga, and Achebe’s Things Fall Apart for pure cultural enjoyment.
                </p>
              </div>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-stone-800 group-hover:bg-amber-500 text-stone-300 group-hover:text-stone-950 flex items-center justify-center transition shrink-0 shadow">
              <ArrowRight className="w-4 h-4 font-bold" />
            </div>
          </div>

          {/* Stream Filter Chips (Requirement 1: Compulsory vs Streams) */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider">
              <span>Filter by Curriculum Stream:</span>
              <span className="text-amber-400">{filteredSubjects.length} Subjects</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {streamCategories.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStream(st.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedStream === st.id
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-stone-900 border border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* SUBJECT CARDS DIRECTORY WITH MULTI-PAGE CHAPTER ORDER & RESUME BANNER */}
          <div className="space-y-4">
            {filteredSubjects.map((subject) => {
              const progress = profile.subjectProgress?.[subject.id] || { 
                unlockedChapterIndex: 0, 
                currentChapterIndex: 0,
                lastReadPageNumber: 1
              };

              const memory = readingMemory[subject.id];

              return (
                <div
                  key={subject.id}
                  className="p-5 rounded-3xl bg-[#231f1b] border border-stone-800/90 shadow-sm space-y-4"
                >
                  {/* Subject Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-lg text-stone-100">
                          {subject.name}
                        </h4>
                        
                        {subject.isCompulsory && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] font-black uppercase tracking-wider">
                            Compulsory
                          </span>
                        )}

                        <span className="px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-amber-400 text-[10px] font-bold">
                          {subject.totalChapters} Sequential Chapters
                        </span>
                      </div>
                      
                      <p className="text-xs text-stone-400">
                        {subject.description}
                      </p>
                    </div>

                    {/* Direct Launch Active Chapter */}
                    <button
                      onClick={() => handleOpenFocusModal(subject, 'textbook', progress.currentChapterIndex, progress.lastReadPageNumber || 1)}
                      className="self-start sm:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow transition"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Study Chapter {progress.currentChapterIndex + 1}</span>
                    </button>
                  </div>

                  {/* REQUIREMENT 2: RESUME CHAPTER X, PAGE Y 1-CLICK JUMP BANNER */}
                  {memory && (
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-stone-300">
                        <RotateCcw className="w-4 h-4 text-amber-400" />
                        <span>Previous Reading Position: <strong>Chapter {memory.chapterIndex + 1}, Page {memory.lastReadPageNumber}</strong> ({memory.chapterTitle})</span>
                      </div>
                      
                      <button
                        onClick={() => handleOpenFocusModal(subject, 'textbook', memory.chapterIndex, memory.lastReadPageNumber)}
                        className="px-3 py-1 rounded-xl bg-amber-500 text-stone-950 font-bold text-[11px] hover:bg-amber-600 cursor-pointer shadow transition"
                      >
                        Resume Page {memory.lastReadPageNumber} ➔
                      </button>
                    </div>
                  )}

                  {/* Sequential Chapter Progression Carousel */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-stone-400 font-semibold">
                      <span>Interactive Book Chapters (Sequential Progression):</span>
                      <span className="text-amber-400 font-mono">
                        Unlocked up to Chapter {Math.min(subject.totalChapters, progress.unlockedChapterIndex + 1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {subject.textbook.chapters.map((ch, chIdx) => {
                        const isUnlocked = chIdx <= progress.unlockedChapterIndex;
                        const isCurrent = chIdx === progress.currentChapterIndex;
                        const isCompleted = chIdx < progress.unlockedChapterIndex;

                        return (
                          <div
                            key={ch.id}
                            onClick={() => {
                              if (isUnlocked) {
                                handleOpenFocusModal(subject, 'textbook', chIdx, 1);
                              }
                            }}
                            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition ${
                              isCurrent
                                ? 'bg-amber-500/15 border-amber-500 text-amber-200 ring-1 ring-amber-500/50 cursor-pointer shadow-md'
                                : isUnlocked
                                ? 'bg-[#1b1714] border-stone-700 hover:border-stone-500 text-stone-300 cursor-pointer'
                                : 'bg-stone-950/60 border-stone-850 text-stone-600 cursor-not-allowed opacity-70'
                            }`}
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-[10px] font-bold">
                                <span className={isCurrent ? 'text-amber-400 font-bold' : isUnlocked ? 'text-stone-400' : 'text-stone-600'}>
                                  Chapter {chIdx + 1} ({ch.pages.length} Pages)
                                </span>
                                
                                {isCompleted ? (
                                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                                    <CheckCircle className="w-3.5 h-3.5" /> Mastered
                                  </span>
                                ) : isCurrent ? (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-500 text-stone-950 text-[9px] font-black uppercase">
                                    Active
                                  </span>
                                ) : !isUnlocked ? (
                                  <span className="text-stone-600 flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> Locked
                                  </span>
                                ) : (
                                  <span className="text-stone-400 flex items-center gap-1">
                                    <Unlock className="w-3 h-3" /> Ready
                                  </span>
                                )}
                              </div>

                              <h5 className={`font-bold text-xs leading-snug line-clamp-2 ${isUnlocked ? 'text-stone-100' : 'text-stone-500'}`}>
                                {ch.title}
                              </h5>
                            </div>

                            <div className="pt-2 text-[10px] text-stone-400 flex items-center justify-between border-t border-stone-800/80 mt-2">
                              <span>Multi-Page Book</span>
                              {isUnlocked && <span className="text-amber-400 font-bold">Open ➔</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </main>

      {/* Focus Kiosk Setup Modal */}
      {showKioskModal && selectedSubject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e1b18] border border-stone-700 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowKioskModal(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/30">
                <Timer className="w-3.5 h-3.5" />
                <span>Deep Study Focus Kiosk Setup</span>
              </div>
              <h3 className="text-xl font-bold text-stone-100">
                Study {selectedSubject.shortName}: Chapter {selectedChapterIndex + 1}
              </h3>
              <p className="text-xs text-stone-400">
                Starting on <strong>Page {selectedStartPage}</strong>. Your device will lock into study mode; study materials and countdown timer will be displayed side-by-side.
              </p>
            </div>

            {/* Choose Study Mode */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Select Study Material Source
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setKioskMode('textbook')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition cursor-pointer ${
                    kioskMode === 'textbook'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-xs text-stone-100">Interactive Multi-Page Book</span>
                  <span className="text-[11px] text-stone-400">Read structured pages & formulas</span>
                </button>

                <button
                  type="button"
                  onClick={() => setKioskMode('camera')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition cursor-pointer ${
                    kioskMode === 'camera'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <Camera className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-xs text-stone-100">Snap Photo / Notes</span>
                  <span className="text-[11px] text-stone-400">Upload paper book page or worksheet</span>
                </button>
              </div>
            </div>

            {/* Focus Duration Selection (18 min - 120 min) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  Target Focus Duration
                </label>
                <span className="text-sm font-bold text-amber-400">{kioskDuration} Minutes</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[18, 25, 45, 60].map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setKioskDuration(dur)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      kioskDuration === dur
                        ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-md'
                        : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    {dur}m
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-stone-500 italic">
                * Note: Minimum threshold is 18 minutes for deep cognitive flow. Upon completion, a targeted exit-gate quiz will unlock your device and reward +50 tokens.
              </p>
            </div>

            {/* Launch CTA */}
            <button
              onClick={handleLaunchKiosk}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-95"
            >
              <span>Launch Focus Kiosk ({kioskDuration}m)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Clean Mobile Bottom Navigation Bar (Requirement 6) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161310] border-t border-stone-800 px-4 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setSelectedStream('all')}
          className="flex flex-col items-center gap-1 text-amber-500 text-[10px] font-bold"
        >
          <Home className="w-5 h-5" />
          <span>Academic</span>
        </button>

        <button
          onClick={onOpenLiterature}
          className="flex flex-col items-center gap-1 text-stone-400 hover:text-amber-400 text-[10px] font-medium"
        >
          <Feather className="w-5 h-5 text-amber-400" />
          <span>Literature</span>
        </button>

        <button
          onClick={() => {
            if (subjects.length > 0) {
              handleOpenFocusModal(subjects[0], 'camera', 0, 1);
            }
          }}
          className="flex flex-col items-center gap-1 text-stone-400 hover:text-stone-200 text-[10px] font-medium"
        >
          <Camera className="w-5 h-5" />
          <span>Snap</span>
        </button>
      </nav>

      {/* Persistent Bottom Ribbon (Desktop) */}
      <footer className="hidden md:block w-full bg-[#d97706] text-stone-950 py-3.5 px-4 text-center font-black tracking-wider text-sm md:text-base brand-font shadow-lg">
        Learn. Question. Understand.
      </footer>
    </div>
  );
};
