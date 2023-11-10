import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Pressable } from 'react-native';
import { DataTable, Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';


const TodoList = () => {
  const [task, setTask] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  const handleTaskChange = (text) => {
    setTask(text);
  };

  const handleAddTask = () => {
    setTodoList([...todoList, { task, isChecked: false }]);
    setTask('');
    setIsAdding(false);
  };

  const handleCheckBoxChange = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList[index].isChecked = !updatedTodoList[index].isChecked;
    setTodoList(updatedTodoList);
  };

  const handleDeleteTask = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 20, marginHorizontal: 20 }}>
      <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 10 }}>To - Do - List</Text>
      <DataTable style={{ width: '100%' }}>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 1, alignItems: 'center' }}>Check</DataTable.Title>
          <DataTable.Title>Task name</DataTable.Title>
          <DataTable.Title>Manage</DataTable.Title>
        </DataTable.Header>

        {todoList.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{ flex: 1, alignItems: 'center' }}>
              <Checkbox
                status={item.isChecked ? 'checked' : 'unchecked'}
                color='#88CF88'
                onPress={() => handleCheckBoxChange(index)}
              />
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 2, marginLeft: 50 }}>{item.task}</DataTable.Cell>
            <DataTable.Cell>
              <Pressable onPress={() => handleDeleteTask(index)}>
                <Ionicons name="trash-bin" size={24} color="black" />
              </Pressable>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      {isAdding && (
        <View style={{ flexDirection: 'row', marginVertical: 10, marginLeft: 50, marginRight: 50, width: '100%' }}>
          <Checkbox status="unchecked" />
          <TextInput
            style={styles.input}
            value={task}
            onChangeText={handleTaskChange}
            placeholder='Task name'
          />
          <View style={{ flexDirection: 'row', marginLeft: 10, gap: 10 }}>
            <Button title='Add' onPress={handleAddTask} style={{ width: 80 }} />
            <Button title='Cancel' onPress={() => setIsAdding(false)} style={{ width: 80 }} />
          </View>
        </View>
      )}
      {!isAdding && (
        <View>
          <Button title='Add Task' onPress={() => setIsAdding(true)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: '50%',
    borderRadius: 20,
    marginRight: 10,
    paddingLeft: 20,
  },
});

export default TodoList;
