package com.yash.ExpenseClaims.services;

import com.yash.ExpenseClaims.repositories.ApproveExpenseRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;


@RunWith(MockitoJUnitRunner.class)
public class AccountantServiceTest {

    @InjectMocks
    private AccountantService accountantService;

    @Mock
    private ApproveExpenseRepository repository;

    @Test
    public void shouldReturnStatusByMockingRepository() {
        int expenseID = 25;
        String expectedOuptut = "Submitted";
        when(repository.getExpenseStatusbyExpenseID(expenseID)).thenReturn("Submitted");

        String actualOutput = accountantService.getExpenseStatusbyExpenseID(expenseID);

        assertEquals(expectedOuptut, actualOutput);
        assertFalse("This output is a number", isANumber(actualOutput));
        assertFalse(actualOutput.isEmpty());
        assertNotNull(actualOutput);
    }

    private boolean isANumber(String s) {
        try {
            Double.parseDouble(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

}