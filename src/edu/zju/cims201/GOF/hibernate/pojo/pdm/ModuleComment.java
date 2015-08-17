package edu.zju.cims201.GOF.hibernate.pojo.pdm;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;


public class ModuleComment implements Comparable<ModuleComment>{
	
	
	
	private Long id;
	private LccModuleBranchManage branch;
	private ModuleComment commented;
	private Employee commenter;
	private Set<ModuleComment> comments=new HashSet<ModuleComment>();
	private Set<ModuleVote> votes=new HashSet<ModuleVote>();
	private String content;
	private Date commmentTime;
	private Integer supportVoteCount;
	private Integer againstVoteCount;
	private Integer heat;
	private Integer isBest;//最佳答案
	
	
	
	//用来表示该节点是否是子节点
	private int tail;
	
	
	
	
	public Integer getAgainstVoteCount() {
		return againstVoteCount;
	}
	public void setAgainstVoteCount(Integer againstVoteCount) {
		this.againstVoteCount = againstVoteCount;
	}
	
	public Date getCommmentTime() {
		return commmentTime;
	}
	public void setCommmentTime(Date commmentTime) {
		this.commmentTime = commmentTime;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public Integer getSupportVoteCount() {
		return supportVoteCount;
	}
	public void setSupportVoteCount(Integer supportVoteCount) {
		this.supportVoteCount = supportVoteCount;
	}
	public Integer getHeat() {
		return heat;
	}
	public void setHeat(Integer heat) {
		this.heat = heat;
	}
	public int getTail() {
		return tail;
	}
	public void setTail(int tail) {
		this.tail = tail;
	}
	public Integer getIsBest() {
		return isBest;
	}
	public void setIsBest(Integer isBest) {
		this.isBest = isBest;
	}
	
	public Employee getCommenter() {
		return commenter;
	}
	public void setCommenter(Employee commenter) {
		this.commenter = commenter;
	}
	public void setCommented(ModuleComment commented) {
		this.commented = commented;
	}
	
	public Set<ModuleComment> getComments() {
		return comments;
	}
	public void setComments(Set<ModuleComment> comments) {
		this.comments = comments;
	}
	public ModuleComment getCommented() {
		return commented;
	}
	public int compareTo(ModuleComment o) {
	if(commmentTime.before(o.commmentTime))
		return 1;
	else
		return -1;
	}
	public Set<ModuleVote> getVotes() {
		return votes;
	}
	public void setVotes(Set<ModuleVote> votes) {
		this.votes = votes;
	}
	public LccModuleBranchManage getBranch() {
		return branch;
	}
	public void setBranch(LccModuleBranchManage branch) {
		this.branch = branch;
	}
	
}
