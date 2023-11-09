package com.example.appointmentservice.query.rest;

import lombok.Data;

@Data
public class AppointmentRestModel {
    private String _id;
    private String appointmentId;
    private String userId;
    private String appointmentDetail;
    private String appointmentTime;
}
