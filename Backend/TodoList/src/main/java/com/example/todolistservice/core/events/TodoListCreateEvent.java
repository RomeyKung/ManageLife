package com.example.todolistservice.core.events;

import lombok.Data;

@Data
public class TodoListCreateEvent {
    private String _id;
    private String TodoListId;
    private String userId;
    private String TodoListDetail;



}
