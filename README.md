# Mealwise 🍽️

A clean, minimal meal planner for your week. Built with React Native and Expo.

![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-brightgreen)
![Made with Expo](https://img.shields.io/badge/made%20with-Expo-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## Features

- **Plan meals by day** — organize Breakfast, Lunch, Dinner, and Snacks across the full week
- **Add & remove meals** — fast bottom sheet input, one tap to delete
- **Persistent storage** — meals saved locally on device via AsyncStorage, no account needed
- **Today indicator** — always know which day you're on at a glance
- **Grouped by meal type** — each day's meals are organized by type for easy scanning
- **Dark mode UI** — easy on the eyes, built for daily use

---

## Screenshots

> _Add screenshots here after building_

---

## Tech Stack

| Layer     | Tool               |
| --------- | ------------------ |
| Framework | React Native       |
| Platform  | Expo (Expo Router) |
| Storage   | AsyncStorage       |
| Build     | EAS Build          |

---

## Project Structure

```
MealPlanner/
├── app/
│   ├── _layout.jsx          # Expo Router root layout
│   └── index.jsx            # Main screen (orchestration only)
├── components/
│   ├── Header.jsx           # App title and meal count
│   ├── DayStrip.jsx         # Horizontal day selector tabs
│   ├── MealCard.jsx         # Individual meal row with delete
│   ├── MealGroup.jsx        # Meals grouped by type
│   ├── EmptyState.jsx       # Empty day placeholder
│   └── AddMealSheet.jsx     # Bottom sheet for adding meals
├── hooks/
│   ├── useMeals.js          # All storage and CRUD logic
│   └── useModal.js          # Bottom sheet animation logic
├── constants/
│   └── theme.js             # Colors, spacing, typography, config
└── eas.json                 # EAS build configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your phone (for development)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/meal-planner.git
cd meal-planner

# Install dependencies
npm install

# Install AsyncStorage
npx expo install @react-native-async-storage/async-storage

# Start the dev server
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS) to run on your device.

---

## Building for Device

### Android (free)

```bash
# Install EAS CLI
npm install -g eas-cli
eas login

# Configure (first time only)
eas build:configure

# Build APK
eas build -p android --profile preview
```

Download the `.apk` from the link EAS provides and install directly on your Android device.

### iOS (requires Apple Developer account — $99/yr)

```bash
eas build -p ios --profile preview
eas submit -p ios
```

Install via TestFlight on your iPhone.

### Both platforms at once

```bash
eas build --platform all --profile preview
```

---

## Data & Privacy

All meal data is stored **locally on your device** using AsyncStorage. Nothing is sent to any server. Uninstalling the app clears all data.

---

## Customization

All colors, spacing, and meal types live in `constants/theme.js`. To add a new meal type:

```js
// constants/theme.js
export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Pre-workout'];

export const TYPE_CONFIG = {
  ...
  'Pre-workout': { color: '#34D399', dimColor: '#34D39920', icon: '💪' },
};
```

---

## License

MIT — do whatever you want with it.
