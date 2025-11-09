import WidgetSkeleton from "./WidgetSkeleton";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header skeleton */}
      <header className="mb-8 animate-pulse">
        <div className="h-10 w-64 bg-white/20 rounded mb-2"></div>
        <div className="h-5 w-96 bg-white/20 rounded"></div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* widgets grid skeleton */}
        <WidgetSkeleton />
        <WidgetSkeleton />
        <WidgetSkeleton />
        <WidgetSkeleton />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
