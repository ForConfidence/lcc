var moduleobj={
			moduleid:null,
			productid:null,
			compmoduleid:null,
			modulename:null,
			Createdate:null,
			Version:null,
			createuserid:null
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
		        	moduleid:moduleobj.moduleid,
                    parentId: null,  
                    id:moduleobj.componentid,
                    branchUUID:moduleobj.branchUUID
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
				                 moduleobj.compmoduleid=r.moduleid;
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
	                	moduleid:moduleobj.moduleid,
	                    parentId: row.id,   //传递父节点的Name(也可以是ID)
	                    branchUUID:moduleobj.branchUUID
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