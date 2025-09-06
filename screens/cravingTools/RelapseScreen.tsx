import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CravingToolsStackParamList } from '../../types/navigation';

type RelapseScreenNavigationProp = StackNavigationProp<
  CravingToolsStackParamList,
  'Relapse'
>;

interface Props {
  navigation: RelapseScreenNavigationProp;
}

const RelapseScreen: React.FC<Props> = ({ navigation }) => {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogRelapse = () => {
    setIsLogged(true);
    
    // Show supportive message
    Alert.alert(
      "You're Not Alone",
      "Recovery is a journey with ups and downs. What matters most is that you're here, acknowledging this moment, and ready to move forward. This setback doesn't erase your progress or define your future. You have the strength to get back on track.",
      [
        {
          text: "Get Support",
          onPress: () => navigation.navigate('SOS'),
        },
        {
          text: "Continue",
          style: "default",
        },
      ]
    );
  };

  const supportiveMessages = [
    "Recovery is not about perfection, it's about progress.",
    "Every day is a new opportunity to start again.",
    "You are stronger than your struggles.",
    "Healing happens one day at a time.",
    "Your worth is not determined by your setbacks.",
  ];

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
            💙
          </Text>
          
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 8,
            textAlign: 'center',
          }}>
            Relapse Support
          </Text>
          
          <Text style={{
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            lineHeight: 22,
          }}>
            It's okay to have setbacks. What matters is getting back up.
          </Text>
        </View>

        {!isLogged ? (
          <View style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            borderLeftWidth: 4,
            borderLeftColor: '#007AFF',
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#333',
              marginBottom: 12,
            }}>
              Acknowledge Your Experience
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: '#666',
              lineHeight: 24,
              marginBottom: 20,
            }}>
              Logging a relapse helps you stay accountable and learn from the experience. Remember, seeking help is a sign of strength, not weakness.
            </Text>
            
            <TouchableOpacity 
              style={{
                backgroundColor: '#007AFF',
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 12,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              onPress={handleLogRelapse}
            >
              <Text style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
              }}>
                Log Relapse
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{
            backgroundColor: '#e8f5e8',
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            borderLeftWidth: 4,
            borderLeftColor: '#4caf50',
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#2e7d32',
              marginBottom: 12,
              textAlign: 'center',
            }}>
              ✓ Relapse Logged
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: '#2e7d32',
              textAlign: 'center',
              lineHeight: 24,
            }}>
              Thank you for your honesty. This moment of awareness is the first step toward getting back on track.
            </Text>
          </View>
        )}

        <View style={{
          backgroundColor: '#fff3cd',
          borderRadius: 12,
          padding: 20,
          marginBottom: 32,
          borderWidth: 1,
          borderColor: '#ffc107',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#856404',
            marginBottom: 12,
          }}>
            💡 Remember
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
          }}>
            A relapse doesn't mean you've failed. It's a common part of recovery for many people. What's important is learning from it and using it as motivation to strengthen your recovery plan.
          </Text>
        </View>

        <View style={{
          marginBottom: 32,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#333',
            marginBottom: 20,
            textAlign: 'center',
          }}>
            Words of Encouragement
          </Text>
          
          {supportiveMessages.map((message, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#f0f8ff',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderLeftWidth: 3,
                borderLeftColor: '#007AFF',
              }}
            >
              <Text style={{
                fontSize: 16,
                color: '#333',
                fontStyle: 'italic',
                textAlign: 'center',
                lineHeight: 22,
              }}>
                "{message}"
              </Text>
            </View>
          ))}
        </View>

        <View style={{
          flexDirection: 'row',
          gap: 12,
          marginTop: 'auto',
        }}>
          <TouchableOpacity 
            style={{
              flex: 1,
              backgroundColor: '#dc3545',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('SOS')}
          >
            <Text style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Emergency Support
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{
              flex: 1,
              backgroundColor: '#28a745',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('BreathingExercise')}
          >
            <Text style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Breathing Exercise
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RelapseScreen;
