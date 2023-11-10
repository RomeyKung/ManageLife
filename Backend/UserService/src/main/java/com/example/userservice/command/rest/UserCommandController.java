package com.example.userservice.command.rest;


import com.example.userservice.command.CreateUserCommand;
import com.example.userservice.command.UpdateUserCommand;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserCommandController {
    private Storage storage;
    private final Environment env;
    private final CommandGateway commandGateway;
    @Autowired
    public UserCommandController(Environment env, CommandGateway commandGateway) {
        this.env = env;
        this.commandGateway = commandGateway;
    }
    @PostConstruct
    public void initializeFirebase() throws IOException {
        InputStream serviceAccount = getClass().getResourceAsStream("/managelife-74367-firebase-adminsdk-qtcew-566b723c51.json");
        StorageOptions options = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();
        storage = options.getService();
    }
    @PostMapping("/uploadImage")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        Bucket bucket = storage.get("managelife-74367.appspot.com");
        String fileName = UUID.randomUUID().toString();
        Blob blob = bucket.create(fileName, file.getBytes(), "image/jpeg");
        String mediaLink = String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media&token=%s",
                bucket.getName(), fileName, blob.getBlobId().getGeneration());
        return mediaLink;
    }
    @PostMapping("/create")
    public String createUser(@RequestBody CreateUserRestModel model){
        CreateUserCommand command = CreateUserCommand.builder()
                .userId(model.getUserId())
                .username(UUID.randomUUID().toString())
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
    public String updateUser(@RequestBody UpdateUserRestModel model){
        UpdateUserCommand command = UpdateUserCommand.builder()
                .userId(model.getUserId())
                .username(model.getUsername())
                ._id(model.get_id())
                .firstName(model.getFirstName())
                .lastName(model.getLastName())
                .imagePath(model.getImagePath())
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
