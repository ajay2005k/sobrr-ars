import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  mood: 'great' | 'good' | 'okay' | 'struggling' | 'difficult';
}

const JournalingScreen: React.FC = () => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState<JournalEntry['mood'] | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const moods = [
    { id: 'great', label: 'Great', emoji: '😊', color: '#28a745' },
    { id: 'good', label: 'Good', emoji: '🙂', color: '#6f42c1' },
    { id: 'okay', label: 'Okay', emoji: '😐', color: '#ffc107' },
    { id: 'struggling', label: 'Struggling', emoji: '😔', color: '#fd7e14' },
    { id: 'difficult', label: 'Difficult', emoji: '😰', color: '#dc3545' },
  ] as const;

  const saveEntry = () => {
    if (currentEntry.trim() === '') {
      Alert.alert('Empty Entry', 'Please write something before saving.');
      return;
    }

    if (!selectedMood) {
      Alert.alert('Mood Required', 'Please select how you\'re feeling.');
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: currentEntry.trim(),
      timestamp: new Date(),
      mood: selectedMood,
    };

    setEntries([newEntry, ...entries]);
    setCurrentEntry('');
    setSelectedMood(null);
    
    Alert.alert('Saved!', 'Your journal entry has been saved.');
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMoodData = (mood: JournalEntry['mood']) => {
    return moods.find(m => m.id === mood);
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
          Craving Journal
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Write about your feelings, triggers, or thoughts to understand your journey better
        </Text>
        
        {/* Mood Selection */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 20,
          marginBottom: 20,
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
            How are you feeling right now?
          </Text>
          
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: selectedMood === mood.id ? mood.color : '#f8f9fa',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: selectedMood === mood.id ? mood.color : '#e9ecef',
                }}
                onPress={() => setSelectedMood(mood.id)}
              >
                <Text style={{
                  fontSize: 16,
                  marginRight: 4,
                }}>
                  {mood.emoji}
                </Text>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: selectedMood === mood.id ? '#fff' : '#333',
                }}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Text Input */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 20,
          marginBottom: 20,
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
            Write your thoughts:
          </Text>
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#e9ecef',
              borderRadius: 8,
              padding: 16,
              fontSize: 16,
              minHeight: 120,
              textAlignVertical: 'top',
              color: '#333',
            }}
            placeholder="What triggered this feeling? How are you coping? What are you grateful for today? Write whatever comes to mind..."
            placeholderTextColor="#999"
            multiline
            value={currentEntry}
            onChangeText={setCurrentEntry}
          />
          
          <TouchableOpacity
            style={{
              backgroundColor: currentEntry.trim() && selectedMood ? '#007AFF' : '#ccc',
              paddingVertical: 14,
              borderRadius: 8,
              marginTop: 16,
            }}
            onPress={saveEntry}
            disabled={!currentEntry.trim() || !selectedMood}
          >
            <Text style={{
              color: currentEntry.trim() && selectedMood ? '#fff' : '#999',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
            }}>
              Save Entry
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Previous Entries */}
        {entries.length > 0 && (
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
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
              Previous Entries ({entries.length})
            </Text>
            
            {entries.slice(0, 3).map((entry) => {
              const moodData = getMoodData(entry.mood);
              return (
                <View
                  key={entry.id}
                  style={{
                    borderLeftWidth: 4,
                    borderLeftColor: moodData?.color || '#ccc',
                    paddingLeft: 12,
                    marginBottom: 16,
                    paddingBottom: 16,
                    borderBottomWidth: entries.indexOf(entry) < Math.min(entries.length - 1, 2) ? 1 : 0,
                    borderBottomColor: '#f0f0f0',
                  }}
                >
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                    <Text style={{
                      fontSize: 16,
                      marginRight: 8,
                    }}>
                      {moodData?.emoji}
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: '#666',
                    }}>
                      {formatTimestamp(entry.timestamp)}
                    </Text>
                  </View>
                  <Text style={{
                    fontSize: 14,
                    color: '#333',
                    lineHeight: 18,
                  }}>
                    {entry.content.length > 100 
                      ? entry.content.substring(0, 100) + '...' 
                      : entry.content
                    }
                  </Text>
                </View>
              );
            })}
            
            {entries.length > 3 && (
              <Text style={{
                fontSize: 14,
                color: '#007AFF',
                textAlign: 'center',
                fontWeight: '500',
              }}>
                + {entries.length - 3} more entries
              </Text>
            )}
          </View>
        )}
        
        {/* Tips */}
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
            💡 Journaling Tips:
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#2e7d32',
            lineHeight: 20,
          }}>
            • Be honest about your feelings{'\n'}
            • Write about what triggered your craving{'\n'}
            • Note what coping strategies helped{'\n'}
            • Include positive thoughts and gratitude{'\n'}
            • Review past entries to track patterns
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JournalingScreen;
