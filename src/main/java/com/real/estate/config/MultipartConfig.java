package com.real.estate.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MultipartConfig {

    @Bean(name = "customMultipartResolver")
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
        resolver.setDefaultEncoding("UTF-8");
        resolver.setMaxUploadSizePerFile(5 * 1024 * 1024); // 파일당 최대 크기 (5MB로 설정, 필요에 따라 조절)
        return resolver;
    }
}