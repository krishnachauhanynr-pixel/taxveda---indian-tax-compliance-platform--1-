import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  variant = 'auto',
  showSubtitle = false 
}) => {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`${iconSize} rounded-lg bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-500 flex items-center justify-center shadow-sm text-white font-bold shrink-0 ring-1 ring-white/20`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-none">
          <span className={`font-extrabold tracking-tight ${titleSize} ${variant === 'light' ? 'text-white' : variant === 'dark' ? 'text-slate-900' : 'text-slate-900'}`}>
            U&Me <span className="text-blue-600">Associates</span>
          </span>
          <span className="text-[10px] font-semibold text-rose-500 uppercase tracking-wider ml-0.5">
            Cloud
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-[10px] font-medium leading-tight mt-0.5 ${variant === 'light' ? 'text-slate-300' : 'text-slate-500'}`}>
            Indian Tax Compliance Suite
          </span>
        )}
      </div>
    </div>
  );
};
