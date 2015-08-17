package edu.zju.cims201.GOF.web.lcc;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.stringtree.json.JSONWriter;

import edu.zju.cims201.GOF.hibernate.pojo.BaseModule;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccModuleBranchManage;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleComment;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleCommentRecord;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleRating;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleVote;
import edu.zju.cims201.GOF.rs.dto.ModuleCommentDTO;
import edu.zju.cims201.GOF.rs.dto.PageDTO;
import edu.zju.cims201.GOF.rs.dto.VoteDTO;
import edu.zju.cims201.GOF.service.comment.CommentService;
import edu.zju.cims201.GOF.service.module.ModuleService;
import edu.zju.cims201.GOF.service.systemUser.UserService;
import edu.zju.cims201.GOF.web.CrudActionSupport;


/**
 * 模板评价类
 *
 */
@Namespace("/comment")
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "comment.action", type = "redirect"),
})
public class ModulecommentAction extends CrudActionSupport<ModuleComment> implements ServletResponseAware, ServletRequestAware {
	private static final long serialVersionUID = 8683878162525847072L;
	@Resource(name="commentServiceImpl")
	private CommentService commentservice;
	@Resource(name="userServiceImpl")
	private UserService userservice;
	@Resource(name="moduleServiceImpl")
	private ModuleService moduleService;
    
	private String moduleid;
	private Long commentid;
	private int index;
	private int size;
	private String content;
	private Boolean isSupport;
	private Float score;
	private ModuleComment entity;
	private String branchid;
	
	
	private HttpServletResponse response;
	@Override
	public String delete() throws Exception {		

		commentservice.deleteComments(commentid);
		//System.out.println("删除一些操作！，并转向 list即 comment.aciton");
		return null;
	}
	@Override
	public String input() throws Exception {
		
		return INPUT;
	}
		
	@Override
	public String list() throws Exception {
	
		return SUCCESS;
	}
	
	/**
	 * 
	 * 列出相关模板的评论
	 * @return
	 * @throws Exception
	 */
	public String listComment() throws Exception {
		

		PageDTO pd = new PageDTO();
		LccModuleBranchManage branch = moduleService.getlccBranchbybranchid(branchid);	
		pd.setKccounts(commentservice.getComments(branch).size());
		if(null==branch.getCommentrecord())
		{
			ModuleCommentRecord cr = new ModuleCommentRecord();
			cr.setCommentCount(new Long(0));
			cr.setViewCount(new Long(0));
			cr.setRate(new Float(0));
			cr.setDownloadCount(new Long(0));
			branch.setCommentrecord(cr);
		}
		else
		{
			branch.getCommentrecord().setCommentCount((long)(commentservice.getComments(branch).size()));
		}
		moduleService.saveLccModuleBranch(branch);
	
		List<ModuleCommentDTO>cdtos=new ArrayList<ModuleCommentDTO>();
		List<ModuleComment> clist=commentservice.getComments(branch);

		for (ModuleComment comment: clist) {
			ModuleComment commented=comment.getCommented();			
			if(null==commented){
				ModuleCommentDTO commentdto=new ModuleCommentDTO();
				Set<ModuleCommentDTO> commentdtos1 = new TreeSet<ModuleCommentDTO>();
				commentdto.setId(comment.getId());
				commentdto.setCommenterName(comment.getCommenter().getName());
				commentdto.setCommenterpicpath(null);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");	
				String commenttime=sdf.format(comment.getCommmentTime());
				commentdto.setCommmentTime(commenttime);
				commentdto.setContent(comment.getContent());
				commentdto.setIsBest(comment.getIsBest());				
				commentdto.setHeat(comment.getHeat());
				commentdto.setBranchid(comment.getBranch().getId());
				commentdto.setSupportVoteCount(comment.getSupportVoteCount());
				commentdto.setAgainstVoteCount(comment.getAgainstVoteCount());
				Set<ModuleComment> coms = comment.getComments();
				if(null!=coms){					
					for(ModuleComment comment1:coms) {
						ModuleCommentDTO commentdto1 = getCommentDTOs(comment1);
						commentdtos1.add(commentdto1);
						commentdto.setCommentdtos(commentdtos1);
						
					}
				}
				cdtos.add(commentdto);
			}		
		}

		
		List<ModuleCommentDTO> subList = new ArrayList<ModuleCommentDTO>();		
		for(int i=index*size;i<((index+1)*size<cdtos.size()?(index+1)*size:cdtos.size());i++){
			subList.add(cdtos.get(i));
		}				
		pd.setData(subList);
		pd.setTotal(cdtos.size());		
		int totalPage;
		if(size != 0) {
			if(cdtos.size()%size == 0){
				totalPage = cdtos.size()/size;
			}else{
				totalPage = cdtos.size()/size+1;
			}
			pd.setTotalPage(cdtos.size()/size+1);			
		}		
		JSONWriter writer = new JSONWriter();
        String ktypestring=writer.write(pd);  
       	response.getWriter().print(ktypestring);
		
	return null;
	}
	
