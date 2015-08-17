package edu.zju.cims201.GOF.hibernate.zwjpojo;



/**
 * Jiegou entity. @author MyEclipse Persistence Tools
 */

public class Jiegou  implements java.io.Serializable {


    // Fields    

     private JiegouId id;
     private String bh;
     private String cc1;
     private String cc2;
     private String sl;
     private String bz;
     private String dm;


    // Constructors

    public String getBh() {
		return bh;
	}


	public void setBh(String bh) {
		this.bh = bh;
	}


	public String getCc1() {
		return cc1;
	}


	public void setCc1(String cc1) {
		this.cc1 = cc1;
	}


	public String getCc2() {
		return cc2;
	}


	public void setCc2(String cc2) {
		this.cc2 = cc2;
	}


	public String getSl() {
		return sl;
	}


	public void setSl(String sl) {
		this.sl = sl;
	}


	public String getBz() {
		return bz;
	}


	public void setBz(String bz) {
		this.bz = bz;
	}


	public String getDm() {
		return dm;
	}


	public void setDm(String dm) {
		this.dm = dm;
	}


	/** default constructor */
    public Jiegou() {
    }

    
    /** full constructor */
    public Jiegou(JiegouId id) {
        this.id = id;
    }

   
    // Property accessors

    public JiegouId getId() {
        return this.id;
    }
    
    public void setId(JiegouId id) {
        this.id = id;
    }
   








}