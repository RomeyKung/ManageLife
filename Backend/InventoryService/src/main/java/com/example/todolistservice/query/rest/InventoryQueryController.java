package com.example.todolistservice.query.rest;

import com.example.todolistservice.query.FindInventoryQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryQueryController {
    private final QueryGateway queryGateway;
    public InventoryQueryController(QueryGateway queryGateway){
        this.queryGateway = queryGateway;
    }

    @GetMapping(value = "/{userId}")
    public List<InventoryRestModel> getAppointments(@PathVariable String userId){
        System.out.println("userKub: "+userId);
        FindInventoryQuery findInventoryQuery = new FindInventoryQuery(userId);
        return queryGateway.query(
                findInventoryQuery,
                ResponseTypes.multipleInstancesOf(InventoryRestModel.class)
        ).join();
    }
}
