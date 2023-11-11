import React, { useState, useEffect, useRef } from "react";
import LocalIP from "../../LocalIP";
import { getAuth } from "firebase/auth";

import { SelectList } from "react-native-dropdown-select-list";

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
  const [allIncome, setAllIncome] = useState(null);
  const [allExpenese, setAllExpenses] = useState(50);
  const [incomeSeries, setIncomeSeries] = useState([]);
  const [incomeSliceColors, setIncomeSliceColors] = useState([]);
  const [expensesSeries, setExpensesSeries] = useState([]);
  const [expensesSliceColors, setExpensesSliceColors] = useState([]);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(50);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedIncome, setSelectedIncome] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);

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

  const [incomes, setIncomes] = useState([]);
  const getItemByDate = (items, month, year) => {
    return items.filter((item) => {
      const date = new Date(item.date);
      return date.getMonth() + 1 === month && date.getFullYear() === year;
    });
  };
  const [expenses, setExpenses] = useState([
    {
      name: "ซื้อข้าว",
      amount: 50,
      color: "#CF8174",
    },
  ]);

  //   chart
  const widthAndHeight = 250;

  const incomePress = () => {
    setIncomeSelected(true);
    setExpenssSelected(false);
  };
  const expensesPress = () => {
    setExpenssSelected(true);
    setIncomeSelected(false);
  };
  const fetchPieChart = () => {
    const incomeSeries = selectedIncome.map((item) => item.money);
    const incomeSliceColors = selectedIncome.map((item) => item.color);
    const expensesSeries = selectedExpenses.map((item) => item.money);
    const expensesSliceColors = selectedExpenses.map((item) => item.color);
    console.log("Income Series:", incomeSeries);
    console.log("Income Slice Colors:", incomeSliceColors);
    console.log("Expenses Series:", expensesSeries);
    console.log("Expenses Slice Colors:", expensesSliceColors);
    const totalIncome = incomeSeries.reduce(
      (total, amount) => total + amount,
      0
    );
    const totalExpense = incomeSeries.reduce(
      (total, amount) => total + amount,
      0
    );
    setAllIncome(totalIncome);
    setAllExpenses(totalExpense);
    // setBalance(allIncome - allExpenese);
    setIncomeSeries(incomeSeries);
    setIncomeSliceColors(incomeSliceColors);
    setExpensesSeries(expensesSeries);
    setExpensesSliceColors(expensesSliceColors);
  };
  const addIncome = () => {
    setIsFormOpened(!isFormOpened);
    console.log("add income btn prss");
  };
  const addExpenses = () => {
    console.log("add expenses btn press");
  };
  // useEffect(() => {
  //   setBalance(allIncome - allExpenese);
  // }, [allIncome, allExpenese]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const selectIncomes = getItemByDate(incomes, selectedMonth, selectedYear);
    const selectedExpenses = getItemByDate(
      expenses,
      selectedMonth,
      selectedYear
    );
    setSelectedIncome(selectIncomes);
    setSelectedExpenses(selectedExpenses);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    fetchPieChart();
  }, [selectedMonth, selectedYear, selectedIncome, selectedExpenses]);
  useEffect(() => {
    // console.log("expenese", expenses)
    const totalIncome = incomes.reduce((total, item) => total + item.money, 0);
    // console.log("totalIncome:", totalIncome)
    const totalExpenses = expenses.reduce(
      (total, item) => total + item.money,
      0
    );
    // console.log("totalExpense:", totalExpenses)
    setBalance(totalIncome - totalExpenses);
  }, [incomes, expenses]);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(
        `http://${LocalIP}:8082/exchange-service/money/${auth.currentUser.uid}`
      );
      // console.log("resData:", response.data);
      setIncomes(response.data);
      const selectIncomes = getItemByDate(
        response.data,
        selectedMonth,
        selectedYear
      );
      // console.log(response.data);
      // console.log("-----");
      setSelectedIncome(selectIncomes);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        `http://${LocalIP}:8082/exchange-service/money/${auth.currentUser.uid}`
      );
      // console.log("resData:", response.data);
      setExpenses(response.data);
      const selectedExpenses = getItemByDate(
        response.data,
        selectedMonth,
        selectedYear
      );
      // console.log(response.data);
      // console.log("-----");
      setSelectedExpenses(selectedExpenses);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchData = async () => {
    setIsLoading(true);
    await fetchIncomes();
    await fetchExpenses();
    // incomes

    // Expensees
  };

  const handleSubmit = () => {
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

      .then((res) => {
        console.log("success");
        setIsFormOpened(false);
        fetchData();
      })
      .catch((err) => console.log("erro : ", err));
  };
  const convertMonthToString = (monthNum) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    if (monthNum >= 1 && monthNum <= 12) {
      return months[monthNum - 1];
    } else {
      return "Invalid month number";
    }
  };
  const convertMonthToNum = (monthName) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let monthNum = months.findIndex((month) => month === monthName);

    if (monthNum !== -1) {
      return monthNum + 1;
    } else {
      return "Invalid month name";
    }
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
                        setFormData({
                          ...formData,
                          color: colors[index],
                        });
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
                }}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setFormData({
                    name: "",
                    amount: "",
                    color: "",
                  });
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
          <Text style={styles.headerText}>{balance} THB</Text>
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
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.contentContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              margin: 10,
            }}
          >
            {/* <Text style={{ fontSize: 20 }}>รายการเดือน มกราคม 2023</Text> */}
            <SelectList
              setSelected={(val) => {
                setSelectedMonth(convertMonthToNum(val));
              }}
              search={false}
              placeholder={convertMonthToString(new Date().getMonth() + 1)}
              data={[
                { key: "1", value: "January" },
                { key: "2", value: "February" },
                { key: "3", value: "March" },
                { key: "4", value: "April" },
                { key: "5", value: "May" },
                { key: "6", value: "June" },
                { key: "7", value: "July" },
                { key: "8", value: "August" },
                { key: "9", value: "September" },
                { key: "10", value: "October" },
                { key: "11", value: "November" },
                { key: "12", value: "December" },
              ]}
              save="value"
            />
            <SelectList
              setSelected={(val) => {
                setSelectedYear(val);
                console.log(val);
              }}
              search={false}
              placeholder={new Date().getFullYear()}
              // defaultOption={{ key: "4", value: new Date().getFullYear() }} //default selected option
              data={[
                { key: "1", value: new Date().getFullYear() - 3 },
                { key: "2", value: new Date().getFullYear() - 2 },
                { key: "3", value: new Date().getFullYear() - 1 },
                { key: "4", value: new Date().getFullYear() },
              ]}
              save="value"
            />
          </View>
          {incomeSelected && (
            <View style={styles.chartContainer}>
              {incomeSeries.length > 0 && incomeSliceColors.length > 0 ? (
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={incomeSeries}
                  sliceColor={incomeSliceColors}
                  coverRadius={0.5}
                  coverFill={"#FFF"}
                />
              ) : (
                <Text>No Data</Text>
              )}
              {incomeSeries.length > 0 && incomeSliceColors.length > 0 ? (
                <View style={styles.chartText}>
                  <Text style={{ fontSize: 20 }}>{allIncome}</Text>
                  <Text style={{ fontSize: 20 }}>THB</Text>
                </View>
              ) : null}
              {selectedMonth == new Date().getMonth() + 1 &&
                selectedYear == new Date().getFullYear() && (
                  <TouchableOpacity
                    style={styles.chartBtn}
                    onPress={() => {
                      addIncome();
                    }}
                  >
                    <Text style={{ fontSize: 30 }}> + </Text>
                  </TouchableOpacity>
                )}
            </View>
          )}
          {expenssSelected && (
            <View style={styles.chartContainer}>
              {expensesSeries.length > 0 && expensesSliceColors.length > 0 ? (
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={expensesSeries}
                  sliceColor={expensesSliceColors}
                  coverRadius={0.5}
                  coverFill={"#FFF"}
                />
              ) : (
                <Text>No data</Text>
              )}

              {expensesSeries.length > 0 && expensesSliceColors.length > 0 ? (
                <View style={styles.chartText}>
                  <Text style={{ fontSize: 20 }}>{allExpenese}</Text>
                  <Text style={{ fontSize: 20 }}>THB</Text>
                </View>
              ) : null}
              {selectedMonth == new Date().getMonth() + 1 &&
                selectedYear == new Date().getFullYear() && (
                  <TouchableOpacity
                    style={styles.chartBtn}
                    onPress={() => {
                      addExpenses();
                    }}
                  >
                    <Text style={{ fontSize: 30 }}> + </Text>
                  </TouchableOpacity>
                )}
            </View>
          )}
          <View style={styles.moneyList}>
            {incomeSelected
              ? selectedIncome.map((item) => (
                  <View
                    key={item._id}
                    style={[styles.moneyItem, { backgroundColor: item.color }]}
                  >
                    <View style={styles.itemTextContainer}>
                      <Text style={styles.itemText}>{item.incomeType}</Text>
                      <Text style={styles.itemText}>{item.money} THB</Text>
                    </View>
                  </View>
                ))
              : selectedExpenses.map((item) => (
                  <View
                    key={item._id}
                    style={[styles.moneyItem, { backgroundColor: item.color }]}
                  >
                    <View style={styles.itemTextContainer}>
                      <Text style={styles.itemText}>{item.incomeType}</Text>
                      <Text style={styles.itemText}>{item.money} THB</Text>
                    </View>
                  </View>
                ))}
          </View>
        </View>
      )}
      <Button
        title="test"
        onPress={() => {
          fetchData();
          console.log(incomes);

          console.log(selectedMonth);
          console.log("year", selectedYear);
        }}
      />
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
    minHeight: 200,
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
