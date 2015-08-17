/**
 * 指标树
 */
function indexTreeSelectEvent(cn){
	//alert(1);
}

cims201.tree.createIndexTree = function(type){
	//从指标树接收数据
	var indextreeData = cims201.utils.getData('product/mdeindex!listTreeIndexNodes.action',{treeType:"indexTree"});
	var treeColumns = [
	                   {
					      header: '指标名称',
					      dataIndex: 'nodeName'
					      //复选框
					      //renderer:renderCascadeTree
//					      renderer: function(v,r){
//					      	  //return '<div class="e-tree-checkbox"><div class="e-tree-check-icon  '+(r.checked ? 'e-table-checked' : '')+'"></div>'+v+'</div>';            
//					      	return '<div class="e-tree-checkbox"><div class="e-tree-check-icon  '+(r.checked ? 'e-table-notallowchecked' : '')+'"></div>'+v+'</div>';            
//					      	
//					      }		      
	                   	}							 				 
					 ];						 
	var myTree = new cims201.tree.createTree('indexEditTree',treeColumns,indextreeData,indexTreeSelectEvent,500,650,'single',null);
	return myTree;
};

cims201.tree.createTreeNodeForm = function(){
	var addIndexTreeNodeForm = Edo.create({
		type: 'box',
		id:'indexform',
		border: [0,0,0,0],
		title: '添加指标',
	    children: [
			{
			    type: 'formitem',label: '指标代号<span style="color:red;">*</span>:',labelWidth:100,
			    children:[{type: 'text', id: 'code', valid: cims201.utils.validate.noEmpty, defaultWidth: 250}]
			},
	        {
	            type: 'formitem',label: '指标名称<span style="color:red;">*</span>:',labelWidth:100,
	            children:[{type: 'text', id: 'nodeName', valid: cims201.utils.validate.noEmpty, defaultWidth: 250}]
	        },
	        {
	            type: 'formitem',label: '指标说明:',labelWidth:100, 
	            children:[{type: 'textarea', id: 'nameForDetail', defaultHeight:100, defaultWidth: 250}]
	        },
	        {
	            type: 'formitem',label: '备注:',labelWidth:100,
	            children:[{type: 'textarea', id: 'nodeDescription', defaultHeight:100, defaultWidth: 250}]
	        },
	        {
	            type: 'formitem',layout:'horizontal',padding: [8,0,8, 0],labelWidth:100,
	            children:[
	                {id: 'indexSubmitBtn1', type: 'button', text: '提交', onclick: this.recall},
	                {id: 'indexResetBtn', type: 'button', text: '重置', onclick:function(){
	                	indexform.reset();
	                }}
	            ]
	        }
	    ]
	});
	return addIndexTreeNodeForm;
};

//新增指标
cims201.tree.addIndexTreeNode = function(indexForm){
	indexForm.set('title','添加指标');
	indexForm.reset();
};

//编辑指标
cims201.tree.editIndexTreeNode = function(indexForm,data){
	indexForm.set('title','编辑指标');
	//domainForm.reset();
	
	indexForm.setForm(data);
};
