package com.yash.ExpenseClaims.repositories;

import com.yash.ExpenseClaims.dto.ExpenseDto;
import com.yash.ExpenseClaims.services.EmailService;
import com.yash.ExpenseClaims.utility.DateUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Blob;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ApproveExpenseRepository {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Autowired
    private EmailService emailService;

    public List<ExpenseDto> retrieveAllExpenses(String managername, Date startDate, Date endDate) {

        String sql = "select ExpenseInfo.expenseID, users.FirstName, users.LastName, ExpenseInfo.creationDate, " +
                "ExpenseInfo.expenseName, ExpenseInfo.amount, expensestatus.statusInfo " +
                "FROM ExpenseInfo INNER JOIN users ON ExpenseInfo.userName = users.username " +
                "INNER JOIN expensestatus ON ExpenseInfo.statusID = expensestatus.statusID " +
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
                expenseDto.setStatusInfo(rs.getString(7));
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

    public void updateStatusIntoExpenseInfo(ExpenseDto expenseDto) {
        String UpdateSql = "UPDATE expenseinfo SET statusID = :statusID where expenseinfo.expenseID= :expenseID";

        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("statusID", expenseDto.getStatusID());
        parameterMap.put("expenseID", expenseDto.getExpenseID());

        namedParameterJdbcTemplate.update(UpdateSql, parameterMap);
    }

    public void insertCommentsIntoCommentsTable(ExpenseDto expenseDto) {
        String sql = "INSERT INTO comments (expenseID, username, commentedDate, comment) VALUES" +
                "(:expenseID, :username, :commentedDate, :comment);";

        Map<String, Object> parameterMap1 = new HashMap<>();
        parameterMap1.put("expenseID", expenseDto.getExpenseID());
        parameterMap1.put("username", expenseDto.getUsername());
        parameterMap1.put("commentedDate", new Date());
        parameterMap1.put("comment", expenseDto.getComment());

        namedParameterJdbcTemplate.update(sql, parameterMap1);
    }

    public String getExpenseStatusbyExpenseID(int expenseID) {
        String sql = "SELECT expensestatus.statusInfo from expenseInfo JOIN expensestatus ON expenseInfo.statusID = expensestatus.statusID where expenseInfo.expenseID = :expenseID";

        Map<String, Object> parameterMap1 = new HashMap<>();
        parameterMap1.put("expenseID", expenseID);

        return namedParameterJdbcTemplate.queryForObject(sql, parameterMap1, String.class);
    }
}