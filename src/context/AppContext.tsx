import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  StudentProfile,
  SubjectItem,
  StudySession,
  StruggleNode,
  ExamPaper,
  ExamSubmission,
  CountryCode,
  StreamType,
} from '../types';
import {
  COUNTRIES,
  INITIAL_SUBJECTS,
  INITIAL_STRUGGLE_NODES,
  MOCK_EXAM_PAPERS,
  getTextbookModule,
  getSubjectsForCountryAndGrade,
} from '../data/curriculumData';

export type ScreenId =
  | 'ONBOARDING'
  | 'DASHBOARD'
  | 'EREADER'
  | 'FOCUS_KIOSK'
  | 'MULTIMODAL_OCR'
  | 'EXIT_QUIZ'
  | 'MOCK_EXAM'
  | 'EXAM_DIAGNOSTICS'
  | 'STRUGGLE_GRAPH';

interface AppContextType {
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  activeScreen: ScreenId;
  navigateTo: (screen: ScreenId) => void;
  subjects: SubjectItem[];
  selectedSubjectId: string;
  setSelectedSubjectId: (id: string) => void;
  selectedChapterId: string;
  setSelectedChapterId: (id: string) => void;
  
  // Study session & kiosk lock
  studySession: StudySession | null;
  startStudySession: (
    durationMin: number,
    topic: string,
    subject: string,
    notes?: string,
    options?: Partial<StudySession>
  ) => { success: boolean; message?: string };
  extendStudySession: (minutes: number) => void;
  updateStudySession: (updates: Partial<StudySession>) => void;
  completeStudySession: () => void;
  terminateStudySessionEmergency: () => void;
  unlockAfterQuiz: (score: number, passed: boolean) => void;
  finishUnlockedStudySession: () => void;
  
  // Struggle Graph
  struggleNodes: StruggleNode[];
  addOrUpdateStruggleNode: (conceptLabel: string, conceptName: string, subject: string, rawQuery: string) => void;
  resolveStruggleNode: (conceptLabel: string, scoreGained: number) => void;
  
  // Exam Engine
  activeExam: ExamPaper | null;
  setActiveExam: (paper: ExamPaper | null) => void;
  latestExamSubmission: ExamSubmission | null;
  submitExam: (submission: ExamSubmission) => void;
  
  // Offline & rural deployment
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;
  syncTelemetryStatus: 'ONLINE_SYNCED' | 'OFFLINE_CACHED' | 'SYNCING';
  
