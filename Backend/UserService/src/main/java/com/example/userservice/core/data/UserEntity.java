package com.example.userservice.core.data;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "User")
public class UserEntity {
    @Id
    private String _id;
    private String userId;
    private String username;
    private String firstName;
    private String lastName;
    private String imagePath;
    public UserEntity(){}

    public UserEntity(String _id, String userId, String username, String firstName, String lastName, String imagePath) {
        this._id = _id;
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imagePath = imagePath;
    }
}
