import { cn } from '@/lib/utils';

const Loading = ({
  className,
  loadingSize,
}: {
  className?: string;
  loadingSize?: string;
}) => {
  return (
    <div className={cn('flex justify-center items-center', className)}>
      <div className={cn('loading-spinner', loadingSize)}></div>
    </div>
  );
};

export default Loading;
