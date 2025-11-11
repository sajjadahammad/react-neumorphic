import * as React from 'react';

interface NeuTheme {
  mode: 'light' | 'dark';
}

const NeuContext = React.createContext<NeuTheme>({ mode: 'light' });

export const NeuProvider: React.FC<{ children: React.ReactNode; theme?: Partial<NeuTheme> }> = ({
  children,
  theme,
}) => {
  const value = { mode: theme?.mode || 'light' };

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', value.mode === 'dark');
  }, [value.mode]);

  return <NeuContext.Provider value={value}>{children}</NeuContext.Provider>;
};