const SkeletonProductCard = () => {
  return (
    <div className="bg-card-bg/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg overflow-hidden">
      <div className="h-48 bg-gray-800 shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-700 shimmer rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 shimmer rounded w-2/3"></div>
        <div className="h-4 bg-gray-600 shimmer rounded w-1/4"></div>
        <div className="h-3 bg-gray-700 shimmer rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;