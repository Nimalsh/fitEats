
// Service Implementation
package com.nimalsha.service.impl;

import com.nimalsha.model.Complaint;
import com.nimalsha.repository.ComplaintRepository;
import com.nimalsha.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Override
    public Complaint createComplaint(Complaint complaint) throws Exception {
        return complaintRepository.save(complaint);
    }

    @Override
    public List<Complaint> getAllComplaints() throws Exception {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint getComplaintById(Long id) throws Exception {
        return complaintRepository.findById(id).orElseThrow(() -> new Exception("Complaint not found"));
    }

    @Override
    public void deleteComplaint(Long id) throws Exception {
        complaintRepository.deleteById(id);
    }
}
