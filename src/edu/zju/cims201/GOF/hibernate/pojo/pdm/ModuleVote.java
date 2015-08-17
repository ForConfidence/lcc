package edu.zju.cims201.GOF.hibernate.pojo.pdm;

import java.util.Date;

public class ModuleVote {
	
	
	
	private Long id;
	private Employee user;
	private Boolean isSupport;
	private ModuleComment comment;
	private Date voteTime;
	
	
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Boolean getIsSupport() {
		return isSupport;
	}
	public void setIsSupport(Boolean isSupport) {
		this.isSupport = isSupport;
	}

	public Date getVoteTime() {
		return voteTime;
	}
	public void setVoteTime(Date voteTime) {
		this.voteTime = voteTime;
	}
	public Employee getUser() {
		return user;
	}
	public void setUser(Employee user) {
		this.user = user;
	}
	public ModuleComment getComment() {
		return comment;
	}
	public void setComment(ModuleComment comment) {
		this.comment = comment;
	}

}
