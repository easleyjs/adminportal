package com.example.adminportal.repository;

import com.example.adminportal.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<AppUser, Long> {}