	protected ModuleCommentDTO getCommentDTOs(ModuleComment comment)
	{
		
			ModuleCommentDTO commentdto=new ModuleCommentDTO();
			Set<ModuleCommentDTO> commentdtos = new HashSet<ModuleCommentDTO>();
			commentdto.setId(comment.getId());
			commentdto.setAgainstVoteCount(comment.getAgainstVoteCount());
			commentdto.setCommenterName(comment.getCommenter().getName());
			commentdto.setCommenterpicpath(null);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");	
			String commenttime=sdf.format(comment.getCommmentTime());
			commentdto.setCommmentTime(commenttime);
			commentdto.setCommented(getCommentDTO(comment.getCommented()));
			commentdto.setCommenterpicpath(null);
			commentdto.setContent(comment.getContent());
			commentdto.setIsBest(comment.getIsBest());
			commentdto.setHeat(comment.getHeat());
			commentdto.setBranchid(comment.getBranch().getId());
			commentdto.setSupportVoteCount(comment.getSupportVoteCount());
			Set<ModuleComment> comments = comment.getComments();
	        if(null!=comments){
	        	
	        	for(ModuleComment comment2:comments) {
	        		ModuleCommentDTO commentdto2 = getCommentDTOs(comment2);	        		
	        		commentdtos.add(commentdto2);
	        		commentdto.setCommentdtos(commentdtos);
					
				}

	        } 				
		return commentdto;
	} 
	/**
	 * 
	 * 列出相关模板的评论
	 * @return
	 * @throws Exception
	 */
	public String listBestAnswer() throws Exception {
		LccModuleBranchManage branch = moduleService.getlccBranchbybranchid(branchid);	
		List<ModuleCommentDTO>bestAnswerList=new ArrayList<ModuleCommentDTO>();
		List<ModuleComment> clist=commentservice.getComments(branch);
		
		
		for (ModuleComment comment: clist) {
					if(comment.getIsBest()==1){
					ModuleCommentDTO commentdto=new ModuleCommentDTO();
					commentdto.setId(comment.getId());
					commentdto.setCommented(getCommentDTO(comment.getCommented()));
					commentdto.setCommenterName(comment.getCommenter().getName());
					commentdto.setCommenterpicpath(null);
			        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");	
					String commenttime=sdf.format(comment.getCommmentTime());
				    commentdto.setCommmentTime(commenttime);
					commentdto.setContent(comment.getContent());
					commentdto.setHeat(comment.getHeat());
					commentdto.setIsBest(comment.getIsBest());
					commentdto.setBranchid(comment.getBranch().getId());
					commentdto.setSupportVoteCount(comment.getSupportVoteCount());
					commentdto.setAgainstVoteCount(comment.getAgainstVoteCount());
				
			
					bestAnswerList.add(commentdto);
					 }
			}

	
		JSONWriter writer = new JSONWriter();
        String bestAnswerList_string=writer.write(bestAnswerList);  
       	response.getWriter().print(bestAnswerList_string);
		
	return null;
	}

