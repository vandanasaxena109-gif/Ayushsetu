import React, { useState } from 'react';
import { 
  ActiveScreen, 
  LanguageId, 
  PatientData, 
  PatientAuthData, 
  DocumentScanRecord, 
  AyurvedicAssessmentState,
  UserRole
} from './types';
import { LANGUAGES, INITIAL_PATIENTS, DEMO_NEW_PATIENT_AUTH, DEMO_RETURNING_PROFILE } from './data/mockData';

// Screens
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { PatientWelcomeScreen } from './components/PatientWelcomeScreen';
import { PatientIdentityScreen } from './components/PatientIdentityScreen';
import { PatientAbhaLinkScreen } from './components/PatientAbhaLinkScreen';
import { PatientOtpVerifyScreen } from './components/PatientOtpVerifyScreen';
import { PatientIdCardScreen } from './components/PatientIdCardScreen';
import { PatientHomeScreen } from './components/PatientHomeScreen';
import { PatientVisitModeScreen } from './components/PatientVisitModeScreen';
import { WelcomeLanguageScreen } from './components/WelcomeLanguageScreen';
import { PrivacyConsentScreen } from './components/PrivacyConsentScreen';
import { VoiceIntakeScreen } from './components/VoiceIntakeScreen';
import { DocumentScannerScreen } from './components/DocumentScannerScreen';
import { AyurvedicAssessmentScreen } from './components/AyurvedicAssessmentScreen';
import { PatientFinalReviewScreen } from './components/PatientFinalReviewScreen';
import { IntakeCompletedScreen } from './components/IntakeCompletedScreen';
import { PatientConsultationScreen } from './components/PatientConsultationScreen';
import { DoctorLoginScreen } from './components/DoctorLoginScreen';
import { DoctorDashboardScreen } from './components/DoctorDashboardScreen';
import { DoctorSummaryScreen } from './components/DoctorSummaryScreen';

// Modals
import { PatientHistoryModal } from './components/PatientHistoryModal';
import { PatientProfileDetailsModal } from './components/PatientProfileDetailsModal';
import { UrgentAlertModal } from './components/UrgentAlertModal';
import { StaffHelpModal } from './components/StaffHelpModal';
import { Navbar } from './components/Navbar';

