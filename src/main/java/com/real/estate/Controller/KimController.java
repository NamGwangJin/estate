package com.real.estate.Controller;

import java.io.File;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Value;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.real.estate.DAO.MainDAO;
import com.real.estate.DAO.ProductDAO;
import com.real.estate.DTO.NewsDTO;
import com.real.estate.DTO.ProductDTO;

@RestController
public class KimController {

    @Autowired
    private MainDAO mDAO;
    @Autowired
    private ProductDAO pDAO;
    @Value("${image.upload.directory}")
    private String imageUploadDirectory;

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
    public String requestInsert(@RequestParam String selectedType, @RequestParam String transactionType,
            @RequestParam String location, @RequestParam String desiredAmount, @RequestParam String propertyType,
            @RequestParam String name, @RequestParam String contact, @RequestParam String title,
            @RequestParam String content) {

        mDAO.requestInsert(selectedType, transactionType, location, desiredAmount, propertyType, name, contact, title,
                content);
        System.out.println("내용들=" + selectedType + " " + transactionType + " " + location + " " + desiredAmount + " "
                + propertyType + " " + name + " " + contact + " " + title + " " + content);

        return "success";
    }


    @PostMapping("/api/officetel/insert")
    public String officetel_Insert(@RequestParam String product_type, @RequestParam String location, @RequestParam String building_name, @RequestParam String building_use, @RequestParam String extent, @RequestParam String address, @RequestParam String floor, 
    @RequestParam String floor_open,@RequestParam String direction_criteria, @RequestParam String direction, @RequestParam String entrance, @RequestParam int rooms, @RequestParam int bathroom, @RequestParam String roomuse, @RequestParam String inner_structure,@RequestParam String administration_cost, @RequestParam String maintenance, @RequestParam String managementCost_includ,
    @RequestParam String building_dateType, @RequestParam String building_date, @RequestParam String transactionType, @RequestParam String desiredAmount, @RequestParam String loan, @RequestParam String existingTenant_deposit, @RequestParam String existingTenant_monthlyRent, @RequestParam int total_parking, @RequestParam String parking_per_room, @RequestParam String heating_method, @RequestParam String heating_fuel,
    @RequestParam String airCondition, @RequestParam String living_facilities,@RequestParam String security_facilities, @RequestParam String other_facilities, @RequestParam String balcony, @RequestParam String moveable_date, @RequestParam String product_title, @RequestParam String product_content, @RequestPart MultipartFile[] images,@ModelAttribute ProductDTO productDTO){


        pDAO.product_insert(product_type, location, building_name, building_use, extent, address, floor, floor_open, direction_criteria, direction, entrance, rooms, bathroom, roomuse, inner_structure, administration_cost, maintenance, managementCost_includ,
                        building_dateType, building_date, transactionType, desiredAmount, loan, existingTenant_deposit, existingTenant_monthlyRent, total_parking, parking_per_room, heating_method, heating_fuel, airCondition, living_facilities, security_facilities, other_facilities, balcony, moveable_date, product_title, product_content);

        int product_id = pDAO.getLastInsertedProductId();
        System.out.println("product_id=" + product_id);
                        for (MultipartFile image : images) {
                            try {
                                // 이미지 파일의 실제 이름
                                String img_title = image.getOriginalFilename();
                
                                // 이미지 파일을 저장할 경로
                                String filePath = imageUploadDirectory + File.separator + img_title;

                
                                // 이미지 파일을 서버에 저장
                                image.transferTo(new File(filePath));
                
                                // 여기에 다른 이미지 파일에 대한 처리 로직을 추가할 수 있습니다.
                
                                // 이미지에 대한 메타데이터를 데이터베이스에 삽입
                                pDAO.image_insert(product_id, img_title);
                            } catch (IOException e) {
                                e.printStackTrace();
                                // 이미지 파일 저장 중 오류 발생 시 처리 로직
                                return "error";
                            }
                        }
        return "success";
    }

}
