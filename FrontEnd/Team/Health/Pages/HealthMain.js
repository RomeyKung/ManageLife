import React, { useState, useEffect } from 'react';
import { AppState, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Pedometer } from 'expo-sensors';
import * as Progress from 'react-native-progress';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { Animated } from "react-native";
import LocalIP from '../../LocalIP';
import { Ionicons } from '@expo/vector-icons'; 
// import { Pedometer } from 'expo-sensors';

const HealthMain = ({ navigation }) => {
  // await AsyncStorage.clear();
  const [goal, setGoal] = useState(0)//การเดินให้ได้อย่างน้อยวันละ 7,000 – 8,000 ก้าวน่าจะมีประโยชน์ต่อต่อสุขภาพอย่างแน่นอน
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  // const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null)
  const [bmi, setBmi] = useState({
    "h": 0,
    "level": "",
    "out": 0,
    "w": 0
  });
  const auth = getAuth();
  const health = useSelector(state => state.health);
  const [calories, setcal] = useState(0);
  const av = new Animated.Value(0);
  av.addListener(() => { return });
  //LOG from healthSetting AsyncStorage updated "{\"userId\":\"10\",\"steps\":0,\"sex\":\"male\",\"age\":\"15\",\"weight\":\"80\",\"height\":\"180\",\"activities\":\"Sedentary\",\"goal\":10,\"calories\":0,\"bmi\":{\"h\":0,\"level\":\"\",\"out\":0,\"w\":0}}"
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('health');
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        console.log(parsedValue)
        setGoal(parsedValue.goal)
        setCurrentStepCount(parsedValue.steps);
        if (parsedValue.steps != 0 && parsedValue.goal != 0) {
          setProgress(parsedValue.steps / parsedValue.goal);
        }
        setBmi(parsedValue.bmi);
        setcal(parsedValue.calories);
        console.log(progress)
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };


  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
    const value = await AsyncStorage.getItem('health');
    const parsedValue = JSON.parse(value);

    if (isAvailable) {
      return Pedometer.watchStepCount(result => {
        const newStepCount = parsedValue?.steps + result.steps;
        console.log(result.steps);
        if (value != null) {
          console.log("kenmuraki")
          const goal1 = goal == 0 ? parsedValue.goal : goal
          setCurrentStepCount(newStepCount);
          setProgress((newStepCount) / goal1);
        } else {
          setCurrentStepCount(result.steps);
          // setProgress(result.steps/goal);
        }
      });
    }
  };

  useEffect(() => {

    async function getHealthuser() {
      const auth = getAuth();
      const subscription = subscribe();
      try {
        let res = await axios.get(
          `http://${LocalIP}:8082/health-service/health/` +
          auth.currentUser.uid
        );
        const data = {
          "userId": auth.currentUser.uid,
          "steps": res.data[0].steps,
          "sex": res.data[0].sex,
          "age": res.data[0].age,
          "weight": res.data[0].weight,
          "height": res.data[0].height,
          "activities": "Sedentary",
          "goal": res.data[0].goal,
          "calories": res.data[0].calories,
          "bmi": res.data[0].bmi,
          "dateTime": res.data[0].dateTime
        };
        // console.log(res.data[0].data)
        await AsyncStorage.setItem("health", JSON.stringify(data));
        console.log(res.data[0]);
        
      } catch (error) {
        console.log("not found user")
      } finally {
        _retrieveData();
      }
      return () => subscription && subscription.remove();
    }
    getHealthuser();
  }, [health]);

  useEffect(() => {
    async function test() {
      try {
        let res1 = await axios.get(
          `http://${LocalIP}:8082/health-service/health/` +
          auth.currentUser.uid
        );
        // Define the given date and time
        const givenDate = new Date(res1.data[0].dateTime);

        // Create a new date by adding 24 hours to givenDate
        const futureDate = new Date(givenDate);
        futureDate.setHours(givenDate.getHours() + 24);
        // Compare the two dates
        if (res1.data[0] && givenDate > futureDate) {
          await axios.put(
            `http://${LocalIP}:8082/health-service/UpdateHealth`,
            {
              userId: auth.currentUser.uid,
              steps: 0,//ทำให้มัน Link กับ useState goalSteps ที
              health: res1.data[0].healthId,
              goal: 0,
              sex: res1.data[0].sex,
              age: res1.data[0].age,
              weight: res1.data[0].weight,
              height: res1.data[0].height,
              activities: res1.data[0].height,
            }
          );
        }
      } catch (error) {
        console.log("none user")
      }
    }
    const appStateListener = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'inactive' || nextAppState === 'background') {
        console.log("steps : " + currentStepCount);
        console.log("progress : " + progress);
        console.log("goal : " + goal);
        const data = await AsyncStorage.getItem("health");
        const dataUser = JSON.parse(data);
        console.log("dataUser goal" + dataUser?.goal)
        if (dataUser?.goal != 0 && dataUser != null) {
          try {
            const res1 = await axios.get(
              `http://${LocalIP}:8082/health-service/health/` +
              auth.currentUser.uid
            );
            console.log("axios", res1.data[0]);
            console.log("axios", res1.status);
            console.log("Update");
            await axios.put(
              `http://${LocalIP}:8082/health-service/UpdateHealth`,
              {
                userId: auth.currentUser.uid,
                steps: currentStepCount,//ทำให้มัน Link กับ useState goalSteps ที
                goal: goal,
                healthId: res1.data[0].healthId,
                sex: dataUser.sex,
                age: dataUser.age,
                weight: dataUser.weight,
                height: dataUser.height,
                activities: dataUser.activities,
              }
            );
          } catch (error) {
            console.log(error.messsage);
          }
        }
      }
      test()
    });
    return () => {
      appStateListener && appStateListener.remove();
    };
  }, [currentStepCount]);


  return (
    <View style={styles.container}>
      <View style={styles.card} >
        <Text style={[styles.headerText, { color: '#557C55' }]} >
          Gauge for Healthy
        </Text>
        {/* <Progress.Bar borderRadius={50} color={"#D2FF6E"} unfilledColor={"#F2FFD4"} progress={progress} width={300} height={30} animated={true} /> */}
        <Text style={[styles.subText, { textAlign: 'center' }]}>
          <Text style={{ fontWeight: 'bold' }}>Goal:</Text> {goal} steps{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Distance:</Text>{" "}
          {(currentStepCount / 1312.33595801).toFixed(2)} Km
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.headerText, { color: '#748E63' }]}>
          Remaining steps to goal
        </Text>
        <Text style={[styles.subText, currentStepCount >= goal ? { color: "green" } : { color: 'red' }, {fontWeight:'bold'}]}>
          {currentStepCount < goal ? goal - currentStepCount + " steps" : "Goal success"}
        </Text>
      </View>
      <View style={styles.grid}>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={[styles.gridHeaderText, { color: '#748E63' }]}>
              BMI
            </Text>
            <Text style={[styles.subText, { textAlign: 'center' }]}>
              {bmi.out.toFixed(2)}
            </Text>
            <Text style={[styles.subText, { textAlign: 'center', fontWeight:'bold' }]}>
              {bmi.level}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={[styles.gridHeaderText, { color: '#748E63' }]}>
              Steps
            </Text>
            <Text style={styles.subText}>
              {currentStepCount} steps
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.card}>

            <Text style={[styles.gridHeaderText, { color: '#748E63' }]}>
              Calories/day
            </Text>
            <Text style={styles.subText}>
              {Number(calories).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity style={styles.card} onPress={() => {
            navigation.navigate("Setting", { currentStepCount })
          }}>
            <Text style={[styles.headerText, { color: 'black' }]}>
              Setting
            </Text>
            <Text style={{fontSize:16, textAlign:'center', color:'gray'}}>BMI & Calories</Text>
            <Ionicons name="calculator" size={24} color="black" /> 
          </TouchableOpacity>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#93CFB5",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",

  },
  goalCard: {
    flex: 1,
    borderRadius: 50,
    width: "100%",
    backgroundColor: "#fff",
  },
  heightCard: {
    flex: 1,
    borderRadius: 50,
    marginTop: 15,
    width: "100%",
    backgroundColor: "#fff",
  },
  grid: {
    flex: 2,
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  row: {
    flex: 1,
  },
  card: {
    marginTop: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#fff",
    flex: 1,
    borderWidth:1,
    borderColor:'#748E63',
    width: "100%",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 26,
  },
  gridHeaderText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subText: {
    fontSize: 20
  }
});
export default HealthMain