package com.real.estate.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.real.estate.DAO.MainDAO;
import com.real.estate.DTO.NewsDTO;

@RestController
public class KimController {

    @Autowired
    private MainDAO mDAO;

    @GetMapping("/api/inquiryInsert")
    public String inquiryInsert(@RequestParam String name, @RequestParam String contact, @RequestParam String message) {

        mDAO.inquiryInsert(name, contact, message);

        return "success";
    }

    @GetMapping("/api/newsInsert")
    public String newsInsert(@RequestParam String news_title, @RequestParam String news_content,
            @RequestParam String news_link) {

        mDAO.newsInsert(news_title, news_content, news_link);

        return "success";

    }

    @GetMapping("/api/newslist")
    public ArrayList<NewsDTO> getListNews() {
        ArrayList<NewsDTO> newsList = mDAO.getListNews();

        return newsList;
    }

    @PostMapping("/api/requestInsert")
    public String requestInsert(@RequestParam String selectedType, @RequestParam String transactionType, @RequestParam String location, @RequestParam String desiredAmount, @RequestParam String propertyType, @RequestParam String name, @RequestParam String contact, @RequestParam String title, @RequestParam String content){

        mDAO.requestInsert(selectedType, transactionType, location, desiredAmount, propertyType, name, contact, title, content);
        System.out.println("내용들=" + selectedType + " " + transactionType + " " + location + " " + desiredAmount + " " + propertyType + " " + name + " " + contact + " " + title + " " + content);


        return "success";
    }

    @PostMapping("/api/officetel_Insert")
    public String officetel_Insert(@RequestParam String product_type, @RequestParam String location, @RequestParam String building_name, @RequestParam String building_use, @RequestParam String extent, @RequestParam String address, @RequestParam String floor, @RequestParam String floor_open,@RequestParam String direction_criteria, @RequestParam String direction, @RequestParam String entrance, @RequestParam String rooms, @RequestParam String bathroom, @RequestParam String roomuse, @RequestParam String inner_structure,@RequestParam String administration_cost, @RequestParam String maintenance, @RequestParam String managementCost_includ){

        
        return "success";
    }
}
