import React from 'react'
import { View, Text } from 'react-native'
import MoneyDetail from '../Pages/MoneyDetail';
import { createStackNavigator } from '@react-navigation/stack';

const MoneyStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator >
            <Stack.Screen name="MoneyDetail" component={MoneyDetail} options={{ headerShown: false }}/>
           
        </Stack.Navigator>
    )
}

export default MoneyStack
