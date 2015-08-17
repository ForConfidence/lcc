package edu.zju.cims201.GOF.web.lcc;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.util.Streams;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.stringtree.json.JSONWriter;

import edu.zju.cims201.GOF.hibernate.pojo.Component;
import edu.zju.cims201.GOF.hibernate.pojo.LccModule;
import edu.zju.cims201.GOF.hibernate.pojo.LccProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.Material;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccModuleBranchManage;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccTask;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lccdatasetdetail;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lccdatasetlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasematerial;
import edu.zju.cims201.GOF.service.component.ComponentService;
import edu.zju.cims201.GOF.service.module.ModuleService;
import edu.zju.cims201.GOF.service.task.TaskService;
import edu.zju.cims201.GOF.service.zwjservice.DatasetService;
import edu.zju.cims201.GOF.service.zwjservice.WjbasematerialService;
import edu.zju.cims201.GOF.util.Constants;
import edu.zju.cims201.GOF.util.JSONUtil;
import edu.zju.cims201.GOF.web.CrudActionSupport;


/**
 * lcc模板Action类
 *
 */

@Namespace("/lcc")
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "lccmodule.action", type = "redirect")})
public class LccmoduleAction extends CrudActionSupport<Material> implements ServletResponseAware, ServletRequestAware {
	private static final long serialVersionUID = 8683878162525847072L;
	
	/**
	 * 产品服务
	 */
	@Resource(name="componentServiceImpl")
	private ComponentService componentService;
	/**
	 * 模板服务
	 */
	@Resource(name="moduleServiceImpl")
	private ModuleService moduleService;
	/**
	 * 数据集服务
	 */
	@Resource(name = "datasetServiceImpl")
	private DatasetService datasetService;
	/**
	 * 基础物质服务
	 */
	@Resource(name = "wjbasematerialServiceImpl")
	private WjbasematerialService wjbasematerialService;
	
	/**
	 * 任务服务
	 */
	@Resource(name = "taskServiceImpl")
	private TaskService taskService;
	
	
	
	private HttpServletRequest request;
	private HttpServletResponse response;
	private String id;
	private String parentId;
	private String name;;
	private String description;
	private String level;
	private String cId;
	private String data;
	private String projectid;
	private String processid;
	private String parentmoduleid;
	private String pdid;
	private String moduleid;
	private String nodename;
	private String nodetype;
	private String pdname;
	private String mdname;
	private String consumematerialdata;
	private String processname;
	private String xmldata;
	private String material;
	private String mdnote;
	private String componentid;
	private String components;
	private String version;
	private String buildtype;
	private String nodecategory;
	private String modulename;
	private String modulenote;
	private String cellcollection;
	private String moduletype;
	private String taskid;
	private String category;
	private String categoryid;
	private String levelid;
	private String parentcellid;
	private String superparentmoduleid;
	private String oldbranchUUID;
	private String parentlevelid;
	private List<File> file;
	private List<String> fileFileName;
	private String evaluationmethods;
	private String methodid;
	private String effecindex;
	private String effectmaterialdata;
	private String evaluationindexid;
	private String branchUUID;
	private String superisassigned;
	
	private String datasetUUID;
	
	private String oldsupermoduleid;
	
	private String alldata;
	
	private String datasetisassigned;
	
	
	/**
	 * 获取指定路径的xml文件内容
	 * @param pathname
	 * @return
	 * @throws IOException
	 */
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
	
