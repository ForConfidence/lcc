package edu.zju.cims201.GOF.hibernate.pojo.pdm;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import edu.zju.cims201.GOF.hibernate.pojo.Component;

/**
 * lcc模板分支类
 *
 */
public class LccModuleBranchManage {
	/**
	 * id
	 */
	private int id;
	/**
	 * 分支名称
	 */
	private String name;
	private String note;
	private Date createdate;	
	private int createuserid;
	/**
	 * 父分支UUID
	 */
	private String parentUUID;
	/**
	 * 分支UUID
	 */
	private String branchUUID;
	/**
	 * 分支路径
	 */
	private String moduledir;
	/**
	 * 分支是否上传
	 */
	private int isupload;
	/**
	 * 分支是否完成
	 */
	private int iscomplete;
	/**
	 *分支是否为基本分支
	 */
	private int isbase;
	/**
	 * 分支是否引用其他分支
	 */
	private int hasreference;
	/**
     * 模板对应评价
     */
	private Set comments=new HashSet<ModuleComment>();
	/**
     * 模板评价记录
     */
	private ModuleCommentRecord commentrecord;
	
    public LccModuleBranchManage(){
    	
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
	public String getParentUUID() {
		return parentUUID;
	}
	public void setParentUUID(String parentUUID) {
		this.parentUUID = parentUUID;
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
	public String getModuledir() {
		return moduledir;
	}
	public void setModuledir(String moduledir) {
		this.moduledir = moduledir;
	}
	public int getIscomplete() {
		return iscomplete;
	}
	public void setIscomplete(int iscomplete) {
		this.iscomplete = iscomplete;
	}
	public int getIsbase() {
		return isbase;
	}
	public void setIsbase(int isbase) {
		this.isbase = isbase;
	}
	public int getHasreference() {
		return hasreference;
	}
	public void setHasreference(int hasreference) {
		this.hasreference = hasreference;
	}

	public Set getComments() {
		return comments;
	}

	public void setComments(Set comments) {
		this.comments = comments;
	}

	public ModuleCommentRecord getCommentrecord() {
		return commentrecord;
	}

	public void setCommentrecord(ModuleCommentRecord commentrecord) {
		this.commentrecord = commentrecord;
	}
    
}
