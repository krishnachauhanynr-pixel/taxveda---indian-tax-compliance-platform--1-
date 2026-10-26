import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  CheckCircle2, 
  Printer, 
  Calendar,
  Layers
} from 'lucide-react';
import { ClientRecord, GSTReturnItem, ITRReturnItem, TDSReturnItem } from '../../types';

interface ReportsModuleProps {
  clients: ClientRecord[];
  gstReturns: GSTReturnItem[];
  itrReturns: ITRReturnItem[];
  tdsReturns: TDSReturnItem[];
}

export const ReportsModule: React.FC<ReportsModuleProps> = ({
  clients,
  gstReturns,
  itrReturns,
  tdsReturns
}) => {
  const [selectedReport, setSelectedReport] = useState<'gst_recon' | 'tds_summary' | 'client_health' | 'advance_tax'>('gst_recon');
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleDownload = (format: 'CSV' | 'PDF') => {
    let filename = '';
    let content = '';

    if (selectedReport === 'gst_recon') {
      filename = `GST_Reconciliation_Report_FY26-27.${format.toLowerCase()}`;
      content = "Client Name,GSTIN,Return Type,Taxable Value,Total Tax,ITC Claimed,ITC 2B,Status\n" + 
        gstReturns.map(r => `"${r.clientName}",${r.gstin},${r.returnType},${r.taxableValue},${r.totalTax},${r.itcClaimed},${r.itcAvailable2B},${r.status}`).join('\n');
    } else if (selectedReport === 'client_health') {
      filename = `Client_Compliance_Scorecard.${format.toLowerCase()}`;
      content = "Client Name,PAN,GSTIN,Entity,GST Status,ITR Status,TDS Status,Notices\n" +
        clients.map(c => `"${c.name}",${c.pan},${c.gstin},${c.entityType},${c.gstStatus},${c.itrStatus},${c.tdsStatus},${c.openNotices}`).join('\n');
    } else {
      filename = `Tax_Compliance_Report.${format.toLowerCase()}`;
      content = "Report Type,Generated Date,Assessment Year\n" + `${selectedReport},2026-10-26,AY 2026-27`;
    }

    const blob = new Blob([content], { type: format === 'CSV' ? 'text/csv' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    setDownloadMsg(`Successfully exported ${filename}`);
    setTimeout(() => setDownloadMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
              Audit & Management Reporting
            </span>
            <span className="text-xs text-slate-500 font-medium">Export Ready: Excel & PDF</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Compliance Intelligence & Tax Reports
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Download certified audit trails, GSTR-3B vs 2B variance statements, and quarterly TDS summaries
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleDownload('CSV')}
            className="py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV Data</span>
          </button>
          <button
            type="button"
            onClick={() => handleDownload('PDF')}
            className="py-2 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Summary</span>
          </button>
        </div>
      </div>

      {downloadMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{downloadMsg}</span>
        </div>
      )}

      {/* Report Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            id: 'gst_recon' as const,
            title: 'GSTR-3B vs 2B Audit Report',
            desc: 'Rule 88C variance, eligible vs blocked ITC breakdown across all clients.'
          },
          {
            id: 'client_health' as const,
            title: 'Client Compliance Scorecard',
            desc: 'PAN, GSTIN, active filings, and open department notices health audit.'
          },
          {
            id: 'tds_summary' as const,
            title: 'Quarterly TDS Liability Dossier',
            desc: 'Form 24Q & 26Q challans, deductees count, and TRACES token ledger.'
          },
          {
            id: 'advance_tax' as const,
            title: 'Advance Tax Computation Schedule',
            desc: 'Quarterly installment planner (15%, 45%, 75%, 100%) for AY 2027-28.'
          }
        ].map((rep) => {
          const isSelected = selectedReport === rep.id;
          return (
            <div
              key={rep.id}
              onClick={() => setSelectedReport(rep.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-600 ring-1 ring-blue-600 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <FileSpreadsheet className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isSelected ? 'Active' : 'Select'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{rep.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{rep.desc}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-semibold text-blue-600">
                Ready to Generate →
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Preview of Selected Report */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Report Data Preview · {selectedReport === 'gst_recon' ? 'GSTR-3B vs 2B Reconciled Statement' : 'Client Compliance Scorecard'}
            </h3>
            <span className="text-xs text-slate-500">Live dataset linked to current filing period</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Records: {selectedReport === 'gst_recon' ? gstReturns.length : clients.length}</span>
        </div>

        <div className="overflow-x-auto">
          {selectedReport === 'gst_recon' ? (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <th className="py-2.5 px-3">Taxpayer Entity</th>
                  <th className="py-2.5 px-3">GSTIN</th>
                  <th className="py-2.5 px-3">Period</th>
                  <th className="py-2.5 px-3">Taxable Value</th>
                  <th className="py-2.5 px-3">ITC Claimed</th>
                  <th className="py-2.5 px-3">ITC in 2B</th>
                  <th className="py-2.5 px-3 text-right">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {gstReturns.map((r) => (
                  <tr key={r.id}>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{r.clientName}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{r.gstin}</td>
                    <td className="py-2.5 px-3">{r.period}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums">₹ {r.taxableValue.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums">₹ {r.itcClaimed.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums text-blue-600">₹ {r.itcAvailable2B.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold">
                      {r.itcDifference > 0 ? (
                        <span className="text-rose-600">+₹ {r.itcDifference.toLocaleString('en-IN')}</span>
                      ) : (
                        <span className="text-emerald-700">₹ 0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <th className="py-2.5 px-3">Client Name</th>
                  <th className="py-2.5 px-3">PAN</th>
                  <th className="py-2.5 px-3">GSTIN</th>
                  <th className="py-2.5 px-3">GST Status</th>
                  <th className="py-2.5 px-3">ITR Status</th>
                  <th className="py-2.5 px-3">TDS Status</th>
                  <th className="py-2.5 px-3 text-right">Open Notices</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{c.name}</td>
                    <td className="py-2.5 px-3 font-mono">{c.pan}</td>
                    <td className="py-2.5 px-3 font-mono">{c.gstin}</td>
                    <td className="py-2.5 px-3 capitalize">{c.gstStatus}</td>
                    <td className="py-2.5 px-3 capitalize">{c.itrStatus}</td>
                    <td className="py-2.5 px-3 capitalize">{c.tdsStatus}</td>
                    <td className="py-2.5 px-3 text-right font-bold tabular-nums">
                      {c.openNotices > 0 ? <span className="text-rose-600">{c.openNotices}</span> : <span className="text-slate-400">0</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
};
