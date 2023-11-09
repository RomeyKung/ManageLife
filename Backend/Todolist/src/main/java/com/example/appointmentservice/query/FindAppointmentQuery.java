package com.example.appointmentservice.query;

import lombok.Data;

@Data
public class FindAppointmentQuery {
    private String userId;

    public FindAppointmentQuery(String userId) {
        this.userId = userId;
    }
}
