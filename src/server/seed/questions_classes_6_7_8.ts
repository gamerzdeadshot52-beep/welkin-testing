import { CompactQuestion, expandQuestions, SeedQuestion } from './types.ts';

// ==================== CLASS 6 ====================
// Class 6 Science (Curiosity) — Ch 1: The Wonderful World of Science
const C6_SCI_CH1: CompactQuestion[] = [
  [1, 1, 'What is the most important quality that drives scientific discovery according to "The Wonderful World of Science"?', 'Memorising long lists', 'Curiosity and asking "Why?" and "How?"', 'Avoiding experiments', 'Reading only once', 'B', 'Curiosity motivates us to observe carefully and ask questions about the world around us.', 'factual'],
  [1, 1, 'Which of the following is the correct first step in solving a daily-life problem scientifically (like a pen stopping writing)?', 'Throw the pen away immediately', 'Observe the problem and guess possible reasons (empty ink, dried nib)', 'Buy ten new notebooks', 'Ignore the pen', 'B', 'Observing and forming hypotheses (possible reasons) is how scientific thinking works in everyday life.', 'application'],
  [1, 1, 'Science is best compared to a giant:', 'Closed box', 'Unending jigsaw puzzle where each discovery adds new pieces', 'Single fixed page', 'Wall with no doors', 'B', 'NCERT Curiosity compares science to an endless jigsaw puzzle—new discoveries keep expanding our understanding.', 'factual'],
  [1, 1, 'Which state of water is ice?', 'Liquid', 'Solid', 'Gas', 'Plasma', 'B', 'Ice is the solid state of water formed when liquid water freezes.', 'factual'],
  [1, 1, 'What makes Earth unique among known planets in our Solar System?', 'It is the largest planet', 'It supports diverse life with liquid water, air, and suitable temperature', 'It has no atmosphere', 'It is closest to the Sun', 'B', 'Earth’s atmosphere, liquid water, and moderate temperature sustain living organisms.', 'factual'],
  [1, 1, 'If a light bulb does not glow when switched on, testing whether the bulb works in another lamp is an example of:', 'Guessing randomly', 'Testing a hypothesis through an experiment', 'Drawing a painting', 'Writing a poem', 'B', 'Testing the bulb in a working socket experimentally checks whether the bulb itself is faulty.', 'application'],
  [1, 1, 'Which of the following is a scientific question?', 'Why do stars appear to twinkle at night?', 'Which cartoon is the funniest?', 'What is the prettiest colour?', 'Who is the luckiest person?', 'A', 'Twinkling of stars can be investigated through observation and physics (atmospheric refraction).', 'conceptual'],
  [1, 1, 'What happens when liquid water is heated strongly in a kettle?', 'It turns into solid ice', 'It changes into water vapour (gas)', 'It disappears forever from Earth', 'It turns into metal', 'B', 'Heating liquid water causes evaporation/boiling into gaseous water vapour.', 'factual'],
  [1, 1, 'Why do scientists often work together in teams?', 'Because one person cannot hold a pencil', 'Because sharing ideas, observations, and skills helps solve complex problems faster', 'Because experiments are forbidden alone', 'To avoid writing notes', 'B', 'Collaboration allows scientists to check each other’s results and combine expertise.', 'conceptual'],
  [1, 1, 'Which of these everyday activities uses the scientific method?', 'A cook tasting and adjusting salt in dal after noticing it tastes bland', 'A bicycle rider checking why a tyre went flat by inspecting for punctures', 'An electrician testing a fuse when a fan stops', 'All of the above', 'D', 'Observing, hypothesising, and testing happen naturally in cooking, repairing, and troubleshooting.', 'application'],
];

