package edu.zju.cims201.GOF.hibernate.zwjpojo;



/**
 * JiegouId entity. @author MyEclipse Persistence Tools
 */

public class JiegouId  implements java.io.Serializable {


    // Fields    

     private String swh;
     private String xwh;


    // Constructors

    /** default constructor */
    public JiegouId() {
    }

    
    /** full constructor */
    public JiegouId(String swh,  String xwh) {
        this.swh = swh;
        this.xwh = xwh;
    }

   
    // Property accessors

    public String getSwh() {
        return this.swh;
    }
    
    public void setSwh(String swh) {
        this.swh = swh;
    }


    public String getXwh() {
        return this.xwh;
    }
    
    public void setXwh(String xwh) {
        this.xwh = xwh;
    }

    


   public boolean equals(Object other) {
         if ( (this == other ) ) return true;
		 if ( (other == null ) ) return false;
		 if ( !(other instanceof JiegouId) ) return false;
		 JiegouId castOther = ( JiegouId ) other; 
         
		 return ( (this.getSwh()==castOther.getSwh()) || ( this.getSwh()!=null && castOther.getSwh()!=null && this.getSwh().equals(castOther.getSwh()) ) )
 
 && ( (this.getXwh()==castOther.getXwh()) || ( this.getXwh()!=null && castOther.getXwh()!=null && this.getXwh().equals(castOther.getXwh()) ) )
  ;
   }
   
   public int hashCode() {
         int result = 17;
         
         result = 37 * result + ( getSwh() == null ? 0 : this.getSwh().hashCode() );
         result = 37 * result + ( getXwh() == null ? 0 : this.getXwh().hashCode() );
        
         return result;
   }   





}