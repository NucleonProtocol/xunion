import { Button } from 'antd';
import { PropsWithChildren } from 'react';
import { cn } from '@/utils/classnames.ts';

const ResponsiveButton = ({
  disabled,
  onClick,
  children,
  className,
}: PropsWithChildren<{
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}>) => {
  return (
    <>
      <Button
        type="text"
        ghost
        className={cn('text-theme max-md:hidden', className)}
        size="small"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
      <Button
        type="primary"
        className={cn('flex-1 rounded-[16px] md:hidden', className)}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
};

export default ResponsiveButton;
