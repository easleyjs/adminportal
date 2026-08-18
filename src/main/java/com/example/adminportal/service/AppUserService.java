package com.example.adminportal.service;

import com.example.adminportal.dto.AppUserCreateRequest;
import com.example.adminportal.entity.AppUser;
import com.example.adminportal.entity.Member;
import com.example.adminportal.repository.MemberRepository;
import com.example.adminportal.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {
    private UserRepository appUserRepo;
    private MemberRepository memberRepo;

    public AppUserService(
            UserRepository appUserRepo,
            MemberRepository memberRepo
    ) {
        this.appUserRepo = appUserRepo;
        this.memberRepo = memberRepo;
    }

    public AppUser createUser(AppUserCreateRequest request) {

        Member member = memberRepo.findMemberByMemberId(request.memberId());
                /*
                .orElseThrow(() ->
                        new MemberNotFoundException(request.memberId()));
                */
        if (appUserRepo.existsByMember_Id((member.getId()))) {
            //throw new AppUserAlreadyExistsException(member.getId());
        }

        AppUser appUser = new AppUser(
                member,
                request.username(),
                request.password(), //passwordEncoder.encode(request.password()),
                request.role()
        );

        return appUserRepo.save(appUser);
    }
}
