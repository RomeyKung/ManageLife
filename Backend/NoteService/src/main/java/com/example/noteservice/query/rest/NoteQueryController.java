package com.example.noteservice.query.rest;

import com.example.noteservice.query.FindNoteQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/note")
public class NoteQueryController {
    private final QueryGateway queryGateway;
    public NoteQueryController(QueryGateway queryGateway){
        this.queryGateway = queryGateway;
    }
    @GetMapping(value = "/{userId}")
    public List<NoteRestModel> findOwnNoteById(@PathVariable String userId){
        FindNoteQuery findNoteQuery = new FindNoteQuery(userId);
        return queryGateway.query(findNoteQuery, ResponseTypes.multipleInstancesOf(NoteRestModel.class)
        ).join();
    }
}
