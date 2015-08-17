function createDegree(product1Id, product2Id) {
	
	var buttons = Edo.create({
		type: 'box',
		width: '100%',
		//height:'5%',
	    layout: 'horizontal', 
	    horizontalAlign:'center',
	    //verticalAlign:'bottom',
	    border:[0,0,0,0],
		children:[
					{
						 type: 'button',
						 text: '重置',
						 width:45,
						 onclick: function(e){
							 degreebox.reset();
						 }
						},
						{
							 type: 'button',
							 text: '下一步',
							 width:45,
							 onclick: function(e){
									// 验证表单
									if (degreebox.valid()) {
										var o = degreebox.getForm(); // 获取表单值
										var degreeformvalue = Edo.util.Json.encode(o);
//										alert(degreeformvalue); //可以用ajax发送到服务端
										cims201.utils.getData_Async('product/product!countDegreeAndSave.action',{degreeformvalue: degreeformvalue, product1Id:product1Id, product2Id: product2Id},function(text){
											var data = Edo.util.Json.decode(text);
											openNewTab('degreeResult', 'degreeResult', 
													"<div class=cims201_tab_font align=center>程度评价结果</div>", {data: data,btIcon:'cims201_statistics_icon_statisticswhole_small'});
										});
									}
							  }
						}
		]				
	});
	
	var degreebox = Edo.create({
		type:'box',
		border : [0,0,0,0],
		padding : [0,0,0,0],
		height: '100%',
		width: '100%',	
		layout:'vertical',
		verticalGap:'5',
		children:[
		          
		  		{
		  		type: 'panel',
		        title:'<span class="cims201_con_font">输入程度评价参数</span>',
				border : [0,0,0,0],
				padding : [30,0,0,20],
				//height: '80%',
				width: '100%',
				//verticalScrollPolicy: 'on',
				//horizontalScrollPolicy: 'on',
				layout: 'vertical',
				verticalGap:'5',
				horizontalAlign:'center',
				children: [
				           		{	type: 'label',									
				           			width: 280, 
				           			height:35,
				           			horizontalAlign:'center',
				           			style: 'font-weight:bold;font-size:30px', 
				           			text: '模块化设计程度评价'
				           		},
				           		{
								type: 'box',
								layout: 'vertical',	
								padding: [20,0,0,0],
								border : [0,0,0,0],
								horizontalAlign:'center',
								children : [
											{	type: 'formitem', 
												children:[
													       {
													    	   type: 'box', layout:'horizontal',border : [0,0,0,0],horizontalAlign:'center',
													    	   children : [
													    	               {
													    	            	   type : 'label',
													    	            	   text : '模块独立性分析',
													    	            	   style : 'font-weight:bold;font-size:15px',
													    	            	   width : 140
													    	               },
																			{
																				type: 'formitem',label: '产品一:',labelWidth: 55,
																				children:[{type: 'text', width: 60, id: 'degree_1', valid: validNumble}]
																			},
																			{type: 'space', width: 30},
																			{
																				type: 'formitem',label: '产品二:',labelWidth: 55,
																				children:[{type: 'text', width: 60, id: 'degree_2', valid: validNumble}]
																			},
																			{type: 'space', width: 30},
																			{
																				type: 'formitem',label: '权 重:',labelWidth: 45,
																				children:[{type: 'text', width: 60, id: 'degree_11', valid: validWeight}]
																			}
													    	               ]
													    	}
											       		]
											},{	type: 'formitem', 
												children:[
													       {
													    	   type: 'box', layout:'horizontal',border : [0,0,0,0],horizontalAlign:'center',
													    	   children : [
													    	               {
													    	            	   type : 'label',
													    	            	   text : '模块可重用性分析',
													    	            	   style : 'font-weight:bold;font-size:15px',
													    	            	   width : 140
													    	               },
																			{
																				type: 'formitem',label: '产品一:',labelWidth: 55,
																				children:[{type: 'text', width: 60, id: 'degree_3', valid: validNumble}]
																			},
																			{type: 'space', width: 30},
																			{
																				type: 'formitem',label: '产品二:',labelWidth: 55,
																				children:[{type: 'text', width: 60, id: 'degree_4', valid: validNumble}]
																			},
																			{type: 'space', width: 30},
																			{
																				type: 'formitem',label: '权 重:',labelWidth: 45,
																				children:[{type: 'text', width: 60, id: 'degree_12', valid: validWeight}]
																			}
													    	               ]
													    	}
											       		]
											},{	type: 'formitem', 
												children:[
													       {
													    	   type: 'box', layout:'horizontal',border : [0,0,0,0],horizontalAlign:'center',
													    	   children : [
													    	               {
													    	            	   type : 'label',
													    	            	   text : '模块封装性分析',
													    	            	   style : 'font-weight:bold;font-size:15px',
													    	            	   width : 140
													    	               },
																			{
																				type: 'formitem',label: '产品一:',labelWidth: 55,
																				children:[{type: 'text', width: 60, id: 'degree_5', valid: validNumble}]
																			},
																			{type: 'space', width: 30},
																			{
																				type: 'formitem',label: '产品二:',labelWidth: 55,
																				children:[{type: 'text', width: 60, id: 'degree_6', valid: validNumble}]
																			},
																			{type: 'space', width: 30},
																			{
																				type: 'formitem',label: '权 重:',labelWidth: 45,
																				children:[{type: 'text', width: 60, id: 'degree_13', valid: validWeight}]
																			}
													    	               ]
													    	}
											       		]
											},{	type: 'formitem', 
												children:[
													       {
													    	   type: 'box', layout:'horizontal',border : [0,0,0,0],horizontalAlign:'center',
													    	   children : [
													    	               {
													    	            	   type : 'label',
													    	            	   text : '模块可靠性分析',
													    	            	   style : 'font-weight:bold;font-size:15px',
													    	            	   width : 140
													    	               },
																			{
																				type: 'formitem',label: '产品一:', labelWidth: 55,
																				children:[{type: 'text', width: 60, id: 'degree_7', valid: validNumble}]
																			},
																			{type: 'space', width: 30},
																			{
																				type: 'formitem',label: '产品二:',labelWidth: 55,
																				children:[{type: 'text', width: 60, id: 'degree_8', valid: validNumble}]
																			},
																			{type: 'space', width: 30},
																			{
																				type: 'formitem',label: '权 重:',labelWidth: 45,
																				children:[{type: 'text', width: 60, id: 'degree_14', valid: validWeight}]
																			}
													    	               ]
													    	}
											       		]
											},{	type: 'formitem', 
												children:[
													       {
													    	   type: 'box', layout:'horizontal',border : [0,0,0,0],horizontalAlign:'center',
													    	   children : [
													    	               {
													    	            	   type : 'label',
													    	            	   text : '接口集成性分析',
													    	            	   style : 'font-weight:bold;font-size:15px',
													    	            	   width : 140
													    	               },
																			{
																				type: 'formitem',label: '产品一:',labelWidth: 55,
																				children:[{type: 'text', width: 60, id: 'degree_9', valid: validNumble}]
																			},
																			{type: 'space', width: 30},
																			{
																				type: 'formitem',label: '产品二:',labelWidth: 55,
																				children:[{type: 'text', width: 60, id: 'degree_10', valid: validNumble}]
																			},
																			{type: 'space', width: 30},
																			{
																				type: 'formitem',label: '权 重:',labelWidth: 45,
																				children:[{type: 'text', width: 60, id: 'degree_15', valid: validWeight}]
																			}
													    	               ]
													    	}
											       		]
											}
								]
							}
				          ]
		  		},
		  		buttons		          
		          ]
	});
		
		

	function noEmpty(v){
	    if(v == "") return "不能为空";
	}
	this.getDegree = function() {
		return degreebox;
	}
	

}
