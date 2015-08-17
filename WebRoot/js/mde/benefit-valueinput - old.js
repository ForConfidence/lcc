/**
 * 输入指标值页面
 * @param benefitindexformvalue
 * @param benefitindexweightformvalue
 * @param product1Id
 * @param product2Id
 * @returns {createValueInput}
 */
function createValueInput(benefitindexformvalue,benefitindexweightformvalue,product1Id, product2Id) {
	var objarray = Edo.util.Json.decode(benefitindexformvalue);	
	var indexidarray = new Array();

	var fatherindexbox = Edo.create({
		type: 'box',
		width:'100%',
		//height:'85%',
		layout: 'vertical',	
		horizontalAlign:'center',
		border:[0,0,0,0],
		padding: [15,0,5,0],
		//verticalGap:'5',
		children : []
	});

	var b ;
	objarray.each(function(index){
		if(index.checked != null){
			//将value按__depth排序
			bubblesort(index);
			indexidarray.add(index.id);				
			b = 0;
			
			if(index.__hasChildren != null){
				index.children.each(function(dindex){//判断是否有下级指标选中				
					if(dindex.checked != null){
						b = 1;	
						return false;
					}
				});
				if(b != 0){	//若有下级指标被选中，显示“父+子”
					var fatherLabel = Edo.create({
						type: 'box',
						//id:'fatherindexput',
						layout: 'horizontal',
						horizontalAlign:'center',
						padding: [0,0,0,0],
						border:[0,0,0,0],
						children : [
						            {   type:'label',
						            	text:index.nodeName+":",
						            	style: 'font-weight:bold;font-size:15px',
						            	width: 200,
						            	labelAlign:'center'
						            }

						            ]
					});

					//估算
/*							var estimateput = Edo.create({
						type:'box',
						layout:'horizontal',
						padding: [0,0,0,10],
						border:[0,0,0,0],
						children:[
						          {	
						        	  type:'box',
						        	  layout:'horizontal',
						        	  //horizontalGap:5,
						        	  padding: [0,0,0,0],
						        	  border: [0,0,0,0],
						        	  children:[	
						        	            {	type:'label', 
						        	            	text:'产品1：' ,
						        	            	padding: [0,0,0,0]
						        	            },
						        	            {	type: 'text',  width: 50, id: "567_"+index.id+'/'+product1Id }
						        	            ]
						          },
						          {type:'space', width:10},
						          {	
						        	  type:'box',
						        	  layout:'horizontal',
						        	  //horizontalGap:5,
						        	  padding: [0,0,0,0],
						        	  border: [0,0,0,0],
						        	  children:[	
						        	            {	type:'label', 
						        	            	text:'产品2：' ,
						        	            	padding: [0,0,0,0]
						        	            },
						        	            {	type: 'text',  width: 50, id: "765_"+index.id+'/'+product2Id }
						        	            ]
						          }		
						          ]

					});
*/

/*							var myComboBox = new Edo.controls.ComboBox().set({
						type:'ComboBox',
						valueField:'id',
						displayField:'label',
						width:100,
						data:[
						      {label:'详细计算',id:'detail'},
						      {label:'估算',id:'estimate'}
						      ],
						      onselectionchange: function(e){
						    	  var checked = this.getValue();
						    	  if( checked != "detail"){
						    		  fatherlabelbox.addChild(estimateput);
						    		  if(childindexbox){
						    			  fatherindex.removeChild(childindexbox);

						    		  }
						    	  }else{
						    		  if(estimateput){
						    			  fatherlabelbox.removeChild(estimateput);
						    			  //estimateput.set('visible',false);
						    		  }
						    		  if(childindexbox){
						    			  fatherindex.addChild(childindexbox);
						    		  }
						    	  }
						      }														
					});
*/
					var fatherlabelbox = Edo.create({
						type:'box',
						layout: 'horizontal',	
						border:[0,0,0,0],
						padding: [0,0,0,0],
						children:[
						          {
						        	  type:'box',
						        	  layout: 'horizontal',
						        	  //horizontalAlign:'center',
						        	  padding: [0,0,0,0],
						        	  border:[0,0,0,0],
						        	  children:[
						        	            fatherLabel
//						        	            myComboBox
						        	            ]
						          }				 		          
						          ]
					});

					var fatherindex = Edo.create({
						type:'box',
						layout: 'vertical',	
						border:[0,0,0,0],
						padding: [5,0,5,0],
						//horizontalAlign:'center',
						horizontalAlign:'left',
						children:[
						          fatherlabelbox

						          ]
					});



					var childindexbox = Edo.create({
						type: 'box',
						layout: 'vertical',
						width:'100%',
						hieght:'100%',
						border:[0,0,0,0],
						padding: [0,0,0,160],
						children : [

						            ]
					});
					
					//有下级指标
//					if(index.id!='71',index.id!='72',index.id!='73'){
						index.children.each(function(dindex){
							var c;
							if(dindex.__hasChildren != null & (dindex.checked != null)){
								c = 0;
								dindex.children.each(function(ddindex){//判断是否有下下级指标选中
									if(ddindex.checked != null){
										c = 1;	
										return false;
									}					
								});
								if(c!=0){
									//有下下级指标选中，下级不显示
									return false;

								}else{
									if(dindex.checked != null){
										if(dindex.__depth = (index.__depth + 1)){
											var childindex = Edo.create({
												type: 'box',
												layout: 'horizontal',
												horizontalAlign:'center',
												padding: [0,0,0,0],
												border:[0,0,0,0],
												children : [	
											    {   type:'label',
													text:dindex.nodeName,
													//labelStyle: 'font-weight:bold;font-size:15px',
													width: 200,
													labelAlign:'center'
												},
												{	
													type:'box',
													layout:'horizontal',
													horizontalGap:5,
													padding: [0,0,0,0],
													border: [0,0,0,0],
													children:[	
													          {	type:'label', 
													        	  text:'产品1：' ,
													        	  padding: [0,0,0,0]
													          },
													          {	type: 'text',  width: 50, id: "1234"+dindex.__depth+'_'+dindex.id+'/'+product1Id , valid: validNumble}
													          ]
												},
												{type:'space', width:10},
												{
													type:'box',
													layout:'horizontal',
													horizontalGap:5,
													padding: [0,0,0,0],
													border: [0,0,0,0],
													children:[	
													          {	type:'label', 
													        	  text:'产品2：' ,
													        	  padding: [0,0,0,0]
													          },
													          {	type: 'text',  width: 50, id: "4321"+dindex.__depth+'_'+dindex.id+'/'+product2Id , valid: validNumble}
													          ]
												}
												]
											});							
											childindexbox.addChild(childindex);
											fatherindex.addChild(childindexbox);													
										}
									}
								}
							}

							/*							if(dindex.checked != null){
								if(dindex.__depth = (index.__depth + 1)){
									var childindex = Edo.create({
								 		type: 'box',
										layout: 'horizontal',
										horizontalAlign:'center',
										padding: [0,0,0,0],
										border:[0,0,0,0],
										children : [	{   type:'label',
											            	text:dindex.nodeName,
															//labelStyle: 'font-weight:bold;font-size:15px',
															width: 200,
															labelAlign:'center'
														},
														{	
															type:'box',
															layout:'horizontal',
															horizontalGap:5,
															padding: [0,0,0,0],
															border: [0,0,0,0],
															children:[	
															          	{	type:'label', 
																			text:'产品1：' ,
																			padding: [0,0,0,0]
															          	},
																	    {	type: 'text',  width: 50, id: "1234"+dindex.__depth+'_'+dindex.id+'/'+product1Id , valid: validNumble}
															          	]
														},
														{type:'space', width:10},
														{
															type:'box',
															layout:'horizontal',
															horizontalGap:5,
															padding: [0,0,0,0],
															border: [0,0,0,0],
															children:[	
															          	{	type:'label', 
																			text:'产品2：' ,
																			padding: [0,0,0,0]
															          	},
																	   {	type: 'text',  width: 50, id: "4321"+dindex.__depth+'_'+dindex.id+'/'+product2Id , valid: validNumble}
															          	]
														}
										]
									});							
									childindexbox.addChild(childindex);
									fatherindex.addChild(childindexbox);													
								}
							}*/

						});
//					}
					fatherindexbox.addChild(fatherindex);			
				}else{
					
					var fatherLabel = Edo.create({
						type: 'box',
						//id:'fatherindexput',
						layout: 'horizontal',
						horizontalAlign:'center',
						padding: [0,0,0,0],
						border:[0,0,0,0],
						children : [
						            {   type:'label',
						            	text:index.nodeName+":",
						            	style: 'font-weight:bold;font-size:15px',
						            	width: 200,
						            	labelAlign:'center'
						            },
						            {	
										type:'box',
										layout:'horizontal',
										horizontalGap:5,
										padding: [0,0,0,0],
										border: [0,0,0,0],
										children:[	
										          	{	type:'label', 
														text:'产品1：' ,
														padding: [0,0,0,0]
										          	},
												    {	type: 'text',  width: 50, id: "567_"+index.id+'/'+product1Id, valid: validNumble}
										          	]
									},
									{type:'space', width:10},
									{
										type:'box',
										layout:'horizontal',
										horizontalGap:5,
										padding: [0,0,0,0],
										border: [0,0,0,0],
										children:[	
										          	{	type:'label', 
														text:'产品2：' ,
														padding: [0,0,0,0]
										          	},
												   {	type: 'text',  width: 50, id: "765_"+index.id+'/'+product2Id, valid: validNumble}
										          	]
									}

						            ]
					});

			
					var fatherlabelbox = Edo.create({
						type:'box',
						layout: 'horizontal',	
						border:[0,0,0,0],
						padding: [0,0,0,0],
						children:[
						          {
						        	  type:'box',
						        	  layout: 'horizontal',
						        	  //horizontalAlign:'center',
						        	  padding: [0,0,0,0],
						        	  border:[0,0,0,0],
						        	  children:[
						        	            fatherLabel
						        	            ]
						          }				 		          
						          ]
					});

					var fatherindex = Edo.create({
						type:'box',
						layout: 'vertical',	
						border:[0,0,0,0],
						padding: [5,0,5,0],
						//horizontalAlign:'center',
						horizontalAlign:'left',
						children:[
						          fatherlabelbox

						          ]
					});

					fatherindexbox.addChild(fatherindex);
				}
			}
		}
	});



	var buttons = Edo.create({
		type: 'box',
		width: '100%',
		height: '5%',
		layout: 'horizontal', 
		horizontalAlign:'center',
		border:[0,0,0,0],
		children:[
		          {
		        	  type: 'button',
		        	  text: '上一步',
		        	  onclick: function(e){
		        		  openNewTab('weightInput', 'weightInput', 
		        				  "<div class=cims201_tab_font align=center>分配权重</div>", {benefitindexformvalue: benefitindexformvalue,product1Id: product1Id, product2Id: product2Id,btIcon:'cims201_statistics_icon_statisticswhole_small'});
		        	  }
		          },
		          {
		        	  type: 'button',
		        	  text: '下一步',
		        	  onclick: function(e){
		        		  // 验证表单
		        		  if (valueInput.valid()){										 
		        			  var o = valueInput.getForm(); // 获取表单值
		        			  var benefitindexvalueformvalue = Edo.util.Json.encode(o);	
		        			  //benefitindexformvalue只传指标的id
		        			  var benefitindexformvalue = Edo.util.Json.encode(indexidarray);
		        			  //保存指标、权重、值
		        			  cims201.utils.getData_Async('product/mderesult!saveBenefitEvaluateResult.action', {
		        				  benefitindexformvalue:benefitindexformvalue,benefitindexweightformvalue:benefitindexweightformvalue,benefitindexvalueformvalue:benefitindexvalueformvalue,product1Id: product1Id, product2Id: product2Id
		        			  },function(text){
		        				  cims201.utils.getData_Async('product/mderesult!countBenefit.action',{product1Id: product1Id, product2Id: product2Id},function(text){
		        					  cims201.utils.getData_Async('product/mderesult!getBenefitResult.action',{product1Id: product1Id, product2Id: product2Id},function(text){
		        						  var data = Edo.util.Json.decode(text);
		        						  openNewTab('benefitResult', 'benefitResult', 
		        								  "<div class=cims201_tab_font align=center>评价结果</div>", {data: data,btIcon:'cims201_statistics_icon_statisticswhole_small'});
		        					  });
		        				  });
		        			  });
		        		  }else{
		        			  Edo.MessageBox.alert("提示", "请输入两个产品的指标值！");
		        		  }
		        	  }

		          }
		          ]		
	});

	var valueInput = 
		Edo.create({
			type:'box',
			border : [0,0,0,0],
			padding : [0,0,0,0],
			height: '100%',
			width: '100%',	
			layout:'vertical',
			//horizontalAlign:'center',
			verticalGap:'5',
			children:[
			          {
			        	  type: 'panel',
			        	  title:'<span class="cims201_con_font">效益评价指标值</span>',
			        	  border : [1,1,1,1],
			        	  padding : [10,0,0,15],
			        	  height: '95%',
			        	  width: '100%',
			        	  verticalScrollPolicy: 'on',
			        	  //horizontalScrollPolicy: 'on',
			        	  layout: 'vertical',
			        	  verticalGap:'5',
			        	  horizontalAlign:'center',
			        	  children: [
			        	             {
			        	            	 type: 'box',
			        	            	 //height: '10%',
			        	            	 layout: 'horizontal',
			        	            	 horizontalAlign:'center',
			        	            	 border : [0,0,0,0],
			        	            	 padding : [20,0,0,0],
			        	            	 children : [
			        	            	             {	type: 'label', height:20,style: 'font-weight:bold;font-size:20px', text: '模块化设计效益评价指标值'},
			        	            	             {	type: 'label', style: 'font-Size:20px', text: '（请输入指标值）'}							
			        	            	             ]
			        	             },
			        	             fatherindexbox	
			        	             ]
			          },
			          buttons
			          ]
		});


	this.getValueInput = function() {
		return valueInput;
	};

}


function bubblesort(value){
	var temp = 0;
	for(var i=0;i<value.length-1;i++){
		for(var j=0;j<value.length-1-i;j++){
			if(value[j+1].__depth < value[j].__depth){
				temp = value[j];
				value[j] = value[j+1];
				value[j+1] = temp;
			}
		}
	}
}