import { 
  ClientRecord, 
  GSTReturnItem, 
  ITRReturnItem, 
  TDSReturnItem, 
  ReconciliationInvoice, 
  NoticeItem, 
  CalendarEvent, 
  TeamMember 
} from '../types';

export const INITIAL_CLIENTS: ClientRecord[] = [
  {
    id: 'cli-001',
    name: 'Bharat Logistics & Infra Pvt Ltd',
    tradeName: 'Bharat Express Logistics',
    pan: 'AABCB9182E',
    gstin: '27AABCB9182E1Z4',
    tan: 'MUMB09182E',
    entityType: 'Private Limited',
    state: 'Maharashtra (27)',
    primaryContact: 'Rajesh Singhania (Director)',
    email: 'tax@bharatlogistics.in',
    phone: '+91 98201 44521',
    assignedTo: 'CA Rohit Mehra',
    activeWorkflows: { gst: true, itr: true, tds: true },
    gstStatus: 'mismatch',
    itrStatus: 'ready_to_file',
    tdsStatus: 'filed',
    openNotices: 1,
    lastFilingDate: '2026-10-18'
  },
  {
    id: 'cli-002',
    name: 'Zenith Healthcare Technologies Ltd',
    tradeName: 'Zenith MedTech',
    pan: 'AAACZ4421K',
    gstin: '29AAACZ4421K1ZW',
    tan: 'BLRZ44210K',
    entityType: 'Public Limited',
    state: 'Karnataka (29)',
    primaryContact: 'Ananya Deshmukh (CFO)',
    email: 'finance@zenithhealth.io',
    phone: '+91 94480 33119',
    assignedTo: 'Pooja Agarwal (Senior Associate)',
    activeWorkflows: { gst: true, itr: true, tds: true },
    gstStatus: 'filed',
    itrStatus: 'filed',
    tdsStatus: 'ready_to_file',
    openNotices: 0,
    lastFilingDate: '2026-10-20'
  },
  {
    id: 'cli-003',
    name: 'Vardhman Textile Mills LLP',
    tradeName: 'Vardhman Fabrics',
    pan: 'AABFV3329M',
    gstin: '24AABFV3329M1ZF',
    tan: 'AHMD33290M',
    entityType: 'LLP',
    state: 'Gujarat (24)',
    primaryContact: 'Manish Choksi (Partner)',
    email: 'accounts@vardhmantextiles.com',
    phone: '+91 97245 88902',
    assignedTo: 'CA Rohit Mehra',
    activeWorkflows: { gst: true, itr: true, tds: false },
    gstStatus: 'pending',
    itrStatus: 'in_progress',
    tdsStatus: 'pending',
    openNotices: 2,
    lastFilingDate: '2026-09-28'
  },
  {
    id: 'cli-004',
    name: 'Nuvotech Cloud Solutions LLP',
    tradeName: 'NuvoCloud',
    pan: 'AAAFN1092P',
    gstin: '07AAAFN1092P1Z8',
    tan: 'DELN10920P',
    entityType: 'LLP',
    state: 'Delhi (07)',
    primaryContact: 'Vikram Sethi (Managing Partner)',
    email: 'vsethi@nuvotech.in',
    phone: '+91 99102 77412',
    assignedTo: 'Arun Verma (Associate)',
    activeWorkflows: { gst: true, itr: true, tds: true },
    gstStatus: 'filed',
    itrStatus: 'filed',
    tdsStatus: 'filed',
    openNotices: 0,
    lastFilingDate: '2026-10-15'
  },
  {
    id: 'cli-005',
    name: 'Royal Heritage Spices & Foods',
    tradeName: 'Royal Spices',
    pan: 'AFHPK8812D',
    gstin: '06AFHPK8812D1ZR',
    tan: 'GURG88120D',
    entityType: 'Partnership',
    state: 'Haryana (06)',
    primaryContact: 'Sunil Kumar (Partner)',
    email: 'contact@royalspices.co.in',
    phone: '+91 98112 55430',
    assignedTo: 'CA Rohit Mehra',
    activeWorkflows: { gst: true, itr: true, tds: true },
    gstStatus: 'overdue',
    itrStatus: 'in_progress',
    tdsStatus: 'mismatch',
    openNotices: 1,
    lastFilingDate: '2026-09-11'
  },
  {
    id: 'cli-006',
    name: 'Dr. Siddharth Bhattacharya',
    tradeName: 'Aura Diagnostic Center',
    pan: 'ABDPB6654N',
    gstin: '19ABDPB6654N1Z2',
    tan: 'CALB66540N',
    entityType: 'Individual',
    state: 'West Bengal (19)',
    primaryContact: 'Dr. Siddharth Bhattacharya',
    email: 'drsiddharth@auradiag.org',
    phone: '+91 98301 22904',
    assignedTo: 'Pooja Agarwal (Senior Associate)',
    activeWorkflows: { gst: false, itr: true, tds: false },
    gstStatus: 'pending',
    itrStatus: 'ready_to_file',
    tdsStatus: 'pending',
    openNotices: 0,
    lastFilingDate: '2026-08-30'
  }
];

