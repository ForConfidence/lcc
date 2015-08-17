//前后台传输json对象
var myPager = Edo.create({
	id: 'paging',
	type: 'pagingbar',
    border: 0,
    padding:[0,0,0,0],
    cls: 'e-toolbar',
    width: '100%',
    height: 20
});	


myPager.on('paging',function(e){
	search();	
});
function search(){ 
	    var index = myPager.index;    
	    var size = myPager.size;
	    var r=Edo.get('unitcategory').getSelected();
	    //alert(r.id);
	    var data = cims201.utils.getData("zwjaction/materialandcategory!getUnitdetail.action",{unitcategoryid:r.id,index:index+1,size:size});
		myPager.total = data.total;
		myPager.totalPage = data.totalPage;
    	unitdetailTable.load(data.data);
		myPager.refresh();
}

var unitdetail={};
var unitcategory={};


var unitdetailTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'mid', type: 'string'
        },
        {name: 'unitname', mapping: 'unitname',  type: 'string'
        },
        {name: 'unitintro', mapping: 'unitintro', type: 'string'
        },
        {name: 'unitsynonyms', mapping: 'unitsynonyms', type: 'string'
        },
        {name: 'conversionfactor', mapping: 'conversionfactor',  type: 'string'
        },
        {name: 'formula', mapping: 'formula',  type: 'string'
        },
        {name: 'isreference', mapping: 'isreference',  type: 'string'
        },
        {name: 'unitcategoryname', mapping: 'unitcategoryname',  type: 'string'
        },
        {name: 'uuid', mapping: 'uuid',  type: 'string'
        },
        {name: 'unitcategoryid', mapping: 'unitcategoryid',  type: 'string'
        }
    ]
});
var unitcategoryTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
        },
        {name: 'unitcategoryname', mapping: 'unitcategoryname',  type: 'string'
        },
        {name: 'unitcategoryintro', mapping: 'unitcategoryintro',  type: 'string'
        },
        {name: 'defaultflowproperty', mapping: 'defaultflowproperty',  type: 'string'
        },
        {name: 'parentname', mapping: 'parentname',  type: 'string'
        },
        {name: 'parentid', mapping: 'parentid',  type: 'string'
        },
        {name: 'uuid', mapping: 'uuid',  type: 'string'
        }
        
    ]
});
//要写好action，不然前台无法展示
var url='zwjaction/materialandcategory!getAllunitcategory.action';
//??
//var param={index:'basedata'};
//??
var param={};
var id='unitcategory';
refreshdata(unitcategoryTable,url,param,id);

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
			title:'单位类别',
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
					        {type: 'button',id:'xgbtn1',text: '刷新',
								onclick: function(e){
									var url='zwjaction/materialandcategory!getAllunitcategory.action';
									var param={};
									var id='unitcategory';
									refreshdata(unitcategoryTable,url,param,id);
						        }
					        }
					      ]
				},
		        {
				id:'unitcategory',
				type:'tree',		
		        width: 300,
		        height: '100%',
		        headerVisible: false,
		        autoColumns: true,
		        horizontalLine: false,
		        columns: [{header: '大类名称',dataIndex: 'unitcategoryname'}],
		        onselectionchange: function(e){	
		        	myPager.index = 0;
		        	myPager.size = 23;
		        	search();
		        },
				data:unitcategoryTable
		       	}
		  ]
	      },
       	  {
    	    type:'panel',
			title:'单位列表',
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
					        {type: 'button',text: '查看详情',
					        	onclick: function(e){
					        		var r=Edo.get('unitdetail').getSelected();
					        		if(r){
						        		alert('单位名称：'+r.unitname+'\n'+'单位介绍:'+r.unitintro+'\n'+'单位别称：'+r.unitsynonyms+'\n'+'转换因子:'+r.conversionfactor+'\n'+'化学式：'+r.formula+'\n'+'是否为默认单位:'+r.isreference+'\n'+'单位类别名称:'+r.unitcategoryname);
					        		}else {
					        			alert('请选择单位！');
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
					            		var r=Edo.get('unitcategory').getSelected();
					            		var url='zwjaction/materialandcategory!sousuoUnitdetail.action';
							        	var param={unitcategoryid:r.id,unitname:Edo.get('searchfactor').getValue()};
							        	var id='unitdetail';
							        	refreshdata(unitdetailTable,url,param,id);
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
				id: 'unitdetail', type: 'table', width: 850, height: '100%',
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
	                         {header:'单位名称',dataIndex: 'unitname', width: '200',headerAlign: 'center',align: 'center'},
	                         {header:'单位介绍',dataIndex: 'unitintro',width: '200', headerAlign: 'center',align: 'center'},
	                         {header:'转换因子',dataIndex: 'conversionfactor',width: '200', headerAlign: 'center',align: 'center'},
	                         {header:'是否为默认值',dataIndex: 'isreference',width: '200', headerAlign: 'center',align: 'center'},
	                         ],
				data:unitdetailTable
			},
			myPager
			]  
		}
	    ]
});


