package com.example.appointmentservice.command.rest;

import lombok.Data;

@Data
public class CreateAppointmentRestModel {
    private String userId;
    private String appointmentDetail;
    private String appointmentTime;
}
