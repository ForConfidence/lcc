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
import org.stringtree.json.JSONWriter;

import edu.zju.cims201.GOF.hibernate.pojo.Component;
import edu.zju.cims201.GOF.hibernate.pojo.Material;
import edu.zju.cims201.GOF.hibernate.zwjpojo.GongYi1;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Gongyi;
import edu.zju.cims201.GOF.hibernate.zwjpojo.JICHU;
import edu.zju.cims201.GOF.hibernate.zwjpojo.JICHU1;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Jiegou;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcadatasetdetail;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcadatasetlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciafactor;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciamethod;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjmaterialcategory;
import edu.zju.cims201.GOF.service.zwjservice.BomService;
import edu.zju.cims201.GOF.service.zwjservice.DatasetService;
import edu.zju.cims201.GOF.service.zwjservice.LcalciamethodService;
import edu.zju.cims201.GOF.web.CrudActionSupport;

@Namespace("/zwjaction")
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "goalDefinition.action", type = "redirect")
		 })
public class BomAction extends CrudActionSupport<Material> implements ServletResponseAware, ServletRequestAware {
	@Resource(name="bomServiceImpl")
	private BomService bomService;
	
	public BomService getBomService() {
		return bomService;
	}

	public void setBomService(BomService bomService) {
		this.bomService = bomService;
	}

	private HttpServletRequest request;
	private HttpServletResponse response;
	
	private Integer id;
	private String WH;
	private String CC1;
	private String CC2;
	private String MC;
	private String XC;
	private String CP;
	private String GD;
	private String DM;
	private String ZLH;
	private String GY;
	private String ZQ;
	private String CZYH;
	private Integer PARENTID;
	private Integer GRADE;
	private String SWH;
	private Integer pid;
	
	private String wh;
	private String gxh;
	private String gxm;
	private String gxmc;
	private String zbgs;
	private String degs;
	private String gsqf;
	private String js;
	private String sbm;
	private String gxbz;
	
	
	
	
	//private String swhstart="61000667000";
	//action开始
    public void start(){
    	
    	doBom("61000667000",1);
    }
	public void doBom(String swhstart,Integer gradenumber) {
		Integer iid;
		if((bomService.getJichu(swhstart))!=null) {
			iid = bomService.getJichu(swhstart).getId();
		}else {
			iid = 0;
		}
		List<Jiegou> jiegous = bomService.getJiegous(swhstart);
		if(jiegous.size()>0){
			for (int i = 0; i < jiegous.size(); i++) {
				Jiegou jg = jiegous.get(i);
				System.out.println(jg.getId().getSwh());
				String jgxwh = jg.getId().getXwh();
				System.out.println(jgxwh);
				if((bomService.getJichu(jgxwh))!=null){
					JICHU jc = bomService.getJichu(jg.getId().getXwh());
//					jc.setPARENTID(iid);
//					jc.setGRADE(gradenumber);
					JICHU1 jc1 = new JICHU1();
					jc1.setPid(jc.getId());
					jc1.setCC1(jc.getCC1());
					jc1.setCC2(jc.getCC2());
					jc1.setCP(jc.getCP());
					jc1.setCZYH(jc.getCZYH());
					jc1.setDM(jc.getDM());
					jc1.setGD(jc.getGD());
					jc1.setGRADE(gradenumber);
					jc1.setGY(jc.getGY());
					jc1.setMC(jc.getMC());
					jc1.setPARENTID(iid);
					jc1.setWH(jc.getWH());
					jc1.setXC(jc.getXC());
					jc1.setZLH(jc.getZLH());
					jc1.setZQ(jc.getZQ());
					bomService.saveJichu1(jc1);
					swhstart = jc1.getWH();
					doBom(swhstart,gradenumber+1);
				}else{
					JICHU1 jc1 = new JICHU1();
					jc1.setWH(jg.getId().getXwh());
					jc1.setCC1("为空！");
					jc1.setId(iid);
					bomService.saveJichu1(jc1);
					swhstart = jc1.getWH();
					doBom(swhstart,gradenumber+1);
				}
				
			}
		}
	}
	
