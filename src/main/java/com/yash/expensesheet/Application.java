package com.yash.expensesheet;

import com.yash.expensesheet.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.provisioning.JdbcUserDetailsManager;

import static org.springframework.boot.Banner.Mode.OFF;

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableJpaRepositories
public class Application {

    @Autowired
    private JdbcUserDetailsManager jdbcUserDetailsManager;
    @Autowired
    private UserMapper userMapper;

    public static void main(String[] args) throws Throwable {
        SpringApplication springApplication = new SpringApplication(Application.class);
        springApplication.setBannerMode(OFF);
        springApplication.run(args);
    }
}