package com.example.todolistservice.query;

import com.example.todolistservice.core.data.TodoListEntity;
import com.example.todolistservice.core.data.TodoListRepository;
import com.example.todolistservice.core.events.TodoListCreateEvent;
import com.example.todolistservice.core.events.TodoListDeleteEvent;
import com.example.todolistservice.core.events.TodoListUpdateEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class TodoListEventHandler {
    private final TodoListRepository todoListRepository;
    public TodoListEventHandler(TodoListRepository todoListRepository){
        this.todoListRepository = todoListRepository;

    }
    @EventHandler
    public void on(TodoListCreateEvent event) {
        TodoListEntity existingAppointment = todoListRepository.findByUserIdAndTodoListDetail(event.getUserId(), event.getTodoListDetail());

        if (existingAppointment != null) {
            System.out.println("FROMCreateRepo: in db already");
        } else {
            TodoListEntity todoListEntity = new TodoListEntity();
            BeanUtils.copyProperties(event, todoListEntity);
            todoListRepository.save(todoListEntity);
        }
    }

    @EventHandler
    public void on(TodoListUpdateEvent event){
        TodoListEntity todoListEntity = new TodoListEntity();
        BeanUtils.copyProperties(event, todoListEntity);
        todoListRepository.save(todoListEntity);
    }
    @EventHandler
    public void on(TodoListDeleteEvent event){
        TodoListEntity todoListEntity = new TodoListEntity();
        BeanUtils.copyProperties(event, todoListEntity);
        todoListRepository.delete(todoListEntity);
    }

}
