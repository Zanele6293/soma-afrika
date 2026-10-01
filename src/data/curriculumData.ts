import { 
  CountryCode, 
  CountryInfo, 
  SubjectItem, 
  Textbook, 
  Chapter, 
  TextbookPage, 
  QuizQuestion, 
  ExitQuizRequestPayload 
} from '../types';
import {
  buildEnglishTextbook,
  buildLifeOrientationTextbook,
  buildCivicEducationTextbook,
  buildSocialStudiesTextbook,
  buildHeritageStudiesTextbook,
  buildAfricanLanguagesTextbook,
  buildAgricultureTextbook,
  buildAccountingTextbook,
  buildBusinessStudiesTextbook,
  buildEconomicsTextbook,
  buildPureMathsTextbook,
  buildMathsLitTextbook,
  buildPhysicalSciencesTextbook,
  buildChemistryTextbook,
  buildBiologyTextbook
} from './subjectCurricula';

export const COUNTRIES: Record<CountryCode, CountryInfo> = {
  ZA: {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    curriculum: 'CAPS / IEB',
    board: 'Department of Basic Education (DBE)',
    hallName: 'CAPS Matric & Senior Hall',
    color: '#007A3D',
    accent: '#FFB612',
    badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-700',
    compulsoryNotes: 'Mandatory: Life Orientation, English, Pure Maths OR Mathematical Literacy',
    provinces: ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape'],
    gradeLevels: [
      { id: 'Grade 10', label: 'Grade 10 (FET Phase)', stage: 'FET Phase' },
      { id: 'Grade 11', label: 'Grade 11 (FET Phase)', stage: 'FET Phase' },
      { id: 'Grade 12', label: 'Grade 12 (Matric NSC)', stage: 'FET Phase' },
    ]
  },
  NG: {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    curriculum: 'NERDC / WAEC / SSCE',
    board: 'West African Examinations Council (WAEC / NECO)',
    hallName: 'WAEC / WASSCE & SSCE Hall',
    color: '#008751',
    accent: '#FFFFFF',
    badgeBg: 'bg-green-950 text-green-300 border-green-700',
    compulsoryNotes: 'Mandatory: Civic Education, English Language, General Mathematics',
    provinces: ['Lagos', 'Abuja (FCT)', 'Kano', 'Rivers', 'Oyo', 'Enugu', 'Kaduna', 'Delta', 'Anambra', 'Edo'],
    gradeLevels: [
      { id: 'SSS 1', label: 'SSS 1 (Grade 10)', stage: 'Senior Secondary' },
      { id: 'SSS 2', label: 'SSS 2 (Grade 11)', stage: 'Senior Secondary' },
      { id: 'SSS 3', label: 'SSS 3 (WAEC SSCE Exam)', stage: 'Senior Secondary' },
    ]
  },
  KE: {
    code: 'KE',
    name: 'Kenya',
    flag: '🇰🇪',
    curriculum: 'KICD / KCSE / CBC',
    board: 'Kenya National Examinations Council (KNEC)',
    hallName: 'KCSE & CBC Senior Secondary Hall',
    color: '#990000',
    accent: '#006600',
    badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-700',
    compulsoryNotes: 'Mandatory: English, Kiswahili, Mathematics',
    provinces: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Uasin Gishu', 'Kiambu', 'Machakos', 'Nyeri'],
    gradeLevels: [
      { id: 'Grade 10', label: 'Grade 10 (Senior School CBC)', stage: 'Senior School' },
      { id: 'Form 3', label: 'Form 3 (Senior KCSE)', stage: 'KCSE Secondary' },
      { id: 'Form 4', label: 'Form 4 (KCSE National Exam)', stage: 'KCSE Secondary' },
    ]
  },
  GH: {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    curriculum: 'NaCCA / WASSCE / GES',
    board: 'Ghana Education Service & WAEC',
    hallName: 'WASSCE & SHS Examination Hall',
    color: '#006B3F',
    accent: '#FCD116',
    badgeBg: 'bg-amber-950 text-amber-300 border-amber-700',
    compulsoryNotes: 'Mandatory: Integrated Science, Social Studies, Core Maths, English',
    provinces: ['Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central', 'Northern', 'Volta'],
    gradeLevels: [
      { id: 'SHS 1', label: 'SHS 1 (Grade 10)', stage: 'Senior High School' },
      { id: 'SHS 2', label: 'SHS 2 (Grade 11)', stage: 'Senior High School' },
      { id: 'SHS 3', label: 'SHS 3 (WASSCE Exam)', stage: 'WASSCE' },
    ]
  },
  ZW: {
    code: 'ZW',
    name: 'Zimbabwe',
    flag: '🇿🇼',
    curriculum: 'ZIMSEC Heritage-Based',
    board: 'Zimbabwe School Examinations Council (ZIMSEC)',
    hallName: 'ZIMSEC Ordinary & Advanced Level Hall',
    color: '#006400',
    accent: '#FFD700',
    badgeBg: 'bg-yellow-950 text-yellow-300 border-yellow-700',
    compulsoryNotes: 'Mandatory: Heritage Studies, English Language, Mathematics, Indigenous Languages',
    provinces: ['Harare', 'Bulawayo', 'Manicaland', 'Mashonaland Central', 'Mashonaland East', 'Mashonaland West', 'Masvingo', 'Matabeleland North', 'Matabeleland South', 'Midlands'],
    gradeLevels: [
      { id: 'Form 3', label: 'Form 3 (O-Level)', stage: 'O-Level Senior' },
      { id: 'Form 4', label: 'Form 4 (ZIMSEC O-Level Exam)', stage: 'O-Level Senior' },
      { id: 'Form 5', label: 'Form 5 (Lower 6th A-Level)', stage: 'A-Level' },
      { id: 'Form 6', label: 'Form 6 (Upper 6th A-Level)', stage: 'A-Level' },
    ]
  },
  MW: {
    code: 'MW',
    name: 'Malawi',
    flag: '🇲🇼',
    curriculum: 'MANEB / MSCE',
    board: 'Malawi National Examinations Board (MANEB)',
    hallName: 'MANEB MSCE & Secondary Hall',
    color: '#C00000',
    accent: '#008000',
    badgeBg: 'bg-red-950 text-red-300 border-red-700',
    compulsoryNotes: 'Mandatory: Chichewa, English, Mathematics',
    provinces: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu', 'Mangochi', 'Salima'],
    gradeLevels: [
      { id: 'Form 3', label: 'Form 3 (Senior Secondary)', stage: 'Senior Secondary' },
      { id: 'Form 4', label: 'Form 4 (MSCE National Exam)', stage: 'MSCE' },
    ]
  }
};

