package edu.zju.cims201.GOF.hibernate.pojo.pdm;

import java.util.Date;

import edu.zju.cims201.GOF.hibernate.pojo.LccModule;
import edu.zju.cims201.GOF.hibernate.pojo.ProcessTemplate;

public class LccTask {

	
	private Long id;
	private String name;
	private String processid;
	private String status;
	private Employee checkperson;
	private Employee carrier;
	private String mainFileName;
	private Date starttime;
	private ProcessTemplate processTemplate;
	private LccModule lccModule;
	private Date endtime;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getStarttime() {
		return starttime;
	}
	public void setStarttime(Date starttime) {
		this.starttime = starttime;
	}
	public Date getEndtime() {
		return endtime;
	}
	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}
	public Employee getCheckperson() {
		return checkperson;
	}
	public void setCheckperson(Employee checkperson) {
		this.checkperson = checkperson;
	}
	public ProcessTemplate getProcessTemplate() {
		return processTemplate;
	}
	public void setProcessTemplate(ProcessTemplate processTemplate) {
		this.processTemplate = processTemplate;
	}
	
	public String getMainFileName() {
		return mainFileName;
	}
	public void setMainFileName(String mainFileName) {
		this.mainFileName = mainFileName;
	}
	public Employee getCarrier() {
		return carrier;
	}
	public void setCarrier(Employee carrier) {
		this.carrier = carrier;
	}
	public String getProcessid() {
		return processid;
	}
	public void setProcessid(String processid) {
		this.processid = processid;
	}
	public LccModule getLccModule() {
		return lccModule;
	}
	public void setLccModule(LccModule lccModule) {
		this.lccModule = lccModule;
	}

}
