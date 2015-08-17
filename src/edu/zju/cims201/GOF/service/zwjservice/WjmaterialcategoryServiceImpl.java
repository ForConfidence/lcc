package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjmaterialcategory;

@Service
@Transactional
public class WjmaterialcategoryServiceImpl implements WjmaterialcategoryService {
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	//增加
	public void save(Wjmaterialcategory wjmaterialcategory) {
		sessionFactory.getCurrentSession().saveOrUpdate(wjmaterialcategory);
	}
	//删除
	public void delete(Wjmaterialcategory wjmaterialcategory) {
		sessionFactory.getCurrentSession().delete(wjmaterialcategory);
	}
	//更新
	public void update(Wjmaterialcategory wjmaterialcategory) {
		sessionFactory.getCurrentSession().update(wjmaterialcategory);
	}

	public Wjmaterialcategory getWjmaterialcategory(Integer id) {
		return (Wjmaterialcategory)sessionFactory.getCurrentSession().get(Wjmaterialcategory.class, id);
	}
	
	public Wjmaterialcategory getWjmaterialcategory(String id) {
		return (Wjmaterialcategory)sessionFactory.getCurrentSession().get(Wjmaterialcategory.class, Integer.valueOf(id));
	}

	public List<Wjmaterialcategory> getWjmaterialcategoryList(Integer parentid) {
		return sessionFactory.getCurrentSession().createQuery("from Wjmaterialcategory m where m.parentid=?").setParameter(0, parentid).list();
	}

	public List<Wjmaterialcategory> getAllWjmaterialcategories() {
		return sessionFactory.getCurrentSession().createQuery("from Wjmaterialcategory m").list();
	}
	public List<Wjmaterialcategory> getWjmaterialcategoryList(String categoryname) {
		return sessionFactory.getCurrentSession().createQuery("from Wjmaterialcategory m where m.categoryname=?").setParameter(0, categoryname).list();
	}
}
