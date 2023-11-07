package com.real.estate.DTO;

import lombok.Data;

@Data
public class AnswerDTO {
    int answer_no;
    int question_no;
    String answer_title;
    String answer_content;
    String answer_writer;
    String answer_created;
}
