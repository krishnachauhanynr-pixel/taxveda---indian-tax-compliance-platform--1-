import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Building2, 
  FileCheck, 
  Calculator, 
  FileSpreadsheet, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Edit,
  Trash2
} from 'lucide-react';
import { ClientRecord, FilingStatus } from '../../types';

interface ClientsModuleProps {
  clients: ClientRecord[];
  onAddClient: (newClient: ClientRecord) => void;
  selectedClient?: ClientRecord | null;
  onClearSelectedClient?: () => void;
}

export const ClientsModule: React.FC<ClientsModuleProps> = ({
  clients,
  onAddClient,
  selectedClient: initialSelectedClient,
  onClearSelectedClient
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entityFilter, setEntityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(initialSelectedClient || null);

  React.useEffect(() => {
    if (initialSelectedClient) {
      setSelectedClient(initialSelectedClient);
    }
  }, [initialSelectedClient]);

  // New Client Form State
  const [formData, setFormData] = useState({
    name: '',
    tradeName: '',
    pan: '',
    gstin: '',
    tan: '',
    entityType: 'Private Limited' as ClientRecord['entityType'],
    state: 'Maharashtra (27)',
    primaryContact: '',
    email: '',
    phone: '',
    assignedTo: 'CA Rohit Mehra'
  });
  const [formError, setFormError] = useState<string | null>(null);

  const filteredClients = clients.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.pan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.gstin.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEntity = entityFilter === 'all' || c.entityType === entityFilter;
    const matchesStatus = statusFilter === 'all' || c.gstStatus === statusFilter || c.itrStatus === statusFilter;

    return matchesSearch && matchesEntity && matchesStatus;
  });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const panClean = formData.pan.toUpperCase().trim();
    const gstinClean = formData.gstin.toUpperCase().trim();

    // Basic PAN validation: 10 chars
    if (panClean.length !== 10) {
      setFormError('PAN must be exactly 10 alphanumeric characters (e.g. AABCB1234F)');
      return;
    }

    // Basic GSTIN validation: 15 chars
    if (gstinClean.length !== 15) {
      setFormError('GSTIN must be exactly 15 characters (e.g. 27AABCB1234F1Z4)');
      return;
    }

    const newClient: ClientRecord = {
      id: `cli-${Date.now()}`,
      name: formData.name,
      tradeName: formData.tradeName || formData.name,
      pan: panClean,
      gstin: gstinClean,
      tan: formData.tan.toUpperCase().trim() || undefined,
      entityType: formData.entityType,
      state: formData.state,
      primaryContact: formData.primaryContact,
      email: formData.email,
      phone: formData.phone,
      assignedTo: formData.assignedTo,
      activeWorkflows: { gst: true, itr: true, tds: Boolean(formData.tan) },
      gstStatus: 'ready_to_file',
      itrStatus: 'in_progress',
      tdsStatus: formData.tan ? 'pending' : 'filed',
      openNotices: 0,
      lastFilingDate: new Date().toISOString().split('T')[0]
    };

    onAddClient(newClient);
    setShowAddModal(false);
    setSelectedClient(newClient);
    setFormData({
      name: '',
      tradeName: '',
      pan: '',
      gstin: '',
      tan: '',
      entityType: 'Private Limited',
      state: 'Maharashtra (27)',
      primaryContact: '',
      email: '',
      phone: '',
      assignedTo: 'CA Rohit Mehra'
    });
  };

  const getStatusBadge = (status: FilingStatus) => {
    switch (status) {
      case 'filed':
        return <span className="text-emerald-700 font-semibold text-xs flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Filed</span>;
      case 'ready_to_file':
        return <span className="text-blue-700 font-semibold text-xs flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Ready to File</span>;
      case 'mismatch':
        return <span className="text-rose-700 font-semibold text-xs flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Mismatch</span>;
      case 'overdue':
        return <span className="text-rose-600 font-semibold text-xs flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Overdue</span>;
      default:
        return <span className="text-amber-700 font-semibold text-xs flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> In Progress</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Client Directory & Profiles</h2>
          <p className="text-xs text-slate-500">
            {clients.length} active client profiles across GST, ITR and TDS compliance portfolios
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-1">
          <input
            type="text"
            placeholder="Search by Client name, PAN, or GSTIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <select
          value={entityFilter}
          onChange={(e) => setEntityFilter(e.target.value)}
          className="py-2 px-3 text-xs bg-white border border-slate-300 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
        >
          <option value="all">All Entity Types</option>
          <option value="Private Limited">Private Limited</option>
          <option value="Public Limited">Public Limited</option>
          <option value="LLP">LLP</option>
          <option value="Partnership">Partnership</option>
          <option value="Individual">Individual</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="py-2 px-3 text-xs bg-white border border-slate-300 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
        >
          <option value="all">All Filing Statuses</option>
          <option value="ready_to_file">Ready to File</option>
          <option value="mismatch">2B Mismatch</option>
          <option value="in_progress">In Progress</option>
          <option value="filed">Filed</option>
        </select>
      </div>

      {/* Main Clients Grid / Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Entity & Legal Name</th>
                <th className="py-3 px-4">Tax Identifiers</th>
                <th className="py-3 px-4">Jurisdiction & Contact</th>
                <th className="py-3 px-4">GSTIN Status</th>
                <th className="py-3 px-4">ITR Status</th>
                <th className="py-3 px-4">Assigned CA</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr 
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={`hover:bg-blue-50/50 transition-colors cursor-pointer ${
                    selectedClient?.id === client.id ? 'bg-blue-50/70' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-medium">
                    <div className="font-bold text-slate-900">{client.name}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span>{client.entityType}</span>
                      {client.tradeName && <span>· {client.tradeName}</span>}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-900 font-semibold">PAN: {client.pan}</div>
                    <div className="font-mono text-[11px] text-slate-500">GST: {client.gstin}</div>
                    {client.tan && <div className="font-mono text-[10px] text-slate-400">TAN: {client.tan}</div>}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-slate-900 font-medium">{client.primaryContact}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{client.email}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {getStatusBadge(client.gstStatus)}
                  </td>

                  <td className="py-3.5 px-4">
                    {getStatusBadge(client.itrStatus)}
                  </td>

                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {client.assignedTo}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClient(client);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Inspect Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Client Detailed Inspection Drawer / Panel */}
      {selectedClient && (
        <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between pb-4 border-b border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                  {selectedClient.entityType}
                </span>
                <span className="text-xs font-medium text-slate-500">{selectedClient.state}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{selectedClient.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Trade Name: {selectedClient.tradeName || selectedClient.name}</p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedClient(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
            {/* Tax registrations */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tax Registrations</h4>
              <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block">Permanent Account Number (PAN)</span>
                  <span className="font-mono text-xs font-bold text-slate-900">{selectedClient.pan}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block">GST Identification Number (GSTIN)</span>
                  <span className="font-mono text-xs font-bold text-blue-600">{selectedClient.gstin}</span>
                </div>
                {selectedClient.tan && (
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Tax Deduction Account Number (TAN)</span>
                    <span className="font-mono text-xs font-bold text-slate-900">{selectedClient.tan}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Compliance Workflows & Status */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Filing Trackers</h4>
              <div className="p-3 bg-slate-50 rounded-xl space-y-2.5 border border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">GST Monthly (GSTR-3B)</span>
                  {getStatusBadge(selectedClient.gstStatus)}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">Income Tax (AY 2026-27)</span>
                  {getStatusBadge(selectedClient.itrStatus)}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">TDS Return (Q2)</span>
                  {getStatusBadge(selectedClient.tdsStatus)}
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                  <span className="font-medium text-slate-700">Department Notices</span>
                  <span className={`font-bold tabular-nums ${selectedClient.openNotices > 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                    {selectedClient.openNotices} Open
                  </span>
                </div>
              </div>
            </div>

            {/* Contact & Assignment */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Team & Contact</h4>
              <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block">Primary Signatory</span>
                  <span className="text-xs font-semibold text-slate-900">{selectedClient.primaryContact}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="tabular-nums">{selectedClient.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedClient.email}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 text-xs">
                  <span className="text-slate-500">Lead CA Partner: </span>
                  <span className="font-bold text-slate-900">{selectedClient.assignedTo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Add New Tax Client</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateClient} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Legal Entity Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Industrial Solutions Pvt Ltd"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Entity Type *</label>
                  <select
                    value={formData.entityType}
                    onChange={(e) => setFormData({ ...formData, entityType: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  >
                    <option value="Private Limited">Private Limited</option>
                    <option value="Public Limited">Public Limited</option>
                    <option value="LLP">LLP</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Individual">Individual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State & Code *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  >
                    <option value="Maharashtra (27)">Maharashtra (27)</option>
                    <option value="Karnataka (29)">Karnataka (29)</option>
                    <option value="Delhi (07)">Delhi (07)</option>
                    <option value="Gujarat (24)">Gujarat (24)</option>
                    <option value="Haryana (06)">Haryana (06)</option>
                    <option value="Tamil Nadu (33)">Tamil Nadu (33)</option>
                    <option value="West Bengal (19)">West Bengal (19)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">PAN (10-digit) *</label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    placeholder="AAACX1234K"
                    value={formData.pan}
                    onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 text-xs font-mono uppercase rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN (15-digit) *</label>
                  <input
                    type="text"
                    required
                    maxLength={15}
                    placeholder="27AAACX1234K1Z2"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 text-xs font-mono uppercase rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">TAN (Optional)</label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="MUMB12345K"
                    value={formData.tan}
                    onChange={(e) => setFormData({ ...formData, tan: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 text-xs font-mono uppercase rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned CA Member</label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  >
                    <option value="CA Rohit Mehra">CA Rohit Mehra</option>
                    <option value="Pooja Agarwal (Senior Associate)">Pooja Agarwal (Senior Associate)</option>
                    <option value="Arun Verma (Associate)">Arun Verma (Associate)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Signatory *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.primaryContact}
                    onChange={(e) => setFormData({ ...formData, primaryContact: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="accounts@apex.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs cursor-pointer"
                >
                  Save & Add to Compliance Registry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
