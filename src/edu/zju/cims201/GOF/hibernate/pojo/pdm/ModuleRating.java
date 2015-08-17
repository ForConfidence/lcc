package edu.zju.cims201.GOF.hibernate.pojo.pdm;

import java.util.Date;

import edu.zju.cims201.GOF.hibernate.pojo.BaseModule;

public class ModuleRating {
	
	
	
	
	private Long id;
	private Employee rater;
	private LccModuleBranchManage branch;
	private Float Score;
	private Date ratingTime;
	
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getRatingTime() {
		return ratingTime;
	}
	public void setRatingTime(Date ratingTime) {
		this.ratingTime = ratingTime;
	}
	public Float getScore() {
		return Score;
	}
	public void setScore(Float score) {
		Score = score;
	}
	public Employee getRater() {
		return rater;
	}
	public void setRater(Employee rater) {
		this.rater = rater;
	}
	public LccModuleBranchManage getBranch() {
		return branch;
	}
	public void setBranch(LccModuleBranchManage branch) {
		this.branch = branch;
	}
     

}
