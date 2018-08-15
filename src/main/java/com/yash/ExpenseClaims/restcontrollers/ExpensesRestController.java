package com.yash.ExpenseClaims.restcontrollers;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.repositories.ExpensesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class FileUploadRestController {

    @Autowired
    private ExpensesRepository expensesRepository;

    @RequestMapping(value="/expenses", method = POST)
    public void saveAllExpensesToDB(@RequestParam("username") String username,
                           @RequestParam("creationDate") Date creationDate,
                           @RequestParam("reason") String reason,
                           @RequestParam("amount") Double amount,
                           @RequestParam("status") String status,
                           @RequestPart("bills") MultipartFile multipartFile){
        System.out.println("test");
        expensesRepository.saveAllExpenses(username, creationDate, reason, amount, status, multipartFile);
    }

    @RequestMapping(value = "/expenses", method = GET)
    public List<ExpenseDto> retrieveAllExpensesFromDB(@RequestParam("username") String username,
                                                     @RequestParam("startDate") Date startDate,
                                                     @RequestParam("endDate") Date endDate) {
        return expensesRepository.retrieveAllExpenses(username, startDate, endDate);
    }
}