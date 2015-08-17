package edu.zju.cims201.GOF.web.zwjaction;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
import org.stringtree.json.JSONWriter;

import edu.zju.cims201.GOF.hibernate.pojo.Material;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Unitcategory;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Unitdetail;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasematerial;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjmaterialcategory;
import edu.zju.cims201.GOF.rs.dto.PageDTO;
import edu.zju.cims201.GOF.service.zwjservice.DatasetService;
import edu.zju.cims201.GOF.service.zwjservice.GoalDefinitionService;
import edu.zju.cims201.GOF.service.zwjservice.UnitcategoryService;
import edu.zju.cims201.GOF.service.zwjservice.UnitdetailService;
import edu.zju.cims201.GOF.service.zwjservice.WjbasematerialService;
import edu.zju.cims201.GOF.service.zwjservice.WjmaterialcategoryService;
import edu.zju.cims201.GOF.util.JSONUtil;
import edu.zju.cims201.GOF.web.CrudActionSupport;


@Namespace("/zwjaction")
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "goalDefinition.action", type = "redirect"),
	@Result(name = "lcafinalcalculate", location = "/WEB-INF/content/lca/lcafinalcalculate.jsp")
		 })
public class MaterialandcategoryAction extends CrudActionSupport<Material> implements ServletResponseAware, ServletRequestAware {
	
	//为添加UUID而引入所有service
	@Resource(name="unitcategoryServiceImpl")
	private UnitcategoryService unitcategoryService;
	
	@Resource(name="unitdetailServiceImpl")
	private UnitdetailService unitdetailService;
	
	@Resource(name="datasetServiceImpl")
	private DatasetService datasetService;
	
	@Resource(name="goalDefinitionServiceImpl")
	private GoalDefinitionService goalDefinitionService;
	
	
	
	public DatasetService getDatasetService() {
		return datasetService;
	}
	public void setDatasetService(DatasetService datasetService) {
		this.datasetService = datasetService;
	}
	public GoalDefinitionService getGoalDefinitionService() {
		return goalDefinitionService;
	}
	public void setGoalDefinitionService(GoalDefinitionService goalDefinitionService) {
		this.goalDefinitionService = goalDefinitionService;
	}
	
	
	
	

	@Resource(name="wjbasematerialServiceImpl")
	private WjbasematerialService wjbasematerialService;
	public WjbasematerialService getWjbasematerialService() {
		return wjbasematerialService;
	}
	public void setWjbasematerialService(WjbasematerialService wjbasematerialService) {
		this.wjbasematerialService = wjbasematerialService;
	}
	
	@Resource(name="wjmaterialcategoryServiceImpl")
	private WjmaterialcategoryService wjmaterialcategoryService;
	public WjmaterialcategoryService getWjmaterialcategoryService() {
		return wjmaterialcategoryService;
	}
	public void setWjmaterialcategoryService(
			WjmaterialcategoryService wjmaterialcategoryService) {
		this.wjmaterialcategoryService = wjmaterialcategoryService;
	}

	private HttpServletRequest request;
	private HttpServletResponse response;
	
	//此处id为Wjmaterialcategory类的id，其他类的id分别用其他名称表示了！
	private String id;
	private String categoryname;
	private String englishname;
	private String categoryintro;
	private String parentid;
	
	private String mid;
	private String materialname;
	private String firstcategory;
	private String subcategory;
	private String materialintro;
	private String materialunit;
	private String materialprice;
	private String categoryid;
	
	private String wjmaterialcategory;
	private String wjbasematerial;
	
	private String existresult;
	
	private int size;
	private int index;
	
	private String unitcategoryname;
	private String unitcategoryintro;
	private String defaultflowproperty;
	private String parentname;
	private String uuid;
	private String unitname;
	private String unitintro;
	private String unitsynonyms;
	private Double conversionfactor;
	private String formula;
	private Integer isreference;
	private String unitcategoryid;
	
	//action方法从此开始
	public void getAllcategory() throws IOException {
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
    	List plist=wjmaterialcategoryService.getWjmaterialcategoryList(0);
    	ObjectMapper objectMapper=new ObjectMapper();
    	
		if (!(plist==null)){
		for(int i=0;i<plist.size();i++){
			Wjmaterialcategory m=(Wjmaterialcategory)plist.get(i);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", m.getId());
 		    rootMap.put("categoryname",m.getCategoryname());
 		    rootMap.put("englishname", m.getEnglishname());
 		    rootMap.put("categoryintro", m.getCategoryintro());
 		    rootMap.put("children", getCategoryChildren(m));
 		    alllist.add(rootMap);		
		}
		objectMapper.writeValue(w, alllist);
		}
	}
	
