package com.example.userservice.query;

import com.example.userservice.core.data.UserEntity;
import com.example.userservice.core.data.UserRepository;
import com.example.userservice.query.rest.UserRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class UserQueryHandler {
    private UserRepository userRepository;

    public UserQueryHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @QueryHandler
    public UserRestModel findUser(FindUserQuery query) {
        UserEntity entity = userRepository.findUserByUserId(query.getUserId());
        UserRestModel model = new UserRestModel();
        BeanUtils.copyProperties(entity,model);
        System.out.println(model);
        return model;
    }
}
