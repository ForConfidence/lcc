package edu.zju.cims201.GOF.hibernate.pojo;

import java.util.HashSet;
import java.util.Set;
/**
 * lcc过程类
 *
 */
public class LccProcessTemplate extends ProcessTemplate {
	
	/**
	 * 所属模板
	 */
	private LccModule module;
	/**
	 * 过程UUID
	 */
    private String processUUID;




	public String getProcessUUID() {
		return processUUID;
	}


	public void setProcessUUID(String processUUID) {
		this.processUUID = processUUID;
	}


	public LccModule getModule() {
		return module;
	}


	public void setModule(LccModule module) {
		this.module = module;
	}




}
