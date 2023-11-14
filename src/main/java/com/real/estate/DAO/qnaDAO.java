package com.real.estate.DAO;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.real.estate.DTO.QuestionDTO;
import com.real.estate.DTO.TourDTO;

@Mapper
public interface qnaDAO {
    
    int insertQuestion(String title, String content, String writer);
    ArrayList<QuestionDTO> getBoardList();
    QuestionDTO getDetail(int no);
    void tourApliy(String date, String time, String local, String name, String phone, String content, String writer, String created);
    ArrayList<TourDTO> getTourList();

}
