import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  User, 
  X,
  CalendarDays
} from 'lucide-react';
import { CalendarEvent } from '../../types';

interface CalendarModuleProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onToggleComplete: (id: string) => void;
}

export const CalendarModule: React.FC<CalendarModuleProps> = ({
  events,
  onAddEvent,
  onToggleComplete
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'GST' | 'ITR' | 'TDS' | 'ROC'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'GST' | 'ITR' | 'TDS' | 'ROC'>('GST');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [assignedTo, setAssignedTo] = useState('CA Rohit Mehra');

  const filteredEvents = events.filter(
    e => filterCategory === 'all' || e.category === filterCategory
  );

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDueDate) return;

    onAddEvent({
      id: `task-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      dueDate: newDueDate,
      description: newDesc,
      isStatutory: false,
      priority: 'Regular',
      assignedTo,
      completed: false
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewDueDate('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      
      {/* Title Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
              Indian Statutory Tax Calendar
            </span>
            <span className="text-xs text-slate-500 font-medium">Finance Act & GST Rules</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Compliance Deadlines & Task Scheduler
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Never miss a statutory filing date for GST, Corporate Tax Audits, Advance Tax installments, or TDS payments
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Client Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
          {(['all', 'GST', 'ITR', 'TDS', 'ROC'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'All Deadlines' : cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500">
          Tracking <span className="font-bold text-slate-900">{filteredEvents.length}</span> compliance milestones
        </div>
      </div>

      {/* Deadlines List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className={`p-4 rounded-2xl border transition-all ${
              evt.completed
                ? 'bg-slate-50 border-slate-200 opacity-60'
                : 'bg-white border-slate-200 shadow-xs hover:border-blue-400'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  evt.category === 'GST' ? 'bg-blue-100 text-blue-800' :
                  evt.category === 'ITR' ? 'bg-purple-100 text-purple-800' :
                  evt.category === 'TDS' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {evt.category}
                </span>
                {evt.isStatutory && (
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    Statutory Rule
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => onToggleComplete(evt.id)}
                className={`text-xs font-semibold px-2 py-1 rounded-lg border transition-colors cursor-pointer ${
                  evt.completed
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {evt.completed ? 'Completed' : 'Mark Done'}
              </button>
            </div>

            <h3 className={`text-sm font-bold ${evt.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
              {evt.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{evt.description}</p>

            <div className="flex items-center justify-between text-xs pt-3 mt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-rose-600 font-bold tabular-nums">
                <Clock className="w-3.5 h-3.5" />
                <span>Due: {evt.dueDate}</span>
              </div>

              {evt.assignedTo && (
                <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>{evt.assignedTo}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Add Compliance Task</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Task / Milestone Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Verify GSTR-3B ITC for Bharat Logistics"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  >
                    <option value="GST">GST</option>
                    <option value="ITR">ITR</option>
                    <option value="TDS">TDS</option>
                    <option value="ROC">ROC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assignee</label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                >
                  <option value="CA Rohit Mehra">CA Rohit Mehra</option>
                  <option value="Pooja Agarwal">Pooja Agarwal (Senior Associate)</option>
                  <option value="Arun Verma">Arun Verma (Associate)</option>
                  <option value="Sneha Kulkarni">Sneha Kulkarni (Reviewer)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Client notes, invoice references..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
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
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
