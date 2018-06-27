package com.yash.ExpenseClaims.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.Principal;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class HomeController {

    @GetMapping("/")
    public ModelAndView UploadedFiles(Authentication authentication) throws IOException {
        Optional<? extends GrantedAuthority> isAdmin = authentication.getAuthorities()
                .stream()
                .filter(auth -> auth.getAuthority().equalsIgnoreCase("ROLE_admin"))
                .findFirst();

        ModelMap model = new ModelMap();
        model.put("user", authentication.getPrincipal());
        return new ModelAndView("home", model);
    }

    @RequestMapping("/userCreateView")
    public String usercreationview(Model model) {
        return "createUser";
    }

    @RequestMapping("/userUpdateView")
    public String userUpdateView(Model model) {
        return "updateUser";
    }

    @RequestMapping("/userDeleteView")
    public String userDeleteView(Model model) {
        return "deleteUser";
    }
}