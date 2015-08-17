package edu.zju.cims201.GOF.service.component;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.hibernate.pojo.Component;



@Service
public class ComponentServiceImpl implements ComponentService {
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	
	public List<Component> getNodesByLevel(int level) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from Component c where c.level = ?")
		.setParameter(0, level)
		.list();
	}

	public List<Component> getNodesByParent(long parentId) {
		// TODO Auto-generated method stub
		List<Component> cList = sessionFactory.getCurrentSession().createQuery("from Component c where c.parentId = ?")
		.setParameter(0, parentId)
		.list();
		return cList;
	}

	public Component addComponent(Component c) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().save(c);
		return c;
	}

	public void deleteComponent(long id) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().delete(sessionFactory.getCurrentSession().get(Component.class, id));
	}

	public Component getComponent(long id) {
		// TODO Auto-generated method stub		
		return (Component)sessionFactory.getCurrentSession().get(Component.class, id);
	}

	public Component updateComponent(Component c) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().update(c);
		return c;
	}

	public List<Component> searchComponent(String name) {
		// TODO Auto-generated method stub		
		return sessionFactory.getCurrentSession().createQuery("from Component c where c.name like '%"+name+"%'")
		.setMaxResults(10)
		.list();
	}

	public long checkComponent(String name) {
		// TODO Auto-generated method stub
		if(sessionFactory.getCurrentSession().createQuery("from Component c where c.name = ?").setParameter(0, name).list().size()>0){
			return ((Component)(sessionFactory.getCurrentSession().createQuery("from Component c where c.name = ?").setParameter(0, name).list().get(0))).getId();
		}
		return -1;
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public List getnomodulenodesByParent(long parentId, String ids) {
		// TODO Auto-generated method stub
		List<Component> cList=null;
		if(ids.equals("()")){
			 cList= sessionFactory.getCurrentSession().createQuery("from Component c where c.parentId = ?")
						.setParameter(0, parentId)
						.list();
		}else{
			 cList= sessionFactory.getCurrentSession().createQuery("from Component c where c.parentId = ? and c.id not in"+ids)
						.setParameter(0, parentId)
						.list();
		}
		
				return cList;
	}
	
}
