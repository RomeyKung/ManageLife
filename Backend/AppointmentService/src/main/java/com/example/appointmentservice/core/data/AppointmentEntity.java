package com.example.appointmentservice.core.data;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document(collection = "Appointment")
public class AppointmentEntity implements Serializable {
    @Id
    private String _id;
    private String appointmentId;
    private String userId;
    private String appointmentDetail;
    private String appointmentTime;

    public AppointmentEntity(){}

    public AppointmentEntity(String _id, String appointmentId, String userId, String appointmentDetail, String appointmentTime) {
        this._id = _id;
        this.appointmentId = appointmentId;
        this.userId = userId;
        this.appointmentDetail = appointmentDetail;
        this.appointmentTime = appointmentTime;
    }
}
