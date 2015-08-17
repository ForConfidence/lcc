package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Unitdetail;

public interface UnitdetailService {
	//增加
	//public void save(Wjbasematerial wjbasematerial);
	//增加
	//public int saveBasematerial(Wjbasematerial wjbasematerial);
	//删除??暂时不在界面实现该功能
	//public void delete(Wjbasematerial wjbasematerial);
	//改
	//public void update(Wjbasematerial wjbasematerial);
	//查询单个
	public Unitdetail getUnitdetail(String unitname);
	//查询list
	public List<Unitdetail> getUnitdetailList(String categoryid);
	//查询所有
	public List<Unitdetail> getUnitdetails();
	
	//分页查询
	public Page<Unitdetail> getUnitdetail(String unitcategoryid,Page<Unitdetail> page);
	
	//public List<Wjbasecategory> getAllbasecategory();
}
