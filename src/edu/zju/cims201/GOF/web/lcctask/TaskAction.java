package edu.zju.cims201.GOF.web.lcctask;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.codehaus.jackson.map.ObjectMapper;
import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccTask;
import edu.zju.cims201.GOF.rs.dto.PageDTO;
import edu.zju.cims201.GOF.rs.dto.TaskDTO;
import edu.zju.cims201.GOF.service.department.DepartmentService;
import edu.zju.cims201.GOF.service.module.ModuleService;
import edu.zju.cims201.GOF.service.systemUser.UserService;
import edu.zju.cims201.GOF.service.task.TaskService;
import edu.zju.cims201.GOF.util.JSONUtil;
import edu.zju.cims201.GOF.web.CrudActionSupport;


/*
 * 
 * 
 */
@Namespace("/lcc")
@Results({
		@Result(name = CrudActionSupport.RELOAD, location = "task.action", type = "redirect") })
public class TaskAction extends CrudActionSupport<LccTask> implements
		ServletResponseAware, ServletRequestAware {

	private static final long serialVersionUID = 1L;

	@Resource(name = "userServiceImpl")
	private UserService userServiceImpl;
	@Resource(name = "taskServiceImpl")
	private TaskService taskService;
	@Resource(name="moduleServiceImpl")
	private ModuleService moduleService;
	@Resource(name="departmentServiceImpl")
	private DepartmentService departmentService;

	private HttpServletRequest request;
	private HttpServletResponse response;
	private int size;
	private int index;
	private String cellcollection;
	private String moduleid;
	private String taskid;
	PrintWriter out;


	public LccTask getModel() {
		// TODO Auto-generated method stub
		return null;
	}


	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		this.request=arg0;
		
	}


	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response=arg0;
	}


	@Override
	public String list() throws Exception {
		return null;
	}


	@Override
	public String input() throws Exception {
		return null;
	}


	@Override
	public String save() throws Exception {
		return null;
	}


	@Override
	public String delete() throws Exception {
		return null;
	}


	@Override
	protected void prepareModel() throws Exception {
		
	}

  
	public String getMytasks() {
		/*SystemUser sysuser = userServiceImpl.getUser();
		Employee user=departmentService.getEmployeebyuserid(sysuser.getId());*/
		Employee user=new Employee();
		user.setId(1l);
		Page<LccTask> page = null;
		if (this.getSize() == 0) {
			page = new Page<LccTask>(20);
		} else {
			page = new Page<LccTask>(this.getSize());
		}
		page.setPageNo(this.getIndex());
		Page<LccTask> newpage = null;
		newpage = taskService.getLccTasks(user, page);

		PageDTO pagedto = new PageDTO();
		pagedto.setTotal(newpage.getTotalCount());
		pagedto.setPagesize(newpage.getPageSize());
		pagedto.setTotalPage(newpage.getTotalPages());
		List<LccTask> tasklist = newpage.getResult();
        pagedto.setData(new ArrayList());
		// SystemUser user = userServiceImpl.getUser();
		// if(size==0){
		// size=20;
		// }
		// if(index==0){
		// index=1;
		// }
		// List<Task> tasklist=workFlowService.getMytask(user,index,size);
		// List<TaskDTO> taskdtoList=new ArrayList<TaskDTO>();
		for (LccTask task : tasklist) {
			TaskDTO taskdto = new TaskDTO();
			taskdto.setName(task.getName());
			taskdto.setId(task.getId());
			/*taskdto.setStarttime(task.getStarttime().toString());
			taskdto.setEndtime(task.getEndtime().toString());*/
			taskdto.setCarriername(task.getCarrier().getName());
			taskdto.setLcamoduleid(task.getLccModule().getId());
			//taskdto.setProjectname(task.getPdmProject().getProjectname());
			taskdto.setStarttime(task.getLccModule().getCreatedate().toString());
			taskdto.setStatus(task.getStatus());
			pagedto.getData().add(taskdto);
		}
		System.out.println(tasklist.size());
		JSONUtil.write(response, pagedto);
		return null;
	}

    
    public void getMytaskdetail() throws IOException{
  	    LccTask t=taskService.getTask(Long.valueOf(taskid));
	  	HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("id", t.getId());
		map.put("name", t.getName());
		map.put("moduleid", t.getLccModule().getId());	
		map.put("processid", t.getProcessid());	
		map.put("compname", t.getLccModule().getComponent().getName());	
		map.put("Createdate", t.getLccModule().getCreatedate().toString());
		map.put("Carrier", t.getCarrier().getName());
		ObjectMapper objectMapper = new ObjectMapper();	
	    objectMapper.writeValue(response.getWriter(),map);
	  	  
  }
  
    public List<HashMap> getJSONvalueList()
	{
		//JSONUtil jr  = new JSONUtil();
		List<HashMap> datas ;
		try{
			datas =  (List)JSONUtil.read(cellcollection);}
		catch(Exception e ){
			System.out.println("jason解析错误");
			e.printStackTrace();
			return null;
		}
		return datas;
	}
	public UserService getUserServiceImpl() {
		return userServiceImpl;
	}


	public void setUserServiceImpl(UserService userServiceImpl) {
		this.userServiceImpl = userServiceImpl;
	}


	public TaskService getTaskService() {
		return taskService;
	}


	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}


	public HttpServletRequest getRequest() {
		return request;
	}


	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}


	public HttpServletResponse getResponse() {
		return response;
	}


	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}



	public PrintWriter getOut() {
		return out;
	}


	public void setOut(PrintWriter out) {
		this.out = out;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public int getSize() {
		return size;
	}


	public ModuleService getModuleService() {
		return moduleService;
	}


	public void setModuleService(ModuleService moduleService) {
		this.moduleService = moduleService;
	}


	public void setSize(int size) {
		this.size = size;
	}


	public String getModuleid() {
		return moduleid;
	}


	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}


	public int getIndex() {
		return index;
	}


	public void setIndex(int index) {
		this.index = index;
	}


	public String getCellcollection() {
		return cellcollection;
	}


	public String getTaskid() {
		return taskid;
	}


	public void setTaskid(String taskid) {
		this.taskid = taskid;
	}


	public void setCellcollection(String cellcollection) {
		this.cellcollection = cellcollection;
	}


	public DepartmentService getDepartmentService() {
		return departmentService;
	}


	public void setDepartmentService(DepartmentService departmentService) {
		this.departmentService = departmentService;
	}


}
