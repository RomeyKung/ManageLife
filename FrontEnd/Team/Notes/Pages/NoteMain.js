import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import { getAuth } from "firebase/auth";
import LocalIp from '../../LocalIP';
const NoteMain = ({ navigation, route }) => {
    const auth = getAuth()
    const [trigger, setTrigger] = useState(true); // Set trigger to true initially
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNotes, setFilteredNotes] = useState("");
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


            <FlatList
                numColumns={2}
                data={filteredNotes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.note}
                        onPress={() => navigation.navigate('NoteDetail', { note: item, userId: auth.currentUser.uid })}
                    >
                        <Text style={styles.noteTitle}>{item.title}</Text>
                        <Text style={styles.noteDetail}>{item.detail.substring(0, 50)}</Text>
                        <Text style={styles.noteTitle}>{item.date} </Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.add} onPress={() => { navigation.navigate('NoteDetail', { userId: auth.currentUser.uid }) }}>
                <MaterialIcons name="add-circle" size={60} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    add: {
        zIndex: 50,
        position: 'absolute',
        bottom: 16,
        right: 16,

    },
    container: {
        flex: 1,
        padding: 20,
    },
    note: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        marginBottom: 10,
        width:"48%",
        marginRight:"4%",
    },

    searchBar: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    noteTitle: {
        fontWeight: "bold",
        fontSize: 16
    }

});

export default NoteMain;
