import { useStore } from "@/store/useStore";
import { THEMES } from "@/types";
import { toTitleCase } from "@/utils/textUlits";
import { Edit, Plus, Save, Trash2, X } from "lucide-react";
import React, { useState } from "react";


const COLORS = ["bg-yellow-200", "bg-pink-200", "bg-blue-200", "bg-green-200", "bg-orange-200"];

const NotesWidget = () => {
  const [newNote, setNewNote] = useState<string>("");
  const theme = useStore((state) => state.theme);
  const notes = useStore((state) => state.notes);
  const addNote = useStore((state) => state.addNote);
  const deleteNote = useStore((state) => state.deleteNote);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const updateNote = useStore((state) => state.updateNote);

  console.log("🚀 ~ NotesWidget ~ notes:", notes);
  const currentTheme = THEMES[theme];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      const titleCaseNote = toTitleCase(newNote.trim())
      addNote({
        content: titleCaseNote,
        createAt: new Date(),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
      setNewNote("");
    }
  };

  // edit note
  const handleEdit = (note: any) => {
    setEditingId(note.id);
    setEditText(note.content);
  };
  // update function
  const handleUpdate = (id: string) => {
    if (editText.trim()) {
      const titleCaseNote = toTitleCase(editText.trim());
      updateNote(id, titleCaseNote);
      setEditingId(null);
      setEditText("")
    } 
  };

  // cancel edit
  const handleCancle = () => {
    setEditingId(null);
    setEditText("");
  };



  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(toTitleCase(e.target.value))}
          placeholder="Add a quick note..."
          className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="submit"
          className={`${currentTheme.primary} ${currentTheme.hover} px-4 py-2 text-white rounded-lg transition-colors`}
        >
          <Plus size={20} />
        </button>
      </form>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {notes.length === 0 ? (
          <p className="text-slate-300 text-center py-8">
            No notes yet. Add one!
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`${note.color} p-4 rounded-lg shadow-md text-slate-900 group relative`}
            >
             {editingId === note.id ? (
                // এডিট মোডে থাকলে ইনপুট ফিল্ড দেখাবে
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(toTitleCase(e.target.value))}
                    className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleUpdate(note.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={handleCancle}
                      className="px-3 py-1 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                // সাধারণ মোডে থাকলে নোটের কন্টেন্ট দেখাবে
                <>
                  <p className="pr-16">{note.content}</p>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => handleEdit(note)}
                      className="p-1 opacity-70 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-blue-600"
                    >
                      <Edit size={20} className="text-green-500 font-bold" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1 opacity-70 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-red-600"
                    >
                      <Trash2 size={20} className="text-red-500 font-bold"/>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default NotesWidget;
 