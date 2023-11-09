package com.example.todolistservice.command.rest;

import lombok.Data;

@Data
public class UpdateInventoryRestModel {
    private String _id;
    private String itemId;
    private String itemName;
    private String userId;
    private String amount;
    private String expired;
}
