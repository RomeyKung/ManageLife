package com.example.noteservice.query.rest;

import lombok.Data;

@Data
public class NoteRestModel {
    private String _id;
    private String noteId;
    private String userId;
    private String title;
    private String detail;
    private String date;
}
