import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView, Pressable } from 'react-native';
import React from 'react';
import Carousel from '../components/Carousel';
import FeaturedFunctions from '../components/FeaturedFunctions';
import FormDetails from "../data/FormDetails";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from './Login';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Homescreen = () => {
  
  const data = FormDetails;

  console.log(firebaseApp.name ? "Homepage connected successfully" : "Homepage not connected");
  
  return (
    <ScrollView>
      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          margin: 10,
          padding: 10,
          borderColor: "#C0C0C0",
          borderRadius: 7,
        }}
      >
      </View>
      <Text style={{ marginLeft: 15, marginBottom: 10, fontSize: 30, fontWeight: "700" }}>Welcome!</Text>
      {/* Carousel */}
      <Carousel />

      {/* Featured Forms */}
      <FeaturedFunctions />
    </ScrollView>
  );
}

export default Homescreen;

const styles = StyleSheet.create({});
