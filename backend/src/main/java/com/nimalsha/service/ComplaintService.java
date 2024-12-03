package com.nimalsha.service;

import com.nimalsha.model.Complaint;
import java.util.List;


public interface ComplaintService {

    Complaint createComplaint(Complaint complaint) throws Exception;

    List<Complaint> getAllComplaints() throws Exception;

    Complaint getComplaintById(Long id) throws Exception;

    void deleteComplaint(Long id) throws Exception;
}
