# SomaAfrika Focus + Mastery Flow

## Student journey
1. Student selects a chapter and starts a timed Focus Kiosk session.
2. Inside the kiosk the learner can read the selected digital textbook chapter without leaving focus mode.
3. The learner can upload/take a picture of a page, worksheet, notebook or problem. OCR/vision adds the work to the current study context.
4. The Socratic Mentor can summarise the chapter, explain concepts in simple terms, or teach a problem step-by-step. It is instructed never to provide final answers.
5. The learner finishes the session and is routed to a Chapter Mastery Check.
6. The quiz is generated from the exact active chapter context: chapter title, objectives, concepts, chapter content, practice material and recorded reading context.
7. A score of at least 75% unlocks the session and awards study tokens.
8. A lower score triggers guided review. The UI avoids revealing correct-answer text and lets the learner return to learning before taking a fresh chapter-specific quiz variant.

## Guardrails
- Mentor: zero direct answers, one teaching step at a time, one check-for-understanding question at the end.
- Exam Hall is still protected by its separate no-hints clarification protocol.
- The Focus Kiosk remains locked during active timed study.
