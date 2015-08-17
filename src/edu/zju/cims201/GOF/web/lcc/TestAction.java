package edu.zju.cims201.GOF.web.lcc;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.rmi.RemoteException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.rpc.ServiceException;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.XMLType;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.stringtree.json.JSONWriter;

import edu.zju.cims201.GOF.hibernate.pojo.Component;
import edu.zju.cims201.GOF.hibernate.pojo.LccModule;
import edu.zju.cims201.GOF.hibernate.pojo.LccProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.Material;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccCaculationSolution;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccModuleBranchManage;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.SolutionData;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcadatasetdetail;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcadatasetlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lccdatasetdetail;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lccdatasetlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasematerial;
import edu.zju.cims201.GOF.service.component.ComponentService;
import edu.zju.cims201.GOF.service.department.DepartmentService;
import edu.zju.cims201.GOF.service.module.ModuleService;
import edu.zju.cims201.GOF.service.zwjservice.DatasetService;
import edu.zju.cims201.GOF.service.zwjservice.WjbasematerialService;
import edu.zju.cims201.GOF.util.JSONUtil;
import edu.zju.cims201.GOF.web.CrudActionSupport;


@Namespace("/lca")
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "lcamodule.action", type = "redirect"),
		 @Result(name = "draw", location = "/WEB-INF/content/lcc/filelookedu.zju.cims201.GOF2.jsp"),
		 @Result(name = "modulelook", location = "/WEB-INF/content/lcc/modulelook.jsp"),
		 @Result(name = "nodemanage", location = "/WEB-INF/content/lcc/nodemanage.jsp"),
		 @Result(name = "showChart", location = "/WEB-INF/content/module/resultChart.jsp")})
public class TestAction extends CrudActionSupport<Material> implements ServletResponseAware, ServletRequestAware {
private static final long serialVersionUID = 8683878162525847072L;
	
	@Resource(name="moduleServiceImpl")
	private ModuleService moduleService;
	
	@Resource(name = "datasetServiceImpl")
	private DatasetService datasetService;
	
	@Resource(name = "departmentServiceImpl")
	private DepartmentService departmentService;
	
	
	@Resource(name = "componentServiceImpl")
	private ComponentService componentService;
	
	@Resource(name = "wjbasematerialServiceImpl")
	private WjbasematerialService wjbasematerialService;
	
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	private String xmldata;
	
