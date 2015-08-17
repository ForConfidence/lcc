package edu.zju.cims201.GOF.dao.lccmodule;

import javax.enterprise.deploy.shared.ModuleType;

import org.springframework.stereotype.Component;
import org.springside.modules.orm.hibernate.HibernateDao;

import edu.zju.cims201.GOF.hibernate.pojo.Rating;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleRating;



/**
 * 授权对象的泛型DAO.
 * 
 * @author cwd
 */
@Component
public class RatingDao extends HibernateDao<ModuleRating, Long> {
	
}
