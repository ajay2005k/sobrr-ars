import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Import navigators
import AuthNavigator from './navigators/AuthNavigator';
import AppNavigator from './navigators/AppNavigator';
import { AppProvider, useApp } from './contexts/AppContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const AppContent: React.FC = () => {
  const { hasCompletedOnboarding, isAuthenticated } = useApp();

  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Determine which navigator to show
  const renderNavigator = () => {
    if (!hasCompletedOnboarding) {
      return <AuthNavigator />;
    }
    
    if (isAuthenticated) {
      return <AppNavigator />;
    }
    
    return <AppNavigator />; // Show main app after onboarding even if not authenticated
  };

  return (
    <>
      <NavigationContainer>
        {renderNavigator()}
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
