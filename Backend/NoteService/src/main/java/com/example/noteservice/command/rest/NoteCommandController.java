package com.example.noteservice.command.rest;

import com.example.noteservice.command.CreateNoteCommand;
import com.example.noteservice.command.DeleteNoteCommand;
import com.example.noteservice.command.UpdateNoteCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/note")
public class NoteCommandController {
    private final Environment env;
    private final CommandGateway commandGateway;

    @Autowired
    public NoteCommandController(Environment env, CommandGateway commandGateway) {
        this.env = env;
        this.commandGateway = commandGateway;
    }

    @PostMapping("/create")
    public String createNote(@RequestBody CreateNoteRestModel model) {
        CreateNoteCommand command = CreateNoteCommand.builder()
                .noteId(UUID.randomUUID().toString())
                .userId(model.getUserId())
                .title(model.getTitle())
                .detail(model.getDetail())
                .date(model.getDate())
                .build();
        String result;
        try {
            result = commandGateway.sendAndWait(command);
        } catch (Exception e) {
            result = e.getLocalizedMessage();
        }
        return result;
    }
    @PostMapping("/update")
    public String updateNote(@RequestBody UpdateNoteRestModel model) {
        UpdateNoteCommand command = UpdateNoteCommand.builder()
                ._id(model.get_id())
                .noteId(model.getNoteId())
                .userId(model.getUserId())
                .title(model.getTitle())
                .detail(model.getDetail())
                .date(model.getDate())
                .build();
        String result;
        try {
            result = commandGateway.sendAndWait(command);
        } catch (Exception e) {
            result = e.getLocalizedMessage();
        }
        return result;
    }
    @PostMapping("/delete")
    public String updateNote(@RequestBody DeleteNoteRestModel model) {
        DeleteNoteCommand command = DeleteNoteCommand.builder()
                ._id(model.get_id())
                .noteId(model.getNoteId())
                .userId(model.getUserId())
                .title(model.getTitle())
                .detail(model.getDetail())
                .date(model.getDate())
                .build();
        String result;
        try {
            result = commandGateway.sendAndWait(command);
        } catch (Exception e) {
            result = e.getLocalizedMessage();
        }
        return result;
    }
}
