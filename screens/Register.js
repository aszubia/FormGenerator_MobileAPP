import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { firebaseApp } from './Login';

const firebaseConfig = {
  apiKey: "AIzaSyAlR10_WYWAfYzlKha_kmem5cpbgqkRWbg",
  authDomain: "our-form-generator.firebaseapp.com",
  projectId: "our-form-generator",
  storageBucket: "our-form-generator.appspot.com",
  messagingSenderId: "32678761428",
  appId: "1:32678761428:web:3d8c57cb4ba50716c57c41",
  databaseURL: "https://our-form-generator-default-rtdb.firebaseio.com/",
};

const app = firebaseApp;
const allowedEmailDomains = ['up.edu.ph'];


export default function App({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegistration = () => {
    const auth = getAuth(app);
    const database = getDatabase(app);

    const emailDomain = email.substring(email.lastIndexOf('@') + 1);

    if (!allowedEmailDomains.includes(emailDomain)) {
      Alert.alert('Invalid Email', 'Please enter your UP Mail.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Set display name
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            console.log('User display name set successfully!');
          })
          .catch((error) => {
            console.log('Error setting user display name:', error);
          });

        set(ref(database, 'users/' + username), {
          email: user.email,
          username: username,
          // Add other user information
        });
        console.log('User registered successfully!');
        console.log('Username:', username); // Add this line to log the username

        // Navigate to the Login screen
        navigation.navigate('Logout');
      })
      .catch((error) => {
        console.log('Registration failed. Error:', error);
      });
  };

  const handleLogin = () => {
    navigation.navigate('Logout');
  };

  useEffect(() => {
    // Clean up Firebase app instance when the component is unmounted
    return () => {
      // Check if Firebase app exists before deleting it
      if (app && typeof app.delete === 'function') {
        app.delete().catch((error) => {
          console.log('Error occurred while deleting Firebase app:', error);
        });
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>Create Account</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none" // Disable auto capitalization
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none" // Disable auto capitalization
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize="none" // Disable auto capitalization
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
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
  content: {
    width: '80%',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
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
  loginButton: {
    backgroundColor: '#7B1113',
    padding: 12,
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
