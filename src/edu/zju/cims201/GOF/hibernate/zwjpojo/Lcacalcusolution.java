package edu.zju.cims201.GOF.hibernate.zwjpojo;

import java.util.Set;

import edu.zju.cims201.GOF.hibernate.pojo.LccModule;

/**
 * Goaldefinition entity. @author MyEclipse Persistence Tools
 */

public class Lcacalcusolution implements java.io.Serializable {

	private Integer id;
	private String projectname;
	private String companyname;
	private String forwardgoal;
	//模板ID
	//模板名称
	private String modulename;
	private LccModule lccModule;
	
	private String projectdesc;
	private String calcumethod;
	private String impactcategory;
	
	private String getrule;
	private String assumption;
	//关联表
	private Set<Lcadatasetlist> lcadatasetlists;
	//数据集名称
	private String datasetname;
	//数据集ID
	
	private String buildtime;
	private String UUID;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getProjectname() {
		return projectname;
	}
	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}
	public String getCompanyname() {
		return companyname;
	}
	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}
	public String getForwardgoal() {
		return forwardgoal;
	}
	public void setForwardgoal(String forwardgoal) {
		this.forwardgoal = forwardgoal;
	}
	public String getModulename() {
		return modulename;
	}
	public void setModulename(String modulename) {
		this.modulename = modulename;
	}
	public LccModule getLccModule() {
		return lccModule;
	}
	public void setLccModule(LccModule lcaModule) {
		this.lccModule = lccModule;
	}
	public String getProjectdesc() {
		return projectdesc;
	}
	public void setProjectdesc(String projectdesc) {
		this.projectdesc = projectdesc;
	}
	public String getCalcumethod() {
		return calcumethod;
	}
	public void setCalcumethod(String calcumethod) {
		this.calcumethod = calcumethod;
	}
	public String getImpactcategory() {
		return impactcategory;
	}
	public void setImpactcategory(String impactcategory) {
		this.impactcategory = impactcategory;
	}
	public String getGetrule() {
		return getrule;
	}
	public void setGetrule(String getrule) {
		this.getrule = getrule;
	}
	public String getAssumption() {
		return assumption;
	}
	public void setAssumption(String assumption) {
		this.assumption = assumption;
	}
	public Set<Lcadatasetlist> getLcadatasetlists() {
		return lcadatasetlists;
	}
	public void setLcadatasetlists(Set<Lcadatasetlist> lcadatasetlists) {
		this.lcadatasetlists = lcadatasetlists;
	}
	public String getDatasetname() {
		return datasetname;
	}
	public void setDatasetname(String datasetname) {
		this.datasetname = datasetname;
	}
	public String getBuildtime() {
		return buildtime;
	}
	public void setBuildtime(String buildtime) {
		this.buildtime = buildtime;
	}
	public String getUUID() {
		return UUID;
	}
	public void setUUID(String uUID) {
		UUID = uUID;
	}
	
	
}