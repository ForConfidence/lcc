//模块化设计评价系统主页
function createMdeHomeIndex(){
	var noticePanel = Edo.create({
		type: 'panel',
		title: '<span class="cims201_con_font">公告</span>',
		titleIcon: 'cims201_notice_icon',
		width: '100%',
		height: '50%',
		border: [1,1,1,1],
		padding: [0,0,0,0],
		layout: 'vertical',
		children: []
	});
	
	cims201.utils.getData_Async('message/message!listTypeMessages.action',{messageType:'notice',index:0,size:10},function(text){
		var data = Edo.util.Json.decode(text);
		data.data.each(function(r){
			noticePanel.addChild({
				type: 'box',
				width: '100%',
				//height: '100%',
				border: [0,0,0,0],
				padding: [0,0,0,0],
				layout: 'horizontal',
				bodyCls: 'cims201_notice_title',
				children: [
					{type: 'boxtext', width: '100%', style:'padding-left:10px;padding-top: 5px;', text: r.content+'<br>'+ r.sendTime+'<br><br>'}//,
					//{type: 'label', text: r.sendTime}
				]
			});
		});
	});

	

	
	//用户排行
	var myRankData = cims201.utils.getData('userranking/userranking!list.action',{rankType:'totoalscore',model_:'all',size:10,index:0,rankAsTable:'yes'});
	//var myRankData = [];
	
	var rankPanel = Edo.create({
		type: 'panel',
		title: '<span class="cims201_con_font">排行榜</span>',
		titleIcon: 'cims201_rank_title',
		width: '100%',
		height: '50%',
		border: [1,1,1,1],
		padding: [0,0,0,0],
		layout: 'vertical',
		children: [{
			type: 'table',
			width: 600,
            height: 400,
            verticalLine: false,
			horizontalLine: false,
			headerVisible: false,
			horizontalScrollPolicy : 'off',
			autoColumns: false,
			data: myRankData,
			columns:[
				{
                    headerText: '',
                    align: 'center',
                    width: 25,                        
                    enableSort: false,
                    enableDragDrop: true,
                    enableColumnDragDrop: false,
                    style:  'cursor:move;',
                    renderer: function(v, r, c, i, data, t){
                        //return '<span style="padding:2px;padding-left:6px;padding-right:6px;line-height:20px;">'+i+'</span>';
                        if(i<3){
                        	return '<div style="width:25px;height:22px;text-align:center;line-height:20px;color:red;">'+(i+1)+'</div>';
                        }else{
                        	return '<div style="width:25px;height:22px;text-align:center;line-height:20px;">'+(i+1)+'</div>';
                        }
                        //return i;
                    }
                }, 
				{header: '姓名', width: 150, dataIndex: 'name'},        
				{header: '贡献度',width: 50, dataIndex: 'id'}
			]			
		}]
	});
	
	var rightPanel_index = Edo.create({
		type: 'box',
		border: [0,0,0,0],
		padding: [0,0,0,0],
		width: '20%',
		height: '100%',
		layout: 'vertical',
		children: [
			noticePanel,rankPanel
		]
	});
	
	//指标树界面
/*	var indexPanel = Edo.create({
		type: 'panel',
		title: '<span class="cims201_con_font">评价指标树</span>',
		titleIcon: 'cims201_statistic_title',		
		width: '100%',
		height: '100%',
		border: [1,1,1,1],
		padding: [0,0,0,0],
		layout: 'vertical',
		children: new createTreeIndexList().gettreeIndex()
	});*/
	//从指标树接收数据
	var indextreeData = cims201.utils.getData('product/mdeindex!listTreeIndexNodes.action',{treeType:"indexTree"});
	var treeColumns = [{
					      header: '树名',
					      dataIndex: 'nodeName'				     			     				      
					 }							 				 
					 ];						 
	var myIndexTree = new createTree({},treeColumns,indextreeData,'single');
	
	var indexPanel = Edo.create({     
		type: 'panel',
		title: '<span class="cims201_con_font">评价指标树</span>',
		titleIcon: 'cims201_statistic_title',		      
	    width: '100%',
	    height: '100%',
	    border: [1,1,1,1],  
	    padding: [0,0,0,0],    						   
	    children: [
	       myIndexTree.getTree()
	    ]
     });
	
	
	var leftPanel_index = Edo.create({
		type: 'box',
		border: [0,0,0,0],
		padding: [0,0,0,0],
		width: '25%',
		height: '100%',
		layout: 'vertical',
		children: [
			//statisticPanel,templatePanel,
			indexPanel
		]
	});
	//在首页直接放置两个产品输入框，以及选择哪个功能的按钮——潘雷加 2012年12月14日
	var titlelabel = Edo.create({
		type : 'label',
		text : '模块化设计评价子系统',
		style:	'font-size:25px;padding-top:50px;padding-bottom:50px;font-family:微软雅黑, Verdana;font-weight:bold; '
	});
	var corePanel = Edo.create({
		type: 'formitem', 
		children:[
	       {
	    	   type: 'box', layout:'horizontal',border : [0,0,0,0],
	    	   children : [
				{
					type: 'formitem',label: '选择第一个产品的型号：',labelWidth:'140',
						children:[
					          {
					        	  type: 'autocomplete', 
					        	  id: 'p1monumber',
					      		  width: 150, 
					    		  queryDelay: 500,
					    		  url: 'product/product!recommentProduct.action',
					    		  popupHeight: '65',
					    		  valueField: 'id', 
					    		  displayField: 'code'
					    	  }
				          ]
				},
				{	
					type: 'space', width: 20
				},
				{
					type: 'formitem',label: '选择第二个产品的型号：',labelWidth:'140',
						children:[
						          {
						        	  type: 'autocomplete', 
						        	  id: 'p2monumber',
						      		  width: 150, 
						    		  queryDelay: 500,
						    		  url: 'product/product!recommentProduct.action',
						    		  popupHeight: '65',
						    		  valueField: 'id', 
						    		  displayField: 'code'
						    	  }
					          ]
				}
               ]
	    	}
   		]
	});
	
	var buttonbox = Edo.create({
		type : 'box',
		layout : 'horizontal',
		border : [0,0,0,0],
		padding:[30,0,0,0],
		children : [
					{
						
					    type: 'label', height:100, width:150, style: 'padding-left:30px; padding-right:0px;padding-top:5px;', text: '<a href=javascript:procuctManage();><div class="cims201_topbar_icon">&nbsp;<image height=60 width=60 src=css/images/ku.png><br>&nbsp;产品管理</div></a>'
					
					},
					{
					
					    type: 'label', height:100, width:150, style: 'padding-left:30px; padding-right:2px;padding-top:5px;', text: '<a href=javascript:analysis("benefit");><div class="cims201_topbar_icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<image height=60 width=60 src=css/images/userrank.gif><br>模块化设计效益评价</div></a>'
					
					},{
					
					    type: 'label', height:100, width:150, style: 'padding-left:30px; padding-right:2px;padding-top:5px;', text: '<a href=javascript:analysis("degree");><div class="cims201_topbar_icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<image height=60 width=60 src=css/images/statistics.png><br>模块化设计程度评价</div></a>'
					
					}
		            ]
	});
	
	var middlePanel = Edo.create({
		title: '<span class="cims201_con_font">模块化设计评价</span>',
		titleIcon: 'cims201_search_title',
		type: 'panel',
		id : 'homeform',
		layout: 'vertical',	
		width: '75%',
		height: '100%',
		border : [1,1,1,1],	
		horizontalAlign:'center',
		children : [titlelabel,corePanel,buttonbox]
	});
	
	var product1 =Edo.create({
	    type: 'box', 
	    id: 'product1',
	    border: [0,0,0,0],
	    padding: [10,0,0,0],
		//width: '100%',
        //height: '100%',
		verticalScrollPolicy: 'auto',
		layout: 'vertical',
	    children: [
	        
	        {
				type: 'formitem',
				layout: 'horizontal',						
				label: '产品1名称:',
				labelStyle: 'font-weight:bold;font-size:16px;',
				labelWidth: 100,
				padding: [10,0,0,0],
	            children: [
	                {
	                    type: 'text'
	                }
	            ]
	        },
	        {
	        	type: 'formitem',
				layout: 'horizontal',
	            label: '产品1型号:',
	            labelAlign: 'right',
	            labelStyle: 'font-weight:bold;font-size:16px;',
				labelWidth: 100,
				padding: [10,0,0,0],
	            children: [
	                {
	                    type: 'text'
	                }
	            ]
	        },
	        {
	        	type: 'formitem',
				layout: 'horizontal',
	            label: '公司名称:',
	            labelAlign: 'right',
	            labelStyle: 'font-weight:bold;font-size:16px;',
				labelWidth: 100,
				padding: [10,0,0,0],
	            children: [
	                {
	                    type: 'text'
	                }
	            ]
	        }
	    ]
	    
	});
	
	var product2 =Edo.create({
	    type: 'box', 
	    id: 'product2',
	    border: [0,0,0,0],
	    padding: [10,0,0,40],
		//width: '100%',
        //height: '100%',
		verticalScrollPolicy: 'auto',
		layout: 'vertical',
	    children: [
	        
	        {
				type: 'formitem',
				layout: 'horizontal',						
				label: '产品2名称:',
				labelStyle: 'font-weight:bold;font-size:16px;',
				labelWidth: 100,
				padding: [10,0,0,0],
	            children: [
	                {
	                    type: 'text'
	                }
	        
	            ]
	        },
	        {
	        	type: 'formitem',
				layout: 'horizontal',
	            label: '产品2型号:',
	            labelAlign: 'right',
	            labelStyle: 'font-weight:bold;font-size:16px;',
				labelWidth: 100,
				padding: [10,0,0,0],
	            children: [
	                {
	                    type: 'text'
	                }
	            ]
	        },
	        {
	        	type: 'formitem',
				layout: 'horizontal',
	            label: '公司名称:',
	            labelAlign: 'right',
	            labelStyle: 'font-weight:bold;font-size:16px;',
				labelWidth: 100,
				padding: [10,0,0,0],
	            children: [
	                {
	                    type: 'text'
	                }
	            ]
	        }
	    ]
	    
	});
	var productbox = Edo.create({
		type : 'box',
		layout : 'horizontal',
		border : [0,0,0,0],
		children : [product1,product2]
		
	});
	

	
	
	var mde_home = Edo.create({
		type: 'box',
		border: [0,0,0,0],
		padding: [0,0,20,0],
		width: '100%',
		height: '100%',
		layout: 'horizontal',
		horizontalAlign: 'center', 
		children: [
			
			leftPanel_index,
			middlePanel
//			rightPanel_index
		]
	});
	function noEmpty(v){
	    if(v == "") return "不能为空";
	}
//	benefitBtn.on('click', function(e) {
//		
//		// 验证表单
//		var homebox = Edo.get('homeform');
//		if (homebox.valid()) {
//			var o = homebox.getForm(); // 获取表单值
//			var homeformvalue = Edo.util.Json.encode(o);
//			alert(homeformvalue); //可以用ajax发送到服务端
//			
//		}
//	});
	this.getMdeHome = function(){
		return mde_home;
	}
	
	this.enter = function(){
		mySearchInput.blur();
		search();
		mySearchInput.focus();
	}
	
}

