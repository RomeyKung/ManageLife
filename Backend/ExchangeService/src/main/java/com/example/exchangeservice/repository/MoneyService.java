package com.example.exchangeservice.repository;

import com.example.exchangeservice.Pojo.Money;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MoneyService {
    @Autowired
    private moneyRepository repository;


    public MoneyService(moneyRepository repository) {
        this.repository = repository;
    }

    public List <Money> getMoneyById(String userId) {
        return repository.getMoneyById(userId);
    }
    public List<Money> retrieveMoneys() {
        return repository.findAll();
    }
    public List <Money> getMoneybyIdAndType(String userId, String type) {
        return repository.getMoneybyIdAndType(userId,type);
    }

    public List<Money> retrieveMoneyByName(String name) {
        return repository.findByName(name);
    }

    public List<Money> retrieveMoneysByUserIdAndDate(String userId, String date) {
        return repository.retrieveMoneysByUserIdAndDate(userId,date);
    }

    public Money createMoney(Money money) {
        return repository.save(money);
    }


    public Integer getTotalMoneyByUserId(String userId) {
        List<Money> result = repository.getTotalMoneyByUserId(userId);

        // Calculate the total money from the list
        Integer totalMoney = result.stream()
                .mapToInt(Money::getAmount)
                .sum();

        return totalMoney;
    }
}