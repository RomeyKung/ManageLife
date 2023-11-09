package com.example.todolistservice.query;

import com.example.todolistservice.core.data.TodoListEntity;
import com.example.todolistservice.core.data.TodoListRepository;
import com.example.todolistservice.query.rest.TodoListRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TodoListQueryHandler {
    private final TodoListRepository todoListRepository;
    public TodoListQueryHandler(TodoListRepository todoListRepository){
        this.todoListRepository = todoListRepository;
    }
    @QueryHandler
    public List<TodoListRestModel> findTodoLists(FindTodoListQuery query){
        List<TodoListRestModel> todoListRest = new ArrayList<>();
        List<TodoListEntity> storedTodoList = todoListRepository.findByUserId(query.getUserId());
        for (TodoListEntity todoListEntity : storedTodoList){
            TodoListRestModel todoListRestModel = new TodoListRestModel();
            BeanUtils.copyProperties(todoListEntity, todoListRestModel);
            todoListRest.add(todoListRestModel);
        }
        return todoListRest;
    }

}
