package com.example.adminportal.dto;

public record MemberCreateRequest(
        String firstName,
        String lastName,
        String email
) {}
