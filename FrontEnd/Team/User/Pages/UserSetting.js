// UserSettings.js

import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { View, Text, Button, StyleSheet, TextInput, Image } from 'react-native';
import axios from 'axios';
import LocalIP from '../../LocalIP';
function UserSettings() {
    const [userName, setUserName] = useState('');
    const [userFirstName, setFirstName] = useState('');
    const [userLastName, setLastName] = useState('');
    const [image, setImage] = useState({})
    const handleSaveSettings = () => {
        // Implement logic to save user settings
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {
            const source = { uri: result.assets[0].uri }
            console.log(result.assets[0].uri)
            sendImageToServer(result.assets[0].uri)
            setImage(source)
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

            const response = await axios.post(`http://${LocalIP}/user/uploadImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Image uploaded successfully', response.data);
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };
    return (
        <View>
            <Image style={styles.image} source={image ? image : require("../../../assets/icon.png")} />
            <Text>Username</Text>
            <TextInput
                value={userName}
                onChangeText={(text) => setUserName(text)}
            />
            <Text>First Name</Text>
            <TextInput
                value={userFirstName}
                onChangeText={(text) => setFirstName(text)}
            />
            <Text>Last Name</Text>
            <TextInput
                value={userLastName}
                onChangeText={(text) => setLastName(text)}
            />
            <Button title="Save Settings" onPress={handleSaveSettings} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
        marginVertical: 10, // Add vertical margin for gap
    },
    image:{
        height:70,
        width:70
    }
});
export default UserSettings;
