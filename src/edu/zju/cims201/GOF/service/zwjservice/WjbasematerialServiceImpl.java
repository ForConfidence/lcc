package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.dao.zwjdao.WjbasematerialDao;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasecategory;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasematerial;


@Service
@Transactional
public class WjbasematerialServiceImpl implements WjbasematerialService {
	
	@Autowired
    private WjbasematerialDao wjbasematerialDao;
	
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	public void save(Wjbasematerial wjbasematerial) {
		sessionFactory.getCurrentSession().saveOrUpdate(wjbasematerial);
	}
	public int saveBasematerial(Wjbasematerial wjbasematerial) {
		sessionFactory.getCurrentSession().save(wjbasematerial);
		return wjbasematerial.getId();
	}
	public void delete(Wjbasematerial wjbasematerial) {
		sessionFactory.getCurrentSession().delete(wjbasematerial);
	}
	public void update(Wjbasematerial wjbasematerial) {
		sessionFactory.getCurrentSession().update(wjbasematerial);
	}
	public Wjbasematerial getWjbasematerial(String id) {
		return (Wjbasematerial)sessionFactory.getCurrentSession().get(Wjbasematerial.class, Integer.valueOf(id));
	}
	public List<Wjbasematerial> getWjbasematerialList(String categoryid) {
		return sessionFactory.getCurrentSession().createQuery("from Wjbasematerial m where m.materialCategory.id=?").setParameter(0, Integer.valueOf(categoryid)).list();
	}
	public List<Wjbasematerial> getAllWjbasematerials() {
		return sessionFactory.getCurrentSession().createQuery("from Wjbasematerial").list();
	}
	public Page<Wjbasematerial> getBasematerial(String categoryid,
			Page<Wjbasematerial> page) {
		String hql = "select m from Wjbasematerial m where m.materialCategory.id="+Integer.valueOf(categoryid);
			return wjbasematerialDao.findPage(page, hql);
	}
	public WjbasematerialDao getWjbasematerialDao() {
		return wjbasematerialDao;
	}
	public void setWjbasematerialDao(WjbasematerialDao wjbasematerialDao) {
		this.wjbasematerialDao = wjbasematerialDao;
	}
	public List<Wjbasecategory> getAllbasecategory() {
		return sessionFactory.getCurrentSession().createQuery("from Wjbasecategory").list();

	}
	public Wjbasematerial getwWjbasematerial(int id) {
		// TODO Auto-generated method stub
		return (Wjbasematerial)sessionFactory.getCurrentSession().get(Wjbasematerial.class, id);
	}
	
}
