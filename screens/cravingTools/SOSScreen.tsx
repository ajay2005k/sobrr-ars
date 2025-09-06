import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert, Linking } from 'react-native';

const SOSScreen: React.FC = () => {
  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Contact',
      'Choose how you want to reach out for help:',
      [
        {
          text: 'Call Support Hotline',
          onPress: () => {
            // In a real app, this would call an actual crisis hotline
            Linking.openURL('tel:988'); // 988 Suicide & Crisis Lifeline
          },
        },
        {
          text: 'Call Emergency Contact',
          onPress: () => {
            // In a real app, this would call the user's designated emergency contact
            Alert.alert('Calling...', 'Calling your emergency contact now.');
          },
        },
        {
          text: 'Send Text Message',
          onPress: () => {
            Alert.alert('Message Sent', 'Emergency message sent to your support network.');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
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
          Emergency Support
        </Text>
        
        <Text style={{
          fontSize: 18,
          color: '#666',
          marginBottom: 48,
          textAlign: 'center',
          lineHeight: 24,
        }}>
          You're not alone. Reach out for immediate support when you need it most.
        </Text>
        
        {/* Big Red Emergency Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#dc3545',
            width: 200,
            height: 200,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 32,
            shadowColor: '#dc3545',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          }}
          onPress={handleEmergencyCall}
          activeOpacity={0.8}
        >
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
            lineHeight: 28,
          }}>
            EMERGENCY{'\n'}CONTACT
          </Text>
          <Text style={{
            fontSize: 48,
            marginTop: 8,
          }}>
            🚨
          </Text>
        </TouchableOpacity>
        
        <View style={{
          backgroundColor: '#f8f9fa',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          borderLeftWidth: 4,
          borderLeftColor: '#007AFF',
        }}>
          <Text style={{
            fontSize: 16,
            color: '#333',
            fontWeight: '600',
            marginBottom: 8,
          }}>
            Remember:
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#666',
            lineHeight: 20,
          }}>
            • Cravings are temporary and will pass{'\n'}
            • You have the strength to overcome this{'\n'}
            • Your support network is here for you{'\n'}
            • Every moment of resistance makes you stronger
          </Text>
        </View>
        
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 8,
          }}
          onPress={() => Alert.alert('Resources', 'Additional resources and coping strategies are available in the app.')}
        >
          <Text style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
          }}>
            View Other Resources
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SOSScreen;
