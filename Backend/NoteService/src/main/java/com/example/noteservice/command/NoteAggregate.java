package com.example.noteservice.command;

import com.example.noteservice.core.events.CreateNoteEvent;
import com.example.noteservice.core.events.DeleteNoteEvent;
import com.example.noteservice.core.events.UpdateNoteEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class NoteAggregate {
    @AggregateIdentifier
    private String noteId;
    private String userId;
    private String title;
    private String detail;
    private String date;

    public NoteAggregate() {
    }

    @CommandHandler
    public NoteAggregate (CreateNoteCommand command) {
        if (command.getTitle() == null || command.getTitle().isBlank() || command.getDetail() == null || command.getDetail().isBlank() || command.getDate() == null || command.getDate().isBlank()) {
            throw new IllegalArgumentException("Everything cannot be null");
        }
        CreateNoteEvent event = new CreateNoteEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }
    @CommandHandler
    public void handle(UpdateNoteCommand command) {
        if (command.getTitle() == null || command.getTitle().isBlank() || command.getDetail() == null || command.getDetail().isBlank() || command.getDate() == null || command.getDate().isBlank()) {
            throw new IllegalArgumentException("Everything cannot be null");
        }
        UpdateNoteEvent event = new UpdateNoteEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }
    @CommandHandler
    public void handle(DeleteNoteCommand command) {
        if (command.getTitle() == null || command.getTitle().isBlank() || command.getDetail() == null || command.getDetail().isBlank() || command.getDate() == null || command.getDate().isBlank()) {
            throw new IllegalArgumentException("Everything cannot be null");
        }
        DeleteNoteEvent event = new DeleteNoteEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }
    @EventSourcingHandler
    public void on(CreateNoteEvent event) {
        this.noteId = event.getNoteId();
        this.userId = event.getUserId();
        this.title = event.getTitle();
        this.detail = event.getDetail();
        this.date = event.getDate();
    }
    @EventSourcingHandler
    public void on(UpdateNoteEvent event) {
        this.noteId = event.getNoteId();
        this.userId = event.getUserId();
        this.title = event.getTitle();
        this.detail = event.getDetail();
        this.date = event.getDate();
    }
    @EventSourcingHandler
    public void on(DeleteNoteEvent event) {
        this.noteId = event.getNoteId();
        this.userId = event.getUserId();
        this.title = event.getTitle();
        this.detail = event.getDetail();
        this.date = event.getDate();
    }
}
