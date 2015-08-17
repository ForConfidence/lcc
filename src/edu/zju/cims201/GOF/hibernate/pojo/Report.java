package edu.zju.cims201.GOF.hibernate.pojo;

import java.io.Serializable;
import java.util.Date;

public class Report extends MetaKnowledge
  implements Knowledge, Serializable
{
  private Date dateofreport;
  private String references;

  public Date getDateofreport()
  {
    return this.dateofreport;
  }

  public void setDateofreport(Date paramDate)
  {
    this.dateofreport = paramDate;
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
 * Qualified Name:     edu.zju.cims201.GOF.hibernate.pojo.Report
 * JD-Core Version:    0.6.1
 */