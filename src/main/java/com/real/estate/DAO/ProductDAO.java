package com.real.estate.DAO;

import org.apache.ibatis.annotations.Mapper;

import com.real.estate.DTO.ProductDTO;

@Mapper
public interface ProductDAO {
  void product_insert(String product_type, String location, String building_name, String building_use, String extent, String address, String floor, String floor_open, String direction_criteria, String direction, String entrance, int rooms, int bathroom, String roomuse, String inner_structure,
                    String administration_cost, String maintenance, String managementCost_includ, String building_dateType, String building_date, String transactionType, String desiredAmount, String loan, String existingTenant_deposit, String existingTenant_monthlyRent,
                    int total_parking, String parking_per_room, String heating_method, String heating_fuel, String airCondition, String living_facilities, String security_facilities, String other_facilities, String balcony, String moveable_date, String product_title, String product_content, String now);

  ProductDTO getEstateDetail(int no);
}
