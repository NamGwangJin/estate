package com.real.estate.Controller;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.real.estate.DAO.PropertyListingDAO; // 올바른 클래스로 교체
import com.real.estate.DTO.PropertyListingDTO;

@RestController
public class YoonController {
 
    @Autowired
    private PropertyListingDAO propertyListingDAO;

    @GetMapping("/api/propertyList")
    public ResponseEntity<ArrayList<PropertyListingDTO>> getPropertyList(
        @RequestParam(name = "propertyType", required = false, defaultValue = "전체") String propertyType,
        @RequestParam(name = "propertyState", required = false, defaultValue = "전체") String propertyState,
        @RequestParam(name = "transactionType", required = false, defaultValue = "전체") String transactionType,
        @RequestParam(name = "inputDate", required = false, defaultValue = "전체") String inputDate ) {
        try {
            ArrayList<PropertyListingDTO> propertyList;
    
            // 검색 조건에 따라 동적으로 쿼리 생성
            Map<String, Object> queryParams = new HashMap<>();
            queryParams.put("propertyType", "전체".equals(propertyType) ? null : propertyType);
            queryParams.put("propertyState", "전체".equals(propertyState) ? null : propertyState);
            queryParams.put("transactionType", "전체".equals(transactionType) ? null : transactionType);
            queryParams.put("inputDate", "전체".equals(inputDate) ? null : inputDate);

            propertyList = propertyListingDAO.getProductsDynamic(queryParams);
    
            return new ResponseEntity<>(propertyList, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("매물 목록 요청 처리 중 오류 발생: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
