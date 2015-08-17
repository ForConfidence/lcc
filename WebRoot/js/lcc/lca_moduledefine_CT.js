//定义lca模型
var a=document.getElementById('productContainer');
var c=document.getElementById('detaildiv');
var b=document.getElementById('builder');
var iscomponentchooosen=false;
var moduleobj={
		versionid:null,
		productid:null,
		modulename:null,
		modulenote:null,
		buildtype:null
		}

function definemodule(){
	var content=new gettypedefine();
	var win=new Edo.containers.Window();
	var win = new Edo.containers.Window();
	win.set('title','选择构建类型');
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
	    width: 300,
	    height: 200, 
	    style:'border:0;',
	    padding:0,
	    children: content
	});	
	deleteMask();
    win.show('center', 'middle', true);
}
//传递模型对象到iframe aa,即构建页面中
function delivermoduleobject(){
	/* Edo.get('modulename').set('text',moduleobj.modulename);
  bbl  Edo.get('modulenote').set('text',moduleobj.modulenote); */
	aa.initmodule(moduleobj);

}
//创建零部件模型
function createcompmodule(){
	var sb=document.getElementById('stagebutton');
	sb.style.width='0px';
	movep();
}
var t1;
var m1=0;
 //展开零件信息panel
function movep(){ 
		if(m1<600){
     m1=m1+20;
	 a.style.width=m1;
	 t1=setTimeout('movep()',1);

	}
}
function resetm1(){
	m1=0;
}


//定义模型类型选择
function gettypedefine(){
	
	var content = Edo.create(
	    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',horizontalAlign:'center',verticalAlign:'middle',
       	    children: [
       	    	{	type : 'button',text : '新建模板',width:150,height:40,align:'center',onclick:function(e){new getlcamoduledefine();this.parent.parent.parent.destroy();}
       	    },
       	    {	type : 'button',text : '修改已有模板',width:150,height:40,align:'center',onclick:function(e){new getlcamoduledefine();this.parent.parent.parent.destroy();}
       	    }	           
       	   /*  {	type : 'button',text : 'LCA模型',width:150,height:40,align:'center',onclick:function(e){moduleobj.moduletype='LCA';new getlcamoduledefine();this.parent.parent.parent.destroy();}
       	    },
       	    {	type : 'button',text : 'PDM模型',width:150,height:40,align:'center',onclick:function(e){moduleobj.moduletype='PDM';new getPDMmoduledefine();this.parent.parent.parent.destroy();} 
       	    } */
       	    ]
       	});
   	return content;
       	
}
//构建零部件树信息

function lcatreedivdefine(){
   a.style.width=0;
    Edo.create(
		              
    {
    id:'treect',
    type: 'panel',
   	title: '选择零部件类别和生命周期边界',
    width: 600,
    height: 580,
    verticalGap:'0',
    horizontalGap:'0',
	padding:[0,0,0,0],
	render: a,
    collapseProperty: 'width',
    enableCollapse: true,
    layout:'horizontal',
    titlebar:[
       {
        cls:'e-titlebar-toggle-west',
        icon: 'button',
			onclick: function(e){
            if(a.style.width=="600px"){
            a.style.width="0px";
            resetm1();
            createsb();
        	}
        }
        }
    ]
          }
		        
    );

   }


function getlcamoduledefine(){
	var componentTree=new getcomponentTree();
    var toolbar=new getnextbar();
	var win=cims201.utils.getWin(400,300,'选择产品',[componentTree,toolbar]);
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
    	win.show('center', 'middle', true);
		   
}

