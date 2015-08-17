package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.dao.zwjdao.UnitdetailDao;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Unitdetail;


@Service
@Transactional
public class UnitdetailServiceImpl implements UnitdetailService {
	
	@Autowired
    private UnitdetailDao unitdetailDao;
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	public Unitdetail getUnitdetail(String unitname) {
		return (Unitdetail)sessionFactory.getCurrentSession().get(Unitdetail.class, Integer.valueOf(unitname));
	}
	public Page<Unitdetail> getUnitdetail(String unitcategoryid,
			Page<Unitdetail> page) {
		String hql = "select m from Unitdetail m where m.unitcategory.id="+Integer.valueOf(unitcategoryid);
			return unitdetailDao.findPage(page, hql);
	}
	public UnitdetailDao getUnitdetailDao() {
		return unitdetailDao;
	}
	public void setUnitdetailDao(UnitdetailDao unitdetailDao) {
		this.unitdetailDao = unitdetailDao;
	}
	public List<Unitdetail> getUnitdetails() {
		return sessionFactory.getCurrentSession().createQuery("from Unitdetail").list();
	}
	public List<Unitdetail> getUnitdetailList(String unitcategoryid) {
		return sessionFactory.getCurrentSession().createQuery("from Unitdetail m where m.unitcategory.id=?").setParameter(0, Integer.valueOf(unitcategoryid)).list();
	}
	
}
