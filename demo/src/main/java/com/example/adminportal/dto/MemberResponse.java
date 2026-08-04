package com.example.adminportal.dto;


import com.example.adminportal.entity.Member;

public record MemberResponse(
        Long id,
        String firstName,
        String lastName,
        String email
) {
    public static MemberResponse from(Member member) {
        return new MemberResponse(
                member.getId(),
                member.getFirstName(),
                member.getLastName(),
                member.getEmail()
        );
    }
}
