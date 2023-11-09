package com.example.healthservice.query;

import lombok.Data;

@Data
public class FindHealthQuery {
    private String userId;

    public FindHealthQuery(String userId){
        this.userId = userId;
    }
}
