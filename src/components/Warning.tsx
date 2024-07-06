import { PropsWithChildren } from 'react';

const Warning = ({ children }: PropsWithChildren) => {
  return (
    <div className="rounded-[8px] bg-status-warning-non-opaque p-[12px] text-[14px]">
      {children}
    </div>
  );
};

export default Warning;
