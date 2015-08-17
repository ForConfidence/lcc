package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjmaterialcategory;

public interface WjmaterialcategoryService {
	//增加
	public void save(Wjmaterialcategory wjmaterialcategory);
	//删除??暂时不在界面实现该功能
	public void delete(Wjmaterialcategory wjmaterialcategory);
	//改
	public void update(Wjmaterialcategory wjmaterialcategory);
	//查询单个
	public Wjmaterialcategory getWjmaterialcategory(Integer id);
	public Wjmaterialcategory getWjmaterialcategory(String id);
	//查询list
	public List<Wjmaterialcategory> getWjmaterialcategoryList(Integer parentid);
	//查询所有
	public List<Wjmaterialcategory> getAllWjmaterialcategories();
	//验证是否存在
	//public String existCategory(String categoryname);
	//按categoryname查询
	public List<Wjmaterialcategory> getWjmaterialcategoryList(String categoryname);
}
