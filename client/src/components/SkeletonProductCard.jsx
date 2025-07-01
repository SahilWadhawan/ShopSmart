const SkeletonProductCard = () => {
  return (
    <div className="animate-pulse bg-card-bg/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
      <div className="bg-gray-800 h-48 rounded-t-2xl"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-600 rounded w-1/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;