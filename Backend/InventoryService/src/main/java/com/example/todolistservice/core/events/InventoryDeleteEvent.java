package com.example.todolistservice.core.events;

import lombok.Data;

@Data
public class InventoryDeleteEvent {
    private String _id;
    private String itemId;
    private String itemName;
    private String userId;
    private String amount;
    private String expired;

}
