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

    // @GetMapping("/api/propertyList")
    // public ResponseEntity<ArrayList<PropertyListingDTO>> getPropertyList(
    // @RequestParam(name = "propertyType", required = false, defaultValue = "전체")
    // String propertyType,
    // @RequestParam(name = "propertyState", required = false, defaultValue = "전체")
    // String propertyState,
    // @RequestParam(name = "transactionType", required = false, defaultValue =
    // "전체") String transactionType,
    // @RequestParam(name = "inputDate", required = false, defaultValue = "전체")
    // String inputDate,
    // @RequestParam(name = "customDate", required = false) String customDate) {
    // try {
    // ArrayList<PropertyListingDTO> propertyList;

    // // 검색 조건에 따라 동적으로 쿼리 생성
    // Map<String, Object> queryParams = new HashMap<>();
    // queryParams.put("propertyType", "전체".equals(propertyType) ? null :
    // propertyType);
    // queryParams.put("propertyState", "전체".equals(propertyState) ? null :
    // propertyState);
    // queryParams.put("transactionType", "전체".equals(transactionType) ? null :
    // transactionType);
    // queryParams.put("inputDate", "전체".equals(inputDate) ? null : inputDate);

    // // System.out.println을 사용하여 정보 출력
    // System.out.println("검색 조건:");
    // System.out.println("propertyType: " + propertyType);
    // System.out.println("propertyState: " + propertyState);
    // System.out.println("transactionType: " + transactionType);
    // System.out.println("inputDate: " + inputDate);
    // System.out.println("customDate: " + customDate);

    // propertyList = propertyListingDAO.getProductsDynamic(queryParams);

    // return new ResponseEntity<>(propertyList, HttpStatus.OK);
    // } catch (Exception e) {
    // // System.out.println을 사용하여 오류 정보 출력
    // System.err.println("매물 목록 요청 처리 중 오류 발생: " + e.getMessage());
    // return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // }

    @GetMapping("/api/propertyList")
    public ResponseEntity<ArrayList<PropertyListingDTO>> getPropertyList(
            @RequestParam(name = "propertyType", required = false, defaultValue = "전체") String propertyType,
            @RequestParam(name = "propertyState", required = false, defaultValue = "전체") String propertyState,
            @RequestParam(name = "transactionType", required = false, defaultValue = "전체") String transactionType,
            @RequestParam(name = "inputDate", required = false, defaultValue = "전체") String inputDate,
            @RequestParam(name = "customDate", required = false) String customDate,
            @RequestParam(name = "startPrice", required = false) String startPrice,
            @RequestParam(name = "endPrice", required = false) String endPrice,
            @RequestParam(name = "propertyNumber", required = false) Integer propertyNumber) {
        try {
            ArrayList<PropertyListingDTO> propertyList;

            // 검색 조건에 따라 동적으로 쿼리 생성
            Map<String, Object> queryParams = new HashMap<>();
            queryParams.put("propertyType", "전체".equals(propertyType) ? null : propertyType);
            queryParams.put("propertyState", "전체".equals(propertyState) ? null : propertyState);
            queryParams.put("transactionType", "전체".equals(transactionType) ? null : transactionType);
            queryParams.put("inputDate", "전체".equals(inputDate) ? null : inputDate);

            // customDate가 비어있지 않으면 queryParams에 추가
            if (customDate != null && !customDate.isEmpty()) {
                queryParams.put("customDate", customDate);
            }

            // propertyNumber가 비어있지 않으면 queryParams에 추가
            if (propertyNumber != null) {
                queryParams.put("propertyNumber", propertyNumber);
            }

            // startPrice가 비어있지 않으면 queryParams에 추가
            if (startPrice != null && !startPrice.isEmpty()) {
                queryParams.put("startPrice", startPrice);
            }

            // endPrice가 비어있지 않으면 queryParams에 추가
            if (endPrice != null && !endPrice.isEmpty()) {
                queryParams.put("endPrice", endPrice);
            }

            // System.out.println을 사용하여 정보 출력
            System.out.println("검색 조건:");
            System.out.println("propertyType: " + propertyType);
            System.out.println("propertyState: " + propertyState);
            System.out.println("transactionType: " + transactionType);
            System.out.println("inputDate: " + inputDate);
            System.out.println("customDate: " + customDate);
            System.out.println("propertyNumber: " + propertyNumber);
            System.out.println("startPrice: " + startPrice);
            System.out.println("endPrice: " + endPrice);
            System.out.println("queryParams: " + queryParams);

            propertyList = propertyListingDAO.getProductsDynamic(queryParams);

            return new ResponseEntity<>(propertyList, HttpStatus.OK);
        } catch (Exception e) {
            // System.out.println을 사용하여 오류 정보 출력
            System.err.println("매물 목록 요청 처리 중 오류 발생: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
