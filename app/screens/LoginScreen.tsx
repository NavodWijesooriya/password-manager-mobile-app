import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getMasterPassword, saveMasterPassword, checkMasterPassword } from '../../utils/storage';
import AppIcon from '../components/AppIcon';

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    checkIfFirstTime();
    
    // Animate screen entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const checkIfFirstTime = async () => {
    const masterPassword = await getMasterPassword();
    setIsFirstTime(!masterPassword);
  };

  const handleLogin = async () => {
    if (!password) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    if (isFirstTime) {
      await saveMasterPassword(password);
      Alert.alert('Success', 'Master password set successfully!');
      navigation.navigate('Home');
    } else {
      const isValid = await checkMasterPassword(password);
      if (isValid) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid password');
      }
    }
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <AppIcon 
          size={80} 
          showBackground={false}
          style={{ marginBottom: 16 }}
        />
        <Text style={styles.title}>Password Manager</Text>
        <Text style={styles.subtitle}>
          {isFirstTime ? 'Set your master password' : 'Enter your master password'}
        </Text>
      </Animated.View>

      <Animated.View 
        style={[
          styles.form,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Master Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            {isFirstTime ? 'Set Password' : 'Login'}
          </Text>
        </TouchableOpacity>

        {!isFirstTime && (
          <TouchableOpacity 
            style={styles.signUpButton} 
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4a90e2',
    paddingTop: 100,
    paddingBottom: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#e6f2ff',
    textAlign: 'center',
  },
  form: {
    padding: 20,
    marginTop: 50,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  signUpButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: '#4a90e2',
    fontSize: 16,
    fontWeight: '600',
  },
});
