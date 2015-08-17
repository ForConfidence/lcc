package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Unitcategory;

@Service
@Transactional
public class UnitcategoryServiceImpl implements UnitcategoryService {
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	public List<Unitcategory> getWjmaterialcategoryList(Integer parentid) {
		return sessionFactory.getCurrentSession().createQuery("from Unitcategory m where m.parentid=?").setParameter(0, parentid).list();
	}
}
