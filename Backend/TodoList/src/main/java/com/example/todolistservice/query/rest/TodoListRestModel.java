package com.example.todolistservice.query.rest;

import lombok.Data;

@Data
public class TodoListRestModel {
    private String _id;
    private String todoListId;
    private String userId;
    private String todoListDetail;
    private String check;
}