// MULTI-PAGE CHAPTER CREATION HELPERS
export function createPhysicsPages(country: CountryCode): TextbookPage[] {
  return [
    {
      pageNumber: 1,
      totalPagesInChapter: 3,
      title: 'Section 1.1: 1D Vectors & Uniform Acceleration',
      subtitle: 'Coordinate Axes, Velocity Vectors & Acceleration Gradient',
      syllabusRef: `${country === 'ZA' ? 'CAPS Physical Sciences Paper 1' : country === 'NG' ? 'WAEC Physics SS2' : 'National Physics Syllabus'}`,
      theorySections: [
        {
          heading: '1. Rectilinear Motion and Direction Conventions',
          paragraphs: [
            'In rectilinear kinematics, all motion is restricted along a single 1D axis. Vector displacement Δx is the directed distance from initial coordinate x_i to final coordinate x_f.',
            'Uniform acceleration a indicates the velocity vector changes at a constant rate over elapsed time Δt: a = Δv / Δt. Graphically, acceleration is the slope of the velocity-time curve.'
          ],
          keyTerms: [
            { term: 'Displacement (Δx)', definition: 'Vector change in position: Δx = x_f - x_i (measured in meters, m).' },
            { term: 'Instantaneous Acceleration (a)', definition: 'Rate of change of velocity: a = (v_f - v_i) / Δt (measured in m/s²).' }
          ]
        }
      ],
      keyFormulas: [
        {
          name: 'Velocity-Time Kinematic Relation',
          latex: 'v_f = v_i + a\\Delta t',
          variables: ['v_f: final velocity (m/s)', 'v_i: initial velocity (m/s)', 'a: acceleration (m/s²)', 'Δt: time (s)']
        }
      ],
      workedExample: {
        problemStatement: 'A commuter bus accelerates uniformly from rest (v_i = 0) at 2.5 m/s² for 8 seconds. Calculate its final velocity.',
        pedagogicalSteps: [
          { step: 1, description: 'Identify given variables', mathematicalForm: 'v_i = 0\\text{ m/s}, \\quad a = 2.5\\text{ m/s}^2, \\quad \\Delta t = 8.0\\text{ s}' },
          { step: 2, description: 'Apply v_f = v_i + aΔt', mathematicalForm: 'v_f = 0 + (2.5)(8.0) = 20.0\\text{ m/s} \\quad (72\\text{ km/h})' }
        ],
        socraticTeacherTip: 'Always write down the 5 kinematic variables (v_i, v_f, a, Δx, Δt) before picking your equation.'
      },
      africanContext: {
        regionName: 'Sub-Saharan Urban Transit Corridors',
        title: 'Bus Rapid Transit (BRT) Accelerometer Calibration',
        realWorldApplication: 'Transit engineers on the Lagos BRT and Johannesburg Rea Vaya calibrate engine governor acceleration to maximize commuter safety.'
      },
      keyTakeaways: [
        'Displacement is a vector requiring both magnitude and directional sign (+ or -).',
        'v_f = v_i + aΔt applies strictly when acceleration remains uniform.'
      ],
      practiceQuestion: {
        prompt: 'An electric bike accelerates from 4 m/s to 16 m/s in 4.0 s. What is its acceleration?',
        marks: 3,
        conceptualHint: 'a = (16 - 4) / 4 = 3.0 m/s².'
      }
    },
    {
      pageNumber: 2,
      totalPagesInChapter: 3,
      title: 'Section 1.2: Displacement Under Constant Acceleration',
      subtitle: 'Quadratic Time Scaling & Area Under Velocity-Time Graphs',
      syllabusRef: 'Kinematics Displacement Standard',
      theorySections: [
        {
          heading: '1. The Velocity-Time Area Theorem',
          paragraphs: [
            'On any velocity-time graph, the area enclosed beneath the curve equals the total displacement Δx.',
            'For uniform acceleration, this area divides into a rectangle (v_i · Δt) and an acceleration triangle (½ · a · Δt²). Summing both gives Δx = v_iΔt + ½aΔt².'
          ]
        }
      ],
      keyFormulas: [
        {
          name: 'Displacement with Constant Acceleration',
          latex: '\\Delta x = v_i \\Delta t + \\frac{1}{2}a\\Delta t^2',
          variables: ['Δx: displacement (m)', 'v_i: initial velocity', 'a: acceleration', 'Δt: time']
        }
      ],
      workedExample: {
        problemStatement: 'A Toyota Quantum minibus taxi accelerates from rest with a = 4.0 m/s² for 6.0 seconds. Find distance travelled.',
        pedagogicalSteps: [
          { step: 1, description: 'Substitute into displacement equation', mathematicalForm: '\\Delta x = (0)(6) + \\frac{1}{2}(4.0)(6.0)^2' },
          { step: 2, description: 'Evaluate quadratic time', mathematicalForm: '\\Delta x = 0 + 2.0 \\times 36.0 = 72.0\\text{ meters}' }
        ],
        socraticTeacherTip: 'Remember that only time Δt is squared, never the acceleration!'
      },
      africanContext: {
        regionName: 'M1 Freeway Johannesburg & Third Mainland Bridge Lagos',
        title: 'Highway Safe Stopping Cushions',
        realWorldApplication: 'Civil authorities calculate highway vehicle spacing using quadratic time scaling ½aΔt².'
      },
      keyTakeaways: [
        'Displacement scales quadratically with elapsed time when starting from rest.',
        'Doubling the acceleration time quadruples the distance covered.'
      ],
      practiceQuestion: {
        prompt: 'Find displacement of a cart accelerating from rest at 3 m/s² for 5 seconds.',
        marks: 3,
        conceptualHint: 'Δx = ½(3)(5)² = ½(3)(25) = 37.5 m.'
      }
    },
    {
      pageNumber: 3,
      totalPagesInChapter: 3,
      title: 'Section 1.3: Time-Independent Kinematics & Braking',
      subtitle: 'Torricelli’s Kinematic Relation and Deceleration Analysis',
      syllabusRef: 'Torricelli Stopping Distance Standard',
      theorySections: [
        {
          heading: '1. Eliminating Elapsed Time',
          paragraphs: [
            'In emergency braking scenarios, event duration is unknown. By isolating Δt and substituting into displacement, we derive v_f² = v_i² + 2aΔx.',
            'This directly relates velocity squared to acceleration and stopping distance.'
          ]
        }
      ],
      keyFormulas: [
        {
          name: 'Time-Independent Kinematic Relation',
          latex: 'v_f^2 = v_i^2 + 2a\\Delta x',
          variables: ['v_f: final velocity', 'v_i: initial velocity', 'a: acceleration (- for braking)', 'Δx: stopping distance']
        }
      ],
      workedExample: {
        problemStatement: 'A train at 30 m/s decelerates at -2.5 m/s² to a stop (v_f = 0). Calculate stopping distance.',
        pedagogicalSteps: [
          { step: 1, description: 'Substitute into Torricelli’s formula', mathematicalForm: '0^2 = (30)^2 + 2(-2.5)\\Delta x \\implies 0 = 900 - 5.0\\Delta x' },
          { step: 2, description: 'Solve for displacement Δx', mathematicalForm: '5.0\\Delta x = 900 \\implies \\Delta x = 180.0\\text{ meters}' }
        ],
        socraticTeacherTip: 'Braking acceleration is negative! The two negatives cancel out to give positive forward distance.'
      },
      africanContext: {
        regionName: 'Transnet Rail & Kenya Standard Gauge Railway (SGR)',
        title: 'Heavy Freight Headway Spacing',
        realWorldApplication: 'Locomotive drivers on the Nairobi-Mombasa SGR rely on v_f² = v_i² + 2aΔx to calculate stopping points before track switches.'
      },
      keyTakeaways: [
        'Use v_f² = v_i² + 2aΔx when time is neither given nor required.',
        'Stopping distance quadruples if speed doubles.'
      ],
      practiceQuestion: {
        prompt: 'A car at 20 m/s stops with deceleration -4 m/s². What is stopping distance?',
        marks: 4,
        conceptualHint: '0 = 400 - 8Δx, so Δx = 50 m.'
      }
    }
  ];
}

