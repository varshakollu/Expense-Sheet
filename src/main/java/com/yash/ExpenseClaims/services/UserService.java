package com.yash.ExpenseClaims.services;

import com.yash.ExpenseClaims.dto.UserDto;
import com.yash.ExpenseClaims.mappers.UserMapper;
import com.yash.ExpenseClaims.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserService userService;

    public UserDto createUser(UserDto user) {
        UserDetails userDetails = userMapper.mapToDomain(user);
        userRepository.createUser(userDetails);
        return userMapper.mapToDto(userDetails);
    }

    @PreAuthorize("hasRole('admin')")
    public void deleteUser(String username) {
        userRepository.deleteUser(username);
    }

    public UserDto updateUser(String username, UserDto user) {
        user.setUserName(username);
        UserDetails userDetails = userMapper.mapToDomain(user);
        userRepository.updateUser(userDetails);
        return userMapper.mapToDto(userDetails);
    }

    public List<UserDto> getAllUsers() {
        List<UserDetails> users = userRepository.getAllUsers();
        return users
                .stream()
                .map(user -> userMapper.mapToDto(user))
                .collect(Collectors.toList());
    }

    public UserDto getUserByUserName(String username) {

        UserDetails userDetails = userRepository.getUserByUserName(username);
        return userMapper.mapToDto(userDetails);
    }
}
