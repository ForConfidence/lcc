package edu.zju.cims201.GOF.hibernate.pojo;

import java.io.Serializable;
import java.util.Date;

public class Article extends MetaKnowledge
  implements Knowledge, Serializable
{
  private Date dateofpublication;
  private String articlecontent;

  public Date getDateofpublication()
  {
    return this.dateofpublication;
  }

  public void setDateofpublication(Date paramDate)
  {
    this.dateofpublication = paramDate;
  }

  public String getArticlecontent()
  {
    return this.articlecontent;
  }

  public void setArticlecontent(String paramString)
  {
    this.articlecontent = paramString;
  }
}

/* Location:           C:\Users\bbl\Desktop\新pojo\
 * Qualified Name:     edu.zju.cims201.GOF.hibernate.pojo.Article
 * JD-Core Version:    0.6.1
 */