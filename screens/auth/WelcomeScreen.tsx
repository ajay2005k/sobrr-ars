import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../types/navigation';

type WelcomeScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Welcome'
>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('AddictionType');
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#fff',
    }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}>
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 16,
          textAlign: 'center',
        }}>
          Welcome to Sobrr
        </Text>
        
        <Text style={{
          fontSize: 18,
          color: '#666',
          marginBottom: 24,
          textAlign: 'center',
        }}>
          Your journey to recovery starts here
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#888',
          textAlign: 'center',
          lineHeight: 24,
          marginBottom: 48,
        }}>
          Take control of your life and build healthy habits with personalized support and tools.
        </Text>
        
        <TouchableOpacity 
          style={{
            backgroundColor: '#007AFF',
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 8,
            minWidth: 200,
          }}
          onPress={handleGetStarted}
        >
          <Text style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center',
          }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
