package com.example.todolistservice.command.rest;

import com.example.todolistservice.command.CreateTodoListCommand;

import com.example.todolistservice.command.DeleteTodoListCommand;
import com.example.todolistservice.command.UpdateTodoListCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/todolist")
public class TodoListCommandController {
    private final Environment env;
    private final CommandGateway commandGateway;

    @Autowired
    public TodoListCommandController(Environment env, CommandGateway commandGateway){
        this.env = env;
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createTodoList(@RequestBody CreateTodoListRestModel model){


        CreateTodoListCommand command = CreateTodoListCommand.builder()
                .todoListId(UUID.randomUUID().toString())
                .userId(model.getUserId())
                .todoListDetail(model.getTodoListDetail())
                .check(model.getCheck())
                .build();
        String result;
        try{
            result = commandGateway.sendAndWait(command);
        }
        catch (Exception e){
            result = e.getLocalizedMessage();
        }
        return  result;

    }

    @PutMapping
    public String updateTodoList(@RequestBody UpdateTodoListRestModel model){
        System.out.println("id: "+model.getUserId());
        UpdateTodoListCommand command = UpdateTodoListCommand.builder()
                ._id(model.get_id())
                .todoListId(model.getTodoListId())
                .userId(model.getUserId())
                .todoListDetail(model.getTodoListDetail())
                .check(model.getCheck())
                .build();

        String result;
        try{
            result = commandGateway.sendAndWait(command);
        }
        catch (Exception e){
            result = e.getLocalizedMessage();
        }
        return  result;
    }

    @DeleteMapping
    public String deleteTodoList(@RequestBody DeleteTodoListRestModel model){
        DeleteTodoListCommand command = DeleteTodoListCommand.builder()
                ._id(model.get_id())
                .todoListId(model.getTodoListId())
                .userId(model.getUserId())
                .todoListDetail(model.getTodoListDetail())
                .check(model.getCheck())
                .build();

        String result;
        try{
            result = commandGateway.sendAndWait(command);
        }
        catch (Exception e){
            result = e.getLocalizedMessage();
        }
        return  result;

    }

}
