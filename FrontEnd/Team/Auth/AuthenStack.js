import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Drawer from "./Drawer";
import FIREBASE_AUTH from "../../FirebaseConfig";
const AuthenStack = () => {
  const Stack = createStackNavigator();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      ) : (
        <Stack.Screen
          name="Drawer"
          component={Drawer}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AuthenStack;
