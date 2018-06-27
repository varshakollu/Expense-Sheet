package com.yash.ExpenseClaims.services;

import com.yash.ExpenseClaims.dto.RoleDto;
import com.yash.ExpenseClaims.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public RoleDto createRole(String role_name) {
        return roleRepository.createRole(role_name);
    }

    public RoleDto updateRole(int role_id, RoleDto roleDto) {
        roleDto.setRole_id(role_id);
        return roleRepository.updateRole(roleDto);
    }

    public void deleteRole(int role_id) {
        roleRepository.deleteRole(role_id);
    }

    public List<RoleDto> getAllRoles() {
        return roleRepository.getAllRoles();
    }

    public RoleDto getRoleByRoleID(int role_id) {
        return roleRepository.getRoleByRoleID(role_id);
    }


}
