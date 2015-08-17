package edu.zju.cims201.GOF.service.comment;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.lccmodule.ModuleCommentDao;
import edu.zju.cims201.GOF.dao.lccmodule.ModuleCommentRecordDao;
import edu.zju.cims201.GOF.dao.lccmodule.RatingDao;
import edu.zju.cims201.GOF.dao.lccmodule.VoteDao;
import edu.zju.cims201.GOF.hibernate.pojo.BaseModule;
import edu.zju.cims201.GOF.hibernate.pojo.Vote;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccModuleBranchManage;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleComment;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleCommentRecord;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleRating;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleVote;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
	@Resource(name="moduleCommentDao")
	private ModuleCommentDao commentdao;
	@Resource(name="voteDao")
	private VoteDao votedao;
	@Resource(name="ratingDao")
	private RatingDao ratingdao;

	@Resource(name="moduleCommentRecordDao")
	private ModuleCommentRecordDao commentrecorddao;


	public String addComment(ModuleComment comment) {	
		comment.setTail(1);
		commentdao.save(comment);
		//改变所有父节点的tail值
		ModuleComment fatherNode = comment.getCommented(); 
		while(fatherNode != null){
			fatherNode.setTail(0);
			commentdao.save(fatherNode);
			fatherNode = fatherNode.getCommented();
		}
		commentdao.flush();
		return "1";	
	}
		

	public String addVote(ModuleVote vote) {
		//System.out.println("addvote+++++++++++++++++++++++++++++");
		int totalcount = 0;
		votedao.save(vote);
		votedao.flush();
		
		if(vote.getIsSupport()){
			commentdao.get(vote.getComment().getId()).setSupportVoteCount(commentdao.get(vote.getComment().getId()).getSupportVoteCount()+1);
		}else{
			commentdao.get(vote.getComment().getId()).setAgainstVoteCount(commentdao.get(vote.getComment().getId()).getAgainstVoteCount()+1);
		}

		
		if(commentdao.get(vote.getComment().getId()).getComments().size()>0) {
			totalcount = getHeatCounts(vote.getComment().getId())+1;
			
		}
		//System.out.println("shu"+totalcount);
		
		commentdao.get(vote.getComment().getId()).setHeat(commentdao.get(vote.getComment().getId()).getSupportVoteCount()+commentdao.get(vote.getComment().getId()).getAgainstVoteCount()+totalcount);
		commentdao.flush();
		return "1";
		
	}
		
	public Integer getHeatCounts(Long commentid) {
		int count=0;
		Set<ModuleComment> cts = commentdao.get(commentid).getComments();
		
		Iterator it=cts.iterator();
		while(it.hasNext())
		 {count++;
		 ModuleComment temp=(ModuleComment)it.next();
		 if(temp.getComments()!=null)
			 count+=getHeatCounts(temp.getId());			
		 }
		return count;
	}
	
	public String deleteComments(Long commentid)
	{   ModuleComment comment= getComment(commentid);
		if(!comment.getComments().isEmpty()&&null!=comment.getIsBest()&&comment.getIsBest()!=1)
		
		{
		 for(ModuleComment tempcomment:comment.getComments())	
		 {
			 deleteComments(tempcomment.getId());
		 }
			
		}
		if(comment.getIsBest()==1){
			ModuleComment headcomment=comment.getCommented();
			Set<ModuleComment> commentset=headcomment.getComments();
			commentset.remove(comment);
			headcomment.setComments(commentset);
			commentdao.save(headcomment);
		
			comment.setCommented(null);
			comment.setTail(0);
			commentdao.save(comment);
			commentdao.flush();
		} 
		else
		deleteComment(comment.getId());
		return null;
	}

	public String deleteComment(Long commentid) {
		
		ModuleComment tempcomment=commentdao.findUniqueBy("id", commentid);
		ModuleCommentRecord cr=tempcomment.getBranch().getCommentrecord();
		cr.setCommentCount(cr.getCommentCount()-1);
		commentrecorddao.save(cr);
		
		commentdao.delete(commentid);
		commentdao.flush();
		commentrecorddao.flush();
		return "1";
	}
	
	public String deleteComment(ModuleComment comment) {
		
		return deleteComment(comment.getId());
	}
	
