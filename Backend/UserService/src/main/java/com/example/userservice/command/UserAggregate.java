package com.example.userservice.command;

import com.example.userservice.core.event.CreateUserEvent;
import com.example.userservice.core.event.UpdateUserEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class UserAggregate {
    @AggregateIdentifier
    private String userId;
    private String username;
    private String firstName;
    private String lastName;
    private String imagePath;
    public UserAggregate(){}
    @CommandHandler
    public UserAggregate(CreateUserCommand command){
        if(command.getUserId().isBlank() || command.getUserId() == null){
            throw new IllegalArgumentException("UserId cannot be null");
        }
        CreateUserEvent event = new CreateUserEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }
    @CommandHandler
    public void handle(UpdateUserCommand command){
        if(command.getUserId().isBlank() || command.getUserId() == null){
            throw new IllegalArgumentException("UserId cannot be null");
        }
        UpdateUserEvent event = new UpdateUserEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }
    @EventSourcingHandler
    public void on(CreateUserEvent event){
        this.userId = event.getUserId();
        this.username = event.getUsername();
    }
    @EventSourcingHandler
    public void on(UpdateUserEvent event){
        this.userId = event.getUserId();
        this.username = event.getUsername();
        this.firstName = event.getFirstName();
        this.lastName = event.getLastName();
        this.imagePath = event.getImagePath();
    }
}
