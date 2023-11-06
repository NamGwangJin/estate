package com.real.estate.DAO;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.real.estate.DTO.QuestionDTO;

@Mapper
public interface qnaDAO {
    
    int insertQuestion(String title, String content, String writer);
    ArrayList<QuestionDTO> getBoardList();

}
