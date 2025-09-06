# Sobrr - Recovery Support App 💙

A comprehensive React Native mobile application built with Expo to support individuals on their recovery journey from addiction. Sobrr provides tools, tracking, and motivation to help users maintain sobriety and build healthy habits.

## 🌟 Features

### 📊 **Tracker**
- Sobriety progress tracking
- Visual milestone celebrations
- Recovery statistics and insights

### 🛠️ **Craving Tools**
- **🚨 Emergency Support (SOS)** - Immediate help during critical moments
- **🫁 Breathing Exercise** - Guided breathing techniques for stress relief
- **📝 Craving Journal** - Track and understand triggers
- **🎯 Distraction Activities** - Quick activities to redirect focus
- **🎮 Mini Games** - Simple games to occupy the mind
- **💙 Relapse Support** - Compassionate support for setbacks with encouraging messages
- **🏗️ Routine Builder** - Build and track daily healthy habits
- **⏰ Reminder Setup** - Set personalized recovery reminders

### 🎯 **Goals**
- Goal setting and tracking
- Progress monitoring
- Achievement milestones

### 📚 **Content**
- Educational resources
- Recovery-focused articles
- Motivational content

### 🎯 **Recovery Mode**
- Comprehensive daily checklist
- Morning, daily, evening, and weekly routines
- Progress tracking with visual feedback
- Habit completion statistics

### ⚙️ **Settings**
- **🔔 Notification Settings** - Customize notification preferences:
  - Daily Motivation messages
  - Craving Alerts
  - Routine Reminders
- Account management
- Support resources
- Privacy and terms

## 🏗️ **Architecture**

### **Navigation Structure**
- **Tab Navigation** with 6 main sections:
  - Tracker
  - Tools (CravingTools)
  - Goals
  - Content
  - Recovery
  - Settings

### **Stack Navigators**
- **AuthNavigator** - Onboarding flow (Welcome → Addiction Type → Quit Date → Support Style)
- **CravingToolsNavigator** - All craving management tools
- **GoalsNavigator** - Goal setting and progress tracking
- **SettingsNavigator** - Settings and notification preferences

### **State Management**
- **React Context** for global app state (onboarding, authentication)
- **React useState** for local component state
- **TypeScript** for type safety throughout the app

## 🚀 **Getting Started**

### Prerequisites

Before you begin, ensure you have the following installed on your development machine:

- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v7.0.0 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **Expo CLI** - Install globally: `npm install -g @expo/cli`

### Development Environment Setup

Choose your preferred development environment:

#### **Option 1: Physical Device (Recommended for beginners)**
- Install **Expo Go** app on your iOS/Android device
- Ensure your device and computer are on the same WiFi network

#### **Option 2: iOS Simulator (macOS only)**
- Install **Xcode** from Mac App Store
- Install iOS Simulator through Xcode

#### **Option 3: Android Emulator**
- Install **Android Studio**
- Set up Android Virtual Device (AVD)
- Configure environment variables (ANDROID_HOME, etc.)

### 📦 **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sobrr
   ```

2. **Install all dependencies**
   ```bash
   npm install
   ```
   
   This will install all the required dependencies listed in `package.json`:
   - React Navigation libraries for app navigation
   - Expo SDK and related packages
   - React Native community packages
   - TypeScript and development tools

3. **Verify installation**
   ```bash
   npm run type-check
   ```

### 🏃 **Running the App**

1. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

2. **Open the app on your device/emulator**
   
   **For Physical Device:**
   - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
   
   **For iOS Simulator:**
   - Press `i` in the terminal or click "Open iOS Simulator" in the browser
   
   **For Android Emulator:**
   - Press `a` in the terminal or click "Open Android Emulator" in the browser

### 🛠️ **Available Scripts**

```bash
# Development
npm start                 # Start Expo development server
npm run dev              # Start with dev client
npm run android          # Open Android emulator
npm run ios              # Open iOS simulator
npm run web              # Open in web browser

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues automatically
npm run type-check       # Run TypeScript type checking

# Maintenance
npm run clean            # Clear Expo cache
npm run install:clean    # Clean install (removes node_modules)
npm run prebuild         # Generate native code

# Building (for production)
npm run build:android    # Build Android APK
npm run build:ios        # Build iOS app
```

### 🔧 **Troubleshooting**

#### **Common Issues:**

1. **Metro bundler issues:**
   ```bash
   npm run clean
   npm start
   ```

2. **Node modules issues:**
   ```bash
   npm run install:clean
   ```

3. **Package-lock.json sync issues (especially during builds):**
   ```bash
   rm package-lock.json
   npm install
   ```

4. **iOS Simulator not opening:**
   - Ensure Xcode is installed and updated
   - Try: `sudo xcode-select --install`

5. **Android emulator issues:**
   - Verify ANDROID_HOME is set correctly
   - Ensure emulator is running before pressing 'a'

6. **TypeScript errors:**
   ```bash
   npm run type-check
   ```

#### **Platform-Specific Setup:**

**macOS:**
```bash
# Install Xcode command line tools
sudo xcode-select --install

