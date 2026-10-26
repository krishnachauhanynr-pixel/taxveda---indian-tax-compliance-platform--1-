import React, { useState } from 'react';
import { 
  ShieldAlert, 
  UserPlus, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  X,
  Key,
  Users
} from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/mockData';
import { TeamMember } from '../../types';

export const TeamModule: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<TeamMember['role']>('Senior Associate');
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name,
      email,
      phone: phone || '+91 98000 00000',
      role,
      activeClientsCount: 0,
      status: 'Active'
    };

    setTeam([...team, newMember]);
    setShowInviteModal(false);
    setName('');
    setEmail('');
    setPhone('');
    setInviteSuccess(`Invitation dispatched to ${email} with assigned role: ${role}`);
    setTimeout(() => setInviteSuccess(null), 5000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
              Practice Governance & Access Control
            </span>
            <span className="text-xs text-slate-500 font-medium">Role-Based Access Control (RBAC)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Team Members & Audit Permissions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage partner filing authorities, associate preparation queues, and article assistant permissions
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowInviteModal(true)}
          className="py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {inviteSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{inviteSuccess}</span>
        </div>
      )}

      {/* Permissions Matrix Overview */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Key className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Active Role Hierarchy Matrix
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="font-bold text-blue-300">CA Partner</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Digital Signature, Return Filing, Notice Approvals</div>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="font-bold text-emerald-300">Senior Associate</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Computation Prep, 2B Reconciliation, ITR Review</div>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="font-bold text-amber-300">Article Assistant</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Voucher Ingestion, Challan Matching, Document Upload</div>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="font-bold text-purple-300">Tax Reviewer</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Quality Assurance, Statutory Checklists, Audit Readiness</div>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Registered Practice Team ({team.length})</h3>
          <span className="text-xs text-slate-500">2-Factor Authentication Enforced</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">Role & Authority</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Active Clients</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-medium">
                    <div className="font-bold text-slate-900">{member.name}</div>
                    <div className="text-[11px] text-slate-500">{member.email}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      member.role === 'CA Partner' ? 'bg-blue-50 text-blue-800' :
                      member.role === 'Senior Associate' ? 'bg-emerald-50 text-emerald-800' :
                      member.role === 'Article Assistant' ? 'bg-amber-50 text-amber-800' : 'bg-purple-50 text-purple-800'
                    }`}>
                      {member.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-700">
                    {member.phone}
                  </td>

                  <td className="py-3.5 px-4 font-bold tabular-nums text-slate-900">
                    {member.activeClientsCount} Clients
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {member.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Configure
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Invite Team Member</h3>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikas Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  placeholder="vikas@mehra-associates.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile (+91)</label>
                <input
                  type="tel"
                  placeholder="+91 98110 22334"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Role *</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                >
                  <option value="Senior Associate">Senior Associate</option>
                  <option value="CA Partner">CA Partner (Filing & Signature Authority)</option>
                  <option value="Article Assistant">Article Assistant</option>
                  <option value="Tax Reviewer">Tax Reviewer</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
