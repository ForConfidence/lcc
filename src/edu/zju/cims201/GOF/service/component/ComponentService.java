package edu.zju.cims201.GOF.service.component;

import java.util.List;

import edu.zju.cims201.GOF.hibernate.pojo.Component;


public interface ComponentService {
	//获取该level的所有节点
	public List<Component> getNodesByLevel(int level);
	//根据parentid获取所有节点
	public List<Component> getNodesByParent(long parentId);
	//查找零件
	public Component getComponent(long id);
	//增加component
	public Component addComponent(Component c);
	//删除component
	public void deleteComponent(long id);
	//更新component
	public Component updateComponent(Component c);
	//查询对应的component
	public List<Component> searchComponent(String name);
	//检验是否存在否个component
	public long checkComponent(String name);
	public List getnomodulenodesByParent(long parentid, String ids);
}
