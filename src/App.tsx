/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CountryCode, 
  StudentProfile, 
  SubjectItem, 
  StudySessionState, 
  TextbookPage, 
  QuizQuestion, 
  ExitQuizRequestPayload 
} from './types';
import { 
  COUNTRIES, 
  getCurriculumSubjects, 
  generateCumulativeQuiz 
} from './data/curriculumData';
import { Screen01Signup } from './components/Screen01Signup';
import { Screen02Dashboard } from './components/Screen02Dashboard';
import { Screen03StudyKiosk } from './components/Screen03StudyKiosk';
import { Screen04ExitQuiz } from './components/Screen04ExitQuiz';
import { Screen05CameraSnap } from './components/Screen05CameraSnap';
import { ScreenLiteratureLibrary } from './components/ScreenLiteratureLibrary';

type ScreenType = 'signup' | 'dashboard' | 'camera' | 'kiosk' | 'exit_quiz' | 'literature';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('signup');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  
  // Selected Subject & Active Study Session
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem | null>(null);
  const [activeSession, setActiveSession] = useState<StudySessionState | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [activeQuizPayload, setActiveQuizPayload] = useState<ExitQuizRequestPayload | null>(null);

  // Check localStorage on mount for persistent profile
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('soma_student_profile');
      if (savedProfile) {
        const parsed: StudentProfile = JSON.parse(savedProfile);
        // Ensure subjectProgress and completedChapterIds exist
        if (!parsed.subjectProgress) {
          parsed.subjectProgress = {};
        }
        if (!parsed.completedChapterIds) {
          parsed.completedChapterIds = [];
        }
        setProfile(parsed);
        setCurrentScreen('dashboard');
      }
    } catch (e) {
      console.error('Failed to load student profile from storage', e);
    }
  }, []);

  // Save profile changes
  const saveProfile = (updated: StudentProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem('soma_student_profile', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  };

  // Sign up completion
  const handleSignupComplete = (newProfile: StudentProfile) => {
    const initialized: StudentProfile = {
      ...newProfile,
      completedChapterIds: [],
      subjectProgress: {}
    };
    saveProfile(initialized);
    setCurrentScreen('dashboard');
  };

  // Update profile partially (e.g. switch country or grade)
  const handleUpdateProfile = (partial: Partial<StudentProfile>) => {
    if (!profile) return;
    const updated = { ...profile, ...partial };
    saveProfile(updated);
  };

  // Start study in focus kiosk with Multi-Page chapter pages
  const handleStartFocusStudy = (
    subject: SubjectItem,
    durationMin: number,
    mode: 'textbook' | 'camera',
    chapterIndexToStart?: number,
    startPage?: number
  ) => {
    setSelectedSubject(subject);

    if (mode === 'camera') {
      setCurrentScreen('camera');
      return;
    }

    // Determine target chapter index based on saved progress or explicit selection
    const progress = profile?.subjectProgress?.[subject.id] || { 
      unlockedChapterIndex: 0, 
      currentChapterIndex: 0,
      lastReadPageNumber: 1
    };

    const targetIndex = chapterIndexToStart !== undefined 
      ? chapterIndexToStart 
      : progress.currentChapterIndex;

    const chapters = subject.textbook.chapters;
    const targetChapter = chapters[targetIndex] || chapters[0];
    const chapterPages = targetChapter.pages;
    
    // Jump to specified startPage if provided, otherwise first page
    const pageIdx = startPage !== undefined && startPage >= 1 && startPage <= chapterPages.length
      ? startPage - 1
      : 0;
    const targetPage = chapterPages[pageIdx] || chapterPages[0];

    const initialContent = `[Page ${targetPage.pageNumber} - ${targetPage.title}]\n${targetPage.theorySections.map(s => s.heading + ': ' + s.paragraphs.join(' ')).join('\n')}`;

    const session: StudySessionState = {
      isActive: true,
      isKioskLocked: true,
      subjectId: subject.id,
      subjectName: subject.shortName,
      chapterId: targetChapter.id,
      chapterIndex: targetIndex,
      chapterTitle: targetChapter.title,
      pageIndex: pageIdx,
      pageNumber: targetPage.pageNumber,
      activePage: targetPage,
      chapterPages: chapterPages,
      pageTimeSeconds: 0,
      totalTargetMinutes: durationMin,
      remainingSeconds: durationMin * 60,
      isPaused: false,
      lastReadPageNumber: targetPage.pageNumber,
      pagesReadInSession: [targetPage.pageNumber],
      cumulativePageContent: initialContent
    };

    setActiveSession(session);
    setCurrentScreen('kiosk');
  };

  // Confirm snapshot from camera/upload
  const handleConfirmSnapshot = (data: { imageUrl: string; extractedText: string; concept: string }) => {
    if (!selectedSubject) return;

    const dummyPage: TextbookPage = {
      pageNumber: 1,
      totalPagesInChapter: 1,
      title: `${selectedSubject.shortName}: Problem Study`,
      subtitle: data.concept,
      syllabusRef: `${profile?.grade || 'Grade 10'} Standard`,
      theorySections: [
        {
          heading: 'Problem Statement & Scanned Context',
          paragraphs: [data.extractedText]
        }
      ],
      africanContext: {
        regionName: 'Sub-Saharan Engineering & Daily Practice',
        title: 'Application of Problem Principles',
        realWorldApplication: 'Real-world problem solving mirrors technical engineering challenges encountered in regional industries.'
      },
      keyTakeaways: [
        'Break down unknown variables systematically.',
        'Apply governing equations to physical scenarios.'
      ],
      practiceQuestion: {
        prompt: 'Formulate the governing relationship from your scanned exercise.',
        marks: 5,
        conceptualHint: 'Identify which principles apply before calculating.'
      }
    };

    const session: StudySessionState = {
      isActive: true,
      isKioskLocked: true,
      subjectId: selectedSubject.id,
      subjectName: selectedSubject.shortName,
      chapterId: 'snap-1',
      chapterIndex: 0,
      chapterTitle: 'Physical Snapshot Unit',
      pageIndex: 0,
      pageNumber: 1,
      activePage: dummyPage,
      chapterPages: [dummyPage],
      pageTimeSeconds: 0,
      totalTargetMinutes: 25,
      remainingSeconds: 25 * 60,
      isPaused: false,
      lastReadPageNumber: 1,
      pagesReadInSession: [1],
      cumulativePageContent: data.extractedText,
      snappedStudyMaterial: data
    };

    setActiveSession(session);
    const initialPayload: ExitQuizRequestPayload = {
      countryCode: profile?.country || 'ZA',
      curriculumCode: selectedSubject.textbook.curriculumCode || 'CAPS / DBE',
      subjectName: selectedSubject.shortName,
      chapterTitle: 'Physical Snapshot Unit',
      chapterNumber: 0,
      lastReadPageNumber: 1,
      lastReadPage: 1,
      pagesRead: [1],
      pageContents: data.extractedText,
      exactContentStudied: data.extractedText
    };
    setActiveQuizPayload(initialPayload);
    setQuizQuestions(generateCumulativeQuiz(initialPayload, [dummyPage]));
    setCurrentScreen('kiosk');
  };

  // REQUIREMENT 3: Complete study session & generate cumulative quiz across all read pages
  const handleCompleteSession = async (payload: ExitQuizRequestPayload) => {
    if (!activeSession) return;
    setActiveQuizPayload(payload);

    // Call /api/generate-exit-quiz endpoint with payload
    try {
      const response = await fetch('/api/generate-exit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuizQuestions(data.questions);
          setCurrentScreen('exit_quiz');
          return;
        }
      }
    } catch (err) {
      console.warn('Backend quiz endpoint fallback engaged:', err);
    }

    // High-fidelity calibrated client quiz generator testing all read pages
    const questions = generateCumulativeQuiz(payload, activeSession.chapterPages);
    setQuizQuestions(questions);
    setCurrentScreen('exit_quiz');
  };

  // REQUIREMENT 4: Exit Quiz passed successfully (Automatic chapter progression & unlock system)
  const handlePassQuiz = (tokensEarned: number, advanceToNextChapter: boolean) => {
    if (!profile || !activeSession || !selectedSubject) {
      setCurrentScreen('dashboard');
      return;
    }

    const minutesSpent = Math.ceil(activeSession.pageTimeSeconds / 60);
    const completed = Array.from(new Set([...(profile.completedChapterIds || []), activeSession.chapterId]));

    // Update progress per subject
    const currentProgress = profile.subjectProgress?.[selectedSubject.id] || {
      unlockedChapterIndex: 0,
      currentChapterIndex: 0,
      lastReadPageNumber: 1
    };

    const newUnlockedIndex = Math.max(
      currentProgress.unlockedChapterIndex,
      activeSession.chapterIndex + 1
    );

    const nextChapterIndex = activeSession.chapterIndex + 1;
    const hasNextChapter = nextChapterIndex < selectedSubject.textbook.chapters.length;

    const newCurrentIndex = (advanceToNextChapter && hasNextChapter)
      ? nextChapterIndex
      : Math.min(newUnlockedIndex, selectedSubject.textbook.chapters.length - 1);

    const updatedProfile: StudentProfile = {
      ...profile,
      tokens: profile.tokens + tokensEarned,
      totalStudyMinutes: profile.totalStudyMinutes + minutesSpent,
      completedChapterIds: completed,
      subjectProgress: {
        ...(profile.subjectProgress || {}),
        [selectedSubject.id]: {
          unlockedChapterIndex: newUnlockedIndex,
          currentChapterIndex: newCurrentIndex,
          lastReadPageNumber: activeSession.lastReadPageNumber || 1
        }
      }
    };
    saveProfile(updatedProfile);

    // If advancing to next chapter directly:
    if (advanceToNextChapter && hasNextChapter) {
      handleStartFocusStudy(selectedSubject, 25, 'textbook', nextChapterIndex, 1);
      return;
    }

    setActiveSession(null);
    setCurrentScreen('dashboard');
  };

  // Retake study from quiz (Keeps student on current chapter, enforces 5-min review)
  const handleRetakeStudy = () => {
    if (activeSession) {
      setActiveSession({
        ...activeSession,
        remainingSeconds: 5 * 60, // 5-minute remedial study block
        pageIndex: 0,
        pageNumber: activeSession.chapterPages[0]?.pageNumber || 1,
        activePage: activeSession.chapterPages[0]
      });
      setCurrentScreen('kiosk');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  // Logout / Switch student
  const handleLogout = () => {
    localStorage.removeItem('soma_student_profile');
    setProfile(null);
    setSelectedSubject(null);
    setActiveSession(null);
    setCurrentScreen('signup');
  };

  // Calculate next chapter details for exit quiz screen
  const nextChapter = selectedSubject && activeSession 
    ? selectedSubject.textbook.chapters[activeSession.chapterIndex + 1] 
    : undefined;

  return (
    <div className="min-h-screen bg-[#14120e] text-[#f4efe6]">
      {/* 1. Signup / Register Screen */}
      {currentScreen === 'signup' && (
        <Screen01Signup onComplete={handleSignupComplete} />
      )}

      {/* 2. Main Dashboard (Pan-African Country Switcher + Multi-Page Chapters) */}
      {currentScreen === 'dashboard' && profile && (
        <Screen02Dashboard
          profile={profile}
          onSelectSubject={(subject, mode, chIdx, startPage) => handleStartFocusStudy(subject, 25, mode, chIdx, startPage)}
          onStartFocusStudy={(subj, dur, mode, chIdx, startPage) => handleStartFocusStudy(subj, dur, mode, chIdx, startPage)}
          onOpenLiterature={() => setCurrentScreen('literature')}
          onUpdateProfile={handleUpdateProfile}
          onLogout={handleLogout}
        />
      )}

      {/* 3. Dedicated African Literature & Story Library (Zero Quizzes) */}
      {currentScreen === 'literature' && (
        <ScreenLiteratureLibrary
          onBackToHome={() => setCurrentScreen('dashboard')}
        />
      )}

      {/* 4. Camera / Snapshot Study Ingestion */}
      {currentScreen === 'camera' && profile && selectedSubject && (
        <Screen05CameraSnap
          subject={selectedSubject}
          profile={profile}
          onConfirmSnapshot={handleConfirmSnapshot}
          onCancel={() => setCurrentScreen('dashboard')}
        />
      )}

      {/* 5. Focus Kiosk: Multi-Page Book Alongside Live Timer & Telemetry */}
      {currentScreen === 'kiosk' && profile && activeSession && (
        <Screen03StudyKiosk
          session={activeSession}
          profile={profile}
          onUpdateSession={(updated) => setActiveSession({ ...activeSession, ...updated })}
          onCompleteSession={handleCompleteSession}
          onExitEarly={() => {
            if (activeSession) {
              const defaultPayload: ExitQuizRequestPayload = {
                countryCode: profile.country,
                curriculumCode: selectedSubject?.textbook.curriculumCode || 'CAPS / DBE',
                subjectName: activeSession.subjectName,
                chapterTitle: activeSession.chapterTitle,
                chapterNumber: activeSession.chapterIndex,
                lastReadPageNumber: activeSession.lastReadPageNumber || 1,
                pagesRead: activeSession.pagesReadInSession || [1],
                pageContents: activeSession.cumulativePageContent || ''
              };
              handleCompleteSession(defaultPayload);
            }
          }}
        />
      )}

      {/* 6. Cumulative Exit-Gate Assessment Engine */}
      {currentScreen === 'exit_quiz' && profile && activeSession && activeQuizPayload && (
        <Screen04ExitQuiz
          session={activeSession}
          profile={profile}
          quizPayload={activeQuizPayload}
          questions={quizQuestions}
          nextChapterTitle={nextChapter?.title}
          hasNextChapter={Boolean(nextChapter)}
          onPassQuiz={handlePassQuiz}
          onRetakeStudy={handleRetakeStudy}
          onReturnHome={() => {
            setActiveSession(null);
            setCurrentScreen('dashboard');
          }}
        />
      )}
    </div>
  );
}
