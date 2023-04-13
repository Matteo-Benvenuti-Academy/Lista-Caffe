package com.GestioneCaffe.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GestioneCaffe.dto.StudenteDto;
import com.GestioneCaffe.models.Response;
import com.GestioneCaffe.service.StudenteService;


@RestController
@RequestMapping("listacaffe")
@CrossOrigin("*")
public class StudenteController {
	
	@Autowired
	StudenteService service;
	
	@GetMapping
	public Response findAll(){
		
		List<StudenteDto> stu = service.findAll();
		
		if(stu==null)
			new Response("ko");
		
		return new Response("ok",stu);
	}
	
	@GetMapping("/{uniquecode}")
	public Response findByUniquecode(@PathVariable String uniquecode) {
		
		StudenteDto stu = service.findByUniquecode(uniquecode);
		
		if(stu == null)
			return new Response("ko");
		
		return new Response("ok",stu);
	}
	
	@PostMapping
	public Response insert(@RequestBody StudenteDto studente) {
		
		if(studente == null || studente.getNome().isBlank() || studente.getCognome().isBlank())
			return new Response("ko");

		studente.setNome(studente.getNome().trim());
		studente.setCognome(studente.getCognome().trim());

		StudenteDto stu = service.insert(studente);
		
		if(stu == null)
			return new Response("ko");
		
		return new Response("ok",stu);
	}
	
	@PutMapping("/{uniquecode}")
	public Response update(@PathVariable String uniquecode, @RequestBody StudenteDto studente) {
		
		if(studente == null || studente.getNome().isBlank() || studente.getCognome().isBlank())
			return new Response("ko");
		
		studente.setNome(studente.getNome().trim());
		studente.setCognome(studente.getCognome().trim());
		
		StudenteDto stu = service.update(uniquecode,studente);
		
		if(stu == null)
			return new Response("ko");
		
		return new Response("ok",stu);
	}
	
	@DeleteMapping("/{uniquecode}")
	public Response delete(@PathVariable String uniquecode) {
		if(!service.delete(uniquecode))
			return new Response("ko");
		
		return new Response("ok");
	}
	
	
	@GetMapping("coffee/add/{uniquecode}")
	public Response addCoffee(@PathVariable String uniquecode) {
		if(!service.addCoffee(uniquecode))
			return new Response("ko");
		
		return new Response("ok");
	}
	
	@GetMapping("coffee/remove/{uniquecode}")
	public Response removeCoffee(@PathVariable String uniquecode) {
		if(!service.removeCoffee(uniquecode))
			return new Response("ko");
		
		return new Response("ok");
	}
	
	@GetMapping("multiplier/add/{uniquecode}")
	public Response addMultiplier(@PathVariable String uniquecode) {
		if(!service.addMultiplier(uniquecode))
			return new Response("ko");
		
		return new Response("ok");
	}
	
	@GetMapping("multiplier/remove/{uniquecode}")
	public Response removeMultiplier(@PathVariable String uniquecode) {
		if(!service.removeMultiplier(uniquecode))
			return new Response("ko");
		
		return new Response("ok");
	}
	
	
}
