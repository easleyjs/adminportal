package com.example.adminportal.dto;

import com.example.adminportal.entity.AppUser;
import com.example.adminportal.entity.UserRole;

public record AppUserResponse(
        String firstName,
        String lastName,
        UserRole role
) {
    public static AppUserResponse from(AppUser appUser) {
        return new AppUserResponse(
                appUser.getMember().getFirstName(),
                appUser.getMember().getLastName(),
                appUser.getRole()
        );
    }
}
