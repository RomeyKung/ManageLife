package com.example.healthservice.command;

import com.example.healthservice.core.event.HealthCreateEvent;
import com.example.healthservice.core.event.HealthUpdateEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;

@Aggregate
public class HealthAggregate {
    @AggregateIdentifier
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
    private int goal;

    public HealthAggregate() {
    }

    @CommandHandler
    public HealthAggregate(CreateHealthCommand command) {
        if (command.getBmi() == null || command.getUserId() == null || command.getUserId().isBlank()) {
            throw new IllegalArgumentException("Something cannot be empty");
        }
        if (Integer.parseInt(command.getAge()) <= 0 || command.getActivity().isBlank() || Double.parseDouble(command.getHeight()) <= 0 || Double.parseDouble(command.getWeight()) <= 0) {
            throw new IllegalArgumentException("Something cannot be less than or equal to zero");
        }
        HealthCreateEvent healthCreateEvent = new HealthCreateEvent();
        BeanUtils.copyProperties(command, healthCreateEvent);
        AggregateLifecycle.apply(healthCreateEvent);

    }

    //Update Command Owen
    @CommandHandler
    public String handle (UpdateHealthCommand command) {
        System.out.println("update Aggregate");
        if (command.getBmi() == null || command.getUserId() == null || command.getUserId().isBlank()) {
            throw new IllegalArgumentException("Something cannot be empty");
        }
        if (Integer.parseInt(command.getAge()) <= 0 || command.getActivity().isBlank() || Double.parseDouble(command.getHeight()) <= 0 || Double.parseDouble(command.getWeight()) <= 0) {
            throw new IllegalArgumentException("Something cannot be less than or equal to zero");
        }
        HealthUpdateEvent healthUpdateEvent = new HealthUpdateEvent();
        BeanUtils.copyProperties(command, healthUpdateEvent);
        AggregateLifecycle.apply(healthUpdateEvent);
        System.out.println("update lifeCycle");
        // responce to client(caller)
        return "update lifeCycle";
    }

    @EventSourcingHandler
    public void on(HealthCreateEvent event) {
        this.healthId = event.getHealthId();
        this.userId = event.getUserId();
        this.steps = event.getSteps();
        this.goal = event.getGoal();
        this.sex = event.getSex();
        this.age = event.getAge();
        this.weight = event.getWeight();
        this.height = event.getHeight();
        this.activity = event.getActivities();
        this.calories = event.getCalories();
        this.bmi = event.getBmi();
//        this.goal = event.getGoal();
    }


    //Update event Owen
    @EventSourcingHandler
    public void on(HealthUpdateEvent event) {
        System.out.println("update event sourcing");
        this.healthId = event.getHealthId();
        this.userId = event.getUserId();
        this.steps = event.getSteps();
        this.goal = event.getGoal();
        this.sex = event.getSex();
        this.age = event.getAge();
        this.weight = event.getWeight();
        this.height = event.getHeight();
        this.activity = event.getActivities();
        this.calories = event.getCalories();
        this.bmi = event.getBmi();
    }
}
