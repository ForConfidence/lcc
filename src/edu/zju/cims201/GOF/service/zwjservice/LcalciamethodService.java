package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciafactor;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciamethod;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Lcalciamethodlist;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjmaterialcategory;


public interface LcalciamethodService {
	public List<Lcalciamethod> getAlllciamethod();
	
	public List<Lcalciafactor> getLciafactorbylciacategoryid(String lciacategoryid);
	
	public Page<Lcalciafactor> getBasematerial(String lciacategoryid,
			Page<Lcalciafactor> page);
	public List<Lcalciafactor> getAllfactors();
	
	public void update(Lcalciamethod lcalciamethod);
	public void update(Lcalciafactor lcalciafactor);
	
	//根据基础物质、因子或者产品、过程来查找所有影响值
	public List<Lcalciamethod> getLcalciamethods(String methodid);
	
	//public Lcalciamethodlist getLcalciamethodlist(String methodname);
}
