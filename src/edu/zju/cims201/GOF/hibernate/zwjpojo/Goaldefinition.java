package edu.zju.cims201.GOF.hibernate.zwjpojo;

/**
 * Goaldefinition entity. @author MyEclipse Persistence Tools
 */

public class Goaldefinition implements java.io.Serializable {

	private Integer id;
	private String projectname;
	private String companyname;
	private String comapanyfrom;
	private String forwardgoal;
	private String projectdesc;
	private String techrepre;
	private String timerepre;
	private String locationrepre;
	private String userrepre;
	private String projectunit;
	private String projectscope;
	private String impactcategory;
	private String getrule;
	private String assumption;
	private String datadesc;
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
	public String getComapanyfrom() {
		return comapanyfrom;
	}
	public void setComapanyfrom(String comapanyfrom) {
		this.comapanyfrom = comapanyfrom;
	}
	public String getForwardgoal() {
		return forwardgoal;
	}
	public void setForwardgoal(String forwardgoal) {
		this.forwardgoal = forwardgoal;
	}
	public String getProjectdesc() {
		return projectdesc;
	}
	public void setProjectdesc(String projectdesc) {
		this.projectdesc = projectdesc;
	}
	public String getTechrepre() {
		return techrepre;
	}
	public void setTechrepre(String techrepre) {
		this.techrepre = techrepre;
	}
	public String getTimerepre() {
		return timerepre;
	}
	public void setTimerepre(String timerepre) {
		this.timerepre = timerepre;
	}
	public String getLocationrepre() {
		return locationrepre;
	}
	public void setLocationrepre(String locationrepre) {
		this.locationrepre = locationrepre;
	}
	public String getUserrepre() {
		return userrepre;
	}
	public void setUserrepre(String userrepre) {
		this.userrepre = userrepre;
	}
	public String getProjectunit() {
		return projectunit;
	}
	public void setProjectunit(String projectunit) {
		this.projectunit = projectunit;
	}
	public String getProjectscope() {
		return projectscope;
	}
	public void setProjectscope(String projectscope) {
		this.projectscope = projectscope;
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
	public String getDatadesc() {
		return datadesc;
	}
	public void setDatadesc(String datadesc) {
		this.datadesc = datadesc;
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