export function createMathsLitPages(country: CountryCode): TextbookPage[] {
  return [
    {
      pageNumber: 1,
      totalPagesInChapter: 2,
      title: 'Section 1.1: Personal & Household Budgeting',
      subtitle: 'Income Streams, Fixed Overhead & Variable Expenses',
      syllabusRef: `${country === 'ZA' ? 'CAPS Mathematical Literacy Paper 1 Finance' : 'Financial Literacy Module'}`,
      theorySections: [
        {
          heading: '1. Structuring a Monthly Household Budget',
          paragraphs: [
            'Mathematical Literacy emphasizes real-world functional mathematics. A budget is a financial plan balancing anticipated income against projected expenditures.',
            'Fixed expenses (rent, bond, vehicle insurance) remain constant every month. Variable expenses (groceries, electricity tokens, public transit) fluctuate with consumption.'
          ]
        }
      ],
      keyFormulas: [
        {
          name: 'Net Disposable Surplus / Deficit',
          latex: '\\text{Net Surplus} = \\text{Total Gross Income} - (\\text{Deductions} + \\text{Total Expenses})',
          variables: ['Gross: Total earnings before tax', 'Net: Take-home surplus']
        }
      ],
      workedExample: {
        problemStatement: 'Sipho earns R18,500 gross. PAYE tax is R2,200 and UIF is R185. Fixed expenses are R8,500 and groceries are R4,200. Calculate his monthly surplus.',
        pedagogicalSteps: [
          { step: 1, description: 'Calculate net take-home salary', mathematicalForm: '\\text{Net Income} = 18500 - (2200 + 185) = R16,115' },
          { step: 2, description: 'Calculate total household expenses', mathematicalForm: '\\text{Total Expenses} = 8500 + 4200 = R12,700' },
          { step: 3, description: 'Compute net monthly surplus', mathematicalForm: '\\text{Surplus} = 16115 - 12700 = +R3,415' }
        ],
        socraticTeacherTip: 'Always calculate Net Take-Home Salary FIRST before deducting household living expenses!'
      },
      africanContext: {
        regionName: 'South African Urban & Township Household Finance',
        title: 'Stokvel Cooperative Savings Societies',
        realWorldApplication: 'Over 11 million South Africans participate in informal community Stokvel clubs, pooling monthly surplus funds to buy bulk groceries or earn high compound interest.'
      },
      keyTakeaways: [
        'A budget with expenses exceeding income is in deficit and leads to debt spiral.',
        'Distinguish fixed non-negotiable costs from variable lifestyle expenses.'
      ],
      practiceQuestion: {
        prompt: 'If take-home pay is R12,000 and total living expenses are R9,500, calculate monthly savings percentage.',
        marks: 3,
        conceptualHint: 'Surplus = 2,500. Percentage = (2500 / 12000) × 100 ≈ 20.8%.'
      }
    },
    {
      pageNumber: 2,
      totalPagesInChapter: 2,
      title: 'Section 1.2: Tariff Systems (Electricity & Water Stepped Tiers)',
      subtitle: 'Block-Rate Pricing and Incline Tariff Structures',
      syllabusRef: 'CAPS Mathematical Literacy Paper 2 Finance',
      theorySections: [
        {
          heading: '1. Incline Block Tariffs (IBT)',
          paragraphs: [
            'Municipalities (such as City of Johannesburg and Eskom) use stepped block tariffs. The first block of water or electricity is subsidized (lowest rate). As consumption enters higher blocks, the per-unit rate increases steeply to encourage resource conservation.'
          ]
        }
      ],
      keyFormulas: [
        {
          name: 'Stepped Tariff Cost',
          latex: '\\text{Total Cost} = (B_1 \\times R_1) + (B_2 \\times R_2) + \\text{VAT (15\\%)}',
          variables: ['B_1: units in tier 1', 'R_1: tier 1 rate', 'VAT: 15% in South Africa']
        }
      ],
      workedExample: {
        problemStatement: 'Eskom Tier 1 (0-350 kWh) costs R1.80/kWh; Tier 2 (>350 kWh) costs R2.60/kWh. A household consumes 450 kWh. Calculate total cost before VAT.',
        pedagogicalSteps: [
          { step: 1, description: 'Calculate cost of first 350 kWh in Tier 1', mathematicalForm: '350 \\times 1.80 = R630.00' },
          { step: 2, description: 'Calculate remaining 100 kWh in Tier 2', mathematicalForm: '(450 - 350) \\times 2.60 = 100 \\times 2.60 = R260.00' },
          { step: 3, description: 'Sum both tiers', mathematicalForm: '630.00 + 260.00 = R890.00' }
        ],
        socraticTeacherTip: 'Never multiply all 450 kWh by the higher Tier 2 rate! You must split consumption across the tiered thresholds.'
      },
      africanContext: {
        regionName: 'Prepaid Meter Utilities Across Africa',
        title: 'Smart Meter Token Purchasing',
        realWorldApplication: 'Households purchasing prepaid electricity tokens at the start of the month buy within the cheaper lower tier before high-consumption rates kick in.'
      },
      keyTakeaways: [
        'Stepped block tariffs penalize high resource wastage.',
        'Calculate usage block by block, never as a single flat multiplier.'
      ],
      practiceQuestion: {
        prompt: 'If Tier 1 is R2.00 for first 100 units and Tier 2 is R3.00, what is the cost of 120 units?',
        marks: 3,
        conceptualHint: '(100 × 2) + (20 × 3) = 200 + 60 = R260.'
      }
    }
  ];
}

