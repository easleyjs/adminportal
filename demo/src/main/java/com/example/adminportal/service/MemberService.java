package com.example.adminportal.service;

import com.example.adminportal.dto.MemberResponse;
import com.example.adminportal.entity.Member;
import com.example.adminportal.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {
    MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public List<MemberResponse> getAllMembers() {
        return memberRepository.findAll()
                .stream()
                .map(MemberResponse::from)
                .toList();
    }

    public MemberResponse findMemberById(Long id) {
        return MemberResponse.from(memberRepository.findById(id).get());
    }
}
