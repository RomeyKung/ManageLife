import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import SchedulerStack from "./Team/Scheduler/Navigations/SchedulerStack";
import HealthStack from "./Team/Health/Navigations/HealthStack";
import NoteStack from "./Team/Notes/Navigations/NoteStack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import AuthenStack from "./Team/Auth/AuthenStack";
export default function App() {
  const Drawer = createDrawerNavigator();
  const DrawerNavigator = () => {
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
  } 
  const Stack = createStackNavigator();



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthenStack">
        <Stack.Screen name="AuthenStack" component={AuthenStack} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
