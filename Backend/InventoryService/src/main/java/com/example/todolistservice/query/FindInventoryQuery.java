package com.example.todolistservice.query;

import lombok.Data;

@Data
public class FindInventoryQuery {
    private String userId;

    public FindInventoryQuery(String userId) {
        this.userId = userId;
    }
}
