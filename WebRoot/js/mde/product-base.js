var productTable;
function createProductBase(){
	var myWin = null;
	var myProductinputupdate=null;
	var myProductinput = null;
	var myColumns = [
	                    Edo.lists.Table.createMultiColumn(),
	                    {header: '产品型号', width:100, headerAlign:'center', align:'center', dataIndex: 'code'},
	                    {header: '产品名称', width:110, headerAlign:'center', align:'center', dataIndex: 'name'},
	                    {header: '公司名称', width:110, headerAlign:'center', align:'center', dataIndex: 'company'},
	        		    {header: '添加时间', width:100, headerAlign:'center', align:'center', dataIndex: 'createTime'},
	        		    {header: '更新时间', width:100, headerAlign:'center', align:'center', dataIndex: 'updateTime'}
	                ];
	           
	productTable = new createTable({autoColumns:true},'100%','100%','产品列表展示',myColumns,['新增产品','修改产品','删除产品'],[addProduct,updateProduct,delRow],'product/product!list.action', {},true,null);
	
	function addProduct(){
	   	if(myWin == null){
			myProductinput = new productinput(function(){
				myWin.hide();
				productTable.search();		
			});
			myWin = new cims201.utils.getWin(450,190,"添加产品信息",myProductinput.getProductinput());				
		} else {
			myWin.destroy();
				myProductinput = new productinput(function(){
					myWin.hide();
					productTable.search();		
				});
			myWin = new cims201.utils.getWin(450,190,"添加产品信息",myProductinput.getProductinput());	
		}
		myProductinput.getProductinput().reset();
		setWinScreenPosition(450,458,myWin,null);
	}
	
	function updateProduct(){
		var rs = productTable.getSelectedItems();
		if(null==rs[0]) {
			Edo.MessageBox.alert("提示", "请选择需要修改的产品！");
			return null;
		}
		if(myWin == null){
			myProductinput = new productinput(function(){
				myWin.hide();
				productTable.search();		
			});
			myWin = new cims201.utils.getWin(450,190,"修改产品信息",myProductinput.getProductinput());
	
		} else {   
			myWin.destroy();
		   	myProductinput = new productinput(function(){
				myWin.hide();
				productTable.search();		
			});
			myWin = new cims201.utils.getWin(450,190,"修改产品信息",myProductinput.getProductinput());
		}
		myProductinput.getProductinput().setForm(rs[0]);
		Edo.get("code").set('readOnly',true);
		setWinScreenPosition(450,458,myWin,null);
	}
	
	function delRow(){
		var rs = productTable.getSelectedItems();
		if(rs){
			productTable.deleteRecord(rs);
			cims201.utils.getData('product/product!delete.action',{id:rs[0].id});
			productTable.search();	
			
		}
	}  
	
	///用于刷新页面
	Edo.create({
	    type: 'box',                 
	    layout: 'vertical',
	    width: 850,
	    height: 500,    
	    children: [
	        productTable.getTable()
	    ]
		
	});
	
	//成员方法，其他的都是临时方法，临时变量
	this.getProductBase = function(){
		return productTable;
	}
}

  function setWinScreenPosition(width,height,win,kid)
	{
		var screenw= cims201.utils.getScreenSize().width;
		var screenh=cims201.utils.getScreenSize().height;
		if(width<screenw)
		{width=(screenw-width)/2
		
		}
		else{
		width=0;
		}
		if(height<screenh)
		{height=(screenh-height)/2
		
		}
		else{
		height=0;
		}
		if(null!=kid)
		unvisiblemodul(kid);
		 win.show(width,height,true);
	}