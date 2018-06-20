package com.yash.expensesheet.exception;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

public class EntityNotFoundException extends ResponseStatusException {

    public EntityNotFoundException() {
        super(NOT_FOUND, "resource not found");
    }
}
