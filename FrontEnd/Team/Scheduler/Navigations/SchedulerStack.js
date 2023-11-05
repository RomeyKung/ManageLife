import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import Scheduler from '../Pages/Scheduler'
import { createStackNavigator } from '@react-navigation/stack';
// import axios from 'axios';
const SchedulerStack = () => {
    const Stack = createStackNavigator();
    // useEffect(() => {
    //     axios.post("http://127.0.0.1:5000/bmiCal?w=80&h=180").then(res => console.log(res.data)).catch(err => console.log(err.message));
    // }, [])
    return (
        <Stack.Navigator>
            <Stack.Screen name="Scheduler" component={Scheduler} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default SchedulerStack

