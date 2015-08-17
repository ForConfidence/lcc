package edu.zju.cims201.GOF.dao.CodeClass;


import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springside.modules.orm.hibernate.HibernateDao;

import edu.zju.cims201.GOF.hibernate.pojo.CodeClass;

@Repository 
public class CodeClassDao extends HibernateDao<CodeClass,Long>{
	

	@Resource(name="sessionFactory")
	public void setSessionFactory(SessionFactory sessionFactory) {
		super.setSessionFactory(sessionFactory);
	}
}
