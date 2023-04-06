package com.GestioneCaffe.dto;

public class StudenteDto {
	
	private String nome;
	
	private String cognome;

	private Integer numeroCaffe;

	private Integer moltiplicatore;

	private String uniquecode;

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

	public void setNumeroCaffe(Integer numeroCaffe) {
		this.numeroCaffe = numeroCaffe;
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
