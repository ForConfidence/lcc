package edu.zju.cims201.GOF.web.zwjaction;

import java.util.List;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasecategory;
import edu.zju.cims201.GOF.service.zwjservice.CategoryService;
import edu.zju.cims201.GOF.web.CrudActionSupport;

//视频-20150420
//可以不写--xxx---搞不清
@Component("categoryAction")
@Scope("prototype")
public class CategoryAction extends ActionSupport implements ModelDriven {
	
	private CategoryService categoryService;
	private List categories;
	private Wjbasecategory wjbasecategory;
	private Integer id;
	
	public CategoryService getCategoryService() {
		return categoryService;
	}
	
	public void setCategoryService(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	public List getCategories() {
		return categories;
	}
	public void setCategories(List categories) {
		this.categories = categories;
	}
	public Wjbasecategory getWjbasecategory() {
		return wjbasecategory;
	}
	public void setWjbasecategory(Wjbasecategory wjbasecategory) {
		this.wjbasecategory = wjbasecategory;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String add() {
		categoryService.add(wjbasecategory);
		return "add";
	}
	
	public String delete() {
		categoryService.delete(id);
		return "delete";
	}
	
	public String update() {
		categoryService.update(wjbasecategory);
		return "update";
	}
	
	public String get() {
		this.categories = categoryService.getCategory();
		return "getall";
	}
	
	public String get1() {
		this.wjbasecategory = this.categoryService.getCategoryById(id);
		return "getone";
	}
	
	//视频-20150419
	//接收前台参数
	public Wjbasecategory getModel() {
		return wjbasecategory;
	}
	
}
