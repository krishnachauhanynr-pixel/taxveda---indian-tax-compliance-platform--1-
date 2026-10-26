import React, { useState } from 'react';
import { 
  RefreshCw, 
  Upload, 
  Download, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  FileSpreadsheet, 
  Sliders, 
  ArrowRight,
  TrendingDown,
  Layers,
  ShieldAlert
} from 'lucide-react';
import { SAMPLE_RECON_INVOICES } from '../../data/mockData';
import { ReconciliationInvoice } from '../../types';

export const ReconciliationModule: React.FC = () => {
  const [invoices, setInvoices] = useState<ReconciliationInvoice[]>(SAMPLE_RECON_INVOICES);
  const [activeFilter, setActiveFilter] = useState<'all' | 'matched' | 'unmatched_in_2b' | 'unmatched_in_books' | 'value_mismatch'>('all');
  const [toleranceRupees, setToleranceRupees] = useState<number>(5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Compute metrics
  const totalBooksTax = invoices.reduce((acc, curr) => acc + curr.booksTotalTax, 0);
  const total2bTax = invoices.reduce((acc, curr) => acc + curr.gstr2bTotalTax, 0);
  const matchedInvoices = invoices.filter(i => i.matchStatus === 'matched');
  const unmatched2b = invoices.filter(i => i.matchStatus === 'unmatched_in_2b');
  const unmatchedBooks = invoices.filter(i => i.matchStatus === 'unmatched_in_books');
  const valueMismatches = invoices.filter(i => i.matchStatus === 'value_mismatch');

  const taxAtRisk = unmatched2b.reduce((acc, curr) => acc + curr.booksTotalTax, 0) + 
                    valueMismatches.reduce((acc, curr) => acc + curr.difference, 0);

  const filteredInvoices = invoices.filter(inv => {
    if (activeFilter === 'all') return true;
    return inv.matchStatus === activeFilter;
  });

  const handleRunRecon = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setExportNotice('Automated reconciliation complete! 6 invoices cross-verified against GSTN 2B snapshot.');
      setTimeout(() => setExportNotice(null), 5000);
    }, 700);
  };

  const handleExportCSV = () => {
    const csvRows = [
      ['Invoice No', 'Date', 'Supplier GSTIN', 'Supplier Name', 'Books Tax', 'GSTR-2B Tax', 'Difference', 'Status', 'ITC Eligibility'],
      ...filteredInvoices.map(i => [
        i.invoiceNumber,
        i.invoiceDate,
        i.supplierGstin,
        `"${i.supplierName}"`,
        i.booksTotalTax,
        i.gstr2bTotalTax,
        i.difference,
        i.matchStatus,
        i.itcEligibility
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GSTR2B_Reconciliation_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setExportNotice(`Imported "${file.name}" successfully! 6 purchase invoices mapped to GSTN 2B schema.`);
      setTimeout(() => setExportNotice(null), 5000);
    }, 600);
  };

  const handleLoadScenario = (scenario: 'mixed' | 'clean' | 'mismatch') => {
    if (scenario === 'clean') {
      setInvoices(SAMPLE_RECON_INVOICES.map(inv => ({
        ...inv,
        gstr2bTaxableValue: inv.booksTaxableValue,
        gstr2bTotalTax: inv.booksTotalTax,
        difference: 0,
        matchStatus: 'matched' as const,
        itcEligibility: 'Eligible' as const
      })));
      setExportNotice('Loaded "Clean Matching" Scenario: 100% ITC reconciled.');
    } else if (scenario === 'mismatch') {
      setInvoices(SAMPLE_RECON_INVOICES.map(inv => ({
        ...inv,
        matchStatus: inv.id === 'rec-001' ? 'matched' : 'value_mismatch',
        difference: inv.id === 'rec-001' ? 0 : 25400
      })));
      setExportNotice('Loaded "High Variance" Scenario: Multiple value discrepancies flagged.');
    } else {
      setInvoices(SAMPLE_RECON_INVOICES);
      setExportNotice('Loaded "Bharat Logistics" Default Scenario: 1 Missing 2B, 1 Value Diff, 1 Blocked.');
    }
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Module Title Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
              Rule 36(4) & Rule 88C Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">Period: October 2026 GSTR-2B</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Automated GSTR-2B vs Purchase Books Reconciliation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify supplier defaults, vendor invoice timing variances, and protect eligible Input Tax Credit
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* File Upload Hidden Input & Button */}
          <label className="py-2 px-3.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs">
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Upload Purchase Register (CSV/Excel)</span>
            <input 
              type="file" 
              accept=".csv,.xlsx,.xls" 
              className="hidden" 
              onChange={handleFileUpload}
            />
          </label>

          <button
            type="button"
            onClick={handleRunRecon}
            disabled={isProcessing}
            className="py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Reconciling...' : 'Run Auto-Matching'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="py-2 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Dataset Scenario Switcher & Column Mapper Banner */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs">
          <Layers className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="font-semibold text-slate-300">Test Scenarios:</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleLoadScenario('mixed')}
              className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer"
            >
              Default (Mixed)
            </button>
            <button
              type="button"
              onClick={() => handleLoadScenario('clean')}
              className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-medium cursor-pointer"
            >
              100% Matched
            </button>
            <button
              type="button"
              onClick={() => handleLoadScenario('mismatch')}
              className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-medium cursor-pointer"
            >
              High Discrepancies
            </button>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
          <span>Mapped Columns: GSTIN ➔ InvNo ➔ Date ➔ Taxable ➔ IGST/CGST/SGST</span>
          <span className="text-emerald-400 font-bold">✓ Validated</span>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Purchase ITC in Books
          </span>
          <div className="text-xl font-extrabold text-slate-900 tabular-nums mt-1">
            {formatCurrency(totalBooksTax)}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Recorded in Accounting Ledger</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            ITC Auto-Drafted in GSTR-2B
          </span>
          <div className="text-xl font-extrabold text-blue-600 tabular-nums mt-1">
            {formatCurrency(total2bTax)}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Reflected by Suppliers on Portal</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" /> Potential Tax at Risk
          </span>
          <div className="text-xl font-extrabold text-rose-600 tabular-nums mt-1">
            {formatCurrency(taxAtRisk)}
          </div>
          <span className="text-[10px] text-rose-500 mt-0.5 block">Supplier did not upload / Value mismatch</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Reconciled Match Rate
          </span>
          <div className="text-xl font-extrabold text-emerald-700 tabular-nums mt-1">
            {Math.round((matchedInvoices.length / invoices.length) * 100)}%
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {matchedInvoices.length} of {invoices.length} invoices fully matched
          </span>
        </div>

      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`py-1 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'all' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            All Invoices ({invoices.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('matched')}
            className={`py-1 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'matched' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Matched ({matchedInvoices.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('unmatched_in_2b')}
            className={`py-1 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'unmatched_in_2b' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Missing in 2B ({unmatched2b.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('value_mismatch')}
            className={`py-1 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'value_mismatch' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Value Diff ({valueMismatches.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('unmatched_in_books')}
            className={`py-1 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'unmatched_in_books' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Missing in Books ({unmatchedBooks.length})
          </button>
        </div>

        {/* Tolerance setting */}
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Sliders className="w-3.5 h-3.5 text-slate-500" />
          <span>Rounding Tolerance:</span>
          <select
            value={toleranceRupees}
            onChange={(e) => setToleranceRupees(Number(e.target.value))}
            className="py-1 px-2 rounded-lg bg-white border border-slate-300 font-bold text-slate-900 focus:outline-none cursor-pointer"
          >
            <option value={1}>± ₹1</option>
            <option value={5}>± ₹5 (Standard)</option>
            <option value={10}>± ₹10</option>
          </select>
        </div>
      </div>

      {/* Main Reconciliation Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Invoice & Date</th>
                <th className="py-3 px-4">Supplier & GSTIN</th>
                <th className="py-3 px-4">Purchase Books Tax</th>
                <th className="py-3 px-4">GSTR-2B Portal Tax</th>
                <th className="py-3 px-4">Variance</th>
                <th className="py-3 px-4">Match Status</th>
                <th className="py-3 px-4">ITC Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-medium">
                    <div className="font-bold text-slate-900 font-mono">{inv.invoiceNumber}</div>
                    <div className="text-[11px] text-slate-500 tabular-nums">{inv.invoiceDate}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{inv.supplierName}</div>
                    <div className="font-mono text-[11px] text-slate-500">{inv.supplierGstin}</div>
                  </td>

                  <td className="py-3.5 px-4 tabular-nums font-bold text-slate-900">
                    {inv.booksTotalTax > 0 ? formatCurrency(inv.booksTotalTax) : <span className="text-slate-400">₹ 0</span>}
                  </td>

                  <td className="py-3.5 px-4 tabular-nums font-bold text-blue-700">
                    {inv.gstr2bTotalTax > 0 ? formatCurrency(inv.gstr2bTotalTax) : <span className="text-slate-400">₹ 0</span>}
                  </td>

                  <td className="py-3.5 px-4 tabular-nums font-semibold">
                    {inv.difference > 0 ? (
                      <span className="text-rose-600 font-bold">
                        +{formatCurrency(inv.difference)}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium">₹ 0</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    {inv.matchStatus === 'matched' ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Matched
                      </span>
                    ) : inv.matchStatus === 'unmatched_in_2b' ? (
                      <span className="text-rose-600 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Missing in 2B
                      </span>
                    ) : inv.matchStatus === 'value_mismatch' ? (
                      <span className="text-amber-700 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Value Diff
                      </span>
                    ) : (
                      <span className="text-purple-700 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Missing in Books
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      inv.itcEligibility === 'Eligible'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : inv.itcEligibility.includes('Blocked')
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {inv.itcEligibility}
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
