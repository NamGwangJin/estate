package com.real.estate.DTO;

import lombok.Data;

@Data
public class ProductDTO {
  private int product_id;
  private String productType;
  private String location;
  private String buildingName;
  private String buildingUse;
  private String extent;
  private String address;
  private String floor;
  private String floorOpen;
  private String directionCriteria;
  private String direction;
  private String entrance;
  private int rooms;
  private int bathroom;
  private String roomUse;
  private String innerStructure;
  private String administrationCost;
  private String maintenance;
  private String managementCostInclude;
  private String buildingDateType;
  private String buildingDate;
  private String transactionType;
  private String desiredAmount;
  private String loan;
  private String existingTenantDeposit;
  private String existingTenantMonthlyRent;
  private int totalParking;
  private String parkingPerRoom;
  private String heatingMethod;
  private String heatingFuel;
  private String airCondition;
  private String livingFacilities;
  private String securityFacilities;
  private String otherFacilities;
  private String balcony;
  private String moveableDate;
  private String productTitle;
  private String productContent;
  private String productState;

  private int img_no;
  private int img_productID;
  private String img_title;
}
