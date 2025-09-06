import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
  onboardingData: {
    addictionType?: string;
    quitDate?: string;
    supportStyle?: string;
  };
  setOnboardingData: (data: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboardingData, setOnboardingData] = useState({});

  return (
    <AppContext.Provider
      value={{
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        isAuthenticated,
        setIsAuthenticated,
        onboardingData,
        setOnboardingData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
