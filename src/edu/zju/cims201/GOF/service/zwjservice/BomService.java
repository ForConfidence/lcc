package edu.zju.cims201.GOF.service.zwjservice;

import java.util.List;

import edu.zju.cims201.GOF.hibernate.zwjpojo.GongYi1;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Gongyi;
import edu.zju.cims201.GOF.hibernate.zwjpojo.JICHU;
import edu.zju.cims201.GOF.hibernate.zwjpojo.JICHU1;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Jiegou;
import edu.zju.cims201.GOF.hibernate.zwjpojo.Wjbasecategory;

public interface BomService {
	public JICHU getJichu(String WH);
	public List<Jiegou> getJiegous(String SWH);
	public void saveJichu1(JICHU1 jichu1);
	public List<JICHU1> getAllJichu1s();
	public List<Gongyi> getGongyis(String WH);
	public List<GongYi1> getGongYi1s(String wh);
	public void saveGongyi1(GongYi1 gongYi1);
	public List<JICHU1> getJichu1s(Integer parentid);
}
