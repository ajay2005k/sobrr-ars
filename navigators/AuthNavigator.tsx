import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../types/navigation';

// Import screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import AddictionTypeScreen from '../screens/auth/AddictionTypeScreen';
import QuitDateScreen from '../screens/auth/QuitDateScreen';
import SupportStyleScreen from '../screens/auth/SupportStyleScreen';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="AddictionType" 
        component={AddictionTypeScreen}
        options={{
          title: 'Select Addiction Type',
          headerLeft: () => null, // Disable back button for onboarding flow
        }}
      />
      <Stack.Screen 
        name="QuitDate" 
        component={QuitDateScreen}
        options={{
          title: 'Choose Quit Date',
        }}
      />
      <Stack.Screen 
        name="SupportStyle" 
        component={SupportStyleScreen}
        options={{
          title: 'Support Preference',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
