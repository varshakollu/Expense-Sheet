package com.yash.ExpenseClaims.restcontrollers;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.services.AccountantService;
import com.yash.ExpenseClaims.services.ApproveExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class AccountantRestController {

    @Autowired
    private AccountantService accountantService;

    @Autowired
    private ApproveExpenseService approveExpenseService;

    @RequestMapping(value = "/accountantApprovals", method = GET)
    public List<ExpenseDto> retrieveAllExpensesFromDB(@RequestParam("startDate") Date startDate,
                                                      @RequestParam("endDate") Date endDate) {
        return accountantService.retrieveAllExpenses(startDate, endDate);
    }

    @RequestMapping(value = "/accountantApprovals/{expenseID}/status", method = POST)
    public void approvedExpensesForUser(@RequestBody ExpenseDto expenseDto){
        accountantService.changeExpenseStatus(expenseDto);
    }
}
