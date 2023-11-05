package com.example.noteservice.core.events;

import lombok.Data;

@Data
public class CreateNoteEvent {
    private String noteId;
    private String userId;
    private String title;
    private String detail;
    private String date;
}
