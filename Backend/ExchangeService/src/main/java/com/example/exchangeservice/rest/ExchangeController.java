package com.example.exchangeservice.rest;

import com.example.exchangeservice.Pojo.Money;
import com.example.exchangeservice.repository.MoneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController

public class ExchangeController {
   @Autowired
    private MoneyService moneyService;
    @RequestMapping(value = "/moneys", method = RequestMethod.GET)
    public ResponseEntity<?> getmoneys() {
        List<Money> moneys = moneyService.retrieveMoneys();
        return ResponseEntity.ok(moneys);
    }


    @RequestMapping(value = "/money/{userId}/{date}", method = RequestMethod.GET)
    public ResponseEntity<?> retrieveMoneyByNameDate(
            @PathVariable("userId") String userId,
            @PathVariable("date") String date) {

        // Your logic to retrieve money based on userId and date
        List<Money> moneys = moneyService.retrieveMoneysByUserIdAndDate(userId, date);

        return ResponseEntity.ok(moneys);
    }
    @RequestMapping(value =  "/money/{userId}",method = RequestMethod.GET)
    public  ResponseEntity<?> getMoneyByID(@PathVariable("userId") String userId) {
        List<Money> money = moneyService.getMoneyById(userId);
        return ResponseEntity.ok(money);
    }

    @RequestMapping(value = "/addMoney", method = RequestMethod.POST)
    public ResponseEntity<Money> addWizard(@RequestBody MultiValueMap<String, String> formdata) {
        Map<String, String> formDataMap = formdata.toSingleValueMap();
        int moneyAmount = Integer.parseInt(formDataMap.get("money"));
        Money money = moneyService.createMoney(
                new Money(null, formDataMap.get("userId"), formDataMap.get("name"), formDataMap.get("sname"), moneyAmount, formDataMap.get("incomeType"), formDataMap.get("color"), formDataMap.get("date"))
        );
        return ResponseEntity.ok(money);

    }

    @GetMapping("/totalMoney/{userId}")
    public ResponseEntity<Integer> getTotalMoney(@PathVariable("userId") String userId) {
        Integer totalMoney = moneyService.getTotalMoneyByUserId(userId);
        return ResponseEntity.ok(totalMoney);
    }




}
