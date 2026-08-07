package com.example.adminportal.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "members")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    //TODO: Set nullable = false, unique = true, updatable = false later
    //System/admin reference id
    @Column(nullable = true, unique = false, updatable = true)
    private UUID membershipId;

    //TODO: Set nullable = false, unique = true, updatable = false later
    //Public-visible, Staff-friendly member reference number "M01234"
    @Column(nullable = true, unique = false, updatable = true)
    private int memberNumber;

    /*
    //TODO: Add sequence to db:
       CREATE SEQUENCE member_number_seq
       START WITH 1001
       INCREMENT BY 1;

    //TODO: Add callable query to repository:
    @Query(value = "SELECT nextval('member_number_seq')", nativeQuery = true)
    Long getNextMemberNumber();

    //TODO: Generate sequence ids in member creation service
    @Transactional
    public Member createMember(...) {
        Member member = new Member();

        member.setMembershipId(UUID.randomUUID());
        member.setMemberNumber(memberRepository.getNextMemberNumber());

        // other fields...

        return memberRepository.save(member);
    }
     */

    @Column(nullable = false, unique = true)
    private String email;

    private String firstName;
    private String lastName;

    @Enumerated(EnumType.STRING)
    private MemberStatus status;

    public Member(
            String firstName,
            String lastName,
            String email,
            UUID membershipId,
            int memberNumber
    ) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.membershipId = membershipId;
        this.memberNumber = memberNumber;
    }
}
