package com.example.healthservice.core.event;

import com.example.healthservice.command.BMIModel;
import lombok.Data;

@Data
public class HealthUpdateEvent {
    private String userId;
    private String steps;
    private String sex;
    private String age;
    private String weight;
    private String height;
    private String activities;
    private String calories;
    private BMIModel bmi;
}
