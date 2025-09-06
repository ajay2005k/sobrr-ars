import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GoalsStackParamList } from '../types/navigation';

// Import screens
import GoalsScreen from '../screens/app/GoalsScreen';
import GoalSetupScreen from '../screens/goals/GoalSetupScreen';
import ProgressScreen from '../screens/goals/ProgressScreen';

const Stack = createStackNavigator<GoalsStackParamList>();

const GoalsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="GoalsHome"
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
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="GoalsHome" 
        component={GoalsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="GoalSetup" 
        component={GoalSetupScreen}
        options={{
          title: 'Goal Setup',
        }}
      />
      <Stack.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{
          title: 'Progress Overview',
        }}
      />
    </Stack.Navigator>
  );
};

export default GoalsNavigator;