export function App() {
  // Global Navigation & Role State
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('role-selection');
  const [userRole, setUserRole] = useState<UserRole>('patient');
  
  // Modals State
  const [showStaffModal, setShowStaffModal] = useState<boolean>(false);
  const [showUrgentModal, setShowUrgentModal] = useState<boolean>(false);
  const [urgentReason, setUrgentReason] = useState<string>('Chest pain with radiating left-arm discomfort reported.');
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  // Network Offline Mode State
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  // Language State (Defaults to Hindi, persists across session)
  const [selectedLangId, setSelectedLangId] = useState<LanguageId>('hi');
  const currentLanguage = LANGUAGES.find((l) => l.id === selectedLangId) || LANGUAGES[0];

  // Active Patient Auth / Demographic State
  const [patientAuth, setPatientAuth] = useState<PatientAuthData>({
    name: 'Riya Sharma',
    age: 42,
    gender: 'Female',
    phone: '+91 98765 44582',
    abhaId: '91-4523-8890-1234',
    ayushmanCard: 'PMJAY-MH-449102',
    isReturningPatient: false,
  });

  const [patientId, setPatientId] = useState<string>('AS-2026-001846');

  // Intake State
  const [consentChecked, setConsentChecked] = useState<boolean>(true);
  const [liveTranscript, setLiveTranscript] = useState<string>(
    'Pet me 3 din se bahut jalan aur dard ho raha hai khana khane ke baad.'
  );
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Stomach Pain']);
  const [scannedDocuments, setScannedDocuments] = useState<DocumentScanRecord[]>([]);
  const [ayurvedicAssessment, setAyurvedicAssessment] = useState<AyurvedicAssessmentState>({
    aharaShakti: 'Low/Sluggish',
    agniDigestion: 'Visham Agni (Irregular/Burning)',
    sleepQuality: 'Disturbed (Nidranasha)',
    bowelMovement: 'Irregular (Vibandha)',
    stressMind: 'Anxious / High Work Stress',
  });

  // Doctor Queue State
  const [patients, setPatients] = useState<PatientData[]>(INITIAL_PATIENTS);
  const [selectedDoctorPatient, setSelectedDoctorPatient] = useState<PatientData>(INITIAL_PATIENTS[0]);

  // Handle language switch
  const handleSelectLanguage = (langId: LanguageId) => {
    setSelectedLangId(langId);
  };

  // Handle symptom toggle
  const handleToggleSymptom = (symptomName: string) => {
    if (selectedSymptoms.includes(symptomName)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptomName));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomName]);
    }
  };

  // Handle document scan completed
  const handleScanComplete = (doc: DocumentScanRecord) => {
    setScannedDocuments((prev) => [...prev, doc]);
    setActiveScreen('ayurvedic-assessment');
  };

  // Handle Ayurvedic assessment update
  const handleUpdateAssessment = (key: keyof AyurvedicAssessmentState, value: string) => {
    setAyurvedicAssessment((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Complete patient intake & generate OPD Token Ticket
  const handleCompleteIntake = () => {
    const isChestUrgent = selectedSymptoms.some(s => s.toLowerCase().includes('chest')) || 
      liveTranscript.toLowerCase().includes('chest');
    
    const newPatient: PatientData = {
      id: `P-${Math.floor(10000 + Math.random() * 90000)}`,
      patientId: patientId,
      tokenNumber: `A-${100 + patients.length + 1}`,
      name: patientAuth.name.trim() || 'Riya Sharma',
      age: Number(patientAuth.age) || 42,
      gender: patientAuth.gender || 'Female',
      language: currentLanguage.name,
      languageId: selectedLangId,
      phone: patientAuth.phone || '+91 98765 44582',
      abhaId: patientAuth.abhaId || '91-4523-8890-1234',
      abhaStatus: patientAuth.abhaId ? 'Linked' : 'Not Linked',
      ayushmanCard: patientAuth.ayushmanCard || '',
      ayushmanStatus: patientAuth.ayushmanCard ? 'Verified' : 'Not Linked',
      consentVerified: consentChecked,
      chiefComplaint: selectedSymptoms.length > 0 ? selectedSymptoms.join(', ') : 'Gastric discomfort & indigestion',
      duration: '3 days',
      severity: isChestUrgent ? 'Severe' : 'Moderate',
      isUrgent: isChestUrgent,
      urgentReason: isChestUrgent ? 'Chest pain with radiation detected during intake session.' : '',
      symptoms: selectedSymptoms,
      liveTranscript: liveTranscript,
      medications: ['Metformin 500mg', 'Amlodipine 5mg'],
      allergies: ['Penicillin'],
      medicalHistory: `AyushSetu ID: ${patientId}. ABHA: ${patientAuth.abhaId || 'Linked'}. Ayushman: ${patientAuth.ayushmanCard || 'Verified'}.`,
      ayurvedicAssessment: ayurvedicAssessment,
      documents: scannedDocuments.length > 0 ? scannedDocuments : [
        {
          id: 'doc-auto-1',
          type: 'Prescription',
          name: 'Previous Prescription Slip',
          date: new Date().toLocaleDateString('en-GB'),
          extractedMedicines: ['Metformin 500mg', 'Pantoprazole 40mg'],
          extractedDiagnosis: 'Amlapitta & Gastric Discomfort'
        }
      ],
      timeline: [
        {
          id: 'tl-new-1',
          time: 'Just now',
          title: 'Case-Taking Intake Completed',
          subtitle: `Patient registered via ${currentLanguage.name} multilingual voice intake.`,
          type: 'intake'
        }
      ],
      status: 'waiting',
      waitTime: '4 mins'
    };

    setPatients([newPatient, ...patients.filter(p => p.id !== newPatient.id)]);
    setSelectedDoctorPatient(newPatient);
    setActiveScreen('intake-completed');
  };

  // Trigger urgent emergency modal
  const handleTriggerUrgent = (reason: string) => {
    setUrgentReason(reason);
    setShowUrgentModal(true);
  };

  // Update patient after doctor review
  const handleUpdatePatient = (updated: PatientData) => {
    setPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedDoctorPatient(updated);
  };

  // Reset entire intake session for new patient
  const handleEndPatientSession = () => {
    setPatientAuth({
      name: '',
      age: '',
      gender: '',
      phone: '',
      abhaId: '',
      ayushmanCard: '',
      isReturningPatient: false,
    });
    setPatientId(`AS-2026-${Math.floor(100000 + Math.random() * 900000).toString().slice(0, 6)}`);
    setConsentChecked(true);
    setLiveTranscript('');
    setSelectedSymptoms(['Stomach Pain']);
    setScannedDocuments([]);
    setUserRole('patient');
    setActiveScreen('role-selection');
  };

  return (
    <div className="min-h-screen bg-[#f2fbfe] text-[#141d1f] flex flex-col selection:bg-[#a9ece5] selection:text-[#00535b] pt-14 sm:pt-16">
      {/* Top Navbar with Hamburger Navigation */}
      <Navbar
        activeScreen={activeScreen}
        userRole={userRole}
        onChangeScreen={setActiveScreen}
        onSwitchRole={setUserRole}
        currentLanguage={currentLanguage}
        languages={LANGUAGES}
        onSelectLanguage={handleSelectLanguage}
        onTriggerUrgentAlert={() => handleTriggerUrgent('Chest pain with radiating left-arm discomfort reported.')}
        onOpenStaffHelp={() => setShowStaffModal(true)}
        activePatient={selectedDoctorPatient}
        isOfflineMode={isOfflineMode}
        onToggleOfflineMode={() => setIsOfflineMode(!isOfflineMode)}
        onEndSession={handleEndPatientSession}
      />

      {/* Screen Render Switcher */}
      <div className="flex-1 flex flex-col">
        {/* Screen 1: Role Selection */}
        {activeScreen === 'role-selection' && (
          <RoleSelectionScreen
            currentLanguage={currentLanguage}
            onSelectRole={(role) => {
              setUserRole(role);
              if (role === 'patient') {
                setActiveScreen('patient-welcome');
              } else {
                setActiveScreen('doctor-login');
              }
            }}
            onLanguageClick={() => setActiveScreen('patient-language')}
            onStaffHelp={() => setShowStaffModal(true)}
          />
        )}

        {/* Screen 2: Patient Welcome */}
        {activeScreen === 'patient-welcome' && (
          <PatientWelcomeScreen
            currentLanguage={currentLanguage}
            onSelectNewPatient={() => {
              setPatientAuth((prev) => ({ ...prev, isReturningPatient: false }));
              setActiveScreen('patient-identity');
            }}
            onSelectReturningPatient={() => {
              setPatientAuth({
                name: DEMO_RETURNING_PROFILE.name,
                age: DEMO_RETURNING_PROFILE.age,
                gender: DEMO_RETURNING_PROFILE.gender,
                phone: DEMO_RETURNING_PROFILE.phone,
                abhaId: DEMO_RETURNING_PROFILE.abhaId,
                ayushmanCard: DEMO_RETURNING_PROFILE.ayushmanCard,
                isReturningPatient: true,
              });
              setPatientId(DEMO_RETURNING_PROFILE.patientId);
              setActiveScreen('patient-home');
            }}
            onBackToRole={() => setActiveScreen('role-selection')}
            onStaffHelp={() => setShowStaffModal(true)}
          />
        )}

        {/* Screen 3: Patient Demographics Intake */}
        {activeScreen === 'patient-identity' && (
          <PatientIdentityScreen
            currentLanguage={currentLanguage}
            patientAuth={patientAuth}
            onUpdatePatientAuth={setPatientAuth}
            onContinue={() => setActiveScreen('patient-abha')}
            onBack={() => setActiveScreen('patient-welcome')}
          />
        )}

        {/* Screen 4: ABHA & Ayushman Link */}
        {activeScreen === 'patient-abha' && (
          <PatientAbhaLinkScreen
            currentLanguage={currentLanguage}
            patientAuth={patientAuth}
            onUpdatePatientAuth={setPatientAuth}
            onContinue={() => setActiveScreen('patient-otp')}
            onBack={() => setActiveScreen('patient-identity')}
          />
        )}

        {/* Screen 5: Mobile OTP Verification */}
        {activeScreen === 'patient-otp' && (
          <PatientOtpVerifyScreen
            currentLanguage={currentLanguage}
            patientAuth={patientAuth}
            phoneNumber={patientAuth.phone || '+91 98765 44582'}
            onVerifySuccess={() => setActiveScreen('patient-id-card')}
            onBack={() => setActiveScreen('patient-abha')}
          />
        )}

        {/* Screen 6: Generated Patient ID Card */}
        {activeScreen === 'patient-id-card' && (
          <PatientIdCardScreen
            currentLanguage={currentLanguage}
            patientAuth={patientAuth}
            patientId={patientId}
            onContinue={() => setActiveScreen('patient-home')}
          />
        )}

        {/* Screen 7: Patient Profile Home */}
        {activeScreen === 'patient-home' && (
          <PatientHomeScreen
            currentLanguage={currentLanguage}
            patientAuth={patientAuth}
            patientId={patientId}
            onStartVisit={() => setActiveScreen('patient-visit-mode')}
            onViewHistory={() => setShowHistoryModal(true)}
            onViewProfile={() => setShowProfileModal(true)}
            onStaffHelp={() => setShowStaffModal(true)}
            onLogout={handleEndPatientSession}
          />
        )}

        {/* Screen 8: Patient Visit Mode Selection */}
        {activeScreen === 'patient-visit-mode' && (
          <PatientVisitModeScreen
            currentLanguage={currentLanguage}
            onSelectMode={(mode) => {
              if (mode === 'voice') {
                setActiveScreen('privacy-consent');
              } else if (mode === 'touch') {
                setActiveScreen('privacy-consent');
              } else {
                setShowStaffModal(true);
              }
            }}
            onBack={() => setActiveScreen('patient-home')}
          />
        )}

        {/* Language Selection Screen */}
        {activeScreen === 'patient-language' && (
          <WelcomeLanguageScreen
            languages={LANGUAGES}
            selectedLanguage={selectedLangId}
            onSelectLanguage={handleSelectLanguage}
            onContinue={() => setActiveScreen('patient-welcome')}
            onStaffAssistance={() => setShowStaffModal(true)}
          />
        )}

        {/* Screen 9: Privacy & Consent */}
        {activeScreen === 'privacy-consent' && (
          <PrivacyConsentScreen
            currentLanguage={currentLanguage}
            languages={LANGUAGES}
            onSelectLanguage={handleSelectLanguage}
            consentChecked={consentChecked}
            onToggleConsent={setConsentChecked}
            onContinue={() => setActiveScreen('voice-intake')}
            onBack={() => setActiveScreen('patient-visit-mode')}
            onStaffHelp={() => setShowStaffModal(true)}
          />
        )}

        {/* Screen 10: Voice Pre-Intake */}
        {activeScreen === 'voice-intake' && (
          <VoiceIntakeScreen
            currentLanguage={currentLanguage}
            languages={LANGUAGES}
            onSelectLanguage={handleSelectLanguage}
            liveTranscript={liveTranscript}
            onUpdateTranscript={setLiveTranscript}
            selectedSymptoms={selectedSymptoms}
            onToggleSymptom={handleToggleSymptom}
            onContinue={() => setActiveScreen('document-scanner')}
            onTriggerUrgentAlert={handleTriggerUrgent}
            onNeedHelp={() => setShowStaffModal(true)}
          />
        )}

        {/* Screen 11: Document & Camera Scanner */}
        {activeScreen === 'document-scanner' && (
          <DocumentScannerScreen
            onScanComplete={handleScanComplete}
            onSkip={() => setActiveScreen('ayurvedic-assessment')}
            onClose={() => setActiveScreen('voice-intake')}
          />
        )}

        {/* Screen 12: Ayurvedic Assessment */}
        {activeScreen === 'ayurvedic-assessment' && (
          <AyurvedicAssessmentScreen
            currentLanguage={currentLanguage}
            languages={LANGUAGES}
            onSelectLanguage={handleSelectLanguage}
            assessmentState={ayurvedicAssessment}
            onUpdateAssessment={handleUpdateAssessment}
            onFinish={() => setActiveScreen('patient-final-review')}
            onBack={() => setActiveScreen('document-scanner')}
            onStaffHelp={() => setShowStaffModal(true)}
          />
        )}

        {/* Screen 13: Pre-Consultation Final Review */}
        {activeScreen === 'patient-final-review' && (
          <PatientFinalReviewScreen
            currentLanguage={currentLanguage}
            patientAuth={patientAuth}
            patientId={patientId}
            symptoms={selectedSymptoms}
            duration="3 days"
            severity="Moderate"
            transcript={liveTranscript}
            medications={['Metformin 500mg', 'Amlodipine 5mg']}
            allergies={['Penicillin']}
            ayurvedicAssessment={ayurvedicAssessment}
            documents={scannedDocuments}
            onEditSection={(section) => {
              if (section === 'identity') setActiveScreen('patient-identity');
              else if (section === 'voice') setActiveScreen('voice-intake');
              else if (section === 'documents') setActiveScreen('document-scanner');
              else if (section === 'ayurveda') setActiveScreen('ayurvedic-assessment');
            }}
            onSendToDoctor={handleCompleteIntake}
            onBack={() => setActiveScreen('ayurvedic-assessment')}
          />
        )}

        {/* Screen 14: Token Ticket & Summary */}
        {activeScreen === 'intake-completed' && (
          <IntakeCompletedScreen
            patient={selectedDoctorPatient}
            currentLanguage={currentLanguage}
            onConsultDoctor={() => setActiveScreen('patient-consultation')}
            onViewDoctorPortal={() => {
              setUserRole('doctor');
              setActiveScreen('doctor-dashboard');
            }}
            onEndSession={handleEndPatientSession}
          />
        )}

        {/* Screen 15: Consult with Doctor (Live Teleconsult / OPD Room) */}
        {activeScreen === 'patient-consultation' && (
          <PatientConsultationScreen
            currentLanguage={currentLanguage}
            patient={selectedDoctorPatient}
            onEndConsultation={() => setActiveScreen('intake-completed')}
          />
        )}

        {/* Doctor Flow: Screen 16 - Doctor Login */}
        {activeScreen === 'doctor-login' && (
          <DoctorLoginScreen
            currentLanguage={currentLanguage}
            onLoginSuccess={(docInfo) => {
              setUserRole('doctor');
              setActiveScreen('doctor-dashboard');
            }}
            onBackToRole={() => setActiveScreen('role-selection')}
          />
        )}

        {/* Doctor Flow: Screen 17 - Doctor Dashboard & Triage Queue */}
        {activeScreen === 'doctor-dashboard' && (
          <DoctorDashboardScreen
            patients={patients}
            onSelectPatient={(p) => {
              setSelectedDoctorPatient(p);
              setActiveScreen('doctor-summary');
            }}
            onNewIntake={() => {
              setUserRole('patient');
              setActiveScreen('patient-welcome');
            }}
            currentLanguage={currentLanguage}
            languages={LANGUAGES}
            onSelectLanguage={handleSelectLanguage}
          />
        )}

        {/* Doctor Flow: Screen 18 - 10-Second Patient Clinical Dossier */}
        {activeScreen === 'doctor-summary' && (
          <DoctorSummaryScreen
            patient={selectedDoctorPatient}
            onBack={() => setActiveScreen('doctor-dashboard')}
            onUpdatePatient={handleUpdatePatient}
          />
        )}
      </div>

      {/* Patient Health History Modal */}
      <PatientHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        currentLanguage={currentLanguage}
        patientName={patientAuth.name || 'Riya Sharma'}
        patientId={patientId}
      />

      {/* Patient Profile Details Modal */}
      <PatientProfileDetailsModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        currentLanguage={currentLanguage}
        patientAuth={patientAuth}
        patientId={patientId}
      />

      {/* Urgent Emergency Warning Modal */}
      {showUrgentModal && (
        <UrgentAlertModal
          reason={urgentReason}
          onCallStaff={() => {}}
          onDismiss={() => setShowUrgentModal(false)}
          onStaffConfirmed={() => setShowUrgentModal(false)}
        />
      )}

      {/* Staff Assistance Modal */}
      {showStaffModal && (
        <StaffHelpModal onClose={() => setShowStaffModal(false)} />
      )}
    </div>
  );
}

export default App;
