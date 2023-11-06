import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import PieChart from "react-native-pie-chart";
// #93CFB5  #FBE38E  #CF8174 color theme

const MoneyDetail = ({ navigation, route }) => {
  const [incomeSelected, setIncomeSelected] = useState(true);
  const [expenssSelected, setExpenssSelected] = useState(false);
  const [allIncome, setAllIncome] = useState(200);
  const [allExpenese, setAllExpenses] = useState(50);
  const [incomes, setIncomes] = useState([
    {
      name: "ค่าขนม",
      amount: 50,
      color: "#93CFB5",
    },
    {
      name: "ค่าจ้างทำงาน",
      amount: 150,
      color: "#FBE38E",
    },
  ]);

  const [expenses, setExpenses] = useState([
    {
      name: "ซื้อข้าว",
      amount: 50,
      color: "#CF8174",
    },
  ]);
  const totalIncome = incomes.reduce((total, item) => total + item.amount, 0);
  const totalExpenses = expenses.reduce(
    (total, item) => total + item.amount,
    0
  );

  const incomeSeries = incomes.map((item) => item.amount);
  const expensesSeries = expenses.map((item) => item.amount);

  const incomeSliceColors = incomes.map((item) => item.color);
  const expensesSliceColors = expenses.map((item) => item.color);

  //   chart
  const widthAndHeight = 250;
  const series = [1, 11, 1, 1, 1];
  const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00", "#ff3c00"];

  const incomePress = () => {
    setIncomeSelected(true);
    setExpenssSelected(false);
  };
  const expensesPress = () => {
    setExpenssSelected(true);
    setIncomeSelected(false);
  };
  const addIncome = () =>{
    console.log("add income btn press")
  }
  const addExpenses = () =>{
    console.log("add expenses btn press")
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <Text style={styles.headerText}>BALANCE</Text>
          <Text style={styles.headerText}>{allIncome} THB</Text>
        </View>
        <View style={styles.headerBottom}>
          <Text
            style={[
              styles.headerText,
              incomeSelected
                ? { textDecorationLine: "underline" }
                : { color: "rgba(255, 255, 255, 0.5)" },
            ]}
            onPress={() => {
              incomePress();
            }}
          >
            INCOME
          </Text>
          <Text
            style={[
              styles.headerText,
              expenssSelected
                ? { textDecorationLine: "underline" }
                : { color: "rgba(255, 255, 255, 0.5)" },
            ]}
            onPress={() => {
              expensesPress();
            }}
          >
            EXPENSES
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        {incomeSelected && (
          <View style={styles.chartContainer}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={incomeSeries}
              sliceColor={incomeSliceColors}
              coverRadius={0.5}
              coverFill={"#FFF"}
            />
            <View style={styles.chartText}>
              <Text style={{ fontSize: 20 }}>{allIncome}</Text>
              <Text style={{ fontSize: 20 }}>THB</Text>
            </View>
            <TouchableOpacity style={styles.chartBtn} onPress={()=>{addIncome()}}>
              <Text style={{ fontSize: 30 }}> + </Text>
            </TouchableOpacity>
          </View>
        )}
        {expenssSelected && (
          <View style={styles.chartContainer}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={expensesSeries}
              sliceColor={expensesSliceColors}
              coverRadius={0.5}
              coverFill={"#FFF"}
            />
            <View style={styles.chartText}>
              <Text style={{ fontSize: 20 }}>{allExpenese}</Text>
              <Text style={{ fontSize: 20 }}>THB</Text>
            </View>
            <TouchableOpacity style={styles.chartBtn} onPress={()=>{addExpenses()}}>
              <Text style={{ fontSize: 30 }}> + </Text>
            </TouchableOpacity>
          </View>
        )}

        {incomeSelected && (
          <ScrollView style={styles.moneyList}>
            {incomes.map((item) => (
              <View
                key={item.name}
                style={[styles.moneyItem, { backgroundColor: item.color }]}
              >
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemText}>{item.amount} THB </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
        {expenssSelected && (
          <ScrollView style={styles.moneyList}>
            {expenses.map((item) => (
              <View
                key={item.name}
                style={[styles.moneyItem, { backgroundColor: item.color }]}
              >
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemText}>{item.amount} THB </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: "20%",
    backgroundColor: "#93CFB5",
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
    elevation: 5,
    display: "flex",
  },
  headerTop: {
    // height:"30%",
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerBottom: {
    // backgroundColor: "blue",
    textAlign: "center",
    // alignItems: "center",
    marginTop: 30,
    height: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 60,
    paddingRight: 60,
  },
  headerText: {
    color: "white",
    fontSize: 20,
  },
  contentContainer: {
    padding: 20,
  },
  chartContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    position: "relative",
    padding: 50,
    marginTop: 20,
  },
  chartText: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    color: "black",
  },
  moneyItem: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "white",
    marginTop: 10,
    paddingLeft: 25,
  },
  itemTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "white",
    textAlign: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 20,
  },
  itemText: {
    fontSize: 20,
  },
  chartBtn: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#CF8174",
    right: 15,
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MoneyDetail;
