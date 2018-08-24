package com.yash.ExpenseClaims.repositories;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.utility.DateUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Blob;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApproveExpenseRepository {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<ExpenseDto> retrieveAllExpenses(String managername, Date startDate, Date endDate) {

        String sql = "select ExpenseInfo.expenseID, users.FirstName, users.LastName, ExpenseInfo.creationDate, " +
                "ExpenseInfo.expenseName, ExpenseInfo.amount, ExpenseInfo.status " +
                "FROM ExpenseInfo INNER JOIN users ON ExpenseInfo.userName = users.username " +
                "where ExpenseInfo.managerName = :managername and creationDate between :startDate and :endDate;";

        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("managername", managername);
        parameterMap.put("startDate", DateUtility.getFormattedDate(startDate, "yyyy-MM-dd"));
        parameterMap.put("endDate", DateUtility.getFormattedDate(endDate, "yyyy-MM-dd"));

        List<ExpenseDto> list = namedParameterJdbcTemplate.query(sql, parameterMap, new RowMapper<ExpenseDto>() {
            @Override
            public ExpenseDto mapRow(ResultSet rs, int i) throws SQLException {
                ExpenseDto expenseDto = new ExpenseDto();
                expenseDto.setExpenseID(rs.getInt(1));
                expenseDto.setFirstName(rs.getString(2));
                expenseDto.setLastName(rs.getString(3));
                expenseDto.setCreationDate(rs.getDate(4));
                expenseDto.setExpenseName(rs.getString(5));
                expenseDto.setAmount(rs.getDouble(6));
                expenseDto.setStatus(rs.getString(7));
                return expenseDto;
            }
        });
        return list;
    }

    public List<ExpenseDto> retrieveSingleExpense(int expenseID) {

        String sql = "select fileID, fileType, filename FROM expensefiles where expenseID = :expenseID;";

        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("expenseID", expenseID);

        List<ExpenseDto> list = namedParameterJdbcTemplate.query(sql, parameterMap, new RowMapper<ExpenseDto>() {
            @Override
            public ExpenseDto mapRow(ResultSet rs, int i) throws SQLException {
                ExpenseDto expenseDto = new ExpenseDto();
                expenseDto.setFileID(rs.getInt(1));
                expenseDto.setFileType(rs.getString(2));
                expenseDto.setFileName(rs.getString(3));
                return expenseDto;
            }
        });
        return list;
    }

    public List<byte[]> retrieveSingleFile(int expenseID, int fileID) {
        String sql = "select file FROM expensefiles where expenseID = :expenseID AND fileID = :fileID;";

        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("expenseID", expenseID);
        parameterMap.put("fileID", fileID);

        List<byte[]> list = namedParameterJdbcTemplate.query(sql, parameterMap, new RowMapper<byte[]>() {
            @Override
            public byte[] mapRow(ResultSet rs, int i) throws SQLException {
                Blob blob = rs.getBlob(1);
                return blob.getBytes(1, (int) blob.length());
            }
        });
        return list;

    }
}
