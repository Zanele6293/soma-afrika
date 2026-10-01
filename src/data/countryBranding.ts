import { CountryCode } from '../types';

export interface CountryBranding {
  code: CountryCode;
  countryName: string;
  shortName: string;
  flag: string;
  ministryName: string;
  ministryShort: string;
  boardName: string;
  curriculumName: string;
  officialExamTitle: string;
  gradeSystemName: string;
  studentTerm: string; // "Learner" in SA, "Student / Candidate" in Zim
  provincialTerm: string; // "Province" or "Region"
  motto: string;
  accentColor: string; // Tailwind color class or hex
  bannerGradient: string;
  badgeBg: string;
  borderAccent: string;
  gradingScale: Array<{ grade: string; marks: string; status: string }>;
  sampleNotice: {
    title: string;
    date: string;
    body: string;
  };
}

export const COUNTRY_BRANDING: Record<CountryCode, CountryBranding> = {
  ZA: {
    code: 'ZA',
    countryName: 'Republic of South Africa',
    shortName: 'South Africa',
    flag: '🇿🇦',
    ministryName: 'Department of Basic Education (DBE)',
    ministryShort: 'DBE South Africa',
    boardName: 'Umalusi / CAPS Examination Board',
    curriculumName: 'Curriculum Assessment Policy Statements (CAPS / IEB)',
    officialExamTitle: 'National Senior Certificate (NSC) Matric',
    gradeSystemName: 'Grade 4 to 12 (GET & FET Phases)',
    studentTerm: 'Learner',
    provincialTerm: 'Province',
    motto: 'Excellence in Basic Education • Umoya we-Afrika',
    accentColor: '#007749',
    bannerGradient: 'from-[#0b3d20] via-[#1a2e1d] to-[#121c15]',
    badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-700/60',
    borderAccent: 'border-l-4 border-emerald-500',
    gradingScale: [
      { grade: 'Level 7', marks: '80–100%', status: 'Outstanding (Distinction)' },
      { grade: 'Level 6', marks: '70–79%', status: 'Meritorious' },
      { grade: 'Level 5', marks: '60–69%', status: 'Substantial' },
      { grade: 'Level 4', marks: '50–59%', status: 'Adequate (Bachelor Pass Threshold)' },
      { grade: 'Level 3', marks: '40–49%', status: 'Moderate (Diploma Pass)' },
    ],
    sampleNotice: {
      title: 'DBE National Curriculum Statement (CAPS Section 4 Policy)',
      date: 'Current Academic Term',
      body: 'Learners preparing for the National Senior Certificate must achieve a minimum of 40% in Home Language and three other subjects, plus 30% in two subjects to qualify for the NSC award.',
    },
  },
  ZW: {
    code: 'ZW',
    countryName: 'Republic of Zimbabwe',
    shortName: 'Zimbabwe',
    flag: '🇿🇼',
    ministryName: 'Ministry of Primary and Secondary Education (MoPSE)',
    ministryShort: 'MoPSE Zimbabwe',
    boardName: 'Zimbabwe School Examinations Council (ZIMSEC)',
    curriculumName: 'Heritage-Based Curriculum 5.0 (ZIMSEC)',
    officialExamTitle: 'ZIMSEC Ordinary Level (O-Level) & A-Level',
    gradeSystemName: 'Form 1 to Form 6 (O-Level & A-Level)',
    studentTerm: 'Candidate',
    provincialTerm: 'Province',
    motto: 'Unity, Freedom, Work • Dzidzo neUnhu / Imfundo loBuntu',
    accentColor: '#006400',
    bannerGradient: 'from-[#1a3311] via-[#212f17] to-[#191910]',
    badgeBg: 'bg-green-950 text-amber-300 border-green-700/60',
    borderAccent: 'border-l-4 border-amber-500',
    gradingScale: [
      { grade: 'Grade A', marks: '75–100%', status: 'Distinction' },
      { grade: 'Grade B', marks: '65–74%', status: 'Credit' },
      { grade: 'Grade C', marks: '50–64%', status: 'Pass (Required for 5 O-Levels)' },
      { grade: 'Grade D', marks: '45–49%', status: 'Sub-Pass' },
      { grade: 'Grade E', marks: '40–44%', status: 'Marginal Fail' },
    ],
    sampleNotice: {
      title: 'ZIMSEC National Candidate Assessment Directive',
      date: 'Current Academic Term',
      body: 'Candidates registering for ZIMSEC O-Level examinations must demonstrate proficiency across 5 core subject areas including English Language, Mathematics, Science, and Heritage Studies.',
    },
  },
  KE: {
    code: 'KE',
    countryName: 'Republic of Kenya',
    shortName: 'Kenya',
    flag: '🇰🇪',
    ministryName: 'Ministry of Education & KICD',
    ministryShort: 'KICD / KNEC Kenya',
    boardName: 'Kenya National Examinations Council (KNEC)',
    curriculumName: 'Competency Based Curriculum (CBC) & KCSE',
    officialExamTitle: 'Kenya Certificate of Secondary Education (KCSE)',
    gradeSystemName: 'Grade 7-9 Junior School & Form 1-4 Senior',
    studentTerm: 'Student',
    provincialTerm: 'County',
    motto: 'Harambee • Elimu ni Taa',
    accentColor: '#990000',
    bannerGradient: 'from-[#381111] via-[#241717] to-[#141212]',
    badgeBg: 'bg-red-950 text-red-300 border-red-700/60',
    borderAccent: 'border-l-4 border-red-500',
    gradingScale: [
      { grade: 'Grade A', marks: '80–100%', status: 'Plain (Distinction)' },
      { grade: 'Grade B+', marks: '70–74%', status: 'Very Good' },
      { grade: 'Grade C+', marks: '55–59%', status: 'University Direct Entry Cutoff' },
    ],
    sampleNotice: {
      title: 'KICD Competency Based Assessment Framework',
      date: 'Current Academic Term',
      body: 'Junior School learners sit the Kenya Junior School Education Assessment (KJSEA) while Senior School candidates follow the KCSE pathway for university placement.',
    },
  },
  NG: {
    code: 'NG',
    countryName: 'Federal Republic of Nigeria',
    shortName: 'Nigeria',
    flag: '🇳🇬',
    ministryName: 'Federal Ministry of Education & NERDC',
    ministryShort: 'NERDC / WAEC Nigeria',
    boardName: 'West African Examinations Council (WAEC Nigeria)',
    curriculumName: 'Universal Basic Education (UBE) & NERDC Curriculum',
    officialExamTitle: 'West African Senior School Certificate (WASSCE)',
    gradeSystemName: 'JSS 1-3 & SSS 1-3 (Senior Secondary)',
    studentTerm: 'Student',
    provincialTerm: 'State',
    motto: 'Unity and Faith, Peace and Progress',
    accentColor: '#008751',
    bannerGradient: 'from-[#0b331e] via-[#16271e] to-[#121915]',
    badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-700/60',
    borderAccent: 'border-l-4 border-emerald-500',
    gradingScale: [
      { grade: 'A1', marks: '75–100%', status: 'Excellent' },
      { grade: 'B2 / B3', marks: '65–74%', status: 'Very Good / Good' },
      { grade: 'C4 – C6', marks: '50–64%', status: 'Credit (University Prerequisite)' },
    ],
    sampleNotice: {
      title: 'WAEC National Examination Standard Notification',
      date: 'Current Academic Term',
      body: 'Candidates must achieve a minimum of five credits, including English Language and Mathematics, in not more than two sittings to qualify for tertiary admission.',
    },
  },
  MW: {
    code: 'MW',
    countryName: 'Republic of Malawi',
    shortName: 'Malawi',
    flag: '🇲🇼',
    ministryName: 'Ministry of Education & Malawi Institute of Education',
    ministryShort: 'MoEST / MANEB Malawi',
    boardName: 'Malawi National Examinations Board (MANEB)',
    curriculumName: 'Secondary School Curriculum & Assessment Reform',
    officialExamTitle: 'Malawi School Certificate of Education (MSCE)',
    gradeSystemName: 'Form 1 to Form 4 (JCE & MSCE)',
    studentTerm: 'Candidate',
    provincialTerm: 'District',
    motto: 'Unity and Freedom • Maphunziro ndi Mphamvu',
    accentColor: '#CE1126',
    bannerGradient: 'from-[#2e1014] via-[#1f191b] to-[#121212]',
    badgeBg: 'bg-rose-950 text-rose-300 border-rose-700/60',
    borderAccent: 'border-l-4 border-rose-500',
    gradingScale: [
      { grade: 'Points 1–2', marks: '75–100%', status: 'Distinction' },
      { grade: 'Points 3–6', marks: '50–74%', status: 'Credit' },
      { grade: 'Points 7–8', marks: '40–49%', status: 'Pass' },
    ],
    sampleNotice: {
      title: 'MANEB MSCE Certificate Qualification Rules',
      date: 'Current Academic Term',
      body: 'An MSCE Certificate is awarded to candidates who pass at least six subjects including English with at least one credit pass.',
    },
  },
  GH: {
    code: 'GH',
    countryName: 'Republic of Ghana',
    shortName: 'Ghana',
    flag: '🇬🇭',
    ministryName: 'Ministry of Education & NaCCA Ghana',
    ministryShort: 'GES / NaCCA Ghana',
    boardName: 'West African Examinations Council (WAEC Ghana)',
    curriculumName: 'Standard-Based & Common Core Programme (NaCCA)',
    officialExamTitle: 'West African Senior School Certificate (WASSCE Ghana)',
    gradeSystemName: 'JHS 1-3 & SHS 1-3',
    studentTerm: 'Student',
    provincialTerm: 'Region',
    motto: 'Freedom and Justice • Nyansa ne Nimdeɛ',
    accentColor: '#FFD100',
    bannerGradient: 'from-[#382d0e] via-[#242116] to-[#141412]',
    badgeBg: 'bg-amber-950 text-amber-300 border-amber-700/60',
    borderAccent: 'border-l-4 border-amber-500',
    gradingScale: [
      { grade: 'A1', marks: '75–100%', status: 'Excellent' },
      { grade: 'B2 / B3', marks: '65–74%', status: 'Very Good / Good' },
      { grade: 'C4 – C6', marks: '50–64%', status: 'Credit' },
    ],
    sampleNotice: {
      title: 'GES Free Senior High School Academic Guidelines',
      date: 'Current Academic Term',
      body: 'Ghanaian students participate in the Common Core Programme leading directly into the West African Senior School Certificate Examination (WASSCE).',
    },
  },
};
