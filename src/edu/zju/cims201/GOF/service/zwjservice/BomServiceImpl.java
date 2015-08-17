package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.zwjdao.CategoryDAO;
import edu.zju.cims201.GOF.hibernate.zwjpojo.GongYi1;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Gongyi;
import edu.zju.cims201.GOF.hibernate.zwjpojo.JICHU;
import edu.zju.cims201.GOF.hibernate.zwjpojo.JICHU1;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Jiegou;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasecategory;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasematerial;

@Service
@Transactional
public class BomServiceImpl implements BomService {

	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	public JICHU getJichu(String WH) {
		List list=sessionFactory.getCurrentSession().createQuery("from JICHU m where m.WH=?").setParameter(0, WH).list();
		if(list.size()>0){
			return (JICHU)list.get(0);
		}else{
			return null;
		}
	}
	public List<Jiegou> getJiegous(String SWH) {
		return sessionFactory.getCurrentSession().createQuery("from Jiegou m where m.id.swh=?").setParameter(0, SWH).list();
	}
	public void saveJichu1(JICHU1 jichu1) {
		sessionFactory.getCurrentSession().save(jichu1);
	}
	public List<JICHU1> getAllJichu1s() {
		return sessionFactory.getCurrentSession().createQuery("from JICHU1 m").list();
	}
	public void saveGongyi1(GongYi1 gongYi1) {
		sessionFactory.getCurrentSession().save(gongYi1);
	}
	public List<Gongyi> getGongyis(String wh) {
		return sessionFactory.getCurrentSession().createQuery("from Gongyi m where m.wh=?").setParameter(0, wh).list();
	}
	public List<JICHU1> getJichu1s(Integer parentid) {
		return sessionFactory.getCurrentSession().createQuery("from JICHU1 m where m.PARENTID=?").setParameter(0, parentid).list();
	}
	public List<GongYi1> getGongYi1s(String wh) {
		return sessionFactory.getCurrentSession().createQuery("from GongYi1 m where m.wh=?").setParameter(0, wh).list();
	}
}
