import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsStackParamList } from '../../types/navigation';

type SettingsScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'SettingsHome'
>;

interface SettingItem {
  id: string;
  title: string;
  description?: string;
  type: 'toggle' | 'action' | 'navigation';
  value?: boolean;
  onPress?: () => void;
}

interface Props {
  navigation: SettingsScreenNavigationProp;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyRemindersEnabled, setDailyRemindersEnabled] = useState(true);
  const [cravingAlertsEnabled, setCravingAlertsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset Data',
      'This will permanently delete all your progress data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => console.log('Reset data') },
      ]
    );
  };

  const notificationSettings: SettingItem[] = [
    {
      id: 'notification_settings',
      title: 'Notification Settings',
      description: 'Customize your notification preferences',
      type: 'navigation',
      onPress: () => navigation.navigate('NotificationSettings'),
    },
  ];

  const accountSettings: SettingItem[] = [
    {
      id: 'edit_profile',
      title: 'Edit Profile',
      description: 'Update your personal information',
      type: 'navigation',
      onPress: () => console.log('Navigate to edit profile'),
    },
    {
      id: 'quit_date',
      title: 'Change Quit Date',
      description: 'Modify your sobriety start date',
      type: 'navigation',
      onPress: () => console.log('Navigate to change quit date'),
    },
    {
      id: 'support_style',
      title: 'Support Style',
      description: 'Update your preferred motivation style',
      type: 'navigation',
      onPress: () => console.log('Navigate to support style'),
    },
  ];

  const supportSettings: SettingItem[] = [
    {
      id: 'help',
      title: 'Help & Support',
      description: 'Get help and contact support',
      type: 'navigation',
      onPress: () => console.log('Navigate to help'),
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      type: 'navigation',
      onPress: () => console.log('Navigate to privacy policy'),
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      type: 'navigation',
      onPress: () => console.log('Navigate to terms'),
    },
    {
      id: 'about',
      title: 'About Sobrr',
      description: 'App version and information',
      type: 'navigation',
      onPress: () => console.log('Navigate to about'),
    },
  ];

  const dangerZoneSettings: SettingItem[] = [
    {
      id: 'reset_data',
      title: 'Reset All Data',
      description: 'Permanently delete all progress data',
      type: 'action',
      onPress: handleResetData,
    },
    {
      id: 'logout',
      title: 'Logout',
      description: 'Sign out of your account',
      type: 'action',
      onPress: handleLogout,
    },
  ];

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={item.onPress}
      disabled={item.type === 'toggle'}
    >
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        {item.description && (
          <Text style={styles.settingDescription}>{item.description}</Text>
        )}
      </View>
      <View style={styles.settingAction}>
        {item.type === 'toggle' && (
          <Switch
            value={item.value}
            onValueChange={item.onPress}
            trackColor={{ false: '#e0e0e0', true: '#007AFF' }}
            thumbColor={item.value ? '#fff' : '#f4f4f4'}
          />
        )}
        {item.type === 'navigation' && (
          <Text style={styles.chevron}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          {notificationSettings.map(renderSettingItem)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {accountSettings.map(renderSettingItem)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {supportSettings.map(renderSettingItem)}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, styles.dangerTitle]}>Danger Zone</Text>
          {dangerZoneSettings.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.settingItem, styles.dangerItem]}
              onPress={item.onPress}
            >
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, styles.dangerText]}>{item.title}</Text>
                {item.description && (
                  <Text style={styles.settingDescription}>{item.description}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>Sobrr v1.0.0</Text>
          <Text style={styles.footerText}>
            Your privacy and recovery journey matter to us.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  dangerTitle: {
    color: '#dc3545',
  },
  settingItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dangerItem: {
    backgroundColor: '#fff5f5',
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  dangerText: {
    color: '#dc3545',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  settingAction: {
    marginLeft: 16,
  },
  chevron: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: '300',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 20,
  },
  version: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SettingsScreen;
