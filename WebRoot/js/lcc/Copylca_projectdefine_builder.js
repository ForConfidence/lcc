function getLCAprojectdefine(){
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
//产品树
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
             		moduleobj.productid=Edo.get('pdid').text;
             		moduleobj.modulename=Edo.get('mdname').text;
             		moduleobj.modulenote=Edo.get('mdnote').text;
             		moduleobj.productdname=Edo.get('pdname').text;
             		
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
	         	    win.show('center', 'middle', true);
             	}
             	//如果没有选择产品类别，提示选择
             	if(Edo.get('componentTree').getSelected()!=null){
				    var row=Edo.get('componentTree').getSelected();
		            var content=new getlcaprojectdef();
				    var toolbar=new gettoolbar(row.id,func);
				    var row=Edo.get('componentTree').getSelected();
				    Edo.get('pdname').set('text', row.name);
				    Edo.get('pdid').set('text', row.id);
				    
	            	var win=cims201.utils.getWin(400,200,'填写模板信息',[content,toolbar]);
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
            	var r = Edo.get('componentmodelTree').getSelected();
             	var func=function(id){
             		
             	}
             	//如果没有选择产品类别，提示选择
             	if(Edo.get('componentmodelTree').getSelected()!=null){
             		var func=function(id){
             			projectobjectdefine.projectname=Edo.get('pjname').text;
             			projectobjectdefine.projectdetail=Edo.get('pjdetail').text;
             			projectobjectdefine.starttime=Edo.get('starttime').text;
             			projectobjectdefine.finishtime=Edo.get('finishtime').text;
             			var moduledata= cims201.utils.getData('module/module!getModuletreebytype.action',{moduletype:'PDM',mpduleid:r.moduleid});
             		    Edo.get('moduletree').set('data',moduledata);
             	 	}
             		    var content=new getprojectdef();
             		    var toolbar=new gettoolbar(null,func);
             	 	    var win=cims201.utils.getWin(400,200,'填写项目信息',[content,toolbar]);
             		    win.show('center', 'middle', true);
				    this.parent.parent.parent.destroy();
             	}else{
             		alert('请选择产品类别！');
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
function getprojectdef(){
	
	var content = Edo.create(
	    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
       	    children: [
       	    //				           
       	    {	type : 'formitem',label : '项目名称:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'pjname'}]
       	    },
       	    {	type : 'formitem',label : '项目备注:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'pjdetail'}]
       	    },
       	    {	type : 'formitem',label : '开始时间:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'date',width : 200,id : 'starttime'}]
       	    },
       	    {	type : 'formitem',label : '结束时间:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'date',width : 200,id : 'finishtime'}]
       	    }
       	   
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
                    url: 'lcc/lccmodule!getModuletree.action',
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