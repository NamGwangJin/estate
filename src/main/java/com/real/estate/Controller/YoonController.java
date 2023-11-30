package com.real.estate.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.real.estate.DAO.PropertyListingDAO; // 올바른 클래스로 교체
import com.real.estate.DTO.PropertyListingDTO;

@RestController
public class YoonController {
 
    @Autowired
    private PropertyListingDAO listDAO;
    
    // 매물리스트를 불러오는 코드
    @GetMapping("/api/propertyList")
    public ArrayList<PropertyListingDTO> getPropertyList() {
        
        // PropertyListingDTO를 사용하여 수정
        ArrayList<PropertyListingDTO> propertyList = listDAO.getProducts();
        
        return propertyList;
    }

    // 매물리스트를 매물타입에 따라 불러오는 코드
    @GetMapping("/api/mamul_propertyList")
    public ArrayList<PropertyListingDTO> get_mamul_Products() {
        
        // PropertyListingDTO를 사용하여 수정
        ArrayList<PropertyListingDTO> propertyList = listDAO.get_mamul_Products();
        
        return propertyList;
    }

    
}
