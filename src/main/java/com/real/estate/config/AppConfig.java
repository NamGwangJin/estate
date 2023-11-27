package com.real.estate.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    // 여기에 원하는 설정 추가
    @Bean
    public YourService yourService() {
        return new YourService();
    }
    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
        // 설정을 추가할 수 있습니다.
        return resolver;
    }
}