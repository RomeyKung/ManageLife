import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList } from 'react-native';
import CheckBox from 'expo-checkbox';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [todoList, setTodoList] = useState([]);

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

  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={{ fontSize: 30 }}>TodoList</Text>
      <FlatList
        data={todoList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <CheckBox
              value={item.isChecked}
              onValueChange={() => handleCheckBoxChange(index)}
              color={item.isChecked ? '#88CF88' : undefined}
            />
            <Text style={{ marginLeft: 10 }}>{item.task}</Text>
          </View>
        )}
      />

      {isAdding && (
        <View style={{ flexDirection: 'row', marginVertical: 10, marginLeft: 50, width: '100%' }}>
          <CheckBox style={{ marginRight: 10, marginTop: 5 }} />
          <TextInput
            style={styles.input}
            value={task}
            onChangeText={handleTaskChange}
            placeholder='Task name'
          />
          <View style={{ flexDirection: 'row', marginLeft: 10, gap: 10 }}>
            <Button title='Add' onPress={handleAddTask} style={{ width: 80, marginRight: 5 }} />
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
