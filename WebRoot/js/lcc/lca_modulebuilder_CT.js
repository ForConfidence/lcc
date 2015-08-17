//定义lca模型
var a=document.getElementById('productContainer');
var c=document.getElementById('detaildiv');
var b=document.getElementById('builder');
var iscomponentchooosen=false;
var moduleobj={
		versionid:null,
		productid:null,
		modulename:null,
		oldmoduleid:null,
		oldsupermoduleid:null,
		modulenote:null,
		buildtype:null,
		oldbuildtype:null,
		oldbranchUUID:null
		}
function initmoduleobject(){
	stagetable.set('data',[]);
	
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
	                this.parent.owner.destroy();
	            }
	        }
	    ]
	);
	
	win.addChild({
	    type: 'box',
	    width: 500,
	    height: 300, 
	    style:'border:0;',
	    padding:0,
	    children: content
	});	
	deleteMask();
    win.show('center', 'middle', true);
}
//传递模型对象到iframe aa,即构建页面中
function delivermoduleobject(){
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

//复制对象;
//function getchildparam(l,a)
//{
//    if(typeof a === "object"){
//    	for(var s in a){
//    		l[s]=a[s];
//    		l[s]=getchildparam(l[s],a[s]);
//    	}
//    	return l;
//    }else{
//		return a;
//	}
//	
//	
//}

//定义模型类型选择,bbl511
function gettypedefine(){
	var content = Edo.create(
	    {type: 'box',width: '100%',height:'100%',border: [0,0,0,0],padding: [20,0,0,0],layout: 'vertical',horizontalAlign:'center',verticalGap:20,
       	    children: [
       	    	/*{	type : 'button',text : '根据已有模板协同共建',width:150,height:40,align:'center',onclick:function(e){new buildTypeChoosenAndDecideComp("old_coopbuild");this.parent.parent.parent.destroy();}
	       	    },*/
	       	    {	type : 'button',text : '全新协同共建',width:250,height:60,align:'center',onclick:function(e){new buildTypeChoosenAndDecideComp("new_coopbuild");this.parent.parent.parent.destroy();}
	    	    },
	       	    {	type : 'button',text : '全新简单构建',width:250,height:60,align:'center',onclick:function(e){new buildTypeChoosenAndDecideComp("new_simplebuild");this.parent.parent.parent.destroy();}
	       	    },
	       	    {	type : 'button',text : '根据已有模板简单构建',width:250,height:60,align:'center',onclick:function(e){new buildTypeChoosenAndDecideComp("old_simplebuild");this.parent.parent.parent.destroy();}
	       	    }
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
//bbl511,选定构件类型并选择产品初始化
function buildTypeChoosenAndDecideComp(buildtype){
	moduleobj.buildtype=buildtype;
	var componentTree=new getcomponentTree();
    var toolbar=new getnextbar();
	var win=cims201.utils.getWin(400,300,'选择产品',[componentTree,toolbar]);
	Edo.util.Ajax.request({
        type: 'post',        
        url: basePath+'lcc/lccmodule!getComponentList.action',
        params: {
            parentId: '0' //传递父节点的Name(也可以是ID)
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
        style:'border:0;',
        horizontalScrollPolicy:'off',
        verticalLine:false,
        horizontalLine:false,
        id: 'componentTree',
        onbodymousedown: function(e){
        	var r = this.getSelected();
        },
        headerVisible:false,
        columns:[
            {
            	
                width:400,
                headerText: "选择产品类别",                
                dataIndex: "name",
                renderer: function(value, record, column, rowIndex, data, table){                    
                    return '<div style="font-size:20px;text-align:center" ><a>'+value+'</a></div>';  //返回此单元格显示的HTML内容(一般根据value和row的内容进行组织)
                },
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
	           id:'prestep',
	           type: 'button',
	           text: '上一步',
	           minWidth: 70,
	           onclick: function(e){
	        	   this.parent.parent.parent.destroy();
	        	   new definemodule();
	           }
        },
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
       	    		this.parent.parent.parent.destroy();
       	    		showLeftBar();
             	}else{
             		Edo.MessageBox.alert('警告','请选择产品类别！');
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
function showLeftBar(){
       delivermoduleobject();
       createcompmodule();
	   new lcatreedivdefine();
	   if(moduleobj.buildtype=='old_coopbuild'){
		  Edo.get('treect').set('title','选择主结构建模对象和生命周期边界');
		  getModuleList();
	   }else if (moduleobj.buildtype=='new_coopbuild'){
   		  Edo.get('treect').set('title','选择主结构建模对象和生命周期边界');
   		  getComplist();
	   }else if(moduleobj.buildtype=='old_simplebuild'){
		  Edo.get('treect').set('title','选择主结构建模对象和生命周期边界——每次只能选择一个'); 
		  getModuleList();
	   }else if(moduleobj.buildtype=='new_simplebuild'){
		  Edo.get('treect').set('title','选择主结构建模对象和生命周期边界——每次只能选择一个');
		  getComplist();
	   }
		   
		   
	   //定义零部件树panel的零部件树和工具按钮以及按钮的功能，成功则进行建模阶段的选择

}
function getModuleList(){
	var ModuleList = Edo.create({
	    type: 'tree',
	    width: '100%',
	    height: '100%',
	    horizontalScrollPolicy:'off',
	    verticalLine:false,
	    horizontalLine:false,
	    id: 'ModuleList',
	    autoColumns: true,
	    enableDragDrop: true,
	    headerVisible:false,
	    onbodymousedown: function(e){
	    	
        	var r = this.getSelected();
        	Edo.util.Ajax.request({
        	    type: 'post',        
        	    url: basePath+'lcc/lccmodule!getModuleBranchByParent.action',
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
	            headerText: "选择产品类别",                
	            dataIndex: "name"
	        }
	    ]
	}); 
	var toolbar=new getModuleToolBar();
	Edo.get('treect').addChild(ModuleList);
	
	
	var branchbox=Edo.create({
		id:'branchbox',
		type:'box',
		width:'100%',
		height:'100%',
		layout: 'vertical',
		children:[
			{
				id: 'branchtable', type: 'table', width: 300, height: 218,
			    horizontalScrollPolicy:'off',
			    columns:[
				 {header:'编号',dataIndex: 'id', headerAlign: 'center',width:60,align: 'center'},
				 {header:'模板分支名称',dataIndex: 'name',headerAlign: 'center',width:230,align: 'center'},
				 {header:'正建模名称',dataIndex: 'createuserid',headerAlign: 'center',width:230,align: 'center'}
			     ]
			}
		          ]
	}
		
	);
    Edo.get('branchbox').addChild(toolbar);
    Edo.get('treect').addChild(branchbox);
	Edo.util.Ajax.request({
	    type: 'post',        
	    url: basePath+'lcc/lccmodule!getModuletree.action',
	    params: {
	        componentid: moduleobj.productid  //传递父节点的Name(也可以是ID)
	    },
	    onSuccess: function(text){
	        var data = Edo.util.Json.decode(text);
	        Edo.get('ModuleList').set('data', data);
	    }
	    
	});
}
function getModuleToolBar(){
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
		            type: 'button',
		            text: '创建新的模板',
		            minWidth: 70,
		            onclick: function(e){
		               
		            	var r = ModuleList.getSelected();
		            	var r1=branchtable.getSelected();
		            	
		            	//Edo.get('treect').removeChild(ModuleList);
		            	ModuleList.destroy();
		            	this.destroy();
		            	var toolbar=new getoldnextbarstage();
		            	var componentmodelTreeandStage=new getcomponentmodelTreeandStage();
		            	var builtandbuildingcomps=new getbuiltandbuildingcomponnets();
	            	    Edo.get('componentmodelTreeandStage').addChild(toolbar);
	            	    Edo.get('treect').addChild(componentmodelTreeandStage);
	            	    Edo.get('treect').addChild(builtandbuildingcomps);
	            	    Edo.util.Ajax.request({
	            	        type: 'post',        
	            	        url: basePath+'lcc/lccmodule!getmoduleComponentsList.action',
	            	        params: {
	                           parentId: null,   //传递父节点的Name(也可以是ID)
	                           id:r.componentid,
	                           moduleid:r.id,
	                           branchUUID:r1.branchUUID
	                        	   
	                       },
	            	        onSuccess: function(text){
	            	           // alert(text);
	            	            var data = Edo.util.Json.decode(text);
	            	            Edo.get('componentmodelTree').set('data', data);
	            	            moduleobj.oldsupermoduleid=r.id;
	            	            moduleobj.oldbranchUUID=r1.branchUUID;
	            	        }
	            	        
	            	    });
		            }
		        }
		    ]
		});
		return toolbar;
}
function getComplist(){
    var componentmodelTreeandStage=new getcomponentmodelTreeandStage();
    var builtandbuildingcomps=new getbuiltandbuildingcomponnets();
    var toolbar=new getnextbarstage();
    Edo.get('componentmodelTreeandStage').addChild(toolbar);
    Edo.get('treect').addChild(componentmodelTreeandStage);
    Edo.get('treect').addChild(builtandbuildingcomps);
    Edo.get('treect')
    Edo.util.Ajax.request({
    type: 'post',        
    url: basePath+'lcc/lccmodule!getComponentsList.action',
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
	 if(!getStageLevelDefine()){
		 return false;
	 }
	 createsb();
	 aa.initgraph();
 	 aa.drawstage(moduleobj);
	 refreshcompmodule(moduleobj);
	 a.style.width=0;
     resetm1();
     return true;
     
}
function getStageLevelDefine(){
	var components=buildingcomp.data.source;
	 var stages=stagetable.data.source;
	if(stages==null||stages.length==0){
		Edo.MessageBox.alert('警告','请选择阶段！');
		return false;
	}else{
		 moduleobj.components=components;
		 moduleobj.stages=stages;
		 return true;
	}
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
            	var a=newmodel();
            	if(a){
            		this.set('enable',false);
            	}
            
	        	/*new getcompstageDefine(components); */
              
            }
        }
    ]
});
mm.set('enable',false);    
return toolbar;
}
function getoldnextbarstage(){
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
            id:'oldnextbarclean',
            type: 'button',
            text: '覆盖已有阶段',
            minWidth: 70,
            onclick: function(e){
               //定义填写完模型信息后的功能，包括模型panel的信息赋值，
            	moduleobj.oldbuildtype='new';
            	var components=buildingcomp.data.source;
            	moduleobj.oldmoduleid=components[0].moduleid;
            	aa.deliverOldModule(moduleobj);
            	var a=newmodel();
            	if(a){
            		this.set('enable',false);
                	aa.defineOldBuildType('new');
            	}
            	
              
            }
        },
        {
        	 id:'oldnextbarmodify',
             type: 'button',
             text: '修改已有阶段',
             minWidth: 70,
             onclick: function(e){
            	
            	var components=buildingcomp.data.source;
            	moduleobj.oldmoduleid=components[0].moduleid;
            	aa.deliverOldModule(moduleobj);
            	moduleobj.components=components;
            	moduleobj.oldbuildtype='old';
            	aa.defineOldBuildType('old');
            	//bbl513
            	var moduleid=components[0].moduleid;
            	if(moduleid==null){
            		Edo.MessageBox.alert('警告','该零部件不存在已有模板！');
            	}else{
            	 	aa.showstagemoduletest(moduleid,moduleobj);
            	 	this.set('enable',false);
                 	createsb();
               	    a.style.width=0;
                    resetm1();
            	}
           
            	//aa.showstagemodule(components[0].moduleid,moduleobj);
             	
             }
        }
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
								    		 if(moduleobj.buildtype=='new_simplebuild'||moduleobj.buildtype=='old_simplebuild')
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
							               // if(moduleobj.buildtype=='new_simplebuild'||moduleobj.buildtype=='old_simplebuild')
							                if(moduleobj.buildtype=='old_simplebuild')
							    			 {
								    			 iscomponentchooosen=true;
								    			 if(sels[0].moduleid==null){
								    				 oldnextbarmodify.set('enable',false);
								    				 oldnextbarclean.set('text','开始创建');
								    			 }else{
								    				 oldnextbarclean.set('text','覆盖已有阶段');
								    				 
								    			 }
							    			 }
							                if(moduleobj.buildtype=='new_simplebuild')
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
				        multiSelect:false,
				        onbeforetoggle: function(e){
				            var row = e.record;
				            var dataTree = this.data;                        
				            if(!row.children || row.children.length == 0){
				                //显示树形节点的loading图标,表示正在加载
				                this.addItemCls(row, 'tree-node-loading');
				                if(moduleobj.buildtype=='old_simplebuild'||moduleobj.buildtype=='old_coopbuild'){
				                	var r = this.getSelected();
				                	Edo.util.Ajax.request({
				    	                //url: 'nodes.txt',
				    	                url: basePath+'lcc/lccmodule!getmoduleComponentsList.action',
				    	                params: {
				    	                	moduleid:moduleobj.oldsupermoduleid,
				    	                    parentId: r.id,   //传递父节点的Name(也可以是ID)
				    	                    branchUUID:moduleobj.oldbranchUUID
				    	                },
				    	                defer: 200,
				    	                onSuccess: function(text){
				    	               // alert(text);
				    	                    var data = Edo.util.Json.decode(text);
				    	                    dataTree.beginChange();
				    	                    if(!(data instanceof Array)) data = [data]; //必定是数组
				    	                    data.each(function(o){
				    	                        dataTree.insert(0, o, row);    
				    	                    });                    
				    	                    dataTree.endChange();    
				    	                }
				    	            });
				                }else{
				                	Edo.util.Ajax.request({
					                    url: basePath+'lcc/lccmodule!getComponentsList.action',
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
					    	{type: 'box',width:300,height:30,layout: 'horizontal',border: [0,0,0,0],padding: [5,0,0,5],
	    			          			children:[
		          			          		{type:'label',text:'请输入添加的阶段'},
			          			          	{type: 'button',
					          			        	   text: '添加',
					          			        	   onclick: function(e){
					          			        		   alert('dddd')
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
											        		stagetable.data.insert(stagetable.data.source.length,{stage:stage,name:name});
											        		new checkstagetable();
										        		}else{
										        			Edo.MessageBox.alert('警告','重复定义阶段');
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
								        		new checkstagetable();
							        		}else{
							        			Edo.MessageBox.alert('警告!','重复定义阶段！');
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
		       			        			stagetable.data.remove(rows[i]);
	       			        			}
		       			        		new checkstagetable();
									       
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
function checkstagetable(){
	stagetable.data.source.each(function(r){        
        if(r.name==null||r.stage==null||r.name==undefined||r.stage==undefined){
        	Edo.MessageBox.alert('保存结果!','保存成功');

        	mm.set('enable',false); 
        	return false;
        };
    });
	if(stagetable.data.source.length<1){
		mm.set('enable',false); 
		return false;
	}
	mm.set('enable',true); 
	return true;
	
}
function setTreeSelect(sels, checked, deepSelect){//deepSelect:是否深度跟随选择
	 if(!Edo.isArray(sels)) sels = [sels];
	   componentmodelTree.data.beginChange();
	//bbl
	   if(moduleobj.buildtype=='new_simplebuild'||moduleobj.buildtype=='old_simplebuild'){
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
    iscomponentchooosen=false;
    if(moduleobj.buildtype=="old_simplebuild"){
    	 oldnextbarmodify.set('enable',true);
		 oldnextbarclean.set('enable',true);
    }
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
	dataBackUp();
	
}
var currentmoduleid=null;
function showOldModuleDetail(editcell,module,moduleid){
	movec(b.offsetWidth-40);
	cell=editcell;
	 alert("旧的模板")
	 alert(cell.getId())
	    alert(currentmoduleid)
	levelmodule=module;
	currentmoduleid=moduleid;
	var data= cims201.utils.getData(basePath+'lcc/lccmodule!getmoduleprocesscontent.action',{moduleid:currentmoduleid,processid:cell.getId()});
	/*levelmodule.levelmoduleobject.id=data.id;
	levelmodule.levelmoduleobject.processname=data.name;
	levelmodule.levelmoduleobject.processnote=data.note;
	levelmodule.levelmoduleobject.inputmaterial=data.inputmaterial;
	levelmodule.levelmoduleobject.outputmaterial=data.outputmaterial;*/
	if(!Edo.get('processmain')){
		new getprocessdetaildefine();
		
	}else{
		openNewTab(stepdata.source[0]);
		
		
	}
}

