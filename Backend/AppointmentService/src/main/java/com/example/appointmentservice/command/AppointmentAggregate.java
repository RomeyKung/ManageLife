package com.example.appointmentservice.command;

import com.example.appointmentservice.core.events.AppointmentCreateEvent;
import com.example.appointmentservice.core.events.AppointmentDeleteEvent;
import com.example.appointmentservice.core.events.AppointmentUpdateEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class AppointmentAggregate {
    @AggregateIdentifier
    private String appointmentId;
    private String userId;
    private String appointmentDetail;
    private String appointmentTime;

    public AppointmentAggregate(){}

    @CommandHandler
    public AppointmentAggregate(CreateAppointmentCommand command){
        if(command.getAppointmentDetail().isBlank() || command.getAppointmentDetail() == null){
            throw new IllegalArgumentException("must have activity name");
        }
        if(command.getAppointmentTime().isBlank() || command.getAppointmentTime() == null){
            throw new IllegalArgumentException("must have activity time");
        }

        AppointmentCreateEvent appointmentCreateEvent = new AppointmentCreateEvent();
        BeanUtils.copyProperties(command, appointmentCreateEvent);
        AggregateLifecycle.apply(appointmentCreateEvent);


    }
    @CommandHandler
    public void handle(UpdateAppointmentCommand command){
        if(command.getAppointmentDetail().isBlank() || command.getAppointmentDetail() == null){
            throw new IllegalArgumentException("must have activity name");
        }
        if(command.getAppointmentTime().isBlank() || command.getAppointmentTime() == null){
            throw new IllegalArgumentException("must have activity time");
        }

        AppointmentUpdateEvent appointmentUpdateEvent = new AppointmentUpdateEvent();
        BeanUtils.copyProperties(command, appointmentUpdateEvent);
        AggregateLifecycle.apply(appointmentUpdateEvent);
    }


    @CommandHandler
    public void handle(DeleteAppointmentCommand command){
        if(command.getAppointmentDetail().isBlank() || command.getAppointmentDetail() == null){
            throw new IllegalArgumentException("must have activity name");
        }
        if(command.getAppointmentTime().isBlank() || command.getAppointmentTime() == null){
            throw new IllegalArgumentException("must have activity time");
        }

        AppointmentDeleteEvent appointmentDeleteEvent = new AppointmentDeleteEvent();
        BeanUtils.copyProperties(command, appointmentDeleteEvent);
        AggregateLifecycle.apply(appointmentDeleteEvent);
    }




    @EventSourcingHandler
    public void on(AppointmentCreateEvent appointmentCreateEvent){
        System.out.println("created event");
        this.appointmentId = appointmentCreateEvent.getAppointmentId();
        this.appointmentDetail = appointmentCreateEvent.getAppointmentDetail();
        this.appointmentTime = appointmentCreateEvent.getAppointmentTime();
        this.userId = appointmentCreateEvent.getUserId();
    }

    @EventSourcingHandler
    public void on(AppointmentUpdateEvent appointmentUpdateEvent){
        System.out.println("updated event ");
        this.appointmentId = appointmentUpdateEvent.getAppointmentId();
        this.appointmentDetail = appointmentUpdateEvent.getAppointmentDetail();
        this.appointmentTime = appointmentUpdateEvent.getAppointmentTime();
        this.userId = appointmentUpdateEvent.getUserId();
    }

    @EventSourcingHandler
    public void on(AppointmentDeleteEvent appointmentDeleteEvent){
        System.out.println("delete event");
        this.appointmentId = appointmentDeleteEvent.getAppointmentId();
        this.appointmentDetail = appointmentDeleteEvent.getAppointmentDetail();
        this.appointmentTime = appointmentDeleteEvent.getAppointmentTime();
        this.userId = appointmentDeleteEvent.getUserId();
    }

}
