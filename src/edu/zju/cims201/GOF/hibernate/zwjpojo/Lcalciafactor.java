package edu.zju.cims201.GOF.hibernate.zwjpojo;

/**
 * Lcalciafactor entity. @author MyEclipse Persistence Tools
 */

public class Lcalciafactor implements java.io.Serializable {

	// Fields

	private Integer id;
	private String factorcategoryname;
	private String factorsubcategoryname;
	private String factorname;
	private String factorunit;
	private Double factorvalue;
	private String UUID;
	
	private Lcalciamethod lcalciamethod;
	//private Integer lciacategoryid;
	

	private Wjmaterialcategory materialCategory;
	//private Integer materialcategoryid;

	

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFactorcategoryname() {
		return this.factorcategoryname;
	}

	public void setFactorcategoryname(String factorcategoryname) {
		this.factorcategoryname = factorcategoryname;
	}

	public String getFactorsubcategoryname() {
		return this.factorsubcategoryname;
	}

	public void setFactorsubcategoryname(String factorsubcategoryname) {
		this.factorsubcategoryname = factorsubcategoryname;
	}

	public String getFactorname() {
		return this.factorname;
	}

	public void setFactorname(String factorname) {
		this.factorname = factorname;
	}

	public String getFactorunit() {
		return this.factorunit;
	}

	public void setFactorunit(String factorunit) {
		this.factorunit = factorunit;
	}

	public Double getFactorvalue() {
		return this.factorvalue;
	}

	public void setFactorvalue(Double factorvalue) {
		this.factorvalue = factorvalue;
	}

//	public Integer getLciacategoryid() {
//		return this.lciacategoryid;
//	}
//
//	public void setLciacategoryid(Integer lciacategoryid) {
//		this.lciacategoryid = lciacategoryid;
//	}

//	public Integer getMaterialcategoryid() {
//		return this.materialcategoryid;
//	}
//
//	public void setMaterialcategoryid(Integer materialcategoryid) {
//		this.materialcategoryid = materialcategoryid;
//	}
	
	public Lcalciamethod getLcalciamethod() {
		return lcalciamethod;
	}

	public void setLcalciamethod(Lcalciamethod lcalciamethod) {
		this.lcalciamethod = lcalciamethod;
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

}