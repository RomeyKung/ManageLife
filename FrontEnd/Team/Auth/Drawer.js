import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { HeaderTitle } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import MoneyStack from "../Money/Navigations/MoneyStack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import SchedulerStack from "../Scheduler/Navigations/SchedulerStack";
import TodoListStack from "../TodoList/Navigations/TodoListStack";
import HealthStack from "../Health/Navigations/HealthStack";
import NoteStack from "../Notes/Navigations/NoteStack";
import UserSettings from "../User/Pages/UserSetting";
import InventoryStack from "../Inventory/Navigations/InventoryStack";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome, AntDesign, Ionicons, Octicons, MaterialCommunityIcons,FontAwesome5 } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import axios from "axios";
import LocalIP from "../LocalIP";
import { saveUserData } from "../../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [tryAgain, setTryAgain] = useState(0)
  // axios
  const user = useSelector(state => state.user);
  useEffect(() => {
    console.log("Sign UP: ", auth.currentUser.uid)
    axios.get(`http://${LocalIP}:8082/user-service/user/${auth.currentUser.uid}`)
      .then(res => {
        dispatch(saveUserData(res.data));
        console.log(res.data)
      })
      .catch(er => {
        console.log("ERROR: ", er)
        if(tryAgain <= 3){

          setTryAgain(tryAgain + 1)
        }
        console.log("tryAgain: ", tryAgain)
      });
  }, [tryAgain]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9 }}>
        <DrawerContentScrollView {...props}>
          {user ? (
            <View style={{ padding: 15 }}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={
                  user.imagePath
                    ? { uri: user.imagePath }
                    : require("../../assets/icon.png")
                }
              />
              <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                {user.username}
              </Text>
            </View>
          ) : null}

          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
      <View style={{ borderTopColor: "#ccc", borderTopWidth: 1 }}>
        <TouchableOpacity
          onPress={async() => {
            FIREBASE_AUTH.signOut();
            await AsyncStorage.clear();
          }}
          style={{ paddingVertical: 20, marginLeft: 20 }}
        >
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <FontAwesome name="sign-out" size={24} color="black" />
            <Text> Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Drawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#88CF88",
        },
        headerTintColor: "black",
        headerTitleStyle: {
          display: "none", // Hide the default title
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          drawerLabel:"Scheduler",
          headerStyle: {
            backgroundColor: "#88CF88",
          },
          headerTintColor: "black",
          drawerIcon: ({ color }) => (
            <AntDesign name="calendar" size={24} color={color} />
          ),
        }}
        name="SchedulerStack"
        component={SchedulerStack}
      />
      <Drawer.Screen
        options={{
          drawerLabel:"To-do List",
          headerStyle: {
            backgroundColor: "#88CF88",
          },
          headerTintColor: "black",
          drawerIcon: ({ color }) => (
            <Octicons name="checklist" size={24} color={color} />
          ),
        }}
        name="TodoListStack"
        component={TodoListStack}
      />
      <Drawer.Screen
        name="HealthStack"
        component={HealthStack}
        options={{
          drawerLabel:"Health",
          headerStyle: {
            backgroundColor: "#88CF88",
          },
          headerTintColor: "black",
          drawerIcon: ({ color }) => (
            <Ionicons name="fitness" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="NoteStack"
        component={NoteStack}
        options={{
          drawerLabel:"Note",
          headerStyle: {
            backgroundColor: "#88CF88",
          },
          headerTintColor: "black",
          drawerIcon: ({ color }) => (
            <FontAwesome name="sticky-note" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="InventoryStack"
        component={InventoryStack}
        options={{
          drawerLabel:"Inventory",
          headerStyle: {
            backgroundColor: "#88CF88",
          },
          headerTintColor: "black",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="fridge-industrial-outline" size={24} color={color} />
          ),
        }}
      />
        <Drawer.Screen
        options={{
          drawerLabel:"Money",
          headerStyle: {
            backgroundColor: "#88CF88",
          },
          headerTintColor: "black",
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="piggy-bank" size={24} color={color} />
          ),
        }}
        name="MoneyStack"
        component={MoneyStack}
      />
      <Drawer.Screen
        name="UserSettings"
        component={UserSettings}
        options={{
          drawerLabel:"User Settings",
          headerStyle: {
            backgroundColor: "#88CF88",
          },
          headerTintColor: "black",
          drawerIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Drawer;

const styles = StyleSheet.create({});
