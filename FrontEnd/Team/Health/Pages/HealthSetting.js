import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'

const HealthSetting = () => {
    const [goalSteps, setGoalSteps] = useState(0);
    const [age, setAge] = useState(0);
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [selectedActivity, setSelectedActivity] = useState("");
    
    const data = [
        { key: '1', value: 'Sedentary (little or no exercise)' },
        { key: '2', value: 'Lightly active (exercise 1–3 days/week)' },
        { key: '3', value: 'Moderately active (exercise 3–5 days/week)' },
        { key: '4', value: 'Active (exercise 6–7 days/week)' },
        { key: '5', value: 'Very active (hard exercise 6–7 days/week)' },
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Your Health Goals</Text>
            <TextInput keyboardType='numeric'
                style={styles.input}
                placeholder="Goal Steps"
                value={goalSteps}
                onChangeText={(text) => setGoalSteps(text)}
            />
            <TextInput keyboardType='numeric'
                style={styles.input}
                placeholder="Age"
                value={age}
                onChangeText={(text) => setAge(text)}
            />
            <TextInput keyboardType='numeric'
                style={styles.input}
                placeholder="Weight (in kg)"
                value={weight}
                onChangeText={(text) => setWeight(text)}
            />
            <TextInput keyboardType='numeric'
                style={styles.input}
                placeholder="Height (in cm)"
                value={height}
                onChangeText={(text) => setHeight(text)}
            />
            <View style={styles.drop}>
                <SelectList
                    dropdownStyles={{
                        backgroundColor: "white",
                        position: "absolute",
                        top: 40,
                        width: "100%",
                        zIndex: 999,
                    }}
                    setSelected={(val) => setSelectedActivity(val)}
                    data={data}
                    save="value"
                    placeholder='How Active Are You?'
                />
            </View>
            <Button
                color="#000"
                title="Save"
                onPress={() => {
                    // Owen did this pls review
                    
                    // Spring boot
                    // python
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#93CFB5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingLeft: 10,
        borderRadius: 10
    },
    drop: {
        marginTop: 10,
        width: '80%',
        marginBottom: 15
    },

});

export default HealthSetting;