// Class 6 Mathematics (Ganita Prakash) — Ch 1: Patterns in Mathematics
const C6_MATH_CH1: CompactQuestion[] = [
  [1, 1, 'What is the next number in the sequence of odd numbers: 1, 3, 5, 7, 9, ___?', '10', '11', '12', '13', 'B', 'Odd numbers increase by 2 each time: 9 + 2 = 11.', 'numerical'],
  [1, 1, 'Which sequence represents the square numbers?', '1, 2, 3, 4, 5', '1, 4, 9, 16, 25', '1, 3, 6, 10, 15', '2, 4, 6, 8, 10', 'B', 'Square numbers are 1², 2², 3², 4², 5² = 1, 4, 9, 16, 25.', 'factual'],
  [1, 1, 'What is the 5th triangular number in the sequence 1, 3, 6, 10, ___?', '12', '14', '15', '16', 'C', 'Triangular numbers add consecutive counting numbers: 10 + 5 = 15.', 'numerical'],
  [1, 1, 'What is the sum of the first 4 odd numbers (1 + 3 + 5 + 7)?', '12', '16', '20', '14', 'B', 'The sum of the first n odd numbers is always n². Here 4² = 16.', 'numerical'],
  [1, 1, 'What is the next number in the powers of 2 sequence: 1, 2, 4, 8, 16, ___?', '24', '30', '32', '64', 'C', 'Each term doubles the previous term: 16 × 2 = 32.', 'numerical'],
  [1, 1, 'In the Virahanka (Fibonacci) sequence 1, 2, 3, 5, 8, 13, ___, what comes next?', '18', '20', '21', '26', 'C', 'Each term is the sum of the previous two terms: 8 + 13 = 21.', 'numerical'],
  [1, 1, 'Adding two consecutive triangular numbers (such as 3 + 6 or 6 + 10) always produces a:', 'Prime number', 'Square number', 'Odd number only', 'Cube number', 'B', '3 + 6 = 9 (3²), 6 + 10 = 16 (4²); consecutive triangular numbers always sum to a square number.', 'conceptual'],
  [1, 1, 'What is the 4th cube number (4³)?', '12', '16', '64', '27', 'C', '4³ = 4 × 4 × 4 = 64.', 'numerical'],
  [1, 1, 'How many sides does a regular hexagon have?', '5', '6', '7', '8', 'B', 'A hexagon is a polygon with 6 equal sides and 6 equal angles.', 'factual'],
  [1, 1, 'What is the sum of 1 + 2 + 3 + 4 + 5 + 4 + 3 + 2 + 1?', '20', '25', '30', '15', 'B', 'Up-and-down sums peaking at n always equal n²; here 5² = 25.', 'numerical'],
];

// Class 6 Social Science (Exploring Society) — Ch 1: Locating Places on the Earth
const C6_SST_CH1: CompactQuestion[] = [
  [1, 1, 'What are the three essential components of a map?', 'Distance (scale), direction, and symbols', 'Colour, paper, and ink', 'Oceans, rivers, and roads', 'Cities, towns, and villages', 'A', 'Every standard map relies on scale (distance), cardinal directions, and conventional symbols.', 'factual'],
  [1, 1, 'Which imaginary line divides Earth into the Northern Hemisphere and the Southern Hemisphere?', 'Prime Meridian', 'Equator (0° latitude)', 'Tropic of Cancer', 'Arctic Circle', 'B', 'The Equator at 0° latitude divides Earth equally into Northern and Southern Hemispheres.', 'factual'],
  [1, 1, 'What is the longitude of the Prime Meridian passing through Greenwich?', '90° E', '0°', '180°', '82.5° E', 'B', 'The Prime Meridian is defined as 0° longitude.', 'factual'],
  [1, 1, 'Indian Standard Time (IST) is based on which meridian of longitude?', '0°', '82°30′ E (82.5° E)', '90° E', '75° E', 'B', 'IST is calculated from the 82.5° E meridian, which is 5 hours 30 minutes ahead of GMT.', 'factual'],
  [1, 1, 'How many hours ahead of Greenwich Mean Time (GMT) is Indian Standard Time (IST)?', '3 hours 30 minutes', '5 hours 30 minutes', '6 hours', '4 hours 30 minutes', 'B', 'At 15° per hour, 82.5° E ÷ 15° = 5.5 hours (5 hours 30 minutes) ahead of GMT.', 'numerical'],
  [1, 1, 'Which type of map shows natural features such as mountains, plateaus, plains, and rivers?', 'Political map', 'Physical map', 'Road map', 'Population map', 'B', 'Physical maps depict natural landforms and water bodies.', 'factual'],
  [1, 1, 'In which direction does the Sun appear to rise because Earth rotates from west to east?', 'West', 'East', 'North', 'South', 'B', 'Earth’s west-to-east rotation makes the Sun appear to rise in the east.', 'conceptual'],
  [1, 1, 'The network of intersecting parallels of latitude and meridians of longitude on a globe is called a:', 'Compass', 'Grid (coordinates)', 'Scale', 'Legend', 'B', 'The latitude–longitude grid lets us pinpoint any location on Earth accurately.', 'factual'],
  [1, 1, 'Which ancient Indian city served as the prime meridian (Madhya Rekha) for Indian astronomers like Varahamihira?', 'Pataliputra', 'Ujjayini (Ujjain)', 'Taxila', 'Madurai', 'B', 'Ancient Indian astronomical texts used Ujjayini (Ujjain) as the zero meridian for timekeeping.', 'factual'],
  [1, 1, 'If a map scale is 1 cm = 50 km, what actual distance is represented by 4 cm on the map?', '100 km', '150 km', '200 km', '250 km', 'C', 'Actual distance = 4 × 50 km = 200 km.', 'numerical'],
];

