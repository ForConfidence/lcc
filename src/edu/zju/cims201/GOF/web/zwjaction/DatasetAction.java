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

import edu.zju.cims201.GOF.hibernate.pojo.Material;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcadatasetdetail;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcadatasetlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciafactor;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciamethod;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciamethodlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcamaterialdatasetlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcamateriallcialist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasematerial;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjmaterialcategory;
import edu.zju.cims201.GOF.service.zwjservice.DatasetService;
import edu.zju.cims201.GOF.service.zwjservice.LcalciamethodService;
import edu.zju.cims201.GOF.service.zwjservice.WjbasematerialService;
import edu.zju.cims201.GOF.web.CrudActionSupport;

@Namespace("/zwjaction")
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "goalDefinition.action", type = "redirect")
		 })
public class DatasetAction extends CrudActionSupport<Material> implements ServletResponseAware, ServletRequestAware {
	@Resource(name="datasetServiceImpl")
	private DatasetService datasetService;
	@Resource(name="wjbasematerialServiceImpl")
	private WjbasematerialService wjbasematerialService;
	@Resource(name="lcalciamethodServiceImpl")
	private LcalciamethodService lcalciamethodService;
	
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	private String datasetname;
	private String datasetintro;
	private String datasetrule;
	private String datasetcuracy;
	private String datasetuncertainty;
	private String moduleid;
	private String processid;
	
	private String materialid;
	private String materialname;
	private String inoroutput;
	private String inoroutputname;
	private String value;
	private String unit;
	private String modulename;
	private String processname;
	private String datasetid;
	private String UUID;
	
	private String listintro;
	private String materialvalue;
	private String materialunit;
	
	private String lcianame;
	private String lciacategory;
	private String lciafactorname;
	private String lciafactorvalue;
	private String lciafactorunit;
	private String listcuracy;
	private String listuncertainty;
	private String lciamethodid;
	private String lcalciamethodid;
	
	//action开始
	
	public void getAlldataset() throws IOException{
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
    	List plist=datasetService.getAlldatasetlists();
    	ObjectMapper objectMapper=new ObjectMapper();
    	
		if (!(plist==null)){
		for(int i=0;i<plist.size();i++){
			Lcadatasetlist m=(Lcadatasetlist)plist.get(i);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", m.getId());
 		    rootMap.put("datasetname",m.getDatasetname());
 		    rootMap.put("datasetintro", m.getDatasetintro());
 		    rootMap.put("datasetrule", m.getDatasetrule());
 		    rootMap.put("datasetcuracy", m.getDatasetcuracy());
 		    rootMap.put("datasetuncertainty", m.getDatasetuncertainty());
 		    rootMap.put("moduleid", m.getModuleid());
 		    rootMap.put("processid", m.getProcessid());
 		    alllist.add(rootMap);		
		}
		objectMapper.writeValue(w, alllist);
		}
	}
	
	public void getDatasetdetail() throws IOException {
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
    	List plist=datasetService.getDaLcadatasetdetails(datasetid);
    	ObjectMapper objectMapper=new ObjectMapper();
    	
		if (!(plist==null)){
		for(int i=0;i<plist.size();i++){
			Lcadatasetdetail m=(Lcadatasetdetail)plist.get(i);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", m.getId());
 		    rootMap.put("materialid",m.getMaterialid());
 		    rootMap.put("materialname", m.getMaterialname());
 		    rootMap.put("inoroutput", m.getInoroutput());
 		    rootMap.put("inoroutputname", m.getInoroutputname());
 		    rootMap.put("value", m.getValue());
 		    rootMap.put("unit", m.getUnit());
 		    rootMap.put("modulename", m.getModulename());
 		    rootMap.put("processname", m.getProcessname());
 		    rootMap.put("datasetid", m.getLcadatasetlist().getId());
 		    alllist.add(rootMap);		
		}
		objectMapper.writeValue(w, alllist);
		}
	}
	
