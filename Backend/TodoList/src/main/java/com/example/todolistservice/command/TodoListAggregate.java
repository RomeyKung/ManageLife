package com.example.todolistservice.command;

import com.example.todolistservice.core.events.TodoListCreateEvent;
import com.example.todolistservice.core.events.TodoListDeleteEvent;
import com.example.todolistservice.core.events.TodoListUpdateEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class TodoListAggregate {
    @AggregateIdentifier
    private String todoListId;
    private String userId;
    private String todoListDetail;

    public TodoListAggregate(){}

    @CommandHandler
    public TodoListAggregate(CreateTodoListCommand command){
        if (command.getUserId() == null || command.getUserId().isBlank() || command.getTodoListDetail() == null || command.getTodoListDetail().isBlank() || command.getTodoListId() == null || command.getTodoListId().isBlank()) {
            throw new IllegalArgumentException("Everything cannot be null");
        }

        TodoListCreateEvent todoListCreateEvent = new TodoListCreateEvent();
        BeanUtils.copyProperties(command, todoListCreateEvent);
        AggregateLifecycle.apply(todoListCreateEvent);


    }
    @CommandHandler
    public  void handle(UpdateTodoListCommand command){
        if (command.getUserId() == null || command.getUserId().isBlank() || command.getTodoListDetail() == null || command.getTodoListDetail().isBlank() || command.getTodoListId() == null || command.getTodoListId().isBlank()||
            command.get_id() == null || command.get_id().isBlank()) {
            throw new IllegalArgumentException("Everything cannot be null");
        }

        TodoListUpdateEvent todoListUpdateEvent = new TodoListUpdateEvent();
        BeanUtils.copyProperties(command, todoListUpdateEvent);
        AggregateLifecycle.apply(todoListUpdateEvent);
    }


    @CommandHandler
    public  void handle(DeleteTodoListCommand command){
        if (command.getUserId() == null || command.getUserId().isBlank() || command.getTodoListDetail() == null || command.getTodoListDetail().isBlank() || command.getTodoListId() == null || command.getTodoListId().isBlank()||
                command.get_id() == null || command.get_id().isBlank() ) {
            throw new IllegalArgumentException("Everything cannot be null");
        }


        TodoListDeleteEvent todoListDeleteEvent = new TodoListDeleteEvent();
        BeanUtils.copyProperties(command, todoListDeleteEvent);
        AggregateLifecycle.apply(todoListDeleteEvent);
    }




    @EventSourcingHandler
    public void on(TodoListCreateEvent todoListCreateEvent){
        System.out.println("created event");
        this.todoListId = todoListCreateEvent.getTodoListId();
        this.todoListDetail = todoListCreateEvent.getTodoListDetail();
        this.userId = todoListCreateEvent.getUserId();
    }

    @EventSourcingHandler
    public void on(TodoListUpdateEvent todoListUpdateEvent){
        System.out.println("updated event ");
        this.todoListId = todoListUpdateEvent.getTodoListId();
        this.todoListDetail = todoListUpdateEvent.getTodoListDetail();
        this.userId = todoListUpdateEvent.getUserId();
    }

    @EventSourcingHandler
    public void on(TodoListDeleteEvent todoListDeleteEvent){
        System.out.println("delete event");
        this.todoListId = todoListDeleteEvent.getTodoListId();
        this.todoListDetail = todoListDeleteEvent.getTodoListDetail();
        this.userId = todoListDeleteEvent.getUserId();
    }

}
