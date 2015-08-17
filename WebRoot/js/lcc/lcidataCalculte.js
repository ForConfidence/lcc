var datasetdetaillist={};
var datasetlist={};

var datasetdetailTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
        },
        {name: 'materialid', mapping: 'materialid',  type: 'string'
        },
        {name: 'materialname', mapping: 'materialname', type: 'string'
        },
        {name: 'inoroutput', mapping: 'inoroutput', type: 'string'
        },
        {name: 'inoroutputname', mapping: 'inoroutputname',  type: 'string'
        },
        {name: 'value', mapping: 'value',  type: 'string'
        },
        {name: 'unit', mapping: 'unit',  type: 'string'
        },
        {name: 'modulename', mapping: 'modulename',  type: 'string'
        },
        {name: 'processname', mapping: 'processname',  type: 'string'
        },
        {name: 'datasetid', mapping: 'datasetid',  type: 'string'
        }
    ]
});

var datasetlistTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
        },
        {name: 'datasetname', mapping: 'datasetname',  type: 'string'
        },
        {name: 'datasetintro', mapping: 'datasetintro', type: 'string'
        },
        {name: 'datasetrule', mapping: 'datasetrule', type: 'string'
        },
        {name: 'datasetcuracy', mapping: 'datasetcuracy',  type: 'string'
        },
        {name: 'datasetuncertainty', mapping: 'datasetuncertainty',  type: 'string'
        },
        {name: 'moduleid', mapping: 'moduleid',  type: 'string'
        },
        {name: 'processid', mapping: 'processid',  type: 'string'
        }
    ]
});

var url='zwjaction/dataset!getAlldataset.action';
var param={};
var id='datasetlist';
refreshdata(datasetlistTable,url,param,id);

