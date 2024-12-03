package com.nimalsha.service;

import java.util.List;

import com.nimalsha.model.UserApproval;

public interface UserApprovalsService {

    List<UserApproval> getAllApprovals();

    UserApproval addUserApproval(UserApproval userApproval);

    UserApproval updateApproval(String id, UserApproval userApproval);

}