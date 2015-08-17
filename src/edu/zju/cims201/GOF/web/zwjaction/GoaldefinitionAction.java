package edu.zju.cims201.GOF.web.zwjaction;

import java.io.IOException;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.stringtree.json.JSONWriter;

import edu.zju.cims201.GOF.hibernate.pojo.Material;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Goaldefinition;
import edu.zju.cims201.GOF.service.zwjservice.GoalDefinitionService;
import edu.zju.cims201.GOF.web.CrudActionSupport;


@Namespace("/zwjaction")
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "goalDefinition.action", type = "redirect"),
	@Result(name = "get", location = "/cqz/js/yang/goalDefinition1.jsp")
		 })
public class GoaldefinitionAction extends CrudActionSupport<Material> implements ServletResponseAware, ServletRequestAware {
	
	@Resource(name="goalDefinitionServiceImpl")
	private GoalDefinitionService goalDefinitionService;

	public GoalDefinitionService getGoalDefinitionService() {
		return goalDefinitionService;
	}

	public void setGoalDefinitionService(GoalDefinitionService goalDefinitionService) {
		this.goalDefinitionService = goalDefinitionService;
	}
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	private Integer id;
	private String projectname;
	private String companyname;
	private String comapanyfrom;
	private String forwardgoal;
	private String projectdesc;
	private String techrepre;
	private String timerepre;
	private String locationrepre;
	private String userrepre;
	private String projectunit;
	private String projectscope;
	private String impactcategory;
	private String getrule;
	private String assumption;
	private String datadesc;
	private String buildtime;
	
	//保存定义好的目标和范围内容
	public void saveGoaldefinition () {
		Goaldefinition goaldefinition = new Goaldefinition();
		goaldefinition.setProjectname(projectname);
		goaldefinition.setCompanyname(companyname);
		goaldefinition.setComapanyfrom(comapanyfrom);
		goaldefinition.setForwardgoal(forwardgoal);
		goaldefinition.setProjectdesc(projectdesc);
		goaldefinition.setTechrepre(techrepre);
		goaldefinition.setTimerepre(timerepre);
		goaldefinition.setLocationrepre(locationrepre);
		goaldefinition.setUserrepre(userrepre);
		goaldefinition.setProjectunit(projectunit);
		goaldefinition.setProjectscope(projectscope);
		goaldefinition.setImpactcategory(impactcategory);
		goaldefinition.setGetrule(getrule);
		goaldefinition.setAssumption(assumption);
		goaldefinition.setDatadesc(datadesc);
		goaldefinition.setBuildtime(buildtime);
		goalDefinitionService.save(goaldefinition);
	}
	
	//返回参考目标和范围定义的内容页面？有问题
	public String getGoaldefinition () throws JsonGenerationException, JsonMappingException, IOException {
		Goaldefinition goaldefinition = goalDefinitionService.getGoaldefinition(1);
		System.out.println(goaldefinition==null);
		HashMap<String, Object> goalmap = new HashMap<String, Object>();
		goalmap.put("projectname", goaldefinition.getProjectname());
		goalmap.put("companyname", goaldefinition.getCompanyname());
		goalmap.put("comapanyfrom", goaldefinition.getComapanyfrom());
		goalmap.put("forwardgoal", goaldefinition.getForwardgoal());
		goalmap.put("projectdesc", goaldefinition.getProjectdesc());
		goalmap.put("techrepre", goaldefinition.getTechrepre());
		goalmap.put("timerepre", goaldefinition.getTimerepre());
		goalmap.put("locationrepre", goaldefinition.getLocationrepre());
		goalmap.put("userrepre", goaldefinition.getUserrepre());
		goalmap.put("projectunit", goaldefinition.getProjectunit());
		goalmap.put("projectscope", goaldefinition.getProjectscope());
		goalmap.put("impactcategory", goaldefinition.getImpactcategory());
		goalmap.put("getrule", goaldefinition.getGetrule());
		goalmap.put("assumption", goaldefinition.getAssumption());
		goalmap.put("datadesc", goaldefinition.getDatadesc());
		goalmap.put("buildtime", goaldefinition.getBuildtime());
		
		JSONWriter writer = new JSONWriter();
        String ktypestring=writer.write(goalmap);
        
        //ajax直接拿到长字符串，用下面语句
        response.getWriter().println(ktypestring);
        
		//传递请求，用下面语句
        //request.setAttribute("goal", ktypestring);
		
        //ObjectMapper objectMapper = new ObjectMapper();	
        //objectMapper.writeValue(response.getWriter(),"nnnnnnnnnnnnnnnnnnnnnnnnnnnn");

        return null;
	}
	
	public String getGoaldefinition1() {
		return "get";
	}
	public Material getModel() {
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

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getProjectname() {
		return projectname;
	}

	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}

	public String getCompanyname() {
		return companyname;
	}

	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}

	public String getComapanyfrom() {
		return comapanyfrom;
	}

	public void setComapanyfrom(String comapanyfrom) {
		this.comapanyfrom = comapanyfrom;
	}

	public String getForwardgoal() {
		return forwardgoal;
	}

	public void setForwardgoal(String forwardgoal) {
		this.forwardgoal = forwardgoal;
	}

	public String getProjectdesc() {
		return projectdesc;
	}

	public void setProjectdesc(String projectdesc) {
		this.projectdesc = projectdesc;
	}

	public String getTechrepre() {
		return techrepre;
	}

	public void setTechrepre(String techrepre) {
		this.techrepre = techrepre;
	}

	public String getTimerepre() {
		return timerepre;
	}

	public void setTimerepre(String timerepre) {
		this.timerepre = timerepre;
	}

	public String getLocationrepre() {
		return locationrepre;
	}

	public void setLocationrepre(String locationrepre) {
		this.locationrepre = locationrepre;
	}

	public String getUserrepre() {
		return userrepre;
	}

	public void setUserrepre(String userrepre) {
		this.userrepre = userrepre;
	}

	public String getProjectunit() {
		return projectunit;
	}

	public void setProjectunit(String projectunit) {
		this.projectunit = projectunit;
	}

	public String getProjectscope() {
		return projectscope;
	}

	public void setProjectscope(String projectscope) {
		this.projectscope = projectscope;
	}

	public String getImpactcategory() {
		return impactcategory;
	}

	public void setImpactcategory(String impactcategory) {
		this.impactcategory = impactcategory;
	}

	public String getGetrule() {
		return getrule;
	}

	public void setGetrule(String getrule) {
		this.getrule = getrule;
	}

	public String getAssumption() {
		return assumption;
	}

	public void setAssumption(String assumption) {
		this.assumption = assumption;
	}

	public String getDatadesc() {
		return datadesc;
	}

	public void setDatadesc(String datadesc) {
		this.datadesc = datadesc;
	}

	public String getBuildtime() {
		return buildtime;
	}

	public void setBuildtime(String buildtime) {
		this.buildtime = buildtime;
	}
}
