package com.example.noteservice.command.rest;

import lombok.Data;

@Data
public class UpdateNoteRestModel {
    private String _id;
    private String noteId;
    private String userId;
    private String title;
    private String detail;
    private String date;
}
