package com.yash.ExpenseClaims.repositories;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class EmailRepository {

    @Autowired
    private UserDetailsManager userDetailsManager;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public Map<String, String> getEmailInfo(String username) {

        String sql = "select employee.FirstName AS e_firstname, employee.LastName AS e_lastname, employee.UserEmail AS e_email, " +
                "manager.FirstName AS m_firstname, manager.LastName AS m_lastname, manager.userEmail AS m_email " +
                "from users employee INNER JOIN users manager ON manager.username = employee.ManagerName " +
                "where employee.username = :username";

        Map<String, Object> parameterMap1 = new HashMap<>();
        parameterMap1.put("username", username);

        Map resultMap = namedParameterJdbcTemplate.queryForMap(sql, parameterMap1);
        return resultMap;
    }
}
