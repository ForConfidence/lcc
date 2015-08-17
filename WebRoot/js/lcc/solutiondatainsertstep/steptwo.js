var basedataTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
        },
        {name: 'name', mapping: 'name',  type: 'string'
        },
        {name: 'unit', mapping: 'unit', type: 'string'
        },
        {name: 'unitcost', mapping: 'unitcost',  type: 'string'
        },
        {name: 'categoryname', mapping: 'categoryname',  type: 'string'
        },
        {name: 'categoryid', mapping: 'categoryid',  type: 'string'
        }
    ]
});
var categorydataTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
           
        },
        {name: 'name', mapping: 'name',  type: 'string'
        },
        {name: 'index', mapping: 'index',  type: 'string'
        },
        {name: 'parentid', mapping: 'parentid',  type: 'string'
        }
    ]
});
function refreshdata(dataTable,url,param,id){
    var data= cims201.utils.getData(url,param);
	dataTable.set('data',data);
}
function getsteptwo(){
	var input = Edo.build(
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
				       	text:'请填写该过程节点的数据'
					        }]
				}, 
				{type: 'panel',title:'完善输入信息',width: '100%',height:300,layout: 'vertical',border: [0,0,1,0],padding: [0,0,0,0],verticalGap:'0',
					children:[     
						{
						type: 'group',
					    width: 120,
					    layout: 'horizontal',
					    cls: 'e-toolbar',
					    children: [
							{
							    type: 'button',
							    text: '添加',
							    onclick: function(e){
							    	var func=function(id){
							    		var rows=inputmaterial.getSelecteds()
							    		for(var i=0;i<rows.length;i++){
							    			inputtable.data.insert(0,rows[i])
							    		}
							    	}
							        var content=new inputresourcecontent();
							        var url='lcc/lccmodule!getMaterialCategory.action';
							        var param={};
							        var id='category';
							        refreshdata(categorydataTable,url,param,id);
							        var url='lcc/lccmodule!getBasematerial.action';
							        var param={categoryid:null};
							        var id='inputmaterial';
							        refreshdata(basedataTable,url,param,id);
							 	    var toolbar=new gettoolbar(null,func);
							  	    var win=cims201.utils.getWin(600,450,'选择输入',[content,toolbar]);
							 	    win.show('center', 'middle', true);
							 	    win.set('padding',[0,0,0,0]);
							    }                
							    
							    },
				            {
			                type: 'button',
			                text: '删除',
			                onclick: function(e){
			                	if(Edo.get('inputmaterial')){
			                		alert('s')
			                	}else{alert('n')}
			                   /* var r = Edo.get(inputtable).getSelected();
			                    if(r){
			                        Edo.get(inputtable).data.remove(r);
			                    }else{
			                        alert("请选择行");
			                    }*/
			                }                
			                
				            }
						]
						},
						{
				        type: 'table',
				        id:'inputtable',
				        padding:[0,0,0,0],
				        width: 720,
				        height: 300,
				        showHeader: true,
				        rowSelectMode: 'multi',        
				        enableDragDrop: true,   
				        columns:[
			                 	Edo.lists.Table.createMultiColumn(),
		                         {header:'物质名称',dataIndex: 'name', width: '100',headerAlign: 'center',align: 'center'},
		                         {header:'类别',dataIndex: 'categoryname',width: '100', headerAlign: 'center',align: 'center'},
		                         {header:'数量',dataIndex: 'consumeamount', width: '100',headerAlign: 'center',align: 'center',editor: 'text'},
		                         {header:'参考最大值',dataIndex: 'consumemaxamount', width: '100',headerAlign: 'center',align: 'center',editor: 'text',enable:false},
		                         {header:'参考最小值',dataIndex: 'consumeminamount', width: '100',headerAlign: 'center',align: 'center',editor: 'text',enable:false},
		                         {header:'单位',dataIndex: 'consumeunit', width: '100',headerAlign: 'center',align: 'center',
		                        	 
		                        	 editor:
		                        	 {
		 				       	  		type: 'combo',
		 				       	  		displayField: 'label', 
		 				       			valueField: 'label',
		 				       			width: 200,
		 			       		    data: [
		 				       	        {label: 'kg', value: 1},
		 				       	        {label: 'ml', value: 2}
		 				       	        ]
		 			
		 				       	   	}
		                             }
			                   /* {header: '编号', dataIndex: 'id',width:100,headerAlign: 'center',align: 'center'},
			                    {header: '名称', dataIndex: 'name',width:120,headerAlign: 'center',align: 'center'},
			                    {header:'类别',dataIndex: 'category',width: 120, headerAlign: 'center',align: 'center'},
		                        {header:'单位',dataIndex: 'unit', width: 120,headerAlign: 'center',align: 'center'},
		                        {header: '数量', dataIndex: 'amount',width:120,headerAlign: 'center',align: 'center'},
		                        {header:'来源',dataIndex: 'origin',width: 120, headerAlign: 'center',align: 'center'},*/
				        ],
				        data: levelmodule.levelmoduleobject.inputmaterial
				        	/*[{id:1,name:'冷轧钢板',category:'资源',unit:'kg',amount:1.5,origin:'中国'},
				              {id:2,name:'ABS(粒料)',category:'资源',unit:'kg',amount:0.845,origin:'中国'},
				              {id:3,name:'异氰酸酯',category:'资源',unit:'kg',amount:0.52,origin:'中国'},
				              {id:4,name:'环戊烷',category:'资源',unit:'kg',amount:0.04,origin:'中国'},
				              {id:4,name:'电能',category:'能源',unit:'kW.h',amount:19,origin:'中国'}
				        ]*/
				      
				    }]
					},
					{
						type:'box',layout:'horizontal',width:'100%',padding:[10,0,0,0],border: [0,0,0,0],
						children:[
							{type: 'button',text: '上一步',style:'margin-left:120px;',width:80,height: 30,onclick: function(e){
									var inputmaterial=inputtable.data.source;
							       	levelmodule.levelmoduleobject.inputmaterial=inputmaterial;	
								    removeselected();
									openNewTab(stepdata.source[0]);
						        	}},
					        {type: 'button',text: '下一步',width:80,height: 30,style:'margin-left:140px;',onclick: function(e){
					        	 var inputmaterial=inputtable.data.source;
						       	 levelmodule.levelmoduleobject.inputmaterial=inputmaterial;	
					        	 removeselected();
						       	 openNewTab(stepdata.source[2]);
						       	
					        	}}
				       	
						
						]
						}
		       	    
			
			]});
	return input;
	}
