import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import { getAuth } from "firebase/auth";
import LocalIp from '../../LocalIP';
const NoteMain = ({ navigation, route }) => {
    const auth = getAuth()
    const [trigger, setTrigger] = useState(true); // Set trigger to true initially
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    // const savedNote = route.params ? route.params.savedNote : null;
    useEffect(() => {
        if (route.params) {
            setTrigger(true);
        }
    }, [route.params]);

    useEffect(() => {
        console.log("trigger ", trigger)
        if (trigger) {
            const res = axios.get(`http://${LocalIp}:8082/note-service/note/${auth.currentUser.uid}`)
                .then(res => {
                    console.log(res.data)
                    setNotes(res.data)
                    setTrigger(false);
                })
                .catch(err => console.log(err))
        }
    }, [trigger])
    useEffect(() => {
        const filtered = notes.filter(
            (note) =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.detail.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNotes(filtered);
    }, [notes, searchTerm]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search notes..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <ScrollView contentContainerStyle={styles.notesContainer}>
                {filteredNotes.map((item, index) => (
                    <TouchableOpacity
                        key={index.toString()}
                        style={styles.noteContainer}
                        onPress={() => navigation.navigate('NoteDetail', { note: item, userId: auth.currentUser.uid })}
                    >
                        <View style={styles.note}>
                            <Text style={styles.noteTitle}>{item.title}</Text>
                            <Text style={styles.noteDetail} numberOfLines={3}>{item.detail}</Text>
                            <View style={styles.dateContainer}>
                                <Text style={styles.noteDate}>{item.date}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.add}
                onPress={() => {
                    navigation.navigate('NoteDetail', { userId: auth.currentUser.uid });
                }}
            >
                <MaterialIcons name="add-circle" size={60} color="#4CA771" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    add: {
        zIndex: 50,
        position: 'absolute',
        
        bottom: 30,
        right: 30,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    notesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    noteContainer: {
        width: '50%', // Set width to 50% for two columns
        padding: 8,

    },
    note: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        height: 160, // Set a fixed height

    },
    noteTitle: {
        fontWeight: "bold",
        fontSize: 16,
    },
    noteDetail: {
        marginTop: 8,
    },
    searchBar: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dateContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },
});


export default NoteMain;
