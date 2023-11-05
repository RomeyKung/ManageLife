package com.example.noteservice.command;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@Builder
public class CreateNoteCommand {
    @TargetAggregateIdentifier
    private String noteId;
    private String userId;
    private String title;
    private String detail;
    private String date;
}
