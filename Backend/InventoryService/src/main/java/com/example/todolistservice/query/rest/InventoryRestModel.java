package com.example.todolistservice.query.rest;

import lombok.Data;

@Data
public class InventoryRestModel {
    private String _id;
    private String userId;
    private String itemId;
    private String itemName;
    private String amount;
    private String expired;
}
