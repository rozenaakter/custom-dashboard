"use client";
import { useStore } from "@/store/useStore";
import { ThemeColor, THEMES } from "@/types";
import { Palette } from "lucide-react";

const ThemeSelector = () => {
  const theme = useStore((state) => state.theme);
  console.log("🚀 ~ ThemeSelector ~ theme:", theme);
  const setTheme = useStore((state) => state.setTheme);
  const currentTheme = THEMES[theme];
  const themeColors: { color: ThemeColor; displayName: string }[] = [
    { color: "purple", displayName: "Purple" },
    { color: "blue", displayName: "Blue" },
    { color: "green", displayName: "Green" },
    { color: "orange", displayName: "Orange" },
    { color: "pink", displayName: "Pink" },
    { color: "teal", displayName: "Teal" },
  ];
  return (
    <div className="relative group">
      <button
        className={`${currentTheme.primary} ${currentTheme.hover}px-4 py-2 rounded-lg text-slate-700 flex items-center gap-2 transition-colors`}
      >
        <Palette />
        <span className="hidden sm:inline">Theme</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2 space-y-1">
          {themeColors.map(({ color, displayName }) => (
            <button
              key={color}
              onClick={() => setTheme(color)}
              className={`${
                theme === color
                  ? "bg-slate-700 text-white"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
              } w-full px-4 py-2 rounded-lg text-left flex items-center gap-3 transition-colors`}
            >
              <div
                className={`w-4 h-4 rounded-full ${THEMES[color].primary}`}
              />
              <span>{displayName}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
