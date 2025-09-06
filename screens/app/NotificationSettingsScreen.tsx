import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const NotificationSettingsScreen: React.FC = () => {
  const [dailyMotivation, setDailyMotivation] = useState(false);
  const [cravingAlerts, setCravingAlerts] = useState(false);
  const [routineReminders, setRoutineReminders] = useState(false);

  const notificationSettings = [
    {
      id: 'daily_motivation',
      title: 'Daily Motivation',
      description: 'Receive inspiring messages and quotes to keep you motivated throughout your recovery journey',
      icon: '💪',
      value: dailyMotivation,
      onValueChange: setDailyMotivation,
      color: '#4caf50',
    },
    {
      id: 'craving_alerts',
      title: 'Craving Alerts',
      description: 'Get timely reminders and coping strategies when you might be experiencing cravings',
      icon: '🚨',
      value: cravingAlerts,
      onValueChange: setCravingAlerts,
      color: '#ff9800',
    },
    {
      id: 'routine_reminders',
      title: 'Routine Reminders',
      description: 'Stay on track with gentle reminders for your daily habits and recovery routine',
      icon: '⏰',
      value: routineReminders,
      onValueChange: setRoutineReminders,
      color: '#2196f3',
    },
  ];

  const getActiveCount = () => {
    return notificationSettings.filter(setting => setting.value).length;
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#fff',
    }}>
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 32,
      }}>
        <View style={{
          alignItems: 'center',
          marginBottom: 32,
        }}>
          <Text style={{
            fontSize: 32,
            marginBottom: 16,
          }}>
            🔔
          </Text>
          
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 8,
            textAlign: 'center',
          }}>
            Notification Settings
          </Text>
          
          <Text style={{
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            lineHeight: 22,
          }}>
            Customize your notifications to support your recovery
          </Text>
        </View>

        {/* Active Settings Summary */}
        <View style={{
          backgroundColor: getActiveCount() > 0 ? '#e8f5e8' : '#f8f9fa',
          borderRadius: 12,
          padding: 20,
          marginBottom: 32,
          alignItems: 'center',
          borderWidth: 2,
          borderColor: getActiveCount() > 0 ? '#4caf50' : '#e0e0e0',
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: getActiveCount() > 0 ? '#2e7d32' : '#666',
            marginBottom: 8,
          }}>
            {getActiveCount()} of 3 Active
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: getActiveCount() > 0 ? '#2e7d32' : '#666',
            textAlign: 'center',
          }}>
            {getActiveCount() > 0 
              ? 'You have notification types enabled'
              : 'No notifications are currently enabled'
            }
          </Text>
        </View>

        {/* Notification Settings */}
        <View style={{
          marginBottom: 32,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#333',
            marginBottom: 20,
          }}>
            Notification Types
          </Text>
          
          {notificationSettings.map((setting) => (
            <View
              key={setting.id}
              style={{
                backgroundColor: setting.value ? '#f0f8ff' : '#f8f9fa',
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                borderWidth: 2,
                borderColor: setting.value ? setting.color : 'transparent',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: setting.value ? 0.1 : 0,
                shadowRadius: 3,
                elevation: setting.value ? 2 : 0,
              }}
            >
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
              }}>
                <View style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: setting.value ? setting.color : '#e0e0e0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}>
                  <Text style={{
                    fontSize: 20,
                  }}>
                    {setting.icon}
                  </Text>
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: setting.value ? setting.color : '#333',
                    marginBottom: 4,
                  }}>
                    {setting.title}
                  </Text>
                </View>
                
                <Switch
                  value={setting.value}
                  onValueChange={setting.onValueChange}
                  trackColor={{
                    false: '#e0e0e0',
                    true: `${setting.color}40`, // 40 is alpha for transparency
                  }}
                  thumbColor={setting.value ? setting.color : '#f4f3f4'}
                  ios_backgroundColor="#e0e0e0"
                />
              </View>
              
              <Text style={{
                fontSize: 14,
                color: setting.value ? setting.color : '#666',
                lineHeight: 20,
                marginLeft: 60, // Align with the title text
              }}>
                {setting.description}
              </Text>
            </View>
          ))}
        </View>

        {/* Information Cards */}
        <View style={{
          backgroundColor: '#f0f8ff',
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
          borderLeftWidth: 4,
          borderLeftColor: '#007AFF',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
            marginBottom: 8,
          }}>
            📱 How It Works
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: '#666',
            lineHeight: 20,
          }}>
            Your notification preferences are saved locally on your device. You can change these settings anytime to match your recovery needs and daily schedule.
          </Text>
        </View>

        <View style={{
          backgroundColor: '#fff3cd',
          borderRadius: 12,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#ffc107',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#856404',
            marginBottom: 8,
          }}>
            💡 Best Practices
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
            marginBottom: 8,
          }}>
            • Start with one or two notification types
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
            marginBottom: 8,
          }}>
            • Adjust timing in your device's notification settings
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
          }}>
            • Turn off notifications if they become overwhelming
          </Text>
        </View>

        {/* Debug Info (can be removed in production) */}
        {__DEV__ && (
          <View style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            padding: 16,
            marginTop: 20,
          }}>
            <Text style={{
              fontSize: 12,
              color: '#666',
              fontFamily: 'monospace',
            }}>
              Debug: Daily Motivation: {dailyMotivation.toString()}{'\n'}
              Craving Alerts: {cravingAlerts.toString()}{'\n'}
              Routine Reminders: {routineReminders.toString()}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationSettingsScreen;
