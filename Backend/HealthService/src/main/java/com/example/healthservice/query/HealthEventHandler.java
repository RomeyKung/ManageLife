package com.example.healthservice.query;

import com.example.healthservice.core.data.HealthEntity;
import com.example.healthservice.core.data.HealthRepository;
import com.example.healthservice.core.event.HealthCreateEvent;
import com.example.healthservice.core.event.HealthUpdateEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class HealthEventHandler {
    private final HealthRepository healthRepository;
    private HealthEventHandler(HealthRepository healthRepository){
        this.healthRepository = healthRepository;
    }

    @EventHandler
    public String on(HealthCreateEvent event){
        HealthEntity existingEntity = healthRepository.findHealthById(event.getUserId());

        if (existingEntity != null) {
            System.out.println("FROMCreateRepo: in db already");
        }else {
            HealthEntity healthEntity = new HealthEntity();
            BeanUtils.copyProperties(event, healthEntity);
            healthRepository.save(healthEntity);
        }
        return "Created";

    }

    //Update Event Owen
@EventHandler
    public String on(HealthUpdateEvent event){
    System.out.println("update event handler");
        // Your update logic here

        // Fetch the existing HealthEntity from the repository, update it, and save it back.
//        HealthEntity existingEntity = healthRepository.findById(event.getUserId()).orElse(null);
    HealthEntity existingEntity = healthRepository.findHealthById(event.getUserId());


        if (existingEntity != null) {
            // Update the properties of existingEntity with the corresponding properties from the event
            BeanUtils.copyProperties(event, existingEntity);

            existingEntity.setDateTime(LocalDateTime.now());

            // Save the updated entity back to the repository
            healthRepository.save(existingEntity);
            System.out.println("Updated");
            return "Updated";
        } else {
            System.out.println("Cant update Entity not found");
            return "Cant update Entity not found";

            // Handle the case where the entity with the given ID is not found
            // You may choose to throw an exception, log a warning, or take other appropriate actions.
        }
    }
}
