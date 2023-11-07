package com.example.appointmentservice.query;

import com.example.appointmentservice.core.data.AppointmentEntity;
import com.example.appointmentservice.core.data.AppointmentRepository;
import com.example.appointmentservice.query.rest.AppointmentRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AppointmentQueryHandler {
    private final AppointmentRepository appointmentRepository;
    public AppointmentQueryHandler(AppointmentRepository appointmentRepository){
        this.appointmentRepository = appointmentRepository;
    }
    @QueryHandler
    public List<AppointmentRestModel> findAppointments(FindAppointmentQuery query){
        List<AppointmentRestModel> appointmentRest = new ArrayList<>();
        List<AppointmentEntity> storedAppointment = appointmentRepository.findByUserId(query.getUserId());
//        System.out.printf("storeKub: " + storedAppointment.toString());
        for (AppointmentEntity appointmentEntity: storedAppointment){
            AppointmentRestModel appointmentRestModel = new AppointmentRestModel();
            BeanUtils.copyProperties(appointmentEntity, appointmentRestModel);
            appointmentRest.add(appointmentRestModel);
        }
        return appointmentRest;
    }

}
