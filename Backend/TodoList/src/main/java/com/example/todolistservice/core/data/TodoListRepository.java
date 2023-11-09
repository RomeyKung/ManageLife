package com.example.todolistservice.core.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TodoListRepository extends MongoRepository<TodoListEntity, String> {
    List<TodoListEntity> findByUserId(String userId);

    TodoListEntity findByUserIdAndTodoListDetail(String userId, String todoListDetail);
}
