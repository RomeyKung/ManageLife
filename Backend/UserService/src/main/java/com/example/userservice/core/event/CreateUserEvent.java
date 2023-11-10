package com.example.userservice.core.event;

import lombok.Data;

@Data
public class CreateUserEvent {
    private String userId;
    private String username;
}
