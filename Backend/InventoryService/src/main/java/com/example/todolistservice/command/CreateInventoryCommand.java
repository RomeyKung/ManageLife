package com.example.todolistservice.command;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@Builder
public class CreateInventoryCommand {
    @TargetAggregateIdentifier
    private String itemId;
    private String userId;
    private String itemName;
    private String amount;
    private String expired;
}
