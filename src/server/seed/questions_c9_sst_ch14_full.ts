import { CompactQuestion, expandQuestions } from './types.ts';

// Class 9 Social Science (Understanding Society: India and Beyond, Part 2) — Chapter 14: Governance and Public Policy
// 80 original MCQs (16 per level: 8 in Set 1, 8 in Set 2)

const RAW: CompactQuestion[] = [
  // ================= LEVEL 1 (BASIC) — SET 1 =================
  [
    1, 1,
    'What is "public policy" in a democratic government?',
    'A purposeful course of action, law, or programme adopted by government to address public problems and welfare needs',
    'A private family budget prepared at home',
    'A secret rule known only to one company',
    'A sports tournament schedule',
    'A',
    'Public policy refers to formal government decisions, laws, schemes, and regulations designed to solve collective societal issues.',
    'factual'
  ],
  [
    1, 1,
    'How many tiers of government operate in India’s federal democratic structure?',
    'Three tiers — Union (Central), State, and Local (Panchayats and Municipalities)',
    'One single tier only',
    'Two tiers with no local bodies',
    'Five completely independent countries',
    'A',
    'Following the 73rd and 74th Constitutional Amendments, India operates a three-tier governance system: Union, State, and Local.',
    'factual'
  ],
  [
    1, 1,
    'Which branch of government is primarily responsible for implementing public policies and day-to-day administration?',
    'The Executive (political leadership and civil services)',
    'The Judiciary alone',
    'Private cinema halls',
    'Foreign embassies',
    'A',
    'The Executive—comprising elected ministers and permanent civil servants—executes laws and delivers public programmes.',
    'factual'
  ],
  [
    1, 1,
    'Which law enacted in India in 2005 empowers citizens to request official information from public authorities to promote transparency?',
    'Right to Information (RTI) Act',
    'Motor Vehicles Act',
    'Copyright Act',
    'Indian Contract Act',
    'A',
    'The RTI Act, 2005 enables citizens to seek records and hold public officials accountable for decisions and spending.',
    'factual'
  ],
  [
    1, 1,
    'What is the Public Distribution System (PDS) primarily designed to provide?',
    'Subsidised essential food grains like rice and wheat to eligible households for food security',
    'Free luxury cars to citizens',
    'Private airline tickets',
    'Stock market investment advice',
    'A',
    'PDS distributes subsidised food staples through Fair Price Shops to protect vulnerable families from hunger and price spikes.',
    'factual'
  ],
  [
    1, 1,
    'Which flagship Indian rural employment guarantee scheme provides at least 100 days of wage employment per year to rural households?',
    'MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act)',
    'SEBI',
    'ISRO',
    'RBI',
    'A',
    'MGNREGA legally guarantees 100 days of unskilled manual wage work to rural households while creating durable village assets.',
    'factual'
  ],
  [
    1, 1,
    'What does "e-governance" mean?',
    'Using digital information and communication technology to deliver government services transparently and efficiently',
    'Eliminating all government schools',
    'Replacing elections with video games',
    'Printing documents only on palm leaves',
    'A',
    'E-governance leverages online portals, digital IDs, and direct benefit transfers to make public services faster and more transparent.',
    'factual'
  ],
  [
    1, 1,
    'Which body in a village allows all adult voters to directly participate in local planning and social audits?',
    'Gram Sabha',
    'Supreme Court',
    'Rajya Sabha',
    'Election Commission',
    'A',
    'The Gram Sabha is the foundational institution of direct participatory democracy in rural India.',
    'factual'
  ],

  // ================= LEVEL 1 (BASIC) — SET 2 =================
  [
    1, 2,
    'Which national scheme provides hot cooked nutritious meals to children in government and government-aided schools?',
    'PM POSHAN (Mid-Day Meal Scheme)',
    'Make in India',
    'UDAN',
    'FASTag',
    'A',
    'PM POSHAN improves classroom nutrition, attendance, and social equality among school children.',
    'factual'
  ],
  [
    1, 2,
    'Which permanent body of trained, merit-selected officers assists elected ministers in formulating and executing public policy?',
    'The Civil Services (Bureaucracy)',
    'Political party youth wings',
    'Cricket boards',
    'Private advertising agencies',
    'A',
    'The permanent executive (IAS, IPS, state civil services, etc.) provides administrative continuity and technical expertise.',
    'factual'
  ],
  [
    1, 2,
    'What is a "government budget"?',
    'An annual financial statement detailing estimated government revenues and planned public expenditures',
    'A list of private company profits',
    'A student’s monthly pocket money diary',
    'A weather forecast report',
    'A',
    'The annual budget translates policy priorities into concrete financial allocations across health, education, infrastructure, and defence.',
    'factual'
  ],
  [
    1, 2,
    'Which constitutional authority audits government accounts to ensure public funds are spent legally and efficiently?',
    'Comptroller and Auditor General (CAG) of India',
    'Reserve Bank of India',
    'Board of Control for Cricket',
    'National Film Archive',
    'A',
    'The CAG is an independent constitutional watchdog that audits Union and State government receipts and expenditures.',
    'factual'
  ],
  [
    1, 2,
    'What is the first stage of the public policy cycle?',
    'Problem identification and agenda-setting',
    'Final termination of the programme',
    'Auditing ten years later',
    'Printing tax receipts',
    'A',
    'Before a policy can be drafted, an issue must be recognised as a public concern and placed on the government’s agenda.',
    'factual'
  ],
  [
    1, 2,
    'Which urban local body governs sanitation, street lighting, water supply, and local roads in large Indian cities?',
    'Municipal Corporation',
    'Gram Panchayat',
    'Zila Parishad',
    'Lok Sabha',
    'A',
    'Municipal Corporations (Nagar Nigams) manage civic infrastructure and public services in metropolitan and large cities.',
    'factual'
  ],
  [
    1, 2,
    'Which national sanitation campaign aimed to eliminate open defecation and improve solid waste management across India?',
    'Swachh Bharat Mission',
    'Green Revolution',
    'White Revolution',
    'Blue Revolution',
    'A',
    'Launched in 2014, Swachh Bharat Mission combined toilet construction, behavioural change, and urban-rural waste management.',
    'factual'
  ],
  [
    1, 2,
    'What does "accountability" in governance require?',
    'Public officials must answer for their actions, justify use of public funds, and face consequences for negligence or misuse',
    'Officials never have to explain their decisions',
    'Citizens cannot question any policy',
    'Budgets are kept completely secret',
    'A',
    'Accountability ensures that authority granted by citizens is exercised responsibly in the public interest.',
    'factual'
  ],

  // ================= LEVEL 2 (CONCEPTUAL) — SET 1 =================
  [
    2, 1,
    'How does "governance" differ from "government"?',
    'Government is the formal state machinery, whereas governance is the broader process of decision-making and implementation involving state institutions, citizens, and civil society',
    'Governance means abolishing all laws',
    'Government exists only in villages',
    'There is no connection between the two terms',
    'A',
    'Good governance emphasizes how power is exercised—inclusively, transparently, and responsively—in partnership with citizens.',
    'conceptual'
  ],
  [
    2, 1,
    'Why do governments provide "public goods" such as street lighting, national defence, and public parks instead of leaving them solely to private markets?',
    'Because public goods are non-excludable and non-rivalrous, so private firms may under-provide them for lack of direct profit',
    'Because private companies are legally banned from building parks',
    'Because public goods cost zero rupees to produce',
    'Because citizens never use roads or street lights',
    'A',
    'Since everyone benefits regardless of payment, the state funds public goods through taxation to ensure universal availability.',
    'conceptual'
  ],
  [
    2, 1,
    'What is the primary advantage of Direct Benefit Transfer (DBT) into beneficiaries’ bank accounts?',
    'It reduces middlemen, leakages, and ghost beneficiaries while ensuring faster, traceable welfare delivery',
    'It eliminates the need for banks',
    'It increases paperwork at every office',
    'It guarantees higher taxes for the poor',
    'A',
    'DBT channels subsidies directly into verified bank accounts, improving targeting and reducing corruption.',
    'conceptual'
  ],
  [
    2, 1,
    'Why is policy evaluation essential after a government scheme has been implemented?',
    'It measures whether the policy achieved its intended outcomes, identifies gaps, and guides course correction',
    'It is done merely to delay new laws',
    'It guarantees that no scheme is ever improved',
    'It replaces the need for Parliament',
    'A',
    'Evidence-based evaluation helps governments refine design flaws, reallocate funds, and improve citizen welfare.',
    'conceptual'
  ],
  [
    2, 1,
    'Why does India divide legislative subjects into the Union List, State List, and Concurrent List in the Seventh Schedule?',
    'To balance national unity and uniformity with regional flexibility and local responsiveness',
    'To prevent states from making any laws',
    'To ensure every law is passed twice for no reason',
    'To exclude local needs from governance',
    'A',
    'Clear federal division of powers lets the Union handle defence/foreign affairs while states address policing, agriculture, and local health.',
    'conceptual'
  ],
  [
    2, 1,
    'What is the purpose of a "social audit" in public welfare programmes like MGNREGA?',
    'Citizens and Gram Sabhas publicly verify official records against actual work done on the ground to prevent corruption',
    'Private banks check personal savings accounts',
    'Courts arrest all village workers',
    'Officials grade citizens on social media',
    'A',
    'Social audits turn beneficiaries into active monitors of public expenditure and project quality.',
    'conceptual'
  ],
  [
    2, 1,
    'Why is political neutrality expected of permanent civil servants?',
    'So they can advise any elected government objectively and implement lawful policies fairly without partisan bias',
    'So they can refuse to follow the Constitution',
    'So they can contest elections while in office',
    'So they serve only one political party forever',
    'A',
    'Impartial civil services ensure smooth transitions of power and equal treatment of all citizens.',
    'conceptual'
  ],
  [
    2, 1,
    'How do non-governmental organisations (NGOs) and citizen groups contribute to public policy?',
    'By researching grassroots issues, advocating for marginalised groups, piloting innovations, and monitoring service delivery',
    'By replacing the Supreme Court',
    'By printing national currency',
    'By passing constitutional amendments directly',
    'A',
    'Civil society acts as a bridge between citizens and the state, enriching policy formulation and accountability.',
    'conceptual'
  ],

  // ================= LEVEL 2 (CONCEPTUAL) — SET 2 =================
  [
    2, 2,
    'What does "decentralisation" mean in Indian governance?',
    'Transferring authority, functions, and financial resources from higher tiers of government to elected local bodies closer to the people',
    'Concentrating all decisions in one central office',
    'Eliminating state governments',
    'Handing over courts to private corporations',
    'A',
    'Decentralisation improves efficiency because local communities understand their own water, school, and road needs best.',
    'conceptual'
  ],
  [
    2, 2,
    'Why do public policies often involve "trade-offs"?',
    'Public financial resources are limited, so increasing spending in one priority sector requires careful balancing against other competing needs',
    'Governments have unlimited money',
    'Every policy satisfies 100% of groups with zero cost',
    'Policies never require funding',
    'A',
    'Policymakers must weigh short-term costs against long-term social benefits under finite fiscal budgets.',
    'conceptual'
  ],
  [
    2, 2,
    'How does the Right to Education (RTE) Act exemplify a "rights-based" approach to public policy?',
    'It makes free and compulsory elementary education a legally enforceable entitlement for children aged 6 to 14 rather than mere charity',
    'It leaves schooling entirely optional for states',
    'It applies only to private colleges',
    'It removes all standards for school classrooms',
    'A',
    'Rights-based policies empower citizens with legal claims and impose binding duties on the state.',
    'conceptual'
  ],
  [
    2, 2,
    'What is the main difference between "direct taxes" and "indirect taxes" used to fund public policies?',
    'Direct taxes (like income tax) are paid directly by the earner based on ability to pay, while indirect taxes (like GST) are levied on goods and services',
    'Indirect taxes are paid only by government ministers',
    'Direct taxes are collected only on groceries',
    'Neither type of tax funds public services',
    'A',
    'Governments combine progressive direct taxes and broad-based indirect taxes to finance public infrastructure and welfare.',
    'conceptual'
  ],
  [
    2, 2,
    'Why is "inter-departmental coordination" critical for complex policies like malnutrition reduction?',
    'Malnutrition depends simultaneously on food security, clean drinking water, sanitation, maternal healthcare, and education',
    'Only one single clerk can solve malnutrition',
    'Departments should never share data with each other',
    'Health and sanitation are completely unrelated',
    'A',
    'Multi-dimensional social challenges require convergent action across health, women & child development, water, and education departments.',
    'conceptual'
  ],
  [
    2, 2,
    'What role does the judiciary play in public policy through Judicial Review and Public Interest Litigation (PIL)?',
    'It ensures laws and policies conform to the Constitution and protects fundamental rights when executive agencies fail to act',
    'It writes the annual Union Budget',
    'It campaigns for political parties',
    'It runs municipal garbage trucks directly',
    'A',
    'Courts safeguard constitutional limits and give marginalised citizens access to justice through PILs.',
    'conceptual'
  ],
  [
    2, 2,
    'Why is "digital divide" a concern when shifting public services entirely to e-governance platforms?',
    'Citizens lacking smartphones, internet connectivity, or digital literacy may be excluded unless assisted offline alternatives remain available',
    'Digital portals never require electricity',
    'Everyone in remote areas already has fibre-optic broadband',
    'Online systems automatically eliminate all human needs',
    'A',
    'Inclusive e-governance pairs online portals with Common Service Centres (CSCs) and offline support so no citizen is left behind.',
    'conceptual'
  ],
  [
    2, 2,
    'What is "grievance redressal" in citizen-centric governance?',
    'A structured mechanism allowing citizens to report service failures or delays and receive timely resolution',
    'A fee charged for voting in elections',
    'A ban on filing complaints against officials',
    'A ceremonial parade held once a year',
    'A',
    'Portals like CPGRAMS and Citizen’s Charters establish clear service timelines and complaint resolution channels.',
    'conceptual'
  ],

  // ================= LEVEL 3 (APPLICATION) — SET 1 =================
  [
    3, 1,
    'A village road sanctioned under a rural scheme remains half-built despite official records showing full payment. Which two democratic tools can villagers immediately use?',
    'Filing an RTI application for expenditure records and raising the issue in a Gram Sabha social audit',
    'Destroying the village school',
    'Refusing to pay electricity bills forever',
    'Waiting silently for fifty years',
    'A',
    'RTI provides documentary proof of billing, while a Gram Sabha social audit brings public scrutiny and official recovery action.',
    'application'
  ],
  [
    3, 1,
    'A city faces severe winter air pollution caused by vehicular emissions, construction dust, and nearby crop-residue burning. What kind of policy response is most effective?',
    'A coordinated multi-agency action plan combining public transit expansion, dust regulation, and farmer incentives for crop-residue machinery',
    'Asking only one school to plant two trees',
    'Shutting down all hospitals',
    'Ignoring emissions from neighbouring regions',
    'A',
    'Complex environmental problems require multi-tiered coordination across municipal, state, and neighbouring governments.',
    'application'
  ],
  [
    3, 1,
    'A state government notices high school dropout rates among adolescent girls in rural blocks. Which policy intervention directly addresses the root causes?',
    'Building functional girls’ toilets, providing safe transport/bicycles, scholarships, and community awareness programmes',
    'Increasing tuition fees for rural schools',
    'Closing all secondary schools in villages',
    'Banning girls from taking board exams',
    'A',
    'Targeted evidence-based interventions—such as sanitation facilities and bicycle schemes—have demonstrably boosted girls’ retention.',
    'application'
  ],
  [
    3, 1,
    'If a municipality wants to improve waste segregation at home, which combination of policy instruments works best?',
    'Clear rules, colour-coded bins, regular door-to-door collection, public awareness campaigns, and modest penalties for non-compliance',
    'Passing a law without providing any dustbins or collection trucks',
    'Imposing life imprisonment for mixing paper and plastic',
    'Dumping all waste into the nearest river',
    'A',
    'Effective public policy pairs infrastructure and citizen education with fair enforcement.',
    'application'
  ],
  [
    3, 1,
    'Before rolling out a new digital scholarship portal nationwide, the ministry tests it in 5 diverse districts for six months. What is this policy step called?',
    'A pilot project to test feasibility and fix bottlenecks before scaling up',
    'Final abolition of scholarships',
    'Constitutional amendment',
    'Judicial verdict',
    'A',
    'Piloting allows policymakers to identify technical or exclusion issues on a small scale before nationwide launch.',
    'application'
  ],
  [
    3, 1,
    'A small farmer needs crop insurance and soil health advice quickly without losing a full day’s wages travelling to the district headquarters. How can governance be improved?',
    'Delivering services through local Panchayat e-Seva / Common Service Centres and mobile helplines in local languages',
    'Requiring ten visits to the state capital',
    'Accepting forms only in foreign languages',
    'Closing all rural internet kiosks',
    'A',
    'Last-mile digital and local service delivery lowers transaction costs for rural citizens.',
    'application'
  ],
  [
    3, 1,
    'During a sudden flood, which tier of government typically serves as the first responder for immediate shelter and rescue while coordinating with State and National Disaster Response Forces?',
    'Local bodies and district administration working alongside State/NDRF teams',
    'Only foreign embassies',
    'Private stock exchanges',
    'Only the Supreme Court',
    'A',
    'Disaster management illustrates cooperative federalism, combining immediate local action with state and national relief capacities.',
    'application'
  ],
  [
    3, 1,
    'A hospital displays a "Citizen’s Charter" listing exact waiting times, free medicine lists, and the contact number of the grievance officer. What governance principle does this uphold?',
    'Transparency and service-level accountability',
    'Secrecy and bureaucratic delay',
    'Privatisation of public health',
    'Political censorship',
    'A',
    'Citizen’s Charters inform people of their service entitlements and hold agencies to measurable standards.',
    'application'
  ],

  // ================= LEVEL 3 (APPLICATION) — SET 2 =================
  [
    3, 2,
    'A state allocates 6% of its budget to preventive healthcare (immunisation, clean water, nutrition) rather than spending solely on emergency hospitals. What is the long-term policy benefit?',
    'Lower disease burden, healthier workforce, and reduced catastrophic medical expenses for families and the state',
    'Higher rates of infectious outbreaks',
    'Complete elimination of doctors',
    'Immediate bankruptcy of the state',
    'A',
    'Preventive health policies yield high social and economic returns by reducing avoidable illness.',
    'application'
  ],
  [
    3, 2,
    'When drafting a new National Education Policy, the government invites feedback from lakhs of teachers, parents, students, and state governments. Why is public consultation valuable?',
    'It incorporates diverse ground realities, improves policy legitimacy, and increases stakeholder ownership during implementation',
    'It delays laws deliberately without using any feedback',
    'It replaces elected legislatures',
    'It guarantees zero funding is needed',
    'A',
    'Participatory policymaking strengthens both technical quality and democratic legitimacy.',
    'application'
  ],
  [
    3, 2,
    'A health insurance scheme like Ayushman Bharat (PM-JAY) covers hospitalisation costs for low-income families. Which socio-economic risk does it primarily mitigate?',
    'Families slipping back into poverty due to sudden, catastrophic out-of-pocket medical bills',
    'Fluctuations in international gold prices',
    'Shortages of luxury cinema tickets',
    'Traffic jams on expressways',
    'A',
    'Health risk-pooling shields vulnerable households from medical indebtedness.',
    'application'
  ],
  [
    3, 2,
    'A municipal corporation publishes ward-wise road repair budgets and contractor names online with geotagged before-and-after photos. What problem does this design prevent?',
    'Ghost projects, inflated billing, and substandard construction',
    'Rainfall during monsoon',
    'Population growth in cities',
    'Traffic signal electricity use',
    'A',
    'Open data and geotagging allow citizens and auditors to verify physical output against public spending.',
    'application'
  ],
  [
    3, 2,
    'Why do public schemes often use "means testing" or socio-economic criteria (such as BPL/SECC lists) for certain subsidies?',
    'To target scarce public funds toward the most economically vulnerable households who need support most',
    'To ensure only billionaires receive food subsidies',
    'To increase administrative confusion randomly',
    'To eliminate all social welfare',
    'A',
    'Targeting maximises welfare impact per rupee spent when fiscal resources are finite.',
    'application'
  ],
  [
    3, 2,
    'If a state passes a law on a Concurrent List subject like education that conflicts with an existing Parliament law, what does the Constitution generally provide?',
    'The Union law prevails, unless the State law receives the President’s assent for application within that state',
    'Both laws are permanently cancelled',
    'Local Panchayats override Parliament',
    'The conflict is settled by a coin toss',
    'A',
    'Article 254 resolves Concurrent List conflicts while preserving a constitutional mechanism for state-specific exceptions.',
    'application'
  ],
  [
    3, 2,
    'A district collector uses real-time dashboards to track textbook delivery to every government school before the academic year starts. Which stage of the policy cycle is being strengthened?',
    'Implementation and monitoring',
    'Agenda-setting only',
    'Constitutional drafting',
    'Electoral campaigning',
    'A',
    'Active monitoring during implementation ensures that policies on paper translate into timely services on the ground.',
    'application'
  ],
  [
    3, 2,
    'How does reserving seats for women and marginalised communities (SC/ST) in Panchayats and Municipalities affect local public policy?',
    'It brings previously overlooked priorities—such as drinking water, maternal health, and neighbourhood safety—into local budgets',
    'It stops local bodies from meeting',
    'It abolishes local taxation',
    'It reduces voter turnout to zero',
    'A',
    'Empirical studies across India show that inclusive local representation broadens public investment in essential community services.',
    'application'
  ],

  // ================= LEVEL 4 (HIGHER-ORDER / ANALYSIS) — SET 1 =================
  [
    4, 1,
    'Assertion (A): Even a well-designed public policy can fail to achieve its goals if implementation capacity is weak. Reason (R): Frontline staffing, timely fund release, clear guidelines, and local monitoring determine whether citizens actually receive intended benefits.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'The "implementation gap" is a classic governance challenge where good legislative intent falters without capable last-mile delivery.',
    'assertion-reason'
  ],
  [
    4, 1,
    'Assertion (A): Cooperative federalism is essential for solving nationwide challenges like pandemics, climate resilience, and GST administration. Reason (R): Neither the Union nor State governments alone possess all constitutional powers and ground-level machinery needed to tackle cross-border crises.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Platforms like the GST Council and Inter-State Council institutionalise collaboration between the Centre and States.',
    'assertion-reason'
  ],
  [
    4, 1,
    'Case: A state switches its pension scheme from cash distribution by local agents to Aadhaar-seeded Direct Benefit Transfer. Leakages drop sharply, yet 4% of elderly beneficiaries with worn fingerprints face authentication failures. What is the most balanced policy fix?',
    'Retain DBT for transparency while providing reliable offline/OTP/iris fallback authentication and local facilitation camps so no genuine beneficiary is excluded',
    'Scrap DBT completely and return to unverified cash envelopes',
    'Ignore the 4% excluded elderly citizens',
    'Cancel pensions for everyone above 60',
    'A',
    'Good governance balances preventing "inclusion errors" (leakage) with preventing "exclusion errors" (denying genuine beneficiaries).',
    'case-based'
  ],
  [
    4, 1,
    'Case: A city builds an expensive flyover to ease traffic, but within two years congestion returns because more people buy private cars. Urban planners suggest investing in metro rail, buses, and safe footpaths instead. What policy lesson does this illustrate?',
    'Addressing root behavioural and systemic causes (public transit) is often more sustainable than short-term symptomatic fixes',
    'Cities should ban all public buses',
    'Flyovers can never carry vehicles',
    'Urban planning requires no data analysis',
    'A',
    'Induced demand shows why evidence-based policy analysis must consider long-term behavioural responses.',
    'case-based'
  ],
  [
    4, 1,
    'Distinguish between "outputs" and "outcomes" in evaluating an education policy.',
    'Outputs are immediate deliverables (number of classrooms built or textbooks distributed), whereas outcomes measure actual learning gains and literacy improvements',
    'Outputs and outcomes are always identical',
    'Outcomes measure only money spent, never learning',
    'Outputs refer only to agricultural crops',
    'A',
    'Focusing solely on inputs/outputs without tracking outcomes can mask poor service quality.',
    'conceptual'
  ],
  [
    4, 1,
    'Why is fiscal devolution (sharing taxes and grants via Finance Commissions) vital for the success of Panchayats and Municipalities?',
    'Without predictable funds and revenue powers, constitutionally assigned local functions remain paper mandates',
    'Local bodies do not need money to maintain water pipes or roads',
    'Finance Commissions only fund foreign governments',
    'Devolution prevents local elections from happening',
    'A',
    'Effective decentralisation requires aligning the "3 Fs": Functions, Funds, and Functionaries.',
    'conceptual'
  ],
  [
    4, 1,
    'How does a free press and independent media strengthen public policy?',
    'By investigating implementation failures, amplifying marginalised voices, and fostering informed public debate on policy alternatives',
    'By passing laws directly in Parliament',
    'By replacing all civil servants',
    'By concealing government budgets from citizens',
    'A',
    'Media scrutiny creates an early-warning feedback loop that encourages responsive governance.',
    'conceptual'
  ],
  [
    4, 1,
    'Why might a universal welfare scheme (e.g. mid-day meals for all government school children) sometimes be preferred over a narrowly targeted scheme?',
    'Universal coverage reduces stigma, avoids exclusion errors, cuts verification costs, and builds broad public support for quality',
    'Universal schemes cost nothing to fund',
    'Targeted schemes are always illegal',
    'Universal schemes exclude low-income children',
    'A',
    'Policymakers weigh targeting efficiency against universal simplicity, dignity, and political sustainability.',
    'conceptual'
  ],

  // ================= LEVEL 4 (HIGHER-ORDER / ANALYSIS) — SET 2 =================
  [
    4, 2,
    'Assertion (A): Transparency alone does not guarantee good governance unless paired with enforceable accountability. Reason (R): Exposing irregularities through RTI or audits improves outcomes only when institutions take timely corrective and disciplinary action.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Transparency is a necessary condition, but responsive enforcement completes the accountability loop.',
    'assertion-reason'
  ],
  [
    4, 2,
    'Assertion (A): Regulatory bodies such as TRAI, SEBI, and FSSAI play an important governance role alongside elected ministries. Reason (R): Complex modern sectors like telecom, securities, and food safety require specialised technical rules and fair oversight.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Independent sector regulators protect consumers, enforce safety standards, and ensure fair market competition.',
    'assertion-reason'
  ],
  [
    4, 2,
    'Case: A coastal state uses satellite weather alerts, cyclone shelters, and trained village volunteers to evacuate 1 million residents before a severe cyclone, keeping casualties near zero. What governance strength is demonstrated?',
    'Proactive preparedness, scientific integration, and community-level last-mile coordination',
    'Reliance on luck rather than planning',
    'Ignoring scientific forecasts',
    'Centralising all rescue boats in one distant city',
    'A',
    'India’s cyclone management in states like Odisha and Andhra Pradesh is globally cited as a model of effective public administration.',
    'case-based'
  ],
  [
    4, 2,
    'Case: An evaluation of a rural water scheme finds that 95% of villages received pipelines, but 30% of taps ran dry within a year due to lack of local maintenance funds. Which missing element caused this shortfall?',
    'Sustainability planning—specifically operation & maintenance (O&M) budgets and local technical training',
    'Lack of rainfall anywhere in India',
    'Excessive citizen participation',
    'Too many plumbers in every village',
    'A',
    'Durable public infrastructure requires ongoing maintenance financing and community ownership beyond initial construction.',
    'case-based'
  ],
  [
    4, 2,
    'What is "evidence-based policymaking"?',
    'Designing and refining public programmes using rigorous data, surveys, impact evaluations, and scientific research rather than guesswork',
    'Making policies based solely on rumours',
    'Copying laws blindly without checking local needs',
    'Refusing to collect any statistics',
    'A',
    'Data from surveys, censuses, and randomised evaluations helps governments invest limited funds in interventions that truly work.',
    'conceptual'
  ],
  [
    4, 2,
    'Why can excessive "red tape" (overly complex, repetitive bureaucratic procedures) harm both citizens and small businesses?',
    'It causes delays, raises compliance costs, discourages entrepreneurship, and creates opportunities for petty corruption',
    'It speeds up every approval automatically',
    'It eliminates all paperwork',
    'It boosts transparency and trust',
    'A',
    'Simplifying rules, setting time-bound approvals, and digitising filings improve ease of living and ease of doing business.',
    'conceptual'
  ],
  [
    4, 2,
    'How does the concept of "Minimum Government, Maximum Governance" relate to modern public administration?',
    'It advocates streamlining unnecessary controls while strengthening effective, transparent, citizen-friendly service delivery and regulation',
    'It means abolishing the Constitution and courts',
    'It means stopping all public education and health programmes',
    'It means eliminating elections',
    'A',
    'Modern governance aims to reduce bureaucratic friction while enhancing state capacity in essential public services.',
    'conceptual'
  ],
  [
    4, 2,
    'Why must public policies be sensitive to gender, region, and disability?',
    'A one-size-fits-all design can unintentionally overlook barriers faced by women, remote communities, or persons with disabilities',
    'Because uniform policies are always unconstitutional',
    'Because citizens in different regions have zero shared needs',
    'Because accessibility ramps cannot be built in public buildings',
    'A',
    'Inclusive design—such as accessible public transport and gender budgeting—ensures equitable benefits across all groups.',
    'conceptual'
  ],

  // ================= LEVEL 5 (COMPETITIVE / OLYMPIAD) — SET 1 =================
  [
    5, 1,
    'In public policy analysis, what is an "unintended consequence"?',
    'An unforeseen side effect—positive or negative—resulting from a policy intervention outside its stated objective',
    'The official budget printed in Parliament',
    'A law passed unanimously',
    'The signature of the President on a Bill',
    'A',
    'Anticipating behavioural responses helps policymakers minimise negative unintended consequences before scaling a rule.',
    'conceptual'
  ],
  [
    5, 1,
    'Which institution replaced the Planning Commission in 2015 to serve as India’s public policy think tank promoting cooperative and competitive federalism?',
    'NITI Aayog',
    'Election Commission of India',
    'Union Public Service Commission',
    'Law Commission',
    'A',
    'NITI Aayog (National Institution for Transforming India) designs strategic policy frameworks, tracks SDG indices, and fosters Centre-State collaboration.',
    'conceptual'
  ],
  [
    5, 1,
    'Case: NITI Aayog’s Aspirational Districts Programme ranks 112 historically underdeveloped districts monthly on health, nutrition, education, and basic infrastructure indicators. Which governance mechanism is this leveraging?',
    'Competitive federalism combined with real-time data monitoring and convergence of existing schemes',
    'Privatisation of district courts',
    'Abolition of state legislatures',
    'Cutting off all central grants to poor districts',
    'A',
    'Transparent indicator-based ranking motivates district teams to accelerate improvements in lagging human development metrics.',
    'case-based'
  ],
  [
    5, 1,
    'Assertion (A): Public-Private Partnerships (PPPs) are increasingly used in highways, ports, and urban utilities, yet require strong state oversight. Reason (R): Private capital and efficiency can accelerate infrastructure creation, while public regulation ensures fair user tariffs and service quality.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Well-governed PPPs combine private execution efficiency with public accountability and consumer protection.',
    'assertion-reason'
  ],
  [
    5, 1,
    'What is "inclusion error" versus "exclusion error" in targeted welfare schemes?',
    'Inclusion error occurs when ineligible people receive benefits; exclusion error occurs when genuinely deserving people are left out',
    'Both terms mean the exact same thing',
    'Exclusion error happens only in private companies',
    'Inclusion error refers to building extra schools',
    'A',
    'Welfare delivery systems strive to minimise both leakage (inclusion error) and deprivation of eligible citizens (exclusion error).',
    'conceptual'
  ],
  [
    5, 1,
    'Why is "participatory budgeting" practised in some Indian municipalities and Gram Sabhas considered a deepening of democracy?',
    'Residents directly deliberate and prioritise how a portion of local public funds should be spent on community projects',
    'It eliminates all taxes in the city',
    'It allows only wealthy residents to vote',
    'It replaces the Constitution',
    'A',
    'Participatory budgeting aligns public spending closely with citizen preferences and increases trust in local government.',
    'conceptual'
  ],
  [
    5, 1,
    'How does "nudging" (behavioural public policy) differ from traditional command-and-control regulation?',
    'It uses gentle cues, defaults, or social norms to encourage beneficial choices without banning alternatives or imposing heavy fines',
    'It relies exclusively on imprisonment',
    'It abolishes all public health campaigns',
    'It forces citizens to obey secret orders',
    'A',
    'Examples include prominent health warnings, opt-out savings defaults, and community pride campaigns in sanitation.',
    'conceptual'
  ],
  [
    5, 1,
    'Which sequence accurately represents the complete, iterative public policy cycle?',
    'Agenda-setting → Policy formulation → Adoption/Legitimation → Implementation → Monitoring & Evaluation → Feedback/Revision',
    'Evaluation → Implementation → Problem identification → Ignoring results',
    'Tax collection → Abolition → Formulation → Adoption',
    'Election → Secrecy → Termination',
    'A',
    'Public policy is a continuous feedback loop in which evaluation informs future redesign and improvement.',
    'conceptual'
  ],

  // ================= LEVEL 5 (COMPETITIVE / OLYMPIAD) — SET 2 =================
  [
    5, 2,
    'Why do economists and governance scholars stress "state capacity" alongside democratic elections?',
    'Elections choose leaders, but strong institutions, skilled personnel, and sound finances are needed to deliver quality schools, clinics, justice, and infrastructure',
    'State capacity means removing elections',
    'Elections automatically build roads without administration',
    'State capacity applies only to military parades',
    'A',
    'Democracy thrives when electoral legitimacy is matched by capable, responsive public institutions.',
    'conceptual'
  ],
  [
    5, 2,
    'What is "gender-responsive budgeting" in public finance?',
    'Analysing government budgets to ensure public spending equitably addresses the distinct needs of women and girls alongside men',
    'Creating a separate currency exclusively for women',
    'Spending zero funds on men’s healthcare',
    'Banning women from filing income tax returns',
    'A',
    'Gender budgeting tracks allocations for maternal health, women’s safety, education, and economic empowerment.',
    'conceptual'
  ],
  [
    5, 2,
    'Case: A municipal water utility installs smart meters, fixes leaking pipes reducing water loss from 40% to 12%, and offers a free basic lifeline quota for low-income households while charging higher rates for heavy luxury use. What two policy goals are reconciled here?',
    'Financial/environmental sustainability and social equity',
    'Waste promotion and inequality',
    'Secrecy and privatisation of rivers',
    'Elimination of drinking water',
    'A',
    'Lifeline tiered pricing ensures universal access to basic water while discouraging waste and funding pipe maintenance.',
    'case-based'
  ],
  [
    5, 2,
    'Assertion (A): Active, informed citizenship is the ultimate safeguard of good governance. Reason (R): Laws, audits, and digital portals work best when citizens participate in Gram Sabhas, vote responsibly, pay taxes honestly, and hold representatives accountable.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Governance is a two-way partnership between accountable institutions and engaged citizens.',
    'assertion-reason'
  ],
  [
    5, 2,
    'Which body in India recommends how net tax proceeds should be distributed between the Union and State governments every five years?',
    'The Finance Commission (under Article 280)',
    'The Election Commission',
    'The Supreme Court',
    'The Archaeological Survey of India',
    'A',
    'The Finance Commission ensures vertical (Centre-State) and horizontal (inter-State) fiscal equity in India’s federal system.',
    'conceptual'
  ],
  [
    5, 2,
    'What does "rule of law" guarantee in public administration?',
    'Every citizen and government official is subject to publicly enacted, fairly enforced laws rather than arbitrary personal discretion',
    'Senior officers are exempt from all laws',
    'Laws change secretly every hour',
    'Courts obey political party directives',
    'A',
    'Rule of law underpins predictability, fairness, and protection of citizen rights.',
    'conceptual'
  ],
  [
    5, 2,
    'When a country adopts the UN Sustainable Development Goals (SDGs) into national and state policy dashboards, what governance advantage is gained?',
    'Clear, measurable long-term targets linking poverty reduction, health, education, gender equality, and climate action',
    'Surrendering national sovereignty to foreign courts',
    'Eliminating all local village plans',
    'Stopping all industrial growth',
    'A',
    'Integrating SDGs aligns national and state budgets with holistic, sustainable human development.',
    'conceptual'
  ],
  [
    5, 2,
    'Why is "institutional memory" important in public policymaking?',
    'Documenting past successes and failures prevents successive administrations from repeating costly mistakes and supports continuous learning',
    'It forces governments to never update outdated rules',
    'It bans hiring young civil servants',
    'It keeps all policy evaluations locked away forever',
    'A',
    'Learning from institutional history improves policy continuity and effectiveness across decades.',
    'conceptual'
  ]
];

export const C9_SST_CH14_FULL_QUESTIONS = expandQuestions(9, 'social-science', 14, RAW);
