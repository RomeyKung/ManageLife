package com.example.userservice.query.rest;

import com.example.userservice.query.FindUserQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class UserQueryController {
    private final QueryGateway queryGateway;
    public UserQueryController(QueryGateway queryGateway){
        this.queryGateway = queryGateway;
    }
    @GetMapping(value = "/{userId}")
    public UserRestModel findUserById(@PathVariable String userId){
        FindUserQuery findUserQuery = new FindUserQuery(userId);
        return queryGateway.query(findUserQuery, ResponseTypes.instanceOf(UserRestModel.class)).join();
//        return userId;
    }

}
