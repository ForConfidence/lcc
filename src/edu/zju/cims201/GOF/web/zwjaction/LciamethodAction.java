package edu.zju.cims201.GOF.web.zwjaction;

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
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.codehaus.jackson.map.ObjectMapper;
import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.hibernate.pojo.Material;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciafactor;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciamethod;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasematerial;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjmaterialcategory;
import edu.zju.cims201.GOF.rs.dto.PageDTO;
import edu.zju.cims201.GOF.service.zwjservice.LcalciamethodService;
import edu.zju.cims201.GOF.util.JSONUtil;
import edu.zju.cims201.GOF.web.CrudActionSupport;

@Namespace("/zwjaction")
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "goalDefinition.action", type = "redirect")
		 })
public class LciamethodAction extends CrudActionSupport<Material> implements ServletResponseAware, ServletRequestAware {
	@Resource(name="lcalciamethodServiceImpl")
	private LcalciamethodService lcalciamethodService;
	public LcalciamethodService getLcalciamethodService() {
		return lcalciamethodService;
	}
	public void setLcalciamethodService(LcalciamethodService lcalciamethodService) {
		this.lcalciamethodService = lcalciamethodService;
	}
	
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	private String factorcategoryname;
	private String factorsubcategoryname;
	private String factorname;
	private String factorunit;
	private String factorvalue;
	private String lciacategoryid;
	private String materialcategoryid;
	
	private String lcianame;
	private String lciacategory;
	private String lciafactor;
	private String lciafactorunit;
	
	private String methodid;
	
	private int size;
	private int index;
	
	//action开始
	
	public void getAlllciamethod() throws IOException {
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
    	List plist=lcalciamethodService.getAlllciamethod();
    	ObjectMapper objectMapper=new ObjectMapper();
    	System.out.println(plist.size());
		if (!(plist==null)){
		for(int i=0;i<plist.size();i++){
			Lcalciamethod m=(Lcalciamethod)plist.get(i);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", m.getId());
 		    rootMap.put("lcianame",m.getLcianame());
 		    rootMap.put("lciacategory", m.getLciacategory());
 		    rootMap.put("lciafactor", m.getLciafactor());
 		    rootMap.put("lciafactorunit", m.getLciafactorunit());
 		    alllist.add(rootMap);		
		}
		objectMapper.writeValue(w, alllist);
		}
	}
	
	public void getLciafactorbylciacategoryid() throws IOException {
//		response.setCharacterEncoding("utf-8");
//		PrintWriter w=response.getWriter();
//    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
//    	List plist=lcalciamethodService.getLciafactorbylciacategoryid(lciacategoryid);
//    	ObjectMapper objectMapper=new ObjectMapper();
//    	
//		if (!(plist==null)){
//		for(int i=0;i<plist.size();i++){
//			Lcalciafactor m=(Lcalciafactor)plist.get(i);
//		    Map<String, Object> rootMap = new HashMap<String, Object>();
//		    rootMap.put("id", m.getId());
// 		    rootMap.put("factorcategoryname",m.getFactorcategoryname());
// 		    rootMap.put("factorsubcategoryname", m.getFactorsubcategoryname());
// 		    rootMap.put("factorname", m.getFactorname());
// 		    rootMap.put("factorunit", m.getFactorunit());
// 		    rootMap.put("factorvalue", m.getFactorvalue());
// 		   rootMap.put("lciacategoryid", m.getLcalciamethod().getId());
// 		  rootMap.put("materialcategoryid", m.getMaterialCategory().getId());
// 		    alllist.add(rootMap);		
//		}
//		objectMapper.writeValue(w, alllist);
//		}
		
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
		//System.out.println(categoryid);
    	List list=new ArrayList();
    	
    	//分页开始
    	Page<Lcalciafactor> page = null;
		if (this.getSize() == 0) {
			page = new Page<Lcalciafactor>(20);
		} else {
			page = new Page<Lcalciafactor>(this.getSize());
		}
		page.setPageNo(this.getIndex());
		Page<Lcalciafactor> newpage = null;
    	//分页结束
    		newpage=lcalciamethodService.getBasematerial(lciacategoryid, page);
    		PageDTO pagedto = new PageDTO();
    		pagedto.setTotal(newpage.getTotalCount());
    		pagedto.setPagesize(newpage.getPageSize());
    		pagedto.setTotalPage(newpage.getTotalPages());
    		List<Lcalciafactor> lcalciafactorlist = newpage.getResult();
            pagedto.setData(new ArrayList());
            for (Lcalciafactor lcalciafactor : lcalciafactorlist) {
            	
            	Map<String, Object> rootMap = new HashMap<String, Object>();
            	rootMap.put("id", lcalciafactor.getId());
     		    rootMap.put("factorcategoryname",lcalciafactor.getFactorcategoryname());
     		    rootMap.put("factorsubcategoryname", lcalciafactor.getFactorsubcategoryname());
     		    rootMap.put("factorname", lcalciafactor.getFactorname());
     		    rootMap.put("factorunit", lcalciafactor.getFactorunit());
     		    rootMap.put("factorvalue", lcalciafactor.getFactorvalue());
     		    rootMap.put("lciacategoryid", lcalciafactor.getLcalciamethod().getId());
     		    rootMap.put("materialcategoryid", lcalciafactor.getMaterialCategory().getId());
	    		pagedto.getData().add(rootMap);		
    		}
    		//System.out.println(basemateriallist.size());
    		JSONUtil.write(response, pagedto);
    	}
	