	public void doGongyi() {
		List<JICHU1> Jichu1s = bomService.getAllJichu1s();
		for(int i=0 ; i< Jichu1s.size() ; i++) {
			List<Gongyi> gongyis = bomService.getGongyis(Jichu1s.get(i).getWH());
			System.out.println(Jichu1s.get(i).getWH());
			for (int j = 0; j < gongyis.size(); j++) {
				GongYi1 gongYi1 = new GongYi1();
				gongYi1.setDegs(gongyis.get(j).getDegs());
				gongYi1.setGsqf(gongyis.get(j).getDegs());
				gongYi1.setGxbz(gongyis.get(j).getGxbz());
				gongYi1.setGxh(gongyis.get(j).getGxh());
				gongYi1.setGxm(gongyis.get(j).getGxm());
				gongYi1.setGxmc(gongyis.get(j).getGxmc());
				gongYi1.setJs(gongyis.get(j).getJs());
				gongYi1.setSbm(gongyis.get(j).getSbm());
				gongYi1.setWh(gongyis.get(j).getWh());
				gongYi1.setZbgs(gongyis.get(j).getZbgs());
				gongYi1.setWhid(Jichu1s.get(i).getId());
				bomService.saveGongyi1(gongYi1);
				System.out.println(gongYi1.getWh());
			}
		}
	}
	
	public void getBom() throws IOException{
//		response.setCharacterEncoding("utf-8");
//		PrintWriter w=response.getWriter();
//    	List<Map<String, Object>> alllist= new ArrayList<Map<String, Object>>();
//    	List plist=bomService.getJichu1s(229598);
//    	ObjectMapper objectMapper=new ObjectMapper();
//    	
//		if (!(plist==null)){
//		for(int i=0;i<plist.size();i++){
//			JICHU1 m=(JICHU1)plist.get(i);
//		    Map<String, Object> rootMap = new HashMap<String, Object>();
//		    rootMap.put("id", m.getId());
// 		    rootMap.put("WH",m.getWH());
// 		    rootMap.put("CC1", m.getCC1());
// 		    rootMap.put("CC2", m.getCC2());
// 		    rootMap.put("MC", m.getMC());
// 		    rootMap.put("XC", m.getXC());
// 		    rootMap.put("CP", m.getCP());
// 		    rootMap.put("GD", m.getGD());
// 		    rootMap.put("DM", m.getDM());
// 		    rootMap.put("ZLH", m.getZLH());
// 		    rootMap.put("GY", m.getGY());
// 		    rootMap.put("ZQ", m.getZQ());
// 	    	rootMap.put("CZYH", m.getCZYH());
// 		    rootMap.put("PARENTID", m.getPARENTID());
// 		    rootMap.put("GRADE", m.getGRADE());
// 		    rootMap.put("pid", m.getPid());
// 		    
// 		    rootMap.put("children", getCategoryChildren(m));
// 		    alllist.add(rootMap);		
//		}
//		objectMapper.writeValue(w, alllist);
//		}
		
		//动态加载的方法
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
		List clist = null;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> childlist = new ArrayList<Map<String, Object>>();
		ObjectMapper objectMapper = new ObjectMapper();	
		if("0".equals(PARENTID) || "null".equals(PARENTID) || PARENTID == null){
			//System.out.println(PARENTID);
			clist =bomService.getJichu1s(229598);
			for(int i=0;i<clist.size();i++){
				JICHU1 m=(JICHU1)clist.get(i);
			    Map<String, Object> rootMap = new HashMap<String, Object>();
			    rootMap.put("id", m.getId());
	 		    rootMap.put("WH",m.getWH());
	 		    rootMap.put("CC1", m.getCC1());
	 		    rootMap.put("CC2", m.getCC2());
	 		    rootMap.put("MC", m.getMC());
	 		    rootMap.put("XC", m.getXC());
	 		    rootMap.put("CP", m.getCP());
	 		    rootMap.put("GD", m.getGD());
	 		    rootMap.put("DM", m.getDM());
	 		    rootMap.put("ZLH", m.getZLH());
	 		    rootMap.put("GY", m.getGY());
	 		    rootMap.put("ZQ", m.getZQ());
	 	    	rootMap.put("CZYH", m.getCZYH());
	 		    rootMap.put("PARENTID", m.getPARENTID());
	 		    rootMap.put("GRADE", m.getGRADE());
	 		    rootMap.put("pid", m.getPid());
	 		    //js中tree的属性内容
	 		    rootMap.put("expanded", true);
	 		    rootMap.put("__viewicon", true);
	 		    list.add(rootMap);
			}
			objectMapper.writeValue(w, list);
		}else
		{
			System.out.println(PARENTID);
			clist =bomService.getJichu1s(PARENTID);
			System.out.println(clist.size());
		    for(int i=0;i<clist.size();i++){
		    	JICHU1 m=(JICHU1)clist.get(i);
			    Map<String, Object> rootMap = new HashMap<String, Object>();
			    rootMap.put("id", m.getId());
	 		    rootMap.put("WH",m.getWH());
	 		    rootMap.put("CC1", m.getCC1());
	 		    rootMap.put("CC2", m.getCC2());
	 		    rootMap.put("MC", m.getMC());
	 		    rootMap.put("XC", m.getXC());
	 		    rootMap.put("CP", m.getCP());
	 		    rootMap.put("GD", m.getGD());
	 		    rootMap.put("DM", m.getDM());
	 		    rootMap.put("ZLH", m.getZLH());
	 		    rootMap.put("GY", m.getGY());
	 		    rootMap.put("ZQ", m.getZQ());
	 	    	rootMap.put("CZYH", m.getCZYH());
	 		    rootMap.put("PARENTID", m.getPARENTID());
	 		    rootMap.put("GRADE", m.getGRADE());
	 		    rootMap.put("pid", m.getPid());
	 		    //js中tree的属性内容
	 		    rootMap.put("expanded", true);
	 		    rootMap.put("__viewicon", true);
			    childlist.add(rootMap);		
			}
		    objectMapper.writeValue(w, childlist);
		}
	}
	
