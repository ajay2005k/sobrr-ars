import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Text } from 'react-native';
import { AppTabParamList } from '../types/navigation';

// Import screens
import TrackerScreen from '../screens/app/TrackerScreen';
import CravingToolsNavigator from './CravingToolsNavigator';
import GoalsNavigator from './GoalsNavigator';
import ContentScreen from '../screens/app/ContentScreen';
import SettingsNavigator from './SettingsNavigator';
import RecoveryModeScreen from '../screens/app/RecoveryModeScreen';

// Using text-based icons for now - you can replace with proper icon library later
const TabBarIcon = ({ routeName, focused, size = 24 }: { routeName: string; focused: boolean; size?: number }) => {
  const iconMap: { [key: string]: string } = {
    Tracker: '📊',
    CravingTools: '🛠️',
    Goals: '🎯',
    Content: '📚',
    Settings: '⚙️',
    RecoveryMode: '🎯',
  };
  
  const icon = iconMap[routeName] || '📱';
  
  return (
    <Text style={{ fontSize: size }}>
      {icon}
    </Text>
  );
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Tracker"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon routeName={route.name} focused={focused} size={size} />
        ),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          height: Platform.OS === 'ios' ? 88 : 68,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
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
      })}
    >
      <Tab.Screen 
        name="Tracker" 
        component={TrackerScreen}
        options={{
          title: 'Tracker',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="CravingTools" 
        component={CravingToolsNavigator}
        options={{
          title: 'Tools',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Goals" 
        component={GoalsNavigator}
        options={{
          title: 'Goals',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Content" 
        component={ContentScreen}
        options={{
          title: 'Content',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="RecoveryMode" 
        component={RecoveryModeScreen}
        options={{
          title: 'Recovery',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsNavigator}
        options={{
          title: 'Settings',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