export const INITIAL_GST_RETURNS: GSTReturnItem[] = [
  {
    id: 'gst-001',
    clientName: 'Bharat Logistics & Infra Pvt Ltd',
    gstin: '27AABCB9182E1Z4',
    returnType: 'GSTR-3B',
    period: 'October 2026',
    dueDate: '2026-11-20',
    taxableValue: 14500000,
    igst: 1800000,
    cgst: 405000,
    sgst: 405000,
    totalTax: 2610000,
    itcClaimed: 1850000,
    itcAvailable2B: 1690000,
    itcDifference: 160000, // 2B mismatch!
    status: 'mismatch'
  },
  {
    id: 'gst-002',
    clientName: 'Zenith Healthcare Technologies Ltd',
    gstin: '29AAACZ4421K1ZW',
    returnType: 'GSTR-1',
    period: 'October 2026',
    dueDate: '2026-11-11',
    taxableValue: 32000000,
    igst: 4800000,
    cgst: 480000,
    sgst: 480000,
    totalTax: 5760000,
    itcClaimed: 0,
    itcAvailable2B: 0,
    itcDifference: 0,
    status: 'filed',
    arn: 'AA2910260081293',
    filedOn: '2026-10-24'
  },
  {
    id: 'gst-003',
    clientName: 'Vardhman Textile Mills LLP',
    gstin: '24AABFV3329M1ZF',
    returnType: 'GSTR-3B',
    period: 'September 2026',
    dueDate: '2026-10-20',
    taxableValue: 8900000,
    igst: 890000,
    cgst: 222500,
    sgst: 222500,
    totalTax: 1335000,
    itcClaimed: 950000,
    itcAvailable2B: 950000,
    itcDifference: 0,
    status: 'ready_to_file'
  },
  {
    id: 'gst-004',
    clientName: 'Royal Heritage Spices & Foods',
    gstin: '06AFHPK8812D1ZR',
    returnType: 'GSTR-1',
    period: 'September 2026',
    dueDate: '2026-10-11',
    taxableValue: 4200000,
    igst: 210000,
    cgst: 105000,
    sgst: 105000,
    totalTax: 420000,
    itcClaimed: 0,
    itcAvailable2B: 0,
    itcDifference: 0,
    status: 'overdue'
  },
  {
    id: 'gst-005',
    clientName: 'Nuvotech Cloud Solutions LLP',
    gstin: '07AAAFN1092P1Z8',
    returnType: 'GSTR-3B',
    period: 'October 2026',
    dueDate: '2026-11-20',
    taxableValue: 18400000,
    igst: 3312000,
    cgst: 0,
    sgst: 0,
    totalTax: 3312000,
    itcClaimed: 1240000,
    itcAvailable2B: 1240000,
    itcDifference: 0,
    status: 'ready_to_file'
  }
];