	private Object getCategoryChildren(JICHU1 m) throws IOException {
		 List mlist =null;
		 List<Map<String, Object>> childcategory = new ArrayList<Map<String, Object>>();
		 mlist= bomService.getJichu1s(m.getPid());
		 if (!(mlist==null)){
		 for(int i=0;i<mlist.size();i++){
			 JICHU1 mc=(JICHU1)mlist.get(i);
			    Map<String, Object> rootMap = new HashMap<String, Object>();
			    rootMap.put("id", mc.getId());
	 		    rootMap.put("WH",mc.getWH());
	 		    rootMap.put("CC1", mc.getCC1());
	 		    rootMap.put("CC2", mc.getCC2());
	 		    rootMap.put("MC", mc.getMC());
	 		    rootMap.put("XC", mc.getXC());
	 		    rootMap.put("CP", mc.getCP());
	 		    rootMap.put("GD", mc.getGD());
	 		    rootMap.put("DM", mc.getDM());
	 		    rootMap.put("ZLH", mc.getZLH());
	 		    rootMap.put("GY", mc.getGY());
	 		    rootMap.put("ZQ", mc.getZQ());
	 	    	rootMap.put("CZYH", mc.getCZYH());
	 		    rootMap.put("PARENTID", mc.getPARENTID());
	 		    rootMap.put("GRADE", mc.getGRADE());
	 		    rootMap.put("pid", mc.getPid());
	 		    rootMap.put("children", getCategoryChildren(mc));
//			    rootMap.put("id", mc.getId());
//	 		    rootMap.put("categoryname",mc.getCategoryname());
//	 		    rootMap.put("englishname", mc.getEnglishname());
//	 		    rootMap.put("categoryintro", mc.getCategoryintro());
//	 		    rootMap.put("children", getCategoryChildren(mc));
	 		    childcategory.add(rootMap);		
			}
		 }
		 return childcategory;
	}
	
