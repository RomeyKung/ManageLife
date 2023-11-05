package com.example.noteservice.query;

import com.example.noteservice.core.data.NoteEntity;
import com.example.noteservice.core.data.NoteRepository;
import com.example.noteservice.query.rest.NoteRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class NoteQueryHandler {

    private NoteRepository noteRepository;

    public NoteQueryHandler(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @QueryHandler
    public List<NoteRestModel> findOwnNote(FindNoteQuery query){
        List<NoteEntity> noteEntities = noteRepository.findOwnNoteByUserId(query.getUserId());
        List<NoteRestModel> noteRestModels = new ArrayList<>();
        for (NoteEntity productEntity : noteEntities){
            NoteRestModel productRestModel = new NoteRestModel();
            BeanUtils.copyProperties(productEntity, productRestModel);
            noteRestModels.add(productRestModel);
        }
        return noteRestModels;
    }
}
