export interface SampleScan {
  id: string;
  title: string;
  curriculum: string;
  gradeLevel: number;
  subject: string;
  thumbnailBadge: string;
  description: string;
  sampleImageUrl: string;
  simulatedExtraction: {
    extractedText: string;
    extractedFormulas: string[];
    conceptLabel: string;
    syllabusTopic: string;
    learningObjective: string;
    initialSocraticGuidance: string;
    difficultyLevel: string;
  };
}

export const SAMPLE_PHYSICAL_SCANS: SampleScan[] = [
  {
    id: 'scan_chem_ester',
    title: 'Physical Sciences P2 (Organic Chemistry Experiment)',
    curriculum: 'CAPS NSC / ZIMSEC OER',
    gradeLevel: 11,
    subject: 'Chemistry',
    thumbnailBadge: 'Textbook Page 142',
    description: 'Esterification reaction between ethanol and ethanoic acid in a water bath with concentrated H2SO4 catalyst.',
    sampleImageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    simulatedExtraction: {
      extractedText: 'Activity 4.3: In a dry test tube, mix 2 cm³ of ethanol with 2 cm³ of ethanoic acid. Carefully add 4 drops of concentrated sulfuric acid (H₂SO₄). Heat in a water bath at 60°C for 10 minutes. Pour the contents into a beaker containing sodium carbonate solution. Notice the sweet fruity scent of ethyl ethanoate.\n\nQuestion: Explain why concentrated sulfuric acid is essential for this reaction and write down the full IUPAC equation.',
      extractedFormulas: [
        'CH_3COOH + CH_3CH_2OH \\xrightarrow{conc. H_2SO_4} CH_3COOCH_2CH_3 + H_2O',
        '\\Delta H < 0 \\quad (\\text{Exothermic equilibrium})',
      ],
      conceptLabel: 'chem_organic_reactions_esterification',
      syllabusTopic: 'Organic Chemistry: Esterification Reactions',
      learningObjective: 'Explain the mechanism of acid-catalyzed condensation between alkanols and alkanoic acids.',
      initialSocraticGuidance: 'Take a close look at the two starting chemicals: ethanoic acid has a carboxyl group (-COOH) and ethanol has a hydroxyl group (-OH). When they link up, what tiny molecule is produced as a byproduct, and what does concentrated sulfuric acid do to that byproduct?',
      difficultyLevel: 'Intermediate',
    },
  },
  {
    id: 'scan_phys_incline',
    title: 'Physical Science Mechanics: Friction & Inclined Planes',
    curriculum: 'ZIMSEC / WAEC Archive',
    gradeLevel: 11,
    subject: 'Physics',
    thumbnailBadge: 'Exam Paper Clipping',
    description: 'A 15 kg crate being towed up a rough ramp inclined at 30 degrees with friction coefficient 0.25.',
    sampleImageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    simulatedExtraction: {
      extractedText: 'Question 6: A wooden crate of mass 15 kg is pulled up a wooden ramp inclined at 30° to the horizontal by a cable parallel to the incline. The coefficient of kinetic friction between crate and ramp is μk = 0.25. If the cable tension is T = 120 N, calculate the acceleration of the crate up the ramp.',
      extractedFormulas: [
        'F_{g\\parallel} = mg \\sin(30^\\circ)',
        'F_{g\\perp} = mg \\cos(30^\\circ)',
        'f_k = \\mu_k N = \\mu_k (mg \\cos(30^\\circ))',
        'F_{\\text{net}} = T - F_{g\\parallel} - f_k = ma',
      ],
      conceptLabel: 'phys_mechanics_inclined_planes',
      syllabusTopic: 'Newtonian Dynamics: Friction and Inclines',
      learningObjective: 'Resolve gravitational vectors on an inclined plane and calculate net acceleration under kinetic friction.',
      initialSocraticGuidance: 'Imagine pushing a cart up a steep ramp in a market: gravity tries to pull the cart both downward into the wood and backward down the ramp. Which trigonometric component (sine or cosine) points directly opposite to the cable pulling up the slope?',
      difficultyLevel: 'Intermediate',
    },
  },
  {
    id: 'scan_math_roots',
    title: 'Pure Mathematics: Quadratic Nature of Roots',
    curriculum: 'MANEB / CAPS IEB',
    gradeLevel: 11,
    subject: 'Pure Mathematics',
    thumbnailBadge: 'Handwritten Worksheet',
    description: 'Determining the value of k for which 2x^2 - 4x + (k - 1) = 0 has two distinct real roots.',
    sampleImageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    simulatedExtraction: {
      extractedText: 'Problem 3: Given the quadratic equation 2x² - 4x + (k - 1) = 0, find the values of k for which the equation has:\n(a) Real and equal roots\n(b) Real and distinct roots\n(c) Non-real (complex) roots.',
      extractedFormulas: [
        '\\Delta = b^2 - 4ac',
        '\\Delta > 0 \\implies \\text{Real & Distinct}',
        '\\Delta = 0 \\implies \\text{Real & Equal}',
        '\\Delta < 0 \\implies \\text{Non-real}',
      ],
      conceptLabel: 'math_quadratic_discriminant_nature_roots',
      syllabusTopic: 'Algebra: Quadratic Discriminant and Nature of Roots',
      learningObjective: 'Evaluate conditions for real, equal, and non-real roots using the quadratic discriminant (Δ = b² - 4ac).',
      initialSocraticGuidance: 'Before plugging in formulas, identify your three quadratic coefficients: What are your values for a, b, and c in terms of k? Then, what must happen inside the square root of the quadratic formula for two separate real solutions to exist?',
      difficultyLevel: 'Foundation',
    },
  },
];
