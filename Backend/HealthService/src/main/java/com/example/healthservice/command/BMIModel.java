package com.example.healthservice.command;

import lombok.Data;

@Data
public class BMIModel {
    private double out;
    private String level;
    private double w;
    private double h;
}
