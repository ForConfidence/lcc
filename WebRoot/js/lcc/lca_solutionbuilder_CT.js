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
		oldbranchUUID:null,
		datasetUUID:null
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
	var a=[1,2,3];
	alert(typeof a=='object')
	var content = Edo.create(
	    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',horizontalAlign:'center',verticalAlign:'middle',
       	    children: [
       	    	{	type : 'button',text : '根据已有模板协同共建',width:150,height:40,align:'center',onclick:function(e){new buildTypeChoosenAndDecideComp("old_coopbuild");this.parent.parent.parent.destroy();}
	       	    },
	       	    {	type : 'button',text : '全新协同共建',width:150,height:40,align:'center',onclick:function(e){new buildTypeChoosenAndDecideComp("new_coopbuild");this.parent.parent.parent.destroy();}
	    	    },
	    	    {	type : 'button',text : '根据已有模板简单构建',width:150,height:40,align:'center',onclick:function(e){new buildTypeChoosenAndDecideComp("old_simplebuild");this.parent.parent.parent.destroy();}
	       	    },	
	       	    {	type : 'button',text : '全新简单构建',width:150,height:40,align:'center',onclick:function(e){new buildTypeChoosenAndDecideComp("new_simplebuild");this.parent.parent.parent.destroy();}
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

function getModuleTree(){
    createcompmodule();
    new lcatreedivdefine();
    Edo.get('treect').set('title','请选择查看的子模板'); 
	var componentmodelTreeandStage=new getcomponentmodelTreeandStage();
    Edo.get('treect').addChild(componentmodelTreeandStage);
    Edo.util.Ajax.request({
        type: 'post',        
        url: basePath+'lcc/lccmodule!getmoduleComponentsList.action',
        params: {
           parentId: null,   //传递父节点的Name(也可以是ID)
           id:moduleobj.productid,
           moduleid:moduleobj.oldsupermoduleid,
           branchUUID:moduleobj.oldbranchUUID,
           modulename:moduleobj.modulename
       },
        onSuccess: function(text){
           // alert(text);
            var data = Edo.util.Json.decode(text);
            Edo.get('componentmodelTree').set('data', data);
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
	                           branchUUID:r1.branchUUID,
	                           modulename:r.modulename
	                       },
	            	        onSuccess: function(text){
	            	           // alert(text);
	            	            var data = Edo.util.Json.decode(text);
	            	            Edo.get('componentmodelTree').set('data', data);
	            	            moduleobj.oldsupermoduleid=r.id;
	            	            moduleobj.oldbranchUUID=r1.branchUUID,
	            	            moduleobj.modulename=r.modulename
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
		alert('请选择阶段！');
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
            	moduleobj.modulename=components[0].modulename;
            	aa.deliverOldModule(moduleobj);
            	moduleobj.components=components;
            	moduleobj.oldbuildtype='old';
            	aa.defineOldBuildType('old');
            	//bbl513
            	var moduleid=components[0].moduleid;
            	if(moduleid==null){
            		alert('该零部件不存在已有模板！');
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
    		{type: 'box',id:'componentmodelTreeandStage',width:'100%',height:'100%',layout: 'vertical',border: [0,0,0,0],padding: [0,0,0,0],
    			verticalGap:'0',
    		    horizontalGap:'0',
    			children:[
					{
						type: 'group',
					    width: '100%',
					    layout: 'horizontal',
					    cls: 'e-toolbar',
						children:[
							{
							    type: 'button',
							    style:'margin-left:5px',
							    text: '编辑模板数据',
							    minWidth: 70,
							    onclick: function(e){
							    	var rs=getTreeSelect(componentmodelTree);
							    	var r=rs[0];
							    	var r1=datasettable.getSelected();
					            	if(!r){
					            		alert('请选择模板');
					            		return;
					            	}
					            	var moduleid=r.moduleid;
					            	var modulename=r.modulename;
							    	if(!moduleid){
					            		alert('该零部件不存在已有模板！');
					            		return;
					            	}
							    	if(!r1){
					            		alert('请选择数据集！');
					            		return;
					            	}
							    	
					            	var datasetUUID=r1.UUID;
					            	alert(datasetUUID);
					            	aa.datasetSetuuid(datasetUUID);
					            	moduleobj.datasetUUID=datasetUUID;
				            		moduleobj.oldmoduleid=r.moduleid;
				            	    moduleobj.componentid=r.id;
				            	    moduleobj.modulename=r.modulename;
					            	aa.deliverOldModule(moduleobj);
					            	alert("零部件"+moduleobj.componentid);
					            	moduleobj.oldbuildtype='old';
					            	aa.defineOldBuildType('old');
				            	 	aa.showstagemoduletest(moduleid,datasetUUID);
				            	 	//alert(moduleid);
				            	 	alert('shenmaa');
				            	 	alert(modulename);
				                 	createsb();
				               	    a.style.width=0;
				                    resetm1();
					            	
					               
							    }
							}]
					},
					{
						type:'box',
						width:'100%',
						height:'100%',
						layout: 'horizontal',
						children:[
							{
							    type: 'tree',
							    width: '50%',
							    height: '100%',
							    headerVisible: false,
							    verticalLine:false,
							    horizontalLine:false,
							    id: 'componentmodelTree',
							    multiSelect:false,
							    onbodymousedown: function(e){
							    	var r = this.getSelected();
							    	
							    	if(r!=null&&r.moduleid!=null){
							    		Edo.util.Ajax.request({
							                //url: 'nodes.txt',
							                url: basePath+'lcc/lccmodule!getModuleDataSet.action',
							                params: {
							                	moduleid:r.moduleid,
							                    branchUUID:moduleobj.oldbranchUUID
							                },
							                defer: 200,
							                onSuccess: function(text){
							                    var data = Edo.util.Json.decode(text);
							                    datasettable.set("data",data);
							                }
							            });
							    	}else{
							    		datasettable.set("data",[]);
							    	}
							    	
							    },
							    onbeforetoggle: function(e){
							        var row = e.record;
							        var dataTree = this.data;                        
							        if(!row.children || row.children.length == 0){
							            //显示树形节点的loading图标,表示正在加载
							            this.addItemCls(row, 'tree-node-loading');
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
							{
								id: 'datasettable', type: 'table', width: '50%', height: '100%',
							    horizontalScrollPolicy:'off',
							    columns:[
								 {header:'编号',dataIndex: 'id', headerAlign: 'center',width:60,align: 'center'},
								 {header:'数据集名称',dataIndex: 'name',headerAlign: 'center',width:230,align: 'center'},
							     ]
							}     
						          
						          
						          ]}
		    		
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
	    componentmodelTree.data.source.each(function(o){                
	        this.data.update(o, 'checked', false);
	    },componentmodelTree);
	    
	    
	    sels.each(function(o){
	        /*if(o.children && o.children.length > 0){ */   //只有父任务才可以选中
	            this.data.update(o, 'checked', checked);
	        /*}*/
	    },componentmodelTree);
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

