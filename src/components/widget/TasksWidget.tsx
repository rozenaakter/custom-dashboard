import { useStore } from "@/store/useStore";
import { Task, THEMES } from "@/types";
import { Edit, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toTitleCase } from './../../utils/textUlits';

const COLORS = ["bg-yellow-200", "bg-pink-200", "bg-blue-200", "bg-green-200", "bg-orange-200"];

const TasksWidget = () => {
  const [newTask, setNewTask] = useState<string>("");
  const theme = useStore((state) => state.theme);
  const tasks = useStore((state) => state.tasks);
  const addTask = useStore((state) => state.addTask);
  const deleteTask = useStore((state) => state.deleteTask);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const updateTask = useStore((state) => state.updateTask)

  const currentTheme = THEMES[theme];

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const titleCaseTask = toTitleCase(newTask.trim())
      addTask({
        title: titleCaseTask, // ← এখানে সংশোধন করা হয়েছে
        completed:false,
        color:COLORS[Math.floor(Math.random() * COLORS.length)],
        dueDate:new Date(),
      });
      setNewTask("");
    }
  };

  // Edit Task
  const handleEdit = (task:Task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  // update task
  const handleUpdate = (id: string) =>{
    if(editText.trim()){
      const titleCaseText = toTitleCase(editText.trim());
      updateTask(id, titleCaseText);
      setEditingId(null);
      setEditText("")
    }
  };

  // cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setEditText("");
  }

  return <div className="space-y-4">
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input type="text" 
        value={newTask}
        onChange={(e) => setNewTask(toTitleCase(e.target.value))} // ← এখানে সংশোধন করা হয়েছে (ঐচ্ছিক)
        placeholder="Add a new task..." 
        className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-white/50" 
      />
      <button
        type = "submit"  
        className= {`${currentTheme.primary} ${currentTheme.hover} px-4 py-2 text-white rounded-lg transition-colors`}>
        <Plus size={20} />
      </button>
    </form>

    <div className="space-y-2 max-h-80 overflow-y-auto">
      {tasks.length === 0 ? (
        <p className="text-slate-300 text-center py-8">No Task yet.Add a Task Please..!</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className= {`${task.color} p-4 rounded-lg shadow-md text-slate-900 group relative`}>
            {
              editingId === task.id ? (
                <div className="space-y-2">
                  <input type="text" 
                    value={editText}
                    onChange={(e) => setEditText(toTitleCase(e.target.value))} // ← এখানে সংশোধন করা হয়েছে (ঐচ্ছিক)
                    className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleUpdate(task.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="pr-16">{task.title}</p>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => handleEdit(task)}
                      className="p-1 opacity-70 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-blue-600"
                    >
                      <Edit size={20} className="text-green-500 font-bold" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1 opacity-90 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-red-300"
                    >
                      <Trash2 size={20} className="text-red-500 font-bold"/>
                    </button>
                  </div>
                </>
              )
            }
          </div>
        ))
      )}
    </div>
  </div>;
};

export default TasksWidget;