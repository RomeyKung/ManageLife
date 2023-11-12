package com.example.healthservice.command.rest;

import lombok.Data;
@Data
public class UpdateHealthRestModel {
        private String healthId;
        private String userId;
        private int steps;
        private String sex;
        private String age;
        private String weight;
        private String height;
        private String activities;
        private int goal;

}