Edo.build({
	type: 'app',width: '100%',height: '100%',border:[0,0,0,0],
	verticalGap:'0',
	padding:[0,0,0,0],
	render: document.body,
	layout:'horizontal',
	horizontalGap: 10,
	children:[
	      {
    	    type:'panel',
			title:'数据集',
			height: '100%',
			width:420,
			layout:'vertical',
			verticalGap:'0',
			padding:[0,0,0,0],
			border:[0,1,0,0],
			children:[	
	          	{
				type: 'group',
				width: '100%',
			    layout: 'horizontal',
			    cls: 'e-toolbar',
			    children: [
					        {type: 'button',
					         id:'addbtn1',
					         text: '导入新数据集',
					         onclick: function(e){

					         }
					        },
					        {type: 'split'},
					        {type: 'button',
						         id:'addbtn2',
						         text: '修改数据集',
						         onclick: function(e){

						         }
						        },
						        {type: 'split'},
					        {type: 'button',text: '刷新列表',
					        	onclick: function(e){
					        		var r=Edo.get('dataset').getSelected();
						    		var url='zwjaction/dataset!getAlldataset.action';
						        	var param={};
						        	var id='datasetlist';
						        	refreshdata(datasetlistTable,url,param,id);
					        	}},
					        {type: 'split'},
						    {type: 'button',text: '查看详情',
						        	onclick: function(e){
						        		var r=Edo.get('dataset').getSelected();
							        	if(r){
							        		alert('数据集名称：'+r.datasetname+'\n'+'数据集描述:'+r.datasetintro+'\n'+'数据集取舍原则：'+r.datasetrule+'\n'+'数据集准确性:'+r.datasetcuracy
							        				+'\n'+'数据集不确定性:'+r.datasetuncertainty+'\n'+'数据集模板ID：'+r.moduleid+'\n'+'数据集过程ID：'+r.processid);
							        	}else{
							        		alert('请选择数据集');
							        	}
						        	}},
						    {type: 'split'},
						    {type: 'button',text: '查看数据清单',
							        onclick: function(e){
							        	var r=dataset.getSelected();
							        	if(r){
							        		//alert(r.id);
								        	var url='zwjaction/dataset!getDatasetdetail.action';
								        	var param={datasetid:r.id};
								        	var id='datasetdetaillist';
								        	refreshdata(datasetdetailTable,url,param,id);
							        	}else{
							        		alert('请选择数据集！');
							        	}
							        }}
					      ]
				},
		        {
				id: 'dataset', type: 'table', width: 400, height: '100%',
			    rowSelectMode : 'single',
			    horizontalScrollPolicy:'off',
			    columns:[{
			            	 headerText: '',
	                         align: 'center',
	                         width: 20,                        
	                         enableSort: false,
	                         enableDragDrop: true,
	                         enableColumnDragDrop: false,
	                         style:  'cursor:move;',
	                         renderer: function(v, r, c, i, data, t){
	                         return i+1;}},
	                         Edo.lists.Table.createMultiColumn(),
	                         {header:'数据集名称',dataIndex: 'datasetname', width: '140',headerAlign: 'left',align: 'left'},
	                         {header:'模板ID',dataIndex: 'moduleid',width: '100', headerAlign: 'left',align: 'left'},
	                         {header:'过程ID',dataIndex: 'processid',width: '100', headerAlign: 'left',align: 'left'}
	                         //{header:'当量因子',dataIndex: 'lciafactor',width: '75', headerAlign: 'center',align: 'center'},
	                         //{header:'当量单位',dataIndex: 'lciafactorunit',width: '75', headerAlign: 'center',align: 'center'},
	                         
	                         ],
				data:datasetlistTable
		       	}
		  ]
	      },
       	  {
    	    type:'panel',
			title:'数据清单',
			width: 680,
			height: '100%',
			verticalGap:'0',
			padding:[0,0,0,0],
			border:[0,1,0,0],
			children:[{
				type: 'group',
			    width: 680,
			    layout: 'horizontal',
			    cls: 'e-toolbar',
			    children: [
					        {type: 'button',text: '新增清单物质',
					        	onclick: function(e){
//					        		var r=Edo.get('lciamethod').getSelected();
//						        	if(r){
//						        		new getNewBaseDataWin();
//						        	}else{
//						        		alert('请选择指标类别');
//						        	}
					        	}},
				            {type: 'split'},
					        {type: 'button',id:'rebtn',text: '刷新',
				            	onclick:function(e){
				            		var r=Edo.get('dataset').getSelected();
						    		var url='zwjaction/dataset!getDatasetdetail.action';
						        	var param={datasetid:r.id};
						        	var id='datasetdetail';
						        	refreshdata(datasetdetailTable,url,param,id);
					        }},
					        {type: 'split'},
						    {type: 'button',text: '查看详情',
						        	onclick: function(e){
						        		var r=datasetdetail.getSelected();
							        	if(r){
							        		alert('物质类别：'+r.materialid+'\n'+'物质名称:'+r.materialname+'\n'+'输入输出类别：'+r.inoroutputname+'\n'+'数值:'+r.value+'\n'+'单位：'+r.unit+'\n'+'模板名称:'+r.modulename+'\n'+'过程名称:'+r.processid+'\n'+'数据集ID:'+r.datasetid);
							        	}else{
							        		alert('请选择清单物质！');
							        	}
						        	}},
					        {type:'search', 
					        	id: 'searchfactor',
					        	ontrigger: function(e){
					            this.set('clearVisible', true);
					            	if(Edo.get('searchfactor').getValue()!=""){
					            		alert("ok！");
					            	}else{
					            		alert('请选择搜索内容！');
					            	}
					        	},
					        	oncleartrigger: function(e){
					        		
					        	}
					        }
					        ]
			},
			{
				id: 'datasetdetail', type: 'table', width: 680, height: '100%',
			    rowSelectMode : 'single',
			    horizontalScrollPolicy:'off',
			    columns:[{
			            	 headerText: '',
	                         align: 'center',
	                         width: 50,                        
	                         enableSort: false,
	                         enableDragDrop: true,
	                         enableColumnDragDrop: false,
	                         style:  'cursor:move;',
	                         renderer: function(v, r, c, i, data, t){
	                         return i+1;}},
	                         Edo.lists.Table.createMultiColumn(),
	                         {header:'物质名称',dataIndex: 'materialname', width: '300',headerAlign: 'center',align: 'center'},
	                         {header:'物质数值',dataIndex: 'value',width: '80', headerAlign: 'center',align: 'center'},
	                         {header:'物质单位',dataIndex: 'unit',width: '100', headerAlign: 'center',align: 'center'},
	                         {header:'输入输出类别',dataIndex: 'inoroutputname',width: '80', headerAlign: 'center',align: 'center'},
	                         //{header:'指标类别',dataIndex: 'lciacategoryid',width: '60', headerAlign: 'center',align: 'center'}
	                         ],
				data:datasetdetailTable
			}
			]  
		}
	    ]
});


function refreshdata(dataTable,url,param,id){
    var data= cims201.utils.getData(url,param);
	dataTable.set('data',data);
}