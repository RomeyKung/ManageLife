package com.example.healthservice.command;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.time.LocalDateTime;

@Data
@Builder
public class CreateHealthCommand {
    @TargetAggregateIdentifier
    private final String healthId;
    private final String userId;
    private final int steps;
    private final String sex;
    private final String age;
    private final String weight;
    private final String height;
    private final String activity;
    private final String calories;
    private final BMIModel bmi;
    private final int goal;
}
