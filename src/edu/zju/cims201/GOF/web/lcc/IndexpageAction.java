package edu.zju.cims201.GOF.web.lcc;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import edu.zju.cims201.GOF.hibernate.pojo.Material;
import edu.zju.cims201.GOF.web.CrudActionSupport;


@Namespace("/lcc")
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "indexpage.action", type = "redirect"),
	 @Result(name = "modulebuilder", location = "/WEB-INF/content/lcc/modulebuilder.jsp"),
	 @Result(name = "modulebuilderCT", location = "/WEB-INF/content/lcc/modulebuilderCT.jsp"),
	 @Result(name = "mainpage", location = "/WEB-INF/content/lcc/main.jsp"),
	 @Result(name = "goalDefinition", location = "/WEB-INF/content/lcc/goalDefinition.jsp"),
	 @Result(name = "goalDefinition1", location = "/WEB-INF/content/lcc/goalDefinition1.jsp"),
	 @Result(name = "lcidataCollect", location = "/WEB-INF/content/lcc/lcidataCollect.jsp"),
	 @Result(name = "lcidataCalculte", location = "/WEB-INF/content/lcc/lcidataCalculte.jsp"),
	 @Result(name = "lciaCalculate", location = "/WEB-INF/content/lcc/lciaCalculate.jsp"),
	 @Result(name = "lcidataUnit", location = "/WEB-INF/content/lcc/lcidataUnit.jsp"),
	 @Result(name = "graphDraw", location = "/WEB-INF/content/lcc/graphDraw.jsp"),
	 @Result(name = "modulecheck", location = "/WEB-INF/content/lcc/modulecheck.jsp"),
	 @Result(name = "lcadatacomment", location = "/WEB-INF/content/lcc/lcadatacomment.jsp"),
	 @Result(name = "lcasolutionmanage", location = "/WEB-INF/content/lcc/lcasolutionmanage.jsp"),
	 @Result(name = "modulelookCT", location = "/WEB-INF/content/lcc/modulelookCT.jsp"),
	 @Result(name = "lcasolution", location = "/WEB-INF/content/lcc/lcasolution.jsp"),
	 @Result(name = "newlcadata", location = "/WEB-INF/content/lcc/newlcadata.jsp"),
	 @Result(name = "myjob", location = "/WEB-INF/content/lcc/myjob.jsp"),
	 @Result(name = "department", location = "/WEB-INF/content/lcc/department.jsp"),
	 @Result(name = "privilege", location = "/WEB-INF/content/lcc/privilege.jsp"),
	 @Result(name = "role", location = "/WEB-INF/content/lcc/role.jsp"),
	 @Result(name = "clerk", location = "/WEB-INF/content/lcc/clerk.jsp"),
	 @Result(name = "tasktree", location = "/WEB-INF/content/lcc/tasktree.jsp"),
	 @Result(name = "modulecheckCT", location = "/WEB-INF/content/lcc/modulecheckCT.jsp"),
	 @Result(name = "modulecheckbuilder", location = "/WEB-INF/content/lcc/modulecheckbuilder.jsp"),
	 @Result(name = "solutionbuilderCT", location = "/WEB-INF/content/lcc/solutionbuilderCT.jsp"),
	 @Result(name = "solutionbuilder", location = "/WEB-INF/content/lcc/solutionbuilder.jsp"),
	 @Result(name = "lcataskcommitCT", location = "/WEB-INF/content/lcc/lcataskcommitCT.jsp"),
	 @Result(name = "taskmodulebuilder", location = "/WEB-INF/content/lcc/taskmodulebuilder.jsp"),
	 @Result(name = "modulecomment", location = "/WEB-INF/content/lcc/modulecomment.jsp"),
	 @Result(name = "taskmodulebuilder", location = "/WEB-INF/content/lcc/taskmodulebuilder.jsp"),
	 @Result(name = "lcaReport", location = "/WEB-INF/content/lcc/lcaReport.jsp")
})
public class IndexpageAction extends CrudActionSupport<Material> implements ServletResponseAware, ServletRequestAware {
private static final long serialVersionUID = 8683878162525847072L;

private HttpServletRequest request;
private HttpServletResponse response;


public String solutionbuilderCT(){
	return "solutionbuilderCT";
}

public String solutionbuilder(){
	return "solutionbuilder";
}

public String modulebuilder(){
	return "modulebuilder";
}
public String modulebuilderCT(){
	//System.out.println("sss");
	return "modulebuilderCT";
}
public String mainpage(){
	return "mainpage";
}
public String lcidataCollect(){
	return "lcidataCollect";
}
public String lcidataCalculte(){
	return "lcidataCalculte";
}
public String lciaCalculate(){
	return "lciaCalculate";
}
public String modulecheck(){
	return "modulecheck";
}
public String modulecomment(){
	return "modulecomment";
}
public String lcadatacomment(){
	return "lcadatacomment";
}
public String lcasolutionmanage(){
	return "lcasolutionmanage";
}
public String modulelookCT(){
	return "modulelookCT";
}
public String lcasolution(){
	return "lcasolution";
}
public String newlcadata(){
	return "newlcadata";
}
public String lcataskcommitCT(){
	return "lcataskcommitCT";
}
public String taskmodulebuilder(){
	return "taskmodulebuilder";
}
public String myjob(){
	return "myjob";
}
public String clerk(){
	return "clerk";
}
public String department(){
	return "department";
}
public String privilege(){
	return "privilege";
}
public String role(){
	return "role";
}
public String tasktree(){
	return "tasktree";
}
public String modulecheckCT(){
	return "modulecheckCT";
}
public String modulecheckbuilder(){
	return "modulecheckbuilder";
}
public String graphDraw(){
	return "graphDraw";
}
public String lcidataUnit(){
	return "lcidataUnit";
}
public String goalDefinition() {
	return "goalDefinition";
}
public String goalDefinition1() {
	return "goalDefinition1";
}
public String lcaReport() {
	return "lcaReport";
}

public Material getModel() {
	// TODO Auto-generated method stub
	return null;
}
public void setServletRequest(HttpServletRequest arg0) {
	this.request=arg0;
	
}
public void setServletResponse(HttpServletResponse arg0) {
	// TODO Auto-generated method stub
	this.response=arg0;
	
}
@Override
public String list() throws Exception {
	// TODO Auto-generated method stub
	return null;
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
	
}
