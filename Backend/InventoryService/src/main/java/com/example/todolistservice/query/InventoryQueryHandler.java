package com.example.todolistservice.query;

import com.example.todolistservice.core.data.InventoryEntity;
import com.example.todolistservice.core.data.InventoryRepository;
import com.example.todolistservice.query.rest.InventoryRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class InventoryQueryHandler {
    private final InventoryRepository inventoryRepository;
    public InventoryQueryHandler(InventoryRepository inventoryRepository){
        this.inventoryRepository = inventoryRepository;
    }
    @QueryHandler
    public List<InventoryRestModel> findTodoLists(FindInventoryQuery query){
        List<InventoryRestModel> inventoryRest = new ArrayList<>();
        List<InventoryEntity> storedInventory = inventoryRepository.findByUserId(query.getUserId());
        for (InventoryEntity inventoryEntity : storedInventory){
            InventoryRestModel inventoryRestModel = new InventoryRestModel();
            BeanUtils.copyProperties(inventoryEntity, inventoryRestModel);
            inventoryRest.add(inventoryRestModel);
        }
        return inventoryRest;
    }

}
