import React, { useState } from 'react';
import { 
  FileCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Upload, 
  FileText, 
  RefreshCw, 
  Clock, 
  Check, 
  ArrowUpRight,
  Filter,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { GSTReturnItem } from '../../types';

interface GstModuleProps {
  gstReturns: GSTReturnItem[];
  onFileReturn: (id: string, arn: string) => void;
  onNavigateToRecon: () => void;
}

export const GstModule: React.FC<GstModuleProps> = ({
  gstReturns,
  onFileReturn,
  onNavigateToRecon
}) => {
  const [returnFilter, setReturnFilter] = useState<'all' | 'GSTR-1' | 'GSTR-3B' | 'GSTR-9'>('all');
  const [selectedReturn, setSelectedReturn] = useState<GSTReturnItem | null>(null);
  const [isFiling, setIsFiling] = useState(false);
  const [filingSuccessMsg, setFilingSuccessMsg] = useState<string | null>(null);

  const filteredReturns = gstReturns.filter(
    r => returnFilter === 'all' || r.returnType === returnFilter
  );

  const handleSimulateFile = (item: GSTReturnItem) => {
    setIsFiling(true);
    setFilingSuccessMsg(null);

    setTimeout(() => {
      setIsFiling(false);
      const generatedArn = `AA${item.gstin.slice(0, 2)}1026${Math.floor(1000000 + Math.random() * 9000000)}`;
      onFileReturn(item.id, generatedArn);
      setFilingSuccessMsg(`Successfully generated JSON payload & filed on GSTN! ARN: ${generatedArn}`);
      
      // Update local view
      if (selectedReturn?.id === item.id) {
        setSelectedReturn({
          ...item,
          status: 'filed',
          arn: generatedArn,
          filedOn: '2026-10-26'
        });
      }
    }, 800);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      
      {/* Module Title Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
              Goods & Services Tax Network (GSTN)
            </span>
            <span className="text-xs text-slate-500 font-medium">Return Period: October 2026</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            GST Compliance & ITC Reconciler
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage GSTR-1 outward sales, GSTR-3B tax computations, and automated 2B vs PR mismatch detection
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNavigateToRecon}
            className="py-2 px-3.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
            <span>2B vs Books Engine</span>
          </button>
        </div>
      </div>

      {filingSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{filingSuccessMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setFilingSuccessMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Return Type Segmented Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          {(['all', 'GSTR-1', 'GSTR-3B', 'GSTR-9'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setReturnFilter(tab)}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                returnFilter === tab
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'all' ? 'All Returns' : tab}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500">
          Showing <span className="font-bold text-slate-900">{filteredReturns.length}</span> compliance filings
        </div>
      </div>

      {/* Returns Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Client Entity & GSTIN</th>
                <th className="py-3 px-4">Form</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Taxable Value</th>
                <th className="py-3 px-4">Total Tax (IGST+CGST+SGST)</th>
                <th className="py-3 px-4">ITC (Books vs 2B)</th>
                <th className="py-3 px-4">Filing Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReturns.map((ret) => (
                <tr 
                  key={ret.id}
                  onClick={() => setSelectedReturn(ret)}
                  className={`hover:bg-blue-50/50 transition-colors cursor-pointer ${
                    selectedReturn?.id === ret.id ? 'bg-blue-50/70' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-medium">
                    <div className="font-bold text-slate-900">{ret.clientName}</div>
                    <div className="font-mono text-[11px] text-slate-500">{ret.gstin}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                      {ret.returnType}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    <div>{ret.period}</div>
                    <div className="text-[10px] text-slate-400 tabular-nums">Due: {ret.dueDate}</div>
                  </td>

                  <td className="py-3.5 px-4 tabular-nums font-medium text-slate-900">
                    {formatCurrency(ret.taxableValue)}
                  </td>

                  <td className="py-3.5 px-4 tabular-nums font-bold text-slate-900">
                    {formatCurrency(ret.totalTax)}
                  </td>

                  <td className="py-3.5 px-4 tabular-nums">
                    {ret.returnType === 'GSTR-3B' ? (
                      ret.itcDifference > 0 ? (
                        <div>
                          <span className="text-rose-600 font-bold">
                            Diff: +{formatCurrency(ret.itcDifference)}
                          </span>
                          <div className="text-[10px] text-rose-500">Excess Books claim (Rule 88C)</div>
                        </div>
                      ) : (
                        <div className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>100% Matched</span>
                        </div>
                      )
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    {ret.status === 'filed' ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Filed
                      </span>
                    ) : ret.status === 'mismatch' ? (
                      <span className="text-rose-600 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> 2B Mismatch
                      </span>
                    ) : ret.status === 'ready_to_file' ? (
                      <span className="text-blue-700 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Ready to File
                      </span>
                    ) : (
                      <span className="text-rose-600 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Overdue
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                      {ret.status !== 'filed' ? (
                        <button
                          type="button"
                          disabled={isFiling}
                          onClick={() => handleSimulateFile(ret)}
                          className="px-2.5 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                        >
                          File Return
                        </button>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500">
                          ARN: {ret.arn?.slice(0, 10)}...
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Return Details Inspector Drawer */}
      {selectedReturn && (
        <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between pb-4 border-b border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                  {selectedReturn.returnType} Filing Computation
                </span>
                <span className="text-xs font-medium text-slate-500">{selectedReturn.period}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{selectedReturn.clientName}</h3>
              <p className="text-xs font-mono text-slate-500">GSTIN: {selectedReturn.gstin}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([JSON.stringify(selectedReturn, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${selectedReturn.gstin}_${selectedReturn.returnType}_${selectedReturn.period}.json`;
                  a.click();
                }}
                className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON Payload</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedReturn(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 p-1.5"
              >
                Close
              </button>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-5">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Taxable Turnover</span>
              <div className="text-base font-bold text-slate-900 tabular-nums mt-0.5">
                {formatCurrency(selectedReturn.taxableValue)}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Output Tax Liability</span>
              <div className="text-base font-bold text-slate-900 tabular-nums mt-0.5">
                {formatCurrency(selectedReturn.totalTax)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                IGST: {formatCurrency(selectedReturn.igst)} · CGST/SGST: {formatCurrency(selectedReturn.cgst * 2)}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">ITC in GSTR-2B</span>
              <div className="text-base font-bold text-emerald-600 tabular-nums mt-0.5">
                {formatCurrency(selectedReturn.itcAvailable2B)}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">ITC Claimed in Books</span>
              <div className={`text-base font-bold tabular-nums mt-0.5 ${
                selectedReturn.itcDifference > 0 ? 'text-rose-600' : 'text-slate-900'
              }`}>
                {formatCurrency(selectedReturn.itcClaimed)}
              </div>
              {selectedReturn.itcDifference > 0 && (
                <div className="text-[10px] text-rose-500 font-bold mt-0.5">
                  Mismatch: +{formatCurrency(selectedReturn.itcDifference)}
                </div>
              )}
            </div>
          </div>

          {selectedReturn.status === 'filed' && selectedReturn.arn && (
            <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  Official Application Reference Number: <strong className="font-mono">{selectedReturn.arn}</strong>
                </span>
              </div>
              <span className="text-[11px] text-emerald-700">Filed on: {selectedReturn.filedOn || '2026-10-24'}</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
