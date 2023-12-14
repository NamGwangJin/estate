package com.real.estate.Controller;

import java.math.BigInteger;
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
    public String questionWrite(@RequestParam String title, @RequestParam String content, HttpServletRequest req) {
        HttpSession s = req.getSession();

        String id = (String) s.getAttribute("id");

        int check = qnaDAO.insertQuestion(title, content, id);

        return String.valueOf(check);
    }

    // 질문/답변 메뉴에 접근 시 질문 리스트를 불러오는 코드
    @GetMapping("/api/question/list")
    public ArrayList<QuestionDTO> getList() {

        ArrayList<QuestionDTO> boardList = qnaDAO.getBoardList();

        return boardList;
    }

    // 질문/답변 상세 내용 불러오는 코드
    @GetMapping("/api/question/view")
    public QuestionDTO getDetail(@RequestParam int no) {

        QuestionDTO getDetail = qnaDAO.getDetail(no);

        return getDetail;
    }

    // 회원가입 코드
    @PostMapping("/api/signup")
    public String signUp(@RequestParam String name, @RequestParam String email, @RequestParam String phone,
            @RequestParam String pw) {

        userDAO.signUp(name, phone, email, pw);

        return "회원가입이 완료되었습니다.";

    }

    // 로그인 코드
    @PostMapping("/api/login")
    public String login(@RequestParam String email, @RequestParam String pw, HttpServletRequest req) {
        HttpSession s = req.getSession();

        int check = userDAO.login(email, pw);

        if (check == 1) {
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
    public String logout(HttpServletRequest req) {
        HttpSession s = req.getSession();

        s.invalidate();

        return "로그아웃이 완료되었습니다.";
    }

    // 투어 신청 코드
    @PostMapping("/api/tour/apliy")
    public String tourApliy(@RequestBody TourDTO tourDTO, HttpServletRequest req) {
        HttpSession s = req.getSession();
        String id = (String) s.getAttribute("id");

        qnaDAO.tourApliy(tourDTO.getTour_date(), tourDTO.getTour_time(), tourDTO.getTour_local(),
                tourDTO.getTour_name(), tourDTO.getTour_phone(), tourDTO.getTour_content(), id, now);

        return "투어 신청이 완료되었습니다.";
    }

    // 투어 리스트 불러오는 코드
    @GetMapping("/api/tour/list")
    public ArrayList<TourDTO> getTourList() {
        ArrayList<TourDTO> TourList = qnaDAO.getTourList();

        return TourList;
    }

    // 매물 상세 페이지 불러오는 코드
    // @GetMapping("/api/estate/detail")
    // public ProductDTO getEstateDetail(@RequestParam int no){
    // ProductDTO estateDetail = pDAO.getEstateDetail(no);

    // return estateDetail;
    // }
    @GetMapping("/api/estate/detail")
    public ProductDTO getEstateDetail(@RequestParam(name = "product_id") int product_id) {
        ProductDTO estateDetail = pDAO.getEstateDetail(product_id);
        return estateDetail;
    }

    // 매물 상세 이미지 불러오는 코드
    @GetMapping("/api/estate/detail/img")
    public ArrayList<ProductDTO> getEstateDetail_img(@RequestParam int no) {
        ArrayList<ProductDTO> img = pDAO.getEstateDetail_img(no);

        return img;
    }

    // 매물 등록 주소를 이용하여 법정동 코드 SELECT
    @PostMapping("/api/get/bjd_code")
    public String getBjdCode(@RequestParam String location) {
        BigInteger bjd_code = pDAO.getBjdCode(location);

        return String.valueOf(bjd_code);
    }

    // 매물 수정 코드
    @PostMapping("/api/officetel/update")
    public String update(@RequestParam int no, @RequestParam String building_use, @RequestParam String floor_open,
            @RequestParam String direction_criteria,
            @RequestParam String direction, @RequestParam String entrance, @RequestParam int rooms,
            @RequestParam int bathroom,
            @RequestParam String roomuse, @RequestParam String inner_structure,
            @RequestParam String administration_cost, @RequestParam String maintenance,
            @RequestParam String managementCost_includ, @RequestParam String building_dateType,
            @RequestParam String building_date, @RequestParam String transactionType,
            @RequestParam String desiredAmount, @RequestParam String loan, @RequestParam String existingTenant_deposit,
            @RequestParam String existingTenant_monthlyRent,
            @RequestParam String heating_method, @RequestParam String heating_fuel, @RequestParam String airCondition,
            @RequestParam String living_facilities,
            @RequestParam String security_facilities, @RequestParam String other_facilities,
            @RequestParam String balcony, @RequestParam String moveable_date,
            @RequestParam String product_title, @RequestParam String product_content) {
        pDAO.product_update(building_use, floor_open, direction_criteria, direction, entrance, rooms, bathroom, roomuse,
                inner_structure, administration_cost,
                maintenance, managementCost_includ, building_dateType, building_date, transactionType, desiredAmount,
                loan, existingTenant_deposit,
                existingTenant_monthlyRent, heating_method, heating_fuel, airCondition, living_facilities,
                security_facilities, other_facilities, balcony, moveable_date,
                product_title, product_content, now, no);

        return "매물 수정이 완료되었습니다";

    }

}
