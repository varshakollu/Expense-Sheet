package com.yash.ExpenseClaims.restcontrollers;

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
public class FileUploadRestController {

    @Autowired
    private UploadFilesToDB uploadFilesToDB;

    @PostMapping("/expenses")
    public ModelAndView handleFileUpload(
            @RequestParam("username") String username,
            @RequestParam("amount") Double amount,
            @RequestParam("reason") String reason,
            @RequestParam("file") MultipartFile file) {

        uploadFilesToDB.upload(username, amount, reason, file);
        HashMap<String, String> variables = new HashMap<>();
        variables.put("username", username);
        ModelAndView mv = new ModelAndView("redirect:/success", variables);
        return mv;
    }

    @RequestMapping(value = "/expenses", method = GET)
    public List<ExpenseDto> checkStatusWithDateRange(@RequestParam("username") String username,
                                                     @RequestParam("startDate") Date startDate,
                                                     @RequestParam("endDate") Date endDate) {
        return uploadFilesToDB.retrieveAllExpensesWithDateRange(username, startDate, endDate);
    }
}