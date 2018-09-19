package com.yash.ExpenseClaims.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Repository;
import java.util.HashMap;
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

    public Map<String,Object> getExpenseInfo(int expenseID) {

        String sql = "SELECT expenseInfo.expenseName, expenseInfo.amount, employee.FirstName AS e_firstname, employee.LastName AS e_lastname, " +
                "manager.FirstName AS m_firstname, manager.LastName AS m_lastname " +
                "from users employee INNER JOIN users manager ON manager.username = employee.ManagerName " +
                "INNER JOIN expenseInfo ON employee.userName = expenseInfo.username " +
                "where expenseInfo.expenseID = :expenseID;";

        Map<String, Object> parameterMap1 = new HashMap<>();
        parameterMap1.put("expenseID", expenseID);

        Map resultMap = namedParameterJdbcTemplate.queryForMap(sql, parameterMap1);
        return resultMap;
    }

    public Map<String,Object> getManagerAndEmployeeInfo(int expenseID) {

        String sql = "SELECT expenseInfo.expenseName, employee.FirstName AS e_firstname, employee.LastName AS e_lastname, employee.UserEmail AS e_email, " +
                "manager.FirstName AS m_firstname, manager.LastName AS m_lastname, manager.UserEmail AS m_email " +
                "from users employee INNER JOIN users manager ON manager.username = employee.ManagerName " +
                "INNER JOIN expenseInfo ON employee.userName = expenseInfo.username " +
                "where expenseInfo.expenseID = :expenseID;";

        Map<String, Object> parameterMap1 = new HashMap<>();
        parameterMap1.put("expenseID", expenseID);

        Map resultMap = namedParameterJdbcTemplate.queryForMap(sql, parameterMap1);
        return resultMap;
    }

    public Map<String,Object> getManagerAndAccountantInfo(int expenseID, String username) {

        String sqlForManagerInfo = "SELECT FirstName AS m_firstname,LastName AS m_lastname,UserEmail AS m_email from users where username =" +
                "(select managerName from expenseinfo where expenseID = :expenseID)";
        Map<String, Object> parameterMap1 = new HashMap<>();
        parameterMap1.put("expenseID", expenseID);
        Map resultMap = namedParameterJdbcTemplate.queryForMap(sqlForManagerInfo, parameterMap1);

        String sqlForAccountantInfo = "SELECT FirstName AS a_firstname,LastName AS a_lastname,UserEmail AS a_email from users where username = :username";
        Map<String, Object> parameterMap2 = new HashMap<>();
        parameterMap2.put("username", username);

        resultMap.putAll(namedParameterJdbcTemplate.queryForMap(sqlForAccountantInfo,parameterMap2));

        return resultMap;
    }
}
