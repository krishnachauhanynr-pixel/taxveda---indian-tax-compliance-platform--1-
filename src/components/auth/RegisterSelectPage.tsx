import React, { useState } from 'react';
import { 
  Briefcase, 
  Building2, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  BarChart, 
  FileCheck, 
  Zap, 
  Layers 
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { TaxDashboardGraphic } from '../common/TaxDashboardGraphic';
import { UserCategory, ClientRange, TurnoverRange } from '../../types';

interface RegisterSelectPageProps {
  onContinueToForm: (category: UserCategory, tier: ClientRange | TurnoverRange) => void;
  onNavigateToLogin: () => void;
}

export const RegisterSelectPage: React.FC<RegisterSelectPageProps> = ({
  onContinueToForm,
  onNavigateToLogin
}) => {
  const [activeTab, setActiveTab] = useState<UserCategory>('professional');
  const [selectedClientRange, setSelectedClientRange] = useState<ClientRange>('10-50');
  const [selectedTurnoverRange, setSelectedTurnoverRange] = useState<TurnoverRange>('less-than-200cr');

  const handleProceed = () => {
    const tier = activeTab === 'professional' ? selectedClientRange : selectedTurnoverRange;
    onContinueToForm(activeTab, tier);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 text-slate-900">
      
      {/* LEFT SIDE: Marketing Panel (Changes dynamically per tab) */}
      <div className="lg:w-1/2 xl:w-5/12 bg-gradient-to-br from-[#0B1B3D] via-[#0D2452] to-[#143B7D] text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 flex items-center justify-between mb-6">
          <BrandLogo size="lg" variant="light" showSubtitle />
          <div className="text-[11px] font-bold text-rose-400 bg-rose-500/15 border border-rose-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            Enterprise Cloud
          </div>
        </div>

        {/* Dynamic Marketing Content */}
        <div className="relative z-10 my-auto py-4">
          {activeTab === 'professional' ? (
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full mb-3 border border-blue-400/20">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Best GST Filing Software for Chartered Accountants</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
                All-in-One Software for Tax Professionals & CAs
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                CA client management and tax filing software. Manage multiple clients, bulk ITR preparation, and TDS returns from one connected cloud platform.
              </p>

              {/* Professional Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>CA client management:</strong> Manage multiple clients & GSTINs from a single centralized dashboard.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>All-in-one GST, ITR & TDS:</strong> Streamlined GST filing, bulk income tax return filing, and TDS returns.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Automated GST reconciliation:</strong> GST reconciliation software with ITC matching & mismatch detection.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>TDS software for CA firms:</strong> TDS challan management, 24Q/26Q returns and Form 16/16A generation.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Deadlines & notices:</strong> Online tax software with compliance deadline reminders and DIN orders.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Secure cloud tax software:</strong> Encrypted remote access for CA offices and tax practitioner teams.</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full mb-3 border border-emerald-400/20">
                <Building2 className="w-3.5 h-3.5" />
                <span>Tax Compliance Software for Corporate Finance Teams</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
                Cloud-Based Tax Compliance Software for Businesses
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Manage GST software for multiple GSTINs, automated reconciliation for purchase and sales data, and ERP synchronization in one unified platform.
              </p>

              {/* Corporate Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Multi-GSTIN dashboard:</strong> Tax compliance dashboard for multiple companies and pan-India entities.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Automated reconciliation:</strong> GST reconciliation software for purchase and sales data with ITC matching.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>GST mismatch detection:</strong> Automated vendor communication and discrepancy reporting to protect ITC.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>ERP synchronization:</strong> Direct live sync with SAP, Oracle, Tally, Zoho, and custom accounting software.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>TDS challan management:</strong> Real-time challan 281 verification, unconsumed credit allocation & return filing.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Enterprise & SME scale:</strong> Enterprise tax compliance software for large businesses and affordable GST for SMEs.</span>
                </div>
              </div>
            </div>
          )}

          {/* Tax Dashboard graphic preview */}
          <div className="hidden lg:block pt-2">
            <TaxDashboardGraphic type={activeTab} />
          </div>
        </div>

        {/* Trusted by Professionals Logo Bar */}
        <div className="relative z-10 pt-6 border-t border-white/10">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Trusted by Indian Tax Leaders & Firms
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold text-slate-300">
            <div className="py-2 px-1 bg-white/5 rounded-lg border border-white/10">
              ICAI Firms
            </div>
            <div className="py-2 px-1 bg-white/5 rounded-lg border border-white/10">
              5,000+ CAs
            </div>
            <div className="py-2 px-1 bg-white/5 rounded-lg border border-white/10">
              Mid-Corporates
            </div>
            <div className="py-2 px-1 bg-white/5 rounded-lg border border-white/10">
              Multi-GSTINs
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE: Interactive Registration Selection Card */}
      <div className="lg:w-1/2 xl:w-7/12 p-8 lg:p-14 flex flex-col justify-between bg-white overflow-y-auto">
        
        <div className="max-w-xl w-full mx-auto my-auto">
          
          {/* Top Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200 rounded-full text-rose-700 text-xs font-bold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>FREE 5-DAY TRIAL · NO CREDIT CARD</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Complete Compliance Under One Control
          </h2>
          <p className="text-sm text-slate-600 mt-1 mb-6">
            Choose your role to unlock the right workflows for you.
          </p>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl mb-6 border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('professional')}
              className={`py-3 px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'professional'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>CA / CS / Tax Professional</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('corporate')}
              className={`py-3 px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'corporate'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Corporate / SME</span>
            </button>
          </div>

          {/* TAB 1 CONTENT: CA / CS / Tax Professional */}
          {activeTab === 'professional' && (
            <div className="space-y-4">
              
              {/* Information Banner */}
              <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 flex items-center gap-3">
                <Users className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium">
                  Managing compliance for clients — CAs, CSs and tax practitioners.
                </span>
              </div>

              {/* Question */}
              <div className="pt-2">
                <label className="block text-sm font-bold text-slate-800 mb-2.5">
                  How many clients does your practice handle?
                </label>

                {/* 4 Selectable Options */}
                <div className="space-y-2.5">
                  {[
                    {
                      id: '0-10' as ClientRange,
                      title: '0–10 Clients',
                      desc: 'Solo practitioner just starting out.'
                    },
                    {
                      id: '10-50' as ClientRange,
                      title: '10–50 Clients',
                      desc: 'Small firm managing multiple clients.'
                    },
                    {
                      id: '50-200' as ClientRange,
                      title: '50–200 Clients',
                      desc: 'Growing practice with multiple compliance workflows.'
                    },
                    {
                      id: '200+' as ClientRange,
                      title: '200+ Clients',
                      desc: 'Established firm requiring bulk filing and team tools.'
                    }
                  ].map((option) => {
                    const isSelected = selectedClientRange === option.id;
                    return (
                      <div
                        key={option.id}
                        onClick={() => setSelectedClientRange(option.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-600 shadow-sm ring-1 ring-blue-600'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">{option.title}</div>
                            <div className="text-xs text-slate-500">{option.desc}</div>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-blue-600 tabular-nums">
                          {isSelected && 'Selected'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2 CONTENT: Corporate / SME */}
          {activeTab === 'corporate' && (
            <div className="space-y-4">
              
              {/* Information Banner */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900 flex items-center gap-3">
                <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">
                  Managing compliance in-house — Corporates, SMEs and business owners.
                </span>
              </div>

              {/* Question */}
              <div className="pt-2">
                <label className="block text-sm font-bold text-slate-800 mb-2.5">
                  What is your company's annual turnover?
                </label>

                {/* 3 Selectable Options */}
                <div className="space-y-2.5">
                  {[
                    {
                      id: 'less-than-200cr' as TurnoverRange,
                      title: 'Less than ₹200 Crore',
                      desc: 'Growing company with an in-house accounts team.'
                    },
                    {
                      id: '200-800cr' as TurnoverRange,
                      title: '₹200–800 Crore',
                      desc: 'Mid-to-large enterprise with multiple compliance needs.'
                    },
                    {
                      id: 'above-800cr' as TurnoverRange,
                      title: 'Above ₹800 Crore',
                      desc: 'Large enterprise with multi-entity and multi-GSTIN requirements.'
                    }
                  ].map((option) => {
                    const isSelected = selectedTurnoverRange === option.id;
                    return (
                      <div
                        key={option.id}
                        onClick={() => setSelectedTurnoverRange(option.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-600 shadow-sm ring-1 ring-blue-600'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">{option.title}</div>
                            <div className="text-xs text-slate-500">{option.desc}</div>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-blue-600 tabular-nums">
                          {isSelected && 'Selected'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* Continue Button */}
          <div className="pt-6">
            <button
              type="button"
              onClick={handleProceed}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <p className="text-center text-xs text-slate-500 mt-3">
              Takes less than 1 minute · Instant access to sandbox filing environment
            </p>
          </div>

          {/* Sign In link */}
          <div className="mt-6 pt-5 border-t border-slate-200 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
