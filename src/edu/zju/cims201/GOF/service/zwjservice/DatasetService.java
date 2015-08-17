package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcadatasetdetail;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcadatasetlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciafactor;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciamethod;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcamaterialdatasetlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcamateriallcialist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lccdatasetdetail;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lccdatasetlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjmaterialcategory;


public interface DatasetService {
	//获得所有datasetlist
	public List<Lcadatasetlist> getAlldatasetlists();
	//按照moduleid或者processid进行搜索数据集
//	public List<Lcadatasetlist> getDatasetList(String moduleid);
	
	//获得所有datasetdetaillist
	public List<Lcadatasetdetail> getAllLcadatasetdetails();
	public void saveLcadatasetdetaillist(List<Lcadatasetdetail> list);
	public void saveLcadatasetlist(Lcadatasetlist l);
	public void saveLccdatasetlist(Lccdatasetlist l);
	//按照datasetid进行搜索数据详情表
	public List<Lcadatasetdetail> getDaLcadatasetdetails(String datasetid);
	
	public void update(Lcadatasetlist lcadatasetlist);
	public void update(Lcadatasetdetail lcadatasetdetail);
	public List<Lcadatasetdetail> getLcadatasetdetailsbyModuleAndProcess( String moduleid,String processUUid,String datasetUUID);

	public List<Lcadatasetlist> getdatasetlistBymoduleAndbranch(String branchUUID,
			String moduleid);
	
	public List<Lcamaterialdatasetlist> getLcamaterialdatasetlists(String materialid);
	
	public List<Lcamateriallcialist> getLcamateriallcialists(String materialid, String lciamethodid);

	public void save(Lcamaterialdatasetlist lcamaterialdatasetlist);
	public void save(Lcamateriallcialist lcamateriallcialist);

	public Lcadatasetlist getdataSetListByUUID(String datasetUUID);

	public Lcadatasetlist getLcadatasetlistByModuleid(String moduleid);

	public List<Lcadatasetdetail> getDaLcadatasetdetailsByProcess(
			int datasetid, String processUUID);
	public Lccdatasetlist getLccdataSetListByUUID(String datasetUUID);
	/**
	 * @param list
	 */
	public void saveLccdatasetdetaillist(List<Lccdatasetdetail> list);

	/**
	 * @param branchUUID
	 * @param moduleid
	 * @return
	 */
	public List<Lccdatasetlist> getlccdatasetlistBymoduleAndbranch(
			String branchUUID, String moduleid);

	/**
	 * @param parentmoduleid
	 * @param processUUID
	 * @param datasetUUID
	 * @return
	 */
	public List<Lccdatasetdetail> getLccdatasetdetailsbyModuleAndProcess(
			String parentmoduleid, String processUUID, String datasetUUID);
	public List<Lcadatasetdetail> getbydatasetidandprocessuuid(int datasetid, String processUUID);
}