	/**
	 * 
	 * 列出相关模板的最热评论
	 * @return
	 * @throws Exception
	 */
	public String listHotComment() throws Exception {
		

		BaseModule module = moduleService.getModule(moduleid);
				
		List<ModuleCommentDTO>cdtos=new ArrayList<ModuleCommentDTO>();
		List<ModuleComment> hclist=commentservice.getHotComments(module);
				
		for (ModuleComment comment: hclist) {
			ModuleCommentDTO commentdto=new ModuleCommentDTO();
			commentdto.setId(comment.getId());
			commentdto.setCommenterName(comment.getCommenter().getName());
			commentdto.setCommenterpicpath(null);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
			String commenttime=sdf.format(comment.getCommmentTime());
		
		     commentdto.setCommmentTime(commenttime);
			commentdto.setContent(comment.getContent());
			commentdto.setHeat(comment.getHeat());
			commentdto.setBranchid(comment.getBranch().getId());
			commentdto.setSupportVoteCount(comment.getSupportVoteCount());
			commentdto.setAgainstVoteCount(comment.getAgainstVoteCount());
				
			cdtos.add(commentdto);
		}
		
		JSONWriter jw=new JSONWriter();
		String json=jw.write(cdtos);
		response.getWriter().print(json);
		
		return null;
	}
	


	protected ModuleCommentDTO getCommentDTO(ModuleComment comment)
	{
		if(comment!=null){
			ModuleCommentDTO commentdto=new ModuleCommentDTO();
			commentdto.setId(comment.getId());
			commentdto.setAgainstVoteCount(comment.getAgainstVoteCount());
			commentdto.setCommenterpicpath(null);
			commentdto.setCommenterName(comment.getCommenter().getName());
	        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
			String commenttime=sdf.format(comment.getCommmentTime());
			commentdto.setIsBest(comment.getIsBest());

		    commentdto.setCommmentTime(commenttime);
			commentdto.setContent(comment.getContent());
			commentdto.setHeat(comment.getHeat());
			commentdto.setBranchid(comment.getBranch().getId());
			commentdto.setSupportVoteCount(comment.getSupportVoteCount());
			ModuleComment commented=comment.getCommented();
	        if(null!=commented){
	        	ModuleCommentDTO subcommentdto=getCommentDTO(commented);
	        	commentdto.setCommented(subcommentdto);
	        } 
		
		
		return commentdto;}
		return null;
	} 

	
	@Override
	protected void prepareModel() throws Exception {
		if (entity == null) {
			entity = new ModuleComment();
		}
	}
   
	/**
	 * 
	 * 保存评论
	 * @return
	 * @throws Exception
	 */
	@Override
	public String save() throws Exception {
		Employee employee=new Employee();
		employee.setId(6L);
		if(branchid != null && commentid == null) {

			LccModuleBranchManage branch = moduleService.getlccBranchbybranchid(branchid);
			ModuleComment comment =new ModuleComment();
			
			comment.setCommenter(employee);
			comment.setBranch(branch);
			comment.setContent(content);
			comment.setCommmentTime(new Date());
			comment.setSupportVoteCount(0);
			comment.setAgainstVoteCount(0);	
			comment.setIsBest(0);
			commentservice.addComment(comment);
			addActionMessage("保存评论成功");
		
			
						
		}
		if(branchid != null && commentid != null) {
			
			LccModuleBranchManage branch = moduleService.getlccBranchbybranchid(branchid);		
			ModuleComment comment =new ModuleComment();
			comment.setCommenter(employee);
			ModuleComment commented = commentservice.getComment(commentid);
			comment.setCommented(commented);
			comment.setContent(content);
			comment.setCommmentTime(new Date());
			comment.setBranch(branch);
			comment.setSupportVoteCount(0);
			comment.setAgainstVoteCount(0);
			comment.setIsBest(0);
			comment.setTail(1);
			commentservice.addComment(comment);
			
			addActionMessage("保存评论的评论成功");
			
		}
		
		return null;
	}
	/**
	 * 
	 * 更新最佳评论
	 * @return
	 * @throws Exception
	 */
	public String bestAnswer() throws Exception {

		if( commentid != null) {

			ModuleComment comment =commentservice.getComment(commentid);
			comment.setIsBest(1);
			commentservice.updateComment(comment);
			
			addActionMessage("保存评论成功");
		}

		
		return null;
	}

	
	/**
	 * 
	 * 对评论进行投票
	 * @return
	 * @throws Exception
	 */
	public String addCommentVote() throws Exception {
		//需传commentid、isSupport
		Employee employee=new Employee();
		employee.setId(6L);
		VoteDTO vd = new VoteDTO();
		if(commentservice.isVoted(employee.getId(),commentid)) {
			vd.setIsSupport(false);
			JSONWriter writer = new JSONWriter();
	        String ktypestring=writer.write(vd);  
	       	response.getWriter().print(ktypestring);
			addActionMessage("重复投票无效");
		}else{
			
			ModuleVote vote = new ModuleVote();
			vote.setUser(employee);
			ModuleComment comment = commentservice.getComment(commentid);
			vote.setComment(comment);
			vote.setIsSupport(isSupport);
			vote.setVoteTime(new Date());
			commentservice.addVote(vote);
			
			vd.setIsSupport(true);
			JSONWriter writer = new JSONWriter();
	        String ktypestring=writer.write(vd);  
	       	response.getWriter().print(ktypestring);
			addActionMessage("评论投票成功");
		}
		return null;
	}
	/**
	 * 
	 * 打分
	 * @return
	 * @throws Exception
	 */
	public String rating() throws Exception {
		VoteDTO vd = new VoteDTO();
		
		//if(commentservice.isRated(userservice.getUser().getId(), Integer.valueOf(moduleid))){
		if(commentservice.isRated(6L, Integer.valueOf(branchid))){
			vd.setIsSupport(false);
			JSONWriter writer = new JSONWriter();
	        String ktypestring=writer.write(vd);  
	       	response.getWriter().print(ktypestring);
			addActionMessage("重复打分无效");
		}else{		
			//commentservice.rate(userservice.getUser().getId(), Integer.valueOf(branchid), score);
			System.out.println(branchid);
			LccModuleBranchManage branch=moduleService.getlccBranchbybranchid(branchid);
			commentservice.rate(6L, branch, score);
			vd.setIsSupport(true);
			JSONWriter writer = new JSONWriter();
	        String ktypestring=writer.write(vd);  
	       	response.getWriter().print(ktypestring);
	       	averageRating();
			addActionMessage("打分成功");
			
		}
		return null;
	}
	
