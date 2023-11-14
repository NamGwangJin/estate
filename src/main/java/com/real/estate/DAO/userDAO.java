package com.real.estate.DAO;

import org.apache.ibatis.annotations.Mapper;

import com.real.estate.DTO.UserDTO;

@Mapper
public interface userDAO {

    void signUp(String name, String phone, String email, String pw);
    int login(String email, String pw);
    UserDTO getUserInfo(String id);
    
}
