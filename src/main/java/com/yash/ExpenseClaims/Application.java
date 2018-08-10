package com.yash.ExpenseClaims;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import static org.springframework.boot.Banner.Mode.OFF;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
//        SpringApplication springApplication = new SpringApplication(Application.class);
//        springApplication.setBannerMode(OFF);
//        springApplication.run(args);
        new SpringApplicationBuilder(Application.class).bannerMode(OFF).run(args);
    }
}