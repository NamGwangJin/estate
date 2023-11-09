package com.real.estate.DTO;

import lombok.Data;

@Data
public class NewsDTO {
  int news_id;
  String news_title;
  String news_content;
  String news_writeDate;
  String news_link;
}