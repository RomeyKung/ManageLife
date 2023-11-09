package com.example.appointmentservice.query.rest;

import com.example.appointmentservice.query.FindAppointmentQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentQueryController {
    private final QueryGateway queryGateway;
    public AppointmentQueryController(QueryGateway queryGateway){
        this.queryGateway = queryGateway;
    }

    @GetMapping(value = "/{userId}")
    public List<AppointmentRestModel> getAppointments(@PathVariable String userId){
        System.out.println("userKub: "+userId);
        FindAppointmentQuery findAppointmentQuery = new FindAppointmentQuery(userId);
        return queryGateway.query(
                findAppointmentQuery,
                ResponseTypes.multipleInstancesOf(AppointmentRestModel.class)
        ).join();
    }
}
