package com.yash.ExpenseClaims.repositories;

import com.yash.ExpenseClaims.dto.RoleDto;
import com.yash.ExpenseClaims.exception.EntityAlreadyExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.sql.*;
import java.util.Collections;
import java.util.List;

@Component
public class RoleRepository {

    public static final String INSERT_SQL = "INSERT INTO APP_ROLES(role_name) VALUES(?)";

    public static final String UPDATE_SQL = "UPDATE APP_ROLES SET ROLE_NAME = ? WHERE ROLE_ID = ?";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RoleDto roleDto;

    public RoleDto createRole(String role_name) {
        try{
            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement ps = con.prepareStatement(INSERT_SQL);
                    ps.setString(1,role_name);
                    return ps;
                }
            });
        }catch (Exception e){
            throw new EntityAlreadyExistException();
        }

        String Select_sql= "SELECT * FROM APP_ROLES WHERE ROLE_NAME= '"+role_name+"';";

        return jdbcTemplate.queryForObject(Select_sql, new RowMapper<RoleDto>() {

            @Override
            public RoleDto mapRow(ResultSet rs, int rowNum) throws SQLException {
                RoleDto innerRoleDto = new RoleDto();
                innerRoleDto.setRole_id(rs.getInt(1));
                innerRoleDto.setRole_name(rs.getString(2));
                return innerRoleDto;
            }
        });
    }

    public RoleDto updateRole(RoleDto roleDto) {
        Object[] params = {roleDto.getRole_id(), roleDto.getRole_name()};
        int[] types={Types.INTEGER, Types.VARCHAR};

        jdbcTemplate.update(UPDATE_SQL, params, types);


        /*String UPDATE_SQL = "UPDATE APP_ROLES SET ROLE_NAME='" + roleDto.getRole_name() + "' WHERE ROLE_ID="+roleDto.getRole_id()+";";
        jdbcTemplate.update(UPDATE_SQL);
        */
        return roleDto;
    }

    public void deleteRole(int role_id) {
        String sql = "Delete from APP_ROLES where role_id = '" + role_id +"';";
        jdbcTemplate.execute(sql);
    }

    public List<RoleDto> getAllRoles() {
        return jdbcTemplate.query("select * from APP_ROLES", (resultSet, i) -> new RoleDto(
                resultSet.getInt("role_id"),
                resultSet.getString("role_name")
        ));
    }

    public RoleDto getRoleByRoleID(int role_id) {
        String sql = "select * from APP_ROLES where role_id = '" + role_id +"';";
        return jdbcTemplate.queryForObject(sql, (resultSet, i) -> new RoleDto(
                resultSet.getInt("role_id"),
                resultSet.getString("role_name")
        ));
    }
}
