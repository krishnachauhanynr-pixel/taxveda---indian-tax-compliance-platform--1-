import React, { useState } from 'react';
import { 
  Search, 
  FileSpreadsheet, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp,
  Calculator,
  Layers,
  FileCheck,
  Briefcase
} from 'lucide-react';

interface ComplianceSolutionsFooterProps {
  onSelectKeywordAction?: (category: string, targetTab?: string) => void;
  className?: string;
  isCompact?: boolean;
}

export const ComplianceSolutionsFooter: React.FC<ComplianceSolutionsFooterProps> = ({
  onSelectKeywordAction,
  className = '',
  isCompact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const keywordCategories = [
    {
      id: 'gst',
      title: 'GST Compliance & Reconciliation',
      icon: FileSpreadsheet,
      badge: 'GSTR-1, 3B, 9 & 2B Matching',
      primaryKeywords: [
        'GST software',
        'GST filing',
        'GST returns',
        'GST reconciliation',
        'ITC matching',
        'GST billing',
        'tax automation'
      ],
      longTailSolutions: [
        {
          name: 'Best GST filing software for chartered accountants',
          desc: 'High-speed GSTR-1, 3B e-filing with auto-computed liability & sandbox direct upload.',
          tab: 'gst'
        },
        {
          name: 'GST reconciliation software with ITC matching',
          desc: 'Automated 2B vs Purchase books reconciliation with ₹0–₹50 tolerance & Section 16(2)(aa) checks.',
          tab: 'reconciliation'
        },
        {
          name: 'Automated GST return filing and reconciliation software',
          desc: 'One-click reconciliation pipeline from tally/SAP excel imports directly to portal sync.',
          tab: 'reconciliation'
        },
        {
          name: 'GST software with mismatch detection and reporting',
          desc: 'Instant detection of invoice numbering variance, tax rate mismatches, and vendor missing invoices.',
          tab: 'reconciliation'
        },
        {
          name: 'GST software for managing multiple GSTINs',
          desc: 'Multi-state entity management under single PAN with consolidated filing statuses.',
          tab: 'clients'
        },
        {
          name: 'GST filing software with Excel import and export',
          desc: 'Direct import of JSON/Excel purchase registers and export of audited ITC claim sheets.',
          tab: 'reconciliation'
        },
        {
          name: 'Affordable GST software for small businesses',
          desc: 'Streamlined invoice generation, e-Way bills, and simplified GSTR-1/3B summary reports.',
          tab: 'gst'
        },
        {
          name: 'GST return management software for accountants',
          desc: 'Multi-client practice queue with ARN tracking, filing history, and client sign-off records.',
          tab: 'gst'
        }
      ]
    },
    {
      id: 'itr',
      title: 'Income Tax (ITR) Compliance',
      icon: Calculator,
      badge: 'AY 2026-27 & Regime Optimizer',
      primaryKeywords: [
        'ITR software',
        'ITR filing',
        'income tax',
        'tax calculator',
        'e-filing software',
        'return filing'
      ],
      longTailSolutions: [
        {
          name: 'Online income tax return filing software in India',
          desc: 'Direct cloud e-filing for ITR-1, 2, 3, 4, 5, 6 with instant CBDT JSON generation.',
          tab: 'itr'
        },
        {
          name: 'Bulk income tax return filing software for CAs',
          desc: 'Batch processing and validation for individual, partnership, and corporate returns.',
          tab: 'itr'
        },
        {
          name: 'Tax return preparation software for Indian professionals',
          desc: 'Automated computation sheets, depreciation schedules, and 44AD/44ADA presumptive limits.',
          tab: 'itr'
        },
        {
          name: 'Income tax software for tax professionals',
          desc: 'Side-by-side Old vs New Tax Regime tax liability comparison with Section 87A rebate checks.',
          tab: 'itr'
        }
      ]
    },
    {
      id: 'tds',
      title: 'TDS Returns & Challans',
      icon: FileCheck,
      badge: '24Q, 26Q & Form 16',
      primaryKeywords: [
        'TDS software',
        'TDS filing',
        'tax compliance',
        'tax reporting'
      ],
      longTailSolutions: [
        {
          name: 'TDS return filing software for CA firms',
          desc: 'Quarterly e-filing for Form 24Q (salaries), 26Q (non-salary vendor payments), and 27Q.',
          tab: 'tds'
        },
        {
          name: 'TDS challan management and return filing software',
          desc: 'OLTAS challan 281 verification, BSR code validation, and unconsumed challan allocation.',
          tab: 'tds'
        }
      ]
    },
    {
      id: 'practice',
      title: 'CA Practice & Enterprise Tax Management',
      icon: Building2,
      badge: 'Multi-Entity & Cloud Security',
      primaryKeywords: [
        'CA software',
        'tax management',
        'accounting software',
        'cloud accounting',
        'compliance software',
        'tax consultancy',
        'financial software'
      ],
      longTailSolutions: [
        {
          name: 'Best tax compliance software in India',
          desc: 'Recognized centralized cloud suite managing complete direct & indirect tax cycles.',
          tab: 'overview'
        },
        {
          name: 'All-in-one GST ITR and TDS software',
          desc: 'Eliminate fragmented tools with a single unified cloud workspace for all statutory filings.',
          tab: 'overview'
        },
        {
          name: 'Cloud-based tax compliance software for businesses',
          desc: 'Real-time synchronization across branch offices, factories, and corporate headquarters.',
          tab: 'overview'
        },
        {
          name: 'Tax compliance software for corporate finance teams',
          desc: 'Enterprise role-based approvals, audit trails, ERP hooks, and multi-GSTIN oversight.',
          tab: 'clients'
        },
        {
          name: 'CA client management and tax filing software',
          desc: 'Unified client master with PAN/GSTIN validation, DSC status, and DIN order tracking.',
          tab: 'clients'
        },
        {
          name: 'Online tax software with compliance deadline reminders',
          desc: 'Automated statutory calendar with SMS/Email alerts for advance tax, 3B, and TDS cutoffs.',
          tab: 'calendar'
        },
        {
          name: 'Enterprise tax compliance software for large businesses',
          desc: 'Scalable cloud infrastructure handling 50,000+ monthly invoices with automated discrepancy flags.',
          tab: 'overview'
        },
        {
          name: 'Tax compliance dashboard for multiple companies',
          desc: 'Centralized holding and subsidiary monitoring with consolidated risk and tax position gauges.',
          tab: 'overview'
        },
        {
          name: 'Tax management software for small and medium businesses',
          desc: 'Zero-configuration compliance engine tailored for Indian SMEs and growing enterprises.',
          tab: 'overview'
        },
        {
          name: 'Secure cloud tax software for CA offices',
          desc: 'End-to-end salted encryption, automated daily backups, and strict DPDP Act compliance.',
          tab: 'settings'
        }
      ]
    }
  ];

  const filteredCategories = keywordCategories.map(cat => ({
    ...cat,
    longTailSolutions: cat.longTailSolutions.filter(sol => 
      !searchFilter ||
      sol.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      sol.desc.toLowerCase().includes(searchFilter.toLowerCase()) ||
      cat.primaryKeywords.some(kw => kw.toLowerCase().includes(searchFilter.toLowerCase()))
    )
  })).filter(cat => cat.longTailSolutions.length > 0);

  return (
    <section className={`border-t border-slate-200 bg-slate-50/80 transition-colors ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        
        {/* Toggle Bar / Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  U&Me Associates Tax Compliance Solutions Directory
                </span>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                  GST · ITR · TDS · CA Suite
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Explore dedicated compliance workflows, automated GST reconciliation, ITC matching, and online return filing modules.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-300 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <span>{isOpen ? 'Collapse Keyword Index' : 'Explore Tax Capabilities & Keywords'}</span>
              {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="mt-5 pt-4 border-t border-slate-200 space-y-6">
            
            {/* Search Filter Inside Directory */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter keywords (e.g. ITC matching, bulk ITR, TDS)..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white"
                />
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>25 Core Compliance Capabilities · 25 Specialized Workflows</span>
              </div>
            </div>

            {/* Keyword Hub Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCategories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <div 
                    key={cat.id}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                          {cat.title}
                        </h4>
                      </div>

                      {/* Primary Short-Tail Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {cat.primaryKeywords.map((kw) => (
                          <span 
                            key={kw}
                            className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>

                      {/* Long-Tail Solutions */}
                      <div className="space-y-2.5 mt-3 pt-3 border-t border-slate-100">
                        {cat.longTailSolutions.map((item, idx) => (
                          <div 
                            key={idx}
                            onClick={() => onSelectKeywordAction?.(cat.id, item.tab)}
                            className="group p-2 rounded-lg hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span className="text-[11px] font-semibold text-slate-800 group-hover:text-blue-700 leading-snug">
                                {item.name}
                              </span>
                              <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 shrink-0 mt-0.5" />
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Keyword Cloud */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                All-In-One Tax Software & Compliance Index
              </span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {[
                  'tax software', 'GST software', 'ITR software', 'TDS software', 'tax compliance',
                  'GST filing', 'ITR filing', 'TDS filing', 'tax management', 'accounting software',
                  'GST returns', 'income tax', 'tax automation', 'GST reconciliation', 'ITC matching',
                  'CA software', 'tax reporting', 'e-filing software', 'cloud accounting', 'compliance software',
                  'tax calculator', 'GST billing', 'tax consultancy', 'financial software', 'return filing'
                ].map((term) => (
                  <span 
                    key={term}
                    className="text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    #{term}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
