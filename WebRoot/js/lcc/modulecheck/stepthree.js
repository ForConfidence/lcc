function search(){ 
	//alert('ss')
	    
	    var index = myPager.index;    
	    var size = myPager.size;
	    var r=Edo.get('category').getSelected();
	    var data = cims201.utils.getData("../zwjaction/materialandcategory!getBasematerial.action",{categoryid:r.id,index:index+1,size:size});
		myPager.total = data.total;
		myPager.totalPage = data.totalPage;
    	basematerialTable.load(data.data);
		myPager.refresh();
}

var basematerial={};
var materialcategory={};
var materialfactor={};

var basematerialTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'mid', type: 'string'
        },
        {name: 'materialname', mapping: 'materialname',  type: 'string'
        },
        {name: 'materialintro', mapping: 'materialintro', type: 'string'
        },
        {name: 'materialunit', mapping: 'materialunit', type: 'string'
        },
        {name: 'materialprice', mapping: 'materialprice',  type: 'string'
        },
        {name: 'categoryid', mapping: 'categoryid',  type: 'string'
        },
        {name: 'UUID', mapping: 'UUID',  type: 'string'
        },
        {name: 'firstcategory', mapping: 'firstcategory',  type: 'string'
        },
        {name: 'subcategory', mapping: 'subcategory',  type: 'string'
        },
    ]
});
var materialcategoryTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
        },
        {name: 'categoryname', mapping: 'categoryname',  type: 'string'
        },
        {name: 'englishname', mapping: 'englishname',  type: 'string'
        },
        {name: 'categoryintro', mapping: 'categoryintro',  type: 'string'
        },
        {name: 'parentid', mapping: 'parentid',  type: 'string'
        }
    ]
});
var lcalciafactorTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
        },
        {name: 'factorcategoryname', mapping: 'factorcategoryname',  type: 'string'
        },
        {name: 'factorsubcategoryname', mapping: 'factorsubcategoryname',  type: 'string'
        },
        {name: 'factorname', mapping: 'factorname',  type: 'string'
        },
        {name: 'factorunit', mapping: 'factorunit',  type: 'string'
        },
        {name: 'UUID', mapping: 'UUID',  type: 'string'
        },
        {name: 'factorvalue', mapping: 'factorvalue',  type: 'string'
        },
        {name: 'lciacategoryid', mapping: 'lciacategoryid',  type: 'string'
        },
        {name: 'materialcategoryid', mapping: 'materialcategoryid',  type: 'string'
        },
        {name: 'lcianame', mapping: 'lcianame',  type: 'string'
        },
        {name: 'lciacategory', mapping: 'lciacategory',  type: 'string'
        }
    ]
});