function inputresourcecontent(){
	var inputresourcecontent=Edo.create(
			{type: 'box',
		    	width: 600,
		    	border: [0,0,1,0],
		    	padding: [0,0,0,0],
		    	layout: 'vertical',
		    	verticalGap:'0',
		   	    children: [
			            {
						type:'box',
						layout:'horizontal',
						border: [0,0,0,0],
						height: 50,
						padding:[0,0,0,0],
						verticalAlign:'middle',
				    	horizontalAlign:'left',
						children:[
							{
							type:'label',
						    text:'搜索条件:'
							},      
							{   
							type:'Search',
							width:150,
						    ontrigger: function(e){
						        this.set('clearVisible', true);
						        alert("查询");
						    },
						    oncleartrigger: function(e){
						        alert("清除查询");
						    }}]
			            },
			            
			            {
							type:'panel',
							title: '物质类别',
							layout:'horizontal',
							width:'100%',
							padding:[0,0,0,0],
							border:[1,0,1,0],
							verticalAlign:'middle',
					    	horizontalAlign:'left',
					    	enableCollapse: true,
		                   // onclick: onPanelClick,
		                    expanded:true,
		                   /* titlebar:[{
		                    cls:'e-titlebar-accordion',
		                    onclick: toggle}],*/
							children:[
								{
									id:'category',
									type: 'tree',		
									width:'100%',
								    height: 100,
								    headerVisible: false,
								    autoColumns: true,
								    horizontalLine: false,
								    columns: [{header: '名称',dataIndex: 'name'}],
								    onselectionchange: function(e){	
								    	var r=category.getSelected();
								    	var url='lcc/lccmodule!getBasematerial.action';
								    	var param={categoryid:r.id};
								    	var id='basedata';
								    	refreshdata(basedataTable,url,param,id);
								    },
									data:categorydataTable
								   	}
				            /*{   
				            	type:'CheckGroup', 
				                repeatDirection: 'vertical',
				                repeatItems: 3,
				                repeatLayout: 'table',       
				                itemWidth: '100px',
				                valueField: 'value',
				                data: [
				                    {text: '水资源', value: 1},
				                    {text: '土地资源', value: 2},
				                    {text: '生物资源', value: 3},
				                    {text: '矿产资源', value: 4},
				                    {text: '能源资源', value: 5}
				                ]
				            }*/]
			            },
			      /*      {
							type:'panel',
							title: '标准',
							layout:'horizontal',
							width:'100%',
							padding:[0,0,0,0],
							border:[0,0,1,0],
							verticalAlign:'middle',
					    	horizontalAlign:'left',
					    	enableCollapse: true,
		                    //onclick: onPanelClick,
		                    expanded:true,
		                    titlebar:[{
		                    cls:'e-titlebar-accordion',
		                    onclick: toggle}],
							children:[
				            {   
				            	type:'CheckGroup', 
				                repeatDirection: 'horizontal',
				                repeatItems: 3,
				                repeatLayout: 'table',       
				                itemWidth: '100px',
				                valueField: 'value',
				                data: [
				                    {text: '美国', value: 1},
				                    {text: '欧洲', value: 2},
				                    {text: '中国', value: 3}
				                ]
				            }]
			            },*/
			        	{type: 'panel',title:'资源列表',width: '100%',height:200,layout: 'horizontal',padding: [0,0,0,0],border:[0,0,0,0],horizontalScrollPolicy:'off',
							children:[   
				              {
						        type: 'table',
						        id:'inputmaterial',
						        padding:[0,0,0,0],
						        width: '100%',
						        height: '100%',
						        showHeader: true,
						        rowSelectMode: 'multi',        
						        enableDragDrop: true,   
						        columns:[
					                 	Edo.lists.Table.createMultiColumn(),
				                         {header:'名称',dataIndex: 'name', width: '200',headerAlign: 'center',align: 'center'},
				                         {header:'类别',dataIndex: 'categoryname',width: '200', headerAlign: 'center',align: 'center'},
				                       /*  {header:'单价',dataIndex: 'unitcost', width: '100',headerAlign: 'center',align: 'center'},
				                         {header:'单位',dataIndex: 'unit', width: '100',headerAlign: 'center',align: 'center'},*/
						                 /*{header: '编号', dataIndex: 'id',width:50,headerAlign: 'center',align: 'center'},
					                     {header: '名称', dataIndex: 'name',width:100,headerAlign: 'center',align: 'center'},
					                     {header:'类别',dataIndex: 'category',width: 100, headerAlign: 'center',align: 'center'},
				                         {header:'单位',dataIndex: 'unit', width: 100,headerAlign: 'center',align: 'center'},
				                         {header:'来源',dataIndex: 'origin',width: 100, headerAlign: 'center',align: 'center'},
				                         {header:'更新时间',dataIndex: 'updatetime', width: 100,headerAlign: 'center',align: 'center'}*/
						        ],
						        data:basedataTable
						      
						    }]}
			            ]
			});
	return inputresourcecontent;
}

