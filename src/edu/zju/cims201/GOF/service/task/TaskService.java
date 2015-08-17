package edu.zju.cims201.GOF.service.task;


import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccTask;


public interface TaskService {
	public Page<LccTask> getLccTasks(Employee user,Page<LccTask> page);
	public void saveTask(LccTask t);
	public LccTask getTask(long id);
	/**
	 * @param t
	 */
	public void saveLccTask(LccTask t);
}
