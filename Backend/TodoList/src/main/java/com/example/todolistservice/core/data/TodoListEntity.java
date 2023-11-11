package com.example.todolistservice.core.data;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document(collection = "Todolist")
public class TodoListEntity implements Serializable {
    @Id
    private String _id;
    private String todoListId;
    private String userId;
    private String todoListDetail;
    private String check;

    public TodoListEntity(){}

    public TodoListEntity(String _id, String todoListId, String userId, String todoListDetail,String check) {
        this._id = _id;
        this.todoListId = todoListId;
        this.userId = userId;
        this.todoListDetail = todoListDetail;
        this.check = check;
    }
}
