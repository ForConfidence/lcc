package edu.zju.cims201.GOF.service.module;

import java.util.List;

import edu.zju.cims201.GOF.hibernate.pojo.BaseModule;
import edu.zju.cims201.GOF.hibernate.pojo.LccModule;
import edu.zju.cims201.GOF.hibernate.pojo.ProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccCaculationSolution;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccModuleBranchManage;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.SolutionData;


public interface ModuleService {
	public List<BaseModule> getModulelist(String parentid,String componentid,String moduletype);
	public BaseModule addModule(BaseModule m);
	public void saveprocess(ProcessTemplate m);
	public void addModuleandprocess(BaseModule m);
	public  ProcessTemplate getprocess(String processid, Integer moduleid);
	public ProcessTemplate addProcess(ProcessTemplate process);
	public void deleteprocess(String id);
	public BaseModule getModule(String id);
	public List getmodulelistsbycomponnet(String id);
	public LccModule getModulebyparentandprocess(String parentlevelid,
			String processid,String parentmoduleid);
	//保存模板branch
	public void saveLccModuleBranch(LccModuleBranchManage mb);
	public List<LccModuleBranchManage> getModuleBranchByParent(
			String parentbranchUUID);
	public LccModule getLccModuleByUUID(String superparentmoduleid);
	public LccModuleBranchManage getlccBranchbybranchid(String id);
	//test 
	public List<LccModuleBranchManage> getNotUploadNotHasReferenceModulebranch();
	public LccModule getSuperLccModuleByBranchUUID(String parentUUID);
	
	public List<LccModuleBranchManage> getNotUploadHasReferenceModulebranch();
	public void deletModule(BaseModule m);
	public BaseModule getModuleByReferencemoduleUUIDandBranchUUID(
			String moduleUUID, String branchUUID);
	public List<LccCaculationSolution> getNotUploadSolution();
	public List<SolutionData> getSolutionDataBySolution(String soutionUUID);
	public void saveLccCaculationSolution(LccCaculationSolution solution);
	public void saveSolutionData(SolutionData sd);
	/**
	 * @param branchManage
	 */
	public LccModuleBranchManage getLccBranchByUUID(String branchUUID);
	public List<LccModule> getLccModuleListByBranchUUID(String branchUUID, String moduleid);
	public LccModuleBranchManage getLccbranchUUIDbybranchid(String id);
	public List<LccModuleBranchManage> getLccModuleBranchByParent(
			String branchUUID);
	public List getLccModuleComponentlist();
	public List getLccmodulelistsbycomponnet(String id);
	/**
	 * @param parentlevelid
	 * @param processid
	 * @param superparentmoduleid
	 * @return
	 */
	public LccModule getLccModulebyparentandprocess(String parentlevelid,
			String processid, String superparentmoduleid);

	//以processid查询module
	public List<LccModule> getLccModulesbyprocessid(String processid);

}
