import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

const TrackerScreen: React.FC = () => {
  // Hardcoded data as requested
  const daysSober = 5;
  const moneySaved = 75.00;
  const timeRecovered = { hours: 4, minutes: 15 };

  // Milestone data with completion status
  const milestones = [
    { days: 7, completed: false, daysLeft: 2 },
    { days: 30, completed: false, daysLeft: 25 },
    { days: 90, completed: false, daysLeft: 85 },
  ];

  // Calculate progress percentage for main progress bar (towards next milestone)
  const nextMilestone = milestones.find(m => !m.completed);
  const progressPercentage = nextMilestone ? (daysSober / nextMilestone.days) * 100 : 100;

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#f8f9fa',
    }}>
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 24,
      }}>
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 24,
          textAlign: 'center',
        }}>
          Your Progress
        </Text>
        
        {/* Main Stats */}
        <View style={{
          marginBottom: 32,
        }}>
          <View style={{
            backgroundColor: '#007AFF',
            borderRadius: 16,
            padding: 32,
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <Text style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#fff',
            }}>
              Day {daysSober}
            </Text>
            <Text style={{
              fontSize: 18,
              color: '#fff',
              marginTop: 8,
              fontWeight: '600',
            }}>
              Sober
            </Text>
            <Text style={{
              fontSize: 16,
              color: '#e3f2fd',
              marginTop: 4,
            }}>
              Keep going strong! 🎉
            </Text>
          </View>
          
          {/* Progress Bar to Next Milestone */}
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#333',
              marginBottom: 12,
              textAlign: 'center',
            }}>
              Progress to {nextMilestone?.days} Days
            </Text>
            
            <View style={{
              height: 12,
              backgroundColor: '#e9ecef',
              borderRadius: 6,
              overflow: 'hidden',
              marginBottom: 8,
            }}>
              <View style={{
                height: '100%',
                backgroundColor: '#28a745',
                borderRadius: 6,
                width: `${Math.min(progressPercentage, 100)}%`,
              }} />
            </View>
            
            <Text style={{
              fontSize: 14,
              color: '#666',
              textAlign: 'center',
            }}>
              {nextMilestone ? `${nextMilestone.daysLeft} days to go` : 'Milestone reached!'}
            </Text>
          </View>
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 20,
              alignItems: 'center',
              width: '48%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#333',
              }}>
                ${moneySaved.toFixed(2)}
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
                marginTop: 4,
                textAlign: 'center',
              }}>
                Money Saved
              </Text>
            </View>
            
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 20,
              alignItems: 'center',
              width: '48%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#333',
              }}>
                {timeRecovered.hours}h {timeRecovered.minutes}m
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
                marginTop: 4,
                textAlign: 'center',
              }}>
                Time Recovered
              </Text>
            </View>
          </View>
        </View>

        {/* Milestones with Checkboxes */}
        <View style={{
          marginBottom: 32,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 16,
          }}>
            Milestones
          </Text>
          
          {milestones.map((milestone) => {
            const isCompleted = daysSober >= milestone.days;
            const isInProgress = !isCompleted && daysSober > 0;
            const progress = isCompleted ? 100 : (daysSober / milestone.days) * 100;
            
            return (
              <View key={milestone.days} style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 20,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}>
                {/* Checkbox */}
                <View style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  borderWidth: 2,
                  borderColor: isCompleted ? '#28a745' : '#ddd',
                  backgroundColor: isCompleted ? '#28a745' : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}>
                  {isCompleted && (
                    <Text style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                      ✓
                    </Text>
                  )}
                </View>
                
                {/* Milestone Content */}
                <View style={{
                  flex: 1,
                }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: isCompleted ? '#28a745' : '#333',
                    }}>
                      {milestone.days} Days Sober
                    </Text>
                    
                    {isCompleted ? (
                      <Text style={{
                        fontSize: 12,
                        color: '#28a745',
                        fontWeight: '600',
                        backgroundColor: '#e8f5e8',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12,
                      }}>
                        COMPLETED
                      </Text>
                    ) : (
                      <Text style={{
                        fontSize: 14,
                        color: '#666',
                      }}>
                        {milestone.daysLeft} days left
                      </Text>
                    )}
                  </View>
                  
                  {/* Progress bar for each milestone */}
                  <View style={{
                    height: 6,
                    backgroundColor: '#e9ecef',
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}>
                    <View style={{
                      height: '100%',
                      backgroundColor: isCompleted ? '#28a745' : '#007AFF',
                      borderRadius: 3,
                      width: `${Math.min(progress, 100)}%`,
                    }} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Daily Motivation */}
        <View style={{
          backgroundColor: '#fff5cd',
          borderRadius: 12,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#ffc107',
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 8,
          }}>
            Daily Motivation
          </Text>
          <Text style={{
            fontSize: 16,
            color: '#666',
            lineHeight: 24,
            fontStyle: 'italic',
          }}>
            "Day {daysSober} is a testament to your strength. Every day you choose sobriety is a victory worth celebrating."
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrackerScreen;
