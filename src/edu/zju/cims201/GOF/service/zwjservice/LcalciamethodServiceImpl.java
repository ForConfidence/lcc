package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.dao.zwjdao.LciamethodDao;
import edu.zju.cims201.GOF.dao.zwjdao.WjbasematerialDao;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciafactor;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciamethod;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciamethodlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasematerial;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjmaterialcategory;

@Service
@Transactional
public class LcalciamethodServiceImpl implements LcalciamethodService {
	@Autowired
    private LciamethodDao lciamethodDao;
	
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	public List<Lcalciamethod> getAlllciamethod() {
		return sessionFactory.getCurrentSession().createQuery("from Lcalciamethod m").list();
	}
	public List<Lcalciafactor> getLciafactorbylciacategoryid(String lciacategoryid) {
		return sessionFactory.getCurrentSession().createQuery("from Lcalciafactor b where b.lcalciamethod.id=?").setParameter(0, Integer.valueOf(lciacategoryid)).list();
	}
	public LciamethodDao getLciamethodDao() {
		return lciamethodDao;
	}
	public void setLciamethodDao(LciamethodDao lciamethodDao) {
		this.lciamethodDao = lciamethodDao;
	}
	
	public Page<Lcalciafactor> getBasematerial(String lciacategoryid,
			Page<Lcalciafactor> page) {
		String hql = "select b from Lcalciafactor b where b.lcalciamethod.id="+Integer.valueOf(lciacategoryid);
			return lciamethodDao.findPage(page, hql);
	}
	public List<Lcalciafactor> getAllfactors() {
		return sessionFactory.getCurrentSession().createQuery("from Lcalciafactor m").list();
	}
	public void update(Lcalciamethod lcalciamethod) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().update(lcalciamethod);
	}
	public void update(Lcalciafactor lcalciafactor) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().update(lcalciafactor);
	}
	public List<Lcalciamethod> getLcalciamethods(String methodid) {
		return sessionFactory.getCurrentSession().createQuery("from Lcalciamethod b where b.lcalciamethodlist.id=?").setParameter(0, Integer.valueOf(methodid)).list();
	}
//	public Lcalciamethodlist getLcalciamethodlist(String methodname) {
//		return (Lcalciamethodlist)sessionFactory.getCurrentSession().get(Lcalciamethodlist.class, Integer.valueOf(methodname));
//	}
	
}