# Install Watchman (optional but recommended)
brew install watchman
```

**Windows:**
```bash
# Enable Windows Subsystem for Linux (recommended)
# Or use PowerShell as administrator
```

**Linux:**
```bash
# Install additional dependencies
sudo apt-get update
sudo apt-get install -y build-essential
```

## 📱 **App Flow**

### **First Launch (Onboarding)**
1. **Welcome Screen** - Introduction to the app
2. **Addiction Type Selection** - Choose what you want to quit
3. **Quit Date Setup** - Set your sobriety start date
4. **Support Style Preference** - Choose your motivation style
5. **Complete Setup** - Enter main app

### **Main App Experience**
- **Tracker Tab** - Monitor your progress
- **Tools Tab** - Access craving management tools
- **Goals Tab** - Set and track recovery goals
- **Content Tab** - Educational resources
- **Recovery Tab** - Daily routine checklist
- **Settings Tab** - Customize your experience

## 🛠️ **Technical Stack**

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **UI Components**: React Native built-in components
- **State Management**: React Context + useState
- **Development**: Expo CLI
- **Platform**: iOS & Android

## 📁 **Project Structure**

```
sobrr/
├── screens/
│   ├── app/                    # Main app screens
│   │   ├── TrackerScreen.tsx
│   │   ├── CravingToolsScreen.tsx
│   │   ├── GoalsScreen.tsx
│   │   ├── ContentScreen.tsx
│   │   ├── RecoveryModeScreen.tsx
│   │   ├── RoutineBuilderScreen.tsx
│   │   ├── ReminderSetupScreen.tsx
│   │   ├── NotificationSettingsScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── auth/                   # Onboarding screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── AddictionTypeScreen.tsx
│   │   ├── QuitDateScreen.tsx
│   │   └── SupportStyleScreen.tsx
│   ├── cravingTools/           # Craving management tools
│   │   ├── SOSScreen.tsx
│   │   ├── BreathingExerciseScreen.tsx
│   │   ├── JournalingScreen.tsx
│   │   ├── DistractionToolsScreen.tsx
│   │   ├── MiniGamesScreen.tsx
│   │   └── RelapseScreen.tsx
│   └── goals/                  # Goal-related screens
│       ├── GoalSetupScreen.tsx
│       └── ProgressScreen.tsx
├── navigators/                 # Navigation configuration
│   ├── AuthNavigator.tsx
│   ├── AppNavigator.tsx
│   ├── CravingToolsNavigator.tsx
│   ├── GoalsNavigator.tsx
│   └── SettingsNavigator.tsx
├── contexts/                   # React Context providers
│   └── AppContext.tsx
├── types/                      # TypeScript type definitions
│   └── navigation.ts
└── App.tsx                     # Main app component
```

## 🎨 **Key Features Highlights**

### **Compassionate Design**
- Supportive messaging throughout the app
- Non-judgmental approach to setbacks
- Encouraging language and positive reinforcement

### **Comprehensive Tool Suite**
- Emergency support for crisis moments
- Daily habit building and tracking
- Personalized reminder system
- Educational content and resources

### **Progress Tracking**
- Visual progress indicators
- Milestone celebrations
- Detailed statistics and insights
- Goal achievement tracking

### **Customizable Experience**
- Personalized notification settings
- Flexible routine building
- Adaptable support styles
- User-controlled preferences

## 🔧 **Current Implementation Status**

### ✅ **Completed Features**
- Complete onboarding flow with context-based state management
- Full navigation structure with 6 main tabs
- 8 craving management tools
- Recovery mode with comprehensive daily checklist
- Routine builder with habit tracking
- Notification settings with 3 toggle options
- Relapse support with encouraging messages
- Settings integration

### 🚧 **Future Enhancements**
- Backend integration for data persistence
- Push notification implementation
- User authentication system
- Data analytics and insights
- Social support features
- Professional resources integration

## 👥 **Collaboration & Contributing**

### **For New Collaborators**

1. **Fork the repository** and clone your fork
2. **Follow the installation steps** above to set up your development environment
3. **Create a new branch** for your feature: `git checkout -b feature/your-feature-name`
4. **Make your changes** following the project structure and coding standards
5. **Test your changes** thoroughly on both iOS and Android if possible
6. **Run code quality checks**:
   ```bash
   npm run lint
   npm run type-check
   ```
7. **Commit your changes** with clear, descriptive messages
8. **Push to your fork** and create a pull request

### **Development Guidelines**

- **Maintain compassionate tone**: All UI text should be supportive and non-judgmental
- **Follow TypeScript standards**: Ensure proper typing throughout
- **Use existing patterns**: Follow the established navigation and component structure
- **Test on multiple platforms**: Verify functionality on iOS and Android
- **Keep accessibility in mind**: Ensure the app is usable by people with disabilities

### **Code Standards**

- Use **TypeScript** for all new code
- Follow **React Navigation v6** patterns for navigation
- Use **React Context** for global state management
- Follow **Expo** best practices for mobile development
- Maintain **consistent styling** with existing screens

### **Project Structure Guidelines**

- Place new screens in appropriate directories (`screens/app/`, `screens/auth/`, etc.)
- Update navigation types in `types/navigation.ts`
- Add new navigators to `navigators/` directory
- Use existing context patterns for state management

### **Pull Request Guidelines**

- Provide clear description of changes
- Include screenshots for UI changes
- Test on both iOS and Android when possible
- Update README if adding new features or changing setup
- Ensure all linting and type-checking passes

## 📄 **License**

This project is designed to support individuals in recovery and should be used responsibly with appropriate professional guidance when needed.

## 🆘 **Support Resources**

If you or someone you know is struggling with addiction, please reach out to:
- National Suicide Prevention Lifeline: 988
- SAMHSA National Helpline: 1-800-662-4357
- Crisis Text Line: Text HOME to 741741

---

**Sobrr** - Supporting your journey, one day at a time. 💙