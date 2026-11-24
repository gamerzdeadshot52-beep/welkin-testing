import { CompactQuestion, expandQuestions } from './types.ts';

// Class 9 Social Science (Understanding Society: India and Beyond, Part 2) — Chapter 13: India and the World-I (1900 BCE–1200 CE)
// 80 original MCQs (16 per level: 8 in Set 1, 8 in Set 2)

const RAW: CompactQuestion[] = [
  // ================= LEVEL 1 (BASIC) — SET 1 =================
  [
    1, 1,
    'Which ancient Indian university attracted international scholars from China, Korea, Tibet, and Southeast Asia?',
    'Nalanda Mahavihara',
    'Aligarh University',
    'Calcutta Presidency College',
    'Bombay Elphinstone College',
    'A',
    'Nalanda Mahavihara in Bihar was a premier international centre of Buddhist and secular learning from the 5th to 12th century CE.',
    'factual'
  ],
  [
    1, 1,
    'Which famous Chinese Buddhist pilgrim travelled to India during the reign of Chandragupta II (early 5th century CE)?',
    'Faxian (Fa-Hien)',
    'Marco Polo',
    'Ibn Battuta',
    'Vasco da Gama',
    'A',
    'Faxian journeyed overland to India to collect authentic Buddhist monastic texts and left a detailed travelogue.',
    'factual'
  ],
  [
    1, 1,
    'Which Chinese scholar-monk studied at Nalanda for several years during Harshavardhana’s reign in the 7th century CE?',
    'Xuanzang (Hiuen Tsang)',
    'Zheng He',
    'Confucius',
    'Laozi',
    'A',
    'Xuanzang travelled across Central Asia to India, studied at Nalanda, and translated hundreds of Sanskrit texts into Chinese.',
    'factual'
  ],
  [
    1, 1,
    'The magnificent temple complex of Angkor Wat in Cambodia was originally dedicated to which Hindu deity?',
    'Lord Vishnu',
    'Lord Indra',
    'Lord Varuna',
    'Lord Agni',
    'A',
    'Built by King Suryavarman II in the 12th century CE, Angkor Wat was originally constructed as a grand Vishnu temple.',
    'factual'
  ],
  [
    1, 1,
    'Borobudur, the world’s largest Buddhist stupa-temple built under Indian cultural influence, is located in which country?',
    'Indonesia (Java)',
    'Thailand',
    'Sri Lanka',
    'Myanmar',
    'A',
    'Borobudur in Central Java, Indonesia, was built by the Shailendra dynasty around the 8th–9th century CE.',
    'factual'
  ],
  [
    1, 1,
    'Which major seasonal wind system enabled sailors to navigate reliably across the Indian Ocean between India, Arabia, and Africa?',
    'Monsoon winds',
    'Polar easterlies',
    'Arctic blizzards',
    'Tornadoes',
    'A',
    'Predictable southwest and northeast monsoon winds allowed ancient mariners to time round-trip voyages across the Indian Ocean.',
    'factual'
  ],
  [
    1, 1,
    'Which Indian mathematical concept, together with the decimal place-value system, travelled to the Arab world and later to Europe?',
    'Zero (Shunya)',
    'Roman numerals',
    'Binary code',
    'Boolean algebra',
    'A',
    'The Indian decimal place-value system including zero was adopted by Arab scholars and became known in Europe as Hindu-Arabic numerals.',
    'factual'
  ],
  [
    1, 1,
    'Which overland trade network connected China, Central Asia, India, Persia, and the Mediterranean world?',
    'The Silk Road',
    'The Trans-Siberian Railway',
    'The Panama Canal',
    'The Suez Highway',
    'A',
    'The Silk Road was an interconnected network of caravan routes facilitating trade in silk, spices, gems, horses, and ideas.',
    'factual'
  ],

  // ================= LEVEL 1 (BASIC) — SET 2 =================
  [
    1, 2,
    'Which ancient Indian collection of animal fables was translated into Persian as Kalila wa Dimna and spread across Europe?',
    'Panchatantra',
    'Arthashastra',
    'Natyashastra',
    'Charaka Samhita',
    'A',
    'The Panchatantra was translated into Middle Persian, Arabic, and dozens of European languages, shaping world folklore.',
    'factual'
  ],
  [
    1, 2,
    'Which South Indian dynasty sent maritime expeditions and maintained strong diplomatic and trade links with Srivijaya and Song China?',
    'The Cholas',
    'The Nandas',
    'The Shungas',
    'The Haryankas',
    'A',
    'The Imperial Cholas under Rajaraja I and Rajendra I expanded Indian Ocean trade and diplomatic embassies to China and Southeast Asia.',
    'factual'
  ],
  [
    1, 2,
    'Which ancient port on the Malabar Coast of Kerala was famous for exporting black pepper to the Roman Empire?',
    'Muziris',
    'Lothal',
    'Tamralipti',
    'Bharuch',
    'A',
    'Muziris (near modern Kodungallur) was a major entrepôt in the Indo-Roman spice and luxury trade.',
    'factual'
  ],
  [
    1, 2,
    'Which ancient Greek-language sailors’ handbook from the 1st century CE describes Indian Ocean ports and commodities?',
    'Periplus of the Erythraean Sea',
    'Iliad',
    'Republic',
    'Histories of Herodotus',
    'A',
    'The Periplus of the Erythraean Sea is an anonymous Greco-Roman manual detailing ports like Barygaza and Muziris.',
    'factual'
  ],
  [
    1, 2,
    'Which religion spread from India to Sri Lanka, Central Asia, China, Korea, Japan, and Southeast Asia during this period?',
    'Buddhism',
    'Zoroastrianism',
    'Shintoism',
    'Confucianism',
    'A',
    'Buddhism travelled along both overland Silk Road caravans and Indian Ocean sea lanes, becoming a pan-Asian cultural bridge.',
    'factual'
  ],
  [
    1, 2,
    'Which ancient Indian board game travelled to Persia as Shatranj and evolved into modern chess?',
    'Chaturanga',
    'Ludo',
    'Snakes and Ladders',
    'Carrom',
    'A',
    'Chaturanga, representing the four divisions of an ancient Indian army, spread to Persia and Arabia before reaching Europe as chess.',
    'factual'
  ],
  [
    1, 2,
    'Which western Indian port in Gujarat, known to Greeks as Barygaza, was a bustling hub of maritime trade with the Red Sea?',
    'Bharuch (Bhrigukachchha)',
    'Pataliputra',
    'Varanasi',
    'Taxila',
    'A',
    'Bharuch at the mouth of the Narmada River connected inland northern Indian trade routes with Arabia and Rome.',
    'factual'
  ],
  [
    1, 2,
    'Which ancient port in eastern India (Bengal) served as the main gateway for voyages to Sri Lanka and Southeast Asia?',
    'Tamralipti',
    'Sopara',
    'Arikamedu',
    'Dholavira',
    'A',
    'Tamralipti (modern Tamluk) was the premier Bay of Bengal port used by merchants and Buddhist pilgrims like Faxian.',
    'factual'
  ],

  // ================= LEVEL 2 (CONCEPTUAL) — SET 1 =================
  [
    2, 1,
    'Why did Roman writer Pliny the Elder complain about India in his work Natural History?',
    'Large quantities of Roman gold and silver coins flowed to India to pay for luxury spices, muslin, and gems',
    'India refused to sell any pepper to Rome',
    'Indian armies invaded Italy',
    'Rome had no ships capable of sailing past Egypt',
    'A',
    'Pliny lamented that Roman demand for Indian spices, pearls, ivory, and fine textiles caused a massive drain of Roman bullion.',
    'conceptual'
  ],
  [
    2, 1,
    'How did the Gandhara school of art illustrate cultural synthesis between India and the wider world?',
    'It blended Greco-Roman sculptural realism with Indian Buddhist themes and iconography',
    'It banned all human depictions of the Buddha',
    'It used only Chinese porcelain glazes',
    'It copied Egyptian pyramid architecture',
    'A',
    'Gandhara art in northwestern India combined Hellenistic drapery and facial proportions with Buddhist spirituality.',
    'conceptual'
  ],
  [
    2, 1,
    'What was the primary role of the House of Wisdom (Bayt al-Hikma) in Baghdad regarding Indian knowledge?',
    'It sponsored Arabic translations of Indian Sanskrit works on astronomy, mathematics, and medicine',
    'It destroyed all foreign manuscripts',
    'It exported silk exclusively to Japan',
    'It built Buddhist stupas in Iraq',
    'A',
    'Abbasid scholars at Baghdad translated texts like Brahmagupta’s Brahmasphutasiddhanta and Sushruta Samhita into Arabic.',
    'conceptual'
  ],
  [
    2, 1,
    'How did Indian cultural influence spread to Southeast Asia (Suvarnabhumi) between 100 CE and 1200 CE?',
    'Primarily through peaceful maritime trade, travelling scholars, monks, and voluntary adoption by local rulers',
    'Through permanent military conquest and colonisation by Indian emperors',
    'Through forced mass deportations',
    'Through railways built across Burma',
    'A',
    'Southeast Asian kingdoms selectively adapted Sanskrit, scripts, epics, and statecraft to enrich their own indigenous traditions.',
    'conceptual'
  ],
  [
    2, 1,
    'Why was the ancient port of Arikamedu (near Puducherry) archaeologically significant?',
    'Excavations uncovered Roman amphorae, Arretine pottery, glass beads, and evidence of Indo-Roman craft trade',
    'It was the capital of the Mauryan Empire',
    'It contained the largest coal mine in India',
    'It was built by Portuguese sailors in 1500 CE',
    'A',
    'Arikamedu revealed direct Mediterranean trade links with South India during the early centuries of the Common Era.',
    'conceptual'
  ],
  [
    2, 1,
    'What role did Indian merchant guilds such as the Ayyavole 500 and Manigramam play in international trade?',
    'They organised long-distance caravans and sea voyages, pooled capital, and endowed temples abroad',
    'They prohibited overseas travel for all merchants',
    'They minted only European paper currency',
    'They functioned solely as agricultural landlords',
    'A',
    'South Indian merchant guilds left Tamil inscriptions in Sumatra, Thailand, and China, showing organised overseas commerce.',
    'conceptual'
  ],
  [
    2, 1,
    'How did the Kushana Empire facilitate trans-regional exchange between India, Central Asia, and China?',
    'By controlling key branches of the Silk Road connecting northwestern India to the Tarim Basin',
    'By closing all mountain passes in the Himalayas',
    'By banning foreign traders from Taxila',
    'By operating steamships in the Arctic Ocean',
    'A',
    'Kushana patronage of trade and Buddhism enabled monks, artisans, and goods to move freely from India into Central Asia and China.',
    'conceptual'
  ],
  [
    2, 1,
    'Why were Indian steel ingots known as Wootz steel highly prized in West Asia and Europe?',
    'They produced exceptionally sharp, flexible, and strong blades famously forged into Damascus swords',
    'They were softer than pure lead',
    'They floated on water during sea voyages',
    'They were made without using any heat',
    'A',
    'Crucible-forged Wootz steel from South India was exported to Persia and Damascus for high-quality weaponry.',
    'conceptual'
  ],

  // ================= LEVEL 2 (CONCEPTUAL) — SET 2 =================
  [
    2, 2,
    'How did Indian scripts like Pallava Grantha influence Southeast Asian writing systems?',
    'They served as the ancestor for scripts used in Khmer, Javanese, Thai, Burmese, and Cham languages',
    'They replaced all spoken languages in Asia with Latin',
    'They were used only for secret military codes',
    'They prevented literacy from spreading',
    'A',
    'Adapting South Indian Brahmi-derived scripts allowed Southeast Asian societies to record both Sanskrit and their own vernaculars.',
    'conceptual'
  ],
  [
    2, 2,
    'What does the widespread popularity of the Ramayana and Mahabharata in Indonesia, Thailand, and Cambodia demonstrate?',
    'Creative cultural localisation where local societies reinterpreted Indian epics in their own art, dance, and literature',
    'Strict uniformity with zero local variation',
    'Absence of indigenous traditions in Southeast Asia',
    'Direct political rule from Delhi',
    'A',
    'Shadow puppetry (Wayang Kulit) in Java and Ramakien in Thailand reflect vibrant local adaptations of the epics.',
    'conceptual'
  ],
  [
    2, 2,
    'Why did Arab geographers and scholars like Al-Khwarizmi study Indian astronomical tables (Siddhantas)?',
    'Indian trigonometric functions (sine/jya) and calculation methods were remarkably accurate and practical',
    'Arab scholars lacked interest in astronomy',
    'Indian texts were written in Greek',
    'No other civilisations observed the stars',
    'A',
    'Al-Khwarizmi’s treatises on Hindu numerals and astronomical tables introduced Indian mathematics to the Islamic world and Europe.',
    'conceptual'
  ],
  [
    2, 2,
    'How did Tibetan Buddhism develop close scholarly ties with eastern Indian monastic universities like Vikramashila?',
    'Indian masters such as Atisha Dipankara travelled to Tibet to teach and translate Buddhist philosophy',
    'Tibetans never visited India',
    'Vikramashila was located inside Lhasa',
    'Only maritime routes connected Tibet and Bihar',
    'A',
    'Masters like Padmasambhava, Shantarakshita, and Atisha played pivotal roles in establishing Tibetan monastic scholarship.',
    'conceptual'
  ],
  [
    2, 2,
    'What was the significance of the maritime kingdom of Srivijaya (in Sumatra) in Indian Ocean trade?',
    'It controlled the strategic Strait of Malacca linking Indian Ocean merchants with China and patronised Buddhist learning',
    'It was a landlocked Himalayan kingdom',
    'It banned Indian ships from passing eastward',
    'It traded exclusively with South America',
    'A',
    'Srivijaya was a vital stopover for ships and pilgrims like Yijing sailing between India and Tang China.',
    'conceptual'
  ],
  [
    2, 2,
    'Which historical evidence proves that Harappan/post-Harappan communities (around 1900 BCE) maintained maritime contact with West Asia?',
    'Indus-style seals, carnelian beads, and weights discovered in Mesopotamia, Dilmun (Bahrain), and Oman',
    'Printing presses found in Baghdad',
    'Roman coins discovered in Harappa',
    'Iron steam engines found at Lothal',
    'A',
    'Archaeological finds in Mesopotamia and the Persian Gulf confirm early Bronze Age trade links with the Indian subcontinent.',
    'conceptual'
  ],
  [
    2, 2,
    'How did Jewish, Syrian Christian, and Zoroastrian (Parsi) communities become part of India’s coastal society during the first millennium CE?',
    'They arrived via Indian Ocean trade routes or sought refuge, receiving land grants and religious freedom from Indian rulers',
    'They were captured during European wars',
    'They settled only in the Thar Desert',
    'They were prohibited from practising their faiths',
    'A',
    'Copper-plate grants from Kerala and Gujarat rulers document the hospitality and trading privileges extended to these communities.',
    'conceptual'
  ],
  [
    2, 2,
    'What made Indian cotton textiles (calico, muslin, chintz) sought-after global exports for over a millennium?',
    'Mastery of spinning ultra-fine yarn and colourfast natural dyeing techniques using mordants and indigo',
    'They were made from synthetic polyester',
    'They were heavier than woollen blankets',
    'They could only be worn in freezing climates',
    'A',
    'Fragments of resist-dyed Indian cotton cloth discovered at Fustat (Egypt) testify to India’s unmatched textile craftsmanship.',
    'conceptual'
  ],

  // ================= LEVEL 3 (APPLICATION) — SET 1 =================
  [
    3, 1,
    'A Roman merchant in 50 CE wants to sail from Berenike (Egypt) to Muziris (Kerala) and return safely within one year. How must he plan his voyage?',
    'Sail east with the southwest monsoon in summer and return west with the northeast monsoon in winter',
    'Sail east in winter and return west in summer',
    'Row against the winds throughout the year',
    'Travel overland through the Sahara Desert',
    'A',
    'Ancient mariners timed outbound voyages with the summer southwest monsoon and return voyages with the winter northeast monsoon.',
    'application'
  ],
  [
    3, 1,
    'An archaeologist in Sumatra uncovers a 1088 CE Tamil inscription mentioning a guild setting rules for ships and donations. Which group most likely commissioned it?',
    'A South Indian merchant guild such as the Ayyavole 500 operating in Southeast Asia',
    'The British East India Company',
    'A Mauryan military garrison',
    'A Portuguese missionary order',
    'A',
    'The Barus (Loboe Toewa) Tamil inscription in Sumatra records the overseas commercial organisation of South Indian guilds.',
    'application'
  ],
  [
    3, 1,
    'When European mathematicians in the 12th century adopted "Algorism" (algorithms), whose chain of knowledge transmission were they using?',
    'Indian decimal arithmetic transmitted via Al-Khwarizmi’s Arabic treatises translated into Latin',
    'Mayan calendar glyphs sent from Mexico',
    'Egyptian hieroglyphic tally marks',
    'Mesopotamian clay tablets excavated in 1900',
    'A',
    'The word "algorithm" derives from Al-Khwarizmi, who wrote On the Calculation with Hindu Numerals.',
    'application'
  ],
  [
    3, 1,
    'A student sees a 10th-century stone relief in Central Java depicting scenes from the Ramayana alongside local Javanese clothing and architecture. What historical process does this illustrate?',
    'Cultural localisation and synthesis rather than passive imitation',
    'Complete erasure of Javanese culture',
    'Modern 21st-century film influence',
    'Colonial imposition by European powers',
    'A',
    'Southeast Asian artisans actively adapted Indian narratives to reflect their own landscapes, aesthetics, and values.',
    'application'
  ],
  [
    3, 1,
    'Why did Indian rulers like the Cholas grant land and tax exemptions to Buddhist viharas built by Srivijaya kings at Nagapattinam?',
    'To strengthen diplomatic goodwill and encourage mutually profitable maritime trade across the Bay of Bengal',
    'Because they were defeated by Srivijaya in war',
    'Because Nagapattinam was uninhabited desert',
    'To stop all ships from docking at Chola ports',
    'A',
    'The Larger Leiden Plates record Rajaraja Chola’s grant to the Chudamani Vihara built by the Srivijaya king at Nagapattinam.',
    'application'
  ],
  [
    3, 1,
    'If a museum displays a hoard of gold coins bearing portraits of Roman Emperors Augustus and Tiberius discovered in Coimbatore (Tamil Nadu), what does this prove?',
    'Active trade surplus enjoyed by South India in exporting spices, gems, and textiles to the Roman Empire',
    'Roman legions conquered Tamil Nadu',
    'South Indian kings minted Roman emperors’ faces on local coins',
    'Coimbatore was part of Italy',
    'A',
    'Large hoards of Roman aurei and denarii in South India reflect the high value of Indian exports to the Mediterranean.',
    'application'
  ],
  [
    3, 1,
    'A medieval Arab physician cites remedies involving turmeric, black pepper, and surgical rhinoplasty from translated Sanskrit manuals. Which Indian tradition is he drawing upon?',
    'Ayurveda (such as Charaka Samhita and Sushruta Samhita)',
    'Homeopathy',
    'Modern antibiotic synthesis',
    'Acupuncture only',
    'A',
    'Arabic medical encyclopaedias like Al-Razi’s works incorporated clinical insights translated from Charaka and Sushruta.',
    'application'
  ],
  [
    3, 1,
    'Why did Xuanzang’s travel account (Si-Yu-Ki) become an invaluable source for historians of 7th-century India?',
    'It provided an eyewitness outsider’s record of Indian cities, monasteries, administration, education, and social life',
    'It contained official tax ledgers of the British Raj',
    'It was written in the 20th century using photographs',
    'It described only European kingdoms',
    'A',
    'Foreign travelogues like Xuanzang’s complement indigenous inscriptions and literary sources to reconstruct ancient Indian history.',
    'application'
  ],

  // ================= LEVEL 3 (APPLICATION) — SET 2 =================
  [
    3, 2,
    'Why did Buddhism flourish along the oasis towns of the Tarim Basin (such as Dunhuang, Khotan, and Kucha)?',
    'Caravan merchants patronised monasteries as rest stops, spiritual shelters, and centres of translation along the Silk Road',
    'The Tarim Basin had deep ocean ports',
    'No trade routes passed through Central Asia',
    'Oasis towns banned all travellers',
    'A',
    'Monasteries and caves like Mogao at Dunhuang thrived on merchant donations and became bridges for Buddhist art and texts into China.',
    'application'
  ],
  [
    3, 2,
    'An inscription in Vietnam’s ancient Champa kingdom is written in Sanskrit using a South Indian script. What does this indicate?',
    'Sanskrit served as a cosmopolitan language of royal prestige, religion, and scholarship across South and Southeast Asia',
    'Champa was a province of Gujarat',
    'Local Vietnamese languages did not exist',
    'Europeans introduced Sanskrit to Vietnam',
    'A',
    'Historians describe this shared literary and aesthetic zone as the "Sanskrit Cosmopolis" spanning South and Southeast Asia.',
    'application'
  ],
  [
    3, 2,
    'How did the spread of Indian sugar-refining technology (crystallised sugar / khanda) impact the wider world?',
    'Crystallised cane sugar spread to Persia, the Arab world, and Europe, giving rise to the English word "candy"',
    'It eliminated sugarcane farming in India',
    'It was kept strictly secret until 1950',
    'It replaced salt in ocean water',
    'A',
    'Ancient Indians pioneered crystallising sugarcane juice into solid khanda (qand in Arabic/Persian), which entered English as candy.',
    'application'
  ],
  [
    3, 2,
    'A 10th-century ship wrecked off Belitung Island (Indonesia) carried Arab-style stitched wooden planks and Chinese ceramics bound for West Asia. What does this reveal about Indian Ocean trade?',
    'Indian Ocean commerce was a multi-ethnic, interconnected network linking China, Southeast Asia, India, Arabia, and East Africa',
    'Only European ships sailed in Asian waters before 1200 CE',
    'Ships never carried ceramics across seas',
    'Trade was strictly limited to rivers',
    'A',
    'The Indian Ocean world functioned as an integrated maritime highway where stitched-plank dhows and Asian vessels connected distant regions.',
    'application'
  ],
  [
    3, 2,
    'Why did the Chola king Rajendra I launch a naval expedition against Srivijaya in 1025 CE?',
    'To protect Chola merchant guilds’ access to the Strait of Malacca and direct maritime trade with Song China',
    'To annex the island of Britain',
    'To search for Arctic whales',
    'To end all maritime trade permanently',
    'A',
    'Commercial rivalry over control of the Malacca sea-lane and Chinese trade led to the famous 1025 CE Chola naval campaign.',
    'application'
  ],
  [
    3, 2,
    'Which modern Indian practice shows the reverse direction of cultural exchange—India absorbing ideas and goods from the wider world during 1900 BCE–1200 CE?',
    'Adoption of West Asian coinage designs, Greek astronomical terms, Central Asian stitched garments, and Central Asian horses',
    'Refusal to import any foreign goods or animals',
    'Complete isolation behind closed borders',
    'Elimination of all ports along the coastline',
    'A',
    'Exchange was always two-way: India imported horses, coral, frankincense, silk, and glass while adapting Hellenistic and West Asian influences.',
    'application'
  ],
  [
    3, 2,
    'Why did ancient Indian ports frequently host multi-lingual translator communities and cosmopolitan merchant quarters?',
    'Smooth trade between Indian, Arab, Persian, Chinese, African, and Mediterranean merchants required linguistic and legal mediation',
    'Ports banned foreign sailors from landing',
    'All ancient peoples spoke only one language',
    'Governments forbade commercial contracts',
    'A',
    'Cosmopolitan port cities like Bharuch, Muziris, and Nagapattinam thrived on cultural pluralism and reliable dispute resolution.',
    'application'
  ],
  [
    3, 2,
    'A student notices that the Chinese Buddhist monk Yijing advised fellow monks to study Sanskrit grammar in Srivijaya before sailing to India. What does this imply?',
    'Srivijaya had itself become a flourishing regional centre of Sanskrit and Buddhist scholarship',
    'No one in India knew Sanskrit',
    'Srivijaya was located in Bihar',
    'Chinese monks were banned from visiting Nalanda',
    'A',
    'Yijing’s 7th-century account shows how deeply Indian scholarly traditions had taken root in Southeast Asian centres like Palembang.',
    'application'
  ],

  // ================= LEVEL 4 (HIGHER-ORDER / ANALYSIS) — SET 1 =================
  [
    4, 1,
    'Assertion (A): The Indian Ocean trade network before 1200 CE was remarkably peaceful and cooperative compared to later colonial eras. Reason (R): Maritime states generally profited from attracting ships with safe ports and customs duties rather than claiming monopoly ownership of the open sea.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Before European armed monopolies arrived in the 16th century, Indian Ocean rulers competed by offering fair port facilities rather than blocking sea lanes.',
    'assertion-reason'
  ],
  [
    4, 1,
    'Assertion (A): Indian mathematical texts influenced both Islamic and European scientific revolutions. Reason (R): The decimal place-value system with zero dramatically simplified arithmetic, algebra, and astronomical computation compared to Roman numerals.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Efficient positional notation with zero enabled rapid advances in trade accounting, algebra, trigonometry, and science globally.',
    'assertion-reason'
  ],
  [
    4, 1,
    'Case: In the 8th century CE, Indian astronomer Kanaka visited the court of Caliph Al-Mansur in Baghdad carrying Sanskrit astronomical treatises. Scholars translated them into Arabic as the Zij al-Sindhind. What broader historical pattern does this event exemplify?',
    'State-sponsored cross-cultural intellectual exchange bridging India and the Islamic Golden Age',
    'Military conquest of India by Baghdad',
    'Isolation of Indian science from the rest of the world',
    'Destruction of Sanskrit manuscripts in Iraq',
    'A',
    'Abbasid patronage actively sought Indian scientific expertise, integrating Sanskrit astronomy into Islamic scholarship.',
    'case-based'
  ],
  [
    4, 1,
    'Case: Excavations at Berenike on Egypt’s Red Sea coast uncovered 7.5 kg of Indian black pepper inside an Indian storage jar, along with a Tamil-Brahmi pottery inscription and a Buddha statue. What do these finds collectively prove?',
    'Indian merchants and artisans physically resided and worshipped in Roman-era Egyptian port towns',
    'Black pepper grew natively in the Egyptian desert',
    'Buddhism originated in Egypt',
    'India traded only through overland routes',
    'A',
    'Recent excavations at Berenike confirm an active Indian diaspora community living at Red Sea trading ports.',
    'case-based'
  ],
  [
    4, 1,
    'Why do modern historians prefer terms like "cultural exchange" or "localisation" over the older colonial term "Greater India" when studying Southeast Asia?',
    'Because Southeast Asian societies were active, creative agents who selectively adapted Indian ideas rather than passive colonies',
    'Because there was zero contact between India and Southeast Asia',
    'Because Southeast Asia conquered India',
    'Because India had no maritime ships',
    'A',
    'Modern scholarship emphasises mutual agency and vibrant indigenous synthesis rather than one-sided cultural domination.',
    'conceptual'
  ],
  [
    4, 1,
    'How did the geography of the Indian subcontinent naturally position it at the centre of ancient Afro-Eurasian exchange?',
    'Its peninsular coastline jutted into the Indian Ocean midway between East Africa/Arabia and Southeast Asia/China, while northern passes linked to the Silk Road',
    'It was completely surrounded by impassable glaciers',
    'It had no navigable rivers or natural harbours',
    'It lay far south near Antarctica',
    'A',
    'India’s central peninsular location and monsoon wind patterns made it the natural fulcrum of ancient global trade.',
    'conceptual'
  ],
  [
    4, 1,
    'What distinguishes the spread of Buddhism to East Asia from its spread to Sri Lanka and Southeast Asia?',
    'East Asia primarily received Mahayana Buddhism via Central Asian Silk Road routes and Chinese translations, while Sri Lanka and mainland Southeast Asia strongly preserved Theravada traditions via maritime links',
    'Buddhism never reached Japan or Korea',
    'Sri Lanka received Buddhism only in the 19th century',
    'China banned all Buddhist translations',
    'A',
    'Different transmission corridors (overland Silk Road vs maritime Indian Ocean) shaped distinct regional Buddhist traditions.',
    'conceptual'
  ],
  [
    4, 1,
    'Why did ancient Indian coinage change noticeably after contact with Indo-Greeks, Shakas, and Kushanas?',
    'Die-struck coins featuring royal portraits, bilingual legends, and standardised weights replaced earlier punch-marked silver bars',
    'Gold and silver coins were completely abolished',
    'Only paper banknotes were used from 200 BCE',
    'Coins were made exclusively of wood',
    'A',
    'Indo-Greek and Kushana numismatic traditions introduced portrait coinage and Greek-Kharoshthi/Brahmi bilingual inscriptions.',
    'conceptual'
  ],

  // ================= LEVEL 4 (HIGHER-ORDER / ANALYSIS) — SET 2 =================
  [
    4, 2,
    'Assertion (A): Nalanda was not merely a religious seminary but a truly international university. Reason (R): It admitted students through rigorous entrance interviews and taught logic, grammar, medicine, astronomy, and philosophy alongside Buddhist scriptures.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Xuanzang and Yijing praised Nalanda’s broad curriculum, vast libraries (Dharmaganja), and merit-based international admission.',
    'assertion-reason'
  ],
  [
    4, 2,
    'Assertion (A): Trade along the Silk Road and Indian Ocean routes was never purely economic. Reason (R): Alongside spices, silk, and metals, travellers carried scripts, medical texts, architectural styles, music, and philosophies.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Commerce provided the infrastructure, patronage, and mobility that allowed ideas and art forms to cross continents.',
    'assertion-reason'
  ],
  [
    4, 2,
    'Case: The 9th-century Arab merchant Sulaiman wrote admiringly of the Rashtrakuta (Balhara) rulers of India for their fair treatment of foreign traders, prosperity, and religious tolerance. What does this account highlight?',
    'West Indian kingdoms actively fostered secure, cosmopolitan environments to attract lucrative Indian Ocean commerce',
    'Arab merchants were forbidden from entering western India',
    'The Rashtrakutas banned maritime trade',
    'India had no contact with the Arab world before 1500 CE',
    'A',
    'Arab travelogues document thriving coastal communities and royal protection extended to overseas merchants in Gujarat and the Konkan.',
    'case-based'
  ],
  [
    4, 2,
    'Case: The temple of Prambanan (Java) honours the Hindu Trimurti, while nearby Borobudur is a monumental Buddhist stupa, both built within a century of each other. What does their proximity signify?',
    'Harmonious coexistence and royal patronage of both Hindu and Buddhist traditions in ancient Java',
    'Total destruction of Buddhism by Hindu kings',
    'European architectural design in 9th-century Java',
    'Lack of skilled stone carvers in Southeast Asia',
    'A',
    'Just as in India (e.g. Ellora), Javanese dynasties frequently patronised both Hindu and Buddhist monuments side by side.',
    'case-based'
  ],
  [
    4, 2,
    'How did the decline of the Western Roman Empire in the 5th century CE reshape India’s external trade rather than ending it?',
    'Indian merchants pivoted increasingly toward Southeast Asia, Sassanian Persia, Byzantium, the Arab world, and Tang/Song China',
    'India stopped all overseas trade for 1,000 years',
    'Indian ports were abandoned permanently',
    'India began trading only with Antarctica',
    'A',
    'India’s trade network was resilient and multi-directional, expanding dynamically eastward to Southeast Asia and China as Mediterranean demand shifted.',
    'conceptual'
  ],
  [
    4, 2,
    'Why is the spread of the zero and decimal system often considered India’s most transformative gift to global civilisation?',
    'Because modern mathematics, commerce, engineering, astronomy, and digital computing all depend on positional numerical notation',
    'Because it was used only for writing poetry',
    'Because it prevented merchants from counting money',
    'Because it replaced spoken language',
    'A',
    'Positional decimal arithmetic with zero unlocked universal mathematical literacy and scientific computation worldwide.',
    'conceptual'
  ],
  [
    4, 2,
    'What role did Indian shipbuilders play in ancient Indian Ocean navigation?',
    'They constructed large, seaworthy teakwood vessels with stitched planks capable of carrying hundreds of passengers and heavy cargo across open seas',
    'They built only small bamboo rafts for ponds',
    'They imported every ship from Norway',
    'They avoided using timber for ship hulls',
    'A',
    'Teak from the Western Ghats was prized across the Arabian Sea for resisting rot and marine borers.',
    'conceptual'
  ],
  [
    4, 2,
    'How did diplomatic embassies between Indian courts (such as Mauryas, Guptas, Pallavas, Cholas) and foreign empires (Rome, Persia, China) serve strategic goals?',
    'They exchanged rare gifts, gathered geopolitical intelligence, secured trade privileges, and enhanced royal prestige',
    'They were purely tourist vacations',
    'They aimed to abolish all foreign languages',
    'They were sent only after 1947',
    'A',
    'Official envoys sustained long-distance trust and formalised commercial and cultural relations between distant courts.',
    'conceptual'
  ],

  // ================= LEVEL 5 (COMPETITIVE / OLYMPIAD) — SET 1 =================
  [
    5, 1,
    'Which famous Indian Buddhist monk translated major Mahayana scriptures into Chinese in 401 CE at Chang’an, shaping East Asian Buddhist vocabulary?',
    'Kumarajiva',
    'Kalidasa',
    'Varahamihira',
    'Banabhatta',
    'A',
    'Kumarajiva, born in Kucha to an Indian father and Kuchean mother, led a renowned translation bureau in Chang’an.',
    'conceptual'
  ],
  [
    5, 1,
    'The "Bakhshali Manuscript" and inscriptions at Gwalior (876 CE) are globally significant in the history of science because they provide:',
    'Early physical evidence of the dot/circular symbol for zero used in Indian positional decimal notation',
    'The first printed newspapers in Asia',
    'Recipes for European gunpowder',
    'Maps of the Pacific Ocean',
    'A',
    'The Chaturbhuj Temple inscription at Gwalior (876 CE) and the Bakhshali Manuscript document early Indian zero notation.',
    'conceptual'
  ],
  [
    5, 1,
    'Read the evidence: (1) Tamil-Brahmi potsherds in Oman and Egypt, (2) Roman amphorae at Arikamedu, (3) Teakwood planks found in Persian Gulf shipwrecks. What comprehensive historical conclusion is supported?',
    'Ancient India was deeply integrated into a bidirectional western Indian Ocean maritime economy exporting both raw materials and finished goods',
    'India was a passive receiver of foreign products with no exports',
    'Trade occurred exclusively after European arrival in 1498',
    'Only northern India participated in foreign trade',
    'A',
    'Material finds on both shores of the Arabian Sea verify vigorous, bidirectional maritime commerce.',
    'case-based'
  ],
  [
    5, 1,
    'Assertion (A): The Sanskrit scholar Al-Biruni (11th century CE) wrote Kitab al-Hind after living in India and learning Sanskrit. Reason (R): He aimed to present an objective, scholarly account of Indian philosophy, astronomy, mathematics, and customs to Arabic readers.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Al-Biruni’s Kitab al-Hind is celebrated as a landmark of comparative cross-cultural scholarship.',
    'assertion-reason'
  ],
  [
    5, 1,
    'Which Korean Buddhist monk travelled to India in the 8th century CE and wrote Wang Ocheonchukguk Jeon (Memoir of the Pilgrimage to the Five Kingdoms of India)?',
    'Hyecho',
    'Faxian',
    'Megasthenes',
    'Al-Masudi',
    'A',
    'Hyecho’s travelogue, discovered at Dunhuang, reveals the extraordinary geographic reach of India’s scholarly reputation in East Asia.',
    'conceptual'
  ],
  [
    5, 1,
    'Which architectural feature of Angkor Wat reflects traditional Indian cosmological symbolism adapted by Khmer monarchs?',
    'A central quincunx of five lotus-bud towers representing Mount Meru surrounded by a moat symbolising the cosmic ocean',
    'Gothic flying buttresses and stained glass windows',
    'A steel Eiffel-style lattice spire',
    'Flat concrete skyscrapers',
    'A',
    'Khmer temple-mountains translated the Indian concept of Mount Meru (axis of the cosmos) into monumental stone architecture.',
    'conceptual'
  ],
  [
    5, 1,
    'How did the Indian concept of "Vasudhaiva Kutumbakam" and open port policies reinforce each other historically?',
    'Philosophical openness toward diverse beliefs complemented pragmatic hospitality toward foreign merchants, pilgrims, and refugees',
    'They required closing all borders to outsiders',
    'They outlawed foreign languages in India',
    'They prevented Indians from travelling overseas',
    'A',
    'India’s long tradition of welcoming diverse communities—from Jews and Christians to Parsis and Arab traders—enriched its pluralistic society.',
    'conceptual'
  ],
  [
    5, 1,
    'Why is the period 1900 BCE–1200 CE best understood as a continuum of "globalisation before modernity"?',
    'Long before steamships or the internet, sustained overland and maritime networks linked India with Africa, Europe, West Asia, Central Asia, and East Asia in trade, science, and culture',
    'Because aeroplanes existed in 500 BCE',
    'Because all countries shared one world government',
    'Because ancient civilisations never interacted',
    'A',
    'Ancient Afro-Eurasian networks demonstrated deep economic and intellectual interdependence centuries before modern globalisation.',
    'conceptual'
  ],

  // ================= LEVEL 5 (COMPETITIVE / OLYMPIAD) — SET 2 =================
  [
    5, 2,
    'Which ancient Indian monk from Kanchipuram is credited in East Asian tradition with transmitting Dhyana (Chan / Zen) Buddhism to China in the 6th century CE?',
    'Bodhidharma',
    'Nagarjuna',
    'Ashvaghosha',
    'Patanjali',
    'A',
    'Bodhidharma, traditionally associated with Pallava Kanchipuram, is revered as the first patriarch of Chan (Chinese) and Zen (Japanese) Buddhism.',
    'conceptual'
  ],
  [
    5, 2,
    'Which pair correctly matches an ancient Indian export with its major foreign destination during 1900 BCE–1200 CE?',
    'Black pepper and pearls — Roman Empire; Cotton textiles and Buddhism — Southeast & East Asia',
    'Potatoes and tomatoes — Ancient Rome; Maize — Harappa',
    'Crude petroleum — Tang China; Automobiles — Baghdad',
    'Woollen coats — Java; Penguins — Persia',
    'A',
    'Black pepper, pearls, ivory, Wootz steel, spices, textiles, and intellectual traditions were India’s signature historical exports.',
    'conceptual'
  ],
  [
    5, 2,
    'Case: A Tamil inscription at Quanzhou (a major Song/Yuan port in China) and ruins of a Shiva temple there show South Indian merchants worshipping in coastal China. What does this demonstrate?',
    'Direct, long-term residence of Indian merchant communities in Chinese maritime cities',
    'China was ruled by South Indian kings',
    'No Chinese ships ever traded with India',
    'Quanzhou was a landlocked Himalayan village',
    'A',
    'Quanzhou’s bilingual Tamil-Chinese inscriptions and Hindu carvings prove the presence of permanent South Indian trading diasporas in China.',
    'case-based'
  ],
  [
    5, 2,
    'Assertion (A): The translation of Indian scientific works into Arabic and Chinese preserved several texts whose Sanskrit originals were later lost. Reason (R): Cross-cultural scholarship created redundant archives across multiple languages and civilisations.',
    'Both A and R are true, and R is the correct explanation of A',
    'Both A and R are true, but R is not the correct explanation of A',
    'A is true, but R is false',
    'A is false, but R is true',
    'A',
    'Chinese, Tibetan, and Arabic translations preserved hundreds of Indian philosophical, medical, and astronomical treatises.',
    'assertion-reason'
  ],
  [
    5, 2,
    'In the 1st century CE, why did the discovery of direct open-sea monsoon sailing (attributed in Greco-Roman texts to Hippalus) dramatically boost Indo-Roman trade?',
    'It allowed ships to sail directly across the Arabian Sea in about 40 days instead of hugging the long, perilous coastline',
    'It eliminated the need for sails',
    'It created a land bridge across the Red Sea',
    'It made ships travel faster than aeroplanes',
    'A',
    'Direct monsoon crossings cut voyage time drastically, increasing annual cargo volume between Egypt and western India.',
    'conceptual'
  ],
  [
    5, 2,
    'Which ancient Southeast Asian kingdom in modern Cambodia (preceding Angkor) was described in Chinese annals as having Indian-influenced statecraft and Sanskrit inscriptions from the 3rd century CE?',
    'Funan',
    'Sparta',
    'Carthage',
    'Babylon',
    'A',
    'Funan, centred in the Mekong Delta, was one of the earliest Indianised maritime polities in Southeast Asia.',
    'conceptual'
  ],
  [
    5, 2,
    'Which statement best captures the mutual nature of India’s engagement with the world between 1900 BCE and 1200 CE?',
    'India simultaneously enriched global science, art, and spirituality while creatively absorbing foreign technologies, commodities, artistic styles, and communities',
    'India only gave knowledge and never learned anything from others',
    'India only borrowed from others and contributed nothing original',
    'India remained cut off by mountains and oceans until 1800 CE',
    'A',
    'India’s civilisational vitality stemmed from confident, reciprocal engagement across land and sea routes.',
    'conceptual'
  ],
  [
    5, 2,
    'Why do historians study shipwrecks, coin hoards, port inscriptions, and foreign travelogues together when reconstructing India’s global links?',
    'Triangulating archaeological, numismatic, epigraphic, and textual evidence provides a fuller, bias-checked picture of ancient exchange',
    'Because inscriptions alone are always fictional',
    'Because coins cannot be dated',
    'Because shipwrecks never contain artefacts',
    'A',
    'Combining multiple independent lines of evidence allows historians to verify trade routes, chronology, and cultural interactions accurately.',
    'conceptual'
  ]
];

export const C9_SST_CH13_FULL_QUESTIONS = expandQuestions(9, 'social-science', 13, RAW);
