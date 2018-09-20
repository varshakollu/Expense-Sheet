package com.yash.ExpenseClaims.services;

import com.yash.ExpenseClaims.dto.CommentDto;
import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.repositories.ExpensesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpensesRepository expensesRepository;

    @Autowired
    private EmailService emailService;

    public void saveAllExpenses(String username, Date creationDate, String expenseName, Double amount, MultipartFile[] multipartFile) {
        expensesRepository.saveAllExpenses(username, creationDate, expenseName, amount, multipartFile);
        emailService.sendEmail(username, expenseName);
    }

    public List<ExpenseDto> retrieveAllExpenses(String username, Date startDate, Date endDate) {
        return expensesRepository.retrieveAllExpenses(username, startDate, endDate);
    }

    public List<CommentDto> retrieveAllComments(int expenseID) {
        return expensesRepository.retrieveAllComments(expenseID);
    }

    public void postAnEmployeeComment(int expenseID, String username, String comment, String status, MultipartFile[] multipartFiles) {
        expensesRepository.postAnEmployeeComment(expenseID, username, comment, multipartFiles);
        if (!(status.equalsIgnoreCase("Submitted"))) {
            emailService.sendEmailToManagerOnEmployeeComments(expenseID);
        }
    }
}
