import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  lessons: string[];
  completed?: boolean;
}

const LearningModulesScreen: React.FC = () => {
  // Hardcoded learning modules data
  const learningModules: LearningModule[] = [
    {
      id: '1',
      title: "Understanding Addiction",
      description: "Learn the fundamentals of addiction as a disease and how it affects the brain and behavior.",
      duration: "45 min",
      difficulty: "Beginner",
      category: "Education",
      completed: true,
      lessons: [
        "What is Addiction?",
        "The Brain on Drugs",
        "Physical vs Psychological Dependence",
        "Common Myths About Addiction",
        "The Disease Model of Addiction",
      ],
    },
    {
      id: '2',
      title: "Recognizing Triggers and Warning Signs",
      description: "Identify personal triggers and early warning signs that may lead to relapse.",
      duration: "60 min",
      difficulty: "Beginner",
      category: "Relapse Prevention",
      completed: true,
      lessons: [
        "Types of Triggers",
        "Environmental Triggers",
        "Emotional Triggers",
        "Social Triggers",
        "Creating a Trigger Map",
        "Early Warning Signs",
      ],
    },
    {
      id: '3',
      title: "Building Coping Strategies",
      description: "Develop healthy coping mechanisms to replace substance use behaviors.",
      duration: "75 min",
      difficulty: "Intermediate",
      category: "Coping Skills",
      completed: false,
      lessons: [
        "Healthy vs Unhealthy Coping",
        "Mindfulness Techniques",
        "Stress Management",
        "Problem-Solving Skills",
        "Distraction Techniques",
        "Emergency Coping Plans",
        "Practice Scenarios",
      ],
    },
    {
      id: '4',
      title: "Communication and Relationships",
      description: "Learn effective communication skills and how to rebuild healthy relationships.",
      duration: "90 min",
      difficulty: "Intermediate",
      category: "Relationships",
      completed: false,
      lessons: [
        "Active Listening",
        "Expressing Emotions Healthily",
        "Setting Boundaries",
        "Rebuilding Trust",
        "Conflict Resolution",
        "Healthy vs Toxic Relationships",
        "Supporting Others in Recovery",
      ],
    },
    {
      id: '5',
      title: "Mindfulness and Meditation",
      description: "Explore mindfulness practices and meditation techniques for recovery.",
      duration: "50 min",
      difficulty: "Beginner",
      category: "Mental Health",
      completed: false,
      lessons: [
        "Introduction to Mindfulness",
        "Basic Breathing Exercises",
        "Body Scan Meditation",
        "Mindful Walking",
        "Dealing with Difficult Emotions",
        "Daily Mindfulness Practices",
      ],
    },
    {
      id: '6',
      title: "Creating a Recovery Plan",
      description: "Develop a comprehensive, personalized plan for long-term recovery success.",
      duration: "120 min",
      difficulty: "Advanced",
      category: "Planning",
      completed: false,
      lessons: [
        "Assessing Your Current Situation",
        "Setting SMART Goals",
        "Building Your Support Network",
        "Creating Daily Routines",
        "Relapse Prevention Planning",
        "Emergency Action Plans",
        "Regular Plan Reviews",
        "Celebrating Milestones",
      ],
    },
    {
      id: '7',
      title: "Nutrition and Physical Health",
      description: "Understand the importance of physical health in recovery and develop healthy habits.",
      duration: "55 min",
      difficulty: "Beginner",
      category: "Health",
      completed: false,
      lessons: [
        "Nutrition Basics for Recovery",
        "Exercise and Mental Health",
        "Sleep Hygiene",
        "Managing Cravings Through Diet",
        "Hydration and Recovery",
        "Creating Healthy Routines",
      ],
    },
    {
      id: '8',
      title: "Workplace and Financial Recovery",
      description: "Navigate career challenges and rebuild financial stability during recovery.",
      duration: "65 min",
      difficulty: "Intermediate",
      category: "Life Skills",
      completed: false,
      lessons: [
        "Returning to Work",
        "Workplace Stress Management",
        "Financial Planning Basics",
        "Budgeting in Recovery",
        "Career Development",
        "Building Professional Relationships",
      ],
    },
  ];

  const getDifficultyColor = (difficulty: LearningModule['difficulty']) => {
    switch (difficulty) {
      case 'Beginner': return '#28a745';
      case 'Intermediate': return '#ffc107';
      case 'Advanced': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Education': return '#007AFF';
      case 'Relapse Prevention': return '#dc3545';
      case 'Coping Skills': return '#6f42c1';
      case 'Relationships': return '#28a745';
      case 'Mental Health': return '#17a2b8';
      case 'Planning': return '#fd7e14';
      case 'Health': return '#20c997';
      case 'Life Skills': return '#e83e8c';
      default: return '#6c757d';
    }
  };

  const completedModules = learningModules.filter(m => m.completed);
  const inProgressModules = learningModules.filter(m => !m.completed);

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
          Learning Modules
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Structured lessons to support your recovery education
        </Text>
        
        {/* Progress Overview */}
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
            Learning Progress
          </Text>
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 16,
          }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: '#28a745',
              }}>
                {completedModules.length}
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
                fontSize: 32,
                fontWeight: 'bold',
                color: '#ffc107',
              }}>
                {inProgressModules.length}
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
              }}>
                Available
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: '#007AFF',
              }}>
                {Math.round((completedModules.length / learningModules.length) * 100)}%
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
              }}>
                Complete
              </Text>
            </View>
          </View>
          
          {/* Overall Progress Bar */}
          <View style={{
            height: 8,
            backgroundColor: '#e9ecef',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <View style={{
              height: '100%',
              backgroundColor: '#007AFF',
              borderRadius: 4,
              width: `${(completedModules.length / learningModules.length) * 100}%`,
            }} />
          </View>
        </View>
        
        {/* Learning Modules List */}
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
            All Modules ({learningModules.length})
          </Text>
          
          {learningModules.map((module, index) => (
            <View
              key={module.id}
              style={{
                borderBottomWidth: index < learningModules.length - 1 ? 1 : 0,
                borderBottomColor: '#f0f0f0',
                paddingBottom: index < learningModules.length - 1 ? 20 : 0,
                marginBottom: index < learningModules.length - 1 ? 20 : 0,
                opacity: module.completed ? 0.8 : 1,
              }}
            >
              {/* Module Header */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: 12,
              }}>
                <View style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: module.completed ? '#28a745' : getCategoryColor(module.category),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}>
                  <Text style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                    {module.completed ? '✓' : index + 1}
                  </Text>
                </View>
                
                <View style={{ flex: 1 }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 4,
                    flexWrap: 'wrap',
                    gap: 8,
                  }}>
                    <View style={{
                      backgroundColor: getCategoryColor(module.category),
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 4,
                    }}>
                      <Text style={{
                        fontSize: 10,
                        color: '#fff',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                      }}>
                        {module.category}
                      </Text>
                    </View>
                    
                    <View style={{
                      backgroundColor: getDifficultyColor(module.difficulty),
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 4,
                    }}>
                      <Text style={{
                        fontSize: 10,
                        color: '#fff',
                        fontWeight: '600',
                      }}>
                        {module.difficulty}
                      </Text>
                    </View>
                    
                    {module.completed && (
                      <View style={{
                        backgroundColor: '#28a745',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 4,
                      }}>
                        <Text style={{
                          fontSize: 10,
                          color: '#fff',
                          fontWeight: '600',
                        }}>
                          COMPLETED
                        </Text>
                      </View>
                    )}
                  </View>
                  
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: module.completed ? '#666' : '#333',
                    marginBottom: 4,
                    textDecorationLine: module.completed ? 'line-through' : 'none',
                  }}>
                    {module.title}
                  </Text>
                  
                  <Text style={{
                    fontSize: 14,
                    color: '#666',
                    lineHeight: 20,
                    marginBottom: 8,
                  }}>
                    {module.description}
                  </Text>
                  
                  <Text style={{
                    fontSize: 12,
                    color: '#999',
                    marginBottom: 12,
                  }}>
                    Duration: {module.duration} • {module.lessons.length} lessons
                  </Text>
                  
                  {/* Lessons List */}
                  <View style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: 8,
                    padding: 12,
                  }}>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: 8,
                    }}>
                      Lessons in this module:
                    </Text>
                    {module.lessons.map((lesson, lessonIndex) => (
                      <Text
                        key={lessonIndex}
                        style={{
                          fontSize: 13,
                          color: '#666',
                          marginBottom: 4,
                          paddingLeft: 8,
                        }}
                      >
                        {lessonIndex + 1}. {lesson}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
        
        {/* Learning Tips */}
        <View style={{
          backgroundColor: '#e3f2fd',
          borderRadius: 12,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#2196f3',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#1565c0',
            marginBottom: 8,
          }}>
            📚 Learning Tips:
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#1565c0',
            lineHeight: 20,
          }}>
            • Take modules at your own pace{'\n'}
            • Review completed modules periodically{'\n'}
            • Take notes on key concepts{'\n'}
            • Apply lessons to real-life situations{'\n'}
            • Discuss learnings with your support network{'\n'}
            • Start with beginner modules and progress gradually
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LearningModulesScreen;
