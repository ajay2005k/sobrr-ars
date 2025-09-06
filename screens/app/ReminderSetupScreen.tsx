import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

interface ReminderType {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  isEnabled: boolean;
}

const ReminderSetupScreen: React.FC = () => {
  const [reminderTypes, setReminderTypes] = useState<ReminderType[]>([
    {
      id: 'daily_checkin',
      title: 'Daily Check-in',
      description: 'Get a gentle reminder to reflect on your day',
      icon: '📝',
      color: '#007AFF',
      isEnabled: false,
    },
    {
      id: 'meditation',
      title: 'Meditation Time',
      description: 'Reminder to take a moment for mindfulness',
      icon: '🧘',
      color: '#9c27b0',
      isEnabled: false,
    },
    {
      id: 'hydration',
      title: 'Stay Hydrated',
      description: 'Don\'t forget to drink water throughout the day',
      icon: '💧',
      color: '#2196f3',
      isEnabled: false,
    },
    {
      id: 'exercise',
      title: 'Movement Break',
      description: 'Time to get your body moving',
      icon: '🏃',
      color: '#4caf50',
      isEnabled: false,
    },
    {
      id: 'gratitude',
      title: 'Gratitude Practice',
      description: 'Remind yourself of what you\'re grateful for',
      icon: '🙏',
      color: '#ff9800',
      isEnabled: false,
    },
    {
      id: 'support_checkin',
      title: 'Connect with Support',
      description: 'Reach out to your support network',
      icon: '🤝',
      color: '#e91e63',
      isEnabled: false,
    },
  ]);

  const toggleReminderType = (id: string) => {
    setReminderTypes(types =>
      types.map(type =>
        type.id === id ? { ...type, isEnabled: !type.isEnabled } : type
      )
    );
  };

  const handleSetReminder = () => {
    const enabledReminders = reminderTypes.filter(type => type.isEnabled);
    
    if (enabledReminders.length === 0) {
      Alert.alert(
        'No Reminders Selected',
        'Please select at least one reminder type to set up notifications.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Non-functional for now as requested
    Alert.alert(
      'Reminder Setup',
      `You've selected ${enabledReminders.length} reminder type${enabledReminders.length > 1 ? 's' : ''}. Notification functionality will be available in a future update.`,
      [{ text: 'Got it' }]
    );
  };

  const getEnabledCount = () => {
    return reminderTypes.filter(type => type.isEnabled).length;
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
            ⏰
          </Text>
          
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 8,
            textAlign: 'center',
          }}>
            Reminder Setup
          </Text>
          
          <Text style={{
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            lineHeight: 22,
          }}>
            Set up personalized reminders to support your recovery journey
          </Text>
        </View>

        {/* Selection Summary */}
        {getEnabledCount() > 0 && (
          <View style={{
            backgroundColor: '#e8f5e8',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: '#4caf50',
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#2e7d32',
              marginBottom: 4,
            }}>
              {getEnabledCount()} Reminder{getEnabledCount() > 1 ? 's' : ''} Selected
            </Text>
            
            <Text style={{
              fontSize: 14,
              color: '#2e7d32',
              textAlign: 'center',
            }}>
              Ready to set up your personalized notifications
            </Text>
          </View>
        )}

        {/* Reminder Types */}
        <View style={{
          marginBottom: 32,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#333',
            marginBottom: 16,
          }}>
            Choose Your Reminders
          </Text>
          
          {reminderTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={{
                backgroundColor: type.isEnabled ? '#f0f8ff' : '#f8f9fa',
                borderRadius: 12,
                padding: 20,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: type.isEnabled ? type.color : 'transparent',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: type.isEnabled ? 0.1 : 0,
                shadowRadius: 2,
                elevation: type.isEnabled ? 2 : 0,
              }}
              onPress={() => toggleReminderType(type.id)}
            >
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: type.isEnabled ? type.color : '#e0e0e0',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Text style={{
                  fontSize: 20,
                }}>
                  {type.icon}
                </Text>
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: type.isEnabled ? type.color : '#333',
                  marginBottom: 4,
                }}>
                  {type.title}
                </Text>
                
                <Text style={{
                  fontSize: 14,
                  color: type.isEnabled ? type.color : '#666',
                  lineHeight: 18,
                }}>
                  {type.description}
                </Text>
              </View>
              
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: type.isEnabled ? type.color : '#ccc',
                backgroundColor: type.isEnabled ? type.color : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {type.isEnabled && (
                  <Text style={{
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                    ✓
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Set Reminder Button */}
        <TouchableOpacity 
          style={{
            backgroundColor: getEnabledCount() > 0 ? '#007AFF' : '#ccc',
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: getEnabledCount() > 0 ? 0.1 : 0,
            shadowRadius: 4,
            elevation: getEnabledCount() > 0 ? 3 : 0,
          }}
          onPress={handleSetReminder}
          disabled={getEnabledCount() === 0}
        >
          <Text style={{
            color: getEnabledCount() > 0 ? '#fff' : '#999',
            fontSize: 18,
            fontWeight: '600',
          }}>
            Set Reminder{getEnabledCount() > 1 ? 's' : ''}
          </Text>
        </TouchableOpacity>

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
            📱 How Reminders Work
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: '#666',
            lineHeight: 20,
          }}>
            Your selected reminders will send gentle notifications throughout the day to help you stay on track with your recovery goals. You can customize timing and frequency in your device settings.
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
            💡 Pro Tip
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
          }}>
            Start with 2-3 reminders to avoid notification fatigue. You can always add more later as these become part of your routine.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReminderSetupScreen;
