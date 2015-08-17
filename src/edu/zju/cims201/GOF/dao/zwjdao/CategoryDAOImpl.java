package edu.zju.cims201.GOF.dao.zwjdao;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasecategory;

//视频-20150420
@Component("categoryDao")
public class CategoryDAOImpl implements CategoryDAO {

//	private SessionFactory sessionFactory;
//	//视频-20150420(士兵用的是gethibernatetemplate)
//	@Resource(name="sessionFactory")
//	public void setFactory(SessionFactory sessionFactory) {
//		this.sessionFactory = sessionFactory;
//	}
//	public SessionFactory getFactory() {
//		return sessionFactory;
//	}
	
	private HibernateTemplate hibernateTemplate;

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}
	@Resource
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}

	public void add(Wjbasecategory wjbasecategory) {
		this.getHibernateTemplate().save(wjbasecategory);
		
	}

	public Wjbasecategory getCategoryById(Integer id) {
		return (Wjbasecategory)this.getHibernateTemplate().get(Wjbasecategory.class, id);
	}

	public List getCategory() {
		return (List<Wjbasecategory>)this.getHibernateTemplate().find("from Wjbasecategory");
	}

	public void delete(Integer id) {
		this.getHibernateTemplate().delete(this.getCategoryById(id));
	}

	public void update(Wjbasecategory wjbasecategory) {
		this.getHibernateTemplate().saveOrUpdate(wjbasecategory);
	}

}
