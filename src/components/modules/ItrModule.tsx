import React, { useState } from 'react';
import { 
  Calculator, 
  FileCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Download, 
  Upload, 
  FileText, 
  ArrowRight,
  TrendingDown,
  Layers,
  CheckSquare,
  Square
} from 'lucide-react';
import { ITRReturnItem } from '../../types';

interface ItrModuleProps {
  itrReturns: ITRReturnItem[];
}

export const ItrModule: React.FC<ItrModuleProps> = ({ itrReturns }) => {
  const [selectedItr, setSelectedItr] = useState<ITRReturnItem>(itrReturns[0]);
  const [regimeComparisonSalary, setRegimeComparisonSalary] = useState<number>(1800000);
  const [deduction80C, setDeduction80C] = useState<number>(150000);
  const [deduction80D, setDeduction80D] = useState<number>(25000);

  // Document checklist state
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    form16: true,
    form26as: true,
    ais_tis: true,
    capital_gains: false,
    bank_statements: true,
    tax_audit_report: true
  });

  const toggleChecklist = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Tax calculations
  // New Regime for FY 2026-27 (Standard Deduction 75,000; revised slabs)
  const calculateNewRegimeTax = (income: number) => {
    const stdDeduction = 75000;
    const taxable = Math.max(0, income - stdDeduction);
    let tax = 0;
    // Slabs: 0-3L Nil, 3-7L 5%, 7-10L 10%, 10-12L 15%, 12-15L 20%, >15L 30%
    if (taxable <= 300000) tax = 0;
    else if (taxable <= 700000) tax = (taxable - 300000) * 0.05;
    else if (taxable <= 1000000) tax = 20000 + (taxable - 700000) * 0.10;
    else if (taxable <= 1200000) tax = 50000 + (taxable - 1000000) * 0.15;
    else if (taxable <= 1500000) tax = 80000 + (taxable - 1200000) * 0.20;
    else tax = 140000 + (taxable - 1500000) * 0.30;

    // Rebate u/s 87A if taxable <= 7,00,000
    if (taxable <= 700000) tax = 0;

    const cess = tax * 0.04;
    return Math.round(tax + cess);
  };

  // Old Regime
  const calculateOldRegimeTax = (income: number, ded80C: number, ded80D: number) => {
    const stdDeduction = 50000;
    const totalDed = stdDeduction + Math.min(150000, ded80C) + Math.min(25000, ded80D);
    const taxable = Math.max(0, income - totalDed);
    let tax = 0;
    // Slabs: 0-2.5L Nil, 2.5-5L 5%, 5-10L 20%, >10L 30%
    if (taxable <= 250000) tax = 0;
    else if (taxable <= 500000) tax = (taxable - 250000) * 0.05;
    else if (taxable <= 1000000) tax = 12500 + (taxable - 500000) * 0.20;
    else tax = 112500 + (taxable - 1000000) * 0.30;

    if (taxable <= 500000) tax = 0;

    const cess = tax * 0.04;
    return Math.round(tax + cess);
  };

  const newRegimeTax = calculateNewRegimeTax(regimeComparisonSalary);
  const oldRegimeTax = calculateOldRegimeTax(regimeComparisonSalary, deduction80C, deduction80D);
  const regimeSavings = Math.abs(oldRegimeTax - newRegimeTax);
  const recommendedRegime = newRegimeTax <= oldRegimeTax ? 'New Regime (Section 115BAC)' : 'Old Regime';

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
              Central Board of Direct Taxes (CBDT)
            </span>
            <span className="text-xs text-slate-500 font-medium">Assessment Year: AY 2026-27</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Income Tax Return (ITR) Suite
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ITR-1 through ITR-6 computation, AIS / Form 26AS matching, and Old vs New regime optimization
          </p>
        </div>

        <div className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3.5 py-2 rounded-xl">
          Statutory Audit Deadline: 31st October 2026
        </div>
      </div>

      {/* 2-Column Split: Active ITR Workflow Table & Interactive Regime Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: ITR Files List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Active Return Filings (AY 2026-27)</h3>
              <span className="text-xs text-slate-500">Corporate & Individual Dossiers</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Taxpayer & PAN</th>
                    <th className="py-3 px-4">Form Type</th>
                    <th className="py-3 px-4">Gross Income</th>
                    <th className="py-3 px-4">Tax Computed</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {itrReturns.map((item) => (
                    <tr 
                      key={item.id}
                      onClick={() => setSelectedItr(item)}
                      className={`hover:bg-blue-50/50 transition-colors cursor-pointer ${
                        selectedItr?.id === item.id ? 'bg-blue-50/70' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-medium">
                        <div className="font-bold text-slate-900">{item.clientName}</div>
                        <div className="font-mono text-[11px] text-slate-500">{item.pan}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                          {item.formType}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 tabular-nums font-medium text-slate-900">
                        {formatCurrency(item.grossIncome)}
                      </td>

                      <td className="py-3.5 px-4 tabular-nums font-bold text-slate-900">
                        {formatCurrency(item.taxPayable)}
                      </td>

                      <td className="py-3.5 px-4">
                        {item.status === 'filed' ? (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Filed
                          </span>
                        ) : item.status === 'ready_to_file' ? (
                          <span className="text-blue-700 font-semibold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Ready for Upload
                          </span>
                        ) : (
                          <span className="text-amber-700 font-semibold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> In Progress
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItr(item);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Return Document Checklist & Details */}
          {selectedItr && (
            <div className="bg-white border border-blue-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {selectedItr.clientName} · Return Computation Dossier
                  </h4>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    PAN: {selectedItr.pan} · Regime: {selectedItr.regime}
                  </div>
                </div>

                {selectedItr.acknowledgmentNo && (
                  <div className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-mono">
                    Ack: {selectedItr.acknowledgmentNo}
                  </div>
                )}
              </div>

              {/* Document verification checklist */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 block">
                  Document Audit Checklist (CBDT Compliance)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { key: 'form16', label: 'Form 16 / 16A TDS' },
                    { key: 'form26as', label: '26AS Tax Ledger' },
                    { key: 'ais_tis', label: 'AIS & TIS Summary' },
                    { key: 'capital_gains', label: 'Schedule 112A / CG' },
                    { key: 'bank_statements', label: 'Bank Interest & Balances' },
                    { key: 'tax_audit_report', label: 'Form 3CA/3CD Report' },
                  ].map((doc) => (
                    <div 
                      key={doc.key}
                      onClick={() => toggleChecklist(doc.key)}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                        checklist[doc.key]
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}
                    >
                      {checklist[doc.key] ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span className="font-medium truncate">{doc.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Old vs New Regime Comparator */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
              Smart Tax Optimizer
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              Old vs New Tax Regime Comparator
            </h3>
            <p className="text-xs text-slate-500">
              FY 2026-27 (AY 2027-28) Finance Act updated slabs
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Annual Gross Income (₹)
              </label>
              <input
                type="number"
                step="50000"
                value={regimeComparisonSalary}
                onChange={(e) => setRegimeComparisonSalary(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  80C Deductions (₹)
                </label>
                <input
                  type="number"
                  step="10000"
                  max={150000}
                  value={deduction80C}
                  onChange={(e) => setDeduction80C(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-mono text-slate-900 focus:outline-none tabular-nums"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  80D Mediclaim (₹)
                </label>
                <input
                  type="number"
                  step="5000"
                  max={50000}
                  value={deduction80D}
                  onChange={(e) => setDeduction80D(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-mono text-slate-900 focus:outline-none tabular-nums"
                />
              </div>
            </div>

            {/* Comparison Results Card */}
            <div className="pt-2 space-y-2">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-blue-900">New Regime (Default)</span>
                  <span className="text-[10px] text-blue-600 font-semibold">Std Ded ₹75,000</span>
                </div>
                <div className="text-lg font-extrabold text-blue-700 tabular-nums">
                  {formatCurrency(newRegimeTax)}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800">Old Regime</span>
                  <span className="text-[10px] text-slate-500 font-semibold">With Chapter VI-A</span>
                </div>
                <div className="text-lg font-extrabold text-slate-700 tabular-nums">
                  {formatCurrency(oldRegimeTax)}
                </div>
              </div>

              {/* Recommendation */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                <div className="text-[10px] uppercase font-bold text-emerald-700">
                  Recommended Strategy
                </div>
                <div className="font-bold text-xs mt-0.5">
                  Choose {recommendedRegime}
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5 tabular-nums">
                  Client saves {formatCurrency(regimeSavings)} in net tax outflow.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
