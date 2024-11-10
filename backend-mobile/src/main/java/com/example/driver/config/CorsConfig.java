package com.example.driver.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@SuppressWarnings("null") CorsRegistry registry) {
        registry.addMapping("/**")  // Allow all origins and headers
        .allowedOrigins( 
            "http://192.168.1.2:3000",  
            "http://localhost:3000",  
            "http://localhost:8080",  
            "http://192.168.1.2:8080",     
            "http://10.0.3.2:8080",      
            "http://192.168.226.101:8080",
            "http://127.0.0.1:8080"
    )
                .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")
                .allowedHeaders("*");
    }
}
