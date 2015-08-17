package edu.zju.cims201.GOF.hibernate.zwjpojo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;



/**
 * Wjbasecategory entity. @author MyEclipse Persistence Tools
 */

//视频-20150419
//@Entity
public class Wjbasecategory implements java.io.Serializable {


    // Fields    

     private Integer id;
     private String name;
     private String englishname;
     private String intro;
     private Integer parentid;
     private String UUID;


    // Constructors

    /** default constructor */
    public Wjbasecategory() {
    }

	/** minimal constructor */
    public Wjbasecategory(Integer parentid) {
        this.parentid = parentid;
    }
    
    /** full constructor */
    public Wjbasecategory(String name, String englishname, String intro, Integer parentid) {
        this.name = name;
        this.englishname = englishname;
        this.intro = intro;
        this.parentid = parentid;
    }

   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    //视频-20150419
    //@Id
    //@GeneratedValue
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getEnglishname() {
        return this.englishname;
    }
    
    public void setEnglishname(String englishname) {
        this.englishname = englishname;
    }

    public String getIntro() {
        return this.intro;
    }
    
    public void setIntro(String intro) {
        this.intro = intro;
    }

    public Integer getParentid() {
        return this.parentid;
    }
    
    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }

	public String getUUID() {
		return UUID;
	}

	public void setUUID(String uUID) {
		UUID = uUID;
	}
   
}