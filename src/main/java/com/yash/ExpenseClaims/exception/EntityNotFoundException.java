package com.yash.ExpenseClaims.exception;

import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Controller
public class EntityNotFoundException extends ResponseStatusException {

    public EntityNotFoundException() {
        super(NOT_FOUND, "resource not found");
    }

}
