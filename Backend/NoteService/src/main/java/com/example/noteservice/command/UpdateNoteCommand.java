package com.example.noteservice.command;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data
public class UpdateNoteCommand {
    @TargetAggregateIdentifier
    private String noteId;
    private String _id;
    private String userId;
    private String title;
    private String detail;
    private String date;
}
