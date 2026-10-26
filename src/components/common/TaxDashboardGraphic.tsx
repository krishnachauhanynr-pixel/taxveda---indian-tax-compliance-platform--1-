import React from 'react';
import { CheckCircle2, TrendingUp, ShieldCheck, ArrowUpRight, BarChart3, AlertCircle } from 'lucide-react';

export const TaxDashboardGraphic: React.FC<{ type?: 'professional' | 'corporate' }> = ({ type = 'professional' }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Background soft ambient glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-teal-400/20 blur-2xl rounded-3xl -z-10" />

      {/* Main simulated dashboard card */}
      <div className="bg-slate-900/90 border border-slate-700/60 rounded-2xl p-5 shadow-2xl backdrop-blur-md text-slate-100">
        
        {/* Card header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2">
              {type === 'professional' ? 'CA Portal · Multi-Client Compliance' : 'Enterprise GSTN & ITR Hub'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Top mini metric cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-2.5">
            <div className="text-[10px] text-slate-400">GSTR-3B Synced</div>
            <div className="text-base font-bold text-white tabular-nums mt-0.5">₹ 2.45 Cr</div>
            <div className="text-[9px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> 100% ITC Matched
            </div>
          </div>
          
          <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-2.5">
            <div className="text-[10px] text-slate-400">ITR AY 2026-27</div>
            <div className="text-base font-bold text-blue-400 tabular-nums mt-0.5">98.4%</div>
            <div className="text-[9px] text-slate-400 mt-0.5">
              Audit Files Ready
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-2.5">
            <div className="text-[10px] text-slate-400">2B Reconciliation</div>
            <div className="text-base font-bold text-emerald-400 tabular-nums mt-0.5">0 Mismatch</div>
            <div className="text-[9px] text-slate-400 mt-0.5">
              Rule 88C Verified
            </div>
          </div>
        </div>

        {/* Visual Reconciliation Bar chart preview */}
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
              Tax Filing & ITC Flow (Monthly)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Q1-Q3 FY 2026-27</span>
          </div>

          <div className="h-20 flex items-end justify-between gap-2 pt-2 px-1 border-b border-slate-700/60 pb-1">
            {[
              { label: 'Apr', h1: '40%', h2: '35%' },
              { label: 'May', h1: '60%', h2: '55%' },
              { label: 'Jun', h1: '85%', h2: '80%' },
              { label: 'Jul', h1: '70%', h2: '70%' },
              { label: 'Aug', h1: '90%', h2: '90%' },
              { label: 'Sep', h1: '95%', h2: '95%' },
              { label: 'Oct', h1: '100%', h2: '98%' }
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-0.5 h-full">
                  <div 
                    style={{ height: col.h1 }} 
                    className="w-2.5 bg-blue-500 rounded-t-sm transition-all duration-500" 
                  />
                  <div 
                    style={{ height: col.h2 }} 
                    className="w-2.5 bg-emerald-400 rounded-t-sm transition-all duration-500" 
                  />
                </div>
                <span className="text-[9px] text-slate-400">{col.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 text-[10px] text-slate-300 mt-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-xs bg-blue-500" />
              <span>Purchase Books</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-xs bg-emerald-400" />
              <span>GSTR-2B Auto-Drafted</span>
            </div>
          </div>
        </div>

        {/* Live status row */}
        <div className="flex items-center justify-between text-xs bg-blue-950/60 border border-blue-800/50 rounded-xl px-3 py-2 text-blue-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Ready for Bulk JSON Export & GSTN Upload</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-blue-300" />
        </div>
      </div>

      {/* Floating badge 1: Client Records */}
      <div className="absolute -bottom-3 -left-3 bg-white text-slate-900 border border-slate-200 rounded-xl p-2.5 shadow-lg flex items-center gap-2.5 text-xs font-semibold">
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] text-slate-500 font-medium">Auto-ITC Sync</div>
          <div className="text-xs text-slate-900 font-bold tabular-nums">99.8% Match Rate</div>
        </div>
      </div>

      {/* Floating badge 2: Deadline alert */}
      <div className="absolute -top-3 -right-3 bg-white text-slate-900 border border-slate-200 rounded-xl p-2.5 shadow-lg flex items-center gap-2 text-xs font-semibold">
        <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] text-slate-500 font-medium">Compliance Pulse</div>
          <div className="text-xs text-slate-900 font-bold">All Due Dates Tracked</div>
        </div>
      </div>
    </div>
  );
};
