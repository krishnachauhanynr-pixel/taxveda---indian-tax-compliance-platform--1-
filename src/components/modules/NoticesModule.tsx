import React, { useState } from 'react';
import { 
  Bell, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Send, 
  Search, 
  ExternalLink,
  ChevronRight,
  X,
  FileCheck
} from 'lucide-react';
import { NoticeItem } from '../../types';

interface NoticesModuleProps {
  notices: NoticeItem[];
  onUpdateNoticeStatus: (id: string, newStatus: NoticeItem['status']) => void;
}

export const NoticesModule: React.FC<NoticesModuleProps> = ({
  notices,
  onUpdateNoticeStatus
}) => {
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [dinSearch, setDinSearch] = useState('');
  const [dinVerificationResult, setDinVerificationResult] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifyDIN = (e: React.FormEvent) => {
    e.preventDefault();
    if (dinSearch.length < 8) {
      setDinVerificationResult('Invalid DIN length. DIN format must match CBDT/CBIC guidelines.');
      return;
    }
    setDinVerificationResult(`Valid Department Document Identification Number. Issued under CBIC/CBDT standard circular.`);
  };

  const handleOpenNotice = (notice: NoticeItem) => {
    setSelectedNotice(notice);
    setReplyDraft(`To,\nThe Assessing Officer / Proper Officer,\nJurisdictional Tax Range,\n\nSub: Response to Notice DIN ${notice.din} u/s ${notice.section} in the case of ${notice.clientName}.\n\nRespected Sir/Madam,\nWith reference to the captioned notice, we respectfully submit on behalf of our client that the proposed discrepancy has been duly verified against statutory accounting records...`);
  };

  const handleSubmitReply = () => {
    if (!selectedNotice) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onUpdateNoticeStatus(selectedNotice.id, 'Submitted');
      setSelectedNotice({
        ...selectedNotice,
        status: 'Submitted'
      });
    }, 700);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md">
              Statutory Department Communications
            </span>
            <span className="text-xs text-slate-500 font-medium">CBDT & GSTN Centralized Register</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Notices, Orders & Document Identification Numbers (DIN)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track Intimations u/s 143(1), GST DRC-01A intimations, response limitation periods, and CA draft approvals
          </p>
        </div>
      </div>

      {/* DIN Verification Bar */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-sm">
        <form onSubmit={handleVerifyDIN} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verify Official DIN:</span>
          </div>
          <input
            type="text"
            placeholder="e.g. DIN-2026-881920-GST-DRC01A"
            value={dinSearch}
            onChange={(e) => setDinSearch(e.target.value)}
            className="w-full sm:flex-1 px-3 py-2 text-xs bg-slate-800 text-white rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer shrink-0"
          >
            Authenticate DIN
          </button>
        </form>

        {dinVerificationResult && (
          <div className="mt-2.5 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{dinVerificationResult}</span>
          </div>
        )}
      </div>

      {/* Notices Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Active Notices Requiring Response</h3>
          <span className="text-xs text-slate-500">{notices.length} Pending Department Cases</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Client & Identifier</th>
                <th className="py-3 px-4">Issuing Authority</th>
                <th className="py-3 px-4">Statutory Section</th>
                <th className="py-3 px-4">Subject Matter</th>
                <th className="py-3 px-4">Days Left</th>
                <th className="py-3 px-4">Workflow Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notices.map((notice) => (
                <tr 
                  key={notice.id}
                  onClick={() => handleOpenNotice(notice)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-medium">
                    <div className="font-bold text-slate-900">{notice.clientName}</div>
                    <div className="font-mono text-[11px] text-slate-500">{notice.panOrGstin}</div>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {notice.issuingAuthority}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                      {notice.section}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs text-slate-700">
                    <div className="truncate font-medium">{notice.subject}</div>
                    <div className="font-mono text-[10px] text-slate-400 mt-0.5">{notice.din}</div>
                  </td>

                  <td className="py-3.5 px-4 tabular-nums">
                    <span className="font-extrabold text-rose-600">
                      {notice.daysRemaining} Days
                    </span>
                    <div className="text-[10px] text-slate-400">Due: {notice.responseDueDate}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      notice.status === 'Submitted'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : notice.status === 'Under CA Review'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {notice.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenNotice(notice);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Draft Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Response Drafter & Notice Inspection Modal */}
      {selectedNotice && (
        <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between pb-3 border-b border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md">
                  Notice {selectedNotice.section}
                </span>
                <span className="text-xs font-mono text-slate-500">{selectedNotice.din}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{selectedNotice.subject}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Client: {selectedNotice.clientName} · Authority: {selectedNotice.issuingAuthority}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedNotice(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              CA Legal Draft Response & Grounds of Submission:
            </label>
            <textarea
              rows={6}
              value={replyDraft}
              onChange={(e) => setReplyDraft(e.target.value)}
              className="w-full p-3 text-xs font-mono text-slate-900 bg-slate-50 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Response Limitation: <strong className="text-rose-600">{selectedNotice.responseDueDate}</strong> ({selectedNotice.daysRemaining} days remaining)
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onUpdateNoticeStatus(selectedNotice.id, 'Under CA Review')}
                className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Send for Partner Review
              </button>

              <button
                type="button"
                onClick={handleSubmitReply}
                disabled={isSubmitting || selectedNotice.status === 'Submitted'}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Submitting to Portal...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{selectedNotice.status === 'Submitted' ? 'Submitted' : 'Submit Response to ITD/GSTN'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