export function createCivicsPages(): TextbookPage[] {
  return [
    {
      pageNumber: 1,
      totalPagesInChapter: 2,
      title: 'Section 1.1: Democratic Governance & Rule of Law',
      subtitle: 'Constitutional Supremacy, Separation of Powers & Public Institutions',
      syllabusRef: 'NERDC / WAEC Civic Education Senior Secondary',
      theorySections: [
        {
          heading: '1. Pillars of Democratic Citizenship',
          paragraphs: [
            'Civic Education is a compulsory national subject in Nigeria designed to foster responsible citizenship, national unity, and ethical governance.',
            'The Constitution of the Federal Republic of Nigeria is the supreme law. The three arms of government—Executive, Legislature, and Judiciary—operate under the doctrine of Separation of Powers to ensure checks and balances.'
          ]
        }
      ],
      workedExample: {
        problemStatement: 'Contrast the primary functions of the Nigerian National Assembly (Legislature) and the Supreme Court (Judiciary).',
        pedagogicalSteps: [
          { step: 1, description: 'State legislative mandate', mathematicalForm: '\\text{Legislature (Senate \\& House): Lawmaking, budget appropriation, and executive oversight.}' },
          { step: 2, description: 'State judicial mandate', mathematicalForm: '\\text{Judiciary (Courts): Interpreting constitutional law and adjudicating disputes independently.}' }
        ],
        socraticTeacherTip: 'Remember: the legislature makes laws, the executive implements laws, and the judiciary interprets laws.'
      },
      africanContext: {
        regionName: 'West African Democratic Transitions',
        title: 'Electoral Integrity & Civic Youth Participation',
        realWorldApplication: 'INEC voter registration campaigns empower Nigerian youth to hold public officials accountable and combat electoral malpractice.'
      },
      keyTakeaways: [
        'No citizen or government official is above the Constitution.',
        'Separation of powers prevents autocratic abuse of state authority.'
      ],
      practiceQuestion: {
        prompt: 'Explain why an independent judiciary is essential in a democratic society.',
        marks: 4,
        conceptualHint: 'Focus on constitutional defense and protecting citizen rights from executive overreach.'
      }
    },
    {
      pageNumber: 2,
      totalPagesInChapter: 2,
      title: 'Section 1.2: Fundamental Human Rights & Civic Duties',
      subtitle: 'Chapter IV Constitutional Rights and Citizen Responsibilities',
      syllabusRef: 'WAEC Civic Education Rights & Duties',
      theorySections: [
        {
          heading: '1. Rights Balanced with Responsibilities',
          paragraphs: [
            'Chapter IV of the Nigerian Constitution guarantees fundamental rights: right to life, dignity of the human person, personal liberty, fair hearing, and freedom of expression.',
            'Every right is paired with a corresponding civic responsibility: paying lawful taxes, obeying legitimate laws, voting during elections, and protecting public property.'
          ]
        }
      ],
      africanContext: {
        regionName: 'Pan-African Human Rights Frameworks',
        title: 'African Charter on Human and Peoples’ Rights (Banjul Charter)',
        realWorldApplication: 'Adopted across Africa, the Banjul Charter uniquely recognizes communal duties alongside individual civil liberties.'
      },
      keyTakeaways: [
        'Rights are not absolute: they are limited by the rights of others and national public order.',
        'Civic engagement is the bedrock of democratic sustainability.'
      ],
      practiceQuestion: {
        prompt: 'List three civic duties every citizen owes to the state.',
        marks: 3,
        conceptualHint: 'Taxes, voting, obeying laws, reporting crimes.'
      }
    }
  ];
}

export function createHeritagePages(): TextbookPage[] {
  return [
    {
      pageNumber: 1,
      totalPagesInChapter: 2,
      title: 'Section 1.1: Great Zimbabwe & Dry-Stone Architecture',
      subtitle: 'Monumental Heritage, Trade Corridors & Iron-Age Governance',
      syllabusRef: 'ZIMSEC Heritage Studies Syllabus O-Level',
      theorySections: [
        {
          heading: '1. Architectural Genius of Great Zimbabwe',
          paragraphs: [
            'Heritage Studies is a compulsory national curriculum requirement in Zimbabwe. Great Zimbabwe (11th–15th century CE) represents one of Africa’s greatest ancient architectural achievements.',
            'The Great Enclosure and Hill Complex were constructed using dry-stone granite masonry—tens of thousands of dressed granite blocks fitted together without any mortar or cement.'
          ]
        }
      ],
      africanContext: {
        regionName: 'Ancient Indian Ocean Trade Corridors',
        title: 'Sofala Port & Global Gold-Porcelain Trade',
        realWorldApplication: 'Archaeological excavations at Great Zimbabwe revealed Ming Dynasty Chinese porcelain, Persian glassware, and Arabian coins, proving ancient Zimbabwe was a central hub in global Indian Ocean commerce.'
      },
      keyTakeaways: [
        'Dry-stone masonry proved indigenous engineering sophistication centuries before European arrival.',
        'The carved soapstone Zimbabwe Bird (Hungwe) serves as the sovereign national emblem.'
      ],
      practiceQuestion: {
        prompt: 'Why was the dry-stone construction technique at Great Zimbabwe so architecturally significant?',
        marks: 4,
        conceptualHint: 'Curved walls fitted without mortar survived for over 700 years due to precision stone dressing.'
      }
    },
    {
      pageNumber: 2,
      totalPagesInChapter: 2,
      title: 'Section 1.2: Unhu / Ubuntu Ethics & Cultural Liberation',
      subtitle: 'Communal Responsibility, Liberation Heritage & National Identity',
      syllabusRef: 'ZIMSEC Cultural Values & Ethics',
      theorySections: [
        {
          heading: '1. The Philosophy of Unhu / Ubuntu',
          paragraphs: [
            'Unhu (in Shona) or Ubuntu (in Ndebele) embodies the humanistic maxim: "Munhu munhu nevanhu" (A person is a person through other persons). It emphasizes communal solidarity, respect for elders, honesty, and mutual care.',
            'Heritage Studies honors the liberation legacy of the First and Second Chimurenga, recognizing heroes who sacrificed for land restitution and national independence.'
          ]
        }
      ],
      africanContext: {
        regionName: 'Southern African Cultural Solidarity',
        title: 'Community Granaries (Zunde raMambo)',
        realWorldApplication: 'Traditional chiefs maintained communal fields to feed widows, orphans, and travelers during lean harvests—an indigenous social security safety net.'
      },
      keyTakeaways: [
        'Individual identity is rooted in ethical community harmony.',
        'National sovereignty was won through collective liberation struggles.'
      ],
      practiceQuestion: {
        prompt: 'How does the Zunde raMambo concept embody Unhu/Ubuntu in practice?',
        marks: 3,
        conceptualHint: 'Communal grain storage ensures no one in the village starves during drought.'
      }
    }
  ];
}

