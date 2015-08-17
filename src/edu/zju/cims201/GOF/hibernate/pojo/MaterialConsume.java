package edu.zju.cims201.GOF.hibernate.pojo;



public class MaterialConsume {
	private long id;
	private long materialid;//
	private String unit;
	private double  baseamount;
	private long referencematerialid;//参考的基础物质
	private String referenceunit;
	private double  consumeamount;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getMaterialid() {
		return materialid;
	}
	public void setMaterialid(long materialid) {
		this.materialid = materialid;
	}
	public long getReferencematerialid() {
		return referencematerialid;
	}
	public void setReferencematerialid(long referencematerialid) {
		this.referencematerialid = referencematerialid;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getReferenceunit() {
		return referenceunit;
	}
	public void setReferenceunit(String referenceunit) {
		this.referenceunit = referenceunit;
	}
	public double getBaseamount() {
		return baseamount;
	}
	public void setBaseamount(double baseamount) {
		this.baseamount = baseamount;
	}
	public double getConsumeamount() {
		return consumeamount;
	}
	public void setConsumeamount(double consumeamount) {
		this.consumeamount = consumeamount;
	}
	
}
