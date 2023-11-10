package com.example.userservice.query.rest;

import lombok.Data;

@Data
public class UserRestModel {
    private String _id;
    private String userId;
    private String username;
    private String firstName;
    private String lastName;
    private String imagePath;
}
