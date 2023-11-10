package com.example.healthservice.core.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface HealthRepository extends MongoRepository<HealthEntity, String> {
    @Query(value="{userId:'?0'}")
    HealthEntity findHealthById(String userId);

//    @Query(value="{userId:'?0'}")
//    List<HealthEntity> findHealthById(String userId);

    @Query(value="{userId : ?0}", sort = "{dateTime : -1}")
    List<HealthEntity> findLatestHealthById(String userId);
}
