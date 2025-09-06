import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
}

const DailyQuotesScreen: React.FC = () => {
  // Hardcoded quotes data
  const quotes: Quote[] = [
    {
      id: '1',
      text: "Recovery is not a race. You don't have to feel guilty if it takes you longer than you thought it would.",
      author: "Unknown",
      category: "Recovery",
    },
    {
      id: '2',
      text: "The greatest revolution of our generation is the discovery that human beings, by changing the inner attitudes of their minds, can change the outer aspects of their lives.",
      author: "William James",
      category: "Mindset",
    },
    {
      id: '3',
      text: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying 'I will try again tomorrow.'",
      author: "Mary Anne Radmacher",
      category: "Courage",
    },
    {
      id: '4',
      text: "One day at a time. This is enough. Do not look back and grieve over the past, for it is gone; and do not be troubled about the future, for it has not yet come.",
      author: "Alcoholics Anonymous",
      category: "Recovery",
    },
    {
      id: '5',
      text: "The only way out is through.",
      author: "Robert Frost",
      category: "Perseverance",
    },
    {
      id: '6',
      text: "You are not your addiction. You have a disease, but you are not a disease.",
      author: "Unknown",
      category: "Identity",
    },
    {
      id: '7',
      text: "Progress, not perfection.",
      author: "Alcoholics Anonymous",
      category: "Recovery",
    },
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [favoriteQuotes, setFavoriteQuotes] = useState<Set<string>>(new Set());

  const currentQuote = quotes[currentQuoteIndex];

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const previousQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const toggleFavorite = (quoteId: string) => {
    const newFavorites = new Set(favoriteQuotes);
    if (newFavorites.has(quoteId)) {
      newFavorites.delete(quoteId);
    } else {
      newFavorites.add(quoteId);
    }
    setFavoriteQuotes(newFavorites);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Recovery': return '#28a745';
      case 'Mindset': return '#007AFF';
      case 'Courage': return '#dc3545';
      case 'Perseverance': return '#fd7e14';
      case 'Identity': return '#6f42c1';
      default: return '#6c757d';
    }
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
          Daily Quotes
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 22,
        }}>
          Find inspiration and motivation for your recovery journey
        </Text>
        
        {/* Quote of the Day Card */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 32,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
          borderTopWidth: 4,
          borderTopColor: getCategoryColor(currentQuote.category),
        }}>
          <View style={{
            alignItems: 'center',
            marginBottom: 24,
          }}>
            <View style={{
              backgroundColor: getCategoryColor(currentQuote.category),
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
              marginBottom: 16,
            }}>
              <Text style={{
                color: '#fff',
                fontSize: 12,
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                {currentQuote.category}
              </Text>
            </View>
            
            <Text style={{
              fontSize: 48,
              color: '#e9ecef',
              lineHeight: 48,
            }}>
              "
            </Text>
          </View>
          
          <Text style={{
            fontSize: 20,
            color: '#333',
            lineHeight: 32,
            textAlign: 'center',
            fontStyle: 'italic',
            marginBottom: 24,
          }}>
            {currentQuote.text}
          </Text>
          
          <Text style={{
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            fontWeight: '500',
          }}>
            — {currentQuote.author}
          </Text>
          
          {/* Quote Actions */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 24,
          }}>
            <TouchableOpacity
              style={{
                backgroundColor: favoriteQuotes.has(currentQuote.id) ? '#dc3545' : '#f8f9fa',
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 8,
                marginRight: 12,
              }}
              onPress={() => toggleFavorite(currentQuote.id)}
            >
              <Text style={{
                color: favoriteQuotes.has(currentQuote.id) ? '#fff' : '#666',
                fontSize: 14,
                fontWeight: '500',
              }}>
                {favoriteQuotes.has(currentQuote.id) ? '❤️ Favorited' : '🤍 Favorite'}
              </Text>
            </TouchableOpacity>
            
            <Text style={{
              fontSize: 14,
              color: '#999',
              marginHorizontal: 8,
            }}>
              {currentQuoteIndex + 1} of {quotes.length}
            </Text>
          </View>
        </View>
        
        {/* Navigation Controls */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 32,
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#007AFF',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
              flex: 1,
              marginRight: 8,
            }}
            onPress={previousQuote}
          >
            <Text style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
            }}>
              ← Previous
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#007AFF',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
              flex: 1,
              marginLeft: 8,
            }}
            onPress={nextQuote}
          >
            <Text style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
            }}>
              Next →
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Favorites Section */}
        {favoriteQuotes.size > 0 && (
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
              Your Favorite Quotes ({favoriteQuotes.size})
            </Text>
            
            {quotes
              .filter(quote => favoriteQuotes.has(quote.id))
              .map((quote) => (
                <View
                  key={quote.id}
                  style={{
                    borderLeftWidth: 4,
                    borderLeftColor: getCategoryColor(quote.category),
                    paddingLeft: 16,
                    paddingVertical: 12,
                    marginBottom: 12,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 8,
                  }}
                >
                  <Text style={{
                    fontSize: 14,
                    color: '#333',
                    lineHeight: 20,
                    fontStyle: 'italic',
                    marginBottom: 4,
                  }}>
                    "{quote.text}"
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#666',
                  }}>
                    — {quote.author}
                  </Text>
                </View>
              ))}
          </View>
        )}
        
        {/* Today's Inspiration */}
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
            💡 Daily Reflection
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#2e7d32',
            lineHeight: 20,
          }}>
            Take a moment to reflect on today's quote. How does it apply to your current situation? What small action can you take today that aligns with this wisdom?
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyQuotesScreen;
