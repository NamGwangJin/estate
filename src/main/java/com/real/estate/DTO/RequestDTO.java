package com.real.estate.DTO;

import lombok.Data;

@Data
public class RequestDTO{
  int request_id;
  String request_first_type;
  String request_transactionType;
  String request_location;
  String request_desiredAmount;
  String request_propertyType;
  String request_name;
  String request_contact;
  String request_title;
  String request_content;
}