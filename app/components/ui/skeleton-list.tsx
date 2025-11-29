interface SkeletonListProps {
  items: number;
}

const SkeletonList = ({ items = 10 }: SkeletonListProps) => {
  return (
    <ul className="space-y-3.5">
      {Array.from({ length: items }).map((_, index) => (
        <li key={index} className="animate-pulse">
          <div className="h-14 bg-gray-200 rounded" />
        </li>
      ))}
    </ul>
  );
};

export default SkeletonList;
