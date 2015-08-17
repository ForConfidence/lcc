var projectobj={
		versionid:null,
		productid:null,
		projectname:null,
		projectnote:null,
		projecttype:null,
		module:{
			moduleid:null,
			modulename:null,
			Createdate:null,
			Version:null,
			createuserid:null
			
		}
		}
var cell=null;
var levelmodule=null;
var currentmoduleid=null;
var d=document.getElementById('detaildiv');
var b=document.getElementById('builder');
var t2;
var m2=0;
function movec(width){ 
	 if(m2<width){
	 m2=m2+40;
	 d.style.width=m2;
	 t2=setTimeout('movec('+width+')',8);
	}
	}
	function resetm2(){
	m2=0;
	}
function showdetail(editcell,module,moduleid){
	//alert(b.offsetWidth)
		movec(b.offsetWidth-40);
		cell=editcell;
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
function getLCAprojectdefine(){
	var componentTree=new getcomponentTree();
    var toolbar=new getnextbar();
	var win=cims201.utils.getWin(400,300,'选择产品',[componentTree,toolbar]);
	Edo.util.Ajax.request({
        type: 'post',        
        url: basePath+'lcc/lccmodule!getComponentList.action',
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
//定义产品树
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
//定义选择产品后的下一步，用于项目信息填写
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
               //定义填写完模型信息后的功能，包括模型panel的信息赋值，
             	var func=function(id){
             		
             		projectobj.projectname=Edo.get('projectname').text;
             		projectobj.projectnote=Edo.get('projectnote').text;
             		var modulebox=getmodulebox();
             		new lcatreedivdefine();
             		Edo.get('treect').addChild(modulebox);
             		createcompmodule(600);
             	}
             	//如果没有选择产品类别，提示选择
             	if(Edo.get('componentTree').getSelected()!=null){
				    var row=Edo.get('componentTree').getSelected();
				    projectobj.productid=row.id;
             		projectobj.productdname=row.name;
		            var content=new getlcaprojectdef();
				    var toolbar=new gettoolbar(null,func);
	            	var win=cims201.utils.getWin(400,160,'填写方案信息',[content,toolbar]);
				    win.show('center', 'middle', true);
				    this.parent.parent.parent.destroy();
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
function getlcaprojectdef(){
	
	var content = Edo.create(
	    {type: 'box',width: '100%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
       	    children: [
       	    //				           
       	    {	type : 'formitem',label : '计算方案名称:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'projectname'}]
       	    },
       	    {	type : 'formitem',label : '计算方案备注:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'projectnote'}]
       	    },
   	    	{	type : 'formitem',label : '产品名称:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'productname',text:projectobj.productdname},
       	                {type : 'text',width : 200,id : 'productid',visible:false,text:projectobj.productid}]
       	    },
       	   /* {	type : 'formitem',label : '开始时间:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'date',width : 200,id : 'starttime'}]
       	    },
       	    {	type : 'formitem',label : '结束时间:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'date',width : 200,id : 'finishtime'}]
       	    }*/
       	   
       	    ]
       	});
       	return content;
       	
       	}
function getcomponentmodelTree(){
    var moduletree = Edo.create({
	    type: 'tree',
        width: '100%',
        height: '100%',
        autoColumns:true,
        headerVisible: false,
        verticalLine:false,
        horizontalLine:false,
        id: 'moduletree',
        enabelCellSelect: false,
        autoColumns: true,
        enableDragDrop: true,
        showHeader: false,
        onbeforetoggle: function(e){
            var row = e.record;
            var dataTree = this.data;                        
            if(!row.children || row.children.length == 0){
                //显示树形节点的loading图标,表示正在加载
                this.addItemCls(row, 'tree-node-loading');
                Edo.util.Ajax.request({
                    //url: 'nodes.txt',
                    url: basePath+'lcc/lccmodule!getModuletree.action',
                    params: {
                        componentid: row.id   //传递父节点的Name(也可以是ID)
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
        columns:[
            {   
                enableDragDrop: true,
                dataIndex: "name"
            
            }
            ],
         data:moduledata
           
}); 
	    return componentmodelTree;
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
function getmoduletreebox(){
    
    var componentmodeltree=getcomponentmodeltree();
    Edo.util.Ajax.request({
	        type: 'post',        
	        url: basePath+'lcc/lccmodule!getmoduleComponentsList.action',
	        params: {
               parentId: null,   //传递父节点的Name(也可以是ID)
               id:projectobj.productid,
               moduleid:projectobj.module.moduleid
           },
	        onSuccess: function(text){
	           // alert(text);
	            var data = Edo.util.Json.decode(text);
	            Edo.get('componentmodelTree').set('data', data);
	        }
	        
	    });
	var moduledetail=getmoduledetail();
	new lcatreedivdefine();
	Edo.get('treect').set('layout','vertical');
	Edo.get('treect').set('width',300);
	Edo.get('treect').set('title','编辑零部件模板信息');
	var toolbar=Edo.create(
			{
				type: 'group',
			    layout: 'horizontal',
			    cls: 'e-toolbar',
			    width:300,
			    children: [
			        {
			            type: 'button',
			            text: '编辑计算模板零部件信息',
			            onclick: function(e){
			            	 var a=document.getElementById('productContainer');
			            	 a.style.width=0;
			                 resetm1();
			                 createsb();
			                 var r = componentmodelTree.getSelected();
			                 projectobj.module.moduleid=r.moduleid;
			                 aa.initcompmodule(moduleobj);
			                 aa.showmodule(r.moduleid);
			            }                
			            
			        }]
		}
			);
	Edo.get('treect').addChild(toolbar);
	Edo.get('treect').addChild(componentmodeltree);
	Edo.get('treect').addChild(moduledetail);
/* 		moduledetail.setForm(projectobj.module);
*/ 		setTimeout('createcompmodule(300)',500);
}
function getcomponentmodeltree(){
	
	var componentmodelTree=Edo.create({
	    
	    type: 'tree',
	    width: 300,
	    height: 300,
	    autoColumns:true,
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
	                //url: 'nodes.txt',
	                url: basePath+'lcc/lccmodule!getmoduleComponentsList.action',
	                params: {
	                	moduleid:projectobj.module.moduleid,
	                    parentId: row.id   //传递父节点的Name(也可以是ID)
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
	    //verticalLine: false,
	    
	    //data: tree,
	    enabelCellSelect: false,
	    autoColumns: true,
	    enableDragDrop: true,
	    showHeader: false,
	    columns:[
	        {   
	            enableDragDrop: true,
	            dataIndex: "name"
	        }
	    ]
	})
	return componentmodelTree;
	
}
function getmoduledetail(){
	var moudledetail=Edo.create(
			{type: 'box',width: 300,border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
           	    children: [
           	       	    //				           
           	       	    {	type : 'formitem',label : '计算模板名称:',labelWidth : 80,
           	       	    children : [{type : 'text',width : 200,id : 'modulename'}]
           	       	    },
           	       	    {	type : 'formitem',label : '版本:',labelWidth : 80,
           	       	    children : [{type : 'text',width : 200,id : 'Version'}]
           	       	    },
           	   	    	{	type : 'formitem',label : '创建者:',labelWidth : 80,
           	       	    children : [{type : 'text',width : 200,id : 'createuserid'}
           	       	                ]
           	       	    },
           	       	    {	type : 'formitem',label : '创建时间:',labelWidth : 80,
           	           	    children : [{type : 'text',width : 200,id : 'Createdate'}]
           	       	    },
           	       	    {	type : 'formitem',label : '评分:',labelWidth : 80,
           	           	    children : [{type : 'text',width : 200,id : 'score'}]
           	       	    }
           	       	   
           	       	    ]
           	       	}
			)
			return moudledetail;
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
    e.value = '选\n择\n模\n型\n';  
    e.onclick=function(){
   	 sb.removeChild(e);
   	 movep(300);
    }
    sb.appendChild(e);
}
function calculate(){
	parent.openNewTab2({id: 'lcacaculation', url: '', name: '计算结果'},{})
}