import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Key, 
  Building2, 
  CheckCircle2, 
  Save, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  FileCode,
  History,
  Sun,
  Moon,
  Sparkles,
  Database,
  RefreshCw
} from 'lucide-react';
import { UserSession } from '../../types';
import { authDatabase, StoredUserAccount } from '../../services/authDatabase';

interface SettingsModuleProps {
  currentUser: UserSession;
  onUpdateFirmName: (name: string) => void;
  theme?: 'light' | 'midnight-navy';
  onToggleTheme?: (newTheme: 'light' | 'midnight-navy') => void;
}

export const SettingsModule: React.FC<SettingsModuleProps> = ({
  currentUser,
  onUpdateFirmName,
  theme = 'light',
  onToggleTheme
}) => {
  const [firmName, setFirmName] = useState(currentUser.firmName || 'Mehra & Associates, Chartered Accountants');
  const [frn, setFrn] = useState('019284N');
  const [membershipNo, setMembershipNo] = useState('509182');
  const [apiEnvironment, setApiEnvironment] = useState<'sandbox' | 'production'>('sandbox');
  const [gspProvider, setGspProvider] = useState('ClearGSP / Cygnet API');
  const [gspClientId, setGspClientId] = useState('CL-GSP-2026-99182');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [udinPrefix, setUdinPrefix] = useState('26509182');
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFirmName(firmName);
    setSaveMsg('Settings and API credentials updated successfully.');
    setTimeout(() => setSaveMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
              Configuration & API Settings
            </span>
            <span className="text-xs text-slate-500 font-medium">Safe Sandbox & GSTN Credentials</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Practice Profile & Gateway Configuration
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure ICAI firm credentials, GSP API endpoints, UDIN generation defaults, and security rules
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {saveMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveMsg}</span>
        </div>
      )}

      {/* Honest Integration Notice */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Safe Compliance & Demonstration Mode</strong>
          <span>
            U&Me Associates operates currently in verified sandbox simulation. Real GSTN, E-Way Bill, and CBDT e-filing APIs are connected when production GSP credentials are authenticated with your digital signature certificate (DSC token).
          </span>
        </div>
      </div>

      {/* Theme Settings Card (Midnight Navy vs Light) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-indigo-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Compliance Viewport Theme</h3>
              <p className="text-xs text-slate-500">
                Engineered for continuous audit sessions, multi-GSTIN reconciliations, and marathon return filings.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
            Visual Comfort
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Light Theme Card */}
          <div
            onClick={() => onToggleTheme && onToggleTheme('light')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              theme === 'light'
                ? 'bg-blue-50/60 border-blue-600 ring-1 ring-blue-600 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              <Sun className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Classic Light Mode</span>
                {theme === 'light' && (
                  <span className="text-[10px] font-bold text-blue-700 bg-white px-1.5 py-0.2 rounded border border-blue-300">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Crisp enterprise white canvas with professional blue accents. Ideal for bright office environments.
              </p>
            </div>
          </div>

          {/* Midnight Navy Theme Card */}
          <div
            onClick={() => onToggleTheme && onToggleTheme('midnight-navy')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              theme === 'midnight-navy'
                ? 'bg-[#09152b] border-blue-500 ring-1 ring-blue-500 shadow-md text-slate-100'
                : 'bg-[#09152b]/90 border-slate-700 text-slate-300 hover:border-blue-400'
            }`}
          >
            <div className={`p-2 rounded-lg ${theme === 'midnight-navy' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
              <Moon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Midnight Navy</span>
                  <span className="text-[9px] font-extrabold text-blue-400 bg-blue-950 px-1.5 py-0.2 rounded border border-blue-800">
                    COMPLIANCE NIGHT
                  </span>
                </span>
                {theme === 'midnight-navy' && (
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-900/40 px-1.5 py-0.2 rounded border border-blue-600">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Deep navy tone specifically optimized for long-duration compliance work. Suppresses glare, sharpens tabular figures, and minimizes eye fatigue.
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Practice / Enterprise Profile */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Practice / Entity Registration</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Firm / Corporate Name *
            </label>
            <input
              type="text"
              required
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Firm Reg. Number (FRN)
              </label>
              <input
                type="text"
                value={frn}
                onChange={(e) => setFrn(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono uppercase rounded-xl border border-slate-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ICAI Membership No.
              </label>
              <input
                type="text"
                value={membershipNo}
                onChange={(e) => setMembershipNo(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Default UDIN Prefix (First 8 Digits)
            </label>
            <input
              type="text"
              value={udinPrefix}
              onChange={(e) => setUdinPrefix(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none tabular-nums"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Unique Document Identification Number enforced under ICAI council guidelines
            </span>
          </div>
        </div>

        {/* GSTN / GSP Gateway Configuration */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center gap-2">
            <Key className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">GSTN Suvidha Provider (GSP) Integration</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Gateway Environment Mode
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setApiEnvironment('sandbox')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  apiEnvironment === 'sandbox' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Sandbox / Test Bed
              </button>
              <button
                type="button"
                onClick={() => setApiEnvironment('production')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  apiEnvironment === 'production' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Production GSTN
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Licensed GSP Provider
            </label>
            <select
              value={gspProvider}
              onChange={(e) => setGspProvider(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
            >
              <option value="ClearGSP / Cygnet API">ClearGSP / Cygnet Tax Gateway</option>
              <option value="Karvy GSP">Karvy GST Suvidha Provider</option>
              <option value="NIC Direct e-Way Bill">NIC Direct e-Invoice / e-Way Bill API</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              GSP Client App ID
            </label>
            <input
              type="text"
              value={gspClientId}
              onChange={(e) => setGspClientId(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-800">
                Enforce SMS OTP before any return dispatch to GSTN/ITD
              </span>
            </label>
          </div>
        </div>

      </form>

      {/* Database Accounts & Password Security Vault */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Database Accounts & Password Vault</h3>
              <p className="text-xs text-slate-500">
                Persistent storage with cryptographic salting and SHA-256 password hashing.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Live & Encrypted
            </span>
            <button
              type="button"
              onClick={() => {
                authDatabase.clearDatabase();
                setSaveMsg('Database reset to factory seeds (Rohit Mehra & Rajesh Singhania).');
                setTimeout(() => setSaveMsg(null), 4000);
              }}
              className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              title="Reset database to default seed credentials"
            >
              Reset DB Seeds
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Full Name & Role</th>
                <th className="py-2.5 px-3">Registered Mobile</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Password Salt</th>
                <th className="py-2.5 px-3">SHA-256 Hash</th>
                <th className="py-2.5 px-3 text-right">Password Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {authDatabase.getAllAccounts().map((acc) => (
                <tr key={acc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-bold text-slate-900">
                    <div>{acc.fullName}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{acc.role.replace('_', ' ')} · {acc.category}</div>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-800 tabular-nums">
                    +91 {acc.mobile}
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-600">
                    {acc.email}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">
                    {acc.salt}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px]" title={acc.passwordHash}>
                    {acc.passwordHash.substring(0, 14)}...
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-500 font-sans text-[11px]">
                    {new Date(acc.passwordLastChangedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Audit Log */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900">Security & Authentication Audit Log</h3>
          </div>
          <span className="text-[11px] text-slate-400">DPDP Act Compliance</span>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { time: '2026-10-26 12:45 IST', action: 'User login from +91 98101 22910 via 2-Factor OTP', ip: '103.21.244.18 (Mumbai)' },
            { time: '2026-10-25 18:12 IST', action: 'GSTR-3B filed for Zenith MedTech Ltd (ARN Generated)', ip: '103.21.244.18 (Mumbai)' },
            { time: '2026-10-24 15:30 IST', action: 'GSTR-2B bulk reconciliation report downloaded as CSV', ip: '103.21.244.18 (Mumbai)' }
          ].map((log, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600">
              <span>{log.action}</span>
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                <span>{log.ip}</span>
                <span>·</span>
                <span>{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
