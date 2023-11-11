package com.example.noteservice.core.data;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NoteRepository extends MongoRepository<NoteEntity, String> {

    List<NoteEntity> findOwnNoteByUserId(String userId);
    NoteEntity findNoteByNoteId(String noteId);
}