// ==================== CLASS 7 ====================
// Class 7 Science (Curiosity) — Ch 2: Exploring Substances: Acidic, Basic, and Neutral
const C7_SCI_CH2: CompactQuestion[] = [
  [1, 1, 'Which taste is generally associated with acidic substances like lemon juice and tamarind?', 'Bitter', 'Sour', 'Salty', 'Sweet', 'B', 'Acids (such as citric acid in lemons and tartaric acid in tamarind) have a characteristic sour taste.', 'factual'],
  [1, 1, 'What colour change occurs when blue litmus paper is dipped into an acidic solution?', 'Remains blue', 'Turns red', 'Turns green', 'Turns yellow', 'B', 'Acids turn blue litmus paper red.', 'factual'],
  [1, 1, 'What colour change occurs when red litmus paper is dipped into a basic (alkaline) solution like soap water?', 'Remains red', 'Turns blue', 'Turns colourless', 'Turns brown', 'B', 'Bases turn red litmus paper blue.', 'factual'],
  [1, 1, 'Turmeric stain on a white shirt turns reddish-brown when washed with soap because:', 'Soap is acidic', 'Soap solution is basic, and turmeric turns reddish-brown in bases', 'Water turns turmeric red', 'Turmeric reacts with cotton', 'B', 'Turmeric is a natural indicator that remains yellow in acids/neutral water and turns reddish-brown in bases.', 'application'],
  [1, 1, 'Which acid is present in vinegar?', 'Citric acid', 'Acetic acid', 'Lactic acid', 'Formic acid', 'B', 'Vinegar is a dilute aqueous solution of acetic acid.', 'factual'],
  [1, 1, 'What is the reaction between an acid and a base to form salt and water (with release of heat) called?', 'Combustion', 'Neutralisation', 'Evaporation', 'Rusting', 'B', 'Acid + Base → Salt + Water + Heat is a neutralisation reaction.', 'factual'],
  [1, 1, 'Why is milk of magnesia (magnesium hydroxide) taken to relieve stomach acidity?', 'It adds more acid', 'It is a mild base that neutralises excess hydrochloric acid in the stomach', 'It freezes stomach juice', 'It is a neutral salt', 'B', 'Antacids like milk of magnesia neutralise excess HCl in the stomach.', 'application'],
  [1, 1, 'Which substance is injected into the skin during an ant bite, and what household base helps soothe it?', 'Lactic acid; lemon juice', 'Formic acid; moist baking soda or calamine solution', 'Citric acid; vinegar', 'Oxalic acid; common salt', 'B', 'Ant stings inject formic acid, which is neutralised by mild bases like baking soda (NaHCO₃) or calamine (zinc carbonate).', 'application'],
  [1, 1, 'What colour does China rose (hibiscus) indicator turn in an acidic solution?', 'Green', 'Dark pink (magenta)', 'Blue', 'Colourless', 'B', 'China rose indicator turns dark pink/magenta in acids and green in bases.', 'factual'],
  [1, 1, 'A solution does not change the colour of either red litmus or blue litmus paper. This solution is:', 'Strongly acidic', 'Strongly basic', 'Neutral', 'A strong alkali', 'C', 'Neutral substances (like pure water or sugar solution) cause no change in red or blue litmus.', 'conceptual'],
];