export const INITIAL_ITR_RETURNS: ITRReturnItem[] = [
  {
    id: 'itr-001',
    clientName: 'Bharat Logistics & Infra Pvt Ltd',
    pan: 'AABCB9182E',
    assessmentYear: 'AY 2026-27',
    formType: 'ITR-6',
    regime: 'New Regime',
    grossIncome: 48500000,
    totalDeductions: 1200000,
    taxPayable: 10406000,
    tdsRefund: 180000,
    dueDate: '2026-10-31',
    status: 'ready_to_file',
    documentCount: 14
  },
  {
    id: 'itr-002',
    clientName: 'Dr. Siddharth Bhattacharya',
    pan: 'ABDPB6654N',
    assessmentYear: 'AY 2026-27',
    formType: 'ITR-3',
    regime: 'New Regime',
    grossIncome: 3450000,
    totalDeductions: 150000,
    taxPayable: 512200,
    tdsRefund: 45000,
    dueDate: '2026-10-31',
    status: 'ready_to_file',
    documentCount: 8
  },
  {
    id: 'itr-003',
    clientName: 'Zenith Healthcare Technologies Ltd',
    pan: 'AAACZ4421K',
    assessmentYear: 'AY 2026-27',
    formType: 'ITR-6',
    regime: 'New Regime',
    grossIncome: 142000000,
    totalDeductions: 4500000,
    taxPayable: 30250000,
    tdsRefund: 0,
    dueDate: '2026-10-31',
    status: 'filed',
    documentCount: 22,
    acknowledgmentNo: 'ACK-881920049182'
  },
  {
    id: 'itr-004',
    clientName: 'Vardhman Textile Mills LLP',
    pan: 'AABFV3329M',
    assessmentYear: 'AY 2026-27',
    formType: 'ITR-5',
    regime: 'Old Regime',
    grossIncome: 19800000,
    totalDeductions: 850000,
    taxPayable: 4247100,
    tdsRefund: 92000,
    dueDate: '2026-10-31',
    status: 'in_progress',
    documentCount: 11
  }
];

export const INITIAL_TDS_RETURNS: TDSReturnItem[] = [
  {
    id: 'tds-001',
    clientName: 'Bharat Logistics & Infra Pvt Ltd',
    tan: 'MUMB09182E',
    formType: '26Q (Non-Salary)',
    quarter: 'Q2',
    financialYear: 'FY 2026-27',
    totalDeductions: 485000,
    totalChallanAmount: 485000,
    unconsumedChallan: 0,
    deducteeCount: 42,
    dueDate: '2026-10-31',
    status: 'filed',
    tokenNo: 'TK-2026-88192'
  },
  {
    id: 'tds-002',
    clientName: 'Zenith Healthcare Technologies Ltd',
    tan: 'BLRZ44210K',
    formType: '24Q (Salary)',
    quarter: 'Q2',
    financialYear: 'FY 2026-27',
    totalDeductions: 1820000,
    totalChallanAmount: 1820000,
    unconsumedChallan: 0,
    deducteeCount: 165,
    dueDate: '2026-10-31',
    status: 'ready_to_file'
  },
  {
    id: 'tds-003',
    clientName: 'Royal Heritage Spices & Foods',
    tan: 'GURG88120D',
    formType: '26Q (Non-Salary)',
    quarter: 'Q2',
    financialYear: 'FY 2026-27',
    totalDeductions: 115000,
    totalChallanAmount: 85000,
    unconsumedChallan: 0,
    deducteeCount: 18,
    dueDate: '2026-10-31',
    status: 'mismatch'
  }
];

