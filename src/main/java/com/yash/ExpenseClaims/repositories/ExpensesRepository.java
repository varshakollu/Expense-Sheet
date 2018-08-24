package com.yash.ExpenseClaims.repositories;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.utility.DateUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpensesRepository {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public void saveAllExpenses(String username, Date creationDate, String expenseName, Double amount, String status, MultipartFile[] multipartFile) {

        String SelectSql = "SELECT ManagerName from users where username= :userName";

        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("userName", username);

        String managername = namedParameterJdbcTemplate.queryForObject(SelectSql, parameterMap, String.class);

        KeyHolder keyHolder = new GeneratedKeyHolder();

        String sql = "INSERT INTO ExpenseInfo (userName, creationDate, expenseName, amount, status, managerName) VALUES" +
                "(:userName, :creationDate, :expenseName, :amount, :status, :managerName);";

        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("userName", username)
                .addValue("creationDate", DateUtility.getFormattedDate(creationDate, "yyyy-MM-dd"))
                .addValue("expenseName", expenseName)
                .addValue("amount", amount)
                .addValue("status", status)
                .addValue("managerName", managername);

        namedParameterJdbcTemplate.update(sql, parameters, keyHolder, new String[]{"expenseID"});
        int id = (keyHolder.getKey()).intValue();
        saveExpensesBills(id, multipartFile);

    }

    public void saveExpensesBills(int id, MultipartFile[] multipartFile) {

        for (int i = 0; i < multipartFile.length; i++) {
            InputStream inputStream = null;
            byte[] bytes = null;
            try {
                bytes = multipartFile[i].getBytes();
                inputStream = multipartFile[i].getInputStream();
            } catch (IOException e) {
                e.printStackTrace();
            }
            String sql = "INSERT INTO ExpenseFiles (expenseID, fileName, file,fileType) values (:expenseID, :fileName, :file, :fileType)";

            Map<String, Object> parameterMap = new HashMap<>();
            parameterMap.put("expenseID", id);
            parameterMap.put("fileName", multipartFile[i].getOriginalFilename());
            parameterMap.put("fileType",multipartFile[i].getContentType());
//            parameterMap.put("file", bytes);
            parameterMap.put("file", inputStream);

            namedParameterJdbcTemplate.update(sql, parameterMap);
        }
    }

    public List<ExpenseDto> retrieveAllExpenses(String userName, Date startDate, Date endDate) {

        String sql = "select expenseID, creationDate, amount, expenseName, status from ExpenseInfo " +
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
                expenseDto.setExpenseName(rs.getString(4));
                expenseDto.setStatus(rs.getString(5));
                return expenseDto;
            }
        });
        return list;
    }
}
