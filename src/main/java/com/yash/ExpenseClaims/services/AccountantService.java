package com.yash.ExpenseClaims.services;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.repositories.AccountantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AccountantService {

    @Autowired
    private AccountantRepository accountantRepository;

    public List<ExpenseDto> retrieveAllExpenses(Date startDate, Date endDate) {
        return accountantRepository.retrieveAllExpenses(startDate, endDate);
    }
}
