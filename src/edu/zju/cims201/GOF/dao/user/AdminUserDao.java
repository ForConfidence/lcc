package edu.zju.cims201.GOF.dao.user;

import org.springframework.stereotype.Component;
import org.springside.modules.orm.hibernate.HibernateDao;

import edu.zju.cims201.GOF.hibernate.pojo.AdminUser;


@Component
public class AdminUserDao extends HibernateDao<AdminUser,Long>{

}
