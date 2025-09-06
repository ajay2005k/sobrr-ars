import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CravingToolsStackParamList } from '../types/navigation';

// Import screens
import CravingToolsScreen from '../screens/app/CravingToolsScreen';
import SOSScreen from '../screens/cravingTools/SOSScreen';
import BreathingExerciseScreen from '../screens/cravingTools/BreathingExerciseScreen';
import JournalingScreen from '../screens/cravingTools/JournalingScreen';
import DistractionToolsScreen from '../screens/cravingTools/DistractionToolsScreen';
import MiniGamesScreen from '../screens/cravingTools/MiniGamesScreen';
import RelapseScreen from '../screens/cravingTools/RelapseScreen';
import RoutineBuilderScreen from '../screens/app/RoutineBuilderScreen';
import ReminderSetupScreen from '../screens/app/ReminderSetupScreen';

const Stack = createStackNavigator<CravingToolsStackParamList>();

const CravingToolsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="CravingToolsHome"
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
        name="CravingToolsHome" 
        component={CravingToolsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="SOS" 
        component={SOSScreen}
        options={{
          title: 'Emergency Support',
        }}
      />
      <Stack.Screen 
        name="BreathingExercise" 
        component={BreathingExerciseScreen}
        options={{
          title: 'Breathing Exercise',
        }}
      />
      <Stack.Screen 
        name="Journaling" 
        component={JournalingScreen}
        options={{
          title: 'Craving Journal',
        }}
      />
      <Stack.Screen 
        name="DistractionTools" 
        component={DistractionToolsScreen}
        options={{
          title: 'Distraction Activities',
        }}
      />
      <Stack.Screen 
        name="MiniGames" 
        component={MiniGamesScreen}
        options={{
          title: 'Mini Games',
        }}
      />
      <Stack.Screen 
        name="Relapse" 
        component={RelapseScreen}
        options={{
          title: 'Relapse Support',
        }}
      />
      <Stack.Screen 
        name="RoutineBuilder" 
        component={RoutineBuilderScreen}
        options={{
          title: 'Routine Builder',
        }}
      />
      <Stack.Screen 
        name="ReminderSetup" 
        component={ReminderSetupScreen}
        options={{
          title: 'Reminder Setup',
        }}
      />
    </Stack.Navigator>
  );
};

export default CravingToolsNavigator;
