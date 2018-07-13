package com.yash.ExpenseClaims.controllers;

import com.sun.deploy.net.HttpResponse;
import com.yash.ExpenseClaims.dto.UserDto;
import com.yash.ExpenseClaims.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/users", method = POST)
    public UserDto createUser(@RequestBody UserDto userDto) {
        getUsers();
        return userService.createUser(userDto);
    }

    @RequestMapping(value = "/users/{username}", method = PUT)
    public UserDto updateUser(@PathVariable(name = "username", value = "username") String username, @RequestBody UserDto userDto) {
        return userService.updateUser(username, userDto);
    }

    @RequestMapping(value = "/users/{username}", method = DELETE)
    public void deleteUser(@PathVariable(name = "username", value = "username") String username, HttpServletResponse response) {
        userService.deleteUser(username);
        response.setStatus(HttpStatus.OK.value());
    }

    @RequestMapping(value = "/users", method = GET)
    public List<UserDto> getUsers() {
        return userService.getAllUsers();
    }

    @RequestMapping(value = "/users/{username}", method = GET)
    public UserDto getUserByUserName(@PathVariable(name = "username", value = "username") String username) {
        return userService.getUserByUserName(username);
    }

}
