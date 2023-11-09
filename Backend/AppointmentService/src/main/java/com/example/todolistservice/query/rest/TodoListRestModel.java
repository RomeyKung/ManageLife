package com.example.todolistservice.query.rest;

import lombok.Data;

@Data
public class TodoListRestModel {
    private String _id;
    private String TodoListId;
    private String userId;
    private String TodoListDetail;
}
