package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Goaldefinition;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasecategory;

public interface CategoryService {
	public void add(Wjbasecategory wjbasecategory);
	public Wjbasecategory getCategoryById(Integer id);
	public List getCategory();
	public void delete(Integer id);
	public void update(Wjbasecategory wjbasecategory);
}
