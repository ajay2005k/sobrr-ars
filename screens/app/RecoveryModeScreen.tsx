import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'morning' | 'daily' | 'evening' | 'weekly';
  isCompleted: boolean;
}

const RecoveryModeScreen: React.FC = () => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // Morning Routine
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Start your day with 5-10 minutes of mindfulness',
      category: 'morning',
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Set Daily Intention',
      description: 'Choose one positive goal for today',
      category: 'morning',
      isCompleted: false,
    },
    {
      id: '3',
      title: 'Healthy Breakfast',
      description: 'Nourish your body with a nutritious meal',
      category: 'morning',
      isCompleted: false,
    },
    
    // Daily Activities
    {
      id: '4',
      title: 'Check-in with Support Person',
      description: 'Connect with a friend, family member, or sponsor',
      category: 'daily',
      isCompleted: false,
    },
    {
      id: '5',
      title: 'Physical Activity',
      description: 'Move your body for at least 30 minutes',
      category: 'daily',
      isCompleted: false,
    },
    {
      id: '6',
      title: 'Practice Gratitude',
      description: 'Write down 3 things you\'re grateful for',
      category: 'daily',
      isCompleted: false,
    },
    {
      id: '7',
      title: 'Avoid Triggers',
      description: 'Stay away from people, places, or situations that trigger cravings',
      category: 'daily',
      isCompleted: false,
    },
    {
      id: '8',
      title: 'Hydrate Well',
      description: 'Drink at least 8 glasses of water',
      category: 'daily',
      isCompleted: false,
    },
    
    // Evening Routine
    {
      id: '9',
      title: 'Reflect on the Day',
      description: 'Journal about your experiences and feelings',
      category: 'evening',
      isCompleted: false,
    },
    {
      id: '10',
      title: 'Plan Tomorrow',
      description: 'Set yourself up for success tomorrow',
      category: 'evening',
      isCompleted: false,
    },
    {
      id: '11',
      title: 'Wind Down Routine',
      description: 'Prepare for restful sleep (no screens 1hr before bed)',
      category: 'evening',
      isCompleted: false,
    },
    
    // Weekly Goals
    {
      id: '12',
      title: 'Attend Support Meeting',
      description: 'Join a recovery group or therapy session',
      category: 'weekly',
      isCompleted: false,
    },
    {
      id: '13',
      title: 'Learn Something New',
      description: 'Read recovery literature or take an online course',
      category: 'weekly',
      isCompleted: false,
    },
    {
      id: '14',
      title: 'Social Connection',
      description: 'Spend quality time with supportive friends or family',
      category: 'weekly',
      isCompleted: false,
    },
  ]);

  const toggleItem = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const getCompletionStats = () => {
    const completed = checklistItems.filter(item => item.isCompleted).length;
    const total = checklistItems.length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  };

  const getCategoryItems = (category: ChecklistItem['category']) => {
    return checklistItems.filter(item => item.category === category);
  };

  const getCategoryTitle = (category: ChecklistItem['category']) => {
    switch (category) {
      case 'morning': return '🌅 Morning Routine';
      case 'daily': return '☀️ Daily Activities';
      case 'evening': return '🌙 Evening Routine';
      case 'weekly': return '📅 Weekly Goals';
      default: return category;
    }
  };

  const getCategoryColor = (category: ChecklistItem['category']) => {
    switch (category) {
      case 'morning': return '#ff9500';
      case 'daily': return '#007AFF';
      case 'evening': return '#5856d6';
      case 'weekly': return '#34c759';
      default: return '#007AFF';
    }
  };

  const stats = getCompletionStats();

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#fff',
    }}>
      <ScrollView contentContainerStyle={{
        paddingHorizontal: 24,
        paddingVertical: 32,
      }}>
        <View style={{
          alignItems: 'center',
          marginBottom: 32,
        }}>
          <Text style={{
            fontSize: 32,
            marginBottom: 16,
          }}>
            🎯
          </Text>
          
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 8,
            textAlign: 'center',
          }}>
            Recovery Mode
          </Text>
          
          <Text style={{
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            lineHeight: 22,
            marginBottom: 24,
          }}>
            Your daily recovery checklist to stay on track
          </Text>

          {/* Progress Card */}
          <View style={{
            backgroundColor: '#f0f8ff',
            borderRadius: 16,
            padding: 20,
            width: '100%',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: '#007AFF',
          }}>
            <Text style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#007AFF',
            }}>
              {stats.percentage}%
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: '#333',
              fontWeight: '600',
              marginBottom: 8,
            }}>
              Daily Progress
            </Text>
            
            <Text style={{
              fontSize: 14,
              color: '#666',
            }}>
              {stats.completed} of {stats.total} tasks completed
            </Text>
            
            <View style={{
              width: '100%',
              height: 8,
              backgroundColor: '#e0e0e0',
              borderRadius: 4,
              marginTop: 16,
              overflow: 'hidden',
            }}>
              <View style={{
                width: `${stats.percentage}%`,
                height: '100%',
                backgroundColor: '#007AFF',
                borderRadius: 4,
              }} />
            </View>
          </View>
        </View>

        {/* Checklist Categories */}
        {(['morning', 'daily', 'evening', 'weekly'] as const).map((category) => {
          const categoryItems = getCategoryItems(category);
          const categoryColor = getCategoryColor(category);
          
          return (
            <View key={category} style={{
              marginBottom: 32,
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#333',
                marginBottom: 16,
              }}>
                {getCategoryTitle(category)}
              </Text>
              
              {categoryItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    backgroundColor: item.isCompleted ? '#e8f5e8' : '#f8f9fa',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: item.isCompleted ? '#4caf50' : 'transparent',
                  }}
                  onPress={() => toggleItem(item.id)}
                >
                  <View style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    borderWidth: 2,
                    borderColor: item.isCompleted ? '#4caf50' : categoryColor,
                    backgroundColor: item.isCompleted ? '#4caf50' : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    {item.isCompleted && (
                      <Text style={{
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                        ✓
                      </Text>
                    )}
                  </View>
                  
                  <View style={{
                    flex: 1,
                  }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: item.isCompleted ? '#2e7d32' : '#333',
                      marginBottom: 4,
                    }}>
                      {item.title}
                    </Text>
                    
                    <Text style={{
                      fontSize: 14,
                      color: item.isCompleted ? '#2e7d32' : '#666',
                      lineHeight: 18,
                    }}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}

        {/* Motivational Footer */}
        <View style={{
          backgroundColor: '#fff3cd',
          borderRadius: 12,
          padding: 20,
          marginTop: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#ffc107',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#856404',
            marginBottom: 8,
            textAlign: 'center',
          }}>
            🌟 Keep Going!
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: '#856404',
            textAlign: 'center',
            lineHeight: 20,
          }}>
            Every checked box is a step forward in your recovery journey. 
            You're building healthy habits that will serve you for life.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecoveryModeScreen;
