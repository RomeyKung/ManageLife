package com.example.healthservice.command.rest;

import com.example.healthservice.command.BMIModel;
import com.example.healthservice.command.CreateHealthCommand;
import com.example.healthservice.command.UpdateHealthCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
public class HealthCommandController {
    private final Environment env;
    private final CommandGateway commandGateway;

    @Autowired
    public HealthCommandController(Environment env, CommandGateway commandGateway){
        this.env = env;
        this.commandGateway = commandGateway;
    }

    @PostMapping("/health")
    public String createHealthCommand(@RequestBody CreateHealthRestModel createHealthRestModel){
        // calculator calories per day
        try{
            String calories = WebClient.create().get()
                    .uri("http://localhost:3000/calories/{sex}/{weight}/{height}/{age}/{activity}",
                            createHealthRestModel.getSex(), createHealthRestModel.getWeight(), createHealthRestModel.getHeight(), createHealthRestModel.getAge(), createHealthRestModel.getActivities())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block(); // Blocking thread

            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString("http://localhost:8090/bmiCal")
                    .queryParam("w", createHealthRestModel.getWeight())
                    .queryParam("h", createHealthRestModel.getHeight());

            BMIModel bmi = WebClient.create().post()
                    .uri(uriBuilder.toUriString())
                    .retrieve()
                    .bodyToMono(BMIModel.class)
                    .block();
            CreateHealthCommand command = CreateHealthCommand.builder()
                    .healthId(UUID.randomUUID().toString())
                    .userId(createHealthRestModel.getUserId())
                    .steps(createHealthRestModel.getSteps())
                    .goal(createHealthRestModel.getGoal())
                    .sex(createHealthRestModel.getSex())
                    .age(createHealthRestModel.getAge())
                    .weight(createHealthRestModel.getWeight())
                    .height(createHealthRestModel.getHeight())
                    .activity(createHealthRestModel.getActivities())
                    .calories(calories)
                    .bmi(bmi)
//                    .goal(createHealthRestModel.getGoal())
                    .build();

            String result;
            try {
                result = commandGateway.sendAndWait(command);
            }
            catch (Exception e){
                result = e.getLocalizedMessage();
            }
            return result;
        }
        catch (Exception exception){
            System.out.println(exception + "Cus log:Bmi service or express maybe not found");
            return "Cus log:Bmi service or express maybe not found";
        }

    }

    //Update Command controller
    @PutMapping("/UpdateHealth")
    public String updateHealthCommand(@RequestBody UpdateHealthRestModel updateHealthRestModel){
        System.out.println("update");
        // calculator calories per day
        try{
            String calories = WebClient.create().get()
                    .uri("http://localhost:3000/calories/{sex}/{weight}/{height}/{age}/{activity}"
                            , updateHealthRestModel.getSex()
                            , updateHealthRestModel.getWeight(), updateHealthRestModel.getHeight(), updateHealthRestModel.getAge(), updateHealthRestModel.getActivities())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block(); // Blocking thread

            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString("http://localhost:8090/bmiCal")
                    .queryParam("w", updateHealthRestModel.getWeight())
                    .queryParam("h", updateHealthRestModel.getHeight());

            BMIModel bmi = WebClient.create().post()
                    .uri(uriBuilder.toUriString())
                    .retrieve()
                    .bodyToMono(BMIModel.class)
                    .block();
            UpdateHealthCommand command = UpdateHealthCommand.builder()
                    .healthId(updateHealthRestModel.getHealthId())
                    .userId(updateHealthRestModel.getUserId())
                    .steps(updateHealthRestModel.getSteps())
                    .goal(updateHealthRestModel.getGoal())
                    .sex(updateHealthRestModel.getSex())
                    .age(updateHealthRestModel.getAge())
                    .weight(updateHealthRestModel.getWeight())
                    .height(updateHealthRestModel.getHeight())
                    .activity(updateHealthRestModel.getActivities())
                    .calories(calories)
                    .bmi(bmi)
                    .build();

            String result;
            try {
                result = commandGateway.sendAndWait(command);
            }
            catch (Exception e){
                result = e.getLocalizedMessage();
            }
            return result;


        }
        catch (Exception exception){
            System.out.println(exception + "Cus log:Bmi service or express maybe not found");
            return "Cus log:Bmi service or express maybe not found";
        }

    }
}
