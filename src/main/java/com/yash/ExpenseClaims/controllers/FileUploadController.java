package com.yash.ExpenseClaims.controllers;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.repositories.UploadFilesToDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class FileUploadController {

    @Autowired
    private UploadFilesToDB uploadFilesToDB;

    @RequestMapping(value = "/checkstatus/{username}", method = GET)
    public List<ExpenseDto> checkStatus(@PathVariable(name = "username", value = "username") String username) throws IOException {
        List<ExpenseDto> list = uploadFilesToDB.retrieveAllExpenses(username);
        return list;
    }

    @RequestMapping(value = "/checkStatusWithDateRange", method = RequestMethod.GET)
    public List<ExpenseDto> checkStatusWithDateRange(@RequestParam("username") String username,
                                                     @RequestParam("startDate") Date startDate,
                                                     @RequestParam("endDate") Date endDate) throws IOException, ParseException {
        List<ExpenseDto> list = uploadFilesToDB.retrieveAllExpensesWithDateRange(username, startDate, endDate);
        return list;
    }
}