	public void getGongyi() throws IOException {
		response.setCharacterEncoding("utf-8");
		PrintWriter w=response.getWriter();
    	List list=new ArrayList();
    	ObjectMapper objectMapper=new ObjectMapper();
    	List<Map<String, Object>> elist = new ArrayList<Map<String, Object>>();
    	list = bomService.getGongYi1s(wh);
		if (!(list==null)){
	    	for(int i=0;i<list.size();i++){
	    		GongYi1 b=(GongYi1)list.get(i);
	    		Map<String, Object> rootMap = new HashMap<String, Object>();
	    		rootMap.put("id", b.getId());
	    	 	rootMap.put("wh",b.getWh());
	    	 	rootMap.put("gxh", b.getGxh());
	    	 	rootMap.put("gxm", b.getGxm());
	    	 	rootMap.put("gxmc", b.getGxmc());
	    		rootMap.put("zbgs",b.getZbgs());
	    		rootMap.put("degs", b.getDegs());
	    	 	rootMap.put("gsqf",b.getGsqf());
	    	 	rootMap.put("js", b.getJs());
	    	 	rootMap.put("sbm", b.getSbm());
	    	 	rootMap.put("gxbz", b.getGxbz());
	    		rootMap.put("whid",b.getWhid());
	    		elist.add(rootMap);		
	    	}
		objectMapper.writeValue(w, elist);
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

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getWH() {
		return WH;
	}

	public void setWH(String wH) {
		WH = wH;
	}

	public String getCC1() {
		return CC1;
	}

	public void setCC1(String cC1) {
		CC1 = cC1;
	}

	public String getCC2() {
		return CC2;
	}

	public void setCC2(String cC2) {
		CC2 = cC2;
	}

	public String getMC() {
		return MC;
	}

	public void setMC(String mC) {
		MC = mC;
	}

	public String getXC() {
		return XC;
	}

	public void setXC(String xC) {
		XC = xC;
	}

	public String getCP() {
		return CP;
	}

	public void setCP(String cP) {
		CP = cP;
	}

	public String getGD() {
		return GD;
	}

	public void setGD(String gD) {
		GD = gD;
	}

	public String getDM() {
		return DM;
	}

	public void setDM(String dM) {
		DM = dM;
	}

	public String getZLH() {
		return ZLH;
	}

	public void setZLH(String zLH) {
		ZLH = zLH;
	}

	public String getGY() {
		return GY;
	}

	public void setGY(String gY) {
		GY = gY;
	}

	public String getZQ() {
		return ZQ;
	}

	public void setZQ(String zQ) {
		ZQ = zQ;
	}

	public String getCZYH() {
		return CZYH;
	}

	public void setCZYH(String cZYH) {
		CZYH = cZYH;
	}

	public Integer getPARENTID() {
		return PARENTID;
	}

	public void setPARENTID(Integer pARENTID) {
		PARENTID = pARENTID;
	}

	public Integer getGRADE() {
		return GRADE;
	}

	public void setGRADE(Integer gRADE) {
		GRADE = gRADE;
	}

	public String getSWH() {
		return SWH;
	}

	public void setSWH(String sWH) {
		SWH = sWH;
	}

	public String getWh() {
		return wh;
	}

	public void setWh(String wh) {
		this.wh = wh;
	}

	public String getGxh() {
		return gxh;
	}

	public void setGxh(String gxh) {
		this.gxh = gxh;
	}

	public String getGxm() {
		return gxm;
	}

	public void setGxm(String gxm) {
		this.gxm = gxm;
	}

	public String getGxmc() {
		return gxmc;
	}

	public void setGxmc(String gxmc) {
		this.gxmc = gxmc;
	}

	public String getZbgs() {
		return zbgs;
	}

	public void setZbgs(String zbgs) {
		this.zbgs = zbgs;
	}

	public String getDegs() {
		return degs;
	}

	public void setDegs(String degs) {
		this.degs = degs;
	}

	public String getGsqf() {
		return gsqf;
	}

	public void setGsqf(String gsqf) {
		this.gsqf = gsqf;
	}

	public String getJs() {
		return js;
	}

	public void setJs(String js) {
		this.js = js;
	}

	public String getSbm() {
		return sbm;
	}

	public void setSbm(String sbm) {
		this.sbm = sbm;
	}

	public String getGxbz() {
		return gxbz;
	}

	public void setGxbz(String gxbz) {
		this.gxbz = gxbz;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	
}
