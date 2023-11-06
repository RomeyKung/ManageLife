package com.example.noteservice.core.events;

import lombok.Data;

@Data
public class DeleteNoteEvent {
    private String _id;
    private String noteId;
    private String userId;
    private String title;
    private String detail;
    private String date;
}
