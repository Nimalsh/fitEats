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

    @Override
    public UserApproval updateApproval(String id, UserApproval updatedRequest) {
            return userApprovalsRepository.findById(id).map(existingRequest -> {
        existingRequest.setUserType(updatedRequest.getUserType());
        existingRequest.setUserName(updatedRequest.getUserName());
        existingRequest.setRequestDate(updatedRequest.getRequestDate());
        existingRequest.setFullName(updatedRequest.getFullName());
        existingRequest.setSex(updatedRequest.getSex());
        existingRequest.setAddress(updatedRequest.getAddress());
        existingRequest.setWaiting(updatedRequest.getWaiting());
        return userApprovalsRepository.save(existingRequest);
            }).get();
    }
}
