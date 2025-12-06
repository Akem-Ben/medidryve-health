import React from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  showGradientBg?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  className,
  showGradientBg = false 
}) => {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div 
        className={cn(
          "mobile-container bg-background shadow-2xl rounded-[2.5rem] overflow-hidden relative",
          showGradientBg && "bg-gradient-splash",
          className
        )}
        style={{ 
          minWidth: '420px',
          minHeight: '932px',
          height: 'auto'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
