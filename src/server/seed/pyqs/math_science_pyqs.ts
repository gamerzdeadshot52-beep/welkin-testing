export interface PyqQaItem {
  qNo: string;
  section: string;
  marks: number;
  question: string;
  solution: string;
  markingTip: string;
}

export interface SeedPyqPaper {
  classNumber: number;
  subjectSlug: string;
  subjectName: string;
  examYear: string;
  paperCode: string;
  title: string;
  driveFolderUrl: string;
  questionDriveFileId?: string | null;
  solutionDriveFileId?: string | null;
  qaItems: PyqQaItem[];
}

export const CLASS_10_DRIVE_FOLDER_URL =
  'https://drive.google.com/drive/folders/1w--IKGAoiricnru0PSjSIyQmzJ0zc7z7?usp=drive_link';

export const MATH_AND_SCIENCE_PYQS: SeedPyqPaper[] = [
  // ============================================================================
  // 1. MATHEMATICS (STANDARD) — 2024 BOARD (CODE 30/1/1) — FULL 38 QUESTIONS (80 MARKS)
  // ============================================================================
  {
    classNumber: 10,
    subjectSlug: 'mathematics',
    subjectName: 'Mathematics',
    examYear: '2024 Board',
    paperCode: '30/1/1',
    title: 'CBSE Class 10 Mathematics (Standard) — 2024 Full Board Paper (80 Marks · 38 Qs)',
    driveFolderUrl: CLASS_10_DRIVE_FOLDER_URL,
    qaItems: [
      // Section A: Q1–Q20 (1 Mark each = 20 Marks)
      {
        qNo: 'Q1',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'If two positive integers p and q can be expressed as p = 18a²b⁴ and q = 20a³b², where a and b are prime numbers, then LCM(p, q) is:\n(A) 2a²b²   (B) 180a²b²   (C) 12a²b²   (D) 180a³b⁴',
        solution:
          'Correct Option: (D) 180a³b⁴\n\nPrime factorisation:\np = 18a²b⁴ = 2¹ · 3² · a² · b⁴\nq = 20a³b² = 2² · 5¹ · a³ · b²\nLCM takes the highest power of every prime factor:\nLCM(p, q) = 2² · 3² · 5¹ · a³ · b⁴ = 4 × 9 × 5 · a³b⁴ = 180a³b⁴.',
        markingTip: 'Pick the HIGHEST exponent of each prime factor for LCM, and LOWEST common exponent for HCF.',
      },
      {
        qNo: 'Q2',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'If α and β are zeroes of the quadratic polynomial p(x) = x² − 5x + 6, then the value of (1/α + 1/β − 2αβ) is:\n(A) −67/6   (B) 67/6   (C) −11/6   (D) 77/6',
        solution:
          'Correct Option: (A) −67/6\n\nHere a = 1, b = −5, c = 6.\nα + β = −b/a = 5, αβ = c/a = 6.\n1/α + 1/β − 2αβ = (α + β)/(αβ) − 2αβ = 5/6 − 2(6) = 5/6 − 12 = −67/6.',
        markingTip: 'Always simplify 1/α + 1/β as (α + β)/(αβ) before substituting values.',
      },
      {
        qNo: 'Q3',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'The pair of linear equations 2x + 3y = 5 and 4x + 6y = 15 has:\n(A) A unique solution   (B) Exactly two solutions   (C) Infinitely many solutions   (D) No solution',
        solution:
          'Correct Option: (D) No solution\n\na₁/a₂ = 2/4 = 1/2\nb₁/b₂ = 3/6 = 1/2\nc₁/c₂ = (−5)/(−15) = 1/3\nSince a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the lines are parallel and inconsistent ⇒ No solution.',
        markingTip: 'Compare ratios a₁/a₂, b₁/b₂, and c₁/c₂ after writing both equations in standard ax + by + c = 0 form.',
      },
      {
        qNo: 'Q4',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'If the quadratic equation x² + 4x + k = 0 has real and equal roots, then the value of k is:\n(A) 4   (B) −4   (C) 16   (D) 2',
        solution:
          'Correct Option: (A) 4\n\nFor real and equal roots, Discriminant D = b² − 4ac = 0.\nHere a = 1, b = 4, c = k.\n4² − 4(1)(k) = 0 ⇒ 16 − 4k = 0 ⇒ k = 4.',
        markingTip: 'Real and equal roots ⇔ D = 0; Real and distinct ⇔ D > 0; No real roots ⇔ D < 0.',
      },
      {
        qNo: 'Q5',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'The 11th term from the end of the A.P. 10, 7, 4, ..., −62 is:\n(A) −32   (B) −28   (C) −35   (D) −16',
        solution:
          'Correct Option: (A) −32\n\nCommon difference d = 7 − 10 = −3. Reversing the A.P.: first term l = −62, reverse common difference = −d = +3.\n11th term from end = l + (11 − 1)(−d) = −62 + 10(3) = −62 + 30 = −32.',
        markingTip: 'Formula for nth term from end: l − (n − 1)d.',
      },
      {
        qNo: 'Q6',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'The distance of the point P(−6, 8) from the origin is:\n(A) 8 units   (B) 2√7 units   (C) 10 units   (D) 6 units',
        solution:
          'Correct Option: (C) 10 units\n\nDistance from origin (0, 0) = √(x² + y²) = √((−6)² + 8²) = √(36 + 64) = √100 = 10 units.',
        markingTip: '(6, 8, 10) is a standard Pythagorean triplet.',
      },
      {
        qNo: 'Q7',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'If ΔABC ~ ΔDEF such that AB = 4 cm, DE = 6 cm, EF = 9 cm and FD = 12 cm, then the perimeter of ΔABC is:\n(A) 18 cm   (B) 20 cm   (C) 21 cm   (D) 22 cm',
        solution:
          'Correct Option: (A) 18 cm\n\nPerimeter(ΔDEF) = 6 + 9 + 12 = 27 cm.\nFor similar triangles: Perimeter(ΔABC) / Perimeter(ΔDEF) = AB / DE = 4 / 6 = 2 / 3.\nPerimeter(ΔABC) = (2/3) × 27 = 18 cm.',
        markingTip: 'Ratio of perimeters of similar triangles equals the ratio of their corresponding sides.',
      },
      {
        qNo: 'Q8',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'In the figure, if TP and TQ are two tangents to a circle with centre O such that ∠POQ = 110°, then ∠PTQ is equal to:\n(A) 60°   (B) 70°   (C) 80°   (D) 90°',
        solution:
          'Correct Option: (B) 70°\n\nIn quadrilateral OPTQ: ∠OPT = 90° and ∠OQT = 90° (radius ⊥ tangent).\nSo ∠PTQ + ∠POQ = 180° ⇒ ∠PTQ = 180° − 110° = 70°.',
        markingTip: '∠PTQ and ∠POQ are always supplementary (sum = 180°).',
      },
      {
        qNo: 'Q9',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'If sin θ = 3/5 (θ acute), then the value of (tan θ + sec θ) is:\n(A) 1   (B) 2   (C) 3   (D) 4',
        solution:
          'Correct Option: (B) 2\n\nsin θ = 3/5 ⇒ Opposite = 3, Hypotenuse = 5 ⇒ Adjacent = √(5² − 3²) = 4.\ntan θ = 3/4, sec θ = 5/4.\ntan θ + sec θ = 3/4 + 5/4 = 8/4 = 2.',
        markingTip: 'Use (3, 4, 5) right triangle triplet for instant verification.',
      },
      {
        qNo: 'Q10',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'The value of (sec²θ − 1)(cosec²θ − 1) is:\n(A) −1   (B) 0   (C) 1   (D) 2',
        solution:
          'Correct Option: (C) 1\n\nUsing identities sec²θ − 1 = tan²θ and cosec²θ − 1 = cot²θ:\n(sec²θ − 1)(cosec²θ − 1) = tan²θ · cot²θ = tan²θ · (1/tan²θ) = 1.',
        markingTip: 'Recall the two Pythagorean identities: 1 + tan²θ = sec²θ and 1 + cot²θ = cosec²θ.',
      },
      {
        qNo: 'Q11',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'A pole 6 m high casts a shadow 2√3 m long on the ground, then the Sun’s elevation is:\n(A) 60°   (B) 45°   (C) 30°   (D) 90°',
        solution:
          'Correct Option: (A) 60°\n\ntan θ = Height / Shadow = 6 / (2√3) = 3 / √3 = √3.\nSince tan 60° = √3, Sun’s elevation θ = 60°.',
        markingTip: 'Rationalise 3/√3 = √3 immediately.',
      },
      {
        qNo: 'Q12',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'If the perimeter and the area of a circle are numerically equal, then the radius of the circle is:\n(A) 2 units   (B) π units   (C) 4 units   (D) 7 units',
        solution:
          'Correct Option: (A) 2 units\n\n2πr = πr² ⇒ 2 = r (since r > 0). Hence radius = 2 units.',
        markingTip: 'Cancel πr from both sides carefully since radius r ≠ 0.',
      },
      {
        qNo: 'Q13',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'The area of a sector of a circle of radius 6 cm subtending an angle of 60° at the centre is (in cm²):\n(A) 6π   (B) 3π   (C) 12π   (D) 36π',
        solution:
          'Correct Option: (A) 6π\n\nArea = (θ/360°) × πr² = (60°/360°) × π × 6² = (1/6) × 36π = 6π cm².',
        markingTip: 'Watch whether options are expressed in terms of π or numeric 22/7.',
      },
      {
        qNo: 'Q14',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'A solid is in the shape of a cone mounted on a hemisphere of same base radius. If the curved surface areas of the hemispherical part and the conical part are equal, then the ratio of the radius and the slant height of the cone is:\n(A) 1 : 2   (B) 2 : 1   (C) 1 : √2   (D) √2 : 1',
        solution:
          'Correct Option: (A) 1 : 2\n\nCSA of hemisphere = 2πr². CSA of cone = πrl.\nGiven 2πr² = πrl ⇒ 2r = l ⇒ r / l = 1 / 2 ⇒ 1 : 2.',
        markingTip: 'Equate exact formulas before substituting numbers.',
      },
      {
        qNo: 'Q15',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'The empirical relationship between Mean, Median, and Mode of a moderately skewed distribution is:\n(A) Mode = 3 Median − 2 Mean   (B) Mode = 2 Median − 3 Mean   (C) Median = 3 Mode − 2 Mean   (D) Mean = 3 Median − 2 Mode',
        solution:
          'Correct Option: (A) Mode = 3 Median − 2 Mean\n\nStandard empirical formula: 3 Median = Mode + 2 Mean ⇒ Mode = 3 Median − 2 Mean.',
        markingTip: 'Mnemonic: alphabetical order backwards: Mode = 3 Median − 2 Mean.',
      },
      {
        qNo: 'Q16',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'For the frequency distribution: Class 0–5: 10, 5–10: 15, 10–15: 12, 15–20: 20, 20–25: 9, the sum of the lower limits of the median class and modal class is:\n(A) 15   (B) 25   (C) 30   (D) 35',
        solution:
          'Correct Option: (B) 25\n\nTotal N = 10 + 15 + 12 + 20 + 9 = 66 ⇒ N/2 = 33.\nCumulative frequencies: 10, 25, 37, 57, 66. Thus median class is 10–15 (lower limit = 10).\nHighest frequency = 20 ⇒ modal class is 15–20 (lower limit = 15).\nSum = 10 + 15 = 25.',
        markingTip: 'Median class has first cumulative frequency ≥ N/2; Modal class has highest individual frequency.',
      },
      {
        qNo: 'Q17',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'Two dice are thrown simultaneously. What is the probability of getting a doublet (same number on both dice)?\n(A) 1/36   (B) 1/6   (C) 5/6   (D) 1/12',
        solution:
          'Correct Option: (B) 1/6\n\nTotal outcomes = 36. Doublets = {(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)} = 6.\nProbability = 6/36 = 1/6.',
        markingTip: 'Reduce fraction to simplest form (6/36 = 1/6).',
      },
      {
        qNo: 'Q18',
        section: 'Section A (1 Mark)',
        marks: 1,
        question:
          'A card is drawn at random from a well-shuffled deck of 52 playing cards. The probability that the drawn card is neither a king nor a queen is:\n(A) 11/13   (B) 12/13   (C) 2/13   (D) 1/26',
        solution:
          'Correct Option: (A) 11/13\n\nKings = 4, Queens = 4 ⇒ Total King or Queen = 8.\nNeither King nor Queen = 52 − 8 = 44.\nProbability = 44/52 = 11/13.',
        markingTip: 'Use complementary probability: 1 − (8/52) = 1 − 2/13 = 11/13.',
      },
      {
        qNo: 'Q19',
        section: 'Section A (1 Mark · Assertion-Reason)',
        marks: 1,
        question:
          'Assertion (A): If the HCF of two numbers is 5 and their product is 150, then their LCM is 40.\nReason (R): For any two positive integers a and b, HCF(a, b) × LCM(a, b) = a × b.\n(A) Both A and R true, R explains A   (B) Both true, R does not explain A   (C) A is true, R is false   (D) A is false, R is true',
        solution:
          'Correct Option: (D) A is false, R is true\n\nHCF × LCM = Product ⇒ 5 × LCM = 150 ⇒ LCM = 150/5 = 30 ≠ 40.\nSo Assertion (A) is false, while Reason (R) is a true identity.',
        markingTip: 'Always compute the value in Assertion independently before picking (A)–(D).',
      },
      {
        qNo: 'Q20',
        section: 'Section A (1 Mark · Assertion-Reason)',
        marks: 1,
        question:
          'Assertion (A): The point (0, 4) lies on the y-axis.\nReason (R): The x-coordinate of any point on the y-axis is zero.\n(A) Both A and R true, R explains A   (B) Both true, R does not explain A   (C) A is true, R is false   (D) A is false, R is true',
        solution:
          'Correct Option: (A) Both A and R are true and R is the correct explanation of A.\n\nBecause x-coordinate is 0 for all points on the y-axis, (0, 4) lies on the y-axis.',
        markingTip: 'Points of the form (0, y) lie on y-axis; points (x, 0) lie on x-axis.',
      },
      // Section B: Q21–Q25 (2 Marks each = 10 Marks)
      {
        qNo: 'Q21',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Check whether 6ⁿ can end with the digit 0 for any natural number n.',
        solution:
          'For any number 6ⁿ to end with digit 0, it must be divisible by 10, i.e., its prime factorisation must contain both 2 and 5.\nPrime factorisation of 6ⁿ = (2 × 3)ⁿ = 2ⁿ × 3ⁿ.\nBy the Fundamental Theorem of Arithmetic, this factorisation is unique and does not contain the prime 5.\nTherefore, 6ⁿ can never end with the digit 0 for any natural number n.',
        markingTip: 'Cite uniqueness of prime factorisation (Fundamental Theorem of Arithmetic) for full 2 marks.',
      },
      {
        qNo: 'Q22',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Find the zeroes of the quadratic polynomial x² + 7x + 10 and verify the relationship between the zeroes and the coefficients.',
        solution:
          'p(x) = x² + 7x + 10 = x² + 5x + 2x + 10 = (x + 5)(x + 2).\nSetting p(x) = 0 gives zeroes α = −5 and β = −2.\n\nVerification:\n• Sum of zeroes = α + β = −5 + (−2) = −7 = −(coefficient of x)/(coefficient of x²) = −7/1.\n• Product of zeroes = αβ = (−5)(−2) = 10 = (constant term)/(coefficient of x²) = 10/1.\nHence verified.',
        markingTip: 'Show BOTH Sum and Product verification explicitly.',
      },
      {
        qNo: 'Q23',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'In ΔABC, DE ∥ BC. If AD = 1.5 cm, DB = 3 cm, and AE = 1 cm, find EC.',
        solution:
          'By Basic Proportionality Theorem (Thales Theorem), since DE ∥ BC:\nAD / DB = AE / EC\n1.5 / 3 = 1 / EC\n1 / 2 = 1 / EC\n⇒ EC = 2 cm.',
        markingTip: 'Mention Basic Proportionality Theorem clearly before writing the proportion.',
      },
      {
        qNo: 'Q24',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Prove that the tangents drawn at the ends of a diameter of a circle are parallel.',
        solution:
          'Let AB be a diameter of circle with centre O, and let PQ and RS be tangents drawn at A and B respectively.\nSince radius ⊥ tangent at point of contact (Theorem 10.1):\n∠OAP = 90° and ∠OBS = 90°.\nHence ∠BAP = ∠ABS = 90°.\nSince these are equal alternate interior angles formed by transversal AB, PQ ∥ RS. Hence Proved.',
        markingTip: 'Draw a clean circle diagram showing O, diameter AB, and tangents PQ and RS.',
      },
      {
        qNo: 'Q25',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Evaluate: 2 tan²45° + cos²30° − sin²60°.',
        solution:
          'Using standard trigonometric values:\ntan 45° = 1, cos 30° = √3/2, sin 60° = √3/2.\n\nExpression = 2(1)² + (√3/2)² − (√3/2)²\n= 2(1) + 3/4 − 3/4\n= 2.',
        markingTip: 'Write each standard trigonometric value clearly before substituting.',
      },
      // Section C: Q26–Q31 (3 Marks each = 18 Marks)
      {
        qNo: 'Q26',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Prove that 5 − 2√3 is an irrational number, given that √3 is irrational.',
        solution:
          'Assume, to the contrary, that 5 − 2√3 is a rational number.\nThen 5 − 2√3 = p/q, where p and q are coprime integers and q ≠ 0.\nRearranging:\n2√3 = 5 − p/q = (5q − p)/q\n√3 = (5q − p)/(2q).\n\nSince p and q are integers and q ≠ 0, (5q − p)/(2q) is a rational number.\nThis implies √3 is rational, which contradicts the given fact that √3 is irrational.\nHence, our assumption is wrong and 5 − 2√3 is irrational.',
        markingTip: 'Isolate √3 cleanly on the LHS and state the contradiction explicitly.',
      },
      {
        qNo: 'Q27',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Solve the pair of linear equations: 3x + 4y = 10 and 2x − 2y = 2 by elimination method.',
        solution:
          'Equations:\n(1) 3x + 4y = 10\n(2) 2x − 2y = 2\n\nMultiply equation (2) by 2:\n(3) 4x − 4y = 4\n\nAdd equations (1) and (3):\n(3x + 4x) + (4y − 4y) = 10 + 4\n7x = 14 ⇒ x = 2.\n\nSubstitute x = 2 into equation (2):\n2(2) − 2y = 2 ⇒ 4 − 2y = 2 ⇒ 2y = 2 ⇒ y = 1.\n\nSolution: x = 2, y = 1.',
        markingTip: 'Check your answer quickly in both equations: 3(2)+4(1)=10 and 2(2)−2(1)=2.',
      },
      {
        qNo: 'Q28',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'A quadrilateral ABCD is drawn to circumscribe a circle. Prove that AB + CD = AD + BC.',
        solution:
          'Let the circle touch sides AB, BC, CD, and DA at points P, Q, R, and S respectively.\nSince lengths of tangents drawn from an external point to a circle are equal (Theorem 10.2):\nAP = AS  ... (1)\nBP = BQ  ... (2)\nCR = CQ  ... (3)\nDR = DS  ... (4)\n\nAdding (1) + (2) + (3) + (4):\n(AP + BP) + (CR + DR) = (AS + DS) + (BQ + CQ)\nAB + CD = AD + BC. Hence Proved.',
        markingTip: 'Group tangents matching AB, CD on LHS and AD, BC on RHS before adding.',
      },
      {
        qNo: 'Q29',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Prove that: (sin θ − 2sin³θ) / (2cos³θ − cos θ) = tan θ.',
        solution:
          'LHS = [sin θ (1 − 2sin²θ)] / [cos θ (2cos²θ − 1)]\nUsing cos²θ = 1 − sin²θ in the denominator:\n2cos²θ − 1 = 2(1 − sin²θ) − 1 = 2 − 2sin²θ − 1 = 1 − 2sin²θ.\n\nTherefore:\nLHS = [sin θ (1 − 2sin²θ)] / [cos θ (1 − 2sin²θ)]\n= sin θ / cos θ = tan θ = RHS. Hence Proved.',
        markingTip: 'Factor sin θ and cos θ first so the identical bracket cancels immediately.',
      },
      {
        qNo: 'Q30',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Find the area of the minor and major segments of a circle of radius 14 cm, if the chord subtends a right angle at the centre. (Use π = 22/7)',
        solution:
          'Given r = 14 cm, θ = 90°.\nArea of minor sector = (90°/360°) × (22/7) × 14 × 14 = (1/4) × 616 = 154 cm².\nArea of right triangle = ½ × r × r = ½ × 14 × 14 = 98 cm².\nArea of minor segment = 154 − 98 = 56 cm².\n\nArea of circle = (22/7) × 14 × 14 = 616 cm².\nArea of major segment = 616 − 56 = 560 cm².',
        markingTip: 'Major segment area = Total circle area − Minor segment area.',
      },
      {
        qNo: 'Q31',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'A bag contains 5 red balls, 8 white balls, and 4 green balls. One ball is taken out at random. Find the probability that the ball taken out is: (i) red, (ii) white, (iii) not green.',
        solution:
          'Total number of balls = 5 + 8 + 4 = 17.\n(i) P(red) = 5/17.\n(ii) P(white) = 8/17.\n(iii) P(not green) = 1 − P(green) = 1 − 4/17 = 13/17 (or (5 + 8)/17 = 13/17).',
        markingTip: 'Verify numerator sum: 5 + 8 + 4 = 17.',
      },
      // Section D: Q32–Q35 (5 Marks each = 20 Marks)
      {
        qNo: 'Q32',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: 'A motor boat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than to return downstream to the same spot. Find the speed of the stream.',
        solution:
          'Let speed of the stream = x km/h (0 < x < 18).\nSpeed upstream = (18 − x) km/h; Speed downstream = (18 + x) km/h.\nTime upstream = 24/(18 − x) hrs; Time downstream = 24/(18 + x) hrs.\n\nGiven: 24/(18 − x) − 24/(18 + x) = 1\n24[(18 + x − 18 + x) / (324 − x²)] = 1\n48x = 324 − x²\nx² + 48x − 324 = 0\nx² + 54x − 6x − 324 = 0\n(x + 54)(x − 6) = 0\n⇒ x = 6 or x = −54 (rejected since speed > 0).\n\nSpeed of the stream = 6 km/h.',
        markingTip: 'Always state the reason for rejecting the negative root.',
      },
      {
        qNo: 'Q33',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: 'State and prove Basic Proportionality Theorem (Thales Theorem).',
        solution:
          'Statement: If a line is drawn parallel to one side of a triangle intersecting the other two sides in distinct points, the other two sides are divided in the same ratio.\n\nGiven: ΔABC with DE ∥ BC intersecting AB at D and AC at E.\nTo Prove: AD/DB = AE/EC.\nConstruction: Join BE and CD. Draw EN ⊥ AB and DM ⊥ AC.\n\nProof:\nArea(ΔADE) = ½ × AD × EN; Area(ΔBDE) = ½ × DB × EN\n⇒ Area(ΔADE)/Area(ΔBDE) = AD/DB  ... (1)\n\nSimilarly, Area(ΔADE)/Area(ΔCDE) = AE/EC  ... (2)\n\nSince ΔBDE and ΔCDE are on the same base DE and between same parallels DE and BC:\nArea(ΔBDE) = Area(ΔCDE)  ... (3)\n\nFrom (1), (2), and (3): AD/DB = AE/EC. Hence Proved.',
        markingTip: 'Statement + Diagram + Given/To Prove/Construction + Proof each carry dedicated marks.',
      },
      {
        qNo: 'Q34',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: 'A tent is in the shape of a cylinder surmounted by a conical top. If the height and diameter of the cylindrical part are 2.1 m and 4 m respectively, and the slant height of the top is 2.8 m, find the area of the canvas used for making the tent. Also find the cost of canvas at ₹500 per m². (Use π = 22/7)',
        solution:
          'Given: Radius r = 4/2 = 2 m, cylinder height h = 2.1 m, slant height of cone l = 2.8 m.\nTotal area of canvas = CSA of cylinder + CSA of cone\n= 2πrh + πrl = πr(2h + l)\n= (22/7) × 2 × (2(2.1) + 2.8)\n= (44/7) × (4.2 + 2.8)\n= (44/7) × 7 = 44 m².\n\nCost of canvas = 44 × 500 = ₹22,000.',
        markingTip: 'Factor πr out first—here (2h + l) = 7 cancels cleanly with 22/7!',
      },
      {
        qNo: 'Q35',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: 'If the median of the following distribution is 28.5, find the values of x and y when total frequency N = 60:\n0–10: 5, 10–20: x, 20–30: 20, 30–40: 15, 40–50: y, 50–60: 5.',
        solution:
          'Total frequency: 5 + x + 20 + 15 + y + 5 = 60 ⇒ x + y = 15  ... (1)\nMedian = 28.5 lies in 20–30 ⇒ Median class = 20–30.\nl = 20, N/2 = 30, cf = 5 + x, f = 20, h = 10.\n\nMedian = l + [(N/2 − cf)/f] × h\n28.5 = 20 + [(30 − 5 − x)/20] × 10\n8.5 = (25 − x)/2\n17 = 25 − x ⇒ x = 8.\nFrom (1): 8 + y = 15 ⇒ y = 7.\nHence x = 8, y = 7.',
        markingTip: 'Draw a complete 3-column table (Class Interval, f, cf) before applying the median formula.',
      },
      // Section E: Q36–Q38 (4 Marks Case Study each = 12 Marks)
      {
        qNo: 'Q36',
        section: 'Section E (4 Marks Case Study)',
        marks: 4,
        question: 'Case Study (Arithmetic Progressions): Manpreet Kaur saves ₹1,000 in January and increases her monthly savings by ₹200 each subsequent month.\n(i) Find her savings in the 10th month (October).\n(ii) Which month will her monthly saving reach ₹3,400?\n(iii) Find the total savings over the full 12-month year.',
        solution:
          'A.P. formed: 1000, 1200, 1400, ... with a = 1000, d = 200.\n\n(i) a₁₀ = a + 9d = 1000 + 9(200) = ₹2,800.\n\n(ii) Let aₙ = 3400 ⇒ 1000 + (n − 1)(200) = 3400 ⇒ (n − 1)(200) = 2400 ⇒ n − 1 = 12 ⇒ n = 13 (13th month).\n\n(iii) S₁₂ = (12/2)[2(1000) + 11(200)] = 6[2000 + 2200] = 6 × 4200 = ₹25,200.',
        markingTip: 'State clearly what a and d represent before answering sub-parts.',
      },
      {
        qNo: 'Q37',
        section: 'Section E (4 Marks Case Study)',
        marks: 4,
        question: 'Case Study (Coordinate Geometry): A school playground is mapped on a coordinate grid with Flagpole A(2, 3), Library B(6, 7), and Canteen C(10, 3).\n(i) Find the distance between Flagpole A and Library B.\n(ii) Find the midpoint of AC.\n(iii) Show that ΔABC is an isosceles triangle.',
        solution:
          '(i) AB = √((6 − 2)² + (7 − 3)²) = √(16 + 16) = √32 = 4√2 units.\n\n(ii) Midpoint of AC = ((2 + 10)/2, (3 + 3)/2) = (6, 3).\n\n(iii) BC = √((10 − 6)² + (3 − 7)²) = √(16 + 16) = 4√2 units.\nAC = √((10 − 2)² + (3 − 3)²) = 8 units.\nSince AB = BC = 4√2 units, ΔABC is an isosceles triangle.',
        markingTip: 'Leave distances in simplest radical form (4√2) unless decimal value is requested.',
      },
      {
        qNo: 'Q38',
        section: 'Section E (4 Marks Case Study)',
        marks: 4,
        question: 'Case Study (Applications of Trigonometry): A lighthouse 75 m high stands above sea level. From its top, the angles of depression of two ships on the same side are 30° and 45°.\n(i) Draw the situation.\n(ii) Find the distance of the nearer ship from the foot of the lighthouse.\n(iii) Find the distance between the two ships. (Use √3 = 1.732)',
        solution:
          '(i) Let lighthouse AB = 75 m, nearer ship C (∠ACB = 45°), farther ship D (∠ADB = 30°).\n\n(ii) In right ΔABC: tan 45° = 75/BC ⇒ 1 = 75/BC ⇒ BC = 75 m.\n\n(iii) In right ΔABD: tan 30° = 75/BD ⇒ 1/√3 = 75/BD ⇒ BD = 75√3 m.\nDistance between ships = CD = BD − BC = 75(√3 − 1) = 75 × 0.732 = 54.9 m.',
        markingTip: 'Mention alternate interior angles when converting depression angles to elevation angles.',
      },
    ],
  },

  // ============================================================================
  // 2. MATHEMATICS (STANDARD) — 2023 BOARD (CODE 30/2/2) — FULL 38 QUESTIONS (80 MARKS)
  // ============================================================================
  {
    classNumber: 10,
    subjectSlug: 'mathematics',
    subjectName: 'Mathematics',
    examYear: '2023 Board',
    paperCode: '30/2/2',
    title: 'CBSE Class 10 Mathematics (Standard) — 2023 Full Board Paper (80 Marks · 38 Qs)',
    driveFolderUrl: CLASS_10_DRIVE_FOLDER_URL,
    qaItems: [
      {
        qNo: 'Q1',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'The ratio of HCF to LCM of the least composite number and the least prime number is:\n(A) 1 : 2   (B) 2 : 1   (C) 1 : 1   (D) 1 : 3',
        solution: 'Correct Option: (A) 1 : 2\n\nLeast prime number = 2; Least composite number = 4.\nHCF(2, 4) = 2; LCM(2, 4) = 4.\nRatio = 2 : 4 = 1 : 2.',
        markingTip: 'Remember: 1 is neither prime nor composite; least prime is 2, least composite is 4.',
      },
      {
        qNo: 'Q2',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'The roots of the quadratic equation x² − 0.04 = 0 are:\n(A) ±0.2   (B) ±0.02   (C) 0.4   (D) 2',
        solution: 'Correct Option: (A) ±0.2\n\nx² = 0.04 ⇒ x = ±√0.04 = ±0.2.',
        markingTip: 'Check decimal places: 0.2 × 0.2 = 0.04.',
      },
      {
        qNo: 'Q3',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'If x = 2 is a zero of the polynomial p(x) = x² + 3x + k, then value of k is:\n(A) 10   (B) −10   (C) 5   (D) −2',
        solution: 'Correct Option: (B) −10\n\np(2) = 0 ⇒ 2² + 3(2) + k = 0 ⇒ 4 + 6 + k = 0 ⇒ k = −10.',
        markingTip: 'A zero of p(x) makes p(x) identically 0.',
      },
      {
        qNo: 'Q4',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'The point of intersection of the lines x = −2 and y = 3 is:\n(A) (2, −3)   (B) (−2, 3)   (C) (3, −2)   (D) (−3, 2)',
        solution: 'Correct Option: (B) (−2, 3)\n\nVertical line x = −2 meets horizontal line y = 3 at (−2, 3).',
        markingTip: 'Write x-coordinate before y-coordinate.',
      },
      {
        qNo: 'Q5',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'The next term of the A.P. √7, √28, √63, ... is:\n(A) √70   (B) √80   (C) √97   (D) √112',
        solution: 'Correct Option: (D) √112\n\n√7, 2√7, 3√7, ... ⇒ 4th term = 4√7 = √(16 × 7) = √112.',
        markingTip: 'Simplify radicals first to identify the common difference.',
      },
      {
        qNo: 'Q6',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'The distance between the points (a cos θ + b sin θ, 0) and (0, a sin θ − b cos θ) is:\n(A) a² + b²   (B) a² − b²   (C) √(a² + b²)   (D) √(a² − b²)',
        solution: 'Correct Option: (C) √(a² + b²)\n\nd = √[(a cos θ + b sin θ)² + (a sin θ − b cos θ)²] = √[a²(cos²θ + sin²θ) + b²(sin²θ + cos²θ)] = √(a² + b²).',
        markingTip: 'Cross terms +2ab sin θ cos θ and −2ab sin θ cos θ cancel out cleanly.',
      },
      {
        qNo: 'Q7',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'In ΔABC, D and E are points on sides AB and AC respectively such that DE ∥ BC. If AD = 3 cm, BD = 4.5 cm, and AE = 2 cm, then AC is:\n(A) 3 cm   (B) 5 cm   (C) 4 cm   (D) 6 cm',
        solution: 'Correct Option: (B) 5 cm\n\nAD/BD = AE/EC ⇒ 3/4.5 = 2/EC ⇒ 2/3 = 2/EC ⇒ EC = 3 cm.\nSo AC = AE + EC = 2 + 3 = 5 cm.',
        markingTip: 'Read carefully whether EC or full side AC is asked!',
      },
      {
        qNo: 'Q8',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'A tangent PQ at a point P of a circle of radius 5 cm meets a line through centre O at Q such that OQ = 12 cm. Length PQ is:\n(A) 12 cm   (B) 13 cm   (C) 8.5 cm   (D) √119 cm',
        solution: 'Correct Option: (D) √119 cm\n\nOP ⊥ PQ ⇒ In right ΔOPQ: PQ = √(OQ² − OP²) = √(12² − 5²) = √(144 − 25) = √119 cm.',
        markingTip: 'OQ is the hypotenuse because the right angle is at P (point of contact).',
      },
      {
        qNo: 'Q9',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'If tan θ = 1/√3, then the value of (cosec²θ − sec²θ) / (cosec²θ + sec²θ) is:\n(A) 1/2   (B) 1/3   (C) 1/4   (D) 3/4',
        solution: 'Correct Option: (A) 1/2\n\ntan θ = 1/√3 ⇒ θ = 30°.\ncosec 30° = 2 (cosec²30° = 4); sec 30° = 2/√3 (sec²30° = 4/3).\n(4 − 4/3)/(4 + 4/3) = (8/3)/(16/3) = 8/16 = 1/2.',
        markingTip: 'When tan θ equals a standard table value, find θ directly to save steps.',
      },
      {
        qNo: 'Q10',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'If sin A + sin²A = 1, then the value of (cos²A + cos⁴A) is:\n(A) 1   (B) 1/2   (C) 2   (D) 3',
        solution: 'Correct Option: (A) 1\n\nsin A = 1 − sin²A = cos²A.\nTherefore cos²A + cos⁴A = sin A + sin²A = 1.',
        markingTip: 'Substitute cos²A = sin A directly!',
      },
      {
        qNo: 'Q11',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'If the length of the shadow of a vertical tower is equal to its height, the angle of elevation of the Sun is:\n(A) 30°   (B) 45°   (C) 60°   (D) 90°',
        solution: 'Correct Option: (B) 45°\n\ntan θ = h / h = 1 ⇒ θ = 45°.',
        markingTip: 'Equal height and shadow always yields 45°.',
      },
      {
        qNo: 'Q12',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'The minute hand of a clock is 14 cm long. The area swept by the minute hand in 5 minutes is:\n(A) 154/3 cm²   (B) 154 cm²   (C) 77/3 cm²   (D) 51.3 cm²',
        solution: 'Correct Option: (A) 154/3 cm²\n\nAngle in 5 minutes = 30°. r = 14 cm.\nArea = (30°/360°) × (22/7) × 14 × 14 = (1/12) × 616 = 154/3 cm².',
        markingTip: 'Minute hand sweeps 6° per minute (30° in 5 minutes).',
      },
      {
        qNo: 'Q13',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'The total surface area of a solid hemisphere of radius 7 cm is:\n(A) 447π cm²   (B) 239π cm²   (C) 147π cm²   (D) 174π cm²',
        solution: 'Correct Option: (C) 147π cm²\n\nTSA of solid hemisphere = 3πr² = 3 × π × 7² = 147π cm².',
        markingTip: 'Solid hemisphere TSA is 3πr² (curved 2πr² + flat circular base πr²).',
      },
      {
        qNo: 'Q14',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'If the volume of a sphere is numerically equal to its surface area, then its diameter is:\n(A) 3 units   (B) 6 units   (C) 2 units   (D) 4 units',
        solution: 'Correct Option: (B) 6 units\n\n(4/3)πr³ = 4πr² ⇒ r/3 = 1 ⇒ r = 3 units ⇒ Diameter = 2r = 6 units.',
        markingTip: 'Read carefully: question asks for DIAMETER (6), not radius (3).',
      },
      {
        qNo: 'Q15',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'If the mean of 6, 7, x, 8, y, 14 is 9, then:\n(A) x + y = 21   (B) x + y = 19   (C) x − y = 19   (D) x − y = 21',
        solution: 'Correct Option: (B) x + y = 19\n\n(6 + 7 + x + 8 + y + 14)/6 = 9 ⇒ 35 + x + y = 54 ⇒ x + y = 19.',
        markingTip: 'Multiply mean by count of observations first.',
      },
      {
        qNo: 'Q16',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'In a lottery, there are 8 prizes and 16 blanks. The probability of getting a prize is:\n(A) 1/2   (B) 1/3   (C) 2/3   (D) 1/8',
        solution: 'Correct Option: (B) 1/3\n\nTotal tickets = 8 + 16 = 24. P(prize) = 8/24 = 1/3.',
        markingTip: 'Total outcomes include both prizes AND blanks.',
      },
      {
        qNo: 'Q17',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Which of the following cannot be the probability of an event?\n(A) 1.5   (B) 3/5   (C) 25%   (D) 0.3',
        solution: 'Correct Option: (A) 1.5\n\nProbability of any event satisfies 0 ≤ P(E) ≤ 1. Since 1.5 > 1, it is impossible.',
        markingTip: 'Probability can never be negative or greater than 1 (or >100%).',
      },
      {
        qNo: 'Q18',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'The zeroes of the polynomial x² − 3 are:\n(A) 3, −3   (B) √3, −√3   (C) 9, −9   (D) √3, √3',
        solution: 'Correct Option: (B) √3, −√3\n\nx² − 3 = 0 ⇒ (x − √3)(x + √3) = 0 ⇒ x = √3, −√3.',
        markingTip: 'Factor x² − a = (x − √a)(x + √a).',
      },
      {
        qNo: 'Q19',
        section: 'Section A (1 Mark · Assertion-Reason)',
        marks: 1,
        question: 'Assertion (A): The number 5ⁿ cannot end with digit 0 for any natural number n.\nReason (R): Prime factorisation of 5ⁿ has only two factors, 1 and 5.\n(A) Both A and R true, R explains A   (B) Both true, R does not explain A   (C) A true, R false   (D) A false, R true',
        solution: 'Correct Option: (C) A is true, R is false (for n > 1, 5ⁿ has factors 1, 5, 5², ..., 5ⁿ; its prime factorisation only has prime 5 and lacks 2).',
        markingTip: 'Distinguish between "only prime factor is 5" (true) and "only two factors 1 and 5" (false for n ≥ 2).',
      },
      {
        qNo: 'Q20',
        section: 'Section A (1 Mark · Assertion-Reason)',
        marks: 1,
        question: 'Assertion (A): If cos A + cos²A = 1, then sin²A + sin⁴A = 1.\nReason (R): sin²A + cos²A = 1 for all angles A.\n(A) Both A and R true, R explains A   (B) Both true, R does not explain A   (C) A true, R false   (D) A false, R true',
        solution: 'Correct Option: (A) Both A and R are true, and R is the correct explanation of A.\n\ncos A = 1 − cos²A = sin²A ⇒ sin²A + sin⁴A = cos A + cos²A = 1.',
        markingTip: 'Identity sin²A + cos²A = 1 directly converts 1 − cos²A into sin²A.',
      },
      {
        qNo: 'Q21',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Find the ratio in which the line segment joining A(1, −5) and B(−4, 5) is divided by the x-axis. Also find the coordinates of the point of division.',
        solution: 'Point on x-axis is P(x, 0). Let ratio be k : 1.\n0 = (5k − 5)/(k + 1) ⇒ 5k = 5 ⇒ k = 1 (ratio 1 : 1).\nx = (−4 + 1)/2 = −3/2.\nPoint of division = (−3/2, 0).',
        markingTip: 'Using k : 1 avoids two variables.',
      },
      {
        qNo: 'Q22',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Find the roots of quadratic equation 2x² − 7x + 3 = 0 by factorisation.',
        solution: '2x² − 6x − x + 3 = 0\n2x(x − 3) − 1(x − 3) = 0\n(2x − 1)(x − 3) = 0 ⇒ x = 1/2, 3.',
        markingTip: 'Split middle term so product equals 2 × 3 = +6 and sum equals −7.',
      },
      {
        qNo: 'Q23',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Two concentric circles have radii 5 cm and 3 cm. Find the length of the chord of the larger circle which touches the smaller circle.',
        solution: 'Let O be the common centre, AB the chord touching smaller circle at P.\nOP ⊥ AB and OP bisects AB. OP = 3 cm, OA = 5 cm.\nAP = √(5² − 3²) = √16 = 4 cm.\nLength of chord AB = 2 × AP = 8 cm.',
        markingTip: 'Perpendicular from centre bisects the chord.',
      },
      {
        qNo: 'Q24',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'If tan(A + B) = √3 and tan(A − B) = 1/√3, 0° < A + B ≤ 90°, A > B, find A and B.',
        solution: 'A + B = 60°  ... (1)\nA − B = 30°  ... (2)\nAdding (1) and (2): 2A = 90° ⇒ A = 45°.\nB = 60° − 45° = 15°.',
        markingTip: 'Verify A > B and 0° < A + B ≤ 90°.',
      },
      {
        qNo: 'Q25',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Find the mode of the following grouped data: 10–20: 8, 20–30: 12, 30–40: 25, 40–50: 15, 50–60: 10.',
        solution: 'Highest frequency = 25 ⇒ Modal class = 30–40.\nl = 30, f₁ = 25, f₀ = 12, f₂ = 15, h = 10.\nMode = l + [(f₁ − f₀)/(2f₁ − f₀ − f₂)] × h\n= 30 + [(25 − 12)/(50 − 12 − 15)] × 10 = 30 + (130/23) ≈ 35.65.',
        markingTip: 'Verify final mode lies inside the modal class (30–40).',
      },
      {
        qNo: 'Q26',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Find the HCF and LCM of 26, 65, and 117 using prime factorisation.',
        solution: '26 = 2 × 13\n65 = 5 × 13\n117 = 3² × 13\nHCF = 13.\nLCM = 2 × 3² × 5 × 13 = 1170.',
        markingTip: 'Note: HCF × LCM = Product holds ONLY for 2 numbers, not 3 numbers.',
      },
      {
        qNo: 'Q27',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Five years ago, Nuri was thrice as old as Sonu. Ten years later, Nuri will be twice as old as Sonu. How old are Nuri and Sonu?',
        solution: 'Let Nuri’s age = x, Sonu’s age = y.\nx − 5 = 3(y − 5) ⇒ x − 3y = −10  ... (1)\nx + 10 = 2(y + 10) ⇒ x − 2y = 10  ... (2)\nSubtracting (1) from (2): y = 20.\nx = 10 + 2(20) = 50.\nNuri = 50 years, Sonu = 20 years.',
        markingTip: 'Verify both conditions: 5 yrs ago (45 = 3×15), 10 yrs later (60 = 2×30).',
      },
      {
        qNo: 'Q28',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Diagonals AC and BD of a trapezium ABCD with AB ∥ DC intersect at O. Using similarity criterion, show that OA/OC = OB/OD.',
        solution: 'In ΔAOB and ΔCOD:\n∠OAB = ∠OCD (alternate interior angles, AB ∥ DC)\n∠OBA = ∠ODC (alternate interior angles)\n∠AOB = ∠COD (vertically opposite angles)\nBy AA similarity: ΔAOB ~ ΔCOD.\nHence corresponding sides are proportional: OA/OC = OB/OD. Hence Proved.',
        markingTip: 'Match vertex correspondence carefully: A↔C, B↔D, O↔O.',
      },
      {
        qNo: 'Q29',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Prove that: (sec A − tan A)² = (1 − sin A)/(1 + sin A).',
        solution: 'LHS = (1/cos A − sin A/cos A)² = (1 − sin A)² / cos²A\n= (1 − sin A)² / (1 − sin²A)\n= [(1 − sin A)(1 − sin A)] / [(1 − sin A)(1 + sin A)]\n= (1 − sin A)/(1 + sin A) = RHS. Hence Proved.',
        markingTip: 'Convert all terms to sin A and cos A immediately.',
      },
      {
        qNo: 'Q30',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'A horse is tied to a peg at one corner of a square grass field of side 15 m by a 5 m long rope. Find the area of the field in which the horse can graze (π = 3.14).',
        solution: 'Corner angle θ = 90°, radius r = 5 m.\nArea grazed = (90°/360°) × 3.14 × 5² = ¼ × 3.14 × 25 = 78.5/4 = 19.625 m².',
        markingTip: 'Include units (m²) in the final answer.',
      },
      {
        qNo: 'Q31',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Find the coordinates of the points of trisection of the line segment joining (4, −1) and (−2, −3).',
        solution: 'Let P and Q trisect AB.\nP divides AB in ratio 1 : 2:\nP = ((1(−2) + 2(4))/3, (1(−3) + 2(−1))/3) = (6/3, −5/3) = (2, −5/3).\n\nQ divides AB in ratio 2 : 1 (or midpoint of PB):\nQ = ((2 + (−2))/2, (−5/3 + (−3))/2) = (0, −7/3).',
        markingTip: 'Finding Q as midpoint of P and B avoids repeating section formula.',
      },
      {
        qNo: 'Q32',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: 'Two water taps together can fill a tank in 9⅜ hours. The tap of larger diameter takes 10 hours less than the smaller one to fill the tank separately. Find the time in which each tap can separately fill the tank.',
        solution: 'Let smaller tap take x hours ⇒ larger tap takes (x − 10) hours (x > 10).\nIn 1 hour: 1/x + 1/(x − 10) = 8/75\n(2x − 10)/(x² − 10x) = 8/75\n4(x² − 10x) = 75(x − 5)\n4x² − 115x + 375 = 0\n4x² − 100x − 15x + 375 = 0\n(4x − 15)(x − 25) = 0 ⇒ x = 25 or x = 3.75 (rejected since x − 10 < 0).\n\nSmaller tap = 25 hours, Larger tap = 15 hours.',
        markingTip: 'Reject x = 3.75 explicitly because x − 10 would be negative.',
      },
      {
        qNo: 'Q33',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: 'Prove that the opposite sides of a quadrilateral circumscribing a circle subtend supplementary angles at the centre of the circle.',
        solution:
          'Let quadrilateral ABCD circumscribe circle with centre O touching sides at P, Q, R, S.\nJoin OP, OQ, OR, OS and OA, OB, OC, OD.\nBy SSS congruence (tangents from external point equal, radii equal, common hypotenuse), adjacent triangles at each vertex are congruent, giving:\n∠1 = ∠2, ∠3 = ∠4, ∠5 = ∠6, ∠7 = ∠8.\nSum around O = 360°:\n2(∠1 + ∠2 + ... ) ⇒ 2(∠2 + ∠3 + ∠6 + ∠7) = 360°\n⇒ (∠2 + ∠3) + (∠6 + ∠7) = 180° ⇒ ∠AOB + ∠COD = 180°.\nSimilarly, ∠AOD + ∠BOC = 180°. Hence Proved.',
        markingTip: 'Label the 8 central angles 1–8 in your diagram for ultra-clean notation.',
      },
      {
        qNo: 'Q34',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: 'A wooden article was made by scooping out a hemisphere from each end of a solid cylinder. If height of cylinder is 10 cm and base radius is 3.5 cm, find total surface area of the article. (π = 22/7)',
        solution:
          'Given r = 3.5 cm, h = 10 cm.\nTSA = CSA of cylinder + 2 × CSA of hemisphere\n= 2πrh + 2(2πr²) = 2πr(h + 2r)\n= 2 × (22/7) × 3.5 × (10 + 7)\n= 22 × 17 = 374 cm².',
        markingTip: 'Scooping out adds internal curved surface area (+2πr² per hemisphere), never subtract!',
      },
      {
        qNo: 'Q35',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: 'Find the Mean and Median of the following frequency distribution:\n0–20: 6, 20–40: 8, 40–60: 10, 60–80: 12, 80–100: 6, 100–120: 5, 120–140: 3.',
        solution:
          'N = 50; N/2 = 25.\nClass midpoints xᵢ: 10, 30, 50, 70, 90, 110, 130.\nΣfᵢxᵢ = 60 + 240 + 500 + 840 + 540 + 550 + 390 = 3120.\nMean = 3120 / 50 = 62.4.\n\nCumulative frequencies: 6, 14, 24, 36, 42, 47, 50.\nMedian class = 60–80 (l = 60, cf = 24, f = 12, h = 20).\nMedian = 60 + [(25 − 24)/12] × 20 = 60 + 20/12 = 60 + 1.67 = 61.67.',
        markingTip: 'Show full table with xᵢ, fᵢxᵢ, and cf columns.',
      },
      {
        qNo: 'Q36',
        section: 'Section E (4 Marks Case Study)',
        marks: 4,
        question: 'Case Study (Quadratic Equations): A rectangular park has perimeter 80 m and area 400 m².\n(i) Express length and breadth in one variable.\n(ii) Form the quadratic equation.\n(iii) Find the length and breadth of the park.',
        solution:
          '(i) 2(l + b) = 80 ⇒ l + b = 40. Let breadth = x m ⇒ length = (40 − x) m.\n(ii) Area = x(40 − x) = 400 ⇒ x² − 40x + 400 = 0.\n(iii) (x − 20)² = 0 ⇒ x = 20 m. So length = 20 m, breadth = 20 m (square park).',
        markingTip: 'Discriminant D = 0 indicates equal dimensions (a square).',
      },
      {
        qNo: 'Q37',
        section: 'Section E (4 Marks Case Study)',
        marks: 4,
        question: 'Case Study (Triangles): A girl of height 90 cm walks away from the base of a lamp-post at 1.2 m/s. Lamp is 3.6 m above the ground.\n(i) Find distance walked in 4 seconds.\n(ii) State why triangle formed by lamp-post & shadow is similar to girl & shadow.\n(iii) Find length of her shadow after 4 seconds.',
        solution:
          '(i) Distance BD = 1.2 × 4 = 4.8 m.\n(ii) Both triangles are right-angled (90°) and share the common shadow-tip angle (AA similarity).\n(iii) Girl height = 0.9 m. Let shadow DE = x.\n3.6 / 0.9 = (4.8 + x) / x ⇒ 4 = (4.8 + x)/x ⇒ 4x = 4.8 + x ⇒ 3x = 4.8 ⇒ x = 1.6 m.',
        markingTip: 'Convert 90 cm to 0.9 m before setting up ratios.',
      },
      {
        qNo: 'Q38',
        section: 'Section E (4 Marks Case Study)',
        marks: 4,
        question: 'Case Study (Circles & Sectors): A brooch is made with silver wire in the form of a circle of diameter 35 mm. The wire is also used in making 5 diameters dividing the circle into 10 equal sectors.\n(i) Find the radius.\n(ii) Find total length of silver wire required.\n(iii) Find the area of each sector. (π = 22/7)',
        solution:
          '(i) Radius r = 35/2 = 17.5 mm.\n(ii) Wire length = Circumference + 5 diameters = 2πr + 5(35) = (22/7)×35 + 175 = 110 + 175 = 285 mm.\n(iii) Area of each sector = (1/10) × πr² = (1/10) × (22/7) × (35/2) × (35/2) = 385/4 = 96.25 mm².',
        markingTip: 'Use fraction 35/2 instead of 17.5 for cleaner cancellation with 22/7.',
      },
    ],
  },

  // ============================================================================
  // 3. SCIENCE — 2024 BOARD (CODE 31/1/1) — FULL 39 QUESTIONS (80 MARKS)
  // ============================================================================
  {
    classNumber: 10,
    subjectSlug: 'science',
    subjectName: 'Science',
    examYear: '2024 Board',
    paperCode: '31/1/1',
    title: 'CBSE Class 10 Science — 2024 Full Board Paper (80 Marks · 39 Qs)',
    driveFolderUrl: CLASS_10_DRIVE_FOLDER_URL,
    qaItems: [
      // Section A: Q1–Q20 (1 Mark each = 20 Marks)
      {
        qNo: 'Q1',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'When aqueous solutions of potassium iodide and lead(II) nitrate are mixed, an insoluble yellow precipitate is formed. Name the precipitate and write the type of reaction:\n(A) PbI₂, Double displacement   (B) KNO₃, Combination   (C) PbI₂, Decomposition   (D) PbO, Displacement',
        solution: 'Correct Option: (A) PbI₂, Double displacement\n\n2KI(aq) + Pb(NO₃)₂(aq) → PbI₂(s)↓ (yellow ppt) + 2KNO₃(aq). Mutual exchange of ions occurs.',
        markingTip: 'PbI₂ (lead iodide) is a signature yellow precipitate in Chapter 1.',
      },
      {
        qNo: 'Q2',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'A metal ribbon X burns in oxygen with a dazzling white flame forming a white ash Y. X and Y are:\n(A) X = Ca, Y = CaO   (B) X = Mg, Y = MgO   (C) X = Al, Y = Al₂O₃   (D) X = Zn, Y = ZnO',
        solution: 'Correct Option: (B) X = Mg, Y = MgO\n\n2Mg(s) + O₂(g) → 2MgO(s) (white powder, dazzling white flame).',
        markingTip: 'Activity 1.1: Magnesium ribbon is cleaned with sandpaper to remove basic MgCO₃/MgO layer.',
      },
      {
        qNo: 'Q3',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Which of the following salts does NOT contain water of crystallisation?\n(A) Blue vitriol   (B) Baking soda   (C) Washing soda   (D) Gypsum',
        solution: 'Correct Option: (B) Baking soda\n\nBaking soda is NaHCO₃ (anhydrous). Blue vitriol = CuSO₄·5H₂O; Washing soda = Na₂CO₃·10H₂O; Gypsum = CaSO₄·2H₂O.',
        markingTip: 'Memorise formulas of all 4 hydrated/anhydrous salts in Chapter 2.',
      },
      {
        qNo: 'Q4',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'The pH of fresh milk is 6. When it turns into curd, its pH:\n(A) Becomes > 7   (B) Increases to 7   (C) Decreases below 6   (D) Remains 6',
        solution: 'Correct Option: (C) Decreases below 6\n\nLactobacillus converts lactose sugar into lactic acid, increasing H⁺ concentration and lowering pH.',
        markingTip: 'More acidic = lower pH value.',
      },
      {
        qNo: 'Q5',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'An element X reacts with O₂ to form an oxide with high melting point which is also soluble in water. X is likely:\n(A) Calcium   (B) Carbon   (C) Silicon   (D) Iron',
        solution: 'Correct Option: (A) Calcium\n\n2Ca + O₂ → 2CaO (ionic solid, high MP); CaO + H₂O → Ca(OH)₂ (soluble).',
        markingTip: 'CO₂ is gas, SiO₂ & Fe₂O₃ are insoluble in water.',
      },
      {
        qNo: 'Q6',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Bronze is an alloy of:\n(A) Copper and Zinc   (B) Copper and Tin   (C) Aluminium and Tin   (D) Lead and Tin',
        solution: 'Correct Option: (B) Copper and Tin\n\nBrass = Cu + Zn; Bronze = Cu + Sn; Solder = Pb + Sn.',
        markingTip: 'Note the distinction: Brass has Z(inc), BronZe has Tin (Sn).',
      },
      {
        qNo: 'Q7',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'How many covalent bonds are present in ethane (C₂H₆)?\n(A) 6   (B) 7   (C) 8   (D) 5',
        solution: 'Correct Option: (B) 7\n\n6 C–H single bonds + 1 C–C single bond = 7 covalent bonds.',
        markingTip: 'Never forget to count the C–C bond(s)!',
      },
      {
        qNo: 'Q8',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'In human beings, the breakdown of pyruvate to give CO₂, water, and energy takes place in:\n(A) Cytoplasm   (B) Mitochondria   (C) Chloroplast   (D) Nucleus',
        solution: 'Correct Option: (B) Mitochondria\n\nGlycolysis (glucose → pyruvate) happens in cytoplasm; aerobic respiration (pyruvate → CO₂ + H₂O + 38 ATP) occurs in mitochondria.',
        markingTip: 'Anaerobic yeast → ethanol + CO₂ (cytoplasm); Muscle cramps → lactic acid (cytoplasm).',
      },
      {
        qNo: 'Q9',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Which plant hormone promotes cell division especially in rapidly dividing fruits and seeds?\n(A) Auxin   (B) Gibberellin   (C) Cytokinin   (D) Abscisic acid',
        solution: 'Correct Option: (C) Cytokinin\n\nCytokinins promote cell division; Auxin = cell elongation/phototropism; Abscisic acid = growth inhibitor (wilting).',
        markingTip: '"Cyto" = cell, "kinin" = division.',
      },
      {
        qNo: 'Q10',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Which organism reproduces by multiple fission?\n(A) Amoeba   (B) Plasmodium   (C) Hydra   (D) Spirogyra',
        solution: 'Correct Option: (B) Plasmodium\n\nMalarial parasite Plasmodium divides into many daughter cells simultaneously inside a cyst.',
        markingTip: 'Amoeba/Leishmania = binary fission; Yeast/Hydra = budding; Planaria = regeneration.',
      },
      {
        qNo: 'Q11',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'A Mendelian cross between tall (TT) and dwarf (tt) pea plants gives all tall F₁ progeny. Selfing F₁ gives F₂ in phenotypic ratio:\n(A) 1 : 2 : 1   (B) 3 : 1   (C) 9 : 3 : 3 : 1   (D) 2 : 1',
        solution: 'Correct Option: (B) 3 : 1\n\n3 Tall (1 TT + 2 Tt) : 1 Dwarf (1 tt). Genotypic ratio is 1 : 2 : 1.',
        markingTip: 'Check whether question asks Phenotypic (3:1) or Genotypic (1:2:1).',
      },
      {
        qNo: 'Q12',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'The focal length of a convex lens is 25 cm. Its power is:\n(A) +4.0 D   (B) −4.0 D   (C) +0.04 D   (D) +2.5 D',
        solution: 'Correct Option: (A) +4.0 D\n\nf = +25 cm = +0.25 m ⇒ P = 1 / f(m) = 1 / 0.25 = +4.0 D.',
        markingTip: 'Convert cm to metres before calculating Power in Dioptres.',
      },
      {
        qNo: 'Q13',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'At what distance from a convex lens should an object be placed to get a real and inverted image of the same size?\n(A) At F   (B) At 2F   (C) Beyond 2F   (D) Between F and O',
        solution: 'Correct Option: (B) At 2F\n\nObject at 2F₁ forms a real, inverted, same-sized image at 2F₂.',
        markingTip: 'Same-size real image occurs at 2F for lenses and C for concave mirrors.',
      },
      {
        qNo: 'Q14',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'When white light passes through a glass prism, the colour that bends the MOST is:\n(A) Red   (B) Yellow   (C) Green   (D) Violet',
        solution: 'Correct Option: (D) Violet\n\nViolet has shortest wavelength and lowest speed in glass, hence maximum refractive index and maximum deviation.',
        markingTip: 'Red bends LEAST; Violet bends MOST.',
      },
      {
        qNo: 'Q15',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'A cylindrical wire of length l and cross-section A has resistance R. If stretched to double its length (volume constant), new resistance is:\n(A) R   (B) 2R   (C) 4R   (D) R/2',
        solution: 'Correct Option: (C) 4R\n\nLength doubles (l′ = 2l) ⇒ Area halves (A′ = A/2). R′ = ρ(2l)/(A/2) = 4R.',
        markingTip: 'Stretching n times multiplies resistance by n².',
      },
      {
        qNo: 'Q16',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'The percentage of solar energy absorbed by green plants in a terrestrial ecosystem is approximately:\n(A) 1%   (B) 10%   (C) 50%   (D) 90%',
        solution: 'Correct Option: (A) 1%\n\nProducers capture ~1% of sunlight; 10% applies to transfer between trophic levels.',
        markingTip: '1% solar capture vs 10% trophic transfer—don’t mix them!',
      },
      {
        qNo: 'Q17',
        section: 'Section A (1 Mark · Assertion-Reason)',
        marks: 1,
        question: 'Assertion (A): Decomposition of vegetable matter into compost is an endothermic reaction.\nReason (R): Decomposition reactions generally involve absorption of heat, light, or electricity.\n(A) Both A and R true, R explains A   (B) Both true, R does not explain A   (C) A true, R false   (D) A false, R true',
        solution: 'Correct Option: (D) A is false, R is true.\n\nComposting of vegetable matter releases heat and is an EXOTHERMIC reaction (NCERT Ch 1).',
        markingTip: 'Respiration and vegetable composting are classic exothermic exceptions.',
      },
      {
        qNo: 'Q18',
        section: 'Section A (1 Mark · Assertion-Reason)',
        marks: 1,
        question: 'Assertion (A): Probability of survival of an organism produced through sexual reproduction is higher than asexual reproduction.\nReason (R): Variations give survival advantage under changing environmental conditions.\n(A) Both A and R true, R explains A   (B) Both true, R does not explain A   (C) A true, R false   (D) A false, R true',
        solution: 'Correct Option: (A) Both A and R are true, and R is the correct explanation of A.',
        markingTip: 'Sexual reproduction combines DNA from two individuals, creating useful variations.',
      },
      {
        qNo: 'Q19',
        section: 'Section A (1 Mark · Assertion-Reason)',
        marks: 1,
        question: 'Assertion (A): Magnetic field lines never intersect each other.\nReason (R): If they intersected, the compass needle would point in two directions simultaneously at that point, which is impossible.\n(A) Both A and R true, R explains A   (B) Both true, R does not explain A   (C) A true, R false   (D) A false, R true',
        solution: 'Correct Option: (A) Both A and R are true, and R is the correct explanation of A.',
        markingTip: 'Tangent to field line gives unique magnetic field direction.',
      },
      {
        qNo: 'Q20',
        section: 'Section A (1 Mark · Assertion-Reason)',
        marks: 1,
        question: 'Assertion (A): Biodegradable substances result in the formation of compost and natural replenishment.\nReason (R): It is due to breakdown of complex organic matter into simple inorganic substances by decomposers.\n(A) Both A and R true, R explains A   (B) Both true, R does not explain A   (C) A true, R false   (D) A false, R true',
        solution: 'Correct Option: (A) Both A and R are true, and R is the correct explanation of A.',
        markingTip: 'Enzymes of bacteria and fungi act specifically on organic waste.',
      },
      // Section B: Q21–Q26 (2 Marks each = 12 Marks)
      {
        qNo: 'Q21',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Write a balanced chemical equation for the thermal decomposition of ferrous sulphate crystals and state the colour change observed.',
        solution: '2FeSO₄(s) —(Heat)→ Fe₂O₃(s) + SO₂(g) + SO₃(g).\nPale green crystals lose water to turn white and then decompose into reddish-brown ferric oxide (Fe₂O₃) with the smell of burning sulphur.',
        markingTip: 'Include state symbols and both SO₂ and SO₃ gases.',
      },
      {
        qNo: 'Q22',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Why does dry HCl gas not change the colour of dry blue litmus paper, whereas aqueous HCl solution turns it red?',
        solution: 'Acids show acidic character only in aqueous medium because H⁺ (or H₃O⁺) ions are formed only on dissociation in water. Dry HCl gas lacks free H⁺ ions, whereas HCl(aq) → H⁺(aq) + Cl⁻(aq), turning blue litmus red.',
        markingTip: 'Mention "absence of H⁺/H₃O⁺ ions in dry state".',
      },
      {
        qNo: 'Q23',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Why do ventricles have thicker muscular walls than atria in the human heart?',
        solution: 'Atria only pump blood into adjacent ventricles over a very short distance. Ventricles have to pump blood at high pressure to distant organs—the right ventricle to the lungs and the left ventricle to the entire body—so they require thick muscular walls.',
        markingTip: 'Left ventricle wall is the thickest chamber.',
      },
      {
        qNo: 'Q24',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'What is a reflex arc? Trace the sequence of events when you accidentally touch a hot object.',
        solution: 'A reflex arc is the neural pathway taken by nerve impulses in a reflex action.\nSequence: Heat stimulus → Thermoreceptors in skin → Sensory neuron → Spinal cord (relay neuron) → Motor neuron → Effector (bicep muscle contracts) → Hand withdrawn immediately.',
        markingTip: 'Write the pathway as a crisp arrow flowchart.',
      },
      {
        qNo: 'Q25',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Define Snell’s law of refraction. What does it mean to say the refractive index of diamond is 2.42?',
        solution: 'Snell’s Law: The ratio of sine of angle of incidence to sine of angle of refraction is constant for a given pair of media: sin i / sin r = n₂₁.\nRefractive index 2.42 means the ratio of speed of light in vacuum to speed of light in diamond is 2.42 (light travels 2.42 times slower in diamond than in vacuum).',
        markingTip: 'n = c / v clearly explains the physical meaning.',
      },
      {
        qNo: 'Q26',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'State two ways to prevent damage to the ozone layer and state how ozone is formed in the upper atmosphere.',
        solution: 'Formation: UV radiations split O₂ → O + O; free oxygen atoms combine with O₂ to form O₃ (ozone).\nPrevention: (1) Replace CFCs with ozone-friendly refrigerants (like HFCs/hydrocarbons); (2) Strictly enforce the Montreal Protocol limits on ozone-depleting aerosols/foams.',
        markingTip: 'Include O₂ + O → O₃ equation.',
      },
      // Section C: Q27–Q33 (3 Marks each = 21 Marks)
      {
        qNo: 'Q27',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Differentiate between Calcination and Roasting with balanced equations. How is zinc extracted from zinc oxide?',
        solution: '• Calcination: Heating carbonate ore strongly in limited/absence of air: ZnCO₃(s) —(Heat)→ ZnO(s) + CO₂(g).\n• Roasting: Heating sulphide ore strongly in excess air: 2ZnS(s) + 3O₂(g) —(Heat)→ 2ZnO(s) + 2SO₂(g).\n• Reduction: ZnO(s) + C(s) —(Heat)→ Zn(s) + CO(g).',
        markingTip: 'C(arbonate) → Calcination; S(ulphide) → Roasting.',
      },
      {
        qNo: 'Q28',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Explain why carbon forms covalent compounds rather than C⁴⁺ or C⁴⁻ ions. Also draw/describe electron sharing in CH₃COOH.',
        solution: 'Carbon (2, 4) cannot gain 4 e⁻ to form C⁴⁻ because 6 protons cannot hold 10 electrons stably; it cannot lose 4 e⁻ to form C⁴⁺ due to huge energy required. Hence it shares 4 valence electrons.\nIn CH₃COOH: Methyl carbon forms 3 C–H single bonds and 1 C–C single bond; carboxyl carbon forms 1 C=O double bond and 1 C–OH single bond.',
        markingTip: 'Explain BOTH C⁴⁻ nuclear instability and C⁴⁺ ionisation energy.',
      },
      {
        qNo: 'Q29',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'How is the small intestine designed to absorb digested food? State two roles of bile juice.',
        solution: 'Small intestine inner lining has millions of finger-like villi that vastly increase surface area and contain dense blood capillaries for rapid nutrient absorption.\nRoles of Bile: (1) Neutralises acidic chyme from stomach making it alkaline for pancreatic enzymes; (2) Emulsifies large fat globules into small droplets for lipase.',
        markingTip: 'Mention "villi" + both bile roles.',
      },
      {
        qNo: 'Q30',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'How is sex of a newborn child determined genetically in human beings?',
        solution: 'Human females have XX sex chromosomes (all eggs carry X). Males have XY (50% sperm carry X, 50% carry Y).\n• If an X-carrying sperm fertilises the egg → XX (girl).\n• If a Y-carrying sperm fertilises the egg → XY (boy).\nThus sex is determined by the chromosome inherited from the father with 50% probability.',
        markingTip: 'Draw a quick Punnett square (XX × XY) for full marks.',
      },
      {
        qNo: 'Q31',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Why do stars twinkle whereas planets do not? Explain the role of atmospheric refraction.',
        solution: 'Atmospheric refraction is the bending of light through air layers of fluctuating optical density.\nStars are extremely distant point-sized light sources; continuous density changes shift their apparent position and brightness rapidly, causing twinkling.\nPlanets are much closer and act as extended sources (collection of many point sources); variations average out to zero, so planets do not twinkle.',
        markingTip: 'Highlight "point source" vs "extended source".',
      },
      {
        qNo: 'Q32',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'State Fleming’s Left-Hand Rule. Why is an earth wire connected to metallic appliances?',
        solution: 'Fleming’s Left-Hand Rule: Stretch thumb, forefinger, and middle finger mutually perpendicular; forefinger = Magnetic Field (B), middle finger = Current (I), then thumb = Force/Motion (F).\nEarth Wire: Connects metallic casing to earth via low-resistance path, preventing electric shock if live wire touches the body.',
        markingTip: 'Specify "mutually perpendicular" in the rule statement.',
      },
      {
        qNo: 'Q33',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'An electric heater of resistance 8 Ω draws 15 A from the service mains for 2 hours. Calculate the rate at which heat is developed in the heater.',
        solution: 'Rate of heat developed = Power P = I²R.\nGiven I = 15 A, R = 8 Ω.\nP = 15² × 8 = 225 × 8 = 1800 W (or 1800 J/s).',
        markingTip: '"Rate at which heat is developed" means Power (J/s or W), NOT total heat I²Rt!',
      },
      // Section D: Q34–Q36 (5 Marks each = 15 Marks)
      {
        qNo: 'Q34',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: '(a) Complete the esterification reaction between ethanoic acid and ethanol in presence of conc. H₂SO₄.\n(b) What is saponification? Write its chemical equation.\n(c) Explain cleansing action of soap.',
        solution:
          '(a) CH₃COOH + C₂H₅OH —(Conc. H₂SO₄)→ CH₃COOC₂H₅ (Ethyl ethanoate, sweet-smelling ester) + H₂O.\n(b) Saponification is alkaline hydrolysis of an ester to form alcohol and sodium salt of carboxylic acid (soap):\nCH₃COOC₂H₅ + NaOH → C₂H₅OH + CH₃COONa.\n(c) Soap molecules have a hydrophobic hydrocarbon tail (attaches to oil/grease) and a hydrophilic ionic head (–COO⁻Na⁺, stays in water), forming spherical micelles that trap dirt and wash away on rinsing.',
        markingTip: 'Clearly contrast hydrophobic tail vs hydrophilic head.',
      },
      {
        qNo: 'Q35',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: '(a) State the functions of Ovary, Oviduct (Fallopian tube), and Uterus in the human female reproductive system.\n(b) Explain what happens when the egg is NOT fertilised.\n(c) List two contraceptive methods and one advantage of condoms.',
        solution:
          '(a) Ovary: Produces ova (eggs) and hormones oestrogen/progesterone. Oviduct: Site of fertilisation and transports egg to uterus. Uterus: Implantation and development of embryo/foetus.\n(b) Unfertilised egg lives ~1 day; the thick spongy uterine lining breaks down and discharges with blood and mucus through vagina as menstruation (lasts 2–8 days).\n(c) Contraceptives: Barrier (condoms), Hormonal (oral pills), IUCD (Copper-T), Surgical (tubectomy/vasectomy). Condoms also prevent Sexually Transmitted Diseases (STDs).',
        markingTip: 'Mention exact site of fertilisation = Oviduct / Fallopian tube.',
      },
      {
        qNo: 'Q36',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: '(a) An object 4 cm high is placed at 25 cm in front of a concave mirror of focal length 15 cm. Find screen position, nature, and size of image.\n(b) Two lamps rated 100 W, 220 V and 60 W, 220 V are connected in parallel to 220 V supply. Find total current drawn.',
        solution:
          '(a) h = +4 cm, u = −25 cm, f = −15 cm.\n1/v = 1/f − 1/u = −1/15 + 1/25 = −2/75 ⇒ v = −37.5 cm (in front of mirror).\nm = −v/u = −(−37.5)/(−25) = −1.5 ⇒ h′ = −6.0 cm (Real, inverted, enlarged).\n\n(b) In parallel across 220 V: P_total = 100 + 60 = 160 W.\nI = P_total / V = 160 / 220 = 8/11 ≈ 0.73 A.',
        markingTip: 'State Cartesian sign convention explicitly at the top.',
      },
      // Section E: Q37–Q39 (4 Marks Case Study each = 12 Marks)
      {
        qNo: 'Q37',
        section: 'Section E (4 Marks Case Study)',
        marks: 4,
        question: 'Case Study (Acids, Bases & Salts): Brine (aqueous NaCl) undergoes electrolysis in the Chlor-Alkali process.\n(i) Name the three products formed and the electrodes where gases evolve.\n(ii) Write the balanced chemical equation.\n(iii) State one use of the gas liberated at anode in water treatment.',
        solution:
          '(i) Products: NaOH (near cathode), H₂ gas (at cathode), Cl₂ gas (at anode).\n(ii) 2NaCl(aq) + 2H₂O(l) —(Electricity)→ 2NaOH(aq) + Cl₂(g) + H₂(g).\n(iii) Chlorine (Cl₂) is used to disinfect drinking water and swimming pools, and to manufacture bleaching powder.',
        markingTip: 'Remember anode (+ve) attracts negative Cl⁻ ions → Cl₂ gas.',
      },
      {
        qNo: 'Q38',
        section: 'Section E (4 Marks Case Study)',
        marks: 4,
        question: 'Case Study (Control & Coordination): During an emergency, a hormone is secreted directly into blood causing heart rate to rise and more oxygen to reach skeletal muscles.\n(i) Name this hormone and its endocrine gland.\n(ii) How does breathing rate change and why?\n(iii) What happens to blood supply to digestive system and skin?',
        solution:
          '(i) Adrenaline secreted by the Adrenal glands.\n(ii) Breathing rate increases due to faster contractions of diaphragm and rib muscles to supply extra oxygen.\n(iii) Blood supply to digestive system and skin reduces due to contraction of muscles around their small arteries, diverting blood towards skeletal muscles.',
        markingTip: 'Cite the exact NCERT mechanism of blood diversion.',
      },
      {
        qNo: 'Q39',
        section: 'Section E (4 Marks Case Study)',
        marks: 4,
        question: 'Case Study (Light — Lenses): A student uses a convex lens of focal length 10 cm to read tiny letters on a stamp.\n(i) Where should the stamp be placed to act as a magnifying glass?\n(ii) State the nature of image formed in this case.\n(iii) If the student instead places an object 15 cm in front of this lens, find image distance and magnification.',
        solution:
          '(i) Between Optical Centre (O) and Principal Focus (F), i.e., u < 10 cm.\n(ii) Virtual, erect, and magnified.\n(iii) u = −15 cm, f = +10 cm.\n1/v = 1/f + 1/u = 1/10 − 1/15 = (3 − 2)/30 = +1/30 ⇒ v = +30 cm.\nm = v/u = 30/(−15) = −2 (real, inverted, 2× magnified).',
        markingTip: 'Watch lens formula sign: 1/v − 1/u = 1/f (minus, unlike mirror +).',
      },
    ],
  },

  // ============================================================================
  // 4. SCIENCE — 2023 BOARD (CODE 31/2/1) — FULL 39 QUESTIONS (80 MARKS)
  // ============================================================================
  {
    classNumber: 10,
    subjectSlug: 'science',
    subjectName: 'Science',
    examYear: '2023 Board',
    paperCode: '31/2/1',
    title: 'CBSE Class 10 Science — 2023 Full Board Paper (80 Marks · 39 Qs)',
    driveFolderUrl: CLASS_10_DRIVE_FOLDER_URL,
    qaItems: [
      {
        qNo: 'Q1',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Electrolysis of water gives H₂ and O₂ gases in the volume ratio:\n(A) 1 : 2   (B) 2 : 1   (C) 1 : 8   (D) 8 : 1',
        solution: 'Correct Option: (B) 2 : 1\n\n2H₂O → 2H₂ + O₂. Volume ratio H₂ : O₂ = 2 : 1 (mass ratio is 1 : 8).',
        markingTip: 'Distinguish Volume ratio (2:1) from Mass ratio (1:8).',
      },
      {
        qNo: 'Q2',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Which of the following is an amphoteric oxide?\n(A) Na₂O   (B) SO₂   (C) Al₂O₃   (D) CaO',
        solution: 'Correct Option: (C) Al₂O₃\n\nAluminium oxide (Al₂O₃) and Zinc oxide (ZnO) react with both acids and bases.',
        markingTip: 'Al₂O₃ and ZnO are the two key amphoteric oxides in NCERT.',
      },
      {
        qNo: 'Q3',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Nettle sting injects which acid causing burning pain?\n(A) Acetic acid   (B) Citric acid   (C) Methanoic acid   (D) Tartaric acid',
        solution: 'Correct Option: (C) Methanoic acid\n\nBoth ant sting and nettle sting inject methanoic (formic) acid, HCOOH.',
        markingTip: 'Dock plant leaves rubbed nearby neutralise the sting.',
      },
      {
        qNo: 'Q4',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Which metal is stored under kerosene oil due to vigorous reaction with air and water?\n(A) Magnesium   (B) Sodium   (C) Iron   (D) Copper',
        solution: 'Correct Option: (B) Sodium\n\nSodium and Potassium catch fire in open air/cold water.',
        markingTip: 'Alkali metals Na and K are kept immersed in kerosene.',
      },
      {
        qNo: 'Q5',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Functional group present in propanone (CH₃COCH₃) is:\n(A) Alcohol   (B) Aldehyde   (C) Ketone   (D) Carboxylic acid',
        solution: 'Correct Option: (C) Ketone\n\nSuffix "-one" indicates a ketone (–CO–) group.',
        markingTip: '-ol = alcohol, -al = aldehyde, -one = ketone, -oic acid = carboxylic.',
      },
      {
        qNo: 'Q6',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'What is the colour of phenolphthalein indicator in a basic solution like NaOH(aq)?\n(A) Colourless   (B) Pink   (C) Yellow   (D) Blue',
        solution: 'Correct Option: (B) Pink\n\nPhenolphthalein is colourless in acidic/neutral solutions and pink in basic solutions.',
        markingTip: 'Methyl orange turns red in acid, yellow in base.',
      },
      {
        qNo: 'Q7',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Which reaction is used to convert unsaturated vegetable oils into saturated vegetable ghee?\n(A) Oxidation   (B) Addition / Hydrogenation   (C) Substitution   (D) Esterification',
        solution: 'Correct Option: (B) Addition / Hydrogenation\n\nH₂ adds across C=C double bonds in presence of Ni/Pd catalyst.',
        markingTip: 'Name Nickel (Ni) or Palladium (Pd) as catalyst.',
      },
      {
        qNo: 'Q8',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Opening and closing of stomatal pores is controlled by:\n(A) Guard cells   (B) Xylem vessels   (C) Sieve tubes   (D) Mesophyll',
        solution: 'Correct Option: (A) Guard cells\n\nGuard cells swell when water flows in (stomata open) and shrink when water leaves (close).',
        markingTip: 'Turgidity of guard cells drives stomatal opening.',
      },
      {
        qNo: 'Q9',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'The gap between two neurons across which impulse passes chemically is called:\n(A) Dendrite   (B) Axon   (C) Synapse   (D) Myelin sheath',
        solution: 'Correct Option: (C) Synapse\n\nElectrical impulse releases neurotransmitters across the synapse to trigger the next neuron.',
        markingTip: 'Synapse ensures one-way impulse transmission.',
      },
      {
        qNo: 'Q10',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'After fertilisation in a flowering plant, which part develops into the fruit?\n(A) Ovule   (B) Ovary   (C) Sepal   (D) Anther',
        solution: 'Correct Option: (B) Ovary\n\nOvary ripens into fruit; ovule develops into seed.',
        markingTip: 'Ovary → Fruit; Ovule → Seed; Zygote → Embryo.',
      },
      {
        qNo: 'Q11',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Which part of the human brain maintains posture and balance of the body?\n(A) Cerebrum   (B) Cerebellum   (C) Medulla   (D) Pons',
        solution: 'Correct Option: (B) Cerebellum\n\nCerebellum (hind-brain) coordinates voluntary muscle movements, posture, and balance.',
        markingTip: 'Medulla controls involuntary acts like BP, salivation, and vomiting.',
      },
      {
        qNo: 'Q12',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Which mirror always forms an erect and diminished image of an object kept anywhere in front of it?\n(A) Concave mirror   (B) Convex mirror   (C) Plane mirror   (D) None',
        solution: 'Correct Option: (B) Convex mirror\n\nBecause of its wider field of view and erect diminished image, it is used as a rear-view mirror.',
        markingTip: 'Only convex mirror guarantees erect + diminished image for all real objects.',
      },
      {
        qNo: 'Q13',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'A person cannot clearly see objects beyond 1.5 m. Which defect is he suffering from and what lens corrects it?\n(A) Hypermetropia, Convex   (B) Myopia, Concave   (C) Presbyopia, Bifocal   (D) Astigmatism',
        solution: 'Correct Option: (B) Myopia, Concave\n\nNear-sightedness (far point < ∞) is corrected using a diverging (concave) lens.',
        markingTip: 'Myopia = Concave lens; Hypermetropia = Convex lens.',
      },
      {
        qNo: 'Q14',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Commercial unit of electrical energy is kilowatt-hour (kWh). 1 kWh equals:\n(A) 3.6 × 10⁵ J   (B) 3.6 × 10⁶ J   (C) 3.6 × 10³ J   (D) 36 × 10⁶ J',
        solution: 'Correct Option: (B) 3.6 × 10⁶ J\n\n1 kWh = 1000 W × 3600 s = 3,600,000 J = 3.6 × 10⁶ J.',
        markingTip: '1 unit on electricity bill = 1 kWh = 3.6 × 10⁶ J.',
      },
      {
        qNo: 'Q15',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'Strength of magnetic field inside a long current-carrying straight solenoid is:\n(A) More at ends   (B) Minimum in middle   (C) Same at all points   (D) Zero',
        solution: 'Correct Option: (C) Same at all points\n\nField lines inside a long solenoid are parallel and equidistant, indicating a uniform magnetic field.',
        markingTip: 'Parallel equidistant lines = uniform magnetic field.',
      },
      {
        qNo: 'Q16',
        section: 'Section A (1 Mark)',
        marks: 1,
        question: 'What is the nature of domestic electric supply in India?\n(A) DC, 110 V, 60 Hz   (B) AC, 220 V, 50 Hz   (C) AC, 110 V, 50 Hz   (D) DC, 220 V, 50 Hz',
        solution: 'Correct Option: (B) AC, 220 V, 50 Hz.',
        markingTip: 'Standard Indian mains: 220 V AC at 50 Hz.',
      },
      {
        qNo: 'Q17',
        section: 'Section A (1 Mark · Assertion-Reason)',
        marks: 1,
        question: 'Assertion (A): Silver articles turn black after some time when exposed to air.\nReason (R): Silver reacts with sulphur in the air to form a coating of silver sulphide.\n(A) Both A and R true, R explains A   (B) Both true, R does not explain A   (C) A true, R false   (D) A false, R true',
        solution: 'Correct Option: (A) Both A and R are true, and R is the correct explanation of A.\n\nBlack coating is Ag₂S; green on copper is basic copper carbonate.',
        markingTip: 'Know corrosion products for Fe (rust), Ag (Ag₂S black), and Cu (green).',
      },
      {
        qNo: 'Q18',
        section: 'Section A (1 Mark · Assertion-Reason)',
        marks: 1,
        question: 'Assertion (A): Valves are present in arteries to prevent backflow of blood.\nReason (R): Arteries carry blood away from the heart under high pressure.\n(A) Both A and R true, R explains A   (B) Both true, R does not explain A   (C) A true, R false   (D) A false, R true',
        solution: 'Correct Option: (D) A is false, R is true.\n\nValves are present in VEINS (low pressure), NOT in arteries.',
        markingTip: 'Arteries have thick elastic walls; veins have thin walls + valves.',
      },
      {
        qNo: 'Q19',
        section: 'Section A (1 Mark · Assertion-Reason)',
        marks: 1,
        question: 'Assertion (A): Alloys are commonly used in electrical heating devices like toasters and irons.\nReason (R): Alloys have higher resistivity than constituent metals and do not oxidise readily at high temperatures.\n(A) Both A and R true, R explains A   (B) Both true, R does not explain A   (C) A true, R false   (D) A false, R true',
        solution: 'Correct Option: (A) Both A and R are true, and R is the correct explanation of A.',
        markingTip: 'Nichrome has high resistivity and high melting/oxidation resistance.',
      },
      {
        qNo: 'Q20',
        section: 'Section A (1 Mark · Assertion-Reason)',
        marks: 1,
        question: 'Assertion (A): Accumulation of harmful chemicals is maximum in the highest trophic level of a food chain.\nReason (R): Harmful chemicals are sprayed on crops to protect them from pests.\n(A) Both A and R true, R explains A   (B) Both true, R does not explain A   (C) A true, R false   (D) A false, R true',
        solution: 'Correct Option: (B) Both A and R are true, but R does not fully explain A (biomagnification occurs because these chemicals are non-biodegradable and accumulate at each trophic level).',
        markingTip: 'Key reason for biomagnification = "non-biodegradable nature".',
      },
      {
        qNo: 'Q21',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'State the role of (i) Salivary amylase and (ii) Hydrochloric acid (HCl) in human digestion.',
        solution: '(i) Salivary amylase breaks down starch into simple sugar (maltose) in the mouth.\n(ii) HCl creates an acidic medium in the stomach activating pepsin for protein digestion and kills harmful microbes.',
        markingTip: 'Name the exact substrate and product.',
      },
      {
        qNo: 'Q22',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Why are ionic compounds solids with high melting points and why do they conduct electricity only in molten or aqueous state?',
        solution: 'Strong electrostatic forces of attraction between oppositely charged ions require large energy to break, causing high melting points. In solid state ions are fixed in a rigid lattice; in molten/aqueous state ions become free to move and conduct electricity.',
        markingTip: 'Mention "strong electrostatic attraction" and "free mobile ions".',
      },
      {
        qNo: 'Q23',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Differentiate between Binary Fission in Amoeba and Leishmania.',
        solution: 'In Amoeba, splitting of the cell during division can take place in ANY plane. In Leishmania (which has a whip-like flagellum at one end), binary fission occurs in a DEFINITE longitudinal orientation in relation to the flagellum.',
        markingTip: 'Contrast "any plane" vs "definite orientation".',
      },
      {
        qNo: 'Q24',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Draw/describe the direction of magnetic field lines around a straight current-carrying conductor. Name the rule used.',
        solution: 'Magnetic field lines form concentric circles centred on the wire in a plane perpendicular to it.\nRule: Right-Hand Thumb Rule — if the right thumb points along the current direction, curled fingers show the direction of magnetic field lines.',
        markingTip: 'Also note field strength increases with current and decreases with distance.',
      },
      {
        qNo: 'Q25',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'Why does the clear sky appear blue from Earth, and dark to an astronaut in space?',
        solution: 'Fine particles in Earth’s atmosphere scatter shorter-wavelength blue light strongly in all directions (Rayleigh scattering), making the sky look blue. In outer space there is no atmosphere to scatter sunlight, so the sky appears dark.',
        markingTip: 'Contrast "scattering of shorter blue wavelengths" vs "absence of atmosphere".',
      },
      {
        qNo: 'Q26',
        section: 'Section B (2 Marks)',
        marks: 2,
        question: 'State two differences between biodegradable and non-biodegradable wastes with one example each.',
        solution: '• Biodegradable: Broken down by microbial enzymes into harmless substances (e.g., vegetable peels, paper).\n• Non-biodegradable: Cannot be broken down by biological processes and persist causing pollution (e.g., plastics, DDT).',
        markingTip: 'Give concrete examples for both.',
      },
      {
        qNo: 'Q27',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Define Oxidation and Reduction in terms of oxygen/hydrogen. Identify oxidised and reduced substances in: CuO + H₂ → Cu + H₂O.',
        solution: '• Oxidation: Gain of oxygen or loss of hydrogen.\n• Reduction: Loss of oxygen or gain of hydrogen.\nIn CuO + H₂ → Cu + H₂O:\n• Substance oxidised: H₂ (gains oxygen to form H₂O)\n• Substance reduced: CuO (loses oxygen to form Cu)\n• Oxidising agent: CuO; Reducing agent: H₂.',
        markingTip: 'Both oxidised and reduced substances are always chosen from the REACTANTS.',
      },
      {
        qNo: 'Q28',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'What is Plaster of Paris? Write its chemical formula, preparation from gypsum, and two uses.',
        solution: 'Formula: CaSO₄·½H₂O (Calcium sulphate hemihydrate).\nPreparation: Heating gypsum at 373 K:\nCaSO₄·2H₂O —(373 K)→ CaSO₄·½H₂O + 1½H₂O.\nUses: (1) Supporting fractured bones in right position; (2) Making toys, decorative casts, and smooth wall surfaces.',
        markingTip: 'Mention exact temperature 373 K (above 373 K forms dead burnt plaster CaSO₄).',
      },
      {
        qNo: 'Q29',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Describe double circulation in human beings. Why is it necessary?',
        solution: 'Blood passes through the heart twice in one complete cycle:\n1. Pulmonary circulation: Right ventricle → Lungs (oxygenation) → Left atrium.\n2. Systemic circulation: Left ventricle → Body organs → Right atrium.\nNecessity: Keeps oxygenated and deoxygenated blood completely separated, ensuring high energy efficiency required by warm-blooded mammals and birds to maintain constant body temperature.',
        markingTip: 'Link separation of blood to high energy demand of warm-blooded animals.',
      },
      {
        qNo: 'Q30',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Explain phototropism in plants with the role of auxin.',
        solution: 'Phototropism is directional growth movement of a plant shoot towards light.\nWhen growing shoot detects light from one side, auxin diffuses towards the shady side. Higher auxin concentration stimulates cells on the shady side to grow longer than those on the lit side, causing the shoot to bend towards light.',
        markingTip: 'Mention auxin accumulation on the SHADY side.',
      },
      {
        qNo: 'Q31',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'Write three advantages of connecting domestic appliances in parallel rather than in series.',
        solution: '1. Each appliance receives full rated mains voltage (220 V) and draws current according to its resistance.\n2. Each appliance has its own independent switch and works even if another is switched off or fused.\n3. Total equivalent resistance decreases, allowing high-power devices to operate properly.',
        markingTip: 'Three distinct points = 3 full marks.',
      },
      {
        qNo: 'Q32',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'What is a fuse? How does it protect electrical circuits? Why should it have high resistance and low melting point?',
        solution: 'A fuse is a safety wire connected in series with the live wire.\nIf current exceeds safe limit (overloading/short-circuiting), Joule heating (H = I²Rt) melts the fuse wire immediately, breaking the circuit and protecting appliances.\nHigh resistivity + low melting point ensure it heats up and melts rapidly when excess current flows.',
        markingTip: 'Fuse is always connected in SERIES in the LIVE wire.',
      },
      {
        qNo: 'Q33',
        section: 'Section C (3 Marks)',
        marks: 3,
        question: 'State the structural and functional unit of the kidney. Explain how urine is formed.',
        solution: 'Unit: Nephron.\nSteps: (1) Glomerular filtration in Bowman’s capsule filters water, glucose, amino acids, salts, and urea.\n(2) Selective reabsorption in renal tubule reabsorbs useful glucose, amino acids, salts, and needed water back into blood.\n(3) Tubular secretion adds excess ions/wastes, collecting urine into collecting duct → ureter → urinary bladder.',
        markingTip: 'Name all 3 stages: Filtration, Selective Reabsorption, Secretion.',
      },
      {
        qNo: 'Q34',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: '(a) Draw/explain the first three members of the homologous series of alcohols.\n(b) Why do members of a homologous series show similar chemical properties but graded physical properties?\n(c) Write reaction of ethanol with hot conc. H₂SO₄.',
        solution:
          '(a) CH₃OH (Methanol), C₂H₅OH (Ethanol), C₃H₇OH (Propanol).\n(b) Similar chemical properties arise from the same functional group (–OH). Physical properties (boiling point, solubility) vary gradually because molecular mass increases by –CH₂– (14 u) per member.\n(c) Dehydration: CH₃CH₂OH —(Hot conc. H₂SO₄, 443 K)→ CH₂=CH₂ (Ethene) + H₂O.',
        markingTip: 'Hot conc. H₂SO₄ acts as a dehydrating agent.',
      },
      {
        qNo: 'Q35',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: '(a) Differentiate between self-pollination and cross-pollination.\n(b) Trace the path from pollination to seed formation in angiosperms.',
        solution:
          '(a) Self-pollination transfers pollen to stigma of same flower (or same plant), giving less variation; cross-pollination transfers pollen to another plant of same species via wind/insects/water, promoting genetic variation.\n(b) Pollen lands on stigma → germinates to form pollen tube growing down the style into ovary → male germ cell enters ovule and fuses with egg cell (fertilisation) → forms zygote → divides to form embryo inside ovule → ovule develops tough coat becoming seed while ovary grows into fruit.',
        markingTip: 'Trace all structures in order: Stigma → Style → Ovary → Ovule.',
      },
      {
        qNo: 'Q36',
        section: 'Section D (5 Marks)',
        marks: 5,
        question: 'Three resistors of 6 Ω, 12 Ω, and 4 Ω are connected: (a) in series and (b) in parallel across a 12 V battery. Find equivalent resistance and total current in each case.',
        solution:
          '(a) Series: R_s = 6 + 12 + 4 = 22 Ω.\nCurrent I_s = V / R_s = 12 / 22 = 6/11 ≈ 0.545 A.\n\n(b) Parallel: 1/R_p = 1/6 + 1/12 + 1/4 = (2 + 1 + 3)/12 = 6/12 = 1/2 ⇒ R_p = 2 Ω.\nCurrent I_p = V / R_p = 12 / 2 = 6 A.',
        markingTip: 'Remember to take reciprocal at the end of parallel formula!',
      },
      {
        qNo: 'Q37',
        section: 'Section E (4 Marks Case Study)',
        marks: 4,
        question: 'Case Study (Metals & Corrosion): An iron nail dipped in blue CuSO₄ solution turns brownish and the solution becomes pale green.\n(i) Write the balanced chemical equation.\n(ii) Name the type of reaction and explain why it occurs.\n(iii) What happens if a copper strip is placed in FeSO₄ solution?',
        solution:
          '(i) Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s).\n(ii) Displacement reaction; Iron is more reactive than copper in the reactivity series, so it displaces Cu²⁺ ions from CuSO₄.\n(iii) No reaction occurs because copper is less reactive than iron.',
        markingTip: 'Link colour change: Blue CuSO₄ → Pale green FeSO₄ + Brown Cu deposit.',
      },
      {
        qNo: 'Q38',
        section: 'Section E (4 Marks Case Study)',
        marks: 4,
        question: 'Case Study (Heredity): Mendel crossed pure round yellow seeded pea plants (RRYY) with wrinkled green ones (rryy).\n(i) What were the F₁ progeny traits?\n(ii) State the F₂ phenotypic ratio.\n(iii) What new recombinant combinations appeared in F₂ and what law did it prove?',
        solution:
          '(i) All F₁ progeny were Round and Yellow (RrYy).\n(ii) F₂ phenotypic ratio = 9 : 3 : 3 : 1.\n(iii) Recombinants: Round Green and Wrinkled Yellow; proved Law of Independent Assortment (traits are inherited independently).',
        markingTip: '9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green.',
      },
      {
        qNo: 'Q39',
        section: 'Section E (4 Marks Case Study)',
        marks: 4,
        question: 'Case Study (Our Environment): Grass → Grasshopper → Frog → Snake → Eagle.\n(i) If 20,000 J of solar energy falls on grass, how much energy reaches the frog?\n(ii) Why are food chains limited to 3–4 trophic levels?\n(iii) Define biological magnification.',
        solution:
          '(i) Grass captures 1% of 20,000 J = 200 J. By 10% Law: Grasshopper = 20 J; Frog = 2 J.\n(ii) At each trophic step ~90% energy is lost as heat/life processes, leaving negligible usable energy beyond 3–4 steps.\n(iii) Progressive increase in concentration of non-biodegradable toxins at higher trophic levels.',
        markingTip: 'Watch solar energy (1% capture first!) vs producer energy (10% directly).',
      },
    ],
  },
];