function getstepthree(){
	var output = Edo.build(
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
					       	height:100,
					           style:  'font-size:20px;font-family:verdana;font-weight:bold;border:0;background:rgba(0,0,0,0);',
					       	text:'输出资源信息'
						        }]
					}, 
					{type: 'panel',title:'输出资源信息',width: '100%',height:'100%',layout: 'vertical',border: [0,0,1,0],padding: [0,0,0,0],verticalGap:'0',
						children:[     
							{
							type: 'group',
						    width: '100%',
						    layout: 'horizontal',
						    cls: 'e-toolbar',
						    children: [
							        {
						                type: 'button',
						                text: '查看环境影响值',
						                onclick: function(e){
						                	if(Edo.get('outputtable').getSelected()) {
						                		var content=new getmaterialfactor1();
							                	var toolbar=new gettoolbar(null,null);
										  	    var win=cims201.utils.getWin(800,480,'查看环境影响值',[content,toolbar]);
										 	    win.show('center', 'middle', true);
										 	    win.set('padding',[0,0,0,0]);
						                	}else {
						                		alert('请选择物质！');
						                	}
						                }	
							    }
							]
							},
							{
					        type: 'table',
					        id:'outputtable',
					        padding:[0,0,0,0],
					        width: '100%',
					        height: '100%',
					        showHeader: true,
					        rowSelectMode: 'single',        
					        enableDragDrop: false,   
					        columns:[
				                 	Edo.lists.Table.createMultiColumn(),
				                 	 {header:'物质名称',dataIndex: 'materialname', width: '300',headerAlign: 'center',align: 'center',editor: 'text'},
			                         {header:'物质大类',dataIndex: 'firstcategory',width: '100', headerAlign: 'center',align: 'center',editor: 'text'},
			                         {header:'物质小类',dataIndex: 'subcategory',width: '100', headerAlign: 'center',align: 'center',editor: 'text'},
			                         {header:'物质数量',dataIndex: 'materialvalue', width: '100',headerAlign: 'center',align: 'center',editor: 'text'},
			                         {header:'是否计算',dataIndex: 'iscalculate', width: '100',headerAlign: 'center',align: 'center',editor:
		                         		{
		 				       	  		type: 'combo',
		 				       	  		displayField: 'label', 
		 				       			valueField: 'label',
		 				       			width: 100,
		 				       			height:200,
		 			       		    data: [
		 				       	        {label: '产品或服务', value: 1},
		 				       	        {label: '清单物质', value: 2}
		 				       	        ]
		 			
		 				       	   	}},
			                         {header:'物质价格',dataIndex: 'materialprice', width: '100',headerAlign: 'center',align: 'center',editor: 'text'},
			                         {header:'物质单位',dataIndex: 'materialunit', width: '100',headerAlign: 'center',align: 'center',editor:'text'
			                             }
				                    /*{header: '编号', dataIndex: 'id',width:100,headerAlign: 'center',align: 'center'},
				                    {header: '名称', dataIndex: 'name',width:120,headerAlign: 'center',align: 'center'},
				                    {header:'类别',dataIndex: 'category',width: 120, headerAlign: 'center',align: 'center'},
			                        {header:'单位',dataIndex: 'unit', width: 120,headerAlign: 'center',align: 'center'},
			                        {header: '数量', dataIndex: 'amount',width:120,headerAlign: 'center',align: 'center'},
			                        {header:'来源',dataIndex: 'origin',width: 120, headerAlign: 'center',align: 'center'},*/
					        ],
					        data:  levelmodule.levelmoduleobject.outputmaterial
					        	/*[{id:1,name:'冷轧钢板',category:'资源',unit:'kg',amount:0.1,origin:'中国'},
					              {id:2,name:'ABS(粒料)',category:'资源',unit:'kg',amount:0.05,origin:'中国'},
					              {id:3,name:'异氰酸酯',category:'资源',unit:'kg',amount:0.02,origin:'中国'},
					              {id:4,name:'环戊烷',category:'资源',unit:'kg',amount:0.003,origin:'中国'}
					        ]*/
					      
					    }]
						},
						{
							type:'box',layout:'horizontal',width:'100%',padding:[10,0,0,0],border: [0,0,0,0],
							children:[
								{type: 'button',text: '查看输入资源',style:'margin-left:120px;',width:80,height: 30,onclick: function(e){
										removeselected();
										openNewTab(stepdata.source[1]);
										updatesteptabledata('steptwo');
							        	}},
							    {type: 'button',text: '退出',width:80,height: 30,style:'margin-left:140px;',
							        		onclick: function(e){
									        	detaildiv.style.width='0px';
									        	resetm2();
									        	removeselected();
									        }
							        	}
					       	
							
							]
							}
			       	    
				
				]});
		return output;

	}
