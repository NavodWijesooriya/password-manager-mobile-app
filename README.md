# Password Manager Mobile App 🔐

A secure and user-friendly mobile password manager built with React Native and Expo. Store, manage, and access your passwords safely with a beautiful, intuitive interface.

## Features ✨

- **Secure Storage**: All passwords are encrypted and stored locally on your device
- **Master Password Protection**: Single master password to access all your credentials
- **Beautiful UI**: Modern, clean interface with smooth animations
- **Easy Management**: Add, view, copy, and delete passwords with ease
- **Cross-Platform**: Works on both iOS and Android devices
- **Offline First**: No internet connection required, all data stored locally

## Screenshots 📱

The app includes:
- Animated splash screen with loading animation
- Login/Sign up screens with master password setup
- Home dashboard with easy navigation
- Add new password form with validation
- Password list with copy-to-clipboard functionality
- Secure password masking and reveal options

## Installation 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (for testing)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd password-manager-mobile-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Expo CLI globally** (if not already installed)
   ```bash
   npm install -g @expo/cli
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on your device**
   - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
   - Or use an emulator/simulator

## Project Structure 📁

```
password-manager-mobile-app/
├── App.tsx                 # Main app component with navigation
├── app/
│   ├── components/
│   │   └── LoadingAnimation.tsx  # Splash screen component
│   └── screens/
│       ├── LoginScreen.tsx       # Login/first-time setup
│       ├── SignUpScreen.tsx      # Sign up screen
│       ├── HomeScreen.tsx        # Main dashboard
│       ├── AddPasswordScreen.tsx # Add new password
│       └── PasswordListScreen.tsx # View saved passwords
├── utils/
│   └── storage.ts              # Local storage utilities
├── package.json
└── README.md
```

## Usage Guide 📖

### First Time Setup

1. **Launch the app** - You'll see the animated splash screen
2. **Set Master Password** - On first launch, create a secure master password
3. **Access Dashboard** - Navigate to the main dashboard after setup

### Adding Passwords

1. **Tap "Add New Password"** on the home screen
2. **Fill in details**:
   - Website/Service name
   - Username or email
   - Password
3. **Save** - Password is encrypted and stored locally

### Managing Passwords

1. **View Passwords** - Tap "View Saved Passwords" from home
2. **Copy Credentials** - Tap the copy button (📋) next to username/password
3. **Delete Passwords** - Tap "Delete" button with confirmation dialog

### Security Features

- **Master Password**: Required on every app launch
- **Password Masking**: Passwords displayed as dots for security
- **Local Storage**: All data stored encrypted on device
- **No Cloud Sync**: Data never leaves your device

## Technical Details 🔧

### Built With

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and build service
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Screen navigation
- **AsyncStorage** - Local data persistence
- **Crypto** - Password encryption

### Key Dependencies

```json
{
  "@react-navigation/native": "Navigation framework",
  "@react-navigation/native-stack": "Stack navigation",
  "react-native-async-storage": "Local storage",
  "expo-crypto": "Encryption utilities",
  "react-native-clipboard": "Clipboard access"
}
```

### Security Implementation

- Master passwords are hashed using SHA-256
- Stored passwords are encrypted with AES-256
- All data remains on device (no cloud storage)
- Automatic logout on app backgrounding

## Development 👨‍💻

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

### Building for Production

1. **Build APK (Android)**
   ```bash
   expo build:android
   ```

2. **Build IPA (iOS)**
   ```bash
   expo build:ios
   ```

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow React Native best practices
- Maintain consistent styling with StyleSheet
- Add proper error handling
- Write descriptive commit messages

## Security Considerations 🔒

- **Local Storage Only**: No data transmitted to external servers
- **Encryption**: All passwords encrypted before storage
- **Master Password**: Strong master password recommended
- **Device Security**: Ensure device lock screen is enabled
- **App Permissions**: Only requests necessary permissions

## Future Enhancements 🚀

- [ ] Biometric authentication (fingerprint/face)
- [ ] Password strength indicator
- [ ] Auto-fill integration
- [ ] Backup/restore functionality
- [ ] Password generator
- [ ] Dark mode support
- [ ] Search functionality
- [ ] Categories/folders for passwords

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

For support, please open an issue on GitHub or contact the development team.

---

**Important**: This app stores all data locally on your device. Make sure to:
- Keep your master password secure
- Enable device lock screen
- Regularly backup your device
- Update the app when new versions are available

**Disclaimer**: While this app uses encryption to protect your data, no security system is 100% foolproof. Use at your own risk and always follow best security