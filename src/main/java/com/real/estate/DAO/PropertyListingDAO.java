package com.real.estate.DAO;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.real.estate.DTO.PropertyListingDTO;
import com.real.estate.DTO.QuestionDTO;

@Mapper
public interface PropertyListingDAO {
    ArrayList<PropertyListingDTO> getProducts();
    ArrayList<PropertyListingDTO> get_mamul_Products();
}
