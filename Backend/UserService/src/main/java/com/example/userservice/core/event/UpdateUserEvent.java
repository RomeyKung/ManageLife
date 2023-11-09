package com.example.userservice.core.event;

import lombok.Data;

@Data
public class UpdateUserEvent {
    private String _id;
    private String userId;
    private String username;
    private String firstName;
    private String lastName;
    private String imagePath;
}
