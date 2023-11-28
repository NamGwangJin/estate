package com.real.estate.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.real.estate.DAO.ProductDAO;
import com.real.estate.DAO.qnaDAO;
import com.real.estate.DAO.userDAO;
import com.real.estate.DTO.ProductDTO;
import com.real.estate.DTO.QuestionDTO;
import com.real.estate.DTO.TourDTO;
import com.real.estate.DTO.UserDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class NamController {

    @Autowired
    private qnaDAO qnaDAO;
    
    @Autowired
    private userDAO userDAO;

    @Autowired
    private ProductDAO pDAO;

    // 현재 시간 가져오기
    LocalDateTime currentTime = LocalDateTime.now();

    // 원하는 형식으로 포맷팅하기
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String now = currentTime.format(formatter);

    // 질문 작성 완료 시 insert 해주는 코드
    @GetMapping("/api/question/write")    
    public String questionWrite(@RequestParam String title, @RequestParam String content, HttpServletRequest req){
        HttpSession s = req.getSession();

        String id = (String) s.getAttribute("id");

        int check = qnaDAO.insertQuestion(title, content, id);
        
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

    // 회원가입 코드
    @PostMapping("/api/signup")
    public String signUp(@RequestParam String name, @RequestParam String email, @RequestParam String phone, @RequestParam String pw){

        userDAO.signUp(name, phone, email, pw);

        return "회원가입이 완료되었습니다.";

    }

    // 로그인 코드
    @PostMapping("/api/login")
    public String login(@RequestParam String email, @RequestParam String pw, HttpServletRequest req){
        HttpSession s = req.getSession();

        int check = userDAO.login(email, pw);

        if ( check == 1 ) {
            s.setAttribute("id", email);
            return email;
        }

        return String.valueOf(check);
    }

    // 사용자 정보 불러오는 코드
    @GetMapping("/api/user")
    public UserDTO user(@RequestParam(name = "id") String id) {
        UserDTO user = userDAO.getUserInfo(id);

        return user;
    }

    // 로그아웃 코드
    @PostMapping("/api/logout")
    public String logout(HttpServletRequest req){
        HttpSession s = req.getSession();

        s.invalidate();

        return "로그아웃이 완료되었습니다.";
    }

    // 투어 신청 코드
    @PostMapping("/api/tour/apliy")
    public String tourApliy(@RequestBody TourDTO tourDTO, HttpServletRequest req){
        HttpSession s = req.getSession();
        String id = (String) s.getAttribute("id");

        qnaDAO.tourApliy(tourDTO.getTour_date(), tourDTO.getTour_time(), tourDTO.getTour_local(), tourDTO.getTour_name(), tourDTO.getTour_phone(), tourDTO.getTour_content(), id, now);

        return "투어 신청이 완료되었습니다.";
    }
    
    // 투어 리스트 불러오는 코드
    @GetMapping("/api/tour/list")
    public ArrayList<TourDTO> getTourList(){
        ArrayList<TourDTO> TourList = qnaDAO.getTourList();

        return TourList;
    }

    // 매물 상세 페이지 불러오는 코드
    @GetMapping("/api/estate/detail")
    public ProductDTO getEstateDetail(@RequestParam int no){
        ProductDTO estateDetail = pDAO.getEstateDetail(no);

        return estateDetail;
    }

}
