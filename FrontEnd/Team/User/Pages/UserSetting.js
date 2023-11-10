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
    const [username, setUsername] = useState(user?.username || "");
    const [userFirstName, setFirstName] = useState(user?.firstName || "");
    const [userLastName, setLastName] = useState(user?.lastName || "");
    const [image, setImage] = useState(user?.imagePath || null);
      
    const handleSaveSettings = () => {
        // Implement logic to save user settings
        // sendImageToServer(image.uri)
        // console.log({ _id: user?._id, userId:user?.userId, username: username, firstName: userFirstName, lastName: userLastName, imagePath: null })
        axios.post(`http://${LocalIP}:8082/user-service/user/update`, { _id: user?._id, userId: user?.userId, username: username, firstName: userFirstName, lastName: userLastName, imagePath: null })
            .then(res => {
                Alert.alert(res.data);
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
            const source = { uri: result.assets[0].uri }
            console.log(result.assets[0].uri)
            // sendImageToServer(result.assets[0].uri)
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
            <TouchableOpacity onPress={() => {
                pickImage()
            }}>
                <Image style={styles.image} source={image ? image : require("../../../assets/icon.png")} />

            </TouchableOpacity>
            <Text style={{fontWeight:'bold'}}>Username :</Text>
            <TextInput
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <Text style={{fontWeight:'bold'}}>First Name</Text>
            <TextInput
                value={userFirstName}
                onChangeText={(text) => setFirstName(text)}
            />
            <Text style={{fontWeight:'bold'}}>Last Name</Text>
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
    image: {
        height: 70,
        width: 70,
        borderRadius: 180
    }
});
export default UserSettings;
