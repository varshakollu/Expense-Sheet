package com.yash.ExpenseClaims.services;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.repositories.ApproveExpenseRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ApproveExpenseServiceTest {

    @InjectMocks
    private ApproveExpenseService service;
    @Mock
    private ApproveExpenseRepository repository;

    @Test
    public void shouldRetrieveAllExpenses() {
        Date startDate = new Date();
        Date endDate = new Date();
        String MANGER = "MANGER";
        List<ExpenseDto> expectedOuptut = Arrays.asList(new ExpenseDto());
        when(repository.retrieveAllExpenses(MANGER, startDate, endDate)).thenReturn(expectedOuptut);

        List<ExpenseDto> actualOutput = service.retrieveAllExpenses(MANGER, startDate, endDate);

        assertEquals(expectedOuptut, actualOutput);
    }

    @Test
    public void shouldChangeExpenseStatus() {

        ExpenseDto expenseDto = new ExpenseDto();
            service.changeExpenseStatus(expenseDto);

        Mockito.verify(repository).updateStatusIntoExpenseInfo(expenseDto);
        Mockito.verify(repository).insertCommentsIntoCommentsTable(expenseDto);
    }
/*
    @Test
    public void shouldChangeExpenseStatus() {
        InOrder order = Mockito.inOrder(repository);

        ExpenseDto expenseDto = new ExpenseDto();
        service.changeExpenseStatus(expenseDto);

        order.verify(repository).updateStatusIntoExpenseInfo(expenseDto);
        order.verify(repository).insertCommentsIntoCommentsTable(expenseDto);
    }

    @Test
    public void name() {
        service.getClass().getMethod("chanceExpenseStatus").getAnnotation()
    }

    @Test
    public void shouldNotSwallowExceptions() {
        RuntimeException expection = new RuntimeException();
        doThrow(expection).when(repository).updateStatusIntoExpenseInfo(null);
        try{
            InOrder
            service.changeExpenseStatus(null);
            fail("should not swallow exception");
        }catch (Exception e){
            assertEquals(expection, e);
        }
    }*/
}