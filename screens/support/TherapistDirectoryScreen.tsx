import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';

interface Therapist {
  id: string;
  name: string;
  credentials: string;
  specialties: string[];
  location: string;
  distance: string;
  phone: string;
  availability: 'Available' | 'Limited' | 'Waitlist';
  rating: number;
  acceptsInsurance: boolean;
}

const TherapistDirectoryScreen: React.FC = () => {
  const [favoriteTherapists, setFavoriteTherapists] = useState<Set<string>>(new Set());

  // Static therapist data
  const therapists: Therapist[] = [
    {
      id: '1',
      name: "Dr. Sarah Johnson",
      credentials: "PhD, LCSW",
      specialties: ["Addiction Recovery", "Trauma Therapy", "CBT"],
      location: "Downtown Medical Center",
      distance: "2.3 miles",
      phone: "(555) 123-4567",
      availability: "Available",
      rating: 4.8,
      acceptsInsurance: true,
    },
    {
      id: '2',
      name: "Michael Rodriguez",
      credentials: "LMFT, CAC",
      specialties: ["Substance Abuse", "Family Therapy", "Group Therapy"],
      location: "Westside Recovery Center",
      distance: "3.7 miles",
      phone: "(555) 234-5678",
      availability: "Limited",
      rating: 4.6,
      acceptsInsurance: true,
    },
    {
      id: '3',
      name: "Dr. Emily Chen",
      credentials: "MD, Psychiatrist",
      specialties: ["Medication Management", "Dual Diagnosis", "Anxiety"],
      location: "Sunrise Mental Health Clinic",
      distance: "1.8 miles",
      phone: "(555) 345-6789",
      availability: "Available",
      rating: 4.9,
      acceptsInsurance: false,
    },
    {
      id: '4',
      name: "James Wilson",
      credentials: "LCPC, CADC",
      specialties: ["Alcohol Recovery", "Relapse Prevention", "Mindfulness"],
      location: "Hope Recovery Services",
      distance: "4.2 miles",
      phone: "(555) 456-7890",
      availability: "Waitlist",
      rating: 4.7,
      acceptsInsurance: true,
    },
    {
      id: '5',
      name: "Dr. Lisa Martinez",
      credentials: "PsyD, CSAC",
      specialties: ["Behavioral Therapy", "EMDR", "Women's Issues"],
      location: "Healing Path Counseling",
      distance: "2.9 miles",
      phone: "(555) 567-8901",
      availability: "Available",
      rating: 4.5,
      acceptsInsurance: true,
    },
    {
      id: '6',
      name: "Robert Thompson",
      credentials: "LCSW, CAP",
      specialties: ["Men's Therapy", "Anger Management", "Life Coaching"],
      location: "New Horizons Therapy",
      distance: "5.1 miles",
      phone: "(555) 678-9012",
      availability: "Limited",
      rating: 4.4,
      acceptsInsurance: false,
    },
  ];

  const toggleFavorite = (therapistId: string) => {
    const newFavorites = new Set(favoriteTherapists);
    if (newFavorites.has(therapistId)) {
      newFavorites.delete(therapistId);
    } else {
      newFavorites.add(therapistId);
    }
    setFavoriteTherapists(newFavorites);
  };

  const handleContactTherapist = (therapist: Therapist) => {
    Alert.alert(
      'Contact Therapist',
      `Would you like to contact ${therapist.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => Alert.alert('Calling...', `Calling ${therapist.name} at ${therapist.phone}`),
        },
        {
          text: 'More Info',
          onPress: () => Alert.alert('Therapist Info', `${therapist.name}\n${therapist.credentials}\nLocation: ${therapist.location}\nSpecialties: ${therapist.specialties.join(', ')}`),
        },
      ]
    );
  };

  const getAvailabilityColor = (availability: Therapist['availability']) => {
    switch (availability) {
      case 'Available': return '#28a745';
      case 'Limited': return '#ffc107';
      case 'Waitlist': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    return stars.join('');
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
          Therapist Directory
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Find qualified therapists specializing in addiction recovery
        </Text>
        
        {/* Search/Filter Info */}
        <View style={{
          backgroundColor: '#e3f2fd',
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          borderLeftWidth: 4,
          borderLeftColor: '#2196f3',
        }}>
          <Text style={{
            fontSize: 14,
            color: '#1565c0',
            lineHeight: 20,
          }}>
            📍 Showing therapists within 10 miles of your location. All therapists are licensed and specialize in addiction recovery.
          </Text>
        </View>
        
        {/* Therapists List */}
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
            Available Therapists ({therapists.length})
          </Text>
          
          {therapists.map((therapist, index) => (
            <TouchableOpacity
              key={therapist.id}
              style={{
                borderBottomWidth: index < therapists.length - 1 ? 1 : 0,
                borderBottomColor: '#f0f0f0',
                paddingBottom: index < therapists.length - 1 ? 20 : 0,
                marginBottom: index < therapists.length - 1 ? 20 : 0,
              }}
              onPress={() => handleContactTherapist(therapist)}
            >
              {/* Therapist Header */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 12,
              }}>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: 4,
                  }}>
                    {therapist.name}
                  </Text>
                  
                  <Text style={{
                    fontSize: 14,
                    color: '#666',
                    marginBottom: 8,
                  }}>
                    {therapist.credentials}
                  </Text>
                  
                  {/* Rating */}
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                    <Text style={{
                      fontSize: 14,
                      marginRight: 4,
                    }}>
                      {renderStars(therapist.rating)}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: '#666',
                    }}>
                      {therapist.rating} rating
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity
                  style={{
                    backgroundColor: favoriteTherapists.has(therapist.id) ? '#dc3545' : '#f8f9fa',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 8,
                  }}
                  onPress={() => toggleFavorite(therapist.id)}
                >
                  <Text style={{
                    color: favoriteTherapists.has(therapist.id) ? '#fff' : '#666',
                    fontSize: 12,
                    fontWeight: '500',
                  }}>
                    {favoriteTherapists.has(therapist.id) ? '❤️ Saved' : '🤍 Save'}
                  </Text>
                </TouchableOpacity>
              </View>
              
              {/* Location */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}>
                <Text style={{
                  fontSize: 16,
                  marginRight: 8,
                }}>
                  📍
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#666',
                  flex: 1,
                }}>
                  {therapist.location} • {therapist.distance}
                </Text>
              </View>
              
              {/* Specialties */}
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 12,
                gap: 6,
              }}>
                {therapist.specialties.map((specialty, specIndex) => (
                  <View
                    key={specIndex}
                    style={{
                      backgroundColor: '#e3f2fd',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}
                  >
                    <Text style={{
                      fontSize: 12,
                      color: '#1565c0',
                      fontWeight: '500',
                    }}>
                      {specialty}
                    </Text>
                  </View>
                ))}
              </View>
              
              {/* Availability and Insurance */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                  <View style={{
                    backgroundColor: getAvailabilityColor(therapist.availability),
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                    marginRight: 8,
                  }}>
                    <Text style={{
                      fontSize: 12,
                      color: '#fff',
                      fontWeight: '600',
                    }}>
                      {therapist.availability}
                    </Text>
                  </View>
                  
                  {therapist.acceptsInsurance && (
                    <View style={{
                      backgroundColor: '#28a745',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}>
                      <Text style={{
                        fontSize: 12,
                        color: '#fff',
                        fontWeight: '600',
                      }}>
                        Insurance
                      </Text>
                    </View>
                  )}
                </View>
                
                <Text style={{
                  fontSize: 12,
                  color: '#666',
                }}>
                  {therapist.phone}
                </Text>
              </View>
              
              {/* Contact Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#007AFF',
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignSelf: 'flex-start',
                }}
                onPress={() => handleContactTherapist(therapist)}
              >
                <Text style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: '600',
                }}>
                  Contact Therapist
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Favorites Section */}
        {favoriteTherapists.size > 0 && (
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
              marginBottom: 12,
            }}>
              Saved Therapists ({favoriteTherapists.size})
            </Text>
            
            {therapists
              .filter(therapist => favoriteTherapists.has(therapist.id))
              .map((therapist) => (
                <View
                  key={therapist.id}
                  style={{
                    borderLeftWidth: 4,
                    borderLeftColor: '#dc3545',
                    paddingLeft: 12,
                    paddingVertical: 8,
                    marginBottom: 8,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 8,
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#333',
                  }}>
                    {therapist.name}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: '#666',
                  }}>
                    {therapist.location} • {therapist.phone}
                  </Text>
                </View>
              ))}
          </View>
        )}
        
        {/* Important Information */}
        <View style={{
          backgroundColor: '#fff5cd',
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
            ℹ️ Important Information:
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
          }}>
            • All therapists are licensed and verified{'\n'}
            • Availability is updated daily{'\n'}
            • Insurance coverage varies by provider{'\n'}
            • Contact therapists directly for appointment scheduling{'\n'}
            • Emergency services available 24/7 through crisis hotlines
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TherapistDirectoryScreen;
