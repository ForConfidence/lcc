
//前后台传输json对象

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
        {name: 'methodid', mapping: 'methodid',  type: 'string'
        }
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
//要写好action，不然前台无法展示
//var url='../zwjaction/materialandcategory!getAllcategory.action';
//??
//var param={index:'basedata'};
//??
//var param={};
//var id='category';
//refreshdata(materialcategoryTable,url,param,id);

//function refreshdata(dataTable,url,param,id){
//    var data= cims201.utils.getData(url,param);
//	dataTable.set('data',data);
//}
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
				       	height:100,
				           style:  'font-size:20px;font-family:verdana;font-weight:bold;border:0;background:rgba(0,0,0,0);',
				       	text:'请填写该过程节点的输入资源或零部件,通过添加选择资源或零部件，并设定默认数据'
					        }]
				}, 
				{type: 'panel',title:'完善输入信息',width: '100%',height:'100%',layout: 'vertical',border: [0,0,1,0],padding: [0,0,0,0],verticalGap:'0',
					children:[     
						{
						type: 'group',
					    width: '100%',
					    layout: 'horizontal',
					    cls: 'e-toolbar',
					    children: [
							{
							    type: 'button',
							    text: '添加基础物质',
							    onclick: function(e){
							    	var func=function(id){
							    		var rows=basematerial.getSelecteds();
							    		//var category=Edo.get('category').getSelected().categoryname;
							    		for(var i=0;i<rows.length;i++){
							    			inputtable.data.insert(0,rows[i]);
							    		}
							    	}
							        var content=new inputresourcecontent();
							        var url='../zwjaction/materialandcategory!getAllcategory.action';
							        var param={};
							        var id='category';
							        refreshdata(materialcategoryTable,url,param,id);
							        
//							        var url='lcc/lccmodule!getBasematerial.action';
//							        var param={categoryid:null};
//							        var id='inputmaterial';
//							        refreshdata(basedataTable,url,param,id);
							 	    var toolbar=new gettoolbar(null,func);
							  	    var win=cims201.utils.getWin(800,480,'选择输入',[content,toolbar]);
							 	    win.show('center', 'middle', true);
							 	    win.set('padding',[0,0,0,0]);
							    }                
							    },
							    {
					                type: 'button',
					                text: '自定义物质',
					                onclick: function(e){
					                	inputtable.data.insert(0, {materialname:''});
					                }
						        },
						        {
					                type: 'button',
					                text: '查看环境影响值',
					                onclick: function(e){
					                	if(Edo.get('inputtable').getSelected()) {
					                		var content=new getmaterialfactor();
						                	var toolbar=new gettoolbar(null,null);
									  	    var win=cims201.utils.getWin(800,480,'查看环境影响值',[content,toolbar]);
									 	    win.show('center', 'middle', true);
									 	    win.set('padding',[0,0,0,0]);
					                	}else {
					                		alert('请选择物质！');
					                	}
					                }	
						    },
				            {
			                type: 'button',
			                text: '删除',
			                onclick: function(e){
			                	var rows=inputtable.getSelecteds();
			                	if(rows.length>0){
						    		inputtable.data.removeRange(rows);
			                	}else{
			                		alert('请选择物质！');
			                	}
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
		                         {header:'物质单位',dataIndex: 'materialunit', width: '100',headerAlign: 'center',align: 'center',editor:'text'},
		                         {header:'物质价格',dataIndex: 'materialprice', width: '100',headerAlign: 'center',align: 'center',editor: 'text'}
//		                        	 {
//		 				       	  		type: 'combo',
//		 				       	  		displayField: 'label', 
//		 				       			valueField: 'label',
//		 				       			width: 80,
//		 			       		    data: [
//		 				       	        {label: 'm2', value: 1},
//		 				       	        {label: 'ml', value: 2},
//		 				       	        {label: 'kwh', value: 3},
//		 				       	        ]
//		 			
//		 				       	   	}
			                   /* {header: '编号', dataIndex: 'id',width:100,headerAlign: 'center',align: 'center'},
			                    {header: '名称', dataIndex: 'name',width:120,headerAlign: 'center',align: 'center'},
			                    {header:'类别',dataIndex: 'category',width: 120, headerAlign: 'center',align: 'center'},
		                        {header:'单位',dataIndex: 'unit', width: 120,headerAlign: 'center',align: 'center'},
		                        {header: '数量', dataIndex: 'amount',width:120,headerAlign: 'center',align: 'center'},
		                        {header:'来源',dataIndex: 'origin',width: 120, headerAlign: 'center',align: 'center'},*/
				        ],
				        //data:basematerialTable
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
									alert(inputmaterial==inputmaterialbackup);
									alert(inputmaterial==levelmodule.levelmoduleobject.inputmaterial);
							       	levelmodule.levelmoduleobject.inputmaterial=inputmaterial;	
								    removeselected();
									openNewTab(stepdata.source[0]);
									updatesteptabledata('stepone');
						        	}},
					        {type: 'button',text: '下一步',width:80,height: 30,style:'margin-left:140px;',onclick: function(e){
					        	 var inputmaterial=inputtable.data.source;
					        	 levelmodule.levelmoduleobject.inputmaterial=inputmaterial;	
						       	 //alert(levelmodule.levelmoduleobject.inputmaterial==inputmaterial);	
					        	 removeselected();
						       	 openNewTab(stepdata.source[2]);
						       	 updatesteptabledata('stepthree');
						       	
					        	}}
				       	
						
						]
						}
			
			]});
	return input;
	}
