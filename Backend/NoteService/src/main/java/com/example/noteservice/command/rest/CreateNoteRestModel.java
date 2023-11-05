package com.example.noteservice.command.rest;

import lombok.Data;

@Data
public class CreateNoteRestModel {
    private String userId;
    private String title;
    private String detail;
    private String date;
}
