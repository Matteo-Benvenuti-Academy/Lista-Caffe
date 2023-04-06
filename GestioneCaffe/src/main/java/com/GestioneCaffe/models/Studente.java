package com.GestioneCaffe.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Caffe")
public class Studente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "caffeID")
	private Integer id;
	@Column
	private String nome;
	@Column
	private String cognome;
	@Column(name = "caffe")
	private Integer numeroCaffe;
	@Column
	private Integer moltiplicatore;
	@Column
	private String uniquecode;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCognome() {
		return cognome;
	}
	public void setCognome(String cognome) {
		this.cognome = cognome;
	}
	public Integer getNumeroCaffe() {
		return numeroCaffe;
	}
	public void setNumeroCaffe(Integer integer) {
		this.numeroCaffe = integer;
	}
	public Integer getMoltiplicatore() {
		return moltiplicatore;
	}
	public void setMoltiplicatore(Integer moltiplicatore) {
		this.moltiplicatore = moltiplicatore;
	}
	public String getUniquecode() {
		return uniquecode;
	}
	public void setUniquecode(String uniquecode) {
		this.uniquecode = uniquecode;
	}
}
