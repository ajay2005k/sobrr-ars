import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  type: 'crisis' | 'personal' | 'professional';
  available24x7: boolean;
  description?: string;
}

const EmergencyContactsScreen: React.FC = () => {
  // Hardcoded emergency contacts
  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: "Crisis Support Hotline",
      relationship: "24/7 Crisis Support",
      phone: "988",
      type: "crisis",
      available24x7: true,
      description: "National Suicide & Crisis Lifeline - Free, confidential support for people in distress and crisis resources.",
    },
    {
      id: '2',
      name: "SAMHSA National Helpline",
      relationship: "Treatment Referral Service",
      phone: "1-800-662-4357",
      type: "crisis",
      available24x7: true,
      description: "Treatment referral and information service for individuals and families facing mental health and/or substance use disorders.",
    },
    {
      id: '3',
      name: "Dr. Sarah Johnson",
      relationship: "Primary Therapist",
      phone: "(555) 123-4567",
      type: "professional",
      available24x7: false,
      description: "Your primary addiction counselor. Call during business hours or leave a message for urgent matters.",
    },
  ];

  const handleCallContact = (contact: EmergencyContact) => {
    Alert.alert(
      'Call Emergency Contact',
      `Are you sure you want to call ${contact.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call Now',
          style: 'default',
          onPress: () => {
            Alert.alert(
              'Calling...',
              `Calling ${contact.name} at ${contact.phone}\n\n(This is a demo - no actual call will be made)`
            );
          },
        },
      ]
    );
  };

  const getContactTypeColor = (type: EmergencyContact['type']) => {
    switch (type) {
      case 'crisis': return '#dc3545';
      case 'professional': return '#007AFF';
      case 'personal': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getContactTypeLabel = (type: EmergencyContact['type']) => {
    switch (type) {
      case 'crisis': return 'Crisis Line';
      case 'professional': return 'Professional';
      case 'personal': return 'Personal';
      default: return 'Contact';
    }
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#f8f9fa',
    }}>
      <ScrollView style={{
        flex: 1,
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
          Emergency Contacts
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Quick access to support when you need it most
        </Text>
        
        {/* Emergency Alert */}
        <View style={{
          backgroundColor: '#fff3cd',
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          borderLeftWidth: 4,
          borderLeftColor: '#ffc107',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}>
            <Text style={{
              fontSize: 20,
              marginRight: 8,
            }}>
              ⚠️
            </Text>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#856404',
            }}>
              In Case of Emergency
            </Text>
          </View>
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
          }}>
            If you're having thoughts of self-harm or substance use crisis, don't wait. Reach out for help immediately using the contacts below.
          </Text>
        </View>
        
        {/* Emergency Contacts List */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#333',
            marginBottom: 20,
          }}>
            Emergency Contacts
          </Text>
          
          {emergencyContacts.map((contact, index) => (
            <View
              key={contact.id}
              style={{
                borderBottomWidth: index < emergencyContacts.length - 1 ? 1 : 0,
                borderBottomColor: '#f0f0f0',
                paddingBottom: index < emergencyContacts.length - 1 ? 20 : 0,
                marginBottom: index < emergencyContacts.length - 1 ? 20 : 0,
              }}
            >
              {/* Contact Header */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 12,
              }}>
                <View style={{ flex: 1 }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 4,
                  }}>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: '#333',
                      flex: 1,
                    }}>
                      {contact.name}
                    </Text>
                    
                    <View style={{
                      backgroundColor: getContactTypeColor(contact.type),
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}>
                      <Text style={{
                        fontSize: 12,
                        color: '#fff',
                        fontWeight: '600',
                      }}>
                        {getContactTypeLabel(contact.type)}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={{
                    fontSize: 14,
                    color: '#666',
                    marginBottom: 8,
                  }}>
                    {contact.relationship}
                  </Text>
                  
                  {/* Phone Number */}
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                    <Text style={{
                      fontSize: 16,
                      marginRight: 8,
                    }}>
                      📞
                    </Text>
                    <Text style={{
                      fontSize: 16,
                      color: '#007AFF',
                      fontWeight: '600',
                    }}>
                      {contact.phone}
                    </Text>
                  </View>
                  
                  {/* Availability */}
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}>
                    <View style={{
                      backgroundColor: contact.available24x7 ? '#28a745' : '#ffc107',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}>
                      <Text style={{
                        fontSize: 12,
                        color: '#fff',
                        fontWeight: '600',
                      }}>
                        {contact.available24x7 ? '24/7 Available' : 'Business Hours'}
                      </Text>
                    </View>
                  </View>
                  
                  {/* Description */}
                  {contact.description && (
                    <Text style={{
                      fontSize: 14,
                      color: '#666',
                      lineHeight: 20,
                      marginBottom: 16,
                    }}>
                      {contact.description}
                    </Text>
                  )}
                </View>
              </View>
              
              {/* Call Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: contact.type === 'crisis' ? '#dc3545' : '#007AFF',
                  paddingHorizontal: 24,
                  paddingVertical: 14,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: contact.type === 'crisis' ? '#dc3545' : '#007AFF',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 3,
                }}
                onPress={() => handleCallContact(contact)}
              >
                <Text style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: '600',
                  marginRight: 8,
                }}>
                  Call Now
                </Text>
                <Text style={{
                  fontSize: 16,
                }}>
                  📞
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        {/* Quick Actions */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#333',
            marginBottom: 16,
          }}>
            Quick Actions
          </Text>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#e8f5e8',
              borderRadius: 8,
              padding: 16,
              marginBottom: 12,
              borderLeftWidth: 4,
              borderLeftColor: '#28a745',
            }}
            onPress={() => Alert.alert('Feature Coming Soon', 'Add Personal Contact feature will be available soon.')}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 20,
                marginRight: 12,
              }}>
                ➕
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#2e7d32',
                  marginBottom: 2,
                }}>
                  Add Personal Contact
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#2e7d32',
                }}>
                  Add a trusted friend or family member
                </Text>
              </View>
              <Text style={{
                fontSize: 20,
                color: '#2e7d32',
              }}>
                ›
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#e3f2fd',
              borderRadius: 8,
              padding: 16,
              borderLeftWidth: 4,
              borderLeftColor: '#2196f3',
            }}
            onPress={() => Alert.alert('Coping Tools', 'Redirecting to breathing exercises and other coping tools...')}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 20,
                marginRight: 12,
              }}>
                🧘
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#1565c0',
                  marginBottom: 2,
                }}>
                  Coping Tools
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#1565c0',
                }}>
                  Try breathing exercises while you wait
                </Text>
              </View>
              <Text style={{
                fontSize: 20,
                color: '#1565c0',
              }}>
                ›
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Safety Information */}
        <View style={{
          backgroundColor: '#ffebee',
          borderRadius: 12,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#f44336',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#c62828',
            marginBottom: 8,
          }}>
            🆘 Safety Reminders:
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#c62828',
            lineHeight: 20,
          }}>
            • If you're in immediate danger, call 911{'\n'}
            • Crisis lines are free and confidential{'\n'}
            • You're not alone - help is always available{'\n'}
            • These feelings will pass - reach out for support{'\n'}
            • Consider going to your nearest emergency room if needed
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencyContactsScreen;
