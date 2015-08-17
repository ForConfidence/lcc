package edu.zju.cims201.GOF.hibernate.pojo;

import java.io.Serializable;

public class Question extends MetaKnowledge
  implements Knowledge, Serializable
{
  private String questioncontent;
  private Long questionstatus;
  private String questionsupplement;

  public String getQuestioncontent()
  {
    return this.questioncontent;
  }

  public void setQuestioncontent(String paramString)
  {
    this.questioncontent = paramString;
  }

  public Long getQuestionstatus()
  {
    return this.questionstatus;
  }

  public void setQuestionstatus(Long paramLong)
  {
    this.questionstatus = paramLong;
  }

  public String getQuestionsupplement()
  {
    return this.questionsupplement;
  }

  public void setQuestionsupplement(String paramString)
  {
    this.questionsupplement = paramString;
  }
}

/* Location:           C:\Users\bbl\Desktop\新pojo\
 * Qualified Name:     edu.zju.cims201.GOF.hibernate.pojo.Question
 * JD-Core Version:    0.6.1
 */