package com.yash.expensesheet.controllers;

import com.yash.expensesheet.dto.UserDto;
import com.yash.expensesheet.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(
        value = "/users")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.POST)
    public UserDto createUser(@RequestBody @Valid UserDto userDto) {
        return userService.createUser(userDto);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable(name = "username", value = "username") String username) throws Exception {
        userService.deleteUser(username);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.PUT)
    public UserDto updateUser(@PathVariable(name = "username", value = "username") String username, @RequestBody UserDto userDto) {
        return userService.updateUser(username, userDto);
    }
}
