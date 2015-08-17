package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import javax.annotation.Resource;

import oracle.sql.DatumWithConnection;

import org.apache.commons.digester.annotations.handlers.SetPropertiesLoaderHandler;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcadatasetdetail;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcadatasetlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciafactor;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciamethod;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcamaterialdatasetlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcamateriallcialist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lccdatasetdetail;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lccdatasetlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjmaterialcategory;

@Service
@Transactional
public class DatasetServiceImpl implements DatasetService {
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	public List<Lcadatasetlist> getAlldatasetlists() {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from Lcadatasetlist m").list();
	}
//	public List<Lcadatasetlist> getDatasetList(String moduleid) {
//		// TODO Auto-generated method stub
//		return sessionFactory.getCurrentSession().createQuery("from Lcadatasetlist b where b.moduleid.id=?").setParameter(0, Integer.valueOf(moduleid)).list();
//	}
	public List<Lcadatasetdetail> getAllLcadatasetdetails() {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from Lcadatasetdetail m").list();
	}
	public List<Lcadatasetdetail> getDaLcadatasetdetails(String datasetid) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from Lcadatasetdetail b where b.lcadatasetlist.id=?").setParameter(0, Integer.valueOf(datasetid)).list();
	}
	public void update(Lcadatasetlist lcadatasetlist) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().update(lcadatasetlist);
	}
	public void update(Lcadatasetdetail lcadatasetdetail) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().update(lcadatasetdetail);
	}
	public void saveLcadatasetdetaillist(List<Lcadatasetdetail> list) {
		// TODO Auto-generated method stub
		for(Lcadatasetdetail l:list){
			sessionFactory.getCurrentSession().saveOrUpdate(l);
		}
	}
	public void saveLcadatasetlist(Lcadatasetlist l) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().saveOrUpdate(l);
		
	}
	public void saveLccdatasetlist(Lccdatasetlist l) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().saveOrUpdate(l);
		
	}
	public List<Lcadatasetdetail> getLcadatasetdetailsbyModuleAndProcess(
			String moduleid, String processUUid,String datasetUUID) {

		// TODO Auto-generated method stub
		System.out.println(moduleid+processUUid+datasetUUID);
		if(datasetUUID==null){
			return sessionFactory.getCurrentSession().createQuery("select ld from Lcadatasetdetail ld, Lcadatasetlist ldl where ld.processUUID=? and ldl.moduleid=? and ld.lcadatasetlist.id=ldl.id and ldl.isbase=1").setParameter(0, processUUid).setParameter(1, Integer.valueOf(moduleid)).list();
		}else{
			return sessionFactory.getCurrentSession().createQuery("select ld from Lcadatasetdetail ld, Lcadatasetlist ldl where ld.processUUID=? and ldl.moduleid=? and ld.lcadatasetlist.id=ldl.id and ldl.UUID=?").setParameter(0, processUUid).setParameter(1, Integer.valueOf(moduleid)).setParameter(2, datasetUUID).list();
		} 

	}

	public List<Lcadatasetlist> getdatasetlistBymoduleAndbranch(String branchUUID,
			String moduleid) {
		return sessionFactory.getCurrentSession().createQuery("from Lcadatasetlist ldl where ldl.moduleid=? and ldl.branchUUID=?").setParameter(0, Integer.valueOf(moduleid)).setParameter(1, branchUUID).list();
				
	}

	public List<Lcamaterialdatasetlist> getLcamaterialdatasetlists(
			String materialid) {
		return sessionFactory.getCurrentSession().createQuery("from Lcamaterialdatasetlist b where b.wjbasematerial.id=?").setParameter(0, Integer.valueOf(materialid)).list();
	}
	public List<Lcamateriallcialist> getLcamateriallcialists(String materialid,
			String lciamethodid) {
		return sessionFactory.getCurrentSession().createQuery("select ld from Lcamateriallcialist ld where ld.wjbasematerial.id=? and ld.lcalciamethodlist.id=?").setParameter(0, Integer.valueOf(materialid)).setParameter(1, Integer.valueOf(lciamethodid)).list();
	}
	public void save(Lcamaterialdatasetlist lcamaterialdatasetlist) {
		sessionFactory.getCurrentSession().saveOrUpdate(lcamaterialdatasetlist);
	}
	public void save(Lcamateriallcialist lcamateriallcialist) {
		sessionFactory.getCurrentSession().saveOrUpdate(lcamateriallcialist);
		
	}
	public Lcadatasetlist getdataSetListByUUID(String datasetUUID) {
		// TODO Auto-generated method stub
		List<Lcadatasetlist> list=sessionFactory.getCurrentSession().createQuery("from Lcadatasetlist ldl where ldl.UUID=?").setParameter(0, datasetUUID).list();
		if(list.size()>0){
			return list.get(0);
		}else{
			return null;
		}
		
	}
	public Lccdatasetlist getLccdataSetListByUUID(String datasetUUID) {
		// TODO Auto-generated method stub
		List<Lccdatasetlist> list=sessionFactory.getCurrentSession().createQuery("from Lccdatasetlist ldl where ldl.UUID=?").setParameter(0, datasetUUID).list();
		if(list.size()>0){
			return list.get(0);
		}else{
			return null;
		}
		
	}
	public Lcadatasetlist getLcadatasetlistByModuleid(String moduleid) {
        List<Lcadatasetlist> lcadatasetlist=sessionFactory.getCurrentSession().createQuery("from Lcadatasetlist ldl where ldl.moduleid=? and ldl.isbase=1").setParameter(0, Integer.valueOf(moduleid)).list();
        if(lcadatasetlist.size()>0){
        	return (Lcadatasetlist)lcadatasetlist.get(0);
        }
        return null;
	}
	public List<Lcadatasetdetail> getDaLcadatasetdetailsByProcess(
			int datasetid, String processUUID) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from Lcadatasetdetail ld where ld.lcadatasetlist.id=? and ld.processUUID=?").setParameter(0, datasetid).setParameter(1,processUUID).list();
	}
	/* (non-Javadoc)
	 * @see edu.zju.cims201.GOF.service.zwjservice.DatasetService#saveLccdatasetdetaillist(java.util.List)
	 */
	public void saveLccdatasetdetaillist(List<Lccdatasetdetail> list) {
		// TODO Auto-generated method stub
		for(Lccdatasetdetail l:list){
			sessionFactory.getCurrentSession().saveOrUpdate(l);
		}
	}
	/* (non-Javadoc)
	 * @see edu.zju.cims201.GOF.service.zwjservice.DatasetService#getlccdatasetlistBymoduleAndbranch(java.lang.String, java.lang.String)
	 */
	public List<Lccdatasetlist> getlccdatasetlistBymoduleAndbranch(
			String branchUUID, String moduleid) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from Lccdatasetlist ldl where ldl.moduleid=? and ldl.branchUUID=?").setParameter(0, Integer.valueOf(moduleid)).setParameter(1, branchUUID).list();
	}
	public List<Lcadatasetdetail> getbydatasetidandprocessuuid(int datasetid,
			String processUUID) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("select ld from Lcadatasetdetail ld where ld.processUUID=? and ld.lcadatasetlist.id=?").setParameter(0, processUUID).setParameter(1,datasetid).list();
	}

	public List<Lccdatasetdetail> getLccdatasetdetailsbyModuleAndProcess(
			String moduleid, String processUUid,String datasetUUID) {

		if(datasetUUID==null){
			return sessionFactory.getCurrentSession().createQuery("select ld from Lccdatasetdetail ld, Lccdatasetlist ldl where ld.processUUID=? and ldl.moduleid=? and ld.lccdatasetlist.id=ldl.id and ldl.isbase=1").setParameter(0, processUUid).setParameter(1, Integer.valueOf(moduleid)).list();
		}else{
			return sessionFactory.getCurrentSession().createQuery("select ld from Lccdatasetdetail ld, Lccdatasetlist ldl where ld.processUUID=? and ldl.moduleid=? and ld.lccdatasetlist.id=ldl.id and ldl.UUID=?").setParameter(0, processUUid).setParameter(1, Integer.valueOf(moduleid)).setParameter(2, datasetUUID).list();
		} 

	}

	
	
	
}
