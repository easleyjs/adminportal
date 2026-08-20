package com.example.adminportal.controller;

import com.example.adminportal.dto.AppUserCreateRequest;
import com.example.adminportal.dto.AppUserResponse;
import com.example.adminportal.dto.MemberResponse;
import com.example.adminportal.entity.AppUser;
import com.example.adminportal.service.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class AppUserController {
    private AppUserService appUserService;

    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping()
    public List<AppUserResponse> findAll() {
        return appUserService.getAllAppUsers();
    }

    @PostMapping
    public ResponseEntity<AppUserResponse> createUser(
            @RequestBody AppUserCreateRequest request
    ) {
        AppUser appUser = appUserService.createUser(request);

        AppUserResponse response = AppUserResponse.from(appUser);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
