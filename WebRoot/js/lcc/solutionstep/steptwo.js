function getsteptwo(){
	var solutionproduct = Edo.build(
		{type: 'box',
	    	width: 1100,
	    	height:'100%',
	    	border: [0,0,0,0],
	    	padding: [0,0,0,0],
	    	layout: 'vertical',
	    	verticalGap:'0',
	    	/*verticalAlign:'middle',
	    	horizontalAlign:'center',*/
	   	    children: [
				{type: 'panel',title:'步骤说明',width: '100%',layout: 'horizontal',border: [0,0,0,0],padding: [0,0,0,0],
					children:[     
					        {type:'textarea',
				       	width : 300,
				       	height:160,
				           style:  'font-size:20px;font-family:verdana;font-weight:bold;border:0;background:rgba(0,0,0,0);',
				       	text:'选择具体计算对象'
					        }]
				}, 
				{type: 'panel',title:'选择具体计算对象',width: '100%',height:300,layout: 'vertical',border: [0,0,1,0],padding: [0,0,0,0],verticalGap:'0',
					children:[     
						{
				        type: 'tree',
				        width: '100%',
				        height: '100%',
				        horizontalScrollPolicy:'off',
				        verticalLine:false,
				        horizontalLine:false,
				        id: 'componentTree',
				        onbodymousedown: function(e){
				        	var r = this.getSelected();
				        },
				        autoColumns: true,
				        enableDragDrop: true,
				        headerVisible:false,
				        
				        columns:[
				            {
				            	
				                enableDragDrop: true,
				                headerText: "选择产品类别",                
				                dataIndex: "name"
				            }
				        ]
				    }]
					},
					{
						type:'box',layout:'horizontal',width:'100%',padding:[10,0,0,0],border: [0,0,0,0],
						children:[
							{type: 'button',text: '上一步',style:'margin-left:120px;',width:80,height: 30,onclick: function(e){
								/* var inputmaterial=inputtable.data.source;
							       	levelmodule.levelmoduleobject.inputmaterial=inputmaterial;	*/
								    removeselected();
									openNewTab(stepdata.source[0]);
						        	}},
					        {type: 'button',text: '下一步',width:80,height: 30,style:'margin-left:140px;',onclick: function(e){
					        	/* var inputmaterial=inputtable.data.source;
						       	 levelmodule.levelmoduleobject.inputmaterial=inputmaterial;	*/
				        		 var row=Edo.get('componentTree').getSelected();
					        	 solution.componentid=row.id;
					        	 solution.compnonentname=row.name;
					        	 removeselected();
						       	 openNewTab(stepdata.source[2]);
						       	
					        	}}
				       	
						
						]
						}
		       	    
			
			]});
	Edo.util.Ajax.request({
        type: 'post',        
        url: 'lcc/lccmodule!getComponentList.action',
        params: {
            parentId: '0'   //传递父节点的Name(也可以是ID)
        },
        onSuccess: function(text){
            var data = Edo.util.Json.decode(text);
           
            Edo.get('componentTree').set('data', data);
        }
        
    });
	return solutionproduct;
	}