var t2;
var m2=0;
function movec(width){ 
 if(m2<width){
 m2=m2+40;
 c.style.width=m2;
 t2=setTimeout('movec('+width+')',8);
}
}
function resetm2(){
m2=0;
}
//定建模产品树
function getcomponentTree(){
    var componentTree = Edo.create({
        type: 'tree',
        width: '100%',
        height: '70%',
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
    }); 
	    return componentTree;
}
//定义选择产品后的下一步，用于模型信息填写
function getnextbar(){
    var toolbar = Edo.create(
    {type: 'ct',
    cls: 'e-dialog-toolbar',
    width: '100%',
    layout: 'horizontal',
    height: '30%',
    horizontalAlign: 'center',
    verticalAlign: 'middle',
    horizontalGap: 10,
    children: [
        {
            id:'mm',
            type: 'button',
            text: '下一步',
            minWidth: 70,
            onclick: function(e){
             	//如果没有选择产品类别，提示选择
             	if(Edo.get('componentTree').getSelected()!=null){
             		var row=Edo.get('componentTree').getSelected();
             		moduleobj.productid=row.id;
             		moduleobj.productname=row.name;
             		var content=new getmodulebuilttype();
             		var win=new Edo.containers.Window();
	         		var win = new Edo.containers.Window();
	         		win.set('title','选择构建方式');
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
	         		    width: 300,
	         		    height: 200, 
	         		    style:'border:0;',
	         		    padding:0,
	         		    children: content
	         		});	
	         		deleteMask();
	         		this.parent.parent.parent.destroy();
	         	    win.show('center', 'middle', true);
	         	  
             	}else{
             		alert('请选择产品类别！');
             	}
            
            }
        },
        {
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

function getmodulebuilttype(){
	var content = Edo.create(
		    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',horizontalAlign:'center',verticalAlign:'middle',
	       	    children: [
	       	    	{	type : 'button',text : '采用简单方式构建',width:150,height:40,align:'center',onclick:function(e){
	       	    		moduleobj.buildtype='simple';
	       	    		showstageandcomp();
	       	    		this.parent.parent.parent.destroy();
	       	    		}
	       	    },
	       	    {	type : 'button',text : '采用共建方式构建',width:150,height:40,align:'center',onclick:function(e){
	       	    	moduleobj.buildtype='taskassign';
	       	    	showstageandcomp()
	       	    	this.parent.parent.parent.destroy();
	       	    	}
	       	    }	           
	       	  
	       	    ]
	       	});
	return content;
}
function showstageandcomp(){
 	 //bbl     
   	/*Edo.util.Ajax.request({
       type: 'post',        
       url: 'lcc/lccmodule!addVersionnandModule.action',
       params: {
           pdid:moduleobj.productid, 
           mdname:moduleobj.modulename,
           mdnote:moduleobj.modulenote
           
       },
       onSuccess: function(text){
           var data = Edo.util.Json.decode(text);
           moduleobj.versionid=data;
           new modulepaneldefine();
           createmb();
           delivermoduleobject();
           //定义右侧滑动条lca部分特有组件
           var formitem1=Edo.create(
          	    {type : 'formitem',label : '构建零件:',labelWidth : 80,labelAlign : 'left',
          	    children : [{type : 'text',width : 80,id : 'compname'}]
          	    });
           var formitem2=Edo.create(
          	    {type : 'formitem',label : '构建阶段',labelWidth : 80,labelAlign : 'left',
          	    children : [{type : 'text',width : 80,id : 'stage'}]
          	    });
           var formitem3=Edo.create(
          	    {type : 'formitem',label : '产品名称:',labelWidth : 80,labelAlign : 'left',
          	    children : [{type : 'text',width : 80,id : 'productdname',text:moduleobj.productdname}]
          	    });
           Edo.get('modulecontent').addChild(formitem1); 
           Edo.get('modulecontent').addChild(formitem2); 
           Edo.get('modulecontent').addChild(formitem3); 
           alert("创建成功！");
           createcompmodule();
           
       }
       
      });*/
   //bbl	
      delivermoduleobject();
      createcompmodule();
	   new lcatreedivdefine();
	   if(moduleobj.buildtype=='simple'){
		   //bbl
		  Edo.get('treect').set('title','选择主结构建模对象和生命周期边界——每次只能选择一个')
	   }else{
   		  Edo.get('treect').set('title','选择主结构建模对象和生命周期边界——可选择多个同时建模')
	   }
	   //定义零部件树panel的零部件树和工具按钮以及按钮的功能，成功则进行建模阶段的选择
   var componentmodelTreeandStage=new getcomponentmodelTreeandStage();
   var builtandbuildingcomps=new getbuiltandbuildingcomponnets();
    var toolbar=new getnextbarstage();
    Edo.get('componentmodelTreeandStage').addChild(toolbar);
    Edo.get('treect').addChild(componentmodelTreeandStage);
    Edo.get('treect').addChild(builtandbuildingcomps);
    Edo.util.Ajax.request({
    type: 'post',        
    url: 'lcc/lccmodule!getComponentsList.action',
    params: {
        parentId: null,   //传递父节点的Name(也可以是ID)
        id:moduleobj.productid
    },
    onSuccess: function(text){
        var data = Edo.util.Json.decode(text);
        Edo.get('componentmodelTree').set('data', data);
        
    }
    
});
}
function newmodel(){
	var components=buildingcomp.data.source;
	 var stages=stagetable.data.source;
	if(stages==null){
		alert('请选择阶段！');
		return;
	}
	 createsb();
	 aa.initgraph();
	 aa.drawstage(stages);
	 moduleobj.components=components;
 	 moduleobj.stages=stages;
 	 refreshcompmodule(moduleobj);
	 a.style.width=0;
     resetm1();
     
}
function clearcompmodule(){
	enablemm();
	var data = buildingcomp.data.source;
	 for(var i=0;i<data.length;i++){
		 componentmodelTree.data.update(data[i], 'choosen', false);
	 }
	 buildingcomp.set('data',[]);
	
	
}
function enablemm(){
	mm.set('enable',true);
}
function getnextbarstage(){
    var toolbar = Edo.create(
    {type: 'ct',
    cls: 'e-dialog-toolbar',
    width: '100%',
    layout: 'horizontal',
    height: 40,
    horizontalAlign: 'center',
    verticalAlign: 'top',
    horizontalGap: 10,
    children: [
               
        {
            id:'mm',
            type: 'button',
            text: '开始创建',
            minWidth: 70,
            onclick: function(e){
               //定义填写完模型信息后的功能，包括模型panel的信息赋值，
            	/*if(!aa.judgesave()){
            		var func=newmodel;
            		aa.askifsave(func);
            	}else{
            		newmodel();
            	}*/
            	newmodel();
            	this.set('enable',false);
	        	/*new getcompstageDefine(components); */
              
            }
        }
      /*  ,
        {
            type: 'button',
            text: '取消',
            minWidth: 70,
            onclick: function(e){
            	var a=document.getElementById('productContainer');
        		a.style.width=0;
        	    resetm1();
        	    buildingcomp.set('data',[]);
            }
        }*/
    ]
});
return toolbar;
}
//定义工具按钮
function gettoolbar(id,func,type){
    var toolbar = Edo.create({
		type: 'ct',
	    cls: 'e-dialog-toolbar',
	    width: '100%',
	    layout: 'horizontal',
	    height: '30%',
	    horizontalAlign: 'center',
	    verticalAlign: 'middle',
	    horizontalGap: 10,
	    children: [
	               
	        {
	            type: 'button',
	            text: '确定',
	            minWidth: 70,
	            onclick: function(e){
	            if(func==undefined){
	            }else{
	            func(id);
	            }
	            if(type!='normal'){
	            this.parent.parent.parent.destroy();}
	            }
	        },
	        {
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
//定义零部件结构树
function getbuiltandbuildingcomponnets(){
	var box=Edo.create(
			{type: 'box',width: 300,height:580,layout: 'vertical',border: [0,0,0,0],padding: [0,0,0,0], verticalGap:'0',
		    horizontalGap:'0',
			children:[
				{
					type: 'group',
				    width: 300,
				    layout: 'horizontal',
				    cls: 'e-toolbar',
				    children: [
							          
								{
								    type: 'button',
								    text: '删除建模零部件',
								    minWidth: 70,
								    onclick: function(e){
								    	 var r = buildingcomp.getSelecteds();
								    	 for(var i=0;i<r.length;i++){
								    		 buildingcomp.data.remove(r[i]);
								    		 if(moduleobj.buildtype=='simple')
							    			 {
							    			 iscomponentchooosen=false;
							    			 }
								    		 componentmodelTree.data.update(r[i], 'choosen', false);
								    	 }
								   
								    }
								}]
				},
				
				{
				id: 'buildingcomp', type: 'table', width: 300, height: 218,
			    rowSelectMode : 'multi',
			    horizontalScrollPolicy:'off',
			    columns:[
			         /*{
	            	 align: 'center',
	            	 width: 10,                        
	            	 enableSort: false,
	            	 enableDragDrop: true,
	            	 enableColumnDragDrop: false,
	            	 style:  'cursor:move;',
	            	 renderer: function(v, r, c, i, data, t){
	        		 return i+1;}},*/
				 Edo.lists.Table.createMultiColumn(),
				 {header:'编号',dataIndex: 'id', headerAlign: 'center',width:60,align: 'center'},
				 {header:'正建模名称',dataIndex: 'name',headerAlign: 'center',width:230,align: 'center'}
	             ]
		   		},
		   		{type: 'panel',title:'已完成建模零部件',width:300,height:400,layout: 'vertical',border: [0,0,0,1],padding: [0,0,0,0],
	    			children:[
				   		{
							id: 'builtcomp', type: 'table', width: 300, height: '100%',
						    rowSelectMode : 'multi',
						    horizontalScrollPolicy:'off',
						    columns:[
							 {header:'编号',dataIndex: 'id', headerAlign: 'center',width:60,align: 'center'},
							 {header:'已完成名称',dataIndex: 'name',headerAlign: 'center',width:240,align: 'center'}
				             ]
					   		}
				   		]}
		   		
		     
			]});
    return box;
}
function getcomponentmodelTreeandStage(){
    var componentmodelTreeandStage = Edo.create(
    		{type: 'box',id:'componentmodelTreeandStage',width:300,height:600,layout: 'vertical',border: [0,0,0,0],padding: [0,0,0,0],
    			verticalGap:'0',
    		    horizontalGap:'0',
    			children:[
					{
						type: 'group',
					    width: 300,
					    layout: 'horizontal',
					    cls: 'e-toolbar',
						children:[
							{
							    type: 'button',
							    style:'margin-left:5px',
							    text: '添加主结构建模对象',
							    minWidth: 70,
							    onclick: function(e){
							    	var sels = getTreeSelect(componentmodelTree);
							    	if(sels.length>0){
							    		 for(var i=0,l=sels.length; i<l; i++){
							                	componentmodelTree.data.update(sels[i], 'checked', false);
							                	componentmodelTree.data.update(sels[i], 'choosen', true);
							                }
							                for(var i=0;i<sels.length;i++){
							                	buildingcomp.data.insert(0,sels[i]);
									    	 }
							                if(moduleobj.buildtype=='simple')
							    			 {
							    			 iscomponentchooosen=true;
							    			 }
							    	}
					               
							    }
							}]
					},
		    		{
				        type: 'tree',
				        width: '100%',
				        height: 218,
				        headerVisible: false,
				        verticalLine:false,
				        horizontalLine:false,
				        id: 'componentmodelTree',
				        onbodymousedown: function(e){
				        	var r = this.getSelected();
				        },
				        onbeforetoggle: function(e){
				            var row = e.record;
				            var dataTree = this.data;                        
				            if(!row.children || row.children.length == 0){
				                //显示树形节点的loading图标,表示正在加载
				                this.addItemCls(row, 'tree-node-loading');
				                Edo.util.Ajax.request({
				                    url: 'lcc/lccmodule!getComponentsList.action',
				                    params: {
				                        parentId: row.id   //传递父节点的Name(也可以是ID)
				                    },
				                    defer: 200,
				                    onSuccess: function(text){
				                        var data = Edo.util.Json.decode(text);
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
				        enabelCellSelect: false,
				        horizontalScrollPolicy:'off',
				        autoColumns: true,
				        enableDragDrop: true,
				        showHeader: false,
				        columns:[
				            {   
				                enableDragDrop: true,
				                dataIndex: "name",
				                renderer: function(v, r){
				                    return (r.isfinished ? v+'——已完成':(r.choosen ? v+'——正在建模':'<div class="e-tree-checkbox"><div class="e-tree-check-icon  '+(r.checked ? 'e-table-checked' : '')+'"></div>'+v+'</div>'));}
				            }
				        ]
				    },
				    {type: 'panel',title:'请添加阶段或者选择阶段',width:'100%',height:280,layout: 'vertical',/*verticalAlign:'middle'*/border: [0,0,0,0],padding: [0,0,0,0],verticalGap:'0',
		    			children:[
					    	/*{
				    			
				    		    type:'RadioGroup',
					        	id:'stagegroup',
					        	width: '100%',
					        	height: 60,
								displayField : 'name',
								repeatDirection : 'horizontal',
								repeatItems : 4,
								repeatLayout : 'table',
								itemWidth : '50px',
								valueField : 'name',
								multiSelect:true,
								data : [{stage:'design',name:'设计'},{stage:'manufacture',name:'制造'},{stage:'use',name:'使用'},{stage:'recycle',name:'回收'}],
								onItemclick : function(e) {
									var st='';
									for(var s in stagegroup){
										   var reBatCatRat =/get/gi;
										   var arrMatches = s.match(reBatCatRat);
										   if(arrMatches!=null){
										   st=st+','+s;}
									}
									alert(st);
									//alert(e.item.id);
							}
							},*/
					    	/**/
					    	{type: 'box',width:300,height:30,layout: 'horizontal',border: [0,0,0,0],padding: [5,0,0,5],
	    			          			children:[
		          			          		{type:'label',text:'请输入添加的阶段'},
			          			          	{type: 'button',
					          			        	   text: '添加',
					          			        	   onclick: function(e){
					          			        		 var name=Edo.get('chiname').text;
					          			        		 var stage=Edo.get('engstage').text; 
					          			        		var a=false;
											        	stagetable.data.source.each(function(r){        
											                if(r.name==name||r.stage==stage){
											                	a=true;
											                	return;
											                };
											            });
											        	if(!a)
										        		{
										        		stagetable.data.insert(stagetable.data.source.length,{stage:stage,name:name})
										        		}else{
										        			alert('重复定义阶段！')
										        		}
											            
					          			        		
											    }                
											    }
		          			          		
					    				]
					    	},
			          		{type: 'box',width:300,height:30,layout: 'horizontal',border: [0,0,0,0],padding: [0,0,0,5],
			          			children:[
		          			    	      
									{type : 'formitem',label : '中文名:',
								    children : [{type : 'text',width : 80,id : 'chiname'}]
								    },
								    {type : 'formitem',label : '英文名:',
								    children : [{type : 'text',width : 80,id : 'engstage'}]
								    }
			          			          ]
			          		},
			          		
			          		{type: 'box',width:300,height:30,layout: 'horizontal',border: [0,0,0,0],padding: [0,0,0,5],
			          			children:[
	          			          	{type:'label',text:'或选择阶段'},      
	    			          		{
	    								type : 'combo',
	    								//width : 300,
	    								id:'stagecombo',
	    								displayField : 'name',
	    								valueField : 'id',
	    								data : [
	    								        {stage:'design',name:'设计'},{stage:'manufacture',name:'制造'},{stage:'use',name:'使用'},{stage:'recycle',name:'回收'}
	    								        ],
								        onselectionchange:function(e){  
								        	/*for(var s in e){
								        		alert(s)
								        		alert(e[s])
								        		
								        	}*/
								        	var a=false;
								        	stagetable.data.source.each(function(r){        
								                if(r.name==e.selectedItem.name){
								                	a=true;
								                	return ;
								                };
								            });
								        	if(!a)
							        		{
							        		stagetable.data.insert(stagetable.data.source.length,e.selectedItem);
							        		}else{
							        			alert('重复定义阶段！')
							        		}
								            
                                    
                                }
	    							}
	    						
	          			          	]
			          		},
			           
			          		{type: 'box',width:300,layout: 'vertical',border: [0,0,0,0],padding: [0,0,5,5],
			          			children:[
								    {type: 'button',
		       			        	   text: '删除',
		       			        	   onclick: function(e){
		       			        		var rows=stagetable.getSelecteds();
		       			        		for(var i=0;i<rows.length;i++){
		       			        			stagetable.data.remove(rows[i])
	       			        			}
									       
								    }                
								    }
								    ]
			          		},
			          		{
						        type: 'table',
						        id:'stagetable',
						        width:'100%',
						        style:'border-left:0px;border-right:0px',
						        height: 130,
						        horizontalScrollPolicy:'off',
						        rowSelectMode: 'multi',     
						        columns:[
					                 	Edo.lists.Table.createMultiColumn(),
					                    {header: '阶段', dataIndex: 'name',width:290,headerAlign: 'center',align: 'center'
					                    }
						        ]
						      
						    }
						    /*,
							{
								type : 'combo',
								width : 300,
								id:'stagecombo',
								displayField : 'name',
								valueField : 'id',
								data : [
								        {stage:'design',name:'设计'},{stage:'manufacture',name:'制造'},{stage:'use',name:'使用'},{stage:'recycle',name:'回收'}
								        ]
							}*/
					    	]
				    }
		    		]
    		}); 
    	componentmodelTree.on('bodymousedown', function(e){
    		if(iscomponentchooosen){
    			return ;
    		}
            var r = this.getSelected();
               
            if(r){
                var inCheckIcon = Edo.util.Dom.hasClass(e.target, 'e-tree-check-icon');
                if(inCheckIcon && r.checked){
                    setTreeSelect(r, false, false);
                }else{
                    setTreeSelect(r, true, false);
                }
            }
        });
    return componentmodelTreeandStage;
}
function setTreeSelect(sels, checked, deepSelect){//deepSelect:是否深度跟随选择
	 if(!Edo.isArray(sels)) sels = [sels];
	   componentmodelTree.data.beginChange();
	//bbl
	   if(moduleobj.buildtype=='simple'){
		 //单选
		   
		    componentmodelTree.data.beginChange();
		    componentmodelTree.data.source.each(function(o){                
		        this.data.update(o, 'checked', false);
		    },componentmodelTree);
		    
		    
		    sels.each(function(o){
		        /*if(o.children && o.children.length > 0){ */   //只有父任务才可以选中
		            this.data.update(o, 'checked', checked);
		        /*}*/
		    },componentmodelTree);
		    
	   }else{
		 //多选
		 
		    for(var i=0,l=sels.length; i<l; i++){
		        var r = sels[i];        
		        var cs = r.children;        
		        if(deepSelect){
		        	componentmodelTree.data.iterateChildren(r, function(o){
		                this.data.update(o, 'checked', checked);
		            },componentmodelTree);
		        }
		        componentmodelTree.data.update(r, 'checked', checked);
		    }
		   
	   }
	    componentmodelTree.data.endChange();
}
function getTreeSelect(tree){
    var sels = [];
    componentmodelTree.data.source.each(function(node){        
        if(node.checked) sels.add(node);
    });
    return sels;
}


function savecompleted()
{
	var data = buildingcomp.data.source;
    for(var i=0,l=data.length; i<l; i++){
    	componentmodelTree.data.update(data[i], 'isfinished', true);
    }
    for(var i=0;i<data.length;i++){
    	builtcomp.data.insert(0,data[i]);
	 }
    buildingcomp.set('data',[]);
    enablemm();
}	

//定义模型信息内容
function getlcaprojectdef(){
	var content = Edo.create(
	    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
       	    children: [
	       	    {type : 'formitem',label : '模板名称:',labelWidth : 150,labelAlign : 'right',
	       	    children : [{type : 'text',width : 200,id : 'mdname'}]
	       	    },
	       	    {type : 'formitem',label : '模板备注:',labelWidth : 150,labelAlign : 'right',
	       	    children : [{type : 'text',width : 200,id : 'mdnote'}]
	       	    },
	       	    {type : 'formitem',label : '产品类别:',labelWidth : 150,labelAlign : 'right',
	       	    children : [{type : 'text',width : 200,id : 'pdname'},{type : 'text',width : 200,visible:false ,id : 'pdid'}]
	       	    } 
       	    ]
       	});
   	return content;
}

//没选择一个阶段进行刷新，保证建模器的模型信息的准确
function refreshcompmodule(moduleobj){
	aa.refreshcompmodule(moduleobj);
}
function createsb(){
	 var sb=document.getElementById('stagebutton');
	 sb.style.width='20px';
	 sb.style.height='100px';
	 var e = document.createElement("input");  
     e.type = "button";
     //e.style.top='200px';
     e.style.width='20px';
     e.style.height='100px';
     e.style.left='0px';
     e.style.position='absolute';
     e.value = '查\n看\n详\n情\n';  
     e.onclick=function(){
    	 sb.removeChild(e);
    	 movep();
     }
     sb.appendChild(e);
}
//定义零部件模型信息
function getcompLcacontentdef(compname){
	
	var content = Edo.create(
	    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
       	    children: [
       	    //				           
       	    {type : 'formitem',label : '模板名称:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'mdname'}]
       	    },
       	    {type : 'formitem',label : '模板备注:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'mdnote'}]
       	    },
       	    {type : 'formitem',label : '零部件名称:',labelWidth : 150,labelAlign : 'right',
           	children : [{type : 'text',width : 200,text:compname}]
       	    }
       	   
       	    ]
       	});
   	return content;
       	
}
var cell=null;
var levelmodule=null;
function showdetail(editcell,module){
	/*var astr=b.style.left;
	var str=astr.substring(0,astr.length-2);
	alert(str);*/
	/*c.style.left=b.style.left;
	c.style.right='0px';*/
	movec(b.offsetWidth-40);
	cell=editcell;
	levelmodule=module;
	if(!Edo.get('processmain')){
		new getprocessdetaildefine();
		
	}else{
		openNewTab(stepdata.source[0]);
		
		
	}
	
}

