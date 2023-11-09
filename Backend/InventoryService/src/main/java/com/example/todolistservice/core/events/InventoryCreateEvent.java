package com.example.todolistservice.core.events;

import lombok.Data;

@Data
public class InventoryCreateEvent {
    private String _id;
    private String itemId;
    private String userId;
    private String itemName;
    private String amount;
    private String expired;



}
