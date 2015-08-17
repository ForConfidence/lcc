package edu.zju.cims201.GOF.dao.lccmodule;

import org.springframework.stereotype.Component;
import org.springside.modules.orm.hibernate.HibernateDao;


import edu.zju.cims201.GOF.hibernate.pojo.CommentRecord;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ModuleCommentRecord;


/**
 * 授权对象的泛型DAO.
 * 
 * @author cwd
 */
@Component
public class ModuleCommentRecordDao extends HibernateDao<ModuleCommentRecord, Long> {
	
}
