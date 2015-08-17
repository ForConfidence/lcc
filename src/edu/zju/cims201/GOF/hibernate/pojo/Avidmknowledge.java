package edu.zju.cims201.GOF.hibernate.pojo;

import java.io.Serializable;

public class Avidmknowledge extends MetaKnowledge
  implements Knowledge, Serializable
{
  private String avidmtype;
  private String avidmdocumentiid;
  private String avidmfileiid;
  private String avidmversioniid;
  private String avidmproductiid;
  private String avidmglobledocumentid;
  private String avidmhost;

  public String getAvidmtype()
  {
    return this.avidmtype;
  }

  public void setAvidmtype(String paramString)
  {
    this.avidmtype = paramString;
  }

  public String getAvidmdocumentiid()
  {
    return this.avidmdocumentiid;
  }

  public void setAvidmdocumentiid(String paramString)
  {
    this.avidmdocumentiid = paramString;
  }

  public String getAvidmfileiid()
  {
    return this.avidmfileiid;
  }

  public void setAvidmfileiid(String paramString)
  {
    this.avidmfileiid = paramString;
  }

  public String getAvidmversioniid()
  {
    return this.avidmversioniid;
  }

  public void setAvidmversioniid(String paramString)
  {
    this.avidmversioniid = paramString;
  }

  public String getAvidmproductiid()
  {
    return this.avidmproductiid;
  }

  public void setAvidmproductiid(String paramString)
  {
    this.avidmproductiid = paramString;
  }

  public String getAvidmglobledocumentid()
  {
    return this.avidmglobledocumentid;
  }

  public void setAvidmglobledocumentid(String paramString)
  {
    this.avidmglobledocumentid = paramString;
  }

  public String getAvidmhost()
  {
    return this.avidmhost;
  }

  public void setAvidmhost(String paramString)
  {
    this.avidmhost = paramString;
  }
}

/* Location:           C:\Users\bbl\Desktop\新pojo\
 * Qualified Name:     edu.zju.cims201.GOF.hibernate.pojo.Avidmknowledge
 * JD-Core Version:    0.6.1
 */