// Class 7 Mathematics (Ganita Prakash) — Ch 1: Large Numbers Around Us
const C7_MATH_CH1: CompactQuestion[] = [
  [1, 1, 'In the Indian place value system, how many lakhs make 1 crore?', '10 lakhs', '100 lakhs', '1000 lakhs', '10,000 lakhs', 'B', '1 crore = 1,00,00,000 = 100 × 1,00,000 = 100 lakhs.', 'factual'],
  [1, 1, 'How many lakhs are equal to 1 million in the International system?', '1 lakh', '10 lakhs', '100 lakhs', '1000 lakhs', 'B', '1 million = 1,000,000 = 10 × 100,000 = 10 lakhs.', 'numerical'],
  [1, 1, 'How is the number 45,62,310 written in the International place value system?', '45,62,310', '4,562,310', '456,2310', '45,623,10', 'B', 'In the International system, commas separate groups of three digits from the right: 4,562,310.', 'factual'],
  [1, 1, 'What is 10⁶ written in standard numerical form?', '10,000', '100,000', '1,000,000', '10,000,000', 'C', '10⁶ is 1 followed by 6 zeros = 1,000,000 (one million / ten lakh).', 'numerical'],
  [1, 1, 'Round 7,84,620 to the nearest lakh.', '7,00,000', '8,00,000', '7,80,000', '7,90,000', 'B', 'The ten-thousands digit is 8 (≥ 5), so 7,84,620 rounds up to 8,00,000.', 'numerical'],
  [1, 1, 'How many crores make 1 billion?', '10 crores', '100 crores', '1000 crores', '1 crore', 'B', '1 billion = 1,000,000,000 = 100 × 10,000,000 = 100 crores.', 'numerical'],
  [1, 1, 'Which is greater: 1 crore or 10 million?', '1 crore is greater', '10 million is greater', 'Both are exactly equal', 'Cannot be compared', 'C', '1 crore = 10,000,000 = 10 million.', 'conceptual'],
  [1, 1, 'Estimate the sum 49,850 + 30,210 by rounding each number to the nearest ten thousand.', '70,000', '80,000', '90,000', '75,000', 'B', '50,000 + 30,000 = 80,000.', 'numerical'],
  [1, 1, 'What is the place value of 7 in 3,74,21,890?', '7 lakhs', '70 lakhs', '7 crores', '70 thousands', 'B', '7 sits in the ten-lakhs place, so its place value is 70,00,000 (70 lakhs).', 'numerical'],
  [1, 1, 'If a school library adds 2,500 books per year, how many books will it add in 40 years?', '10,000', '1,00,000', '10,00,000', '50,000', 'B', '2,500 × 40 = 1,00,000 (1 lakh) books.', 'numerical'],
];

