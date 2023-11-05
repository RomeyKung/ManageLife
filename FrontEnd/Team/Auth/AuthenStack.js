import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Drawer from './Drawer';
const AuthenStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Drawer" component={Drawer} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default AuthenStack

