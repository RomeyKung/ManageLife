import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { DataTable, Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from '@firebase/auth';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { async } from '@firebase/util';
import { Entypo } from '@expo/vector-icons';
import LocalIP from '../../LocalIP';
const TodoList = () => {
  const [task, setTask] = useState('');
  const auth = getAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [allTask, setAllTask] = useState([]);
  const [editableIndexes, setEditableIndexes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentTask, setCurrentTask] = useState("")
  useEffect(() => {
    getTask();
  }, []);

  const handleTextChange = (index) => {
    setEditableIndexes((prevIndexes) => [...prevIndexes, index]);
    setEditingIndex(index);
  };

  const getTask = async () => {
    try {
      const response = await axios.get(`http://${LocalIP}:8082/todolist-service/todolist/${auth.currentUser.uid}`);
      const updatedTasks = response.data.map((task) => ({ ...task,isChecked: task.check == "false" ? false : true}));
      setAllTask(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async () => {
    const requestData = {
      userId: auth.currentUser.uid,
      todoListDetail: task,
      check:"false"
    };

    try {
      await axios.post(`http://${LocalIP}:8082/todolist-service/todolist`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      getTask();
    } catch (error) {
      console.error(error);
    }

    setTask('');
    setIsAdding(false);
  };

  const handleCheckBoxChange = (index) => {
    const updatedTasks = [...allTask];
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked;
    setAllTask(updatedTasks);
  };

  const handleDeleteTask = async (item) => {

    try {
      const response = await axios.delete(
        `http://${LocalIP}:8082/todolist-service/todolist`,
        {
          data: {
            _id: item._id,
            todoListId: item.todoListId,
            userId: item.userId,
            todoListDetail: item.todoListDetail,
          },
        }
      )
      getTask();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateTask = async (item) => {

    const requestData = {
      _id: item._id,
      todoListId: item.todoListId,
      userId: item.userId,
      todoListDetail: currentTask != "" ? currentTask : item.todoListDetail,
      check:item.isChecked.toString()
    };
    console.log(requestData)
    try {
      await axios.put(`http://${LocalIP}:8082/todolist-service/todolist`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
getTask()
    } catch (error) {
      console.error(error);
    }

    setEditableIndexes([]);
    setEditingIndex(null);
  }



  return (
    <View style={{ padding: 16 }}>
      <DataTable style={{ width: '100%' }}>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 1, alignItems: 'center' }}>Check</DataTable.Title>
          <DataTable.Title textStyle={{ textAlign: "center" }} style={{ flex: 3, alignItems: 'center' }}>Task name</DataTable.Title>
          <DataTable.Title style={{ flex: 1, alignItems: 'center' }}>Manage</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={allTask}
          extraData={{ editableIndexes, editingIndex }} // Include editableIndexes and editingIndex in extraData
          renderItem={({ item, index }) => {
            const isEditable = editableIndexes.includes(index);
            const isEditing = editingIndex === index;

            return (<DataTable.Row key={item.todoListId}>
              <DataTable.Cell style={{ flex: 1, alignItems: 'center' }}>
                <Checkbox
                  status={item.isChecked ? 'checked' : 'unchecked'}
                  color='#88CF88'
                  onPress={() =>{ handleCheckBoxChange(index),handleUpdateTask(item)}}
                />
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 3 }}>
                {isEditing ?
                  <TextInput
                    editable={isEditable}
                    style={[isEditable ? styles.input : styles.nonEditable]}
                    value={currentTask}
                    onChangeText={(text) => { setCurrentTask(text) }}
                  /> : <TextInput
                    editable={isEditable}
                    style={[isEditable ? styles.input : styles.nonEditable]}
                    value={item.todoListDetail}
                    onChangeText={(newText) => handleTextChange(index)}
                  />}

              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1, alignItems: 'center' }}>

                <TouchableOpacity onPress={() => { handleTextChange(index), isEditing ? handleUpdateTask(item) : setCurrentTask(item.todoListDetail) }}>
                  <Feather name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTask(item)}>
                  <Ionicons name="trash-bin" size={24} color="black" />
                </TouchableOpacity>

              </DataTable.Cell>
            </DataTable.Row>)
          }} />



      </DataTable>

      {isAdding && (
        <View style={{ flexDirection: 'row', width: '100%', marginTop: 15 }}>

          <TextInput
            style={styles.inputt}
            value={task}
            onChangeText={(text) => setTask(text)}
            placeholder='Task name'
          />
          <View style={{ flexDirection: 'row', marginLeft: 10, gap: 10 }}>
            <TouchableOpacity style={{ backgroundColor: "#4CA771", color: "white", padding: 10 }} onPress={handleAddTask}>
              <Text style={{ color: "white" }}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#4CA771", color: "white", padding: 10 }} onPress={() => setIsAdding(false)}>
              <Text style={{ color: "white" }}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      )}
      {!isAdding && (
        <View style={{ marginTop: 15 }}>
          <TouchableOpacity
            onPress={() => setIsAdding(true)}
            style={{
              backgroundColor: '#4CA771',
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>New Task</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: 'black',
    marginTop:10
  }, nonEditable: {
    fontSize: 15,
    fontWeight: "bold",
    color: 'black',
    marginRight: 10
  }, inputt: {
    width: '50%',
    borderRadius: 20,
    marginRight: 10,
    paddingLeft: 16,
  }
});

export default TodoList;
