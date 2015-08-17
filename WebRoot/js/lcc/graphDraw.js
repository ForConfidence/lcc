
//前后台传输json对象
var basematerial={};
var materialcategory={};


var jichu1Table = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
        },
        {name: 'WH', mapping: 'WH',  type: 'string'
        },
        {name: 'CC1', mapping: 'CC1', type: 'string'
        },
        {name: 'CC2', mapping: 'CC2', type: 'string'
        },
        {name: 'MC', mapping: 'MC',  type: 'string'
        },
        {name: 'XC', mapping: 'XC',  type: 'string'
        },
        {name: 'CP', mapping: 'CP',  type: 'string'
        },
        {name: 'GD', mapping: 'GD',  type: 'string'
        },
        {name: 'DM', mapping: 'DM',  type: 'string'
        },
        {name: 'ZLH', mapping: 'ZLH',  type: 'string'
        },
        {name: 'GY', mapping: 'GY',  type: 'string'
        },
        {name: 'ZQ', mapping: 'ZQ',  type: 'string'
        },
        {name: 'CZYH', mapping: 'CZYH',  type: 'string'
        },
        {name: 'PARENTID', mapping: 'PARENTID',  type: 'string'
        },
        {name: 'GRADE', mapping: 'GRADE',  type: 'string'
        },
        {name: 'pid', mapping: 'pid',  type: 'string'
        }
    ]
});
var gongyi1Table = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
        },
        {name: 'wh', mapping: 'wh',  type: 'string'
        },
        {name: 'gxh', mapping: 'gxh',  type: 'string'
        },
        {name: 'gxm', mapping: 'gxm',  type: 'string'
        },
        {name: 'gxmc', mapping: 'gxmc',  type: 'string'
        },
        {name: 'zbgs', mapping: 'zbgs',  type: 'string'
        },
        {name: 'degs', mapping: 'degs',  type: 'string'
        },
        {name: 'gsqf', mapping: 'gsqf',  type: 'string'
        },
        {name: 'js', mapping: 'js',  type: 'string'
        },
        {name: 'sbm', mapping: 'sbm',  type: 'string'
        },
        {name: 'gxbz', mapping: 'gxbz',  type: 'string'
        },
        {name: 'whid', mapping: 'whid',  type: 'string'
        }
    ]
});

//要写好action，不然前台无法展示
//var url='zwjaction/bom!getBom.action';
//var param={};
//var id='jichu1';
//refreshdata(jichu1Table,url,param,id);

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
			title:'物号为61000667000的汽轮机BOM',
			height: '100%',
			width:300,
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
					        {type: 'button',id:'xgbtn1',text: '修改类别',
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
				id:'jichu1',
				type:'tree',
		        width: 300,
		        height: '100%',
		        headerVisible: false,
		        autoColumns: true,
		        horizontalLine: false,
		        
		        //动态加载代码start
		        onbodymousedown: function(e){
		        	var r = this.getSelected();
		        	//var r = Edo.getElementById('jichu1').getSelected();
		        	//alert(r.pid);
		        },
		        onbeforetoggle: function(e){
		            var row = e.record;
		            //alert(row.pid);
		            var dataTree = this.data;                        
		            if(!row.children || row.children.length == 0){
		                //显示树形节点的loading图标,表示正在加载
		            	this.addItemCls(row, 'tree-node-loading');
		                Edo.util.Ajax.request({
		                	url: 'zwjaction/bom!getBom.action',
		                    params: {
		                    	PARENTID:row.pid   //传递父节点的Name(也可以是ID)
		                    },
		                    defer: 200,
		                    onSuccess: function(text){
		                        var data = Edo.util.Json.decode(text);
		                        //alert(data);
		                        dataTree.beginChange();
		                        if(!(data instanceof Array)) data = [data]; //必定是数组
		                        data.each(function(o){
		                            dataTree.insert(0, o, row);    
		                        });                    
		                        dataTree.endChange();    
		                    }
		                });
		            }
		            return !!row.children;
		        },
		        //动态加载代码end
		        
		        columns: [{header: 'BOM名称',dataIndex: 'MC'}],
		        onselectionchange: function(e){	
		        	var r=Edo.get('jichu1').getSelected();
		        	var url='zwjaction/bom!getGongyi.action';
		        	var param={wh:r.WH};
		        	var id='gongyi1';
		        	refreshdata(gongyi1Table,url,param,id);
		        },
				data:jichu1Table
		       	}
		  ]
	      },
       	  {
    	    type:'panel',
			title:'零部件工艺',
			width: 850,
			height: '100%',
			verticalGap:'0',
			padding:[0,0,0,0],
			border:[0,1,0,0],
			children:[{
				type: 'group',
			    width: 850,
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
					        {type: 'button',id:'rebtn',text: '刷新',
				            	onclick:function(e){
//				            		var r=Edo.get('category').getSelected();
//						    		var url='zwjaction/materialandcategory!getBasematerial.action';
//						        	var param={categoryid:r.id};
//						        	var id='basematerial';
//						        	refreshdata(basematerialTable,url,param,id);
						        	myPager.index = 0;
						        	myPager.size = 23;
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
					            		var url='zwjaction/materialandcategory!sousuoBasematerial.action';
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
				id: 'gongyi1', type: 'table', width: 850, height: '100%',
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
	                         {header:'工序名称',dataIndex: 'gxmc', width: '200',headerAlign: 'center',align: 'center'},
	                         {header:'准备工时',dataIndex: 'zbgs',width: '200', headerAlign: 'center',align: 'center'},
	                         {header:'定额工时',dataIndex: 'degs',width: '200', headerAlign: 'center',align: 'center'},
	                         {header:'设备码',dataIndex: 'sbm',width: '200', headerAlign: 'center',align: 'center'},
	                         ],
				data:gongyi1Table
			}
			]  
		}
		
		
	
	    ]
});


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
				var data= cims201.utils.getData('zwjaction/materialandcategory!saveNewcategory.action',{wjmaterialcategory:materialcategory});
				var url='zwjaction/materialandcategory!getAllcategory.action';
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
			var data= cims201.utils.getData('zwjaction/materialandcategory!saveNewcategory.action',{wjmaterialcategory:materialcategory});
			var url='zwjaction/materialandcategory!getAllcategory.action';
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
		var goal= cims201.utils.getData('zwjaction/materialandcategory!validateCategory.action',{categoryname:Edo.get('categoryname').text});
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
		var data= cims201.utils.getData('zwjaction/materialandcategory!saveNewcategory.action',{wjmaterialcategory:materialcategory});
		var url='zwjaction/materialandcategory!getAllcategory.action';
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
        url: 'zwjaction/materialandcategory!getBasematerial.action',
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
		var data= cims201.utils.getData('zwjaction/materialandcategory!saveNewmaterial.action',{wjbasematerial:basematerial});
		var url='zwjaction/materialandcategory!getBasematerial.action';
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
		var data= cims201.utils.getData('zwjaction/materialandcategory!saveNewmaterial.action',{wjbasematerial:basematerial});
		var url='zwjaction/materialandcategory!getBasematerial.action';
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


Edo.util.Ajax.request({
    type: 'post',        
    url: 'zwjaction/bom!getBom.action',
    params: {
        //PARENTID: null,   //传递父节点的Name(也可以是ID)
        //id:moduleobj.productid
    },
    onSuccess: function(text){
        var data = Edo.util.Json.decode(text);
        Edo.get('jichu1').set('data', data);
    }
});