package com.GestioneCaffe.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestioneCaffe.dto.StudenteDto;
import com.GestioneCaffe.models.Studente;
import com.GestioneCaffe.repositories.StudenteRepository;

import jakarta.transaction.Transactional;

@Service
public class StudenteService {
	
	@Autowired
	StudenteRepository repository;
	
	@Autowired
	ModelMapper mapper;

	public List<StudenteDto> findAll() {
		
		List<Studente> listStu = repository.findAll();
		
		if(listStu == null)
			return null;
		
		List<StudenteDto> listStuDto = new ArrayList<>();
		
		
		for(Studente stu : listStu)
			listStuDto.add(mapper.map(stu, StudenteDto.class));
		
		return listStuDto;
	}

	public StudenteDto findByUniquecode(String uniquecode) {
		
		Studente stu = repository.findByUniquecode(uniquecode);
		
		if(stu == null)
			return null;

		return mapper.map(stu, StudenteDto.class);
	}
	
	
	public StudenteDto insert(StudenteDto stuDto) {
		
		stuDto.setNumeroCaffe(0);
		stuDto.setMoltiplicatore(0);
		stuDto.setUniquecode(UUID.randomUUID().toString());

		Studente stu = mapper.map(stuDto, Studente.class);
		
		Studente newStu;
		
		try {
			newStu = repository.save(stu);			
		} catch (Exception e) {
			return null;
		}
		
		if(newStu.getId() == null)
			return null;
		
		return mapper.map(newStu, StudenteDto.class);
	}
	
	@Transactional
	public StudenteDto update(String uniquecode, StudenteDto stuDto) {
		Studente stu = repository.findByUniquecode(stuDto.getUniquecode());
		
		if(stu == null)
			return null;
		
		stu.setNome(stuDto.getNome());
		stu.setCognome(stuDto.getCognome());
		stu.setNumeroCaffe(stuDto.getNumeroCaffe());
		stu.setMoltiplicatore(stuDto.getMoltiplicatore());
		
		
		Studente newStu;
		
		try {
			newStu = repository.save(stu);			
		} catch (Exception e) {
			return null;
		}
		
		if(newStu.getId() == null)
			return null;
		
		return mapper.map(newStu, StudenteDto.class);
	}

	public boolean delete(String uniquecode) {
		
		Studente stu = repository.findByUniquecode(uniquecode);
		
		if(stu == null)
			return false;
		
		try {
			repository.delete(stu);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	public boolean addCoffee(String uniquecode) {
		
		Studente stu = repository.findByUniquecode(uniquecode);
		
		if(stu == null)
			return false;
		
		stu.setNumeroCaffe(stu.getNumeroCaffe() + stu.getMoltiplicatore());
		stu.setMoltiplicatore(0);
		
		Studente newStu;
		try {
			newStu = repository.save(stu);			
		} catch (Exception e) {
			return false;
		}
		
		if(newStu.getId() == null)
			return false;
		
		return true;
	}

	public boolean addMultiplier(String uniquecode) {
		Studente stu = repository.findByUniquecode(uniquecode);
		
		if(stu == null)
			return false;
		
		stu.setMoltiplicatore(stu.getMoltiplicatore()+1);
		
		Studente newStu;
		try {
			newStu = repository.save(stu);			
		} catch (Exception e) {
			return false;
		}
		
		if(newStu.getId() == null)
			return false;
		
		return true;
	}

	public boolean removeMultiplier(String uniquecode) {
		Studente stu = repository.findByUniquecode(uniquecode);
		
		if(stu == null)
			return false;
		
		stu.setMoltiplicatore(stu.getMoltiplicatore()-1);
		
		Studente newStu;
		try {
			newStu = repository.save(stu);			
		} catch (Exception e) {
			return false;
		}
		
		if(newStu.getId() == null)
			return false;
		
		return true;
	}

	public boolean removeCoffee(String uniquecode) {
		Studente stu = repository.findByUniquecode(uniquecode);
		
		if(stu == null)
			return false;
		
		stu.setNumeroCaffe(stu.getNumeroCaffe()-1);
		
		Studente newStu;
		try {
			newStu = repository.save(stu);			
		} catch (Exception e) {
			return false;
		}
		
		if(newStu.getId() == null)
			return false;
		
		return true;
	}
}
