package com.example.userservice.core.data;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<UserEntity, String> {
    UserEntity findUserByUserId(String userId);
}
