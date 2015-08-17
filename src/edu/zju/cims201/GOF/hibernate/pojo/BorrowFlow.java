package edu.zju.cims201.GOF.hibernate.pojo;

public class BorrowFlow extends Flow {
	
	private BorrowFlowContent borrowFlowContent;
	private SystemUser borrowAdmin;
	
	private FlowNode currentNode;
	
	
	
	public SystemUser getBorrowAdmin() {
		return borrowAdmin;
	}
	public void setBorrowAdmin(SystemUser borrowAdmin) {
		this.borrowAdmin = borrowAdmin;
	}
	public BorrowFlowContent getBorrowFlowContent() {
		return borrowFlowContent;
	}
	public void setBorrowFlowContent(BorrowFlowContent borrowFlowContent) {
		this.borrowFlowContent = borrowFlowContent;
	}
	public FlowNode getCurrentNode() {
		return currentNode;
	}
	public void setCurrentNode(FlowNode currentNode) {
		this.currentNode = currentNode;
	}
	
	
	
	

	

}
