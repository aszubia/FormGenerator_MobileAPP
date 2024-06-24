import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const firebaseConfig = {
  apiKey: "AIzaSyAlR10_WYWAfYzlKha_kmem5cpbgqkRWbg",
  authDomain: "our-form-generator.firebaseapp.com",
  projectId: "our-form-generator",
  storageBucket: "our-form-generator.appspot.com",
  messagingSenderId: "32678761428",
  appId: "1:32678761428:web:3d8c57cb4ba50716c57c41",
  databaseURL: "https://our-form-generator-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in successfully!', user);
      console.log('Username:', user.email); // Add this line to log the username

      // Navigate to the Home screen
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Invalid email or password. Please try again.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found. Please check your email and try again.';
      }

      Alert.alert('Login Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  body: {
    width: '80%',
  },
  inputContainer: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 18,
    paddingBottom: 10,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#7B1113',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#003314',
    padding: 12,
    borderRadius: 4,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export { firebaseApp };