	public void getLcamaterialdatasetlist() throws IOException {
		
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
    	List plist=datasetService.getLcamaterialdatasetlists(materialid);
    	ObjectMapper objectMapper=new ObjectMapper();
		if (!(plist==null)){
		for(int i=0;i<plist.size();i++){
			Lcamaterialdatasetlist m=(Lcamaterialdatasetlist)plist.get(i);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", m.getId());
 		    rootMap.put("materialname",m.getMaterialname());
 		    rootMap.put("listintro", m.getListintro());
 		    rootMap.put("materialvalue", m.getMaterialvalue());
 		    rootMap.put("materialunit", m.getMaterialunit());
 		    rootMap.put("inoroutput", m.getInoroutput());
 		    rootMap.put("inoroutputname", m.getInoroutputname());
 		    rootMap.put("datasetrule", m.getDatasetrule());
 		    rootMap.put("datasetcuracy", m.getDatasetcuracy());
 		    rootMap.put("datasetuncertainty", m.getDatasetuncertainty());
 		    rootMap.put("UUID", m.getUUID());
 		    rootMap.put("materialid", m.getWjbasematerial().getId());
 		    alllist.add(rootMap);		
		}
		objectMapper.writeValue(w, alllist);
		}
	}
	
	public void getLcamateriallcialist() throws IOException {
		//System.out.println(materialid);
		//System.out.println(lciamethodid);
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
    	List plist=datasetService.getLcamateriallcialists(materialid, lciamethodid);
    	//System.out.println(plist.size());
    	ObjectMapper objectMapper=new ObjectMapper();
		if (!(plist==null)){
		for(int i=0;i<plist.size();i++){
			Lcamateriallcialist m=(Lcamateriallcialist)plist.get(i);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", m.getId());
 		    rootMap.put("materialname",m.getMaterialname());
 		    rootMap.put("listintro", m.getListintro());
 		    rootMap.put("lcianame", m.getLcianame());
 		    rootMap.put("lciacategory", m.getLciacategory());
 		    rootMap.put("lciafactorname", m.getLciafactorname());
 		    rootMap.put("lciafactorvalue", m.getLciafactorvalue());
 		    rootMap.put("lciafactorunit", m.getLciafactorunit());
 		    rootMap.put("listcuracy", m.getListcuracy());
 		    rootMap.put("listuncertainty", m.getListuncertainty());
 		    rootMap.put("UUID", m.getUUID());
 		    rootMap.put("materialid", m.getWjbasematerial().getId());
 		    rootMap.put("lciamethodid", m.getLcalciamethodlist().getId());
 		    alllist.add(rootMap);		
		}
		objectMapper.writeValue(w, alllist);
		}
	}
	
	//临时用action：通过查找得到基础物质的影响因子列表
	public void setFactors() {
		List<Wjbasematerial> list = wjbasematerialService.getAllWjbasematerials();
		System.out.println(list.size());
		if(list.size()>0) {
			for (int i = 0; i < list.size(); i++) {
				Wjbasematerial wjbasematerial = list.get(i);
				Lcamaterialdatasetlist l = new Lcamaterialdatasetlist();
				l.setMaterialname(wjbasematerial.getMaterialname());
				l.setMaterialvalue(String.valueOf(1));
				l.setMaterialunit(wjbasematerial.getMaterialunit());
				l.setInoroutput(1);
				l.setInoroutputname("输入");
				l.setWjbasematerial(wjbasematerial);
				datasetService.save(l);
				System.out.println(i+1);
			}
		}
	}
	
