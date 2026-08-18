package com.example.adminportal.repository;

import com.example.adminportal.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    public Member findMemberById(Long id);
}
