package com.example.todolistservice.command.rest;

import lombok.Data;

@Data
public class CreateTodoListRestModel {
    private String userId;
    private String todoListDetail;
    private String check;
}