export const SAMPLE_RECON_INVOICES: ReconciliationInvoice[] = [
  {
    id: 'rec-001',
    invoiceNumber: 'INV/2026/891',
    invoiceDate: '2026-10-04',
    supplierGstin: '27AABCT9981P1ZS',
    supplierName: 'Tata Tele-Business Services Ltd',
    booksTaxableValue: 125000,
    booksTotalTax: 22500,
    gstr2bTaxableValue: 125000,
    gstr2bTotalTax: 22500,
    difference: 0,
    matchStatus: 'matched',
    itcEligibility: 'Eligible'
  },
  {
    id: 'rec-002',
    invoiceNumber: 'DEL/7710/26',
    invoiceDate: '2026-10-08',
    supplierGstin: '07AAACD4419E1ZK',
    supplierName: 'Dell India Enterprise Solutions',
    booksTaxableValue: 840000,
    booksTotalTax: 151200,
    gstr2bTaxableValue: 840000,
    gstr2bTotalTax: 151200,
    difference: 0,
    matchStatus: 'matched',
    itcEligibility: 'Eligible'
  },
  {
    id: 'rec-003',
    invoiceNumber: 'BL-99182',
    invoiceDate: '2026-10-12',
    supplierGstin: '24AAACT1029Q1Z0',
    supplierName: 'Adani Logistics Hub Ltd',
    booksTaxableValue: 650000,
    booksTotalTax: 117000,
    gstr2bTaxableValue: 0,
    gstr2bTotalTax: 0,
    difference: 117000,
    matchStatus: 'unmatched_in_2b', // Vendor didn't file GSTR-1
    itcEligibility: 'Pending Verification'
  },
  {
    id: 'rec-004',
    invoiceNumber: 'MSFT-IND-8812',
    invoiceDate: '2026-10-15',
    supplierGstin: '29AABCM1890L1ZC',
    supplierName: 'Microsoft Corporation India Pvt Ltd',
    booksTaxableValue: 320000,
    booksTotalTax: 57600,
    gstr2bTaxableValue: 300000,
    gstr2bTotalTax: 54000,
    difference: 3600, // Value mismatch!
    matchStatus: 'value_mismatch',
    itcEligibility: 'Eligible'
  },
  {
    id: 'rec-005',
    invoiceNumber: 'ZOM-CORP-4412',
    invoiceDate: '2026-10-18',
    supplierGstin: '06AAACZ1188D1Z9',
    supplierName: 'Zomato Enterprise Meals Ltd',
    booksTaxableValue: 45000,
    booksTotalTax: 2250,
    gstr2bTaxableValue: 45000,
    gstr2bTotalTax: 2250,
    difference: 0,
    matchStatus: 'matched',
    itcEligibility: 'Blocked - Sec 17(5)' // Food & beverages blocked ITC
  },
  {
    id: 'rec-006',
    invoiceNumber: 'VOD-IND-10029',
    invoiceDate: '2026-10-21',
    supplierGstin: '27AABCV8810K1ZM',
    supplierName: 'Vodafone Idea Business Cloud',
    booksTaxableValue: 0,
    booksTotalTax: 0,
    gstr2bTaxableValue: 88000,
    gstr2bTotalTax: 15840,
    difference: 15840,
    matchStatus: 'unmatched_in_books', // In 2B but missing in purchase register
    itcEligibility: 'Pending Verification'
  }
];

