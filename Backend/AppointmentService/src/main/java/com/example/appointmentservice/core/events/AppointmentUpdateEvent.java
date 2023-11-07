package com.example.appointmentservice.core.events;

import lombok.Data;

@Data
public class AppointmentUpdateEvent {
    private String _id;
    private String appointmentId;
    private String userId;
    private String appointmentDetail;
    private String appointmentTime;

}
