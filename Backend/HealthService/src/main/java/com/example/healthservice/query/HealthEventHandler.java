package com.example.healthservice.query;

import com.example.healthservice.core.data.HealthEntity;
import com.example.healthservice.core.data.HealthRepository;
import com.example.healthservice.core.event.HealthCreateEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class HealthEventHandler {
    private final HealthRepository healthRepository;
    private HealthEventHandler(HealthRepository healthRepository){
        this.healthRepository = healthRepository;
    }

    @EventHandler
    public void on(HealthCreateEvent event){
        HealthEntity healthEntity = new HealthEntity();
        BeanUtils.copyProperties(event, healthEntity);
        healthRepository.save(healthEntity);
    }
}
