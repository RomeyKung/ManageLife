package com.example.appointmentservice.command;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@Builder
public class CreateAppointmentCommand {
    @TargetAggregateIdentifier
    private String appointmentId;
    private String userId;
    private String appointmentDetail;
    private String appointmentTime;
}
