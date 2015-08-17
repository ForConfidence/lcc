package edu.zju.cims201.GOF.hibernate.pojo;

import java.util.Date;

/**
 * MdeResult entity. @author MyEclipse Persistence Tools
 */

public class MdeResult implements java.io.Serializable {

	// Fields

	private Long id;
	private MdeIndex mdeIndex;
	private MdeProduct mdeProductByProductaId;
	private MdeProduct mdeProductByProductbId;
	private Date createTime;
	private Date updateTime;
	private Float indexWeight;
	private Float productaValue;
	private Float productbValue;
	private Float relativeValue;

	// Constructors

	/** default constructor */
	public MdeResult() {
	}

	/** minimal constructor */
	public MdeResult(MdeProduct mdeProductByProductaId,
			MdeProduct mdeProductByProductbId) {
		this.mdeProductByProductaId = mdeProductByProductaId;
		this.mdeProductByProductbId = mdeProductByProductbId;
	}

	/** full constructor */
	public MdeResult(MdeIndex mdeIndex, MdeProduct mdeProductByProductaId,
			MdeProduct mdeProductByProductbId, Date createTime,
			Date updateTime, Float indexWeight, Float productaValue,
			Float productbValue, Float relativeValue) {
		this.mdeIndex = mdeIndex;
		this.mdeProductByProductaId = mdeProductByProductaId;
		this.mdeProductByProductbId = mdeProductByProductbId;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.indexWeight = indexWeight;
		this.productaValue = productaValue;
		this.productbValue = productbValue;
		this.relativeValue = relativeValue;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public MdeIndex getMdeIndex() {
		return mdeIndex;
	}

	public void setMdeIndex(MdeIndex mdeIndex) {
		this.mdeIndex = mdeIndex;
	}

	public MdeProduct getMdeProductByProductaId() {
		return mdeProductByProductaId;
	}

	public void setMdeProductByProductaId(MdeProduct mdeProductByProductaId) {
		this.mdeProductByProductaId = mdeProductByProductaId;
	}

	public MdeProduct getMdeProductByProductbId() {
		return mdeProductByProductbId;
	}

	public void setMdeProductByProductbId(MdeProduct mdeProductByProductbId) {
		this.mdeProductByProductbId = mdeProductByProductbId;
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

	public Float getIndexWeight() {
		return indexWeight;
	}

	public void setIndexWeight(Float indexWeight) {
		this.indexWeight = indexWeight;
	}

	public Float getProductaValue() {
		return productaValue;
	}

	public void setProductaValue(Float productaValue) {
		this.productaValue = productaValue;
	}

	public Float getProductbValue() {
		return productbValue;
	}

	public void setProductbValue(Float productbValue) {
		this.productbValue = productbValue;
	}

	public Float getRelativeValue() {
		return relativeValue;
	}

	public void setRelativeValue(Float relativeValue) {
		this.relativeValue = relativeValue;
	}

	

}