import React, { useState, useEffect, useRef } from "react";
import LocalIP from "../../LocalIP";
import { getAuth } from "firebase/auth";
import { Entypo } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryGroup,
} from "victory-native";

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
import { Alert } from "react-native";

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
  const [balance, setBalance] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedIncome, setSelectedIncome] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [isShowList, setIsShowList] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    color: "",
  });
  // userId, name, color, date

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
  const widthAndHeight = 200;

  const incomePress = () => {
    setIncomeSelected(true);
    setExpenssSelected(false);
  };
  const expensesPress = () => {
    setExpenssSelected(true);
    setIncomeSelected(false);
  };
  const fetchPieChart = () => {
    const incomeSeries = selectedIncome.map((item) => item.amount);
    const incomeSliceColors = selectedIncome.map((item) => item.color);
    const expensesSeries = selectedExpenses.map((item) => item.amount);
    const expensesSliceColors = selectedExpenses.map((item) => item.color);
    console.log("Income Series:", incomeSeries);
    console.log("Income Slice Colors:", incomeSliceColors);
    console.log("Expenses Series:", expensesSeries);
    console.log("Expenses Slice Colors:", expensesSliceColors);
    const totalIncome = incomeSeries.reduce(
      (total, amount) => total + amount,
      0
    );
    const totalExpense = expensesSeries.reduce(
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
  const addMoney = () => {
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
    fetchBarChart();
  }, [expenses, incomes]);
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
    const totalIncome = incomes.reduce((total, item) => total + item.amount, 0);
    // console.log("totalIncome:", totalIncome)
    const totalExpenses = expenses.reduce(
      (total, item) => total + item.amount,
      0
    );
    // console.log("totalExpense:", totalExpenses)
    setBalance(totalIncome - totalExpenses);
  }, [incomes, expenses]);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(
        `http://${LocalIP}:8082/exchange-service/getmoney/Income/${auth.currentUser.uid}`
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
        `http://${LocalIP}:8082/exchange-service/getmoney/Expense/${auth.currentUser.uid}`
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
    let type; // Declare type outside of the if-else block

    if (incomeSelected) {
      type = "Income";
    } else {
      type = "Expense";
    }
    const res = axios
      .post(
        `http://${LocalIP}:8082/exchange-service/addMoney`,
        {
          userId: newItem.userId,
          date: newItem.date,
          name: newItem.name,
          color: newItem.color,
          amount: newItem.amount,
          type: type,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      .then((res) => {
        console.log("success");
        setFormData({ name: "", amount: "", color: "" });
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

  const fetchBarChart = () => {
    const income1 = getItemByDate(
      incomes,
      new Date().getMonth() + 1 - 4,
      new Date().getFullYear()
    );
    const expenses1 = getItemByDate(
      expenses,
      new Date().getMonth() + 1 - 4,
      new Date().getFullYear()
    );
    const totalIncome1 = income1.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense1 = expenses1.reduce((sum, item) => sum + item.amount, 0);

    const income2 = getItemByDate(
      incomes,
      new Date().getMonth() + 1 - 3,
      new Date().getFullYear()
    );
    const expenses2 = getItemByDate(
      expenses,
      new Date().getMonth() + 1 - 3,
      new Date().getFullYear()
    );
    const totalIncome2 = income2.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense2 = expenses2.reduce((sum, item) => sum + item.amount, 0);

    const income3 = getItemByDate(
      incomes,
      new Date().getMonth() + 1 - 2,
      new Date().getFullYear()
    );
    const expenses3 = getItemByDate(
      expenses,
      new Date().getMonth() + 1 - 2,
      new Date().getFullYear()
    );
    const totalIncome3 = income3.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense3 = expenses3.reduce((sum, item) => sum + item.amount, 0);

    const income4 = getItemByDate(
      incomes,
      new Date().getMonth() + 1 - 1,
      new Date().getFullYear()
    );
    const expenses4 = getItemByDate(
      expenses,
      new Date().getMonth() + 1 - 1,
      new Date().getFullYear()
    );
    const totalIncome4 = income4.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense4 = expenses4.reduce((sum, item) => sum + item.amount, 0);

    const income5 = getItemByDate(
      incomes,
      new Date().getMonth() + 1,
      new Date().getFullYear()
    );
    const expenses5 = getItemByDate(
      expenses,
      new Date().getMonth() + 1,
      new Date().getFullYear()
    );
    const totalIncome5 = income5.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense5 = expenses5.reduce((sum, item) => sum + item.amount, 0);
    console.log(totalIncome1);
    setBarChartData([
      {
        month: convertMonthToString(new Date().getMonth() + 1 - 4),
        income: totalIncome1,
        expense: totalExpense1,
      },
      {
        month: convertMonthToString(new Date().getMonth() + 1 - 3),
        income: totalIncome2,
        expense: totalExpense2,
      },
      {
        month: convertMonthToString(new Date().getMonth() + 1 - 2),
        income: totalIncome3,
        expense: totalExpense3,
      },
      {
        month: convertMonthToString(new Date().getMonth() + 1 - 1),
        income: totalIncome4,
        expense: totalExpense4,
      },
      {
        month: convertMonthToString(new Date().getMonth() + 1),
        income: totalIncome5,
        expense: totalExpense5,
      },
    ]);
    console.log(barChartData);
  };

  const handleDeletePress = (itemId) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {deleteItem(itemId)},
        },
      ],
      { cancelable: false }
    );
  };
  const  deleteItem = async (itemId) => {
    try {
     
      const res = await axios.delete(`http://${LocalIP}:8082/exchange-service/delete/${itemId}`)
      .then((res) => {
       Alert.alert("Delete Success!!")
        fetchData();
      })

 
    } catch (error) {
      // Handle errors

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
            
            boxStyles={{borderWidth:0}}
            dropdownStyles={{borderWidth:0, backgroundColor:"white"}}
            dropdownItemStyles={{borderBottomWidth:1, borderColor:"#ccc"}}
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
              boxStyles={{borderWidth:0}}
              dropdownItemStyles={{borderBottomWidth:1, borderColor:"#ccc"}}
              dropdownStyles={{borderWidth:0, backgroundColor:"white"}}
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
                <Text>
                  no data found in {convertMonthToString(selectedMonth)}{" "}
                  {selectedYear}
                </Text>
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
                      addMoney();
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
                <Text>
                  no data found in {convertMonthToString(selectedMonth)}{" "}
                  {selectedYear}
                </Text>
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
                      addMoney();
                    }}
                  >
                    <Text style={{ fontSize: 30 }}> + </Text>
                  </TouchableOpacity>
                )}
            </View>
          )}
          <View
            style={{ flexDirection: "row", justifyContent: "flex-end", marginTop:10 }}
          >
            <Text>list</Text>
            <TouchableOpacity
              onPress={() => {
                setIsShowList(!isShowList);
              }}
            >
              {isShowList? ( <Entypo name="chevron-up" size={24} color="black" />):( <Entypo name="chevron-down" size={24} color="grey" />)}
             
            </TouchableOpacity>
          </View>
          {isShowList ? (
            <View style={styles.moneyList}>
              {incomeSelected
                ? selectedIncome.map((item) => (
                    <TouchableOpacity onPress={()=>{handleDeletePress(item._id)}}
                      key={item._id}
                      style={[
                        styles.moneyItem,
                        { backgroundColor: item.color },
                      ]}
                    >
                      <View style={styles.itemTextContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.itemText}>{item.amount} THB</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                : selectedExpenses.map((item) => (
                  <TouchableOpacity onPress={()=>{handleDeletePress(item._id)}}
                      key={item._id}
                      style={[
                        styles.moneyItem,
                        { backgroundColor: item.color },
                      ]}
                    >
                      <View style={styles.itemTextContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.itemText}>{item.amount} THB</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
            </View>
          ) : (
            <View></View>
          )}
        </View>
      )}
      {incomes.length>0 || expenses.length>0 ? (    <View style={{ padding: 20 }}>
        <Text
          style={{
            justifyContent: "center",
            textAlign: "center",
            fontSize: 20,
            marginTop: 10,
          }}
        >
          Last 5 months
        </Text>
        <View style={styles.barChartContainer}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5]}
              tickFormat={barChartData.map((data) => data.month)}
            />
            <VictoryAxis dependentAxis tickFormat={(t) => `฿${Math.abs(t)}`} />
            <VictoryGroup offset={15} padding={0}>
              <VictoryBar
                data={barChartData}
                x="month"
                y="income" // Use the correct property from your barChartData
                style={{ data: { fill: "#93CFB5" } }}
              />
              <VictoryBar
                data={barChartData}
                x="month"
                y="expense"
                style={{ data: { fill: "#fa3741" } }}
              />
            </VictoryGroup>
          </VictoryChart>
        </View>
      </View>):(null)}

      {/* <Button
        title="test"
        onPress={() => {
          console.log(barChartData)
        }}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  headerContainer: {
    height: 160,
    backgroundColor: "#88CF88",
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
    // minHeight:300,
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
    height: 45,
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
    fontSize: 16,
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
    width: "auto",
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
  barChartContainer: {
    backgroundColor: "white",
    borderRadius: 20,

    // alignItems:"center",
    // justifyContent:"center",
    marginTop: 20,
    marginBottom:20
    // paddingLeft:20
  },
});

export default MoneyDetail;
