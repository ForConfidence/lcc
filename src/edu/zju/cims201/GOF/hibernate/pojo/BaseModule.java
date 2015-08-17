package edu.zju.cims201.GOF.hibernate.pojo;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleComment;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleCommentRecord;


/**
 * 
 * 基础模板类
 *
 */


public class BaseModule {
	/**
     * 模板id
     */
	private int id;
	/**
     * 模板名称
     */
	private String name;
	/**
     * 模板创建时间
     */
	private Date createdate;	
	/**
     * 模板创建者编号
     */
	private int createuserid;
	/**
     * 模板备注
     */
	private String note;
	/**
     * 模板存储路径
     */
	private String moduledir;
	/**
     * 模板对应文件名称
     */
	private String XmlFileName;
	/**
     * 模板UUID
     */
	private String moduleUUID;
	/**
     * 模板版本
     */
	private String version;
	/**
     * 模板对应评价
     */
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
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
	
	public String getModuledir() {
		return moduledir;
	}
	public void setModuledir(String moduledir) {
		this.moduledir = moduledir;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public Date getCreatedate() {
		return createdate;
	}
	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}
	public int getCreateuserid() {
		return createuserid;
	}
	public void setCreateuserid(int createuserid) {
		this.createuserid = createuserid;
	}
	
	public String getXmlFileName() {
		return XmlFileName;
	}
	public void setXmlFileName(String xmlFileName) {
		XmlFileName = xmlFileName;
	}
	
	public String getModuleUUID() {
		return moduleUUID;
	}
	public void setModuleUUID(String moduleUUID) {
		this.moduleUUID = moduleUUID;
	}

}
