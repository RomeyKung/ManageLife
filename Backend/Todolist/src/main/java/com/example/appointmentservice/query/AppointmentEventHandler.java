package com.example.appointmentservice.query;

import com.example.appointmentservice.core.data.AppointmentEntity;
import com.example.appointmentservice.core.data.AppointmentRepository;
import com.example.appointmentservice.core.events.AppointmentCreateEvent;
import com.example.appointmentservice.core.events.AppointmentDeleteEvent;
import com.example.appointmentservice.core.events.AppointmentUpdateEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class AppointmentEventHandler{
    private final AppointmentRepository appointmentRepository;
    public AppointmentEventHandler(AppointmentRepository appointmentRepository){
        this.appointmentRepository = appointmentRepository;

    }
    @EventHandler
    public void on(AppointmentCreateEvent event) {
        AppointmentEntity existingAppointment = appointmentRepository.findByUserIdAndAppointmentDetail(event.getUserId(), event.getAppointmentDetail());

        if (existingAppointment != null) {
            System.out.println("FROMCreateRepo: in db already");
        } else {
            AppointmentEntity appointmentEntity = new AppointmentEntity();
            BeanUtils.copyProperties(event, appointmentEntity);
            appointmentRepository.save(appointmentEntity);
        }
    }

    @EventHandler
    public void on(AppointmentUpdateEvent event){
        AppointmentEntity appointmentEntity = new AppointmentEntity();
        BeanUtils.copyProperties(event, appointmentEntity);
        appointmentRepository.save(appointmentEntity);
    }
    @EventHandler
    public void on(AppointmentDeleteEvent event){
        AppointmentEntity appointmentEntity = new AppointmentEntity();
        BeanUtils.copyProperties(event, appointmentEntity);
        appointmentRepository.delete(appointmentEntity);
    }

}