//function getNewCategoryWin(type,r){
//	var func=null;
//	if(type=='parent'){
//			func=function(id){
//				//弹出框的name？
//				materialcategory.categoryname=Edo.get('categoryname').text;
//				materialcategory.englishname=Edo.get('englishname').text;
//				materialcategory.categoryintro=Edo.get('categoryintro').text;
//				materialcategory.parentid=null;//数值还是字符串？
//				//wjmaterialcategory为后台返回的object
//				var data= cims201.utils.getData('zwjaction/materialandcategory!saveNewcategory.action',{wjmaterialcategory:materialcategory});
//				var url='zwjaction/materialandcategory!getAllcategory.action';
//				var param={};
//				var id='category';
//				refreshdata(materialcategoryTable,url,param,id);
//				category={};
//			}
//	}else{
//		func=function(id){
//			materialcategory.categoryname=Edo.get('categoryname').text;
//			materialcategory.englishname=Edo.get('englishname').text;
//			materialcategory.categoryintro=Edo.get('categoryintro').text;
//			materialcategory.parentid=Edo.get('parentid').text;
//			var data= cims201.utils.getData('zwjaction/materialandcategory!saveNewcategory.action',{wjmaterialcategory:materialcategory});
//			var url='zwjaction/materialandcategory!getAllcategory.action';
//			var param={};
//			var id='category';
//			refreshdata(materialcategoryTable,url,param,id);
//			category={};
//		}
//	}
//	var content=new categorydef();
//    if(type=='parent'){
//    	Edo.get('parentcategoryname').set('enable',false);
//    	Edo.get('parentid').set('text',null);
//    	Edo.get('parentid').set('enable',false);
//	}else{
//		//alert(r.categoryname);
//		Edo.get('parentcategoryname').set('text',r.categoryname);
//		Edo.get('parentid').set('text',r.id);
//	}
//	var toolbar=new gettoolbar1(null,func);
//    var win=getmywin(400,200,'填写物质类别',[content,toolbar]);
//    win.show('center', 'middle', true);
//}
//
//	
//function categorydef(r){
//	var content = Edo.create(
//		    {type: 'box',id:'categorywincontent',width: '100%',border: [0,0,0,0],padding: [20,0,0,0],layout: 'vertical',
//		    	verticalGap:'10',
//	       	    children: [
//	       	    {	type : 'formitem',label : '类别:',labelWidth : 100,labelAlign : 'right',layout:'horizontal',
//	       	    children : [{type : 'text',width : 160,id : 'categoryname'},
//	       	             {type: 'button',text: '验证',
//	       	    			onclick:function(e){
//	       	    				new validateIfexist();
//	       	    			} }
//	       	    ]
//	       	    },
//	       	    {	type : 'formitem',label : '英文名称:',labelWidth : 100,labelAlign : 'right',
//		       	    children : [{type : 'text',width : 200,id : 'englishname'}]
//		       	},
//		       	{	type : 'formitem',label : '类别简介:',labelWidth : 100,labelAlign : 'right',
//		       	    children : [{type : 'text',width : 200,id : 'categoryintro'}]
//		       	},
//		       	{	type : 'formitem',label : '父类别:',labelWidth : 100,labelAlign : 'right',
//		       	    children : [{type : 'text',width : 200,visible:false,id : 'parentid'},{type : 'text',width : 200,id : 'parentcategoryname'}]
//		       	}
//	       	    ]
//	       	});
//	if(r!=null){
//		categorywincontent.setForm(r);
//	}
//	       	return content;
//}
//
//
//function gettoolbar1(id,func){
//    var toolbar = Edo.create(
//    {type: 'ct',
//    cls: 'e-dialog-toolbar',
//    width: '100%',
//    layout: 'horizontal',
//    height:50,
//    horizontalAlign: 'center',
//    verticalAlign: 'middle',
//    horizontalGap: 10,
//    children: [
//               
//        {
//            type: 'button',
//            text: '确定',
//            minWidth: 70,
//            onclick: function(e){
//            	if(Edo.get('categoryname').text!=""){
//            		new validateIfexist();
//            		if(func==undefined){
//            		}else{
//            			func(id);
//                    }
//            		this.parent.parent.parent.destroy();
//                }
//            	else{
//            		alert('不能为空！');
//            	}
//            }
//        },{
//            type: 'button',
//            text: '取消',
//            minWidth: 70,
//            onclick: function(e){
//            this.parent.parent.parent.destroy();
//
//            }
//        }
//    ]
//});
//return toolbar;
//}

