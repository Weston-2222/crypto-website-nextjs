import { cn } from '@/lib/utils';

const Loading = ({ className }: { className?: string }) => {
  return <div className={cn('loading-spinner', className)}></div>;
};

export default Loading;