	private Object getCategoryChildren(Wjmaterialcategory m) throws IOException {
		 List mlist =null;
		 List<Map<String, Object>> childcategory = new ArrayList<Map<String, Object>>();
		 mlist= wjmaterialcategoryService.getWjmaterialcategoryList(m.getId());
		 if (!(mlist==null)){
		 for(int i=0;i<mlist.size();i++){
			    Wjmaterialcategory mc=(Wjmaterialcategory)mlist.get(i);
			    Map<String, Object> rootMap = new HashMap<String, Object>();
			    rootMap.put("id", mc.getId());
	 		    rootMap.put("categoryname",mc.getCategoryname());
	 		    rootMap.put("englishname", mc.getEnglishname());
	 		    rootMap.put("categoryintro", mc.getCategoryintro());
	 		    rootMap.put("children", getCategoryChildren(mc));
	 		    childcategory.add(rootMap);		
			}
		 }
		 return childcategory;
	}
	
	public void saveNewcategory() {
		HashMap categorymap=(HashMap)getJSONvalueObject(wjmaterialcategory);
		Object id=categorymap.get("id");
    	Object object=categorymap.get("parentid");
    	String categoryname=categorymap.get("categoryname").toString();
    	String englishname=categorymap.get("englishname").toString();
    	String categoryintro=categorymap.get("categoryintro").toString();
    	if(id==null){
	    	if(object==null){
	    		Wjmaterialcategory m=new Wjmaterialcategory();
	    		m.setCategoryname(categoryname);
	    		m.setEnglishname(englishname);
	    		m.setCategoryintro(categoryintro);
	    		m.setParentid(0);
	    		wjmaterialcategoryService.save(m);
	    	}else{
	    		Wjmaterialcategory m=new Wjmaterialcategory();
	    		m.setCategoryname(categoryname);
	    		m.setEnglishname(englishname);
	    		m.setCategoryintro(categoryintro);
	    		m.setParentid(Integer.valueOf(object.toString()));
	    		wjmaterialcategoryService.save(m);
	    	};
    	}else{
    		Wjmaterialcategory m=wjmaterialcategoryService.getWjmaterialcategory(id.toString());
    		m.setCategoryname(categoryname);
    		m.setEnglishname(englishname);
    		m.setCategoryintro(categoryintro);
    		wjmaterialcategoryService.save(m);
    	}
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
	
	public void validateCategory() throws IOException {
		Wjmaterialcategory wjmaterialcategory = new Wjmaterialcategory();
		wjmaterialcategory.setCategoryname(categoryname);
		List<Wjmaterialcategory> cList = wjmaterialcategoryService.getWjmaterialcategoryList(wjmaterialcategory.getCategoryname());
		System.out.println(cList.size()+categoryname);
		if(cList.size()>0) {
			existresult = "false";
		}else {
			existresult = "true";
			
		}
		//System.out.println(existresult);
		HashMap<String, Object> goalmap = new HashMap<String, Object>();
		goalmap.put("existresult", existresult);
		JSONWriter writer = new JSONWriter();
        String ktypestring=writer.write(goalmap);
        response.getWriter().println(ktypestring);
	}
	
	public void getBasematerial() throws IOException {
		
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
		//System.out.println(categoryid);
    	List list=new ArrayList();
    	
    	//分页开始
    	Page<Wjbasematerial> page = null;
		if (this.getSize() == 0) {
			page = new Page<Wjbasematerial>(20);
		} else {
			page = new Page<Wjbasematerial>(this.getSize());
		}
		page.setPageNo(this.getIndex());
		Page<Wjbasematerial> newpage = null;
    	//分页结束
    	//System.out.println(categoryid);
    	if("0".equals(categoryid) || "null".equals(categoryid) || categoryid == null)
    	{    
    		list=wjbasematerialService.getAllWjbasematerials();
    	}else{
    		newpage=wjbasematerialService.getBasematerial(categoryid, page);
    		
    		PageDTO pagedto = new PageDTO();
    		pagedto.setTotal(newpage.getTotalCount());
    		pagedto.setPagesize(newpage.getPageSize());
    		pagedto.setTotalPage(newpage.getTotalPages());
    		List<Wjbasematerial> basemateriallist = newpage.getResult();
            pagedto.setData(new ArrayList());
            for (Wjbasematerial wjbasematerial : basemateriallist) {
            	
            	Map<String, Object> rootMap = new HashMap<String, Object>();
	    		rootMap.put("mid", wjbasematerial.getId());
	    	 	rootMap.put("materialname",wjbasematerial.getMaterialname());
	    	 	rootMap.put("firstcategory",wjbasematerial.getFirstcategory());
	    	 	rootMap.put("subcategory",wjbasematerial.getSubcategory());
	    	 	rootMap.put("materialintro", wjbasematerial.getMaterialintro());
	    	 	rootMap.put("materialunit", wjbasematerial.getMaterialunit());
	    	 	rootMap.put("materialprice", wjbasematerial.getMaterialprice());
	    		rootMap.put("categoryid",wjbasematerial.getMaterialCategory().getId());
	    		rootMap.put("categoryname", wjbasematerial.getMaterialCategory().getCategoryname());
	    		pagedto.getData().add(rootMap);		
    		}
    		//System.out.println(basemateriallist.size());
    		JSONUtil.write(response, pagedto);
    	}
    	
//    	ObjectMapper objectMapper=new ObjectMapper();
//    	List<Map<String, Object>> elist = new ArrayList<Map<String, Object>>();
//		if (!(list==null)){
//	    	for(int i=0;i<list.size();i++){
//	    		Wjbasematerial b=(Wjbasematerial)list.get(i);
//	    		Map<String, Object> rootMap = new HashMap<String, Object>();
//	    		rootMap.put("mid", b.getId());
//	    	 	rootMap.put("materialname",b.getMaterialname());
//	    	 	rootMap.put("materialintro", b.getMaterialintro());
//	    	 	rootMap.put("materialunit", b.getMaterialunit());
//	    	 	rootMap.put("materialprice", b.getMaterialprice());
//	    		rootMap.put("categoryid",b.getMaterialCategory().getId());
//	    		elist.add(rootMap);		
//	    	}
//		objectMapper.writeValue(w, elist);
//    	}
	}
	
	public void saveNewmaterial() {
		response.setCharacterEncoding("utf-8");
		HashMap categorymap=(HashMap)getJSONvalueObject(wjbasematerial);
		Object id=categorymap.get("id");
    	String categoryid=categorymap.get("categoryid").toString();
    	String materialname=categorymap.get("materialname").toString();
    	String materialintro=categorymap.get("materialintro").toString();
    	String materialunit=categorymap.get("materialunit").toString();
    	String materialprice=categorymap.get("materialprice").toString();
    	String firstcategory=categorymap.get("firstcategory").toString();
    	String subcategory=categorymap.get("subcategory").toString();
//    	System.out.println(id);
//    	System.out.println(categoryid);
//    	System.out.println(materialname);
//    	System.out.println(materialintro);
//    	System.out.println(materialunit);
//    	System.out.println(materialprice);
    	//int materialid;
    	if(id==null){
    		Wjbasematerial b=new Wjbasematerial();
    		b.setMaterialname(materialname);
    		b.setMaterialintro(materialintro);
    		b.setMaterialunit(materialunit);
    		b.setMaterialprice(materialprice);
    		b.setFirstcategory(firstcategory);
    		b.setSubcategory(subcategory);
    		Wjmaterialcategory m=wjmaterialcategoryService.getWjmaterialcategory(categoryid);
    		b.setMaterialCategory(m);
    		//materialid=wjbasematerialService.saveBasematerial(b);
    	}else{
    		Wjbasematerial b=wjbasematerialService.getWjbasematerial(id.toString());
    		Wjmaterialcategory m=wjmaterialcategoryService.getWjmaterialcategory(categoryid);
    		b.setMaterialCategory(m);
    		b.setMaterialname(materialname);
    		b.setMaterialintro(materialintro);
    		b.setMaterialunit(materialunit);
    		b.setMaterialprice(materialprice);
    		b.setFirstcategory(firstcategory);
    		b.setSubcategory(subcategory);
    		b.setId(Integer.valueOf(id.toString()));
    		//b.setId(materialid);
    		wjbasematerialService.save(b);
    		System.out.println(b.getId());
    	}
	}
	
	public void sousuoBasematerial() throws IOException {
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
    	List plist=wjbasematerialService.getWjbasematerialList(categoryid);
    	
    	List<Wjbasematerial> sousuolist = new ArrayList<Wjbasematerial>();
    	
    	for (int i = 0; i < plist.size(); i++) {
    		Wjbasematerial m=(Wjbasematerial)plist.get(i);
    		if(m.getMaterialname().equals(materialname)) {
				sousuolist.add(m);
				//System.out.println(sousuolist.size());
			}
		}
    	ObjectMapper objectMapper=new ObjectMapper();
    	//System.out.println(sousuolist.size());
		if (!(sousuolist==null)){
		for(int j=0;j<sousuolist.size();j++){
			Wjbasematerial b=(Wjbasematerial)sousuolist.get(j);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("materialname",b.getMaterialname());
    	 	rootMap.put("materialintro", b.getMaterialintro());
    	 	rootMap.put("materialunit", b.getMaterialunit());
    	 	rootMap.put("materialprice", b.getMaterialprice());
    	 	rootMap.put("firstcategory", b.getFirstcategory());
    	 	rootMap.put("subcategory", b.getSubcategory());
    		rootMap.put("categoryid",b.getMaterialCategory().getId());
 		    alllist.add(rootMap);		
		}
		objectMapper.writeValue(w, alllist);
		}
	}
	
	public void getAllunitcategory() throws IOException {
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
    	List plist=unitcategoryService.getWjmaterialcategoryList(0);
    	ObjectMapper objectMapper=new ObjectMapper();
    	
		if (!(plist==null)){
		for(int i=0;i<plist.size();i++){
			Unitcategory m=(Unitcategory)plist.get(i);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", m.getId());
 		    rootMap.put("unitcategoryname",m.getUnitcategoryname());
 		    rootMap.put("unitcategoryintro", m.getUnitcategoryintro());
 		    rootMap.put("defaultflowproperty", m.getDefaultflowproperty());
 		    rootMap.put("parentname", m.getParentname());
 		    rootMap.put("uuid", m.getUuid());
 		    rootMap.put("parentid", m.getParentid());
 		    rootMap.put("children", getUnitcategoryChildren(m));
 		    alllist.add(rootMap);		
		}
		objectMapper.writeValue(w, alllist);
		}
	}
	
	private Object getUnitcategoryChildren(Unitcategory m) throws IOException {
		 List mlist =null;
		 List<Map<String, Object>> childcategory = new ArrayList<Map<String, Object>>();
		 //mlist= wjmaterialcategoryService.getWjmaterialcategoryList(m.getId());
		 mlist= unitcategoryService.getWjmaterialcategoryList(m.getId());
		 if (!(mlist==null)){
		 for(int i=0;i<mlist.size();i++){
			    Unitcategory mc=(Unitcategory)mlist.get(i);
			    Map<String, Object> rootMap = new HashMap<String, Object>();
			    rootMap.put("id", mc.getId());
	 		    rootMap.put("unitcategoryname",mc.getUnitcategoryname());
	 		    rootMap.put("unitcategoryintro", mc.getUnitcategoryintro());
	 		    rootMap.put("defaultflowproperty", mc.getDefaultflowproperty());
	 		    rootMap.put("parentname", mc.getParentname());
	 		    rootMap.put("uuid", mc.getUuid());
	 		    rootMap.put("parentid", mc.getParentid());
	 		    rootMap.put("children", getUnitcategoryChildren(mc));
	 		   childcategory.add(rootMap);		
			}
		 }
		 return childcategory;
	}
	
	public void getUnitdetail() throws IOException {
		
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
		//System.out.println(categoryid);
    	List list=new ArrayList();
    	
    	//分页开始
    	Page<Unitdetail> page = null;
		if (this.getSize() == 0) {
			page = new Page<Unitdetail>(20);
		} else {
			page = new Page<Unitdetail>(this.getSize());
		}
		page.setPageNo(this.getIndex());
		Page<Unitdetail> newpage = null;
    	//分页结束
    	//System.out.println(unitcategoryid);
    	if("0".equals(unitcategoryid) || "null".equals(unitcategoryid) || unitcategoryid == null)
    	{    
    		//list=wjbasematerialService.getAllWjbasematerials();
    		list=unitdetailService.getUnitdetails();
    	}else{
    		//newpage=wjbasematerialService.getBasematerial(categoryid, page);
    		newpage=unitdetailService.getUnitdetail(unitcategoryid, page);
    		PageDTO pagedto = new PageDTO();
    		pagedto.setTotal(newpage.getTotalCount());
    		pagedto.setPagesize(newpage.getPageSize());
    		pagedto.setTotalPage(newpage.getTotalPages());
    		List<Unitdetail> basemateriallist = newpage.getResult();
            pagedto.setData(new ArrayList());
            for (Unitdetail wjbasematerial : basemateriallist) {
            	Map<String, Object> rootMap = new HashMap<String, Object>();
	    		rootMap.put("id", wjbasematerial.getId());
	    	 	rootMap.put("unitname",wjbasematerial.getUnitname());
	    	 	rootMap.put("unitintro", wjbasematerial.getUnitintro());
	    	 	rootMap.put("unitsynonyms", wjbasematerial.getUnitsynonyms());
	    	 	rootMap.put("conversionfactor", wjbasematerial.getConversionfactor());
	    	 	rootMap.put("formula", wjbasematerial.getFormula());
	    	 	rootMap.put("isreference", wjbasematerial.getIsreference());
	    	 	rootMap.put("unitcategoryname", wjbasematerial.getUnitcategoryname());
	    	 	rootMap.put("uuid", wjbasematerial.getUuid());
	    		rootMap.put("unitcategoryid",wjbasematerial.getUnitcategory().getId());
	    		//rootMap.put("categoryname", wjbasematerial.getMaterialCategory().getCategoryname());
	    		pagedto.getData().add(rootMap);		
    		}
    		//System.out.println(basemateriallist.size());
    		JSONUtil.write(response, pagedto);
    	}
	}
	
	public void sousuoUnitdetail() throws IOException {
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
    	//List plist=wjbasematerialService.getWjbasematerialList(categoryid);
    	List plist=unitdetailService.getUnitdetailList(unitcategoryid);
    	List<Unitdetail> sousuolist = new ArrayList<Unitdetail>();
    	
    	for (int i = 0; i < plist.size(); i++) {
    		Unitdetail m=(Unitdetail)plist.get(i);
    		if(m.getUnitname().equals(unitname)) {
				sousuolist.add(m);
				//System.out.println(sousuolist.size());
			}
		}
    	ObjectMapper objectMapper=new ObjectMapper();
    	//System.out.println(sousuolist.size());
		if (!(sousuolist==null)){
		for(int j=0;j<sousuolist.size();j++){
			Unitdetail b=(Unitdetail)sousuolist.get(j);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", b.getId());
    	 	rootMap.put("unitname",b.getUnitname());
    	 	rootMap.put("unitintro", b.getUnitintro());
    	 	rootMap.put("unitsynonyms", b.getUnitsynonyms());
    	 	rootMap.put("conversionfactor", b.getConversionfactor());
    	 	rootMap.put("formula", b.getFormula());
    	 	rootMap.put("isreference", b.getIsreference());
    	 	rootMap.put("unitcategoryname", b.getUnitcategoryname());
    	 	rootMap.put("uuid", b.getUuid());
    		rootMap.put("unitcategoryid",b.getUnitcategory().getId());
 		    alllist.add(rootMap);		
		}
		objectMapper.writeValue(w, alllist);
		}
	}
	
	public void setUuid() {
		String uuid = UUID.randomUUID().toString();
		List<Wjmaterialcategory> list = new ArrayList<Wjmaterialcategory>();
		list = wjmaterialcategoryService.getAllWjmaterialcategories();
		for (int i = 0; i < list.size(); i++) {
			Wjmaterialcategory goaldefinition = list.get(i);
			goaldefinition.setUUID(uuid);
			wjmaterialcategoryService.update(goaldefinition);
		}
	}
	
	public String cometoEvaluatejsp() {
		return "lcafinalcalculate";
	}
	
	//action方法到此结束
	
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
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCategoryname() {
		return categoryname;
	}
	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}
	public String getEnglishname() {
		return englishname;
	}
	public void setEnglishname(String englishname) {
		this.englishname = englishname;
	}
	public String getCategoryintro() {
		return categoryintro;
	}
	public void setCategoryintro(String categoryintro) {
		this.categoryintro = categoryintro;
	}
	public String getParentid() {
		return parentid;
	}
	public void setParentid(String parentid) {
		this.parentid = parentid;
	}
	public String getMaterialname() {
		return materialname;
	}
	public void setMaterialname(String materialname) {
		this.materialname = materialname;
	}
	public String getMaterialintro() {
		return materialintro;
	}
	public void setMaterialintro(String materialintro) {
		this.materialintro = materialintro;
	}
	public String getMaterialunit() {
		return materialunit;
	}
	public void setMaterialunit(String materialunit) {
		this.materialunit = materialunit;
	}
	public String getMaterialprice() {
		return materialprice;
	}
	public void setMaterialprice(String materialprice) {
		this.materialprice = materialprice;
	}
	public String getCategoryid() {
		return categoryid;
	}
	public void setCategoryid(String categoryid) {
		this.categoryid = categoryid;
	}
	public String getWjmaterialcategory() {
		return wjmaterialcategory;
	}
	public void setWjmaterialcategory(String wjmaterialcategory) {
		this.wjmaterialcategory = wjmaterialcategory;
	}
	public String getExistresult() {
		return existresult;
	}
	public void setExistresult(String existresult) {
		this.existresult = existresult;
	}
	public String getMid() {
		return mid;
	}
	public void setMid(String mid) {
		this.mid = mid;
	}
	public String getWjbasematerial() {
		return wjbasematerial;
	}
	public void setWjbasematerial(String wjbasematerial) {
		this.wjbasematerial = wjbasematerial;
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
	public UnitcategoryService getUnitcategoryService() {
		return unitcategoryService;
	}
	public void setUnitcategoryService(UnitcategoryService unitcategoryService) {
		this.unitcategoryService = unitcategoryService;
	}
	public UnitdetailService getUnitdetailService() {
		return unitdetailService;
	}
	public void setUnitdetailService(UnitdetailService unitdetailService) {
		this.unitdetailService = unitdetailService;
	}
	public String getUnitcategoryname() {
		return unitcategoryname;
	}
	public void setUnitcategoryname(String unitcategoryname) {
		this.unitcategoryname = unitcategoryname;
	}
	public String getUnitcategoryintro() {
		return unitcategoryintro;
	}
	public void setUnitcategoryintro(String unitcategoryintro) {
		this.unitcategoryintro = unitcategoryintro;
	}
	public String getDefaultflowproperty() {
		return defaultflowproperty;
	}
	public void setDefaultflowproperty(String defaultflowproperty) {
		this.defaultflowproperty = defaultflowproperty;
	}
	public String getParentname() {
		return parentname;
	}
	public void setParentname(String parentname) {
		this.parentname = parentname;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getUnitname() {
		return unitname;
	}
	public void setUnitname(String unitname) {
		this.unitname = unitname;
	}
	public String getUnitintro() {
		return unitintro;
	}
	public void setUnitintro(String unitintro) {
		this.unitintro = unitintro;
	}
	public String getUnitsynonyms() {
		return unitsynonyms;
	}
	public void setUnitsynonyms(String unitsynonyms) {
		this.unitsynonyms = unitsynonyms;
	}
	public Double getConversionfactor() {
		return conversionfactor;
	}
	public void setConversionfactor(Double conversionfactor) {
		this.conversionfactor = conversionfactor;
	}
	public String getFormula() {
		return formula;
	}
	public void setFormula(String formula) {
		this.formula = formula;
	}
	public Integer getIsreference() {
		return isreference;
	}
	public void setIsreference(Integer isreference) {
		this.isreference = isreference;
	}
	public String getUnitcategoryid() {
		return unitcategoryid;
	}
	public void setUnitcategoryid(String unitcategoryid) {
		this.unitcategoryid = unitcategoryid;
	}
	public String getFirstcategory() {
		return firstcategory;
	}
	public void setFirstcategory(String firstcategory) {
		this.firstcategory = firstcategory;
	}
	public String getSubcategory() {
		return subcategory;
	}
	public void setSubcategory(String subcategory) {
		this.subcategory = subcategory;
	}
}
