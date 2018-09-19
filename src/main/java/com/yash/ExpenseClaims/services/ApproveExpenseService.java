package com.yash.ExpenseClaims.services;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.repositories.ApproveExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class ApproveExpenseService {

    @Autowired
    private ApproveExpenseRepository approveExpenseRepository;

    @Autowired
    private EmailService emailService;

    public List<ExpenseDto> retrieveAllExpenses(String managername, Date startDate, Date endDate) {
        return approveExpenseRepository.retrieveAllExpenses(managername, startDate, endDate);
    }

    public List<ExpenseDto> retrieveSingleExpense(int expenseID) {
        return approveExpenseRepository.retrieveSingleExpense(expenseID);
    }

    public byte[] retrieveSingleFile(int expenseID, int fileID) {
        return approveExpenseRepository.retrieveSingleFile(expenseID, fileID).get(0);
    }

    @Transactional
    public void changeExpenseStatus(ExpenseDto expenseDto) {
        approveExpenseRepository.updateStatusIntoExpenseInfo(expenseDto);
        approveExpenseRepository.insertCommentsIntoCommentsTable(expenseDto);
        sendEmailOnStatusChange(expenseDto);
    }

    private void sendEmailOnStatusChange(ExpenseDto expenseDto) {

        int expenseStatus = expenseDto.getStatusID();
        switch (expenseStatus) {
            case 110:
                emailService.sendEmailToAccounting(expenseDto.getExpenseID());
                break;
            case 120:
                emailService.sendEmailToEmployeeForDeclinedExpense(expenseDto.getExpenseID());
                break;
            case 130:
                emailService.sendEmailToEmployeeForReviewPending(expenseDto.getExpenseID());
                break;
        }
    }
}