	public String getRating() throws IOException{
		HashMap<String, Object> resultMap=new HashMap<String, Object>();
		ModuleRating rate=commentservice.getRate(6L,Integer.valueOf(branchid));
		if(rate==null){
			resultMap.put("isSupport", "0");
			
		}else{		
			//commentservice.rate(userservice.getUser().getId(), Integer.valueOf(branchid), score);
			resultMap.put("isSupport", "1");
			resultMap.put("score", rate.getScore());
			
		}
		JSONWriter writer = new JSONWriter();
        String ktypestring=writer.write(resultMap); 
       	response.getWriter().print(ktypestring);
		return null;
		
	}
	/**
	 * 
	 * 计算评价分
	 * @return
	 * @throws Exception
	 */
	public Float averageRating() throws Exception {
		LccModuleBranchManage branch = moduleService.getlccBranchbybranchid(branchid);			
		Float averagescore = commentservice.getAverageRating(branch);
		branch.getCommentrecord().setRate(averagescore);
		moduleService.saveLccModuleBranch(branch);
		addActionMessage("得到平均分成功");
		return averagescore;
	}
				

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}


	public void setServletResponse(HttpServletResponse response) {
		this.response=response;		
	}
	
	public Long getCommentid() {
		return commentid;
	}

	public void setCommentid(Long commentid) {
		this.commentid = commentid;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}
	
	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public ModuleService getModuleService() {
		return moduleService;
	}
	public void setModuleService(ModuleService moduleService) {
		this.moduleService = moduleService;
	}
	public String getModuleid() {
		return moduleid;
	}
	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}
	public ModuleComment getEntity() {
		return entity;
	}

	public void setEntity(ModuleComment entity) {
		this.entity = entity;
	}

	public ModuleComment getModel() {
		// TODO Auto-generated method stub
		return null;
	}

	public Float getScore() {
		return score;
	}

	public void setScore(Float score) {
		this.score = score;
	}

	public CommentService getCommentservice() {
		return commentservice;
	}

	public void setCommentservice(CommentService commentservice) {
		this.commentservice = commentservice;
	}


	public Boolean getIsSupport() {
		return isSupport;
	}

	public void setIsSupport(Boolean isSupport) {
		this.isSupport = isSupport;
	}

	public UserService getUserservice() {
		return userservice;
	}

	public void setUserservice(UserService userservice) {
		this.userservice = userservice;
	}
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		
	}
	public String getBranchid() {
		return branchid;
	}
	public void setBranchid(String branchid) {
		this.branchid = branchid;
	}
	
}
