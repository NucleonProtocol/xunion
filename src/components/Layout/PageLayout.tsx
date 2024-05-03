'use client';

import PageHeader from '@/components/Layout/PageHeader';
import { PropsWithChildren } from 'react';
import { useTheme } from 'next-themes';

const PageLayout = ({ children }: PropsWithChildren) => {
  const { theme = '', systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';
  if (!currentTheme) {
    return children;
  }
  return (
    <div>
      <PageHeader />
      {children}
    </div>
  );
};

export default PageLayout;
