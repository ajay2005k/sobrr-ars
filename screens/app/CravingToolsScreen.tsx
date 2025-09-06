import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CravingToolsStackParamList } from '../../types/navigation';

type CravingToolsScreenNavigationProp = StackNavigationProp<
  CravingToolsStackParamList,
  'CravingToolsHome'
>;

interface Props {
  navigation: CravingToolsScreenNavigationProp;
}

const cravingTools = [
  {
    id: 'sos',
    title: 'Emergency Support',
    description: 'Immediate help when you need it most',
    icon: '🚨',
    color: '#ffebee',
    borderColor: '#f44336',
    route: 'SOS' as keyof CravingToolsStackParamList,
  },
  {
    id: 'breathing',
    title: 'Breathing Exercise',
    description: 'Calm your mind with guided breathing',
    icon: '🫁',
    color: '#e3f2fd',
    borderColor: '#2196f3',
    route: 'BreathingExercise' as keyof CravingToolsStackParamList,
  },
  {
    id: 'journaling',
    title: 'Craving Journal',
    description: 'Track and understand your triggers',
    icon: '📝',
    color: '#fff3e0',
    borderColor: '#ff9800',
    route: 'Journaling' as keyof CravingToolsStackParamList,
  },
  {
    id: 'distraction',
    title: 'Distraction Activities',
    description: 'Quick activities to redirect your focus',
    icon: '🎯',
    color: '#f3e5f5',
    borderColor: '#9c27b0',
    route: 'DistractionTools' as keyof CravingToolsStackParamList,
  },
  {
    id: 'minigames',
    title: 'Mini Games',
    description: 'Simple games to occupy your mind',
    icon: '🎮',
    color: '#e8f5e8',
    borderColor: '#4caf50',
    route: 'MiniGames' as keyof CravingToolsStackParamList,
  },
  {
    id: 'relapse',
    title: 'Relapse Support',
    description: 'Compassionate support for setbacks',
    icon: '💙',
    color: '#e1f5fe',
    borderColor: '#00bcd4',
    route: 'Relapse' as keyof CravingToolsStackParamList,
  },
  {
    id: 'routine',
    title: 'Routine Builder',
    description: 'Build healthy daily habits',
    icon: '🏗️',
    color: '#f1f8e9',
    borderColor: '#8bc34a',
    route: 'RoutineBuilder' as keyof CravingToolsStackParamList,
  },
  {
    id: 'reminders',
    title: 'Reminder Setup',
    description: 'Set personalized recovery reminders',
    icon: '⏰',
    color: '#fff8e1',
    borderColor: '#ffc107',
    route: 'ReminderSetup' as keyof CravingToolsStackParamList,
  },
];

const CravingToolsScreen: React.FC<Props> = ({ navigation }) => {
  const handleToolPress = (route: keyof CravingToolsStackParamList) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#f8f9fa',
    }}>
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 24,
      }}>
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 8,
          textAlign: 'center',
        }}>
          Craving Tools
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 24,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Quick access to tools that help you overcome cravings
        </Text>
        
        <View style={{
          backgroundColor: '#fff3cd',
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          borderLeftWidth: 4,
          borderLeftColor: '#ffc107',
        }}>
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
          }}>
            🚨 Having a strong craving? Start with breathing exercises or emergency support.
          </Text>
        </View>

        <View style={{
          marginBottom: 24,
        }}>
          {cravingTools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: 1,
                backgroundColor: tool.color,
                borderColor: tool.borderColor,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              onPress={() => handleToolPress(tool.route)}
            >
              <Text style={{
                fontSize: 32,
                marginRight: 16,
              }}>
                {tool.icon}
              </Text>
              
              <View style={{
                flex: 1,
              }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: 4,
                }}>
                  {tool.title}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#666',
                  lineHeight: 18,
                }}>
                  {tool.description}
                </Text>
              </View>
              
              <Text style={{
                fontSize: 24,
                color: '#999',
                fontWeight: '300',
              }}>
                ›
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{
          backgroundColor: '#e8f5e8',
          borderRadius: 12,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#4caf50',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#2e7d32',
            marginBottom: 8,
          }}>
            💡 Quick Tip
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#2e7d32',
            lineHeight: 20,
          }}>
            The first 5 minutes of a craving are the hardest. Use these tools to get through that critical window.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CravingToolsScreen;
