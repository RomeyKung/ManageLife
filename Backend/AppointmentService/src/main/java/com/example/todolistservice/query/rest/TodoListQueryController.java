package com.example.todolistservice.query.rest;

import com.example.todolistservice.query.FindTodoListQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todolist")
public class TodoListQueryController {
    private final QueryGateway queryGateway;
    public TodoListQueryController(QueryGateway queryGateway){
        this.queryGateway = queryGateway;
    }

    @GetMapping(value = "/{userId}")
    public List<TodoListRestModel> getAppointments(@PathVariable String userId){
        System.out.println("userKub: "+userId);
        FindTodoListQuery findTodoListQuery = new FindTodoListQuery(userId);
        return queryGateway.query(
                findTodoListQuery,
                ResponseTypes.multipleInstancesOf(TodoListRestModel.class)
        ).join();
    }
}
