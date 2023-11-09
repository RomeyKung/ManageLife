import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import TodoList from '../Pages/TodoList'
import { createStackNavigator } from '@react-navigation/stack';
// import axios from 'axios';
const TodoListStack = () => {
    const Stack = createStackNavigator();
    // useEffect(() => {
    //     axios.post("http://127.0.0.1:5000/bmiCal?w=80&h=180").then(res => console.log(res.data)).catch(err => console.log(err.message));
    // }, [])
    return (
        <Stack.Navigator>
            <Stack.Screen name="TodoList" component={TodoList} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default TodoListStack

