package com.real.estate.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.real.estate.DAO.qnaDAO;
import com.real.estate.DTO.QuestionDTO;

@RestController
public class NamController {

    @Autowired
    private qnaDAO qnaDAO;

    // 질문 작성 완료 시 insert 해주는 코드
    @GetMapping("/api/question/write")    
    public String questionWrite(@RequestParam String title, @RequestParam String content){

        int check = qnaDAO.insertQuestion(title, content, "테스트");
        
        return String.valueOf(check);
    }

    // 질문/답변 메뉴에 접근 시 질문 리스트를 불러오는 코드
    @GetMapping("/api/question/list")
    public ArrayList<QuestionDTO> getList(){
        
        ArrayList<QuestionDTO> boardList = qnaDAO.getBoardList();

        return boardList;
    }

    // 질문/답변 상세 내용 불러오는 코드
    @GetMapping("/api/question/view")
    public QuestionDTO getDetail(@RequestParam int no){
        
        QuestionDTO getDetail = qnaDAO.getDetail(no);

        return getDetail;
    }
    
}
