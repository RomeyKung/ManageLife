package com.example.healthservice.query.rest;

import com.example.healthservice.command.BMIModel;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HealthRestModel {
    private String _id;
    private String userId;
    private String healthId;
    private int steps;
    private String sex;
    private String age;
    private String weight;
    private String height;
    private String activity;
    private String calories;
    private BMIModel bmi;
    private LocalDateTime dateTime;
    private int goal;
}
