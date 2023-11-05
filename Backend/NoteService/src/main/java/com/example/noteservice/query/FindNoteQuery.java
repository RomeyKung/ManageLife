package com.example.noteservice.query;

import lombok.Data;

@Data
public class FindNoteQuery {
    private String userId;
    public FindNoteQuery(String userId){
        this.userId = userId;
    }
}
