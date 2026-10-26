import React, { useState } from 'react';
import { 
  UserSession, 
  UserCategory, 
  ClientRange, 
  TurnoverRange, 
  ClientRecord, 
  GSTReturnItem, 
  ITRReturnItem, 
  TDSReturnItem, 
  NoticeItem, 
  CalendarEvent 
} from './types';
import { 
  INITIAL_CLIENTS, 
  INITIAL_GST_RETURNS, 
  INITIAL_ITR_RETURNS, 
  INITIAL_TDS_RETURNS, 
  INITIAL_NOTICES, 
  STATUTORY_CALENDAR_EVENTS 
} from './data/mockData';
import { authDatabase } from './services/authDatabase';

// Auth Components
import { LoginPage } from './components/auth/LoginPage';
import { RegisterSelectPage } from './components/auth/RegisterSelectPage';
import { RegisterFormModal } from './components/auth/RegisterFormModal';
import { OtpVerificationModal } from './components/auth/OtpVerificationModal';
import { ForgotPasswordModal } from './components/auth/ForgotPasswordModal';

// Dashboard Components
import { Sidebar, DashboardTab } from './components/dashboard/Sidebar';
import { TopNavbar } from './components/dashboard/TopNavbar';
import { QuickActionModal } from './components/dashboard/QuickActionModal';
import { LegalModal } from './components/legal/LegalModal';
import { ComplianceSolutionsFooter } from './components/common/ComplianceSolutionsFooter';

// Modules
import { OverviewModule } from './components/modules/OverviewModule';
import { ClientsModule } from './components/modules/ClientsModule';
import { GstModule } from './components/modules/GstModule';
import { ItrModule } from './components/modules/ItrModule';
import { TdsModule } from './components/modules/TdsModule';
import { ReconciliationModule } from './components/modules/ReconciliationModule';
import { NoticesModule } from './components/modules/NoticesModule';
import { CalendarModule } from './components/modules/CalendarModule';
import { ReportsModule } from './components/modules/ReportsModule';
import { TeamModule } from './components/modules/TeamModule';
import { SettingsModule } from './components/modules/SettingsModule';
import { HelpSupportModule } from './components/modules/HelpSupportModule';

