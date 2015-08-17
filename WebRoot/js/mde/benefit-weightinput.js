/**
指标权重分配（输入）页面
*/
function createBenefitWeightInput(benefitindexformvalue, product1Id, product2Id){
	//alert(benefitindexformvalue);
	var objarray = Edo.util.Json.decode(benefitindexformvalue);	
	
	var fatherindexbox = Edo.create({
		type: 'box',
		//width:'100%',
		//height:'85%',
		layout: 'vertical',	
		border:[0,0,0,0],
		padding: [10,5,5,5],
		verticalGap:'5',
		children : []
	});
	
	
	if(objarray != null){
		var b ;
		objarray.each(function(index){
			//将value按__depth排序
			bubblesort(index);
			if(index.__hasChildren != null & (index.checked != null)){
				b = 0;
				//判断是否有子指标被选中，如果没有，跳出		
				index.children.each(function(dindex){				
					if(dindex.checked != null){
						b = 1;	
						return false;
					}					
				});
				if(b != 0){
					var fatherindex = Edo.create({
				 		type:'box',
				 		layout: 'vertical',	
				 		border:[0,0,0,0],
						padding: [5,0,5,0],
				 		children:[
				 		          {
										type: 'formitem',									
										layout: 'horizontal',
										horizontalAlign:'left',
										padding: [0,0,0,0],
										label: index.nodeName+":",
										labelStyle: 'font-weight:bold;font-size:15px',
										labelWidth: 200,
										children : [
										            {	type: 'text', 	width: 50 , text:'1.0', id: '_'+index.id, valid:validWeight}
										            ]
				 		          }
						]
					});
					var childindexbox = Edo.create({
						type: 'box',
						width:'100%',
						hieght:'100%',
						layout: 'horizontal',
						border:[0,0,0,0],
						padding: [0,0,0,0],
						children : [
						            
						            ]
					});
					index.children.each(function(dindex){
						if(dindex.checked != null){
							if(dindex.__depth = (index.__depth + 1)){
								//如果index节点已经有输入框了，删除
								childindexbox.removeChild();
								var childindex = Edo.create({
							 		type: 'formitem',
									layout: 'horizontal',	
									padding: [0,0,0,0],
									label: dindex.nodeName,
									//labelStyle: 'font-weight:bold;font-size:15px',
									labelWidth: 180,
									labelAlign:'center',
									children : [							            
										{	type: 'text', width: 50, id: dindex.__depth+'_'+dindex.id , valid:validWeight}
									]
								});
								
								
								childindexbox.addChild(childindex);
								fatherindex.addChild(childindexbox);													
							}
						}
						
						
					});
					
					fatherindexbox.addChild(fatherindex);
				}
			
			}
		});
	}


	var buttons = Edo.create({
		type: 'box',
		width: '100%',
		height:'8%',
	    layout: 'horizontal', 
	    horizontalAlign:'center',
	    //verticalAlign:'bottom',
	    border:[0,0,0,0],
		children:[
		               {
			            	 type: 'button',
							 text: '推荐值',
							 onclick: function(e){
								 	Edo.get('2_1').setValue('0.3');
									Edo.get('2_2').setValue('0.26');
									Edo.get('2_3').setValue('0.24');
									Edo.get('2_4').setValue('0.1');
									Edo.get('2_5').setValue('0.1');
									
									Edo.get('3_6').setValue('0.5');
									Edo.get('3_7').setValue('0.5');
									
									Edo.get('4_9').setValue('0.7');
									Edo.get('4_11').setValue('0.3');
									Edo.get('4_13').setValue('0.3');
									Edo.get('4_14').setValue('0.3');
									Edo.get('4_15').setValue('0.4');
									
									Edo.get('3_20').setValue('0.5');
									Edo.get('3_21').setValue('0.5');
									
									Edo.get('4_24').setValue('1');
									Edo.get('4_27').setValue('1');
									
									Edo.get('3_32').setValue('0.7');
									Edo.get('3_33').setValue('0.3');
									
									Edo.get('4_35').setValue('0.1');
									Edo.get('4_36').setValue('0.3');
									Edo.get('4_37').setValue('0.6');
									Edo.get('4_38').setValue('0.45');
									Edo.get('4_41').setValue('0.55');
									
									Edo.get('3_45').setValue('0.4');
									Edo.get('3_46').setValue('0.6');
									
									Edo.get('4_49').setValue('1');
									Edo.get('4_53').setValue('1');
									
									Edo.get('3_54').setValue('0.5');
									Edo.get('3_56').setValue('0.5');
									
									Edo.get('4_59').setValue('1');
									Edo.get('4_62').setValue('1');
									
//									for(var i=6;i<=65;i++) {
//										if(Edo.get('_'+i) != null)
//											Edo.get('_'+i).setValue(((Math.random()/3+0.1)+'').substring(0,4));
//									}
						 	 }
		               },
					   {
						 type: 'button',
						 text: '上一步',
						 onclick: function(e){
							 openNewTab('indexSelector', 'indexSelect', 
										"<div class=cims201_tab_font align=center>选择指标</div>", {product1Id:product1Id, product2Id:product2Id,btIcon:'cims201_statistics_icon_statisticswhole_small'});
						 }
						},
						{
							 type: 'button',
							 text: '下一步',
							 onclick: function(e){
								 // 验证表单
								 if (weightInput.valid()){
										var o = weightInput.getForm(); // 获取表单值
										var benefitindexweightformvalue = Edo.util.Json.encode(o);
										//alert(benefitindexweightformvalue); //可以用ajax发送到服务端
										//保存指标权重
		//									cims201.utils.getData('product/mderesult!saveBenefitIndexWeight.action', {
		//										benefitindexformvalue:benefitindexformvalue,benefitindexweightformvalue: benefitindexweightformvalue,product1Id: product1Id, product2Id: product2Id
		//									});
										openNewTab('valueInput', 'valueInput', 
												"<div class=cims201_tab_font align=center>输入指标值</div>", {benefitindexformvalue:benefitindexformvalue,benefitindexweightformvalue: benefitindexweightformvalue,product1Id: product1Id, product2Id: product2Id,btIcon:'cims201_statistics_icon_statisticswhole_small'});
									 }else{
										 Edo.MessageBox.alert("提示", "请给指标赋予权重！");
									 }
							  }
						}
		]				
	});
	
	var weightInput = 
		Edo.create({
			type:'box',
			border : [0,0,0,0],
			padding : [0,0,0,0],
			height: '100%',
			width: '100%',	
			layout:'vertical',
			horizontalAlign:'center',
			verticalGap:'5',
			children:[
						{
							type: 'panel',
					        title:'<span class="cims201_con_font">效益评价指标权重</span>',
							border : [1,1,1,1],
							padding : [10,0,20,0],
							height: '90%',
							width: '100%',
							verticalScrollPolicy: 'on',
							horizontalScrollPolicy: 'on',
							layout: 'vertical',
							verticalGap:'5',
							horizontalAlign:'left',
							children: [
								{
									type: 'box',
									//height: '10%',
									layout: 'horizontal',
									horizontalAlign:'center',
									border : [0,0,0,0],
									padding : [15,0,0,400],
									children : [
										{	type: 'label',  height:20, style: 'font-weight:bold;font-size:20px', text: '模块化设计效益评价指标权重'},
										{	type: 'label',  style: 'font-Size:20px', text: '（请为指标分配权重）'}							
									]
								},
								fatherindexbox
									]
							},
							buttons
			]
		});
	
	
	
	this.getWeightInput = function() {
		return weightInput;
	};

}
/*输入值只能为数字或小数点*/
function validNumble(v){
	
	var i,j,strTemp;     
	strTemp="0123456789.";     

	if ( v.length== 0){		
		return "不能为空！";   
	}     
	for (i=0;i<v.length;i++){     
		j=strTemp.indexOf(v.charAt(i));     
		if (j==-1){     
			//说明有字符不是数字     
			return "请输入数值！";

		}     

	}     	
}

/*权重输入值<=1*/
function validWeight(v){
	
	var i,j,strTemp;     
	strTemp="0123456789.";     

//	if ( v.length== 0){		
//		return "不能为空！";   
//	}     
	for (i=0;i<v.length;i++){     
		j=strTemp.indexOf(v.charAt(i));     
		if (j==-1){     
			//说明有字符不是数字     
			return "请输入数值！";
		}     

	} 
//	if(parseFloat(v) > 1.0){
//		return "权重必须小于或等于1！";
//	}
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

