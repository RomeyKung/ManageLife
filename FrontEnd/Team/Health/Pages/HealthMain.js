import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Pedometer } from 'expo-sensors';
import * as Progress from 'react-native-progress';
// import { Pedometer } from 'expo-sensors';

const HealthMain = ({ navigation }) => {
  const [goal, setGoal] = useState(10)//การเดินให้ได้อย่างน้อยวันละ 7,000 – 8,000 ก้าวน่าจะมีประโยชน์ต่อต่อสุขภาพอย่างแน่นอน
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null)

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
        setCurrentStepCount(result.steps);
        console.log(result.steps)
        setProgress((result.steps / goal)); 
        console.log(progress)
        
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

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
              18.5
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
              3000
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