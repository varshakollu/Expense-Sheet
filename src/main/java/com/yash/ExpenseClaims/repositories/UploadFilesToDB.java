package com.yash.ExpenseClaims.repositories;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.utility.DateUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.DataSource;
import javax.validation.Valid;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UploadFilesToDB {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public void upload(@Valid String username,
                       @Valid Double amount,
                       @Valid String reason,
                       @Valid MultipartFile file) {

        String sql = "INSERT INTO Expenses(userName, amount, reason, fileName,fileContent) " +
                "VALUES ('" + username + "','" + amount + "','" + reason + "','" +
                file.getOriginalFilename() + "','" + file + "');";

        jdbcTemplate.execute(sql);
    }

    public List<ExpenseDto> retrieveAllExpenses(String username) {

        String sql = "select creationDate,amount,reason,approvalStatus from expenses where userName = '" + username + "';";

        List<ExpenseDto> list = jdbcTemplate.query(sql, new RowMapper<ExpenseDto>() {

            @Override
            public ExpenseDto mapRow(ResultSet rs, int i) throws SQLException {
                ExpenseDto expenseDto = new ExpenseDto();
                expenseDto.setCreationDate(rs.getDate(1));
                expenseDto.setAmount(rs.getDouble(2));
                expenseDto.setReason(rs.getString(3));
                if (rs.getBoolean(4) == false) {
                    expenseDto.setApprovalStatus("Pending");
                } else {
                    expenseDto.setApprovalStatus("Approved");
                }
                return expenseDto;
            }
        });
        return list;
    }

    public List<ExpenseDto> retrieveAllExpensesWithDateRange(String userName, Date startDate, Date endDate) {

        String sql = "select creationDate,amount,reason,approvalStatus from expenses " +
                "where userName = :userName and creationDate between :startDate and :endDate;";

        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("userName", userName);
        parameterMap.put("startDate", DateUtility.getFormattedDate(startDate, "yyyy-MM-dd"));
        parameterMap.put("endDate", DateUtility.getFormattedDate(endDate, "yyyy-MM-dd"));

        List<ExpenseDto> list = namedParameterJdbcTemplate.query(sql, parameterMap, new RowMapper<ExpenseDto>() {
            @Override
            public ExpenseDto mapRow(ResultSet rs, int i) throws SQLException {
                ExpenseDto expenseDto = new ExpenseDto();
                expenseDto.setCreationDate(rs.getDate(1));
                expenseDto.setAmount(rs.getDouble(2));
                expenseDto.setReason(rs.getString(3));
                if (rs.getBoolean(4) == false) {
                    expenseDto.setApprovalStatus("Pending");
                } else {
                    expenseDto.setApprovalStatus("Approved");
                }
                return expenseDto;
            }
        });
        return list;
    }
}
