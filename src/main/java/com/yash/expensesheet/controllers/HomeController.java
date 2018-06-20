package com.yash.expensesheet.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
@RequestMapping("/home")
public class HomeController {

    @Autowired
    JdbcTemplate jdbcUserDetailsManager;

    @RequestMapping(method = GET)
    public String homePage() {
        return "home";
    }

    /*@RequestMapping(value = "/createUser", method = RequestMethod.POST)
    public String createUser(HttpServletRequest httpServletRequest,
                           @RequestParam(value = "firstname") String firstName,
                           @RequestParam(value = "lastname") String lastName,
                           @RequestParam(value = "email") String email,
                           @RequestParam(value = "phone") int phone,
                           @RequestParam(value = "username") String username,
                           @RequestParam(value = "password") String password
                           ) {



        String sql = "INSERT INTO UsersInfo(firstname,lastname,email,phone,username,password)" +
                "VALUES('"+firstName+"','"+lastName+"','"+email+"',"+phone+",'"+username+"','"+pwd+"');";


        jdbcUserDetailsManager.execute(sql);

        System.out.println("create user called" + username);
        System.out.println("The query is" + sql);
        return "home";
    }*/
}

