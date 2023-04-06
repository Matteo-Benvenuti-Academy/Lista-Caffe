package com.GestioneCaffe.utils.mapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Mapper {

	@Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // configure ModelMapper
        modelMapper.getConfiguration()
            .setMatchingStrategy(MatchingStrategies.STRICT);

        return modelMapper;
    }
}	
