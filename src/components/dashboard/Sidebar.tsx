import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileCheck, 
  Calculator, 
  FileSpreadsheet, 
  RefreshCw, 
  Bell, 
  Calendar, 
  BarChart3, 
  ShieldAlert, 
  Settings, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  Building2,
  Briefcase
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { UserSession } from '../../types';

export type DashboardTab = 
  | 'overview' 
  | 'clients' 
  | 'gst' 
  | 'itr' 
  | 'tds' 
  | 'reconciliation' 
  | 'notices' 
  | 'calendar' 
  | 'reports' 
  | 'team' 
  | 'settings' 
  | 'help'
  | 'privacy'
  | 'terms';

interface SidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  currentUser: UserSession;
  onLogout: () => void;
  noticesCount?: number;
  gstMismatchCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  currentUser,
  onLogout,
  noticesCount = 3,
  gstMismatchCount = 1
}) => {
  const menuItems = [
    { id: 'overview' as DashboardTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'clients' as DashboardTab, label: 'Clients', icon: Users },
    { 
      id: 'gst' as DashboardTab, 
      label: 'GST Compliance', 
      icon: FileCheck,
      badge: gstMismatchCount > 0 ? `${gstMismatchCount} 2B` : undefined,
      badgeColor: 'bg-rose-500 text-white'
    },
    { id: 'itr' as DashboardTab, label: 'Income Tax Returns', icon: Calculator },
    { id: 'tds' as DashboardTab, label: 'TDS Returns', icon: FileSpreadsheet },
    { id: 'reconciliation' as DashboardTab, label: 'Reconciliation', icon: RefreshCw },
    { 
      id: 'notices' as DashboardTab, 
      label: 'Notices & Orders', 
      icon: Bell,
      badge: noticesCount > 0 ? `${noticesCount}` : undefined,
      badgeColor: 'bg-rose-600 text-white'
    },
    { id: 'calendar' as DashboardTab, label: 'Compliance Calendar', icon: Calendar },
    { id: 'reports' as DashboardTab, label: 'Reports', icon: BarChart3 },
    { id: 'team' as DashboardTab, label: 'Team Management', icon: ShieldAlert },
    { id: 'settings' as DashboardTab, label: 'Settings', icon: Settings },
    { id: 'help' as DashboardTab, label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <aside 
      className={`h-screen sticky top-0 bg-[#0B1B3D] text-slate-300 flex flex-col justify-between transition-all duration-300 z-30 shrink-0 border-r border-slate-800 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
          {!isCollapsed && <BrandLogo size="md" variant="light" />}
          {isCollapsed && (
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center mx-auto text-lg">
              U
            </div>
          )}
          
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer hidden lg:flex ${
              isCollapsed ? 'mx-auto mt-2' : ''
            }`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* User Scope Banner */}
        {!isCollapsed && (
          <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center shrink-0">
                {currentUser.category === 'professional' ? <Briefcase className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">
                  {currentUser.firmName || 'Mehra & Associates'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {currentUser.category === 'professional' ? 'CA Practice' : 'Corporate Entity'} · FY 26-27
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation items */}
        <nav className="p-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-210px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                
                {!isCollapsed && (
                  <span className="truncate whitespace-nowrap text-left flex-1">
                    {item.label}
                  </span>
                )}

                {!isCollapsed && item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 tabular-nums ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Sign out */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0 border border-white/20">
                {currentUser.fullName ? currentUser.fullName.charAt(0) : 'U'}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-white truncate">
                  {currentUser.fullName || 'CA Rohit Mehra'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {currentUser.role === 'ca_partner' ? 'Senior Partner' : 'Admin'}
                </div>
              </div>
            </div>
            
            <button
              type="button"
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex justify-center p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>

    </aside>
  );
};
