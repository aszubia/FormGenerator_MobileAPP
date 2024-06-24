import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TextInput, ScrollView, Pressable, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react';
import FormDetails from "../data/FormDetails";
import { getDatabase, ref, push, set,onValue  } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebaseApp } from './Login';

const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = storageRef(firebaseApp);


export default function DetailsScreen({ navigation }) {
  const [link, setLink] = useState(null);
  const [link2, setLink2] = useState(null);
  const [link3, setLink3] = useState(null);
  const [link4, setLink4] = useState(null);
  
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const itemRef1 = ref(database, `Forms/Form1/Requester: ${user.displayName}/link`);
      onValue(itemRef1, (snapshot) => {
        const linkData = snapshot.val();
        setLink(linkData);
      });
  
      const itemRef2 = ref(database, `Forms/Form2/Requester: ${user.displayName}/link`);
      onValue(itemRef2, (snapshot) => {
        const linkData = snapshot.val();
        setLink2(linkData);
      });
  
      const itemRef3 = ref(database, `Forms/Form3/Requester: ${user.displayName}/link`);
      onValue(itemRef3, (snapshot) => {
        const linkData = snapshot.val();
        setLink3(linkData);
      });
  
      const itemRef4 = ref(database, `Forms/Form4/Requester: ${user.displayName}/link`);
      onValue(itemRef4, (snapshot) => {
        const linkData = snapshot.val();
        setLink4(linkData);
      });
    }
  }, []);
    
    
    const data = FormDetails;
    return (
        <ScrollView style={{ marginTop: 5 }} >
        <View 
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
        >
                        
        </View>
        <View style={{ margin: 10 }}>
          <Pressable style={{ flexDirection: "row" }}>
            <View>
              <ImageBackground
                imageStyle={{ borderRadius: 6 }}
                style={{ aspectRatio: 5 / 6, height: 170 }}
                source={{ uri: "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
              ></ImageBackground>
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Certificate of Enrollment</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
              {link && (
                  <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(link)}>
                    <Text style={styles.buttonText}>Go to Link</Text>
                  </TouchableOpacity>
                )}

              </View>
            </View>
          </Pressable>
        </View>
        <View style={{ margin: 10 }}>
          <Pressable style={{ flexDirection: "row" }}>
            <View>
              <ImageBackground
                imageStyle={{ borderRadius: 6 }}
                style={{ aspectRatio: 5 / 6, height: 170 }}
                source={{ uri: "https://images.pexels.com/photos/1764956/pexels-photo-1764956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
              ></ImageBackground>
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Certificate of No</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Disciplinary Action</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
              {link2 && (
                  <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(link2)}>
                    <Text style={styles.buttonText}>Go to Link</Text>
                  </TouchableOpacity>
                )}

              </View>
            </View>
          </Pressable>
        </View>
        <View style={{ margin: 10 }}>
          <Pressable style={{ flexDirection: "row" }}>
            <View>
              <ImageBackground
                imageStyle={{ borderRadius: 6 }}
                style={{ aspectRatio: 5 / 6, height: 170 }}
                source={{ uri: "https://images.pexels.com/photos/175045/pexels-photo-175045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
              ></ImageBackground>
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>True Copy of Grades</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
              {link3 && (
                  <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(link3)}>
                    <Text style={styles.buttonText}>Go to Link</Text>
                  </TouchableOpacity>
                )}

              </View>
            </View>
          </Pressable>
        </View>
        <View style={{ margin: 10 }}>
          <Pressable style={{ flexDirection: "row" }}>
            <View>
              <ImageBackground
                imageStyle={{ borderRadius: 6 }}
                style={{ aspectRatio: 5 / 6, height: 170 }}
                source={{ uri: "https://images.pexels.com/photos/8815843/pexels-photo-8815843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
              ></ImageBackground>
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Certificate of</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Non-Issuance of ID</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
              {link4 && (
                  <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(link4)}>
                    <Text style={styles.buttonText}>Go to Link</Text>
                  </TouchableOpacity>
                )}

              </View>
            </View>
          </Pressable>
        </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#003314',
    padding: 8,
    borderRadius: 4,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
