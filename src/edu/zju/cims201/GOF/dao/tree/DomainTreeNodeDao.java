package edu.zju.cims201.GOF.dao.tree;

import org.springframework.stereotype.Component;
import org.springside.modules.orm.hibernate.HibernateDao;

import edu.zju.cims201.GOF.hibernate.pojo.DomainTreeNode;

@Component
public class DomainTreeNodeDao extends HibernateDao<DomainTreeNode,Long> {

}
