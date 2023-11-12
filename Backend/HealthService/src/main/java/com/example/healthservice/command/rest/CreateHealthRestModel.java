package com.example.healthservice.command.rest;

import com.example.healthservice.query.rest.HealthRestModel;
import lombok.Data;

@Data
public class CreateHealthRestModel {
    private String userId;
    private int goal;
    private int steps;
    private String sex;
    private String age;
    private String weight;
    private String height;
    private String activities;
}
