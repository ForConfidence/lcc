
function getstepfive(){
	var fileuploadbox = Edo.build(
		
		    {type: 'box',
	    	width: 1100,
	    	height:'100%',
	    	border: [0,0,0,0],
	    	padding: [0,0,0,0],
	    	layout: 'vertical',
	    	verticalGap:'0',
	    	/*verticalAlign:'middle',
	    	horizontalAlign:'center',*/
	    	//style: 'background:white;',
	   	    children: [
				{type: 'panel',title:'步骤说明',width: '100%',layout: 'horizontal',border: [0,0,0,0],padding: [0,0,0,0],
						children:[     
				   	        {type:'textarea',
				   	        width:'100%',
			   	        	height:60,
			   	            style:  'font-size:20px;font-family:verdana;font-weight:bold;border:0;background:rgba(0,0,0,0);',
			   	        	text:'根据目标和范围定义，对所进行的LCA研究系统定义相关计算方案信息，以支持后续的计算抉择，保证研究对象的前后一致性！'
				   	        }]
				},      
	       	    
				{type: 'panel',id:'newproject',title:'请填写计算方案信息',width: '100%',height:'100%',layout: 'vertical',border: [0,0,1,0],padding: [10,0,0,10],
					children:[
					          {
                            	    type: 'formitem',
                            	    label: '计算方案名称(<span style="color:red;">*</span>):',
                            	    labelWidth: 180,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'650',
                            	            id: 'projectname', 
                            	            valid: noEmpty,
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '执行单位及人员(<span style="color:red;">*</span>):',
                            	    labelWidth: 180,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'650',
                            	            id: 'companyname', 
                            	            valid: noEmpty,
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '计算目标及应用目的:',
                            	    labelWidth: 180,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'650',
                            	            id: 'forwardgoal'
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '计算模板:',
                            	    labelWidth: 180,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'650',
                            	            id: 'modulename',
                            	            text:newalldata.modulename
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '计算方案描述:',
                            	    labelWidth: 180,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'650',
                            	            id: 'projectdesc'
                            	        }
                            	    ]
                               },
                               {
                            	    type: 'formitem',
                            	    label: '选择环境影响评价方法:',
                            	    labelWidth: '180',
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'radiogroup',
                            	            id: 'calcumethod',
                            	            width:'650',
                            	            repeatDirection: 'horizontal',
                            	            repeatItems: 4,
                            	            data: [
                            	                {text: 'CML (baseline)', value: 1, checked: true},
                            	                {text: 'CML (non baseline)', value: 2},
                            	                {text: 'Cumulative Energy Demand', value: 3},
                            	                {text: 'eco-indicator 99 (E)', value: 4},
                            	                {text: 'eco-indicator 99 (H)', value: 5},
                            	                {text: 'eco-indicator 99 (I)', value: 6},
                            	                {text: 'Ecological Scarcity Method 2006', value: 7},
                            	                {text: 'ILCD 2011, endpoint', value: 8},
                            	                {text: 'ILCD 2011, midpoint', value: 9},
                            	                {text: 'ReCiPe Endpoint (E)', value: 10},
                            	                {text: 'ReCiPe Endpoint (H)', value: 11},
                            	                {text: 'ReCiPe Endpoint (I)', value: 12},
                            	                {text: 'ReCiPe Midpoint (E)', value: 13},
                            	                {text: 'ReCiPe Midpoint (H)', value: 14},
                            	                {text: 'ReCiPe Midpoint (I)', value: 15},
                            	                {text: 'TRACI 2.1', value: 16},
                            	                {text: 'USEtox', value: 17}
                            	            ]
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '选择环境影响类别(<span style="color:red;">*</span>):',
                            	    labelWidth: 180,
                            	    style: 'background:#ccc',
                            	   
                            	    children:[
                            	                {type: 'checkgroup', 
                            	                 id: 'impactcategory',              
                            	                 repeatDirection: 'horizontal',
                            	                 width:'650',
                                                 repeatItems:'5',
                            	                 valueField: 'text',
                            	                    data: [
                            	                        {text: '全球气候变化',value: 1 },
                            	                        {text: '臭氧层破坏', value: 2},
                            	                        {text: '生态毒性-淡水', value: 3},
                            	                        {text: '人体毒性-癌症', value: 4},
                            	                        {text: '人体毒性-非癌症', value: 5},
                            	                        {text: '可吸入无机物', value: 6},
                            	                        {text: '电离辐射-人体健康',value: 7 },
                            	                        {text: '光化学臭氧合成',value: 8 },
                            	                        {text: '酸化', value: 9},
                            	                        {text: '富营养化-陆地',value: 10 },
                            	                        {text: '富营养化-水体',value: 11 },
                            	                        {text: '资源消耗-水', value: 12},
                            	                        {text: '资源消耗-矿物、化石',value: 13 },
                            	                        {text: '土地转让', value: 14}
                            	                    ]
                            	                }
                            	            ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '取舍原则(<span style="color:red;">*</span>):',
                            	    labelWidth: 180,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'650',
                            	            id: 'getrule', 
                            	            valid: noEmpty
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '假设(<span style="color:red;">*</span>):',
                            	    labelWidth: 180,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'650',
                            	            id: 'assumption', 
                            	            valid: noEmpty
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '建立时间(<span style="color:red;">*</span>):',
                            	    labelWidth: 180,
                            	    style: 'background:#ccc',
                            	   
                            	    children:[{type: 'date', id: 'buildtime', required: false}]
                               }
					   ]
				},
				{
					type:'box',layout:'horizontal',width:'100%',padding:[10,0,0,0],border: [0,0,0,0],
					children:[
						{type: 'button',text: '上一步',style:'margin-left:100px;',width:80,height: 30,onclick: function(e){
								/* var knowledge=knowledgetable.data.source;
						       	 levelmodule.levelmoduleobject.knowledge=knowledge;	*/
							    removeselected();
								openNewTab(stepdata.source[3]);
					        	}},
				        
				        {type: 'button',text: '保存',style:'margin-left:120px;',width:80,height: 30,
				        		onclick: function(e) {
				        			if(newproject.valid()){
				        		        var o = newproject.getForm();    //获取表单值
				        		        var json = Edo.util.Json.encode(o);
				        		        alert(json);  //可以用ajax发送到服务端
				        		        alert(newdatasetUUID);
				        		        alert(newmoduleid);
				        		        var data = cims201.utils.getData("lcc/lccmodule!saveSolutionintro.action",
				        		        	{projectname:projectname.text,
				        		        	companyname:companyname.text,modulename:modulename.text,forwardgoal:forwardgoal.text,projectdesc:projectdesc.text,
				        		        	calcumethod:calcumethod.getValue(),impactcategory:impactcategory.getValue(),getrule:getrule.text,
				        		        	assumption:assumption.text,buildtime:buildtime.text,moduleid:newmoduleid,datasetUUID:newdatasetUUID});
				        		    }else {
				        		    	alert('请填写完整！');
				        		    }
				        		}
				        },
				        {type: 'button',text: '下一步',width:80,height: 30,style:'margin-left:140px;',onclick: function(e){
				        	 /*var knowledge=knowledgetable.data.source;
					       	 levelmodule.levelmoduleobject.knowledge=knowledge;	*/
				        	//alert(Edo.util.JSON.encode(newalldata));
				        	//alert(newalldata.modulename);
				        	removeselected();
					       	 openNewTab(stepdata.source[5]);
				        	}}
					]
   	   	    	}
	       	    
	       	    ]
	       	}
	       	
		);
	return fileuploadbox;
	}

function noEmpty(v){
    if(v == "") return "不能为空";
}

