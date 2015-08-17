package edu.zju.cims201.GOF.dao.zwjdao;

import java.util.List;

import org.springframework.stereotype.Component;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasecategory;

//@Component
public interface CategoryDAO {
	//增
	public void add(Wjbasecategory wjbasecategory);
	//查单个
	public Wjbasecategory getCategoryById(Integer id);
	//查所有
	public List getCategory();
	//删
	public void delete(Integer id);
	//更新
	public void update(Wjbasecategory wjbasecategory);
	
}
