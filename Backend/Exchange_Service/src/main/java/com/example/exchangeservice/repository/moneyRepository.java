package com.example.exchangeservice.repository;



import com.example.exchangeservice.Pojo.Money;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public  interface moneyRepository extends MongoRepository<Money, String> {
    @Query(value = "{userId: '?0'}")
    public List<Money> getMoneyById(String userId);

    @Query(value="{name:'?0'}")
    public List<Money> findByName(String name);

    @Query(value = "{ 'userId' : ?0, 'date' : ?1 }")
    public List<Money> retrieveMoneysByUserIdAndDate(String userId, String date);

    @Query(value = "{ 'userId' : ?0 }", fields = "{ 'amount' : 1, '_id' : 0 }")
    List<Money> getTotalMoneyByUserId(String userId);


    @Query(value = "{ 'userId' : ?0, 'type' : ?1 }")
    public List<Money> getMoneybyIdAndType(String userId, String type);



}