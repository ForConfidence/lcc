package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.zwjdao.CategoryDAO;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Goaldefinition;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasecategory;
//视频-20150420
@Component("categoryService")
//管理事物
@Transactional
public class CategoryServiceImpl implements CategoryService {


	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	private CategoryDAO categoryDAO;
	
	public CategoryDAO getCategoryDAO() {
		return categoryDAO;
	}
	//视频-20150420
	@Resource
	public void setCategoryDAO(CategoryDAO categoryDAO) {
		this.categoryDAO = categoryDAO;
	}

	public void add(Wjbasecategory wjbasecategory) {
		this.categoryDAO.add(wjbasecategory);
	}

	public Wjbasecategory getCategoryById(Integer id) {
		return this.categoryDAO.getCategoryById(id);
	}

	public List getCategory() {
		return this.categoryDAO.getCategory();
		
	}

	public void delete(Integer id) {
		this.categoryDAO.delete(id);
	}

	public void update(Wjbasecategory wjbasecategory) {
		categoryDAO.update(wjbasecategory);
	}
	
}
