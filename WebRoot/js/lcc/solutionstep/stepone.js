function getstepone(){
	var taskdefine = Edo.build(
		
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
			   	        	width : 300,
			   	        	height:160,
			   	            style:  'font-size:20px;font-family:verdana;font-weight:bold;border:0;background:rgba(0,0,0,0);',
			   	        	text:'请选择构建的类型:包含零部件的产品或组件,需要对产品或组件的模板树进行数据填写；单个零部件，只需对改零部件模板填写数据，'
				   	        }]
				},      
	       	    /*{type : 'formitem',
	       	    label : '模板名称:',
	       	    padding:[5,0,0,0],
	       	    labelStyle:'font-size:20px;font-family:SimSun;border:0;',
	       	    labelWidth : 100,
	       	    labelHeight : 30,
	       	    children : [
	                {type : 'text',width : 200,height:30,id : 'taskname'}]
	       	    },
	   	    	{type : 'formitem',
	       	    label : '流程备注:',
	       	    padding:[5,0,0,0],
	       	    labelWidth : 100,
	       	    labelHeight : 30,
	       	    labelStyle:'font-size:20px;font-family:SimSun;border:0;',
	       	    children : [
	                {type : 'text',width : 200,height:30,id : 'tasknote'}]
	       	    },*/
				{type: 'panel',title:'选择构建类型',width: '100%',height:300,layout: 'vertical',border: [0,0,1,0],padding: [10,0,0,10],
					children:[
						{   
						 	 id:'solutiontype',
					    	 type:'RadioGroup', 
						     repeatDirection: 'horizontal',
						     repeatItems: 5,
						     repeatLayout: 'table',       
						     itemWidth: '100px',
						     valueField: 'value',
						     data: [
						         {text: '包含零部件的产品或组件', value:'multiplecomp'},
						         {text: '单个零部件', value:'singlecomp'}
						     ]
						 }
					   ]
				},
	       	    {
       			type:'box',layout:'horizontal',width:'100%',padding:[10,0,0,0],border: [0,0,0,0],
       			children:[
       		        {type: 'button',text: '下一步',width:80,height: 30,style:'margin-left:220px;',onclick: function(e){
       		        	solution.type=Edo.get('solutiontype').getValue();
       		        	/*var processname=Edo.get('processname').text;
       		        	var processnote=Edo.get('processnote').text;
	       		     	levelmodule.levelmoduleobject.processname=processname;
	       		        levelmodule.levelmoduleobject.processnote=processnote;
	       		       */
       		        	 removeselected();
       		        	//aa.editcell(cell,processname);
       			       	openNewTab(stepdata.source[1]);
       		        	}}
	       			]
	       			}
	       	    
	       	    
	       	    ]
	       	}
	       	
		);
	return taskdefine;
	}

