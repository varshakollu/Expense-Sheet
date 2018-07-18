package com.yash.ExpenseClaims.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.repositories.UploadFilesToDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class FileUploadController {

    @Autowired
    private UploadFilesToDB uploadFilesToDB;

    @PostMapping("/upload")
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

    @RequestMapping(value = "/checkstatus/{username}", method = GET)
    public List<ExpenseDto> checkStatus(@PathVariable(name = "username", value = "username") String username) throws IOException {
        List<ExpenseDto> list = uploadFilesToDB.retrieveAllExpenses(username);
        return list;
    }
}