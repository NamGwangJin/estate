package com.real.estate.DAO;

import org.apache.ibatis.annotations.Mapper;

// 상담문의

@Mapper
public interface MainDAO {
    void inquiryInsert(String name, String contact, String message);
}
