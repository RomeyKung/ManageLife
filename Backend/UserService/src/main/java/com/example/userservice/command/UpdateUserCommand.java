package com.example.userservice.command;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@Builder
public class UpdateUserCommand {
    private String _id;
    @TargetAggregateIdentifier
    private String userId;
    private String username;
    private String firstName;
    private String lastName;
    private String imagePath;
}
