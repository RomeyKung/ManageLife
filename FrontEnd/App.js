import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import SchedulerStack from "./Team/Scheduler/Navigations/SchedulerStack";
import HealthStack from "./Team/Health/Navigations/HealthStack";
import NoteStack from "./Team/Notes/Navigations/NoteStack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import AuthenStack from "./Team/Auth/AuthenStack";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PaperProvider } from 'react-native-paper';
export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="AuthenStack">
            <Stack.Screen
              name="AuthenStack"
              component={AuthenStack}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
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
