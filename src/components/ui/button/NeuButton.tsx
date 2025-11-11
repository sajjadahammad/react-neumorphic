import * as React from 'react';
import { cn } from '../../../lib/utils';

interface NeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'soft' | 'glass';
}

const variants = {
  default: 'shadow-neu hover:shadow-neu-pressed active:shadow-neu-pressed',
  soft: 'shadow-lg hover:shadow-xl active:shadow-md',
  glass: 'bg-white/20 backdrop-blur-md border border-white/30 shadow-lg',
};

export const NeuButton = React.forwardRef<HTMLButtonElement, NeuButtonProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'px-6 py-3 rounded-2xl font-medium transition-all duration-200',
          'bg-linear-to-br from-gray-50 to-gray-100 text-gray-800',
          'dark:from-gray-800 dark:to-gray-900 dark:text-gray-100',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
NeuButton.displayName = 'NeuButton';