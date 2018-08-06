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

    public boolean isLoogedIn = false;

    @GetMapping("/")
    public ModelAndView homeView(Authentication authentication) throws IOException {
        String userName = authentication.getName();
        String newUserName = userName.substring(0, 1).toUpperCase() + userName.substring(1).toLowerCase();
        isLoogedIn = true;
        ModelMap model = new ModelMap();
        model.addAttribute("currentUserRoles", authentication.getAuthorities().toArray()[0].toString());
        model.addAttribute("currentUser", newUserName);
        return new ModelAndView("home", model);
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView login() {

            ModelAndView modelAndView = new ModelAndView();
            modelAndView.setViewName("login");
            return modelAndView;

    }
}