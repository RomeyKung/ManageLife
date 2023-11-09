package com.example.todolistservice.command;

import com.example.todolistservice.core.events.InventoryCreateEvent;
import com.example.todolistservice.core.events.InventoryDeleteEvent;
import com.example.todolistservice.core.events.InventoryUpdateEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class InventoryAggregate {
    @AggregateIdentifier
    private String itemId;
    private String itemName;
    private String userId;
    private String amount;
    private String expired;
    public InventoryAggregate(){}

    @CommandHandler
    public InventoryAggregate(CreateInventoryCommand command) {
        // Validation code...

        InventoryCreateEvent inventoryCreateEvent = new InventoryCreateEvent();
        BeanUtils.copyProperties(command, inventoryCreateEvent);
        AggregateLifecycle.apply(inventoryCreateEvent);
    }

    @CommandHandler
    public void handle(UpdateInventoryCommand command) {
        if (command == null) {
            throw new IllegalArgumentException("Command must not be null");
        }

        if (command.getUserId() == null || command.getUserId().isBlank()) {
            throw new IllegalArgumentException("User ID cannot be null or blank");
        }

        if (command.getItemId() == null || command.getItemId().isBlank()) {
            throw new IllegalArgumentException("Item ID cannot be null or blank");
        }


        InventoryUpdateEvent inventoryUpdateEvent = new InventoryUpdateEvent();
        BeanUtils.copyProperties(command, inventoryUpdateEvent);
        AggregateLifecycle.apply(inventoryUpdateEvent);
    }

    @CommandHandler
    public void handle(DeleteInventoryCommand command) {
        if (command == null) {
            throw new IllegalArgumentException("Command must not be null");
        }

        if (command.getUserId() == null || command.getUserId().isBlank()) {
            throw new IllegalArgumentException("User ID cannot be null or blank");
        }

        if (command.getItemId() == null || command.getItemId().isBlank()) {
            throw new IllegalArgumentException("Item ID cannot be null or blank");
        }

        // Add similar checks for other attributes...

        InventoryDeleteEvent inventoryDeleteEvent = new InventoryDeleteEvent();
        BeanUtils.copyProperties(command, inventoryDeleteEvent);
        AggregateLifecycle.apply(inventoryDeleteEvent);
    }



    @EventSourcingHandler
    public void on(InventoryCreateEvent inventoryCreateEvent){
        System.out.println("created event");
        this.itemId = inventoryCreateEvent.getItemId();
        this.itemName = inventoryCreateEvent.getItemName();
        this.userId = inventoryCreateEvent.getUserId();
        this.amount = inventoryCreateEvent.getAmount();
        this.expired = inventoryCreateEvent.getExpired();
    }

    @EventSourcingHandler
    public void on(InventoryUpdateEvent inventoryUpdateEvent){
        System.out.println("updated event ");
        this.itemId = inventoryUpdateEvent.getItemId();
        this.itemName = inventoryUpdateEvent.getItemName();
        this.userId = inventoryUpdateEvent.getUserId();
        this.amount = inventoryUpdateEvent.getAmount();
        this.expired = inventoryUpdateEvent.getExpired();
    }

    @EventSourcingHandler
    public void on(InventoryDeleteEvent inventoryDeleteEvent){
        System.out.println("delete event");
        this.itemId = inventoryDeleteEvent.getItemId();
        this.itemName = inventoryDeleteEvent.getItemName();
        this.userId = inventoryDeleteEvent.getUserId();
        this.amount = inventoryDeleteEvent.getAmount();
        this.expired = inventoryDeleteEvent.getExpired();
    }

}
