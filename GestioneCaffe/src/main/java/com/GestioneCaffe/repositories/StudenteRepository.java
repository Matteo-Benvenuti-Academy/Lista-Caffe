package com.GestioneCaffe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.GestioneCaffe.models.Studente;

@Repository
public interface StudenteRepository extends JpaRepository<Studente,Integer>{

	Studente findByUniquecode(String uniquecode);

}
