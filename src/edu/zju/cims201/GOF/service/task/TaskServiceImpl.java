package edu.zju.cims201.GOF.service.task;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.dao.task.LcctaskDAO;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccTask;
import edu.zju.cims201.GOF.util.Constants;


@Service
@Transactional
public class TaskServiceImpl implements TaskService {
    
    @Resource(name = "lcctaskDAO")
    private LcctaskDAO lcctaskDAO;
    
    public LcctaskDAO getLcctaskDAO() {
		return lcctaskDAO;
	}
	public void setLcctaskDAO(LcctaskDAO lcctaskDAO) {
		this.lcctaskDAO = lcctaskDAO;
	}

	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;

    public Page<LccTask> getLccTasks(Employee user, Page<LccTask> page) {
		// TODO Auto-generated method stub
		/*String hql=" select task from Task task, SystemUser user where " +
				" user.id in elements(task.carrier)  and user.id ="+user.getId()+" and task.status !='"+Constants.TASK_STATUS_CONFIG+"' and task.status !='"+Constants.TASK_STATUS_END+"' order by task.creatTime desc";*/
		/*String hql=" select task from Task task where " +
				" task.carrier ="+user.getId()+" and task.status !='"+Constants.TASK_STATUS_CONFIG+"' and task.status !='"+Constants.TASK_STATUS_END+"'";
		return taskDAO.findPage(page, hql);*/
		String hql=" select task from LccTask task where " +
			" task.status !='"+Constants.TASK_STATUS_CONFIG+"' and task.status !='"+Constants.TASK_STATUS_END+"'";
		return lcctaskDAO.findPage(page, hql);
		
	}




	public void saveTask(LccTask t) {
		sessionFactory.getCurrentSession().save(t);
		
	}


	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}


	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}



	public LccTask getTask(long id) {
		return (LccTask)sessionFactory.getCurrentSession().get(LccTask.class, id);
	}



	public void saveLccTask(LccTask t) {
		sessionFactory.getCurrentSession().save(t);
	}

}
