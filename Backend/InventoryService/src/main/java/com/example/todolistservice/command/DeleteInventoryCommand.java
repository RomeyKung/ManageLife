package com.example.todolistservice.command;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;
@Data
@Builder
public class DeleteInventoryCommand {
    private String _id;
    @TargetAggregateIdentifier
    private String itemId;
    private String itemName;
    private String userId;
    private String amount;
    private String expired;
}
