import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../types/navigation';
import { useApp } from '../../contexts/AppContext';

type SupportStyleScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SupportStyle'
>;

interface Props {
  navigation: SupportStyleScreenNavigationProp;
}

const supportStyles = [
  {
    id: 'gentle',
    title: 'Gentle & Encouraging',
    description: 'Positive reinforcement and understanding support',
    color: '#e8f5e8',
    borderColor: '#4caf50',
  },
  {
    id: 'structured',
    title: 'Structured & Goal-Oriented',
    description: 'Clear milestones and achievement tracking',
    color: '#e3f2fd',
    borderColor: '#2196f3',
  },
  {
    id: 'tough_love',
    title: 'Direct & Challenging',
    description: 'Honest feedback and accountability',
    color: '#ffebee',
    borderColor: '#f44336',
  },
  {
    id: 'mindful',
    title: 'Mindful & Reflective',
    description: 'Focus on self-awareness and meditation',
    color: '#f3e5f5',
    borderColor: '#9c27b0',
  },
];

const SupportStyleScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const { setHasCompletedOnboarding, setOnboardingData, onboardingData } = useApp();

  const handleFinish = () => {
    if (selectedStyle) {
      // Save the support style to onboarding data
      setOnboardingData({
        ...onboardingData,
        supportStyle: selectedStyle,
      });
      
      console.log('Onboarding completed with style:', selectedStyle);
      
      // Mark onboarding as complete - this will trigger navigation to main app
      setHasCompletedOnboarding(true);
    }
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
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 8,
          textAlign: 'center',
        }}>
          How would you like to be supported?
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Choose the type of motivation that works best for you
        </Text>
        
        <View style={{
          marginBottom: 48,
        }}>
          {supportStyles.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={{
                backgroundColor: selectedStyle === style.id ? style.color : '#f8f9fa',
                borderRadius: 12,
                padding: 24,
                marginBottom: 16,
                alignItems: 'center',
                borderWidth: 2,
                borderColor: selectedStyle === style.id ? style.borderColor : 'transparent',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: selectedStyle === style.id ? 0.1 : 0.05,
                shadowRadius: 4,
                elevation: selectedStyle === style.id ? 3 : 1,
              }}
              onPress={() => setSelectedStyle(style.id)}
            >
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: selectedStyle === style.id ? style.borderColor : '#333',
                marginBottom: 8,
                textAlign: 'center',
              }}>
                {style.title}
              </Text>
              
              <Text style={{
                fontSize: 14,
                color: '#666',
                textAlign: 'center',
                lineHeight: 20,
              }}>
                {style.description}
              </Text>
              
              {selectedStyle === style.id && (
                <View style={{
                  marginTop: 12,
                  backgroundColor: style.borderColor,
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }}>
                  <Text style={{
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: '600',
                  }}>
                    ✓ SELECTED
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={{
            backgroundColor: selectedStyle ? '#007AFF' : '#ccc',
            paddingVertical: 16,
            borderRadius: 8,
            marginTop: 'auto',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: selectedStyle ? 0.2 : 0,
            shadowRadius: 4,
            elevation: selectedStyle ? 3 : 0,
          }}
          onPress={handleFinish}
          disabled={!selectedStyle}
        >
          <Text style={{
            color: selectedStyle ? '#fff' : '#999',
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center',
          }}>
            Complete Setup
          </Text>
        </TouchableOpacity>
        
        {selectedStyle && (
          <Text style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 14,
            color: '#666',
          }}>
            You can change your support style anytime in settings
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupportStyleScreen;
