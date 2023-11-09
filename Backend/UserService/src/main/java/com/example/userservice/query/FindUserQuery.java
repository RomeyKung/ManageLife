package com.example.userservice.query;

import lombok.Data;

@Data
public class FindUserQuery {
    private String userId;

    public FindUserQuery(String userId) {
        this.userId = userId;
    }
}
