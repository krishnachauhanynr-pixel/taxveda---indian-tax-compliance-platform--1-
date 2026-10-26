import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Download, 
  FileText, 
  Search, 
  Plus, 
  ShieldCheck, 
  Receipt,
  Printer
} from 'lucide-react';
import { TDSReturnItem } from '../../types';

interface TdsModuleProps {
  tdsReturns: TDSReturnItem[];
}

export const TdsModule: React.FC<TdsModuleProps> = ({ tdsReturns }) => {
  const [selectedQuarter, setSelectedQuarter] = useState<'all' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q2');
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  // Simulated challan list
  const sampleChallans = [
    { id: 'ch-01', bsr: '0210081', challanNo: '00918', tenderDate: '2026-10-06', section: '194C / 194J', amount: 485000, consumed: 485000, balance: 0, status: 'Matched' },
    { id: 'ch-02', bsr: '0510293', challanNo: '04412', tenderDate: '2026-10-07', section: '192 (Salaries)', amount: 1820000, consumed: 1820000, balance: 0, status: 'Matched' },
    { id: 'ch-03', bsr: '0119280', challanNo: '00129', tenderDate: '2026-10-05', section: '194I (Rent)', amount: 85000, consumed: 85000, balance: 0, status: 'Short Deduction' }
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleDownloadForm16A = (clientName: string) => {
    setDownloadMsg(`Generated digitally signed Form 16A PDF package for ${clientName}`);
    setTimeout(() => setDownloadMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
              TRACES & TDS CPC Portal
            </span>
            <span className="text-xs text-slate-500 font-medium">Quarterly Filing: Q2 FY 2026-27</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            TDS Return Workflows & Form 16/16A Desk
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Quarterly Form 24Q / 26Q preparation, ITNS 281 Challan validation, and TRACES Form 16 generation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleDownloadForm16A('All Active Clients')}
            className="py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Bulk Form 16/16A</span>
          </button>
        </div>
      </div>

      {downloadMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{downloadMsg}</span>
        </div>
      )}

      {/* Quarterly TDS Returns Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Quarterly Returns Ledger (Form 24Q / 26Q)</h3>
          <span className="text-xs text-slate-500">Q2 Filing Due Date: 31st October 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Entity & TAN</th>
                <th className="py-3 px-4">Return Form</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Deductees</th>
                <th className="py-3 px-4">Total Tax Deducted</th>
                <th className="py-3 px-4">Challan Deposited</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tdsReturns.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-medium">
                    <div className="font-bold text-slate-900">{item.clientName}</div>
                    <div className="font-mono text-[11px] text-slate-500">{item.tan}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                      {item.formType}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {item.quarter} · {item.financialYear}
                  </td>

                  <td className="py-3.5 px-4 tabular-nums font-semibold text-slate-900">
                    {item.deducteeCount} Records
                  </td>

                  <td className="py-3.5 px-4 tabular-nums font-bold text-slate-900">
                    {formatCurrency(item.totalDeductions)}
                  </td>

                  <td className="py-3.5 px-4 tabular-nums font-bold text-emerald-700">
                    {formatCurrency(item.totalChallanAmount)}
                  </td>

                  <td className="py-3.5 px-4">
                    {item.status === 'filed' ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Filed (Token Recvd)
                      </span>
                    ) : item.status === 'mismatch' ? (
                      <span className="text-rose-600 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Short Deposit
                      </span>
                    ) : (
                      <span className="text-blue-700 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Ready for FVU Validation
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDownloadForm16A(item.clientName)}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Download Form 16
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ITNS 281 Challan Ledger */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">ITNS 281 Challan Master & OLTAS Status</h3>
          </div>
          <span className="text-xs text-slate-500">BSR Verified with NSDL OLTAS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">BSR Code</th>
                <th className="py-3 px-4">Challan Serial</th>
                <th className="py-3 px-4">Tender Date</th>
                <th className="py-3 px-4">TDS Section</th>
                <th className="py-3 px-4">Challan Amount</th>
                <th className="py-3 px-4">Consumed / Available</th>
                <th className="py-3 px-4 text-right">OLTAS Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleChallans.map((ch) => (
                <tr key={ch.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {ch.bsr}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                    {ch.challanNo}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 tabular-nums">
                    {ch.tenderDate}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-blue-700">
                    {ch.section}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 tabular-nums">
                    {formatCurrency(ch.amount)}
                  </td>
                  <td className="py-3.5 px-4 tabular-nums text-slate-600">
                    {formatCurrency(ch.consumed)} / {formatCurrency(ch.balance)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`font-semibold ${
                      ch.status === 'Matched' ? 'text-emerald-700' : 'text-rose-600'
                    }`}>
                      {ch.status}
                    </span>
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
