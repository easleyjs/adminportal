package com.example.adminportal.exception;

public class MemberAlreadyHasUserException extends RuntimeException {
    public MemberAlreadyHasUserException(String message) {
        super(message);
    }
}
