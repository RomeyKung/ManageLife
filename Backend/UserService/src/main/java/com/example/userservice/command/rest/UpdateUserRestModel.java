package com.example.userservice.command.rest;

import lombok.Data;

@Data
public class UpdateUserRestModel {
    private String _id;
    private String userId;
    private String username;
    private String firstName;
    private String lastName;
    private String imagePath;
}
