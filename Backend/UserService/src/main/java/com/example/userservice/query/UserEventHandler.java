package com.example.userservice.query;

import com.example.userservice.core.data.UserEntity;
import com.example.userservice.core.data.UserRepository;
import com.example.userservice.core.event.CreateUserEvent;
import com.example.userservice.core.event.UpdateUserEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class UserEventHandler {
    private UserRepository userRepository;
    public UserEventHandler(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @EventHandler
    public void on(CreateUserEvent event){
        UserEntity existingUser = userRepository.findUserByUserId(event.getUserId());

        if (existingUser != null) {
            System.out.println("FROMCreateRepo: in db already");
        }else{
            UserEntity entity = new UserEntity();
            BeanUtils.copyProperties(event, entity);
            userRepository.save(entity);
        }

    }
    @EventHandler
    public void on(UpdateUserEvent event){
        UserEntity entity = new UserEntity();
        BeanUtils.copyProperties(event, entity);
        userRepository.save(entity);
    }
}
