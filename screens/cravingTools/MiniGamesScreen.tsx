import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';

const MiniGamesScreen: React.FC = () => {
  const [tapCount, setTapCount] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalTaps, setTotalTaps] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameActive(false);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameActive, timeLeft]);

  const startGame = () => {
    setGameActive(true);
    setTapCount(0);
    setTimeLeft(30);
    setCurrentStreak(0);
  };

  const endGame = () => {
    setGameActive(false);
    
    if (tapCount > highScore) {
      setHighScore(tapCount);
      Alert.alert(
        '🎉 New High Score!',
        `Congratulations! You scored ${tapCount} taps in 30 seconds!`,
        [{ text: 'Awesome!', style: 'default' }]
      );
    } else {
      Alert.alert(
        '⏰ Time\'s Up!',
        `You scored ${tapCount} taps! ${highScore > 0 ? `Your best is ${highScore}.` : 'Try to beat this score next time!'}`,
        [{ text: 'Play Again', onPress: startGame }, { text: 'Done', style: 'cancel' }]
      );
    }
  };

  const handleTap = () => {
    if (gameActive) {
      const newTapCount = tapCount + 1;
      const newTotalTaps = totalTaps + 1;
      const newStreak = currentStreak + 1;
      
      setTapCount(newTapCount);
      setTotalTaps(newTotalTaps);
      setCurrentStreak(newStreak);
    }
  };

  const resetStats = () => {
    Alert.alert(
      'Reset Statistics',
      'Are you sure you want to reset all your game statistics?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setHighScore(0);
            setTotalTaps(0);
            setTapCount(0);
            setCurrentStreak(0);
            Alert.alert('Reset Complete', 'All statistics have been reset.');
          },
        },
      ]
    );
  };

  const getEncouragementMessage = () => {
    if (currentStreak >= 50) return "You're on fire! 🔥";
    if (currentStreak >= 25) return "Amazing streak! 🌟";
    if (currentStreak >= 10) return "Keep it going! 💪";
    if (currentStreak >= 5) return "Good rhythm! 👍";
    return "Tap away the craving! 🎯";
  };

  const getTapButtonColor = () => {
    if (currentStreak >= 50) return '#dc3545'; // Red for fire
    if (currentStreak >= 25) return '#fd7e14'; // Orange
    if (currentStreak >= 10) return '#ffc107'; // Yellow
    if (currentStreak >= 5) return '#28a745'; // Green
    return '#007AFF'; // Blue default
  };

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
          Tap Counter Game
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Channel your nervous energy into rapid tapping! How many taps can you get in 30 seconds?
        </Text>
        
        {/* Game Stats */}
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
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 16,
          }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: gameActive ? getTapButtonColor() : '#007AFF',
              }}>
                {tapCount}
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
              }}>
                Current Score
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: timeLeft <= 10 && gameActive ? '#dc3545' : '#333',
              }}>
                {timeLeft}s
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
              }}>
                Time Left
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#28a745',
              }}>
                {highScore}
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
              }}>
                High Score
              </Text>
            </View>
          </View>
          
          {gameActive && (
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: getTapButtonColor(),
              textAlign: 'center',
            }}>
              {getEncouragementMessage()}
            </Text>
          )}
        </View>
        
        {/* Main Tap Button */}
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 32,
        }}>
          <TouchableOpacity
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: gameActive ? getTapButtonColor() : '#007AFF',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: gameActive ? getTapButtonColor() : '#007AFF',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
              transform: [{ scale: gameActive ? 1 : 0.9 }],
            }}
            onPress={handleTap}
            disabled={!gameActive}
            activeOpacity={0.7}
          >
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              {gameActive ? 'TAP!' : 'READY?'}
            </Text>
            <Text style={{
              fontSize: 40,
            }}>
              {gameActive ? '👆' : '🎯'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Control Buttons */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 16,
          marginBottom: 32,
        }}>
          {!gameActive ? (
            <TouchableOpacity
              style={{
                backgroundColor: '#28a745',
                paddingHorizontal: 32,
                paddingVertical: 16,
                borderRadius: 8,
              }}
              onPress={startGame}
            >
              <Text style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
              }}>
                Start Game
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: '#dc3545',
                paddingHorizontal: 32,
                paddingVertical: 16,
                borderRadius: 8,
              }}
              onPress={() => {
                setGameActive(false);
                setTimeLeft(30);
                setTapCount(0);
                setCurrentStreak(0);
              }}
            >
              <Text style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
              }}>
                Stop Game
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Additional Stats */}
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
            textAlign: 'center',
          }}>
            Session Statistics
          </Text>
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#9c27b0',
              }}>
                {totalTaps}
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
                textAlign: 'center',
              }}>
                Total Taps
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fd7e14',
              }}>
                {currentStreak}
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
                textAlign: 'center',
              }}>
                Current Streak
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#6c757d',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 6,
              marginTop: 16,
              alignSelf: 'center',
            }}
            onPress={resetStats}
          >
            <Text style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: '500',
            }}>
              Reset Stats
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Benefits */}
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
            🎮 Why This Helps:
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#1565c0',
            lineHeight: 20,
          }}>
            • Redirects nervous energy into harmless activity{'\n'}
            • Provides immediate dopamine reward{'\n'}
            • Breaks the craving thought cycle{'\n'}
            • Gives you a sense of control and achievement{'\n'}
            • Simple enough to do anywhere, anytime
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MiniGamesScreen;
