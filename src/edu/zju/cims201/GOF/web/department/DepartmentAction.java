package edu.zju.cims201.GOF.web.department;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.codehaus.jackson.map.ObjectMapper;

import edu.zju.cims201.GOF.hibernate.pojo.pdm.Department;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.service.department.DepartmentService;
import edu.zju.cims201.GOF.util.JSONUtil;
import edu.zju.cims201.GOF.web.CrudActionSupport;

/**
 * 用户管理Action.
 * 
 * 使用Struts2 convention-plugin annotation定义Action参数.
 * 演示带分页的管理界面.
 * 
 * @author calvin
 */
//定义URL映射对应/account/user.action
@Namespace("/department")
//定义名为reload的result重定向到user.action, 其他result则按照convention默认.
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "department.action", type = "redirect") })
public class DepartmentAction extends CrudActionSupport<Department> implements ServletResponseAware{

	private static final long serialVersionUID = 8683878162525847072L;
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	@Resource(name="departmentServiceImpl")
	private DepartmentService departmentService;
	private String department;
	private String employee;
	private String id;
	private String privilege;
	private String role;
	private String rolearray;
	
    public void getEmployeeByDepartment() throws IOException{
    	PrintWriter w=response.getWriter();
    	List list=departmentService.getEmployeeByDepartment(id);
    	ObjectMapper objectMapper=new ObjectMapper();
    	List<Map<String, Object>> elist = new ArrayList<Map<String, Object>>();
		 if (!(list==null)){
		for(int i=0;i<list.size();i++){
			Employee e=(Employee)list.get(i);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", e.getId());
 		    rootMap.put("name", e.getName());
			elist.add(rootMap);		
			
		}
		objectMapper.writeValue(w, elist);
    	
		 }
    }
    public void getDepartment() throws IOException{
    	PrintWriter w=response.getWriter();
    	List list=departmentService.getAllDepartments();
    	HashMap h=new HashMap();
    	h.put("name", "部门列表");
    	h.put("enableSelect", false);
    	h.put("children", list);
    	ObjectMapper objectMapper=new ObjectMapper();
    	objectMapper.writeValue(w, h);
    	
    	
    }
    public void getEmployee()throws IOException{
    	PrintWriter w=response.getWriter();
    	List list=departmentService.getEmployee();
    	ObjectMapper objectMapper=new ObjectMapper();
    	List<Map<String, Object>> elist = new ArrayList<Map<String, Object>>();
		 if (!(list==null)){
		for(int i=0;i<list.size();i++){
			Employee p=(Employee)list.get(i);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", p.getId());
 		    rootMap.put("name",p.getName());
 		    rootMap.put("emial", p.getEmail());
		    rootMap.put("hobby",p.getHobby());
		    rootMap.put("dep", p.getDepartment().getName());
		    rootMap.put("depid", p.getDepartment().getId());
		    rootMap.put("passwd", p.getPassword());
 		    rootMap.put("sex",p.getSex());
			elist.add(rootMap);		
			
		}
		objectMapper.writeValue(w, elist);
    	
		 }
    }
    public List<HashMap> getJSONvalueList()
   	{
   		//JSONUtil jr  = new JSONUtil();
   		List<HashMap> datas ;
   		try{
   			datas =  (List)JSONUtil.read(rolearray);}
   		catch(Exception e ){
   			System.out.println("jason解析错误");
   			e.printStackTrace();
   			return null;
   		}
   		return datas;
   	}

	public Department getModel() {
		// TODO Auto-generated method stub
		return null;
	}
	 public Object getJSONvalueObject(String data){
			Object datas ;
			try{
				datas =  JSONUtil.read(data);}
			catch(Exception e ){
				System.out.println("jason解析错误");
				e.printStackTrace();
				return null;
			}
			return datas;
		}




	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response=arg0;
		
	}





	@Override
	public String input() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}





	@Override
	public String save() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}





	@Override
	public String delete() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}





	@Override
	protected void prepareModel() throws Exception {
		// TODO Auto-generated method stub
		
	}





	public String list() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	public DepartmentService getDepartmentService() {
		return departmentService;
	}

	public void setDepartmentService(DepartmentService departmentService) {
		this.departmentService = departmentService;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setEmployee(String employee) {
		this.employee = employee;
	}

	public void setPrivilege(String privilege) {
		this.privilege = privilege;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getRolearray() {
		return rolearray;
	}

	public void setRolearray(String rolearray) {
		this.rolearray = rolearray;
	}
	
}
