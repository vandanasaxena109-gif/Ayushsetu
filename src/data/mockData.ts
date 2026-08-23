import { LanguageOption, PatientData, PatientProfile, PatientAuthData } from '../types';

export const LANGUAGES: LanguageOption[] = [
  { id: 'hi', name: 'Hindi', nativeName: 'हिंदी', description: 'उत्तर और मध्य भारत' },
  { id: 'en', name: 'English', nativeName: 'English', description: 'National & Global' },
  { id: 'mr', name: 'Marathi', nativeName: 'मराठी', description: 'महाराष्ट्र' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்', description: 'தமிழ்நாடு' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు', description: 'ఆంధ్రప్రదేశ్ & తెలంగాణ' },
  { id: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', description: 'ಕರ್ನಾಟಕ' },
  { id: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', description: 'കേരളം' },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা', description: 'পশ্চিমবঙ্গ' },
  { id: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', description: 'ગુજરાત' },
  { id: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', description: 'ਪੰਜਾਬ' },
  { id: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', description: 'ଓଡ଼ିଶା' },
  { id: 'as', name: 'Assamese', nativeName: 'অসমীয়া', description: 'অসম' },
];

export const DEMO_NEW_PATIENT_AUTH: PatientAuthData = {
  name: 'Riya Sharma',
  age: 42,
  gender: 'Female',
  phone: '+91 98765 44582',
  abhaId: '91-4523-8890-1234',
  ayushmanCard: 'PMJAY-MH-449102',
  isReturningPatient: false,
};

export const SYMPTOM_OPTIONS = [
  { id: 'chest', name: 'Chest Pain', hindi: 'छाती में दर्द', isRedFlag: true, category: 'Cardiovascular' },
  { id: 'fever', name: 'High Fever', hindi: 'तेज बुखार', isRedFlag: false, category: 'General' },
  { id: 'cough', name: 'Persistent Cough', hindi: 'लगातार खांसी', isRedFlag: false, category: 'Respiratory' },
  { id: 'stomach', name: 'Stomach Pain', hindi: 'पेट में दर्द', isRedFlag: false, category: 'Digestive' },
  { id: 'pain', name: 'Joint / Body Pain', hindi: 'जोड़ों में दर्द', isRedFlag: false, category: 'Musculoskeletal' },
  { id: 'headache', name: 'Severe Headache', hindi: 'सिरदर्द', isRedFlag: false, category: 'Neurological' },
  { id: 'breath', name: 'Shortness of Breath', hindi: 'सांस फूलना', isRedFlag: true, category: 'Respiratory' },
  { id: 'vomit', name: 'Nausea & Vomiting', hindi: 'उल्टी / जी मिचलाना', isRedFlag: false, category: 'Digestive' },
];

export const AYURVEDIC_QUESTIONS = [
  {
    id: 'aharaShakti',
    section: 'Ahara Pariksha (Diet & Appetite)',
    question: 'How is your appetite and food capacity?',
    questionHindi: 'आपकी भूख और खाने की क्षमता कैसी है?',
    options: [
      { id: 'Strong and Regular', title: 'Strong & Regular', desc: 'Digests easily on time with normal hunger', icon: 'restaurant', dosha: 'Pitta' },
      { id: 'Variable', title: 'Variable / Irregular', desc: 'Sometimes hungry, sometimes skipping meals', icon: 'waves', dosha: 'Vata' },
      { id: 'Low or Sluggish', title: 'Low or Heavy', desc: 'Slow digestion, heaviness after small meals', icon: 'sentiment_dissatisfied', dosha: 'Kapha' }
    ]
  },
  {
    id: 'agniDigestion',
    section: 'Agni (Digestive Fire)',
    question: 'What happens in your stomach after eating?',
    questionHindi: 'भोजन के बाद पेट में क्या महसूस होता है?',
    options: [
      { id: 'Sama Agni (Normal)', title: 'Comfortable', desc: 'No bloating, pain, or burning sensation', icon: 'check_circle', dosha: 'Sama' },
      { id: 'Tikshna / Visham Agni', title: 'Burning / Acidity', desc: 'Heartburn, sour belching, epigastric discomfort', icon: 'local_fire_department', dosha: 'Pitta-Vata' },
      { id: 'Manda Agni', title: 'Bloating & Heaviness', desc: 'Sluggish stomach, fullness for hours', icon: 'waves', dosha: 'Kapha' }
    ]
  },
  {
    id: 'sleepQuality',
    section: 'Nidra (Sleep Patterns)',
    question: 'How is your sleep and rest quality?',
    questionHindi: 'आपकी नींद और विश्राम की स्थिति कैसी है?',
    options: [
      { id: 'Deep & Restful', title: 'Sound & Deep', desc: 'Falls asleep quickly, wakes refreshed', icon: 'bedtime', dosha: 'Kapha-Pitta' },
      { id: 'Light / Disturbed', title: 'Disturbed / Waking', desc: 'Frequent night awakenings or insomnia', icon: 'nights_stay', dosha: 'Vata' },
      { id: 'Excessive / Drowsy', title: 'Heavy / Sluggish', desc: 'Hard to wake up, daytime lethargy', icon: 'snooze', dosha: 'Kapha' }
    ]
  },
  {
    id: 'bowelMovement',
    section: 'Koshta (Bowel Habits)',
    question: 'How regular are your bowel movements?',
    questionHindi: 'पेट साफ होने की आदत कैसी है?',
    options: [
      { id: 'Regular once daily', title: 'Clear Daily', desc: 'Smooth morning evacuation without straining', icon: 'check_circle', dosha: 'Sama' },
      { id: 'Hard / Constipated', title: 'Constipated / Hard', desc: 'Dry stools, difficulty or once in 2 days', icon: 'priority_high', dosha: 'Vata' },
      { id: 'Loose / Frequent', title: 'Loose / Rapid', desc: 'Soft or urgent bowel urges after eating', icon: 'waves', dosha: 'Pitta' }
    ]
  },
  {
    id: 'stressMind',
    section: 'Manasa Bhava (Mental State)',
    question: 'How do you feel emotionally and mentally?',
    questionHindi: 'मानसिक और भावनात्मक स्थिति कैसी है?',
    options: [
      { id: 'Calm & Steady', title: 'Calm & Balanced', desc: 'Peaceful, clear-headed, positive', icon: 'self_improvement', dosha: 'Sattva' },
      { id: 'Anxious / Overthinking', title: 'Anxious / Restless', desc: 'Worrying constantly, racing thoughts', icon: 'psychology', dosha: 'Rajas-Vata' },
      { id: 'Fatigued / Low Energy', title: 'Fatigued / Low', desc: 'Lack of enthusiasm or physical stamina', icon: 'bolt', dosha: 'Tamas-Kapha' }
    ]
  }
];

export const INITIAL_PATIENTS: PatientData[] = [
  {
    id: 'P-84729',
    tokenNumber: 'A-102',
    name: 'Shri. Ramswaroop Sharma',
    age: 65,
    gender: 'Male',
    language: 'Hindi',
    languageId: 'hi',
    phone: '+91 98234 11200',
    patientId: 'AS-2026-001846',
    abhaId: '91-4523-8890-1234',
    abhaStatus: 'Linked',
    ayushmanCard: 'ABHA-PMJAY-992144',
    ayushmanStatus: 'Verified',
    consentVerified: true,
    chiefComplaint: 'Severe stomach pain & chest radiation',
    duration: '3 days',
    severity: 'Severe',
    isUrgent: true,
    urgentReason: 'Chest pain with pain radiating to the left arm reported.',
    symptoms: ['Stomach Pain', 'Chest Discomfort', 'Nausea'],
    liveTranscript: 'पेट में 3 दिनों से बहुत तेज दर्द है और आज सुबह से छाती में भारीपन लग रहा है जो बाएं हाथ तक जा रहा है। ("My stomach has been hurting severely since 3 days and radiating heaviness to left arm.")',
    medications: ['Metformin 500mg (BD)', 'Amlodipine 5mg (OD)'],
    allergies: ['Penicillin'],
    medicalHistory: 'Patient has a known history of Type 2 Diabetes Mellitus managed with Metformin. Hypertension diagnosed 5 years ago, currently stable. No recent surgeries.',
    ayurvedicAssessment: {
      aharaShakti: 'Low or Sluggish',
      agniDigestion: 'Visham Agni (Irregular burning sensation)',
      sleepQuality: 'Light / Disturbed due to epigastric reflux',
      bowelMovement: 'Hard / Constipated 2 days',
      stressMind: 'Anxious & Fatigued',
      prakritiDosha: 'Vata-Pitta',
      vikritiImbalance: 'Pitta-Vata aggravation with Ama accumulation'
    },
    documents: [
      {
        id: 'doc-1',
        type: 'Prescription',
        name: 'Civil Hospital Ayush OPD Slip',
        date: '24/10/2023',
        previewUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHjAdoqRGq1p2RHJPGrhi8w4eCFLpRRO3ubCFdezU-0RCUAvfszyzLy4gNIJ12nR4GLLcALwTTYL5koJcBz05lAZiKEnLk4RLEl6orsHhkHg-vZ6zNplII_w7Z54lfZSW7dc_zxu2MszziEKh1QjZabbMxVgjqHRGf4Tn3qnvnyoP5kxn6kj_DUyJgEqaeahbfQ5J2kLqcTYAveYvjoOvwwUSiHJPSAgm6ekU0BniVCVatThDPKvFQ',
        extractedMedicines: ['Amoxicillin 500mg Cap', 'Ibuprofen 400mg Tab', 'Avipattikar Churna 3g'],
        extractedDiagnosis: 'Upper respiratory & gastric irritation (Visham Agni)'
      },
      {
        id: 'doc-2',
        type: 'Lab Report',
        name: 'HbA1c & Fasting Glucose Profile',
        date: '12 Oct 2023',
        extractedDiagnosis: 'HbA1c: 7.1% (Controlled T2D), Fasting Glucose: 138 mg/dL'
      }
    ],
    timeline: [
      {
        id: 't-1',
        time: 'Today, 09:30 AM',
        title: 'Kiosk Voice Intake Completed',
        subtitle: 'AI Assistant recorded symptoms and flagged potential cardiac/chest radiation.',
        type: 'intake'
      },
      {
        id: 't-2',
        time: '12 Oct 2023',
        title: 'Blood Work Report (Civil Lab)',
        subtitle: 'Fasting Blood Sugar: 138 mg/dL, HbA1c: 7.1%.',
        type: 'lab',
        linkText: 'View Report'
      },
      {
        id: 't-3',
        time: '05 Mar 2023',
        title: 'Prescription Renewed',
        subtitle: 'Metformin 500mg - 1 tab after meals.',
        type: 'prescription'
      }
    ],
    status: 'waiting',
    waitTime: '5m'
  },
  {
    id: 'P-84730',
    tokenNumber: 'A-103',
    name: 'Sunita Devi',
    age: 42,
    gender: 'Female',
    language: 'Marathi',
    languageId: 'mr',
    phone: '+91 94562 77312',
    patientId: 'AS-2026-004291',
    abhaId: '91-8890-1234-5678',
    abhaStatus: 'Linked',
    ayushmanCard: 'PMJAY-MH-449102',
    ayushmanStatus: 'Verified',
    consentVerified: true,
    chiefComplaint: 'Persistent cough for 2 weeks, mild evening fever.',
    duration: '14 days',
    severity: 'Moderate',
    isUrgent: false,
    urgentReason: '',
    symptoms: ['Cough', 'Fever', 'Throat Irritation'],
    liveTranscript: 'गेल्या दोन आठवड्यांपासून खोकला आहे आणि संध्याकाळी हलका ताप येतो. ("I have had a cough for the last two weeks with mild evening fever.")',
    medications: ['Sitopaladi Churna 3g BD', 'Paracetamol 650mg SOS'],
    allergies: ['Sulfa drugs'],
    medicalHistory: 'Seasonal allergic bronchitis. Non-smoker. No chronic cardiac or hypertensive history.',
    ayurvedicAssessment: {
      aharaShakti: 'Variable',
      agniDigestion: 'Manda Agni (Sluggish)',
      sleepQuality: 'Disturbed coughing at night',
      bowelMovement: 'Regular once daily',
      stressMind: 'Moderate work stress',
      prakritiDosha: 'Kapha',
      vikritiImbalance: 'Kapha-Vata Prana Vaha Srotas dusti'
    },
    documents: [
      {
        id: 'doc-3',
        type: 'Lab Report',
        name: 'Complete Blood Count (CBC)',
        date: '18 Aug 2024',
        extractedDiagnosis: 'Mild leukocytosis, clear lung field'
      }
    ],
    timeline: [
      {
        id: 't-4',
        time: 'Today, 09:10 AM',
        title: 'Initial Intake Interview',
        subtitle: 'Voice intake recorded dry cough and Vata-Kapha imbalance markers.',
        type: 'intake'
      },
      {
        id: 't-5',
        time: '18 Aug 2024',
        title: 'CBC Lab Analysis',
        subtitle: 'ESR: 22 mm/hr, TLC: 9,200/cumm.',
        type: 'lab',
        linkText: 'View PDF'
      }
    ],
    status: 'waiting',
    waitTime: '25 min'
  },
  {
    id: 'P-84731',
    tokenNumber: 'A-104',
    name: 'Aarav Mukherjee',
    age: 28,
    gender: 'Male',
    language: 'Bengali',
    languageId: 'bn',
    phone: '+91 97110 44552',
    patientId: 'AS-2026-005128',
    abhaId: '91-3321-7789-9901',
    abhaStatus: 'Linked',
    ayushmanCard: '',
    ayushmanStatus: 'Not Linked',
    consentVerified: true,
    chiefComplaint: 'Right ankle sprain and swelling after badminton.',
    duration: '1 day',
    severity: 'Moderate',
    isUrgent: false,
    urgentReason: '',
    symptoms: ['Ankle Swelling', 'Joint Pain'],
    liveTranscript: 'কাল বিকেলে ব্যাডমিন্টন খেলার সময় ডান পায়ে টান লেগেছে এবং গোড়ালি ফুলে গেছে। ("Sprained right ankle while playing badminton yesterday, swelling present.")',
    medications: ['Murivenna Taila external application'],
    allergies: ['None reported'],
    medicalHistory: 'Active sportsman. No prior fractures or chronic illnesses.',
    ayurvedicAssessment: {
      aharaShakti: 'Strong and Regular',
      agniDigestion: 'Tikshna Agni',
      sleepQuality: 'Good',
      bowelMovement: 'Clear daily',
      stressMind: 'Mild pain distress',
      prakritiDosha: 'Pitta',
      vikritiImbalance: 'Abhighataja Vata Vriddhi (Traumatic localized Vata)'
    },
    documents: [],
    timeline: [
      {
        id: 't-6',
        time: 'Today, 08:45 AM',
        title: 'Kiosk Self Check-In',
        subtitle: 'Touch intake completed with photo of ankle swelling.',
        type: 'intake'
      }
    ],
    status: 'waiting',
    waitTime: '38 min'
  }
];

export const DEMO_RETURNING_PROFILE: PatientProfile = {
  patientId: 'AS-2026-001846',
  name: 'Riya Sharma',
  age: 42,
  gender: 'Female',
  phone: '+91 98765 44582',
  abhaId: '91-4523-8890-1234',
  abhaStatus: 'Linked',
  ayushmanCard: 'ABHA-PMJAY-992144',
  ayushmanStatus: 'Verified',
  consentVerified: true,
  registeredAt: '15 Jan 2024',
  pastVisits: [
    {
      id: 'v-101',
      date: '14 Nov 2024',
      chiefComplaint: 'Chronic Acidity & Sleep Disturbance',
      doctor: 'Dr. A. Sharma (MD Ayush)',
      diagnosis: 'Amlapitta with Pitta-Vata aggravation',
      prescriptions: ['Avipattikar Churna 3g with warm water BD', 'Brahmi Vati 1 tab HS', 'Kamdudha Ras 250mg'],
      facility: 'AyushSetu Community Health Centre #4'
    },
    {
      id: 'v-102',
      date: '10 Aug 2024',
      chiefComplaint: 'Seasonal Viral Fever & Malaise',
      doctor: 'Dr. V. Rao',
      diagnosis: 'Acute Viral Rhinitis (Kapha-Vata Jwara)',
      prescriptions: ['Tribhuvan Kirti Ras 1 tab TDS', 'Sitopaladi Churna 3g with Honey'],
      facility: 'District Hospital OPD #2'
    }
  ]
};
