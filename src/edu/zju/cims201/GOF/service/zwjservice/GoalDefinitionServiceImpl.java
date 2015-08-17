package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Goaldefinition;

@Service
@Transactional
public class GoalDefinitionServiceImpl implements GoalDefinitionService {
	
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	
	public void save(Goaldefinition goaldefinition) {
		sessionFactory.getCurrentSession().save(goaldefinition);
	}
	
	public Goaldefinition getGoaldefinition(Integer id) {
		return (Goaldefinition)sessionFactory.getCurrentSession().get(Goaldefinition.class, id);
	}
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public List<Goaldefinition> getAll() {
		return sessionFactory.getCurrentSession().createQuery("from Goaldefinition m").list();
	}

	public void update(Goaldefinition goaldefinition) {
		sessionFactory.getCurrentSession().update(goaldefinition);
	}
}
