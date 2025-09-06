import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
  createdAt: Date;
}

const AddContactScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const relationshipOptions = [
    'Family Member',
    'Friend',
    'Sponsor',
    'Therapist',
    'Doctor',
    'Support Group Member',
    'Mentor',
    'Other',
  ];

  const addContact = () => {
    // Validation
    if (!name.trim()) {
      Alert.alert('Name Required', 'Please enter a contact name.');
      return;
    }

    if (!phone.trim()) {
      Alert.alert('Phone Required', 'Please enter a phone number.');
      return;
    }

    // Basic phone number validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    if (!phoneRegex.test(cleanPhone) && cleanPhone.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number.');
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      relationship: relationship || 'Other',
      isPrimary,
      createdAt: new Date(),
    };

    setContacts([newContact, ...contacts]);
    
    // Reset form
    setName('');
    setPhone('');
    setRelationship('');
    setIsPrimary(false);
    
    Alert.alert('Contact Added!', `${newContact.name} has been added to your emergency contacts.`);
  };

  const deleteContact = (contactId: string) => {
    const contactToDelete = contacts.find(c => c.id === contactId);
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${contactToDelete?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setContacts(contacts.filter(c => c.id !== contactId)),
        },
      ]
    );
  };

  const callContact = (contact: Contact) => {
    Alert.alert(
      'Call Contact',
      `Call ${contact.name} at ${contact.phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => Alert.alert('Calling...', `Calling ${contact.name} (Demo mode - no actual call made)`),
        },
      ]
    );
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
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
          Add Emergency Contact
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Add trusted people to your emergency contact list
        </Text>
        
        {/* Add Contact Form */}
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
            Contact Information
          </Text>
          
          {/* Name Input */}
          <View style={{
            marginBottom: 16,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#333',
              marginBottom: 8,
            }}>
              Contact Name *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#e9ecef',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                color: '#333',
              }}
              placeholder="e.g., John Smith"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          {/* Phone Input */}
          <View style={{
            marginBottom: 16,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#333',
              marginBottom: 8,
            }}>
              Phone Number *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#e9ecef',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                color: '#333',
              }}
              placeholder="(555) 123-4567"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
          
          {/* Relationship Selection */}
          <View style={{
            marginBottom: 16,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#333',
              marginBottom: 12,
            }}>
              Relationship
            </Text>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
            }}>
              {relationshipOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={{
                    backgroundColor: relationship === option ? '#007AFF' : '#f8f9fa',
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: relationship === option ? '#007AFF' : '#e9ecef',
                  }}
                  onPress={() => setRelationship(option)}
                >
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: relationship === option ? '#fff' : '#333',
                  }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Primary Contact Toggle */}
          <View style={{
            marginBottom: 20,
          }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                padding: 16,
                borderRadius: 8,
              }}
              onPress={() => setIsPrimary(!isPrimary)}
            >
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: isPrimary ? '#007AFF' : '#ddd',
                backgroundColor: isPrimary ? '#007AFF' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}>
                {isPrimary && (
                  <Text style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                    ✓
                  </Text>
                )}
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#333',
                  marginBottom: 2,
                }}>
                  Primary Emergency Contact
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#666',
                }}>
                  This person will be contacted first in emergencies
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Add Button */}
          <TouchableOpacity
            style={{
              backgroundColor: name.trim() && phone.trim() ? '#007AFF' : '#ccc',
              paddingVertical: 14,
              borderRadius: 8,
            }}
            onPress={addContact}
            disabled={!name.trim() || !phone.trim()}
          >
            <Text style={{
              color: name.trim() && phone.trim() ? '#fff' : '#999',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
            }}>
              Add Contact
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Contacts List */}
        {contacts.length > 0 && (
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
              marginBottom: 16,
            }}>
              Your Emergency Contacts ({contacts.length})
            </Text>
            
            {contacts.map((contact, index) => (
              <View
                key={contact.id}
                style={{
                  borderBottomWidth: index < contacts.length - 1 ? 1 : 0,
                  borderBottomColor: '#f0f0f0',
                  paddingBottom: index < contacts.length - 1 ? 16 : 0,
                  marginBottom: index < contacts.length - 1 ? 16 : 0,
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 8,
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
                      
                      {contact.isPrimary && (
                        <View style={{
                          backgroundColor: '#ffc107',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 12,
                        }}>
                          <Text style={{
                            fontSize: 10,
                            color: '#856404',
                            fontWeight: '600',
                          }}>
                            PRIMARY
                          </Text>
                        </View>
                      )}
                    </View>
                    
                    <Text style={{
                      fontSize: 14,
                      color: '#666',
                      marginBottom: 4,
                    }}>
                      {contact.relationship}
                    </Text>
                    
                    <Text style={{
                      fontSize: 16,
                      color: '#007AFF',
                      fontWeight: '500',
                      marginBottom: 8,
                    }}>
                      {formatPhoneNumber(contact.phone)}
                    </Text>
                    
                    <Text style={{
                      fontSize: 12,
                      color: '#999',
                    }}>
                      Added {contact.createdAt.toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                
                {/* Contact Actions */}
                <View style={{
                  flexDirection: 'row',
                  gap: 8,
                }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#007AFF',
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 6,
                      flex: 1,
                    }}
                    onPress={() => callContact(contact)}
                  >
                    <Text style={{
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                      📞 Call
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#dc3545',
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 6,
                    }}
                    onPress={() => deleteContact(contact.id)}
                  >
                    <Text style={{
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                      🗑️
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
        
        {/* Empty State */}
        {contacts.length === 0 && (
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 32,
            alignItems: 'center',
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Text style={{
              fontSize: 48,
              marginBottom: 16,
            }}>
              📞
            </Text>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#333',
              marginBottom: 8,
              textAlign: 'center',
            }}>
              No Emergency Contacts Yet
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#666',
              textAlign: 'center',
              lineHeight: 20,
            }}>
              Add trusted friends, family members, or professionals who can support you during difficult times.
            </Text>
          </View>
        )}
        
        {/* Tips */}
        <View style={{
          backgroundColor: '#e8f5e8',
          borderRadius: 12,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#28a745',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#2e7d32',
            marginBottom: 8,
          }}>
            💡 Contact Tips:
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#2e7d32',
            lineHeight: 20,
          }}>
            • Add at least 2-3 emergency contacts{'\n'}
            • Include people who understand your recovery journey{'\n'}
            • Let your contacts know they're on your emergency list{'\n'}
            • Keep phone numbers updated{'\n'}
            • Test calling your contacts periodically{'\n'}
            • Consider including your sponsor or therapist
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddContactScreen;
