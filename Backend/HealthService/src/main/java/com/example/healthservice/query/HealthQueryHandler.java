package com.example.healthservice.query;

import com.example.healthservice.core.data.HealthEntity;
import com.example.healthservice.core.data.HealthRepository;
import com.example.healthservice.query.rest.HealthRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HealthQueryHandler {
    private HealthRepository healthRepository;

    public HealthQueryHandler(HealthRepository healthRepository){
        this.healthRepository = healthRepository;
    }
    @QueryHandler
    public HealthRestModel findLatestHealth(FindHealthQuery query) {
        List<HealthEntity> healthEntities = healthRepository.findLatestHealthById(query.getUserId());
        HealthEntity healthLatestDate = healthEntities.get(0);
        HealthRestModel healthRestModel = new HealthRestModel();
        BeanUtils.copyProperties(healthLatestDate, healthRestModel);

        return healthRestModel;
    }
    @QueryHandler
    public  List<HealthRestModel> findAllHealth(FindHealthQuery query) {
        List<HealthEntity> healthEntities = healthRepository.findLatestHealthById(query.getUserId());
        List<HealthRestModel> healthRestModels = new ArrayList<>();
        for (HealthEntity healthEntity: healthEntities){
            HealthRestModel healthRestModel = new HealthRestModel();
            BeanUtils.copyProperties(healthEntity, healthRestModel);
            healthRestModels.add(healthRestModel);
        }

        return healthRestModels;
    }
    //Owen havent this review yet
}
