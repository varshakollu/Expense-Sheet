package com.yash.expensesheet.controllers;

import com.yash.expensesheet.domain.Role;
import com.yash.expensesheet.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<Role> getRoles(List<String> userNames) {
        return roleRepository.findByUserName(userNames);
    }
}