	public void setFactorlist() {
		List<Lcalciafactor> list = lcalciamethodService.getAllfactors();
		for (int i = 0; i < list.size(); i++) {
			Lcalciafactor l = list.get(i);
			List<Wjbasematerial> list2 = wjbasematerialService.getAllWjbasematerials();
			for(int j = 0; j < list2.size(); j++) {
				Wjbasematerial w = list2.get(j);
				if((l.getMaterialCategory().equals(w.getMaterialCategory()))&&(l.getFactorname().equals(w.getMaterialname()))) {
					Lcamateriallcialist ll = new Lcamateriallcialist();
					ll.setMaterialname(l.getFactorname());
					ll.setLcianame(l.getLcalciamethod().getLcianame());
					Lcalciamethodlist lm = l.getLcalciamethod().getLcalciamethodlist();
					ll.setLciacategory(l.getLcalciamethod().getLciacategory());
					ll.setLciafactorname(l.getLcalciamethod().getLciafactor());
					ll.setLciafactorvalue(String.valueOf(l.getFactorvalue()));
					ll.setLciafactorunit(l.getFactorunit());
					ll.setWjbasematerial(w);
					ll.setLcalciamethodlist(lm);
					ll.setLcalciamethodid(l.getLcalciamethod().getId());
					datasetService.save(ll);
					System.out.println(j+1);
				}
			}
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

	public DatasetService getDatasetService() {
		return datasetService;
	}

	public void setDatasetService(DatasetService datasetService) {
		this.datasetService = datasetService;
	}

	public String getDatasetname() {
		return datasetname;
	}

	public void setDatasetname(String datasetname) {
		this.datasetname = datasetname;
	}

	public String getDatasetintro() {
		return datasetintro;
	}

	public void setDatasetintro(String datasetintro) {
		this.datasetintro = datasetintro;
	}

	public String getDatasetrule() {
		return datasetrule;
	}

	public void setDatasetrule(String datasetrule) {
		this.datasetrule = datasetrule;
	}

	public String getDatasetcuracy() {
		return datasetcuracy;
	}

	public void setDatasetcuracy(String datasetcuracy) {
		this.datasetcuracy = datasetcuracy;
	}

	public String getDatasetuncertainty() {
		return datasetuncertainty;
	}

	public void setDatasetuncertainty(String datasetuncertainty) {
		this.datasetuncertainty = datasetuncertainty;
	}

	public String getModuleid() {
		return moduleid;
	}

	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}

	public String getProcessid() {
		return processid;
	}

	public void setProcessid(String processid) {
		this.processid = processid;
	}

	public String getMaterialid() {
		return materialid;
	}

	public void setMaterialid(String materialid) {
		this.materialid = materialid;
	}

	public String getMaterialname() {
		return materialname;
	}

	public void setMaterialname(String materialname) {
		this.materialname = materialname;
	}

	public String getInoroutput() {
		return inoroutput;
	}

	public void setInoroutput(String inoroutput) {
		this.inoroutput = inoroutput;
	}

	public String getInoroutputname() {
		return inoroutputname;
	}

	public void setInoroutputname(String inoroutputname) {
		this.inoroutputname = inoroutputname;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getModulename() {
		return modulename;
	}

	public void setModulename(String modulename) {
		this.modulename = modulename;
	}

	public String getProcessname() {
		return processname;
	}

	public void setProcessname(String processname) {
		this.processname = processname;
	}

	public String getDatasetid() {
		return datasetid;
	}

	public void setDatasetid(String datasetid) {
		this.datasetid = datasetid;
	}

	public String getListintro() {
		return listintro;
	}

	public void setListintro(String listintro) {
		this.listintro = listintro;
	}

	public String getMaterialvalue() {
		return materialvalue;
	}

	public void setMaterialvalue(String materialvalue) {
		this.materialvalue = materialvalue;
	}

	public String getMaterialunit() {
		return materialunit;
	}

	public void setMaterialunit(String materialunit) {
		this.materialunit = materialunit;
	}

	public String getUUID() {
		return UUID;
	}

	public void setUUID(String uUID) {
		UUID = uUID;
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

	public String getLciafactorname() {
		return lciafactorname;
	}

	public void setLciafactorname(String lciafactorname) {
		this.lciafactorname = lciafactorname;
	}

	public String getLciafactorvalue() {
		return lciafactorvalue;
	}

	public void setLciafactorvalue(String lciafactorvalue) {
		this.lciafactorvalue = lciafactorvalue;
	}

	public String getLciafactorunit() {
		return lciafactorunit;
	}

	public void setLciafactorunit(String lciafactorunit) {
		this.lciafactorunit = lciafactorunit;
	}

	public String getListcuracy() {
		return listcuracy;
	}

	public void setListcuracy(String listcuracy) {
		this.listcuracy = listcuracy;
	}

	public String getListuncertainty() {
		return listuncertainty;
	}

	public void setListuncertainty(String listuncertainty) {
		this.listuncertainty = listuncertainty;
	}

	public String getLciamethodid() {
		return lciamethodid;
	}

	public void setLciamethodid(String lciamethodid) {
		this.lciamethodid = lciamethodid;
	}

	public WjbasematerialService getWjbasematerialService() {
		return wjbasematerialService;
	}

	public void setWjbasematerialService(WjbasematerialService wjbasematerialService) {
		this.wjbasematerialService = wjbasematerialService;
	}

	public LcalciamethodService getLcalciamethodService() {
		return lcalciamethodService;
	}

	public void setLcalciamethodService(LcalciamethodService lcalciamethodService) {
		this.lcalciamethodService = lcalciamethodService;
	}

	public String getLcalciamethodid() {
		return lcalciamethodid;
	}

	public void setLcalciamethodid(String lcalciamethodid) {
		this.lcalciamethodid = lcalciamethodid;
	}

	
}
