package com.nimalsha;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication
@EnableScheduling
public class OnlineFoodOrderingApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineFoodOrderingApplication.class, args);
	}
	
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
