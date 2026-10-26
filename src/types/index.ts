export type UserCategory = 'professional' | 'corporate';

export type ClientRange = 
  | '0-10' 
  | '10-50' 
  | '50-200' 
  | '200+';

export type TurnoverRange = 
  | 'less-than-200cr' 
  | '200-800cr' 
  | 'above-800cr';

export interface UserSession {
  id: string;
  fullName: string;
  firmName: string;
  email: string;
  mobile: string;
  category: UserCategory;
  scaleTier: ClientRange | TurnoverRange;
  role: 'admin' | 'ca_partner' | 'associate' | 'reviewer';
  isLoggedIn: boolean;
  avatar?: string;
  membershipNo?: string; // ICAI / ICSI
}

export type FilingStatus = 'filed' | 'ready_to_file' | 'in_progress' | 'pending' | 'overdue' | 'mismatch';

export interface ClientRecord {
  id: string;
  name: string;
  tradeName?: string;
  pan: string;
  gstin: string;
  tan?: string;
  entityType: 'Private Limited' | 'Public Limited' | 'Partnership' | 'LLP' | 'Proprietorship' | 'Individual';
  state: string;
  primaryContact: string;
  email: string;
  phone: string;
  assignedTo: string;
  activeWorkflows: {
    gst: boolean;
    itr: boolean;
    tds: boolean;
  };
  gstStatus: FilingStatus;
  itrStatus: FilingStatus;
  tdsStatus: FilingStatus;
  openNotices: number;
  lastFilingDate?: string;
}

export interface GSTReturnItem {
  id: string;
  clientName: string;
  gstin: string;
  returnType: 'GSTR-1' | 'GSTR-3B' | 'GSTR-9' | 'IFF';
  period: string; // e.g. "October 2026"
  dueDate: string;
  taxableValue: number;
  igst: number;
  cgst: number;
  sgst: number;
  totalTax: number;
  itcClaimed: number;
  itcAvailable2B: number;
  itcDifference: number;
  status: FilingStatus;
  arn?: string;
  filedOn?: string;
}

export interface ITRReturnItem {
  id: string;
  clientName: string;
  pan: string;
  assessmentYear: string; // "AY 2026-27"
  formType: 'ITR-1 (Sahaj)' | 'ITR-2' | 'ITR-3' | 'ITR-4 (Sugam)' | 'ITR-5' | 'ITR-6';
  regime: 'New Regime' | 'Old Regime';
  grossIncome: number;
  totalDeductions: number;
  taxPayable: number;
  tdsRefund: number;
  dueDate: string;
  status: FilingStatus;
  documentCount: number;
  acknowledgmentNo?: string;
}

export interface TDSReturnItem {
  id: string;
  clientName: string;
  tan: string;
  formType: '24Q (Salary)' | '26Q (Non-Salary)' | '27Q (Non-Resident)';
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  financialYear: string;
  totalDeductions: number;
  totalChallanAmount: number;
  unconsumedChallan: number;
  deducteeCount: number;
  dueDate: string;
  status: FilingStatus;
  tokenNo?: string;
}

export interface ReconciliationInvoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  supplierGstin: string;
  supplierName: string;
  booksTaxableValue: number;
  booksTotalTax: number;
  gstr2bTaxableValue: number;
  gstr2bTotalTax: number;
  difference: number;
  matchStatus: 'matched' | 'unmatched_in_books' | 'unmatched_in_2b' | 'value_mismatch';
  itcEligibility: 'Eligible' | 'Ineligible - Rule 38' | 'Blocked - Sec 17(5)' | 'Pending Verification';
}

export interface NoticeItem {
  id: string;
  din: string;
  clientName: string;
  panOrGstin: string;
  issuingAuthority: 'Income Tax Department' | 'GST Authority' | 'TDS CPC';
  section: string;
  subject: string;
  issueDate: string;
  responseDueDate: string;
  daysRemaining: number;
  status: 'Draft Reply' | 'Under CA Review' | 'Submitted' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
}

export interface CalendarEvent {
  id: string;
  title: string;
  category: 'GST' | 'ITR' | 'TDS' | 'ROC';
  dueDate: string;
  description: string;
  isStatutory: boolean;
  priority: 'Urgent' | 'Regular';
  assignedTo?: string;
  completed?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'CA Partner' | 'Senior Associate' | 'Article Assistant' | 'Tax Reviewer';
  phone: string;
  activeClientsCount: number;
  status: 'Active' | 'Invited';
}
