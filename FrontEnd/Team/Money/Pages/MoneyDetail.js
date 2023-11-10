import React, { useState, useEffect } from "react";
import LocalIP from "../../LocalIP";
import { getAuth } from "firebase/auth";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import axios from "axios";
// import { ColorPicker } from "react-native-color-picker";

import PieChart from "react-native-pie-chart";
import { FontAwesome } from "@expo/vector-icons";

// #93CFB5  #FBE38E  #CF8174 color theme
const colors = [
  "#93CFB5",
  "#FBE38E",
  "#CF8174",
  "#fa3741",
  "#F26419",
  "#F6AE2D",
  "#DFAEB4",
  "#7A93AC",
  "#33658A",
  "#3d2b56",
  "#42273B",
  "#171A21",
];
const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;

const MoneyDetail = ({ navigation, route }) => {
  const auth = getAuth();
  // auth.currentUser.uid

  const [incomeSelected, setIncomeSelected] = useState(true);
  const [expenssSelected, setExpenssSelected] = useState(false);
  const [allIncome, setAllIncome] = useState(200);
  const [allExpenese, setAllExpenses] = useState(50);
  const [incomeSeries, setIncomeSeries] = useState([]);
  const [incomeSliceColors, setIncomeSliceColors] = useState([]);
  const [expensesSeries, setExpensesSeries] = useState([]);
  const [expensesSliceColors, setExpensesSliceColors] = useState([]);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    color: "",
  });
  // userId, incomeType, color, date

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const [incomes, setIncomes] = useState([
  //   {
  //     name: "ค่าขนม",
  //     amount: 50,
  //     color: "#93CFB5",
  //     date: new Date(),
  //   },
  //   {
  //     name: "ค่าขนม2",
  //     amount: 50,
  //     color: "#93CFB5",
  //     date: new Date(),
  //   },
  //   {
  //     name: "ค่าขนม3",
  //     amount: 50,
  //     color: "#93CFB5",
  //     date: new Date(),
  //   },
  //   {
  //     name: "ค่าขนม4",
  //     amount: 50,
  //     color: "#93CFB5",
  //     date: new Date(),
  //   },
  //   {
  //     name: "ค่าขนม5",
  //     amount: 50,
  //     color: "#93CFB5",
  //     date: new Date(),
  //   },
  //   {
  //     name: "ค่าขนม6",
  //     amount: 50,
  //     color: "#93CFB5",
  //     date: new Date(),
  //   },
  // ]);

  // const [expenses, setExpenses] = useState([
  //   {
  //     name: "ซื้อข้าว",
  //     amount: 50,
  //     color: "#CF8174",
  //   },
  ]);
  const totalIncome = incomes.reduce((total, item) => total + item.amount, 0);
  const totalExpenses = expenses.reduce(
    (total, item) => total + item.amount,
    0
  );

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
  const addIncome = () => {
    setIsFormOpened(!isFormOpened);
    console.log("add income btn press");
  };
  const addExpenses = () => {
    console.log("add expenses btn press");
  };
  const selectMonth = () => {};

  useEffect(() => {
    fetchData()
  }, []);
  const fetchData = () => {
    const res = axios
      .get(
        `http://${LocalIP}:8082/exchange-service/money/${auth.currentUser.uid}`
      )
      .then((res) => {
        console.log(res.data);
        setIncomes(res.data);
        const incomeSeries = incomes.map((item) => item.amount);
        const incomeSliceColors = incomes.map((item) => item.color);
        const expensesSeries = expenses.map((item) => item.amount);
        const expensesSliceColors = expenses.map((item) => item.color);

        setIncomeSeries(incomeSeries);
        setIncomeSliceColors(incomeSliceColors);
        // setExpensesSeries(expensesSeries);
        // setExpensesSliceColors(expensesSliceColors);
        console.log(incomeSeries)
      })
      .catch((err) => console.log("error:", err));
  };
  const handleSubmit = () => {
    // Validate form data and add the new item to either incomes or expenses array
    // You can add more validation as needed
    const newItem = {
      name: formData.name,
      amount: parseInt(formData.amount),
      color: formData.color,
      userId: auth.currentUser.uid,
      date: new Date(),
    };
    console.log(newItem);
    const res = axios
      .post(
        `http://${LocalIP}:8082/exchange-service/addMoney`,
        {
          userId: newItem.userId,
          date: newItem.date,
          incomeType: newItem.name,
          color: newItem.color,
          money: newItem.amount,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      .then((res) => console.log("success"))
      .catch((err) => console.log("erro : ", err));

    // if (incomeSelected) {
    //   setIncomes([...incomes, newItem]);
    // } else {
    //   setExpenses([...expenses, newItem]);
    // }

    // Reset the form data and close the form popup
    // setFormData({
    //   name: "",
    //   amount: "",
    //   color: "",
    // });
    // setIsFormOpened(false);
  };

  return (
    <ScrollView
      style={{ height: "100%" }}
      contentContainerStyle={styles.container}
    >
      {isFormOpened == true && (
        <Modal isVisible={isFormOpened}>
          <View style={styles.formPopup}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={formData.amount}
              onChangeText={(text) => handleInputChange("amount", text)}
              keyboardType="numeric"
            />
            <Text style={{ marginVertical: 10 }}>Pick a color:</Text>
            <View style={styles.group}>
              {colors.map((item, index) => {
                const isActive = selectedColor === colors[index];
                return (
                  <View key={item}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setSelectedColor(colors[index]);
                        handleInputChange("color", selectedColor);
                        console.log(formData.color);
                      }}
                    >
                      <View
                        style={[
                          styles.circle,
                          isActive && { borderColor: item },
                        ]}
                      >
                        <View
                          style={[
                            styles.circleInside,
                            { backgroundColor: item },
                          ]}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleSubmit();
                  // const res = axios
                  //   .get(`http://${LocalIP}:8082/exchange-service/moneys`)
                  //   .then(res=>{
                  //     console.log(res.data)
                  //   }
                  //   )
                  //   .catch((err) => console.log("error:", err));
                }}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setIsFormOpened(false);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>รายการเดือน มกราคม 2023</Text>
          <TouchableOpacity
            onPress={() => {
              selectMonth();
            }}
          >
            <FontAwesome name="sliders" size={20} color="grey" />
          </TouchableOpacity>
        </View>
        {incomeSelected && (
          <View style={styles.chartContainer}>
            {incomeSeries.length > 0 &&incomeSliceColors.length>0  ?(
              <PieChart
                widthAndHeight={widthAndHeight}
                series={incomeSeries}
                sliceColor={incomeSliceColors}
                coverRadius={0.5}
                coverFill={"#FFF"}
              />
            ) : (
              <Text>No data available</Text>
            )}
            <View style={styles.chartText}>
              <Text style={{ fontSize: 20 }}>{allIncome}</Text>
              <Text style={{ fontSize: 20 }}>THB</Text>
            </View>
            <TouchableOpacity
              style={styles.chartBtn}
              onPress={() => {
                addIncome();
              }}
            >
              <Text style={{ fontSize: 30 }}> + </Text>
            </TouchableOpacity>
          </View>
        )}
        {expenssSelected && (
          <View style={styles.chartContainer}>
            {incomeSeries.length > 0 ? (
              <PieChart
                widthAndHeight={widthAndHeight}
                series={expensesSeries}
                sliceColor={expensesSliceColors}
                coverRadius={0.5}
                coverFill={"#FFF"}
              />
            ) : (
              <Text>No data available</Text>
            )}

            <View style={styles.chartText}>
              <Text style={{ fontSize: 20 }}>{allExpenese}</Text>
              <Text style={{ fontSize: 20 }}>THB</Text>
            </View>
            <TouchableOpacity
              style={styles.chartBtn}
              onPress={() => {
                addExpenses();
              }}
            >
              <Text style={{ fontSize: 30 }}> + </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.moneyList}>
          {incomeSelected
            ? incomes.map((item) => (
                <View
                  key={item._id}
                  style={[styles.moneyItem, { backgroundColor: item.color }]}
                >
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemText}>{item.amount} THB</Text>
                  </View>
                </View>
              ))
            : expenses.map((item) => (
                <View
                  key={item._id}
                  style={[styles.moneyItem, { backgroundColor: item.color }]}
                >
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemText}>{item.amount} THB</Text>
                  </View>
                </View>
              ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  headerContainer: {
    height: 160,
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
    // backgroundColor: "blue",
    flexGrow: 1,
    // padding: 20,
    paddingLeft: 20,
    paddingRight: 20,
    // marginBottom:30,
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
  moneyList: {
    paddingBottom: 20,
  },
  formPopup: {
    width: 400,
    // transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    // zIndex: 1,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#93CFB5",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  group: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  circle: {
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    borderRadius: 9999,
    backgroundColor: "white",
    borderWidth: CIRCLE_RING_SIZE,
    borderColor: "transparent",
    marginRight: 8,
    marginBottom: 12,
  },
  circleInside: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 9999,
    position: "absolute",
    top: CIRCLE_RING_SIZE,
    left: CIRCLE_RING_SIZE,
  },
});

export default MoneyDetail;
