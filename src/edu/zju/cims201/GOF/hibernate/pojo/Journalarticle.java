package edu.zju.cims201.GOF.hibernate.pojo;

import java.io.Serializable;
import java.util.Date;

public class Journalarticle extends MetaKnowledge
  implements Knowledge, Serializable
{
  private String journaltitle;
  private Date dateofpublication;
  private String vol;
  private String no;
  private String pagerange;
  private String organization;
  private String authorintroduction;
  private String funding;
  private String references;

  public String getJournaltitle()
  {
    return this.journaltitle;
  }

  public void setJournaltitle(String paramString)
  {
    this.journaltitle = paramString;
  }

  public Date getDateofpublication()
  {
    return this.dateofpublication;
  }

  public void setDateofpublication(Date paramDate)
  {
    this.dateofpublication = paramDate;
  }

  public String getVol()
  {
    return this.vol;
  }

  public void setVol(String paramString)
  {
    this.vol = paramString;
  }

  public String getNo()
  {
    return this.no;
  }

  public void setNo(String paramString)
  {
    this.no = paramString;
  }

  public String getPagerange()
  {
    return this.pagerange;
  }

  public void setPagerange(String paramString)
  {
    this.pagerange = paramString;
  }

  public String getOrganization()
  {
    return this.organization;
  }

  public void setOrganization(String paramString)
  {
    this.organization = paramString;
  }

  public String getAuthorintroduction()
  {
    return this.authorintroduction;
  }

  public void setAuthorintroduction(String paramString)
  {
    this.authorintroduction = paramString;
  }

  public String getFunding()
  {
    return this.funding;
  }

  public void setFunding(String paramString)
  {
    this.funding = paramString;
  }

  public String getReferences()
  {
    return this.references;
  }

  public void setReferences(String paramString)
  {
    this.references = paramString;
  }
}

/* Location:           C:\Users\bbl\Desktop\新pojo\
 * Qualified Name:     edu.zju.cims201.GOF.hibernate.pojo.Journalarticle
 * JD-Core Version:    0.6.1
 */