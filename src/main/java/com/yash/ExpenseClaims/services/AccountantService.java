package com.yash.ExpenseClaims.services;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.repositories.AccountantRepository;
import com.yash.ExpenseClaims.repositories.ApproveExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AccountantService {

    @Autowired
    private AccountantRepository accountantRepository;

    @Autowired
    private ApproveExpenseRepository approveExpenseRepository;

    @Autowired
    private EmailService emailService;

    public List<ExpenseDto> retrieveAllExpenses(Date startDate, Date endDate) {
        return accountantRepository.retrieveAllExpenses(startDate, endDate);
    }

    public void changeExpenseStatus(ExpenseDto expenseDto) {
        approveExpenseRepository.updateStatusIntoExpenseInfo(expenseDto);
        approveExpenseRepository.insertCommentsIntoCommentsTable(expenseDto);
        if (expenseDto.getStatusID() == 160) {
            emailService.sendEmailToManagerOnAccountantComments(expenseDto);
        }
    }

    public String getExpenseStatusbyExpenseID(int expenseID) {
        return approveExpenseRepository.getExpenseStatusbyExpenseID(expenseID);
    }
}
