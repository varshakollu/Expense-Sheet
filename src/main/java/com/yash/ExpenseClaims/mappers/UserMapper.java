package com.yash.ExpenseClaims.mappers;

import com.yash.ExpenseClaims.dto.UserDto;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class UserMapper {
    public UserDetails mapToDomain(UserDto user) {
        return new User(user.getUserName(), user.getPassword(), user.getEnabled(), true,true,true, new ArrayList<>());
    }

    /*public static Collection<GrantedAuthority> getAuthorities(){
        String ROLE_PREFIX = "ROLE_";
        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
        list.add(new SimpleGrantedAuthority("ROLE_Admin"));
        return list;
    }*/
    public UserDto mapToDto(UserDetails userDetails) {
        UserDto userDto = new UserDto();
        userDto.setUserName(userDetails.getUsername());
        userDto.setEnabled(userDetails.isEnabled());
        return userDto;
    }
}
