import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'terms' | 'privacy';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              {type === 'terms' ? 'Terms and Conditions' : 'Privacy & Data Governance Policy'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto py-4 text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed pr-2">
          {type === 'terms' ? (
            <>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">1. Professional SaaS Agreement</h3>
                <p>
                  These Terms of Service govern your use of the U&Me Associates Indian tax compliance platform. By registering an account or initiating return workflows, you confirm that you are a Chartered Accountant, tax advocate, accountant, or authorized corporate financial representative.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">2. Scope of Service & Government Portals</h3>
                <p>
                  U&Me Associates provides computational, reconciliation, and automated return preparation tools. Official filing occurs only when verified through GSTN or ITD via licensed GSP/ASP gateways with authorized DSC or OTP credentials.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">3. Accuracy of Tax Computations</h3>
                <p>
                  While U&Me Associates implements rules in accordance with the Finance Act and GST Council notifications, final verification of tax computation, classification, and eligible Input Tax Credit remains the professional responsibility of the certifying practitioner.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">4. Free Trial & Subscriptions</h3>
                <p>
                  The 5-day trial provides full unrestricted access to client management, reconciliation engine, and return preparation modules without requiring credit card details.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">1. Indian Data Localization & DPDP Act 2023</h3>
                <p>
                  In accordance with the Digital Personal Data Protection Act 2023 and ICAI guidelines, all client records, PAN, GSTIN, financial ledgers, and tax computations are strictly hosted in Tier-4 data centers physically located within the Republic of India (Mumbai & Bengaluru).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">2. Encryption & Client Confidentiality</h3>
                <p>
                  All data in transit is protected using TLS 1.3 encryption, and data at rest is secured via AES-256 bit encryption. User tax passwords and portal credentials are never stored in plaintext and are never shared with third parties.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">3. Multi-Tenant Organization Isolation</h3>
                <p>
                  Each CA firm or corporate entity operates in a cryptographically isolated tenant schema, ensuring that client portfolios, invoices, and working papers can never be viewed across organizations.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">4. Retention & Deletion</h3>
                <p>
                  Practitioners maintain complete ownership of all client records. You may export complete client dossiers in Excel/JSON format or request permanent cryptographic erasure at any time.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400">
            Last Updated: October 2026 · Jurisdiction: India
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
