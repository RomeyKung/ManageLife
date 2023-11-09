package com.example.todolistservice.command.rest;

import lombok.Data;

@Data
public class CreateInventoryRestModel {
    private String userId;
    private String itemName;
    private String amount;
    private String expired;
}
