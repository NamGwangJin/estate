package com.real.estate.DAO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface userDAO {

    void signUp(String name, String phone, String email, String pw);
    int login(String email, String pw);
    
}
