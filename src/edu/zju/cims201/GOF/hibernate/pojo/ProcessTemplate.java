package edu.zju.cims201.GOF.hibernate.pojo;

import java.util.Date;


/**
 * 
 * 基础过程类
 *
 */
public class ProcessTemplate {
	
	

	/**
	 * 
	 * 过程id
	 *
	 */
	private int id;

	/**
	 * 
	 * 过程名称
	 *
	 */
	private String name;
	/**
	 * 
	 * 过程编号
	 *
	 */
	private String processid;
	/**
	 * 
	 * 过程开始时间(共建过程)
	 *
	 */
	private Date starttime;
	/**
	 * 
	 *  过程结束时间(共建过程)
	 *
	 */
	private Date endtime;
	/**
	 * 
	 * 过程备注
	 *
	 */
	private String note;
	
	
	public ProcessTemplate() {
		
	}


	public ProcessTemplate(int id, String name, String processid,
	Date starttime,Date endtime) {
		this.id = id;
		this.name = name;
		this.processid = processid;
		this.starttime=starttime;
		this.endtime=endtime;
	}





	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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



	public String getNote() {
		return note;
	}


	public void setNote(String note) {
		this.note = note;
	}


	public String getProcessid() {
		return processid;
	}


	public void setProcessid(String processid) {
		this.processid = processid;
	}


}