	/**
	 * 获取层次模板
	 * @param lm
	 * @return
	 * @throws IOException
	 */
	public HashMap<String, Object> getlevelmap(LccModule lm) throws IOException{
		HashMap<String, Object> levelmap=new HashMap<String, Object>();
		String levelid=lm.getLevelid();
		levelmap.put("levelid", lm.getLevelid());
		levelmap.put("parentlevelid", lm.getParentlevelid());
		levelmap.put("parentcellid", lm.getProcessid());
		levelmap.put("componentid", lm.getComponent().getId());
		levelmap.put("componentname", lm.getComponent().getName());
		String xmldata=getXmlDataByModule(lm.getModuledir()+"\\"+lm.getXmlFileName());
		levelmap.put("xmldata", xmldata);
		levelmap.put("name", lm.getName());
		List processlist=new ArrayList<HashMap<String, Object>>();
		Set<LccProcessTemplate> lptsets=lm.getLccprocessTemplates();
		for(LccProcessTemplate lpt:lptsets){
			 HashMap<String, Object> processmap=new HashMap<String, Object>();
			 processmap.put("processname", lpt.getName());
			 processmap.put("processnote", lpt.getNote());
			 processmap.put("id", lpt.getProcessid());
			 List<HashMap> inputmateriallist=new ArrayList();
			 List<HashMap> outputmateriallist=new ArrayList();
			 String processUUID=lpt.getProcessUUID();
			 List<Lccdatasetdetail> detaillist=datasetService.getLccdatasetdetailsbyModuleAndProcess(this.getParentmoduleid(), processUUID,this.getDatasetUUID());
			 for(Lccdatasetdetail ld:detaillist){
				 
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
	
    /**
     * 获取模板所有数据
     * @throws IOException
     */
    public void getModuleAllData() throws IOException{
		HashMap<String, Object> h=new HashMap<String, Object>();
		LccModule m=(LccModule)moduleService.getModule(moduleid);
		LccModule parentmodule=m.getParent();
		this.setParentmoduleid(String.valueOf(m.getId()));
		h.put("modulename", parentmodule.getName());
		h.put("modulenote", parentmodule.getNote());
		h.put("productid",  parentmodule.getComponent().getId());
		h.put("moduleuuid", parentmodule.getModuleUUID());
		if(m.getHasreference()==1){
			String referencemoduleUUID=m.getRefermoduleUUID();
			m=moduleService.getLccModuleByUUID(referencemoduleUUID);
		}
		HashMap<String, Object> stagemap=getlevelmap(m);
		h.put("stagelevel", stagemap);
		Set<LccModule> lmsets=m.getLccModules();
		List levellist=new ArrayList<HashMap<String, Object>>();
		for(LccModule lm: lmsets){
			HashMap<String, Object> levelmap=getlevelmap(lm);
			levellist.add(levelmap);
		
		}
		h.put("alllevels", levellist);
		JSONWriter writer = new JSONWriter();
        String ktypestring=writer.write(h);
        System.out.println(ktypestring);
        response.getWriter().println(ktypestring);
	    
    }
    
	/**
	 * 简单保存模板的方法
	 * 分为全新简单保存和已有模板简单保存
	 * @return
	 * @throws IOException
	 */
	public String simpleModuleSave() throws IOException{
		HashMap moduledata=(HashMap)getJSONvalueObject(alldata);
		int productid=Integer.valueOf(moduledata.get("productid").toString());
		String branchUUID;
		String buildtype=moduledata.get("buildtype").toString();
		LccModule m;
		int needassign;
		Component product=componentService.getComponent(productid);
		
		if(buildtype.equals("new_simplebuild")){
			String dirUUID;
			String topbranchUUID;
			Date createdate;
			createdate=new Date();
			String path;
			LccModuleBranchManage branchManage;
			File moduledir;
			if(Integer.valueOf(superisassigned)==0){
				String modulename=moduledata.get("modulename").toString();
				String modulenote=moduledata.get("modulenote").toString();
				needassign=1;
				dirUUID = UUID.randomUUID().toString();
				topbranchUUID=dirUUID;
				path="D:\\module\\";
				moduledir=new File(path+dirUUID);
				if(!moduledir.exists()){
					moduledir.mkdirs();
		    	}
			    branchManage=new LccModuleBranchManage();
			    branchManage.setName(modulename);
			    branchManage.setNote(modulenote);
			    branchManage.setModuledir(path+dirUUID);
			    branchManage.setBranchUUID(topbranchUUID);
			    branchManage.setParentUUID(null);
			    branchManage.setCreatedate(createdate);
			    //待完成
			    //branchManage.setCreateuserid(createuserid);
			    branchManage.setIscomplete(0);
			    branchManage.setIsupload(0);
			    branchManage.setIsbase(1);
			    branchManage.setHasreference(0);
			    moduleService.saveLccModuleBranch(branchManage);
				m=new LccModule();
				m.setComponent(product);
				m.setName(modulename);
				m.setNote(modulenote);
				m.setBranchUUID(topbranchUUID);
				m.setModuleUUID(dirUUID);
				m.setCreatedate(new Date());
				m.setParent(null);
				m.setIsparent(1);
				m.setModuledir(path+dirUUID);
				m.setHasreference(0);
				dirUUID = UUID.randomUUID().toString();
				branchUUID=UUID.randomUUID().toString();
			    branchManage=new LccModuleBranchManage();
			    branchManage.setName("基础分支");
			    branchManage.setNote("基础分支");
			    branchManage.setModuledir(m.getModuledir()+"\\"+dirUUID);
			    branchManage.setBranchUUID(branchUUID);
			    branchManage.setParentUUID(topbranchUUID);
			    branchManage.setCreatedate(createdate);
			    branchManage.setIscomplete(0);
			    branchManage.setIsupload(0);
			    branchManage.setIsbase(1);
			    branchManage.setHasreference(0);
			    moduleService.saveLccModuleBranch(branchManage);
			    moduleService.addModule(m);
				
			}else{
				needassign=0;
				m=(LccModule)moduleService.getModule(superparentmoduleid);
				branchUUID=this.getBranchUUID();
				branchManage=moduleService.getLccBranchByUUID(branchUUID);
			}
			LccModule supermodule=m;
			HashMap stagelevelmap=(HashMap)moduledata.get("stagelevel");
			List componentslist=(List)stagelevelmap.get("cellcollection");
			String xmldata=stagelevelmap.get("xmldata").toString();
			int complength=componentslist.size();
	    	HashMap h=(HashMap)componentslist.get(0);
	    	HashMap comp=(HashMap)h.get("component");
	    	m=new LccModule();
			m.setName(comp.get("name").toString());
			dirUUID = UUID.randomUUID().toString();
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
			m.setNote(null);
			m.setCreatedate(new Date());
			m.setModuleUUID(UUID.randomUUID().toString());
			m.setModuledir(branchManage.getModuledir()+"\\"+dirUUID);
			m.setXmlFileName("level__stage"+".xml");
			m.setVersion(dirUUID);
			m.setBranchUUID(branchUUID);
			m.setLevelid("level_stage");
			m.setParentlevelid("0");
			m.setProcessid("0");
			m.setIsparent(0);
			m.setHasreference(0);
			m.setParent(supermodule);
			Component component=new Component();
			component.setId(Integer.valueOf(comp.get("id").toString()));
			m.setComponent(component);
			moduleService.addModule(m);
		    List stages=(List)h.get("stages");
		    System.out.println(""+stages.size());
		    for(int j=0;j<stages.size();j++){
		       String processUUID=UUID.randomUUID().toString();
			   HashMap h2=(HashMap)stages.get(j);
			   String processid=h2.get("id").toString();
			   String stagename=h2.get("name").toString();
			   String stagenote=h2.get("stage").toString();
			   LccProcessTemplate stagept=new LccProcessTemplate();
			   stagept.setProcessid(processid);
			   stagept.setProcessUUID(processUUID);
			   stagept.setName(stagename);
			   stagept.setNote(stagenote);
			   stagept.setModule(m);
			   moduleService.addProcess(stagept);
		   }
		    LccModule parentModule=m;
		    List levelList=(List)moduledata.get("alllevels");
			int length=levelList.size();
			Lccdatasetlist ldl=new Lccdatasetlist();
			String datasetUUID = UUID.randomUUID().toString();
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
				String levelid=levelmap.get("levelid").toString();
				String parentlevelid=levelmap.get("parentlevelid").toString();
				String parentcellid=levelmap.get("parentcellid").toString();
				xmldata=levelmap.get("xmldata").toString();
				m=new LccModule();
				String childuuid = UUID.randomUUID().toString();
				String parentdir=parentModule.getModuledir();
				String xmlFileName=parentdir+"\\"+levelid+".xml";
				try {
					this.xmldata=xmldata;
					saveXml(xmlFileName);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				m.setName(levelid);
				m.setCreatedate(new Date());
				m.setModuleUUID(childuuid);
				m.setModuledir(parentdir);
				m.setXmlFileName(levelid+".xml");
				m.setParent(parentModule);
				m.setHasreference(0);
				m.setVersion(parentModule.getVersion());
				m.setBranchUUID(branchUUID);
				m.setLevelid(levelid);
				m.setComponent(component);
				m.setParentlevelid(parentlevelid);
				m.setIsparent(0);
				System.out.println("父cellid"+parentcellid);
				if(parentcellid!=null){
					m.setProcessid(parentcellid);
				}
				
				List<HashMap> processlist =(List<HashMap>)levelmap.get("cellcollection");
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
			   Map<String, Object> map=new HashMap<String, Object>();
			   map.put("branchUUID", branchUUID);
			   map.put("supermoduleid", supermodule.getId());
			   map.put("needassign", needassign);
			   ObjectMapper objectMapper = new ObjectMapper();	
			   objectMapper.writeValue(response.getWriter(), map);
		}else if (buildtype.equals("old_simplebuild")){
			
			String dirUUID;
			String topbranchUUID;
			Date createdate;
			createdate=new Date();
			String path;
			LccModuleBranchManage branchManage;
			File moduledir;
			String oldsupermoduleid=moduledata.get("oldsupermoduleid").toString();
			String oldbranchUUID=moduledata.get("oldbranchUUID").toString();
			if(Integer.valueOf(superisassigned)==0){
				needassign=1;
				m=(LccModule)moduleService.getModule(oldsupermoduleid);
				topbranchUUID=m.getBranchUUID();
				dirUUID = UUID.randomUUID().toString();
				branchUUID=UUID.randomUUID().toString();
				branchManage=new LccModuleBranchManage();
			    branchManage.setName(branchUUID);
			    branchManage.setNote(branchUUID);
			    branchManage.setModuledir(m.getModuledir()+"\\"+dirUUID);
			    branchManage.setBranchUUID(branchUUID);
			    branchManage.setParentUUID(topbranchUUID);
			    branchManage.setCreatedate(createdate);
			    branchManage.setIscomplete(0);
			    branchManage.setIsupload(0);
			    branchManage.setIsbase(0);
			    branchManage.setHasreference(1);
			    moduleService.saveLccModuleBranch(branchManage);
			}else{
				needassign=0;
				m=(LccModule)moduleService.getModule(oldsupermoduleid);
				branchUUID=this.getBranchUUID();
				branchManage=moduleService.getLccBranchByUUID(branchUUID);
				
			}
			LccModule supermodule=m;
			
			if(Integer.valueOf(superisassigned)==0){
				dirUUID = UUID.randomUUID().toString();
				List<LccModule> modules=moduleService.getLccModuleListByBranchUUID(oldbranchUUID, oldsupermoduleid);
				System.out.println("元分支模板数量"+modules.size());
				if(moduledata.get("moduleid")!=null){
					System.out.println("存在需要删除1");
			    	String moduleid=moduledata.get("moduleid").toString();
					m=(LccModule)moduleService.getModule(moduleid);
					modules.remove(m);
			    }
				for(LccModule lm:modules){
					m=new LccModule();
					m.setName(lm.getName());
					m.setNote(null);
					m.setCreatedate(lm.getCreatedate());
					m.setModuleUUID(UUID.randomUUID().toString());
					m.setModuledir(lm.getModuledir());
					m.setXmlFileName("level__stage"+".xml");
					m.setVersion(dirUUID);
					m.setBranchUUID(branchUUID);
					m.setLevelid("level_stage");
					m.setParentlevelid("0");
					m.setProcessid("0");
					m.setIsparent(0);
					m.setHasreference(1);
					m.setParent(supermodule);
					m.setComponent(lm.getComponent());
					m.setReferbranchUUID(lm.getReferbranchUUID());
					m.setRefermoduleUUID(lm.getModuleUUID());
					moduleService.addModule(m);
				}
							
			}else{
				System.out.println(moduledata.get("moduleid"));
			    if(moduledata.get("moduleid")!=null){
			    	System.out.println("存在需要删除2");
			    	String moduleid=moduledata.get("moduleid").toString();
					m=(LccModule)moduleService.getModule(moduleid);
					String moduleUUID=m.getModuleUUID();
					m=(LccModule)moduleService.getModuleByReferencemoduleUUIDandBranchUUID(moduleUUID,branchUUID);		
				    moduleService.deletModule(m);
			    }
			}
			HashMap stagelevelmap=(HashMap)moduledata.get("stagelevel");
			List componentslist=(List)stagelevelmap.get("cellcollection");
			String xmldata=stagelevelmap.get("xmldata").toString();
			int complength=componentslist.size();
	    	HashMap h=(HashMap)componentslist.get(0);
	    	HashMap comp=(HashMap)h.get("component");
	    	m=new LccModule();
			m.setName(comp.get("name").toString());
			dirUUID = UUID.randomUUID().toString();
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
			m.setNote(null);
			m.setCreatedate(new Date());
			m.setModuleUUID(UUID.randomUUID().toString());
			m.setModuledir(branchManage.getModuledir()+"\\"+dirUUID);
			m.setXmlFileName("level__stage"+".xml");
			m.setVersion(dirUUID);
			m.setBranchUUID(branchUUID);
			m.setLevelid("level_stage");
			m.setParentlevelid("0");
			m.setProcessid("0");
			m.setIsparent(0);
			m.setHasreference(0);
			m.setParent(supermodule);
			Component component=new Component();
			component.setId(Integer.valueOf(comp.get("id").toString()));
			m.setComponent(component);
			moduleService.addModule(m);
		    List stages=(List)h.get("stages");
		    System.out.println(""+stages.size());
		    for(int j=0;j<stages.size();j++){
		       String processUUID=UUID.randomUUID().toString();
			   HashMap h2=(HashMap)stages.get(j);
			   String processid=h2.get("id").toString();
			   String stagename=h2.get("name").toString();
			   String stagenote=h2.get("stage").toString();
			   LccProcessTemplate stagept=new LccProcessTemplate();
			   stagept.setProcessid(processid);
			   stagept.setProcessUUID(processUUID);
			   stagept.setName(stagename);
			   stagept.setNote(stagenote);
			   stagept.setModule(m);
			   moduleService.addProcess(stagept);
		   }
		    LccModule parentModule=m;
		    List levelList=(List)moduledata.get("alllevels");
			int length=levelList.size();
			Lccdatasetlist ldl=new Lccdatasetlist();
			String datasetUUID = UUID.randomUUID().toString();
			ldl.setUUID(datasetUUID);
			ldl.setDatasetcuracy("0");
			ldl.setIsbase(1);
            ldl.setModuleid(parentModule.getId());
            ldl.setDatasetname(parentModule.getName()+"_"+parentModule.getModuleUUID());
            ldl.setBranchUUID(branchUUID);
            datasetService.saveLccdatasetlist(ldl);
			for(int i=0;i<length;i++){
				HashMap levelmap=(HashMap)levelList.get(i);
				String levelid=levelmap.get("levelid").toString();
				String parentlevelid=levelmap.get("parentlevelid").toString();
				String parentcellid=levelmap.get("parentcellid").toString();
				xmldata=levelmap.get("xmldata").toString();
				m=new LccModule();
				String childuuid = UUID.randomUUID().toString();
				String parentdir=parentModule.getModuledir();
				String xmlFileName=parentdir+"\\"+levelid+".xml";
				try {
					this.xmldata=xmldata;
					saveXml(xmlFileName);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				m.setName(levelid);
				m.setCreatedate(new Date());
				m.setModuleUUID(childuuid);
				m.setModuledir(parentdir);
				m.setXmlFileName(levelid+".xml");
				m.setParent(parentModule);
				m.setHasreference(0);
				m.setVersion(parentModule.getVersion());
				m.setBranchUUID(branchUUID);
				m.setLevelid(levelid);
				m.setComponent(component);
				m.setParentlevelid(parentlevelid);
				m.setIsparent(0);
				System.out.println("父cellid"+parentcellid);
				if(parentcellid!=null){
					m.setProcessid(parentcellid);
				}
				
				List<HashMap> processlist =(List<HashMap>)levelmap.get("cellcollection");
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
					   //Set<ProcessTemplateFlow> processTemplatesFlows=new HashSet<ProcessTemplateFlow>();
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
					   datasetService.saveLccdatasetdetaillist(list);
					   p.setName(String.valueOf(h1.get("processname")));
					   p.setNote(String.valueOf(h1.get("processnote")));
					   processTemplates.add(p);
				   }
				   m.setLccprocessTemplates(processTemplates);
				   moduleService.addModuleandprocess(m);
					}
			
			
			   Map<String, Object> map=new HashMap<String, Object>();
			   map.put("branchUUID", branchUUID);
			   map.put("supermoduleid", supermodule.getId());
			   map.put("needassign", needassign);
			   ObjectMapper objectMapper = new ObjectMapper();	
			   objectMapper.writeValue(response.getWriter(), map);
			
			
		}
					
		return null;
	}

	
	
	/**
	 * 获取产品结构树
	 * @return
	 * @throws IOException
	 */
	public String getComponentsList() throws IOException {
		List clist = null;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> childlist = new ArrayList<Map<String, Object>>();
		ObjectMapper objectMapper = new ObjectMapper();	
		if("0".equals(parentId) || "null".equals(parentId) || parentId == null){
			clist =componentService.getNodesByParent(Integer.parseInt(id));
			Component parent=componentService.getComponent(Integer.valueOf(id));
			 Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", parent.getId());
 		    rootMap.put("name", parent.getName());
 		    rootMap.put("expanded", true);
 		    rootMap.put("__viewicon", true);
			for(int i=0;i<clist.size();i++){
				Component c=(Component)clist.get(i);
			    Map<String, Object> childmap = new HashMap<String, Object>();
			    childmap.put("id", c.getId());
			    childmap.put("name", c.getName());
			    childmap.put("expanded", false);
			    childmap.put("__viewicon", true);
			    childlist.add(childmap);		
				
			}
		
			rootMap.put("children", childlist);
			list.add(rootMap);
		JSONWriter writer = new JSONWriter();
        String ktypestring=writer.write(list);
        response.getWriter().println(ktypestring);
		return null;
			
		}else{
			clist =componentService.getNodesByParent(Integer.parseInt(parentId));
		    for(int i=0;i<clist.size();i++){
				Component c=(Component)clist.get(i);
			    Map<String, Object> childmap = new HashMap<String, Object>();
			    childmap.put("id", c.getId());
			    childmap.put("name", c.getName());
			    childmap.put("expanded", false);
			    childmap.put("__viewicon", true);
			    childlist.add(childmap);		
				
			}
		JSONWriter writer = new JSONWriter();
        String ktypestring=writer.write(childlist);
        response.getWriter().println(ktypestring);
		return null;
		
		
	}
	}
	
	/**
	 * 
	 * 获取模板的数据集
	 * @return
	 */
	public String getModuleDataSet(){
		
		List<Lccdatasetlist> lccdatasetlists =datasetService.getlccdatasetlistBymoduleAndbranch(branchUUID,moduleid);
		List<HashMap<String , Object>> list=new ArrayList<HashMap<String,Object>>();
        for(Lccdatasetlist ldl:lccdatasetlists)		
        {
        	HashMap<String , Object> h=new HashMap<String, Object>();
        	h.put("UUID", ldl.getUUID());
        	h.put("id", ldl.getId());
        	h.put("branchUUID", ldl.getBranchUUID());
        	h.put("accuracy", ldl.getDatasetcuracy());
        	h.put("intro", ldl.getDatasetintro());
        	h.put("name", ldl.getDatasetname());
        	h.put("isbase", ldl.getIsbase());
        	list.add(h);
        }
        JSONWriter writer = new JSONWriter();
        String lccdatasetliststring=writer.write(list);
        try {
			response.getWriter().println(lccdatasetliststring);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
	

	/**
	 * 动态加载产品结构的模板树
	 * @return
	 * @throws IOException
	 */
	public String getmoduleComponentsList() throws IOException {
		List clist = null;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> childlist = new ArrayList<Map<String, Object>>();
		ObjectMapper objectMapper = new ObjectMapper();	
		if("0".equals(parentId) || "null".equals(parentId) || parentId == null){
			String ids="(";
			Map<String, Object> rootMap = new HashMap<String, Object>();
			Component parent=componentService.getComponent(Integer.valueOf(id));
			List<LccModule>lccModules= moduleService.getLccModuleListByBranchUUID(branchUUID,moduleid);
			for(LccModule m:lccModules){
				Component c=m.getComponent();
				if(c.getParentId()==0){
					Map<String, Object> childmap = new HashMap<String, Object>();
					childmap.put("id", m.getComponent().getId());
				    childmap.put("compname", m.getComponent().getName());
				    childmap.put("Version", m.getVersion());
				    childmap.put("Createdate", m.getCreatedate().toString());
				    childmap.put("Note", m.getNote());
				    childmap.put("name",  m.getComponent().getName()+"已建模");
				    childmap.put("moduleid", m.getId());
				    childmap.put("expanded", false);
				    childmap.put("__viewicon", true);
				    childlist.add(childmap);
				}
				
			}
			if(childlist.size()==0){
				 Map<String, Object> childmap = new HashMap<String, Object>();
				    childmap.put("id", parent.getId());
				    childmap.put("name", parent.getName());
				    childmap.put("moduleid", null);
				    childmap.put("expanded", false);
				    childmap.put("__viewicon", true);
				    childlist.add(childmap);		
				}
				
			rootMap.put("children", childlist);
			list.add(rootMap);
			JSONWriter writer = new JSONWriter();
			String ktypestring=writer.write(childlist);
	        response.getWriter().println(ktypestring);
			return null;
			
		}else{
				String ids="(";
				List<LccModule>lccModules= moduleService.getLccModuleListByBranchUUID(branchUUID,moduleid);
				clist =componentService.getnomodulenodesByParent(Integer.parseInt(parentId),"()");
				if(clist==null||clist.size()==0){
					response.getWriter().println("[]");
					return null;
				}
				for(LccModule m:lccModules){
					for(int i=0;i<clist.size();i++){
						Component c=(Component)clist.get(i);
						if(m.getComponent().getId()==c.getId()){
							ids=ids+m.getComponent().getId()+",";
							 Map<String, Object> childmap = new HashMap<String, Object>();
							    childmap.put("id", m.getComponent().getId());
							    childmap.put("name",  m.getComponent().getName()+"已建模");
							    childmap.put("Version", m.getVersion());
							    childmap.put("Createdate", m.getCreatedate().toString());
							    childmap.put("Note", m.getNote());
							    childmap.put("moduleid", m.getId());
							    childmap.put("expanded", false);
							    childmap.put("__viewicon", true);
							    childlist.add(childmap);
							    ids=ids+m.getComponent().getId()+",";
						}
					}
				}
				if(childlist.size()>0){
				ids=ids.substring(0, ids.length()-1);
				}
			ids+=")";
			clist =componentService.getnomodulenodesByParent(Integer.parseInt(parentId),ids);
		    for(int i=0;i<clist.size();i++){
				Component c=(Component)clist.get(i);
			    Map<String, Object> childmap = new HashMap<String, Object>();
			    childmap.put("id", c.getId());
			    childmap.put("name", c.getName());
			    childmap.put("moduleid", null);
			    childmap.put("expanded", false);
			    childmap.put("__viewicon", true);
			    childlist.add(childmap);		
				
			}
		JSONWriter writer = new JSONWriter();
        String ktypestring=writer.write(childlist);
        response.getWriter().println(ktypestring);
		return null;
		}
	}
	
	/**
	 * 
	 * 将string对象转化为json对象
	 * @param data
	 * @return
	 */
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

	PrintWriter out;
	
	/**
	 * 
	 * 产生产品结构树
	 * @return
	 * @throws IOException
	 */
	public String getComponentList() throws IOException {
		List<Component> clist = null;
		if("0".equals(parentId) || "null".equals(parentId) || parentId == null){
			 clist =componentService.getNodesByParent(0);
		}
		for(Component c:clist){
			c.setIcon(null);
			c.setExpanded(true);
		}	
		JSONWriter writer = new JSONWriter();
        String ktypestring=writer.write(clist);
        response.getWriter().println(ktypestring);
		return null;
		
	}


	/**
	 * 
	 * 新增协同共建模板
	 * @return
	 * @throws Exception
	 */
	public String addCoopModule() throws Exception{
		LccModule m;
		LccModuleBranchManage branchManage;
		String dirUUID;
		String topbranchUUID;
		String path;
		Date createdate;
		File moduledir;
		String branchUUID;
		System.out.println(cellcollection);
		createdate=new Date();
		int needassign=0;
		if(Integer.valueOf(superisassigned)==0){
			needassign=1;
			System.out.println("需要新建顶层模板");
			dirUUID= UUID.randomUUID().toString();
			topbranchUUID=dirUUID;
			path="D:\\module\\";
			moduledir=new File(path+dirUUID);
			if(!moduledir.exists()){
				moduledir.mkdirs();
	    	}
			branchManage=new LccModuleBranchManage();
		    branchManage.setName(modulename);
		    branchManage.setNote(modulenote);
		    branchManage.setModuledir(path+dirUUID);
		    branchManage.setBranchUUID(topbranchUUID);
		    branchManage.setParentUUID(null);
		    branchManage.setCreatedate(createdate);
		    branchManage.setIscomplete(0);
		    branchManage.setIsupload(0);
		    branchManage.setIsbase(1);
			m=new LccModule();
			Component product=componentService.getComponent(Integer.valueOf(pdid));
			m.setComponent(product);
			m.setName(modulename);
			m.setNote(modulenote);
			m.setModuleUUID(dirUUID);
			m.setCreatedate(new Date());
			m.setParent(null);
			m.setIsparent(1);
			m.setModuledir(path+dirUUID);
			m.setBranchUUID(topbranchUUID);
			m.setVersion(dirUUID);
			int id=moduleService.addModule(m).getId();
			moduleService.saveLccModuleBranch(branchManage);
			dirUUID = UUID.randomUUID().toString();
			branchUUID=UUID.randomUUID().toString();
		    branchManage=new LccModuleBranchManage();
		    branchManage.setName("基础分支");
		    branchManage.setNote("基础分支");
		    branchManage.setModuledir(m.getModuledir()+"\\"+dirUUID);
		    branchManage.setBranchUUID(branchUUID);
		    branchManage.setParentUUID(topbranchUUID);
		    branchManage.setCreatedate(createdate);
		    branchManage.setIscomplete(0);
		    branchManage.setIsupload(0);
		    branchManage.setIsbase(1);
			moduleService.saveLccModuleBranch(branchManage);
			
		}else{
			needassign=0;
			m=(LccModule)moduleService.getModule(superparentmoduleid);
			branchUUID=this.getBranchUUID();
			branchManage=moduleService.getLccBranchByUUID(branchUUID);
			
		}
		LccModule supermodule =m;
		String parentuuid=supermodule.getModuleUUID();
		    List<HashMap> componentslist =getJSONvalue();
		    for (int c=0;c<componentslist.size();c++){
		    	HashMap h=componentslist.get(c);
		    	HashMap comp=(HashMap)h.get("component");
		    	m=new LccModule();
				m.setName(comp.get("name").toString());
				dirUUID = UUID.randomUUID().toString();
				moduledir=new File(branchManage.getModuledir()+"\\"+dirUUID);
				if(!moduledir.exists()){
					moduledir.mkdirs();
				}
				String stagexmlFileName=branchManage.getModuledir()+"\\"+dirUUID+"\\"+"level__stage"+".xml";
				saveXml(stagexmlFileName);
				m.setNote(null);
				m.setCreatedate(new Date());
				m.setBranchUUID(branchUUID);
				m.setModuleUUID(dirUUID);
				m.setModuledir(branchManage.getModuledir()+"\\"+dirUUID);
				m.setXmlFileName("level__stage"+".xml");
				m.setVersion(dirUUID);
				m.setLevelid("level_stage");
				m.setParentlevelid("0");
				m.setProcessid("0");
				m.setIsparent(0);
				m.setParent(supermodule);
				Component component=new Component();
				component.setId(Integer.valueOf(comp.get("id").toString()));
				m.setComponent(component);
				moduleService.addModule(m);
			    List<HashMap> stages=(List)h.get("stages");
			    for(int j=0;j<stages.size();j++){
				   HashMap h2=stages.get(j);
				   String processid=h2.get("id").toString();
				   String stagename=h2.get("name").toString();
				   String stagenote=h2.get("stage").toString();
				   LccProcessTemplate stagept=new LccProcessTemplate();
				   stagept.setProcessid(processid);
				   stagept.setName(stagename);
				   stagept.setNote(stagenote);
				   stagept.setModule(m);
				   moduleService.addProcess(stagept);
				   LccTask t=new LccTask();
				   t.setProcessTemplate(null);
				   long carrierid=Long.valueOf(h2.get("processpersonid").toString());
				   Employee carrier=new Employee();
				   carrier.setId(carrierid);
				   t.setCarrier(carrier);
				   t.setProcessid(processid);
				   t.setLccModule(m);
				   t.setName(comp.get("name").toString()+stagename+"阶段建模");
				   t.setStatus(Constants.TASK_STATUS_TO_BE_ACTIVE);
				   taskService.saveLccTask(t);
				 
				   
			   }
				
		    }
		    Map<String, Object> map=new HashMap<String, Object>();
		    map.put("branchUUID", branchUUID);
		    map.put("supermoduleid", supermodule.getId());
		    map.put("needassign", needassign);
		    ObjectMapper objectMapper = new ObjectMapper();	
		    objectMapper.writeValue(response.getWriter(), map);
		return null;
	}
	
	/**
	 * 
	 * 协同构建层次模板
	 * @return
	 * @throws Exception
	 */
	public String addlevelmodule() throws Exception{
		LccTask t=taskService.getTask(Long.valueOf(taskid));
		LccModule parent=t.getLccModule();
		String branchUUID=parent.getBranchUUID();
		String moduleUUID=UUID.randomUUID().toString();
		LccModule m=new LccModule();
		String parentdir=parent.getModuledir();
		String xmlFileName=parentdir+"//"+levelid+".xml";
		saveXml(xmlFileName);
		m.setName(t.getName());
		m.setCreatedate(new Date());
		m.setModuleUUID(moduleUUID);
		m.setBranchUUID(branchUUID);
		m.setModuledir(parentdir);
		m.setXmlFileName(levelid+".xml");
		m.setComponent(parent.getComponent());
		m.setParent(parent);
		m.setLevelid(levelid);
		m.setParentlevelid(parentlevelid);
		m.setIsparent(0);
		m.setVersion(parent.getVersion());
		if(parentcellid!=null){
			m.setProcessid(parentcellid);
		}else{
			m.setProcessid(t.getProcessid());
		}
		Lccdatasetlist ldl;
		String datasetUUID;
		if(Integer.valueOf(datasetisassigned)==0){
			
			ldl=new Lccdatasetlist();
			datasetUUID = UUID.randomUUID().toString();
			ldl.setUUID(datasetUUID);
			ldl.setDatasetcuracy("0");
			ldl.setIsbase(1);
	        ldl.setModuleid(parent.getId());
	        ldl.setDatasetname(parent.getName()+"_"+parent.getModuleUUID());
	        ldl.setBranchUUID(branchUUID);
	        datasetService.saveLccdatasetlist(ldl);
			
		}else{
			
			ldl=datasetService.getLccdataSetListByUUID(this.getDatasetUUID());
			datasetUUID=this.getDatasetUUID();
			
		}
		
		List<HashMap> processlist =getJSONvalue();
		Set<LccProcessTemplate> processTemplates=new HashSet<LccProcessTemplate>();
		 int n=processlist.size();
		 System.out.println("大小"+n);
		   for(int i=0;i<n;i++){
			   LccProcessTemplate p=new LccProcessTemplate();
			   String processUUID=UUID.randomUUID().toString();
			   HashMap h=processlist.get(i);
			   String processid=String.valueOf(h.get("id"));
			   p.setProcessid(processid);
			   p.setProcessUUID(processUUID);
			   p.setName(String.valueOf(h.get("processname")));
			   p.setNote(String.valueOf(h.get("processnote")));
			   List<Lccdatasetdetail> list=new ArrayList<Lccdatasetdetail>();
			   List<HashMap> inputmateriallist=(List)h.get("inputmaterial");
			   List<HashMap> outputmateriallist=(List)h.get("outputmaterial");
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
					   ld.setModulename(m.getName());
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
					   ld.setModulename(parent.getName());
					   ld.setProcessname(p.getName());
					   ld.setUnit(h2.get("materialunit").toString());
					   String uuid = UUID.randomUUID().toString();
					   ld.setUUID(uuid);
					   ld.setValue(Double.valueOf(h2.get("materialvalue").toString()));
					   list.add(ld);
				   }
			   }
			
			   datasetService.saveLccdatasetdetaillist(list);
			   processTemplates.add(p);
		   }
		   m.setLccprocessTemplates(processTemplates);
		   moduleService.addModuleandprocess(m);
		   if(Integer.valueOf(datasetisassigned)==0){
			   Map<String, Object> map=new HashMap<String, Object>();
			   map.put("datasetUUID", datasetUUID);
			   ObjectMapper objectMapper = new ObjectMapper();	
			   objectMapper.writeValue(response.getWriter(), map);
		   }
		   return null;
	}
	
	/**
	 * 
	 * 保存模板文件
	 * @param xmlFileName
	 * @return
	 * @throws Exception
	 */
	public String saveXml( String xmlFileName) throws Exception{
		byte[] xmldatas =xmldata.getBytes("UTF-8");
		File xmlData = new File(xmlFileName);
		FileOutputStream outputStream = new FileOutputStream(xmlData);
		outputStream.write(xmldatas);
	    return null;
  }
	
	/**
	 * 
	 * 获取分支信息
	 * @return
	 */
	public String getbranchUUIDbybranchid(){
		LccModuleBranchManage l=moduleService.getLccbranchUUIDbybranchid(id);
	    Map<String, Object> rootMap = new HashMap<String, Object>();
	    rootMap.put("id", l.getId());
	    rootMap.put("name", l.getName());
	    rootMap.put("createdate", l.getCreatedate());
	    rootMap.put("createruserid", l.getCreateuserid());
	    rootMap.put("note", l.getNote());
	    rootMap.put("branchUUID", l.getBranchUUID());
	    rootMap.put("parentUUID", l.getParentUUID());
	    ObjectMapper objectMapper = new ObjectMapper();	
	    try {
			objectMapper.writeValue(response.getWriter(), rootMap);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	
	
	/**
	 * 
	 * 根据父模板获得模版分支
	 * @return
	 */
	public String getModuleBranchByParent(){
		LccModule lcc=moduleService.getLccModuleByUUID(superparentmoduleid);
		List<LccModuleBranchManage> list=moduleService.getLccModuleBranchByParent(lcc.getBranchUUID());
		int size=list.size();
		System.out.println(list.size());
		ObjectMapper objectMapper = new ObjectMapper();	
		List<Map<String, Object>> llist = new ArrayList<Map<String, Object>>();
		for(int i=0;i<size;i++){
			LccModuleBranchManage l=(LccModuleBranchManage)list.get(i);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", l.getId());
 		    rootMap.put("name", l.getName());
 		    rootMap.put("createdate", l.getCreatedate());
 		    rootMap.put("createruserid", l.getCreateuserid());
 		    rootMap.put("note", l.getNote());
 		    rootMap.put("branchUUID", l.getBranchUUID());
 		    rootMap.put("parentUUID", l.getParentUUID());
 		    
			llist.add(rootMap);		
			
		}
		try {
			objectMapper.writeValue(response.getWriter(), llist);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	
	
	/**
	 * 根据产品id获取模板树
	 * @return
	 * @throws IOException
	 */
	public String getModuletree() throws IOException{
		List mlist =null;
		if("0".equals(componentid) || "null".equals(componentid) || componentid == null){
		mlist=moduleService.getLccModuleComponentlist();
		List<Map<String, Object>> mtlist = new ArrayList<Map<String, Object>>();
		ObjectMapper objectMapper = new ObjectMapper();	
		 if (!(mlist==null)){
		for(int i=0;i<mlist.size();i++){
			Component c=(Component)mlist.get(i);
		    Map<String, Object> rootMap = new HashMap<String, Object>();
		    rootMap.put("id", c.getId());
 		    rootMap.put("name", c.getName());
 		    rootMap.put("expanded", false);
 		    rootMap.put("__viewicon", true);
			mtlist.add(rootMap);		
			
		}
		objectMapper.writeValue(response.getWriter(), mtlist);
		}
		return null;
		}else{
			mlist=moduleService.getLccmodulelistsbycomponnet(componentid);
			List<Map<String, Object>> childlist = new ArrayList<Map<String, Object>>();
			for(int i=0;i<mlist.size();i++){
				LccModule m=(LccModule)mlist.get(i);
			    Map<String, Object> childmap = new HashMap<String, Object>();
			    childmap.put("id", m.getId());
			    childmap.put("uuid", m.getModuleUUID());
			    childmap.put("name", m.getName());
			    childmap.put("createuserid", m.getCreateuserid());
			    childmap.put("Createdate", m.getCreatedate().toString());
			    childmap.put("Version", m.getVersion());
			    childmap.put("componentid",componentid);
			    childmap.put("Note",m.getNote());
			    childlist.add(childmap);		
			}
		JSONWriter writer = new JSONWriter();
        String ktypestring=writer.write(childlist);
        response.getWriter().println(ktypestring);
		return null;
		}
	}
	
	/**
	 * 
	 * 获取数组类型json对象
	 * @return
	 */
	public List<HashMap> getJSONvalue()
	{
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
	
	/**
	 * 获取物质消耗(原材料，能源以及人员等)json数组对象
	 * @return
	 */
	public List<HashMap> getConsumeMaterialdataJSONvalue()
	{
		List<HashMap> datas ;
		try{
			datas =  (List)JSONUtil.read(consumematerialdata);}
		catch(Exception e ){
			System.out.println("jason解析错误");
			e.printStackTrace();
			return null;
		}
		return datas;
	}

	public List<HashMap> getcomponentsJSONvalue()
	{
		List<HashMap> datas ;
		try{
			datas =  (List)JSONUtil.read(components);}
		catch(Exception e ){
			System.out.println("jason解析错误");
			e.printStackTrace();
			return null;
		}
		return datas;
	}

	
	public void getsubmodule() throws IOException{
		System.out.println(parentmoduleid);
		LccModule parent=(LccModule)moduleService.getModule(parentmoduleid);
		String parentlevelid=parent.getLevelid();
		System.out.println(parentlevelid);
		LccModule m=(LccModule)moduleService.getLccModulebyparentandprocess(parentlevelid,processid,superparentmoduleid);
		if(m==null){
		}else{
			response.getWriter().println(m.getId());
		}
	}
	
	
	/**
	 * 根据模板id读取模板文件
	 * @throws IOException
	 */
	public void downloadXML() throws IOException {
		LccModule m=(LccModule)moduleService.getModule(moduleid);
		String filename = m.getModuledir()
				+ File.separator + m.getXmlFileName();
		File file = new File(filename);
		response.reset();
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");

		response.setDateHeader("Expires", 0);
		response.setContentType("application/x-msdownload;charset=UTF-8");
		response.setHeader("Content-disposition", "attachment;filename=\""
				+ new String(filename.getBytes(), "ISO_8859_1") + "\"");
		response.setContentLength((int) file.length());

		BufferedInputStream bis = new BufferedInputStream(new FileInputStream(
				file));
		BufferedOutputStream bos = new BufferedOutputStream(
				response.getOutputStream());

		Streams.copy(bis, bos, true);
	}

	
	public Material getModel() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setServletResponse(HttpServletResponse response) {
		// TODO Auto-generated method stub
		this.response = response;
	}

	public String getModulename() {
		return modulename;
	}
	public void setModulename(String modulename) {
		this.modulename = modulename;
	}
	public String getModulenote() {
		return modulenote;
	}
	public void setModulenote(String modulenote) {
		this.modulenote = modulenote;
	}
	public String getCellcollection() {
		return cellcollection;
	}
	public void setCellcollection(String cellcollection) {
		this.cellcollection = cellcollection;
	}
	public String getModuletype() {
		return moduletype;
	}
	public void setModuletype(String moduletype) {
		this.moduletype = moduletype;
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
	public ComponentService getComponentService() {
		return componentService;
	}

	public void setComponentService(ComponentService componentService) {
		this.componentService = componentService;
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

	public String getParentId() {
		return parentId;
	}

	public String getPdid() {
		return pdid;
	}
	public void setPdid(String pdid) {
		this.pdid = pdid;
	}
	public String getPdname() {
		return pdname;
	}
	public void setPdname(String pdname) {
		this.pdname = pdname;
	}
	public ModuleService getModuleService() {
		return moduleService;
	}
	public void setModuleService(ModuleService moduleService) {
		this.moduleService = moduleService;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getMdname() {
		return mdname;
	}
	public void setMdname(String mdname) {
		this.mdname = mdname;
	}
	public String getNodename() {
		return nodename;
	}
	public void setNodename(String nodename) {
		this.nodename = nodename;
	}
	public String getMdnote() {
		return mdnote;
	}
	public void setMdnote(String mdnote) {
		this.mdnote = mdnote;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getcId() {
		return cId;
	}

	public void setcId(String cId) {
		this.cId = cId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public String getProjectid() {
		return projectid;
	}
	public void setProjectid(String projectid) {
		this.projectid = projectid;
	}
	public String getProcessid() {
		return processid;
	}
	public void setProcessid(String processid) {
		this.processid = processid;
	}
	public String getProcessname() {
		return processname;
	}
	public void setProcessname(String processname) {
		this.processname = processname;
	}
	public String getXmldata() {
		return xmldata;
	}
	public void setXmldata(String xmldata) {
		this.xmldata = xmldata;
	}
	public void setServletRequest(HttpServletRequest arg0) {
		this.request = arg0;

	}
	public String getNodetype() {
		return nodetype;
	}
	public void setNodetype(String nodetype) {
		this.nodetype = nodetype;
	}
	public String getNodecategory() {
		return nodecategory;
	}
	public void setNodecategory(String nodecategory) {
		this.nodecategory = nodecategory;
	}
	public String getModuleid() {
		return moduleid;
	}
	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}
	public List<File> getFile() {
		return file;
	}
	public void setFile(List<File> file) {
		this.file = file;
	}
	public List<String> getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(List<String> fileFileName) {
		this.fileFileName = fileFileName;
	}
	public String getComponents() {
		return components;
	}
	public void setComponents(String components) {
		this.components = components;
	}
	public TaskService getTaskService() {
		return taskService;
	}
	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}
	public String getTaskid() {
		return taskid;
	}
	public void setTaskid(String taskid) {
		this.taskid = taskid;
	}
	public String getLevelid() {
		return levelid;
	}
	public void setLevelid(String levelid) {
		this.levelid = levelid;
	}
	public String getParentlevelid() {
		return parentlevelid;
	}
	public void setParentlevelid(String parentlevelid) {
		this.parentlevelid = parentlevelid;
	}
	public String getParentcellid() {
		return parentcellid;
	}
	public void setParentcellid(String parentcellid) {
		this.parentcellid = parentcellid;
	}
	public String getParentmoduleid() {
		return parentmoduleid;
	}
	public void setParentmoduleid(String parentmoduleid) {
		this.parentmoduleid = parentmoduleid;
	}
	
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getConsumematerialdata() {
		return consumematerialdata;
	}
	public void setConsumematerialdata(String consumematerialdata) {
		this.consumematerialdata = consumematerialdata;
	}
	public String getMaterial() {
		return material;
	}
	public void setMaterial(String material) {
		this.material = material;
	}
	public String getSuperparentmoduleid() {
		return superparentmoduleid;
	}
	public void setSuperparentmoduleid(String superparentmoduleid) {
		this.superparentmoduleid = superparentmoduleid;
	}
	public String getCategoryid() {
		return categoryid;
	}
	public void setCategoryid(String categoryid) {
		this.categoryid = categoryid;
	}
	
	public String getEvaluationmethods() {
		return evaluationmethods;
	}
	public void setEvaluationmethods(String evaluationmethods) {
		this.evaluationmethods = evaluationmethods;
	}
	public String getMethodid() {
		return methodid;
	}
	public void setMethodid(String methodid) {
		this.methodid = methodid;
	}
	public String getEffecindex() {
		return effecindex;
	}
	public void setEffecindex(String effecindex) {
		this.effecindex = effecindex;
	}
	public String getEffectmaterialdata() {
		return effectmaterialdata;
	}
	public String getEvaluationindexid() {
		return evaluationindexid;
	}
	public void setEvaluationindexid(String evaluationindexid) {
		this.evaluationindexid = evaluationindexid;
	}
	public void setEffectmaterialdata(String effectmaterialdata) {
		this.effectmaterialdata = effectmaterialdata;
	}
	public String getBuildtype() {
		return buildtype;
	}
	public void setBuildtype(String buildtype) {
		this.buildtype = buildtype;
	}
	public String getBranchUUID() {
		return branchUUID;
	}
	public void setBranchUUID(String branchUUID) {
		this.branchUUID = branchUUID;
	}
	public String getSuperisassigned() {
		return superisassigned;
	}
	public void setSuperisassigned(String superisassigned) {
		this.superisassigned = superisassigned;
	}
	public String getDatasetUUID() {
		return datasetUUID;
	}
	public void setDatasetUUID(String datasetUUID) {
		this.datasetUUID = datasetUUID;
	}
	public String getOldbranchUUID() {
		return oldbranchUUID;
	}
	public void setOldbranchUUID(String oldbranchUUID) {
		this.oldbranchUUID = oldbranchUUID;
	}
	public String getOldsupermoduleid() {
		return oldsupermoduleid;
	}
	public void setOldsupermoduleid(String oldsupermoduleid) {
		this.oldsupermoduleid = oldsupermoduleid;
	}
	
	public String getAlldata() {
		return alldata;
	}
	public void setAlldata(String alldata) {
		this.alldata = alldata;
	}
	public String getDatasetisassigned() {
		return datasetisassigned;
	}
	public void setDatasetisassigned(String datasetisassigned) {
		this.datasetisassigned = datasetisassigned;
	}
	
	
	public String getComponentid() {
		return componentid;
	}
	public void setComponentid(String componentid) {
		this.componentid = componentid;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
}