// Class 7 Social Science (Exploring Society) — Ch 1: Geographical Diversity of India
const C7_SST_CH1: CompactQuestion[] = [
  [1, 1, 'Which lofty mountain range forms India’s northern physical boundary?', 'Western Ghats', 'The Himalayas', 'Aravalli Range', 'Vindhya Range', 'B', 'The Himalayas stretch across northern India, acting as a natural climatic and geographical barrier.', 'factual'],
  [1, 1, 'Which major desert lies in western India (primarily Rajasthan)?', 'Gobi Desert', 'Thar Desert', 'Sahara Desert', 'Kalahari Desert', 'B', 'The Thar (Great Indian) Desert lies in northwestern India.', 'factual'],
  [1, 1, 'Which three major river systems formed the fertile Northern Plains of India?', 'Narmada, Tapi, Mahi', 'Indus, Ganga, and Brahmaputra', 'Godavari, Krishna, Kaveri', 'Mahanadi, Periyar, Sabarmati', 'B', 'Alluvial deposits from the Indus, Ganga, and Brahmaputra systems created the fertile Northern Plains.', 'factual'],
  [1, 1, 'The Deccan Plateau is triangular in shape and is flanked by which two coastal mountain ranges?', 'Himalayas and Karakoram', 'Western Ghats and Eastern Ghats', 'Satpura and Shiwalik', 'Nilgiris and Ladakhi ranges', 'B', 'The Western Ghats and Eastern Ghats border the Deccan Plateau along the Arabian Sea and Bay of Bengal.', 'factual'],
  [1, 1, 'Which island group of India lies in the Arabian Sea and is composed mainly of coral islands?', 'Andaman and Nicobar Islands', 'Lakshadweep Islands', 'Majuli Island', 'Elephanta Island', 'B', 'Lakshadweep is an archipelago of coral islands in the Arabian Sea.', 'factual'],
  [1, 1, 'Which island group of India lies in the Bay of Bengal?', 'Lakshadweep', 'Andaman and Nicobar Islands', 'Diu', 'Salsette', 'B', 'The Andaman and Nicobar Islands are located in the Bay of Bengal.', 'factual'],
  [1, 1, 'Why are the Northern Plains among the most densely populated regions of India?', 'Because they have extreme cold', 'Because flat terrain, fertile alluvial soil, and abundant river water support intensive agriculture and transport', 'Because there is no rainfall', 'Because they are entirely rocky', 'B', 'Fertile soil, flat land, and water availability historically supported large agrarian and urban populations.', 'conceptual'],
  [1, 1, 'Which Indian region is known as a "cold desert"?', 'Thar', 'Ladakh', 'Konkan', 'Sundarbans', 'B', 'Ladakh in the rain-shadow of the Himalayas receives very little rainfall and experiences freezing winters.', 'factual'],
  [1, 1, 'The Sundarbans, the world’s largest mangrove delta, is formed by which rivers?', 'Indus and Jhelum', 'Ganga and Brahmaputra', 'Narmada and Tapi', 'Kaveri and Vaigai', 'B', 'The Ganga–Brahmaputra delta forms the vast Sundarbans mangrove ecosystem.', 'factual'],
  [1, 1, 'Which ancient fold mountain range in northwestern India is one of the oldest mountain systems in the world?', 'Himalayas', 'Aravalli Range', 'Western Ghats', 'Purvanchal', 'B', 'The Aravalli Range is an ancient eroded fold mountain range stretching across Rajasthan, Haryana, and Gujarat.', 'factual'],
];

