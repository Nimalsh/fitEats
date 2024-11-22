
// Service Implementation
package com.nimalsha.service;

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
    public List<Complaint> getComplaintsByUserId(Long userId) throws Exception {
        return complaintRepository.findByUserId(userId);
    }


    @Override
    public void deleteComplaint(Long id) throws Exception {
        complaintRepository.deleteById(id);
    }
}
