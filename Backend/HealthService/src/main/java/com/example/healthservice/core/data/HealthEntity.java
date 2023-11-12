package com.example.healthservice.core.data;

import com.example.healthservice.command.BMIModel;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Document(value = "Healths")
public class HealthEntity implements Serializable {
    @Id
    private String _id;
    private String healthId;
    private String userId;
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
    public HealthEntity(){
        this.dateTime = LocalDateTime.now();
    }

}
