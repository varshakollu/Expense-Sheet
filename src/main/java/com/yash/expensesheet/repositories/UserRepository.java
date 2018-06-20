package com.yash.expensesheet.repositories;

import com.yash.expensesheet.exception.EntityAlreadyExistException;
import com.yash.expensesheet.exception.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    @Autowired
    private UserDetailsManager userDetailsManager;

    public UserDetails createUser(UserDetails user) {
        try {

            userDetailsManager.createUser(user);
            return user;
        } catch (DuplicateKeyException exception) {
            throw new EntityAlreadyExistException();
        }
    }

    public void deleteUser(String username) throws Exception {
        if (userDetailsManager.userExists(username)) {
            userDetailsManager.deleteUser(username);
        } else {
            throw new EntityNotFoundException();
        }
    }

    public UserDetails updateUser(UserDetails user) {
        if (userDetailsManager.userExists(user.getUsername())) {

        }
        userDetailsManager.updateUser(user);
        return user;
    }
}
