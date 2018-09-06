package com.yash.ExpenseClaims.restcontrollers;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.repositories.ApproveExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class ApproveExpenseRestController {

    @Autowired
    private ApproveExpenseRepository approveExpenseRepository;

    @RequestMapping(value = "/approvals", method = GET)
    public List<ExpenseDto> retrieveAllExpensesFromDB(@RequestParam("managername") String managername,
                                                      @RequestParam("startDate") Date startDate,
                                                      @RequestParam("endDate") Date endDate) {
        return approveExpenseRepository.retrieveAllExpenses(managername, startDate, endDate);
    }

    @RequestMapping(value = "/approvals/{expenseID}", method = GET)
    public List<ExpenseDto> retrieveParticularExpenseFromDB(@PathVariable("expenseID") int expenseID) {
        return approveExpenseRepository.retrieveSingleExpense(expenseID);
    }

    @RequestMapping(value = "/approvals/{expenseID}/file/{fileID}", method = GET)
    public byte[] retrieveExpenseFileFromDB(@PathVariable("expenseID") int expenseID,
                                            @PathVariable("fileID") int fileID){
        return approveExpenseRepository.retrieveSingleFile(expenseID, fileID).get(0);
    }

    @RequestMapping(value = "/expense/{expenseID}/status", method = POST)
    public void approvedExpensesForUser(@RequestBody ExpenseDto expenseDto){
        approveExpenseRepository.changeExpenseStatus(expenseDto);
    }
}
