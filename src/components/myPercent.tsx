import {
  IconArrowBadgeDownFilled,
  IconArrowBadgeUpFilled,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const MyPercent = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  const color = value < 0 ? 'text-red-500' : 'text-green-500';

  return typeof value === 'number' ? (
    <div className={cn('flex items-center gap-0.5', color, className)}>
      {value < 0 ? <IconArrowBadgeDownFilled /> : <IconArrowBadgeUpFilled />}
      <span>{value.toFixed(2)}%</span>
    </div>
  ) : (
    <></>
  );
};

export default MyPercent;
