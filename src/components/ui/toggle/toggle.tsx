import * as React from 'react';
import { cn } from '../../../lib/utils';

interface toggleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const toggle = React.forwardRef<HTMLDivElement, toggleProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-4 rounded-xl shadow-neu bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900', className)}
        {...props}
      />
    );
  }
);
toggle.displayName = 'toggle';
