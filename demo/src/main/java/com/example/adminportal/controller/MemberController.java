package com.example.adminportal.controller;

import com.example.adminportal.dto.MemberResponse;
import com.example.adminportal.entity.Member;
import com.example.adminportal.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MemberController {
    MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/members")
    public List<MemberResponse> findAll() {
        return memberService.getAllMembers();
    }

    @GetMapping("/members/{id}")
    public MemberResponse findById(@PathVariable Long id) {
        return memberService.findMemberById(id);
    }

}
