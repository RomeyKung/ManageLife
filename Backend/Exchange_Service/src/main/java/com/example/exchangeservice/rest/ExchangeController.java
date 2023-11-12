package com.example.exchangeservice.rest;

import com.example.exchangeservice.Pojo.Money;
import com.example.exchangeservice.repository.MoneyService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ExchangeController {

@Autowired
private RabbitTemplate rabbitTemplate;
@Autowired
private MoneyService moneyService;


    @RequestMapping(value = "/moneys", method = RequestMethod.GET)
    public ResponseEntity<?>  getMoney() {
        Object moneys = rabbitTemplate.convertSendAndReceive("MoneyExchange","get","");
            return ResponseEntity.ok((List<Money>) moneys);

    }

//    @RequestMapping(value = "/mon", method = RequestMethod.GET)
//    public List<String> getSentence(){
//        Object sentences = rabbitTemplate.convertSendAndReceive("myDirect", "queue", "eieiei");
//        return  ((List<String>)sentences);
//    }

    @RequestMapping(value =  "/money/{userId}",method = RequestMethod.GET)
    public  ResponseEntity<?> getMoneyByID(@PathVariable("userId") String userId) {
//        List<Money> money = moneyService.getMoneyById(userId);
        Object moneys = rabbitTemplate.convertSendAndReceive("MoneyExchange","getbyid",userId);
        return ResponseEntity.ok((List<Money>) moneys);
    }


    @RequestMapping(value = "/getmoney/{type}/{userId}", method = RequestMethod.GET)
    public ResponseEntity<?> getMoneyByIdAndType(
            @PathVariable("type") String type,
            @PathVariable("userId") String userId) {
        String message = userId + "," + type;

        // Your logic to retrieve money based on userId and type
        Object moneys = rabbitTemplate.convertSendAndReceive("MoneyExchange", "getbytype",message);

        return ResponseEntity.ok(moneys);
    }


    @RequestMapping(value = "/money/{userId}/{date}", method = RequestMethod.GET)
    public ResponseEntity<?> retrieveMoneyByNameDate(
            @PathVariable("userId") String userId,
            @PathVariable("date") String date) {
        String message = userId + "," + date;
        // Your logic to retrieve money based on userId and date
        Object moneys = rabbitTemplate.convertSendAndReceive("MoneyExchange", "getbydate",message);


        return ResponseEntity.ok(moneys);
    }



    @RequestMapping(value = "/addMoney", method = RequestMethod.POST)
    public ResponseEntity<?> addWizard(@RequestBody MultiValueMap<String, String> formdata) {
        Map<String, String> formDataMap = formdata.toSingleValueMap();
        int moneyAmount = Integer.parseInt(formDataMap.get("amount"));
        Object Result =  rabbitTemplate.convertSendAndReceive("MoneyExchange", "add", formDataMap);


        return ResponseEntity.ok(Result);

    }

    @RequestMapping(value = "/delete/{_id}", method = RequestMethod.DELETE)
    public String  deleteMoney(@PathVariable("_id") String _id) {

        Object res =  rabbitTemplate.convertSendAndReceive("MoneyExchange", "delete", _id);

        return  ((String) res);

    }



}
