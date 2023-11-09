package com.example.todolistservice.query;

import lombok.Data;

@Data
public class FindTodoListQuery {
    private String userId;

    public FindTodoListQuery(String userId) {
        this.userId = userId;
    }
}
