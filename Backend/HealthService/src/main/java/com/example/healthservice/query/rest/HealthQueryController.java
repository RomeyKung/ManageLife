package com.example.healthservice.query.rest;

import com.example.healthservice.query.FindHealthQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/health")
public class HealthQueryController {
    private final QueryGateway queryGateway;
    public HealthQueryController(QueryGateway queryGateway){
        this.queryGateway = queryGateway;
    }
    @GetMapping(value = "/{userId}")
    public List<HealthRestModel> findHealth(@PathVariable String userId){
        FindHealthQuery findHealthQuery = new FindHealthQuery(userId);
        return queryGateway.query(findHealthQuery, ResponseTypes.multipleInstancesOf(HealthRestModel.class)
        ).join();
    }
}
