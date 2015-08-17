package edu.zju.cims201.GOF.hibernate.zwjpojo;

public class Lcalciamethod implements java.io.Serializable {

	private int id;
	private String lcianame;
	private String lciacategory;
	private String lciafactor;
	private String lciafactorunit;
	private String UUID;
	private Lcalciamethodlist lcalciamethodlist;
	//private int methodid;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLcianame() {
		return lcianame;
	}
	public void setLcianame(String lcianame) {
		this.lcianame = lcianame;
	}
	public String getLciacategory() {
		return lciacategory;
	}
	public void setLciacategory(String lciacategory) {
		this.lciacategory = lciacategory;
	}
	public String getLciafactor() {
		return lciafactor;
	}
	public void setLciafactor(String lciafactor) {
		this.lciafactor = lciafactor;
	}
	public String getLciafactorunit() {
		return lciafactorunit;
	}
	public void setLciafactorunit(String lciafactorunit) {
		this.lciafactorunit = lciafactorunit;
	}
	public String getUUID() {
		return UUID;
	}
	public void setUUID(String uUID) {
		UUID = uUID;
	}
	public Lcalciamethodlist getLcalciamethodlist() {
		return lcalciamethodlist;
	}
	public void setLcalciamethodlist(Lcalciamethodlist lcalciamethodlist) {
		this.lcalciamethodlist = lcalciamethodlist;
	}
//	public int getMethodid() {
//		return methodid;
//	}
//	public void setMethodid(int methodid) {
//		this.methodid = methodid;
//	}
	
	
}