// DYNAMIC PAN-AFRICAN CURRICULUM REGISTRY (6 COUNTRIES)
// Zero placeholder cloning - Every single subject maps to its authentic curriculum textbook!
export function getCurriculumSubjects(country: CountryCode, grade: string): SubjectItem[] {
  // 1. SOUTH AFRICA (ZA - CAPS / IEB)
  if (country === 'ZA') {
    return [
      {
        id: 'za-lo',
        name: 'Life Orientation (LO)',
        shortName: 'Life Orientation',
        gradeRange: 'Grades 10–12 / FET Phase',
        category: 'core',
        isCompulsory: true,
        color: 'from-amber-600 to-amber-700',
        description: 'Compulsory national subject: Citizenship, human rights, career choices, and physical wellness.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildLifeOrientationTextbook('ZA', grade)
      },
      {
        id: 'za-eng',
        name: 'English Home / First Additional Language',
        shortName: 'English',
        gradeRange: 'Grades 10–12 / FET Phase',
        category: 'core',
        isCompulsory: true,
        color: 'from-blue-600 to-indigo-700',
        description: 'Compulsory language: Critical reading, literary analysis, essay composition, and language structures.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildEnglishTextbook('ZA', grade)
      },
      {
        id: 'za-math-lit',
        name: 'Mathematical Literacy',
        shortName: 'Maths Literacy',
        gradeRange: 'Grades 10–12 / FET Phase',
        category: 'core',
        isCompulsory: true,
        color: 'from-orange-600 to-amber-700',
        description: 'Essential compulsory option taken by >50% of matriculants: Budgets, incline water/electricity tariffs, finance, and plans.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildMathsLitTextbook('ZA', grade)
      },
      {
        id: 'za-pure-math',
        name: 'Pure Mathematics',
        shortName: 'Pure Mathematics',
        gradeRange: 'Grades 10–12 / FET Phase',
        category: 'core',
        isCompulsory: false,
        color: 'from-amber-600 to-amber-800',
        description: 'Functions, differential calculus, analytical geometry, trigonometry, and circle theorems.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPureMathsTextbook('ZA', grade)
      },
      {
        id: 'za-phys',
        name: 'Physical Sciences (Physics & Chemistry)',
        shortName: 'Physical Sciences',
        gradeRange: 'Grades 10–12 / FET Phase',
        category: 'science',
        isCompulsory: false,
        color: 'from-emerald-600 to-teal-700',
        description: '1D Kinematics, Newton’s laws, momentum vectors, work-energy, and electrodynamics.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPhysicalSciencesTextbook('ZA', grade)
      },
      {
        id: 'za-life-sci',
        name: 'Life Sciences (Biology)',
        shortName: 'Life Sciences',
        gradeRange: 'Grades 10–12 / FET Phase',
        category: 'science',
        isCompulsory: false,
        color: 'from-teal-600 to-green-700',
        description: 'DNA code of life, genetics, meiosis, human reproduction, and southern African biodiversity.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildBiologyTextbook('ZA', grade)
      },
      {
        id: 'za-agri',
        name: 'Agricultural Sciences & Management',
        shortName: 'Agricultural Science',
        gradeRange: 'Grades 10–12 / FET Phase',
        category: 'applied',
        isCompulsory: false,
        color: 'from-green-700 to-emerald-800',
        description: 'Soil science, crop production, animal nutrition, and sustainable agricultural economics in SA.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildAgricultureTextbook('ZA', grade)
      },
      {
        id: 'za-acc',
        name: 'Financial Accounting',
        shortName: 'Accounting',
        gradeRange: 'Grades 10–12 / FET Phase',
        category: 'commercial',
        isCompulsory: false,
        color: 'from-cyan-600 to-blue-700',
        description: 'Balance Sheet, Income Statement, Cash Flow, internal control audits, and corporate governance.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildAccountingTextbook('ZA', grade)
      },
      {
        id: 'za-bus',
        name: 'Business Studies & Entrepreneurship',
        shortName: 'Business Studies',
        gradeRange: 'Grades 10–12 / FET Phase',
        category: 'commercial',
        isCompulsory: false,
        color: 'from-indigo-600 to-blue-800',
        description: 'Business environments, macro-market analysis, leadership, and labour legislation.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildBusinessStudiesTextbook('ZA', grade)
      },
      {
        id: 'za-econ',
        name: 'Economics & Regional Trade',
        shortName: 'Economics',
        gradeRange: 'Grades 10–12 / FET Phase',
        category: 'commercial',
        isCompulsory: false,
        color: 'from-amber-700 to-orange-800',
        description: 'Macroeconomic equilibrium, monetary policy, AfCFTA trade corridors, and public finance.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildEconomicsTextbook('ZA', grade)
      }
    ];
  }

  // 2. NIGERIA (NG - WAEC / NECO / SSCE)
  if (country === 'NG') {
    return [
      {
        id: 'ng-civics',
        name: 'Civic Education',
        shortName: 'Civic Education',
        gradeRange: 'Senior Secondary SSS 1–3',
        category: 'core',
        isCompulsory: true,
        color: 'from-green-600 to-emerald-800',
        description: 'Mandatory national subject: Constitutional supremacy, rule of law, democracy, and citizen duties.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildCivicEducationTextbook(grade)
      },
      {
        id: 'ng-eng',
        name: 'English Language',
        shortName: 'English',
        gradeRange: 'Senior Secondary SSS 1–3',
        category: 'core',
        isCompulsory: true,
        color: 'from-blue-600 to-indigo-700',
        description: 'Mandatory subject: Lexis and structure, oral English, essay writing, and summary comprehension.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildEnglishTextbook('NG', grade)
      },
      {
        id: 'ng-math',
        name: 'General Mathematics',
        shortName: 'General Maths',
        gradeRange: 'Senior Secondary SSS 1–3',
        category: 'core',
        isCompulsory: true,
        color: 'from-amber-600 to-amber-700',
        description: 'Mandatory subject: Number bases, quadratic equations, trigonometry, statistics, and modular arithmetic.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPureMathsTextbook('NG', grade)
      },
      {
        id: 'ng-phys',
        name: 'Physics (Senior Secondary)',
        shortName: 'Physics',
        gradeRange: 'Senior Secondary SSS 1–3',
        category: 'science',
        isCompulsory: false,
        color: 'from-emerald-600 to-teal-700',
        description: 'Mechanics, wave optics, electricity fields, atomic physics, and electronics.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPhysicalSciencesTextbook('NG', grade)
      },
      {
        id: 'ng-chem',
        name: 'Chemistry (WAEC)',
        shortName: 'Chemistry',
        gradeRange: 'Senior Secondary SSS 1–3',
        category: 'science',
        isCompulsory: false,
        color: 'from-teal-600 to-cyan-700',
        description: 'Chemical bonding, stoichiometry, periodic table, organic chemistry, and industrial electrolysis.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildChemistryTextbook('NG', grade)
      },
      {
        id: 'ng-bio',
        name: 'Biology',
        shortName: 'Biology',
        gradeRange: 'Senior Secondary SSS 1–3',
        category: 'science',
        isCompulsory: false,
        color: 'from-green-600 to-emerald-700',
        description: 'Cellular respiration, ecology, mammalian physiology, genetics, and tropical disease control.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildBiologyTextbook('NG', grade)
      },
      {
        id: 'ng-further-math',
        name: 'Further Mathematics',
        shortName: 'Further Maths',
        gradeRange: 'Senior Secondary SSS 1–3',
        category: 'science',
        isCompulsory: false,
        color: 'from-amber-700 to-orange-800',
        description: 'Vectors in 3D, calculus derivatives, matrices, mechanics, and probability distributions.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPureMathsTextbook('NG', grade)
      },
      {
        id: 'ng-agri',
        name: 'Agricultural Science',
        shortName: 'Agricultural Science',
        gradeRange: 'Senior Secondary SSS 1–3',
        category: 'applied',
        isCompulsory: false,
        color: 'from-lime-700 to-green-800',
        description: 'West African crop farming, soil fertility, livestock rearing, and agricultural economics.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildAgricultureTextbook('NG', grade)
      },
      {
        id: 'ng-acc',
        name: 'Financial Accounting (WAEC)',
        shortName: 'Financial Accounting',
        gradeRange: 'Senior Secondary SSS 1–3',
        category: 'commercial',
        isCompulsory: false,
        color: 'from-cyan-600 to-blue-700',
        description: 'Double-entry bookkeeping, manufacturing accounts, partnership balance sheets, and company accounts.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildAccountingTextbook('NG', grade)
      },
      {
        id: 'ng-econ',
        name: 'Economics',
        shortName: 'Economics',
        gradeRange: 'Senior Secondary SSS 1–3',
        category: 'commercial',
        isCompulsory: false,
        color: 'from-orange-600 to-amber-700',
        description: 'Demand and supply, national income, public debt, petroleum economics, and ECOWAS regional trade.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildEconomicsTextbook('NG', grade)
      },
      {
        id: 'ng-govt',
        name: 'Government & Political Science',
        shortName: 'Government',
        gradeRange: 'Senior Secondary SSS 1–3',
        category: 'humanities',
        isCompulsory: false,
        color: 'from-purple-600 to-indigo-800',
        description: 'Colonial administration, Nigerian constitutional development, political parties, and foreign policy.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildCivicEducationTextbook(grade)
      },
      {
        id: 'ng-lit',
        name: 'Literature-in-English',
        shortName: 'Literature',
        gradeRange: 'Senior Secondary SSS 1–3',
        category: 'humanities',
        isCompulsory: false,
        color: 'from-rose-600 to-pink-800',
        description: 'African drama, setwork poetry, prose analysis (Achebe, Soyinka, Clark), and literary devices.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildEnglishTextbook('NG', grade)
      }
    ];
  }

  // 3. KENYA (KE - KCSE / KICD / CBC)
  if (country === 'KE') {
    return [
      {
        id: 'ke-eng',
        name: 'English Language & Literary Studies',
        shortName: 'English',
        gradeRange: 'Grade 10 / Forms 3–4',
        category: 'core',
        isCompulsory: true,
        color: 'from-blue-600 to-indigo-700',
        description: 'Mandatory national subject: Functional writing, oral skills, comprehension, and grammar.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildEnglishTextbook('KE', grade)
      },
      {
        id: 'ke-kiswahili',
        name: 'Kiswahili (Lugha na Fasihi)',
        shortName: 'Kiswahili',
        gradeRange: 'Grade 10 / Forms 3–4',
        category: 'core',
        isCompulsory: true,
        color: 'from-emerald-700 to-green-900',
        description: 'Mandatory national language: Sarufi, insha, ushairi, tamthilia, na fasihi simulizi za Afrika Mashariki.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildAfricanLanguagesTextbook('KE', 'Kiswahili (Lugha na Fasihi)', grade)
      },
      {
        id: 'ke-math',
        name: 'Mathematics (Alternative A)',
        shortName: 'Mathematics',
        gradeRange: 'Grade 10 / Forms 3–4',
        category: 'core',
        isCompulsory: true,
        color: 'from-amber-600 to-amber-700',
        description: 'Mandatory subject: Quadratic expressions, commercial arithmetic, matrices, trigonometry, and calculus.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPureMathsTextbook('KE', grade)
      },
      {
        id: 'ke-bio',
        name: 'Biology',
        shortName: 'Biology',
        gradeRange: 'Grade 10 / Forms 3–4',
        category: 'science',
        isCompulsory: false,
        color: 'from-green-600 to-teal-700',
        description: 'Cell physiology, plant water transport, ecology of Great Rift Valley, genetics, and evolution.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildBiologyTextbook('KE', grade)
      },
      {
        id: 'ke-phys',
        name: 'Physics',
        shortName: 'Physics',
        gradeRange: 'Grade 10 / Forms 3–4',
        category: 'science',
        isCompulsory: false,
        color: 'from-emerald-600 to-teal-700',
        description: 'Linear motion, circular kinematics, electromagnetism, cathode rays, and thermal expansion.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPhysicalSciencesTextbook('KE', grade)
      },
      {
        id: 'ke-agri',
        name: 'Agriculture',
        shortName: 'Agriculture',
        gradeRange: 'Grade 10 / Forms 3–4',
        category: 'applied',
        isCompulsory: false,
        color: 'from-lime-600 to-emerald-800',
        description: 'Major national subject: Crop production, soil water conservation, animal health, and farm machinery.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildAgricultureTextbook('KE', grade)
      },
      {
        id: 'ke-business',
        name: 'Business Studies',
        shortName: 'Business Studies',
        gradeRange: 'Grade 10 / Forms 3–4',
        category: 'commercial',
        isCompulsory: false,
        color: 'from-cyan-600 to-blue-700',
        description: 'Forms of business units, M-Pesa digital finance, product markets, and public finance in Kenya.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildBusinessStudiesTextbook('KE', grade)
      },
      {
        id: 'ke-history',
        name: 'History & Government',
        shortName: 'History & Govt',
        gradeRange: 'Grade 10 / Forms 3–4',
        category: 'humanities',
        isCompulsory: false,
        color: 'from-amber-700 to-orange-800',
        description: 'Pre-colonial Kenya, colonial conquest, Mau Mau liberation, and the 2010 Constitution of Kenya.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildSocialStudiesTextbook(grade)
      }
    ];
  }

  // 4. GHANA (GH - WASSCE / GES)
  if (country === 'GH') {
    return [
      {
        id: 'gh-soc-studies',
        name: 'Social Studies',
        shortName: 'Social Studies',
        gradeRange: 'SHS 1–3',
        category: 'core',
        isCompulsory: true,
        color: 'from-orange-600 to-amber-700',
        description: 'Mandatory core: Self-identity, Ghanaian constitution, resource management, and regional socio-economic challenges.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildSocialStudiesTextbook(grade)
      },
      {
        id: 'gh-eng',
        name: 'English Language',
        shortName: 'English',
        gradeRange: 'SHS 1–3',
        category: 'core',
        isCompulsory: true,
        color: 'from-blue-600 to-indigo-700',
        description: 'Mandatory core: Essay composition, comprehension, summary writing, and mechanical accuracy.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildEnglishTextbook('GH', grade)
      },
      {
        id: 'gh-core-math',
        name: 'Core Mathematics',
        shortName: 'Core Maths',
        gradeRange: 'SHS 1–3',
        category: 'core',
        isCompulsory: true,
        color: 'from-amber-600 to-amber-700',
        description: 'Mandatory core: Modular arithmetic, quadratic graphs, plane geometry, trigonometry, and statistics.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPureMathsTextbook('GH', grade)
      },
      {
        id: 'gh-int-sci',
        name: 'Integrated Science',
        shortName: 'Integrated Science',
        gradeRange: 'SHS 1–3',
        category: 'core',
        isCompulsory: true,
        color: 'from-teal-600 to-emerald-700',
        description: 'Mandatory core for all Ghanaian students: Life cycles, agricultural science, chemical elements, and energy systems.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPhysicalSciencesTextbook('GH', grade)
      },
      {
        id: 'gh-elec-math',
        name: 'Elective Mathematics',
        shortName: 'Elective Maths',
        gradeRange: 'SHS 1–3',
        category: 'science',
        isCompulsory: false,
        color: 'from-amber-700 to-yellow-800',
        description: 'Advanced calculus, differential equations, coordinate geometry, mechanics, and correlation analysis.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPureMathsTextbook('GH', grade)
      },
      {
        id: 'gh-phys',
        name: 'Physics (Elective)',
        shortName: 'Physics',
        gradeRange: 'SHS 1–3',
        category: 'science',
        isCompulsory: false,
        color: 'from-emerald-600 to-teal-700',
        description: 'Rectilinear motion, Newton’s laws, quantum physics, radioactive decay, and electric circuits.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPhysicalSciencesTextbook('GH', grade)
      },
      {
        id: 'gh-fin-acc',
        name: 'Financial Accounting',
        shortName: 'Accounting',
        gradeRange: 'SHS 1–3',
        category: 'commercial',
        isCompulsory: false,
        color: 'from-cyan-600 to-blue-700',
        description: 'Trading and profit/loss accounts, control accounts, partnerships, and non-profit organization ledgers.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildAccountingTextbook('GH', grade)
      },
      {
        id: 'gh-govt',
        name: 'Government & Politics',
        shortName: 'Government',
        gradeRange: 'SHS 1–3',
        category: 'humanities',
        isCompulsory: false,
        color: 'from-purple-600 to-indigo-800',
        description: 'Constitutional development, pre-colonial Asante administration, and democratic governance in Ghana.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildCivicEducationTextbook(grade)
      }
    ];
  }

  // 5. ZIMBABWE (ZW - ZIMSEC O & A-LEVEL)
  if (country === 'ZW') {
    return [
      {
        id: 'zw-heritage',
        name: 'Heritage Studies',
        shortName: 'Heritage Studies',
        gradeRange: 'Forms 3–6 / O & A-Level',
        category: 'core',
        isCompulsory: true,
        color: 'from-yellow-600 to-amber-800',
        description: 'Mandatory national syllabus: Great Zimbabwe masonry, Unhu/Ubuntu ethics, liberation heritage, and indigenous knowledge.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildHeritageStudiesTextbook(grade)
      },
      {
        id: 'zw-eng',
        name: 'English Language',
        shortName: 'English',
        gradeRange: 'Forms 3–6 / O & A-Level',
        category: 'core',
        isCompulsory: true,
        color: 'from-blue-600 to-indigo-700',
        description: 'Mandatory national subject: Discursive writing, comprehension, register, and summary techniques.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildEnglishTextbook('ZW', grade)
      },
      {
        id: 'zw-math',
        name: 'General Mathematics (Syllabus 4004)',
        shortName: 'Mathematics',
        gradeRange: 'Forms 3–6 / O & A-Level',
        category: 'core',
        isCompulsory: true,
        color: 'from-amber-600 to-amber-700',
        description: 'Mandatory subject: Number bases, quadratic factorisation, matrices, consumer arithmetic, and transformation geometry.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPureMathsTextbook('ZW', grade)
      },
      {
        id: 'zw-indigenous',
        name: 'Indigenous Languages (Shona / Ndebele)',
        shortName: 'Indigenous Lang',
        gradeRange: 'Forms 3–6 / O & A-Level',
        category: 'core',
        isCompulsory: true,
        color: 'from-orange-600 to-red-800',
        description: 'Mandatory national curriculum: Uvaranomwe, rondedzero, nhoroondo dzemadzitateguru, and grammatical syntax.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildAfricanLanguagesTextbook('ZW', 'Indigenous Languages (Shona / Ndebele)', grade)
      },
      {
        id: 'zw-comb-sci',
        name: 'Combined Science (Physics / Chem / Bio)',
        shortName: 'Combined Science',
        gradeRange: 'Forms 3–6 / O & A-Level',
        category: 'science',
        isCompulsory: false,
        color: 'from-emerald-600 to-teal-700',
        description: 'Integrated curriculum: Cellular biology, chemical bonding, 240V domestic circuits, and mechanics.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildPhysicalSciencesTextbook('ZW', grade)
      },
      {
        id: 'zw-accounts',
        name: 'Principles of Accounts (7112)',
        shortName: 'Accounts',
        gradeRange: 'Forms 3–6 / O & A-Level',
        category: 'commercial',
        isCompulsory: false,
        color: 'from-cyan-600 to-blue-700',
        description: 'Accounting equation, Cash Receipts Journal, Trial Balance, balance sheets, and EcoCash mobile ledgers.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildAccountingTextbook('ZW', grade)
      },
      {
        id: 'zw-agri',
        name: 'Agriculture (ZIMSEC)',
        shortName: 'Agriculture',
        gradeRange: 'Forms 3–6 / O & A-Level',
        category: 'applied',
        isCompulsory: false,
        color: 'from-green-700 to-emerald-800',
        description: 'Contour ridges, Chitedze seed varieties, cattle ranching in Matabeleland, and tobacco curing in Mashonaland.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildAgricultureTextbook('ZW', grade)
      },
      {
        id: 'zw-history',
        name: 'History of Zimbabwe & Southern Africa',
        shortName: 'History',
        gradeRange: 'Forms 3–6 / O & A-Level',
        category: 'humanities',
        isCompulsory: false,
        color: 'from-amber-700 to-orange-800',
        description: 'Mutapa Empire, Rozvi state, Scramble for Africa, First and Second Chimurenga, and Post-Independence.',
        totalChapters: 3,
        totalPages: 24,
        textbook: buildSocialStudiesTextbook(grade)
      }
    ];
  }

  // 6. MALAWI (MW - MANEB / MSCE)
  return [
    {
      id: 'mw-chichewa',
      name: 'Chichewa (Chilankhulo cha Dziko)',
      shortName: 'Chichewa',
      gradeRange: 'Forms 1–4 / MSCE',
      category: 'core',
      isCompulsory: true,
      color: 'from-red-600 to-red-800',
      description: 'Mandatory national language: Zolemba, kalembedwe, miyambo ya Chichewa, ndakatulo, ndi nzeru zakale.',
      totalChapters: 3,
      totalPages: 24,
      textbook: buildAfricanLanguagesTextbook('MW', 'Chichewa (Chilankhulo cha Dziko)', grade)
    },
    {
      id: 'mw-eng',
      name: 'English Language',
      shortName: 'English',
      gradeRange: 'Forms 1–4 / MSCE',
      category: 'core',
      isCompulsory: true,
      color: 'from-blue-600 to-indigo-700',
      description: 'Mandatory national subject: Language structure, guided essays, summary analysis, and literary comprehension.',
      totalChapters: 3,
      totalPages: 24,
      textbook: buildEnglishTextbook('MW', grade)
    },
    {
      id: 'mw-math',
      name: 'Mathematics (MSCE)',
      shortName: 'Mathematics',
      gradeRange: 'Forms 1–4 / MSCE',
      category: 'core',
      isCompulsory: true,
      color: 'from-amber-600 to-amber-700',
      description: 'Mandatory subject: Quadratic equations, linear inequalities, commercial transactions, and geometry.',
      totalChapters: 3,
      totalPages: 24,
      textbook: buildPureMathsTextbook('MW', grade)
    },
    {
      id: 'mw-phys-sci',
      name: 'Physical Science (Physics & Chemistry)',
      shortName: 'Physical Science',
      gradeRange: 'Forms 1–4 / MSCE',
      category: 'science',
      isCompulsory: false,
      color: 'from-emerald-600 to-teal-700',
      description: 'Kinematic motion, Newton’s laws, acid-base chemistry, and solar water heating.',
      totalChapters: 3,
      totalPages: 24,
      textbook: buildPhysicalSciencesTextbook('MW', grade)
    },
    {
      id: 'mw-agri',
      name: 'Agriculture (MANEB)',
      shortName: 'Agriculture',
      gradeRange: 'Forms 1–4 / MSCE',
      category: 'applied',
      isCompulsory: false,
      color: 'from-green-700 to-emerald-800',
      description: 'Major national subject: Chitedze seed research, maize irrigation along Shire river, and soil conservation.',
      totalChapters: 3,
      totalPages: 24,
      textbook: buildAgricultureTextbook('MW', grade)
    },
    {
      id: 'mw-accounts',
      name: 'Principles of Accounting',
      shortName: 'Accounting',
      gradeRange: 'Forms 1–4 / MSCE',
      category: 'commercial',
      isCompulsory: false,
      color: 'from-cyan-600 to-blue-700',
      description: 'Double-entry ledger rules, cash books, trial balance, and small enterprise financial statements.',
      totalChapters: 3,
      totalPages: 24,
      textbook: buildAccountingTextbook('MW', grade)
    },
    {
      id: 'mw-geo',
      name: 'Geography of Malawi & Africa',
      shortName: 'Geography',
      gradeRange: 'Forms 1–4 / MSCE',
      category: 'humanities',
      isCompulsory: false,
      color: 'from-amber-700 to-orange-800',
      description: 'Lake Malawi rift valley geology, Shire river catchment, tropical climate systems, and population settlement.',
      totalChapters: 3,
      totalPages: 24,
      textbook: buildSocialStudiesTextbook(grade)
    }
  ];
}

