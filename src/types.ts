export type LanguageId = 
  | 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'kn' | 'ml' | 'bn' | 'gu' | 'pa' | 'or' | 'as';

export interface LanguageOption {
  id: LanguageId;
  name: string;
  nativeName: string;
  description?: string;
}

export interface DocumentScanRecord {
  id: string;
  type: 'Prescription' | 'Lab Report' | 'Discharge Summary' | 'Other';
  name: string;
  date: string;
  previewUrl?: string;
  extractedMedicines?: string[];
  extractedDiagnosis?: string;
  notes?: string;
}

export interface AyurvedicAssessmentState {
  aharaShakti: 'Strong and Regular' | 'Variable' | 'Low or Sluggish' | '';
  agniDigestion: string;
  sleepQuality: string;
  bowelMovement: string;
  stressMind: string;
  prakritiDosha?: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Tridoshic';
  vikritiImbalance?: string;
}

export interface PatientProfile {
  patientId: string; // e.g. AS-2026-001846
  name: string;
  age: number | '';
  gender: 'Male' | 'Female' | 'Transgender' | '';
  phone: string;
  abhaId: string;
  abhaStatus: 'Linked' | 'Not Linked';
  ayushmanCard: string;
  ayushmanStatus: 'Verified' | 'Not Linked';
  consentVerified: boolean;
  registeredAt: string;
  pastVisits?: Array<{
    id: string;
    date: string;
    chiefComplaint: string;
    doctor: string;
    diagnosis: string;
    prescriptions: string[];
    facility: string;
  }>;
}

export interface PatientData {
  id: string;
  tokenNumber: string;
  name: string;
  age: number;
  gender: string;
  language: string;
  languageId: LanguageId;
  phone: string;
  patientId: string; // e.g. AS-2026-001846
  abhaId: string;
  abhaStatus: 'Linked' | 'Not Linked';
  ayushmanCard?: string;
  ayushmanStatus?: 'Verified' | 'Not Linked';
  consentVerified: boolean;
  chiefComplaint: string;
  duration: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  isUrgent: boolean;
  urgentReason: string;
  symptoms: string[];
  liveTranscript: string;
  medications: string[];
  allergies: string[];
  medicalHistory: string;
  ayurvedicAssessment: AyurvedicAssessmentState;
  documents: DocumentScanRecord[];
  timeline: Array<{
    id: string;
    time: string;
    title: string;
    subtitle: string;
    type: 'intake' | 'lab' | 'prescription' | 'vitals';
    linkText?: string;
  }>;
  status: 'waiting' | 'in-review' | 'reviewed';
  waitTime: string;
  doctorNotes?: string;
  prescriptionAdded?: string[];
  consultationNotes?: string;
}

export interface PatientAuthData {
  name: string;
  age: number | '';
  gender: 'Male' | 'Female' | 'Transgender' | '';
  phone: string;
  abhaId?: string;
  ayushmanCard?: string;
  isReturningPatient?: boolean;
}

export type ActiveScreen = 
  | 'role-selection'
  // Patient Onboarding Flow
  | 'patient-welcome'
  | 'patient-identity'
  | 'patient-abha'
  | 'patient-otp'
  | 'patient-id-card'
  | 'patient-home'
  | 'patient-history'
  | 'patient-profile-details'
  | 'patient-language'
  | 'patient-visit-mode'
  // Patient Clinical Intake Flow
  | 'privacy-consent'
  | 'voice-intake'
  | 'document-scanner'
  | 'ayurvedic-assessment'
  | 'patient-final-review'
  | 'intake-completed'
  | 'patient-consultation'
  // Doctor Clinical Flow
  | 'doctor-login'
  | 'doctor-verify'
  | 'doctor-dashboard'
  | 'doctor-summary'
  | 'doctor-consultation'
  // Modals & Emergencies
  | 'urgent-alert'
  | 'staff-help-modal';

export type UserRole = 'patient' | 'doctor' | 'guest';
