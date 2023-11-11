import React, { useState, useEffect } from 'react';
import { AppState, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Pedometer } from 'expo-sensors';
import * as Progress from 'react-native-progress';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
// import { Pedometer } from 'expo-sensors';

const HealthMain =  ({ navigation }) => {
  // await AsyncStorage.clear();
  const [goal, setGoal] = useState(0)//การเดินให้ได้อย่างน้อยวันละ 7,000 – 8,000 ก้าวน่าจะมีประโยชน์ต่อต่อสุขภาพอย่างแน่นอน
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
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
  //LOG from healthSetting AsyncStorage updated "{\"userId\":\"10\",\"steps\":0,\"sex\":\"male\",\"age\":\"15\",\"weight\":\"80\",\"height\":\"180\",\"activities\":\"Sedentary\",\"goal\":10,\"calories\":0,\"bmi\":{\"h\":0,\"level\":\"\",\"out\":0,\"w\":0}}"
  const _storeData = async () => {
    const dateTime = await AsyncStorage.getItem("health");
    const date = JSON.parse(dateTime);
    try {
      const data = {
        "userId": auth.currentUser.uid,
        "steps": currentStepCount,
        "sex": "male",
        "age": "15",
        "weight": "80",
        "height": "180",
        "activities": "Sedentary",
        "goal": goal,
        "calories": calories,
        "bmi":bmi,
        "dateTime": date?.dateTime
      };
      await AsyncStorage.setItem("health", JSON.stringify(data));
      console.log("saved already");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('health');
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        console.log(parsedValue)
        setGoal(Number(parsedValue.goal))
        setCurrentStepCount(parsedValue.steps);
        setProgress(parsedValue.steps / parsedValue.goal);
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

  if (isAvailable) {
    const end = new Date();
    const start = new Date();
    end.setDate(start.getDate() + 1);
    console.log(end, start)

    const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);//กำหนดวัน
    if (pastStepCountResult) {
      setPastStepCount(pastStepCountResult.steps);
    }
    return Pedometer.watchStepCount(result => {
      setCurrentStepCount(currentStepCount + result.steps);
      console.log(result.steps)
      setProgress(progress + (result.steps / goal));
      console.log(progress)

    });
  }
};

useEffect(() => {

   async function getHealthuser(){
    const auth = getAuth();
    try {
      let res = await axios.get(
        "http://192.168.1.46:8082/health-service/health/" +
          auth.currentUser.uid
      );
      const data = {
        "userId": auth.currentUser.uid,
        "steps": 0,
        "sex": res.data[0].sex,
        "age": res.data[0].age,
        "weight": res.data[0].weight,
        "height": res.data[0].height,
        "activities": "Sedentary",
        "goal": res.data[0].steps,
        "calories": res.data[0].calories,
        "bmi":res.data[0].bmi,
        "dateTime": res.data[0].dateTime
      };
      // console.log(res.data[0].data)
      await AsyncStorage.setItem("health", JSON.stringify(data));
    } catch (error) {
      console.log("not found user")
    }
    _retrieveData();
   }
   getHealthuser();
  const subscription = subscribe();
}, [health]);

useEffect(() => {
  async function setTodatabase() {
    const data = await AsyncStorage.getItem("health");
    const currentDate = JSON.parse(data);
    const time = new Date(currentDate?.dateTime);
    time.setSeconds(time.getSeconds() + 2);
    if (currentDate?.date && (new Date() >= time + 1)) {
      console.log("remove async storage")
      await AsyncStorage.removeItem("health");
    }
  }
  const appStateListener = AppState.addEventListener('change', async (nextAppState) => {
    if (nextAppState === 'inactive' || nextAppState === 'background') {
      console.log("steps : " + currentStepCount);
      console.log("progress : " + progress);

      await _storeData();
    }
  });
  setTodatabase();
  return () => {
    appStateListener && appStateListener.remove();
  };
}, [currentStepCount, health]);


return (
  <View style={styles.container}>
    <View style={styles.card} >
      <Text style={styles.headerText} >
        Gauge for Healthy
      </Text>
      <Progress.Bar borderRadius={50} color={"#D2FF6E"} unfilledColor={"#F2FFD4"} progress={progress} width={300} height={30} />
      <Text style={styles.subText}>
        Goal: {goal} | {(progress * 100).toFixed(2)}%
      </Text>
    </View>
    <View style={styles.card}>
      <Text style={styles.headerText}>
        Win Streaks
      </Text>
      <Text style={styles.subText}>
        60 Day
      </Text>
    </View>
    <View style={styles.grid}>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.gridHeaderText}>
            BMI
          </Text>
          <Text style={styles.subText}>
            {bmi.out + " " + bmi.level}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.gridHeaderText}>
            Steps
          </Text>
          <Text style={styles.subText}>
            {currentStepCount}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.card}>

          <Text style={styles.gridHeaderText}>
            Calories/day
          </Text>
          <Text style={styles.subText}>
            {calories}
          </Text>
        </View>
        <TouchableOpacity style={styles.card} onPress={() => {
          navigation.navigate("Setting")
        }}>
          <Text style={styles.gridHeaderText}>
            Setting
          </Text>
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