import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../types/navigation';
import { useApp } from '../../contexts/AppContext';

type QuitDateScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'QuitDate'
>;

interface Props {
  navigation: QuitDateScreenNavigationProp;
}

const QuitDateScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { setOnboardingData, onboardingData } = useApp();

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleNext = () => {
    // Save quit date to onboarding data
    setOnboardingData({
      ...onboardingData,
      quitDate: selectedDate.toISOString(),
    });
    
    navigation.navigate('SupportStyle');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#fff',
    }}>
      <View style={{
        flex: 1,
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
          When do you want to quit?
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
        }}>
          Choose your quit date to start tracking your progress
        </Text>
        
        <View style={{
          backgroundColor: '#f0f8ff',
          padding: 24,
          borderRadius: 12,
          marginBottom: 32,
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#007AFF',
        }}>
          <Text style={{
            fontSize: 18,
            color: '#333',
            marginBottom: 16,
            fontWeight: '600',
          }}>
            Selected Quit Date:
          </Text>
          
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#007AFF',
            textAlign: 'center',
            marginBottom: 20,
          }}>
            {formatDate(selectedDate)}
          </Text>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#007AFF',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
            }}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Change Date
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            minimumDate={new Date()}
            maximumDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
          />
        )}

        <View style={{
          backgroundColor: '#fff3cd',
          padding: 16,
          borderRadius: 8,
          marginBottom: 32,
          borderLeftWidth: 4,
          borderLeftColor: '#ffc107',
        }}>
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
          }}>
            💡 Tip: You can start tracking immediately, even if your quit date is in the future. 
            This helps you prepare mentally for your journey.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={{
            backgroundColor: '#007AFF',
            paddingVertical: 16,
            borderRadius: 8,
            marginTop: 'auto',
          }}
          onPress={handleNext}
        >
          <Text style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center',
          }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QuitDateScreen;
