package com.example.todolistservice.command;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;
@Data
@Builder
public class DeleteTodoListCommand {
    private String _id;
    @TargetAggregateIdentifier
    private String TodoListId;
    private String userId;
    private String TodoListDetail;
}
