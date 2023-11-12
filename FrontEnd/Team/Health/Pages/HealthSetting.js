import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch } from "react-redux";
import { saveHealthData } from "../../../redux/healthSlice";
import { getAuth } from "firebase/auth";
import LocalIP from "../../LocalIP";
const HealthSetting = ({route, navigation}) => {
  const [goalSteps, setGoalSteps] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [meal, setMeal] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        //พังอยู่
        const healthData = await AsyncStorage.getItem("health");
        // Do something with healthData
        if(healthData!=null){
          const data = JSON.parse(healthData);
        setGoalSteps(String(data?.goal));
        setAge(data?.age);
        setMeal(data?.sex);
        setWeight(data?.weight);
        setHeight(data?.height);
        setSelectedActivity(data?.activities);
        console.log("healthData", data);
        console.log(meal)
        }


      } catch (error) {
        console.error("Error fetching health data:", error);
      }
    };
  
    fetchData(); // Call the async function
  
  }, []); // Empty dependency array means the effect runs once after the initial render
  //copy
  const auth = getAuth();
  const _storeData = async (newStorage) => {
    try {
      dispatch(saveHealthData(newStorage));
//                 AsyncStorage updated "{\"userId\":\"10\",\"steps\":0,\"sex\":\"male\",\"age\":\"15\",\"weight\":\"80\",\"height\":\"180\",\"activities\":\"Sedentary\",\"goal\":10,\"calories\":0,\"bmi\":{\"h\":0,\"level\":\"\",\"out\":0,\"w\":0}}"    
    } catch {
      console.log("Cant update async storage!!!");
    }
  };

  const data = [
    { key: "1", value: "Sedentary" },
    { key: "2", value: "Lightly active" },
    { key: "3", value: "Moderately active" },
    { key: "4", value: "Active" },
    { key: "5", value: "Very active" },
  ];

  const sexdata = [
    { key: "1", value: "male" },
    { key: "2", value: "female" },
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
          // keyboardType="numeric"
          style={styles.input}
          placeholder="Goal Steps"
          value={goalSteps}
          onChangeText={(text) => setGoalSteps(text)}
        />
        {/* <TextInput
          // keyboardType="numeric"
          style={styles.input}
          placeholder="Sex"
          value={meal}
          onChangeText={(text) => setMeal(text)}
        /> */}
        <View style={styles.drop}>
          <SelectList
            dropdownStyles={{
              backgroundColor: "white",
              width: "100%",
            }}
            search={false}
            setSelected={(val) => setMeal(val)}
            data={sexdata}
            save="value"
            placeholder="Sex"
          />
        </View>
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
        <Button style={{marginTop: 10}}
          title="Save"
          onPress={async () => {
            // Owen did this pls review
            var storage = await AsyncStorage.getItem("health");
            console.log("storage : ", storage);
            // await AsyncStorage.removeItem("health");
            var newStorage = JSON.parse(storage);
            // var isExis = (await axios.get("http://localhost:8082/health-service/health/" + dataUser.userId)).status

            //get userData from DB
            try {
              let res1 = await axios.get(
                `http://${LocalIP}:8082/health-service/health/` +
                  auth.currentUser.uid
              );
              console.log("axios", res1?.data[0]);
              console.log("axios", res1?.status);
              console.log("Update");

              const dataUser = {
                userId: auth.currentUser.uid, 
                steps: route.params?.currentStepCount,//ทำให้มัน Link กับ useState goalSteps ที
                healthId: res1?.data[0].healthId,
                goal: goalSteps,
                sex: meal,
                age: age,
                weight: weight,
                height: height,
                activities: selectedActivity,
              };
              await axios.put(
                `http://${LocalIP}:8082/health-service/UpdateHealth`,
                dataUser
              );
              console.log("Updated");
              let res = await axios.get(
                `http://${LocalIP}:8082/health-service/health/` +
                  dataUser.userId
              );
              res = res.data[0];
              console.log("Up res", res);
              console.log(route);
              newStorage.userId = dataUser.userId;
              newStorage.steps = route.params?.currentStepCount;
            //   newStorage.steps = storage.steps;
              newStorage.goal = goalSteps;
              newStorage.sex = dataUser.sex;
              newStorage.age = dataUser.age;
              newStorage.weight = dataUser.weight;
              newStorage.height = dataUser.height;
              newStorage.activities = dataUser.activities;
              newStorage.bmi = res.bmi;
              newStorage.calories = res.calories;
              newStorage.dateTime = res.dateTime;
              console.log("newStorage updated", newStorage);
              _storeData(newStorage);
            } catch (error) {
              const dataUser = {
                userId: auth.currentUser.uid, 
                steps: route.params?.currentStepCount,//ทำให้มัน Link กับ useState goalSteps ที
                goal: goalSteps,
                sex: meal,
                age: age,
                weight: weight,
                height: height,
                activities: selectedActivity,
              };
              const rescreate = await axios.post(
                `http://${LocalIP}:8082/health-service/health`,
                dataUser
              );
              console.log("Created " + rescreate.data);
              res = rescreate.data[0];
              let res = await axios.get(
                `http://${LocalIP}:8082/health-service/health/` +
                  dataUser.userId
              );
              _storeData(res.data[0]);
            }
            navigation.navigate("Health");
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
  },
});

export default HealthSetting;
