import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GoalsStackParamList } from '../../types/navigation';

type GoalsScreenNavigationProp = StackNavigationProp<
  GoalsStackParamList,
  'GoalsHome'
>;

interface Props {
  navigation: GoalsScreenNavigationProp;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  deadline?: string;
}

const initialGoals: Goal[] = [
  {
    id: '1',
    title: '30 Days Sober',
    description: 'Reach my first major milestone',
    completed: false,
    deadline: '2025-02-15',
  },
  {
    id: '2',
    title: 'Save $500',
    description: 'Money saved from not buying alcohol',
    completed: false,
    deadline: '2025-03-01',
  },
  {
    id: '3',
    title: 'Start Exercise Routine',
    description: 'Replace drinking time with healthy activities',
    completed: true,
    deadline: '2025-01-20',
  },
  {
    id: '4',
    title: 'Read 5 Books',
    description: 'Use recovered time for personal growth',
    completed: false,
    deadline: '2025-06-01',
  },
];

const GoalsScreen: React.FC<Props> = ({ navigation }) => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');

  const toggleGoalCompletion = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed: !goal.completed }
        : goal
    ));
  };

  const addNewGoal = () => {
    if (newGoalTitle.trim()) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        title: newGoalTitle.trim(),
        description: newGoalDescription.trim(),
        completed: false,
      };
      setGoals([...goals, newGoal]);
      setNewGoalTitle('');
      setNewGoalDescription('');
      setShowAddGoal(false);
    }
  };

  const completedGoals = goals.filter(goal => goal.completed);
  const activeGoals = goals.filter(goal => !goal.completed);

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
          marginBottom: 8,
          textAlign: 'center',
        }}>
          Your Goals
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Set, track, and achieve your recovery goals
        </Text>
        
        {/* Stats Overview */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 32,
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            alignItems: 'center',
            minWidth: 100,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Text style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#28a745',
            }}>
              {completedGoals.length}
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#666',
              marginTop: 4,
            }}>
              Completed
            </Text>
          </View>
          
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            alignItems: 'center',
            minWidth: 100,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Text style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#007AFF',
            }}>
              {activeGoals.length}
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#666',
              marginTop: 4,
            }}>
              In Progress
            </Text>
          </View>
        </View>

        {/* Navigation Cards */}
        <View style={{
          marginBottom: 32,
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 24,
              marginBottom: 16,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              borderLeftWidth: 4,
              borderLeftColor: '#007AFF',
            }}
            onPress={() => navigation.navigate('GoalSetup')}
          >
            <Text style={{
              fontSize: 32,
              marginRight: 16,
            }}>
              🎯
            </Text>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#333',
                marginBottom: 4,
              }}>
                Goal Setup
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
                lineHeight: 18,
              }}>
                Create and manage your personal goals
              </Text>
            </View>
            
            <Text style={{
              fontSize: 24,
              color: '#999',
              fontWeight: '300',
            }}>
              ›
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 24,
              marginBottom: 16,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              borderLeftWidth: 4,
              borderLeftColor: '#28a745',
            }}
            onPress={() => navigation.navigate('Progress')}
          >
            <Text style={{
              fontSize: 32,
              marginRight: 16,
            }}>
              📊
            </Text>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#333',
                marginBottom: 4,
              }}>
                Progress Overview
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
                lineHeight: 18,
              }}>
                Track your progress with visual indicators
              </Text>
            </View>
            
            <Text style={{
              fontSize: 24,
              color: '#999',
              fontWeight: '300',
            }}>
              ›
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Goal List Preview */}
        {activeGoals.length > 0 && (
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
              Active Goals Preview
            </Text>
            
            {activeGoals.slice(0, 3).map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderBottomWidth: activeGoals.indexOf(goal) < Math.min(activeGoals.length - 1, 2) ? 1 : 0,
                  borderBottomColor: '#f0f0f0',
                }}
                onPress={() => toggleGoalCompletion(goal.id)}
              >
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: goal.completed ? '#28a745' : '#ddd',
                  backgroundColor: goal.completed ? '#28a745' : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}>
                  {goal.completed && (
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
                    color: goal.completed ? '#666' : '#333',
                    textDecorationLine: goal.completed ? 'line-through' : 'none',
                  }}>
                    {goal.title}
                  </Text>
                  {goal.deadline && (
                    <Text style={{
                      fontSize: 12,
                      color: '#007AFF',
                      marginTop: 2,
                    }}>
                      Target: {new Date(goal.deadline).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
            
            {activeGoals.length > 3 && (
              <TouchableOpacity
                style={{
                  paddingTop: 12,
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('GoalSetup')}
              >
                <Text style={{
                  fontSize: 14,
                  color: '#007AFF',
                  fontWeight: '500',
                }}>
                  View All {activeGoals.length} Goals ›
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

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
            🌟 Goal Setting Tips:
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#2e7d32',
            lineHeight: 20,
          }}>
            • Make goals specific and measurable{'\n'}
            • Set realistic deadlines{'\n'}
            • Break large goals into smaller steps{'\n'}
            • Celebrate your progress along the way{'\n'}
            • Review and adjust goals regularly
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GoalsScreen;
