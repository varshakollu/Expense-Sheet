package com.yash.expensesheet.repositories;


import com.yash.expensesheet.domain.Role;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface RoleRepository extends Repository<Role, Long> {
    public List<Role> findByUserName(List<String> userNames);
}
