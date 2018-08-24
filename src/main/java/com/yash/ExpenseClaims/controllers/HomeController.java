package com.yash.ExpenseClaims.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import java.io.IOException;

@Controller
public class HomeController {

    @GetMapping("/")
    public ModelAndView homeView(Authentication authentication) throws IOException {
        String newUserName = authentication.getName().substring(0, 1).toUpperCase() + authentication.getName().substring(1).toLowerCase();
        ModelMap model = new ModelMap();
        model.addAttribute("currentUserRoles", authentication.getAuthorities().toArray()[0].toString())
             .addAttribute("currentUser", newUserName);
        return new ModelAndView("home", model);
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
            return "login";
    }
}