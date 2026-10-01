import { CountryCode, Textbook, Chapter, TextbookPage } from '../types';

// ============================================================================
// 1. ENGLISH (Home & First Additional / Language & Literature) - ZERO FORMULAS
// ============================================================================
export function buildEnglishTextbook(country: CountryCode, grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `eng-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: Critical Language Awareness & Grammatical Structures',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 3,
          title: 'Section 1.1: Active and Passive Voice & Sentence Syntax',
          subtitle: 'Syntactic Transformation, Agent Emphasis & Register',
          syllabusRef: country === 'ZA' ? 'CAPS English Home/FAL Paper 1 Language in Context' : 'WAEC / KCSE English Language Syllabus',
          theorySections: [
            {
              heading: '1. Syntax and Voice Transformation',
              paragraphs: [
                'In the active voice, the subject of the sentence directly executes the action upon the object (e.g., "The Kenyan marathoner shattered the world record"). The focus is placed primarily on the agent or actor.',
                'In the passive voice, the object becomes the grammatical subject and receives the action (e.g., "The world record was shattered by the Kenyan marathoner"). Passive voice is employed in formal reporting, legal statutes, and scientific prose where the action or result is more critical than the actor.'
              ],
              keyTerms: [
                { term: 'Active Voice', definition: 'Sentence structure where the subject performs the action of the main verb.' },
                { term: 'Passive Voice', definition: 'Sentence structure where the subject is the recipient of the verbal action, typically using a form of "to be" + past participle.' },
                { term: 'Agent', definition: 'The person, entity, or force carrying out the action in a passive construction, often introduced by "by".' }
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Convert the following active sentence into passive voice: "The agricultural cooperative distributed drought-resistant sorghum seeds to four hundred farmers across the district."',
            pedagogicalSteps: [
              { step: 1, description: 'Identify the subject, transitive verb, and direct object', mathematicalForm: 'Subject: "The agricultural cooperative" | Verb: "distributed" (past tense) | Object: "drought-resistant sorghum seeds"' },
              { step: 2, description: 'Position the object as the new subject and apply appropriate auxiliary verb (were + past participle)', mathematicalForm: 'Drought-resistant sorghum seeds were distributed to four hundred farmers across the district...' },
              { step: 3, description: 'Include the original subject within a prepositional agent phrase', mathematicalForm: '...by the agricultural cooperative.' }
            ],
            socraticTeacherTip: 'Always verify verb tense consistency! If the original active sentence is in simple past tense ("distributed"), the passive must use past auxiliary ("were distributed"), never present ("are distributed").'
          },
          africanContext: {
            regionName: 'Pan-African Journalism & Broadcasting',
            title: 'Journalistic Objectivity across African News Desks',
            realWorldApplication: 'Editors at African news agencies (such as Daily Nation, SABC, and The Guardian Nigeria) train correspondents to choose active voice for investigative narratives and passive voice when the perpetrator of an event remains unverified.'
          },
          keyTakeaways: [
            'Active voice delivers directness, vitality, and clarity in argumentative essays.',
            'Passive voice is appropriate when the actor is unknown, obvious, or intentionally depersonalized.',
            'Maintain strict tense concord across auxiliary verbs during voice transformations.'
          ],
          practiceQuestion: {
            prompt: 'Rewrite in passive voice: "Archaeologists discovered ancient gold ornaments near the Mapungubwe terrace."',
            marks: 3,
            conceptualHint: 'Begin with "Ancient gold ornaments" and use the past plural auxiliary "were".'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 3,
          title: 'Section 1.2: Direct and Indirect (Reported) Speech',
          subtitle: 'Tense Backshifting, Deictic Markers & Pronoun Realignment',
          syllabusRef: 'Secondary English Grammar: Reported Discourse',
          theorySections: [
            {
              heading: '1. Rules of Indirect Discourse',
              paragraphs: [
                'Direct speech reproduces the exact spoken words of an interlocutor enclosed in quotation marks. Reported (indirect) speech relays the substance of what was uttered without quotation marks, requiring systematic grammatical shifts.',
                'When the reporting verb is in the past tense (e.g., "said", "remarked"), the verbs in the reported clause generally backshift one tense into the past: simple present shifts to simple past; present continuous shifts to past continuous; present perfect shifts to past perfect.'
              ],
              keyTerms: [
                { term: 'Tense Backshift', definition: 'The grammatical movement of a verb into an earlier past tense form when placed in reported discourse.' },
                { term: 'Deictic Shifts', definition: 'Alterations of time and place adverbs (e.g., "now" becomes "then", "today" becomes "that day", "here" becomes "there").' }
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Convert to indirect speech: The teacher said, "You must submit your literary essays here tomorrow morning."',
            pedagogicalSteps: [
              { step: 1, description: 'Introduce the reported clause with that and adjust modal auxiliaries ("must" -> "had to")', mathematicalForm: 'The teacher said that the students had to submit their literary essays...' },
              { step: 2, description: 'Shift the spatial deictic marker ("here" -> "there")', mathematicalForm: '...there...' },
              { step: 3, description: 'Shift the temporal deictic marker ("tomorrow morning" -> "the following morning")', mathematicalForm: '...the following morning.' }
            ],
            socraticTeacherTip: 'Pay close attention to pronoun perspectives: "your essays" must shift to "their essays" or "our essays" depending on who is narrating.'
          },
          africanContext: {
            regionName: 'Parliamentary Hansards of Africa',
            title: 'Official Parliamentary Record Keeping',
            realWorldApplication: 'Hansard transcribers in the National Assembly of Nigeria and Parliament of South Africa convert spontaneous parliamentary debates into formal reported speech for permanent legal statutes.'
          },
          keyTakeaways: [
            'Drop quotation marks, commas before quotes, and question marks in reported statements.',
            'Backshift tenses when the introductory reporting verb is in the past tense.',
            'Carefully align demonstratives ("this" -> "that") and temporal adverbs.'
          ],
          practiceQuestion: {
            prompt: 'Convert to reported speech: Amara announced, "I am traveling to Accra tonight."',
            marks: 3,
            conceptualHint: 'Amara announced that she was traveling to Accra that night.'
          }
        },
        {
          pageNumber: 3,
          totalPagesInChapter: 3,
          title: 'Section 1.3: Rhetorical Figures of Speech & Irony',
          subtitle: 'Metaphor, Personification, Oxymoron & Situational Irony',
          syllabusRef: 'Secondary English Paper 1 & 2: Figurative Language',
          theorySections: [
            {
              heading: '1. Figurative Devices in African Orature and Prose',
              paragraphs: [
                'Figurative language elevates writing beyond literal denotation, creating vivid imagery, emotional resonance, and layered thematic meaning.',
                'A metaphor asserts direct identity between two unlike entities without "like" or "as" (e.g., "The Zambezi River is the liquid spine of southern Africa"). Personification endows inanimate objects or abstract forces with human attributes, intentions, or sensations.'
              ],
              keyTerms: [
                { term: 'Metaphor', definition: 'A figure of speech making a direct, non-literal comparison between two unrelated subjects.' },
                { term: 'Oxymoron', definition: 'A compressed paradox pairing two contradictory terms (e.g., "deafening silence").' },
                { term: 'Situational Irony', definition: 'A stark incongruity between what is reasonably expected to happen and what actually transpires.' }
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Analyze the figure of speech in this line: "The drought-stricken soil cried out to the heavens for a single tear of rain."',
            pedagogicalSteps: [
              { step: 1, description: 'Identify the figurative device', mathematicalForm: 'Device: Personification (with an implied metaphor).' },
              { step: 2, description: 'Explain the vehicle and tenor comparison', mathematicalForm: 'The parched, cracked earth is portrayed as a suffering human being weeping and begging for moisture.' },
              { step: 3, description: 'Evaluate the thematic effect', mathematicalForm: 'Effect: Emphasizes extreme agricultural desperation and emotional vulnerability during prolonged arid seasons.' }
            ],
            socraticTeacherTip: 'In examination questions, never merely state "it creates an image." Explain what specific image is evoked and how it reinforces the author’s primary message!'
          },
          africanContext: {
            regionName: 'African Griot Oral Tradition',
            title: 'Proverbial Eloquence and Storytelling Imagery',
            realWorldApplication: 'From Yoruba praise poetry (Oriki) to Zulu izibongo, master oral storytellers use complex metaphors to convey lineage history and social values without written scripts.'
          },
          keyTakeaways: [
            'Figures of speech must always be analyzed in terms of device, comparison, and thematic impact.',
            'Distinguish simile (explicit comparison with "like/as") from metaphor (direct equation).',
            'Irony hinges upon a contrast between expectation and reality.'
          ],
          practiceQuestion: {
            prompt: 'Explain why describing a corrupt politician as "an honest thief" is an oxymoron.',
            marks: 3,
            conceptualHint: 'Identify the mutually contradictory juxtaposition of "honest" and "thief".'
          }
        }
      ]
    },
    {
      id: `eng-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Reading Comprehension & Summary Writing Techniques',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: Discursive Reading Comprehension & Inferential Analysis',
          subtitle: 'Differentiating Fact, Opinion, Tone & Subtext',
          syllabusRef: 'Secondary English Paper 1: Section A Comprehension',
          theorySections: [
            {
              heading: '1. Skimming, Scanning, and Deep Analytical Reading',
              paragraphs: [
                'Reading comprehension tests your capacity to decode explicit assertions, infer implicit subtext, and critically evaluate an author’s bias, audience, and underlying purpose.',
                'A factual statement is objectively verifiable through historical, scientific, or demographic evidence. An opinion reflects a subjective evaluation, moral appraisal, or ideological stance, frequently signaled by emotive adjectives and modal qualifiers.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Read: "While renewable energy investments in the Sahara promise green jobs, critics lament that rural pastoralists have been largely excluded from governance decisions." Identify the author’s tone and primary conflict.',
            pedagogicalSteps: [
              { step: 1, description: 'Analyze tonal markers', mathematicalForm: 'Tone: Balanced, analytical, and mildly critical of centralized administrative exclusion.' },
              { step: 2, description: 'Identify the central socio-economic conflict', mathematicalForm: 'Conflict: Modern ecological industrialization versus the socio-political rights and livelihoods of traditional pastoralists.' }
            ],
            socraticTeacherTip: 'Watch out for concession conjunctions like "While", "Although", and "However"—they usually signal the author is balancing contrasting perspectives before presenting their actual thesis.'
          },
          africanContext: {
            regionName: 'Afrobarometer Public Surveys',
            title: 'Interpreting Pan-African Public Opinion',
            realWorldApplication: 'Afrobarometer analysts across 35 African countries read and summarize public sentiments on corruption, governance, and climate impacts to advise the African Union.'
          },
          keyTakeaways: [
            'Inferential questions require reading between the lines to uncover unstated assumptions.',
            'Identify the author’s tone by isolating evocative vocabulary and syntax choices.'
          ],
          practiceQuestion: {
            prompt: 'Explain the difference between an author’s tone and the mood experienced by the reader.',
            marks: 3,
            conceptualHint: 'Tone is the writer’s attitude; mood is the emotional atmosphere evoked in the reader.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: The Art of Précis & Summary Writing',
          subtitle: 'Extracting Core Points, Paraphrasing & Strict Word Limits',
          syllabusRef: 'Secondary English Paper 1: Section B Summary',
          theorySections: [
            {
              heading: '1. The Four-Step Summary Method',
              paragraphs: [
                'Summary writing tests your ability to condense an extended passage into its foundational arguments while discarding extraneous illustrations, quotations, rhetorical flourishes, and parenthetical details.',
                'Examination councils enforce severe penalties for exceeding prescribed word counts (typically 70–100 words) and for "lifting" verbatim clauses instead of using your own words.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Summarize three benefits of solar micro-grids in off-grid African villages in no more than 30 words.',
            pedagogicalSteps: [
              { step: 1, description: 'Extract key points', mathematicalForm: 'Points: 1. Clean electricity for clinics; 2. Extended study hours for pupils; 3. Growth of small village businesses.' },
              { step: 2, description: 'Synthesize concisely in own words', mathematicalForm: 'Solar micro-grids empower remote villages by electrifying health clinics, extending nighttime student study hours, and spurring local entrepreneurial commercial growth.' },
              { step: 3, description: 'Count words and verify limit', mathematicalForm: 'Total words: 22 words (within the 30-word limit).' }
            ],
            socraticTeacherTip: 'Never include examples (e.g., "such as candles, kerosene lamps, diesel generators") in a summary! Keep only the governing conceptual principle.'
          },
          africanContext: {
            regionName: 'African Development Bank (AfDB)',
            title: 'Executive Briefs for Infrastructure Financing',
            realWorldApplication: 'Economists and policy researchers at the AfDB summarize multi-hundred page feasibility reports into two-page executive briefs for ministerial cabinet approvals.'
          },
          keyTakeaways: [
            'Strictly obey word limit instructions; count your words and write the total at the end.',
            'Paraphrase in your own words—verbatim lifting results in zero marks for language.',
            'Omit illustrations, rhetorical questions, and dialogue.'
          ],
          practiceQuestion: {
            prompt: 'Why must student writers omit examples and rhetorical flourishes in an official examination summary?',
            marks: 2,
            conceptualHint: 'Examples merely illustrate points; summaries require only the core arguments.'
          }
        }
      ]
    },
    {
      id: `eng-ch3`,
      chapterNumber: 3,
      term: 2,
      title: 'Chapter 3: Literature & Poetry Analysis',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 3.1: Poetic Form, Meter, Diction & Sensory Imagery',
          subtitle: 'Stanzaic Architecture, Alliteration, Assonance & Tone',
          syllabusRef: 'Secondary English Literature: Poetry Analysis',
          theorySections: [
            {
              heading: '1. Deconstructing the Architecture of a Poem',
              paragraphs: [
                'Poetry compresses emotional, philosophical, and social reality into rhythmical language. Analyzing a poem requires examining diction (word selection), imagery (sensory appeal), stanzaic structure, enjambment, and sound devices.',
                'Alliteration is the deliberate repetition of initial consonant sounds (e.g., "silent sands of the Sahara"), whereas assonance repeats internal vowel sounds to establish melodic resonance or somber mood.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Analyze the effect of enjambment (run-on lines) in modern African protest poetry.',
            pedagogicalSteps: [
              { step: 1, description: 'Define enjambment', mathematicalForm: 'The continuation of a syntactic sentence beyond the end of a poetic line without terminal punctuation.' },
              { step: 2, description: 'Explain structural function', mathematicalForm: 'It disrupts rhythmic predictability, quickens reading pace, and mirrors ongoing social agitation or breathless emotional urgency.' }
            ],
            socraticTeacherTip: 'When discussing rhyme scheme, do not just label "ABAB." Explain what the harmony or disruption of the rhyme communicates about the speaker’s mental state.'
          },
          africanContext: {
            regionName: 'Pan-African Anti-Apartheid & Negritude Poetry',
            title: 'Poetic Resistance: Dennis Brutus and Léopold Senghor',
            realWorldApplication: 'African poets mobilized international political consciousness against colonial and apartheid subjugation by reciting rhythmic verses at the United Nations and global conferences.'
          },
          keyTakeaways: [
            'Sound devices (alliteration, onomatopoeia, rhythm) reinforce the underlying emotional mood.',
            'Enjambment propels narrative momentum, while end-stopped lines create contemplative pauses.'
          ],
          practiceQuestion: {
            prompt: 'Identify the sound device in: "The murmuring waters of Malawi moved softly."',
            marks: 2,
            conceptualHint: 'Repetition of the "m" consonant sound: Alliteration.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 3.2: Dramatic Conflict & Character Motivation',
          subtitle: 'Protagonist, Antagonist, Tragic Flaw & Dramatic Irony',
          syllabusRef: 'Secondary English Literature: Drama & Novel Setworks',
          theorySections: [
            {
              heading: '1. Elements of Theatrical and Narrative Fiction',
              paragraphs: [
                'In classical and modern drama, dramatic conflict drives the narrative arc forward. Internal conflict (character vs. self) involves moral ambivalence, guilt, or competing obligations, while external conflict pits the protagonist against society, nature, or another character.',
                'A tragic flaw (hamartia) is an inherent personality trait—such as Okonkwo’s fear of weakness in Things Fall Apart or Creon’s obstinate pride in Antigone—that ultimately precipitates the protagonist’s downfall.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Distinguish between internal and external conflict in Achebe’s Things Fall Apart.',
            pedagogicalSteps: [
              { step: 1, description: 'Identify internal conflict', mathematicalForm: 'Internal: Okonkwo battles his terror of resembling his gentle, unassertive father Unoka.' },
              { step: 2, description: 'Identify external conflict', mathematicalForm: 'External: Okonkwo clashes with British colonial magistrates and Christian missionaries dismantling traditional clan customs.' }
            ],
            socraticTeacherTip: 'Great character analysis examines why a character acts, not merely what they do. Connect their choices to their psychological wounds and social environment.'
          },
          africanContext: {
            regionName: 'The National Theatres of Kenya, Nigeria & South Africa',
            title: 'Community Theatre as Social Dialogue',
            realWorldApplication: 'Playwrights like Ngũgĩ wa Thiong’o and Wole Soyinka staged village theatre productions in indigenous languages to help rural populations critique political tyranny.'
          },
          keyTakeaways: [
            'A compelling protagonist must possess identifiable vulnerabilities and clear objectives.',
            'Dramatic irony occurs when the audience understands crucial information of which characters remain ignorant.'
          ],
          practiceQuestion: {
            prompt: 'Define dramatic irony and give an example from secondary literature.',
            marks: 3,
            conceptualHint: 'The audience knows a secret or approaching disaster that the character on stage does not know.'
          }
        }
      ]
    }
  ];

  return {
    id: `tb-eng-${country}`,
    subjectId: `${country.toLowerCase()}-eng`,
    subjectName: 'English Language & Literature',
    title: `Secondary English Language & Literature (${country} Syllabus)`,
    authorOrMinistry: `${country} National Education Board`,
    curriculumCode: country === 'ZA' ? 'CAPS' : country === 'NG' ? 'WAEC' : country === 'KE' ? 'KCSE' : 'National Syllabus',
    isbn: '978-0-19-482019-1',
    grade,
    totalPages: 36,
    chapters
  };
}

// ============================================================================
// 2. LIFE ORIENTATION (ZA) & CIVIC EDUCATION (NG) & SOCIAL STUDIES (GH)
// ============================================================================
export function buildLifeOrientationTextbook(country: CountryCode, grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `lo-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: Development of the Self in Society',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 1.1: Stress Management & Emotional Wellness',
          subtitle: 'Stressors, Coping Mechanisms & Healthy Lifestyle Choices',
          syllabusRef: 'CAPS Life Orientation FET Grade 10-12 Term 1',
          theorySections: [
            {
              heading: '1. Psychological and Physiological Stressors',
              paragraphs: [
                'Life Orientation focuses on holistic personal empowerment, equipping learners with analytical life skills, emotional intelligence, and constitutional awareness.',
                'Stress is the physiological and emotional response to external demands (stressors). Acute stressors (e.g., examination deadlines) trigger temporary adrenaline surges, whereas chronic stressors (poverty, family illness, prolonged unemployment) strain the immune and nervous systems.',
                'Positive stress (eustress) motivates performance, while negative stress (distress) leads to burnout, anxiety, and depression when left unmanaged.'
              ],
              keyTerms: [
                { term: 'Stressor', definition: 'Any internal or external stimulus that creates mental, emotional, or physiological tension.' },
                { term: 'Coping Mechanism', definition: 'Conscious behavioral and cognitive strategies employed to manage, tolerate, or diminish stressful conditions.' },
                { term: 'Eustress', definition: 'Beneficial stress that promotes concentration, resilience, and personal accomplishment.' }
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Case Scenario: Lerato is preparing for her Matric final examinations while caring for her younger siblings. She suffers from chronic insomnia, irritability, and panic during mock tests. Formulate an actionable stress management protocol.',
            pedagogicalSteps: [
              { step: 1, description: 'Identify specific environmental and academic stressors', mathematicalForm: 'Stressors: Double burden of domestic childcare and high-stakes NSC matric exam workload.' },
              { step: 2, description: 'Propose cognitive reframing and scheduling intervention', mathematicalForm: 'Action 1: Construct a daily study timetable; divide syllabus into 30-minute Pomodoro study intervals with planned rest periods.' },
              { step: 3, description: 'Propose social support and physiological intervention', mathematicalForm: 'Action 2: Negotiate shared childcare chores with extended family; practice 4-7-8 diaphragmatic breathing to regulate heart rate before sleep.' }
            ],
            socraticTeacherTip: 'In Life Orientation examination questions, avoid vague answers like "she should relax." Always provide specific, realistic, and constructive steps (time management, deep breathing, communication, seeking school counseling).'
          },
          africanContext: {
            regionName: 'South African Township Youth Empowerment',
            title: 'Peer Counseling & Community Support Networks',
            realWorldApplication: 'Youth-led community initiatives such as loveLife and SADAG (South African Depression and Anxiety Group) train school peer leaders to dismantle the stigma around teenage mental health.'
          },
          keyTakeaways: [
            'Distinguish between internal emotional triggers and external environmental stressors.',
            'Effective coping combines time management, physical exercise, and emotional support networks.',
            'Recognize physiological warning signals (chronic headaches, insomnia, digestive distress) early.'
          ],
          practiceQuestion: {
            prompt: 'Explain three behavioral signs indicating that an adolescent is experiencing chronic distress rather than motivating eustress.',
            marks: 3,
            conceptualHint: 'Consider social withdrawal, aggressive outbursts, drastic appetite changes, or sleep disruption.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 1.2: Interpersonal Relationships & Conflict Resolution',
          subtitle: 'Assertive Communication, Active Listening & Peer Pressure Resistance',
          syllabusRef: 'CAPS Life Orientation: Personal Wellbeing',
          theorySections: [
            {
              heading: '1. Communication Styles and Boundary Setting',
              paragraphs: [
                'Healthy interpersonal relationships depend on clear communication styles: passive (submitting to others while suppressing personal rights), aggressive (imposing will through intimidation), and assertive (stating needs calmly, directly, and respectfully without violating the rights of others).',
                'Peer pressure can be direct (explicit invitations to partake in substance abuse) or indirect (social media validation cues). Developing assertive refusal skills empowers youth to preserve personal boundaries.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Apply the 4-step assertive refusal technique to a peer pressuring a classmate to skip school to attend a tavern.',
            pedagogicalSteps: [
              { step: 1, description: 'State your position clearly and calmly', mathematicalForm: '"No, I am not going to skip school today."' },
              { step: 2, description: 'State the reasoned consequence', mathematicalForm: '"My matric attendance record directly influences my university admission."' },
              { step: 3, description: 'Suggest a constructive alternative', mathematicalForm: '"Let us study together at the library and we can hang out on Saturday."' },
              { step: 4, description: 'Walk away if the harassment persists', mathematicalForm: 'Disengage physically if the peer continues to bully or cajole.' }
            ],
            socraticTeacherTip: 'Remember that assertiveness is NOT aggression. It maintains composure, maintains eye contact, and uses "I" statements instead of accusatory "You" insults.'
          },
          africanContext: {
            regionName: 'Ubuntu Communal Circles across Southern Africa',
            title: 'Traditional Conflict Mediation (Dare & Leghotla)',
            realWorldApplication: 'Traditional community mediation forums like the Tswana Kgotla and Sotho Lekgotla resolve conflicts through structured dialogue where every party is heard without violence.'
          },
          keyTakeaways: [
            'Assertiveness is the gold standard communication style for self-respect and mutual safety.',
            'Conflict resolution requires separating the problem from the person.'
          ],
          practiceQuestion: {
            prompt: 'Contrast the psychological outcomes of passive communication versus assertive communication in friendship conflicts.',
            marks: 4,
            conceptualHint: 'Passivity breeds hidden resentment and low self-esteem; assertiveness fosters mutual trust.'
          }
        }
      ]
    },
    {
      id: `lo-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Careers & Career Choices',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: Admission Point Score (APS) & Higher Education Entrance',
          subtitle: 'NSC Levels, University Minimum Criteria & TVET Vocational Pathways',
          syllabusRef: 'CAPS Life Orientation: Career Guidance & APS Calculations',
          theorySections: [
            {
              heading: '1. The National Senior Certificate (NSC) Rating Scale',
              paragraphs: [
                'In South Africa, matriculation performance is categorized into seven performance levels (Level 7: 80–100%, Level 6: 70–79%, Level 5: 60–69%, Level 4: 50–59%, Level 3: 40–49%, Level 2: 30–39%, Level 1: 0–29%).',
                'Each subject score corresponds to an Admission Point Score (APS) point. Tertiary institutions set strict minimum APS thresholds for degrees, diplomas, and higher certificates. Technical and Vocational Education and Training (TVET) colleges provide essential artisan credentials (welding, electrical engineering, plumbing).'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Sipho obtains the following NSC trial marks: English (74%), Life Orientation (85%), Pure Maths (68%), Physical Sciences (62%), Accounting (71%), Life Sciences (58%), Geography (65%). Calculate his university APS score (Note: most SA universities exclude Life Orientation from the core 6-subject APS calculation, or cap it at half points).',
            pedagogicalSteps: [
              { step: 1, description: 'Convert percentage marks to NSC point levels', mathematicalForm: 'English: 74% = 6 pts | Pure Maths: 68% = 5 pts | Physical Sciences: 62% = 5 pts | Accounting: 71% = 6 pts | Life Sciences: 58% = 4 pts | Geography: 65% = 5 pts' },
              { step: 2, description: 'Sum the six academic subjects', mathematicalForm: 'Total Academic APS = 6 + 5 + 5 + 6 + 4 + 5 = 31 points' },
              { step: 3, description: 'Evaluate tertiary program eligibility', mathematicalForm: 'An APS of 31 qualifies Sipho for Bachelor of Commerce (Accounting) and Bachelor of Science (Geology) at institutions like Wits, UCT, and UP.' }
            ],
            socraticTeacherTip: 'Always check university prospectus guidelines! Certain degree programs mandate minimum sub-scores (e.g., Pure Mathematics at Level 5 or 60%), regardless of the total overall APS.'
          },
          africanContext: {
            regionName: 'South Africa NSFAS & Sector Education and Training Authorities (SETA)',
            title: 'National Student Financial Aid Scheme (NSFAS)',
            realWorldApplication: 'NSFAS bursaries fund tuition, accommodation, and allowances for eligible students from households earning below R350,000 annually, enabling millions of first-generation graduates.'
          },
          keyTakeaways: [
            'Know your target degree’s minimum APS threshold and specific subject benchmark requirements early.',
            'TVET colleges provide high-demand vocational artisan careers that bridge youth unemployment.'
          ],
          practiceQuestion: {
            prompt: 'Explain the difference between a Bachelor Degree endorsement and a Diploma endorsement on an NSC certificate.',
            marks: 3,
            conceptualHint: 'Bachelor endorsement requires 50%+ in four designated subjects; Diploma requires 40%+.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: Career Portfolios, CV Writing & Interview Preparation',
          subtitle: 'Curriculum Vitae, Cover Letters, Professional Ethics & Labor Rights',
          syllabusRef: 'CAPS Life Orientation: Workplace Preparedness',
          theorySections: [
            {
              heading: '1. Professional Presentation and Employment Portfolios',
              paragraphs: [
                'Transitioning from high school to the workforce requires constructing a comprehensive career portfolio: an updated Curriculum Vitae (CV), certified academic transcripts, letters of recommendation, and a tailored cover letter.',
                'The Basic Conditions of Employment Act (BCEA) and Labour Relations Act (LRA) protect young workers against exploitation, specifying maximum working hours, overtime compensation, leave entitlements, and fair dismissal procedures.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Identify three critical errors in a youth CV that includes slang, an unprofessional email address (e.g., partyguy99@email.com), and lacks chronological work/volunteer experience dates.',
            pedagogicalSteps: [
              { step: 1, description: 'Correct digital identity', mathematicalForm: 'Error: Unprofessional email. Solution: Use firstname.surname@email.com.' },
              { step: 2, description: 'Correct linguistic register', mathematicalForm: 'Error: Slang. Solution: Use formal professional action verbs (e.g., "coordinated", "maintained", "analyzed").' },
              { step: 3, description: 'Correct chronological order', mathematicalForm: 'Error: Missing dates. Solution: Organize work, internships, and education in reverse chronological order.' }
            ],
            socraticTeacherTip: 'Interviewers look for evidence of problem-solving. Practice the STAR technique (Situation, Task, Action, Result) when answering competency-based interview questions.'
          },
          africanContext: {
            regionName: 'Pan-African Tech Hubs & Freelance Gig Economy',
            title: 'Digital Reskilling & Freelance Platforms',
            realWorldApplication: 'African youth in Johannesburg, Nairobi, and Lagos leverage LinkedIn, GitHub, and digital academies to pitch for international remote software and marketing contracts.'
          },
          keyTakeaways: [
            'A CV must be concise, accurate, and tailored to the specific role applied for.',
            'Know your fundamental labor rights under national employment legislation.'
          ],
          practiceQuestion: {
            prompt: 'State two rights guaranteed to employees under South Africa’s Basic Conditions of Employment Act.',
            marks: 2,
            conceptualHint: 'Right to paid leave, maximum 45-hour work week, safe working conditions.'
          }
        }
      ]
    },
    {
      id: `lo-ch3`,
      chapterNumber: 3,
      term: 2,
      title: 'Chapter 3: Democracy & Human Rights',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 3.1: The South African Constitution & Bill of Rights',
          subtitle: 'Chapter 2 Rights, Constitutional Court & Non-Discrimination',
          syllabusRef: 'CAPS Life Orientation: Democracy and Human Rights',
          theorySections: [
            {
              heading: '1. Supremacy of the 1996 South African Constitution',
              paragraphs: [
                'The Constitution of the Republic of South Africa (1996) is widely celebrated as one of the most progressive democratic charters in the world, founded on human dignity, non-racialism, non-sexism, and the rule of law.',
                'Chapter 2 contains the Bill of Rights, protecting civil liberties (right to life, equality, privacy, freedom of speech) as well as justiciable socio-economic rights (access to healthcare, water, basic education, and social security). Section 36 (the Limitation Clause) dictates that rights may only be restricted in terms of law of general application to an extent that is reasonable and justifiable in an open and democratic society.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Case: During a public health emergency, the government bans large public gatherings. Citizens claim their Section 17 right to assemble and protest is violated. Evaluate using the Section 36 Limitation Clause.',
            pedagogicalSteps: [
              { step: 1, description: 'Identify the competing constitutional rights', mathematicalForm: 'Right to Assembly (Section 17) vs. Right to Life and Health (Section 11 & 27).' },
              { step: 2, description: 'Apply the proportionality test of Section 36', mathematicalForm: 'Limiting crowded gatherings is temporary, pursues a vital objective (preventing disease transmission), and is proportionate to the threat.' },
              { step: 3, description: 'Deliver constitutional verdict', mathematicalForm: 'The temporary restriction is reasonable and justifiable in an open, democratic society.' }
            ],
            socraticTeacherTip: 'Always remember: rights are NOT absolute. Your right to freedom of speech ends where hate speech or incitement to imminent violence begins!'
          },
          africanContext: {
            regionName: 'The Constitutional Court of South Africa (Constitution Hill)',
            title: 'Justice at Constitution Hill, Johannesburg',
            realWorldApplication: 'Built inside the walls of an old apartheid prison fort, the Constitutional Court protects everyday citizens against unlawful state actions and unfair discrimination.'
          },
          keyTakeaways: [
            'The Constitution is the supreme law; any law or executive conduct contrary to it is invalid.',
            'Socio-economic rights (housing, healthcare, education) are legally enforceable in South Africa.'
          ],
          practiceQuestion: {
            prompt: 'Explain what is meant by the "Section 36 Limitation Clause" in the Bill of Rights.',
            marks: 3,
            conceptualHint: 'Explains the legal conditions under which fundamental rights may be justifiably restricted.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 3.2: Civic Participation, Chapter 9 Institutions & Community Activism',
          subtitle: 'The Public Protector, SAHRC, IEC & Democratic Watchdogs',
          syllabusRef: 'CAPS Life Orientation: Civic Governance',
          theorySections: [
            {
              heading: '1. Chapter 9 State Institutions Supporting Democracy',
              paragraphs: [
                'Democracy extends far beyond voting once every five years. The Constitution establishes Chapter 9 state institutions to protect citizens from government maladministration and rights abuses.',
                'The Public Protector investigates improper conduct in state affairs; the South African Human Rights Commission (SAHRC) monitors civil liberties; the Commission for Gender Equality (CGE) combats systemic sexism; the Electoral Commission (IEC) administers free and fair elections.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'A rural municipality fails to provide clean drinking water tankers to a community for eight months while municipal funds disappear. Which Chapter 9 institutions should citizens petition?',
            pedagogicalSteps: [
              { step: 1, description: 'Identify the financial corruption issue', mathematicalForm: 'Lodge a formal grievance with the Public Protector to audit tender corruption and municipal maladministration.' },
              { step: 2, description: 'Identify the fundamental human right violation', mathematicalForm: 'Report the violation of Section 27 (access to clean water) to the South African Human Rights Commission (SAHRC).' }
            ],
            socraticTeacherTip: 'Remember that Chapter 9 institutions are independent and subject only to the Constitution and the law. They report annually to the National Assembly, not to cabinet ministers.'
          },
          africanContext: {
            regionName: 'Pan-African Youth Civil Society Movements',
            title: 'Youth-Led Civic Engagement Across Africa',
            realWorldApplication: 'From #FeesMustFall in South Africa to youth election monitoring in Nigeria, young Africans actively use civic mechanisms and digital petitions to demand accountability.'
          },
          keyTakeaways: [
            'Chapter 9 institutions operate independently of political parties and government ministers.',
            'Every citizen has the legal right to report government misconduct to the Public Protector free of charge.'
          ],
          practiceQuestion: {
            prompt: 'Name two Chapter 9 institutions and describe the primary constitutional mandate of each.',
            marks: 4,
            conceptualHint: 'Public Protector (investigates maladministration), SAHRC (protects human rights), IEC (free elections).'
          }
        }
      ]
    }
  ];

  return {
    id: `tb-lo-${country}`,
    subjectId: `${country.toLowerCase()}-lo`,
    subjectName: 'Life Orientation',
    title: 'Life Orientation: Senior FET Phase (CAPS)',
    authorOrMinistry: 'Department of Basic Education (DBE South Africa)',
    curriculumCode: 'CAPS',
    isbn: '978-0-19-074981-2',
    grade,
    totalPages: 32,
    chapters
  };
}

// Civic Education for Nigeria
export function buildCivicEducationTextbook(grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `civ-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: Values, National Identity & Civic Ethics',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 1.1: Foundations of National Values',
          subtitle: 'Discipline, Integrity, Self-Reliance & National Harmony',
          syllabusRef: 'NERDC / WAEC Civic Education Senior Secondary 1-3',
          theorySections: [
            {
              heading: '1. Pillars of National Citizenship in Nigeria',
              paragraphs: [
                'Civic Education is a mandatory national core subject in Nigeria instituted to build moral integrity, patriotic consciousness, and democratic vigilance in youth.',
                'Values are beliefs and moral principles that guide individual conduct and collective social coexistence. Core civic values include honesty, self-discipline, justice, tolerance, and respect for the dignity of human labor.',
                'National consciousness requires prioritizing national unity, mutual inter-ethnic harmony, and common prosperity above parochial tribalism or regional favoritism.'
              ],
              keyTerms: [
                { term: 'Civic Values', definition: 'Standards of personal conduct that contribute to the peace, stability, and ethical advancement of society.' },
                { term: 'National Consciousness', definition: 'A strong feeling of patriotism, identification with, and devotion to the welfare of one’s nation.' },
                { term: 'Integrity', definition: 'The quality of being honest and adhering unswervingly to high moral and ethical codes.' }
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Explain how youth self-reliance reduces social vices such as cultism, armed robbery, and electoral thuggery in Nigerian communities.',
            pedagogicalSteps: [
              { step: 1, description: 'Analyze the link between unemployment and social vice', mathematicalForm: 'Economic vulnerability and idle youth populations are often exploited by unscrupulous politicians for violent thuggery.' },
              { step: 2, description: 'Demonstrate the impact of vocational self-reliance', mathematicalForm: 'Vocational entrepreneurship (e.g., agribusiness, ICT, artisanal trades) provides legitimate income, fostering financial independence and self-worth.' },
              { step: 3, description: 'Connect to national community security', mathematicalForm: 'Self-reliant youths become community builders and economic contributors rather than perpetrators of crime.' }
            ],
            socraticTeacherTip: 'In WAEC Civic Education essays, always relate theoretical values directly to real-life social problems (cultism, electoral rigging, youth empowerment).'
          },
          africanContext: {
            regionName: 'Nigeria National Orientation Agency (NOA)',
            title: 'NOA National Re-Orientation Programs',
            realWorldApplication: 'The National Orientation Agency conducts school outreach across the 36 states and FCT to instill core Nigerian values and promote ethnic harmony.'
          },
          keyTakeaways: [
            'National cohesion requires mutual tolerance among Nigeria’s diverse ethnic and religious communities.',
            'Integrity in public and private life is the most effective weapon against endemic corruption.'
          ],
          practiceQuestion: {
            prompt: 'Identify three key national symbols of Nigeria and explain the civic significance of the National Coat of Arms.',
            marks: 4,
            conceptualHint: 'Black shield (fertile soil), two white horses (dignity), red eagle (strength), Y-shaped pall (Niger & Benue rivers).'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 1.2: National Symbols, the Pledge & the Coat of Arms',
          subtitle: 'The National Anthem, Flag, Coat of Arms & Sovereignty',
          syllabusRef: 'WAEC Civic Education: Symbols of National Unity',
          theorySections: [
            {
              heading: '1. Sacred Emblems of Sovereign Nigeria',
              paragraphs: [
                'National symbols foster a shared identity and mutual pride. The National Flag, designed by Michael Taiwo Akinkunmi in 1959, features green bands representing fertile agricultural wealth and a white central band representing national peace and unity.',
                'The National Coat of Arms features the Black Shield (rich arable earth), the Silver Pall (the confluence of the Niger and Benue Rivers at Lokoja), two White Horses (dignity and pride), and the Red Eagle (sovereign national strength).'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Analyze the civic duty required when reciting the National Pledge: "To be faithful, loyal and honest, to serve Nigeria with all my strength..."',
            pedagogicalSteps: [
              { step: 1, description: 'Examine "Faithful and Loyal"', mathematicalForm: 'Duty to defend territorial integrity and obey constitutionally enacted laws.' },
              { step: 2, description: 'Examine "Honest and Service"', mathematicalForm: 'Refusal to participate in bribery, examination malpractice, or embezzlement of public funds.' }
            ],
            socraticTeacherTip: 'Memorizing the pledge is not enough; examiners evaluate your understanding of its civic and constitutional implications for everyday life.'
          },
          africanContext: {
            regionName: 'ECOWAS Protocol on Democratic Governance',
            title: 'West African Citizenship and Regional Integration',
            realWorldApplication: 'Nigerian civic standards mirror ECOWAS democratic guidelines ensuring free movement of citizens and mutual regional peace.'
          },
          keyTakeaways: [
            'Desecrating the national flag or symbols is an offense under national law.',
            'The National Anthem and Pledge are solemn civic commitments to state service.'
          ],
          practiceQuestion: {
            prompt: 'Explain what the confluence of the Rivers Niger and Benue represents on Nigeria’s Coat of Arms.',
            marks: 2,
            conceptualHint: 'The "Y" shape silver pall symbolizing geographical unity and trade waterways.'
          }
        }
      ]
    },
    {
      id: `civ-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Fundamental Human Rights & the 1999 Constitution',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: Chapter IV Rights under the 1999 Constitution',
          subtitle: 'Right to Life, Dignity, Fair Hearing & Personal Liberty',
          syllabusRef: 'WAEC Civic Education: Constitutional Rights',
          theorySections: [
            {
              heading: '1. Constitutional Supremacy and Entrenched Rights',
              paragraphs: [
                'Chapter IV of the 1999 Constitution of the Federal Republic of Nigeria enshrines fundamental human rights guaranteed to every citizen. These rights are derived from natural law and international charters such as the Universal Declaration of Human Rights (UDHR, 1948).',
                'Core rights include: Section 33 (Right to Life), Section 34 (Right to Dignity of Human Person, banning torture and forced labor), Section 35 (Right to Personal Liberty), Section 36 (Right to Fair Hearing by an independent court), and Section 39 (Freedom of Expression and the Press).'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'A citizen is arrested by security operatives and detained in an undisclosed police cell for four weeks without access to legal counsel or court arraignment. Which Chapter IV constitutional rights have been breached?',
            pedagogicalSteps: [
              { step: 1, description: 'Identify unlawful detention breach', mathematicalForm: 'Section 35 (Right to Personal Liberty): An arrested person must be brought before a court within 24 to 48 hours.' },
              { step: 2, description: 'Identify judicial process breach', mathematicalForm: 'Section 36 (Right to Fair Hearing): Denying access to legal representation and secret detention violates open judicial trial rules.' }
            ],
            socraticTeacherTip: 'Always cite the specific constitutional sections (e.g., Section 35 or 36) in your WAEC Civic answers to earn maximum legal precision marks!'
          },
          africanContext: {
            regionName: 'National Human Rights Commission (NHRC) Nigeria',
            title: 'Monitoring Rights Violations in Nigeria',
            realWorldApplication: 'The NHRC investigates citizen complaints against police brutality, unlawful arrests, and domestic abuses, submitting binding reports to the Federal High Court.'
          },
          keyTakeaways: [
            'Chapter IV rights are legally enforceable in High Courts via fundamental rights enforcement procedures.',
            'No authority or security agency has the power to detain citizens indefinitely without trial.'
          ],
          practiceQuestion: {
            prompt: 'State two conditions under which a citizen’s right to personal liberty can be lawfully curtailed under the Nigerian constitution.',
            marks: 3,
            conceptualHint: 'In execution of a lawful court sentence, upon reasonable suspicion of having committed a felony.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: Limitation of Rights & Emergency Powers',
          subtitle: 'Public Order, National Security & the Banjul Charter',
          syllabusRef: 'WAEC Civic Education: Limitations of Human Rights',
          theorySections: [
            {
              heading: '1. Why Rights are Not Absolute',
              paragraphs: [
                'Fundamental rights are qualified, meaning they can be lawfully curtailed in the interest of national defense, public safety, public order, public morality, or to protect the rights of other citizens.',
                'Under Section 305 of the Constitution, the President may declare a state of emergency during war, imminent invasion, or widespread breakdown of public order, permitting temporary restrictions on freedom of movement.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Explain why freedom of speech does not protect a person who publishes deliberate libel or incites sectarian ethnic violence.',
            pedagogicalSteps: [
              { step: 1, description: 'Identify the legal boundary of expression', mathematicalForm: 'Section 39 freedom of expression is subject to laws preventing defamation, slander, and incitement to rebellion.' },
              { step: 2, description: 'Examine public order protection', mathematicalForm: 'Inciting ethnic warfare endangers the collective right to life of innocent citizens, superseding individual speech.' }
            ],
            socraticTeacherTip: 'Remember the classic legal adage: "Your right to swing your fist ends where another person’s nose begins."'
          },
          africanContext: {
            regionName: 'African Commission on Human and Peoples’ Rights (Banjul)',
            title: 'The Banjul Charter & Communitarian Duties',
            realWorldApplication: 'The African Charter on Human and Peoples’ Rights, domesticated into Nigerian law, uniquely links individual civil rights to duties owed to family, society, and the state.'
          },
          keyTakeaways: [
            'Freedom of speech does not cover hate speech, treason, or defamation.',
            'A declaration of emergency must be ratified by a two-thirds majority in the National Assembly.'
          ],
          practiceQuestion: {
            prompt: 'Explain the purpose of the African Charter on Human and Peoples’ Rights (Banjul Charter).',
            marks: 3,
            conceptualHint: 'Pan-African human rights framework that uniquely emphasizes communal duties alongside personal rights.'
          }
        }
      ]
    },
    {
      id: `civ-ch3`,
      chapterNumber: 3,
      term: 2,
      title: 'Chapter 3: Responsible Citizenship & Social Problem Solutions',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 3.1: Democratic Participation & Electoral Integrity',
          subtitle: 'INEC, Voting Procedures, Electoral Malpractice & Civic Duty',
          syllabusRef: 'WAEC Civic Education: Democratic Process',
          theorySections: [
            {
              heading: '1. The Electoral System and Democratic Sovereignty',
              paragraphs: [
                'Sovereignty belongs to the people, who exercise their mandate by voting in periodic elections organized by the Independent National Electoral Commission (INEC).',
                'Electoral malpractice includes voter bribery, ballot box snatching, falsification of tally sheets, underage voting, and intimidation of electoral officers. Combating these crimes requires civic vigilance, voter education, and modern biometric technologies like the Bimodal Voter Accreditation System (BVAS).'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Contrast the societal consequences of high voter apathy versus active civic participation during general elections.',
            pedagogicalSteps: [
              { step: 1, description: 'Consequences of voter apathy', mathematicalForm: 'Minorities elect corrupt or unqualified leaders; public services deteriorate; citizens become alienated.' },
              { step: 2, description: 'Consequences of active civic participation', mathematicalForm: 'Elected officials remain accountable to voters; policies reflect public interest; legitimacy of the state is solidified.' }
            ],
            socraticTeacherTip: 'Always remember: "Bad officials are elected by good citizens who do not vote."'
          },
          africanContext: {
            regionName: 'West African Election Monitoring',
            title: 'Biometric Accreditation Across ECOWAS',
            realWorldApplication: 'INEC in Nigeria and the Electoral Commission of Ghana deploy digital voter verification to prevent duplicate voting and phantom voters.'
          },
          keyTakeaways: [
            'Voting is both a constitutional right and a paramount civic responsibility.',
            'Electoral fraud undermines the legitimacy of democratic governance.'
          ],
          practiceQuestion: {
            prompt: 'Define voter apathy and list two major reasons why eligible citizens refrain from voting.',
            marks: 3,
            conceptualHint: 'Indifference toward electoral processes caused by fear of violence, broken political promises, or distrust of electoral machinery.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 3.2: Anti-Corruption Agencies & Public Accountability',
          subtitle: 'EFCC, ICPC, Whistleblowing & Institutional Integrity',
          syllabusRef: 'WAEC Civic Education: Tackling Social Problems',
          theorySections: [
            {
              heading: '1. Fighting Financial Corruption and Institutional Decay',
              paragraphs: [
                'Corruption—the abuse of entrusted public power for private gain—stifles economic growth, deteriorates roads and hospitals, and drives youth into poverty.',
                'The Federal Government established specialized statutory bodies to combat this scourge: the Economic and Financial Crimes Commission (EFCC) investigates money laundering, advance-fee fraud (419), and cybercrime; the Independent Corrupt Practices Commission (ICPC) investigates public service graft and administrative bribery.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Explain how the federal whistleblowing policy empowers ordinary citizens to combat public financial misappropriation.',
            pedagogicalSteps: [
              { step: 1, description: 'Define whistleblowing in governance', mathematicalForm: 'Voluntarily reporting financial fraud, embezzlement, or bribery to authorized government anti-corruption agencies.' },
              { step: 2, description: 'Examine citizen protection and financial incentives', mathematicalForm: 'The policy protects informants from workplace retribution and awards a percentage of successfully recovered stolen public funds.' }
            ],
            socraticTeacherTip: 'In Civic Education, emphasize that combating corruption is not just the duty of the EFCC; it requires every citizen refusing to pay or demand bribes.'
          },
          africanContext: {
            regionName: 'African Union Convention on Preventing and Combating Corruption',
            title: 'Pan-African Anti-Corruption Treaties',
            realWorldApplication: 'Adopted in Maputo, Mozambique, the AU convention mandates member states to freeze cross-border assets stolen by corrupt leaders and return them to national treasuries.'
          },
          keyTakeaways: [
            'The EFCC focuses on financial crimes and cybercrime; the ICPC focuses on public sector graft.',
            'Accountability, transparency, and whistleblower protection are essential pillars of good governance.'
          ],
          practiceQuestion: {
            prompt: 'Distinguish between the mandates of the EFCC and the ICPC in Nigeria.',
            marks: 3,
            conceptualHint: 'EFCC targets economic, financial, and digital crimes; ICPC targets public sector corruption and administrative bribery.'
          }
        }
      ]
    }
  ];

  return {
    id: 'tb-civics-ng',
    subjectId: 'ng-civics',
    subjectName: 'Civic Education',
    title: 'Civic Education for Senior Secondary Schools (WAEC/NERDC)',
    authorOrMinistry: 'Nigerian Educational Research and Development Council (NERDC)',
    curriculumCode: 'WAEC / NERDC',
    isbn: '978-978-081-342-9',
    grade,
    totalPages: 30,
    chapters
  };
}

// Social Studies for Ghana
export function buildSocialStudiesTextbook(grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `soc-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: Self-Identity & Socio-Cultural Dynamics in Ghana',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 1.1: Personal Development & Traditional Cultural Values',
          subtitle: 'The Extended Family, Chieftaincy & Societal Morals',
          syllabusRef: 'Ghana Education Service (GES) Social Studies SHS',
          theorySections: [
            {
              heading: '1. Self-Concept and Indigenous Ghanaian Socialization',
              paragraphs: [
                'Social Studies is a compulsory core subject in Ghana that analyzes how individuals interact with their physical, social, and political environments.',
                'The traditional Ghanaian social fabric is rooted in communal solidarity, respect for ancestral heritage, and reverence for traditional leadership (chiefs and queen mothers). Traditional chieftaincy institutions resolve local land disputes, organize communal labor, and preserve indigenous cultural festivals.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Evaluate the role of the Queen Mother (Ohemmaa) in traditional Akan governance.',
            pedagogicalSteps: [
              { step: 1, description: 'Identify constitutional and customary status', mathematicalForm: 'The Queen Mother is the supreme female advisor to the King (Ohene) and the custodian of royal lineage genealogies.' },
              { step: 2, description: 'Analyze kingmaking powers', mathematicalForm: 'She exercises exclusive initial authority in nominating new chiefs and advises on communal welfare and women’s empowerment.' }
            ],
            socraticTeacherTip: 'Highlight how traditional Ghanaian leadership structures institutionalized female political authority centuries before modern western democracies.'
          },
          africanContext: {
            regionName: 'The National House of Chiefs, Kumasi, Ghana',
            title: 'Constitutional Recognition of Chieftaincy',
            realWorldApplication: 'Chapter 22 of the 1992 Constitution of Ghana guarantees the institution of chieftaincy as an independent organ of customary justice and development.'
          },
          keyTakeaways: [
            'Traditional institutions complement modern democratic governance in Ghana.',
            'Communal values prioritize group harmony over individualistic greed.'
          ],
          practiceQuestion: {
            prompt: 'Explain two ways the extended family system provides a social safety net in Ghana.',
            marks: 3,
            conceptualHint: 'Fostering orphans, pooling resources for funeral and educational expenses.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 1.2: Adolescent Reproductive Health & Life Skills',
          subtitle: 'Peer Pressure, STIs, Teenage Pregnancy & Academic Focus',
          syllabusRef: 'GES Social Studies: Adolescent Wellbeing',
          theorySections: [
            {
              heading: '1. Navigating Adolescence and Health Risks',
              paragraphs: [
                'Adolescence brings rapid physical, emotional, and social transitions. Socio-economic pressures, lack of sex education, and peer influence can expose youth to teenage pregnancy and sexually transmitted infections (STIs).',
                'Comprehensive life skills training—including assertiveness, critical thinking, and delay of gratification—protects students’ educational trajectories.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Analyze the socio-economic effects of teenage pregnancy on female educational attainment in rural Ghana.',
            pedagogicalSteps: [
              { step: 1, description: 'Examine educational disruption', mathematicalForm: 'Teenage pregnancy frequently leads to school dropout, truncating secondary education and future formal employment opportunities.' },
              { step: 2, description: 'Examine intergenerational economic impacts', mathematicalForm: 'Young mothers often experience financial dependency, perpetuating cycles of rural poverty.' }
            ],
            socraticTeacherTip: 'Highlight that the Ghana Education Service re-entry policy now encourages adolescent mothers to return to school after childbirth.'
          },
          africanContext: {
            regionName: 'Ghana Health Service Adolescent Health Clubs',
            title: 'School-Based Health Initiatives',
            realWorldApplication: 'Youth-friendly clinics across the 16 regions of Ghana offer confidential counseling and reproductive healthcare to secondary school students.'
          },
          keyTakeaways: [
            'Empowering adolescent girls through education is the most effective poverty alleviation strategy.',
            'Life skills training equips students to make responsible personal health decisions.'
          ],
          practiceQuestion: {
            prompt: 'List two socio-economic factors that contribute to high rates of teenage pregnancy in rural communities.',
            marks: 2,
            conceptualHint: 'Poverty, lack of comprehensive reproductive health education, breakdown of traditional parental supervision.'
          }
        }
      ]
    },
    {
      id: `soc-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: The 1992 Constitution & Democratic Governance in Ghana',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: Organs of State & Separation of Powers',
          subtitle: 'The Executive, Parliament of Ghana & Independent Judiciary',
          syllabusRef: 'GES Social Studies: The 1992 Constitution of Ghana',
          theorySections: [
            {
              heading: '1. Constitutional Structure of the Fourth Republic',
              paragraphs: [
                'Inaugurated on 7 January 1993, Ghana’s Fourth Republic is established under the 1992 Constitution. The Executive President is head of state, head of government, and commander-in-chief of the armed forces.',
                'The Parliament of Ghana is a unicameral legislature responsible for lawmaking, vetting presidential nominees, and scrutinizing annual national budgets. The Supreme Court of Ghana has exclusive jurisdiction in constitutional interpretation.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Explain how the hybrid presidential-parliamentary system in Ghana functions under Article 78 of the 1992 Constitution.',
            pedagogicalSteps: [
              { step: 1, description: 'Examine Article 78 ministerial requirement', mathematicalForm: 'The President must appoint the majority of Cabinet Ministers from among sitting Members of Parliament.' },
              { step: 2, description: 'Analyze checks and balances implications', mathematicalForm: 'Advantage: Closer cooperation between executive and legislature. Disadvantage: Weakens strict legislative oversight of the executive branch.' }
            ],
            socraticTeacherTip: 'Notice how Ghana’s constitution blends British Westminster conventions (ministers from parliament) with American executive presidency features.'
          },
          africanContext: {
            regionName: 'Parliament House, Accra, Ghana',
            title: 'Democratic Stability in West Africa',
            realWorldApplication: 'Ghana’s peaceful handovers of presidential power between opposing political parties (NPP and NDC) have established the country as a beacon of democratic stability in Africa.'
          },
          keyTakeaways: [
            'The 1992 Constitution creates institutional checks between Executive, Legislative, and Judicial branches.',
            'The Supreme Court holds the power of judicial review to strike down unconstitutional legislation.'
          ],
          practiceQuestion: {
            prompt: 'State the primary constitutional function of the Commission on Human Rights and Administrative Justice (CHRAJ) in Ghana.',
            marks: 3,
            conceptualHint: 'Investigates complaints of human rights violations, administrative injustice, and corruption by public officials.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: Local Governance & District Assemblies',
          subtitle: 'Decentralization, MMDAs & Community Infrastructure Development',
          syllabusRef: 'GES Social Studies: Decentralization',
          theorySections: [
            {
              heading: '1. Metropolitan, Municipal, and District Assemblies (MMDAs)',
              paragraphs: [
                'Decentralization brings governance directly to local grassroots communities. Ghana is divided into Metropolitan (population 250,000+), Municipal (population 95,000+), and District Assemblies (population 75,000+).',
                'MMDAs are funded through the District Assemblies Common Fund (DACF), Internally Generated Funds (IGF), and donor grants to build clinics, feeder roads, school classrooms, and boreholes.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Explain the composition of a District Assembly in Ghana.',
            pedagogicalSteps: [
              { step: 1, description: 'Identify elected members', mathematicalForm: '70% of assembly members are directly elected by universal adult suffrage from local electoral areas.' },
              { step: 2, description: 'Identify appointed members', mathematicalForm: '30% are appointed by the President in consultation with local traditional authorities and interest groups, plus the District Chief Executive (DCE).' }
            ],
            socraticTeacherTip: 'Understand the role of the DCE (District Chief Executive): they are the chief representative of the central government in the district.'
          },
          africanContext: {
            regionName: 'District Assemblies Common Fund (DACF)',
            title: 'Grassroots Fiscal Decentralization',
            realWorldApplication: 'Constitutional provision allocating at least 5% of total national revenue directly to MMDAs ensures rural districts receive funds for basic amenities.'
          },
          keyTakeaways: [
            'Decentralization prevents over-concentration of development projects in the capital city.',
            'Citizen participation in town hall meetings ensures local budget accountability.'
          ],
          practiceQuestion: {
            prompt: 'State two functions performed by Metropolitan, Municipal and District Assemblies (MMDAs).',
            marks: 2,
            conceptualHint: 'Provision of sanitation, construction of basic schools/clinics, local market regulation.'
          }
        }
      ]
    },
    {
      id: `soc-ch3`,
      chapterNumber: 3,
      term: 2,
      title: 'Chapter 3: Managing Resources & Sustainable Development in Ghana',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 3.1: Natural Resources & Environmental Degradation',
          subtitle: 'Illegal Mining (Galamsey), Deforestation & Water Pollution',
          syllabusRef: 'GES Social Studies: Environmental Preservation',
          theorySections: [
            {
              heading: '1. The Crisis of Illegal Surface Mining (Galamsey)',
              paragraphs: [
                'Ghana is endowed with rich natural resources: gold, cocoa, bauxite, manganese, timber, and offshore petroleum. However, unsustainable extraction threatens national ecological survival.',
                'Illegal small-scale artisanal gold mining (popularly known as "Galamsey") uses heavy machinery, cyanide, and mercury, devastating major river basins (Pra, Ankobra, Birim), poisoning agricultural cocoa soils, and destroying tropical forest reserves.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Analyze the multi-dimensional consequences of Galamsey on water treatment costs in Ghana.',
            pedagogicalSteps: [
              { step: 1, description: 'Physical water turbidity impacts', mathematicalForm: 'River turbidity skyrockets to over 10,000 NTU (Nephelometric Turbidity Units), clogging Ghana Water Company water treatment intake pipes.' },
              { step: 2, description: 'Chemical treatment cost impacts', mathematicalForm: 'The utility must spend multi-millions on aluminum sulphate and chlorine, forcing water rationing in major cities like Cape Coast and Sekondi-Takoradi.' }
            ],
            socraticTeacherTip: 'Connect environmental degradation directly to economic cost and public health emergencies (heavy metal poisoning, kidney failure).'
          },
          africanContext: {
            regionName: 'Birim & Pra River Basins, Southern Ghana',
            title: 'Water Security and National Heritage',
            realWorldApplication: 'Civil society organizations, religious bodies, and student unions in Ghana collaborate in the Media Coalition Against Galamsey to protect national drinking water reservoirs.'
          },
          keyTakeaways: [
            'Sustainable development meets present needs without compromising the ability of future generations to meet theirs.',
            'Mercury and cyanide runoff from illegal mining causes irreversible damage to aquatic ecosystems.'
          ],
          practiceQuestion: {
            prompt: 'Explain three measures the Ghanaian government can implement to curb illegal surface mining.',
            marks: 3,
            conceptualHint: 'Alternative livelihood programs, strict enforcement of environmental mining codes, drone river surveillance.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 3.2: Human Resource Development & Industrialization',
          subtitle: 'Free SHS Policy, One District One Factory & Economic Modernization',
          syllabusRef: 'GES Social Studies: National Development Policies',
          theorySections: [
            {
              heading: '1. Developing Human Capital for Economic Transformation',
              paragraphs: [
                'A nation’s greatest asset is not its underground minerals, but its educated, healthy, and skilled human workforce (human capital).',
                'Policies such as Free Senior High School (Free SHS), Technical and Vocational Education (TVET) expansion, and the "One District, One Factory" (1D1F) initiative aim to transition Ghana from a raw-material exporter into a value-added industrial economy under the African Continental Free Trade Area (AfCFTA).'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Explain why exporting raw cocoa beans yields far less national revenue than processing chocolate locally in Ghana.',
            pedagogicalSteps: [
              { step: 1, description: 'Analyze raw commodity pricing', mathematicalForm: 'Ghana receives only ~5-7% of the total global chocolate value chain revenue by exporting raw unrefined cocoa beans.' },
              { step: 2, description: 'Analyze local value addition', mathematicalForm: 'Processing cocoa into butter, liquor, cosmetics, and confectionery inside Ghana generates high-skilled manufacturing employment and multi-fold export profits.' }
            ],
            socraticTeacherTip: 'Always link economic policy to the primary concept of "Value Addition" versus "Raw Material Dependency".'
          },
          africanContext: {
            regionName: 'AfCFTA Secretariat, Accra, Ghana',
            title: 'Headquarters of Pan-African Free Trade',
            realWorldApplication: 'Accra hosts the Secretariat of the African Continental Free Trade Area, uniting 1.3 billion consumers into a single trading market.'
          },
          keyTakeaways: [
            'Education and healthcare investments are prerequisites for long-term industrialization.',
            'Domestic agro-processing creates employment and shields the economy from global commodity price crashes.'
          ],
          practiceQuestion: {
            prompt: 'Explain what is meant by "human capital development" in Social Studies.',
            marks: 2,
            conceptualHint: 'Investments in education, healthcare, and skills training that enhance the economic productivity of citizens.'
          }
        }
      ]
    }
  ];

  return {
    id: 'tb-soc-gh',
    subjectId: 'gh-soc-studies',
    subjectName: 'Social Studies',
    title: 'Social Studies for Senior High Schools (GES/NaCCA)',
    authorOrMinistry: 'Ghana Education Service (GES)',
    curriculumCode: 'NaCCA / WASSCE',
    isbn: '978-9988-0-1284-5',
    grade,
    totalPages: 30,
    chapters
  };
}

// ============================================================================
// HERITAGE STUDIES (Zimbabwe - ZIMSEC O & A Level) - ZERO FORMULAS
// ============================================================================
export function buildHeritageStudiesTextbook(grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: 'zw-heritage-ch1',
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: Great Zimbabwe & Monumental Dry-Stone Architecture',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 1.1: Dry-Stone Masonry & Archaeological Splendor',
          subtitle: 'Granite Engineering, Great Enclosure & Conical Tower',
          syllabusRef: 'ZIMSEC Heritage Studies Syllabus 4006 Topic 1',
          theorySections: [
            {
              heading: '1. Engineering Genius of the Great Enclosure',
              paragraphs: [
                'Heritage Studies is a compulsory national core subject in Zimbabwe. Great Zimbabwe (11th–15th century CE) represents one of humanity’s greatest dry-stone civil engineering monuments.',
                'The massive Great Enclosure walls, rising up to 11 meters high and stretching over 250 meters in circumference, were constructed entirely without mortar or binding cement. Builders dressed granite blocks through exfoliation and fitted them together with inward batters to resist gravitational and earth pressure.'
              ],
              keyTerms: [
                { term: 'Dry-Stone Masonry', definition: 'Construction technique of building stone structures without mortar, relying on gravity and precision stone dressing.' },
                { term: 'Great Enclosure', definition: 'The massive elliptical granite structure at Great Zimbabwe housing the royal court and Conical Tower.' },
                { term: 'Batters', definition: 'The deliberate inward slope of the stone walls to guarantee structural stability across centuries.' }
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Explain how ancient Shona stonemasons shaped and fitted granite rocks without iron chisels or mortar.',
            pedagogicalSteps: [
              { step: 1, description: 'Exfoliation heating and quenching', mathematicalForm: 'Masons lit fires on natural granite outcrops and poured cold water to fracture the rock along natural cleavage lines.' },
              { step: 2, description: 'Precision dressing with hammerstones', mathematicalForm: 'Hard dolerite hammerstones were used to dress blocks into uniform rectangular bricks that interlock perfectly under gravity.' }
            ],
            socraticTeacherTip: 'Emphasize that the survival of these mortar-free curved walls for over 700 years conclusively proves indigenous architectural mastery.'
          },
          africanContext: {
            regionName: 'Ancient Indian Ocean Trade Corridors',
            title: 'Sofala Port & the Global Gold-Porcelain Trade',
            realWorldApplication: 'Archaeological excavations at Great Zimbabwe recovered Ming Dynasty Chinese porcelain, Persian cobalt glassware, and Arabian coinage, confirming Great Zimbabwe was the economic nucleus of Indian Ocean international commerce.'
          },
          keyTakeaways: [
            'Great Zimbabwe dry-stone architecture required sophisticated mathematical planning and collective labor.',
            'The carved soapstone Zimbabwe Bird (Hungwe) stands today as the sovereign national emblem.'
          ],
          practiceQuestion: {
            prompt: 'Explain two reasons why the dry-stone walls of Great Zimbabwe have survived over 700 years without mortar.',
            marks: 4,
            conceptualHint: 'Inward wall batter, curved corners that distribute stress, and precision dressing of interlocking granite.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 1.2: Indigenous State Systems & Trade Networks',
          subtitle: 'The Mutapa and Rozvi Empires & Sovereignty',
          syllabusRef: 'ZIMSEC Heritage Studies: Pre-Colonial State Systems',
          theorySections: [
            {
              heading: '1. Continuity from Great Zimbabwe to the Mutapa and Rozvi Dynasties',
              paragraphs: [
                'Following the gradual relocation of regional trade from Great Zimbabwe northward to the Zambezi valley in the 15th century, Nyatsimba Mutota founded the Mutapa Empire.',
                'The Mutapa and subsequent Rozvi states under the Changamire dynasty established sophisticated agrarian, pastoral, and gold-mining economies, successfully repelling Portuguese colonial incursions for over two centuries.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Evaluate the military and economic organization that enabled the Rozvi Changamire state to defeat Portuguese conquistadors.',
            pedagogicalSteps: [
              { step: 1, description: 'Analyze military structure', mathematicalForm: 'The Rozvi deployed highly organized regiments armed with battleaxes, assegais, and captured firearms.' },
              { step: 2, description: 'Analyze gold trade control', mathematicalForm: 'Changamire strictly controlled access to gold reefs, preventing European monopoly over regional mining wealth.' }
            ],
            socraticTeacherTip: 'Contrast actual African historical military victories with colonial mythologies of passive submission.'
          },
          africanContext: {
            regionName: 'Khami Ruins and Naletale National Monuments',
            title: 'Terraced Stone Architecture of the Rozvi',
            realWorldApplication: 'Khami Ruins near Bulawayo and Naletale feature ornate chevron and herringbone stone patterns, preserving the continuing tradition of stone masonry.'
          },
          keyTakeaways: [
            'Pre-colonial African state systems were characterized by centralized governance and commercial diplomacy.',
            'African nations vigorously defended their territorial sovereignty against early European expansion.'
          ],
          practiceQuestion: {
            prompt: 'Identify the state founded by Nyatsimba Mutota after the decline of Great Zimbabwe.',
            marks: 2,
            conceptualHint: 'The Mutapa Empire along the Zambezi valley.'
          }
        }
      ]
    },
    {
      id: 'zw-heritage-ch2',
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Unhu / Ubuntu Ethics & Cultural Liberation',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: The Humanistic Philosophy of Unhu / Ubuntu',
          subtitle: 'Munhu munhu nevanhu: Communal Solidarity & Ethical Conduct',
          syllabusRef: 'ZIMSEC Cultural Values & Ethics',
          theorySections: [
            {
              heading: '1. Core Tenets of Unhu/Ubuntu',
              paragraphs: [
                'Unhu (in Shona) or Ubuntu (in Ndebele) is the core moral compass of southern African civilization: "Munhu munhu nevanhu" (A person is a human being through other human beings).',
                'It rejects selfish individualism and insists that human dignity, generosity, respect for elders (kuremekedza vakuru), and mutual obligation form the bedrock of societal peace.'
              ],
              keyTerms: [
                { term: 'Unhu / Ubuntu', definition: 'The African philosophical worldview emphasizing human interrelatedness, compassion, and communal responsibility.' },
                { term: 'Kutendeka', definition: 'Integrity, honesty, and trustworthiness in all social and commercial interactions.' },
                { term: 'Dare / Enkundleni', definition: 'Traditional council gathering where village elders, youths, and community members deliberate and resolve disputes democratically.' }
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Describe how the traditional Zunde raMambo / Isiphala seNkosi institution manifests Unhu/Ubuntu in practice.',
            pedagogicalSteps: [
              { step: 1, description: 'Define the communal granary institution', mathematicalForm: 'Zunde raMambo is a community grain reserve cultivated cooperatively by villagers under the chief’s custody.' },
              { step: 2, description: 'Explain its humanitarian function', mathematicalForm: 'During droughts, locust invasions, or family bereavements, food is distributed free of charge to widows, orphans, and the vulnerable.' }
            ],
            socraticTeacherTip: 'Highlight how indigenous African societies built effective social security safety nets long before modern welfare states.'
          },
          africanContext: {
            regionName: 'Southern African Communal Governance',
            title: 'Restorative Justice at the Village Dare',
            realWorldApplication: 'Unlike retributive punitive systems, traditional courts at the village dare focus on reconciliation, restitution to the victim, and restoring peace between families.'
          },
          keyTakeaways: [
            'Unhu/Ubuntu asserts that the wellbeing of the collective ensures the safety of the individual.',
            'Indigenous judicial systems prioritize reconciliation and communal healing over punitive isolation.'
          ],
          practiceQuestion: {
            prompt: 'Translate the maxim "Munhu munhu nevanhu" and state its ethical significance.',
            marks: 3,
            conceptualHint: 'A person is a person through other persons; individual fulfillment comes from serving the community.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: Liberation Heritage & National Heroes',
          subtitle: 'First & Second Chimurenga, Sovereignty & Land Restitution',
          syllabusRef: 'ZIMSEC Liberation Struggle Heritage',
          theorySections: [
            {
              heading: '1. The Struggle for Freedom and Land',
              paragraphs: [
                'Zimbabwe’s modern sovereignty was forged in the furnace of the liberation struggle (Chimurenga / Umvukela). The First Chimurenga (1896–1897) was led by Mbuya Nehanda and Sekuru Kaguvi against British South Africa Company colonial occupation.',
                'The Second Chimurenga (1966–1979) mobilized thousands of young freedom fighters (zanla and zipra) who sacrificed their lives to overturn racial minority rule, restore majority democracy, and reclaim ancestral land.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Why is Mbuya Nehanda’s dying prophecy ("Mapfupa angu achamuka" - "My bones shall surely rise") considered central to Zimbabwean liberation consciousness?',
            pedagogicalSteps: [
              { step: 1, description: 'Analyze historical martyrdom (1898)', mathematicalForm: 'Before her colonial execution, Nehanda prophesied that future generations would rise up and reclaim their independence.' },
              { step: 2, description: 'Connect prophecy to the Second Chimurenga', mathematicalForm: 'Freedom fighters in the 1960s and 70s took inspiration from her prophecy as spiritual validation of their liberation mission.' }
            ],
            socraticTeacherTip: 'Help students connect cultural spiritual leadership directly with political resistance and freedom struggles.'
          },
          africanContext: {
            regionName: 'National Heroes Acre, Harare',
            title: 'Monument of Perpetual Remembrance',
            realWorldApplication: 'The Tomb of the Unknown Soldier and eternal flame honor all sons and daughters of Zimbabwe who died for independence and national sovereignty.'
          },
          keyTakeaways: [
            'National independence was achieved through profound sacrifice and united struggle.',
            'Honoring liberation heritage fosters patriotism, democratic vigilance, and social cohesion.'
          ],
          practiceQuestion: {
            prompt: 'Explain the central demand of both the First and Second Chimurenga struggles.',
            marks: 3,
            conceptualHint: 'Restitution of ancestral land, majority political rights, and ending colonial racial subjugation.'
          }
        }
      ]
    }
  ];

  return {
    id: 'tb-zw-heritage',
    subjectId: 'zw-heritage',
    subjectName: 'Heritage Studies',
    title: 'Heritage Studies for Secondary Schools (ZIMSEC)',
    authorOrMinistry: 'Zimbabwe School Examinations Council (ZIMSEC)',
    curriculumCode: 'ZIMSEC',
    isbn: '978-0-7974-8842-1',
    grade,
    totalPages: 24,
    chapters
  };
}

// ============================================================================
// AFRICAN INDIGENOUS LANGUAGES (Kiswahili, Chichewa, Shona/Ndebele, Yoruba/Hausa/Igbo)
// ZERO FORMULAS - AUTHENTIC AFRICAN LINGUISTICS & LITERATURE
// ============================================================================
export function buildAfricanLanguagesTextbook(country: CountryCode, languageName: string, grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `lang-${country.toLowerCase()}-ch1`,
      chapterNumber: 1,
      term: 1,
      title: `Chapter 1: Language Syntax, Morphology & Cultural Idiom (${languageName})`,
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: `Section 1.1: Grammatical Structures, Noun Classes & Sentence Formation`,
          subtitle: `Morphological Affixes, Verb Conjugation & Register in ${languageName}`,
          syllabusRef: `${country} National Curriculum: ${languageName} Language & Linguistics`,
          theorySections: [
            {
              heading: `1. The Morphological Genius of ${languageName}`,
              paragraphs: [
                `Bantu and Niger-Congo languages possess sophisticated, highly regular agglutinative morphology and noun class systems (e.g. ngeli in Kiswahili, mipatuko in Chichewa, mupanda in Shona).`,
                `Each noun class dictates corresponding agreement concords across adjectives, demonstratives, subject prefixes, and verb tenses, creating poetic rhythmic harmony throughout spoken and written prose.`
              ],
              keyTerms: [
                { term: 'Noun Classes / Ngeli', definition: 'Categorization of nouns according to semantic prefixes that govern grammatical agreement throughout the clause.' },
                { term: 'Agglutination', definition: 'The morphological process of joining multiple meaningful prefixes, infixes, and suffixes to a single verb root.' },
                { term: 'Proverbial Register', definition: 'The dignified, culturally elevated style of speech incorporating elders\' proverbs and philosophical metaphors.' }
              ]
            }
          ],
          workedExample: {
            problemStatement: `Analyze how grammatical concord unites the noun and its modifiers in ${languageName}.`,
            pedagogicalSteps: [
              { step: 1, description: 'Identify the noun class prefix of the head subject noun', mathematicalForm: 'Example in Kiswahili (A-WA): "Mwanafunzi mmoja anasoma" -> "Wanafunzi wengi wanasoma vitabu."' },
              { step: 2, description: 'Apply matching concordial affixes to adjectives, verbs, and objects', mathematicalForm: 'The prefix "wa-" harmonizes across the entire subject-predicate construction.' }
            ],
            socraticTeacherTip: 'Remember: African languages are fundamentally musical and systemic. Listen to the harmonious repetition of concordial prefixes.'
          },
          africanContext: {
            regionName: `${country} Cultural and National Radio Services`,
            title: `Broadcasting in Indigenous Languages`,
            realWorldApplication: `National broadcasters (e.g., KBC Kiswahili, MBC Chichewa, ZBC Shona/Ndebele) utilize formal grammatical register to transmit vital health, agricultural, and civic information.`
          },
          keyTakeaways: [
            `${languageName} features structured noun class systems with rigorous grammatical concord.`,
            'Precision in grammatical agreement conveys respect, nuance, and oratorical mastery.'
          ],
          practiceQuestion: {
            prompt: `Explain the importance of concordial agreement in ${languageName} sentence construction.`,
            marks: 3,
            conceptualHint: 'It links the subject noun to its qualifying adjectives and verb tenses, ensuring structural clarity and harmony.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: `Section 1.2: Proverbs, Idiomatic Metaphors & Cultural Wisdom`,
          subtitle: `Oral Philosophy and Ethical Admonition in ${languageName}`,
          syllabusRef: `${country} National Curriculum: Oral Literature & Ethics`,
          theorySections: [
            {
              heading: '1. Proverbs as Pillars of Indigenous Philosophy',
              paragraphs: [
                'Proverbs (Methali in Kiswahili, Miyambo in Chichewa, Tsumo in Shona, Owe in Yoruba) distill centuries of accumulated ancestral wisdom into memorable, pithy artistic statements.',
                'They serve as social tools for resolving conflicts, imparting moral lessons to youth, counseling against arrogance, and celebrating hospitality and communal endurance.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Interpret the deeper metaphorical lesson of an indigenous proverb advising humility in leadership.',
            pedagogicalSteps: [
              { step: 1, description: 'Analyze the literal imagery', mathematicalForm: 'Literal: A tree laden with sweet fruit bends its branches toward the earth.' },
              { step: 2, description: 'Derive the ethical metaphor', mathematicalForm: 'Metaphorical: A truly wise and prosperous leader remains humble and accessible to the ordinary citizens.' }
            ],
            socraticTeacherTip: 'Never stop at the surface literal meaning of an African proverb; always uncover the social or moral principle underneath.'
          },
          africanContext: {
            regionName: 'Community Gatherings and Family Councils',
            title: 'Elders\' Oratory and Cultural Continuity',
            realWorldApplication: 'Skilled speakers in traditional assemblies use proverbs to soften criticism and guide communal decisions without causing personal offense.'
          },
          keyTakeaways: [
            'Proverbs encapsulate ethical codes of conduct and ancestral philosophy.',
            'Mastery of idioms elevates argumentative writing and oral speech in national examinations.'
          ],
          practiceQuestion: {
            prompt: 'Explain how proverbs contribute to character formation and community harmony.',
            marks: 3,
            conceptualHint: 'They transmit moral guidance, teach patience, warn against vice, and encourage mutual aid.'
          }
        }
      ]
    },
    {
      id: `lang-${country.toLowerCase()}-ch2`,
      chapterNumber: 2,
      term: 1,
      title: `Chapter 2: Oral Literature, Epic Narratives & Setwork Poetry`,
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: Oral Performance, Storytelling & Folktale Analysis',
          subtitle: 'Narrative Voice, Audience Participation & Moral Lessons',
          syllabusRef: `${country} National Literature Syllabus`,
          theorySections: [
            {
              heading: '1. The Dynamic Art of African Oral Performance',
              paragraphs: [
                'Oral literature (Fasihi Simulizi / Oral Lore) is not static text on paper; it is a living theatrical performance uniting the storyteller and the participating audience through call-and-response, miming, and song.',
                'Trickster figures, animal fables, and ancestral myths entertain while simultaneously instructing youths in civic responsibility and moral fortitude.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Analyze the function of audience participation in an African oral narrative performance.',
            pedagogicalSteps: [
              { step: 1, description: 'Examine call-and-response chorus', mathematicalForm: 'The audience repeats musical refrains, validating the storyteller and energizing the narrative.' },
              { step: 2, description: 'Examine collective moral agreement', mathematicalForm: 'Singing together reinforces the community’s shared ethical values against the villain or trickster.' }
            ],
            socraticTeacherTip: 'Remember that in African oral literature, the audience is never passive; they are active co-creators of the artistic performance.'
          },
          africanContext: {
            regionName: 'Village Firesides and School Drama Festivals',
            title: 'Preserving African Performance Arts',
            realWorldApplication: 'National school drama and music festivals in Kenya, South Africa, and Nigeria celebrate oral poetry and traditional epic chants.'
          },
          keyTakeaways: [
            'Oral literature combines speech, gesture, rhythm, and audience interaction into a unified art form.',
            'Folktales serve as democratic schools of moral education and communal identity.'
          ],
          practiceQuestion: {
            prompt: 'Identify two distinctive features of oral narrative performance.',
            marks: 2,
            conceptualHint: 'Audience participation, use of song/chant, dramatic gestures, call-and-response refrains.'
          }
        }
      ]
    }
  ];

  return {
    id: `tb-lang-${country.toLowerCase()}`,
    subjectId: `${country.toLowerCase()}-lang`,
    subjectName: languageName,
    title: `${languageName}: Lugha na Fasihi / Language & Literature`,
    authorOrMinistry: `${country} Ministry of Education`,
    curriculumCode: country === 'KE' ? 'KICD' : country === 'ZW' ? 'ZIMSEC' : country === 'MW' ? 'MANEB' : 'National Board',
    isbn: '978-9966-22-108-7',
    grade,
    totalPages: 24,
    chapters
  };
}

// ============================================================================
// 3. AGRICULTURAL SCIENCES / AGRICULTURE (ZA, KE, NG, ZW, MW)
// ============================================================================
export function buildAgricultureTextbook(country: CountryCode, grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `agri-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: Soil Science & Pedological Fertility',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 1.1: Soil Profiles, Horizons & Horizon Differentiation',
          subtitle: 'The O, A, B, and C Master Horizons & Soil Physical Texture',
          syllabusRef: 'Secondary Agricultural Science: Soil Science Unit',
          theorySections: [
            {
              heading: '1. Pedological Horizons and Weathering Processes',
              paragraphs: [
                'Soil is the unconsolidated mineral and organic material on the immediate surface of the earth that serves as a natural medium for the growth of land plants.',
                'A soil profile is a vertical section through the soil exposing its sequential layers (master horizons): O-Horizon (organic debris and decomposed humus), A-Horizon (topsoil, dark and nutrient-rich where root absorption occurs), B-Horizon (subsoil, zone of illuviation where clays and iron oxides accumulate), and C-Horizon (partially weathered parent rock material resting on bedrock R).'
              ],
              keyTerms: [
                { term: 'Humus', definition: 'Dark, amorphous organic matter produced by the microbial decomposition of plant and animal residues.' },
                { term: 'Illuviation', definition: 'The deposition and accumulation of soil materials (clay, minerals) washed down from upper horizons.' },
                { term: 'Soil Texture', definition: 'The relative proportion of sand (0.05–2.0 mm), silt (0.002–0.05 mm), and clay (<0.002 mm) mineral particles.' }
              ]
            }
          ],
          workedExample: {
            problemStatement: 'A soil sample has 40% sand, 40% silt, and 20% clay. Using the USDA Soil Texture Triangle, classify the soil and evaluate its agricultural water-holding capacity.',
            pedagogicalSteps: [
              { step: 1, description: 'Plot coordinates on textural triangle', mathematicalForm: 'Intersection of 40% Sand, 40% Silt, and 20% Clay yields: Loam soil.' },
              { step: 2, description: 'Evaluate agronomic properties', mathematicalForm: 'Loam is ideal for crop production: balanced drainage from sand particles combined with high nutrient and water retention from silt and clay fractions.' }
            ],
            socraticTeacherTip: 'Clay soils have the highest water-holding capacity but risk waterlogging and compaction; sandy soils drain rapidly and leach soluble fertilizers. Loam achieves the optimal agricultural balance.'
          },
          africanContext: {
            regionName: 'Sub-Saharan Ferralsols & Nitisols',
            title: 'Managing Weathered African Tropical Soils',
            realWorldApplication: 'Red volcanic soils (Nitisols) in the Kenyan Highlands and Ethiopian plateau support premier coffee and tea exports due to deep profiles and stable crumb structure.'
          },
          keyTakeaways: [
            'Topsoil (A-Horizon) is the most biologically active layer and must be protected from erosion.',
            'Soil texture is an unchangeable physical property; soil structure can be improved through organic compost.'
          ],
          practiceQuestion: {
            prompt: 'Explain why the O-horizon is typically thick in virgin tropical rainforests but absent in plowed arable fields.',
            marks: 3,
            conceptualHint: 'Continuous leaf litter deposition vs. mechanical plowing and rapid decomposition.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 1.2: Soil pH, Liming & Cation Exchange Capacity (CEC)',
          subtitle: 'Acidity, Alkaline Sodic Soils & Agricultural Lime Neutralization',
          syllabusRef: 'Secondary Agricultural Science: Soil Chemistry',
          theorySections: [
            {
              heading: '1. Soil Chemical Reaction and Nutrient Availability',
              paragraphs: [
                'Soil pH measures the hydrogen ion concentration ($-\\log[\\text{H}^+]$). Most African staple crops (maize, sorghum, cassava) thrive within slightly acidic to neutral soils (pH 5.8 to 6.8).',
                'Soil acidification occurs through acid rain, leaching of basic cations ($\\text{Ca}^{2+}$, $\\text{Mg}^{2+}$, $\\text{K}^+$) by high rainfall, and excessive ammonium-based nitrogen fertilizer application. Applying agricultural lime (calcium carbonate $\\text{CaCO}_3$ or dolomite $\\text{CaMg}(\\text{CO}_3)_2$) neutralizes toxic aluminum ions and restores soil pH.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'A farmer in the Highveld discovers soil pH is 4.6 (strongly acidic) with aluminum toxicity stunting maize roots. Recommend a corrective agricultural procedure.',
            pedagogicalSteps: [
              { step: 1, description: 'Diagnose the chemical problem', mathematicalForm: 'At pH < 5.0, soluble aluminum (Al³⁺) becomes toxic, burning root tips and fixing phosphorus into insoluble forms.' },
              { step: 2, description: 'Prescribe agricultural liming', mathematicalForm: 'Apply agricultural lime (calcitic or dolomitic limestone) at 2 to 4 tons/hectare mixed into the plow layer 2-3 months prior to planting.' },
              { step: 3, description: 'State biochemical outcome', mathematicalForm: 'Lime dissolves, raising soil pH toward 6.2 and releasing bonded phosphorus for root uptake.' }
            ],
            socraticTeacherTip: 'Never apply lime simultaneously with nitrogenous fertilizers like urea! The chemical reaction releases volatile ammonia gas, wasting your expensive nitrogen into the atmosphere.'
          },
          africanContext: {
            regionName: 'Acidic Acrisols of Southern & Central Africa',
            title: 'Chitedze Agricultural Research Station, Lilongwe, Malawi',
            realWorldApplication: 'Agronomists at Chitedze develop lime-substitution agroforestry practices using Faidherbia albida trees to naturally replenish nitrogen and buffer soil pH.'
          },
          keyTakeaways: [
            'Soil pH directly controls the bioavailability of essential plant macronutrients (N, P, K).',
            'Agricultural lime neutralizes soil acidity and replenishes vital calcium and magnesium.'
          ],
          practiceQuestion: {
            prompt: 'Explain why phosphorus becomes unavailable to crop plants in soils with a pH below 5.0.',
            marks: 3,
            conceptualHint: 'Soluble aluminum and iron chemically bind with phosphates to form insoluble precipitates.'
          }
        }
      ]
    },
    {
      id: `agri-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Animal Nutrition & Digestive Physiology',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: Ruminant vs. Non-Ruminant Digestion',
          subtitle: 'The Four Stomach Compartments & Microbial Fermentation',
          syllabusRef: 'Secondary Agricultural Science: Animal Anatomy',
          theorySections: [
            {
              heading: '1. Ruminant Digestive Anatomy',
              paragraphs: [
                'Livestock are divided into ruminants (cattle, sheep, goats) possessing complex polygastric stomachs, and non-ruminants (pigs, poultry) with simple monogastric stomachs.',
                'The ruminant stomach comprises four compartments: 1. Rumen (paunch: huge anaerobic fermentation vat hosting trillions of bacteria and protozoa that break down cellulose); 2. Reticulum (honeycomb: traps foreign metallic debris and coordinates regurgitation for cud chewing); 3. Omasum (manyplies: absorbs water, fatty acids, and bicarbonate); 4. Abomasum (true stomach: secretes hydrochloric acid and gastric enzymes to digest microbial protein).'
              ],
              keyTerms: [
                { term: 'Rumen', definition: 'The primary fermentation chamber where anaerobic microbes synthesize cellulase to break down tough plant fiber.' },
                { term: 'Volatile Fatty Acids (VFAs)', definition: 'Acetate, propionate, and butyrate produced by microbial fermentation, serving as the animal’s primary energy source.' },
                { term: 'Rumination', definition: 'The physiological regurgitation, remastication, and reswallowing of coarse fibrous forage (chewing the cud).' }
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Explain why a dairy cow can derive rich nutrition from dry veld grass containing 70% crude fiber, whereas a pig would starve on the same diet.',
            pedagogicalSteps: [
              { step: 1, description: 'Examine enzymatic limitations', mathematicalForm: 'Mammalian digestive enzymes cannot break beta-1,4-glycosidic bonds in cellulose.' },
              { step: 2, description: 'Identify ruminant microbial symbiosis', mathematicalForm: 'Rumen microbes produce cellulase, fermenting cellulose into volatile fatty acids (VFAs) that provide over 70% of the cow’s energy.' },
              { step: 3, description: 'Analyze monogastric limitation', mathematicalForm: 'Pigs lack a multi-compartment fermentation vat upstream of the small intestine, passing undigested fiber in feces.' }
            ],
            socraticTeacherTip: 'Remember: when feeding a ruminant, you are literally feeding the rumen microflora first, and the cow second!'
          },
          africanContext: {
            regionName: 'Boran & Nguni Indigenous Cattle Breeds',
            title: 'Drought-Tolerant Indigenous Breeds',
            realWorldApplication: 'Indigenous East African Boran and Southern African Nguni cattle possess highly efficient rumen microflora adapted to digest fibrous low-protein savannah grasses during prolonged winter dry seasons.'
          },
          keyTakeaways: [
            'The rumen is a fermentation vat producing volatile fatty acids (VFAs).',
            'The abomasum is the only compartment that secretes gastric acid and pepsin enzymes.'
          ],
          practiceQuestion: {
            prompt: 'Name the four compartments of the ruminant stomach in chronological order of food passage.',
            marks: 2,
            conceptualHint: 'Rumen, Reticulum, Omasum, Abomasum.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: Feed Conversion Ratio (FCR) & Ration Formulation',
          subtitle: 'Maintenance vs. Production Rations & Pearson Square Balancing',
          syllabusRef: 'Secondary Agricultural Science: Feed Calculations',
          theorySections: [
            {
              heading: '1. Evaluating Feed Efficiency in Livestock',
              paragraphs: [
                'Animal nutrition divides daily intake into a Maintenance Ration (minimum feed needed to keep an animal alive at constant body weight without producing milk or work) and a Production Ration (surplus feed required for milk yield, egg production, gestation, or rapid meat weight gain).',
                'The Feed Conversion Ratio (FCR) measures feed efficiency: the kilograms of feed required to produce one kilogram of live weight gain. Lower FCR values indicate superior feed efficiency and higher commercial profitability.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Feed Conversion Ratio (FCR)',
              latex: '\\text{FCR} = \\frac{\\text{Total Feed Consumed (kg)}}{\\text{Live Body Weight Gain (kg)}}',
              variables: ['Feed: total feed intake in kg', 'Weight Gain: net live mass gained in kg']
            }
          ],
          workedExample: {
            problemStatement: 'A batch of 500 broiler chickens consumed 2,250 kg of commercial finisher feed over a 6-week cycle and achieved a total collective live weight gain of 1,250 kg. Calculate the FCR and assess flock efficiency.',
            pedagogicalSteps: [
              { step: 1, description: 'State the formula for Feed Conversion Ratio', mathematicalForm: '\\text{FCR} = \\frac{\\text{Feed Consumed (kg)}}{\\text{Weight Gained (kg)}}' },
              { step: 2, description: 'Substitute known values', mathematicalForm: '\\text{FCR} = \\frac{2250}{1250} = 1.80' },
              { step: 3, description: 'Interpret the result', mathematicalForm: 'An FCR of 1.80 means 1.8 kg of feed produced 1 kg of broiler meat, which represents high commercial poultry performance.' }
            ],
            socraticTeacherTip: 'Lower FCR is always better! If Broiler Flock A has FCR 1.7 and Flock B has FCR 2.2, Flock A generated more meat per bag of expensive feed.'
          },
          africanContext: {
            regionName: 'Commercial Poultry Operations in Nigeria & Ghana',
            title: 'Broiler Production Efficiency',
            realWorldApplication: 'Poultry cooperatives in Ibadan and Kumasi monitor FCR weekly to detect feed wastage, disease outbreaks, or poor genetic feed conversion early.'
          },
          keyTakeaways: [
            'FCR is a critical metric of farm profitability: lower values denote superior efficiency.',
            'Maintenance rations must be met before any production gain can occur.'
          ],
          practiceQuestion: {
            prompt: 'If a pig consumes 300 kg of feed and gains 100 kg of weight, calculate its Feed Conversion Ratio.',
            marks: 3,
            conceptualHint: 'FCR = 300 / 100 = 3.0.'
          }
        }
      ]
    },
    {
      id: `agri-ch3`,
      chapterNumber: 3,
      term: 2,
      title: 'Chapter 3: Crop Production & Agronomic Management',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 3.1: Agronomy of Staple Crops (Maize & Cassava)',
          subtitle: 'Seedbed Preparation, Plant Density, Fertilizer Schedules & Harvesting',
          syllabusRef: 'Secondary Agricultural Science: Crop Production',
          theorySections: [
            {
              heading: '1. Crop Physiology and Agronomic Protocols',
              paragraphs: [
                'Maize (Zea mays) is the foundational cereal staple across eastern and southern Africa, while Cassava (Manihot esculenta) provides drought-hardy root carbohydrate reserves across West and Central Africa.',
                'Maize requires well-drained, aerated soils with basal NPK fertilizer (e.g., 2:3:4 or 15:15:15) applied at planting, followed by nitrogenous top-dressing (Limestone Ammonium Nitrate / Urea) at knee-high stage (4–6 weeks post-emergence) to fuel rapid tassel development.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Calculate the plant population per hectare for maize planted at an inter-row spacing of 0.90 m and an intra-row spacing of 0.25 m (1 hectare = 10,000 m²).',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate area per plant', mathematicalForm: '\\text{Area per plant} = 0.90\\,\\text{m} \\times 0.25\\,\\text{m} = 0.225\\,\\text{m}^2' },
              { step: 2, description: 'Calculate total plant population per hectare', mathematicalForm: '\\text{Population} = \\frac{10000}{0.225} \\approx 44,444\\,\\text{plants/hectare}' }
            ],
            socraticTeacherTip: 'Optimizing plant population ensures maximum canopy interception of sunlight without causing excessive moisture competition in dryland farming.'
          },
          africanContext: {
            regionName: 'International Institute of Tropical Agriculture (IITA), Ibadan, Nigeria',
            title: 'Biofortified Cassava & Maize Hybrids',
            realWorldApplication: 'IITA researchers engineer Vitamin A-fortified yellow cassava and drought-tolerant maize varieties cultivated by over 10 million smallholders across Africa.'
          },
          keyTakeaways: [
            'Apply basal phosphorus fertilizers at planting to stimulate vigorous seedling root growth.',
            'Apply nitrogen top-dressing during peak vegetative growth, avoiding waterlogged soil.'
          ],
          practiceQuestion: {
            prompt: 'Explain why cassava is considered an exceptional famine-security crop across Sub-Saharan Africa.',
            marks: 3,
            conceptualHint: 'Tolerates poor acidic soils, survives prolonged drought, and tubers store underground for up to two years without harvesting.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 3.2: Integrated Pest Management (IPM) & Weed Control',
          subtitle: 'Fall Armyworm, Striga Parasitic Weed & Biological Control',
          syllabusRef: 'Secondary Agricultural Science: Plant Protection',
          theorySections: [
            {
              heading: '1. Sustainable Crop Protection Strategies',
              paragraphs: [
                'Pests and noxious weeds cause catastrophic agricultural yield losses across Africa. The Fall Armyworm (Spodoptera frugiperda) devastates maize whorls, while the parasitic witchweed (Striga hermonthica) siphons nutrients directly from host cereal root systems.',
                'Integrated Pest Management (IPM) combines cultural controls (crop rotation, trap cropping), biological controls (natural predators like parasitic wasps), and resistant seed hybrids, using chemical synthetic pesticides only as an emergency last resort.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Evaluate the Push-Pull agricultural technology developed in Kenya to manage Stemborer pests and Striga weed in maize fields.',
            pedagogicalSteps: [
              { step: 1, description: 'Identify the "Push" component', mathematicalForm: 'Intercropping Silverleaf Desmodium between maize rows repels ("pushes") female moth pests through volatile scent chemicals and secretes root exudates that cause suicidal germination of parasitic Striga seeds.' },
              { step: 2, description: 'Identify the "Pull" component', mathematicalForm: 'Planting Napier grass (Pennisetum purpureum) as a perimeter border attracts ("pulls") the moths to lay eggs in sticky gum that traps larvae.' },
              { step: 3, description: 'Evaluate economic co-benefits', mathematicalForm: 'Both Desmodium and Napier grass provide rich protein forage for dairy livestock, eliminating synthetic chemical costs.' }
            ],
            socraticTeacherTip: 'Push-Pull technology is a classic African agro-ecological innovation developed by ICIPE in Kenya. Examiners love questions combining pest management with livestock fodder!'
          },
          africanContext: {
            regionName: 'International Centre of Insect Physiology and Ecology (ICIPE), Nairobi, Kenya',
            title: 'Push-Pull Agricultural Technology',
            realWorldApplication: 'Adopted by over 250,000 farmers in Kenya, Uganda, Tanzania, and Ethiopia, Push-Pull technology boosts maize yields by over 300% without chemical sprays.'
          },
          keyTakeaways: [
            'IPM minimizes environmental pollution and prevents pests from developing chemical resistance.',
            'Biological control harnesses natural predator-prey dynamics to maintain ecological equilibrium.'
          ],
          practiceQuestion: {
            prompt: 'Explain how the Push-Pull intercropping system controls both insect pests and Striga weed simultaneously.',
            marks: 4,
            conceptualHint: 'Desmodium repels moths and halts Striga; Napier border grass traps moths and feeds livestock.'
          }
        }
      ]
    }
  ];

  return {
    id: `tb-agri-${country}`,
    subjectId: `${country.toLowerCase()}-agri`,
    subjectName: 'Agricultural Sciences',
    title: `Agricultural Sciences & Agronomy (${country} Syllabus)`,
    authorOrMinistry: `${country} Ministry of Agriculture & Education`,
    curriculumCode: country === 'ZA' ? 'CAPS' : country === 'NG' ? 'WAEC' : 'National Syllabus',
    isbn: '978-0-19-892110-3',
    grade,
    totalPages: 30,
    chapters
  };
}

// ============================================================================
// 4. FINANCIAL ACCOUNTING, BUSINESS STUDIES & ECONOMICS
// ============================================================================
export function buildAccountingTextbook(country: CountryCode, grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `acc-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: The Accounting Equation & The General Ledger',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 1.1: The Fundamental Accounting Equation & Double-Entry Rules',
          subtitle: 'Assets, Owner’s Equity, Liabilities & Debit/Credit Conventions',
          syllabusRef: 'Secondary Financial Accounting: Double Entry Bookkeeping',
          theorySections: [
            {
              heading: '1. The Dual-Aspect Concept in Financial Accounting',
              paragraphs: [
                'Financial Accounting is the systematic recording, classification, and summarization of commercial financial transactions. The entire discipline rests upon the fundamental accounting equation: Assets = Owner’s Equity + Liabilities.',
                'The double-entry bookkeeping convention mandates that for every debit entry recorded in an account, there must be an equal and corresponding credit entry in another account. Assets and Expenses increase on the Debit side (decrease on Credit); Owner’s Equity, Liabilities, and Income increase on the Credit side (decrease on Debit).'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'The Fundamental Accounting Equation',
              latex: '\\text{Assets (A)} = \\text{Owner’s Equity (OE)} + \\text{Liabilities (L)}',
              variables: ['A: Economic resources owned', 'OE: Capital + Net Profit - Drawings', 'L: Debts owed to third parties']
            }
          ],
          workedExample: {
            problemStatement: 'Analyze the effect on the accounting equation (A = OE + L) when the business purchases office equipment for R45,000, paying R15,000 cash and obtaining the balance on credit from Office World.',
            pedagogicalSteps: [
              { step: 1, description: 'Analyze asset movements', mathematicalForm: 'Equipment (Asset) increases by +R45,000 | Bank (Asset) decreases by -R15,000 -> Net Asset change: +R30,000' },
              { step: 2, description: 'Analyze liability movements', mathematicalForm: 'Creditors Control (Liability) increases by +R30,000' },
              { step: 3, description: 'Verify equation balance', mathematicalForm: 'Assets (+R30,000) = Owner’s Equity (R0) + Liabilities (+R30,000). The equation balances perfectly.' }
            ],
            socraticTeacherTip: 'Remember the mnemonic DEAD CLIC: Debits increase Expenses, Assets, Drawings. Credits increase Liabilities, Income, Capital.'
          },
          africanContext: {
            regionName: 'Commercial Banks & Johannesburg Stock Exchange (JSE)',
            title: 'International Financial Reporting Standards (IFRS)',
            realWorldApplication: 'African public corporations listed on the JSE and Nigerian Exchange (NGX) must maintain rigorous double-entry ledgers audited under global IFRS frameworks.'
          },
          keyTakeaways: [
            'Assets = Owner’s Equity + Liabilities must hold true after every single transaction.',
            'Every debit entry requires a matching credit entry of identical numerical value.'
          ],
          practiceQuestion: {
            prompt: 'State the effect on the accounting equation when the owner withdraws R5,000 cash from the business bank account for private personal use.',
            marks: 3,
            conceptualHint: 'Bank (Assets) decreases by R5,000; Drawings decreases Owner’s Equity by R5,000; Liabilities remain unchanged.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 1.2: General Ledger T-Accounts & Trial Balance Balancing',
          subtitle: 'Posting from Subsidiary Journals to General Ledger & Error Detection',
          syllabusRef: 'Secondary Financial Accounting: Ledger Accounts',
          theorySections: [
            {
              heading: '1. Structuring the General Ledger and Trial Balance',
              paragraphs: [
                'Transactions recorded in subsidiary journals (Cash Receipts Journal, Cash Payments Journal, Debtors Journal, Creditors Journal) are posted periodically to individual T-accounts in the General Ledger.',
                'At the end of the trading period, all ledger accounts are balanced. The closing debit and credit balances are compiled into a Trial Balance. While an equal Trial Balance confirms mathematical debit-credit symmetry, it does not detect errors of principle, omission, or commission.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Identify the accounting error when a vehicle repair payment of R8,000 is debited to the Vehicles Asset Account instead of the Repairs Expense Account.',
            pedagogicalSteps: [
              { step: 1, description: 'Identify the error type', mathematicalForm: 'Error of Principle: A revenue expenditure (repairs expense) was capitalized into an asset account.' },
              { step: 2, description: 'Analyze Trial Balance impact', mathematicalForm: 'The Trial Balance still balances because a debit was made, but net profit is overstated and fixed assets are inflated.' },
              { step: 3, description: 'State correction journal entry', mathematicalForm: 'Debit Repairs Expense R8,000; Credit Vehicles Asset R8,000.' }
            ],
            socraticTeacherTip: 'An Error of Principle is a major exam favorite: it violates basic accounting concepts (classifying an expense as an asset or vice versa).'
          },
          africanContext: {
            regionName: 'Small Enterprise Bookkeeping in African Markets',
            title: 'Digital Accounting for Micro-Enterprises',
            realWorldApplication: 'Mobile cloud accounting platforms across Africa (like Paystack and Yoco) automatically generate General Ledger postings from QR-code and card transactions.'
          },
          keyTakeaways: [
            'A balancing Trial Balance is mathematical proof of double entry, not proof of complete accuracy.',
            'Errors of principle distort both the Income Statement and the Balance Sheet.'
          ],
          practiceQuestion: {
            prompt: 'Explain what an Error of Omission is and why it cannot be detected by a Trial Balance.',
            marks: 3,
            conceptualHint: 'A transaction is completely omitted from both debit and credit entries, leaving the numerical balance intact.'
          }
        }
      ]
    },
    {
      id: `acc-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Debtors & Creditors Control Reconciliation',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: Subsidiary Ledgers & Internal Control Accounts',
          subtitle: 'Debtors Ledger, Creditors Ledger & Monthly Reconciliation Protocols',
          syllabusRef: 'Secondary Accounting: Control Accounts',
          theorySections: [
            {
              heading: '1. Internal Control Mechanisms for Credit Trading',
              paragraphs: [
                'When trading on credit, a business maintains individual accounts for each customer in the Debtors Ledger and each supplier in the Creditors Ledger.',
                'The General Ledger maintains a summary control account (Debtors Control / Creditors Control). At month-end, the total schedule of individual debtor balances must equal the closing balance of the Debtors Control account. Any discrepancy indicates posting errors, omitted discount entries, or employee fraud.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'The Debtors Control Account balance is R148,500, but the Debtors List total is R145,200. Investigation shows an invoice of R3,300 sent to debtor K. Mensah was omitted from his individual account. Show the reconciliation correction.',
            pedagogicalSteps: [
              { step: 1, description: 'Analyze which record contains the omission', mathematicalForm: 'The invoice was correctly posted to the Sales Journal and Debtors Control, but omitted from the individual Debtors Ledger.' },
              { step: 2, description: 'Apply correction to the Debtors List', mathematicalForm: 'Add R3,300 to K. Mensah’s individual account in the Debtors List: R145,200 + R3,300 = R148,500.' },
              { step: 3, description: 'Confirm reconciliation', mathematicalForm: 'Debtors List (R148,500) now matches Debtors Control Account (R148,500).' }
            ],
            socraticTeacherTip: 'Always ask: "Did the error happen in the journal (affecting Control) or in the individual customer’s account (affecting the List)?"'
          },
          africanContext: {
            regionName: 'Wholesale Trade in Onitsha & Nairobi Commercial Hubs',
            title: 'Trade Credit Management in African Commerce',
            realWorldApplication: 'Wholesale merchants in Africa’s largest commercial markets enforce strict 30-day credit limits and monthly debtor reconciliations to prevent bad debt write-offs.'
          },
          keyTakeaways: [
            'The Control Account acts as an internal watchdog over the subsidiary ledger.',
            'Reconciliation protects working capital and pinpoints bookkeeping discrepancies.'
          ],
          practiceQuestion: {
            prompt: 'Why is it an essential internal control rule that the person who handles cash cannot also update the Debtors Ledger?',
            marks: 3,
            conceptualHint: 'Separation of duties prevents an employee from stealing customer cash payments and writing them off as bad debts (teeming and lading).'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: Bank Reconciliation Statements & Timing Differences',
          subtitle: 'Outstanding Cheques, Deposits in Transit & Electronic Funds Transfers',
          syllabusRef: 'Secondary Accounting: Bank Reconciliation',
          theorySections: [
            {
              heading: '1. Reconciling Bank Statements with Cash Books',
              paragraphs: [
                'The business Bank Account in the General Ledger records cash from the entity’s perspective (favorable bank balance is a Debit). The commercial bank statement records the same cash from the bank’s perspective (favorable client deposit is a Credit liability for the bank).',
                'Timing differences—such as outstanding electronic transfers, direct bank charges, interest received, and dishonored debit orders—cause discrepancies between the Bank Account and the Bank Statement, resolved via a Bank Reconciliation Statement.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'The business Cash Book balance is R32,400. The Bank Statement shows bank service fees of R450, interest received of R120, and an unpresented EFT payment of R4,000. Calculate the updated Cash Book balance.',
            pedagogicalSteps: [
              { step: 1, description: 'Adjust Cash Book for bank charges', mathematicalForm: 'Deduct bank fees: R32,400 - R450 = R31,950' },
              { step: 2, description: 'Adjust Cash Book for interest received', mathematicalForm: 'Add interest received: R31,950 + R120 = R32,070' },
              { step: 3, description: 'Note treatment of unpresented EFT', mathematicalForm: 'The R4,000 unpresented EFT is already in the Cash Book; it is entered in the Bank Reconciliation Statement, NOT the Cash Book.' }
            ],
            socraticTeacherTip: 'Remember: Bank charges, interest, and direct debits must be entered into the Cash Book FIRST before balancing the Bank Reconciliation Statement!'
          },
          africanContext: {
            regionName: 'M-Pesa, Paystack & Mobile Bank Ledgers',
            title: 'Real-Time Reconciliation in African Fintech',
            realWorldApplication: 'Modern African accounting software integrates bank API feeds to reconcile transactions instantly against mobile money and commercial banking ledgers.'
          },
          keyTakeaways: [
            'Update the Cash Book with items on the Bank Statement that were previously unrecorded.',
            'Unpresented payments and deposits in transit are entered in the Bank Reconciliation Statement.'
          ],
          practiceQuestion: {
            prompt: 'Explain why a favorable bank balance is a debit in the business Cash Book but a credit on the commercial Bank Statement.',
            marks: 3,
            conceptualHint: 'To the business it is an Asset (Debit); to the bank it is a Liability owed back to the customer (Credit).'
          }
        }
      ]
    },
    {
      id: `acc-ch3`,
      chapterNumber: 3,
      term: 2,
      title: 'Chapter 3: Financial Statements (Income Statement & Balance Sheet)',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 3.1: The Statement of Comprehensive Income (Income Statement)',
          subtitle: 'Gross Profit, Operating Expenses, Depreciation & Net Profit Calculation',
          syllabusRef: 'Secondary Accounting: Financial Statements',
          theorySections: [
            {
              heading: '1. Measuring Operational Profitability',
              paragraphs: [
                'The Income Statement measures the financial trading performance of an enterprise over an accounting period, applying the matching principle (expenses incurred are matched against revenues generated).',
                'Gross Profit is calculated as Sales minus Cost of Sales. Operating Profit is Gross Profit plus other operating income minus total operating expenses (salaries, rent, electricity, depreciation). Net Profit is determined after factoring in net interest income/expense.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Gross Profit Formula',
              latex: '\\text{Gross Profit} = \\text{Sales Revenue} - \\text{Cost of Sales}',
              variables: ['Sales: net turnover', 'Cost of Sales: opening stock + purchases - closing stock']
            },
            {
              name: 'Net Profit Margin Ratio',
              latex: '\\text{Net Profit Margin (\\%)} = \\left(\\frac{\\text{Net Profit after Tax}}{\\text{Sales}}\\right) \\times 100',
              variables: ['Net Profit: bottom line profit', 'Sales: total revenue']
            }
          ],
          workedExample: {
            problemStatement: 'A commercial trader has Sales of R800,000 with a cost markup of 60% on cost. Operating expenses total R180,000. Calculate Cost of Sales, Gross Profit, and Operating Profit.',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate Cost of Sales', mathematicalForm: '\\text{Cost of Sales} = \\frac{800000}{1.60} = R500,000' },
              { step: 2, description: 'Calculate Gross Profit', mathematicalForm: '\\text{Gross Profit} = 800000 - 500000 = R300,000' },
              { step: 3, description: 'Calculate Operating Profit', mathematicalForm: '\\text{Operating Profit} = 300000 - 180000 = R120,000' }
            ],
            socraticTeacherTip: 'Be careful with markup: if markup is on cost, Sales = Cost × (1 + %); if markup is margin on sales, Gross Profit = Sales × %.'
          },
          africanContext: {
            regionName: 'Dangote Industries & Sasol Financial Disclosures',
            title: 'Corporate Financial Disclosures in Africa',
            realWorldApplication: 'Major industrial conglomerates across Africa publish audited annual financial statements to demonstrate profitability to international investors and tax authorities.'
          },
          keyTakeaways: [
            'Gross profit evaluates trading markup; net profit reflects overall organizational efficiency.',
            'Depreciation is a non-cash expense that matches asset wear-and-tear against revenue.'
          ],
          practiceQuestion: {
            prompt: 'If Sales are R600,000 and Gross Profit is R240,000, calculate the percentage gross profit margin on sales.',
            marks: 3,
            conceptualHint: '(240,000 / 600,000) × 100 = 40%.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 3.2: The Statement of Financial Position (Balance Sheet)',
          subtitle: 'Non-Current Assets, Working Capital Cycle & Solvency Analysis',
          syllabusRef: 'Secondary Accounting: Balance Sheet & Ratio Analysis',
          theorySections: [
            {
              heading: '1. Evaluating Financial Stability and Solvency',
              paragraphs: [
                'The Balance Sheet portrays the financial position of a business on a specific calendar date, categorizing Non-Current Assets (property, equipment, vehicles), Current Assets (inventory, trade debtors, bank), Owner’s Equity, and Non-Current/Current Liabilities.',
                'Working capital (Net Current Assets = Current Assets - Current Liabilities) assesses short-term liquidity. Financial analysts compute ratios: Current Ratio (target 2:1) and Acid-Test Ratio (target 1:1, excluding inventory) to verify the firm can pay debts maturing within 12 months.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Current Ratio (Working Capital Ratio)',
              latex: '\\text{Current Ratio} = \\frac{\\text{Current Assets}}{\\text{Current Liabilities}}',
              variables: ['Current Assets: cash + debtors + stock', 'Current Liabilities: short-term debts due < 1 yr']
            },
            {
              name: 'Acid-Test Ratio (Quick Ratio)',
              latex: '\\text{Acid-Test Ratio} = \\frac{\\text{Current Assets} - \\text{Inventory}}{\\text{Current Liabilities}}',
              variables: ['Inventory: stock excluded due to illiquidity']
            }
          ],
          workedExample: {
            problemStatement: 'A firm has Inventory of R60,000, Trade Debtors of R40,000, Bank of R20,000, and Current Liabilities of R60,000. Compute the Current Ratio and Acid-Test Ratio.',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate Current Assets', mathematicalForm: '\\text{Current Assets} = 60000 + 40000 + 20000 = R120,000' },
              { step: 2, description: 'Compute Current Ratio', mathematicalForm: '\\text{Current Ratio} = \\frac{120000}{60000} = 2.0:1\\text{ (Safe liquidity)}' },
              { step: 3, description: 'Compute Acid-Test Ratio', mathematicalForm: '\\text{Acid-Test} = \\frac{120000 - 60000}{60000} = \\frac{60000}{60000} = 1.0:1\\text{ (Adequate quick liquidity)}' }
            ],
            socraticTeacherTip: 'If the Acid-Test ratio falls below 1:1, the business relies heavily on selling inventory to pay immediate debts, risking insolvency if stock turns over slowly!'
          },
          africanContext: {
            regionName: 'Commercial Credit Lending across African Banks',
            title: 'Credit Risk Analysis for SME Business Loans',
            realWorldApplication: 'Commercial banks in Kenya (Equity Bank, KCB) and South Africa (Standard Bank, First National Bank) analyze balance sheet liquidity ratios before approving business loans.'
          },
          keyTakeaways: [
            'Current assets must comfortably cover current liabilities to prevent cash crunches.',
            'The Acid-Test ratio excludes stock because goods cannot be converted to instant cash without delays.'
          ],
          practiceQuestion: {
            prompt: 'Explain why inventory is subtracted from current assets when calculating the Acid-Test Ratio.',
            marks: 2,
            conceptualHint: 'Inventory is the least liquid current asset and cannot be guaranteed to sell immediately at book value.'
          }
        }
      ]
    }
  ];

  return {
    id: `tb-acc-${country}`,
    subjectId: `${country.toLowerCase()}-acc`,
    subjectName: 'Financial Accounting',
    title: `Principles of Financial Accounting (${country} Syllabus)`,
    authorOrMinistry: `${country} National Examination Council`,
    curriculumCode: country === 'ZA' ? 'CAPS' : country === 'NG' ? 'WAEC' : 'National Syllabus',
    isbn: '978-0-19-914022-7',
    grade,
    totalPages: 30,
    chapters
  };
}

// Business Studies
export function buildBusinessStudiesTextbook(country: CountryCode, grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `bus-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: The Business Environments & Strategic Analysis',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 1.1: Micro, Market, and Macro Environments',
          subtitle: 'Internal Control, Competitive Forces & PESTLE Macro Factors',
          syllabusRef: 'Secondary Business Studies: Business Environments',
          theorySections: [
            {
              heading: '1. Three Interactive Levels of the Business Environment',
              paragraphs: [
                'Every business operates within three environmental tiers: 1. Micro Environment (internal factors over which management has full control: mission, vision, organizational structure, employees, management culture); 2. Market Environment (immediate industry forces over which management has influence but not control: consumers, suppliers, competitors, intermediaries); 3. Macro Environment (broad national/global forces over which management has zero control: Political, Economic, Social, Technological, Legal, Environmental - PESTLE).',
                'A competitive enterprise uses SWOT analysis (Strengths/Weaknesses in Micro; Opportunities/Threats in Market & Macro) to craft resilient business strategies.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Classify these three challenges faced by an agro-processing firm: 1. Outdated factory machinery; 2. A rival launching a cheaper fruit juice; 3. Central bank raising interest rates to 12%.',
            pedagogicalSteps: [
              { step: 1, description: 'Analyze machinery', mathematicalForm: 'Micro Environment: Internal physical asset weakness under full managerial control.' },
              { step: 2, description: 'Analyze competitor launch', mathematicalForm: 'Market Environment: Industry competitor threat where management must respond through branding or pricing.' },
              { step: 3, description: 'Analyze interest rate hike', mathematicalForm: 'Macro Environment (Economic PESTLE factor): External fiscal shock that increases loan repayment costs with zero individual managerial control.' }
            ],
            socraticTeacherTip: 'Always check: "Can management directly change this?" Yes = Micro; Can only influence = Market; Cannot change at all = Macro.'
          },
          africanContext: {
            regionName: 'African SME Landscape & Informal Sector',
            title: 'Navigating Volatile Macro Environments in Africa',
            realWorldApplication: 'African entrepreneurs navigate macro currency devaluations and infrastructure bottlenecks by adopting flexible local sourcing and mobile solar power.'
          },
          keyTakeaways: [
            'Micro = Full Control; Market = Influence; Macro = Adapt/No Control.',
            'PESTLE framework systematically scans the macro environment.'
          ],
          practiceQuestion: {
            prompt: 'Explain how an increase in value-added tax (VAT) impacts the macro environment of retail businesses.',
            marks: 3,
            conceptualHint: 'Legal/Economic macro factor: reduces consumer disposable income and increases shelf prices.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 1.2: Porter’s Five Forces & Competitive Advantage',
          subtitle: 'Buyer Power, Supplier Power, Substitute Threats & Barriers to Entry',
          syllabusRef: 'Secondary Business Studies: Market Analysis',
          theorySections: [
            {
              heading: '1. Michael Porter’s Five Competitive Forces',
              paragraphs: [
                'Porter’s model evaluates the commercial attractiveness and profit intensity of an industry: 1. Threat of New Entrants (capital requirements, patents); 2. Bargaining Power of Buyers (customer price sensitivity); 3. Bargaining Power of Suppliers (scarcity of raw inputs); 4. Threat of Substitute Products; 5. Rivalry among Existing Competitors.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'How did mobile money (e.g. M-Pesa, MoMo) disrupt the threat of substitutes for traditional commercial banking branches?',
            pedagogicalSteps: [
              { step: 1, description: 'Identify the substitute threat', mathematicalForm: 'Telecom operators provided instant, low-cost peer-to-peer digital transfers without requiring physical bank branches or high monthly ledger fees.' },
              { step: 2, description: 'Examine competitive reaction', mathematicalForm: 'Traditional banks were forced to eliminate branch fees, build mobile smartphone apps, and partner directly with fintech startups.' }
            ],
            socraticTeacherTip: 'Substitutes do not have to be the exact same product: mobile phone airtime became an effective substitute currency for banking!'
          },
          africanContext: {
            regionName: 'Fintech Disruption in Kenya & Nigeria',
            title: 'M-Pesa and Mobile Commerce Disruption',
            realWorldApplication: 'Mobile money leapfrogged traditional retail banking infrastructure, allowing over 80% of adults in East and West Africa to bank through basic cellular SMS networks.'
          },
          keyTakeaways: [
            'High supplier power compresses profit margins for retail manufacturers.',
            'Differentiation and brand loyalty shield businesses from cheap substitutes.'
          ],
          practiceQuestion: {
            prompt: 'State two barriers to entry that protect large telecommunication networks from new competitors.',
            marks: 2,
            conceptualHint: 'High capital expenditure for cellular masts and scarce government spectrum licenses.'
          }
        }
      ]
    },
    {
      id: `bus-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Corporate Social Responsibility (CSR) & Business Ethics',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: The Triple Bottom Line & Sustainable Stakeholder Value',
          subtitle: 'Profit, People, Planet & King IV Corporate Governance',
          syllabusRef: 'Secondary Business Studies: Ethics & Governance',
          theorySections: [
            {
              heading: '1. Beyond Profit Maximization: The Triple Bottom Line',
              paragraphs: [
                'Modern business ethics rejects the narrow doctrine that a company exists solely to maximize shareholder profits. Sustainable corporate governance embraces the Triple Bottom Line (3Ps): Profit (economic prosperity), People (social justice, worker welfare, community health), and Planet (environmental stewardship).',
                'In South Africa, the King IV Code of Corporate Governance sets global benchmarks requiring executive boards to act with integrity, competence, responsibility, and fairness toward all stakeholders (employees, suppliers, host communities, consumers).'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'A multinational mining company generates record R10 billion profits while dumping toxic slurry into a community river that provides local drinking water. Evaluate this practice under King IV and the Triple Bottom Line.',
            pedagogicalSteps: [
              { step: 1, description: 'Evaluate the Profit dimension', mathematicalForm: 'Fulfills short-term economic profit for financial shareholders.' },
              { step: 2, description: 'Evaluate People and Planet dimensions', mathematicalForm: 'Violates Planet through ecological destruction and People by endangering community health and clean water rights.' },
              { step: 3, description: 'Deliver governance verdict', mathematicalForm: 'Violates King IV ethical standards; exposes the company to massive legal environmental liabilities, community protests, and brand destruction.' }
            ],
            socraticTeacherTip: 'CSR is NOT charity or philanthropy! It is an ongoing strategic operational commitment to do no harm and uplift the surrounding human ecosystem.'
          },
          africanContext: {
            regionName: 'Mining Host Communities in South Africa & Ghana',
            title: 'Social and Labour Plans (SLP) in Extractive Industries',
            realWorldApplication: 'Mining charters require mining firms to build local clinics, pave access roads, and construct high schools in rural mining towns (e.g., Rustenburg, Obuasi).'
          },
          keyTakeaways: [
            'Triple Bottom Line balances economic gains against human welfare and ecological preservation.',
            'King IV mandates transparent ethical leadership by corporate boards.'
          ],
          practiceQuestion: {
            prompt: 'Explain the difference between a shareholder and a stakeholder in corporate governance.',
            marks: 3,
            conceptualHint: 'Shareholders own equity shares; stakeholders include anyone impacted by the business (employees, neighbors, customers).'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: Professional Ethics, Conflict of Interest & Labor Rights',
          subtitle: 'Code of Conduct, Whistleblowing & Fair Workplace Equity',
          syllabusRef: 'Secondary Business Studies: Workplace Ethics',
          theorySections: [
            {
              heading: '1. Enforcing Ethical Conduct in Commercial Enterprise',
              paragraphs: [
                'Workplace ethics encompasses honesty, transparency, zero tolerance for sexual harassment, avoidance of conflicts of interest (e.g. awarding tenders to personal relatives), and compliance with employment equity legislation.',
                'Employment Equity Acts promote workplace diversity and affirmative action to dismantle historical discrimination based on race, gender, or disability.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'A procurement manager awards a lucrative packaging contract to her husband’s unregistered printing firm without competitive bidding. Identify the ethical violation and business risk.',
            pedagogicalSteps: [
              { step: 1, description: 'Identify ethical violation', mathematicalForm: 'Conflict of Interest and nepotism; breach of fiduciary procurement policy.' },
              { step: 2, description: 'Identify commercial risk', mathematicalForm: 'Risk of inferior product quality, inflated prices, and disciplinary dismissal for gross misconduct.' }
            ],
            socraticTeacherTip: 'A conflict of interest must always be formally disclosed in writing, and the conflicted individual must recuse themselves from all decision-making.'
          },
          africanContext: {
            regionName: 'African Stock Exchanges & Anti-Corruption Directives',
            title: 'Transparency Directives on African Exchanges',
            realWorldApplication: 'Securities and Exchange Commissions in Lagos, Nairobi, and Johannesburg require publicly listed companies to maintain anonymous whistleblower hotlines.'
          },
          keyTakeaways: [
            'Nepotism and undisclosed conflicts of interest destroy enterprise integrity.',
            'Whistleblower protection safeguards employees who expose internal corruption.'
          ],
          practiceQuestion: {
            prompt: 'Explain why companies establish a written Code of Conduct for employees.',
            marks: 2,
            conceptualHint: 'Sets clear standards for ethical behavior, customer relations, and legal compliance.'
          }
        }
      ]
    },
    {
      id: `bus-ch3`,
      chapterNumber: 3,
      term: 2,
      title: 'Chapter 3: Forms of Ownership & Entrepreneurial Strategy',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 3.1: Forms of Ownership & Legal Liability',
          subtitle: 'Sole Trader, Partnership, Close Corporation & Private Company (Pty Ltd)',
          syllabusRef: 'Secondary Business Studies: Legal Business Structures',
          theorySections: [
            {
              heading: '1. Comparing Business Ownership Entities',
              paragraphs: [
                'Choosing an appropriate legal structure is a crucial entrepreneurial decision balancing capital requirements, management control, continuity, taxation, and legal liability.',
                'Sole Traders and general Partnerships have unlimited liability: the owners’ personal assets (house, car) can be seized to pay business debts. In contrast, Private Companies (Pty Ltd) are separate legal persons with limited liability: shareholders risk losing only their invested share capital, not personal belongings.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Two entrepreneurs intend to launch a regional logistics transport business with commercial trucks. Why should they register a Private Company (Pty Ltd) rather than a Partnership?',
            pedagogicalSteps: [
              { step: 1, description: 'Evaluate liability risk', mathematicalForm: 'Logistics involves high liability risks (accidents, cargo loss). A Pty Ltd provides limited liability, protecting personal family estates.' },
              { step: 2, description: 'Evaluate continuity and capital', mathematicalForm: 'A Pty Ltd enjoys perpetual succession (continuity remains unbroken if a founder dies or exits) and can issue equity shares to raise investment.' }
            ],
            socraticTeacherTip: 'Limited liability is the greatest legal innovation of modern business: it encourages entrepreneurs to take calculated commercial risks without risking personal bankruptcy.'
          },
          africanContext: {
            regionName: 'Corporate Affairs Commission (Nigeria) & CIPC (South Africa)',
            title: 'Digital Company Registration in Africa',
            realWorldApplication: 'National corporate registries have automated online business registration, enabling African startups to incorporate a formal private company within 24 to 48 hours.'
          },
          keyTakeaways: [
            'Unlimited liability puts personal wealth at risk; limited liability confines risk to invested equity.',
            'A company has independent legal personality and perpetual succession.'
          ],
          practiceQuestion: {
            prompt: 'Define perpetual succession and name one form of business that possesses it.',
            marks: 2,
            conceptualHint: 'The business continues to exist legally regardless of changes in ownership or death of founders (e.g. Private Company Pty Ltd).'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 3.2: The Business Plan & Marketing Strategy',
          subtitle: 'The 4Ps Marketing Mix, Financial Forecasting & Executive Summary',
          syllabusRef: 'Secondary Business Studies: Business Planning',
          theorySections: [
            {
              heading: '1. Crafting a Commercial Business Plan',
              paragraphs: [
                'A Business Plan is a structured roadmap detailing the operational, marketing, and financial feasibility of a new venture, essential for securing investor funding and bank loans.',
                'The Marketing Mix comprises the traditional 4Ps: Product (quality, design, branding), Price (cost-plus, penetration, or premium pricing), Place (distribution channels, logistics), and Promotion (advertising, social media, sales promotions).'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Apply penetration pricing strategy to a new African organic rooibos tea startup entering an established supermarket shelf dominated by foreign brands.',
            pedagogicalSteps: [
              { step: 1, description: 'Define penetration pricing', mathematicalForm: 'Setting an initial low price below established competitors to entice consumers to try the product and capture rapid market share.' },
              { step: 2, description: 'Plan subsequent price adjustment', mathematicalForm: 'Once consumer loyalty and repeat purchasing habits are secured, gradually increase price to normal profitable levels.' }
            ],
            socraticTeacherTip: 'Do not confuse penetration pricing with predatory pricing! Penetration pricing is legitimate competition; predatory pricing intentionally operates at an illegal loss to bankrupt competitors.'
          },
          africanContext: {
            regionName: 'African Angel Investor Networks & Venture Capital',
            title: 'Startup Pitching across African Tech Ecosystems',
            realWorldApplication: 'African venture hubs in Lagos, Cape Town, Nairobi, and Cairo evaluate business plans based on unit economics, customer acquisition costs, and market scalability.'
          },
          keyTakeaways: [
            'The Executive Summary is the most vital section of a business plan.',
            'The 4Ps marketing mix must align coherently with the target customer demographic.'
          ],
          practiceQuestion: {
            prompt: 'Name the 4Ps of the traditional marketing mix.',
            marks: 2,
            conceptualHint: 'Product, Price, Place, Promotion.'
          }
        }
      ]
    }
  ];

  return {
    id: `tb-bus-${country}`,
    subjectId: `${country.toLowerCase()}-bus`,
    subjectName: 'Business Studies',
    title: `Business Studies & Enterprise Management (${country} Syllabus)`,
    authorOrMinistry: `${country} Department of Basic Education`,
    curriculumCode: country === 'ZA' ? 'CAPS' : country === 'NG' ? 'WAEC' : 'National Syllabus',
    isbn: '978-0-19-902188-4',
    grade,
    totalPages: 30,
    chapters
  };
}

// Economics
export function buildEconomicsTextbook(country: CountryCode, grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `econ-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: The Circular Flow of Income & National Accounts',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 1.1: The Four-Sector Macroeconomic Circular Flow',
          subtitle: 'Households, Firms, Government, Foreign Sector, Injections & Leakages',
          syllabusRef: 'Secondary Economics: Macroeconomics Circular Flow',
          theorySections: [
            {
              heading: '1. Interconnected Sectors of the Macroeconomy',
              paragraphs: [
                'Macroeconomics analyzes the aggregate behavior of an economy. The circular flow model illustrates continuous monetary and physical exchanges between four primary participants: Households (owners of factors of production: land, labor, capital, entrepreneurship), Business Firms (producers of goods and services), the State (taxation and public goods), and the Foreign Sector (exports and imports).',
                'Injections add spending power into the circular flow: Investment ($I$), Government Spending ($G$), and Exports ($X$). Leakages remove spending power from the flow: Savings ($S$), Taxes ($T$), and Imports ($M$). Macroeconomic equilibrium occurs when Total Injections = Total Leakages ($I + G + X = S + T + M$).'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Macroeconomic Equilibrium Condition',
              latex: 'I + G + X = S + T + M',
              variables: ['I: Investment', 'G: Government Spending', 'X: Exports', 'S: Savings', 'T: Taxes', 'M: Imports']
            }
          ],
          workedExample: {
            problemStatement: 'In an economy, Savings = R40 billion, Taxes = R35 billion, and Imports = R25 billion. Planned Investment = R50 billion and Government Spending = R30 billion. What export level is required to achieve circular flow equilibrium?',
            pedagogicalSteps: [
              { step: 1, description: 'Sum total leakages', mathematicalForm: '\\text{Total Leakages} = S + T + M = 40 + 35 + 25 = R100\\,\\text{billion}' },
              { step: 2, description: 'Sum known injections', mathematicalForm: 'I + G = 50 + 30 = R80\\,\\text{billion}' },
              { step: 3, description: 'Calculate required exports X', mathematicalForm: 'X = \\text{Total Leakages} - (I + G) = 100 - 80 = R20\\,\\text{billion}' }
            ],
            socraticTeacherTip: 'If injections exceed leakages ($J > L$), national income (GDP) expands; if leakages exceed injections ($L > J$), national income contracts.'
          },
          africanContext: {
            regionName: 'AfCFTA Trade Balances Across African Economies',
            title: 'Expanding African Regional Export Injections',
            realWorldApplication: 'By trading manufactured goods intra-continentally rather than exporting raw mineral ores abroad, African nations turn import leakages into mutually beneficial domestic export injections.'
          },
          keyTakeaways: [
            'Injections ($I, G, X$) expand GDP; Leakages ($S, T, M$) contract national income.',
            'Households receive factor incomes: wages, rent, interest, and profit.'
          ],
          practiceQuestion: {
            prompt: 'Identify three leakages from the circular flow of income.',
            marks: 3,
            conceptualHint: 'Savings (S), Taxes (T), and Imports (M).'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 1.2: Gross Domestic Product (GDP) Measurement Methods',
          subtitle: 'Production (Value Added), Expenditure & Income Methods & Nominal vs Real GDP',
          syllabusRef: 'Secondary Economics: National Accounts Aggregates',
          theorySections: [
            {
              heading: '1. Three Equivalent Approaches to Measure GDP',
              paragraphs: [
                'Gross Domestic Product (GDP) is the total market value of all final goods and services produced within the geographic borders of a country in a specified time period (usually one year).',
                'GDP is calculated via three equivalent methods: 1. Expenditure Method: $\\text{GDP} = C + I + G + (X - M)$; 2. Production (Value-Added) Method: Summing the net value added at every stage of production to avoid double counting; 3. Income Method: Summing all factor compensation (wages + operating surplus + net indirect taxes).'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Expenditure Method for GDP',
              latex: '\\text{GDP} = C + I + G + (X - M)',
              variables: ['C: Consumer spending', 'I: Gross capital investment', 'G: Government expenditure', 'X: Exports', 'M: Imports']
            },
            {
              name: 'Real GDP Formula',
              latex: '\\text{Real GDP} = \\left(\\frac{\\text{Nominal GDP}}{\\text{GDP Deflator}}\\right) \\times 100',
              variables: ['Real GDP: output adjusted for inflation']
            }
          ],
          workedExample: {
            problemStatement: 'Given: Consumer spending C = R500bn, Investment I = R150bn, Government spending G = R200bn, Exports X = R120bn, and Imports M = R140bn. Calculate GDP.',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate net exports (X - M)', mathematicalForm: 'X - M = 120 - 140 = -R20\\,\\text{billion (Trade deficit)}' },
              { step: 2, description: 'Sum expenditure aggregates', mathematicalForm: '\\text{GDP} = 500 + 150 + 200 + (-20) = R830\\,\\text{billion}' }
            ],
            socraticTeacherTip: 'Nominal GDP increases if prices rise, even if actual output is stagnant! Real GDP strips away price inflation to measure actual physical production growth.'
          },
          africanContext: {
            regionName: 'Statistics South Africa & National Bureau of Statistics (Nigeria)',
            title: 'Quarterly GDP Reporting in Africa',
            realWorldApplication: 'Statisticians in Abuja and Pretoria compile national accounts data to guide central bank monetary policy committees in setting national benchmark interest rates.'
          },
          keyTakeaways: [
            'GDP only measures final goods and services; intermediate inputs are excluded to prevent double counting.',
            'Real GDP is the true measure of physical economic growth.'
          ],
          practiceQuestion: {
            prompt: 'Explain why intermediate goods are excluded when calculating Gross Domestic Product.',
            marks: 2,
            conceptualHint: 'To prevent double counting, since their value is already included in the final retail product price.'
          }
        }
      ]
    },
    {
      id: `econ-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Price Elasticity of Demand & Market Equilibrium',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: Price Elasticity of Demand (PED)',
          subtitle: 'Elastic, Inelastic, Unitary Demand & Revenue Maximization',
          syllabusRef: 'Secondary Economics: Price Elasticity',
          theorySections: [
            {
              heading: '1. Responsiveness of Quantity Demanded to Price Shifts',
              paragraphs: [
                'Price Elasticity of Demand (PED) measures the percentage responsiveness of quantity demanded to a percentage change in the price of a good: $E_d = \\frac{\\% \\Delta Q_d}{\\% \\Delta P}$.',
                'If $|E_d| > 1$, demand is Price Elastic (luxury goods, items with close substitutes); a price increase causes a proportionally larger drop in quantity, reducing total revenue. If $|E_d| < 1$, demand is Price Inelastic (essential staples like bread, fuel, electricity); a price increase causes a smaller percentage drop in consumption, increasing total revenue.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Price Elasticity of Demand (PED)',
              latex: 'E_d = \\frac{\\% \\Delta Q_d}{\\% \\Delta P} = \\frac{(Q_2 - Q_1)/Q_1}{(P_2 - P_1)/P_1}',
              variables: ['E_d: Elasticity coefficient', 'Q: Quantity demanded', 'P: Price']
            }
          ],
          workedExample: {
            problemStatement: 'When the price of maize meal increases from R50 to R60 per bag, quantity demanded falls from 10,000 bags to 9,000 bags. Calculate the PED and classify the elasticity.',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate percentage change in quantity', mathematicalForm: '\\% \\Delta Q = \\frac{9000 - 10000}{10000} \\times 100 = -10\\%' },
              { step: 2, description: 'Calculate percentage change in price', mathematicalForm: '\\% \\Delta P = \\frac{60 - 50}{50} \\times 100 = +20\\%' },
              { step: 3, description: 'Compute PED coefficient', mathematicalForm: 'E_d = \\frac{-10\\%}{+20\\%} = -0.50' },
              { step: 4, description: 'Classify elasticity', mathematicalForm: '|E_d| = 0.50 < 1: Demand is Price Inelastic because maize meal is an essential daily nutritional staple.' }
            ],
            socraticTeacherTip: 'Always drop the negative sign when interpreting elasticity: an elasticity of -0.5 is inelastic because 0.5 < 1.'
          },
          africanContext: {
            regionName: 'Excise Taxation across African Revenue Authorities (KRA, SARS, FIRS)',
            title: 'Sin Taxes on Inelastic Commodities',
            realWorldApplication: 'African revenue ministries levy heavy excise taxes on tobacco, fuel, and alcohol because inelastic consumer demand guarantees high tax collection.'
          },
          keyTakeaways: [
            'Inelastic demand ($|E_d| < 1$): raising prices increases total revenue.',
            'Elastic demand ($|E_d| > 1$): raising prices reduces total revenue.'
          ],
          practiceQuestion: {
            prompt: 'Explain why essential medicines (such as insulin or malaria tablets) exhibit highly price inelastic demand.',
            marks: 3,
            conceptualHint: 'They are life-saving necessities with zero close substitutes; patients must purchase them regardless of price.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: Market Equilibrium & Government Interventions',
          subtitle: 'Price Ceilings, Price Floors & Deadweight Welfare Loss',
          syllabusRef: 'Secondary Economics: Market Intervention',
          theorySections: [
            {
              heading: '1. Market Clearing and Statutory Price Controls',
              paragraphs: [
                'Market equilibrium occurs at the intersection of market demand and market supply, where quantity demanded equals quantity supplied ($Q_d = Q_s$).',
                'A Price Ceiling (maximum price set below equilibrium to protect low-income consumers) inevitably creates chronic shortages and black markets. A Price Floor (minimum price set above equilibrium, such as minimum wage laws or agricultural crop supports) creates excess surplus supply.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Equilibrium price of bread is R18. The government imposes a statutory maximum price ceiling of R12. Analyze the economic consequences on market supply and demand.',
            pedagogicalSteps: [
              { step: 1, description: 'Analyze consumer reaction at lower price', mathematicalForm: 'At R12, quantity demanded expands because bread becomes cheaper for households.' },
              { step: 2, description: 'Analyze bakeries supply reaction', mathematicalForm: 'At R12, production becomes unprofitable for marginal bakeries, causing quantity supplied to contract.' },
              { step: 3, description: 'State final market outcome', mathematicalForm: 'Quantity demanded exceeds quantity supplied, creating chronic bread shortages, queues, and informal black-market scalping.' }
            ],
            socraticTeacherTip: 'In economics examinations, always show that good intentions in price fixing often produce unintended economic consequences (shortages or unemployment).'
          },
          africanContext: {
            regionName: 'Subsidies & Price Interventions across Africa',
            title: 'Fertilizer & Bread Subsidies in Africa',
            realWorldApplication: 'Nations like Nigeria and Egypt transition from inefficient flat consumer fuel and food subsidies toward targeted electronic cash transfers to avoid market distortion.'
          },
          keyTakeaways: [
            'A price ceiling below equilibrium causes shortages; a price floor above equilibrium causes surpluses.',
            'Price controls create deadweight welfare losses by distorting price signals.'
          ],
          practiceQuestion: {
            prompt: 'Explain why a statutory minimum wage set above the equilibrium clearing wage rate can lead to increased unemployment among unskilled youth.',
            marks: 3,
            conceptualHint: 'Supply of labor exceeds demand; employers reduce hiring because labor costs exceed marginal revenue product.'
          }
        }
      ]
    }
  ];

  return {
    id: `tb-econ-${country}`,
    subjectId: `${country.toLowerCase()}-econ`,
    subjectName: 'Economics',
    title: `Secondary Economics & African Trade (${country} Syllabus)`,
    authorOrMinistry: `${country} National Examinations Council`,
    curriculumCode: country === 'ZA' ? 'CAPS' : country === 'NG' ? 'WAEC' : 'National Syllabus',
    isbn: '978-0-19-904322-0',
    grade,
    totalPages: 30,
    chapters
  };
}

// ============================================================================
// 5. MATHEMATICS & MATHEMATICAL LITERACY (FULL LATEX/KATEX FORMULAS)
// ============================================================================
export function buildPureMathsTextbook(country: CountryCode, grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `math-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: Quadratic Equations, Inequalities & Functions',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 1.1: Solving Quadratic Equations by Factoring & Formula',
          subtitle: 'Completing the Square, The Quadratic Formula & Discriminant Analysis',
          syllabusRef: 'Secondary Pure Mathematics: Quadratic Algebra',
          theorySections: [
            {
              heading: '1. Standard Quadratic Form and Algebraic Solutions',
              paragraphs: [
                'A quadratic equation in one variable $x$ has the standard algebraic form $ax^2 + bx + c = 0$, where $a \\neq 0$.',
                'Roots can be obtained by factorisation, completing the square, or using the Quadratic Formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$. The discriminant $\\Delta = b^2 - 4ac$ governs the nature of roots: if $\\Delta > 0$, roots are real and unequal; if $\\Delta = 0$, roots are real and equal (tangent); if $\\Delta < 0$, roots are non-real (complex conjugates).'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'The Quadratic Formula',
              latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
              variables: ['a: coefficient of x²', 'b: coefficient of x', 'c: constant term', '±: provides two roots']
            },
            {
              name: 'The Discriminant',
              latex: '\\Delta = b^2 - 4ac',
              variables: ['Δ > 0: two real roots', 'Δ = 0: equal real roots', 'Δ < 0: non-real roots']
            }
          ],
          workedExample: {
            problemStatement: 'Solve for x: $2x^2 - 7x + 3 = 0$. Determine the nature of roots using the discriminant before calculating exact values.',
            pedagogicalSteps: [
              { step: 1, description: 'Extract coefficients and compute discriminant', mathematicalForm: 'a = 2, b = -7, c = 3 \\implies \\Delta = (-7)^2 - 4(2)(3) = 49 - 24 = 25' },
              { step: 2, description: 'Analyze nature of roots', mathematicalForm: '\\Delta = 25 > 0\\text{ and is a perfect square, so roots are real, rational, and unequal.}' },
              { step: 3, description: 'Substitute into quadratic formula', mathematicalForm: 'x = \\frac{-(-7) \\pm \\sqrt{25}}{2(2)} = \\frac{7 \\pm 5}{4} \\implies x_1 = 3,\\; x_2 = \\frac{1}{2}' }
            ],
            socraticTeacherTip: 'Always verify by substitution! $2(3)^2 - 7(3) + 3 = 18 - 21 + 3 = 0$. Both roots satisfy the original equation.'
          },
          africanContext: {
            regionName: 'Kariba Dam Hydroelectric Spillway',
            title: 'Parabolic Trajectory of Hydro Water Discharges',
            realWorldApplication: 'Civil engineers at Lake Kariba compute parabolic jet equations ($y = -ax^2 + bx + c$) to ensure falling water plumes land safely inside plunge pools without eroding the dam foundations.'
          },
          keyTakeaways: [
            'Always rearrange quadratic expressions into standard form $ax^2 + bx + c = 0$ first.',
            'The discriminant reveals root behavior before performing manual calculations.'
          ],
          practiceQuestion: {
            prompt: 'Solve for x: $x^2 - 5x - 6 = 0$.',
            marks: 3,
            conceptualHint: 'Factor into $(x - 6)(x + 1) = 0$, yielding $x = 6$ or $x = -1$.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 1.2: Parabolic Graphs & Optimization Functions',
          subtitle: 'Axis of Symmetry, Turning Point & Range of Quadratic Functions',
          syllabusRef: 'Secondary Pure Mathematics: Functions',
          theorySections: [
            {
              heading: '1. Parabolic Graph Characteristics',
              paragraphs: [
                'The graph of $f(x) = ax^2 + bx + c$ is a parabola. If $a > 0$, the parabola opens upward, possessing a local minimum turning point. If $a < 0$, it opens downward, possessing a local maximum turning point.',
                'The axis of symmetry is the vertical line $x = -\\frac{b}{2a}$. The coordinates of the turning point are $\\left(-\\frac{b}{2a}, f\\left(-\\frac{b}{2a}\\right)\\right)$, representing the optimal maximum or minimum value of the physical function.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Axis of Symmetry',
              latex: 'x = -\\frac{b}{2a}',
              variables: ['Vertical mirror line through turning point vertex']
            },
            {
              name: 'Completed Square (Vertex Form)',
              latex: 'f(x) = a(x - p)^2 + q',
              variables: ['Turning point vertex is (p, q)', 'Axis of symmetry is x = p']
            }
          ],
          workedExample: {
            problemStatement: 'Find the maximum profit and optimal production quantity for a solar lamp company whose profit is modeled by $P(x) = -2x^2 + 80x - 300$ (in thousands of Rand).',
            pedagogicalSteps: [
              { step: 1, description: 'Find the x-coordinate of the maximum turning point', mathematicalForm: 'x = -\\frac{b}{2a} = -\\frac{80}{2(-2)} = 20\\,\\text{thousand units}' },
              { step: 2, description: 'Substitute x = 20 into the profit function', mathematicalForm: 'P(20) = -2(20)^2 + 80(20) - 300 = -800 + 1600 - 300 = R500\\,\\text{thousand}' }
            ],
            socraticTeacherTip: 'Because $a = -2 < 0$, the parabola opens downwards, guaranteeing that the turning point represents an absolute mathematical maximum.'
          },
          africanContext: {
            regionName: 'Renewable Solar Trajectory Optimization in the Kalahari',
            title: 'Solar Inverter Efficiency Curves',
            realWorldApplication: 'Engineers designing solar photovoltaic farms in the Northern Cape model inverter output curves as inverted parabolas to maximize energy capture.'
          },
          keyTakeaways: [
            'The vertex $x = -b / (2a)$ is the optimal turning point of a parabola.',
            'The sign of $a$ determines concavity: positive smiles, negative frowns.'
          ],
          practiceQuestion: {
            prompt: 'Determine the turning point coordinates of $f(x) = x^2 - 6x + 8$.',
            marks: 3,
            conceptualHint: '$x = -(-6)/2 = 3$. $f(3) = 9 - 18 + 8 = -1$. Vertex is $(3, -1)$.'
          }
        }
      ]
    },
    {
      id: `math-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Trigonometric Identities & Analytical Geometry',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: Fundamental Trigonometric Identities & Reduction Formulas',
          subtitle: 'Pythagorean Identity, Compound Angles & CAST Diagram',
          syllabusRef: 'Secondary Pure Mathematics: Trigonometry',
          theorySections: [
            {
              heading: '1. Trigonometric Ratios and Angle Reductions',
              paragraphs: [
                'In trigonometry, the fundamental identity $\\sin^2 \\theta + \\cos^2 \\theta = 1$ applies for all real angles $\\theta$, alongside the quotient identity $\\tan \\theta = \\frac{\\sin \\theta}{\\cos \\theta}$.',
                'The CAST diagram organizes sign conventions across four quadrants (Quadrant I: All positive, II: Sine positive, III: Tangent positive, IV: Cosine positive). Reduction formulas allow angles in quadrants II, III, and IV to be rewritten as acute reference angles.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Pythagorean Trigonometric Identity',
              latex: '\\sin^2 \\theta + \\cos^2 \\theta = 1',
              variables: ['True for all angles θ']
            },
            {
              name: 'Cosine Compound Angle Formula',
              latex: '\\cos(\\alpha - \\beta) = \\cos \\alpha \\cos \\beta + \\sin \\alpha \\sin \\beta',
              variables: ['Allows exact calculation of non-special angles']
            }
          ],
          workedExample: {
            problemStatement: 'Simplify without using a calculator: $\\frac{\\sin(180^\\circ - x) \\cdot \\cos(360^\\circ - x)}{\\tan(180^\\circ + x) \\cdot \\cos(90^\\circ - x)}$.',
            pedagogicalSteps: [
              { step: 1, description: 'Apply reduction formulas to numerator', mathematicalForm: '\\sin(180^\\circ - x) = \\sin x,\\; \\cos(360^\\circ - x) = \\cos x \\implies \\text{Numerator} = \\sin x \\cos x' },
              { step: 2, description: 'Apply reduction formulas to denominator', mathematicalForm: '\\tan(180^\\circ + x) = \\tan x = \\frac{\\sin x}{\\cos x},\\; \\cos(90^\\circ - x) = \\sin x \\implies \\text{Denominator} = \\frac{\\sin^2 x}{\\cos x}' },
              { step: 3, description: 'Divide numerator by denominator', mathematicalForm: '\\frac{\\sin x \\cos x}{\\frac{\\sin^2 x}{\\cos x}} = \\frac{\\sin x \\cos x \\cdot \\cos x}{\\sin^2 x} = \\frac{\\cos^2 x}{\\sin x}' }
            ],
            socraticTeacherTip: 'Always verify angle co-functions: $\\cos(90^\\circ - x) = \\sin x$ and $\\sin(90^\\circ - x) = \\cos x$.'
          },
          africanContext: {
            regionName: 'Geodetic Survey of Africa & Arc of the 30th Meridian',
            title: 'Triangulation Mapping Across Africa',
            realWorldApplication: 'Surveyors mapped the Great Rift Valley from Cairo to Port Elizabeth using trigonometric triangulation pillars placed on high mountain summits.'
          },
          keyTakeaways: [
            'Use $\\sin^2 \\theta + \\cos^2 \\theta = 1$ to replace quadratic trigonometric terms.',
            'Co-functions swap sine and cosine when dealing with $90^\\circ \\pm \\theta$.'
          ],
          practiceQuestion: {
            prompt: 'Prove that $\\frac{1 - \\cos^2 \\theta}{\\sin \\theta} = \\sin \\theta$.',
            marks: 2,
            conceptualHint: 'Replace $1 - \\cos^2 \\theta$ with $\\sin^2 \\theta$, then cancel $\\sin \\theta$.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: Analytical Geometry of Straight Lines & Circles',
          subtitle: 'Distance Formula, Gradient, Midpoint & Circle Equation with Tangents',
          syllabusRef: 'Secondary Pure Mathematics: Analytical Geometry',
          theorySections: [
            {
              heading: '1. Coordinate Geometry Principles',
              paragraphs: [
                'Analytical geometry bridges algebra and geometric space using Cartesian coordinates $(x, y)$. The distance between points is $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$, gradient is $m = \\frac{y_2 - y_1}{x_2 - x_1}$, and parallel lines have equal gradients ($m_1 = m_2$). Perpendicular lines have product $m_1 \\times m_2 = -1$.',
                'A circle with center $(a, b)$ and radius $r$ satisfies $(x - a)^2 + (y - b)^2 = r^2$. A tangent to a circle is perpendicular to the radius drawn to the point of contact.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Equation of a Circle',
              latex: '(x - a)^2 + (y - b)^2 = r^2',
              variables: ['(a, b): center coordinates', 'r: circle radius']
            },
            {
              name: 'Perpendicular Lines Condition',
              latex: 'm_1 \\times m_2 = -1',
              variables: ['m_1: radius gradient', 'm_2: tangent line gradient']
            }
          ],
          workedExample: {
            problemStatement: 'Find the equation of the tangent line to the circle $x^2 + y^2 = 25$ at the point $P(3, 4)$.',
            pedagogicalSteps: [
              { step: 1, description: 'Find the gradient of the radius OP', mathematicalForm: 'Center is O(0, 0), P is (3, 4) \\implies m_{\\text{radius}} = \\frac{4 - 0}{3 - 0} = \\frac{4}{3}' },
              { step: 2, description: 'Determine tangent gradient using perpendicularity', mathematicalForm: 'm_{\\text{tangent}} = -\\frac{1}{m_{\\text{radius}}} = -\\frac{3}{4}' },
              { step: 3, description: 'Write tangent equation through P(3, 4)', mathematicalForm: 'y - 4 = -\\frac{3}{4}(x - 3) \\implies y = -\\frac{3}{4}x + \\frac{9}{4} + \\frac{16}{4} = -\\frac{3}{4}x + \\frac{25}{4}' }
            ],
            socraticTeacherTip: 'Remember: the tangent is ALWAYS perpendicular to the radius at the point of contact. This gives you the tangent gradient immediately!'
          },
          africanContext: {
            regionName: 'Square Kilometre Array (SKA) Radio Telescope, Carnarvon',
            title: 'Parabolic Dish Geometry in the Karoo',
            realWorldApplication: 'Scientists at the SKA radio astronomy array calculate coordinate tangent gradients on parabolic reflectors to focus deep space cosmic microwave signals.'
          },
          keyTakeaways: [
            'Circle equation $(x - a)^2 + (y - b)^2 = r^2$ requires identifying center and radius.',
            'Tangent lines are always perpendicular to the radius ($m_1 \\times m_2 = -1$).'
          ],
          practiceQuestion: {
            prompt: 'What is the radius of the circle with equation $(x - 2)^2 + (y + 5)^2 = 49$?',
            marks: 2,
            conceptualHint: '$r^2 = 49 \\implies r = 7$.'
          }
        }
      ]
    },
    {
      id: `math-ch3`,
      chapterNumber: 3,
      term: 2,
      title: 'Chapter 3: Differential Calculus & Optimization',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 3.1: Limits, First Principles & Differentiation Rules',
          subtitle: 'Derivative Definition, Power Rule & Tangent Slopes',
          syllabusRef: 'Secondary Pure Mathematics: Calculus',
          theorySections: [
            {
              heading: '1. The Derivative as an Instantaneous Rate of Change',
              paragraphs: [
                'Differential calculus examines instantaneous rates of change. The derivative $f\'(x)$ represents the gradient of the tangent line to the curve $y = f(x)$ at any point.',
                'From first principles, the derivative is defined as $f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$. Applying algebraic limits yields the standard Power Rule: $\\frac{d}{dx}[x^n] = n x^{n-1}$.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Derivative from First Principles',
              latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}',
              variables: ['h: infinitesimal increment in x']
            },
            {
              name: 'The Power Rule of Differentiation',
              latex: '\\frac{d}{dx}[a x^n] = a n x^{n-1}',
              variables: ['a: constant scalar', 'n: exponent power']
            }
          ],
          workedExample: {
            problemStatement: 'Differentiate $f(x) = 3x^2 - 5x + 4$ from first principles.',
            pedagogicalSteps: [
              { step: 1, description: 'Write definition and expand f(x + h)', mathematicalForm: 'f(x + h) = 3(x + h)^2 - 5(x + h) + 4 = 3(x^2 + 2xh + h^2) - 5x - 5h + 4 = 3x^2 + 6xh + 3h^2 - 5x - 5h + 4' },
              { step: 2, description: 'Formulate the difference quotient [f(x+h) - f(x)] / h', mathematicalForm: '\\frac{(3x^2 + 6xh + 3h^2 - 5x - 5h + 4) - (3x^2 - 5x + 4)}{h} = \\frac{6xh + 3h^2 - 5h}{h} = \\frac{h(6x + 3h - 5)}{h} = 6x + 3h - 5' },
              { step: 3, description: 'Evaluate limit as h approaches 0', mathematicalForm: 'f\'(x) = \\lim_{h \\to 0} (6x + 3h - 5) = 6x - 5' }
            ],
            socraticTeacherTip: 'Never drop the "lim h -> 0" symbol until you actually substitute h = 0 in the final step! Premature omission loses method marks in national exams.'
          },
          africanContext: {
            regionName: 'Aerodynamics of Wind Turbines in Lake Turkana, Kenya',
            title: 'Rate of Change in Wind Turbine Power Output',
            realWorldApplication: 'Wind farm engineers in Lake Turkana differentiate power curves with respect to wind speed to calculate optimal blade pitch angles.'
          },
          keyTakeaways: [
            'The derivative calculates the exact gradient of a curve at a single point.',
            'Power Rule: bring the exponent to the front, subtract one from the power.'
          ],
          practiceQuestion: {
            prompt: 'Find the derivative of $g(x) = 5x^3 - 2x^2 + 7x - 9$ using differentiation rules.',
            marks: 3,
            conceptualHint: '$g\'(x) = 15x^2 - 4x + 7$.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 3.2: Curve Sketching, Stationary Points & Maximum Volume',
          subtitle: 'Local Maxima, Minima, Points of Inflection & Real-World Optimization',
          syllabusRef: 'Secondary Pure Mathematics: Optimization Problems',
          theorySections: [
            {
              heading: '1. Finding Stationary Points and Optimizing Enclosures',
              paragraphs: [
                'Stationary points (turning points) occur where the tangent slope is zero: $f\'(x) = 0$. The second derivative $f\'\'(x)$ tests concavity: if $f\'\'(x) > 0$, the curve is concave up (local minimum); if $f\'\'(x) < 0$, the curve is concave down (local maximum). Points of inflection occur where $f\'\'(x) = 0$.',
                'In real-world engineering, optimization problems find dimensions that maximize storage volume or minimize material fabrication costs.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Stationary Point Condition',
              latex: 'f\'(x) = 0',
              variables: ['Tangent slope is horizontal']
            },
            {
              name: 'Second Derivative Test',
              latex: 'f\'\'(x) > 0 \\implies \\text{Min},\\; f\'\'(x) < 0 \\implies \\text{Max}',
              variables: ['Identifies local extrema concavity']
            }
          ],
          workedExample: {
            problemStatement: 'A farmer has 120 meters of fencing to enclose a rectangular cattle pen against a riverbank (no fencing required on the river side). Find the dimensions that maximize the area.',
            pedagogicalSteps: [
              { step: 1, description: 'Set up perimeter constraint and area formula', mathematicalForm: 'River on one side \\implies 2x + y = 120 \\implies y = 120 - 2x. \\text{ Area } A(x) = x \\cdot y = x(120 - 2x) = 120x - 2x^2' },
              { step: 2, description: 'Differentiate area with respect to x and set to zero', mathematicalForm: 'A\'(x) = 120 - 4x = 0 \\implies 4x = 120 \\implies x = 30\\,\\text{meters}' },
              { step: 3, description: 'Calculate optimal dimensions and maximum area', mathematicalForm: 'y = 120 - 2(30) = 60\\,\\text{m}. \\text{ Maximum Area } A = 30 \\times 60 = 1,800\\,\\text{m}^2' }
            ],
            socraticTeacherTip: 'Always verify that your stationary point is indeed a maximum using the second derivative: $A\'\'(x) = -4 < 0$, confirming maximum!'
          },
          africanContext: {
            regionName: 'Container Ports of Durban, Mombasa & Lagos',
            title: 'Shipping Container Logistics & Packaging Optimization',
            realWorldApplication: 'Logistics planners at port terminals use calculus optimization to minimize steel sheet usage while maximizing shipping volume.'
          },
          keyTakeaways: [
            'Set $f\'(x) = 0$ to find critical stationary points.',
            'Express the quantity to be optimized in terms of a single independent variable before differentiating.'
          ],
          practiceQuestion: {
            prompt: 'Find the turning point of $y = x^2 - 4x + 7$ by setting the derivative to zero.',
            marks: 3,
            conceptualHint: '$dy/dx = 2x - 4 = 0 \\implies x = 2$. At $x = 2$, $y = 4 - 8 + 7 = 3$. Minimum at $(2, 3)$.'
          }
        }
      ]
    }
  ];

  return {
    id: `tb-puremath-${country}`,
    subjectId: `${country.toLowerCase()}-pure-math`,
    subjectName: 'Pure Mathematics',
    title: `Secondary Pure Mathematics (${country} Syllabus)`,
    authorOrMinistry: `${country} Examinations Council`,
    curriculumCode: country === 'ZA' ? 'CAPS' : country === 'NG' ? 'WAEC' : 'National Syllabus',
    isbn: '978-0-19-074312-4',
    grade,
    totalPages: 36,
    chapters
  };
}

// Mathematical Literacy
export function buildMathsLitTextbook(country: CountryCode, grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `mlit-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: Personal & Business Finance',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 1.1: Structuring a Monthly Household Budget',
          subtitle: 'Gross Income, Net Take-Home Pay, Fixed vs Variable Living Costs',
          syllabusRef: 'CAPS Mathematical Literacy: Finance',
          theorySections: [
            {
              heading: '1. Budgeting and Cash Surpluses',
              paragraphs: [
                'Mathematical Literacy applies real-world arithmetic to everyday financial decisions. A household budget balances income streams against expenditure categories.',
                'Fixed expenses (rent, bond, vehicle insurance) remain constant every month. Variable expenses (groceries, electricity tokens, public transit) fluctuate with monthly consumption.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Net Monthly Surplus',
              latex: '\\text{Net Surplus} = \\text{Net Take-Home Pay} - \\text{Total Living Expenses}',
              variables: ['Take-home: gross salary minus tax and UIF']
            }
          ],
          workedExample: {
            problemStatement: 'Sipho earns R18,500 gross. PAYE tax is R2,200 and UIF is R185. Fixed expenses are R8,500 and variable groceries/transport are R4,200. Calculate his monthly surplus.',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate net take-home salary', mathematicalForm: '\\text{Net Salary} = 18500 - (2200 + 185) = R16,115' },
              { step: 2, description: 'Calculate total household living expenses', mathematicalForm: '\\text{Total Expenses} = 8500 + 4200 = R12,700' },
              { step: 3, description: 'Compute net surplus', mathematicalForm: '\\text{Surplus} = 16115 - 12700 = +R3,415' }
            ],
            socraticTeacherTip: 'Always calculate Net Take-Home Pay FIRST before deducting living expenses!'
          },
          africanContext: {
            regionName: 'Stokvel Community Savings in South Africa',
            title: 'Informal Savings Collectives (Stokvels)',
            realWorldApplication: 'Over 11 million South Africans pool monthly budget surpluses into Stokvel savings clubs, collectively managing over R50 billion in commercial bank accounts.'
          },
          keyTakeaways: [
            'Living within a budget prevents compounding unsecured debt.',
            'Differentiate essential fixed expenses from discretionary variable spending.'
          ],
          practiceQuestion: {
            prompt: 'If take-home pay is R14,000 and total monthly expenses are R11,200, calculate the percentage of salary saved.',
            marks: 3,
            conceptualHint: 'Savings = 2,800. Percentage = (2,800 / 14,000) × 100 = 20%.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 1.2: Simple vs. Compound Interest & Inflation',
          subtitle: 'Bank Loans, Hire Purchase, Inflation Erosion & Investment Growth',
          syllabusRef: 'CAPS Mathematical Literacy: Financial Calculations',
          theorySections: [
            {
              heading: '1. Interest Mechanics and Money Time-Value',
              paragraphs: [
                'Simple interest calculates return only on the original principal: $A = P(1 + i \\cdot n)$. Hire purchase furniture contracts use simple interest, resulting in exorbitant real borrowing costs.',
                'Compound interest calculates interest on both the principal and previously accumulated interest: $A = P(1 + i)^n$, powering long-term wealth creation. Inflation is the sustained annual increase in general price levels, eroding cash purchasing power.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Simple Interest Formula',
              latex: 'A = P(1 + i \\cdot n)',
              variables: ['P: principal sum', 'i: annual interest rate', 'n: time in years']
            },
            {
              name: 'Compound Interest Formula',
              latex: 'A = P(1 + i)^n',
              variables: ['Interest compounds exponentially each period']
            }
          ],
          workedExample: {
            problemStatement: 'Compare investing R10,000 for 5 years at 8% simple interest versus 8% compound interest compounded annually.',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate Simple Interest return', mathematicalForm: 'A = 10000(1 + 0.08 \\times 5) = 10000(1.40) = R14,000' },
              { step: 2, description: 'Calculate Compound Interest return', mathematicalForm: 'A = 10000(1 + 0.08)^5 = 10000(1.4693) = R14,693.28' },
              { step: 3, description: 'Compute compound interest surplus', mathematicalForm: 'Compound interest generates R693.28 more due to interest earning interest.' }
            ],
            socraticTeacherTip: 'When solving hire purchase problems, remember that insurance and monthly admin fees are added on top of the simple interest!'
          },
          africanContext: {
            regionName: 'Treasury Bills & Retail Bonds across Africa',
            title: 'National Retail Savings Bonds',
            realWorldApplication: 'South African RSA Retail Savings Bonds and Kenyan M-Akiba retail mobile bonds allow ordinary citizens to earn compound interest starting from as little as R500 or KSh 3,000.'
          },
          keyTakeaways: [
            'Compound interest accelerates investment growth over extended time horizons.',
            'Hire purchase agreements lock consumers into high simple interest costs.'
          ],
          practiceQuestion: {
            prompt: 'Calculate the total repayment amount for an appliance of R8,000 bought on hire purchase at 12% simple interest per year over 3 years.',
            marks: 3,
            conceptualHint: '$A = 8000(1 + 0.12 \\times 3) = 8000(1.36) = R10,880$.'
          }
        }
      ]
    },
    {
      id: `mlit-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Tariffs & Municipal Utility Systems',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: Incline Block Tariffs for Electricity & Water',
          subtitle: 'Stepped Rates, Eskom Tier Thresholds & VAT Calculations',
          syllabusRef: 'CAPS Mathematical Literacy: Municipal Tariffs',
          theorySections: [
            {
              heading: '1. How Incline Block Tariffs (IBT) Function',
              paragraphs: [
                'Municipalities and electricity utilities (e.g. Eskom) implement Incline Block Tariffs (IBT) to cross-subsidize low-income households and discourage resource wastage.',
                'Consumption is partitioned into graduated blocks. Block 1 (lifeline consumption, e.g. 0–350 kWh) has the lowest subsidized unit rate. Once consumption crosses into Block 2 (>350 kWh), each additional unit is billed at a significantly steeper rate. VAT (15% in South Africa) is added to the total pre-tax bill.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Stepped Tariff Billing Calculation',
              latex: '\\text{Total Cost} = (\\text{Units in Tier 1} \\times R_1) + (\\text{Units in Tier 2} \\times R_2) + \\text{VAT}',
              variables: ['R_1: Tier 1 unit rate', 'R_2: Tier 2 penalty unit rate']
            }
          ],
          workedExample: {
            problemStatement: 'Eskom Tier 1 (0–350 kWh) costs R1.80/kWh. Tier 2 (>350 kWh) costs R2.60/kWh. A household consumes 450 kWh. Calculate total cost including 15% VAT.',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate cost of first 350 kWh in Tier 1', mathematicalForm: '350 \\times R1.80 = R630.00' },
              { step: 2, description: 'Calculate cost of remaining 100 kWh in Tier 2', mathematicalForm: '(450 - 350) \\times R2.60 = 100 \\times R2.60 = R260.00' },
              { step: 3, description: 'Sum tiers and add 15% VAT', mathematicalForm: '\\text{Pre-VAT} = 630 + 260 = R890.00 \\implies \\text{Total} = 890 \\times 1.15 = R1,023.50' }
            ],
            socraticTeacherTip: 'Common mistake alert: NEVER multiply the entire 450 kWh by R2.60! You must calculate each tier separately.'
          },
          africanContext: {
            regionName: 'Prepaid Digital Metering in African Cities',
            title: 'Prepaid Electricity Token Systems',
            realWorldApplication: 'Households purchasing prepaid electricity tokens at the start of the month buy within the cheaper lower tier before high-consumption rates kick in.'
          },
          keyTakeaways: [
            'Stepped block tariffs penalize high resource wastage.',
            'Calculate usage block by block, never as a single flat multiplier.'
          ],
          practiceQuestion: {
            prompt: 'If Tier 1 is R2.00 for the first 100 units and Tier 2 is R3.00, find the cost of 120 units before VAT.',
            marks: 3,
            conceptualHint: '$(100 \\times 2) + (20 \\times 3) = 200 + 60 = R260$.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: Cellular Phone Contract vs. Prepaid Tariffs',
          subtitle: 'Call Rates, Data Bundles, Peak vs Off-Peak & Break-Even Analysis',
          syllabusRef: 'CAPS Mathematical Literacy: Tariff Comparisons',
          theorySections: [
            {
              heading: '1. Evaluating Telecommunication Pricing Plans',
              paragraphs: [
                'Comparing cellular phone plans requires analyzing fixed monthly subscription fees versus variable per-minute or per-megabyte usage charges.',
                'Break-even analysis identifies the exact usage threshold where a postpaid contract becomes more cost-effective than pay-as-you-go prepaid recharge vouchers.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Plan A (Prepaid): R1.50 per call minute with R0 monthly fee. Plan B (Contract): R200 monthly fee including 100 free minutes, plus R1.00 per minute thereafter. Which plan is cheaper for a user making 250 minutes of calls?',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate total cost for Plan A (Prepaid)', mathematicalForm: '250 \\times R1.50 = R375.00' },
              { step: 2, description: 'Calculate total cost for Plan B (Contract)', mathematicalForm: 'R200 + (250 - 100) \\times R1.00 = 200 + 150 = R350.00' },
              { step: 3, description: 'Deliver recommendation', mathematicalForm: 'Plan B is cheaper by R25.00 for a 250-minute user.' }
            ],
            socraticTeacherTip: 'Always check if unused free minutes expire at month end or roll over!'
          },
          africanContext: {
            regionName: 'Mobile Networks across Africa (MTN, Vodacom, Safaricom, Airtel)',
            title: 'Dynamic Data Bundles in Africa',
            realWorldApplication: 'African cellular networks offer hour-by-hour dynamic data pricing bundles during off-peak night hours to balance network capacity.'
          },
          keyTakeaways: [
            'Add fixed monthly fees to variable overage usage when evaluating contracts.',
            'Plotting both plans on a graph identifies the exact break-even intersection point.'
          ],
          practiceQuestion: {
            prompt: 'At how many minutes do Plan A (R2.00/min) and Plan B (R100 fee + R1.00/min) cost the exact same amount?',
            marks: 3,
            conceptualHint: '$2x = 100 + 1x \\implies x = 100$ minutes (break-even point).'
          }
        }
      ]
    },
    {
      id: `mlit-ch3`,
      chapterNumber: 3,
      term: 2,
      title: 'Chapter 3: Measurement, Maps & Scale',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 3.1: Ratio Scales & Map Distance Calculations',
          subtitle: 'Number Scales (1:50,000), Bar Scales & Real-World Distance Conversion',
          syllabusRef: 'CAPS Mathematical Literacy: Maps and Plans',
          theorySections: [
            {
              heading: '1. Interpreting Topographical and Street Map Scales',
              paragraphs: [
                'A map scale expresses the ratio between a distance measured on a paper map and the corresponding real physical distance on the ground.',
                'A number scale 1:50,000 signifies that 1 cm on the map equals 50,000 cm (500 meters or 0.5 km) on the ground. A bar scale provides a physical printed ruler that remains accurate even if the map is resized or photocopied.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Real Ground Distance Formula',
              latex: '\\text{Real Distance} = \\text{Map Distance (cm)} \\times \\text{Scale Factor}',
              variables: ['Divide by 100 to get meters', 'Divide by 100,000 to get kilometers']
            }
          ],
          workedExample: {
            problemStatement: 'On a 1:250,000 regional road map, the measured distance between Bulawayo and Gwanda is 5.2 cm. Calculate the actual driving distance in kilometers.',
            pedagogicalSteps: [
              { step: 1, description: 'Multiply measured cm by scale factor', mathematicalForm: '\\text{Real Distance (cm)} = 5.2 \\times 250000 = 1,300,000\\,\\text{cm}' },
              { step: 2, description: 'Convert centimeters to kilometers (divide by 100,000)', mathematicalForm: '\\text{Distance in km} = \\frac{1300000}{100000} = 13.0\\,\\text{km}' }
            ],
            socraticTeacherTip: 'Remember the conversion chain: $1\\,\\text{km} = 1,000\\,\\text{m} = 100,000\\,\\text{cm}$. Always check your final units!'
          },
          africanContext: {
            regionName: 'Trans-Kalahari & Maputo Development Corridors',
            title: 'Cross-Border Highway Logistics Planning',
            realWorldApplication: 'Long-haul freight truck drivers across SADC use ratio scale navigation maps to schedule diesel refueling stops across desert corridors.'
          },
          keyTakeaways: [
            'A scale of 1:50,000 means $1\\,\\text{cm} = 0.5\\,\\text{km}$.',
            'Bar scales are immune to distortion from photocopying and resizing.'
          ],
          practiceQuestion: {
            prompt: 'If a scale is 1:100,000 and the map distance is 8 cm, what is the real distance in kilometers?',
            marks: 3,
            conceptualHint: '$8 \\times 100,000 = 800,000\\,\\text{cm} = 8\\,\\text{km}$.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 3.2: Building Floor Plans, Surface Area & Volume',
          subtitle: 'Perimeter, Floor Tiling, Paint Coverage & Packaging Dimensions',
          syllabusRef: 'CAPS Mathematical Literacy: Measurement',
          theorySections: [
            {
              heading: '1. Practical Architectural Measurement',
              paragraphs: [
                'Architectural floor plans use small ratio scales (1:50 or 1:100) to represent rooms and elevations. Estimating construction costs requires calculating perimeter (fencing, skirting boards), surface area (flooring tiles, wall paint), and volume (concrete foundations, water storage tanks).',
                'Always account for a standard 10% wastage margin when ordering floor tiles or roofing sheets.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'A classroom floor is 8 m long and 6 m wide. Tiles are sold in boxes covering 1.5 m² each. Calculate how many boxes must be purchased, including 10% extra for wastage.',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate floor area', mathematicalForm: '\\text{Floor Area} = 8 \\times 6 = 48\\,\\text{m}^2' },
              { step: 2, description: 'Add 10% wastage allowance', mathematicalForm: '\\text{Total Area} = 48 \\times 1.10 = 52.8\\,\\text{m}^2' },
              { step: 3, description: 'Calculate boxes and round UP to nearest whole box', mathematicalForm: '\\text{Boxes} = \\frac{52.8}{1.5} = 35.2 \\implies 36\\,\\text{boxes}' }
            ],
            socraticTeacherTip: 'In real life and in exams, you cannot buy 0.2 of a box of tiles! Always round UP to the next whole container.'
          },
          africanContext: {
            regionName: 'RDP Housing & Affordable Urban Settlements',
            title: 'Affordable Housing Construction in Africa',
            realWorldApplication: 'Quantity surveyors on public housing projects in South Africa and Kenya calculate exact cement, brick, and tile quantities to prevent budget overruns.'
          },
          keyTakeaways: [
            'Add 10% contingency wastage when calculating materials for cutting and breakage.',
            'Always round UP material quantities sold in fixed packaging.'
          ],
          practiceQuestion: {
            prompt: 'Explain why a quantity of 12.3 cans of paint must be rounded up to 13 cans in an order.',
            marks: 2,
            conceptualHint: 'Retail hardware stores sell only complete sealed cans; 12 cans would leave part of the wall unpainted.'
          }
        }
      ]
    }
  ];

  return {
    id: `tb-mathlit-${country}`,
    subjectId: `${country.toLowerCase()}-math-lit`,
    subjectName: 'Mathematical Literacy',
    title: `Mathematical Literacy: Finance, Tariffs & Maps (${country} Syllabus)`,
    authorOrMinistry: 'Department of Basic Education',
    curriculumCode: 'CAPS',
    isbn: '978-0-19-905112-8',
    grade,
    totalPages: 30,
    chapters
  };
}

// ============================================================================
// 6. PHYSICAL SCIENCES & COMBINED / INTEGRATED SCIENCE
// ============================================================================
export function buildPhysicalSciencesTextbook(country: CountryCode, grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `phys-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: Mechanics, Vectors & 1D Kinematics',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 3,
          title: 'Section 1.1: 1D Vectors & Uniform Acceleration',
          subtitle: 'Coordinate Axes, Velocity Vectors & Acceleration Gradient',
          syllabusRef: country === 'ZA' ? 'CAPS Physical Sciences Paper 1 Mechanics' : 'WAEC / KCSE Physics Syllabus',
          theorySections: [
            {
              heading: '1. Rectilinear Motion and Coordinate Conventions',
              paragraphs: [
                'In rectilinear kinematics, motion is restricted along a 1D axis. Vector displacement $\\Delta x$ is the directed change in position from $x_i$ to $x_f$.',
                'Uniform acceleration $a$ indicates velocity changes at a constant rate over elapsed time $\\Delta t$: $a = \\frac{\\Delta v}{\\Delta t}$. The slope of a velocity-time graph equals instantaneous acceleration, while the area beneath the curve equals displacement.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Velocity-Time Kinematic Relation',
              latex: 'v_f = v_i + a\\Delta t',
              variables: ['v_f: final velocity (m/s)', 'v_i: initial velocity (m/s)', 'a: acceleration (m/s²)', 'Δt: time elapsed (s)']
            }
          ],
          workedExample: {
            problemStatement: 'A Gautrain passenger train accelerates uniformly from rest at 1.5 m/s² for 20 seconds. Calculate its final velocity.',
            pedagogicalSteps: [
              { step: 1, description: 'Identify given variables', mathematicalForm: 'v_i = 0\\,\\text{m/s},\\; a = 1.5\\,\\text{m/s}^2,\\; \\Delta t = 20\\,\\text{s},\\; v_f = ?' },
              { step: 2, description: 'Substitute into the kinematic relation', mathematicalForm: 'v_f = v_i + a\\Delta t = 0 + (1.5)(20) = 30\\,\\text{m/s}\\; (108\\,\\text{km/h})' }
            ],
            socraticTeacherTip: 'Always state the positive direction convention at the very start of your physics calculation!'
          },
          africanContext: {
            regionName: 'Gautrain High-Speed Rapid Rail & SGR Kenya',
            title: 'High-Speed Rail Transit in Africa',
            realWorldApplication: 'Train control centers use kinematic velocity-time curves to calculate exact braking headways between passenger train carriages.'
          },
          keyTakeaways: [
            'Slope of velocity-time graph = acceleration; Area under velocity-time graph = displacement.',
            'Vector quantities require both magnitude and direction.'
          ],
          practiceQuestion: {
            prompt: 'A car travelling at 25 m/s brakes with acceleration -5 m/s². How long does it take to come to a complete stop?',
            marks: 3,
            conceptualHint: '$0 = 25 - 5\\Delta t \\implies \\Delta t = 5\\,\\text{seconds}$.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 3,
          title: 'Section 1.2: Displacement under Uniform Acceleration',
          subtitle: 'Quadratic Time Scaling and Area under Velocity-Time Graph',
          syllabusRef: 'Secondary Physics: Kinematic Equations',
          theorySections: [
            {
              heading: '1. Displacement Kinematic Derivation',
              paragraphs: [
                'When acceleration is constant, displacement is the sum of the rectangular initial velocity component and the triangular acceleration component on a velocity-time graph: $\\Delta x = v_i \\Delta t + \\frac{1}{2}a(\\Delta t)^2$.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Displacement Kinematic Equation',
              latex: '\\Delta x = v_i \\Delta t + \\frac{1}{2}a\\Delta t^2',
              variables: ['Δx: displacement (m)', 'v_i: initial velocity (m/s)', 'a: acceleration (m/s²)', 'Δt: time (s)']
            }
          ],
          workedExample: {
            problemStatement: 'A vehicle enters an acceleration lane at 12 m/s and accelerates at 2.0 m/s² for 6 seconds. Calculate total distance traveled.',
            pedagogicalSteps: [
              { step: 1, description: 'Substitute knowns into displacement formula', mathematicalForm: '\\Delta x = (12)(6) + \\frac{1}{2}(2.0)(6)^2' },
              { step: 2, description: 'Compute components', mathematicalForm: '\\Delta x = 72 + \\frac{1}{2}(2)(36) = 72 + 36 = 108\\,\\text{meters}' }
            ],
            socraticTeacherTip: 'Remember that only $\\Delta t$ is squared in the second term!'
          },
          africanContext: {
            regionName: 'N1 Highway & Mombasa-Nairobi Highway',
            title: 'Highway Safe Stopping Distances',
            realWorldApplication: 'Road safety engineers calibrate highway overtaking lane lengths based on kinematic displacement equations for loaded freight trucks.'
          },
          keyTakeaways: [
            'Displacement grows quadratically with elapsed time when accelerating.',
            'Initial velocity contributes a linear displacement component ($v_i \\Delta t$).'
          ],
          practiceQuestion: {
            prompt: 'An object starting from rest accelerates at 4 m/s² for 3 seconds. Find its displacement.',
            marks: 3,
            conceptualHint: '$\\Delta x = 0 + \\frac{1}{2}(4)(3)^2 = 2 \\times 9 = 18\\,\\text{meters}$.'
          }
        },
        {
          pageNumber: 3,
          totalPagesInChapter: 3,
          title: 'Section 1.3: The Timeless Torricelli Relation',
          subtitle: 'Velocity-Displacement Relation & Safe Stopping Distance',
          syllabusRef: 'Secondary Physics: Kinematic Equations',
          theorySections: [
            {
              heading: '1. Connecting Velocities Directly to Displacement',
              paragraphs: [
                'When time $\\Delta t$ is neither given nor required, we eliminate time between the first two kinematic equations to yield Torricelli’s relation: $v_f^2 = v_i^2 + 2a\\Delta x$.',
                'This equation demonstrates why doubling vehicle speed quadruples the required braking distance ($d \\propto v^2$), which is foundational to automotive road safety.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Torricelli Kinematic Relation',
              latex: 'v_f^2 = v_i^2 + 2a\\Delta x',
              variables: ['Used when elapsed time Δt is unknown']
            }
          ],
          workedExample: {
            problemStatement: 'A sports car travelling at 30 m/s slams on brakes with deceleration -6.0 m/s². Calculate the stopping distance.',
            pedagogicalSteps: [
              { step: 1, description: 'Set final velocity to zero', mathematicalForm: '0^2 = (30)^2 + 2(-6.0)\\Delta x' },
              { step: 2, description: 'Solve for displacement Δx', mathematicalForm: '0 = 900 - 12\\Delta x \\implies 12\\Delta x = 900 \\implies \\Delta x = 75\\,\\text{meters}' }
            ],
            socraticTeacherTip: 'Deceleration must enter the formula with a negative sign if forward motion is chosen as positive!'
          },
          africanContext: {
            regionName: 'Transnet Freight Rail & Kenya SGR',
            title: 'Locomotive Emergency Braking Distances',
            realWorldApplication: 'A 4,000-ton bulk iron ore train traveling at 80 km/h requires over 1.2 kilometers to stop due to enormous inertia and kinematic constraints.'
          },
          keyTakeaways: [
            'Braking distance quadruples if speed doubles ($v^2$ relationship).',
            'Torricelli relation directly connects velocities, acceleration, and displacement.'
          ],
          practiceQuestion: {
            prompt: 'If an object falls freely under gravity ($g = 9.8\\,\\text{m/s}^2$) from rest through 20 meters, calculate its final velocity.',
            marks: 3,
            conceptualHint: '$v_f^2 = 0 + 2(9.8)(20) = 392 \\implies v_f = \\sqrt{392} \\approx 19.8\\,\\text{m/s}$.'
          }
        }
      ]
    },
    {
      id: `phys-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Newton’s Laws of Motion & Work-Energy',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: Newton’s First, Second & Third Laws of Motion',
          subtitle: 'Inertia, Net Force ($F_{\\text{net}} = ma$) & Action-Reaction Pairs',
          syllabusRef: 'Secondary Physics: Dynamics',
          theorySections: [
            {
              heading: '1. The Governing Laws of Classical Dynamics',
              paragraphs: [
                'Newton’s First Law: An object continues in its state of rest or uniform motion in a straight line unless acted upon by a non-zero resultant net force (Inertia).',
                'Newton’s Second Law: When a resultant net force acts on an object, the object accelerates in the direction of the force with acceleration directly proportional to the force and inversely proportional to mass: $F_{\\text{net}} = ma$.',
                'Newton’s Third Law: When object A exerts a force on object B, object B simultaneously exerts an equal and oppositely directed force on object A ($F_{A \\text{ on } B} = -F_{B \\text{ on } A}$).'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Newton’s Second Law of Motion',
              latex: 'F_{\\text{net}} = ma',
              variables: ['F_net: vector sum of all external forces (N)', 'm: mass (kg)', 'a: acceleration (m/s²)']
            }
          ],
          workedExample: {
            problemStatement: 'A crate of mass 50 kg is pulled across a rough concrete floor by a horizontal force of 250 N. The frictional force opposing motion is 100 N. Calculate acceleration.',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate net horizontal force', mathematicalForm: 'F_{\\text{net}} = F_{\\text{applied}} - F_{\\text{friction}} = 250 - 100 = 150\\,\\text{N}' },
              { step: 2, description: 'Apply Newton’s Second Law', mathematicalForm: 'a = \\frac{F_{\\text{net}}}{m} = \\frac{150}{50} = 3.0\\,\\text{m/s}^2\\text{ in the direction of the pull}' }
            ],
            socraticTeacherTip: 'Always draw a free-body diagram showing all four forces (Normal, Gravity, Applied, Friction) before calculating!'
          },
          africanContext: {
            regionName: 'Underground Mining Hoists on the Witwatersrand',
            title: 'Deep-Level Gold Mine Hoist Cables',
            realWorldApplication: 'Mining engineers at AngloGold Ashanti compute cable tensions using $T - mg = ma$ to safely haul 20-ton skips up 3-kilometer vertical mine shafts.'
          },
          keyTakeaways: [
            'Acceleration occurs only when the vector sum of forces $F_{\\text{net}} \\neq 0$.',
            'Action-reaction force pairs act on two DIFFERENT objects, so they never cancel each other out.'
          ],
          practiceQuestion: {
            prompt: 'A 1,000 kg car accelerates at 2.5 m/s². What net force is acting on it?',
            marks: 2,
            conceptualHint: '$F_{\\text{net}} = 1000 \\times 2.5 = 2,500\\,\\text{N}$.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: The Work-Energy Theorem & Conservation of Mechanical Energy',
          subtitle: 'Kinetic Energy, Gravitational Potential Energy & Net Work Done',
          syllabusRef: 'Secondary Physics: Energy & Momentum',
          theorySections: [
            {
              heading: '1. Work and Energy Transformations',
              paragraphs: [
                'Work is done on an object by a force when the point of application moves through displacement $\\Delta x$: $W = F \\Delta x \\cos \\theta$.',
                'The Work-Energy Theorem states that the net work done on an object by all forces equals the change in its kinetic energy: $W_{\\text{net}} = \\Delta K = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2$. In isolated conservative systems (no friction), mechanical energy is conserved: $E_{\\text{mech}} = K + U = \\text{constant}$.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Work Done by a Constant Force',
              latex: 'W = F \\Delta x \\cos \\theta',
              variables: ['W: work done in Joules (J)', 'θ: angle between force and displacement vectors']
            },
            {
              name: 'The Work-Energy Theorem',
              latex: 'W_{\\text{net}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2',
              variables: ['Relates total external work directly to speed change']
            }
          ],
          workedExample: {
            problemStatement: 'A 2 kg rock falls from rest from a cliff 45 m high. Using conservation of mechanical energy (ignore air friction, $g = 9.8\\,\\text{m/s}^2$), find its speed just before hitting the ground.',
            pedagogicalSteps: [
              { step: 1, description: 'Equate initial potential energy to final kinetic energy', mathematicalForm: 'E_{\\text{initial}} = U_i + K_i = mgh + 0 = (2)(9.8)(45) = 882\\,\\text{J}' },
              { step: 2, description: 'Set final kinetic energy equal to 882 J', mathematicalForm: '\\frac{1}{2}mv_f^2 = 882 \\implies \\frac{1}{2}(2)v_f^2 = 882 \\implies v_f = \\sqrt{882} \\approx 29.7\\,\\text{m/s}' }
            ],
            socraticTeacherTip: 'Notice that mass $m$ cancels out when finding speed: all objects fall at the same rate in the absence of air friction!'
          },
          africanContext: {
            regionName: 'Grand Ethiopian Renaissance Dam (GERD) & Kariba Hydro',
            title: 'Hydroelectric Turbines Energy Conversion',
            realWorldApplication: 'Hydroelectric power stations convert gravitational potential energy of falling reservoir water into mechanical turbine rotation and clean electrical power.'
          },
          keyTakeaways: [
            'Work is a scalar quantity measured in Joules (1 J = 1 N·m).',
            'Friction does negative work, converting mechanical energy into heat.'
          ],
          practiceQuestion: {
            prompt: 'Calculate the kinetic energy of a 60 kg athlete sprinting at 10 m/s.',
            marks: 3,
            conceptualHint: '$K = \\frac{1}{2}(60)(10)^2 = 30 \\times 100 = 3,000\\,\\text{Joules}$.'
          }
        }
      ]
    },
    {
      id: `phys-ch3`,
      chapterNumber: 3,
      term: 2,
      title: 'Chapter 3: Organic Chemistry & Functional Groups',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 3.1: Homologous Series, IUPAC Nomenclature & Isomerism',
          subtitle: 'Alkanes, Alkenes, Haloalkanes, Alcohols & Structural Isomers',
          syllabusRef: 'Secondary Physical Sciences: Organic Chemistry Paper 2',
          theorySections: [
            {
              heading: '1. Organic Molecules and Functional Groups',
              paragraphs: [
                'Organic chemistry is the chemistry of carbon compounds. A homologous series is a family of organic molecules sharing the same functional group, adhering to a general molecular formula, and exhibiting similar chemical properties.',
                'Alkanes are saturated hydrocarbons with single C-C bonds ($C_n H_{2n+2}$); Alkenes contain a reactive carbon-carbon double bond functional group ($C_n H_{2n}$); Alcohols contain the hydroxyl functional group ($-OH$). Structural isomers are compounds having the same molecular formula but different structural arrangements (chain, positional, and functional isomers).'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Write the IUPAC name for $CH_3-CH(CH_3)-CH_2-OH$ and identify its functional group and homologous series.',
            pedagogicalSteps: [
              { step: 1, description: 'Find the longest continuous carbon chain containing the -OH group', mathematicalForm: 'Longest chain has 3 carbons \\implies propane parent chain.' },
              { step: 2, description: 'Number carbons starting from the end closest to the functional group', mathematicalForm: 'Carbon 1 bears the -OH group; Carbon 2 bears the methyl ($-CH_3$) substituent branch.' },
              { step: 3, description: 'Combine prefixes and suffix into IUPAC name', mathematicalForm: 'IUPAC Name: 2-methylpropan-1-ol | Functional Group: Hydroxyl (-OH) | Series: Primary Alcohol' }
            ],
            socraticTeacherTip: 'The functional group always takes numbering priority over alkyl branch substituents!'
          },
          africanContext: {
            regionName: 'Dangote Petroleum Refinery, Lekki & Sasol Secunda',
            title: 'Synthetic Fuels and Petrochemical Refining in Africa',
            realWorldApplication: 'Sasol in South Africa uses the Fischer-Tropsch catalytic process to synthesize liquid hydrocarbons from coal and gas, while the Dangote Refinery in Nigeria refines crude oil into transportation fuels.'
          },
          keyTakeaways: [
            'Saturated hydrocarbons have only single C-C bonds; unsaturated hydrocarbons possess double or triple bonds.',
            'Number the carbon backbone to assign the functional group the lowest possible number.'
          ],
          practiceQuestion: {
            prompt: 'Explain why but-1-ene and but-2-ene are classified as positional isomers.',
            marks: 3,
            conceptualHint: 'Both have molecular formula $C_4 H_8$, but the double bond is on carbon 1 in but-1-ene and carbon 2 in but-2-ene.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 3.2: Esterification, Intermolecular Forces & Boiling Points',
          subtitle: 'Hydrogen Bonding, Carboxylic Acids, Esters & Physical Properties',
          syllabusRef: 'Secondary Physical Sciences: Organic Reactions & Physical Properties',
          theorySections: [
            {
              heading: '1. Esterification Reactions and Intermolecular Forces',
              paragraphs: [
                'An ester is formed when a carboxylic acid reacts with an alcohol in the presence of an inorganic acid catalyst (concentrated $\\text{H}_2\\text{SO}_4$) under reflux: $\\text{Alcohol} + \\text{Carboxylic Acid} \\rightleftharpoons \\text{Ester} + \\text{Water}$. Esters produce sweet, fruity aromas and are widely used in commercial perfumes, flavorings, and solvents.',
                'Boiling points and vapor pressures depend on intermolecular forces: London dispersion forces (weakest, in non-polar alkanes), dipole-dipole forces (polar haloalkanes, esters), and hydrogen bonding (strongest, in alcohols and carboxylic acids). Carboxylic acids form hydrogen-bonded dimers, resulting in the highest boiling points.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Name the ester formed by reacting ethanol with propanoic acid, and write its structural formula.',
            pedagogicalSteps: [
              { step: 1, description: 'Derive the alkyl group from the alcohol', mathematicalForm: 'Ethanol ($CH_3CH_2OH$) provides the ethyl group.' },
              { step: 2, description: 'Derive the carboxylate suffix from the acid', mathematicalForm: 'Propanoic acid ($CH_3CH_2COOH$) becomes propanoate.' },
              { step: 3, description: 'Combine to form the ester name and condensed formula', mathematicalForm: 'Ester Name: Ethyl propanoate | Formula: CH3-CH2-COO-CH2-CH3' }
            ],
            socraticTeacherTip: 'The first word of an ester’s name comes from the alcohol (ethyl); the second word comes from the carboxylic acid (propanoate).'
          },
          africanContext: {
            regionName: 'Essential Oils & Citrus Processing in North and Southern Africa',
            title: 'Essential Oil and Citrus Ester Extraction',
            realWorldApplication: 'Citrus export industries in the Sundays River Valley (South Africa) and Morocco extract fragrant esters for European perfumery and pharmaceutical industries.'
          },
          keyTakeaways: [
            'Stronger intermolecular forces mean higher boiling points and lower vapor pressures.',
            'Carboxylic acids form two hydrogen bonds per dimer, giving them higher boiling points than alcohols of similar molar mass.'
          ],
          practiceQuestion: {
            prompt: 'Explain why ethanol ($C_2H_5OH$) has a much higher boiling point than propane ($C_3H_8$) of comparable molar mass.',
            marks: 3,
            conceptualHint: 'Ethanol has strong intermolecular hydrogen bonds; propane has only weak London dispersion forces.'
          }
        }
      ]
    }
  ];

  return {
    id: `tb-phys-${country}`,
    subjectId: `${country.toLowerCase()}-phys`,
    subjectName: 'Physical Sciences',
    title: `Secondary Physical Sciences (Physics & Chemistry) (${country})`,
    authorOrMinistry: `${country} Department of Basic Education`,
    curriculumCode: country === 'ZA' ? 'CAPS' : country === 'NG' ? 'WAEC' : 'National Syllabus',
    isbn: '978-0-19-074981-2',
    grade,
    totalPages: 36,
    chapters
  };
}

// Chemistry
export function buildChemistryTextbook(country: CountryCode, grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `chem-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: Atomic Structure, Chemical Bonding & Periodicity',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 1.1: Electronic Configurations & Periodic Trends',
          subtitle: 'Aufbau Principle, Ionization Energy & Electronegativity Gradients',
          syllabusRef: 'Secondary Chemistry: Atomic Structure',
          theorySections: [
            {
              heading: '1. Electronic Orbitals and Periodic Law',
              paragraphs: [
                'Atoms consist of a dense, positively charged nucleus surrounded by electrons organized in quantum energy levels (s, p, d, f subshells). The Aufbau Principle, Hund’s Rule, and Pauli Exclusion Principle dictate orbital filling.',
                'Periodic trends govern chemical reactivity: Atomic radius decreases across a period (due to increasing nuclear charge pulling electrons inward) and increases down a group. Electronegativity and First Ionization Energy increase across a period and decrease down a group.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Write the sp-notation electronic configuration for Sulfur (atomic number Z = 16) and explain why its first ionization energy is slightly lower than Phosphorus (Z = 15).',
            pedagogicalSteps: [
              { step: 1, description: 'Write electronic configuration for Sulfur', mathematicalForm: '1s^2\\, 2s^2\\, 2p^6\\, 3s^2\\, 3p^4' },
              { step: 2, description: 'Compare 3p subshells of P and S', mathematicalForm: 'Phosphorus has a stable, half-filled 3p³ subshell ($3p_x^1 3p_y^1 3p_z^1$). Sulfur has paired electrons in one 3p orbital ($3p_x^2 3p_y^1 3p_z^1$).' },
              { step: 3, description: 'Explain electron-electron repulsion', mathematicalForm: 'Inter-electron repulsion between paired electrons in the same 3p orbital makes removing one electron easier, lowering Sulfur’s ionization energy.' }
            ],
            socraticTeacherTip: 'Look out for anomalies across Period 3: half-filled and fully filled subshells possess extra quantum exchange stability!'
          },
          africanContext: {
            regionName: 'Copperbelt of Zambia & DR Congo',
            title: 'Transition Metal Metallurgy in the Central African Copperbelt',
            realWorldApplication: 'Smelters and electrowinning refineries in Ndola and Kolwezi exploit transition metal d-orbital chemistry to extract pure cathode copper.'
          },
          keyTakeaways: [
            'Electronegativity increases across a period from left to right.',
            'Half-filled and completely filled subshells confer anomalous quantum stability.'
          ],
          practiceQuestion: {
            prompt: 'Explain why Chlorine has a higher electronegativity than Sodium.',
            marks: 3,
            conceptualHint: 'Higher effective nuclear charge (17 protons vs 11 protons) with same electron shielding.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 1.2: Ionic, Covalent & Metallic Bonding',
          subtitle: 'Lewis Dot Structures, VSEPR Molecular Geometry & Polarity',
          syllabusRef: 'Secondary Chemistry: Chemical Bonding',
          theorySections: [
            {
              heading: '1. Driving Force of Chemical Bond Formation',
              paragraphs: [
                'Atoms bond to achieve stable noble-gas electronic octets. Ionic bonding occurs between metals and non-metals via electrostatic attraction between transferred cations and anions (e.g. $\\text{NaCl}$).',
                'Covalent bonding involves shared electron pairs between non-metal atoms. Valence Shell Electron Pair Repulsion (VSEPR) theory predicts 3D molecular geometry based on repelling valence electron pairs (linear, trigonal planar, tetrahedral, pyramidal, bent).'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Draw the Lewis dot structure and predict the molecular shape and polarity of water ($H_2O$).',
            pedagogicalSteps: [
              { step: 1, description: 'Count total valence electrons', mathematicalForm: 'Oxygen (6) + 2 \\times Hydrogen (1) = 8\\,\\text{valence electrons (4 pairs)}' },
              { step: 2, description: 'Determine electron geometry and molecular shape', mathematicalForm: '2 bonding pairs and 2 lone pairs on central oxygen \\implies Bent / V-shaped geometry (angle $\\approx 104.5^\\circ$)' },
              { step: 3, description: 'Analyze dipole moments and molecular polarity', mathematicalForm: 'Bond dipoles (O-H) do not cancel out due to asymmetrical bent shape \\implies Polar molecule.' }
            ],
            socraticTeacherTip: 'Lone pairs exert stronger electrostatic repulsion than bonding pairs, compressing the tetrahedral 109.5° angle down to 104.5° in water!'
          },
          africanContext: {
            regionName: 'Potash and Salt Deposits of Danakil Depression, Ethiopia',
            title: 'Ionic Crystal Lattices in African Salt Lakes',
            realWorldApplication: 'Afar miners harvest giant halite ($NaCl$) ionic crystal slabs formed by millennia of natural solar evaporation in the Ethiopian Rift Valley.'
          },
          keyTakeaways: [
            'Lone pairs compress bond angles more than bonding pairs.',
            'Asymmetrical molecular geometry results in a net dipole moment (polar molecule).'
          ],
          practiceQuestion: {
            prompt: 'Why is carbon dioxide ($CO_2$) non-polar despite having polar $C=O$ double bonds?',
            marks: 3,
            conceptualHint: 'Linear geometry ($180^\\circ$) causes equal and opposite bond dipoles to cancel each other out.'
          }
        }
      ]
    },
    {
      id: `chem-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Stoichiometry & Quantitative Chemistry',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: The Mole Concept, Molar Mass & Empirical Formula',
          subtitle: 'Avogadro’s Constant ($6.022 \\times 10^{23}$), Percentage Composition & Molar Gas Volume',
          syllabusRef: 'Secondary Chemistry: Quantitative Stoichiometry',
          theorySections: [
            {
              heading: '1. The Mole: The Chemist’s Counting Unit',
              paragraphs: [
                'One mole is the amount of substance containing exactly $6.022 \\times 10^{23}$ elementary particles (Avogadro’s number $N_A$).',
                'The number of moles $n$ relates to mass $m$ and molar mass $M$ via $n = \\frac{m}{M}$. For gases at standard temperature and pressure (STP: 0°C, 101.3 kPa), one mole of any ideal gas occupies a molar volume of $V_m = 22.4\\,\\text{dm}^3\\text{ (or } 24\\,\\text{dm}^3\\text{ at RTP)}$.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Mole-Mass Relationship',
              latex: 'n = \\frac{m}{M}',
              variables: ['n: moles (mol)', 'm: mass (g)', 'M: molar mass (g/mol)']
            },
            {
              name: 'Molar Gas Volume at STP',
              latex: 'n = \\frac{V}{V_m}',
              variables: ['V: gas volume (dm³)', 'V_m: 22.4 dm³/mol at STP']
            }
          ],
          workedExample: {
            problemStatement: 'Calculate the volume of carbon dioxide gas produced at STP when 25.0 g of calcium carbonate ($\\text{CaCO}_3$, $M = 100\\,\\text{g/mol}$) reacts completely with excess hydrochloric acid: $\\text{CaCO}_3 + 2\\text{HCl} \\to \\text{CaCl}_2 + \\text{CO}_2 + \\text{H}_2\\text{O}$.',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate moles of calcium carbonate reacted', mathematicalForm: 'n(\\text{CaCO}_3) = \\frac{m}{M} = \\frac{25.0}{100.0} = 0.250\\,\\text{mol}' },
              { step: 2, description: 'Use stoichiometric mole ratio from equation', mathematicalForm: '1\\,\\text{mol CaCO}_3 : 1\\,\\text{mol CO}_2 \\implies n(\\text{CO}_2) = 0.250\\,\\text{mol}' },
              { step: 3, description: 'Calculate gas volume at STP (22.4 dm³/mol)', mathematicalForm: 'V = n \\times V_m = 0.250 \\times 22.4 = 5.60\\,\\text{dm}^3\\; (5,600\\,\\text{cm}^3)' }
            ],
            socraticTeacherTip: 'Always convert units! $1\\,\\text{dm}^3 = 1\\,\\text{liter} = 1,000\\,\\text{cm}^3$.'
          },
          africanContext: {
            regionName: 'Phosphate Mining in OCP Morocco & Togo',
            title: 'Industrial Fertilizer Synthesis at OCP Morocco',
            realWorldApplication: 'The OCP Group in Morocco calculates exact stoichiometric acid-to-rock ratios to manufacture millions of tons of diammonium phosphate (DAP) fertilizer for African agriculture.'
          },
          keyTakeaways: [
            '$n = m/M$ is the bridge connecting laboratory grams to molecular mole ratios.',
            'One mole of any gas at STP occupies $22.4\\,\\text{dm}^3$.'
          ],
          practiceQuestion: {
            prompt: 'How many moles are present in 44 g of carbon dioxide ($CO_2$, $M = 44\\,\\text{g/mol}$)?',
            marks: 2,
            conceptualHint: '$n = 44 / 44 = 1.0\\,\\text{mol}$.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: Solution Concentration & Volumetric Titrations',
          subtitle: 'Molarity ($c = n/V$), Standard Solutions & Acid-Base Neutralization',
          syllabusRef: 'Secondary Chemistry: Volumetric Analysis',
          theorySections: [
            {
              heading: '1. Aqueous Solution Stoichiometry and Titrations',
              paragraphs: [
                'Concentration $c$ (molarity) is the amount of solute in moles dissolved per cubic decimeter of solution: $c = \\frac{n}{V} = \\frac{m}{M \\cdot V}$.',
                'In volumetric acid-base titrations, a solution of known concentration (standard solution) is neutralized against an analyte of unknown concentration using an indicator. At the equivalence point, stoichiometric moles of acid neutralize moles of base: $\\frac{c_a V_a}{c_b V_b} = \\frac{a}{b}$.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Molar Concentration Formula',
              latex: 'c = \\frac{n}{V} = \\frac{m}{M \\cdot V}',
              variables: ['c: concentration (mol/dm³)', 'V: volume (dm³)', 'm: mass (g)']
            },
            {
              name: 'Titration Neutralization Formula',
              latex: '\\frac{c_a V_a}{c_b V_b} = \\frac{n_a}{n_b}',
              variables: ['a: acid', 'b: base', 'n_a/n_b: stoichiometric coefficients']
            }
          ],
          workedExample: {
            problemStatement: 'In a titration, $25.0\\,\\text{cm}^3$ of $0.100\\,\\text{mol/dm}^3\\; \\text{NaOH}$ neutralizes exactly $20.0\\,\\text{cm}^3$ of hydrochloric acid: $\\text{HCl} + \\text{NaOH} \\to \\text{NaCl} + \\text{H}_2\\text{O}$. Calculate the acid concentration.',
            pedagogicalSteps: [
              { step: 1, description: 'Calculate moles of NaOH base used', mathematicalForm: 'n_b = c_b \\times V_b = 0.100 \\times 0.0250 = 0.00250\\,\\text{mol}' },
              { step: 2, description: 'Use 1:1 mole ratio to find moles of acid', mathematicalForm: 'n_a = n_b = 0.00250\\,\\text{mol HCl}' },
              { step: 3, description: 'Compute concentration of HCl', mathematicalForm: 'c_a = \\frac{n_a}{V_a} = \\frac{0.00250}{0.0200} = 0.125\\,\\text{mol/dm}^3' }
            ],
            socraticTeacherTip: 'Remember to convert volume from $\\text{cm}^3$ to $\\text{dm}^3$ by dividing by 1,000 before computing concentration!'
          },
          africanContext: {
            regionName: 'Quality Control Labs of African Breweries & Dairies',
            title: 'Food Science & Acidity Control',
            realWorldApplication: 'Quality assurance chemists at beverage and dairy plants across Africa perform daily titrations to verify titratable acidity levels in fruit juices and milk.'
          },
          keyTakeaways: [
            '$c = n / V$: concentration depends on moles per unit volume ($1\\,\\text{dm}^3 = 1\\,\\text{L}$).',
            'The equivalence point is reached when stoichiometric moles of acid equal moles of base.'
          ],
          practiceQuestion: {
            prompt: 'Calculate the concentration of a solution prepared by dissolving 4.0 g of NaOH ($M = 40\\,\\text{g/mol}$) in $500\\,\\text{cm}^3$ of water.',
            marks: 3,
            conceptualHint: '$n = 4/40 = 0.1\\,\\text{mol}$. $V = 0.5\\,\\text{dm}^3$. $c = 0.1 / 0.5 = 0.20\\,\\text{mol/dm}^3$.'
          }
        }
      ]
    },
    {
      id: `chem-ch3`,
      chapterNumber: 3,
      term: 2,
      title: 'Chapter 3: Reaction Rates & Chemical Equilibrium',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 3.1: Collision Theory & Factors Affecting Reaction Rates',
          subtitle: 'Activation Energy, Maxwell-Boltzmann Distribution & Catalysis',
          syllabusRef: 'Secondary Chemistry: Reaction Kinetics',
          theorySections: [
            {
              heading: '1. Collision Theory of Chemical Reactions',
              paragraphs: [
                'According to Collision Theory, a chemical reaction occurs only when reactant particles collide with sufficient kinetic energy equal to or greater than the Activation Energy ($E_a$), and with the correct spatial orientation.',
                'Reaction rates increase with: 1. Higher concentration (more particles per unit volume); 2. Increased temperature (particles move faster and a greater fraction exceed $E_a$); 3. Larger surface area; 4. Catalysts, which provide an alternative reaction pathway with lower activation energy without being consumed.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Explain, using the Maxwell-Boltzmann distribution curve, why a modest $10^\\circ\\text{C}$ temperature increase can double the rate of a chemical reaction.',
            pedagogicalSteps: [
              { step: 1, description: 'Analyze curve shift with temperature', mathematicalForm: 'Higher temperature flattens and broadens the curve to the right, increasing average molecular kinetic energy.' },
              { step: 2, description: 'Examine the population exceeding Activation Energy', mathematicalForm: 'The area under the curve to the right of $E_a$ roughly doubles, meaning twice as many collisions possess energy $\\ge E_a$ per second.' },
              { step: 3, description: 'Conclude impact on effective collision frequency', mathematicalForm: 'The frequency of effective, reaction-producing collisions doubles, doubling the overall reaction rate.' }
            ],
            socraticTeacherTip: 'A catalyst does NOT increase the kinetic energy of particles! It simply lowers the required Activation Energy hurdle.'
          },
          africanContext: {
            regionName: 'Haber-Bosch Ammonia Plants in North Africa',
            title: 'Industrial Ammonia Synthesis Catalysts',
            realWorldApplication: 'Mega-fertilizer plants in Egypt and Algeria use porous iron catalysts ($Fe_3O_4$) at 450°C and 200 atm to accelerate the synthesis of ammonia from atmospheric nitrogen.'
          },
          keyTakeaways: [
            'Collisions must have energy $\\ge E_a$ and correct spatial alignment to produce reactions.',
            'Catalysts lower activation energy without shifting equilibrium position.'
          ],
          practiceQuestion: {
            prompt: 'Explain how grinding a solid reactant into a fine powder increases its reaction rate.',
            marks: 3,
            conceptualHint: 'Dramatically increases accessible surface area, multiplying the number of exposed collision sites per second.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 3.2: Dynamic Chemical Equilibrium & Le Chatelier’s Principle',
          subtitle: 'The Equilibrium Constant ($K_c$), Temperature, Pressure & Concentration Shifts',
          syllabusRef: 'Secondary Chemistry: Chemical Equilibrium',
          theorySections: [
            {
              heading: '1. Dynamic Equilibrium and Le Chatelier’s Principle',
              paragraphs: [
                'In a closed system, a reversible reaction reaches dynamic equilibrium when the rate of the forward reaction equals the rate of the reverse reaction, and the concentrations of reactants and products remain constant.',
                'Le Chatelier’s Principle states that when an external stress (change in concentration, temperature, or pressure) is applied to an equilibrium system, the system shifts its equilibrium position to counteract the disturbance.',
                'The Equilibrium Constant $K_c$ is temperature-dependent: for $aA + bB \\rightleftharpoons cC + dD$, $K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}$.'
              ]
            }
          ],
          keyFormulas: [
            {
              name: 'Equilibrium Constant Expression',
              latex: 'K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}',
              variables: ['Square brackets denote equilibrium concentrations (mol/dm³)', 'Solids and pure liquids are omitted']
            }
          ],
          workedExample: {
            problemStatement: 'Consider the exothermic Haber process: $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g) \\quad (\\Delta H = -92\\,\\text{kJ/mol})$. Predict the effect of: 1. Increasing pressure; 2. Increasing temperature.',
            pedagogicalSteps: [
              { step: 1, description: 'Analyze effect of pressure increase', mathematicalForm: 'Left side has 4 moles of gas ($1N_2 + 3H_2$); right side has 2 moles ($2NH_3$). System shifts forward toward fewer gas moles to relieve pressure, increasing $NH_3$ yield.' },
              { step: 2, description: 'Analyze effect of temperature increase', mathematicalForm: 'Reaction is exothermic forward (releases heat). Adding heat shifts equilibrium in the endothermic reverse direction, decreasing $NH_3$ yield and decreasing $K_c$.' }
            ],
            socraticTeacherTip: 'Remember: ONLY temperature changes can change the numerical value of $K_c$! Changes in pressure or concentration shift equilibrium position, but $K_c$ remains constant.'
          },
          africanContext: {
            regionName: 'Contact Process Sulphuric Acid Plants in South Africa',
            title: 'Sulphuric Acid Synthesis for Mineral Leaching',
            realWorldApplication: 'Industrial chemical plants in Mpumalanga optimize temperature (450°C) and vanadium pentoxide ($V_2O_5$) catalysts to produce sulphuric acid required for uranium and nickel extraction.'
          },
          keyTakeaways: [
            'Increasing pressure shifts equilibrium toward the side with fewer moles of gas.',
            'Only temperature changes alter the equilibrium constant $K_c$.'
          ],
          practiceQuestion: {
            prompt: 'Explain why adding a catalyst does not alter the numerical value of the equilibrium constant $K_c$.',
            marks: 3,
            conceptualHint: 'A catalyst speeds up both forward and reverse reaction rates by the exact same proportion.'
          }
        }
      ]
    }
  ];

  return {
    id: `tb-chem-${country}`,
    subjectId: `${country.toLowerCase()}-chem`,
    subjectName: 'Chemistry',
    title: `Secondary Chemistry: Theory & Stoichiometry (${country} Syllabus)`,
    authorOrMinistry: `${country} National Examinations Board`,
    curriculumCode: country === 'ZA' ? 'CAPS' : country === 'NG' ? 'WAEC' : 'National Syllabus',
    isbn: '978-0-19-074811-9',
    grade,
    totalPages: 36,
    chapters
  };
}

// Biology / Life Sciences
export function buildBiologyTextbook(country: CountryCode, grade: string): Textbook {
  const chapters: Chapter[] = [
    {
      id: `bio-ch1`,
      chapterNumber: 1,
      term: 1,
      title: 'Chapter 1: Nucleic Acids & The DNA Code of Life',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 1.1: DNA Structure & Semi-Conservative Replication',
          subtitle: 'Nucleotides, Complementary Base Pairing & The Double Helix',
          syllabusRef: 'Secondary Life Sciences: Molecular Genetics Paper 2',
          theorySections: [
            {
              heading: '1. The Molecular Architecture of DNA',
              paragraphs: [
                'Deoxyribonucleic acid (DNA) is the molecular blueprint of heredity in all living organisms. DNA is an anti-parallel double helix composed of repeating nucleotide subunits: a deoxyribose sugar, a phosphate group, and one of four nitrogenous bases: Adenine (A), Thymine (T), Guanine (G), and Cytosine (C).',
                'Complementary base pairing dictates that Adenine pairs with Thymine via two hydrogen bonds ($A = T$), while Guanine pairs with Cytosine via three hydrogen bonds ($G \\equiv C$). During interphase, DNA replicates semi-conservatively: the double helix unzips, and each original strand serves as a template for a newly synthesized daughter strand.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'If a DNA sample contains 28% Cytosine, calculate the percentages of Guanine, Adenine, and Thymine using Chargaff’s Rules.',
            pedagogicalSteps: [
              { step: 1, description: 'Apply complementary base pairing for Guanine', mathematicalForm: '\\% Cytosine = \\% Guanine \\implies \\% G = 28\\%' },
              { step: 2, description: 'Find the remaining percentage for A + T', mathematicalForm: '100\\% - (28\\% + 28\\%) = 100\\% - 56\\% = 44\\%' },
              { step: 3, description: 'Divide equally between Adenine and Thymine', mathematicalForm: '\\% Adenine = \\% Thymine = \\frac{44\\%}{2} = 22\\%\\text{ each}' }
            ],
            socraticTeacherTip: 'Chargaff’s rule: In double-stranded DNA, $\%A = \%T$ and $\%G = \%C$, summing to 100%.'
          },
          africanContext: {
            regionName: 'Cradle of Humankind, Sterkfontein, South Africa',
            title: 'Paleo-Genetics and Ancient Hominin Fossils',
            realWorldApplication: 'Scientists at Wits University extract ancient DNA from fossilized hominin remains at the Cradle of Humankind to reconstruct human evolutionary origins.'
          },
          keyTakeaways: [
            'DNA is a double-stranded anti-parallel helix with complementary hydrogen bonding ($A=T, G\\equiv C$).',
            'Semi-conservative replication preserves genetic fidelity across cell divisions.'
          ],
          practiceQuestion: {
            prompt: 'State the complementary DNA strand for: 5\'- A-T-G-C-C-A-T-T -3\'.',
            marks: 2,
            conceptualHint: '3\'- T-A-C-G-G-T-A-A -5\'.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 1.2: Protein Synthesis (Transcription & Translation)',
          subtitle: 'mRNA Codons, tRNA Anti-Codons & Ribosomal Peptide Synthesis',
          syllabusRef: 'Secondary Life Sciences: Protein Synthesis',
          theorySections: [
            {
              heading: '1. The Central Dogma of Molecular Biology',
              paragraphs: [
                'Genetic information flows from DNA to RNA to functional protein. During transcription in the nucleus, RNA polymerase transcribes a gene into messenger RNA (mRNA), replacing thymine with Uracil (U).',
                'During translation in the cytoplasm, the mRNA attaches to a ribosome. Transfer RNA (tRNA) molecules bearing specific amino acids bind their triplet anticodons to matching mRNA codons, linking amino acids into a polypeptide chain.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'A DNA template triplet is 3\'- T-A-C -5\'. Determine the mRNA codon, the tRNA anticodon, and the resulting amino acid.',
            pedagogicalSteps: [
              { step: 1, description: 'Transcribe DNA to mRNA codon', mathematicalForm: 'DNA 3\'- TAC -5\' transcribes to mRNA 5\'- AUG -3\'.' },
              { step: 2, description: 'Find matching tRNA anticodon', mathematicalForm: 'mRNA 5\'- AUG -3\' pairs with tRNA 3\'- UAC -5\'.' },
              { step: 3, description: 'Identify coded amino acid', mathematicalForm: 'AUG is the universal start codon coding for the amino acid Methionine.' }
            ],
            socraticTeacherTip: 'Remember: RNA contains Uracil (U) instead of Thymine (T)! Never write Thymine on an mRNA or tRNA strand.'
          },
          africanContext: {
            regionName: 'Sickle Cell Disease Research in West Africa',
            title: 'Genetic Mutations and Malaria Resistance',
            realWorldApplication: 'A single point mutation substituting valine for glutamic acid in hemoglobin causes sickle cell trait, conferring natural biological immunity against falciparum malaria in West Africa.'
          },
          keyTakeaways: [
            'Transcription occurs in the nucleus; Translation takes place on ribosomes in the cytoplasm.',
            'Codons consist of three consecutive nitrogenous bases on mRNA.'
          ],
          practiceQuestion: {
            prompt: 'Explain what happens if a point mutation alters a single base in a protein-coding gene.',
            marks: 3,
            conceptualHint: 'Can alter the codon, potentially inserting a different amino acid and altering the 3D protein structure (or creating a silent mutation).'
          }
        }
      ]
    },
    {
      id: `bio-ch2`,
      chapterNumber: 2,
      term: 1,
      title: 'Chapter 2: Genetics, Inheritance & Meiotic Division',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 2.1: Meiosis & Sources of Genetic Variation',
          subtitle: 'Crossing Over in Prophase I, Independent Assortment & Non-Disjunction',
          syllabusRef: 'Secondary Life Sciences: Cellular Genetics',
          theorySections: [
            {
              heading: '1. Reduction Division and Recombination',
              paragraphs: [
                'Meiosis is a reduction division reducing the diploid ($2n$) chromosome number to haploid ($n$) gametes (sperm and egg), preventing chromosome doubling upon fertilization.',
                'Genetic variation is generated through: 1. Crossing over (chiasmata formation in Prophase I swapping genetic segments between non-sister homologous chromatids); 2. Random independent assortment of chromosomes at Metaphase I and II; 3. Random fertilization.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Explain the genetic consequences if non-disjunction of chromosome pair 21 occurs during anaphase I of human oogenesis.',
            pedagogicalSteps: [
              { step: 1, description: 'Define non-disjunction', mathematicalForm: 'Failure of homologous chromosome pair 21 to separate during Anaphase I.' },
              { step: 2, description: 'Examine resulting gametes', mathematicalForm: 'Produces gametes with an extra chromosome ($n + 1 = 24$) and gametes missing a chromosome ($n - 1 = 22$).' },
              { step: 3, description: 'State developmental outcome upon fertilization', mathematicalForm: 'Fertilization by a normal sperm ($n = 23$) results in Trisomy 21 ($2n + 1 = 47$), clinically manifesting as Down syndrome.' }
            ],
            socraticTeacherTip: 'Non-disjunction can occur in Anaphase I (homologous chromosomes fail to separate) or Anaphase II (sister chromatids fail to separate).'
          },
          africanContext: {
            regionName: 'Biodiversity Hotspots of the Cape Floral Kingdom (Fynbos)',
            title: 'Genetic Diversity in Endemic African Flora',
            realWorldApplication: 'Botanists at Kirstenbosch Botanical Gardens study meiotic crossing over to preserve over 9,000 endemic species in the Cape Floral biodiversity hotspot.'
          },
          keyTakeaways: [
            'Meiosis reduces diploid $2n$ cells into four genetically unique haploid $n$ gametes.',
            'Crossing over during Prophase I breaks linkage groups to maximize genetic diversity.'
          ],
          practiceQuestion: {
            prompt: 'State two biological differences between Mitosis and Meiosis.',
            marks: 2,
            conceptualHint: 'Mitosis produces two genetically identical diploid cells; Meiosis produces four genetically diverse haploid gametes.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 2.2: Mendelian Monohybrid Crosses & Pedigree Diagrams',
          subtitle: 'Dominant vs Recessive Alleles, Punnett Squares & Sex-Linked Traits',
          syllabusRef: 'Secondary Life Sciences: Mendelian Genetics',
          theorySections: [
            {
              heading: '1. Principles of Mendelian Inheritance',
              paragraphs: [
                'Gregor Mendel established the Law of Segregation: alleles segregate during gamete formation so each gamete carries only one allele for each gene. Phenotype is the physical expression of a trait; Genotype is the genetic makeup.',
                'A monohybrid cross between two heterozygous individuals ($Bb \\times Bb$) produces a phenotypic ratio of 3 dominant : 1 recessive, and a genotypic ratio of 1 BB : 2 Bb : 1 bb.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'In humans, albinism is an autosomal recessive condition ($a$). Two normally pigmented parents have an albino child. What is the probability that their next child will be albino?',
            pedagogicalSteps: [
              { step: 1, description: 'Determine parental genotypes', mathematicalForm: 'Since both parents are normal but produced an albino child ($aa$), both parents must be heterozygous carriers ($Aa \\times Aa$).' },
              { step: 2, description: 'Construct Punnett square', mathematicalForm: 'Gametes: A, a \\times A, a \\implies \\text{Genotypes: } 1\\,AA : 2\\,Aa : 1\\,aa' },
              { step: 3, description: 'State probability of albino offspring', mathematicalForm: 'Probability of $aa$ is $\\frac{1}{4}$ or 25% for each pregnancy.' }
            ],
            socraticTeacherTip: 'Each pregnancy is an independent genetic event: having one albino child does not change the 25% probability for the next child!'
          },
          africanContext: {
            regionName: 'Albinism Advocacy and Genetic Counseling in Africa',
            title: 'Genetic Counseling and Sun Protection',
            realWorldApplication: 'Genetic counselors in Tanzania and Malawi educate communities about the autosomal recessive nature of albinism to eliminate harmful social myths.'
          },
          keyTakeaways: [
            'Recessive traits are expressed only in the homozygous recessive condition ($aa$).',
            'Constructing Punnett squares provides precise probability ratios for offspring phenotypes.'
          ],
          practiceQuestion: {
            prompt: 'In pea plants, tall ($T$) is dominant over short ($t$). Cross a homozygous tall plant with a short plant and give the F1 phenotype.',
            marks: 3,
            conceptualHint: '$TT \\times tt \\implies$ all offspring are heterozygous $Tt$ and phenotypically 100% tall.'
          }
        }
      ]
    },
    {
      id: `bio-ch3`,
      chapterNumber: 3,
      term: 2,
      title: 'Chapter 3: Plant Water Transport & Human Homeostasis',
      pages: [
        {
          pageNumber: 1,
          totalPagesInChapter: 2,
          title: 'Section 3.1: Transpiration & Xylem Water Transport',
          subtitle: 'Stomatal Regulation, Cohesion-Tension Theory & Xylem Vessels',
          syllabusRef: 'Secondary Life Sciences: Plant Physiology',
          theorySections: [
            {
              heading: '1. Ascent of Sap through Cohesion-Tension',
              paragraphs: [
                'Transpiration is the evaporative loss of water vapor through the stomata of plant leaves. This evaporation generates negative hydrostatic tension in the mesophyll cell walls, pulling water upward through xylem vessels.',
                'The Cohesion-Tension Theory explains the continuous water column: water molecules stick to each other via strong hydrogen bonds (cohesion) and adhere to hydrophilic xylem cellulose walls (adhesion).'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Explain how Baobab and Acacia trees regulate transpiration during severe African drought conditions.',
            pedagogicalSteps: [
              { step: 1, description: 'Examine stomatal physiological response', mathematicalForm: 'Guard cells pump potassium ions ($K^+$) outward, losing turgor pressure and closing stomata to halt water vapor loss.' },
              { step: 2, description: 'Examine morphological adaptations', mathematicalForm: 'Acacia trees possess reduced leaf surface area (pinnate thorns) and sunken stomata covered by thick waxy cuticles that reduce evaporative surface exposure.' }
            ],
            socraticTeacherTip: 'When humidity is high, the water vapor concentration gradient between the leaf and atmosphere decreases, slowing the transpiration rate.'
          },
          africanContext: {
            regionName: 'Xerophytic Flora of the Namib & Karoo Deserts',
            title: 'Drought Adaptations of Welwitschia and Succulents',
            realWorldApplication: 'Desert plants in the Namib Desert absorb coastal fog condensation through specialized leaf structures, surviving with less than 20 mm of annual rainfall.'
          },
          keyTakeaways: [
            'Transpiration pull powers the ascent of water and dissolved minerals from root to crown.',
            'Cohesion binds water molecules together; adhesion binds water to xylem vessel walls.'
          ],
          practiceQuestion: {
            prompt: 'State two environmental factors that increase the rate of transpiration in green plants.',
            marks: 2,
            conceptualHint: 'High temperature, high wind speed, bright sunlight, or low relative atmospheric humidity.'
          }
        },
        {
          pageNumber: 2,
          totalPagesInChapter: 2,
          title: 'Section 3.2: Human Homeostasis & Negative Feedback Loops',
          subtitle: 'Thermoregulation, Osmoregulation (ADH) & Blood Glucose Control (Insulin)',
          syllabusRef: 'Secondary Life Sciences: Human Homeostasis',
          theorySections: [
            {
              heading: '1. Maintaining Internal Physiological Equilibrium',
              paragraphs: [
                'Homeostasis is the physiological maintenance of a dynamic, constant internal environment within narrow tolerances despite external environmental fluctuations.',
                'Negative feedback loops operate through receptors, control centers, and effectors: When blood glucose rises after a meal, beta cells in the pancreatic islets of Langerhans secrete insulin, stimulating liver and muscle cells to absorb glucose and store it as glycogen. When blood glucose drops, alpha cells secrete glucagon, converting glycogen back into free glucose.'
              ]
            }
          ],
          workedExample: {
            problemStatement: 'Explain the homeostatic osmoregulation loop when a marathon runner becomes dehydrated on a hot afternoon.',
            pedagogicalSteps: [
              { step: 1, description: 'Detect osmolarity change', mathematicalForm: 'Osmoreceptors in the hypothalamus detect increased blood solute concentration (high osmolarity).' },
              { step: 2, description: 'Release hormone', mathematicalForm: 'The posterior pituitary gland releases Antidiuretic Hormone (ADH) into the bloodstream.' },
              { step: 3, description: 'Act on kidney effectors', mathematicalForm: 'ADH increases water permeability of the distal convoluted tubules and collecting ducts, reabsorbing water into the blood and producing concentrated, low-volume urine.' }
            ],
            socraticTeacherTip: 'Remember: Negative feedback acts to OPPOSITE the initial disturbance, restoring the body to the homeostatic set point.'
          },
          africanContext: {
            regionName: 'High-Altitude Marathon Training in Iten, Kenya',
            title: 'Athletic Homeostasis and Erythropoietin (EPO)',
            realWorldApplication: 'Elite endurance athletes training at high altitudes (2,400 m) in Iten stimulate kidney secretion of erythropoietin (EPO), raising red blood cell counts and oxygen-carrying capacity.'
          },
          keyTakeaways: [
            'Insulin lowers blood glucose; glucagon raises blood glucose.',
            'ADH promotes water reabsorption in the kidneys to preserve blood volume during dehydration.'
          ],
          practiceQuestion: {
            prompt: 'Explain how the human skin responds homeostatically when body temperature rises above 37°C.',
            marks: 3,
            conceptualHint: 'Vasodilation of surface capillaries radiates heat; sweat glands secrete sweat which cools the skin upon evaporation.'
          }
        }
      ]
    }
  ];

  return {
    id: `tb-bio-${country}`,
    subjectId: `${country.toLowerCase()}-bio`,
    subjectName: 'Life Sciences (Biology)',
    title: `Secondary Life Sciences & Genetics (${country} Syllabus)`,
    authorOrMinistry: `${country} Department of Basic Education`,
    curriculumCode: country === 'ZA' ? 'CAPS' : country === 'NG' ? 'WAEC' : 'National Syllabus',
    isbn: '978-0-19-074900-3',
    grade,
    totalPages: 36,
    chapters
  };
}








