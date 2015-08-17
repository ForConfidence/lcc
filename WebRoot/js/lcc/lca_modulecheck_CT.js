//定义lca模型
var productdiv=document.getElementById('productContainer');
var detaildiv=document.getElementById('detaildiv');
var builderdiv=document.getElementById('builder');
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
     m1=m1+60;
	 productdiv.style.width=m1;
	 t1=setTimeout('movep()',1);

	}
}
function resetm1(){
	m1=0;
}


function lcatreedivdefine(){
   productdiv.style.width=0;
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
	render: productdiv,
    collapseProperty: 'width',
    enableCollapse: true,
    layout:'horizontal',
    titlebar:[
       {
        cls:'e-titlebar-toggle-west',
        icon: 'button',
			onclick: function(e){
            if(a.style.width=="600px"){
            productdiv.style.width="0px";
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
 detaildiv.style.width=m2;
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
           branchUUID:moduleobj.oldbranchUUID
        	   
       },
        onSuccess: function(text){
           // alert(text);
            var data = Edo.util.Json.decode(text);
            Edo.get('componentmodelTree').set('data', data);
        }
        
    });
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
							    text: '查看模板',
							    minWidth: 70,
							    onclick: function(e){
							    	var rs=getTreeSelect(componentmodelTree);
							    	var r=rs[0];
							    	//var r=r;
					            	//bbl513
					            	var moduleid=r.moduleid;
					            	if(moduleid==null){
					            		Edo.MessageBox.alert('警告','该零部件不存在已有模板！');
					            	}else{
					            		Edo.MessageBox.alert('加载模板','加载模板成功！');
					            		moduleobj.oldmoduleid=r.moduleid;
						            	aa.deliverOldModule(moduleobj);
						            	moduleobj.oldbuildtype='old';
						            	aa.defineOldBuildType('old');
					            	 	aa.showstagemoduletest(moduleid,moduleobj);
					                 	createsb();
					               	    productdiv.style.width=0;
					                    resetm1();
					            	}
					               
							    }
							}]
					},
		    		{
				        type: 'tree',
				        width: '100%',
				        height: '100%',
				        headerVisible: false,
				        verticalLine:false,
				        horizontalLine:false,
				        id: 'componentmodelTree',
				        multiSelect:false,
				        onbodymousedown: function(e){
				        	var r = this.getSelected();
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
				                    return  (r.hasmodule ? '<div class="e-tree-checkbox"><div class="e-tree-check-icon  '+(r.checked ? 'e-table-checked' : '')+'"></div>'+'<font color="red">'+v+'---存在模板</font></div>':v);
				                    }
				            }
				        ]
				    }
		    		]
    		}); 
    	componentmodelTree.on('bodymousedown', function(e){
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
var cell=null;
var levelmodule=null;
function showdetail(editcell,module){
	movec(builderdiv.offsetWidth-40);
	cell=editcell;
	levelmodule=module;
	if(!Edo.get('processmain')){
		new getprocessdetaildefine();
		
	}else{
		openNewTab(stepdata.source[0]);
		updatesteptabledata('stepone');
		
	}
	dataBackUp();
	
}

