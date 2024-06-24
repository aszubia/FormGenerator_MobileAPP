import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Customize from './screens/Customize';
import Home from './screens/Homescreen';
import Settings from './screens/Settings';
import Login from './screens/Login';
import Register from './screens/Register';
import CertificateOfEnrollment from './data/CertificateOfEnrollment';
import CertificateOfNoDisciplinaryAction from './data/CertificateOfNoDisciplinaryAction';
import TrueCopyOfGrades from './data/TrueCopyOfGrades';
import CertificateID from './data/CertificateID';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from './screens/Login';
import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  get,
} from 'firebase/database';

const auth = getAuth(firebaseApp);
const Drawer = createDrawerNavigator();

const LogoutScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigation.navigate('Logout');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [userUsername, setUserUsername] = useState('');

  const handleLogin = (username) => {
    setUserUsername(username);

    // Update user data in the database
    const database = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const dataRef = ref(database, `users/${user.displayName}/`);

      update(dataRef, { username })
        .then(() => {
          console.log('User data updated successfully');
        })
        .catch((error) => {
          console.error('Error updating user data:', error);
        });
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const database = getDatabase();
    const user = auth.currentUser;

    if (user) {
      const dataRef = ref(database, `users/${user.displayName}/`);

      const fetchUserDataFromDatabase = async () => {
        try {
          const snapshot = await get(dataRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            const { username } = data; // Extract the username property
            handleLogin(username); // Pass the username to handleLogin
          } else {
            console.log('No data found');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchUserDataFromDatabase();
    }
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Logout"
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View
                style={{
                  height: 200,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: '#f4f4f4',
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    marginVertical: 6,
                    fontWeight: 'bold',
                    color: '#111',
                  }}
                >
                  {userUsername}
                </Text>
                <LogoutScreen />
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          );
        }}
        drawerStyle={{
          backgroundColor: '#fff',
          width: 250,
        }}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#014421',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabelStyle: {
            color: '#111',
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#808080" />
            ),
          }}
          component={Home}
        />
        <Drawer.Screen
          name="My Forms"
          options={{
            drawerLabel: 'My Forms',
            title: 'My Forms',
            drawerIcon: () => (
              <MaterialIcons
                name="dashboard-customize"
                size={20}
                color="#808080"
              />
            ),
          }}
          component={Customize}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
            drawerIcon: () => (
              <SimpleLineIcons name="settings" size={20} color="#808080" />
            ),
          }}
          component={Settings}
        />
        <Drawer.Screen
          name="Logout"
          options={{
            headerShown: false,
            drawerLabel: '',
            title: 'Logout',
            
          }}
          component={Login}
        />
        <Drawer.Screen
          name="Register"
          options={{
            headerShown: false,
            drawerLabel: '',
            title: 'Register',
            drawerItemStyle: { backgroundColor: 'transparent' },
          }}
          component={Register}
        />
        <Drawer.Screen
          name="Certificate of Enrollment"
          options={{
            drawerLabel: '',
            title: 'Certificate Of Enrollment',
            drawerItemStyle: { backgroundColor: 'transparent' },
          }}
          component={CertificateOfEnrollment}
        />
        <Drawer.Screen
          name="Certificate of No Disciplinary Action"
          options={{
            drawerLabel: '',
            title: 'Certificate Of No Disciplinary Action',
            drawerItemStyle: { backgroundColor: 'transparent' },
          }}
          component={CertificateOfNoDisciplinaryAction}
        />
        <Drawer.Screen
          name="True Copy of Grades"
          options={{
            drawerLabel: '',
            title: 'True Copy Of Grades',
            drawerItemStyle: { backgroundColor: 'transparent' },
          }}
          component={TrueCopyOfGrades}
        />
        <Drawer.Screen
          name="Certificate ID"
          options={{
            drawerLabel: '',
            title: 'Certificate ID',
            drawerItemStyle: { backgroundColor: 'transparent' },
          }}
          component={CertificateID}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  refreshButton: {
    backgroundColor: '#014421',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
