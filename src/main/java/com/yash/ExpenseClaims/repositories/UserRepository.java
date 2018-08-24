package com.yash.ExpenseClaims.repositories;

import com.yash.ExpenseClaims.dto.UserDto;
import com.yash.ExpenseClaims.exception.EntityAlreadyExistException;
import com.yash.ExpenseClaims.exception.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    private UserDetailsManager userDetailsManager;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public UserDetails createUser(UserDetails user) {
        try {
            userDetailsManager.createUser(user);
            return user;
        } catch (DuplicateKeyException exception) {
            throw new EntityAlreadyExistException();
        }
    }

    public void deleteUser(String username) {
        if (userDetailsManager.userExists(username)) {
            userDetailsManager.deleteUser(username);
        } else {
            throw new EntityNotFoundException();
        }
    }

    public UserDetails updateUser(UserDetails user) {
        if (userDetailsManager.userExists(user.getUsername())) {
            userDetailsManager.updateUser(user);
        } else {
            throw new EntityNotFoundException();
        }
        return user;
    }

    public List<UserDetails> getAllUsers() {
        return jdbcTemplate.query("select * from users", (resultSet, i) -> new User(
                resultSet.getString("username"),
                "",
                Collections.emptyList()
        ));
    }

    public UserDetails getUserByUserName(String username) {
        String sql = "select * from users where username = '" + username +"';";
        return jdbcTemplate.queryForObject(sql,(resultSet,i)-> new User(
                resultSet.getString("username"),
                "",
                Collections.emptyList()
        ));
    }
}
