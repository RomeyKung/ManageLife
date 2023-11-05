package com.example.noteservice.core.data;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document(collection = "Note")
public class NoteEntity implements Serializable {
    @Id
    private String _id;
    private String noteId;
    private String userId;
    private String title;
    private String detail;
    private String date;

    public NoteEntity(){}
    public NoteEntity(String _id, String noteId, String userId, String title, String detail, String date) {
        this._id = _id;
        this.noteId = noteId;
        this.userId = userId;
        this.title = title;
        this.detail = detail;
        this.date = date;
    }
}