  // Gamification & Rewards
  rewardTokens: (tokens: number, note: string) => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const STORAGE_KEYS = {
  PROFILE: 'somaafrika_student_profile',
  STRUGGLES: 'somaafrika_struggles',
  SUBMISSIONS: 'somaafrika_submissions',
  SESSION: 'somaafrika_active_session',
};

const DEFAULT_PROFILE: StudentProfile = {
  id: 'std_7894',
  firstName: 'Zanele',
  lastName: 'Dube',
  country: 'ZA',
  province: 'Gauteng',
  curriculumCode: 'CAPS / IEB',
  gradeLevel: 11,
  stream: 'SCIENCE_AND_TECH',
  totalStudyMinutes: 284,
  rewardTokens: 1450,
  streakDays: 6,
  offlineMode: false,
  hasOnboarded: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Profile state
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROFILE;
  });

  const [activeScreen, setActiveScreen] = useState<ScreenId>(() => {
    return profile.hasOnboarded ? 'DASHBOARD' : 'ONBOARDING';
  });

  const dynamicSubjects = useMemo(() => {
    return getSubjectsForCountryAndGrade(profile.country, profile.gradeLevel, profile.stream);
  }, [profile.country, profile.gradeLevel, profile.stream]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => {
    const list = getSubjectsForCountryAndGrade(profile.country, profile.gradeLevel, profile.stream);
    return list[0]?.id || 'za_fet_phys';
  });

  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => {
    const list = getSubjectsForCountryAndGrade(profile.country, profile.gradeLevel, profile.stream);
    const firstSubj = list[0];
    const mod = getTextbookModule(firstSubj?.id || 'za_fet_phys', firstSubj, profile.country, profile.gradeLevel);
    return mod?.chapters[0]?.id || 'ch_za_fet_phys_1';
  });

  const handleSetSelectedSubjectId = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    const subj = dynamicSubjects.find((s) => s.id === subjectId) || INITIAL_SUBJECTS.find((s) => s.id === subjectId);
    const mod = getTextbookModule(subjectId, subj, profile.country, profile.gradeLevel);
    if (mod && mod.chapters.length > 0) {
      setSelectedChapterId(mod.chapters[0].id);
    }
  };

  // Synchronize when student switches country or grade level
  useEffect(() => {
    if (dynamicSubjects.length > 0) {
      const currentExists = dynamicSubjects.some((s) => s.id === selectedSubjectId);
      if (!currentExists) {
        handleSetSelectedSubjectId(dynamicSubjects[0].id);
      }
    }
  }, [dynamicSubjects]);

  // 2. Study Session State
  const [studySession, setStudySession] = useState<StudySession | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // 3. Struggle Graph State
  const [struggleNodes, setStruggleNodes] = useState<StruggleNode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STRUGGLES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_STRUGGLE_NODES;
  });

  // 4. Exams
  const [activeExam, setActiveExam] = useState<ExamPaper | null>(MOCK_EXAM_PAPERS[0]);
  const [latestExamSubmission, setLatestExamSubmission] = useState<ExamSubmission | null>(null);

  // 5. Offline Sync
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [syncTelemetryStatus, setSyncTelemetryStatus] = useState<'ONLINE_SYNCED' | 'OFFLINE_CACHED' | 'SYNCING'>('ONLINE_SYNCED');

  // 6. Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Persist Profile
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  // Persist Struggles
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STRUGGLES, JSON.stringify(struggleNodes));
  }, [struggleNodes]);

  // Persist Active Session
  useEffect(() => {
    if (studySession) {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(studySession));
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    }
  }, [studySession]);

  // Timer loop for active study session
  useEffect(() => {
    if (!studySession || studySession.state !== 'ACTIVE') return;

    const interval = setInterval(() => {
      setStudySession((prev) => {
        if (!prev || prev.state !== 'ACTIVE') return prev;

        const newRemaining = prev.remainingSeconds - 1;
        if (newRemaining <= 0) {
          // Timer reached 00:00:00! Automatically engage Exit-Gate assessment
          setActiveScreen('EXIT_QUIZ');
          return {
            ...prev,
            remainingSeconds: 0,
            state: 'COMPLETED_PENDING_QUIZ',
          };
        }

        return {
          ...prev,
          remainingSeconds: newRemaining,
          actualDurationMin: Math.floor((prev.plannedDurationMin * 60 - newRemaining) / 60),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [studySession?.state]);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...updates };
      // update curriculum code if country changed
      if (updates.country && updates.country !== prev.country) {
        const countryInfo = COUNTRIES.find((c) => c.code === updates.country);
        if (countryInfo) {
          updated.curriculumCode = countryInfo.curriculumCode;
          updated.province = countryInfo.provinces[0] || '';
        }
      }
      return updated;
    });
  };

  const navigateTo = (screen: ScreenId) => {
    // If kiosk locked and session active, cannot navigate away to general screens without completing exit quiz
    if (studySession && studySession.state === 'ACTIVE') {
      if (screen !== 'FOCUS_KIOSK' && screen !== 'MULTIMODAL_OCR' && screen !== 'EXIT_QUIZ') {
        setToastMessage('🔒 Deep Study Kiosk Engaged: Pass your Exit-Gate Quiz or wait for timer to unlock.');
        return;
      }
    }
    setActiveScreen(screen);
  };

  // Start study session with 18m - 120m operational rules & burnout intercept
  const startStudySession = (
    durationMin: number,
    topic: string,
    subject: string,
    notes?: string,
    options?: Partial<StudySession>
  ): { success: boolean; message?: string } => {
    if (durationMin < 18) {
      return {
        success: false,
        message: 'Scientific Minimum: 18 minutes required to enter cognitive deep flow.',
      };
    }
    if (durationMin > 120) {
      return {
        success: false,
        message: 'Burnout Prevention Intercept: Cognitive retention collapses after 2 hours. Capped strictly at 120m.',
      };
    }

    const newSession: StudySession = {
      id: `session_${Date.now()}`,
      plannedDurationMin: durationMin,
      remainingSeconds: durationMin * 60,
      actualDurationMin: 0,
      state: 'ACTIVE',
      subjectName: subject,
      topicTitle: topic,
      startedAt: Date.now(),
      isKioskLocked: true,
      readingNotes: notes || `Core focus notes on ${topic} (${subject}).`,
      sourceType: options?.sourceType || 'TEXTBOOK_E_READER',
      textbookTitle: options?.textbookTitle,
      publisher: options?.publisher,
      pagesStudied: options?.pagesStudied,
      keyObjectives: options?.keyObjectives || [],
      conceptsStudied: options?.conceptsStudied || [topic],
      activeChapterId: options?.activeChapterId,
      activeChapterNumber: options?.activeChapterNumber,
      activeChapterTitle: options?.activeChapterTitle || topic,
      activeChapterObjectives: options?.activeChapterObjectives || options?.keyObjectives || [],
      activeChapterConcepts: options?.activeChapterConcepts || options?.conceptsStudied || [topic],
      activeChapterContent: options?.activeChapterContent || notes || `Core focus notes on ${topic} (${subject}).`,
      activeChapterPracticeQuestions: options?.activeChapterPracticeQuestions || [],
      pagesReadInChapter: options?.pagesReadInChapter || [],
      lastReadPageNumber: options?.lastReadPageNumber,
      capturedImageUrl: options?.capturedImageUrl,
      capturedTextSnippet: options?.capturedTextSnippet,
      activeReadingHistory: [topic],
      exitQuizPassed: false,
    };

    setStudySession(newSession);
    setActiveScreen('FOCUS_KIOSK');
    setToastMessage(`🔒 Deep Study Kiosk engaged for ${durationMin} minutes. Exit-Gate Quiz scheduled.`);
    return { success: true };
  };

  const updateStudySession = (updates: Partial<StudySession>) => {
    setStudySession((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const extendStudySession = (minutes: number) => {
    if (!studySession) return;
    const currentPlanned = studySession.plannedDurationMin + minutes;
    if (currentPlanned > 120) {
      setToastMessage('⚠️ Burnout Prevention: Cannot extend beyond 120 continuous minutes.');
      return;
    }

    setStudySession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        plannedDurationMin: currentPlanned,
        remainingSeconds: prev.remainingSeconds + minutes * 60,
        state: 'ACTIVE',
      };
    });
    setToastMessage(`⏱️ Session extended by +${minutes} minutes.`);
  };

  const completeStudySession = () => {
    if (!studySession) return;
    // User triggered early complete: must take Exit-Gate Quiz!
    setStudySession((prev) => (prev ? { ...prev, state: 'COMPLETED_PENDING_QUIZ' } : null));
    setActiveScreen('EXIT_QUIZ');
  };

  const terminateStudySessionEmergency = () => {
    setStudySession(null);
    setActiveScreen('DASHBOARD');
    setToastMessage('⚠️ Deep Study session overridden via Emergency Protocol.');
  };

  const unlockAfterQuiz = (score: number, passed: boolean) => {
    if (passed) {
      const minutesCompleted = studySession?.actualDurationMin || studySession?.plannedDurationMin || 25;
      const tokensEarned = Math.round(minutesCompleted * 5 + 50);

      setProfile((prev) => ({
        ...prev,
        totalStudyMinutes: prev.totalStudyMinutes + minutesCompleted,
        rewardTokens: prev.rewardTokens + tokensEarned,
      }));

      // Keep the quiz screen mounted long enough for the learner to see the
      // mastery result. The kiosk lock is released here, and the session is
      // cleared only after the learner chooses where to go next.
      setStudySession((prev) =>
        prev
          ? {
              ...prev,
              state: 'COMPLETED_UNLOCKED',
              isKioskLocked: false,
              exitQuizPassed: true,
              remainingSeconds: 0,
            }
          : prev
      );
      setActiveScreen('EXIT_QUIZ');
      setToastMessage(`🎉 Chapter Mastery Passed (${score}%)! +${tokensEarned} Knowledge Tokens awarded.`);
    } else {
      // Score < 75%: Mandatory 5-min review engaged
      setStudySession((prev) => (prev ? { ...prev, state: 'COMPLETED_PENDING_QUIZ' } : prev));
      setToastMessage(`⚠️ Score ${score}% (< 75%). Guided re-teaching is required before a fresh quiz variant.`);
    }
  };

  const finishUnlockedStudySession = () => {
    setStudySession(null);
    setActiveScreen('DASHBOARD');
  };

  const addOrUpdateStruggleNode = (
    conceptLabel: string,
    conceptName: string,
    subject: string,
    rawQuery: string
  ) => {
    setStruggleNodes((prev) => {
      const existing = prev.find((n) => n.conceptLabel === conceptLabel);
      if (existing) {
        return prev.map((n) =>
          n.conceptLabel === conceptLabel
            ? {
                ...n,
                frequencyCount: n.frequencyCount + 1,
                masteryScore: Math.max(0.1, n.masteryScore - 0.1),
                frictionLevel: 'HIGH',
                lastStruggledAt: 'Just now',
                rawStudentQuery: rawQuery,
              }
            : n
        );
      } else {
        const newNode: StruggleNode = {
          id: `sn_${Date.now()}`,
          conceptLabel,
          conceptName,
          subject,
          rawStudentQuery: rawQuery,
          frequencyCount: 1,
          masteryScore: 0.35,
          frictionLevel: 'HIGH',
          lastStruggledAt: 'Just now',
        };
        return [newNode, ...prev];
      }
    });

    setToastMessage(`🧠 Logged to Struggle Graph: "${conceptName}" tagged for adaptive retesting.`);
  };

  const resolveStruggleNode = (conceptLabel: string, scoreGained: number) => {
    setStruggleNodes((prev) =>
      prev.map((n) => {
        if (n.conceptLabel === conceptLabel) {
          const newMastery = Math.min(1.0, n.masteryScore + scoreGained);
          return {
            ...n,
            masteryScore: newMastery,
            frictionLevel: newMastery >= 0.8 ? 'LOW' : newMastery >= 0.5 ? 'MEDIUM' : 'HIGH',
          };
        }
        return n;
      })
    );
  };

  const submitExam = (submission: ExamSubmission) => {
    setLatestExamSubmission(submission);
    // Add reward tokens
    const tokens = submission.passed ? 150 : 50;
    setProfile((prev) => ({
      ...prev,
      rewardTokens: prev.rewardTokens + tokens,
    }));
    setActiveScreen('EXAM_DIAGNOSTICS');
    setToastMessage(`📊 Exam completed! Score: ${submission.percentage}%. Diagnostics generated.`);
  };

  const toggleOfflineMode = () => {
    setIsOfflineMode((prev) => {
      const next = !prev;
      setSyncTelemetryStatus(next ? 'OFFLINE_CACHED' : 'SYNCING');
      if (!next) {
        setTimeout(() => setSyncTelemetryStatus('ONLINE_SYNCED'), 1200);
      }
      setToastMessage(
        next
          ? '📡 Rural Offline Mode Enabled: Running TinyML on-device heuristics & local SQLite cache.'
          : '🌐 Online Mode Active: Cloud Gemini 3.8-Flash Socratic Reasoning restored.'
      );
      return next;
    });
  };

  const rewardTokens = (tokens: number, note: string) => {
    setProfile((prev) => ({
      ...prev,
      rewardTokens: prev.rewardTokens + tokens,
    }));
    setToastMessage(`🪙 +${tokens} Tokens: ${note}`);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        activeScreen,
        navigateTo,
        subjects: dynamicSubjects,
        selectedSubjectId,
        setSelectedSubjectId: handleSetSelectedSubjectId,
        selectedChapterId,
        setSelectedChapterId,
        studySession,
        startStudySession,
        extendStudySession,
        updateStudySession,
        completeStudySession,
        terminateStudySessionEmergency,
        unlockAfterQuiz,
        finishUnlockedStudySession,
        struggleNodes,
        addOrUpdateStruggleNode,
        resolveStruggleNode,
        activeExam,
        setActiveExam,
        latestExamSubmission,
        submitExam,
        isOfflineMode,
        toggleOfflineMode,
        syncTelemetryStatus,
        rewardTokens,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
