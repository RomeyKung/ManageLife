package com.example.todolistservice.core.data;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document(collection = "Inventory")
public class InventoryEntity implements Serializable {
    @Id
    private String _id;
    private String itemId;
    private String userId;
    private String nameItem;
    private String amount;
    private String expired;

    public InventoryEntity(){}

    public InventoryEntity(String _id, String itemId, String userId, String nameItem, String amount, String expired) {
        this._id = _id;
        this.itemId = itemId;
        this.userId = userId;
        this.nameItem = nameItem;
        this.amount = amount;
        this.expired = expired;
    }
}
