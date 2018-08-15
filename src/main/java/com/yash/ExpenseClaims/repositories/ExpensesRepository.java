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
import java.io.IOException;
import java.io.InputStream;
import java.sql.PreparedStatement;
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

    public void saveAllExpenses(String username, Date creationDate, String reason, Double amount, String status, MultipartFile multipartFile) {

        String sql = "INSERT INTO ExpenseInfo (userName, creationDate, reason, amount, status) VALUES" +
                "(:userName, :creationDate, :reason, :amount, :status);";

        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("userName", username);
        parameterMap.put("creationDate", DateUtility.getFormattedDate(creationDate, "yyyy-MM-dd"));
        parameterMap.put("reason", reason);
        parameterMap.put("amount", amount);
        parameterMap.put("status", status);

        namedParameterJdbcTemplate.update(sql, parameterMap);
    }

    public List<ExpenseDto> retrieveAllExpenses(String userName, Date startDate, Date endDate) {

        String sql = "select expenseID, creationDate, amount, reason, status from ExpenseInfo " +
                "where userName = :userName and creationDate between :startDate and :endDate;";

        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("userName", userName);
        parameterMap.put("startDate", DateUtility.getFormattedDate(startDate, "yyyy-MM-dd"));
        parameterMap.put("endDate", DateUtility.getFormattedDate(endDate, "yyyy-MM-dd"));

        List<ExpenseDto> list = namedParameterJdbcTemplate.query(sql, parameterMap, new RowMapper<ExpenseDto>() {
            @Override
            public ExpenseDto mapRow(ResultSet rs, int i) throws SQLException {
                ExpenseDto expenseDto = new ExpenseDto();
                expenseDto.setExpenseID(rs.getInt(1));
                expenseDto.setCreationDate(rs.getDate(2));
                expenseDto.setAmount(rs.getDouble(3));
                expenseDto.setReason(rs.getString(4));
                expenseDto.setStatus(rs.getString(5));
                return expenseDto;
            }
        });
        return list;
    }

    public void uploadExpensesToDatabase1(MultipartFile multipartFile) {

        InputStream inputStream = null;
        try {
            inputStream = multipartFile.getInputStream();
        } catch (IOException e) {
            e.printStackTrace();
        }
        String sql = "INSERT INTO billsfiles (fileContent) values (:userName)";


        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("userName", inputStream);

        namedParameterJdbcTemplate.update(sql, parameterMap);
    }
}
