import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { ref as storageRef, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import * as DocumentPicker from 'expo-document-picker';

const firebaseConfig = {
  apiKey: "AIzaSyAlR10_WYWAfYzlKha_kmem5cpbgqkRWbg",
  authDomain: "our-form-generator.firebaseapp.com",
  projectId: "our-form-generator",
  storageBucket: "our-form-generator.appspot.com",
  messagingSenderId: "32678761428",
  appId: "1:32678761428:web:3d8c57cb4ba50716c57c41",
  databaseURL: "https://our-form-generator-default-rtdb.firebaseio.com/",
}

export function AddDataForm() {
  const [name, setName] = useState('');
  const [access, setAccess] = useState('');
  const [request, setRequest] = useState('');
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');
  const [isButtonClickable, setIsButtonClickable] = useState(false);


  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  const handleUpload = async () => {
    try {
    
      const file = await DocumentPicker.getDocumentAsync({ type: 'application/pdf', copyToCacheDirectory: true });

      if (file.type === 'success') {
        const storageReference = storageRef(getStorage(), `Form_5/${file.name}`);

        const response = await fetch(file.uri);
        const blob = await response.blob();

        const uploadTask = uploadBytesResumable(storageReference, blob);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setPercent(percent);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            Alert.alert('Your file has finished uploading, please make your request')
            setIsButtonClickable(true);
            setDownloadURL(url);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    const database = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    const newDataRef = ref(database, `Forms/Form2/Requester: ${user.displayName}`);
    const newData = {
      Name: user.email,
      DateRequested: new Date().toLocaleDateString(),
      Access: false,
      Request: 'Certificate of No Disciplinary Action',
      form: downloadURL,
    };

    setName('');
    setAccess('');
    setRequest('');

    set(newDataRef, newData)
      .then(() => {
        console.log('Data added successfully');
        Alert.alert('Data added successfully');
      })
      .catch((error) => {

        console.error('Error adding data:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={{
            uri:
              'https://images.pexels.com/photos/1764956/pexels-photo-1764956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Certificate of No Disciplinary Action</Text>
        </View>
        <Text style={styles.text}>
        Please upload your Form 5. Please note that the process may 
        take 2-3 business days. An email will be sent to your 
        respective UP mail once your form has been processed and 
        uploaded.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleUpload}>
            <View style={styles.button1}>
              <Text style={styles.buttonText}>Upload PDF</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={isButtonClickable ? handleSubmit : null} disabled={!isButtonClickable}>
            <View style={styles.button2}>
              <Text style={styles.buttonText}>Request</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    backgroundColor: '#7B1113',
    margin: 12,
    borderRadius: 16,
  },
  heroImage: {
    width: '100%',
    height: 210,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  contentHeader: {
    paddingHorizontal: 29,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#281b52',
    textAlign: 'center',
    lineHeight: 40,
    fontFamily: 'sans-serif',
  },
  text: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '400',
    color: '#281b52',
    textAlign: 'justify',
  },
  button1: {
    backgroundColor: '#003314',
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  button2: {
    backgroundColor: '#7B1113',
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default AddDataForm;
