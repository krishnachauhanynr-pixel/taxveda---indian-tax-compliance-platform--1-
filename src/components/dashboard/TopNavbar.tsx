import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Plus, 
  Menu, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown,
  Building,
  CalendarDays,
  Sun,
  Moon
} from 'lucide-react';
import { DashboardTab } from './Sidebar';
import { UserSession } from '../../types';

interface TopNavbarProps {
  activeTab: DashboardTab;
  currentUser: UserSession;
  onOpenMobileMenu: () => void;
  onQuickAction: () => void;
  noticesCount?: number;
  onSelectTab: (tab: DashboardTab) => void;
  onToggleUserRole?: () => void;
  theme?: 'light' | 'midnight-navy';
  onToggleTheme?: (newTheme: 'light' | 'midnight-navy') => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  currentUser,
  onOpenMobileMenu,
  onQuickAction,
  noticesCount = 3,
  onSelectTab,
  onToggleUserRole,
  theme = 'light',
  onToggleTheme
}) => {
  const [selectedFY, setSelectedFY] = useState('FY 2026-27');
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Compliance Overview';
      case 'clients': return 'Client Directory & Registrations';
      case 'gst': return 'GST Compliance (GSTR-1, 3B, 9)';
      case 'itr': return 'Income Tax Returns (AY 2026-27)';
      case 'tds': return 'TDS Returns & Form 16 Management';
      case 'reconciliation': return 'GSTR-2B vs Books Reconciliation';
      case 'notices': return 'Notices & Department Communications';
      case 'calendar': return 'Statutory Compliance Calendar';
      case 'reports': return 'Compliance & Audit Reports';
      case 'team': return 'Team Management & RBAC';
      case 'settings': return 'Firm Settings & API Configuration';
      case 'help': return 'Knowledge Base & Support';
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms and Conditions';
      default: return 'U&Me Associates Compliance';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      
      {/* Zone 1: Mobile hamburger + Breadcrumbs / Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
          <span className="text-slate-400 hidden sm:inline">Workspace</span>
          <span className="text-slate-400 hidden sm:inline">/</span>
          <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Zone 2: Financial Year selector & Safe Sandbox badge */}
      <div className="hidden md:flex items-center gap-3">
        
        {/* Safe Sandbox Mode Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>GSTN Sandbox Ready</span>
        </div>

        {/* Financial Year Selector */}
        <div className="relative">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
            <CalendarDays className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedFY}
              onChange={(e) => setSelectedFY(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="FY 2026-27">FY 2026-27 (AY 2027-28)</option>
              <option value="FY 2025-26">FY 2025-26 (AY 2026-27)</option>
              <option value="FY 2024-25">FY 2024-25 (AY 2025-26)</option>
            </select>
          </div>
        </div>

        {/* Role Mode Switcher */}
        {onToggleUserRole && (
          <button
            type="button"
            onClick={onToggleUserRole}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer shadow-2xs transition-colors"
            title="Switch between CA Firm Mode and Corporate In-house Mode"
          >
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span>{currentUser.category === 'professional' ? 'CA Mode' : 'Corporate Mode'}</span>
            <span className="text-[10px] text-blue-600 font-bold ml-1">Switch</span>
          </button>
        )}
      </div>

      {/* Zone 3: Quick Action + Notifications + Help */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Quick Action Button */}
        <button
          type="button"
          onClick={onQuickAction}
          className="py-1.5 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Quick Action</span>
        </button>

        {/* Notifications Icon with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer"
            title="Compliance Alerts"
          >
            <Bell className="w-4 h-4" />
            {noticesCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {showNotificationMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="font-bold text-slate-900">Urgent Compliance Alerts</span>
                <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                  {noticesCount} Pending
                </span>
              </div>
              <div className="space-y-2">
                <div 
                  onClick={() => { setShowNotificationMenu(false); onSelectTab('notices'); }}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="font-semibold text-slate-900">GST DRC-01A Notice</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Bharat Logistics: Rule 88C variance. Due in 9 days.</div>
                </div>
                <div 
                  onClick={() => { setShowNotificationMenu(false); onSelectTab('gst'); }}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="font-semibold text-slate-900">GSTR-3B Mismatch Detected</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">₹ 1,60,000 difference between Books & 2B.</div>
                </div>
              </div>
              <div className="pt-2 mt-2 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => { setShowNotificationMenu(false); onSelectTab('notices'); }}
                  className="font-bold text-blue-600 hover:text-blue-700"
                >
                  View All Notices & Deadlines
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        {onToggleTheme && (
          <button
            type="button"
            onClick={() => onToggleTheme(theme === 'light' ? 'midnight-navy' : 'light')}
            className={`p-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              theme === 'midnight-navy' 
                ? 'bg-blue-900/60 text-blue-300 hover:bg-blue-800 border border-blue-700/60' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={theme === 'midnight-navy' ? "Switch to Light Mode" : "Switch to Midnight Navy (Compliance Night Mode)"}
          >
            {theme === 'midnight-navy' ? (
              <Moon className="w-4 h-4 text-blue-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
            <span className="text-[11px] font-semibold hidden xl:inline">
              {theme === 'midnight-navy' ? 'Midnight Navy' : 'Light'}
            </span>
          </button>
        )}

        {/* Help icon */}
        <button
          type="button"
          onClick={() => onSelectTab('help')}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer hidden sm:block"
          title="Tax Helpdesk & FAQs"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

      </div>

    </header>
  );
};
