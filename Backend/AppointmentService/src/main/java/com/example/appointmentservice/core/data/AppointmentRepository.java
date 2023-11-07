package com.example.appointmentservice.core.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AppointmentRepository extends MongoRepository<AppointmentEntity, String> {
    List<AppointmentEntity> findByUserId(String userId);

    AppointmentEntity findByUserIdAndAppointmentDetail(String userId, String appointmentDetail);
}
