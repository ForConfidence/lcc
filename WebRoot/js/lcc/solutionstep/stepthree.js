function getstepthree(){
	var moduledata= cims201.utils.getData('lcc/lccmodule!getModuletree.action',{componentid:solution.componentid});
	var solutionmodule = Edo.build(
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
					       	text:'请选择计算模板'
						        }]
					}, 
					{type: 'panel',title:'选择计算模板和计算数据集',width: '100%',height:300,layout: 'horizontal',border: [0,0,1,0],padding: [0,0,0,0],verticalGap:'0',
						children:[     
							
							{
							    type: 'tree',
							       width: 200,
							       height: 300,
							       autoColumns:true,
							       headerVisible: false,
							       verticalLine:false,
							       horizontalLine:false,
							       id: 'moduletree',
							       enabelCellSelect: false,
							    autoColumns: true,
							    enableDragDrop: true,
							    showHeader: false,
							    onbodymousedown: function(e){
							    	
						        	var r = this.getSelected();
						        	Edo.util.Ajax.request({
						        	    type: 'post',        
						        	    url: 'lcc/lccmodule!getModuleBranchByParent.action',
						        	    params: {
						        	    	superparentmoduleid: r.uuid  //传递父节点的Name(也可以是ID)
						        	    },
						        	    onSuccess: function(text){
						        	        var data = Edo.util.Json.decode(text);
						        	        Edo.get('branchtable').set('data', data);
						        	    }
						        	    
						        	});
						        },
							    columns:[
							        {   
							            enableDragDrop: true,
							            dataIndex: "name"
							        
							        }
							        ],
						        data:moduledata
							       
							},
							{
								id: 'branchtable', type: 'table', width: '100%', height: 300,
							    horizontalScrollPolicy:'off',
							    columns:[
								 {header:'编号',dataIndex: 'id', headerAlign: 'center',width:60,align: 'center'},
								 {header:'模板分支名称',dataIndex: 'name',headerAlign: 'center',width:230,align: 'center'}
								 //{header:'正建模名称',dataIndex: 'createuserid',headerAlign: 'center',width:230,align: 'center'}
							     ]
							}
								
				/*			{
							    type: 'tree',
							       width: '100%',
							       height: 300,
							       autoColumns:true,
							       enabelCellSelect: false,
							    autoColumns: true,
							    enableDragDrop: true,
							    showHeader: false,
							    ondblclick:function(e){
							    },
							    columns:[
							             		{
										            header: '数据集名称',
										            dataIndex: 'name',
										        },
										        {
										            header: '所属模板名称',
										            dataIndex: 'module',
										        },
										        {
										            header: '使用次数',
										            dataIndex: 'useamount',
										        },
										        {
										            header: '创建人',
										            dataIndex: 'person',
										        }
							        ],
							        data:[
				              			 {name:'模板自带数据集',module:'汽轮机模板1',useamount:20,person:'黄易',children:[]},
				                         {name:'数据集2',module:'汽轮机模板1',useamount:12,person:'admin',children:[]},
				                         {name:'数据集3',module:'汽轮机模板1',useamount:20,person:'黄易',children:[]}
				                        ]
							       
							}*/
				
				]},
				{
	       			type:'box',layout:'horizontal',width:'100%',padding:[10,0,0,0],border: [0,0,0,0],
	       			children:[
	       		        {type: 'button',text: '上一步',style:'margin-left:120px;',width:80,height: 30,onclick: function(e){
/*									var inputmaterial=inputtable.data.source;
							       	levelmodule.levelmoduleobject.inputmaterial=inputmaterial;	
								    
*/								removeselected();	
	       		        		openNewTab(stepdata.source[1]);
						        	}},
					        {type: 'button',text: '下一步',width:80,height: 30,style:'margin-left:140px;',onclick: function(e){
					        	/* var inputmaterial=inputtable.data.source;
						       	 levelmodule.levelmoduleobject.inputmaterial=inputmaterial;	
					        	 */
					        	
					        	
					        	
					        	var r = moduletree.getSelected();
				            	var r1=branchtable.getSelected();
					        	solution.moduleid=r.id;
					        	solution.branchid=r1.id;
					        	removeselected();
						       	openNewTab(stepdata.source[3]);
						       	
					        	}}
		       			]
		       			}
				]});
		return solutionmodule;

	}
