package com.example.todolistservice.command.rest;

import lombok.Data;

@Data
public class UpdateTodoListRestModel {
    private String _id;
    private String todoListId;
    private String userId;
    private String todoListDetail;
    private String check;
}
