import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import LocalIp from '../../LocalIP';
const NoteDetail = ({ navigation, route }) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteText, setNoteText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [noteId, setNoteId] = useState(null);
    const [id, setId] = useState(null);
    const [noteDate, setNoteDate] = useState("")
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);

    useEffect(() => {
        if (route.params && route.params.note) {
            setIsEditing(true);
            setId(route.params.note._id);
            setNoteId(route.params.note.noteId);
            setNoteTitle(route.params.note.title);
            setNoteText(route.params.note.detail);
            setNoteDate(route.params.note.date)
        }
    }, [route.params]);

    const handleSaveNote = () => {
        if (isEditing) {
            console.log({ _id: id, userId: route.params.userId, noteId: noteId, title: noteTitle, detail: noteText, date: formattedDate })
            const res = axios.post(`http://${LocalIp}:8082/note-service/note/update`, { _id: id, userId: route.params.userId, noteId: noteId, title: noteTitle, detail: noteText, date: formattedDate })
                .then(res => console.log("success"))
                .catch(err => console.log(err))
        } else {
            const res = axios.post(`http://${LocalIp}:8082/note-service/note/create`, { userId: route.params.userId, noteId: noteId, title: noteTitle , detail: noteText , date: formattedDate })
                .then(res => console.log("success"))
                .catch(err => console.log(err))
        }

        navigation.navigate("NoteMain", { back: true });
    };

    const handleDeleteNote = () => {
        if (noteId) {
            const res = axios.post(`http://${LocalIp}:8082/note-service/note/delete`, { _id: route.params.note._id, userId: route.params.userId, noteId: route.params.note.noteId , title: route.params.note.title, detail: route.params.note.detail, date: noteDate })
                .then(res => console.log("success"))
                .catch(err => console.log(err))
        }
        navigation.navigate("NoteMain", { back: true });
    };

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.titleTextInput}
                placeholder="Enter your note title"
                value={noteTitle}
                onChangeText={(text) => setNoteTitle(text)}
            />
            <TextInput
            style={styles.contentTextInput}
                multiline={true}
                numberOfLines={10}
                textAlignVertical="top"
                placeholder="Enter your note content"
                value={noteText}
                onChangeText={(text) => setNoteText(text)}
            />
            <View style={styles.button}><Button  color="#000" title="Save Note" onPress={handleSaveNote} /></View>
            {isEditing && (
                <View style={styles.button}><Button  color="#000" title="Delete Note" onPress={handleDeleteNote} /></View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    titleTextInput:{
        padding:15,
        height:50,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom:15
    },
    contentTextInput:{
        padding:15,
        
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        marginVertical: 10, // Add vertical margin for gap
      },
});


export default NoteDetail;