function outputresourcecontent(){
	var myPager = Edo.create({
		id: 'myPager',
		type: 'pagingbar',
	    border: 0,
	    padding:[0,0,0,0],
	    cls: 'e-toolbar',
	    width: '550',
	    height: 20
	});	


	myPager.on('paging',function(e){
		search();	
	});
	var outputresourcecontent=Edo.create(
			{type: 'box',width: '100%',height: '100%',border:[0,0,0,0],
				verticalGap:'0',
				padding:[0,0,0,0],
				//render: document.body,
				layout:'horizontal',
				horizontalGap: 10,
				children:[
				      {
			    	    type:'panel',
						title:'物质类别',
						height: '100%',
						width:220,
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
								         //id:'addbtn1',
								         text: '新增大类',
								         onclick: function(e){
								        	 new getNewCategoryWin('parent');
								         }
								        },
								        {type: 'button',text: '新增子类',
								        	onclick: function(e){
								        		var r=Edo.get('category').getSelected();
									        	if(r){
									        		new getNewCategoryWin('child',r);
									        	}else{
									        		alert('请选择父类型');
									        	}
								        	}},
										{type: 'split'},
								        {type: 'button',
											//id:'xgbtn1',
											text: '修改类别',
											onclick: function(e){
												var r=Edo.get('category').getSelected();
									        	if(r){
									        		new getModifyCategoryWin(r);
									        	}
									        }
								        }
								      ]
							},
					        {
							id:'category',
							type:'tree',		
					        width: 220,
					        height: '100%',
					        headerVisible: false,
					        autoColumns: true,
					        horizontalLine: false,
					        columns: [{header: '大类名称',dataIndex: 'categoryname'}],
					        onselectionchange: function(e){	
					        	myPager.index = 0;
					        	myPager.size = 15;
					        	search();
					        },
							data:materialcategoryTable
					       	}
					  ]
				      },
			       	  {
			    	    type:'panel',
						title:'基础数据',
						width: 580,
						height: '100%',
						verticalGap:'0',
						padding:[0,0,0,0],
						border:[0,1,0,0],
						children:[{
							type: 'group',
						    width: 580,
						    layout: 'horizontal',
						    cls: 'e-toolbar',
						    children: [
								        {type: 'button',text: '新增数据',
								        	onclick: function(e){
								        		var r=Edo.get('category').getSelected();
									        	if(r){
									        		new getNewBaseDataWin();
									        	}else{
									        		alert('请选择物质类别');
									        	}
								        	}},
										{type: 'split'},
								        {type: 'button',text: '修改数据',
											onclick: function(e){
												var r=basematerial.getSelected();
									        	if(r){
									        		new getModifyBaseDataWin(r);
									        	}else{
									        		alert('请选择物质');
									        	}
								        }},
							            {type: 'split'},
								        {type: 'button',
							            	//id:'rebtn',
							            	text: '刷新',
							            	onclick:function(e){
//							            		var r=Edo.get('category').getSelected();
//									    		var url='../zwjaction/materialandcategory!getBasematerial.action';
//									        	var param={categoryid:r.id};
//									        	var id='basematerial';
//									        	refreshdata(basematerialTable,url,param,id);
									        	myPager.index = 0;
									        	myPager.size = 15;
									        	search();
								        }},
								        {type: 'split'},
								        {type:'search', 
								        	id: 'searchfactor',
								        	width:'200',
								        	ontrigger: function(e){
								            this.set('clearVisible', true);
								            	if(Edo.get('searchfactor').getValue()!=""){
								            		//alert("ok！");
								            		var r=Edo.get('category').getSelected();
								            		var url='../zwjaction/materialandcategory!sousuoBasematerial.action';
										        	var param={categoryid:r.id,materialname:Edo.get('searchfactor').getValue()};
										        	var id='basematerial';
										        	refreshdata(basematerialTable,url,param,id);
								            	}else{
								            		alert('请填写搜索内容！');
								            	}
								        	},
								        	oncleartrigger: function(e){
								        		Edo.get('searchfactor').resetValue();
								        	}
								        }
								        ]
						},
						{
							id: 'basematerial', type: 'table', width: 580, height: '100%',
							rowSelectMode: 'multi', 
							//rowSelectMode : 'single',
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
				                         {header:'物质名称',dataIndex: 'materialname', width: '340',headerAlign: 'center',align: 'center'},
				                         {header:'物质介绍',dataIndex: 'materialintro',width: '80', headerAlign: 'center',align: 'center'},
				                         {header:'物质单位',dataIndex: 'materialunit',width: '80', headerAlign: 'center',align: 'center'},
				                         //{header:'物质价格',dataIndex: 'materialprice',width: '200', headerAlign: 'center',align: 'center'},
				                         ],
							data:basematerialTable
						},
						myPager
						]  
					}
				    ]
			});
	return outputresourcecontent;
}
function getmaterialfactor1() {
	var r = Edo.get('outputtable').getSelected();
	var url='../zwjaction/lciamethod!getFactors.action';
	var param={materialcategoryid:r.categoryid,factorname:r.materialname,methodid:'1'};
	var id='materialfactor';
	refreshdata(lcalciafactorTable,url,param,id);

	var getmaterialfactor=Edo.create({
	type: 'box',width: '100%',height: '100%',border:[0,0,0,0],
	verticalGap:'0',
	padding:[0,0,0,0],
	children:[
       	  {
    	    type:'box',
			width: '100%',
			height: '100%',
			verticalGap:'0',
			padding:[0,0,0,0],
			border:[0,1,0,0],
			children:[{
				type: 'group',
			    width: '100%',
			    layout: 'horizontal',
			    cls: 'e-toolbar',
			    children: [
					        {type: 'button',text: '排序',
					        	onclick: function(e){
					        		
					        	}},
							{type: 'split'},
					        {type: 'button',text: '刷新',
								onclick: function(e){
									
					        }}
					        ]
			},
			{
				id: 'materialfactor', type: 'table', width: '100%', height: '100%',
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
	                         {header:'影响因子',dataIndex: 'factorname', width: '340',headerAlign: 'center',align: 'center'},
	                         {header:'评价方法',dataIndex: 'lcianame',width: '100', headerAlign: 'center',align: 'center'},
	                         {header:'环境指标',dataIndex: 'lciacategory',width: '100', headerAlign: 'center',align: 'center'},
	                         {header:'当量值',dataIndex: 'factorvalue',width: '100', headerAlign: 'center',align: 'center'},
	                         {header:'当量单位',dataIndex: 'factorunit',width: '100', headerAlign: 'center',align: 'center'}
	                         ],
				data:lcalciafactorTable
			}
			]  
		}
	    ]
	});
return getmaterialfactor1;
}

