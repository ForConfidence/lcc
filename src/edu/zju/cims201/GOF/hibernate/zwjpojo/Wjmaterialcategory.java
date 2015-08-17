package edu.zju.cims201.GOF.hibernate.zwjpojo;

/**
 * Goaldefinition entity. @author MyEclipse Persistence Tools
 */

public class Wjmaterialcategory implements java.io.Serializable {

	private int id;
	private String categoryname;
	private String englishname;
	private String categoryintro;
	private Integer parentid;
	private String UUID;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCategoryname() {
		return categoryname;
	}
	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}
	public String getEnglishname() {
		return englishname;
	}
	public void setEnglishname(String englishname) {
		this.englishname = englishname;
	}
	public String getCategoryintro() {
		return categoryintro;
	}
	public void setCategoryintro(String categoryintro) {
		this.categoryintro = categoryintro;
	}
	public Integer getParentid() {
		return parentid;
	}
	public void setParentid(Integer parentid) {
		this.parentid = parentid;
	}
	public String getUUID() {
		return UUID;
	}
	public void setUUID(String uUID) {
		UUID = uUID;
	}
	
}