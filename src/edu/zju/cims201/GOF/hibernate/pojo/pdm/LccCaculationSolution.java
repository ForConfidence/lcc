package edu.zju.cims201.GOF.hibernate.pojo.pdm;

import java.util.Date;

import org.hamcrest.core.Is;

import edu.zju.cims201.GOF.hibernate.pojo.BaseModule;
import edu.zju.cims201.GOF.hibernate.pojo.LccModule;


public class LccCaculationSolution {
	private Long id;
	private String name;
	private String detail;
	private Employee creater;
	private Date creatTime;
	private String branchUUID;
	private String solutionUUID;
	private int isupload;
	

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	
	public Date getCreatTime() {
		return creatTime;
	}
	public void setCreatTime(Date creatTime) {
		this.creatTime = creatTime;
	}
	
	public Employee getCreater() {
		return creater;
	}
	public void setCreater(Employee creater) {
		this.creater = creater;
	}
	
	public String getSolutionUUID() {
		return solutionUUID;
	}
	public void setSolutionUUID(String solutionUUID) {
		this.solutionUUID = solutionUUID;
	}
	public int getIsupload() {
		return isupload;
	}
	public void setIsupload(int isupload) {
		this.isupload = isupload;
	}
	public String getBranchUUID() {
		return branchUUID;
	}
	public void setBranchUUID(String branchUUID) {
		this.branchUUID = branchUUID;
	}
	

}
