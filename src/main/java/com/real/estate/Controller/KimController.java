package com.real.estate.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.real.estate.DAO.MainDAO;

@RestController
public class KimController {

    @Autowired
    private MainDAO mDAO;

    @GetMapping("/api/inquiryInsert")
    public String inquiryInsert(@RequestParam String name, @RequestParam String contact, @RequestParam String message){
        
        mDAO.inquiryInsert(name, contact, message);

        return "success";
    }
}
