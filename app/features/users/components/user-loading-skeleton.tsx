interface UserLoadingSkeletonProps {
  count: number;
}

export function UserLoadingSkeleton({ count }: UserLoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="h-64 bg-slate-100 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}
