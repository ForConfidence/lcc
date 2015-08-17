package edu.zju.cims201.GOF.rs.dto;


public class MdeResultDTO implements Comparable<MdeResultDTO>{

	// Fields

	private Long id;
	private String productaName;
	private String productbName;
	private String createTime;
	private String updateTime;
	private Float indexWeight;
	private Float productaValue;
	private Float productbValue;
	private Float relativeValue;



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getProductaName() {
		return productaName;
	}



	public void setProductaName(String productaName) {
		this.productaName = productaName;
	}



	public String getProductbName() {
		return productbName;
	}



	public void setProductbName(String productbName) {
		this.productbName = productbName;
	}



	public String getCreateTime() {
		return createTime;
	}



	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}



	public String getUpdateTime() {
		return updateTime;
	}



	public void setUpdateTime(String updateTime) {
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



	public int compareTo(MdeResultDTO o) {
		// TODO Auto-generated method stub
		if(this.getId()==0||o.id==0)
			return 0;
		return this.id>o.id?1:-1;
	}
	

}