function refreshdata(dataTable,url,param,id){
    var data= cims201.utils.getData(url,param);
	dataTable.set('data',data);
}
//function getmywin(width,height,title,children){
//	var win=new Edo.containers.Window();
//	var win = new Edo.containers.Window();
//	win.set('title',title);
//	win.set('padding',[0,0,0,0])
//	win.set('titlebar',
//	    [      //头部按钮栏
//	        {
//	            cls: 'e-titlebar-close',
//	            onclick: function(e){
//	                //this是按钮
//	                //this.parent是按钮的父级容器, 就是titlebar对象
//	                //this.parent.owner就是窗体
//	                this.parent.owner.destroy();
//	                //deleteMask();
//	            }
//	        }
//	    ]
//	);
//	
//	win.addChild({
//	    type: 'box',
//	    width: width,
//	    height: height, 
//	    padding:[0,0,0,0],
//	    border:[0,0,0,0],
//	    padding:0,
//	    children: children
//	});	
//	return win;
//}
//
//function validateIfexist() {
//	if(Edo.get('categoryname').text!=""){
//		var goal= cims201.utils.getData('zwjaction/materialandcategory!validateCategory.action',{categoryname:Edo.get('categoryname').text});
//		var existresult = goal.existresult;
//		//alert(existresult);
//		if(existresult=="false") {
//			alert("类别已存在，请重新命名！");
//		}else {
//			alert("验证通过！");
//			
//		}
//	}else{
//		alert('还未填写类别名称，无法验证！');
//	}
//}
//
//
//function getModifyCategoryWin(r){
//	func=function(id){
//		materialcategory.id=r.id
//		materialcategory.categoryname=Edo.get('categoryname').text;
//		materialcategory.englishname=Edo.get('englishname').text;
//		materialcategory.categoryintro=Edo.get('categoryintro').text;
//		materialcategory.parentid=Edo.get('parentid').text;
//		var data= cims201.utils.getData('zwjaction/materialandcategory!saveNewcategory.action',{wjmaterialcategory:materialcategory});
//		var url='zwjaction/materialandcategory!getAllcategory.action';
//		var param={};
//		var id='category';
//		refreshdata(materialcategoryTable,url,param,id);
//		category={};
//	}
//    var content=new categorydef(r);
//    Edo.get('parentid').parent.set('visible',false);
//    var toolbar=new gettoolbar1(null,func);
//	    var win=getmywin(400,250,'修改物质类别信息',[content,toolbar]);
//    win.show('center', 'middle', true);
//    
//}
//
//function getList(o, success, fail){
//    Edo.util.Ajax.request({
//        defer: 300,
//        url: 'zwjaction/materialandcategory!getBasematerial.action',
//        params: o,
//        onSuccess: function(text){        
//            var data = Edo.util.Json.decode(text);
//            if(success) success(data);            
//        },
//        onFail: function(code){
//            if(fail) fail(code);
//        }
//    });
//}
//
//function getNewBaseDataWin(){
//	var r=Edo.get('category').getSelected();
//	var func=function(id){
//		//alert('ok');
//		var basematerial={};
//		basematerial.materialname=Edo.get('materialname').text;
//		basematerial.materialintro=Edo.get('materialintro').text;
//		basematerial.materialunit=Edo.get('materialunit').text;
//		basematerial.materialprice=Edo.get('materialprice').text;
//		basematerial.categoryid=Edo.get('categoryid').text;
//		var data= cims201.utils.getData('zwjaction/materialandcategory!saveNewmaterial.action',{wjbasematerial:basematerial});
//		var url='zwjaction/materialandcategory!getBasematerial.action';
//		var param={categoryid:r.id};
//		var id='basematerial';
//		refreshdata(basematerialTable,url,param,id);
//		basematerial={};
// 	}
//	    var content=new basedatadef();
//	    //Edo.get('categoryname').set('text',r.name);
//	    //Edo.get('categoryname').set('enable',false);
//	    Edo.get('categoryid').set('text',r.id);
//	    var toolbar=new gettoolbar(null,func);
// 	    var win=getmywin(400,250,'填写基础物质信息',[content,toolbar]);
//	    win.show('center', 'middle', true);
//	
//}
//
//function basedatadef(r){
//	var content = Edo.create(
//		    {type: 'box',id:'basedatawincontent',width: '100%',height:'70%',border: [0,0,0,0],padding: [10,0,0,0],layout: 'vertical',
//		    	verticalGap:'10',
//	       	    children: [
//	       	    //				           
//	       	    {	type : 'formitem',label : '物质名称:',labelWidth : 100,labelAlign : 'right',
//	       	    children : [{type : 'text',width : 200,id : 'materialname'}]
//	       	    },
//	       	   {	type : 'formitem',label : '物质介绍:',labelWidth : 100,labelAlign : 'right',
//		       	    children : [{type : 'text',width : 200,id : 'materialintro'}]
//		       	},
//	       	    {	type : 'formitem',label : '物质单位:',labelWidth : 100,labelAlign : 'right',
//	           	    children : [
//	           	             {
//				       	  		type: 'combo',
//				       	  		id : 'materialunit',
//				       	  		displayField: 'label', 
//				       			valueField: 'value',
//				       			/*index:0,*/
//				       			width: 200,
//				       			data: [
//				       			       {label: 'kg', value: 1},
//				       			       {label: 'm3', value: 2},
//				       			       {label: 'kbq', value: 3}
//				       	        ]
//			
//				       	   	}]
//	       	    },
//	       	    {	type : 'formitem',label : '物质价格:',labelWidth : 100,labelAlign : 'right',
//	           	    children : [{type : 'text',width : 200,id : 'materialprice'}]
//	       	    },
//	       	    {	type : 'formitem',label : '物质类别:',visible:false, labelWidth : 100,labelAlign : 'right',
//		       	    children : [
//		       	                //{type : 'text',width : 200,id : 'categoryname',text:basematerial.categoryname},
//		       	                {type : 'text',visible:false,width : 200,id : 'categoryid'}
//		       	             ]
//		       	    }
//	       	    ]
//	       	});
//	if(r!=null){
//		basedatawincontent.setForm(r);
//		materialunit.set('text',r.unit);
//	}
//	       	return content;
//}
//
//function gettoolbar(id,func){
//    var toolbar = Edo.create(
//    {type: 'ct',
//    cls: 'e-dialog-toolbar',
//    width: '100%',
//    layout: 'horizontal',
//    height: 30,
//    horizontalAlign: 'center',
//    verticalAlign: 'middle',
//    horizontalGap: 10,
//    children: [
//	        {
//            type: 'button',
//            text: '确定',
//            minWidth: 70,
//            onclick: function(e){
//            	//alert(Edo.get('categoryid').text);
//            	if(func==undefined){
//            	}else{
//            		func(id);
//            	}
//            	this.parent.parent.parent.destroy();
//            }
//        },{
//            type: 'button',
//            text: '取消',
//            minWidth: 70,
//            onclick: function(e){
//            this.parent.parent.parent.destroy();
//
//            }
//        }
//    ]
//});
//return toolbar;
//}
//
//function getmywin(width,height,title,children){
//	var win=new Edo.containers.Window();
//	var win = new Edo.containers.Window();
//	win.set('title',title);
//	win.set('padding',[0,0,0,0])
//	win.set('titlebar',
//	    [      //头部按钮栏
//	        {
//	            cls: 'e-titlebar-close',
//	            onclick: function(e){
//	                //this是按钮
//	                //this.parent是按钮的父级容器, 就是titlebar对象
//	                //this.parent.owner就是窗体
//	                this.parent.owner.destroy();
//	                //deleteMask();
//	            }
//	        }
//	    ]
//	);
//	
//	win.addChild({
//	    type: 'box',
//	    width: width,
//	    height: height, 
//	    padding:[0,0,0,0],
//	    border:[0,0,0,0],
//	    padding:0,
//	    children: children
//	});	
//	return win;
//}
//
//function getModifyBaseDataWin(r){
//	var r1=Edo.get('category').getSelected();
//	var func=function(id){
//		var basematerial={};
//		basematerial.materialname=Edo.get('materialname').text;
//		basematerial.materialintro=Edo.get('materialintro').text;
//		basematerial.materialunit=Edo.get('materialunit').text;
//		basematerial.materialprice=Edo.get('materialprice').text;
//		basematerial.categoryid=Edo.get('categoryid').text;
//		basematerial.id=r.id;
//		alert(r.id);
//		var data= cims201.utils.getData('zwjaction/materialandcategory!saveNewmaterial.action',{wjbasematerial:basematerial});
//		var url='zwjaction/materialandcategory!getBasematerial.action';
//		var param={categoryid:r1.id};
//		var id='basematerial';
//		refreshdata(basematerialTable,url,param,id);
//		basematerial={};
// 	}
//	    var content=new basedatadef(r);
//	    //Edo.get('categoryname').set('enable',false);
//	    var toolbar=new gettoolbar(null,func);
// 	    var win=getmywin(400,250,'修改基础物质信息',[content,toolbar]);
//	    win.show('center', 'middle', true);
//}