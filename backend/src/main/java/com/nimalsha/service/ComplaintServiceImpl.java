package com.nimalsha.service;


import com.nimalsha.model.Complaint;
import com.nimalsha.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Override
    public Complaint createComplaint(Complaint complaint) throws Exception {
        if (complaint == null) {
            throw new Exception("Complaint cannot be null");
        }
        return complaintRepository.save(complaint);
    }

    @Override
    public List<Complaint> getAllComplaints() throws Exception {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint getComplaintById(Long id) throws Exception {
        Optional<Complaint> optionalComplaint = complaintRepository.findById(id);
        if (optionalComplaint.isEmpty()) {
            throw new Exception("Complaint not found with id " + id);
        }
        return optionalComplaint.get();
    }

    @Override
    public void deleteComplaint(Long id) throws Exception {
        if (!complaintRepository.existsById(id)) {
            throw new Exception("Complaint not found with id " + id);
        }
        complaintRepository.deleteById(id);
    }
}