//bad
	public Float getAverageRating(LccModuleBranchManage branch) {
		int count = 0;
		Float totalscore = 0f;
		Float averagescore;
		Map<String,Object> params = new HashMap<String ,Object>();
		params.put("branch", branch.getId());
		String hql = "from ModuleRating o where o.branch.id= :branch";
		List<ModuleRating> ratinglists=(ArrayList<ModuleRating>)ratingdao.createQuery(hql, params).list();
		System.out.println("得到的分数组"+ratinglists);
		for(ModuleRating rating:ratinglists) {		
			totalscore += rating.getScore();
			count++;
		}
		if(count>0) {
			averagescore = totalscore / count;
			
		} else {
			return null;
		}		
		return averagescore;
	}

	public List<ModuleComment> getComments( LccModuleBranchManage branch) {
		Map<String,Object> params = new HashMap<String ,Object>();
		params.put("branch", branch);
        System.out.println(branch.getId());
		String hql = "from ModuleComment o where o.branch= :branch order by o.commmentTime desc";
	//	String hql = "from ModuleComment o where o.knowledge.id= :knowledge and o.tail = 1 order by o.commmentTime desc";
		Query query=commentdao.createQuery(hql, params);

		List<ModuleComment> commentlist=(ArrayList<ModuleComment>)query.list();

		return  commentlist;
	}

	public List<ModuleComment> getHotComments(BaseModule module) {
		Map<String,Object> params = new HashMap<String ,Object>();
		params.put("module", module.getId());
		String hql = "from ModuleComment o where o.module.id= :module  order by o.heat desc";
		Query query=commentdao.createQuery(hql, params);
		query.setFirstResult(0);
		query.setMaxResults(5);
		List<ModuleComment> hotcommentlist=(ArrayList<ModuleComment>)query.list();

		return hotcommentlist;		
	}

	public boolean isRated(Long userid, Integer moduleid) {
		Map<String,Object> params = new HashMap<String ,Object>();
		params.put("user", userid);
		params.put("branch",moduleid);
		
		String hql = "from ModuleRating o where o.rater.id= :user and o.branch.id= :branch ";
		List<ModuleRating> ratinglist=(ArrayList<ModuleRating>)ratingdao.createQuery(hql, params).list();
		if(ratinglist.size()>0)
			return true;	
		return false;
		
	}
	
	public ModuleRating getRate(Long userid, Integer moduleid){
		Map<String,Object> params = new HashMap<String ,Object>();
		params.put("user", userid);
		params.put("branch",moduleid);
		
		String hql = "from ModuleRating o where o.rater.id= :user and o.branch.id= :branch ";
		List<ModuleRating> ratinglist=(ArrayList<ModuleRating>)ratingdao.createQuery(hql, params).list();
		if(ratinglist.size()>0)
			return ratinglist.get(0);	
		return null;
	}
	

	public boolean isVoted(Long userid, Long commentid) {
		Map<String,Object> params = new HashMap<String ,Object>();
		params.put("user", userid);
		params.put("comment",commentid);
		
		String hql = "from ModuleVote o where o.user.id= :user and o.comment.id= :comment ";
		List<Vote> votelist=(ArrayList<Vote>)votedao.createQuery(hql, params).list();
		if(votelist.size()>0)
			return true;	
		return false;
		
	}
	public ModuleComment getComment(Long commentid) {
		ModuleComment result = commentdao.findUniqueBy("id", commentid);
		return result;
	}

	public String rate(Long userid,LccModuleBranchManage branch, Float score) {
		ModuleRating rating = new ModuleRating();
		//SystemUser user = userdao.findUniqueBy("id", userid);
		Employee employee=new Employee();
		employee.setId(userid);
		System.out.println(branch.getBranchUUID());
		ModuleCommentRecord cr=branch.getCommentrecord();
		Long ratecount=cr.getRatecount();
		if(ratecount==null)
			ratecount=new Long(0);
			cr.setRatecount(ratecount+1);
		commentrecorddao.save(cr);
	
		rating.setBranch(branch);
		rating.setRater(employee);
		rating.setRatingTime(new Date());
		rating.setScore(score);
		ratingdao.save(rating);
		ratingdao.flush();
		commentrecorddao.flush();
		return "1";
	}



	public String updateComment(ModuleComment comment) {
		commentdao.save(comment);
		commentdao.flush();
		return "1";
	}
	
	//回答模块

	public void deleteCommentByModule(LccModuleBranchManage branch) {
		List<ModuleComment> mks = this.commentdao.findBy("branch", branch);
		for(ModuleComment a : mks){
			this.commentdao.delete(a);			
	}

	}

}

