import React, { useState, useEffect } from 'react';
import { AfricanLiteratureItem, LiteraturePage } from '../types';
import { AFRICAN_LITERATURE_LIBRARY } from '../data/literatureLibrary';
import { AfricaLogo } from './AfricaLogo';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookMarked, 
  BookOpen, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Feather, 
  Globe, 
  Moon, 
  RotateCcw, 
  Sparkles, 
  Sun, 
  Type 
} from 'lucide-react';

interface ScreenLiteratureLibraryProps {
  onBackToHome: () => void;
}

type PaperTheme = 'dark' | 'sepia' | 'light';

export const ScreenLiteratureLibrary: React.FC<ScreenLiteratureLibraryProps> = ({
  onBackToHome
}) => {
  const [selectedStory, setSelectedStory] = useState<AfricanLiteratureItem>(AFRICAN_LITERATURE_LIBRARY[0]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [paperTheme, setPaperTheme] = useState<PaperTheme>('sepia');
  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0); // -2 to +4
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [bookmarks, setBookmarks] = useState<Record<string, number>>({});

  // Load bookmarks on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('literature_bookmarks');
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load literature bookmarks', e);
    }
  }, []);

  // Save bookmark whenever reading page changes
  const saveBookmark = (storyId: string, pageNum: number) => {
    setBookmarks((prev) => {
      const updated = { ...prev, [storyId]: pageNum };
      try {
        localStorage.setItem('literature_bookmarks', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save literature bookmark', e);
      }
      return updated;
    });
  };

  const handleSelectStory = (story: AfricanLiteratureItem) => {
    setSelectedStory(story);
    // Resume from bookmark if exists
    const bookmarkedPage = bookmarks[story.id];
    if (bookmarkedPage && bookmarkedPage >= 1 && bookmarkedPage <= story.pages.length) {
      setCurrentPageIndex(bookmarkedPage - 1);
    } else {
      setCurrentPageIndex(0);
    }
  };

  const activePage: LiteraturePage = selectedStory.pages[currentPageIndex] || selectedStory.pages[0];

  const handleNextPage = () => {
    if (currentPageIndex < selectedStory.pages.length - 1) {
      const nextIdx = currentPageIndex + 1;
      setCurrentPageIndex(nextIdx);
      saveBookmark(selectedStory.id, nextIdx + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      const prevIdx = currentPageIndex - 1;
      setCurrentPageIndex(prevIdx);
      saveBookmark(selectedStory.id, prevIdx + 1);
    }
  };

  // Filter stories by category or region
  const categories = ['All', 'West Africa', 'Southern Africa', 'East Africa', 'Pan-African Classics'];
  const filteredStories = activeCategory === 'All'
    ? AFRICAN_LITERATURE_LIBRARY
    : AFRICAN_LITERATURE_LIBRARY.filter((s) => s.region === activeCategory);

  // Paper theme colors
  const themeStyles = {
    dark: 'bg-[#181512] text-[#f4efe6] border-stone-850',
    sepia: 'bg-[#fbf0d9] text-[#2c221a] border-[#e4d4be]',
    light: 'bg-[#ffffff] text-[#1c1917] border-stone-200'
  };

  const readerContainerTheme = {
    dark: 'bg-[#1e1b17] border-stone-800 text-stone-200',
    sepia: 'bg-[#f5e8cd] border-[#dfcdb0] text-[#33261c]',
    light: 'bg-[#f8f9fa] border-stone-200 text-stone-900'
  };

  const bookmarkedPage = bookmarks[selectedStory.id];

  return (
    <div className="min-h-screen bg-[#12100e] text-[#f4efe6] flex flex-col justify-between font-sans antialiased pb-12">
      
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#1a1714]/95 backdrop-blur border-b border-stone-800 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500 text-stone-300 text-xs font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>Academic Portal</span>
          </button>
          
          <AfricaLogo size="sm" subtitleText="African Literature & Story Library" />
        </div>

        {/* Leisure Badge: ZERO QUIZZES */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Feather className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Zero-Pressure Leisure Reading</span>
          <span className="text-[10px] bg-amber-500 text-stone-950 px-1.5 py-0.5 rounded font-black">NO QUIZZES</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-4 py-6 md:py-8 flex-1 space-y-8">
        
        {/* Banner with Region Filters */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold brand-font text-stone-100 flex items-center gap-2.5">
              <span>Pan-African Literature & Folklore Library</span>
            </h1>
            <p className="text-xs md:text-sm text-stone-400">
              Read ancestral epics, timeless oral folklore, and modern African novellas. No timers, no quizzes—pure cultural heritage and enjoyment.
            </p>
          </div>

          {/* Region Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Shelf */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredStories.map((story) => {
            const isSelected = selectedStory.id === story.id;
            const bPage = bookmarks[story.id];

            return (
              <div
                key={story.id}
                onClick={() => handleSelectStory(story)}
                className={`p-4 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200 ring-2 ring-amber-500/40 shadow-xl'
                    : 'bg-[#1c1916] border-stone-800 text-stone-300 hover:border-amber-600/50 hover:bg-[#221e1a]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded-md bg-stone-900 text-amber-400 border border-stone-800">
                      {story.region}
                    </span>
                    {bPage && (
                      <span className="flex items-center gap-1 text-emerald-400 font-mono">
                        <BookMarked className="w-3 h-3" /> Page {bPage}
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm md:text-base text-stone-100 line-clamp-2 leading-snug">
                    {story.title}
                  </h3>
                  
                  <p className="text-[11px] text-stone-400">
                    {story.author}
                  </p>
                  
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed pt-1">
                    {story.synopsis}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400 font-mono">
                    {story.totalPages} Reading Sections
                  </span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    Read ➔
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Story Reader Box */}
        <div className="space-y-4 pt-4 border-t border-stone-800">
          
          {/* Reader Top Controls Toolbar (Font Size & Paper Modes) */}
          <div className="bg-[#1c1916] rounded-2xl border border-stone-800 p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
            
            {/* Story Title & Page Info */}
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-extrabold text-xs border border-amber-500/40">
                Page {activePage.pageNumber} of {selectedStory.pages.length}
              </span>
              <div>
                <h2 className="font-extrabold text-stone-100 text-sm md:text-base leading-tight">
                  {selectedStory.title}
                </h2>
                <span className="text-xs text-stone-400">{activePage.title}</span>
              </div>
            </div>

            {/* Reading Controls: Theme (Sepia / Dark / Light) & Font Size (A- / A+) */}
            <div className="flex items-center gap-3">
              
              {/* Paper Theme Mode Toggles */}
              <div className="flex items-center rounded-xl bg-stone-900 border border-stone-800 p-1 gap-1 text-xs">
                <button
                  onClick={() => setPaperTheme('sepia')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
                    paperTheme === 'sepia' ? 'bg-[#fbf0d9] text-[#2c221a] shadow-sm' : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Sepia Paper Mode"
                >
                  <span>📜 Sepia</span>
                </button>

                <button
                  onClick={() => setPaperTheme('dark')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
                    paperTheme === 'dark' ? 'bg-stone-800 text-stone-100 shadow-sm' : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Dark Paper Mode"
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>

                <button
                  onClick={() => setPaperTheme('light')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
                    paperTheme === 'light' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Light Paper Mode"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
              </div>

              {/* Font Size Adjusters */}
              <div className="flex items-center rounded-xl bg-stone-900 border border-stone-800 p-1 gap-1 text-xs text-stone-300">
                <button
                  onClick={() => setFontSizeOffset((prev) => Math.max(-2, prev - 1))}
                  className="px-2 py-1 rounded hover:bg-stone-800 font-bold cursor-pointer"
                  title="Smaller font size"
                >
                  A-
                </button>
                <span className="font-mono text-[11px] px-1 text-stone-400">{fontSizeOffset >= 0 ? `+${fontSizeOffset}` : fontSizeOffset}</span>
                <button
                  onClick={() => setFontSizeOffset((prev) => Math.min(4, prev + 1))}
                  className="px-2 py-1 rounded hover:bg-stone-800 font-bold cursor-pointer"
                  title="Larger font size"
                >
                  A+
                </button>
              </div>
            </div>
          </div>

          {/* Bookmark Resumption Notice Banner */}
          {bookmarkedPage && (
            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-700/60 text-emerald-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-emerald-400" />
                <span>Bookmark saved: You last read <strong>Page {bookmarkedPage}</strong> of this story.</span>
              </div>
              <button
                onClick={() => {
                  setCurrentPageIndex(bookmarkedPage - 1);
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-stone-950 font-bold text-[11px] hover:bg-emerald-500 cursor-pointer"
              >
                Jump to Bookmark
              </button>
            </div>
          )}

          {/* Actual Reader Canvas with Custom Paper Theme & Typography */}
          <article 
            className={`rounded-3xl border p-6 md:p-12 shadow-2xl space-y-8 transition-colors duration-300 ${themeStyles[paperTheme]}`}
            style={{
              fontSize: `${16 + fontSizeOffset * 2}px`,
              lineHeight: 1.8
            }}
          >
            {/* Header of Story Page */}
            <div className="border-b pb-4 space-y-1 opacity-90">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest font-mono font-bold">
                <span>{selectedStory.countryOrigin}</span>
                <span>Page {activePage.pageNumber} of {selectedStory.pages.length}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black brand-font pt-1">
                {activePage.title}
              </h2>
            </div>

            {/* Prose Content */}
            <div className="font-serif whitespace-pre-line tracking-normal text-justify">
              {activePage.content}
            </div>

            {/* Traditional African Proverbs & Cultural Commentary */}
            <div className={`p-5 rounded-2xl border space-y-3 font-sans text-xs ${readerContainerTheme[paperTheme]}`}>
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-amber-500">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Ancestral Context & Cultural Significance:</span>
              </div>
              
              <p className="leading-relaxed">
                {activePage.culturalCommentary}
              </p>

              {activePage.proverbs && activePage.proverbs.length > 0 && (
                <div className="space-y-1 pt-2 border-t border-stone-800/40">
                  <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-400">
                    Traditional Proverbs Embedded in this Text:
                  </span>
                  {activePage.proverbs.map((prv, pIdx) => (
                    <div key={pIdx} className="italic font-serif pl-3 border-l-2 border-amber-500">
                      "{prv}"
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Previous & Next Page Navigation Controls */}
            <div className="flex items-center justify-between pt-6 border-t opacity-90">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className="px-4 py-2.5 rounded-xl bg-stone-900 text-stone-200 disabled:opacity-30 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition shadow"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Section</span>
              </button>

              <span className="text-xs font-mono font-bold">
                Page {activePage.pageNumber} of {selectedStory.pages.length}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPageIndex === selectedStory.pages.length - 1}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-30 text-stone-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition shadow"
              >
                <span>Next Section</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </article>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center text-xs text-stone-500 pt-6 border-t border-stone-800">
        All stories, fables, and oral epics are presented for cultural enrichment and heritage preservation without tests or quizzes.
      </footer>
    </div>
  );
};
