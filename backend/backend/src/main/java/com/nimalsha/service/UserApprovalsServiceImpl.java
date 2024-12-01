package com.nimalsha.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nimalsha.model.UserApproval;
import com.nimalsha.repository.UserApprovalRepository;

@Service
public class UserApprovalsServiceImpl implements UserApprovalsService {
    @Autowired
    private UserApprovalRepository userApprovalsRepository;
    
    @Override
    public List<UserApproval> getAllApprovals() {
        return userApprovalsRepository.findAll();
    }

    @Override
    public UserApproval addUserApproval(UserApproval userApproval) {
        UserApproval approval = userApprovalsRepository.save(userApproval);

        return approval;
    }
}
