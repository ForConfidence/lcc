package edu.zju.cims201.GOF.service.comment;

import java.util.List;

import edu.zju.cims201.GOF.hibernate.pojo.BaseModule;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccModuleBranchManage;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleComment;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleRating;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleVote;

public interface CommentService {
	public List<ModuleComment> getComments(LccModuleBranchManage branch);
	public List<ModuleComment> getHotComments(BaseModule module);
	public String addComment(ModuleComment comment);
	public String updateComment(ModuleComment comment);
	public boolean isVoted(Long userid,Long commentid);
	public boolean isRated(Long userid,Integer branchid);
	public Float getAverageRating(LccModuleBranchManage branch);
	public String rate(Long userid,LccModuleBranchManage branch,Float score);
	public ModuleComment getComment(Long commentid);
	public ModuleRating getRate(Long userid, Integer moduleid);
	public String deleteComment(Long commentid);
	public String deleteComments(Long commentid);
	public String addVote(ModuleVote vote);
	public void deleteCommentByModule(LccModuleBranchManage branch);
	
	

}


