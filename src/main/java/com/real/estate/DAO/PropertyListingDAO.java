package com.real.estate.DAO;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.real.estate.DTO.PropertyListingDTO;
import com.real.estate.DTO.QuestionDTO;

@Mapper
public interface PropertyListingDAO {
    ArrayList<PropertyListingDTO> getProductsDynamic(Map<String, Object> queryParams);
    int countProducts(Map<String, Object> queryParams);
    void recommend_update(int product_id);
    void recommend_clear(int product_id);
}