function inputresourcecontent(){
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
	var inputresourcecontent=Edo.create({
			type: 'box',width: '100%',height: '100%',border:[0,0,0,0],
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
//						            		var r=Edo.get('category').getSelected();
//								    		var url='../zwjaction/materialandcategory!getBasematerial.action';
//								        	var param={categoryid:r.id};
//								        	var id='basematerial';
//								        	refreshdata(basematerialTable,url,param,id);
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
	return inputresourcecontent;
}

function getNewCategoryWin(type,r){
	var func=null;
	if(type=='parent'){
			func=function(id){
				//弹出框的name？
				materialcategory.categoryname=Edo.get('categoryname').text;
				materialcategory.englishname=Edo.get('englishname').text;
				materialcategory.categoryintro=Edo.get('categoryintro').text;
				materialcategory.parentid=null;//数值还是字符串？
				//wjmaterialcategory为后台返回的object
				var data= cims201.utils.getData('../zwjaction/materialandcategory!saveNewcategory.action',{wjmaterialcategory:materialcategory});
				var url='../zwjaction/materialandcategory!getAllcategory.action';
				var param={};
				var id='category';
				refreshdata(materialcategoryTable,url,param,id);
				category={};
			}
	}else{
		func=function(id){
			materialcategory.categoryname=Edo.get('categoryname').text;
			materialcategory.englishname=Edo.get('englishname').text;
			materialcategory.categoryintro=Edo.get('categoryintro').text;
			materialcategory.parentid=Edo.get('parentid').text;
			var data= cims201.utils.getData('../zwjaction/materialandcategory!saveNewcategory.action',{wjmaterialcategory:materialcategory});
			var url='../zwjaction/materialandcategory!getAllcategory.action';
			var param={};
			var id='category';
			refreshdata(materialcategoryTable,url,param,id);
			category={};
		}
	}
	var content=new categorydef();
    if(type=='parent'){
    	Edo.get('parentcategoryname').set('enable',false);
    	Edo.get('parentid').set('text',null);
    	Edo.get('parentid').set('enable',false);
	}else{
		//alert(r.categoryname);
		Edo.get('parentcategoryname').set('text',r.categoryname);
		Edo.get('parentid').set('text',r.id);
	}
	var toolbar=new gettoolbar1(null,func);
    var win=getmywin(400,200,'填写物质类别',[content,toolbar]);
    win.show('center', 'middle', true);
}

	
function categorydef(r){
	var content = Edo.create(
		    {type: 'box',id:'categorywincontent',width: '100%',border: [0,0,0,0],padding: [20,0,0,0],layout: 'vertical',
		    	verticalGap:'10',
	       	    children: [
	       	    {	type : 'formitem',label : '类别:',labelWidth : 100,labelAlign : 'right',layout:'horizontal',
	       	    children : [{type : 'text',width : 160,id : 'categoryname'},
	       	             {type: 'button',text: '验证',
	       	    			onclick:function(e){
	       	    				new validateIfexist();
	       	    			} }
	       	    ]
	       	    },
	       	    {	type : 'formitem',label : '英文名称:',labelWidth : 100,labelAlign : 'right',
		       	    children : [{type : 'text',width : 200,id : 'englishname'}]
		       	},
		       	{	type : 'formitem',label : '类别简介:',labelWidth : 100,labelAlign : 'right',
		       	    children : [{type : 'text',width : 200,id : 'categoryintro'}]
		       	},
		       	{	type : 'formitem',label : '父类别:',labelWidth : 100,labelAlign : 'right',
		       	    children : [{type : 'text',width : 200,visible:false,id : 'parentid'},{type : 'text',width : 200,id : 'parentcategoryname'}]
		       	}
	       	    ]
	       	});
	if(r!=null){
		categorywincontent.setForm(r);
	}
	       	return content;
}


function gettoolbar1(id,func){
    var toolbar = Edo.create(
    {type: 'ct',
    cls: 'e-dialog-toolbar',
    width: '100%',
    layout: 'horizontal',
    height:50,
    horizontalAlign: 'center',
    verticalAlign: 'middle',
    horizontalGap: 10,
    children: [
               
        {
            type: 'button',
            text: '确定',
            minWidth: 70,
            onclick: function(e){
            	if(Edo.get('categoryname').text!=""){
            		new validateIfexist();
            		if(func==undefined){
            		}else{
            			func(id);
                    }
            		this.parent.parent.parent.destroy();
                }
            	else{
            		alert('不能为空！');
            	}
            }
        },{
            type: 'button',
            text: '取消',
            minWidth: 70,
            onclick: function(e){
            this.parent.parent.parent.destroy();

            }
        }
    ]
});
return toolbar;
}

function refreshdata(dataTable,url,param,id){
    var data= cims201.utils.getData(url,param);
	dataTable.set('data',data);
}
function getmywin(width,height,title,children){
	var win=new Edo.containers.Window();
	var win = new Edo.containers.Window();
	win.set('title',title);
	win.set('padding',[0,0,0,0])
	win.set('titlebar',
	    [      //头部按钮栏
	        {
	            cls: 'e-titlebar-close',
	            onclick: function(e){
	                //this是按钮
	                //this.parent是按钮的父级容器, 就是titlebar对象
	                //this.parent.owner就是窗体
	                this.parent.owner.destroy();
	                //deleteMask();
	            }
	        }
	    ]
	);
	
	win.addChild({
	    type: 'box',
	    width: width,
	    height: height, 
	    padding:[0,0,0,0],
	    border:[0,0,0,0],
	    padding:0,
	    children: children
	});	
	return win;
}

function validateIfexist() {
	if(Edo.get('categoryname').text!=""){
		var goal= cims201.utils.getData('../zwjaction/materialandcategory!validateCategory.action',{categoryname:Edo.get('categoryname').text});
		var existresult = goal.existresult;
		//alert(existresult);
		if(existresult=="false") {
			alert("类别已存在，请重新命名！");
		}else {
			alert("验证通过！");
			
		}
	}else{
		alert('还未填写类别名称，无法验证！');
	}
}


function getModifyCategoryWin(r){
	func=function(id){
		materialcategory.id=r.id
		materialcategory.categoryname=Edo.get('categoryname').text;
		materialcategory.englishname=Edo.get('englishname').text;
		materialcategory.categoryintro=Edo.get('categoryintro').text;
		materialcategory.parentid=Edo.get('parentid').text;
		var data= cims201.utils.getData('../zwjaction/materialandcategory!saveNewcategory.action',{wjmaterialcategory:materialcategory});
		var url='../zwjaction/materialandcategory!getAllcategory.action';
		var param={};
		var id='category';
		refreshdata(materialcategoryTable,url,param,id);
		category={};
	}
    var content=new categorydef(r);
    Edo.get('parentid').parent.set('visible',false);
    var toolbar=new gettoolbar1(null,func);
	    var win=getmywin(400,250,'修改物质类别信息',[content,toolbar]);
    win.show('center', 'middle', true);
    
}

function getList(o, success, fail){
    Edo.util.Ajax.request({
        defer: 300,
        url: '../zwjaction/materialandcategory!getBasematerial.action',
        params: o,
        onSuccess: function(text){        
            var data = Edo.util.Json.decode(text);
            if(success) success(data);            
        },
        onFail: function(code){
            if(fail) fail(code);
        }
    });
}

function getNewBaseDataWin(){
	var r=Edo.get('category').getSelected();
	var func=function(id){
		//alert('ok');
		var basematerial={};
		basematerial.materialname=Edo.get('materialname').text;
		basematerial.materialintro=Edo.get('materialintro').text;
		basematerial.materialunit=Edo.get('materialunit').text;
		basematerial.materialprice=Edo.get('materialprice').text;
		basematerial.categoryid=Edo.get('categoryid').text;
		var data= cims201.utils.getData('../zwjaction/materialandcategory!saveNewmaterial.action',{wjbasematerial:basematerial});
		var url='../zwjaction/materialandcategory!getBasematerial.action';
		var param={categoryid:r.id};
		var id='basematerial';
		refreshdata(basematerialTable,url,param,id);
		basematerial={};
 	}
	    var content=new basedatadef();
	    //Edo.get('categoryname').set('text',r.name);
	    //Edo.get('categoryname').set('enable',false);
	    Edo.get('categoryid').set('text',r.id);
	    var toolbar=new gettoolbar(null,func);
 	    var win=getmywin(400,250,'填写基础物质信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	
}

function basedatadef(r){
	var content = Edo.create(
		    {type: 'box',id:'basedatawincontent',width: '100%',height:'70%',border: [0,0,0,0],padding: [10,0,0,0],layout: 'vertical',
		    	verticalGap:'10',
	       	    children: [
	       	    //				           
	       	    {	type : 'formitem',label : '物质名称:',labelWidth : 100,labelAlign : 'right',
	       	    children : [{type : 'text',width : 200,id : 'materialname'}]
	       	    },
	       	   {	type : 'formitem',label : '物质介绍:',labelWidth : 100,labelAlign : 'right',
		       	    children : [{type : 'text',width : 200,id : 'materialintro'}]
		       	},
	       	    {	type : 'formitem',label : '物质单位:',labelWidth : 100,labelAlign : 'right',
	           	    children : [
	           	             {
				       	  		type: 'combo',
				       	  		id : 'materialunit',
				       	  		displayField: 'label', 
				       			valueField: 'value',
				       			/*index:0,*/
				       			width: 200,
				       			data: [
				       			       {label: 'kg', value: 1},
				       			       {label: 'm3', value: 2},
				       			       {label: 'kbq', value: 3}
				       	        ]
			
				       	   	}]
	       	    },
	       	    {	type : 'formitem',label : '物质价格:',labelWidth : 100,labelAlign : 'right',
	           	    children : [{type : 'text',width : 200,id : 'materialprice'}]
	       	    },
	       	    {	type : 'formitem',label : '物质类别:',visible:false, labelWidth : 100,labelAlign : 'right',
		       	    children : [
		       	                //{type : 'text',width : 200,id : 'categoryname',text:basematerial.categoryname},
		       	                {type : 'text',visible:false,width : 200,id : 'categoryid'}
		       	             ]
		       	    }
	       	    ]
	       	});
	if(r!=null){
		basedatawincontent.setForm(r);
		materialunit.set('text',r.unit);
	}
	       	return content;
}

function gettoolbar(id,func){
    var toolbar = Edo.create(
    {type: 'ct',
    cls: 'e-dialog-toolbar',
    width: '100%',
    layout: 'horizontal',
    height: 30,
    horizontalAlign: 'center',
    verticalAlign: 'middle',
    horizontalGap: 10,
    children: [
	        {
            type: 'button',
            text: '确定',
            minWidth: 70,
            onclick: function(e){
            	//alert(Edo.get('categoryid').text);
            	if(func==undefined){
            	}else{
            		func(id);
            	}
            	this.parent.parent.parent.destroy();
            }
        },{
            type: 'button',
            text: '取消',
            minWidth: 70,
            onclick: function(e){
            this.parent.parent.parent.destroy();

            }
        }
    ]
});
return toolbar;
}

function getmywin(width,height,title,children){
	var win=new Edo.containers.Window();
	var win = new Edo.containers.Window();
	win.set('title',title);
	win.set('padding',[0,0,0,0])
	win.set('titlebar',
	    [      //头部按钮栏
	        {
	            cls: 'e-titlebar-close',
	            onclick: function(e){
	                //this是按钮
	                //this.parent是按钮的父级容器, 就是titlebar对象
	                //this.parent.owner就是窗体
	                this.parent.owner.destroy();
	                //deleteMask();
	            }
	        }
	    ]
	);
	
	win.addChild({
	    type: 'box',
	    width: width,
	    height: height, 
	    padding:[0,0,0,0],
	    border:[0,0,0,0],
	    padding:0,
	    children: children
	});	
	return win;
}

function getModifyBaseDataWin(r){
	var r1=Edo.get('category').getSelected();
	var func=function(id){
		var basematerial={};
		basematerial.materialname=Edo.get('materialname').text;
		basematerial.materialintro=Edo.get('materialintro').text;
		basematerial.materialunit=Edo.get('materialunit').text;
		basematerial.materialprice=Edo.get('materialprice').text;
		basematerial.categoryid=Edo.get('categoryid').text;
		basematerial.id=r.id;
		alert(r.id);
		var data= cims201.utils.getData('../zwjaction/materialandcategory!saveNewmaterial.action',{wjbasematerial:basematerial});
		var url='../zwjaction/materialandcategory!getBasematerial.action';
		var param={categoryid:r1.id};
		var id='basematerial';
		refreshdata(basematerialTable,url,param,id);
		basematerial={};
 	}
	    var content=new basedatadef(r);
	    //Edo.get('categoryname').set('enable',false);
	    var toolbar=new gettoolbar(null,func);
 	    var win=getmywin(400,250,'修改基础物质信息',[content,toolbar]);
	    win.show('center', 'middle', true);
}

function getmaterialfactor() {
		var r = Edo.get('inputtable').getSelected();
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
	return getmaterialfactor;
}