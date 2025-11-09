"use client";
import { useHydration } from "@/hooks/useHydration";
import { useStore } from "@/store/useStore";
import { THEMES } from "@/types";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import DashboardSkeleton from "./skeletons/DashboardSkeleton";
import ThemeSelector from "./ThemeSelector";
import WidgetContainer from "./WidgetContainer";
import NotesWidget from "./widget/NotesWidget";
import TasksWidget from "./widget/TasksWidget";
import CalendarWidget from "./widget/CalendarWidget";


const Dashboard = () => {
  const hydrated = useHydration();
  const theme = useStore((state) => state.theme);
  const widgets = useStore((state) => state.widgets);
  const reorderWidgets = useStore((state) => state.reorderWidgets);

  const currentTheme = THEMES[theme];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = widgets.findIndex((w) => w.id === active.id);
      const newIndex = widgets.findIndex((w) => w.id === over.id);
      const reordered = arrayMove(widgets, oldIndex, newIndex).map(
        (widget, index) => ({
          ...widget,
          position: index,
        })
      );
      reorderWidgets(reordered);
    }
  };
  const renderWiget = (widget: any) => {
    switch (widget.type) {
      case "notes":
        return <NotesWidget />;
      case "tasks":
        return <TasksWidget />;
      case "calendar":
        return <CalendarWidget />;
      default:
        return null;
    }
  };
  if (!hydrated) {
    return <DashboardSkeleton />;
  }
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient} p-6 transition-all duration-500`}
    >
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
          <p className="text-slate-300">
            Our Custom Dragable widgets and Theme.
          </p>
        </div>
        <ThemeSelector />
      </header>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={widgets.map((w) => w.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {widgets.map((widget) => (
              <WidgetContainer key={widget.id} widget={widget}>
                {renderWiget(widget)}
              </WidgetContainer>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Dashboard;
