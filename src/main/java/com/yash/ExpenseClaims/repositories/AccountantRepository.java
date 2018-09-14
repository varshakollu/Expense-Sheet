package com.yash.ExpenseClaims.repositories;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.utility.DateUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class AccountantRepository {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<ExpenseDto> retrieveAllExpenses(Date startDate, Date endDate) {

        String sql = "select ExpenseInfo.expenseID, " +
                "employee.FirstName AS e_firstname, employee.LastName AS e_lastname, " +
                "manager.FirstName AS m_firstname, manager.LastName AS m_lastname, " +
                "ExpenseInfo.creationDate, " +
                "ExpenseInfo.expenseName, " +
                "ExpenseInfo.amount, " +
                "expensestatus.statusInfo " +
                "FROM ExpenseInfo INNER JOIN users employee ON ExpenseInfo.userName = employee.username " +
                "INNER JOIN users manager ON manager.username = employee.ManagerName " +
                "INNER JOIN expensestatus ON ExpenseInfo.statusID = expensestatus.statusID " +
                "where expensestatus.statusInfo = 'Sent to Accounting' and " +
                "ExpenseInfo.creationDate between :startDate and :endDate;";

        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("startDate", DateUtility.getFormattedDate(startDate, "yyyy-MM-dd"));
        parameterMap.put("endDate", DateUtility.getFormattedDate(endDate, "yyyy-MM-dd"));

        List<ExpenseDto> list = namedParameterJdbcTemplate.query(sql, parameterMap, new RowMapper<ExpenseDto>() {
            @Override
            public ExpenseDto mapRow(ResultSet rs, int i) throws SQLException {
                ExpenseDto expenseDto = new ExpenseDto();
                expenseDto.setExpenseID(rs.getInt(1));
                expenseDto.setFirstName(rs.getString(2));
                expenseDto.setLastName(rs.getString(3));
                expenseDto.setManagerFirstName(rs.getString(4));
                expenseDto.setManagerLastName(rs.getString(5));
                expenseDto.setCreationDate(rs.getDate(6));
                expenseDto.setExpenseName(rs.getString(7));
                expenseDto.setAmount(rs.getDouble(8));
                expenseDto.setStatusInfo(rs.getString(9));
                return expenseDto;
            }
        });
        return list;
    }
}
