package edu.zju.cims201.GOF.hibernate.pojo;




import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;



@Entity
public class ClassificationTree  {
	private Long id;
	private String text;
	private String classCode;
	private String code;
	private String lastChildCode;
	private Integer leaf;
	private String imgUrl;
	private String classDes;
	private String modelUrl;
	private CodeClass codeClass;
	private ClassificationTree parent;
	private List<ClassificationTree> children;
	
	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getLastChildCode() {
		return lastChildCode;
	}
	public void setLastChildCode(String lastChildCode) {
		this.lastChildCode = lastChildCode;
	}
	public Integer getLeaf() {
		return leaf;
	}
	public void setLeaf(Integer leaf) {
		this.leaf = leaf;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public String getClassDes() {
		return classDes;
	}
	public void setClassDes(String classDes) {
		this.classDes = classDes;
	}
	public String getModelUrl() {
		return modelUrl;
	}
	public void setModelUrl(String modelUrl) {
		this.modelUrl = modelUrl;
	}
	
	@ManyToOne
	@JoinColumn(name="parent_id")
	public ClassificationTree getParent() {
		return parent;
	}
	public void setParent(ClassificationTree parent) {
		this.parent = parent;
	}
	
	@OneToMany(mappedBy="parent")
	public List<ClassificationTree> getChildren() {
		return children;
	}
	public void setChildren(List<ClassificationTree> children) {
		this.children = children;
	}
	@ManyToOne
	@JoinColumn(name="codeclass_id")
	public CodeClass getCodeClass() {
		return codeClass;
	}
	public void setCodeClass(CodeClass codeClass) {
		this.codeClass = codeClass;
	}
	public String getClassCode() {
		return classCode;
	}
	public void setClassCode(String classCode) {
		this.classCode = classCode;
	}


}