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
    private String appointmentId;
    private String userId;
    private String appointmentDetail;
    private String appointmentTime;

    public TodoListAggregate(){}

    @CommandHandler
    public TodoListAggregate(CreateTodoListCommand command){
        if(command.getTodoListDetail().isBlank() || command.getTodoListDetail() == null){
            throw new IllegalArgumentException("must have activity name");
        }

        TodoListCreateEvent todoListCreateEvent = new TodoListCreateEvent();
        BeanUtils.copyProperties(command, todoListCreateEvent);
        AggregateLifecycle.apply(todoListCreateEvent);


    }
    @CommandHandler
    public TodoListAggregate(UpdateTodoListCommand command){
        if(command.getTodoListDetail().isBlank() || command.getTodoListDetail() == null){
            throw new IllegalArgumentException("must have activity name");
        }

        TodoListUpdateEvent todoListUpdateEvent = new TodoListUpdateEvent();
        BeanUtils.copyProperties(command, todoListUpdateEvent);
        AggregateLifecycle.apply(todoListUpdateEvent);
    }


    @CommandHandler
    public TodoListAggregate(DeleteTodoListCommand command){
        if(command.getTodoListDetail().isBlank() || command.getTodoListDetail() == null){
            throw new IllegalArgumentException("must have activity name");
        }


        TodoListDeleteEvent todoListDeleteEvent = new TodoListDeleteEvent();
        BeanUtils.copyProperties(command, todoListDeleteEvent);
        AggregateLifecycle.apply(todoListDeleteEvent);
    }




    @EventSourcingHandler
    public void on(TodoListCreateEvent todoListCreateEvent){
        System.out.println("created event");
        this.appointmentId = todoListCreateEvent.getTodoListId();
        this.appointmentDetail = todoListCreateEvent.getTodoListDetail();
        this.userId = todoListCreateEvent.getUserId();
    }

    @EventSourcingHandler
    public void on(TodoListUpdateEvent todoListUpdateEvent){
        System.out.println("updated event ");
        this.appointmentId = todoListUpdateEvent.getTodoListId();
        this.appointmentDetail = todoListUpdateEvent.getTodoListDetail();
        this.userId = todoListUpdateEvent.getUserId();
    }

    @EventSourcingHandler
    public void on(TodoListDeleteEvent todoListDeleteEvent){
        System.out.println("delete event");
        this.appointmentId = todoListDeleteEvent.getTodoListId();
        this.appointmentDetail = todoListDeleteEvent.getTodoListDetail();
        this.userId = todoListDeleteEvent.getUserId();
    }

}
