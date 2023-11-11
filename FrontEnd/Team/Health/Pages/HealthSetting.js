import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const HealthSetting = () => {
  const [goalSteps, setGoalSteps] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        //พังอยู่
        // const healthData = await AsyncStorage.getItem("health");
        // // Do something with healthData
        // setGoalSteps(healthData.goal);
        // setAge(healthData.age);
        // setWeight(healthData.weight);
        // setSelectedActivity(healthData.activities);
        // console.log("healthData", healthData);


      } catch (error) {
        console.error("Error fetching health data:", error);
      }
    };
  
    fetchData(); // Call the async function
  
  }, []); // Empty dependency array means the effect runs once after the initial render
  //copy
  const dataUser = {
    // userId: "10",
    // steps: 10000,//ทำให้มัน Link กับ useState goalSteps ที

    // sex: "male",
    // age: "15",
    // weight: "90",
    // height: "180",
    // activities: "Sedentary",

    userId: "10", 
    steps: goalSteps,//ทำให้มัน Link กับ useState goalSteps ที

    sex: "male",
    age: age,
    weight: weight,
    height: height,
    activities: selectedActivity,
  };
  const _storeData = async () => {
    try {
      await AsyncStorage.setItem("health", JSON.stringify(data));
      console.log("saved already");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const data = [
    { key: "1", value: "Sedentary (little or no exercise)" },
    { key: "2", value: "Lightly active (exercise 1–3 days/week)" },
    { key: "3", value: "Moderately active (exercise 3–5 days/week)" },
    { key: "4", value: "Active (exercise 6–7 days/week)" },
    { key: "5", value: "Very active (hard exercise 6–7 days/week)" },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          alignItems: "center",
          width: "90%",
          paddingVertical: 50,
          borderRadius: 20,
        }}
      >
        <Text style={styles.title}>Set Your Health Goals</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Goal Steps"
          value={goalSteps}
          onChangeText={(text) => setGoalSteps(text)}
        />
        <TextInput
        //   keyboardType="numeric"
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={(text) => setAge(text)}
        />
        <TextInput
        //   keyboardType="numeric"
          style={styles.input}
          placeholder="Weight (in kg)"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        <TextInput
        //   keyboardType="numeric"
          style={styles.input}
          placeholder="Height (in cm)"
          value={height}
          onChangeText={(text) => setHeight(text)}
        />
        <View style={styles.drop}>
          <SelectList
            dropdownStyles={{
              backgroundColor: "white",
              width: "100%",
            }}
            search={false}
            setSelected={(val) => setSelectedActivity(val)}
            data={data}
            save="value"
            placeholder="How Active Are You?"
          />
        </View>
        <Button
          title="Save"
          onPress={async () => {
            // Owen did this pls review
            var storage = await AsyncStorage.getItem("health");
            console.log("storage : ", storage);
            // await AsyncStorage.removeItem("health");
            var newStorage = storage;
            // var isExis = (await axios.get("http://localhost:8082/health-service/health/" + dataUser.userId)).status

            //get userData from DB
            let res = await axios.get(
              "http://192.168.1.132:8082/health-service/health/" +
                dataUser.userId
            );
            console.log("axios", res.data[0]);
            console.log("axios", res.status);
            if (res.status != 200) {
              await axios.post(
                "http://192.168.1.132:8082/health-service/health",
                dataUser
              );
              console.log("Created");
            } else {
              console.log("Update");
              await axios.put(
                "http://192.168.1.132:8082/health-service/UpdateHealth",
                dataUser
              );
              console.log("Updated");
              let res = await axios.get(
                "http://192.168.1.132:8082/health-service/health/" +
                  dataUser.userId
              );
              res = res.data[0];
              console.log("Up res", res);
              newStorage.userId = dataUser.userId;
              newStorage.steps = 0;
            //   newStorage.steps = storage.steps;
              newStorage.goal = res.steps;
              newStorage.sex = storage.sex;
              newStorage.age = res.age;
              newStorage.weight = res.weight;
              newStorage.height = res.height;
              newStorage.activities = res.activity;
              newStorage.bmi = res.bmi;
              console.log("newStorage updated", newStorage);

              try {
                await AsyncStorage.setItem(
                  "health",
                  JSON.stringify(newStorage)
                );
                console.log(
                  "AsyncStorage updated",
                  await AsyncStorage.getItem("health")
                );
//                 AsyncStorage updated "{\"userId\":\"10\",\"steps\":0,\"sex\":\"male\",\"age\":\"15\",\"weight\":\"80\",\"height\":\"180\",\"activities\":\"Sedentary\",\"goal\":10,\"calories\":0,\"bmi\":{\"h\":0,\"level\":\"\",\"out\":0,\"w\":0}}"    

                setGoalSteps(newStorage.steps);
                setAge(newStorage.age);
                setWeight(newStorage.weight);
                setHeight(newStorage.height);
                setSelectedActivity(newStorage.activities);
              } catch {
                console.log("Cant update async storage!!!");
              }
            }
          }}
          // Spring boot
          // python
          //   }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#93CFB5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  drop: {
    marginTop: 10,
    width: "80%",
    marginBottom: 15,
  },
});

export default HealthSetting;