export const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: 'not-001',
    din: 'DIN-2026-881920-GST-DRC01A',
    clientName: 'Bharat Logistics & Infra Pvt Ltd',
    panOrGstin: '27AABCB9182E1Z4',
    issuingAuthority: 'GST Authority',
    section: 'DRC-01A / Rule 88C',
    subject: 'Intimation of difference in input tax credit available in Form GSTR-2B and availed in Form GSTR-3B',
    issueDate: '2026-10-14',
    responseDueDate: '2026-11-04',
    daysRemaining: 9,
    status: 'Draft Reply',
    priority: 'High'
  },
  {
    id: 'not-002',
    din: 'DIN-2026-104928-ITD-143(1)',
    clientName: 'Royal Heritage Spices & Foods',
    panOrGstin: 'AFHPK8812D',
    issuingAuthority: 'Income Tax Department',
    section: 'Section 143(1)(a)',
    subject: 'Intimation proposing adjustments for discrepancy between Form 26AS TDS credit and ITR credit claimed',
    issueDate: '2026-10-19',
    responseDueDate: '2026-11-18',
    daysRemaining: 23,
    status: 'Under CA Review',
    priority: 'Medium'
  },
  {
    id: 'not-003',
    din: 'DIN-2026-339102-TDS-200A',
    clientName: 'Vardhman Textile Mills LLP',
    panOrGstin: 'AHMD33290M',
    issuingAuthority: 'TDS CPC',
    section: 'Section 200A / 234E',
    subject: 'Demand intimation for short deduction and late filing fee under Section 234E for Q1 TDS return',
    issueDate: '2026-10-02',
    responseDueDate: '2026-10-30',
    daysRemaining: 4,
    status: 'Under CA Review',
    priority: 'High'
  }
];

export const STATUTORY_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal-001',
    title: 'GSTR-1 (Monthly Outward Supplies)',
    category: 'GST',
    dueDate: '2026-11-11',
    description: 'Statutory due date for taxpayers with turnover > ₹5 Crore or opting for monthly filing.',
    isStatutory: true,
    priority: 'Urgent'
  },
  {
    id: 'cal-002',
    title: 'GSTR-3B (Monthly Summary & Tax Payment)',
    category: 'GST',
    dueDate: '2026-11-20',
    description: 'Monthly summary return of outward and inward supplies along with tax discharge.',
    isStatutory: true,
    priority: 'Urgent'
  },
  {
    id: 'cal-003',
    title: 'TDS Payment for October Deductions',
    category: 'TDS',
    dueDate: '2026-11-07',
    description: 'Challan ITNS 281 deposit for tax deducted during October 2026.',
    isStatutory: true,
    priority: 'Urgent'
  },
  {
    id: 'cal-004',
    title: 'Tax Audit & Corporate ITR Filing',
    category: 'ITR',
    dueDate: '2026-10-31',
    description: 'Statutory deadline for companies, LLPs, and audited firms for AY 2026-27.',
    isStatutory: true,
    priority: 'Urgent'
  },
  {
    id: 'cal-005',
    title: 'Advance Tax 3rd Instalment (75%)',
    category: 'ITR',
    dueDate: '2026-12-15',
    description: 'Payment of third instalment of Advance Tax for FY 2026-27.',
    isStatutory: true,
    priority: 'Regular'
  },
  {
    id: 'cal-006',
    title: 'GSTR-9 & GSTR-9C Annual Returns',
    category: 'GST',
    dueDate: '2026-12-31',
    description: 'Annual return and reconciliation statement for FY 2025-26.',
    isStatutory: true,
    priority: 'Regular'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-001',
    name: 'CA Rohit Mehra, FCA, DISA',
    email: 'rohit@mehra-associates.in',
    role: 'CA Partner',
    phone: '+91 98101 22910',
    activeClientsCount: 42,
    status: 'Active'
  },
  {
    id: 'team-002',
    name: 'Pooja Agarwal, ACA',
    email: 'pooja@mehra-associates.in',
    role: 'Senior Associate',
    phone: '+91 98204 55912',
    activeClientsCount: 28,
    status: 'Active'
  },
  {
    id: 'team-003',
    name: 'Arun Verma',
    email: 'arun@mehra-associates.in',
    role: 'Article Assistant',
    phone: '+91 99182 33491',
    activeClientsCount: 16,
    status: 'Active'
  },
  {
    id: 'team-004',
    name: 'Sneha Kulkarni',
    email: 'sneha@mehra-associates.in',
    role: 'Tax Reviewer',
    phone: '+91 97234 11820',
    activeClientsCount: 35,
    status: 'Active'
  }
];
