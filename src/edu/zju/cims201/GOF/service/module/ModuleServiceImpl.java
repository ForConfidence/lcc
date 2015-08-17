package edu.zju.cims201.GOF.service.module;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.hibernate.pojo.BaseModule;
import edu.zju.cims201.GOF.hibernate.pojo.Component;
import edu.zju.cims201.GOF.hibernate.pojo.LccModule;
import edu.zju.cims201.GOF.hibernate.pojo.ProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccCaculationSolution;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccModuleBranchManage;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.SolutionData;



@Service
@Transactional
public class ModuleServiceImpl implements ModuleService {
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}


	public BaseModule addModule(BaseModule m) {
		 
		sessionFactory.getCurrentSession().saveOrUpdate(m);
		return m;
		
	}

	public ProcessTemplate addProcess(ProcessTemplate process) {
		 
		 sessionFactory.getCurrentSession().save(process);
		 System.out.println(process.getId());
		 return process;
		
	}

	public void deleteprocess(String id) {
		 
		ProcessTemplate p=(ProcessTemplate)sessionFactory.getCurrentSession().get(ProcessTemplate.class, Integer.valueOf(id));
		sessionFactory.getCurrentSession().delete(p);
		sessionFactory.getCurrentSession().flush();
	}

	public List<BaseModule> getModulelist(String parentid,String componentid,String moduletype) {
		if((parentid==null)&&(componentid==null)&&moduletype.equals("PDM")){
		    return sessionFactory.getCurrentSession().createQuery("from PdmModule m").list();
		}else if((parentid==null)&&(componentid==null)&&moduletype.equals("LCA")){
		    return sessionFactory.getCurrentSession().createQuery("from LcaModule m where m.parent.id=?").setParameter(0,Integer.valueOf(parentid)).list();
		}else if(!(parentid==null)&&(componentid==null)){
		    return sessionFactory.getCurrentSession().createQuery("from Module m where m.parent.id=?").setParameter(0,Integer.valueOf(parentid)).list();
		}else if((parentid==null)&&!(componentid==null)){
			return sessionFactory.getCurrentSession().createQuery("from Module m where m.parent= null and m.component.id=?").setParameter(0,Long.valueOf(componentid)).list();
			}else{
			return sessionFactory.getCurrentSession().createQuery("from Module m where m.parent= null ").list();
			}
	}
	public List<Component> getLcaModuleComponentlist() {
		 
		    return sessionFactory.getCurrentSession().createQuery("select distinct m.component from LcaModule m where m.parent=null").list();
		}

	public ProcessTemplate getprocess(String processid, Integer moduleid) {
		 
		 return (ProcessTemplate)sessionFactory.getCurrentSession().createQuery("from ProcessTemplate p where p.processid=?and p.module.id=?").setParameter(0,processid).setParameter(1,moduleid).list().get(0);
	}


	public BaseModule getModule(String id) {
		 
		Object object=sessionFactory.getCurrentSession().createQuery("from BaseModule m where m.id = ?").setParameter(0, Integer.valueOf(id)).list().get(0);
		if (object instanceof LccModule) {
			LccModule a = (LccModule) object;
			return a;
			
		}else{
	    	return (BaseModule)object;
	    	
	    	}
	    }


	public void addModuleandprocess(BaseModule m) {
		 
		sessionFactory.getCurrentSession().save(m);
		
	}

	public void saveprocess(ProcessTemplate m) {
		 
		sessionFactory.getCurrentSession().save(m);
		
	}


	public List getmodulelistsbycomponnet(String id) {
		 
		return sessionFactory.getCurrentSession().createQuery("from LcaModule m where m.component.id=? and m.parent=null").setParameter(0, Long.valueOf(id)).list();
	}
	
	public LccModule getModulebyparentandprocess(String parentlevelid,
			String processid,String parentmoduleid) {
		List list=sessionFactory.getCurrentSession().createQuery("from LccModule m where m.processid=? and m.parentlevelid=? and m.parent.id=?").setParameter(0, processid).setParameter(1, parentlevelid).setParameter(2, Integer.valueOf(parentmoduleid)).list();
		if(list.size()>0){
			return (LccModule)list.get(0);
		}else{
			return null;
		}
		
		
	}


	public List<LccModuleBranchManage> getModuleBranchByParent(
			String parentbranchUUID) {
		 
		List list;
		if(parentbranchUUID==null){
			 list=sessionFactory.getCurrentSession().createQuery("from LccModuleBranchManage l where l.parentUUID is null").list();
		}else{
			 list=sessionFactory.getCurrentSession().createQuery("from LccModuleBranchManage l where l.parentUUID=?").setParameter(0, parentbranchUUID).list();
		}
		
	    return list;
	}
	
	public LccModule getLccModuleByUUID(String superparentmoduleid) {
		 
		List list=sessionFactory.getCurrentSession().createQuery("from BaseModule l where l.moduleUUID=?").setParameter(0, superparentmoduleid).list();
		if(list.size()>0){
			return (LccModule)list.get(0);
		}else{
			return null;
		}
	}

	public List<LccModule> getLccModuleListByBranchUUID(String branchUUID, String moduleid) {
		 
	    return sessionFactory.getCurrentSession().createQuery("from LccModule l where l.parent.id=? and l.branchUUID=?").setParameter(0, Integer.valueOf(moduleid)).setParameter(1, branchUUID).list();
	}

	public LccModuleBranchManage getlccBranchbybranchid(String id) {
		 
		LccModuleBranchManage l=(LccModuleBranchManage)sessionFactory.getCurrentSession().get(LccModuleBranchManage.class, Integer.valueOf(id));
		return l;
	}

	public List<LccModuleBranchManage> getNotUploadNotHasReferenceModulebranch() {
		 
		return sessionFactory.getCurrentSession().createQuery("from LccModuleBranchManage l where l.isupload=0 and l.parentUUID is not null and l.hasreference=0").list();
	}
	public List<LccModuleBranchManage> getNotUploadHasReferenceModulebranch() {
		 
		return sessionFactory.getCurrentSession().createQuery("from LccModuleBranchManage l where l.isupload=0 and l.parentUUID is not null and l.hasreference=1").list();
	}
	
	public LccModule getSuperLccModuleByBranchUUID(String parentUUID) {
		 
		return (LccModule)sessionFactory.getCurrentSession().createQuery("from LccModule l where l.branchUUID=?").setParameter(0, parentUUID).list().get(0);
	}

	public void deletModule(BaseModule m) {
		 
		sessionFactory.getCurrentSession().delete(m);
	}

	public BaseModule getModuleByReferencemoduleUUIDandBranchUUID(
			String moduleUUID, String branchUUID) {
		 
		return (BaseModule)sessionFactory.getCurrentSession().createQuery("from LcaModule l where l.refermoduleUUID=? and l.branchUUID=?").setParameter(0, moduleUUID).setParameter(1, branchUUID).list().get(0);
	}

	public List<LccCaculationSolution> getNotUploadSolution() {
		return sessionFactory.getCurrentSession().createQuery("from LccCaculationSolution l where l.isupload=0").list();
	}

	public List<SolutionData> getSolutionDataBySolution(String soutionUUID) {
		
		return sessionFactory.getCurrentSession().createQuery("from SolutionData d where d.solutionUUID=?").setParameter(0, soutionUUID).list();
	}

	public void saveLccCaculationSolution(LccCaculationSolution solution) {
		sessionFactory.getCurrentSession().saveOrUpdate(solution);
		
	}

	public void saveSolutionData(SolutionData sd) {
		sessionFactory.getCurrentSession().saveOrUpdate(sd);
		
	}


	public void saveLccModuleBranch(LccModuleBranchManage branchManage) {
		sessionFactory.getCurrentSession().saveOrUpdate(branchManage);
		
	}

	public LccModuleBranchManage getLccBranchByUUID(String branchUUID) {
		return (LccModuleBranchManage)sessionFactory.getCurrentSession().createQuery("from LccModuleBranchManage l where l.branchUUID=?").setParameter(0, branchUUID).list().get(0);
	}

	public LccModuleBranchManage getLccbranchUUIDbybranchid(String id) {
		 
		LccModuleBranchManage l=(LccModuleBranchManage)sessionFactory.getCurrentSession().get(LccModuleBranchManage.class, Integer.valueOf(id));
		return l;
	}
	public List<LccModuleBranchManage> getLccModuleBranchByParent(
			String parentbranchUUID) {
		 
		List list;
		if(parentbranchUUID==null){
			 list=sessionFactory.getCurrentSession().createQuery("from LccModuleBranchManage l where l.parentUUID is null").list();
		}else{
			 list=sessionFactory.getCurrentSession().createQuery("from LccModuleBranchManage l where l.parentUUID=?").setParameter(0, parentbranchUUID).list();
		}
		
	    return list;
	}
	public List<Component> getLccModuleComponentlist() {
		 
	    return sessionFactory.getCurrentSession().createQuery("select distinct m.component from LccModule m where m.parent=null").list();
	}
	public List getLccmodulelistsbycomponnet(String id) {
		 
		return sessionFactory.getCurrentSession().createQuery("from LccModule m where m.component.id=? and m.parent=null").setParameter(0, Long.valueOf(id)).list();
	}
	public LccModule getLccModulebyparentandprocess(String parentlevelid,
			String processid,String parentmoduleid) {
		List list=sessionFactory.getCurrentSession().createQuery("from LccModule m where m.processid=? and m.parentlevelid=? and m.parent.id=?").setParameter(0, processid).setParameter(1, parentlevelid).setParameter(2, Integer.valueOf(parentmoduleid)).list();
		if(list.size()>0){
			return (LccModule)list.get(0);
		}else{
			return null;
		}
	}

	public List<LccModule> getLcaModulesbyprocessid(String processid) {
		return sessionFactory.getCurrentSession().createQuery("from LcaModule d where d.levelid like '%level_stage_"+processid+"%'").list();
	}
	public List<LccModule> getLccModulesbyprocessid(String processid) {
		return sessionFactory.getCurrentSession().createQuery("from LccModule d where d.levelid like '%level_stage_"+processid+"%'").list();
	}


}
