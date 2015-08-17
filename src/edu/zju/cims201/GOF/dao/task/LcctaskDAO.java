package edu.zju.cims201.GOF.dao.task;

import org.springframework.stereotype.Component;
import org.springside.modules.orm.hibernate.HibernateDao;

import edu.zju.cims201.GOF.hibernate.pojo.pdm.LccTask;



@Component
public class LcctaskDAO extends HibernateDao<LccTask,Long> {

}
