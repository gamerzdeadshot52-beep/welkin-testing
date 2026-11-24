import { CompactQuestion, expandQuestions } from './types.ts';

// Class 9 Social Science (Understanding Society: India and Beyond, Part 2) — Chapter 15: Managing Personal Finances and From Ideas to Startups
// 99 original MCQs (L1: 20 [10+10], L2: 20 [10+10], L3: 20 [10+10], L4: 20 [10+10], L5: 19 [10+9])

const RAW: CompactQuestion[] = [
  // ================= LEVEL 1 (BASIC) — SET 1 (10) =================
  [
    1, 1,
    'What is a personal budget?',
    'A structured plan for tracking income, prioritising expenses, and setting aside savings over a period',
    'A loan taken from an unregulated moneylender',
    'A list of luxury items bought on impulse',
    'A bank’s annual profit report',
    'A',
    'Budgeting helps individuals align their spending with income and achieve financial goals without falling into debt.',
    'factual'
  ],
  [
    1, 1,
    'In personal finance, which of the following is a "need" rather than a "want"?',
    'Nutritious food, safe shelter, and basic healthcare',
    'A designer watch',
    'The latest gaming console',
    'An expensive luxury vacation',
    'A',
    'Needs are essential for survival, health, and basic well-being, whereas wants are optional desires.',
    'factual'
  ],
  [
    1, 1,
    'What does UPI stand for in India’s digital payments ecosystem?',
    'Unified Payments Interface',
    'Universal Paper Invoice',
    'United Postal Index',
    'Urban Price Indicator',
    'A',
    'Developed by NPCI, UPI enables instant, secure, real-time bank-to-bank digital payments via mobile phones.',
    'factual'
  ],
  [
    1, 1,
    'What is an "emergency fund"?',
    'Easily accessible savings set aside specifically for unexpected expenses like medical bills or sudden income loss',
    'Money borrowed at very high interest to buy festival gifts',
    'Funds locked for 30 years with no withdrawal option',
    'A stock market speculation bet',
    'A',
    'An emergency fund (typically 3–6 months of essential expenses) protects families from sudden financial shocks.',
    'factual'
  ],
  [
    1, 1,
    'Which golden rule of digital banking safety should every citizen strictly follow?',
    'Never share your OTP, UPI PIN, ATM PIN, or CVV with anyone—not even callers claiming to be bank officials',
    'Write your ATM PIN on the back of your debit card',
    'Share your OTP on public social media groups',
    'Click every unknown link promising free lottery prizes',
    'A',
    'Banks and government agencies never ask for OTPs or PINs; keeping credentials private prevents cyber-fraud.',
    'factual'
  ],
  [
    1, 1,
    'What is an "entrepreneur"?',
    'An individual who identifies an unmet need or problem, creates an innovative solution, and takes calculated risks to build a venture',
    'Someone who avoids all problem-solving',
    'Only a government tax collector',
    'A person who never interacts with customers',
    'A',
    'Entrepreneurs combine creativity, resourcefulness, and initiative to create value for customers and society.',
    'factual'
  ],
  [
    1, 1,
    'What does "MVP" stand for in startup development?',
    'Minimum Viable Product',
    'Maximum Value Profit',
    'Monthly Vendor Payment',
    'Manual Verification Process',
    'A',
    'An MVP is a simple, working version of a product built quickly to test real customer feedback before heavy investment.',
    'factual'
  ],
  [
    1, 1,
    'What is "compound interest"?',
    'Interest earned not only on the original principal but also on the accumulated interest from previous periods',
    'Interest paid only once at the end of a century',
    'A penalty charged for saving money in a bank',
    'Interest calculated solely on zero balance',
    'A',
    'Compounding allows savings and investments to grow exponentially over long time horizons.',
    'factual'
  ],
  [
    1, 1,
    'What is the primary purpose of insurance (such as health or crop insurance)?',
    'To transfer the financial risk of major unforeseen losses to an insurer in exchange for a manageable premium',
    'To guarantee that accidents never occur',
    'To double your money overnight without risk',
    'To avoid paying school fees',
    'A',
    'Insurance pools risk across many policyholders to protect families and businesses from devastating financial shocks.',
    'factual'
  ],
  [
    1, 1,
    'Which Indian government initiative launched in 2016 supports innovation, incubation, and ease of starting new businesses?',
    'Startup India',
    'Green Revolution 1965',
    'Operation Flood',
    'Project Tiger',
    'A',
    'Startup India fosters entrepreneurship through simplified compliance, funding support, incubators, and mentorship.',
    'factual'
  ],

  // ================= LEVEL 1 (BASIC) — SET 2 (10) =================
  [
    1, 2,
    'What does "EMI" stand for when repaying a loan?',
    'Equated Monthly Instalment',
    'Emergency Money Income',
    'Electronic Market Index',
    'Equal Monetary Interest-free',
    'A',
    'An EMI is a fixed monthly payment made by a borrower that covers both interest and part of the principal.',
    'factual'
  ],
  [
    1, 2,
    'Which institution regulates banks and manages monetary policy in India?',
    'Reserve Bank of India (RBI)',
    'Election Commission of India',
    'Archaeological Survey of India',
    'Indian Meteorological Department',
    'A',
    'The RBI supervises India’s banking system, issues currency, and safeguards financial stability.',
    'factual'
  ],
  [
    1, 2,
    'What is "phishing" in digital finance?',
    'A cyber-fraud tactic using fake emails, messages, or websites to trick users into revealing passwords, OTPs, or bank details',
    'Catching fish using solar-powered boats',
    'Depositing cash in a post office savings account',
    'Calculating monthly household rent',
    'A',
    'Phishing impersonates trusted institutions to steal sensitive financial credentials.',
    'factual'
  ],
  [
    1, 2,
    'In a business, what is "profit"?',
    'Total revenue minus total costs (when revenue exceeds costs)',
    'Total cash borrowed from friends',
    'Total electricity bill paid in a month',
    'Total number of employees hired',
    'A',
    'Profit is the surplus remaining after deducting all production, operating, and overhead expenses from sales revenue.',
    'factual'
  ],
  [
    1, 2,
    'What is a "social enterprise"?',
    'A venture that uses sustainable business models primarily to solve social or environmental problems alongside financial viability',
    'A social media fan club with no product',
    'A business that ignores all community impact',
    'A charity that refuses to measure outcomes',
    'A',
    'Social enterprises blend entrepreneurial innovation with measurable social or ecological impact.',
    'factual'
  ],
  [
    1, 2,
    'What does "MSME" stand for in the Indian economy?',
    'Micro, Small and Medium Enterprises',
    'Major Stock Market Exchanges',
    'Monthly Savings and Money Education',
    'Multi-State Mining Establishments',
    'A',
    'MSMEs are the backbone of Indian employment, manufacturing, and grassroots entrepreneurship.',
    'factual'
  ],
  [
    1, 2,
    'Which bank account type is primarily designed for regular personal savings while earning modest interest and allowing easy withdrawals?',
    'Savings Bank Account',
    'Fixed Deposit locked for 10 years only',
    'Unsecured credit card loan',
    'Foreign exchange futures contract',
    'A',
    'A savings account combines liquidity, safety, digital payment access, and interest earnings.',
    'factual'
  ],
  [
    1, 2,
    'What is a "fixed deposit (FD)"?',
    'A lump sum deposited in a bank for a fixed tenure at a predetermined interest rate higher than a regular savings account',
    'Cash kept under a mattress at home',
    'A daily lottery ticket',
    'A credit card penalty fee',
    'A',
    'Fixed deposits offer predictable returns and capital safety for medium- to long-term goals.',
    'factual'
  ],
  [
    1, 2,
    'What is "bootstrapping" in the context of startups?',
    'Starting and growing a business using the founder’s own savings and early customer revenue without external investor funding',
    'Manufacturing leather boots only',
    'Shutting down a business on day one',
    'Taking a high-interest loan from an illegal lender',
    'A',
    'Bootstrapped founders retain full control and focus tightly on early profitability and lean operations.',
    'factual'
  ],
  [
    1, 2,
    'What is a "business model"?',
    'A clear plan explaining how a venture creates value for customers, delivers it, and earns sustainable revenue',
    'A clay statue placed in a shop window',
    'A list of holidays for employees',
    'A personal diary of hobbies',
    'A',
    'A viable business model defines target customers, value proposition, channels, revenue streams, and cost structure.',
    'factual'
  ],

  // ================= LEVEL 2 (CONCEPTUAL) — SET 1 (10) =================
  [
    2, 1,
    'How does "saving" differ from "investing"?',
    'Saving prioritises safety and quick access for short-term needs, while investing allocates money into assets to grow wealth and beat inflation over the long term',
    'Saving always carries higher risk than stock trading',
    'Investing means keeping cash locked in a wooden box',
    'There is no difference between saving and investing',
    'A',
    'Both are complementary: savings provide stability and liquidity, while prudent investing builds long-term wealth.',
    'conceptual'
  ],
  [
    2, 1,
    'Why does "inflation" erode the purchasing power of idle cash kept at home?',
    'As general prices of goods and services rise over time, the same amount of idle cash buys fewer items in the future',
    'Paper notes physically shrink in size every year',
    'Banks confiscate cash kept at home',
    'Inflation makes every product free',
    'A',
    'Earning a return above the inflation rate is necessary to preserve and grow real purchasing power.',
    'conceptual'
  ],
  [
    2, 1,
    'What is the popular 50-30-20 budgeting guideline?',
    'Allocating roughly 50% of after-tax income to needs, 30% to wants, and at least 20% to savings and debt repayment',
    'Spending 50% on luxury gadgets, 30% on snacks, and 20% on fines',
    'Borrowing 50% of income every month',
    'Saving 0% until age 60',
    'A',
    'The 50-30-20 rule offers a simple, adaptable framework for balancing essentials, lifestyle, and financial security.',
    'conceptual'
  ],
  [
    2, 1,
    'Why is "starting early" the most powerful factor in compound interest?',
    'Longer time horizons allow interest to compound over many more cycles, dramatically multiplying even modest regular savings',
    'Early savers receive free houses from banks',
    'Compound interest stops working after 3 years',
    'Time has zero effect on compound growth',
    'A',
    'Time is the exponent in compounding—starting a decade earlier often outweighs investing larger amounts later.',
    'conceptual'
  ],
  [
    2, 1,
    'How can reckless borrowing lead to a "debt trap"?',
    'When high-interest repayments exceed a borrower’s income capacity, forcing them to take new loans just to pay off older loans',
    'When a borrower saves 30% of their salary every month',
    'When a student pays school fees from savings',
    'When a business earns steady profits',
    'A',
    'Unplanned high-cost debt (especially credit card rollover or informal loans) spirals rapidly into a debt trap.',
    'conceptual'
  ],
  [
    2, 1,
    'What is "diversification" in personal investing?',
    'Spreading investments across different asset types so a downturn in one area does not wipe out all your wealth',
    'Putting 100% of your life savings into one risky rumour',
    'Spending all savings on one festival',
    'Keeping every rupee in a single unregulated scheme',
    'A',
    'Diversification ("not putting all eggs in one basket") reduces portfolio risk while maintaining growth potential.',
    'conceptual'
  ],
  [
    2, 1,
    'Why do successful startups begin with "empathy and problem discovery" before building a product?',
    'Understanding real customer pain points ensures the startup solves a genuine need people are willing to pay for',
    'Because customers never know what problems they face',
    'Because building products blindly without research is cheaper',
    'Because marketing alone can sell useless items forever',
    'A',
    'Design thinking starts by observing and interviewing users so solutions address real, validated problems.',
    'conceptual'
  ],
  [
    2, 1,
    'What is the difference between a "prototype" and a final commercial product?',
    'A prototype is an early, low-cost model used to test ideas and gather feedback quickly before investing in full-scale production',
    'A prototype is always more expensive than a factory',
    'A prototype is never shown to any user',
    'Final products never require testing',
    'A',
    'Rapid prototyping lets teams learn cheaply, fix flaws early, and refine usability.',
    'conceptual'
  ],
  [
    2, 1,
    'Why is a "credit score" important for individuals and small business owners?',
    'It summarises past repayment reliability, helping formal lenders decide loan eligibility and fair interest rates',
    'It measures a person’s height and weight',
    'It tracks school sports medals',
    'It determines voting eligibility in elections',
    'A',
    'Paying bills and EMIs on time builds a strong credit history and lowers future borrowing costs.',
    'conceptual'
  ],
  [
    2, 1,
    'What is the role of a "startup incubator" (often hosted at colleges or innovation hubs)?',
    'Providing early-stage founders with workspace, mentorship, seed networking, and guidance on legal and business fundamentals',
    'Charging huge fines to young innovators',
    'Selling groceries to students',
    'Banning students from pitching ideas',
    'A',
    'Incubators reduce early startup failure rates by surrounding founders with mentors, labs, and peer ecosystems.',
    'conceptual'
  ],

  // ================= LEVEL 2 (CONCEPTUAL) — SET 2 (10) =================
  [
    2, 2,
    'Why is paying only the "minimum amount due" on a credit card financially harmful?',
    'The remaining balance attracts very high annualised interest rates (often 36%–42%), rapidly inflating total debt',
    'It eliminates all future credit card bills',
    'It earns a 50% cash bonus from the bank',
    'Credit cards never charge interest',
    'A',
    'Paying the full statement balance before the due date avoids steep revolving credit interest.',
    'conceptual'
  ],
  [
    2, 2,
    'How does a "debit card" differ from a "credit card"?',
    'A debit card deducts money directly from your existing bank balance, whereas a credit card lets you borrow up to a limit to repay later',
    'A credit card never needs to be repaid',
    'A debit card works without having a bank account',
    'Both cards give unlimited free money',
    'A',
    'Understanding debit vs credit prevents accidental overspending beyond one’s means.',
    'conceptual'
  ],
  [
    2, 2,
    'Why are "get-rich-quick" or Ponzi schemes red flags for investors?',
    'Unusually high "guaranteed" returns with zero risk violate basic finance principles and typically pay early entrants using new victims’ money',
    'Because every legitimate bank offers 100% monthly returns',
    'Because SEBI runs Ponzi schemes',
    'Because higher returns always mean zero risk',
    'A',
    'In finance, risk and expected return move together; promises of effortless, guaranteed huge returns signal fraud.',
    'conceptual'
  ],
  [
    2, 2,
    'What is a "value proposition" in a startup pitch?',
    'A concise statement explaining the specific benefit a product delivers to customers and why it is better than existing alternatives',
    'The street address of the founder’s home',
    'The colour of the office chairs',
    'A list of unrelated jokes',
    'A',
    'A sharp value proposition immediately communicates why customers should care about and choose the startup.',
    'conceptual'
  ],
  [
    2, 2,
    'Why do entrepreneurs distinguish between "fixed costs" and "variable costs"?',
    'Fixed costs (like shop rent) stay constant regardless of output, while variable costs (like raw materials) change with units produced—essential for pricing and break-even planning',
    'Fixed costs never have to be paid',
    'Variable costs are always zero',
    'Cost structure has no impact on profitability',
    'A',
    'Knowing fixed and variable costs lets founders calculate the exact sales volume needed to break even.',
    'conceptual'
  ],
  [
    2, 2,
    'What does "pivoting" mean for a startup?',
    'Making a strategic shift in product, target audience, or business model based on validated customer feedback and market evidence',
    'Giving up entrepreneurship permanently after one obstacle',
    'Ignoring all user complaints',
    'Refusing to change an unworkable plan',
    'A',
    'Many globally successful companies succeeded because they listened to users and pivoted intelligently.',
    'conceptual'
  ],
  [
    2, 2,
    'How does a "Recurring Deposit (RD)" help salaried individuals or students build disciplined savings?',
    'It lets them deposit a small fixed sum every month automatically, earning compound interest toward a target goal',
    'It requires depositing ₹10 lakh in a single day',
    'It charges a penalty for regular saving',
    'It pays zero interest always',
    'A',
    'RDs automate the habit of "paying yourself first" before discretionary spending.',
    'conceptual'
  ],
  [
    2, 2,
    'Why is "market research" critical before launching a startup?',
    'It verifies customer demand, analyses competitors, estimates willingness to pay, and reduces the risk of launching an unwanted product',
    'It guarantees zero competition forever',
    'It eliminates the need for product quality',
    'It is required only for trillion-dollar corporations',
    'A',
    'Grounded market research replaces assumptions with real customer insights.',
    'conceptual'
  ],
  [
    2, 2,
    'What is the difference between "good debt" and "bad debt"?',
    'Productive debt finances appreciating or income-generating assets (like education or a viable business tool), while bad debt funds depreciating impulse consumption at high interest',
    'All loans are always good regardless of interest rate',
    'Education loans are always worse than gambling debt',
    'Bad debt earns interest for the borrower',
    'A',
    'Evaluating whether borrowed money increases future earning capacity distinguishes constructive credit from destructive debt.',
    'conceptual'
  ],
  [
    2, 2,
    'Why is teamwork with complementary skills (e.g. product, design, finance, marketing) valuable in a founding startup team?',
    'Building a venture requires diverse capabilities that rarely reside equally in a single person',
    'Because co-founders should all have identical weaknesses',
    'Because teams never need to communicate',
    'Because solo founders are legally banned',
    'A',
    'Complementary co-founders balance technical execution, customer outreach, and financial discipline.',
    'conceptual'
  ],

  // ================= LEVEL 3 (APPLICATION) — SET 1 (10) =================
  [
    3, 1,
    'Aarav earns ₹2,000 per month from tutoring younger students. Using the 50-30-20 rule, how much should he allocate to savings each month?',
    '₹400',
    '₹1,000',
    '₹600',
    '₹100',
    'A',
    '20% of ₹2,000 = (20/100) × 2,000 = ₹400 allocated to savings.',
    'numerical'
  ],
  [
    3, 1,
    'If Meera deposits ₹10,000 in a bank fixed deposit at 10% per annum compounded annually, what will the amount be after 2 years?',
    '₹12,100',
    '₹12,000',
    '₹11,000',
    '₹10,200',
    'A',
    'Year 1: ₹10,000 × 1.10 = ₹11,000. Year 2: ₹11,000 × 1.10 = ₹12,100 (₹100 more than simple interest!).',
    'numerical'
  ],
  [
    3, 1,
    'A student startup makes eco-friendly notebooks. Fixed monthly rent is ₹3,000. Each notebook costs ₹40 to make and sells for ₹70. How many notebooks must they sell monthly to break even?',
    '100 notebooks',
    '50 notebooks',
    '75 notebooks',
    '150 notebooks',
    'A',
    'Contribution per notebook = ₹70 − ₹40 = ₹30. Break-even quantity = ₹3,000 / ₹30 = 100 notebooks.',
    'numerical'
  ],
  [
    3, 1,
    'Riya receives a UPI "collect request" from an unknown buyer claiming she must enter her UPI PIN to *receive* ₹5,000 for an old bicycle she listed online. What should she do?',
    'Decline immediately and block the sender—you NEVER enter a UPI PIN to receive money, only to send money',
    'Enter her UPI PIN quickly before the link expires',
    'Share her debit card CVV as well',
    'Send ₹500 first as a verification fee',
    'A',
    'Fake UPI collect requests are a common cyber-scam; entering a PIN authorises debiting money from your account.',
    'application'
  ],
  [
    3, 1,
    'A family earns ₹50,000/month, spends ₹48,000/month, and has zero emergency savings. Suddenly, a scooter repair costs ₹12,000. What habit would have prevented borrowing at high interest?',
    'Paying themselves first by building a dedicated liquid emergency fund before discretionary spending',
    'Buying a second scooter on credit',
    'Cancelling their bank account',
    'Investing the entire salary in an unregulated lottery',
    'A',
    'Even a modest monthly emergency reserve absorbs unexpected repairs without triggering debt.',
    'application'
  ],
  [
    3, 1,
    'Class 9 students notice classmates wasting clean paper from half-used notebooks at year-end. They design a peer-run "Re-Bind & Reuse" campus venture. Which entrepreneurial skill are they demonstrating?',
    'Spotting a local sustainability problem and turning it into a practical value-creating solution',
    'Copying a monopoly without customer insight',
    'Ignoring waste management',
    'Taking reckless uncalculated loans',
    'A',
    'Great ventures often start by observing everyday inefficiencies right around you.',
    'application'
  ],
  [
    3, 1,
    'Before spending ₹2 lakh on manufacturing 5,000 smart water bottles, a young founder sells 30 handmade prototypes to local gym-goers to test durability and price. Why is this smart?',
    'It validates real demand and uncovers design flaws cheaply using an MVP approach',
    'It wastes time because customers never give useful feedback',
    'It violates Startup India guidelines',
    'It guarantees zero future sales',
    'A',
    'Testing an MVP with early adopters minimises capital risk and guides product refinement.',
    'application'
  ],
  [
    3, 1,
    'Kabir wants to buy a ₹12,000 bicycle in 12 months without borrowing. Which financial strategy fits best?',
    'Setting a SMART goal and putting ₹1,000 every month into a safe Recurring Deposit or dedicated savings goal',
    'Buying it today on a 40% interest credit card with no repayment plan',
    'Hoping to win a random online contest',
    'Forgetting about the goal until month 12',
    'A',
    'Goal-based saving turns a large purchase into achievable monthly milestones while earning interest.',
    'application'
  ],
  [
    3, 1,
    'A small bakery earns ₹80,000 in monthly sales, pays ₹35,000 for ingredients, ₹15,000 for rent, and ₹15,000 for staff wages. What is its monthly profit?',
    '₹15,000',
    '₹45,000',
    '₹80,000',
    '₹30,000',
    'A',
    'Total costs = ₹35,000 + ₹15,000 + ₹15,000 = ₹65,000. Profit = ₹80,000 − ₹65,000 = ₹15,000.',
    'application'
  ],
  [
    3, 1,
    'A consumer notices an unauthorised ₹8,000 debit on their bank account due to a phishing scam. What is the immediate recommended action in India?',
    'Report immediately to the bank to block the card/account and file a complaint on the National Cyber Crime Helpline (1930) / cybercrime.gov.in',
    'Wait two months to see if the money returns automatically',
    'Delete the bank SMS alerts',
    'Pay the scammer more money to unlock the account',
    'A',
    'Prompt reporting within the "golden hour" to the bank and helpline 1930 maximises the chance of freezing fraudulent transfers.',
    'application'
  ],

  // ================= LEVEL 3 (APPLICATION) — SET 2 (10) =================
  [
    3, 2,
    'Using the Rule of 72 (approximate years to double = 72 ÷ annual interest rate), about how many years will an investment earning 8% compounded annually take to double?',
    '9 years',
    '4 years',
    '18 years',
    '72 years',
    'A',
    '72 ÷ 8 = 9 years approximately for the investment to double.',
    'numerical'
  ],
  [
    3, 2,
    'An entrepreneur invests ₹25,000 to launch a handmade soap stall at a fair. She sells 400 soaps at ₹100 each. What is her net profit?',
    '₹15,000',
    '₹40,000',
    '₹25,000',
    '₹10,000',
    'A',
    'Total revenue = 400 × ₹100 = ₹40,000. Net profit = ₹40,000 − ₹25,000 = ₹15,000.',
    'numerical'
  ],
  [
    3, 2,
    'A teen wants to compare two bank loans of ₹1,00,000: Bank X offers 9% annual interest with zero hidden fees; an informal lender offers "2% per month". Which is actually cheaper?',
    'Bank X (9% per year), because 2% per month equals 24% per year—nearly triple Bank X’s rate',
    'The informal lender, because 2 is smaller than 9',
    'Both cost the exact same amount',
    'Neither charges any interest',
    'A',
    'Always convert monthly rates to annualised rates (2% × 12 = 24% p.a.) to compare loans accurately.',
    'application'
  ],
  [
    3, 2,
    'A rural agritech startup builds a low-cost solar cold-storage unit rented to vegetable farmers on a pay-per-crate basis. What key problem does this business model solve?',
    'High post-harvest spoilage and distress selling, without forcing small farmers to buy expensive equipment upfront',
    'Increasing food wastage in villages',
    'Replacing farming with video gaming',
    'Forcing farmers to take high-interest personal loans',
    'A',
    'Pay-per-use models make capital-intensive innovations affordable for small producers while creating recurring revenue.',
    'application'
  ],
  [
    3, 2,
    'If inflation is 6% per year and a savings account pays 3% interest per year, what happens to the real purchasing power of money left solely in that account for 10 years?',
    'Real purchasing power gradually declines because prices rise faster than the interest earned',
    'Real purchasing power doubles every year',
    'Real purchasing power stays 100% unchanged',
    'The bank adds extra cash to match inflation automatically',
    'A',
    'Real return ≈ nominal return − inflation (3% − 6% = −3%), highlighting why long-term goals need inflation-beating investments.',
    'application'
  ],
  [
    3, 2,
    'During a startup pitch, judges ask: "Who is your customer, and how will you reach your first 100 paying users?" Which part of the business plan are they testing?',
    'Target market clarity and practical customer acquisition strategy',
    'The founder’s favourite movie',
    'Office wall paint colour',
    'Historical dates of ancient wars',
    'A',
    'Investors and mentors look for realistic, concrete paths to acquiring and retaining real customers.',
    'application'
  ],
  [
    3, 2,
    'A family buys comprehensive health insurance for all members while they are healthy. Two years later, a sudden surgery costs ₹2.5 lakh and is covered cashlessly. What principle is illustrated?',
    'Proactive risk management protecting household savings from medical shock',
    'Wasting money on unnecessary paperwork',
    'Relying on informal moneylenders during crises',
    'Avoiding all savings accounts',
    'A',
    'Buying insurance before illness strikes keeps premiums affordable and shields accumulated family wealth.',
    'application'
  ],
  [
    3, 2,
    'A local craft collective starts selling handwoven bamboo lamps via ONDC and social media with transparent pricing and artisan stories. How does digital commerce help them?',
    'It expands market reach beyond local fairs directly to nationwide buyers, improving artisan margins',
    'It forces artisans to close their workshops',
    'It removes all quality expectations',
    'It prevents digital payments',
    'A',
    'Digital platforms lower entry barriers for micro-entrepreneurs and connect rural craftspeople to national markets.',
    'application'
  ],
  [
    3, 2,
    'Sanya tracks every rupee she spends for 30 days and discovers she spent ₹1,800 on unplanned impulse snacks. What immediate benefit does expense tracking provide?',
    'Visibility into spending leaks, enabling conscious reallocation toward meaningful goals',
    'It reduces her income by ₹1,800',
    'It prevents her from ever buying food',
    'It increases bank fees',
    'A',
    'Tracking expenses turns unconscious habits into informed financial choices.',
    'application'
  ],
  [
    3, 2,
    'A startup’s food-delivery app receives feedback that customers love the meals but abandon checkout because delivery charges appear only at the final click. What should the team do?',
    'Show transparent upfront pricing early in the app flow and test if checkout completion improves',
    'Hide prices even further',
    'Delete all negative reviews and ignore users',
    'Shut down the kitchen immediately',
    'A',
    'Iterative customer-centric problem solving builds trust and lifts conversion rates.',
    'application'
  ],

  // ================= LEVEL 4 (HIGHER-ORDER / ANALYSIS) — SET 1 (10) =================
  [
    4, 1,
    'Assertion (A): Financial literacy is an essential life skill for every student, not just future bankers or accountants. Reason (R): Every adult must manage budgets, digital payments, taxes, insurance, and retirement savings to achieve lifelong financial security.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Sound personal finance habits formed early prevent debt traps, scams, and financial stress throughout life.',
    'assertion-reason'
  ],
  [
    4, 1,
    'Assertion (A): Most successful entrepreneurs treat early setbacks as data for learning rather than permanent personal defeat. Reason (R): Iterative testing, customer feedback, and calculated risk-taking help refine an initially imperfect idea into a viable venture.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Resilience and a growth mindset enable founders to diagnose what failed and improve rapidly.',
    'assertion-reason'
  ],
  [
    4, 1,
    'Case: Two friends each invest ₹1,000/month at 10% annual return. Friend A starts at age 20 and stops at 30 (investing ₹1.2 lakh total), letting it compound until age 50. Friend B starts at 30 and invests ₹1,000/month for 20 years (₹2.4 lakh total) until age 50. Friend A still ends up with a larger corpus! What explains this?',
    'The extraordinary exponential power of extra compounding years when starting early',
    'Friend A received secret bank subsidies',
    'Friend B invested at 0% interest',
    'Compound interest works only for people under 25',
    'A',
    'Early compounding gives earlier rupees decades to generate interest on interest, outperforming double the principal invested later.',
    'case-based'
  ],
  [
    4, 1,
    'Case: A college startup creates a smart walking cane with ultrasonic obstacle sensors for visually impaired users, priced at ₹1,500 instead of imported ₹15,000 versions. It partners with NGOs and CSR funds to distribute units widely. What kind of innovation is this?',
    'Frugal social innovation combining affordability, human-centred design, and sustainable distribution',
    'Luxury monopoly pricing',
    'Pure speculative trading',
    'Unethical product imitation',
    'A',
    'India’s startup ecosystem excels in frugal innovation—solving real mass-market challenges at a fraction of global costs.',
    'case-based'
  ],
  [
    4, 1,
    'Why is "cash flow" often more critical for a young startup’s immediate survival than paper profits?',
    'Even a profitable business can fail if customer payments arrive late while salaries, rent, and supplier bills must be paid today',
    'Startups never need to pay suppliers',
    'Cash flow and profit are always identical every single day',
    'Banks give unlimited free cash to all startups',
    'A',
    'Managing working capital and timely cash inflows keeps operations alive during growth.',
    'conceptual'
  ],
  [
    4, 1,
    'How does "behavioural bias" such as FOMO (Fear of Missing Out) harm personal investment decisions?',
    'It pushes people to buy hyped, overpriced assets without research and panic-sell during downturns',
    'It encourages disciplined long-term asset allocation',
    'It eliminates all market volatility',
    'It guarantees steady 12% fixed returns',
    'A',
    'Emotional discipline and goal-based planning protect investors from herd mentality.',
    'conceptual'
  ],
  [
    4, 1,
    'Why do investors distinguish between "equity funding" and "debt funding" for startups?',
    'Equity investors provide capital in exchange for partial ownership (sharing upside and risk), whereas debt must be repaid with fixed interest regardless of profit',
    'Debt investors become permanent co-owners with no repayment due',
    'Equity funding requires daily interest payments',
    'Startups are prohibited from using either',
    'A',
    'Early high-uncertainty startups often rely on grants, bootstrapping, or equity because fixed debt EMIs strain nascent cash flows.',
    'conceptual'
  ],
  [
    4, 1,
    'How does paying taxes honestly connect personal finance to national governance?',
    'Tax revenues fund public infrastructure, schools, hospitals, digital rails like UPI, and legal protection that enable citizens and startups to thrive',
    'Taxes are burned and never used for public services',
    'Only foreign tourists pay taxes in India',
    'Startups never use roads, electricity, or internet infrastructure',
    'A',
    'Responsible tax compliance sustains the public ecosystem on which both households and businesses depend.',
    'conceptual'
  ],
  [
    4, 1,
    'What is the difference between a "small business" (like a neighbourhood bakery) and a "scalable tech-enabled startup"?',
    'A traditional small business serves a local market steadily, whereas a scalable startup designs repeatable, often tech-enabled models capable of rapid nationwide or global expansion',
    'Small businesses never earn profits',
    'Scalable startups never serve real customers',
    'Small businesses are illegal under MSME laws',
    'A',
    'Both are vital to the economy: MSMEs anchor local livelihoods while scalable startups pioneer rapid innovation.',
    'conceptual'
  ],
  [
    4, 1,
    'Why should insurance and investment generally be kept separate when planning personal finances?',
    'Combining them often results in inadequate risk coverage and lower returns compared to pure term insurance paired with dedicated investments',
    'Because insurance companies are banned from offering term plans',
    'Because pure term insurance costs more than a house',
    'Because investments never earn returns',
    'A',
    'Evaluating risk protection (insurance) and wealth creation (investment) separately improves transparency and cost-effectiveness.',
    'conceptual'
  ],

  // ================= LEVEL 4 (HIGHER-ORDER / ANALYSIS) — SET 2 (10) =================
  [
    4, 2,
    'Assertion (A): Digital Public Infrastructure (DPI) such as Aadhaar, UPI, and DigiLocker has dramatically accelerated entrepreneurship in India. Reason (R): Low-cost, open digital rails reduce customer onboarding, verification, and payment costs even for tiny startups in Tier-2 and Tier-3 towns.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'India Stack / DPI democratises financial inclusion and lowers startup launch barriers across the country.',
    'assertion-reason'
  ],
  [
    4, 2,
    'Assertion (A): Borrowing through formal financial institutions (banks, SHGs, cooperatives) is generally safer than informal moneylenders. Reason (R): Formal lenders operate under RBI/statutory regulation with transparent interest rates and legal borrower protections.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Formal credit protects borrowers from predatory interest rates and arbitrary asset seizure.',
    'assertion-reason'
  ],
  [
    4, 2,
    'Case: A startup burns ₹50 lakh per month on heavy discounts to acquire users, but loses money on every single order and stops getting repeat buyers once discounts end. What fundamental flaw does this reveal?',
    'Weak unit economics and lack of genuine product-market fit',
    'Excessive profitability',
    'Too much customer loyalty',
    'Under-spending on advertisements',
    'A',
    'Sustainable ventures must demonstrate healthy unit economics where customers value the product enough to pay profitably.',
    'case-based'
  ],
  [
    4, 2,
    'Case: A women’s Self-Help Group (SHG) in a village pools ₹200/month per member, maintains transparent passbooks, and secures a low-interest bank linkage loan to start a millet-processing unit. What financial principle is at work?',
    'Collective savings and social collateral unlocking formal credit for grassroots micro-entrepreneurship',
    'Speculative stock day-trading',
    'Informal high-interest borrowing',
    'Hoarding idle cash without investment',
    'A',
    'SHG-Bank Linkage has empowered millions of rural women entrepreneurs across India.',
    'case-based'
  ],
  [
    4, 2,
    'Why is "intellectual property" (trademarks, patents, copyrights) important for innovative startups?',
    'It legally protects original brand names, inventions, and creative works from unauthorised copying, rewarding research and investment',
    'It forces startups to give away their inventions for free',
    'It bans startups from selling products',
    'It applies only to agricultural land',
    'A',
    'IP protection gives innovators legal confidence to invest time and capital in R&D and brand building.',
    'conceptual'
  ],
  [
    4, 2,
    'What does "financial inclusion" aim to achieve across a country?',
    'Ensuring every adult and small enterprise has affordable, timely access to useful bank accounts, digital payments, savings, credit, and insurance',
    'Allowing only metro-city residents to open bank accounts',
    'Replacing all banks with informal cash lenders',
    'Eliminating savings habits',
    'A',
    'Initiatives like Jan Dhan Yojana, UPI, and micro-insurance bring previously unbanked citizens into the formal economy.',
    'conceptual'
  ],
  [
    4, 2,
    'How does "lifestyle creep" undermine wealth creation even when a person’s salary increases?',
    'When every pay raise is immediately matched by higher discretionary spending, leaving savings unchanged or stagnant',
    'When a person invests 50% of every raise',
    'When inflation falls to zero',
    'When someone pays off all loans early',
    'A',
    'Automating higher savings percentages whenever income grows counteracts lifestyle creep.',
    'conceptual'
  ],
  [
    4, 2,
    'Why do startup mentors emphasise "talking to 50 potential customers" before writing code or renting an office?',
    'Direct customer discovery prevents building an expensive solution to a problem nobody actually wants to pay to solve',
    'Because offices are illegal for startups',
    'Because customers always design software for free',
    'Because 50 interviews guarantee instant billionaire status',
    'A',
    'Customer validation is the cheapest insurance against building the wrong product.',
    'conceptual'
  ],
  [
    4, 2,
    'What is the risk of using "Buy Now, Pay Later" (BNPL) apps casually for multiple small wants?',
    'Fragmented small EMIs can accumulate silently into an unmanageable monthly burden and damage credit scores if missed',
    'BNPL apps erase all debt automatically',
    'BNPL boosts savings interest rates',
    'BNPL is a government scholarship',
    'A',
    'Convenient short-term credit still represents real debt that must fit within a disciplined monthly budget.',
    'conceptual'
  ],
  [
    4, 2,
    'Why is ethical conduct (honest marketing, fair wages, data privacy, environmental care) a long-term competitive advantage for startups?',
    'It builds enduring customer trust, employee loyalty, regulatory goodwill, and resilient brand reputation',
    'Because shortcuts and deception always win in the long run',
    'Because customers prefer companies that misuse their data',
    'Because ethics prevents any profit from being earned',
    'A',
    'Trust is the most durable moat a business can build.',
    'conceptual'
  ],

  // ================= LEVEL 5 (COMPETITIVE / OLYMPIAD) — SET 1 (10) =================
  [
    5, 1,
    'In startup finance, what does "burn rate" and "runway" measure?',
    'Burn rate is the monthly net cash a startup spends before reaching profitability; runway is how many months its remaining cash will last',
    'Burn rate measures factory electricity heat; runway is an airport strip',
    'Burn rate is monthly profit; runway is total tax paid',
    'Both measure employee vacation days',
    'A',
    'Tracking burn rate and runway ensures founders raise capital or reach break-even before cash runs out.',
    'conceptual'
  ],
  [
    5, 1,
    'What is "Customer Acquisition Cost (CAC)" versus "Customer Lifetime Value (LTV)"?',
    'CAC is the average cost to win one new customer, while LTV is the total net profit expected from that customer over their relationship; healthy businesses maintain LTV significantly higher than CAC',
    'CAC should always be ten times larger than LTV',
    'LTV measures only a single day’s electricity bill',
    'Neither metric matters for online businesses',
    'A',
    'A sustainable LTV : CAC ratio (commonly 3:1 or better) indicates a scalable, profitable growth engine.',
    'conceptual'
  ],
  [
    5, 1,
    'A small online stationery brand spends ₹20,000 on marketing and acquires 100 new paying customers. Each customer generates ₹600 in total lifetime net profit. What are its CAC and LTV:CAC ratio?',
    'CAC = ₹200; LTV:CAC = 3:1',
    'CAC = ₹600; LTV:CAC = 1:3',
    'CAC = ₹2,000; LTV:CAC = 1:1',
    'CAC = ₹20; LTV:CAC = 30:1',
    'A',
    'CAC = ₹20,000 / 100 = ₹200. LTV:CAC = 600 / 200 = 3:1, indicating healthy unit economics.',
    'numerical'
  ],
  [
    5, 1,
    'Which sequence correctly outlines the 5-stage Design Thinking process used by innovators and startups?',
    'Empathise → Define → Ideate → Prototype → Test',
    'Test → Ignore → Sell → Empathise → Close',
    'Borrow → Spend → Advertise → Define → Quit',
    'Ideate → Patent → Never test → Mass-produce',
    'A',
    'Design Thinking anchors innovation in human empathy, clear problem framing, creative ideation, prototyping, and iterative testing.',
    'conceptual'
  ],
  [
    5, 1,
    'Case: An investor deposits ₹1,00,000 in Option A (7% simple interest for 5 years) vs Option B (7% compounded annually for 5 years). Without using a calculator, which yields more and why?',
    'Option B yields more because from Year 2 onward, interest is earned on previously accumulated interest as well as the original ₹1,00,000',
    'Option A yields more because simple interest grows faster',
    'Both yield the exact same rupee amount',
    'Option B loses principal every year',
    'A',
    'Option A yields ₹1,35,000, whereas Option B yields ~₹1,40,255—illustrating compounding’s growing advantage.',
    'case-based'
  ],
  [
    5, 1,
    'Assertion (A): A diversified Systematic Investment Plan (SIP) in regulated funds helps salaried investors manage market volatility over long horizons. Reason (R): Investing a fixed sum regularly buys more units when prices dip and fewer when prices peak (rupee-cost averaging), while building disciplined habits.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Rupee-cost averaging removes the stress of timing the market and harnesses long-term compounding.',
    'assertion-reason'
  ],
  [
    5, 1,
    'What is the primary distinction between an "angel investor" and a "venture capital (VC) firm"?',
    'Angel investors are typically experienced individuals investing their own personal capital at the very earliest stage, while VC firms manage pooled institutional funds for larger growth-stage investments',
    'Angel investors only fund religious charities',
    'VC firms only lend ₹500 to school students',
    'Angel investors never mentor founders',
    'A',
    'Understanding the funding ladder (bootstrapping → grants/angels → seed/VC → IPO) helps founders choose appropriate capital.',
    'conceptual'
  ],
  [
    5, 1,
    'In India’s financial regulatory architecture, which regulator protects investors in capital markets (stocks and mutual funds) and which regulates insurance?',
    'SEBI regulates capital markets; IRDAI regulates insurance',
    'RBI regulates cricket; NCERT regulates stock exchanges',
    'ISRO regulates mutual funds; FSSAI regulates insurance',
    'TRAI regulates banks; CAG regulates private startups',
    'A',
    'Checking that an intermediary is registered with RBI, SEBI, or IRDAI protects citizens from fraudulent schemes.',
    'conceptual'
  ],
  [
    5, 1,
    'What is "opportunity cost" in personal finance and entrepreneurship?',
    'The value of the next-best alternative forgone whenever you choose to spend time or money on one option instead of another',
    'A discount coupon offered during festivals',
    'The electricity bill of a retail store',
    'The fine paid for late tax filing',
    'A',
    'Recognising opportunity cost helps households and founders allocate scarce rupees and hours to their highest-value uses.',
    'conceptual'
  ],
  [
    5, 1,
    'Why is "product-market fit" considered the most decisive milestone in a startup’s journey?',
    'It signifies that a well-defined market genuinely wants, uses, and recommends the product enough to sustain organic demand and growth',
    'It means the startup has designed a colourful logo',
    'It means the founder rented the largest office in town',
    'It means the startup stopped listening to customers',
    'A',
    'Scaling marketing before achieving product-market fit wastes capital; achieving fit unlocks durable growth.',
    'conceptual'
  ],

  // ================= LEVEL 5 (COMPETITIVE / OLYMPIAD) — SET 2 (9) =================
  [
    5, 2,
    'What is "asset allocation" in personal wealth management?',
    'Dividing investments strategically across asset classes (such as cash/liquid funds, debt/fixed income, and equities) based on time horizon, goals, and risk tolerance',
    'Buying only one company’s shares with borrowed money',
    'Keeping 100% of retirement savings in loose coins',
    'Changing bank passwords once every decade',
    'A',
    'Aligning asset mix with goal timelines (safe instruments for short-term goals, growth assets for long-term goals) balances safety and returns.',
    'conceptual'
  ],
  [
    5, 2,
    'What does "liquidity" mean when evaluating a financial asset?',
    'How quickly and easily an asset can be converted into cash without significant loss of value',
    'Whether the asset is stored near a river',
    'The colour of the passbook cover',
    'The maximum loan penalty on a credit card',
    'A',
    'Emergency funds require high liquidity (savings/liquid deposits), whereas real estate has low liquidity.',
    'conceptual'
  ],
  [
    5, 2,
    'Case: A young founder in Jaipur creates a B2B platform connecting 500 block-printing artisans directly with boutique designers globally, providing quality checks, fair upfront payments, and eco-certified dyes. How does this startup create shared value?',
    'It simultaneously raises artisan incomes, preserves heritage craft, ensures sustainable production, and builds a profitable global marketplace',
    'It exploits artisans by delaying payments indefinitely',
    'It replaces all handmade craft with plastic imports',
    'It operates without any quality standards',
    'A',
    'Purpose-driven startups align commercial profitability with inclusive livelihoods and cultural/environmental stewardship.',
    'case-based'
  ],
  [
    5, 2,
    'Assertion (A): Maintaining a clear separation between personal finances and startup business accounts is crucial from Day 1. Reason (R): Mixing personal and business transactions obscures true profitability, complicates tax compliance, and erodes investor and lender trust.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Clean bookkeeping and separate accounts are foundational habits of financial governance for any entrepreneur.',
    'assertion-reason'
  ],
  [
    5, 2,
    'What is a "circular economy" startup model?',
    'A venture designed to minimise waste by repairing, refurbishing, recycling, or upcycling materials back into productive use',
    'A shop built in the shape of a circle',
    'A business that throws away 90% of its raw materials',
    'A bank that lends money only in coins',
    'A',
    'Circular startups turn ecological challenges—like e-waste, plastics, and textile scraps—into sustainable business opportunities.',
    'conceptual'
  ],
  [
    5, 2,
    'A freelancer saves ₹5,000 per month consistently for 3 years in a zero-fee goal account (ignoring interest for simplicity). If her emergency target is 6 months of essential expenses at ₹25,000/month, how much more does she need after 3 years?',
    '₹0 — she has saved ₹1,80,000, exceeding her ₹1,50,000 target by ₹30,000',
    '₹1,00,000 more',
    '₹50,000 more',
    '₹1,50,000 more',
    'A',
    'Total saved = ₹5,000 × 36 months = ₹1,80,000. Target = 6 × ₹25,000 = ₹1,50,000. She has surpassed her goal by ₹30,000.',
    'numerical'
  ],
  [
    5, 2,
    'Why do financial advisors recommend nominating a family member ("Nomination") on all bank accounts, deposits, and insurance policies?',
    'It ensures smooth, hassle-free transfer of funds to loved ones in the event of an unforeseen tragedy without prolonged legal delays',
    'It doubles the bank interest rate automatically',
    'It allows the nominee to withdraw money secretly anytime',
    'It exempts the account holder from all taxes',
    'A',
    'Keeping nominations updated is a simple, vital step in responsible household financial planning.',
    'conceptual'
  ],
  [
    5, 2,
    'How does an "entrepreneurial mindset" benefit even students who choose careers as doctors, teachers, engineers, or civil servants?',
    'It equips them with initiative, creative problem-solving, resilience, financial prudence, and leadership within any organisation or community',
    'It forces everyone to quit their jobs immediately',
    'It is useful only for opening restaurants',
    'It discourages teamwork and lifelong learning',
    'A',
    'Entrepreneurial thinking ("intrapreneurship") drives innovation and effectiveness across every profession.',
    'conceptual'
  ],
  [
    5, 2,
    'Which combination best summarises lifelong personal financial well-being?',
    'Earn purposefully, budget consciously, protect with insurance and an emergency fund, avoid bad debt, stay cyber-safe, and invest patiently for long-term goals',
    'Spend first, borrow freely, ignore cyber safety, and never track expenses',
    'Hoard idle cash under a pillow and reject all banks',
    'Chase viral get-rich-quick schemes using high-interest loans',
    'A',
    'Mastering these core pillars empowers individuals to achieve financial independence and contribute meaningfully to society.',
    'conceptual'
  ]
];

export const C9_SST_CH15_FULL_QUESTIONS = expandQuestions(9, 'social-science', 15, RAW);
