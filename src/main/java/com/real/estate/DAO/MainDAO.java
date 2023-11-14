package com.real.estate.DAO;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.real.estate.DTO.NewsDTO;

// 상담문의,뉴스

@Mapper
public interface MainDAO {
    void inquiryInsert(String name, String contact, String message);

    void newsInsert(String news_title, String news_content, String news_link);

    ArrayList<NewsDTO> getListNews();

    void requestInsert(String selectedType, String transactionType, String location, String desiredAmount, String propertyType, String name, String contact, String title, String content);
}
