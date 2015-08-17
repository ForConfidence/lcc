package edu.zju.cims201.GOF.service.zwjservice;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcacalcusolution;

@Service
@Transactional
public class LcacalcusolutionServiceImpl implements LcacalcusolutionService {
	
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	
	public void save(Lcacalcusolution lcacalcusolution) {
		sessionFactory.getCurrentSession().save(lcacalcusolution);
	}
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

}
