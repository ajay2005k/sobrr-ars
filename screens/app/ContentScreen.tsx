import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'podcast' | 'guide';
  duration?: string;
  category: string;
}

const contentData: ContentItem[] = [
  {
    id: '1',
    title: 'Understanding Addiction: The Science Behind Recovery',
    description: 'Learn about the neurological aspects of addiction and how recovery works.',
    type: 'article',
    duration: '8 min read',
    category: 'Education',
  },
  {
    id: '2',
    title: 'Mindfulness Meditation for Recovery',
    description: 'A guided meditation session to help manage cravings and stress.',
    type: 'video',
    duration: '15 min',
    category: 'Wellness',
  },
  {
    id: '3',
    title: 'Recovery Stories: Real People, Real Success',
    description: 'Inspiring stories from people who have successfully overcome addiction.',
    type: 'podcast',
    duration: '32 min',
    category: 'Inspiration',
  },
  {
    id: '4',
    title: 'Building a Support Network',
    description: 'Step-by-step guide to creating and maintaining supportive relationships.',
    type: 'guide',
    duration: '12 min read',
    category: 'Social',
  },
  {
    id: '5',
    title: 'Dealing with Triggers and Cravings',
    description: 'Practical strategies to identify and manage your personal triggers.',
    type: 'article',
    duration: '6 min read',
    category: 'Coping',
  },
  {
    id: '6',
    title: 'The Power of Exercise in Recovery',
    description: 'How physical activity can boost your mental health and recovery.',
    type: 'video',
    duration: '20 min',
    category: 'Wellness',
  },
];

const categories = ['All', 'Education', 'Wellness', 'Inspiration', 'Social', 'Coping'];

const ContentScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredContent = selectedCategory === 'All' 
    ? contentData 
    : contentData.filter(item => item.category === selectedCategory);

  const getIconForType = (type: ContentItem['type']) => {
    switch (type) {
      case 'article': return '📖';
      case 'video': return '🎥';
      case 'podcast': return '🎧';
      case 'guide': return '📋';
      default: return '📄';
    }
  };

  const getColorForCategory = (category: string) => {
    switch (category) {
      case 'Education': return '#2196f3';
      case 'Wellness': return '#4caf50';
      case 'Inspiration': return '#ff9800';
      case 'Social': return '#9c27b0';
      case 'Coping': return '#f44336';
      default: return '#666';
    }
  };

  const renderContentItem = ({ item }: { item: ContentItem }) => (
    <TouchableOpacity style={styles.contentCard}>
      <View style={styles.contentHeader}>
        <Text style={styles.contentIcon}>{getIconForType(item.type)}</Text>
        <View style={styles.contentMeta}>
          <Text style={[styles.categoryBadge, { backgroundColor: getColorForCategory(item.category) }]}>
            {item.category}
          </Text>
          {item.duration && (
            <Text style={styles.duration}>{item.duration}</Text>
          )}
        </View>
      </View>
      <Text style={styles.contentTitle}>{item.title}</Text>
      <Text style={styles.contentDescription}>{item.description}</Text>
      <View style={styles.contentFooter}>
        <Text style={styles.contentType}>{item.type.toUpperCase()}</Text>
        <Text style={styles.readMore}>Read More ›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Educational Content</Text>
        <Text style={styles.subtitle}>
          Resources to support your recovery journey
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScrollView}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.selectedCategoryButtonText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredContent}
        renderItem={renderContentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  categoriesScrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 0,
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexShrink: 0,
    minWidth: 80,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  contentList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contentIcon: {
    fontSize: 24,
  },
  contentMeta: {
    alignItems: 'flex-end',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  duration: {
    fontSize: 12,
    color: '#999',
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  contentDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  contentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentType: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  readMore: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default ContentScreen;
