const WidgetSkeleton = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white/20 rounded"></div>
          <div className="h-6 w-32 bg-white/20 rounded"></div>
        </div>
        <div className="w-5 h-5 bg-white/20 rounded"></div>
      </div>
      {/* content skeleton */}
      <div className="space-y-3">
        <div className="h-10 bg-white/20 rounded-lg"></div>
        <div className="h-16 bg-white/80 rounded-lg"></div>
        <div className="h-16 bg-white/20 rounded-lg"></div>
        <div className="h-16 bg-white/20 rounded-lg"></div>
      </div>
    </div>
  );
};

export default WidgetSkeleton;
