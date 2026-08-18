package com.example.adminportal.dto;

import com.example.adminportal.entity.UserRole;

import java.util.UUID;

public record AppUserCreateRequest(
        UUID memberId,
        String username,
        String password,
        UserRole role
) {}
