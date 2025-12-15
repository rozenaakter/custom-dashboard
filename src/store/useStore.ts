import { Note, ThemeColor, Widget, Task, CalenderEvent } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DashboardStore {
  // theme
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;

  // widgets
  widgets: Widget[];
  // addWidget: (widget: Widget) => void;
  // removeWidget: (id: string) => void;
  reorderWidgets: (widgets: Widget[]) => void; // এই function implement করতে হবে

  // Notes
  notes: Note[];
  addNote: (note: Omit<Note, "id">) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, updatedContent: string) => void;

  //Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updateTaskContent: string) => void;

  // calender
  events: CalenderEvent[];
  addEvent: (event: Omit<CalenderEvent, "id">) => void;
  deleteEvent: (id: string) => void;
  updateCalender: (id: string, updateCalenderContent: string) => void;

  // Hydration state
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      // Hydration state
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },

      // theme
      theme: "purple",
      setTheme: (theme) => set({ theme }),

      // Widgets
      widgets: [
        { id: "1", type: "notes", title: "Quick Notes", position: 0 },
        { id: "2", type: "tasks", title: "My Tasks", position: 1 },
        { id: "3", type: "calendar", title: "Calendar", position: 2 },
      ],

      // reorderWidgets function implement 
      reorderWidgets: (reorderedWidgets) => 
        set({ widgets: reorderedWidgets }),

      // notes
      notes: [],
      addNote: (note) =>
        set((state) => ({
          notes: [...state.notes, { ...note, id: crypto.randomUUID() }],
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),

      // edit note
      updateNote: (id, updatedContent) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, content: updatedContent } : note
          ),
        })),

      // tasks
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }],
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      updateTask: (id, updateTaskContent) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, title: updateTaskContent } : task
          ),
        })),

      // calender event 
      events: [],
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, { ...event, id: crypto.randomUUID() }],
        })),
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((n) => n.id !== id),
        })),
      updateCalender: (id, updateCalenderContent) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, title: updateCalenderContent } : event
          ),
        })),
    }),
    {
      name: "dashboard-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        notes: state.notes,
        tasks: state.tasks,
        events: state.events,
        widgets: state.widgets
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);