package edu.zju.cims201.GOF.hibernate.zwjpojo;

/**
 * Gongyi entity. @author MyEclipse Persistence Tools
 */

public class Gongyi implements java.io.Serializable {

	// Fields

	private Integer id;
	private String wh;
	private String gxh;
	private String gxm;
	private String gxmc;
	private String zbgs;
	private String degs;
	private String gsqf;
	private String js;
	private String sbm;
	private String gxbz;

	// Constructors

	/** default constructor */
	public Gongyi() {
	}

	/** full constructor */
	public Gongyi(String wh, String gxh, String gxm, String gxmc, String zbgs,
			String degs, String gsqf, String js, String sbm, String gxbz) {
		this.wh = wh;
		this.gxh = gxh;
		this.gxm = gxm;
		this.gxmc = gxmc;
		this.zbgs = zbgs;
		this.degs = degs;
		this.gsqf = gsqf;
		this.js = js;
		this.sbm = sbm;
		this.gxbz = gxbz;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getWh() {
		return this.wh;
	}

	public void setWh(String wh) {
		this.wh = wh;
	}

	public String getGxh() {
		return this.gxh;
	}

	public void setGxh(String gxh) {
		this.gxh = gxh;
	}

	public String getGxm() {
		return this.gxm;
	}

	public void setGxm(String gxm) {
		this.gxm = gxm;
	}

	public String getGxmc() {
		return this.gxmc;
	}

	public void setGxmc(String gxmc) {
		this.gxmc = gxmc;
	}

	public String getZbgs() {
		return this.zbgs;
	}

	public void setZbgs(String zbgs) {
		this.zbgs = zbgs;
	}

	public String getDegs() {
		return this.degs;
	}

	public void setDegs(String degs) {
		this.degs = degs;
	}

	public String getGsqf() {
		return this.gsqf;
	}

	public void setGsqf(String gsqf) {
		this.gsqf = gsqf;
	}

	public String getJs() {
		return this.js;
	}

	public void setJs(String js) {
		this.js = js;
	}

	public String getSbm() {
		return this.sbm;
	}

	public void setSbm(String sbm) {
		this.sbm = sbm;
	}

	public String getGxbz() {
		return this.gxbz;
	}

	public void setGxbz(String gxbz) {
		this.gxbz = gxbz;
	}

}