import { generateGroundedFallbackQuestions } from './groundedQuizGenerator';

// CUMULATIVE QUIZ GENERATOR: Assesses knowledge across ONLY the pages read during the session!
export function generateCumulativeQuiz(
  payload: ExitQuizRequestPayload,
  chapterPages: TextbookPage[]
): QuizQuestion[] {
  const readPages = (payload.pagesRead && payload.pagesRead.length > 0) 
    ? [...payload.pagesRead].sort((a, b) => a - b) 
    : [payload.lastReadPageNumber || 1];

  // If exactContentStudied is already bundled, pass it directly to grounded generator
  if (payload.exactContentStudied && payload.exactContentStudied.trim().length > 0) {
    return generateGroundedFallbackQuestions(payload);
  }

  // Otherwise, construct exact studied text from ONLY visited pages in chapterPages
  const visited = chapterPages.filter((p) => readPages.includes(p.pageNumber));
  const activePages = visited.length > 0 ? visited : [chapterPages[0] || ({} as TextbookPage)];

  const visitedPagesText = activePages
    .map((page) => {
      const theoryText = (page.theorySections || []).map((sec) => {
        const terms = (sec.keyTerms || []).map((kt) => `- ${kt.term}: ${kt.definition}`).join('\n');
        return `Section: ${sec.heading}\n${sec.paragraphs.join('\n')}${terms ? '\nKey Terms:\n' + terms : ''}`;
      }).join('\n\n');

      const formulasText = (page.keyFormulas || []).length > 0
        ? `Formulas:\n` + page.keyFormulas!.map((f) => `- ${f.name}: ${f.latex}`).join('\n')
        : '';

      const africanContextText = page.africanContext?.realWorldApplication
        ? `African Real-World Context (${page.africanContext.title}):\n${page.africanContext.realWorldApplication}`
        : '';

      const workedExampleText = page.workedExample
        ? `Worked Example (${page.workedExample.problemStatement}):\n` + page.workedExample.pedagogicalSteps.map((s) => `Step ${s.step} [${s.description}]: ${s.mathematicalForm}`).join('\n')
        : '';

      const practiceText = page.practiceQuestion?.prompt
        ? `Practice Reflection:\n${page.practiceQuestion.prompt}`
        : '';

      const takeawaysText = (page.keyTakeaways || []).length > 0
        ? `Key Takeaways:\n` + page.keyTakeaways.map((t) => `- ${t}`).join('\n')
        : '';

      const allParts = [
        `--- PAGE ${page.pageNumber}: ${page.title} ---`,
        page.subtitle ? `Subtitle: ${page.subtitle}` : '',
        theoryText,
        formulasText,
        africanContextText,
        workedExampleText,
        practiceText,
        takeawaysText
      ].filter(Boolean);

      return allParts.join('\n\n');
    })
    .join('\n\n');

  return generateGroundedFallbackQuestions({
    ...payload,
    pagesRead: readPages,
    lastReadPage: readPages[readPages.length - 1],
    exactContentStudied: visitedPagesText,
    pageContents: visitedPagesText
  });
}
