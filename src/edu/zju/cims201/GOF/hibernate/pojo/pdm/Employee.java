package edu.zju.cims201.GOF.hibernate.pojo.pdm;

import java.util.HashSet;
import java.util.Set;

public class Employee {

	
	private Long id;
	private String name;
	private String email;
	private String sex;
	private String password;
	private String hobby;
	private Department department;
	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	private Set sysBehaviorlogs = new HashSet(0);//用户行为记录
	private Integer scoreTemp=0;//用于存放用户排行的临时分数，当按照weekcscore排序时，则scoreTemp=weekcscore
	private Integer totoalscore = 0;
	private Integer contributionscore = 0;
	private Integer weekcscore = 0;
	private Integer lastweekcscore = 0;
	private Integer monthcscore = 0;
	private Integer lastmonthcscore = 0;
	private Integer yearcscore = 0;
	private Integer lastyearcscore = 0;
	
	private Integer weekpscore = 0;
	private Integer lastweekpscore = 0;
	private Integer monthpscore = 0;
	private Integer lastmonthpscore = 0;
	private Integer yearpscore = 0;
	private Integer lastyearpscore = 0;
	
	private Integer lasttwoweekcscore = 0;
	private Integer lasttwoweekpscore = 0;
	
	
	
	
	public Integer getWeekcscore() {
		return weekcscore;
	}

	public void setWeekcscore(Integer weekcscore) {
		this.weekcscore = weekcscore;
	}

	public Integer getLastweekcscore() {
		return lastweekcscore;
	}

	public void setLastweekcscore(Integer lastweekcscore) {
		this.lastweekcscore = lastweekcscore;
	}

	public Integer getMonthcscore() {
		return monthcscore;
	}

	public void setMonthcscore(Integer monthcscore) {
		this.monthcscore = monthcscore;
	}

	public Integer getLastmonthcscore() {
		return lastmonthcscore;
	}

	public void setLastmonthcscore(Integer lastmonthcscore) {
		this.lastmonthcscore = lastmonthcscore;
	}

	public Integer getYearcscore() {
		return yearcscore;
	}

	public void setYearcscore(Integer yearcscore) {
		this.yearcscore = yearcscore;
	}

	public Integer getLastyearcscore() {
		return lastyearcscore;
	}

	public void setLastyearcscore(Integer lastyearcscore) {
		this.lastyearcscore = lastyearcscore;
	}

	public Integer getWeekpscore() {
		return weekpscore;
	}

	public void setWeekpscore(Integer weekpscore) {
		this.weekpscore = weekpscore;
	}

	public Integer getLastweekpscore() {
		return lastweekpscore;
	}

	public void setLastweekpscore(Integer lastweekpscore) {
		this.lastweekpscore = lastweekpscore;
	}

	public Integer getMonthpscore() {
		return monthpscore;
	}

	public void setMonthpscore(Integer monthpscore) {
		this.monthpscore = monthpscore;
	}

	public Integer getLastmonthpscore() {
		return lastmonthpscore;
	}

	public void setLastmonthpscore(Integer lastmonthpscore) {
		this.lastmonthpscore = lastmonthpscore;
	}

	public Integer getYearpscore() {
		return yearpscore;
	}

	public void setYearpscore(Integer yearpscore) {
		this.yearpscore = yearpscore;
	}

	public Integer getLastyearpscore() {
		return lastyearpscore;
	}

	public void setLastyearpscore(Integer lastyearpscore) {
		this.lastyearpscore = lastyearpscore;
	}

	public Integer getLasttwoweekcscore() {
		return lasttwoweekcscore;
	}

	public void setLasttwoweekcscore(Integer lasttwoweekcscore) {
		this.lasttwoweekcscore = lasttwoweekcscore;
	}

	public Integer getLasttwoweekpscore() {
		return lasttwoweekpscore;
	}

	public void setLasttwoweekpscore(Integer lasttwoweekpscore) {
		this.lasttwoweekpscore = lasttwoweekpscore;
	}

	public Set getSysBehaviorlogs() {
		return sysBehaviorlogs;
	}

	public void setSysBehaviorlogs(Set sysBehaviorlogs) {
		this.sysBehaviorlogs = sysBehaviorlogs;
	}



	public String getEmail() {
		return email;
	}
	

	public void setEmail(String email) {
		this.email = email;
	}
	public String getHobby() {
		return hobby;
	}
	public void setHobby(String hobby) {
		this.hobby = hobby;
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
	



	@Override
	public int hashCode() {
		final int PRIME = 31;
		int result = super.hashCode();
		result = PRIME * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		final Employee other = (Employee) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public Integer getTotoalscore() {
		return totoalscore;
	}

	public void setTotoalscore(Integer totoalscore) {
		this.totoalscore = totoalscore;
	}

	public Integer getContributionscore() {
		return contributionscore;
	}

	public void setContributionscore(Integer contributionscore) {
		this.contributionscore = contributionscore;
	}

	public Integer getScoreTemp() {
		return scoreTemp;
	}

	public void setScoreTemp(Integer scoreTemp) {
		this.scoreTemp = scoreTemp;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}
}
