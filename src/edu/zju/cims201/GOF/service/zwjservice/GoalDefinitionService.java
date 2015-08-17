package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import edu.zju.cims201.GOF.hibernate.zwjpojo.Goaldefinition;

public interface GoalDefinitionService {
	public void save(Goaldefinition goaldefinition);
	public Goaldefinition getGoaldefinition(Integer id);
	public List<Goaldefinition> getAll();
	public void update(Goaldefinition goaldefinition);
}
