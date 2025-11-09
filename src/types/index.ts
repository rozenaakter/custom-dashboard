export type ThemeColor =
  | "purple"
  | "blue"
  | "green"
  | "orange"
  | "pink"
  | "teal";

export type WidgetType = "notes" | "tasks" | "calendar";

export interface Note {
  id: string;
  content: string;
  createAt: Date;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  color:string;
}


export interface CalenderEvent {
  id:string;
  title:string;
  date: Date;
  color: string;
}

export interface Theme {
  name: ThemeColor;
  primary: string;
  secondary: string;
  gradient: string;
  hover: string;
  light: string;
}

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  position: number;
}

export const THEMES: Record<ThemeColor, Theme> = {
  purple: {
    name: "purple",
    primary: "bg-purple-500",
    secondary: "bg-purple-600",
    gradient: "from-slate-900 via-purple-900 to-slate-900",
    hover: "hover:bg-purple-600",
    light: "bg-purple-400",
  },
  blue: {
    name: "blue",
    primary: "bg-blue-500",
    secondary: "bg-blue-600",
    gradient: "from-slate-900 via-blue-900 to-slate-900",
    hover: "hover:bg-blue-600",
    light: "bg-blue-400",
  },
  green: {
    name: "green",
    primary: "bg-green-500",
    secondary: "bg-green-600",
    gradient: "from-slate-900 via-green-900 to-slate-900",
    hover: "hover:bg-green-600",
    light: "bg-green-400",
  },
  orange: {
    name: "orange",
    primary: "bg-orange-500",
    secondary: "bg-orange-600",
    gradient: "from-slate-900 via-orange-900 to-slate-900",
    hover: "hover:bg-orange-600",
    light: "bg-orange-400",
  },
  pink: {
    name: "pink",
    primary: "bg-pink-500",
    secondary: "bg-pink-600",
    gradient: "from-slate-900 via-pink-900 to-slate-900",
    hover: "hover:bg-pink-600",
    light: "bg-pink-400",
  },
  teal: {
    name: "teal",
    primary: "bg-teal-500",
    secondary: "bg-teal-600",
    gradient: "from-slate-900 via-teal-900 to-slate-900",
    hover: "hover:bg-teal-600",
    light: "bg-teal-400",
  },
};
