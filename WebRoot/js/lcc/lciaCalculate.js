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
	//alert('ss')
	    
	    var index = myPager.index;    
	    var size = myPager.size;
	    var r=Edo.get('lciamethod').getSelected();
	    var data = cims201.utils.getData("zwjaction/lciamethod!getLciafactorbylciacategoryid.action",{lciacategoryid:r.id,index:index+1,size:size});
		myPager.total = data.total;
		myPager.totalPage = data.totalPage;
		lciafactorTable.load(data.data);
		myPager.refresh();
}



var lciafactor={};
var lciamethodcategory={};

var lciafactorTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
        },
        {name: 'factorcategoryname', mapping: 'factorcategoryname',  type: 'string'
        },
        {name: 'factorsubcategoryname', mapping: 'factorsubcategoryname', type: 'string'
        },
        {name: 'factorname', mapping: 'factorname', type: 'string'
        },
        {name: 'factorunit', mapping: 'factorunit',  type: 'string'
        },
        {name: 'factorvalue', mapping: 'factorvalue',  type: 'string'
        },
        {name: 'lciacategoryid', mapping: 'lciacategoryid',  type: 'string'
        },
        {name: 'materialcategoryid', mapping: 'materialcategoryid',  type: 'string'
        }
    ]
});
var lciamethodcategoryTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
        },
        {name: 'lcianame', mapping: 'lcianame',  type: 'string'
        },
        {name: 'lciacategory', mapping: 'lciacategory',  type: 'string'
        },
        {name: 'lciafactor', mapping: 'lciafactor',  type: 'string'
        },
        {name: 'lciafactorunit', mapping: 'lciafactorunit',  type: 'string'
        }
    ]
});

