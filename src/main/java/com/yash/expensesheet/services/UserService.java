package com.yash.expensesheet.services;

import com.yash.expensesheet.dto.UserDto;
import com.yash.expensesheet.mappers.UserMapper;
import com.yash.expensesheet.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private UserDto userDto;

    public UserDto createUser(UserDto user) {
        String pwd = passwordEncoder.encode(user.getPassword());
        user.setPassword("{bcrypt}" + pwd);
        UserDetails userDetails = userMapper.mapToDomain(user);
        userRepository.createUser(userDetails);
        return userMapper.mapToDto(userDetails);
    }

    @PreAuthorize("hasRole('admin')")
    public void deleteUser(String username) throws Exception {
        userRepository.deleteUser(username);
    }

    public UserDto updateUser(String username, UserDto user) {
        user.setUserName(username);
        UserDetails userDetails = userMapper.mapToDomain(user);
        userRepository.updateUser(userDetails);
        return userMapper.mapToDto(userDetails);
    }
}
