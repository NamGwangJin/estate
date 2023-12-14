package com.real.estate.DTO;

import lombok.Data;

@Data
public class PropertyListingDTO {
    int product_id;
    String product_type;
    String location;
    String building_name;
    String building_use;
    String extent;
    String address;
    String floor;
    String floor_open;
    String direction_criteria;
    String direction;
    int rooms;
    int bathroom;
    String roomuse;
    String inner_structure;
    String administration_cost;
    String managementCost_includ;
    String building_date;
    String transactionType;
    String desiredAmount;
    String loan;
    String existingTenant_deposit;
    String existingTenant_monthlyRent;
    int total_parking;
    int parking_per_room;
    String heating_method;
    String heating_fuel;
    String airCondition;
    String living_facilities;
    String security_facilities;
    String other_facilities;
    String balcony;
    String moveable_date;
    String product_title;
    String product_content;
    String product_state;
    String created;
    String recommend;
}