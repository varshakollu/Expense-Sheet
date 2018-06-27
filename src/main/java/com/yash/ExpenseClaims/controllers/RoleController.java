package com.yash.ExpenseClaims.controllers;

import com.yash.ExpenseClaims.dto.RoleDto;
import com.yash.ExpenseClaims.dto.UserDto;
import com.yash.ExpenseClaims.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class RoleController {

    @Autowired
    private RoleService roleService;

    @RequestMapping(value = "/roles", method = POST)
    public RoleDto createRole(@RequestBody RoleDto roleDto) {
        return roleService.createRole(roleDto.getRole_name());
    }

    @RequestMapping(value = "/roles/{role_id}", method = PUT)
    public RoleDto updateRole(@PathVariable(name = "role_id", value = "role_id") int role_id, @RequestBody RoleDto roleDto) {
        return roleService.updateRole(role_id, roleDto);
    }

    @RequestMapping(value = "/roles/{role_id}", method = DELETE)
    public void deleteUser(@PathVariable(name = "role_id", value = "role_id") int role_id, HttpServletResponse response) {
        roleService.deleteRole(role_id);
        response.setStatus(HttpStatus.OK.value());
    }

    @RequestMapping(value = "/roles", method = GET)
    public List<RoleDto> getRoles() {
        return roleService.getAllRoles();
    }

    @RequestMapping(value = "/roles/{role_id}", method = GET)
    public RoleDto getRoleByRoleID(@PathVariable(name = "role_id", value = "role_id") int role_id) {
        return roleService.getRoleByRoleID(role_id);
    }
}
