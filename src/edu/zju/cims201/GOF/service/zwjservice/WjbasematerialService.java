package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasecategory;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasematerial;

public interface WjbasematerialService {
	//增加
	public void save(Wjbasematerial wjbasematerial);
	//增加
	public int saveBasematerial(Wjbasematerial wjbasematerial);
	//删除??暂时不在界面实现该功能
	public void delete(Wjbasematerial wjbasematerial);
	//改
	public void update(Wjbasematerial wjbasematerial);
	//查询单个
	public Wjbasematerial getWjbasematerial(String materialname);
	//查询list
	public List<Wjbasematerial> getWjbasematerialList(String categoryid);
	//查询所有
	public List<Wjbasematerial> getAllWjbasematerials();
	
	//分页查询
	public Page<Wjbasematerial> getBasematerial(String categoryid,Page<Wjbasematerial> page);
	
	public List<Wjbasecategory> getAllbasecategory();
	
	public Wjbasematerial getwWjbasematerial(int id);
}
