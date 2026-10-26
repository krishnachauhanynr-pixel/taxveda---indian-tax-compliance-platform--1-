import React, { useState } from 'react';
import { 
  X, 
  Users, 
  FileCheck, 
  RefreshCw, 
  Calculator, 
  FileSpreadsheet, 
  Calendar,
  ArrowRight,
  Search,
  Building2,
  ShieldCheck,
  DownloadCloud
} from 'lucide-react';
import { DashboardTab } from './Sidebar';

interface QuickActionModalProps {
  onClose: () => void;
  onSelectAction: (tab: DashboardTab) => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({
  onClose,
  onSelectAction
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const actions = [
    {
      tab: 'reconciliation' as DashboardTab,
      title: 'GST Reconciliation & ITC Matching',
      desc: 'Automated 2B vs purchase books matching, ₹0–₹50 tolerance & Section 16(2)(aa) audit',
      keywords: 'GST reconciliation software with ITC matching, automated GST return filing and reconciliation software, GST software with mismatch detection, purchase and sales data',
      icon: RefreshCw,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      tab: 'gst' as DashboardTab,
      title: 'Best GST Filing & Return Preparation',
      desc: 'High-speed GSTR-1, 3B e-filing with Excel import/export and direct ARN generation',
      keywords: 'best GST filing software for chartered accountants, affordable GST software for small businesses, GST returns, GST billing, tax automation',
      icon: FileCheck,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      tab: 'itr' as DashboardTab,
      title: 'Bulk ITR Filing & Tax Calculator',
      desc: 'Online income tax return filing software in India for AY 2026-27 with regime optimizer',
      keywords: 'online income tax return filing software in India, bulk income tax return filing software for CAs, tax return preparation software for Indian professionals, income tax software for tax professionals',
      icon: Calculator,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      tab: 'tds' as DashboardTab,
      title: 'TDS Returns & Challan Management',
      desc: 'Form 24Q, 26Q quarterly returns, challan 281 tracking & Form 16/16A generation',
      keywords: 'TDS return filing software for CA firms, TDS challan management and return filing software, TDS filing, tax reporting',
      icon: FileSpreadsheet,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      tab: 'clients' as DashboardTab,
      title: 'CA Client Master & Multiple GSTINs',
      desc: 'Manage multiple clients, branch GSTINs, PAN validation & DSC status',
      keywords: 'CA client management and tax filing software, GST software for managing multiple GSTINs, tax compliance dashboard for multiple companies',
      icon: Users,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      tab: 'calendar' as DashboardTab,
      title: 'Compliance Deadline Reminders',
      desc: 'Statutory compliance calendar with SMS/Email notifications for 3B, TDS & advance tax',
      keywords: 'online tax software with compliance deadline reminders, tax management, compliance software',
      icon: Calendar,
      color: 'bg-rose-50 text-rose-600'
    },
    {
      tab: 'reports' as DashboardTab,
      title: 'Corporate Audit & Excel Reports',
      desc: 'Export multi-entity tax reports, annual audit summaries, and ITC mismatch registers',
      keywords: 'GST filing software with Excel import and export, tax compliance software for corporate finance teams, enterprise tax compliance software for large businesses',
      icon: DownloadCloud,
      color: 'bg-teal-50 text-teal-600'
    },
    {
      tab: 'settings' as DashboardTab,
      title: 'Secure Cloud Tax Vault & Settings',
      desc: 'DPDP compliant encrypted credentials, database accounts, and GSP gateway configuration',
      keywords: 'secure cloud tax software for CA offices, cloud-based tax compliance software for businesses',
      icon: ShieldCheck,
      color: 'bg-slate-100 text-slate-700'
    }
  ];

  const filteredActions = actions.filter(act => 
    !searchQuery ||
    act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    act.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    act.keywords.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-xl w-full p-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Compliance & Tax Software Actions</h3>
            <p className="text-xs text-slate-500">Quickly launch GST, ITR, TDS returns, or automated reconciliation</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input with keyword assistance */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords: ITC matching, bulk ITR, TDS challan, multi-GSTIN..."
            className="w-full pl-9 pr-4 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
          {filteredActions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  onSelectAction(act.tab);
                  onClose();
                }}
                className="p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all cursor-pointer group flex items-start gap-2.5"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${act.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors flex items-center justify-between gap-1">
                    <span className="truncate">{act.title}</span>
                    <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {act.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredActions.length === 0 && (
          <div className="text-center py-8 text-xs text-slate-500">
            No workflows matched "{searchQuery}". Try searching "GST", "ITR", "TDS", or "Reconciliation".
          </div>
        )}

      </div>
    </div>
  );
};
