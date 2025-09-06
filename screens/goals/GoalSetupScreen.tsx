import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'finance' | 'personal' | 'social' | 'milestone';
  targetDate?: string;
  isCompleted: boolean;
  createdAt: Date;
}

const GoalSetupScreen: React.FC = () => {
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Goal['category']>('personal');
  const [targetDate, setTargetDate] = useState('');
  const [goals, setGoals] = useState<Goal[]>([]);

  const categories = [
    { id: 'health', label: 'Health & Fitness', emoji: '💪', color: '#28a745' },
    { id: 'finance', label: 'Financial', emoji: '💰', color: '#ffc107' },
    { id: 'personal', label: 'Personal Growth', emoji: '🌱', color: '#17a2b8' },
    { id: 'social', label: 'Social & Family', emoji: '👥', color: '#fd7e14' },
    { id: 'milestone', label: 'Recovery Milestone', emoji: '🏆', color: '#6f42c1' },
  ] as const;

  const addGoal = () => {
    if (goalTitle.trim() === '') {
      Alert.alert('Title Required', 'Please enter a goal title.');
      return;
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: goalTitle.trim(),
      description: goalDescription.trim(),
      category: selectedCategory,
      targetDate: targetDate.trim() || undefined,
      isCompleted: false,
      createdAt: new Date(),
    };

    setGoals([newGoal, ...goals]);
    
    // Reset form
    setGoalTitle('');
    setGoalDescription('');
    setTargetDate('');
    
    Alert.alert('Goal Added!', `"${newGoal.title}" has been added to your goals.`);
  };

  const toggleGoalCompletion = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, isCompleted: !goal.isCompleted }
        : goal
    ));
  };

  const deleteGoal = (goalId: string) => {
    const goalToDelete = goals.find(g => g.id === goalId);
    Alert.alert(
      'Delete Goal',
      `Are you sure you want to delete "${goalToDelete?.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setGoals(goals.filter(g => g.id !== goalId)),
        },
      ]
    );
  };

  const getCategoryData = (categoryId: Goal['category']) => {
    return categories.find(c => c.id === categoryId);
  };

  const completedGoals = goals.filter(g => g.isCompleted);
  const activeGoals = goals.filter(g => !g.isCompleted);

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
          Goal Setup
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Set meaningful goals to guide your recovery journey
        </Text>
        
        {/* Goal Creation Form */}
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
            Create New Goal
          </Text>
          
          {/* Goal Title Input */}
          <View style={{
            marginBottom: 16,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#333',
              marginBottom: 8,
            }}>
              Goal Title *
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
              placeholder="e.g., Exercise 3 times per week"
              value={goalTitle}
              onChangeText={setGoalTitle}
            />
          </View>
          
          {/* Goal Description Input */}
          <View style={{
            marginBottom: 16,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#333',
              marginBottom: 8,
            }}>
              Description (Optional)
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#e9ecef',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                minHeight: 80,
                textAlignVertical: 'top',
                color: '#333',
              }}
              placeholder="Describe your goal and why it's important to you..."
              multiline
              value={goalDescription}
              onChangeText={setGoalDescription}
            />
          </View>
          
          {/* Category Selection */}
          <View style={{
            marginBottom: 16,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#333',
              marginBottom: 12,
            }}>
              Category
            </Text>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
            }}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: selectedCategory === category.id ? category.color : '#f8f9fa',
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: selectedCategory === category.id ? category.color : '#e9ecef',
                  }}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={{
                    fontSize: 16,
                    marginRight: 4,
                  }}>
                    {category.emoji}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: selectedCategory === category.id ? '#fff' : '#333',
                  }}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Target Date Input */}
          <View style={{
            marginBottom: 20,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#333',
              marginBottom: 8,
            }}>
              Target Date (Optional)
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
              placeholder="e.g., End of this month, Next Friday..."
              value={targetDate}
              onChangeText={setTargetDate}
            />
          </View>
          
          {/* Add Button */}
          <TouchableOpacity
            style={{
              backgroundColor: goalTitle.trim() ? '#007AFF' : '#ccc',
              paddingVertical: 14,
              borderRadius: 8,
            }}
            onPress={addGoal}
            disabled={!goalTitle.trim()}
          >
            <Text style={{
              color: goalTitle.trim() ? '#fff' : '#999',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
            }}>
              Add Goal
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Goals Summary */}
        {goals.length > 0 && (
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
              Goals Summary
            </Text>
            
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 16,
            }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#007AFF',
                }}>
                  {goals.length}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#666',
                }}>
                  Total Goals
                </Text>
              </View>
              
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#28a745',
                }}>
                  {completedGoals.length}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#666',
                }}>
                  Completed
                </Text>
              </View>
              
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#ffc107',
                }}>
                  {activeGoals.length}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#666',
                }}>
                  In Progress
                </Text>
              </View>
            </View>
          </View>
        )}
        
        {/* Goals List */}
        {goals.length > 0 && (
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
              Your Goals ({goals.length})
            </Text>
            
            {goals.map((goal) => {
              const categoryData = getCategoryData(goal.category);
              
              return (
                <View
                  key={goal.id}
                  style={{
                    borderLeftWidth: 4,
                    borderLeftColor: categoryData?.color || '#ccc',
                    paddingLeft: 16,
                    paddingVertical: 16,
                    marginBottom: 12,
                    backgroundColor: goal.isCompleted ? '#f8f9fa' : '#fff',
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#e9ecef',
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
                          fontSize: 16,
                          marginRight: 8,
                        }}>
                          {categoryData?.emoji}
                        </Text>
                        <Text style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: goal.isCompleted ? '#666' : '#333',
                          textDecorationLine: goal.isCompleted ? 'line-through' : 'none',
                          flex: 1,
                        }}>
                          {goal.title}
                        </Text>
                      </View>
                      
                      {goal.description && (
                        <Text style={{
                          fontSize: 14,
                          color: '#666',
                          lineHeight: 18,
                          marginBottom: 4,
                        }}>
                          {goal.description}
                        </Text>
                      )}
                      
                      {goal.targetDate && (
                        <Text style={{
                          fontSize: 12,
                          color: categoryData?.color || '#666',
                          fontWeight: '500',
                        }}>
                          Target: {goal.targetDate}
                        </Text>
                      )}
                    </View>
                    
                    <View style={{
                      flexDirection: 'row',
                      gap: 8,
                    }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: goal.isCompleted ? '#28a745' : '#6c757d',
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 16,
                        }}
                        onPress={() => toggleGoalCompletion(goal.id)}
                      >
                        <Text style={{
                          color: '#fff',
                          fontSize: 12,
                          fontWeight: '600',
                        }}>
                          {goal.isCompleted ? '✓ Done' : 'Mark Done'}
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#dc3545',
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 16,
                        }}
                        onPress={() => deleteGoal(goal.id)}
                      >
                        <Text style={{
                          color: '#fff',
                          fontSize: 12,
                          fontWeight: '600',
                        }}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
        
        {/* Empty State */}
        {goals.length === 0 && (
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 32,
            alignItems: 'center',
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
              🎯
            </Text>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#333',
              marginBottom: 8,
              textAlign: 'center',
            }}>
              No Goals Yet
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#666',
              textAlign: 'center',
              lineHeight: 20,
            }}>
              Create your first goal above to start building positive habits and tracking your progress.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GoalSetupScreen;
