import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import Inventory from '../Pages/Inventory'
import { createStackNavigator } from '@react-navigation/stack';
// import axios from 'axios';
const InventoryStack = () => {
    const Stack = createStackNavigator();
    // useEffect(() => {
    //     axios.post("http://127.0.0.1:5000/bmiCal?w=80&h=180").then(res => console.log(res.data)).catch(err => console.log(err.message));
    // }, [])
    return (
        <Stack.Navigator>
            <Stack.Screen name="Inventory" component={Inventory} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default InventoryStack

