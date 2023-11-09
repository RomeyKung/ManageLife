package com.example.todolistservice.query;

import com.example.todolistservice.core.data.InventoryEntity;
import com.example.todolistservice.core.data.InventoryRepository;
import com.example.todolistservice.core.events.InventoryCreateEvent;
import com.example.todolistservice.core.events.InventoryDeleteEvent;
import com.example.todolistservice.core.events.InventoryUpdateEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class InventoryEventHandler {
    private final InventoryRepository inventoryRepository;
    public InventoryEventHandler(InventoryRepository inventoryRepository){
        this.inventoryRepository = inventoryRepository;

    }
    @EventHandler
    public void on(InventoryCreateEvent event) {
        InventoryEntity existingAppointment = inventoryRepository.findByUserIdAndItemId(event.getUserId(), event.getItemId());

        if (existingAppointment != null) {
            System.out.println("FROMCreateRepo: in db already");
        } else {
            InventoryEntity inventoryEntity = new InventoryEntity();
            BeanUtils.copyProperties(event, inventoryEntity);
            inventoryRepository.save(inventoryEntity);
        }
    }

    @EventHandler
    public void on(InventoryUpdateEvent event){
        InventoryEntity inventoryEntity = new InventoryEntity();
        BeanUtils.copyProperties(event, inventoryEntity);
        inventoryRepository.save(inventoryEntity);
    }
    @EventHandler
    public void on(InventoryDeleteEvent event){
        InventoryEntity inventoryEntity = new InventoryEntity();
        BeanUtils.copyProperties(event, inventoryEntity);
        inventoryRepository.delete(inventoryEntity);
    }

}
