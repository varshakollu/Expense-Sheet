package com.yash.ExpenseClaims.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.repositories.UploadFilesToDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class FileUploadController {

    @Autowired
    private UploadFilesToDB uploadFilesToDB;

    @GetMapping("/upload")
    public String UploadedFiles(Model model) throws IOException {
        return "uploadForm";
    }

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

    @GetMapping("/success")
    public ModelAndView listUploadedFiles(@RequestParam(value = "username", required = false) String username) throws IOException {

        List<ExpenseDto> list = uploadFilesToDB.retrieveAllExpenses(username);

        ModelAndView modelAndView = new ModelAndView("success");
        modelAndView.addObject("lists", list);
        return modelAndView;
    }

}