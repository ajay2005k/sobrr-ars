import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../types/navigation';
import { useApp } from '../../contexts/AppContext';

type AddictionTypeScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'AddictionType'
>;

interface Props {
  navigation: AddictionTypeScreenNavigationProp;
}

const addictionTypes = [
  { id: 'alcohol', label: 'Alcohol' },
  { id: 'smoking', label: 'Smoking' },
  { id: 'drugs', label: 'Drugs' },
  { id: 'gambling', label: 'Gambling' },
  { id: 'social_media', label: 'Social Media' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'other', label: 'Other' },
];

const AddictionTypeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const { setOnboardingData, onboardingData } = useApp();

  const toggleSelection = (typeId: string) => {
    const newSelection = new Set(selectedTypes);
    if (newSelection.has(typeId)) {
      newSelection.delete(typeId);
    } else {
      newSelection.add(typeId);
    }
    setSelectedTypes(newSelection);
  };

  const handleNext = () => {
    if (selectedTypes.size > 0) {
      // Save addiction types to onboarding data
      setOnboardingData({
        ...onboardingData,
        addictionTypes: Array.from(selectedTypes),
      });
      
      navigation.navigate('QuitDate');
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
          What would you like to quit?
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
        }}>
          Select all that apply (you can choose multiple)
        </Text>
        
        <View style={{
          marginBottom: 48,
        }}>
          {addictionTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: 12,
                padding: 20,
                marginBottom: 12,
                borderWidth: 2,
                borderColor: selectedTypes.has(type.id) ? '#007AFF' : 'transparent',
              }}
              onPress={() => toggleSelection(type.id)}
            >
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: selectedTypes.has(type.id) ? '#007AFF' : '#ddd',
                backgroundColor: selectedTypes.has(type.id) ? '#007AFF' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                {selectedTypes.has(type.id) && (
                  <Text style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                    ✓
                  </Text>
                )}
              </View>
              
              <Text style={{
                fontSize: 18,
                fontWeight: '500',
                color: selectedTypes.has(type.id) ? '#007AFF' : '#333',
                flex: 1,
              }}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={{
            backgroundColor: selectedTypes.size > 0 ? '#007AFF' : '#ccc',
            paddingVertical: 16,
            borderRadius: 8,
            marginTop: 'auto',
          }}
          onPress={handleNext}
          disabled={selectedTypes.size === 0}
        >
          <Text style={{
            color: selectedTypes.size > 0 ? '#fff' : '#999',
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center',
          }}>
            Next ({selectedTypes.size} selected)
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddictionTypeScreen;
