package com.example.todolistservice.command.rest;

import com.example.todolistservice.command.CreateInventoryCommand;

import com.example.todolistservice.command.DeleteInventoryCommand;
import com.example.todolistservice.command.UpdateInventoryCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/inventory")
public class InventoryCommandController {
    private final Environment env;
    private final CommandGateway commandGateway;

    @Autowired
    public InventoryCommandController(Environment env, CommandGateway commandGateway){
        this.env = env;
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createTodoList(@RequestBody CreateInventoryRestModel model){
        CreateInventoryCommand command = CreateInventoryCommand.builder()
                .itemId(UUID.randomUUID().toString())
                .userId(model.getUserId())
                .amount(model.getAmount())
                .itemName(model.getItemName())
                .expired(model.getExpired())
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
    public String updateTodoList(@RequestBody UpdateInventoryRestModel model){
        System.out.println("id: "+model.getUserId());
        UpdateInventoryCommand command = UpdateInventoryCommand.builder()
                ._id(model.get_id())
                .itemId(model.getItemId())
                .userId(model.getUserId())
                .amount(model.getAmount())
                .itemName(model.getItemName())
                .expired(model.getExpired())
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
    public String deleteTodoList(@RequestBody DeleteInventoryRestModel model){
        DeleteInventoryCommand command = DeleteInventoryCommand.builder()
                ._id(model.get_id())
                .itemId(model.getItemId())
                .userId(model.getUserId())
                .amount(model.getAmount())
                .itemName(model.getItemName())
                .expired(model.getExpired())
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
