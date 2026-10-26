import React, { useState } from 'react';
import { 
  Users, 
  FileCheck, 
  Calculator, 
  FileSpreadsheet, 
  Calendar, 
  Bell, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Download, 
  Search, 
  Filter, 
  TrendingUp, 
  ChevronRight,
  ShieldCheck,
  FileText,
  RefreshCw,
  Plus
} from 'lucide-react';
import { 
  ClientRecord, 
  GSTReturnItem, 
  ITRReturnItem, 
  TDSReturnItem, 
  NoticeItem, 
  CalendarEvent 
} from '../../types';
import { DashboardTab } from '../dashboard/Sidebar';

interface OverviewModuleProps {
  clients: ClientRecord[];
  gstReturns: GSTReturnItem[];
  itrReturns: ITRReturnItem[];
  tdsReturns: TDSReturnItem[];
  notices: NoticeItem[];
  calendarEvents: CalendarEvent[];
  onNavigateTab: (tab: DashboardTab) => void;
  onOpenQuickAction: () => void;
  onSelectClient: (client: ClientRecord) => void;
}

export const OverviewModule: React.FC<OverviewModuleProps> = ({
  clients,
  gstReturns,
  itrReturns,
  tdsReturns,
  notices,
  calendarEvents,
  onNavigateTab,
  onOpenQuickAction,
  onSelectClient
}) => {
  const [clientSearch, setClientSearch] = useState('');
  const [selectedEntityFilter, setSelectedEntityFilter] = useState('all');

  // Compute stats
  const totalClients = clients.length;
  const pendingGst = gstReturns.filter(r => r.status === 'pending' || r.status === 'mismatch' || r.status === 'ready_to_file').length;
  const filedItr = itrReturns.filter(r => r.status === 'filed').length;
  const totalItr = itrReturns.length;
  const pendingTds = tdsReturns.filter(r => r.status !== 'filed').length;
  const openNoticesCount = notices.filter(n => n.status !== 'Submitted').length;
  const upcomingDeadlinesCount = calendarEvents.filter(e => e.isStatutory).length;

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(clientSearch.toLowerCase()) || 
                          c.pan.toLowerCase().includes(clientSearch.toLowerCase()) ||
                          c.gstin.toLowerCase().includes(clientSearch.toLowerCase());
    const matchesEntity = selectedEntityFilter === 'all' || c.entityType === selectedEntityFilter;
    return matchesSearch && matchesEntity;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'filed':
        return <span className="text-emerald-700 font-semibold text-xs flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Filed</span>;
      case 'ready_to_file':
        return <span className="text-blue-700 font-semibold text-xs flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Ready to File</span>;
      case 'mismatch':
        return <span className="text-rose-700 font-semibold text-xs flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> 2B Mismatch</span>;
      case 'overdue':
        return <span className="text-rose-600 font-semibold text-xs flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Overdue</span>;
      default:
        return <span className="text-amber-700 font-semibold text-xs flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> In Progress</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
              Statutory Tax Window Open · October 2026
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Corporate Tax Audit & GSTR-3B Reconciliation Active
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            October 31st Tax Audit Deadline approaching. 3 notices pending CA review and 1 client with Rule 88C variance.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab('reconciliation')}
            className="py-2 px-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Run 2B Auto-Recon</span>
          </button>
          <button
            type="button"
            onClick={onOpenQuickAction}
            className="py-2 px-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Client</span>
          </button>
        </div>
      </div>

      {/* Tax Compliance Software Capabilities Fast-Nav */}
      <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-2 overflow-x-auto text-xs shadow-2xs">
        <div className="flex items-center gap-1.5 shrink-0 px-2 py-1 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
          <span>Core Solutions:</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab('gst')}
            className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            Best GST Filing Software for CAs
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('reconciliation')}
            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            GST Reconciliation & ITC Matching
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('itr')}
            className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            Online Income Tax Return Filing (AY 2026-27)
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('tds')}
            className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            TDS Return Filing & Challans
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('clients')}
            className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            Multi-GSTIN & CA Client Management
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('calendar')}
            className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            Compliance Deadline Reminders
          </button>
        </div>
      </div>

      {/* 6 Core Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        
        {/* Card 1: Total Clients */}
        <div 
          onClick={() => onNavigateTab('clients')}
          className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Clients</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {totalClients}
          </div>
          <div className="mt-1.5 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Active Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>

        {/* Card 2: GST Returns Pending */}
        <div 
          onClick={() => onNavigateTab('gst')}
          className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">GST Pending</span>
            <FileCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 tabular-nums">
            {pendingGst}
          </div>
          <div className="mt-1.5 text-[11px] text-slate-500 flex items-center justify-between">
            <span>1 Mismatch in 2B</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-colors" />
          </div>
        </div>

        {/* Card 3: ITR Status */}
        <div 
          onClick={() => onNavigateTab('itr')}
          className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">ITR Progress</span>
            <Calculator className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {filedItr}/{totalItr}
          </div>
          <div className="mt-1.5 text-[11px] text-slate-500 flex items-center justify-between">
            <span>AY 2026-27 Filed</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>

        {/* Card 4: TDS Returns Pending */}
        <div 
          onClick={() => onNavigateTab('tds')}
          className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs hover:border-indigo-400 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">TDS Pending</span>
            <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-600 tabular-nums">
            {pendingTds}
          </div>
          <div className="mt-1.5 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Q2 Returns Due</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </div>
        </div>

        {/* Card 5: Upcoming Deadlines */}
        <div 
          onClick={() => onNavigateTab('calendar')}
          className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs hover:border-purple-400 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Statutory Dates</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {upcomingDeadlinesCount}
          </div>
          <div className="mt-1.5 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Next: 31st Oct Audit</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-colors" />
          </div>
        </div>

        {/* Card 6: Open Notices */}
        <div 
          onClick={() => onNavigateTab('notices')}
          className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs hover:border-rose-400 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Open Notices</span>
            <Bell className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-extrabold text-rose-600 tabular-nums">
            {openNoticesCount}
          </div>
          <div className="mt-1.5 text-[11px] text-rose-600 font-semibold flex items-center justify-between">
            <span>Action Required</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 transition-colors" />
          </div>
        </div>

      </div>

      {/* 2-Column Section: Filing Trend Chart & Upcoming Compliance Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Filing Status Chart & Progress */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Monthly Filing Velocity & ITC Recovery
              </h3>
              <p className="text-xs text-slate-500">
                Comparing books input tax credit vs auto-drafted GSTR-2B compliance across clients
              </p>
            </div>
            
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
                <span>Filed On-Time</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                <span>ITC Reconciled</span>
              </div>
            </div>
          </div>

          {/* Interactive Bar Chart Representation */}
          <div className="pt-6 pb-2">
            <div className="h-48 flex items-end justify-between gap-3 px-2 border-b border-slate-200 pb-2">
              {[
                { month: 'May 2026', total: '₹ 1.8 Cr', filed: '92%', itc: '88%' },
                { month: 'Jun 2026', total: '₹ 2.4 Cr', filed: '96%', itc: '94%' },
                { month: 'Jul 2026', total: '₹ 3.1 Cr', filed: '100%', itc: '98%' },
                { month: 'Aug 2026', total: '₹ 2.9 Cr', filed: '95%', itc: '92%' },
                { month: 'Sep 2026', total: '₹ 3.5 Cr', filed: '91%', itc: '89%' },
                { month: 'Oct 2026', total: '₹ 4.2 Cr', filed: '78%', itc: '74%' },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                    {bar.total}
                  </div>
                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    <div 
                      style={{ height: bar.filed }}
                      className="w-4 sm:w-6 bg-blue-600 rounded-t transition-all group-hover:bg-blue-700" 
                      title={`Filed: ${bar.filed}`}
                    />
                    <div 
                      style={{ height: bar.itc }}
                      className="w-4 sm:w-6 bg-emerald-500 rounded-t transition-all group-hover:bg-emerald-600" 
                      title={`ITC Reconciled: ${bar.itc}`}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-600">{bar.month}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 px-2">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <TrendingUp className="w-4 h-4" /> Average On-Time Filing Rate: 92.4%
              </span>
              <span className="tabular-nums">Total ITC Claimed: ₹ 17.9 Crore</span>
            </div>
          </div>

        </div>

        {/* Upcoming Compliance Deadlines widget */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Statutory Deadlines</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('calendar')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                View Full
              </button>
            </div>

            <div className="space-y-3">
              {calendarEvents.slice(0, 4).map((evt) => (
                <div key={evt.id} className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900 truncate pr-2">{evt.title}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      evt.category === 'GST' ? 'bg-blue-100 text-blue-800' :
                      evt.category === 'ITR' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {evt.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="tabular-nums font-semibold text-rose-600">Due: {evt.dueDate}</span>
                    <span className="text-[10px] text-slate-400">Statutory</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              type="button"
              onClick={() => onNavigateTab('reports')}
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Compliance Health Report</span>
            </button>
          </div>
        </div>

      </div>

      {/* Client Quick Search & Compliance Status Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Client Compliance Directory</h3>
            <p className="text-xs text-slate-500">Live multi-GSTIN status, PAN registrations, and return progress</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search Client, PAN or GSTIN..."
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 w-52 sm:w-64"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Entity Filter */}
            <select
              value={selectedEntityFilter}
              onChange={(e) => setSelectedEntityFilter(e.target.value)}
              className="py-1.5 px-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Entity Types</option>
              <option value="Private Limited">Private Limited</option>
              <option value="Public Limited">Public Limited</option>
              <option value="LLP">LLP</option>
              <option value="Partnership">Partnership</option>
              <option value="Individual">Individual</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Client & Trade Name</th>
                <th className="py-3 px-3">PAN & GSTIN</th>
                <th className="py-3 px-3">Entity Type</th>
                <th className="py-3 px-3">GST (3B/1)</th>
                <th className="py-3 px-3">ITR AY 26-27</th>
                <th className="py-3 px-3">TDS Q2</th>
                <th className="py-3 px-3">Notices</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr 
                  key={client.id} 
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => onSelectClient(client)}
                >
                  <td className="py-3 px-3 font-medium">
                    <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {client.name}
                    </div>
                    {client.tradeName && (
                      <div className="text-[11px] text-slate-400">{client.tradeName}</div>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-mono text-slate-800 font-medium">{client.pan}</div>
                    <div className="font-mono text-[11px] text-slate-400">{client.gstin}</div>
                  </td>

                  <td className="py-3 px-3 text-slate-600 font-medium">
                    {client.entityType}
                  </td>

                  <td className="py-3 px-3">
                    {getStatusBadge(client.gstStatus)}
                  </td>

                  <td className="py-3 px-3">
                    {getStatusBadge(client.itrStatus)}
                  </td>

                  <td className="py-3 px-3">
                    {getStatusBadge(client.tdsStatus)}
                  </td>

                  <td className="py-3 px-3">
                    {client.openNotices > 0 ? (
                      <span className="text-rose-600 font-bold tabular-nums bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        {client.openNotices} Notice
                      </span>
                    ) : (
                      <span className="text-slate-400">0</span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectClient(client);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
