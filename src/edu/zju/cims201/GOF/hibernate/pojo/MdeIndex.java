package edu.zju.cims201.GOF.hibernate.pojo;

import java.util.HashSet;
import java.util.Set;

/**
 * MdeIndex entity. @author MyEclipse Persistence Tools
 */

public class MdeIndex implements java.io.Serializable {

	// Fields

	private Long id;
	private Long parentId;
	private String code;
	private String nodeName;
	private String nodeDescription;
	private String nameForDetail;
	private Set<MdeIndex> subNodes=new HashSet<MdeIndex>();

	// Constructors

	/** default constructor */
	public MdeIndex() {
	}

	/** full constructor */
	public MdeIndex(Long parentId, String code, String nodeName,
			String nodeDescription, Set<MdeIndex> subNodes) {
		this.parentId = parentId;
		this.code = code;
		this.nodeName = nodeName;
		this.nodeDescription = nodeDescription;
		this.subNodes = subNodes;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getNodeDescription() {
		return nodeDescription;
	}

	public void setNodeDescription(String nodeDescription) {
		this.nodeDescription = nodeDescription;
	}

	public Set<MdeIndex> getSubNodes() {
		return subNodes;
	}

	public void setSubNodes(Set<MdeIndex> subNodes) {
		this.subNodes = subNodes;
	}

	public String getNodeName() {
		return nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getNameForDetail() {
		return nameForDetail;
	}

	public void setNameForDetail(String nameForDetail) {
		this.nameForDetail = nameForDetail;
	}

	
	

}