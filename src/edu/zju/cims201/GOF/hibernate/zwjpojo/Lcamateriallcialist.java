package edu.zju.cims201.GOF.hibernate.zwjpojo;

/**
 * Lcadatasetlist entity. @author MyEclipse Persistence Tools
 */

public class Lcamateriallcialist implements java.io.Serializable {

	private Integer id;
	private String materialname;
	private String listintro;
	private String lcianame;
	private String lciacategory;
	private String lciafactorname;
	private String lciafactorvalue;
	private String lciafactorunit;
	private String listcuracy;
	private String listuncertainty;
	private String UUID;
	
	//private Lcalciamethod lcalciamethod;
	private int lcalciamethodid;
	private Wjbasematerial wjbasematerial;
	//private int materialcategoryid;
	private Lcalciamethodlist lcalciamethodlist;
	//private int lciafactorid;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getMaterialname() {
		return materialname;
	}
	public void setMaterialname(String materialname) {
		this.materialname = materialname;
	}
	public String getListintro() {
		return listintro;
	}
	public void setListintro(String listintro) {
		this.listintro = listintro;
	}
	public String getLcianame() {
		return lcianame;
	}
	public void setLcianame(String lcianame) {
		this.lcianame = lcianame;
	}
	public String getLciacategory() {
		return lciacategory;
	}
	public void setLciacategory(String lciacategory) {
		this.lciacategory = lciacategory;
	}
	public String getLciafactorname() {
		return lciafactorname;
	}
	public void setLciafactorname(String lciafactorname) {
		this.lciafactorname = lciafactorname;
	}
	public String getLciafactorvalue() {
		return lciafactorvalue;
	}
	public void setLciafactorvalue(String lciafactorvalue) {
		this.lciafactorvalue = lciafactorvalue;
	}
	public String getLciafactorunit() {
		return lciafactorunit;
	}
	public void setLciafactorunit(String lciafactorunit) {
		this.lciafactorunit = lciafactorunit;
	}
	public String getListcuracy() {
		return listcuracy;
	}
	public void setListcuracy(String listcuracy) {
		this.listcuracy = listcuracy;
	}
	public String getListuncertainty() {
		return listuncertainty;
	}
	public void setListuncertainty(String listuncertainty) {
		this.listuncertainty = listuncertainty;
	}
	public String getUUID() {
		return UUID;
	}
	public void setUUID(String uUID) {
		UUID = uUID;
	}
	public Wjbasematerial getWjbasematerial() {
		return wjbasematerial;
	}
	public void setWjbasematerial(Wjbasematerial wjbasematerial) {
		this.wjbasematerial = wjbasematerial;
	}
	public Lcalciamethodlist getLcalciamethodlist() {
		return lcalciamethodlist;
	}
	public void setLcalciamethodlist(Lcalciamethodlist lcalciamethodlist) {
		this.lcalciamethodlist = lcalciamethodlist;
	}
	public int getLcalciamethodid() {
		return lcalciamethodid;
	}
	public void setLcalciamethodid(int lcalciamethodid) {
		this.lcalciamethodid = lcalciamethodid;
	}
	
}