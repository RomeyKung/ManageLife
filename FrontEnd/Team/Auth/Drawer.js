import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import { HeaderTitle } from '@react-navigation/elements';
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import SchedulerStack from '../Scheduler/Navigations/SchedulerStack';
import HealthStack from '../Health/Navigations/HealthStack';
import NoteStack from '../Notes/Navigations/NoteStack';
import UserSettings from '../User/Pages/UserSetting';


import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import axios from 'axios';
import LocalIP from '../LocalIP';
const CustomDrawerContent = (props) => {
  axios.get(`http://${LocalIP}:8082/user-service/user`).then(res=>console.log(res)).catch(er=>console.log(er))
  let userImage = require("../../assets/icon.png")
  let username = "NutThai"
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9 }}>
        <DrawerContentScrollView  {...props}>
          <View style={{ padding: 15 }}>
            <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={userImage} />
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{username}</Text>
          </View>

          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
      <View style={{ borderTopColor: "#ccc", borderTopWidth: 1 }}>
        <TouchableOpacity onPress={() => {
          FIREBASE_AUTH.signOut()
        }} style={{ paddingVertical: 20, marginLeft: 20 }}>

          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <FontAwesome name="sign-out" size={24} color="black" />
            <Text>  Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>



    </View >
  );
};
const Drawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="SchedulerStack"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#88CF88',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          display: 'none', // Hide the default title
        }
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen options={{
        headerStyle: {
          backgroundColor: '#88CF88',
        },
        headerTintColor: 'black',
        drawerIcon: ({ color }) => (
          <AntDesign name="calendar" size={24} color={color} />
        )
      }} name="SchedulerStack" component={SchedulerStack} />
      <Drawer.Screen name="HealthStack" component={HealthStack} options={{
        headerStyle: {
          backgroundColor: '#88CF88',
        },
        headerTintColor: 'black',
        drawerIcon: ({ color }) => (
          <Ionicons name="fitness" size={24} color={color} />
        )
      }}
      />
      <Drawer.Screen name="NoteStack" component={NoteStack} options={{
        headerStyle: {
          backgroundColor: '#88CF88',
        },
        headerTintColor: 'black',
        drawerIcon: ({ color }) => (
          <FontAwesome name="sticky-note" size={24} color={color} />
        )
      }}
      />
      <Drawer.Screen name="UserSettings" component={UserSettings} options={{
        headerStyle: {
          backgroundColor: '#88CF88',
        },
        headerTintColor: 'black',
        drawerIcon: ({ color }) => (
          <Ionicons name="person" size={24} color={color} />
        )
      }}
      />
    </Drawer.Navigator>
  )
}


export default Drawer

const styles = StyleSheet.create({})