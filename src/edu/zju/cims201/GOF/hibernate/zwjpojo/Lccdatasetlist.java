package edu.zju.cims201.GOF.hibernate.zwjpojo;

/**
 * Lcadatasetlist entity. @author MyEclipse Persistence Tools
 */

public class Lccdatasetlist implements java.io.Serializable {

	// Fields

	private Integer id;
	private String datasetname;
	private String datasetintro;
	private String datasetrule;
	private String datasetcuracy;
	private String datasetuncertainty;
	private int moduleid;
	private int processid;
	private String branchUUID;
	private String UUID;
	private int isbase;

	// Constructors

	/** default constructor */
	public Lccdatasetlist() {
	}

	/** full constructor */
	public Lccdatasetlist(String datasetname, String datasetintro,
			String datasetrule, String datasetcuracy,
			String datasetuncertainty, int moduleid, String processid) {
		this.datasetname = datasetname;
		this.datasetintro = datasetintro;
		this.datasetrule = datasetrule;
		this.datasetcuracy = datasetcuracy;
		this.datasetuncertainty = datasetuncertainty;
		this.moduleid = moduleid;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDatasetname() {
		return this.datasetname;
	}

	public void setDatasetname(String datasetname) {
		this.datasetname = datasetname;
	}

	public String getDatasetintro() {
		return this.datasetintro;
	}

	public void setDatasetintro(String datasetintro) {
		this.datasetintro = datasetintro;
	}

	public String getDatasetrule() {
		return this.datasetrule;
	}

	public void setDatasetrule(String datasetrule) {
		this.datasetrule = datasetrule;
	}

	public String getDatasetcuracy() {
		return this.datasetcuracy;
	}

	public void setDatasetcuracy(String datasetcuracy) {
		this.datasetcuracy = datasetcuracy;
	}

	public String getDatasetuncertainty() {
		return this.datasetuncertainty;
	}

	public void setDatasetuncertainty(String datasetuncertainty) {
		this.datasetuncertainty = datasetuncertainty;
	}

	
	public int getModuleid() {
		return moduleid;
	}

	public void setModuleid(int moduleid) {
		this.moduleid = moduleid;
	}

	public String getUUID() {
		return UUID;
	}

	public void setUUID(String uUID) {
		UUID = uUID;
	}

	public int getIsbase() {
		return isbase;
	}

	public void setIsbase(int isbase) {
		this.isbase = isbase;
	}

	public String getBranchUUID() {
		return branchUUID;
	}

	public void setBranchUUID(String branchUUID) {
		this.branchUUID = branchUUID;
	}

	public int getProcessid() {
		return processid;
	}

	public void setProcessid(int processid) {
		this.processid = processid;
	}

}