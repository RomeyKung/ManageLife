package com.example.todolistservice.core.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface InventoryRepository extends MongoRepository<InventoryEntity, String> {
    List<InventoryEntity> findByUserId(String userId);

    InventoryEntity findByUserIdAndItemId(String userId, String itemId);
}
