package com.yash.ExpenseClaims.exception;

import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

public class EntityAlreadyExistException extends ResponseStatusException {
    public EntityAlreadyExistException() {
        super(BAD_REQUEST, "resource already exist");
    }
}
