package edu.zju.cims201.GOF.hibernate.zwjpojo;

/**
 * Goaldefinition entity. @author MyEclipse Persistence Tools
 */

public class Unitcategory implements java.io.Serializable {

	private Integer id;
	private String unitcategoryname;
	private String unitcategoryintro;
	private String defaultflowproperty;
	private String parentname;
	private Integer parentid;
	private String uuid;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUnitcategoryname() {
		return unitcategoryname;
	}
	public void setUnitcategoryname(String unitcategoryname) {
		this.unitcategoryname = unitcategoryname;
	}
	public String getUnitcategoryintro() {
		return unitcategoryintro;
	}
	public void setUnitcategoryintro(String unitcategoryintro) {
		this.unitcategoryintro = unitcategoryintro;
	}
	public String getDefaultflowproperty() {
		return defaultflowproperty;
	}
	public void setDefaultflowproperty(String defaultflowproperty) {
		this.defaultflowproperty = defaultflowproperty;
	}
	public String getParentname() {
		return parentname;
	}
	public void setParentname(String parentname) {
		this.parentname = parentname;
	}
	public Integer getParentid() {
		return parentid;
	}
	public void setParentid(Integer parentid) {
		this.parentid = parentid;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	
	
}