	private String oldsupermoduleid;
	public String getOldsupermoduleid() {
		return oldsupermoduleid;
	}
	public void setOldsupermoduleid(String oldsupermoduleid) {
		this.oldsupermoduleid = oldsupermoduleid;
	}
	//512
	private String alldata;
	public String getAlldata() {
		return alldata;
	}
	public void setAlldata(String alldata) {
		this.alldata = alldata;
	}
	public void getallSolution(){
		
		List <LccCaculationSolution> solutionList= moduleService.getNotUploadSolution();
		for(LccCaculationSolution solution:solutionList){
    		dealWithNotUploadLcaCaculationSolution(solution);
    	}
	}
	private void dealWithNotUploadLcaCaculationSolution(
			LccCaculationSolution s) {
		String soutionUUID=s.getBranchUUID();
		List<SolutionData> datas=moduleService.getSolutionDataBySolution(soutionUUID);
		HashMap<String, Object> allMap=new HashMap<String, Object>();  
		allMap.put("branchUUID", s.getBranchUUID());
		allMap.put("createrid", s.getCreater().getId());
		allMap.put("name", s.getName());
		allMap.put("solutionUUID", s.getSolutionUUID());
		List<HashMap<String , Object>> list=new ArrayList<HashMap<String,Object>>();
		for(SolutionData d:datas){
			String datasetUUID=d.getDatasetUUID();
			String moduleUUID=d.getModuleUUID();
			Lcadatasetlist l=datasetService.getdataSetListByUUID(datasetUUID);
			HashMap<String, Object> h=new HashMap<String, Object>();
			h.put("moduleUUID", moduleUUID);
			h.put("datasetUUID", l.getUUID());
			h.put("branchUUID", l.getBranchUUID());
//			h.put("datasetname", l.getBranchUUID());
//			h.put("datasetintro", l.getBranchUUID());
//			h.put("datasetrule", l.getBranchUUID());
//			h.put("datasetcuracy", l.getBranchUUID());
//			h.put("datasetuncertainty", l.getBranchUUID());
			h.put("isbase", l.getIsbase());
			List<Lcadatasetdetail> details=datasetService.getDaLcadatasetdetails(String.valueOf(l.getId()));
			List<HashMap<String , Object>> detaillist=new ArrayList<HashMap<String,Object>>();
		    for(Lcadatasetdetail ld:details){
		    	HashMap flowmap=new HashMap(); 
			 	   long materialid=ld.getMaterialid();
				   //Basematerial b=basematerialservice.getBasematerialbyid(String.valueOf(materialid));
				   flowmap.put("materialname", ld.getMaterialname());
				   Wjbasematerial basematerial=wjbasematerialService.getWjbasematerial(String.valueOf(ld.getMaterialid()));
				   flowmap.put("id", ld.getMaterialid());
				   flowmap.put("materialunit", ld.getUnit());
				   flowmap.put("processUUID", ld.getProcessUUID());
				   flowmap.put("modulename", ld.getModulename());
				   flowmap.put("processname", ld.getProcessname());
				   flowmap.put("Inoroutputname", ld.getInoroutputname());
				   flowmap.put("UUID",ld.getUUID());
				   flowmap.put("materialvalue", ld.getValue()); 
				   flowmap.put("subcategory", basematerial.getSubcategory());
				   flowmap.put("firstcategory", basematerial.getFirstcategory()); 
				   flowmap.put("Inoroutput", ld.getInoroutput());
				   detaillist.add(flowmap);
				   
		    }
		    h.put("details", detaillist);
		    list.add(h);
		}
		allMap.put("lists", list);
		JSONWriter writer = new JSONWriter();
        String ktypestring=writer.write(allMap);
        System.out.println(ktypestring);
        String str =ktypestring;
		String endpoint = "http://192.168.253.34:8080/gdksp/services/LCAModuleService" ;  
        Service service = new Service() ;  
		String result;
		try {
			Call call = (Call) service.createCall() ; 
			call.setTargetEndpointAddress(endpoint) ; 
			call.setOperationName("savealldata") ;
			call.addParameter("lcaString",org.apache.axis.encoding.XMLType.XSD_STRING,javax.xml.rpc.ParameterMode.IN) ; 
			call.setReturnType(XMLType.XSD_STRING) ;  
			call.setUseSOAPAction(true) ; 
	        result = (String) call.invoke(new Object[]{str});
	        System.out.println(result);  
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void getModuleAllData() throws IOException, ServiceException, ParseException{
    	List <LccModuleBranchManage> nothasreferencelccModuleBranchManages=moduleService.getNotUploadNotHasReferenceModulebranch();
    	System.out.println(nothasreferencelccModuleBranchManages.size());
    	for(LccModuleBranchManage branch:nothasreferencelccModuleBranchManages){
    		dealWithNotUploadNotHasReferenceModulebranch(branch);
    	}
    	
    	List <LccModuleBranchManage> hasreferencelccModuleBranchManages=moduleService.getNotUploadHasReferenceModulebranch();
    	for(LccModuleBranchManage branch:hasreferencelccModuleBranchManages){
    		dealWithNotUploadHasReferenceModulebranch(branch);
    	}
	}
	
	public void dealWithNotUploadNotHasReferenceModulebranch(LccModuleBranchManage branch) throws ServiceException, IOException, ParseException{
		
		String branchUUID=branch.getBranchUUID();
		LccModuleBranchManage l=moduleService.getLccBranchByUUID(branchUUID);
		String parentUUID=l.getParentUUID();
		LccModuleBranchManage superbranch=moduleService.getLccBranchByUUID(parentUUID);
		LccModule parentmodule=moduleService.getSuperLccModuleByBranchUUID(parentUUID);
		HashMap<String, Object> h=new HashMap<String, Object>();
		h.put("modulename", parentmodule.getName());
		h.put("superbranchUUID", parentmodule.getBranchUUID());
		h.put("hasreference", "0");
		h.put("modulenote", parentmodule.getNote());
		h.put("productid",  parentmodule.getComponent().getId());
		h.put("moduleUUID", parentmodule.getModuleUUID());
		h.put("branchUUID",branchUUID);
		h.put("superbranchcreatedate", superbranch.getCreatedate().toString());
		h.put("branchcreatedate", branch.getCreatedate().toString());
		h.put("branchdir", branch.getModuledir());
		List modulelist=new ArrayList<HashMap<String, Object>>();
		List<LccModule> stagechildmodules=moduleService.getLccModuleListByBranchUUID(branchUUID, String.valueOf(parentmodule.getId()));
		for(LccModule m:stagechildmodules){
			HashMap<String, Object> modulemap=new HashMap<String, Object>();
			Lcadatasetlist dataset=datasetService.getLcadatasetlistByModuleid(String.valueOf(m.getId()));
			HashMap<String, Object> stagemap=getNotHasReferrenceLevelMap(m,dataset.getId());
			//LcaDataSetManage dataSetManage=moduleService.getLcaDataSetManageByBranchAndModule(branchUUID,m.getModuleUUID());
			modulemap.put("stagelevel", stagemap);
			modulemap.put("datasetUUID", dataset.getUUID());
			modulemap.put("hasreference", "0"); 
			Set<LccModule> lmsets=m.getLccModules();
			List levellist=new ArrayList<HashMap<String, Object>>();
			for(LccModule lm: lmsets){
				HashMap<String, Object> levelmap=getNotHasReferrenceLevelMap(lm,dataset.getId());
				levellist.add(levelmap);
			
			}
			modulemap.put("alllevels", levellist);
			modulelist.add(modulemap);
			
		}
		h.put("allmodules", modulelist);
		JSONWriter writer = new JSONWriter();
        String ktypestring=writer.write(h);
        /*LCAModuleService service=new LCAModuleService();
        service.savealldata(ktypestring);*/
        System.out.println(ktypestring);
        String str =ktypestring;
		String endpoint = "http://192.168.253.34:8080/gdksp/services/LCAModuleService" ;  
        Service service = new Service() ;  
        Call call = (Call) service.createCall() ; 
        call.setTargetEndpointAddress(endpoint) ; 
       // 测试方法名以getOntoWords为例
        call.setOperationName("savealldata") ;
        //测试方法传入的参数名称，以getOntoWords为例，传入的参数为classURI
        //如果方法有多个参数,复制多条该代码即可,参数传入下面new Object后面  
        call.addParameter("lcaString",org.apache.axis.encoding.XMLType.XSD_STRING,javax.xml.rpc.ParameterMode.IN) ; 
        call.setReturnType(XMLType.XSD_STRING) ;  
        call.setUseSOAPAction(true) ; 
       // call.invoke(new Object[]{str}) ;
        String result = (String) call.invoke(new Object[]{str}) ;
        
        System.out.println(result);  
		
	}
	public void dealWithNotUploadHasReferenceModulebranch(LccModuleBranchManage branch) throws IOException{
			
			String branchUUID=branch.getBranchUUID();
			LccModuleBranchManage l=moduleService.getLccBranchByUUID(branchUUID);
			String parentUUID=l.getParentUUID();
			LccModule parentmodule=moduleService.getSuperLccModuleByBranchUUID(parentUUID);
			HashMap<String, Object> h=new HashMap<String, Object>();
			h.put("modulename", parentmodule.getName());
			h.put("superbranchUUID", parentmodule.getBranchUUID());
			h.put("hasreference", "1");
			h.put("modulenote", parentmodule.getNote());
			h.put("productid",  parentmodule.getComponent().getId());
			h.put("moduleUUID", parentmodule.getModuleUUID());
			h.put("branchUUID",branchUUID);
			List modulelist=new ArrayList<HashMap<String, Object>>();
			List<LccModule> stagechildmodules=moduleService.getLccModuleListByBranchUUID(branchUUID, String.valueOf(parentmodule.getId()));
			for(LccModule m:stagechildmodules){
				HashMap<String, Object> modulemap=new HashMap<String, Object>();
				if(m.getHasreference()==1){
					String referncebranchUUID= m.getReferbranchUUID();
					String referencemoduleUUID=m.getRefermoduleUUID();
				    m=moduleService.getLccModuleByUUID(referencemoduleUUID);
				    HashMap<String, Object> stagemap=getHasReferrenceLevelMap(m);
				    modulemap.put("hasreference", "1");   
				    modulemap.put("stagelevel", stagemap);   
				}else{
					Lcadatasetlist dataset=datasetService.getLcadatasetlistByModuleid(String.valueOf(m.getId()));
					HashMap<String, Object> stagemap=getNotHasReferrenceLevelMap(m,dataset.getId());
					//LcaDataSetManage dataSetManage=moduleService.getLcaDataSetManageByBranchAndModule(branchUUID,m.getModuleUUID());
					modulemap.put("stagelevel", stagemap);
					modulemap.put("datasetUUID", dataset.getUUID());
					modulemap.put("hasreference", "0");  
					Set<LccModule> lmsets=m.getLccModules();
					List levellist=new ArrayList<HashMap<String, Object>>();
					for(LccModule lm: lmsets){
						HashMap<String, Object> levelmap=getNotHasReferrenceLevelMap(lm,dataset.getId());
						levellist.add(levelmap);
					
					}
					modulemap.put("alllevels", levellist);
				}
				
				modulelist.add(modulemap);
				
			}
			h.put("allmodules", modulelist);
			JSONWriter writer = new JSONWriter();
	        String ktypestring=writer.write(h);
	        System.out.println(ktypestring);
			
		}	
	public String getXmlDataByModule(String pathname) throws IOException{
		BufferedReader br=new BufferedReader(new InputStreamReader(new FileInputStream(pathname), "utf-8"));
		String line="";
		StringBuffer  buffer = new StringBuffer();
		while((line=br.readLine())!=null){
		buffer.append(line);
		}
		String xmldata = buffer.toString();
		return xmldata;
	}

	public HashMap<String, Object> getNotHasReferrenceLevelMap(LccModule lm ,int datasetid) throws IOException{
		HashMap<String, Object> levelmap=new HashMap<String, Object>();
		String levelid=lm.getLevelid();
		levelmap.put("levelid", lm.getLevelid());
		levelmap.put("parentlevelid", lm.getParentlevelid());
		levelmap.put("parentcellid", lm.getProcessid());
		levelmap.put("componentid", lm.getComponent().getId());
		levelmap.put("componentname", lm.getComponent().getName());
		levelmap.put("modulename", lm.getName());
		levelmap.put("modulenote", lm.getNote());
		levelmap.put("moduleUUID", lm.getModuleUUID());
		levelmap.put("Version", lm.getVersion());
		levelmap.put("createdate", lm.getCreatedate().toString());
		String xmldata=getXmlDataByModule(lm.getModuledir()+"\\"+lm.getXmlFileName());
		levelmap.put("xmldata", xmldata);
		List processlist=new ArrayList<HashMap<String, Object>>();
		Set<LccProcessTemplate> lptsets=lm.getLccprocessTemplates();
		for(LccProcessTemplate lpt:lptsets){
			 HashMap<String, Object> processmap=new HashMap<String, Object>();
			 processmap.put("processname", lpt.getName());
			 processmap.put("processnote", lpt.getNote());
			 processmap.put("id", lpt.getProcessid());
			 processmap.put("processUUID", lpt.getProcessUUID());
			 List<Lcadatasetdetail>flows= datasetService.getDaLcadatasetdetailsByProcess(datasetid,lpt.getProcessUUID());
			 //Set<ProcessTemplateFlow> flows= lpt.getProcesstempateflows();
			 List<HashMap> inputmateriallist=new ArrayList();
			 List<HashMap> outputmateriallist=new ArrayList();
			 for(Lcadatasetdetail ld:flows){
			 
				 HashMap flowmap=new HashMap(); 
			 	   long materialid=ld.getMaterialid();
				   //Basematerial b=basematerialservice.getBasematerialbyid(String.valueOf(materialid));
				   flowmap.put("materialname", ld.getMaterialname());
				   Wjbasematerial basematerial=wjbasematerialService.getWjbasematerial(String.valueOf(ld.getMaterialid()));
				   flowmap.put("id", ld.getMaterialid());
				   flowmap.put("materialunit", ld.getUnit());
				   flowmap.put("UUID",ld.getUUID());
				   flowmap.put("materialvalue", ld.getValue()); 
				   flowmap.put("subcategory", basematerial.getSubcategory());
				   flowmap.put("firstcategory", basematerial.getFirstcategory()); 
				   int type=ld.getInoroutput();
			 	   if(type==1)
			 	   {
			 		  inputmateriallist.add(flowmap);
			 	   }else if(type==0){
			 		  outputmateriallist.add(flowmap);
			 	   }
			 	  
			 }
			 processmap.put("inputmaterial", inputmateriallist);
		 	 processmap.put("outputmaterial", outputmateriallist);
		 	 //知识未加
		 	 processmap.put("konwledge", "");
		 	 processlist.add(processmap);
			
		}
		levelmap.put("cellcollection", processlist);
	    return levelmap;
		
	}
	public HashMap<String, Object> getHasReferrenceLevelMap(LccModule lm){
		HashMap<String, Object> levelmap=new HashMap<String, Object>();
		String levelid=lm.getLevelid();
		levelmap.put("levelid", lm.getLevelid());
		levelmap.put("parentlevelid", lm.getParentlevelid());
		levelmap.put("parentcellid", lm.getProcessid());
		levelmap.put("componentid", lm.getComponent().getId());
		levelmap.put("componentname", lm.getComponent().getName());
		levelmap.put("referbranchUUID", lm.getReferbranchUUID());
		levelmap.put("refermoduleUUID", lm.getRefermoduleUUID());
	    return levelmap;
		
	}
	
	
	
	
	
	
public String savealldata( String alldata) throws IOException, ParseException{
		
		System.out.println("开始"+alldata);
		HashMap moduledata=(HashMap)getJSONvalueObject(alldata);
		String path;
		LccModuleBranchManage branchManage;
		LccModule m;
		File moduledir;
		int productid=Integer.valueOf(moduledata.get("productid").toString());
		String modulename=moduledata.get("modulename").toString();
		String modulenote=moduledata.get("modulenote").toString();
		String hasreference=moduledata.get("hasreference").toString();
		String moduleUUID=moduledata.get("moduleUUID").toString();
		String superbranchUUID=moduledata.get("superbranchUUID").toString();
		String branchUUID=moduledata.get("branchUUID").toString();
		String branchdir=moduledata.get("branchdir").toString();
		String superbranchcreatedate=moduledata.get("superbranchcreatedate").toString();
		String branchcreatedate=moduledata.get("branchcreatedate").toString();
		Component product=componentService.getComponent(productid);
		branchManage=moduleService.getLccBranchByUUID(superbranchUUID);
		m=moduleService.getLccModuleByUUID(moduleUUID);
		SimpleDateFormat a=new SimpleDateFormat("yyyy-MM-dd");
		if(moduleService.getLccBranchByUUID(superbranchUUID)==null){
			path="D:\\module\\";
			moduledir=new File(path+superbranchUUID);
			if(!moduledir.exists()){
				moduledir.mkdirs();
	    	}
		    branchManage=new LccModuleBranchManage();
		    branchManage.setName(modulename);
		    branchManage.setNote(modulenote);
		    branchManage.setModuledir(path+superbranchUUID);
		    branchManage.setBranchUUID(superbranchUUID);
		    branchManage.setParentUUID(null);
		    branchManage.setCreatedate(a.parse(superbranchcreatedate));
		    //待完成
		    //branchManage.setCreateuserid(createuserid);
		    branchManage.setIscomplete(1);
		    branchManage.setIsupload(1);
		    branchManage.setIsbase(1);
		    moduleService.saveLccModuleBranch(branchManage);
		    m=new LccModule();
			m.setComponent(product);
			m.setName(modulename);
			m.setNote(modulenote);
			m.setBranchUUID(superbranchUUID);
			m.setModuleUUID(moduleUUID);
			m.setCreatedate(new Date());
			m.setParent(null);
			m.setIsparent(1);
			m.setModuledir(path+superbranchUUID);
		}
		LccModule supermodule=m;
		String dirUUID = UUID.randomUUID().toString();
		branchUUID=UUID.randomUUID().toString();
	    branchManage=new LccModuleBranchManage();
	    branchManage.setName("基础分支");
	    branchManage.setNote("基础分支");
	    branchManage.setModuledir(branchdir);
	    branchManage.setBranchUUID(branchUUID);
	    branchManage.setParentUUID(superbranchUUID);
	    branchManage.setCreatedate(a.parse(branchcreatedate));
	    //待完成
	    //branchManage.setCreateuserid(createuserid);
	    branchManage.setIscomplete(1);
	    branchManage.setIsupload(1);
	    branchManage.setIsbase(1);
	    moduleService.saveLccModuleBranch(branchManage);
	    moduleService.addModule(m);
		List<HashMap<String, Object>> allmodules=(ArrayList<HashMap<String,Object>>)moduledata.get("allmodules");
		for(HashMap modulemap:allmodules){
			HashMap<String, Object> stagelevelmap=(HashMap<String, Object>)modulemap.get("stagelevel");
			String datasetUUID=modulemap.get("datasetUUID").toString();
			String datasetcreatedate=modulemap.get("datasetcreatedate").toString();
			String levelid=stagelevelmap.get("levelid").toString();
			String parentlevelid=stagelevelmap.get("parentlevelid").toString();
			String parentcellid=stagelevelmap.get("parentcellid").toString();
			String componentid=stagelevelmap.get("componentid").toString();
			String componentname=stagelevelmap.get("componentname").toString();
			moduleUUID=stagelevelmap.get("moduleUUID").toString();
			modulename=stagelevelmap.get("modulename").toString();
			modulenote=stagelevelmap.get("modulenote").toString();
			String createdate=stagelevelmap.get("createdate").toString();
			m=new LccModule();
			m.setName(modulename);
			m.setNote(null);
			m.setCreatedate(a.parse(createdate));
			m.setModuleUUID(moduleUUID);
			m.setModuledir(branchManage.getModuledir()+"\\"+moduleUUID);
			m.setXmlFileName("level__stage"+".xml");
			m.setVersion(moduleUUID);
			m.setBranchUUID(branchUUID);
			m.setLevelid("level_stage");
			m.setParentlevelid("0");
			m.setProcessid("0");
			m.setIsparent(0);
			m.setHasreference(0);
			m.setParent(supermodule);
			Component component=new Component();
			component.setId(Integer.valueOf(componentid));
			m.setComponent(component);
			moduleService.addModule(m);
			String xmldata=stagelevelmap.get("xmldata").toString();
			moduledir=new File(branchManage.getModuledir()+"\\"+dirUUID);
			if(!moduledir.exists()){
				moduledir.mkdirs();
	    	}
			String stagexmlFileName=branchManage.getModuledir()+"\\"+dirUUID+"\\"+"level__stage"+".xml";
			try {
				this.xmldata=xmldata;
				saveXml(stagexmlFileName);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			List<HashMap<String, Object>>  processlist=(ArrayList<HashMap<String, Object>>)stagelevelmap.get("cellcollection");
			
			
			for(HashMap processmap:processlist){
				 LccProcessTemplate p=new LccProcessTemplate();
			     String processid=String.valueOf(processmap.get("id"));
			     p.setProcessid(processid);
			     p.setName(String.valueOf(processmap.get("processname")));
			     p.setNote(String.valueOf(processmap.get("processnote")));
			     p.setModule(m);
			     moduleService.addProcess(p);
			}
		    LccModule parentModule=m;
		    List levelList=(List)modulemap.get("alllevels");
			int length=levelList.size();
			Lccdatasetlist ldl=new Lccdatasetlist();
			ldl.setUUID(datasetUUID);
			ldl.setDatasetcuracy("0");
			ldl.setIsbase(1);
            ldl.setModuleid(parentModule.getId());
            ldl.setDatasetname(parentModule.getName()+"_"+parentModule.getModuleUUID());
            ldl.setBranchUUID(branchUUID);
            datasetService.saveLccdatasetlist(ldl);
			for(int i=0;i<length;i++){
				HashMap levelmap=(HashMap)levelList.get(i);
				String type=levelmap.get("type").toString();
				levelid=levelmap.get("levelid").toString();
				parentlevelid=levelmap.get("parentlevelid").toString();
				parentcellid=levelmap.get("parentcellid").toString();
				xmldata=levelmap.get("xmldata").toString();
				componentid=levelmap.get("componentid").toString();
		        componentname=levelmap.get("componentname").toString();
				moduleUUID=levelmap.get("moduleUUID").toString();
				modulename=levelmap.get("modulename").toString();
				modulenote=levelmap.get("modulenote").toString();
				createdate=levelmap.get("createdate").toString();
				m=new LccModule();
				String parentdir=parentModule.getModuledir();
				String xmlFileName=parentdir+"\\"+levelid+".xml";
				try {
					this.xmldata=xmldata;
					saveXml(xmlFileName);
				} catch (Exception e) {
					e.printStackTrace();
				}
				m.setName(levelid);
				m.setCreatedate(new Date());
				m.setModuleUUID(moduleUUID);
				m.setModuledir(parentdir);
				m.setXmlFileName(levelid+".xml");
				m.setParent(parentModule);
				m.setBranchUUID(branchUUID);
				m.setLevelid(levelid);
				m.setComponent(component);
				m.setParentlevelid(parentlevelid);
				m.setIsparent(0);
				System.out.println("父cellid"+parentcellid);
				if(parentcellid!=null){
					m.setProcessid(parentcellid);
				}
				
				processlist =(List<HashMap<String,Object>>)levelmap.get("cellcollection");
				Set<LccProcessTemplate> processTemplates=new HashSet<LccProcessTemplate>();
				int n=processlist.size();
				System.out.println("大小"+n);
				   for(int l=0;l<n;l++){
					   LccProcessTemplate p=new LccProcessTemplate();
					   String processUUID=UUID.randomUUID().toString();
					   HashMap h1=processlist.get(l);
					   String processid=String.valueOf(h1.get("id"));
					   p.setProcessid(processid);
					   p.setProcessUUID(processUUID);
					   p.setName(String.valueOf(h1.get("processname")));
					   p.setNote(String.valueOf(h1.get("processnote")));
					   List<Lccdatasetdetail> list=new ArrayList<Lccdatasetdetail>();
					   List<HashMap> inputmateriallist=(List)h1.get("inputmaterial");
					   List<HashMap> outputmateriallist=(List)h1.get("outputmaterial");
					   if(inputmateriallist!=null&&inputmateriallist.size()>0){
						   for(int j=0;j<inputmateriallist.size();j++)
						   {
							   HashMap h2=inputmateriallist.get(j);
							   
							   Lccdatasetdetail ld =new Lccdatasetdetail();
							   ld.setInoroutput(1);
							   ld.setInoroutputname("输入");
							   ld.setLccdatasetlist(ldl);
							   ld.setMaterialid(Integer.valueOf(h2.get("id").toString()));
							   ld.setMaterialname(h2.get("materialname").toString());
							   ld.setProcessUUID(processUUID);
							   ld.setModulename(parentModule.getName());
							   ld.setProcessname(p.getName());
							   ld.setUnit(h2.get("materialunit").toString());
							   String uuid = UUID.randomUUID().toString();
							   ld.setUUID(uuid);
							   ld.setValue(Double.valueOf(h2.get("materialvalue").toString()));
							   list.add(ld);
						   }
					   }
					   
					   if(outputmateriallist!=null&&outputmateriallist.size()>0){
						   for(int j=0;j<outputmateriallist.size();j++)
						   {
							   HashMap h2=outputmateriallist.get(j);
							   Lccdatasetdetail ld =new Lccdatasetdetail();
							   ld.setInoroutput(0);
							   ld.setInoroutputname("输出");
							   ld.setLccdatasetlist(ldl);
							   ld.setProcessUUID(processUUID);
							   ld.setMaterialid(Integer.valueOf(h2.get("id").toString()));
							   ld.setMaterialname(h2.get("materialname").toString());
							   ld.setModulename(parentModule.getName());
							   ld.setProcessname(p.getName());
							   ld.setUnit(h2.get("materialunit").toString());
							   String uuid = UUID.randomUUID().toString();
							   ld.setUUID(uuid);
							   ld.setValue(Double.valueOf(h2.get("materialvalue").toString()));
							   list.add(ld);
						   }
					   }
					
					  // p.setProcesstempateflows(processTemplatesFlows);   
					   datasetService.saveLccdatasetdetaillist(list);
					   processTemplates.add(p);
				   }
				   m.setLccprocessTemplates(processTemplates);
				   moduleService.addModuleandprocess(m);
	
						
					}
		}
		
		return null;
	}
	public String saveXml( String xmlFileName) throws Exception{
		byte[] xmldatas =xmldata.getBytes("UTF-8");
		File xmlData = new File(xmlFileName);
		FileOutputStream outputStream = new FileOutputStream(xmlData);
		outputStream.write(xmldatas);
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
	
	public String saveSolution(String solutionmap){
		   HashMap solutiondata=(HashMap)getJSONvalueObject(solutionmap);
		   String name=solutiondata.get("name").toString();
		   String solutionUUID=solutiondata.get("solutionUUID").toString();
		   String createrid=solutiondata.get("createrid").toString();
		   Employee creater=departmentService.getEmployeeByid(createrid);
		   String branchUUID=solutiondata.get("branchUUID").toString();
		   LccCaculationSolution solution=new LccCaculationSolution();
		   SimpleDateFormat a=new SimpleDateFormat("yyyy-MM-dd");
		   solution.setBranchUUID(branchUUID);
		   solution.setCreater(creater);
		   solution.setIsupload(1);
		   solution.setName(name);
		   solution.setSolutionUUID(solutionUUID);
		   moduleService.saveLccCaculationSolution(solution);
		   
		   List<HashMap<String, Object>> alllists=(ArrayList<HashMap<String,Object>>)solutiondata.get("lists");
		   for(HashMap list:alllists){
			    String datasetUUID=list.get("datasetUUID").toString();
			    String moduleUUID=list.get("moduleUUID").toString();
			    SolutionData sd=new SolutionData();
			    sd.setBranchUUID(branchUUID);
			    sd.setDatasetUUID(datasetUUID);
			    sd.setModuleUUID(moduleUUID);
			    sd.setSolutionUUID(solutionUUID);
			    moduleService.saveSolutionData(sd);
			    
			    Lcadatasetlist l=datasetService.getdataSetListByUUID(datasetUUID);
			    if(l==null){
			    	    l=new Lcadatasetlist();
			    	    branchUUID=list.get("branchUUID").toString();
					    String isbase=list.get("isbase").toString();
						l.setUUID(datasetUUID);
						l.setBranchUUID(branchUUID);
						l.setIsbase(Integer.valueOf(isbase));
	//					h.put("datasetname", l.getBranchUUID());
	//					h.put("datasetintro", l.getBranchUUID());
	//					h.put("datasetrule", l.getBranchUUID());
	//					h.put("datasetcuracy", l.getBranchUUID());
	//					h.put("datasetuncertainty", l.getBranchUUID());
						datasetService.saveLcadatasetlist(l);
						List<HashMap<String, Object>> details=(ArrayList<HashMap<String,Object>>)list.get("details");
						List<Lcadatasetdetail> lists=new ArrayList<Lcadatasetdetail>();
						for(HashMap detail:details){
							
							   Lcadatasetdetail ld =new Lcadatasetdetail();
							   ld.setInoroutput(1);
							   ld.setInoroutputname("输入");
							   String processUUID=detail.get("processUUID").toString();
							   String materialunit=detail.get("materialunit").toString();
							   String UUID=detail.get("UUID").toString();
							   String materialvalue=detail.get("materialvalue").toString();
							   // String subcategory=detail.get("subcategory").toString();
							   //String firstcategory=detail.get("firstcategory").toString();
							   String Inoroutput=detail.get("Inoroutput").toString();
							   String Inoroutputname=detail.get("Inoroutputname").toString();
							   String modulename=detail.get("modulename").toString();
							   String processname=detail.get("processname").toString();
							   ld.setLcadatasetlist(l);
							   ld.setMaterialid(Integer.valueOf(detail.get("id").toString()));
							   ld.setMaterialname(detail.get("materialname").toString());
							   ld.setProcessUUID(processUUID);
							   ld.setModulename(modulename);
							   ld.setProcessname(processname);
							   ld.setUnit(detail.get("materialunit").toString());
							   ld.setUUID(UUID);
							   ld.setInoroutput(Integer.valueOf(Inoroutput));
							   ld.setInoroutputname(Inoroutputname);
							   ld.setValue(Double.valueOf(materialvalue));
							   lists.add(ld);
						}
						datasetService.saveLcadatasetdetaillist(lists);
			    }
			   
		   }
		   
		   
		   return "success";
		   
	}
		
	
	
	
	
	
	public Material getModel() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setServletResponse(HttpServletResponse response) {
		// TODO Auto-generated method stub
		this.response = response;
	}
	/* (non-Javadoc)
	 * @see org.apache.struts2.interceptor.ServletRequestAware#setServletRequest(javax.servlet.http.HttpServletRequest)
	 */
	public void setServletRequest(HttpServletRequest request) {
		this.request=request;
		
	}
	/* (non-Javadoc)
	 * @see edu.zju.cims201.GOF.web.CrudActionSupport#list()
	 */
	@Override
	public String list() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	/* (non-Javadoc)
	 * @see edu.zju.cims201.GOF.web.CrudActionSupport#input()
	 */
	@Override
	public String input() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	/* (non-Javadoc)
	 * @see edu.zju.cims201.GOF.web.CrudActionSupport#save()
	 */
	@Override
	public String save() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	/* (non-Javadoc)
	 * @see edu.zju.cims201.GOF.web.CrudActionSupport#delete()
	 */
	@Override
	public String delete() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	/* (non-Javadoc)
	 * @see edu.zju.cims201.GOF.web.CrudActionSupport#prepareModel()
	 */
	@Override
	protected void prepareModel() throws Exception {
		// TODO Auto-generated method stub
		
	}
	public ModuleService getModuleService() {
		return moduleService;
	}
	public void setModuleService(ModuleService moduleService) {
		this.moduleService = moduleService;
	}
	public DatasetService getDatasetService() {
		return datasetService;
	}
	public void setDatasetService(DatasetService datasetService) {
		this.datasetService = datasetService;
	}
	public DepartmentService getDepartmentService() {
		return departmentService;
	}
	public void setDepartmentService(DepartmentService departmentService) {
		this.departmentService = departmentService;
	}
	public WjbasematerialService getWjbasematerialService() {
		return wjbasematerialService;
	}
	public void setWjbasematerialService(WjbasematerialService wjbasematerialService) {
		this.wjbasematerialService = wjbasematerialService;
	}
	public ComponentService getComponentService() {
		return componentService;
	}
	public void setComponentService(ComponentService componentService) {
		this.componentService = componentService;
	}
	public String getXmldata() {
		return xmldata;
	}
	public void setXmldata(String xmldata) {
		this.xmldata = xmldata;
	}



}
