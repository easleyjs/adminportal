package com.example.adminportal.repository;

import com.example.adminportal.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, Long> {
    public Member findMemberById(Long id);

    public Member findMemberByMemberId(UUID uuid);
}