	public void sousuoLciafactor() throws IOException {
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
    	List plist=lcalciamethodService.getLciafactorbylciacategoryid(lciacategoryid);
    	
    	
    	List<Lcalciafactor> sousuolist = new ArrayList<Lcalciafactor>();
    	
    	for (int i = 0; i < plist.size(); i++) {
    		Lcalciafactor m=(Lcalciafactor)plist.get(i);
    		if(m.getFactorname().equals(factorname)) {
				sousuolist.add(m);
				//System.out.println(sousuolist.size());
			}
		}
    	ObjectMapper objectMapper=new ObjectMapper();
    	//System.out.println(sousuolist.size());
		if (!(sousuolist==null)){
		for(int j=0;j<sousuolist.size();j++){
			Lcalciafactor b=(Lcalciafactor)sousuolist.get(j);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("factorcategoryname",b.getFactorcategoryname());
 		    rootMap.put("factorsubcategoryname", b.getFactorsubcategoryname());
 		    rootMap.put("factorname", b.getFactorname());
 		    rootMap.put("factorunit", b.getFactorunit());
 		    rootMap.put("factorvalue", b.getFactorvalue());
 		    rootMap.put("lciacategoryid", b.getLcalciamethod().getId());
 		    rootMap.put("materialcategoryid", b.getMaterialCategory().getId());
 		    alllist.add(rootMap);		
		}
		objectMapper.writeValue(w, alllist);
		}
	}
	
	//获得影响因子值列表
	public void getFactors() throws IOException {
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
    	List mlist=lcalciamethodService.getLcalciamethods(methodid);
    	List<Lcalciafactor> ffList = new ArrayList<Lcalciafactor>();
    	List<Lcalciafactor> fList = new ArrayList<Lcalciafactor>();
    	if(mlist!=null) {
    		for (int i = 0; i < mlist.size(); i++) {
				Lcalciamethod lcalciamethod = (Lcalciamethod) mlist.get(i);
				List<Lcalciafactor> ffl = lcalciamethodService.getLciafactorbylciacategoryid(String.valueOf(lcalciamethod.getId()));
				if(ffl!=null) {
					for(int j = 0; j < ffl.size(); j++) {
						ffList.add(ffl.get(j));
					}
				}
				
			}
    	}
    	if(ffList!=null) {
    		for(int i = 0; i < ffList.size(); i++) {
    			Lcalciafactor lcalciafactor = ffList.get(i);
    			if((lcalciafactor.getFactorname().equals(factorname))&&String.valueOf(lcalciafactor.getMaterialCategory().getId()).equals(materialcategoryid)) {
    				fList.add(lcalciafactor);
    			}
    		}
    	}
    	ObjectMapper objectMapper=new ObjectMapper();
		if (!(fList==null)){
		for(int i=0;i<fList.size();i++){
			Lcalciafactor m=(Lcalciafactor)fList.get(i);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", m.getId());
		    rootMap.put("factorcategoryname",m.getFactorcategoryname());
 		    rootMap.put("factorsubcategoryname", m.getFactorsubcategoryname());
 		    rootMap.put("factorname", m.getFactorname());
 		    rootMap.put("factorunit", m.getFactorunit());
 		    rootMap.put("factorvalue", m.getFactorvalue());
 		    rootMap.put("lciacategoryid", m.getLcalciamethod().getId());
 		    rootMap.put("materialcategoryid", m.getMaterialCategory().getId());
 		    rootMap.put("lcianame", m.getLcalciamethod().getLcianame());
 		    rootMap.put("lciacategory", m.getLcalciamethod().getLciacategory());
 		    alllist.add(rootMap);		
		}
		objectMapper.writeValue(w, alllist);
		}
	}
	
	//action结束
	
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
	public String getFactorcategoryname() {
		return factorcategoryname;
	}
	public void setFactorcategoryname(String factorcategoryname) {
		this.factorcategoryname = factorcategoryname;
	}
	public String getFactorsubcategoryname() {
		return factorsubcategoryname;
	}
	public void setFactorsubcategoryname(String factorsubcategoryname) {
		this.factorsubcategoryname = factorsubcategoryname;
	}
	public String getFactorname() {
		return factorname;
	}
	public void setFactorname(String factorname) {
		this.factorname = factorname;
	}
	public String getFactorunit() {
		return factorunit;
	}
	public void setFactorunit(String factorunit) {
		this.factorunit = factorunit;
	}
	public String getFactorvalue() {
		return factorvalue;
	}
	public void setFactorvalue(String factorvalue) {
		this.factorvalue = factorvalue;
	}
	public String getLciacategoryid() {
		return lciacategoryid;
	}
	public void setLciacategoryid(String lciacategoryid) {
		this.lciacategoryid = lciacategoryid;
	}
	public String getMaterialcategoryid() {
		return materialcategoryid;
	}
	public void setMaterialcategoryid(String materialcategoryid) {
		this.materialcategoryid = materialcategoryid;
	}
	public String getLcianame() {
		return lcianame;
	}
	public void setLcianame(String lcianame) {
		this.lcianame = lcianame;
	}
	public String getLciacategory() {
		return lciacategory;
	}
	public void setLciacategory(String lciacategory) {
		this.lciacategory = lciacategory;
	}
	public String getLciafactor() {
		return lciafactor;
	}
	public void setLciafactor(String lciafactor) {
		this.lciafactor = lciafactor;
	}
	public String getLciafactorunit() {
		return lciafactorunit;
	}
	public void setLciafactorunit(String lciafactorunit) {
		this.lciafactorunit = lciafactorunit;
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
	public String getMethodid() {
		return methodid;
	}
	public void setMethodid(String methodid) {
		this.methodid = methodid;
	}
}
