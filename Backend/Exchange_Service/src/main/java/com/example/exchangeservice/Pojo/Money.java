package com.example.exchangeservice.Pojo;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document("Money")
public class Money implements Serializable{

    @Id
    private String _id;
    private String userId;
    private String name;
    private int amount;
    private  String color;
    private String date;
    private String type;
    public Money() {}
    public Money(String _id,String userID, String name, int amount, String color , String date, String type) {
        this._id = _id;
        this.userId = userID;
        this.name = name;
        this.amount = amount;

        this.color = color;
        this.date = date;
        this.type = type;
    }

    public Money(Object o, String userId, String name, int moneyAmount,String color, String date, String type) {
    }
}
