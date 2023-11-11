// UserSettings.js

import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import LocalIP from '../../LocalIP';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserData } from '../../../redux/userSlice';
function UserSettings() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const [username, setUsername] = useState(user?.username || "");
    const [userFirstName, setFirstName] = useState(user?.firstName || "");
    const [userLastName, setLastName] = useState(user?.lastName || "");
    const [image, setImage] = useState(user?.imagePath || null);

    const handleSaveSettings = async () => {
        let data = { _id: user?._id, userId: user?.userId, username: username, firstName: userFirstName, lastName: userLastName, imagePath: image }
        if (image != user.imagePath) {
            data.imagePath = await sendImageToServer(image)
            setImage(data.imagePath)
            if (image != null) {
                delImageFromServer(user.imagePath)
            }
        }
        axios.post(`http://${LocalIP}:8082/user-service/user/update`, data)
            .then(res => {
                dispatch(saveUserData(data))
                Alert.alert("Update success");
            })
            .catch(err => console.log(err.message))

    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {
            const source = result.assets[0].uri
            console.log(result.assets[0].uri)
            setImage(result.assets[0].uri)
        }
    };
    const sendImageToServer = async (imageUri) => {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'image.jpg',
            });

            const response = await axios.post(`http://${LocalIP}:8082/user-service/user/uploadImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };
    const delImageFromServer = async (url) => {
        const parts = url.split('/');
        const lastPart = parts[parts.length - 1];
        const fileName = lastPart.split('?')[0];
        axios.post(`http://${LocalIP}:8082/user-service/user/deleteImage/${fileName}`).then(res => { console.log(res) })
            .catch(err => console.log(err))

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                pickImage()
            }} style={{ alignItems: "center" }}>
                <Image style={styles.image} source={image ? { uri: image } : require("../../../assets/icon.png")} />

            </TouchableOpacity>
            <View style={{ flex: 7 }}>
                <Text style={{ fontWeight: 'bold' }}>Username:</Text>
                <TextInput
                    style={styles.textInput}
                    value={username}
                    placeholder='Username'
                    onChangeText={(text) => setUsername(text)}
                />
                <Text style={{ fontWeight: 'bold' }}>First Name:</Text>
                <TextInput
                    style={styles.textInput}
                    value={userFirstName}
                    placeholder='First Name'
                    onChangeText={(text) => setFirstName(text)}
                />
                <Text style={{ fontWeight: 'bold' }}>Last Name:</Text>
                <TextInput
                    style={styles.textInput}
                    value={userLastName}
                    placeholder='Last Name'
                    onChangeText={(text) => setLastName(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleSaveSettings}>
                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    textInput: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    titleTextInput: {
        padding: 15,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15
    },
    contentTextInput: {
        padding: 15,

        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        position: "absolute",
        bottom: 15,
        right: 15,
        backgroundColor: "#4CA771",
        padding: 15,
        paddingHorizontal: 30,
        borderRadius: 50
    },
    image: {
        height: 160,
        width: 160,
        borderRadius: 180,
        marginBottom: 20
    }
});
export default UserSettings;
