import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NoteMain = ({ navigation, route }) => {
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNotes, setFilteredNotes] = useState("");
    const savedNote = route.params ? route.params.savedNote : null;

    useEffect(() => {
        const filtered = notes.filter(
            (note) =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNotes(filtered);
    }, [notes, searchTerm]);
    useEffect(() => {
        if (savedNote) {
            console.log(savedNote)
            setNotes([...notes, savedNote]);
        }
    }, [savedNote]);
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search notes..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />

            <FlatList
                data={filteredNotes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.note}
                        onPress={() => navigation.navigate('NoteDetail', { note: item })}
                    >
                        <Text style={styles.noteTitle}>{item.date} </Text>
                            <Text style={styles.noteTitle}>{item.title}</Text>
                            <Text>{item.text}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.add} onPress={() => { navigation.navigate('NoteDetail') }}>
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
        padding: 10,
        marginBottom: 10,
        width:"100%"
    },
    searchBar: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        
    },

});

export default NoteMain;
