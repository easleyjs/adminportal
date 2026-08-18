package com.example.adminportal.repository;

import com.example.adminportal.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<AppUser,Long> {
    public AppUser existsByMember_Id(long id);

    boolean existsByMember_Id(Long memberId);
}
