package edu.zju.cims201.GOF.web.user;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletResponseAware;

import edu.zju.cims201.GOF.web.CrudActionSupport;
import edu.zju.cims201.GOF.hibernate.pojo.SystemUser;

/**
 * 用户管理Action.
 * 
 * 使用Struts2 convention-plugin annotation定义Action参数.
 * 演示带分页的管理界面.
 * 
 * @author calvin
 */
//定义URL映射对应/account/user.action
@Namespace("/user")
//定义名为reload的result重定向到user.action, 其他result则按照convention默认.
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "user.action", type = "redirect") })
public class UserAction extends CrudActionSupport<SystemUser> implements ServletResponseAware{

	private static final long serialVersionUID = 8683878162525847072L;


   
	public SystemUser getModel() {
		// TODO Auto-generated method stub
		return null;
	}





	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		
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





	@Override
	public String list() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	

	
	
	
	@Action(value="/user",results={@Result(name = "login", location = "/cqz/jsp/login.jsp")})
	public String login() throws Exception {		
			return "login";	
	}


	
	
}
