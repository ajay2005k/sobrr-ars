import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

interface DailyHabit {
  id: string;
  title: string;
  createdAt: Date;
  isCompleted: boolean;
}

const RoutineBuilderScreen: React.FC = () => {
  const [habitInput, setHabitInput] = useState('');
  const [habits, setHabits] = useState<DailyHabit[]>([]);

  const addHabit = () => {
    if (habitInput.trim() === '') {
      Alert.alert('Input Required', 'Please enter a habit to add to your routine.');
      return;
    }

    const newHabit: DailyHabit = {
      id: Date.now().toString(),
      title: habitInput.trim(),
      createdAt: new Date(),
      isCompleted: false,
    };

    setHabits([newHabit, ...habits]);
    setHabitInput('');
  };

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, isCompleted: !habit.isCompleted }
        : habit
    ));
  };

  const deleteHabit = (habitId: string) => {
    Alert.alert(
      'Delete Habit',
      'Are you sure you want to remove this habit from your routine?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setHabits(habits.filter(habit => habit.id !== habitId));
          },
        },
      ]
    );
  };

  const getCompletionStats = () => {
    const completed = habits.filter(habit => habit.isCompleted).length;
    const total = habits.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  };

  const stats = getCompletionStats();

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
        <View style={{
          alignItems: 'center',
          marginBottom: 32,
        }}>
          <Text style={{
            fontSize: 32,
            marginBottom: 16,
          }}>
            🏗️
          </Text>
          
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 8,
            textAlign: 'center',
          }}>
            Routine Builder
          </Text>
          
          <Text style={{
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            lineHeight: 22,
          }}>
            Build healthy daily habits to support your recovery
          </Text>
        </View>

        {/* Add Habit Section */}
        <View style={{
          backgroundColor: '#f0f8ff',
          borderRadius: 16,
          padding: 20,
          marginBottom: 32,
          borderWidth: 2,
          borderColor: '#007AFF',
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#333',
            marginBottom: 16,
          }}>
            Add New Habit
          </Text>
          
          <TextInput
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontSize: 16,
              borderWidth: 1,
              borderColor: '#e0e0e0',
              marginBottom: 16,
            }}
            placeholder="Enter a daily habit (e.g., 'Meditate for 10 minutes')"
            value={habitInput}
            onChangeText={setHabitInput}
            multiline={false}
            returnKeyType="done"
            onSubmitEditing={addHabit}
          />
          
          <TouchableOpacity 
            style={{
              backgroundColor: habitInput.trim() ? '#007AFF' : '#ccc',
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: habitInput.trim() ? 0.1 : 0,
              shadowRadius: 4,
              elevation: habitInput.trim() ? 3 : 0,
            }}
            onPress={addHabit}
            disabled={!habitInput.trim()}
          >
            <Text style={{
              color: habitInput.trim() ? '#fff' : '#999',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Add Habit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Stats */}
        {habits.length > 0 && (
          <View style={{
            backgroundColor: '#e8f5e8',
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: '#4caf50',
          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#2e7d32',
              marginBottom: 8,
            }}>
              {stats.percentage}%
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: '#2e7d32',
              fontWeight: '600',
              marginBottom: 4,
            }}>
              Today's Progress
            </Text>
            
            <Text style={{
              fontSize: 14,
              color: '#2e7d32',
            }}>
              {stats.completed} of {stats.total} habits completed
            </Text>
            
            <View style={{
              width: '100%',
              height: 6,
              backgroundColor: '#c8e6c9',
              borderRadius: 3,
              marginTop: 12,
              overflow: 'hidden',
            }}>
              <View style={{
                width: `${stats.percentage}%`,
                height: '100%',
                backgroundColor: '#4caf50',
                borderRadius: 3,
              }} />
            </View>
          </View>
        )}

        {/* Habits List */}
        <View style={{
          marginBottom: 24,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#333',
            marginBottom: 16,
          }}>
            Your Daily Habits ({habits.length})
          </Text>
          
          {habits.length === 0 ? (
            <View style={{
              backgroundColor: '#f8f9fa',
              borderRadius: 12,
              padding: 32,
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 48,
                marginBottom: 16,
              }}>
                📝
              </Text>
              
              <Text style={{
                fontSize: 16,
                color: '#666',
                textAlign: 'center',
                lineHeight: 22,
              }}>
                No habits added yet. Start building your recovery routine by adding your first habit above!
              </Text>
            </View>
          ) : (
            habits.map((habit) => (
              <View
                key={habit.id}
                style={{
                  backgroundColor: habit.isCompleted ? '#e8f5e8' : '#f8f9fa',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: habit.isCompleted ? '#4caf50' : 'transparent',
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    borderWidth: 2,
                    borderColor: habit.isCompleted ? '#4caf50' : '#007AFF',
                    backgroundColor: habit.isCompleted ? '#4caf50' : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}
                  onPress={() => toggleHabit(habit.id)}
                >
                  {habit.isCompleted && (
                    <Text style={{
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
                
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: habit.isCompleted ? '#2e7d32' : '#333',
                    textDecorationLine: habit.isCompleted ? 'line-through' : 'none',
                  }}>
                    {habit.title}
                  </Text>
                  
                  <Text style={{
                    fontSize: 12,
                    color: habit.isCompleted ? '#2e7d32' : '#999',
                    marginTop: 4,
                  }}>
                    Added {habit.createdAt.toLocaleDateString()}
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={{
                    padding: 8,
                  }}
                  onPress={() => deleteHabit(habit.id)}
                >
                  <Text style={{
                    fontSize: 16,
                    color: '#dc3545',
                  }}>
                    🗑️
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Tips Section */}
        <View style={{
          backgroundColor: '#fff3cd',
          borderRadius: 12,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#ffc107',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#856404',
            marginBottom: 12,
          }}>
            💡 Building Healthy Habits
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
            marginBottom: 8,
          }}>
            • Start small - even 5 minutes counts
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
            marginBottom: 8,
          }}>
            • Be consistent rather than perfect
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
            marginBottom: 8,
          }}>
            • Stack new habits with existing ones
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#856404',
            lineHeight: 20,
          }}>
            • Celebrate small wins along the way
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoutineBuilderScreen;