// ==================== CLASS 8 ====================
// Class 8 Science (Curiosity) — Ch 2: The Invisible Living World: Beyond Our Naked Eye
const C8_SCI_CH2: CompactQuestion[] = [
  [1, 1, 'Which bacterium is responsible for converting milk into curd?', 'Rhizobium', 'Lactobacillus', 'Plasmodium', 'Penicillium', 'B', 'Lactobacillus multiplies in warm milk and converts lactose sugar into lactic acid, setting curd.', 'factual'],
  [1, 1, 'Which microorganism is used in baking bread and idli/dosa batter to make them soft and fluffy?', 'Amoeba', 'Yeast', 'Spirogyra', 'Paramecium', 'B', 'Yeast respires rapidly and releases carbon dioxide gas bubbles that make dough rise.', 'factual'],
  [1, 1, 'Who discovered the first antibiotic, penicillin, in 1929 from a mould?', 'Louis Pasteur', 'Alexander Fleming', 'Edward Jenner', 'Robert Koch', 'B', 'Alexander Fleming noticed Penicillium mould inhibiting bacterial growth and discovered penicillin.', 'factual'],
  [1, 1, 'Which symbiotic bacterium lives in the root nodules of leguminous plants (like peas and beans) and fixes atmospheric nitrogen?', 'Lactobacillus', 'Rhizobium', 'Vibrio cholerae', 'Yeast', 'B', 'Rhizobium converts atmospheric nitrogen into soluble nitrogen compounds usable by plants.', 'factual'],
  [1, 1, 'Malaria is caused by a protozoan (Plasmodium) transmitted by which insect vector?', 'Housefly', 'Female Anopheles mosquito', 'Female Aedes mosquito', 'Honeybee', 'B', 'Female Anopheles mosquitoes carry the malarial parasite Plasmodium.', 'factual'],
  [1, 1, 'What is the process of converting sugar into alcohol by yeast called?', 'Pasteurisation', 'Fermentation', 'Neutralisation', 'Distillation', 'B', 'Louis Pasteur discovered fermentation in 1857.', 'factual'],
  [1, 1, 'How does pasteurisation preserve milk without boiling it dry?', 'Freezing it solid', 'Heating milk to about 70 °C for 15–30 seconds and then rapidly chilling and storing it', 'Adding excess salt', 'Exposing it to sunlight', 'B', 'Rapid heating and chilling kills harmful microbes while retaining milk’s nutrition and taste.', 'factual'],
  [1, 1, 'Who discovered the vaccine for smallpox in 1798?', 'Edward Jenner', 'Louis Pasteur', 'Alexander Fleming', 'Robert Hooke', 'A', 'Edward Jenner pioneered vaccination by developing the smallpox vaccine.', 'factual'],
  [1, 1, 'Why are antibiotics NOT effective against common cold and influenza?', 'Antibiotics only work in winter', 'Common cold and flu are caused by viruses, whereas antibiotics target bacteria', 'Viruses are larger than bacteria', 'Antibiotics dissolve in water', 'B', 'Antibiotics disrupt bacterial cell walls or metabolism, which viruses do not possess.', 'conceptual'],
  [1, 1, 'Why do pickles and jams resist microbial spoilage for months?', 'They are kept in open air', 'High salt, oil, vinegar, or sugar draws moisture out of microbes and inhibits their growth', 'Microbes dislike glass jars', 'They contain antibiotics', 'B', 'Chemical preservatives like salt and sugar reduce available water, preventing microbial multiplication.', 'application'],
];

// Class 8 Mathematics (Ganita Prakash) — Ch 1: A Square and a Cube
const C8_MATH_CH1: CompactQuestion[] = [
  [1, 1, 'Which of the following numbers is a perfect square?', '24', '36', '48', '50', 'B', '36 = 6 × 6 = 6², so 36 is a perfect square.', 'factual'],
  [1, 1, 'A perfect square can NEVER end with which of the following unit digits?', '1, 4, 9', '2, 3, 7, or 8', '0, 5, 6', '4, 6, 9', 'B', 'Squaring digits 0–9 only yields unit digits 0, 1, 4, 5, 6, or 9; never 2, 3, 7, or 8.', 'conceptual'],
  [1, 1, 'What is the square root of 196?', '12', '13', '14', '16', 'C', '14 × 14 = 196, so √196 = 14.', 'numerical'],
  [1, 1, 'What is the cube of 5 (5³)?', '15', '25', '125', '625', 'C', '5³ = 5 × 5 × 5 = 125.', 'numerical'],
  [1, 1, 'What is the cube root of 216 (∛216)?', '4', '6', '8', '9', 'B', '6 × 6 × 6 = 216, so ∛216 = 6.', 'numerical'],
  [1, 1, 'How many non-square natural numbers lie between 5² (25) and 6² (36)?', '8', '10', '11', '12', 'B', 'Between n² and (n+1)² there are always 2n non-square numbers; here 2 × 5 = 10.', 'numerical'],
  [1, 1, 'What is the smallest natural number by which 18 must be multiplied to make it a perfect square?', '2', '3', '6', '9', 'A', '18 = 2 × 3². Multiplying by 2 gives 2² × 3² = 36 = 6².', 'numerical'],
  [1, 1, 'What is the Hardy–Ramanujan number—the smallest number expressible as the sum of two positive cubes in two different ways?', '1000', '1729', '1629', '2025', 'B', '1729 = 1³ + 12³ = 9³ + 10³.', 'factual'],
  [1, 1, 'What is the unit digit of 73²?', '3', '6', '9', '7', 'C', 'The unit digit of 73² matches the unit digit of 3² = 9.', 'numerical'],
  [1, 1, 'If the volume of a cube is 343 cm³, what is the length of each side?', '6 cm', '7 cm', '8 cm', '9 cm', 'B', 'Side = ∛343 = 7 cm, since 7 × 7 × 7 = 343.', 'numerical'],
];

