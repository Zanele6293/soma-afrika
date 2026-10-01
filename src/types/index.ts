export type CountryCode = 'ZA' | 'NG' | 'KE' | 'GH' | 'ZW' | 'MW';

export interface CountryInfo {
  code: CountryCode;
  name: string;
  flag: string;
  curriculum: string;
  board: string;
  hallName: string;
  color: string;
  accent: string;
  badgeBg: string;
  compulsoryNotes: string;
  provinces: string[];
  gradeLevels: { id: string; label: string; stage: string }[];
}

export interface SubjectProgressInfo {
  unlockedChapterIndex: number;
  currentChapterIndex: number;
  lastReadPageNumber: number;
  completedAt?: string;
}

export interface ReadingMemoryItem {
  subjectId: string;
  subjectName: string;
  chapterIndex: number;
  chapterTitle: string;
  lastReadPageNumber: number;
  updatedAt: number;
}

export interface StudentProfile {
  name: string;
  surname: string;
  country: CountryCode;
  province: string;
  grade: string;
  stream?: string;
  tokens: number;
  streakDays: number;
  totalStudyMinutes: number;
  joinedAt: string;
  completedChapterIds: string[];
  subjectProgress: Record<string, SubjectProgressInfo>;
}

export interface TextbookPage {
  pageNumber: number;
  totalPagesInChapter: number;
  title: string;
  subtitle: string;
  syllabusRef: string;
  theorySections: {
    heading: string;
    paragraphs: string[];
    keyTerms?: { term: string; definition: string }[];
  }[];
  keyFormulas?: {
    name: string;
    latex: string;
    variables: string[];
  }[];
  workedExample?: {
    problemStatement: string;
    pedagogicalSteps: { step: number; description: string; mathematicalForm: string }[];
    socraticTeacherTip: string;
  };
  africanContext: {
    regionName: string;
    title: string;
    realWorldApplication: string;
  };
  keyTakeaways: string[];
  practiceQuestion: {
    prompt: string;
    marks: number;
    conceptualHint: string;
  };
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  term: number;
  title: string;
  pages: TextbookPage[];
  isLocked?: boolean;
}

export interface Textbook {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  authorOrMinistry: string;
  curriculumCode: string;
  isbn: string;
  grade: string;
  totalPages: number;
  chapters: Chapter[];
}

export type SubjectStream = 'core' | 'science' | 'commercial' | 'humanities' | 'applied';

export interface SubjectItem {
  id: string;
  name: string;
  shortName: string;
  gradeRange: string;
  category: SubjectStream;
  isCompulsory: boolean;
  color: string;
  description: string;
  totalChapters: number;
  totalPages: number;
  textbook: Textbook;
}

// DEDICATED AFRICAN LITERATURE & STORY LIBRARY (ZERO QUIZZES)
export interface LiteraturePage {
  pageNumber: number;
  title: string;
  content: string;
  culturalCommentary: string;
  proverbs?: string[];
}

export interface AfricanLiteratureItem {
  id: string;
  title: string;
  author: string;
  region: 'West Africa' | 'Southern Africa' | 'East Africa' | 'Pan-African Classics';
  countryOrigin: string;
  category: 'Folklore & Epics' | 'Classic African Novella' | 'Prescribed Setwork';
  coverGradient: string;
  synopsis: string;
  culturalSignificance: string;
  totalPages: number;
  pages: LiteraturePage[];
}

export interface LiteratureBookmark {
  storyId: string;
  lastReadPageNumber: number;
  updatedAt: number;
}

export interface StudySessionState {
  isActive: boolean;
  isKioskLocked: boolean;
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterIndex: number;
  chapterTitle: string;
  pageNumber: number;
  pageIndex: number;
  activePage: TextbookPage;
  chapterPages: TextbookPage[];
  pageTimeSeconds: number;
  totalTargetMinutes: number;
  remainingSeconds: number;
  isPaused: boolean;
  lastReadPageNumber: number;
  pagesReadInSession: number[];
  cumulativePageContent: string;
  snappedStudyMaterial?: {
    imageUrl: string;
    extractedText: string;
    concept: string;
  };
}

export interface ExitQuizRequestPayload {
  countryCode: CountryCode;
  curriculumCode: string;
  subjectName: string;
  chapterTitle: string;
  chapterNumber: number;
  lastReadPageNumber: number;
  lastReadPage?: number;
  pagesRead: number[];
  pageContents: string;
  exactContentStudied?: string;
}

export interface QuizQuestion {
  id: string;
  prompt?: string;
  question?: string;
  options: string[];
  correctIndex: number;
  concept?: string;
  explanation: string;
  socraticHint?: string;
  pedagogicalHintIfFailed?: string;
  pageSource?: string;
  pageSourceNumber?: number;
}

export interface ExitQuizResponse {
  title?: string;
  passingThreshold?: number;
  questions: QuizQuestion[];
  isFallback?: boolean;
  success?: boolean;
}

export interface SocraticMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  guidingQuestion?: string;
}
