import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsStackParamList } from '../types/navigation';

// Import screens
import SettingsScreen from '../screens/app/SettingsScreen';
import NotificationSettingsScreen from '../screens/app/NotificationSettingsScreen';

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsHome"
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
        name="SettingsHome" 
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="NotificationSettings" 
        component={NotificationSettingsScreen}
        options={{
          title: 'Notification Settings',
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
