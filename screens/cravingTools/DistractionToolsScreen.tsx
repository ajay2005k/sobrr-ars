import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';

interface DistractionActivity {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'physical' | 'mental' | 'creative' | 'social' | 'quick';
  icon: string;
}

const DistractionToolsScreen: React.FC = () => {
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());

  const activities: DistractionActivity[] = [
    {
      id: '1',
      title: 'Take a Walk',
      description: 'Get outside and walk around the block or in a park',
      duration: '10-15 min',
      category: 'physical',
      icon: '🚶‍♂️',
    },
    {
      id: '2',
      title: 'Call a Friend',
      description: 'Reach out to someone you trust and have a conversation',
      duration: '5-20 min',
      category: 'social',
      icon: '📞',
    },
    {
      id: '3',
      title: 'Do Jumping Jacks',
      description: 'Quick burst of physical activity to release endorphins',
      duration: '2-5 min',
      category: 'physical',
      icon: '🤸‍♂️',
    },
    {
      id: '4',
      title: 'Listen to Music',
      description: 'Put on your favorite uplifting playlist',
      duration: '5-30 min',
      category: 'mental',
      icon: '🎵',
    },
    {
      id: '5',
      title: 'Draw or Doodle',
      description: 'Express yourself through art, no skill required',
      duration: '10-30 min',
      category: 'creative',
      icon: '🎨',
    },
    {
      id: '6',
      title: 'Cold Water on Face',
      description: 'Splash cold water on your face to reset your mind',
      duration: '1-2 min',
      category: 'quick',
      icon: '💧',
    },
    {
      id: '7',
      title: 'Count to 100',
      description: 'Slowly count backwards from 100 to calm your mind',
      duration: '2-3 min',
      category: 'mental',
      icon: '🔢',
    },
    {
      id: '8',
      title: 'Organize Something',
      description: 'Tidy up a drawer, desk, or small area',
      duration: '10-20 min',
      category: 'mental',
      icon: '📦',
    },
    {
      id: '9',
      title: 'Text Support Person',
      description: 'Send a message to someone in your support network',
      duration: '2-5 min',
      category: 'social',
      icon: '💬',
    },
    {
      id: '10',
      title: 'Write a Poem',
      description: 'Express your feelings through creative writing',
      duration: '15-30 min',
      category: 'creative',
      icon: '✍️',
    },
    {
      id: '11',
      title: 'Do Push-ups',
      description: 'Quick strength exercise to channel energy',
      duration: '2-5 min',
      category: 'physical',
      icon: '💪',
    },
    {
      id: '12',
      title: 'Watch Funny Videos',
      description: 'Find something that makes you laugh',
      duration: '5-15 min',
      category: 'mental',
      icon: '😂',
    },
  ];

  const categoryColors = {
    physical: '#28a745',
    mental: '#007AFF',
    creative: '#9c27b0',
    social: '#fd7e14',
    quick: '#dc3545',
  };

  const categoryLabels = {
    physical: 'Physical',
    mental: 'Mental',
    creative: 'Creative',
    social: 'Social',
    quick: 'Quick Fix',
  };

  const handleActivityPress = (activity: DistractionActivity) => {
    const newCompleted = new Set(completedActivities);
    
    if (completedActivities.has(activity.id)) {
      newCompleted.delete(activity.id);
      Alert.alert('Activity Unmarked', `"${activity.title}" removed from completed activities.`);
    } else {
      newCompleted.add(activity.id);
      Alert.alert('Great Job!', `You completed "${activity.title}"! Keep up the good work.`);
    }
    
    setCompletedActivities(newCompleted);
  };

  const groupedActivities = activities.reduce((groups, activity) => {
    const category = activity.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(activity);
    return groups;
  }, {} as Record<string, DistractionActivity[]>);

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
          Distraction Tools
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 24,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Choose an activity to redirect your focus and energy
        </Text>
        
        {/* Progress Summary */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <View>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#007AFF',
            }}>
              {completedActivities.size}/{activities.length}
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#666',
            }}>
              Activities Completed
            </Text>
          </View>
          <Text style={{
            fontSize: 32,
          }}>
            {completedActivities.size >= 5 ? '🏆' : completedActivities.size >= 3 ? '🌟' : '💪'}
          </Text>
        </View>
        
        {/* Activity Categories */}
        {Object.entries(groupedActivities).map(([category, categoryActivities]) => (
          <View key={category} style={{
            marginBottom: 24,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: categoryColors[category as keyof typeof categoryColors],
              marginBottom: 12,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              {categoryLabels[category as keyof typeof categoryLabels]}
            </Text>
            
            {categoryActivities.map((activity) => {
              const isCompleted = completedActivities.has(activity.id);
              
              return (
                <TouchableOpacity
                  key={activity.id}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 20,
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderLeftWidth: 4,
                    borderLeftColor: categoryColors[activity.category],
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isCompleted ? 0.15 : 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    opacity: isCompleted ? 0.8 : 1,
                  }}
                  onPress={() => handleActivityPress(activity)}
                >
                  <Text style={{
                    fontSize: 32,
                    marginRight: 16,
                  }}>
                    {activity.icon}
                  </Text>
                  
                  <View style={{
                    flex: 1,
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                      <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: isCompleted ? '#28a745' : '#333',
                        flex: 1,
                        textDecorationLine: isCompleted ? 'line-through' : 'none',
                      }}>
                        {activity.title}
                      </Text>
                      
                      {isCompleted && (
                        <View style={{
                          backgroundColor: '#28a745',
                          borderRadius: 12,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                        }}>
                          <Text style={{
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: '600',
                          }}>
                            ✓ DONE
                          </Text>
                        </View>
                      )}
                    </View>
                    
                    <Text style={{
                      fontSize: 14,
                      color: '#666',
                      marginBottom: 4,
                      lineHeight: 18,
                    }}>
                      {activity.description}
                    </Text>
                    
                    <Text style={{
                      fontSize: 12,
                      color: categoryColors[activity.category],
                      fontWeight: '500',
                    }}>
                      {activity.duration}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
        
        {/* Encouragement Message */}
        <View style={{
          backgroundColor: '#e8f5e8',
          borderRadius: 12,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#28a745',
          marginBottom: 20,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#2e7d32',
            marginBottom: 8,
          }}>
            🌟 Remember:
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#2e7d32',
            lineHeight: 20,
          }}>
            Even small distractions can break the craving cycle. The goal is to shift your focus until the urge passes. You're stronger than you think!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DistractionToolsScreen;
