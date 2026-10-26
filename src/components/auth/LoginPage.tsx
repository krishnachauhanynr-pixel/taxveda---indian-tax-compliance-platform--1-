import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  FileSpreadsheet, 
  RefreshCw, 
  Bell, 
  FileText, 
  Briefcase 
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { TaxDashboardGraphic } from '../common/TaxDashboardGraphic';
import { ComplianceSolutionsFooter } from '../common/ComplianceSolutionsFooter';
import { authDatabase } from '../../services/authDatabase';

interface LoginPageProps {
  onLoginSuccess: (userMobile: string, demoRole?: string) => void;
  onNavigateToSignup: () => void;
  onNavigateToForgotPassword: () => void;
  initialMobile?: string;
  resetSuccessMessage?: string | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToSignup,
  onNavigateToForgotPassword,
  initialMobile = '',
  resetSuccessMessage = null
}) => {
  const [mobileNumber, setMobileNumber] = useState(initialMobile);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (initialMobile) {
      setMobileNumber(initialMobile);
    }
  }, [initialMobile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);
    try {
      const result = await authDatabase.authenticate(cleanMobile, password);
      setIsLoading(false);

      if (result.success && result.user) {
        onLoginSuccess(cleanMobile, result.user.category);
      } else {
        setError(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError('Database authentication error. Please try again.');
    }
  };

  const handleDemoLogin = async (role: 'ca' | 'corporate') => {
    const demoMobile = role === 'ca' ? '9810122910' : '9820144521';
    setMobileNumber(demoMobile);
    setPassword('Password@123');
    setIsLoading(true);
    setError(null);

    try {
      const result = await authDatabase.authenticate(demoMobile, 'Password@123');
      setIsLoading(false);
      if (result.success && result.user) {
        onLoginSuccess(demoMobile, role);
      } else {
        setError(result.error || 'Demo login failed');
      }
    } catch (err) {
      setIsLoading(false);
      onLoginSuccess(demoMobile, role);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Split Screen Content */}
      <div className="flex flex-col lg:flex-row flex-1">
        
        {/* LEFT PANEL: Marketing, Features & Tax Illustration */}
        <div className="lg:w-7/12 xl:w-3/5 bg-gradient-to-br from-[#0B1B3D] via-[#0E2A5D] to-[#12397B] text-white p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden">
        
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient glow spots */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header / Brand */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <BrandLogo size="lg" variant="light" showSubtitle />
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Govt. GSTN & ITD Sandbox Ready</span>
          </div>
        </div>

        {/* Center content: Headline, Features, Illustration */}
        <div className="relative z-10 my-auto py-6">
          <div className="max-w-2xl mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200 bg-white/10 px-3 py-1 rounded-full mb-3 border border-white/15">
              <span>Best Tax Compliance Software in India</span>
              <span>·</span>
              <span className="text-amber-300">All-in-One GST, ITR & TDS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              All Your Tax Compliance.{' '}
              <span className="text-blue-300 block sm:inline">One Secure Platform.</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
              Manage GST filing, online ITR returns, and TDS compliance from one intelligent cloud platform. Built for Indian CAs, tax practitioners, and corporate finance teams.
            </p>
          </div>

          {/* Feature List (2 columns on medium screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8 max-w-2xl">
            <div className="flex items-start gap-2.5 text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>GST filing & reconciliation:</strong> Best GST filing software for chartered accountants with ITC matching.</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-slate-200">
              <FileSpreadsheet className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
              <span><strong>TDS return filing:</strong> TDS returns, challans and Form 16/16A generation for CA firms & businesses.</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-slate-200">
              <RefreshCw className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <span><strong>Automated reconciliation:</strong> GST reconciliation software with mismatch detection & purchase register sync.</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-slate-200">
              <Briefcase className="w-4 h-4 text-indigo-300 shrink-0 mt-0.5" />
              <span><strong>Corporate finance & ERP:</strong> Tax compliance software for corporate finance teams & multi-GSTIN management.</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-slate-200">
              <FileText className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
              <span><strong>Online ITR software:</strong> Bulk income tax return filing software for CAs with Excel import & export.</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-slate-200">
              <Bell className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
              <span><strong>Deadline tracking:</strong> Online tax software with compliance deadline reminders and notice management.</span>
            </div>
          </div>

          {/* Tax Software Dashboard Illustration */}
          <div className="hidden md:block">
            <TaxDashboardGraphic type="professional" />
          </div>
        </div>

        {/* Bottom Trust Statement */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-300" />
            <span className="font-medium tracking-wide">
              Simplifying Tax Compliance Across India.
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>ICAI Aligned</span>
            <span>·</span>
            <span>DPDP Act 2023 Compliant</span>
            <span>·</span>
            <span>Cloud Hosted</span>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL: Login Form */}
      <div className="lg:w-5/12 xl:w-2/5 flex flex-col justify-between p-8 lg:p-14 bg-white">
        
        {/* Mobile-only brand */}
        <div className="lg:hidden flex items-center justify-between mb-8">
          <BrandLogo size="md" />
        </div>

        <div className="max-w-md w-full mx-auto my-auto">
          
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-600 mt-1.5">
              Access your tax compliance dashboard securely.
            </p>
          </div>

          {resetSuccessMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{resetSuccessMessage}</span>
            </div>
          )}

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Mobile Number Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Mobile Number
              </label>
              <div className="relative flex rounded-xl border border-slate-300 shadow-xs focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 overflow-hidden bg-white">
                <span className="inline-flex items-center px-3.5 bg-slate-100 border-r border-slate-300 text-slate-700 font-semibold text-sm select-none">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="98101 22910"
                  required
                  className="w-full px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none tabular-nums"
                />
                <div className="pr-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Enter your registered 10-digit mobile number
              </span>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={onNavigateToForgotPassword}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative rounded-xl border border-slate-300 shadow-xs focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 bg-white">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-3.5 pr-10 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Demo Access Bar */}
            <div className="pt-4 border-t border-slate-200">
              <div className="text-center text-xs font-medium text-slate-500 mb-2">
                Quick Demo Access (Instant Explore):
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('ca')}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>CA / Tax Pro Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('corporate')}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Corporate Demo</span>
                </button>
              </div>
            </div>

            {/* Security note */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Protected by 2-Factor Authentication & SMS OTP verification for sensitive filing actions.
              </span>
            </div>

          </form>

          {/* Create Free Account Link */}
          <div className="mt-8 text-center text-sm text-slate-600">
            Don't have an account yet?{' '}
            <button
              type="button"
              onClick={onNavigateToSignup}
              className="font-bold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
            >
              Create Free Account
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <span>© 2026 U&Me Associates Cloud Technologies Ltd. Built for Indian Tax Law.</span>
        </div>

      </div>

    </div>

    {/* Compliance & Tax Keyword Solutions Directory */}
    <ComplianceSolutionsFooter />

  </div>
  );
};
