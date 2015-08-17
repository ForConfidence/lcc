package edu.zju.cims201.GOF.hibernate.pojo.pdm;

import java.util.Date;

import edu.zju.cims201.GOF.hibernate.pojo.BaseModule;
import edu.zju.cims201.GOF.hibernate.pojo.LccModule;


public class SolutionData {
	private Long id;
	private String solutionUUID;
	private String datasetUUID;
	private String moduleUUID;
	private String branchUUID;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getDatasetUUID() {
		return datasetUUID;
	}
	public void setDatasetUUID(String datasetUUID) {
		this.datasetUUID = datasetUUID;
	}
	public String getModuleUUID() {
		return moduleUUID;
	}
	public void setModuleUUID(String moduleUUID) {
		this.moduleUUID = moduleUUID;
	}
	public String getBranchUUID() {
		return branchUUID;
	}
	public void setBranchUUID(String branchUUID) {
		this.branchUUID = branchUUID;
	}
	public String getSolutionUUID() {
		return solutionUUID;
	}
	public void setSolutionUUID(String solutionUUID) {
		this.solutionUUID = solutionUUID;
	}
	

}