function procuctManage(){
	openNewTab('cims201_product', 'product', '<div class=cims201_tab_font align=center>产品管理</div>', {});
}

function analysis(value){
	var homebox = Edo.get('homeform');
	if (homebox.valid()) {
		var o = homebox.getForm(); // 获取表单值
		var homeformvalue = Edo.util.Json.encode(o);
//		alert(homeformvalue); //可以用ajax发送到服务端
//		alert(Edo.get('p1monumber').getValue());
		var product1Id = Edo.get('p1monumber').getValue();
		var product2Id = Edo.get('p2monumber').getValue();
		if(product1Id != product2Id) {
			cims201.utils.getData('product/mderesult!already.action',{product1Id:product1Id, product2Id:product2Id});
			if(value == 'benefit'){
					openNewTab('indexSelector', 'indexSelect', 
							"<div class=cims201_tab_font align=center>选择指标</div>", {product1Id:product1Id, product2Id:product2Id,btIcon:'cims201_statistics_icon_statisticswhole_small'});
			}else if(value == 'degree'){
//				alert(homeformvalue);
				openNewTab('degreemain', 'degreemain', 
						"<div class=cims201_tab_font align=center>输入程度评价参数</div>", {homeformvalue: homeformvalue,btIcon:'cims201_statistics_icon_statisticswhole_small'});
			}else{
				openNewTab('showMdeResult', 'mdeResult', 
						"<div class=cims201_tab_font align=center>结果输出</div>", {homeformvalue: homeformvalue,btIcon:'cims201_statistics_icon_statisticswhole_small'});
			}
		} else {
			Edo.MessageBox.alert("提示", "请选择两个不同的产品进行评价！");
		}
	}
}