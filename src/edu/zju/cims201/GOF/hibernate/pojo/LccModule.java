package edu.zju.cims201.GOF.hibernate.pojo;

import java.util.HashSet;
import java.util.Set;


/**
 * 
 *lca模板类
 *
 */


public class LccModule extends BaseModule{

	private LccModule parent;
	private Component component;
	private String processid;
	private String levelid;
	private String parentlevelid;
	private String name;
	private int isparent;
	private String branchUUID;
	private int hasreference;
	private String referbranchUUID;
	private String refermoduleUUID;
	private Set<LccModule> lccModules=new HashSet<LccModule>();
	private Set<LccProcessTemplate> lccprocessTemplates=new HashSet<LccProcessTemplate>();
	/**
     * 判断是否是顶层模板
     * @return
     */
	public int getIsparent() {
		return isparent;
	}
	public void setIsparent(int isparent) {
		this.isparent = isparent;
	}
	/**
     * 获取父模板
     * @return
     */
	public LccModule getParent() {
		return parent;
	}
	public void setParent(LccModule parent) {
		this.parent = parent;
	}

	/**
     * 模板对应产品
     * @return
     */
	public Component getComponent() {
		return component;
	}
	public void setComponent(Component component) {
		this.component = component;
	}
	/**
     * 模板对应产品
     * @return
     */
	public Set<LccModule> getLccModules() {
		return lccModules;
	}
	public void setLccModules(Set<LccModule> lccModules) {
		this.lccModules = lccModules;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getProcessid() {
		return processid;
	}
	public void setProcessid(String processid) {
		this.processid = processid;
	}
	public String getLevelid() {
		return levelid;
	}
	public void setLevelid(String levelid) {
		this.levelid = levelid;
	}
	public String getParentlevelid() {
		return parentlevelid;
	}
	public void setParentlevelid(String parentlevelid) {
		this.parentlevelid = parentlevelid;
	}
	public Set<LccProcessTemplate> getLccprocessTemplates() {
		return lccprocessTemplates;
	}
	public void setLccprocessTemplates(Set<LccProcessTemplate> lccprocessTemplates) {
		this.lccprocessTemplates = lccprocessTemplates;
	}
	public String getBranchUUID() {
		return branchUUID;
	}
	public void setBranchUUID(String branchUUID) {
		this.branchUUID = branchUUID;
	}
	public String getReferbranchUUID() {
		return referbranchUUID;
	}
	public void setReferbranchUUID(String referbranchUUID) {
		this.referbranchUUID = referbranchUUID;
	}
	public String getRefermoduleUUID() {
		return refermoduleUUID;
	}
	public void setRefermoduleUUID(String refermoduleUUID) {
		this.refermoduleUUID = refermoduleUUID;
	}
	public int getHasreference() {
		return hasreference;
	}
	public void setHasreference(int hasreference) {
		this.hasreference = hasreference;
	}

	
	
	
	
}
