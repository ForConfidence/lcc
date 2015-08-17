package edu.zju.cims201.GOF.hibernate.pojo;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * MdeProduct entity. @author MyEclipse Persistence Tools
 */

public class MdeProduct implements java.io.Serializable {

	// Fields

	private Long id;
	private String code;
	private String name;
	private String company;
	private Date createTime;
	private Date updateTime;
	private Set mdeResultsForProductbId = new HashSet(0);
	private Set mdeResultsForProductaId = new HashSet(0);

	// Constructors

	/** default constructor */
	public MdeProduct() {
	}

	/** full constructor */
	public MdeProduct(String code, String name, String company,
			Date createTime, Date updateTime, Set mdeResultsForProductbId,
			Set mdeResultsForProductaId) {
		this.code = code;
		this.name = name;
		this.company = company;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.mdeResultsForProductbId = mdeResultsForProductbId;
		this.mdeResultsForProductaId = mdeResultsForProductaId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Set getMdeResultsForProductbId() {
		return mdeResultsForProductbId;
	}

	public void setMdeResultsForProductbId(Set mdeResultsForProductbId) {
		this.mdeResultsForProductbId = mdeResultsForProductbId;
	}

	public Set getMdeResultsForProductaId() {
		return mdeResultsForProductaId;
	}

	public void setMdeResultsForProductaId(Set mdeResultsForProductaId) {
		this.mdeResultsForProductaId = mdeResultsForProductaId;
	}

	

}