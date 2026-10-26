import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, RotateCw, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface OtpVerificationModalProps {
  mobile: string;
  onVerifySuccess: () => void;
  onBack: () => void;
}

export const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  mobile,
  onVerifySuccess,
  onBack
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  // Mask mobile
  const maskedMobile = mobile.length === 10
    ? `+91 ${mobile.slice(0, 2)}••• ••${mobile.slice(7)}`
    : `+91 ${mobile}`;

  useEffect(() => {
    let interval: any = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 6) {
      setError('Please enter the complete 6-digit verification code');
      return;
    }

    setIsVerifying(true);
    setError(null);

    setTimeout(() => {
      setIsVerifying(false);
      onVerifySuccess();
    }, 600);
  };

  const handleAutoFillDemo = () => {
    setOtp(['7', '4', '9', '2', '8', '1']);
    setError(null);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(30);
    setResendCount((c) => c + 1);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-md mb-6 flex justify-center">
        <BrandLogo size="md" />
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Phone className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Verify Your Mobile Number
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
            We sent a 6-digit OTP verification code to{' '}
            <span className="font-bold text-slate-900 tabular-nums">{maskedMobile}</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          
          {/* OTP Input Boxes */}
          <div className="flex justify-between gap-2 sm:gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-digit-${idx}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 sm:w-12 h-12 text-center text-lg font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 bg-white shadow-xs focus:outline-none tabular-nums"
              />
            ))}
          </div>

          {/* Quick Auto-fill for test / demo */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Use Demo OTP (749281)</span>
            </button>
            
            <div>
              {timer > 0 ? (
                <span className="text-slate-400 tabular-nums">Resend in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="font-bold text-slate-800 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Resend Code</span>
                </button>
              )}
            </div>
          </div>

          {/* Verify button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isVerifying ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Verify & Enter Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Back button */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Entered wrong number? Edit registration
            </button>
          </div>

        </form>

        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Secured with Telecom Authority of India (TRAI) DLT Gateway</span>
        </div>

      </div>

    </div>
  );
};
