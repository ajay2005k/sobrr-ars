import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';

interface Podcast {
  id: string;
  title: string;
  host: string;
  duration: string;
  description: string;
  category: string;
  episodeNumber?: number;
}

const PodcastsScreen: React.FC = () => {
  const [playingPodcast, setPlayingPodcast] = useState<string | null>(null);

  // Hardcoded podcast data
  const podcasts: Podcast[] = [
    {
      id: '1',
      title: "The First 30 Days: What to Expect in Early Recovery",
      host: "Dr. Sarah Mitchell",
      duration: "32:15",
      description: "A comprehensive guide to navigating the challenges and milestones of your first month in recovery.",
      category: "Recovery Basics",
      episodeNumber: 45,
    },
    {
      id: '2',
      title: "Building Your Support Network",
      host: "Mike Johnson & Team",
      duration: "28:42",
      description: "Learn how to identify, build, and maintain relationships that will support your recovery journey.",
      category: "Relationships",
      episodeNumber: 23,
    },
    {
      id: '3',
      title: "Mindfulness and Meditation for Addiction Recovery",
      host: "Dr. Lisa Chen",
      duration: "41:08",
      description: "Practical techniques for incorporating mindfulness practices into your daily recovery routine.",
      category: "Mental Health",
      episodeNumber: 67,
    },
    {
      id: '4',
      title: "Overcoming Shame and Guilt in Recovery",
      host: "Rachel Thompson, LCSW",
      duration: "35:29",
      description: "Understanding and working through the difficult emotions that often accompany addiction recovery.",
      category: "Emotional Healing",
      episodeNumber: 12,
    },
    {
      id: '5',
      title: "Relapse Prevention: Identifying Your Triggers",
      host: "Dr. Mark Williams",
      duration: "26:54",
      description: "Learn to recognize, understand, and develop strategies for managing your personal addiction triggers.",
      category: "Relapse Prevention",
      episodeNumber: 89,
    },
    {
      id: '6',
      title: "Rebuilding Trust with Family and Friends",
      host: "Jennifer Adams, MFT",
      duration: "44:33",
      description: "A guide for repairing damaged relationships and building healthy boundaries during recovery.",
      category: "Relationships",
      episodeNumber: 34,
    },
    {
      id: '7',
      title: "The Science of Addiction: Understanding Your Brain",
      host: "Dr. Robert Klein",
      duration: "38:17",
      description: "Explore how addiction affects the brain and how understanding this can aid in your recovery.",
      category: "Education",
      episodeNumber: 56,
    },
    {
      id: '8',
      title: "Finding Purpose and Meaning After Addiction",
      host: "Maria Gonzalez",
      duration: "31:45",
      description: "Discovering new passions, goals, and sense of purpose as you build your new life in recovery.",
      category: "Personal Growth",
      episodeNumber: 78,
    },
  ];

  const handlePlayPodcast = (podcast: Podcast) => {
    if (playingPodcast === podcast.id) {
      // Stop playing
      setPlayingPodcast(null);
      Alert.alert('Stopped', `Stopped playing "${podcast.title}"`);
    } else {
      // Start playing
      setPlayingPodcast(podcast.id);
      Alert.alert('Now Playing', `Playing "${podcast.title}" by ${podcast.host}`);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Recovery Basics': return '#007AFF';
      case 'Relationships': return '#28a745';
      case 'Mental Health': return '#6f42c1';
      case 'Emotional Healing': return '#fd7e14';
      case 'Relapse Prevention': return '#dc3545';
      case 'Education': return '#17a2b8';
      case 'Personal Growth': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const categories = [...new Set(podcasts.map(p => p.category))];

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
          Recovery Podcasts
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Listen to expert advice and inspiring stories
        </Text>
        
        {/* Currently Playing */}
        {playingPodcast && (
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
              fontWeight: '600',
              color: '#1565c0',
              marginBottom: 4,
            }}>
              🎧 Currently Playing
            </Text>
            <Text style={{
              fontSize: 16,
              color: '#1565c0',
              fontWeight: '500',
            }}>
              {podcasts.find(p => p.id === playingPodcast)?.title}
            </Text>
          </View>
        )}
        
        {/* Categories Overview */}
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
            Podcast Categories
          </Text>
          
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            {categories.map((category) => (
              <View
                key={category}
                style={{
                  backgroundColor: getCategoryColor(category),
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                }}
              >
                <Text style={{
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: '500',
                }}>
                  {category}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Podcast List */}
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
            Featured Episodes
          </Text>
          
          {podcasts.map((podcast, index) => (
            <View
              key={podcast.id}
              style={{
                borderBottomWidth: index < podcasts.length - 1 ? 1 : 0,
                borderBottomColor: '#f0f0f0',
                paddingBottom: index < podcasts.length - 1 ? 20 : 0,
                marginBottom: index < podcasts.length - 1 ? 20 : 0,
              }}
            >
              {/* Episode Header */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: 12,
              }}>
                <View style={{ flex: 1 }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 4,
                  }}>
                    {podcast.episodeNumber && (
                      <Text style={{
                        fontSize: 12,
                        color: '#999',
                        backgroundColor: '#f8f9fa',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 4,
                        marginRight: 8,
                      }}>
                        EP {podcast.episodeNumber}
                      </Text>
                    )}
                    
                    <View style={{
                      backgroundColor: getCategoryColor(podcast.category),
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
                        {podcast.category}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: 4,
                    lineHeight: 24,
                  }}>
                    {podcast.title}
                  </Text>
                  
                  <Text style={{
                    fontSize: 14,
                    color: '#666',
                    marginBottom: 4,
                  }}>
                    Hosted by {podcast.host}
                  </Text>
                  
                  <Text style={{
                    fontSize: 12,
                    color: '#999',
                    marginBottom: 8,
                  }}>
                    Duration: {podcast.duration}
                  </Text>
                  
                  <Text style={{
                    fontSize: 14,
                    color: '#666',
                    lineHeight: 20,
                    marginBottom: 12,
                  }}>
                    {podcast.description}
                  </Text>
                </View>
              </View>
              
              {/* Play Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: playingPodcast === podcast.id ? '#dc3545' : '#007AFF',
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-start',
                }}
                onPress={() => handlePlayPodcast(podcast)}
              >
                <Text style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: '600',
                  marginRight: 8,
                }}>
                  {playingPodcast === podcast.id ? 'Stop' : 'Play'}
                </Text>
                <Text style={{
                  fontSize: 16,
                }}>
                  {playingPodcast === podcast.id ? '⏹️' : '▶️'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        {/* Listening Tips */}
        <View style={{
          backgroundColor: '#fff3e0',
          borderRadius: 12,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#ff9800',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#e65100',
            marginBottom: 8,
          }}>
            🎧 Listening Tips:
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#e65100',
            lineHeight: 20,
          }}>
            • Listen during walks or commutes{'\n'}
            • Take notes on key insights{'\n'}
            • Pause to reflect on important points{'\n'}
            • Share meaningful episodes with your support network{'\n'}
            • Re-listen to episodes that resonate with you
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PodcastsScreen;