var url='zwjaction/lciamethod!getAlllciamethod.action';
var param={};
var id='lciamethod';
refreshdata(lciamethodcategoryTable,url,param,id);

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
			title:'环境影响评价方法',
			height: '100%',
			width:400,
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
					         text: '导入新方法',
					         onclick: function(e){

					         }
					        },
					        {type: 'split'},
					        {type: 'button',text: '刷新列表',
					        	onclick: function(e){
					        		var r=Edo.get('lciamethod').getSelected();
						    		var url='zwjaction/lciamethod!getAlllciamethod.action';
						        	var param={};
						        	var id='lciamethod';
						        	refreshdata(lciamethodcategoryTable,url,param,id);
					        	}},
					        {type: 'split'},
						    {type: 'button',text: '查看详情',
						        	onclick: function(e){
						        		var r=lciamethod.getSelected();
							        	if(r){
							        		alert('评价方法名称：'+r.lcianame+'\n'+'环境影响指标:'+r.lciacategory+'\n'+'指标当量因子：'+r.lciafactor+'\n'+'当量因子单位:'+r.lciafactorunit);
							        	}else{
							        		alert('请选择指标');
							        	}
						        	}},
						    {type: 'split'},
						    {type: 'button',text: '查看影响因子',
							        onclick: function(e){
							        	var r=lciamethod.getSelected();
							        	if(r){
							        		//alert(r.id);
//								        	var url='zwjaction/lciamethod!getLciafactorbylciacategoryid.action';
//								        	var param={lciacategoryid:r.id};
//								        	var id='lciafactor';
//								        	refreshdata(lciafactorTable,url,param,id);
								        	
								        	myPager.index = 0;
								        	myPager.size = 23;
								        	search();
							        	}else{
							        		alert('请选择指标！');
							        	}
							        }}
					      ]
				},
		        {
				id: 'lciamethod', type: 'table', width: 400, height: '100%',
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
	                         {header:'方法名称',dataIndex: 'lcianame', width: '140',headerAlign: 'left',align: 'left'},
	                         {header:'影响类别',dataIndex: 'lciacategory',width: '230', headerAlign: 'left',align: 'left'},
	                         //{header:'当量因子',dataIndex: 'lciafactor',width: '75', headerAlign: 'center',align: 'center'},
	                         //{header:'当量单位',dataIndex: 'lciafactorunit',width: '75', headerAlign: 'center',align: 'center'},
	                         
	                         ],
				data:lciamethodcategoryTable
		       	}
		  ]
	      },
       	  {
    	    type:'panel',
			title:'环境影响因子',
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
					        {type: 'button',text: '新增影响因子',
					        	onclick: function(e){
//					        		var r=Edo.get('lciamethod').getSelected();
//						        	if(r){
//						        		new getNewBaseDataWin();
//						        	}else{
//						        		alert('请选择指标类别');
//						        	}
					        	}},
							{type: 'split'},
					        {type: 'button',text: '修改影响因子',
								onclick: function(e){
									
					        }},
				            {type: 'split'},
					        {type: 'button',id:'rebtn',text: '刷新',
				            	onclick:function(e){
//				            		var r=Edo.get('lciamethod').getSelected();
//						    		var url='zwjaction/lciamethod!getLciafactorbylciacategoryid.action';
//						        	var param={lciacategoryid:r.id};
//						        	var id='lciafactor';
//						        	refreshdata(lciafactorTable,url,param,id);
				            		myPager.index = 0;
						        	myPager.size = 23;
						        	search();
				            		
					        }},
					        {type: 'split'},
						    {type: 'button',text: '查看详情',
						        	onclick: function(e){
						        		var r=lciafactor.getSelected();
							        	if(r){
							        		alert('影响因子名称：'+r.factorname+'\n'+'影响因子单位:'+r.factorunit+'\n'+'影响因子均值：'+r.factorvalue+'\n'+'影响因子物质类别:'+r.materialcategoryid+'\n'+'影响因子大类名称：'+r.factorcategoryname+'\n'+'影响因子小类名称:'+r.factorsubcategoryname+'\n'+'影响因子所属指标:'+r.lciacategoryid);
							        	}else{
							        		alert('请选择影响因子！');
							        	}
						        	}},
					        {type:'search', 
					        	id: 'searchfactor',
					        	ontrigger: function(e){
					            this.set('clearVisible', true);
					            	if(Edo.get('searchfactor').getValue()!=""){
					            		//alert("ok！");
					            		var r=Edo.get('lciamethod').getSelected();
					            		var url='zwjaction/lciamethod!sousuoLciafactor.action';
							        	var param={lciacategoryid:r.id,factorname:Edo.get('searchfactor').getValue()};
							        	alert(r.id);
							        	alert(Edo.get('searchfactor').getValue());
							        	var id='lciafactor';
							        	refreshdata(lciafactorTable,url,param,id);
					            	}else{
					            		alert('请选择搜索内容！');
					            	}
					        	},
					        	oncleartrigger: function(e){
					        		Edo.get('searchfactor').resetValue();
					        	}
					        }
					        ]
			},
			{
				id: 'lciafactor', type: 'table', width: 680, height: '100%',
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
	                         {header:'因子名称',dataIndex: 'factorname', width: '300',headerAlign: 'center',align: 'center'},
	                         {header:'因子单位',dataIndex: 'factorunit',width: '80', headerAlign: 'center',align: 'center'},
	                         {header:'因子当量',dataIndex: 'factorvalue',width: '100', headerAlign: 'center',align: 'center'},
	                         {header:'因子物质类别',dataIndex: 'materialcategoryid',width: '80', headerAlign: 'center',align: 'center'},
	                         //{header:'指标类别',dataIndex: 'lciacategoryid',width: '60', headerAlign: 'center',align: 'center'}
	                         ],
				data:lciafactorTable
			},
			myPager
			]  
		}
	    ]
});


function refreshdata(dataTable,url,param,id){
    var data= cims201.utils.getData(url,param);
	dataTable.set('data',data);
}


//function getNewBaseDataWin(){
//	var r=Edo.get('lciamethod').getSelected();
//	var func=function(id){
//		//alert('ok');
//		var lciafactor={};
//		lciafactor.factorcategoryname=Edo.get('factorcategoryname').text;
//		lciafactor.factorsubcategoryname=Edo.get('factorsubcategoryname').text;
//		lciafactor.factorname=Edo.get('factorname').text;
//		lciafactor.factorunit=Edo.get('factorunit').text;
//		lciafactor.factorvalue=Edo.get('factorvalue').text;
//		lciafactor.lciacategoryid=Edo.get('lciacategoryid').text;
//		lciafactor.materialcategoryid=Edo.get('materialcategoryid').text;
//		
//		var data= cims201.utils.getData('zwjaction/materialandcategory!saveNewlciafactor.action',{lciafactor:lciafactor});
//		var url='zwjaction/lciamethod!getLciafactorbylciacategoryid.action';
//		var param={lciacategoryid:r.id};
//		var id='lciafactor';
//		refreshdata(lciafactorTable,url,param,id);
//		lciafactor={};
// 	}
//	    var content=new basedatadef();
//	    //Edo.get('categoryname').set('text',r.name);
//	    //Edo.get('categoryname').set('enable',false);
//	    Edo.get('categoryid').set('text',r.id);
//	    var toolbar=new gettoolbar(null,func);
// 	    var win=getmywin(400,250,'填写影响因子信息',[content,toolbar]);
//	    win.show('center', 'middle', true);
//	
//}