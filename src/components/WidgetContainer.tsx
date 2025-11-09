import { Widget } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip, X } from "lucide-react";
import { FC, ReactNode } from "react";

type Props = {
  widget: Widget;
  children: ReactNode;
};
const WidgetContainer: FC<Props> = ({ widget, children }) => {
  const {
    attributes,listeners,setNodeRef,transform,transition,isDragging,
  } = useSortable({id:widget.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, 
  };


  return (
    <div ref={setNodeRef}
    style={style}
    className= {`bg-white/10 backdrop-blur-lg roundrd-2xl p-6 shadow-2xl border border-white/20 hover:border-white/40 transition-all animate-fade-in ${isDragging ? "z-50 scale-105" : ""} `}
    
    >
    
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">

          <button
            {...attributes}
            {...listeners}
            className="text-green-400 hover:text-white cursor-grab active:cursor-grabbing transition-colors"
            aria-label="Drag to reorder"
          >
            <Grip  size = {20} />
          </button>

          <h2 className="text-xl font-semibold text-white">{widget.title}</h2>
        </div>
        <button>
          <X size={20} />
        </button>
      </div>
      <div>{children}</div>
    </div>
    
  );
};

export default WidgetContainer;
