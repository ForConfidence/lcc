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
			//将value按__depth排序,从最上层到下层排序
			bubblesort(index);
			indexidarray.add(index.id);			
		}
		if(index.id == "71" || (index.id == "72")){
			b = 0;
			if(index.__hasChildren != null){

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
					            	style: 'font-weight:bold;font-size:18px',
					            	width: 220,
					            	labelAlign:'center'
					            }

					            ]
				});

				//估算
				/*					var estimateput = Edo.create({
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
//					        	            myComboBox
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


				index.children.each(function(dindex){//判断是否有下级指标选中				
					if(dindex.checked != null){
						b = 1;	
						return false;
					}
				});
				if(b != 0){	//有二级指标被选中
//					alert("当前指标："+index.nodeName+"有二级指标");
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

					index.children.each(function(dindex){
						
						var childindexLabel = Edo.create({
							type: 'box',
							layout: 'horizontal',
							horizontalAlign:'center',
							padding: [0,0,0,0],
							border:[0,0,0,0],
							children : [	
							            {   type:'label',
							            	text:dindex.nodeName,
							            	style: 'font-weight:bold;font-size:15px',
							            	width: 240,
							            	labelAlign:'center'
							            }
							            ]
						});		

						
						var childindex = Edo.create({
							type:'box',
							layout: 'vertical',	
							border:[0,0,0,0],
							padding: [5,0,5,0],
							//horizontalAlign:'center',
							horizontalAlign:'left',
							children:[
							          	childindexLabel
							          ]
						});
						
						var c;
						if(dindex.__hasChildren != null & (dindex.checked != null)){
							c = 0;
							dindex.children.each(function(ddindex){//判断是否有三级指标选中
								if(ddindex.checked != null){
									c = 1;	
									return false;
								}					
							});
							if(c!=0){//有 三级指标选中								
								
								var dchildindexbox = Edo.create({
									type: 'box',
									layout: 'vertical',
									width:'100%',
									hieght:'100%',
									border:[0,0,0,0],
									padding: [0,0,0,160],
									children : [
									            
									            ]
								});
								
								if(dindex.__depth = (index.__depth + 1)){
									dindex.children.each(function(ddindex){
										
										if(ddindex.__depth = (dindex.__depth + 1) & (ddindex.checked!=null)){
//											alert("二级指标"+dindex.nodeName+"有三级指标："+ddindex.nodeName);
											
											var dchildindexLabel = Edo.create({
												type: 'box',
												layout: 'horizontal',
												horizontalAlign:'center',
												padding: [0,0,0,0],
												border:[0,0,0,0],
												children : [	
												            {   type:'label',
												            	text:ddindex.nodeName,
												            	style: 'font-weight:bold;font-size:15px',
												            	width: 220,
												            	labelAlign:'center'
												            }
												            ]
											});		

											
											var dchildindex = Edo.create({
												type:'box',
												layout: 'vertical',	
												border:[0,0,0,0],
												padding: [5,0,5,0],
												//horizontalAlign:'center',
												horizontalAlign:'left',
												children:[
												          	dchildindexLabel
												          ]
											});
											
											//判断是否有四级指标选中
											var d;
											if(ddindex.__hasChildren != null & (ddindex.checked != null)){
												d = 0;
												ddindex.children.each(function(dddindex){//判断是否有四级指标选中
													if(dddindex.checked != null){
														d = 1;	
														return false;
													}					
												});
												if(d!=0){//有 四级指标选中	
													
													
													var ddchildindexbox = Edo.create({
														type: 'box',
														layout: 'vertical',
														width:'100%',
														hieght:'100%',
														border:[0,0,0,0],
														padding: [0,0,0,160],
														children : [
														            
														            ]
													});
													
													if(ddindex.__depth = (dindex.__depth + 1)){
														ddindex.children.each(function(dddindex){
//															alert("产品一"+dddindex.__depth+'_'+dddindex.id+'/'+product1Id);
//															alert("产品二"+dddindex.__depth+'_'+dddindex.id+'/'+product2Id);
															if(dddindex.__depth = (ddindex.__depth + 1) && (dddindex.checked!=null)){
																var ddchildindex = Edo.create({
																	type: 'box',
																	layout: 'horizontal',
																	horizontalAlign:'center',
																	padding: [0,0,0,0],
																	border:[0,0,0,0],
																	children : [	
																	            {   type:'label',
																	            	text:dddindex.nodeName,
																	            	//style: 'font-weight:bold;font-size:15px',
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
																	            	          {	type: 'text',  width: 50, id: dddindex.__depth+'_'+dddindex.id+'/'+product1Id , valid: validNumble}
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
																	            	          {	type: 'text',  width: 50, id: dddindex.__depth+'_'+dddindex.id+'/'+product2Id , valid: validNumble}
																	            	          ]
																	            }
																	            ]
																});		

																ddchildindexbox.addChild(ddchildindex);
															}
														});
														dchildindex.addChild(ddchildindexbox);
													}

												
												}else{
//													alert(ddindex.__depth+'_'+ddindex.id+'/'+product1Id);
//													alert(ddindex.__depth+'_'+ddindex.id+'/'+product2Id);
													var indexinput = Edo.create({
														type:'box',
														layout:'horizontal',
														padding: [0,0,0,10],
														border:[0,0,0,0],
														children:[
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
														            	          {	type: 'text',  width: 50, id: ddindex.__depth+'_'+ddindex.id+'/'+product1Id , valid: validNumble}
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
														            	          {	type: 'text',  width: 50, id: ddindex.__depth+'_'+ddindex.id+'/'+product2Id , valid: validNumble}
														            	          ]
														            }
														          ]

													});
													
													dchildindexLabel.addChild(indexinput);
												
												}
												dchildindexbox.addChild(dchildindex);
												childindex.addChild(dchildindexbox);
											}
										}
									});
								}

							}else{//没有三级指标选中，显示该层指标和下级指标（带输入框）
//								alert(dindex.nodeName+"二级指标"+dindex.nodeName+"没有三级指标");
								if(dindex.__depth = (index.__depth + 1)){
//									alert(dindex.__depth+'_'+dindex.id+'/'+product1Id);
//									alert(dindex.__depth+'_'+dindex.id+'/'+product2Id);
									var indexinput = Edo.create({
										type:'box',
										layout:'horizontal',
										padding: [0,0,0,10],
										border:[0,0,0,0],
										children:[
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
														          {	type: 'text',  width: 50, id: dindex.__depth+'_'+dindex.id+'/'+product1Id , valid: validNumble}
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
														          {	type: 'text',  width: 50, id: dindex.__depth+'_'+dindex.id+'/'+product2Id , valid: validNumble}
														          ]
													}
										          ]

									});
									
									childindexLabel.addChild(indexinput);
//									childindexbox.addChild(childindex);
//									fatherindex.addChild(childindexbox);		
								}
							}
							childindexbox.addChild(childindex);
							fatherindex.addChild(childindexbox);	
						}
							
					});

				}else{
//					alert("当前指标："+index.nodeName+":没有二级指标");
					//若没有下级指标，显示该指标+输入框
//					alertindex.id+'/'+product1Id);
//					alert(index.id+'/'+product2Id);
					var indexinput = Edo.create({
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
						        	            {	type: 'text',  width: 50, id: index.id+'/'+product1Id }
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
						        	            {	type: 'text',  width: 50, id: index.id+'/'+product2Id }
						        	            ]
						          }		
						          ]

					});

					fatherlabelbox.addChild(indexinput);

				}

				fatherindexbox.addChild(fatherindex);
			}
		}
	});



	var buttons = Edo.create({
		type: 'box',
		width: '100%',
		height: '8%',
		layout: 'horizontal', 
		horizontalAlign:'center',
		border:[0,0,0,0],
		children:[
					{
						 type: 'button',
						 text: '演示值',
						 onclick: function(e){
							 	Edo.get('true_9/1').setValue('110');
							 	Edo.get('true_9/2').setValue('94');
							 	Edo.get('true_11/1').setValue('50');
							 	Edo.get('true_11/2').setValue('54');
							 	Edo.get('true_13/1').setValue('405');
							 	Edo.get('true_13/2').setValue('360');
							 	Edo.get('true_14/1').setValue('200');
							 	Edo.get('true_14/2').setValue('155');
							 	Edo.get('true_15/1').setValue('75');
							 	Edo.get('true_15/2').setValue('90');
							 	Edo.get('true_24/1').setValue('21');
							 	Edo.get('true_24/2').setValue('18');
							 	Edo.get('true_27/1').setValue('7');
							 	Edo.get('true_27/2').setValue('7');
							 	Edo.get('true_35/1').setValue('8512.3');
							 	Edo.get('true_35/2').setValue('7431.02');
							 	Edo.get('true_36/1').setValue('10240458');
							 	Edo.get('true_36/2').setValue('11414483');
							 	Edo.get('true_37/1').setValue('324562.3');
							 	Edo.get('true_37/2').setValue('205964.81');
							 	Edo.get('true_38/1').setValue('7652120.5');
							 	Edo.get('true_38/2').setValue('8535902');
							 	Edo.get('true_41/1').setValue('548365.2');
							 	Edo.get('true_41/2').setValue('556276.7');
							 	Edo.get('true_49/1').setValue('40');
							 	Edo.get('true_49/2').setValue('40');
							 	Edo.get('true_53/1').setValue('1');
							 	Edo.get('true_53/2').setValue('1');
							 	Edo.get('true_59/1').setValue('36.2');
							 	Edo.get('true_59/2').setValue('47.3');
							 	Edo.get('true_62/1').setValue('12256');
							 	Edo.get('true_62/2').setValue('13103');
						 	
						 }
					},
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
			        	  height: '90%',
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