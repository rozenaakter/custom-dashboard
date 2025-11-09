import { useStore } from '@/store/useStore';
import { THEMES } from '@/types';
import { toTitleCase } from '@/utils/textUlits';
import { CalendarIcon, Plus, X, Edit, Save, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

const COLORS = ["bg-yellow-200", "bg-pink-200", "bg-blue-200", "bg-green-200"];

const CalendarWidget = () => {
  const [newEvent, setNewEvent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editEventTitle, setEditEventTitle] = useState("");
  
  const theme = useStore((state) => state.theme);
  const events = useStore((state) => state.events);
  const deleteEvent = useStore((state) => state.deleteEvent);
  const addEvent = useStore((state) => state.addEvent);
  const updateCalender = useStore((state) => state.updateCalender);

  const currentTheme = THEMES[theme];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.trim() && selectedDate) {
      const titleCaseCalender = toTitleCase(newEvent.trim())
      addEvent({
        title: titleCaseCalender,
        date: new Date(selectedDate),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
      setNewEvent("");
      setSelectedDate("");
    }
  };

  const handleEdit = (event: any) => {
    setEditingEventId(event.id);
    setEditEventTitle(event.title);
  };

  const handleSaveEdit = (eventId: string) => {
    if (editEventTitle.trim()) {
      updateCalender(eventId, editEventTitle);
      setEditingEventId(null);
      setEditEventTitle("");
    }
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
    setEditEventTitle("");
  };

  const handleDelete = (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventId);
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Event Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          placeholder="Event title..."
          className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className={`${currentTheme.primary} ${currentTheme.hover} px-4 py-2 text-white rounded-lg transition-colors`}
          >
            <Plus size={20} />
          </button>
        </div>
      </form>

      {/* Events List */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {events.length === 0 ? (
          <p className="text-slate-300 text-center py-8">No events scheduled</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className={`${event.color} flex items-start gap-3 p-3 rounded-lg text-slate-900 group`}
            >
              <div className={`w-1 h-full rounded-full`} />
              <CalendarIcon size={20} className="text-slate-400 mt-0.5" />
              
              <div className="flex-1">
                {editingEventId === event.id ? (
                  // Edit Mode
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editEventTitle}
                      onChange={(e) => setEditEventTitle(e.target.value)}
                      className="w-full px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(event.id)}
                        className={`${currentTheme.primary} px-3 py-1 text-white text-sm rounded transition-colors`}
                      >
                        <Save size={14} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 px-3 py-1 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <p className="text-white font-medium">{event.title}</p>
                    <p className="text-slate-400 text-sm">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              {editingEventId !== event.id && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;