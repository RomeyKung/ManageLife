package com.example.todolistservice.command.rest;

import lombok.Data;

@Data
public class UpdateTodoListRestModel {
    private String _id;
    private String TodoListId;
    private String userId;
    private String TodoListDetail;
}
