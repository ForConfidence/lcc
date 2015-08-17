package edu.zju.cims201.GOF.hibernate.zwjpojo;

/**
 * Lcadatasetlist entity. @author MyEclipse Persistence Tools
 */

public class Lcamaterialdatasetlist implements java.io.Serializable {

	private Integer id;
	private String materialname;
	private String listintro;
	//private int materialcategoryid;
	private String materialvalue;
	private String materialunit;
	private int inoroutput;
	private String inoroutputname;
	private String datasetrule;
	private String datasetcuracy;
	private String datasetuncertainty;
	private String UUID;
	private Wjbasematerial wjbasematerial;
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
	public String getMaterialvalue() {
		return materialvalue;
	}
	public void setMaterialvalue(String materialvalue) {
		this.materialvalue = materialvalue;
	}
	public String getMaterialunit() {
		return materialunit;
	}
	public void setMaterialunit(String materialunit) {
		this.materialunit = materialunit;
	}
	public int getInoroutput() {
		return inoroutput;
	}
	public void setInoroutput(int inoroutput) {
		this.inoroutput = inoroutput;
	}
	public String getInoroutputname() {
		return inoroutputname;
	}
	public void setInoroutputname(String inoroutputname) {
		this.inoroutputname = inoroutputname;
	}
	public String getDatasetrule() {
		return datasetrule;
	}
	public void setDatasetrule(String datasetrule) {
		this.datasetrule = datasetrule;
	}
	public String getDatasetcuracy() {
		return datasetcuracy;
	}
	public void setDatasetcuracy(String datasetcuracy) {
		this.datasetcuracy = datasetcuracy;
	}
	public String getDatasetuncertainty() {
		return datasetuncertainty;
	}
	public void setDatasetuncertainty(String datasetuncertainty) {
		this.datasetuncertainty = datasetuncertainty;
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
}