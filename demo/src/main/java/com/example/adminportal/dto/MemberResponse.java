package com.example.adminportal.dto;


import com.example.adminportal.entity.Member;

public record MemberResponse(
        String firstName,
        String lastName,
        String email,
        int memberId
) {
    public static MemberResponse from(Member member) {
        return new MemberResponse(
                member.getFirstName(),
                member.getLastName(),
                member.getEmail(),
                member.getMemberNumber()
        );
    }
}
