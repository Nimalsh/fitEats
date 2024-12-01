package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nimalsha.model.UserApproval;

public interface UserApprovalRepository extends JpaRepository<UserApproval, String> {
}
