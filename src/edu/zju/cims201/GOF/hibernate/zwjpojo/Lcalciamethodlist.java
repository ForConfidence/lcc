package edu.zju.cims201.GOF.hibernate.zwjpojo;

public class Lcalciamethodlist implements java.io.Serializable {

	private int id;
	private String methodname;
	private String methodintro;
	private String UUID;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMethodname() {
		return methodname;
	}
	public void setMethodname(String methodname) {
		this.methodname = methodname;
	}
	public String getMethodintro() {
		return methodintro;
	}
	public void setMethodintro(String methodintro) {
		this.methodintro = methodintro;
	}
	public String getUUID() {
		return UUID;
	}
	public void setUUID(String uUID) {
		UUID = uUID;
	}

	
	
}