import * as React from 'react';
import { cn } from '../../../lib/utils';

interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

export const NeuCard = React.forwardRef<HTMLDivElement, NeuCardProps>(
  ({ className, inset, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'p-6 rounded-3xl bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
          inset ? 'shadow-neu-inset' : 'shadow-neu',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NeuCard.displayName = 'NeuCard';