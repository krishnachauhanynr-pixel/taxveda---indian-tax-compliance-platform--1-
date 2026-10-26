import React, { useState } from 'react';
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  Search, 
  ChevronRight, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  BookOpen,
  LifeBuoy
} from 'lucide-react';

export const HelpSupportModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('GST Reconciliation');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

  const faqs = [
    {
      q: 'What makes U&Me Associates the best GST filing software for chartered accountants?',
      a: 'U&Me Associates provides direct GSP integration, automated GSTR-1 & GSTR-3B preparation, automated liability computation, JSON export, and sandbox validation. CAs can file returns for hundreds of clients from a single centralized practice dashboard with automated filing status updates.'
    },
    {
      q: 'How does automated GST reconciliation software with ITC matching and mismatch detection work?',
      a: 'Our GST reconciliation engine compares GSTR-2B portal data against purchase register books with configurable tolerance limits (₹0–₹50). It automatically isolates invoice number discrepancies, tax rate mismatches, vendor filing delays, and non-compliant vendors under Section 16(2)(aa) to safeguard your input tax credit.'
    },
    {
      q: 'Can CA firms use U&Me Associates for bulk income tax return filing in India?',
      a: 'Yes. U&Me Associates is designed as bulk income tax return filing software for CAs and tax professionals. It supports AY 2026-27 filings, automated computation under section 87A and 115BAC, side-by-side Old vs New Tax Regime comparisons, and direct JSON e-filing for ITR-1 through ITR-6.'
    },
    {
      q: 'How does TDS return filing software for CA firms handle Form 24Q, 26Q and Form 16/16A?',
      a: 'The TDS module manages quarterly returns for Form 24Q (salary) and 26Q (vendor payments), validates BSR codes and OLTAS Challan 281 entries, allocates unconsumed credits, and generates digitally signed Form 16/16A certificates directly from TRACES.'
    },
    {
      q: 'Does U&Me Associates provide a tax compliance dashboard for multiple companies and multiple GSTINs?',
      a: 'Yes, corporate finance teams can monitor holding and subsidiary entities across all Indian states under one master account. View multi-GSTIN filing timelines, consolidated ITC pools, and corporate audit trails from a single cloud dashboard.'
    },
    {
      q: 'Is U&Me Associates a secure cloud tax software for CA offices and Indian businesses?',
      a: 'Yes. The platform uses salted SHA-256 cryptographic password hashing, role-based access controls (RBAC), daily encrypted backups, and Tier-4 Indian data centers in full compliance with the Digital Personal Data Protection (DPDP) Act 2023.'
    },
    {
      q: 'How to handle Rule 88C mismatch notices (DRC-01A)?',
      a: 'Rule 88C intimates variance between liability declared in GSTR-1 and tax paid in GSTR-3B exceeding the prescribed percentage. In U&Me Associates, open the Notices module, select DRC-01A, review the system-reconciled variance, and generate an explanation reply for the assessing officer.'
    },
    {
      q: 'How does Rule 37A Input Tax Credit reversal work?',
      a: 'If a supplier fails to file GSTR-3B by 30th September following the financial year, the recipient must reverse availed ITC on or before 30th November. Our 2B Reconciliation engine automatically flags unpaid vendor filings under the "Pending Verification" tab.'
    }
  ];

  const filteredFaqs = faqs.filter(
    f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;

    setTicketSuccess(`Support Ticket #TAX-${Math.floor(10000 + Math.random() * 90000)} generated. Our senior tax tech specialist will contact you within 2 hours.`);
    setTicketSubject('');
    setTicketMessage('');
    setTimeout(() => setTicketSuccess(null), 6000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
              Tax Practitioner Desk
            </span>
            <span className="text-xs text-slate-500 font-medium">Knowledge Base & Government Helplines</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Help, Support & Statutory Helplines
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Access tax circulars, compliance guides, official portal helplines, or raise a ticket with our CA technical team
          </p>
        </div>
      </div>

      {ticketSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{ticketSuccess}</span>
        </div>
      )}

      {/* Official Government Tax Helplines */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-blue-600">GSTN Helpdesk</div>
          <div className="text-base font-bold text-slate-900 font-mono mt-0.5">1800-103-4786</div>
          <div className="text-xs text-slate-500 mt-1">GSTR-1, 3B, JSON error codes & Portal technical help</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-purple-600">Income Tax e-Filing (CBDT)</div>
          <div className="text-base font-bold text-slate-900 font-mono mt-0.5">1800-103-0025</div>
          <div className="text-xs text-slate-500 mt-1">ITR filing, DSC authentication, AIS/TIS feedback</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-emerald-600">TRACES / TDS CPC</div>
          <div className="text-base font-bold text-slate-900 font-mono mt-0.5">1800-120-4725</div>
          <div className="text-xs text-slate-500 mt-1">Form 16/16A generation, challan status & 26AS inquiries</div>
        </div>
      </div>

      {/* 2-Column Split: Searchable Knowledge Base & Raise Ticket */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* FAQs */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Tax Law Knowledge Base & FAQs</h3>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search Rule 88C, Section 194Q..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 w-48 sm:w-56"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                <h4 className="text-xs font-bold text-slate-900">{faq.q}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Raise Support Ticket */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3.5">
          <div className="pb-3 border-b border-slate-100 flex items-center gap-2">
            <LifeBuoy className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Priority Technical Support</h3>
          </div>

          <form onSubmit={handleSubmitTicket} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Issue Category *</label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-none"
              >
                <option value="GST Reconciliation">GST Reconciliation & Rule 88C</option>
                <option value="ITR Computation">ITR Computation & Form 16</option>
                <option value="TDS & Challans">TDS & Challan Matching</option>
                <option value="API Integration">GSP & E-Way Bill API</option>
                <option value="Other">Other Tax Technical Query</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subject *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mismatch in Form 26Q BSR code validation"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Query Details *</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your query or paste the error payload..."
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Ticket to CA Tech Team</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
