package com.example.noteservice.query;

import com.example.noteservice.core.data.NoteEntity;
import com.example.noteservice.core.data.NoteRepository;
import com.example.noteservice.core.events.CreateNoteEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class NoteEventHandler {
    private final NoteRepository noteRepository;

    public NoteEventHandler(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @EventHandler
    public void on(CreateNoteEvent event){
        NoteEntity noteEntity = new NoteEntity();
        BeanUtils.copyProperties(event, noteEntity);
        noteRepository.save(noteEntity);
    }
}
