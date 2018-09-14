package com.yash.ExpenseClaims.restcontrollers;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.services.AccountantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class AccountantRestController {

    @Autowired
    private AccountantService accountantService;

    @RequestMapping(value = "/accountantApprovals", method = GET)
    public List<ExpenseDto> retrieveAllExpensesFromDB(@RequestParam("startDate") Date startDate,
                                                      @RequestParam("endDate") Date endDate) {
        return accountantService.retrieveAllExpenses(startDate, endDate);
    }
}
