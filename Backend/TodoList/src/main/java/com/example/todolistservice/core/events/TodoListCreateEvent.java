package com.example.todolistservice.core.events;

import lombok.Data;

@Data
public class TodoListCreateEvent {
    private String _id;
    private String todoListId;
    private String userId;
    private String todoListDetail;
    private String check;



}
