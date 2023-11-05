import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import SchedulerStack from '../Scheduler/Navigations/SchedulerStack';
import HealthStack from '../Health/Navigations/HealthStack';
import NoteStack from '../Notes/Navigations/NoteStack';
const Drawer = () => {
    const Drawer = createDrawerNavigator();
        return (
      <Drawer.Navigator initialRouteName="SchedulerStack">
        <Drawer.Screen options={{
          headerStyle: {
            backgroundColor: '#88CF88',
          },
          headerTintColor: 'black',
        }} name="SchedulerStack" component={SchedulerStack} />
        <Drawer.Screen name="HealthStack" component={HealthStack} options={{
          headerStyle: {
            backgroundColor: '#88CF88',
          },
          headerTintColor: 'black',
        }}
        />
        <Drawer.Screen name="NoteStack" component={NoteStack} options={{
          headerStyle: {
            backgroundColor: '#88CF88',
          },
          headerTintColor: 'black',
        }}
        />
      </Drawer.Navigator>
    )}


export default Drawer

const styles = StyleSheet.create({})