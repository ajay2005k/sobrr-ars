import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

interface GoalProgress {
  id: string;
  title: string;
  category: string;
  progress: number; // 0-100
  emoji: string;
  color: string;
  milestones: string[];
  completedMilestones: number;
}

const ProgressScreen: React.FC = () => {
  // Hardcoded progress data as requested
  const goalProgressData: GoalProgress[] = [
    {
      id: '1',
      title: '30 Days Sober',
      category: 'Recovery Milestone',
      progress: 83, // 25 out of 30 days
      emoji: '🏆',
      color: '#6f42c1',
      milestones: ['1 week', '2 weeks', '3 weeks', '30 days'],
      completedMilestones: 3,
    },
    {
      id: '2',
      title: 'Exercise 3x per Week',
      category: 'Health & Fitness',
      progress: 67, // 2 out of 3 this week
      emoji: '💪',
      color: '#28a745',
      milestones: ['Week 1', 'Week 2', 'Week 3', 'Month 1'],
      completedMilestones: 2,
    },
    {
      id: '3',
      title: 'Save $500',
      category: 'Financial',
      progress: 45, // $225 saved
      emoji: '💰',
      color: '#ffc107',
      milestones: ['$100', '$250', '$400', '$500'],
      completedMilestones: 1,
    },
    {
      id: '4',
      title: 'Read 5 Books',
      category: 'Personal Growth',
      progress: 20, // 1 book completed
      emoji: '📚',
      color: '#17a2b8',
      milestones: ['Book 1', 'Book 2', 'Book 3', 'Book 4', 'Book 5'],
      completedMilestones: 1,
    },
    {
      id: '5',
      title: 'Weekly Support Group',
      category: 'Social & Family',
      progress: 75, // 3 out of 4 weeks this month
      emoji: '👥',
      color: '#fd7e14',
      milestones: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      completedMilestones: 3,
    },
    {
      id: '6',
      title: 'Daily Meditation',
      category: 'Personal Growth',
      progress: 58, // 18 out of 31 days this month
      emoji: '🧘',
      color: '#17a2b8',
      milestones: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      completedMilestones: 2,
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#28a745'; // Green
    if (progress >= 60) return '#ffc107'; // Yellow
    if (progress >= 40) return '#fd7e14'; // Orange
    return '#dc3545'; // Red
  };

  const getProgressMessage = (progress: number) => {
    if (progress >= 90) return 'Almost there! 🎉';
    if (progress >= 80) return 'Great progress! 🌟';
    if (progress >= 60) return 'Good momentum! 👍';
    if (progress >= 40) return 'Keep going! 💪';
    return 'Just getting started! 🚀';
  };

  const averageProgress = Math.round(
    goalProgressData.reduce((sum, goal) => sum + goal.progress, 0) / goalProgressData.length
  );

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
          Progress Overview
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Track your journey with visual progress indicators
        </Text>
        
        {/* Overall Progress Summary */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
          alignItems: 'center',
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
            Overall Progress
          </Text>
          
          <View style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: '#f8f9fa',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
            borderWidth: 8,
            borderColor: getProgressColor(averageProgress),
          }}>
            <Text style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: getProgressColor(averageProgress),
            }}>
              {averageProgress}%
            </Text>
          </View>
          
          <Text style={{
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            marginBottom: 8,
          }}>
            Average across all goals
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: getProgressColor(averageProgress),
            fontWeight: '600',
            textAlign: 'center',
          }}>
            {getProgressMessage(averageProgress)}
          </Text>
        </View>
        
        {/* Individual Goal Progress */}
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
            Goal Progress
          </Text>
          
          {goalProgressData.map((goal, index) => (
            <View
              key={goal.id}
              style={{
                marginBottom: index < goalProgressData.length - 1 ? 24 : 0,
              }}
            >
              {/* Goal Header */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
              }}>
                <Text style={{
                  fontSize: 24,
                  marginRight: 12,
                }}>
                  {goal.emoji}
                </Text>
                
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: 2,
                  }}>
                    {goal.title}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: '#666',
                  }}>
                    {goal.category}
                  </Text>
                </View>
                
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: getProgressColor(goal.progress),
                }}>
                  {goal.progress}%
                </Text>
              </View>
              
              {/* Progress Bar */}
              <View style={{
                height: 12,
                backgroundColor: '#e9ecef',
                borderRadius: 6,
                overflow: 'hidden',
                marginBottom: 12,
              }}>
                <View style={{
                  height: '100%',
                  backgroundColor: getProgressColor(goal.progress),
                  borderRadius: 6,
                  width: `${goal.progress}%`,
                }} />
              </View>
              
              {/* Milestones */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <View style={{
                  flexDirection: 'row',
                  flex: 1,
                }}>
                  {goal.milestones.map((milestone, idx) => (
                    <View
                      key={idx}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 12,
                      }}
                    >
                      <View style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: idx < goal.completedMilestones ? '#28a745' : '#e9ecef',
                        marginRight: 4,
                      }} />
                      <Text style={{
                        fontSize: 12,
                        color: idx < goal.completedMilestones ? '#28a745' : '#666',
                        fontWeight: idx < goal.completedMilestones ? '600' : '400',
                      }}>
                        {milestone}
                      </Text>
                    </View>
                  ))}
                </View>
                
                <Text style={{
                  fontSize: 12,
                  color: getProgressColor(goal.progress),
                  fontWeight: '600',
                }}>
                  {goal.completedMilestones}/{goal.milestones.length}
                </Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Progress Insights */}
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
            Progress Insights
          </Text>
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#28a745',
              }}>
                {goalProgressData.filter(g => g.progress >= 80).length}
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
                textAlign: 'center',
              }}>
                Nearly Complete
              </Text>
            </View>
            
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#ffc107',
              }}>
                {goalProgressData.filter(g => g.progress >= 40 && g.progress < 80).length}
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
                textAlign: 'center',
              }}>
                In Progress
              </Text>
            </View>
            
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#dc3545',
              }}>
                {goalProgressData.filter(g => g.progress < 40).length}
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
                textAlign: 'center',
              }}>
                Need Focus
              </Text>
            </View>
          </View>
        </View>
        
        {/* Motivational Message */}
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
            🌟 Keep Going!
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#2e7d32',
            lineHeight: 20,
          }}>
            Progress isn't always linear, but every step forward counts. You're building the foundation for a healthier, happier life. Celebrate your wins, learn from setbacks, and keep moving forward!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgressScreen;
