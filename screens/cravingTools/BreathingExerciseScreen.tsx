import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated } from 'react-native';

const BreathingExerciseScreen: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(4);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            // Move to next phase
            setPhase((prevPhase) => {
              if (prevPhase === 'inhale') return 'hold';
              if (prevPhase === 'hold') return 'exhale';
              return 'inhale';
            });
            return 4; // Reset timer
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      // Animate based on breathing phase
      if (phase === 'inhale') {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.5,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.8,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]).start();
      } else if (phase === 'hold') {
        // Hold the scale and opacity
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.5,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.8,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]).start();
      } else if (phase === 'exhale') {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.3,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]).start();
      }
    } else {
      // Reset to initial state
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [phase, isActive, scaleAnim, opacityAnim]);

  const startExercise = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimer(4);
  };

  const stopExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimer(4);
  };

  const getInstructionText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Breathe In';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return '#007AFF';
      case 'hold':
        return '#ffc107';
      case 'exhale':
        return '#28a745';
      default:
        return '#007AFF';
    }
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#f8f9fa',
    }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}>
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 16,
          textAlign: 'center',
        }}>
          Breathing Exercise
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 48,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Follow the circle and breathe slowly to calm your mind
        </Text>
        
        {/* Animated Breathing Circle */}
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 48,
        }}>
          <Animated.View
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: getPhaseColor(),
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            }}
          >
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
            }}>
              {isActive ? getInstructionText() : 'Ready?'}
            </Text>
            {isActive && (
              <Text style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: '#fff',
                marginTop: 8,
              }}>
                {timer}
              </Text>
            )}
          </Animated.View>
        </View>
        
        {/* Control Buttons */}
        <View style={{
          flexDirection: 'row',
          gap: 16,
        }}>
          {!isActive ? (
            <TouchableOpacity
              style={{
                backgroundColor: '#007AFF',
                paddingHorizontal: 32,
                paddingVertical: 16,
                borderRadius: 8,
              }}
              onPress={startExercise}
            >
              <Text style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
              }}>
                Start Exercise
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
              onPress={stopExercise}
            >
              <Text style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
              }}>
                Stop Exercise
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Instructions */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 20,
          marginTop: 32,
          borderLeftWidth: 4,
          borderLeftColor: '#007AFF',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
            marginBottom: 8,
          }}>
            4-4-4 Breathing Pattern:
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#666',
            lineHeight: 20,
          }}>
            • Inhale for 4 seconds (circle grows){'\n'}
            • Hold for 4 seconds (circle stays large){'\n'}
            • Exhale for 4 seconds (circle shrinks){'\n'}
            • Repeat as needed for calmness
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BreathingExerciseScreen;
