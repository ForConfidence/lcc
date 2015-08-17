package edu.zju.cims201.GOF.hibernate.pojo;

import java.io.Serializable;

public class News extends MetaKnowledge
  implements Knowledge, Serializable
{
  private String newsbody;
  private String url;
  private String parenturl;
  private String newscontent;
  private String publictime;

  public String getNewsbody()
  {
    return this.newsbody;
  }

  public void setNewsbody(String paramString)
  {
    this.newsbody = paramString;
  }

  public String getUrl()
  {
    return this.url;
  }

  public void setUrl(String paramString)
  {
    this.url = paramString;
  }

  public String getParenturl()
  {
    return this.parenturl;
  }

  public void setParenturl(String paramString)
  {
    this.parenturl = paramString;
  }

  public String getNewscontent()
  {
    return this.newscontent;
  }

  public void setNewscontent(String paramString)
  {
    this.newscontent = paramString;
  }

  public String getPublictime()
  {
    return this.publictime;
  }

  public void setPublictime(String paramString)
  {
    this.publictime = paramString;
  }
}

/* Location:           C:\Users\bbl\Desktop\新pojo\
 * Qualified Name:     edu.zju.cims201.GOF.hibernate.pojo.News
 * JD-Core Version:    0.6.1
 */