type AppView = 'login' | 'signup-select' | 'signup-form' | 'otp-verification' | 'forgot-password' | 'dashboard';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('overview');

  // Registration Pending State
  const [selectedCategory, setSelectedCategory] = useState<UserCategory>('professional');
  const [selectedScaleTier, setSelectedScaleTier] = useState<ClientRange | TurnoverRange>('10-50');
  const [pendingRegistrationMobile, setPendingRegistrationMobile] = useState('');
  const [resetNotificationMobile, setResetNotificationMobile] = useState<string | null>(null);
  const [resetNotificationMsg, setResetNotificationMsg] = useState<string | null>(null);

  // Modals
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);
  const [showQuickAction, setShowQuickAction] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme State ('light' | 'midnight-navy')
  const [theme, setTheme] = useState<'light' | 'midnight-navy'>('light');

  React.useEffect(() => {
    if (theme === 'midnight-navy') {
      document.documentElement.classList.add('midnight-navy');
    } else {
      document.documentElement.classList.remove('midnight-navy');
    }
  }, [theme]);

  // User Session State
  const [currentUser, setCurrentUser] = useState<UserSession>({
    id: 'user-001',
    fullName: 'CA Rohit Mehra',
    firmName: 'Mehra & Associates, Chartered Accountants',
    email: 'rohit@mehra-associates.in',
    mobile: '9810122910',
    category: 'professional',
    scaleTier: '10-50',
    role: 'ca_partner',
    isLoggedIn: false
  });

  // Compliance Data State
  const [clients, setClients] = useState<ClientRecord[]>(INITIAL_CLIENTS);
  const [selectedClientForProfile, setSelectedClientForProfile] = useState<ClientRecord | null>(null);
  const [gstReturns, setGstReturns] = useState<GSTReturnItem[]>(INITIAL_GST_RETURNS);
  const [itrReturns, setItrReturns] = useState<ITRReturnItem[]>(INITIAL_ITR_RETURNS);
  const [tdsReturns, setTdsReturns] = useState<TDSReturnItem[]>(INITIAL_TDS_RETURNS);
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(STATUTORY_CALENDAR_EVENTS);

  const [pendingRegistrationPassword, setPendingRegistrationPassword] = useState('');

  // Authentication Handlers
  const handleLoginSuccess = async (mobile: string, demoRole?: string) => {
    try {
      const stored = await authDatabase.getUserByMobile(mobile);
      if (stored) {
        setCurrentUser({
          id: stored.id,
          fullName: stored.fullName,
          firmName: stored.firmName,
          email: stored.email,
          mobile: stored.mobile,
          category: stored.category,
          scaleTier: stored.scaleTier,
          role: stored.role,
          isLoggedIn: true
        });
        setCurrentView('dashboard');
        setDashboardTab('overview');
        return;
      }
    } catch (e) {
      console.warn('Failed to fetch from auth database', e);
    }

    if (demoRole === 'corporate') {
      setCurrentUser({
        id: 'user-corp-01',
        fullName: 'Rajesh Singhania (Director)',
        firmName: 'Bharat Logistics & Infra Pvt Ltd',
        email: 'finance@bharatlogistics.in',
        mobile,
        category: 'corporate',
        scaleTier: '200-800cr',
        role: 'admin',
        isLoggedIn: true
      });
    } else {
      setCurrentUser({
        id: 'user-ca-01',
        fullName: 'CA Rohit Mehra, FCA',
        firmName: 'U&Me Associates, Chartered Accountants',
        email: 'rohit@mehra-associates.in',
        mobile,
        category: 'professional',
        scaleTier: '50-200',
        role: 'ca_partner',
        isLoggedIn: true
      });
    }
    setCurrentView('dashboard');
    setDashboardTab('overview');
  };

  const handleContinueToRegistrationForm = (category: UserCategory, tier: ClientRange | TurnoverRange) => {
    setSelectedCategory(category);
    setSelectedScaleTier(tier);
    setCurrentView('signup-form');
  };

  const handleRegistrationFormSubmit = (formData: {
    fullName: string;
    firmName: string;
    mobile: string;
    email: string;
    password: string;
  }) => {
    setCurrentUser({
      id: `user-${Date.now()}`,
      fullName: formData.fullName,
      firmName: formData.firmName,
      email: formData.email,
      mobile: formData.mobile,
      category: selectedCategory,
      scaleTier: selectedScaleTier,
      role: selectedCategory === 'professional' ? 'ca_partner' : 'admin',
      isLoggedIn: false
    });
    setPendingRegistrationMobile(formData.mobile);
    setPendingRegistrationPassword(formData.password);
    setCurrentView('otp-verification');
  };

  const handleOtpVerifySuccess = async () => {
    if (pendingRegistrationPassword && currentUser.mobile) {
      try {
        await authDatabase.register({
          mobile: currentUser.mobile,
          email: currentUser.email,
          fullName: currentUser.fullName,
          firmName: currentUser.firmName,
          category: currentUser.category,
          scaleTier: currentUser.scaleTier,
          password: pendingRegistrationPassword
        });
      } catch (err) {
        console.warn('Error saving to auth database', err);
      }
    }

    setCurrentUser(prev => ({ ...prev, isLoggedIn: true }));
    setCurrentView('dashboard');
    setDashboardTab('overview');
  };

  const handleLogout = () => {
    setCurrentUser(prev => ({ ...prev, isLoggedIn: false }));
    setCurrentView('login');
  };

  // Data mutation handlers
  const handleAddClient = (newClient: ClientRecord) => {
    setClients(prev => [newClient, ...prev]);
  };

  const handleFileGstReturn = (id: string, arn: string) => {
    setGstReturns(prev => prev.map(ret => {
      if (ret.id === id) {
        return {
          ...ret,
          status: 'filed',
          arn,
          filedOn: new Date().toISOString().split('T')[0]
        };
      }
      return ret;
    }));
  };

  const handleUpdateNoticeStatus = (id: string, newStatus: NoticeItem['status']) => {
    setNotices(prev => prev.map(not => {
      if (not.id === id) {
        return { ...not, status: newStatus };
      }
      return not;
    }));
  };

  const handleAddCalendarEvent = (newEvent: CalendarEvent) => {
    setCalendarEvents(prev => [newEvent, ...prev]);
  };

  const handleToggleCalendarTask = (id: string) => {
    setCalendarEvents(prev => prev.map(e => {
      if (e.id === id) {
        return { ...e, completed: !e.completed };
      }
      return e;
    }));
  };

  const handleToggleUserRole = () => {
    if (currentUser.category === 'professional') {
      setCurrentUser({
        id: 'user-corp-01',
        fullName: 'Rajesh Singhania (Director)',
        firmName: 'Bharat Logistics & Infra Pvt Ltd',
        email: 'finance@bharatlogistics.in',
        mobile: '9820144521',
        category: 'corporate',
        scaleTier: '200-800cr',
        role: 'admin',
        isLoggedIn: true
      });
    } else {
      setCurrentUser({
        id: 'user-ca-01',
        fullName: 'CA Rohit Mehra, FCA',
        firmName: 'Mehra & Associates, Chartered Accountants',
        email: 'rohit@mehra-associates.in',
        mobile: '9810122910',
        category: 'professional',
        scaleTier: '50-200',
        role: 'ca_partner',
        isLoggedIn: true
      });
    }
  };

  const handleSelectClient = (client: ClientRecord) => {
    setSelectedClientForProfile(client);
    setDashboardTab('clients');
  };

  // 1. LOGIN VIEW
  if (currentView === 'login') {
    return (
      <>
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignup={() => {
            setResetNotificationMsg(null);
            setCurrentView('signup-select');
          }}
          onNavigateToForgotPassword={() => {
            setResetNotificationMsg(null);
            setCurrentView('forgot-password');
          }}
          initialMobile={resetNotificationMobile || ''}
          resetSuccessMessage={resetNotificationMsg}
        />
        {legalModalType && (
          <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
        )}
      </>
    );
  }

  // 2. SIGNUP SELECT USER TYPE VIEW
  if (currentView === 'signup-select') {
    return (
      <>
        <RegisterSelectPage
          onContinueToForm={handleContinueToRegistrationForm}
          onNavigateToLogin={() => setCurrentView('login')}
        />
        {legalModalType && (
          <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
        )}
      </>
    );
  }

  // 3. SIGNUP DETAILED REGISTRATION FORM
  if (currentView === 'signup-form') {
    return (
      <>
        <RegisterFormModal
          category={selectedCategory}
          scaleTier={selectedScaleTier}
          onBackToSelect={() => setCurrentView('signup-select')}
          onSubmitSuccess={handleRegistrationFormSubmit}
          onNavigateToLogin={() => setCurrentView('login')}
          onOpenTerms={() => setLegalModalType('terms')}
          onOpenPrivacy={() => setLegalModalType('privacy')}
        />
        {legalModalType && (
          <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
        )}
      </>
    );
  }

  // 4. OTP VERIFICATION
  if (currentView === 'otp-verification') {
    return (
      <OtpVerificationModal
        mobile={pendingRegistrationMobile || currentUser.mobile}
        onVerifySuccess={handleOtpVerifySuccess}
        onBack={() => setCurrentView('signup-form')}
      />
    );
  }

  // 5. FORGOT PASSWORD
  if (currentView === 'forgot-password') {
    return (
      <ForgotPasswordModal
        onBackToLogin={() => setCurrentView('login')}
        onResetSuccess={(resetMobile) => {
          if (resetMobile) {
            setResetNotificationMobile(resetMobile);
          }
          setResetNotificationMsg('Password updated successfully in database! You can now login with your new credentials.');
          setCurrentView('login');
        }}
      />
    );
  }

  // 6. MAIN AUTHENTICATED DASHBOARD
  const pendingNoticesCount = notices.filter(n => n.status !== 'Submitted').length;
  const gstMismatchCount = gstReturns.filter(r => r.status === 'mismatch').length;

  return (
    <div className={`min-h-screen ${theme === 'midnight-navy' ? 'midnight-navy bg-[#060e1d] text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-row transition-colors duration-200`}>
      
      {/* Collapsible Desktop Sidebar */}
      <Sidebar
        activeTab={dashboardTab}
        onSelectTab={(tab) => {
          setDashboardTab(tab);
          setMobileMenuOpen(false);
        }}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentUser={currentUser}
        onLogout={handleLogout}
        noticesCount={pendingNoticesCount}
        gstMismatchCount={gstMismatchCount}
      />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 lg:hidden flex">
          <div className="w-72 bg-[#0B1B3D] text-white h-full overflow-y-auto">
            <Sidebar
              activeTab={dashboardTab}
              onSelectTab={(tab) => {
                setDashboardTab(tab);
                setMobileMenuOpen(false);
              }}
              isCollapsed={false}
              onToggleCollapse={() => setMobileMenuOpen(false)}
              currentUser={currentUser}
              onLogout={handleLogout}
              noticesCount={pendingNoticesCount}
              gstMismatchCount={gstMismatchCount}
            />
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Navbar */}
        <TopNavbar
          activeTab={dashboardTab}
          currentUser={currentUser}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onQuickAction={() => setShowQuickAction(true)}
          noticesCount={pendingNoticesCount}
          onSelectTab={setDashboardTab}
          onToggleUserRole={handleToggleUserRole}
          theme={theme}
          onToggleTheme={(newTheme) => setTheme(newTheme)}
        />

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {dashboardTab === 'overview' && (
            <OverviewModule
              clients={clients}
              gstReturns={gstReturns}
              itrReturns={itrReturns}
              tdsReturns={tdsReturns}
              notices={notices}
              calendarEvents={calendarEvents}
              onNavigateTab={setDashboardTab}
              onOpenQuickAction={() => setShowQuickAction(true)}
              onSelectClient={handleSelectClient}
            />
          )}

          {dashboardTab === 'clients' && (
            <ClientsModule
              clients={clients}
              onAddClient={handleAddClient}
              selectedClient={selectedClientForProfile}
              onClearSelectedClient={() => setSelectedClientForProfile(null)}
            />
          )}

          {dashboardTab === 'gst' && (
            <GstModule
              gstReturns={gstReturns}
              onFileReturn={handleFileGstReturn}
              onNavigateToRecon={() => setDashboardTab('reconciliation')}
            />
          )}

          {dashboardTab === 'itr' && (
            <ItrModule itrReturns={itrReturns} />
          )}

          {dashboardTab === 'tds' && (
            <TdsModule tdsReturns={tdsReturns} />
          )}

          {dashboardTab === 'reconciliation' && (
            <ReconciliationModule />
          )}

          {dashboardTab === 'notices' && (
            <NoticesModule
              notices={notices}
              onUpdateNoticeStatus={handleUpdateNoticeStatus}
            />
          )}

          {dashboardTab === 'calendar' && (
            <CalendarModule
              events={calendarEvents}
              onAddEvent={handleAddCalendarEvent}
              onToggleComplete={handleToggleCalendarTask}
            />
          )}

          {dashboardTab === 'reports' && (
            <ReportsModule
              clients={clients}
              gstReturns={gstReturns}
              itrReturns={itrReturns}
              tdsReturns={tdsReturns}
            />
          )}

          {dashboardTab === 'team' && (
            <TeamModule />
          )}

          {dashboardTab === 'settings' && (
            <SettingsModule
              currentUser={currentUser}
              onUpdateFirmName={(name) => setCurrentUser(prev => ({ ...prev, firmName: name }))}
              theme={theme}
              onToggleTheme={(newTheme) => setTheme(newTheme)}
            />
          )}

          {dashboardTab === 'help' && (
            <HelpSupportModule />
          )}

          {dashboardTab === 'privacy' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h2 className="text-xl font-bold mb-4">Indian DPDP Act & Privacy Policy</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                U&Me Associates is committed to the protection of client financial records and personal taxpayer information. In accordance with the Digital Personal Data Protection (DPDP) Act 2023, data is stored within Tier-4 secure servers in India.
              </p>
            </div>
          )}

          {dashboardTab === 'terms' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                By using U&Me Associates, tax practitioners and corporate finance teams agree to standard professional service terms under Indian commercial law.
              </p>
            </div>
          )}
        </main>

        {/* Comprehensive Compliance & Tax Keyword Solutions Directory */}
        <ComplianceSolutionsFooter 
          onSelectKeywordAction={(_category, tab) => {
            if (tab) setDashboardTab(tab as DashboardTab);
          }} 
        />

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-3.5 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-3">
            <span>© 2026 U&Me Associates Cloud Technologies Ltd</span>
            <span>·</span>
            <span>GSTN / CBDT Sandbox Validated</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <button
              type="button"
              onClick={() => setLegalModalType('privacy')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModalType('terms')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => setDashboardTab('help')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Helpdesk 1800-103-4786
            </button>
          </div>
        </footer>

      </div>

      {/* Global Quick Action Modal */}
      {showQuickAction && (
        <QuickActionModal
          onClose={() => setShowQuickAction(false)}
          onSelectAction={(tab) => {
            setDashboardTab(tab);
            setShowQuickAction(false);
          }}
        />
      )}

      {/* Global Legal Modal */}
      {legalModalType && (
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      )}

    </div>
  );
}
