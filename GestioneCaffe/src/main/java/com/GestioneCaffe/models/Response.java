package com.GestioneCaffe.models;

public class Response {
	
	private String status;
	private Object data;
	
	public Response(String status, Object data ) {
		setStatus(status);
		setData(data);
	}
	
	public Response(String status) {
		this(status,null);
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
}
