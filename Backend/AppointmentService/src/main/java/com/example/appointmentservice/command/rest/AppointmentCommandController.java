package com.example.appointmentservice.command.rest;

import com.example.appointmentservice.command.CreateAppointmentCommand;

import com.example.appointmentservice.command.DeleteAppointmentCommand;
import com.example.appointmentservice.command.UpdateAppointmentCommand;
import lombok.Data;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/appointment")
public class AppointmentCommandController {
    private final Environment env;
    private final CommandGateway commandGateway;

    @Autowired
    public AppointmentCommandController(Environment env, CommandGateway commandGateway){
        this.env = env;
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createAppointment(@RequestBody CreateAppointmentRestModel model){
        CreateAppointmentCommand command = CreateAppointmentCommand.builder()
                .appointmentId(UUID.randomUUID().toString())
                .userId(model.getUserId())
                .appointmentDetail(model.getAppointmentDetail())
                .appointmentTime(model.getAppointmentTime())
                .build();
        String result;
        try{
            result = commandGateway.sendAndWait(command);
        }
        catch (Exception e){
            result = e.getLocalizedMessage();
        }
        return  result;

    }

    @PutMapping
    public String updateAppointment(@RequestBody UpdateAppointmentRestModel model){
        UpdateAppointmentCommand command = UpdateAppointmentCommand.builder()
                ._id(model.get_id())
                .appointmentId(model.getAppointmentId())
                .userId(model.getUserId())
                .appointmentDetail(model.getAppointmentDetail())
                .appointmentTime(model.getAppointmentTime())
                .build();

        String result;
        try{
            result = commandGateway.sendAndWait(command);
        }
        catch (Exception e){
            result = e.getLocalizedMessage();
        }
        return  result;
    }

    @DeleteMapping
    public String deleteAppointment(@RequestBody DeleteAppointmentRestModel model){
        DeleteAppointmentCommand command = DeleteAppointmentCommand.builder()
                ._id(model.get_id())
                .appointmentId(model.getAppointmentId())
                .userId(model.getUserId())
                .appointmentDetail(model.getAppointmentDetail())
                .appointmentTime(model.getAppointmentTime())
                .build();

        String result;
        try{
            result = commandGateway.sendAndWait(command);
        }
        catch (Exception e){
            result = e.getLocalizedMessage();
        }
        return  result;

    }

}
