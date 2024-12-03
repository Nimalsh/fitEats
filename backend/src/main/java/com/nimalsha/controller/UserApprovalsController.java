package com.nimalsha.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nimalsha.model.UserApproval;
import com.nimalsha.service.UserApprovalsService;

@RestController
@RequestMapping("/api/user-approvals")
public class UserApprovalsController {
    @Autowired
    private UserApprovalsService userApprovalsService;
    
    @GetMapping("/all")
    public ResponseEntity<List<UserApproval>> getAllApprovals() {
        List<UserApproval> approvals = userApprovalsService.getAllApprovals();

        return new ResponseEntity<>(approvals, HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<UserApproval> saveApproval(@RequestBody UserApproval userApproval) {
        UserApproval approval = userApprovalsService.addUserApproval(userApproval);

        return new ResponseEntity<>(approval, HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<UserApproval> updateApproval(@PathVariable String id, @RequestBody UserApproval userApproval) {
        return new ResponseEntity<>(userApprovalsService.updateApproval(id, userApproval), HttpStatus.OK);
    }
}
