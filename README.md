# Dyla Diva App

Dyla Diva is a React Native mobile app for personalized jewelry recommendations, powered by an AI style quiz. Users can browse inventory, take a style quiz, and receive curated product suggestions.

## Features

- **User Authentication:** Register, login, and manage your profile using Firebase Auth.
- **Inventory Browsing:** View jewelry products fetched from a backend API.
- **AI Style Quiz:** Swipe-based quiz to capture user preferences.
- **Personalized Recommendations:** Receive AI-curated product suggestions based on quiz results.
- **Modern UI:** Built with React Native Paper and custom Montserrat fonts.

## Tech Stack

- **React Native** (Expo)
- **Firebase** (Auth & Firestore)
- **React Navigation**
- **React Native Paper**
- **Axios** (API calls)
- **TypeScript**

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd DylaDivaApp
   ```
2. **Install dependencies:**
   ```sh
   yarn install
   # or
   npm install
   ```
3. **Configure Firebase:**
   - Create a Firebase project.
   - Enable Firestore and Auth (Email/Password).
   - Add your app's Firebase config to `src/config/firebaseConfig.ts`.

4. **Run the app:**
   ```sh
   expo start
   ```

## Folder Structure

```
DylaDivaApp/
  assets/                # Images and icons
  src/
    components/          # Reusable UI components
    config/              # Firebase configuration
    navigation/          # Navigation setup
    screens/             # App screens (Home, Login, Quiz, etc.)
    services/            # API and business logic
    theme/               # Theme and font configuration
  App.tsx                # App entry point
  theme.ts               # (Legacy) theme file
  package.json           # Project metadata and scripts
```

## 🚀 Live Demo

Click the GIF below to watch the full video demo of the app in action.

[![Dyla Diva App Demo]]([https://www.youtube.com/watch?v=your_video_id](https://drive.google.com/drive/folders/16sOqbldrBRj8T5O4kzw6TCECYcdwkK4Q?usp=sharing))

Link -> https://drive.google.com/drive/folders/16sOqbldrBRj8T5O4kzw6TCECYcdwkK4Q?usp=sharing
