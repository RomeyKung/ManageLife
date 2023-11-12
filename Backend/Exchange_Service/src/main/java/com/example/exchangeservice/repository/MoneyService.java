package com.example.exchangeservice.repository;


import com.example.exchangeservice.Pojo.Money;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class MoneyService {
    @Autowired
    private moneyRepository repository;


    public MoneyService(moneyRepository repository) {
        this.repository = repository;
    }



    @RabbitListener(queues = "GetMoneybyIdQueqe")
    public List<Money> getMoneyById(String userId) {
        System.out.println("Get money by UID " +  userId);
        System.out.println(repository.getMoneyById(userId));
        return repository.getMoneyById(userId);
    }

//    @RabbitListener(queues = "GetMoneyQueue")
//    public List<String> handleMessage(List<String> messages) {
//        for (String message : messages) {
//            System.out.println("Received message: " + message);
//        }
//        return messages;
//    }
    @RabbitListener(queues = "GetMoneyQueue")
    public List<Money> retrieveMoneys() {
        System.out.println("Get All Moneys");
        return  repository.findAll();
    }
    @RabbitListener(queues ="GetByTypeQueqe")
    public List <Money> getMoneyIdAndType(String message) {
        System.out.println("Get By ID AND TYPE" + message);
        String[] parts = message.split(",");
        System.out.println(parts[0] +" "+parts[1]);
        return  repository.getMoneybyIdAndType(parts[0],parts[1]);
    }

    public List<Money> retrieveMoneyByName(String name) {
        return repository.findByName(name);
    }
    @RabbitListener(queues = "GetByDateQueue")
    public List<Money> retrieveMoneysByUserIdAndDate(String message) {

        System.out.println("Get By ID AND DATE" + message);
        String[] parts = message.split(",");
        System.out.println(parts[0] +" "+parts[1]);
        return repository.retrieveMoneysByUserIdAndDate(parts[0],parts[1]);
    }
    public void createMoney(Money money) {
        repository.save(money);
    }
    @RabbitListener(queues = "AddMoneyQueue")
    public Money handleMessage(Map<String, String> formDataMap) {

        System.out.println(formDataMap);
        int moneyAmount = Integer.parseInt(formDataMap.get("amount"));
        Money money = new Money(
                null,
                formDataMap.get("userId"),
                formDataMap.get("name"),
                moneyAmount,
                formDataMap.get("color"),
                formDataMap.get("date"),
                formDataMap.get("type")
        );
        this.createMoney(money);

        return money;
        // You can add more business logic as needed
    }

    @RabbitListener(queues = "DeleteMoneyQueue")
    public String deleteMoney(String _id){
        System.out.println(_id);
        try{
            repository.deleteById(_id);
            return "success";
        }
        catch(Exception e){
            throw new Error(e);
        }


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