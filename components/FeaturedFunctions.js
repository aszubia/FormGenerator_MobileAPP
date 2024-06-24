import { StyleSheet, Text, View, ScrollView, Pressable, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FormData = () => {
  const navigation = useNavigation();

  return (
    <View style={{ margin: 15 }}>
      <Text style={{ fontSize: 22, fontWeight: "500" }}>Request Forms</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable style={{ margin: 10 }} onPress={() => navigation.navigate('Certificate of Enrollment')}>
          <ImageBackground
            imageStyle={{ borderRadius: 6 }}
            style={{ aspectRatio: 13 / 6, height: 170 }}
            source={{ uri: "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
          >
          </ImageBackground>
          <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "500" }}>
            Certificate of Enrollment
          </Text>
        </Pressable>
        <Pressable style={{ margin: 10 }} onPress={() => navigation.navigate('Certificate of No Disciplinary Action')}>
          <ImageBackground
            imageStyle={{ borderRadius: 6 }}
            style={{ aspectRatio: 13 / 6, height: 170 }}
            source={{ uri: "https://images.pexels.com/photos/1764956/pexels-photo-1764956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
          >
          </ImageBackground>
          <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "500" }}>
            Certificate of No Disciplinary Action
          </Text>
        </Pressable>
        <Pressable style={{ margin: 10 }} onPress={() => navigation.navigate('True Copy of Grades')}>
          <ImageBackground
            imageStyle={{ borderRadius: 6 }}
            style={{ aspectRatio: 13 / 6, height: 170 }}
            source={{ uri: "https://images.pexels.com/photos/175045/pexels-photo-175045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
          >
          </ImageBackground>
          <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "500" }}>
            True Copy of Grades
          </Text>
        </Pressable>
        <Pressable style={{ margin: 10 }} onPress={() => navigation.navigate('Certificate ID')}>
          <ImageBackground
            imageStyle={{ borderRadius: 6 }}
            style={{ aspectRatio: 13 / 6, height: 170 }}
            source={{ uri: "https://images.pexels.com/photos/8815843/pexels-photo-8815843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
          >
          </ImageBackground>
          <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "500" }}>
            Certificate of Non-Issuance of ID
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default FormData;

const styles = StyleSheet.create({});
