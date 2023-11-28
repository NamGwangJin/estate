package com.real.estate.DTO;

import lombok.Data;

@Data
public class ProductDTO {
  int product_id;
  String product_type;
  String location;
  String building_name;
  String building_use;
  String extent;
  String address;
  String floor;
  String direction_criteria;
  String direction;
  String entrance;
  int rooms;
  int bathroom;
  String managementCost_includ;
  String building_dateType;
  String building_date;
  String transactionType;
  String desiredAmount;
  String loan;
  String existingTenant_deposit;
  String existingTenant_monthlyRent;
  String inner_structure;
  int total_parking;
  String parking_per_room;
  String heating_method;
  String heating_fuel;
  String airCondition;
  String living_facilities;
  String security_facilities;
  String other_facilities;
  String balcony;
  String product_title;
  String product_content;
  String product_state;
  String created;
  String updated;
}
