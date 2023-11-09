import React from 'react'
import { View, Text } from 'react-native'
import NoteMain from '../Pages/NoteMain';
import NoteDetail from '../Pages/NoteDetail';
import { createStackNavigator } from '@react-navigation/stack';
const UserStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator >
            <Stack.Screen name="UserMain" component={UserMain} options={{ headerShown: false }}/>
            <Stack.Screen name="UserSetting" component={UserSetting} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default UserStack
