import React, { useState, useMemo, useEffect } from "react";
// import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ImageBackground,
  ScrollView,
} from "react-native";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
  DatePicker,
} from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { FlatList } from "react-native-gesture-handler";
import Popover from "react-native-popover-view";
import { Entypo } from "@expo/vector-icons";
import { IconButton, Icon, MD3Colors, Portal } from "react-native-paper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import LocalIP from "../../LocalIP";
const Scheduler = () => {
  const auth = getAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [act_name, setAct_name] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [mode, setMode] = useState("date");
  const [selected, setSelected] = useState(date); // รับวันที่เริ่มต้นแบบ ISO
  const [allAc, setAllAc] = useState([]);
  const [activityForToDay, setActivityForToDay] = useState([]);
  const ip = LocalIP;
  const [editableIndexes, setEditableIndexes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [currentAc, setCurrentAc] = useState("");
  const [acForUser, setAcForUser] = useState([]);
  const handleTextChange = (index) => {
    setEditableIndexes((prevIndexes) => [...prevIndexes, index]);
    setEditingIndex(index);
  };

  const markedDatesObject = acForUser.map((item, index) =>
  item.appointmentTime).reduce((acc, dateString) => {
    const dateKey = dateString.slice(0, 10);
    if (!acc[dateKey]) {
      acc[dateKey] = {
        selected: true,
        selectedColor: selected == dateKey ?"#88CF88" :"#ff6600",
        selectedTextColor: "white",
      };
    }
  
    return acc;
  }, {});
  
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: "#88CF88",
        selectedTextColor: "white",
      },
    }),
    [selected]
  );
  
  // Merge the two objects outside the useMemo hook
  const combinedMarked = useMemo(() => ({ ...marked, ...markedDatesObject }), [
    marked,
    markedDatesObject,
  ]);
  

  useEffect(() => {
    getAc();
  }, []);

  useEffect(() => {
    const result = allAc.filter((item) =>
      item.appointmentTime.slice(0, 10).includes(selected)
    );

    setActivityForToDay(result);
  }, [allAc]);

  const getAc = async () => {
    try {
      const response = await axios.get(
        `http://${ip}:8082/appointment-service/appointment/${auth.currentUser.uid}`
      );
      setAcForUser(response.data.filter((item)=> item.userId == auth.currentUser.uid))
      setAllAc(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShow(false);
    setTime(currentDate);

    // ปรับค่า `time` เมื่อผู้ใช้เลือกเวลา
  };

  const onChangeNew = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShow2(false);
    setCurrentTime(currentDate);
  };

  const save = async () => {
    setModalVisible(!modalVisible);
    setSelected(selected); // date ที่เลือก
    setActivityForToDay(activityForToDay); // กิจกรรมทั้งหมดในวันที่เลือก
    const requestData = {
      userId: auth.currentUser.uid,
      appointmentDetail: act_name,
      appointmentTime: selected + " " + time.toLocaleTimeString(),
    };

    try {
      const response = await axios.post(
        `http://${ip}:8082/appointment-service/appointment`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      getAc();
      setAllAc([...allAc, requestData]);
      // รับข้อมูลหรือทำอย่างอื่นที่คุณต้องการ
    } catch (error) {
      // จัดการข้อผิดพลาดที่เกิดขึ้นในการร้องขอ
      console.error(error);
    }
  };

  const setActivityForcur = (date) => {
    const result = allAc.filter((item) =>
      item.appointmentTime.slice(0, 10).includes(date)
    );
    setActivityForToDay(result);
  };
  
  const handleDelete = async (item) => {
    const response = await axios.delete(
      `http://${ip}:8082/appointment-service/appointment`,
      {
        data: {
          _id: item._id,
          userId: item.userId,
          appointmentId: item.appointmentId,
          appointmentDetail: item.appointmentDetail,
          appointmentTime: item.appointmentTime,
        },
      }
    );
    getAc();
  };

  const handleEditSave = async (item) => {
    const dateObject = new Date(currentTime);
    const requestData = {
      _id: item._id,
      userId: item.userId,
      appointmentId: item.appointmentId,
      appointmentDetail: currentAc,
      appointmentTime:
        item.appointmentTime.slice(0, 10) +
        " " +
        dateObject.toLocaleTimeString(),
    };
    const response = await axios.put(
      `http://${ip}:8082/appointment-service/appointment`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    getAc();
    setEditableIndexes([]);
    setEditingIndex(null);
  };

  const dateToDay = (date) => {
    const dateForm = new Date(date);
    const options = { weekday: "short", year: "numeric", month: "short" };

    const formattedDate = dateForm.toLocaleDateString("en-US", options);

    const spliteText = formattedDate.split(" ");

    const result = `${spliteText[2]}, ${spliteText[0]} ${spliteText[1]}`;

    return result;
  };

  const renderListItem = (item, index) => {
    const isEditable = editableIndexes.includes(index);
    const isEditing = editingIndex === index;

    return (
      <View key={index}>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            justifyContent: "space-between",
            marginBottom:10
          }}
        >
          {isEditing ? (
            <TextInput
              editable={isEditable}
              style={[isEditable ? styles.input : styles.nonEditable]}
              value={currentAc}
              onChangeText={(text) => {
                setCurrentAc(text);
              }}
            />
          ) : (
            <TextInput
              editable={isEditable}
              style={[isEditable ? styles.input : styles.nonEditable]}
              value={item.appointmentDetail}
              onChangeText={(newText) => handleTextChange(index)}
            />
          )}

          <View
            style={{
              flexDirection: "row",
              marginHorizontal: -10,
            }}
          >
            {isEditing ? (
              <DateTimePicker
                testID="timePicker"
                mode="time"
                value={new Date(currentTime)}
                is24Hour={true}
                display="default"
                onChange={onChangeNew}
                setTime=""
              />
            ) : (
              <Text style={[styles.nonEditable]}>
                {item.appointmentTime.slice(11, 22)}
              </Text>
            )}

            <Popover
              from={
                <TouchableOpacity onPress={() => handleTextChange(index)}>
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                </TouchableOpacity>
              }
            >
              {isEditing ? (
                <Button title="Save" onPress={() => handleEditSave(item)} />
              ) : (
                <Button
                  title="Edit"
                  onPress={() => {
                    handleTextChange(index),
                      setCurrentTime(
                        item.appointmentTime
                      ),
                      setCurrentAc(item.appointmentDetail);
                  }}
                />
              )}
              <Button
                title="Delete"
                onPress={() => {
                  handleDelete(item);
                }}
              />
            </Popover>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        animationInTiming={300}
        animationOutTiming={300}
        onDismiss={() => setModalVisible(false)}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View style={[styles.centeredView]}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Add Activity
            </Text>
            <View style={styles.label}>
              <Text style={{ marginRight: 5 }}>Activity :</Text>
              <TextInput
                value={act_name}
                onChangeText={(text) => setAct_name(text)}
                style={styles.input}
                placeholder="Activity Name"
              ></TextInput>
            </View>
            <View style={styles.label}>
              <Text style={{ marginRight: 5 }}>Time :</Text>
              <TouchableOpacity onPress={() => setShow(true)}>
                <DateTimePicker
                  testID="timePicker"
                  value={time}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  setTime=""
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                // title="Close"
                style={{
                  marginRight: 10,
                  backgroundColor: "#000",
                  padding: 10,
                  borderRadius: 5,
                  width: 80,
                  // justifyContent: "center",
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setAct_name(""); // เซตเป็นค่าเริ่มต้นหรือค่าที่คุณต้องการ
                  setTime(new Date()); // เซตเป็นค่าเริ่มต้นหรือค่าที่คุณต้องการ
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 20, fontWeight: "400" }}
                >
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#88CF88",
                  padding: 10,
                  borderRadius: 5,
                  width: 80,
                }}
                onPress={() => {
                  save(), setAct_name("");
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "400" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ backgroundColor: "#fff", height: "100%" }}>
        <Calendar
          initialDate={date}
          markedDates={combinedMarked}
          
          onDayPress={(day) => {
            setSelected(day.dateString);
            setActivityForcur(day.dateString);
          }}
        />

        <View style={{ backgroundColor: "#fff" }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
              backgroundColor: "#F6F6F6",
              marginBottom: 30,
            }}
          >
            <Text style={[styles.head, { height: 40 }]}>
              {dateToDay(selected)}{" "}
            </Text>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Icon source="plus" color={"#88CF88"} size={40} />
            </TouchableOpacity>
          </View>
          {activityForToDay.length === 0 ? (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                marginLeft: 20,
                backgroundColor: "#FFF",
              }}
            >
              No Activity
            </Text>
          ) : (
            <ScrollView style={{height:300 }}>
               <View>
              {activityForToDay.map((item, index) =>
                renderListItem(item, index)
              )}
            </View>
            </ScrollView>
           
          )}

          {show2 && (
            <DateTimePicker
              testID="timePicker"
              mode="time"
              value={time}
              is24Hour={true}
              // display="default"
              display="default"
              onChange={onChangeNew}
              setTime=""
            />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  head: {
    fontSize: 30,
    // marginLeft: 20,
    marginVertical: 20,
    backgroundColor: "#F6F7F7",
    fontWeight: "400",
  },
  button: {
    marginVertical: 10,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    marginLeft: 5,
    borderRadius: 10,
    paddingLeft: 10,
  },
  label: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#fff",
    borderRadius: 20,
    height: "50%",
    width: "80%",
  },
  modalView: {
    width: 300,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  input2: {
    width: "auto",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  nonEditable: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginRight: 10,
  },
});

export default Scheduler;
