import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView, // Import ScrollView
} from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = (prop) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //for navigation
  const navigateToSignUp = () => prop.navigation.navigate("Signup");
  const navigateToMain = () => prop.navigation.navigate("Drawer");

  //for firebase
  const auth = FIREBASE_AUTH;
  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // console.log("id user:" + response.user.uid);

      // alert("Check your email for verification");
      navigateToMain();
    } catch (err) {
      console.log(err);
      alert("Sign in failed" + err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.flex, { width: "100%" }]}>
        <Text style={{ fontSize: 50 }}>ManageLife</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />

        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
      </View>

      <View style={{ rowGap: 15 }}>
        <TouchableOpacity style={styles.btn} onPress={signIn}>
          <Text style={{ color: "white" }}>Sign In</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "black" }]}
          onPress={navigateToSignUp}
        >
          <Text style={{ color: "white" }}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={{ color: "red" }}>Don’t have an account?</Text>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexGrow: 1, // Use flexGrow to allow content to scroll
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    padding: 10,
    margin: 10,
    borderRadius: 4,
  },
  btn: {
    backgroundColor: "#4CA771",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 158,
    justifyContent: "center",
    alignItems: "center",
  },
});
