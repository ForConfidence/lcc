package edu.zju.cims201.GOF.hibernate.pojo;


public class ComponentFailure {
	private long id;
	private long componentid;
	private String failurename;
	private String failuredetail;
	private double failurerate;	
	private double failurecost;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getComponentid() {
		return componentid;
	}
	public void setComponentid(long componentid) {
		this.componentid = componentid;
	}
	public String getFailurename() {
		return failurename;
	}
	public void setFailurename(String failurename) {
		this.failurename = failurename;
	}
	public String getFailuredetail() {
		return failuredetail;
	}
	public void setFailuredetail(String failuredetail) {
		this.failuredetail = failuredetail;
	}
	public double getFailurerate() {
		return failurerate;
	}
	public void setFailurerate(double failurerate) {
		this.failurerate = failurerate;
	}
	public double getFailurecost() {
		return failurecost;
	}
	public void setFailurecost(double failurecost) {
		this.failurecost = failurecost;
	}	
	

	
}
