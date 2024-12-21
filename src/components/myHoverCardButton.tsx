'use client';
import 'client-only';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
interface ButtonProps {
  children: React.ReactNode; // 按鈕內容
  onClick?: () => void; // 點擊事件處理
  className?: string; // 自定義類名
  hoverCardContent?: string;
  openLink?: string; // 打開連結
  openPage?: string; // 打開頁面
}
const MyHoverCardButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  hoverCardContent,
  openLink,
  openPage,
}) => {
  const router = useRouter();
  const tailwindCss = className
    ? className
    : 'flex items-center hover:cursor-pointer p-1 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-100 hover:text-black transition duration-200';
  const handleClick = () => {
    if (openLink) {
      window.open(openLink, '_blank', 'noreferrer noopener');
    }
    if (openPage) {
      router.push(openPage);
    }
    if (onClick) {
      onClick();
    }
  };
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger>
        <div className={cn(tailwindCss)} onClick={handleClick}>
          {children}
        </div>
      </HoverCardTrigger>
      {hoverCardContent && (
        <HoverCardContent className='whitespace-normal break-words'>
          {hoverCardContent}
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export default MyHoverCardButton;
