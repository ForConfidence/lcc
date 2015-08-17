package edu.zju.cims201.GOF.hibernate.zwjpojo;


public class Wjbasematerial implements java.io.Serializable {

	private int id;
	private String firstcategory;
	private String subcategory;
	private String materialname;
	private String materialintro;
	private String materialunit;
	private String materialprice;
	private String UUID;
	//private Integer categoryid;
	private Wjmaterialcategory materialCategory;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMaterialname() {
		return materialname;
	}
	public void setMaterialname(String materialname) {
		this.materialname = materialname;
	}
	public String getMaterialintro() {
		return materialintro;
	}
	public void setMaterialintro(String materialintro) {
		this.materialintro = materialintro;
	}
	public String getMaterialunit() {
		return materialunit;
	}
	public void setMaterialunit(String materialunit) {
		this.materialunit = materialunit;
	}
	public String getMaterialprice() {
		return materialprice;
	}
	public void setMaterialprice(String materialprice) {
		this.materialprice = materialprice;
	}
	
	public Wjmaterialcategory getMaterialCategory() {
		return materialCategory;
	}
	public void setMaterialCategory(Wjmaterialcategory materialCategory) {
		this.materialCategory = materialCategory;
	}
	public String getUUID() {
		return UUID;
	}
	public void setUUID(String uUID) {
		UUID = uUID;
	}
	public String getFirstcategory() {
		return firstcategory;
	}
	public void setFirstcategory(String firstcategory) {
		this.firstcategory = firstcategory;
	}
	public String getSubcategory() {
		return subcategory;
	}
	public void setSubcategory(String subcategory) {
		this.subcategory = subcategory;
	}
	
}