import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Phone, 
  User, 
  Building2, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { UserCategory, ClientRange, TurnoverRange } from '../../types';
import { authDatabase } from '../../services/authDatabase';

interface RegisterFormModalProps {
  category: UserCategory;
  scaleTier: ClientRange | TurnoverRange;
  onBackToSelect: () => void;
  onSubmitSuccess: (formData: {
    fullName: string;
    firmName: string;
    mobile: string;
    email: string;
    password: string;
  }) => void;
  onNavigateToLogin: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const RegisterFormModal: React.FC<RegisterFormModalProps> = ({
  category,
  scaleTier,
  onBackToSelect,
  onSubmitSuccess,
  onNavigateToLogin,
  onOpenTerms,
  onOpenPrivacy
}) => {
  const [fullName, setFullName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Too short', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 75, label: 'Good', color: 'bg-blue-500' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const getTierLabel = () => {
    if (category === 'professional') {
      if (scaleTier === '0-10') return '0–10 Clients (Solo Practice)';
      if (scaleTier === '10-50') return '10–50 Clients (Small Firm)';
      if (scaleTier === '50-200') return '50–200 Clients (Growing Practice)';
      return '200+ Clients (Established Firm)';
    } else {
      if (scaleTier === 'less-than-200cr') return 'Turnover < ₹200 Cr';
      if (scaleTier === '200-800cr') return 'Turnover ₹200–800 Cr';
      return 'Turnover > ₹800 Cr';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid business email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters with letters, numbers or symbols');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setError('Please accept the Terms of Service and Privacy Policy to proceed');
      return;
    }

    setIsLoading(true);

    try {
      // Duplicate detection in database
      const exists = await authDatabase.checkMobileExists(cleanMobile);
      if (exists) {
        setIsLoading(false);
        setError(`Mobile number +91 ${cleanMobile} is already registered in the database. Please sign in or use forgot password.`);
        return;
      }

      setIsLoading(false);
      onSubmitSuccess({
        fullName,
        firmName,
        mobile: cleanMobile,
        email,
        password
      });
    } catch (err) {
      setIsLoading(false);
      setError('Database error during validation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      
      {/* Header bar */}
      <div className="w-full max-w-xl flex items-center justify-between mb-6">
        <BrandLogo size="md" />
        <button
          type="button"
          onClick={onBackToSelect}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer py-1.5 px-3 rounded-lg border border-slate-200 bg-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Role / Plan</span>
        </button>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-xl bg-white border border-slate-200/90 rounded-2xl shadow-sm p-6 sm:p-8">
        
        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
              Step 2 of 2 · Registration
            </span>
            <span className="text-xs font-medium text-slate-500">
              {getTierLabel()}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create Your Compliance Workspace
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Free 5-day trial. No credit card or portal credentials required.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <div className="relative rounded-xl border border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 bg-white">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. CA Rohit Mehra"
                  className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-xl"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Firm or Company Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                {category === 'professional' ? 'Firm / Practice Name *' : 'Company Name *'}
              </label>
              <div className="relative rounded-xl border border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 bg-white">
                <input
                  type="text"
                  required
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  placeholder={category === 'professional' ? 'e.g. Mehra & Associates' : 'e.g. Bharat Logistics Ltd'}
                  className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-xl"
                />
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number (+91) *
              </label>
              <div className="relative flex rounded-xl border border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 overflow-hidden bg-white">
                <span className="inline-flex items-center px-2.5 bg-slate-100 border-r border-slate-300 text-slate-700 font-semibold text-xs select-none">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="98101 22910"
                  className="w-full px-3 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none tabular-nums"
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                Will receive a 6-digit verification OTP
              </span>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Official Email Address *
              </label>
              <div className="relative rounded-xl border border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 bg-white">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rohit@mehra-associates.in"
                  className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-xl"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Password *
              </label>
              <span className="text-[11px] font-semibold text-slate-500">
                Strength: <span className="text-slate-800">{strength.label}</span>
              </span>
            </div>
            <div className="relative rounded-xl border border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 bg-white">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full pl-9 pr-10 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-xl"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Password strength bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full ${strength.color} transition-all duration-300`} 
                style={{ width: `${strength.score}%` }} 
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Confirm Password *
            </label>
            <div className="relative rounded-xl border border-slate-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 bg-white">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-xl"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Terms and Privacy Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs text-slate-600 leading-normal">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Terms and Conditions
                </button>
                {' '}and acknowledge the{' '}
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Privacy Policy
                </button>
                . Indian data residency guaranteed.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Create Account & Verify OTP</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Security footnote */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Strict privacy: Tax credentials are never asked during registration.</span>
          </div>

        </form>

        {/* Existing account link */}
        <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            Sign In here
          </button>
        </div>

      </div>

    </div>
  );
};