// Class 8 Social Science (Exploring Society) — Ch 1: Natural Resources and Their Use
const C8_SST_CH1: CompactQuestion[] = [
  [1, 1, 'What makes a natural substance (like sunlight, wind, or iron ore) a "resource"?', 'Its colour', 'Its utility and value in satisfying human needs', 'Its weight', 'Its age alone', 'B', 'Utility or usability transforms a material from nature into a resource.', 'factual'],
  [1, 1, 'Which of the following is a renewable natural resource?', 'Coal', 'Solar energy', 'Petroleum', 'Natural gas', 'B', 'Solar energy is continuously replenished by nature and does not get exhausted by human use.', 'factual'],
  [1, 1, 'Coal and petroleum are classified as non-renewable resources because:', 'They are unlimited', 'They take millions of years to form and can be exhausted faster than nature replenishes them', 'They are made in factories daily', 'They only exist in oceans', 'B', 'Fossil fuels have finite reserves relative to human timescales.', 'conceptual'],
  [1, 1, 'What is "sustainable development"?', 'Using all resources as fast as possible today', 'Balancing present needs with conserving resources for future generations', 'Stopping all economic activity', 'Cutting all forests for timber', 'B', 'Sustainability ensures present prosperity without compromising the ability of future generations to meet their needs.', 'factual'],
  [1, 1, 'Which practice helps conserve freshwater resources in agriculture?', 'Flooding fields continuously', 'Drip irrigation and rainwater harvesting', 'Paving over all wetlands', 'Dumping waste into canals', 'B', 'Drip irrigation delivers water directly to plant roots, minimising evaporation and runoff.', 'application'],
  [1, 1, 'Which of the following is a biotic (living) natural resource?', 'Minerals', 'Forests and wildlife', 'Rocks', 'Wind', 'B', 'Biotic resources originate from living organisms (forests, fish, crops), whereas abiotic resources are non-living.', 'factual'],
  [1, 1, 'Why can even a renewable resource like groundwater become depleted?', 'Because water cannot rain anymore', 'When the rate of extraction exceeds the natural rate of recharge', 'Because groundwater is made of metal', 'Because trees drink all oceans', 'B', 'Over-extraction faster than natural aquifer recharge causes water tables to fall.', 'conceptual'],
  [1, 1, 'Which principle of the 3Rs helps reduce raw material extraction and landfill waste?', 'Reduce, Reuse, Recycle', 'Run, Rest, Repeat', 'Read, Record, Report', 'Remove, Replace, Rebuild', 'A', 'Reducing consumption, reusing items, and recycling materials directly lower ecological footprints.', 'factual'],
  [1, 1, 'Why are natural resources unevenly distributed across Earth?', 'Because of random map drawing', 'Due to differences in terrain, climate, altitude, and geological history', 'Because oceans are identical everywhere', 'Because all countries have equal rainfall', 'B', 'Physical factors such as geology and climate dictate where minerals, fertile soils, and forests occur.', 'conceptual'],
  [1, 1, 'What role do human skill and technology play in natural resources?', 'No role at all', 'They turn raw natural materials into useful goods and cleaner energy solutions', 'They destroy all resources automatically', 'They replace nature completely', 'B', 'Human ingenuity (human resource) creates solar panels, water filters, and efficient farming methods.', 'conceptual'],
];

export const CLASSES_6_7_8_QUESTIONS: SeedQuestion[] = [
  ...expandQuestions(6, 'mathematics', 1, C6_MATH_CH1),
  ...expandQuestions(6, 'social-science', 1, C6_SST_CH1),
  ...expandQuestions(7, 'science', 2, C7_SCI_CH2),
  ...expandQuestions(7, 'mathematics', 1, C7_MATH_CH1),
  ...expandQuestions(7, 'social-science', 1, C7_SST_CH1),
  ...expandQuestions(8, 'science', 2, C8_SCI_CH2),
  ...expandQuestions(8, 'mathematics', 1, C8_MATH_CH1),
  ...expandQuestions(8, 'social-science', 1, C8_SST_CH1),
];
