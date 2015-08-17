package edu.zju.cims201.GOF.hibernate.zwjpojo;

/**
 * Lcadatasetdetail entity. @author MyEclipse Persistence Tools
 */

public class Lcadatasetdetail implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer materialid;
	private String materialname;
	private int inoroutput;
	private String processUUID;
	private String inoroutputname;
	private Double value;
	private String unit;
	private String modulename;
	private String processname;
	private String UUID;
	
	//private Integer datasetid;
	private Lcadatasetlist lcadatasetlist;

	public Lcadatasetlist getLcadatasetlist() {
		return lcadatasetlist;
	}

	public void setLcadatasetlist(Lcadatasetlist lcadatasetlist) {
		this.lcadatasetlist = lcadatasetlist;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getMaterialid() {
		return this.materialid;
	}

	public void setMaterialid(Integer materialid) {
		this.materialid = materialid;
	}

	public String getMaterialname() {
		return this.materialname;
	}

	public void setMaterialname(String materialname) {
		this.materialname = materialname;
	}



	public void setInoroutputname(String inoroutputname) {
		this.inoroutputname = inoroutputname;
	}

	public Double getValue() {
		return this.value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

	public String getUnit() {
		return this.unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getModulename() {
		return this.modulename;
	}

	public void setModulename(String modulename) {
		this.modulename = modulename;
	}

	public String getProcessname() {
		return this.processname;
	}

	public void setProcessname(String processname) {
		this.processname = processname;
	}

	public String getUUID() {
		return UUID;
	}

	public void setUUID(String uUID) {
		UUID = uUID;
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

	public String getProcessUUID() {
		return processUUID;
	}

	public void setProcessUUID(String processUUID) {
		this.processUUID = processUUID;
	}


//	public Integer getDatasetid() {
//		return this.datasetid;
//	}
//
//	public void setDatasetid(Integer datasetid) {
//		this.datasetid = datasetid;
//	}

}