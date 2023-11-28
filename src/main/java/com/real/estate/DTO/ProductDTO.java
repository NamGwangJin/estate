package com.real.estate.DTO;

import lombok.Data;

@Data
public class ProductDTO {
  private int product_id;
  private String product_type;
  private String location;
  private String building_name;
  private String building_use;
  private String extent;
  private String address;
  private String floor;
  private String floor_open;
  private String direction_criteria;
  private String direction;
  private String entrance;
  private int rooms;
  private int bathroom;
  private String roomuse;
  private String inner_structure;
  private String administration_cost;
  private String maintenance;
  private String managementCost_include;
  private String building_dateType;
  private String building_date;
  private String transactionType;
  private String desiredAmount;
  private String loan;
  private String existingTenant_deposit;
  private String existingTenant_monthlyRent;
  private int total_parking;
  private String parking_per_room;
  private String heating_method;
  private String heating_fuel;
  private String airCondition;
  private String living_facilities;
  private String security_facilities;
  private String other_facilities;
  private String balcony;
  private String moveable_date;
  private String product_title;
  private String product_content;
  private String product_state;
  String created;
  String updated;

  private int img_no;
  private int img_productID;
  private String img_title;
}
