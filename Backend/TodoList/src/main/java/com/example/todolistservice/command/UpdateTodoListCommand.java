package com.example.todolistservice.command;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@Builder
public class UpdateTodoListCommand {
    @TargetAggregateIdentifier
    private String todoListId;
    private String _id;
    private String userId;
    private String todoListDetail;
    private String check;
}
