package edu.zju.cims201.GOF.hibernate.pojo;

import java.io.Serializable;

public class Thesis extends MetaKnowledge
  implements Knowledge, Serializable
{
  private String danwei;

  public String getDanwei()
  {
    return this.danwei;
  }

  public void setDanwei(String paramString)
  {
    this.danwei = paramString;
  }
}

/* Location:           C:\Users\bbl\Desktop\新pojo\
 * Qualified Name:     edu.zju.cims201.GOF.hibernate.pojo.Thesis
 * JD-Core Version:    0.6.1
 */