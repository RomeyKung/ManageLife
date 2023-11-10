package com.example.exchangeservice.Pojo;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("Income")
public class Money {
    @Id
    private String _id;
    private String userId;
    private String name;
    private String sname;
    private int money;
    private String incomeType;
    private  String color;
    private String date;
    public Money() {}
    public Money(String _id,String userID, String name, String sname, int money,String incomeType, String color , String date) {
        this._id = _id;
        this.userId = userID;
        this.name = name;
        this.sname = sname;
        this.money = money;
        this.incomeType = incomeType;
        this.color = color;
        this.date = date;
    }

    public Money(Object o, String userId, String name, String sname, int moneyAmount, String incomeType, String color, String date) {
    }
}
