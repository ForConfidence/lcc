package edu.zju.cims201.GOF.hibernate.zwjpojo;


public class Unitdetail implements java.io.Serializable {

	private int id;
	private String unitname;
	private String unitintro;
	private String unitsynonyms;
	private Double conversionfactor;
	private String formula;
	private Integer isreference;
	private String unitcategoryname;
	private String uuid;
	private Unitcategory unitcategory;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUnitname() {
		return unitname;
	}
	public void setUnitname(String unitname) {
		this.unitname = unitname;
	}
	public String getUnitintro() {
		return unitintro;
	}
	public void setUnitintro(String unitintro) {
		this.unitintro = unitintro;
	}
	public String getUnitsynonyms() {
		return unitsynonyms;
	}
	public void setUnitsynonyms(String unitsynonyms) {
		this.unitsynonyms = unitsynonyms;
	}
	public Double getConversionfactor() {
		return conversionfactor;
	}
	public void setConversionfactor(Double conversionfactor) {
		this.conversionfactor = conversionfactor;
	}
	public String getFormula() {
		return formula;
	}
	public void setFormula(String formula) {
		this.formula = formula;
	}
	public Integer getIsreference() {
		return isreference;
	}
	public void setIsreference(Integer isreference) {
		this.isreference = isreference;
	}
	public String getUnitcategoryname() {
		return unitcategoryname;
	}
	public void setUnitcategoryname(String unitcategoryname) {
		this.unitcategoryname = unitcategoryname;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public Unitcategory getUnitcategory() {
		return unitcategory;
	}
	public void setUnitcategory(Unitcategory unitcategory) {
		this.unitcategory = unitcategory;
	}

	
}