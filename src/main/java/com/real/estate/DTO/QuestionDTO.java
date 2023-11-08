package com.real.estate.DTO;

import lombok.Data;

@Data
public class QuestionDTO {
    int question_no;
    String question_title;
    String question_content;
    String question_writer;
    String question_created;
    String question_answer;
}
