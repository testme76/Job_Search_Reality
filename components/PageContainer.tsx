import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl';
}

export default function PageContainer({ children, maxWidth = '4xl' }: PageContainerProps) {
  return (
    <div className={`max-w-${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-12`}>
      {children}
    </div>
  );
}
