var editcell=null;
var currentmoduleid=null;
//518询问是否需要更改阶段信息（根据已有模板协同创建新的模板）
function askIfModify(){
	var box=Edo.create(
			{type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [30,0,0,0],layout: 'vertical',
           	    children: [
           	                {type:'label',text:'该操作将覆盖所选阶段原有信息，并重新创建，请确认继续执行'},
	           	            {type: 'ct',
	           	                cls: 'e-dialog-toolbar',
	           	                width: '100%',
	           	                layout: 'horizontal',
	           	                height: 40,
	           	                horizontalAlign: 'center',
	           	                verticalAlign: 'middle',
	           	                horizontalGap: 10,
	           	                children: [
	           	                           
	           	                    {
	           	                        type: 'button',
	           	                        text: '确定',
	           	                        minWidth: 70,
	           	                        onclick: function(e){
	           	                        this.parent.parent.parent.destroy();
	           	                        var cell=editor.graph.getSelectionCell();
	           	                        new lcaProcessDefine(cell,editor.graph);
	           	                        
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
	           	            }
           	               
           	               ]
			});
	var winprocess=cims201.utils.getWin(300,150,'',[box]);
	winprocess.show('center', 'middle', true);
	
	
}
function lcaProcessDefine(cell,graph){
	var box=Edo.create(
			{type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [30,0,0,0],layout: 'vertical',
           	    children: [
           	    {type : 'formitem',label : '生命周期阶段:',width: '100%',labelWidth : 150,labelAlign : 'right',
               	    children : [{type : 'text',width : 150,id : 'stage',text:cell.stagename,enable:false}]
           	    },
           	    {type : 'formitem',label : '阶段数据填写人:',width: '100%',labelWidth : 150,labelAlign : 'right',
               	    children : [{type : 'button',id:'assignbtn',width : 150,text:'指定',onclick:function(e){getcarrierdiffer(cell); }}]
           	    }
    			]
				});
			//bbl
	        if(cell.isedit){
	        	assignbtn.set('text','更改');
	        }
			var func=function(){
	            var label =  graph.convertValueToString(cell);
    		    var nodelabel =  label.slice(0,label.length);
    		    var newlabel = label.replace(nodelabel,
    		    		'<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;height:100px;background:#00CCFF;opacity:100">'+
						'<table style=" margin: auto;padding:0px 0px 0px 0px;width:180px;height:100px;">'+
						 '<tr>'+
	                    	' <td align="center">'+cell.stagename+'阶段'+'<img src="../js/lcc/img/check.png" />'+'</td>'+
	                    '</tr>'+
		                '</table>'+
		                '</div>'
    		    		);
		                 graph.labelChanged(cell,newlabel,mxEvent.LABEL_CHANGED);
			           }
		    var toolbar=new gettoolbar(null,func);
			var winprocess=cims201.utils.getWin(400,200,'指定阶段数据填写人员',[box,toolbar]);
			winprocess.show('center', 'middle', true);
}
function gettoolbar(id,func){
    var toolbar = Edo.create(
    {type: 'ct',
    cls: 'e-dialog-toolbar',
    width: '100%',
    layout: 'horizontal',
    height: 40,
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
var depdataTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
           
        },
        {name: 'name', mapping: 'name',  type: 'string'
            
        
        }
    ]
});
function refreshdata(dataTable,url,param,id){
    var data= cims201.utils.getData(url,param);
	dataTable.set('data',data);
}
function getcarrierdiffer(cell)
{       editcell=cell;
		var box=Edo.create(
				
		{type: 'box',width: 800,height:340,layout: 'horizontal',border: [0,0,0,0],padding: [0,0,0,0],
		children:[
			{type: 'panel',title:'在建零部件列表',width: 280,height:'100%',layout: 'horizontal',border: [1,1,1,1],padding: [0,0,0,0],
					children:[
						{
						id: 'comp', type: 'table', width: 280, height: '100%',
						border: [0,0,0,0],padding: [0,0,0,0],
					    rowSelectMode : 'multi',
					    columns:[
						 Edo.lists.Table.createMultiColumn(),
						 {header:'名称',dataIndex: 'name', headerAlign: 'center',width:120,align: 'center'},
						 {header:'指定人',dataIndex: 'processperson',headerAlign: 'center',width:150,align: 'center'}
			             ]
				   		}]
	   		},
	   		{type: 'panel',title:'部门列表',width: 200,height: '100%',layout: 'horizontal',border: [1,1,1,1],padding: [0,0,0,0],
          		children:[
					{
					id:'dep',
					type: 'tree',		
			        width: 200,
			        height: '100%',             	        
			        headerVisible: false,
			        autoColumns: true,
			        horizontalLine: false,
			        columns: [{header: '部门',dataIndex: 'name'}],
			        onselectionchange: function(e){	
			            var data= cims201.utils.getData(basePath+'department/department!getEmployeeByDepartment.action',{id:e.selected.id});
			            emp.set("data",data)
			        },
					data:depdataTable
			       	}]
	   		},
	       	{type: 'panel',title:'人员列表',width: 280,height: '100%',layout: 'vertical',border: [1,1,1,1],padding: [0,0,0,0],verticalGap:'0',
	    		children:[
			          {
			  			type: 'group',
			  		    layout: 'horizontal',
			  		    cls: 'e-toolbar',
			  		    children: [
							{
							    type: 'button',
							    text: '指定人员',
							    onclick: function(e){
							    	var rows=Edo.get('comp').getSelecteds();
							    	var r1=Edo.get('emp').getSelected();
							    	for(var i=0;i<rows.length;i++){
							    		comp.data.update(rows[i], 'processperson', r1.name);
							    		comp.data.update(rows[i], 'processpersonid', r1.id);
							    		comp.data.update(rows[i], 'isassigned', true);
							    	}
							    	
							    	var a=comp.data.each(function(o){
						                if(o.processperson==null) return false;
						            },comp);
							    	if(a==false){
							    		
							    	}else{
							    		okbtn.set('enable',true);
							    		moduleobject.issaved=false;
							    	}
							    	
							    	
							    	
							    }
							}]
			          },
	    		          
			   		{
					id: 'emp', type: 'table', width: 280, height:'100%',
					border: [0,0,0,0],padding: [0,0,0,0],
				    rowSelectMode : 'single',
				    columns:[
					 Edo.lists.Table.createMultiColumn(),
					 {header:'人员序号',dataIndex: 'id', headerAlign: 'center',width:120,align: 'center'},
					 {header:'人员姓名',dataIndex: 'name',headerAlign: 'center',width:150,align: 'center'}
		             ]
			   		}]
	       	}
		]})
    //bbl
		var func=function(){
			cell.isedit=true;
			assignbtn.set('text','更改');
			var rows=Edo.get('comp').data.source;
	    	for(var i=0;i<rows.length;i++){
	    		var module=getLevelModule(wholelevel.getcurrentlevel(),editcell);
	    		var stage=module.levelmoduleobject.processnote;
	    		for(var j=0;j<moduleobject.componentstageslist.length;j++)
				{
				if(rows[i].name==moduleobject.componentstageslist[j].component.name)
					{
					
					for(var k=0;k<moduleobject.componentstageslist[j].stages.length;k++)
					{
					//if(editcell.stage==moduleobject.componentstageslist[j].stages[k].stage)
						if(stage==moduleobject.componentstageslist[j].stages[k].stage)
						{
						moduleobject.componentstageslist[j].stages[k].processperson=rows[i].processperson;
						moduleobject.componentstageslist[j].stages[k].processpersonid=rows[i].processpersonid;
						moduleobject.componentstageslist[j].stages[k].isassigned=true;
						moduleobject.componentstageslist[j].stages[k].ismodified=true;
						break;
						}
					};
					break;
					}
				};
	    	}
	    	if(moduleobject.buildtype=='old_coopbuild'&&moduleobject.oldbuildtype=='old'){
	    		var cellid=editcell.getId();
		    	var strings='level_stage'+'_'+cellid;
		    	var alloldlevels=moduleobject.oldmodulealldata.alllevels;
		    	for(var j=0;j<alloldlevels.length;){
		    		var level=alloldlevels[j];
		      		var levelid=level.levelid;
		      		if(levelid.indexOf(strings)>=0){
		      			alloldlevels.remove(level);
		      		}else{
		      			j++;
		      		}
		    	}
		        }
	    	
       }
		var toolbar=new gettoolbar(null,func);
		var okbtn=toolbar.getChildAt(0);
		var module=getLevelModule(wholelevel.getcurrentlevel(),editcell);
		var stage=module.levelmoduleobject.processnote;
		for(var i=0;i<moduleobject.stagecomponentslist.length;i++)
		{
	
			if(stage==moduleobject.stagecomponentslist[i].stage.stage)
			{
				
				comp.set('data',moduleobject.stagecomponentslist[i].components);
				var data=moduleobject.stagecomponentslist[i].components;
				for (var j=0;j<data.length;j++){
					if(data[j].processperson==null){
						okbtn.set('enable',false);
						break;
					}
				}
				break;
			}
		};
			
	var url=basePath+'department/department!getDepartment.action';
	var param={};
	var id='dep';
	refreshdata(depdataTable,url,param,id);		
    var winfm=cims201.utils.getWin(800,400,'选择人员',[box,toolbar]);
    winfm.show('center', 'middle', true);
}
function deliverOldModule(moduleobj){
	moduleobject.oldmoduleid=moduleobj.oldmoduleid;
	moduleobject.oldsupermoduleid=moduleobj.oldsupermoduleid;
	moduleobject.oldbranchUUID=moduleobj.oldbranchUUID;
//	alert(moduleobject.oldmoduleid);
//	alert(moduleobject.oldsupermoduleid);
//	alert(moduleobject.oldbranchUUID);
}
function showmodule(moduleid){
    wholelevel.getcurrentlevel().moduleid=moduleid;  
	currentmoduleid=moduleid;
	var graph=editor.graph;
	initgraph();
	graph.getModel().beginUpdate();
	try
	{	
		read(graph,basePath+"lcc/lccmodule!downloadXML.action?moduleid="+currentmoduleid);	
	}
	finally
	{
		// Updates the display
	 
		graph.getModel().endUpdate();
		
	}
	var cells =graph.getChildCells();
	wholelevel.getcurrentlevel().cells=cells;
	wholelevel.getcurrentlevel().moduleid=moduleid;
	savecells();
	if(cells.length>0){
	for (var i=0;i<cells.length;i++)
	{
	  var style =  graph.model.getStyle(cells[i]);
	  if(style=='process'){
	    var data= cims201.utils.getData(basePath+'lcc/lccmodule!getmoduleprocesscontent.action',{moduleid:currentmoduleid,processid:cells[i].getId()});
	 	var levelmodule=wholelevel.addlevelmodule(cells[i]);
	    levelmodule.levelmoduleobject.processid=data.id;
	 	levelmodule.levelmoduleobject.processname=data.name;
   		levelmodule.levelmoduleobject.processnote=data.note;
  	    levelmodule.levelmoduleobject.id=data.id;
		levelmodule.levelmoduleobject.processname=data.name;
		levelmodule.levelmoduleobject.processnote=data.note;
		levelmodule.levelmoduleobject.inputmaterial=data.inputmaterial;
		levelmodule.levelmoduleobject.outputmaterial=data.outputmaterial;
		levelmodule.levelmoduleobject.type=style;
        var label =  graph.convertValueToString(cells[i]);
 		var nodelabel =  label.slice(0,label.length);
			var newlabel = label.replace(nodelabel,
	     		    		'<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;height:100px;background:#00CCFF;opacity:100">'+
	 						'<table style=" margin: auto;padding:0px 0px 0px 0px;width:180px;height:100px;">'+
	 						 '<tr>'+
	 	                    	' <td align="center">'+levelmodule.levelmoduleobject.processname+'</td>'+
	 	                    '</tr>'+
	 		                '</table>'+
	 		                '</div>');
       	 graph.labelChanged(cells[i],newlabel,mxEvent.LABEL_CHANGED);
	  }
	}
}
return cells;
}
//bbl513
function showstagemoduletest(moduleid,moduleobj){
	var graph=editor.graph;
	var data= cims201.utils.getData(basePath+'lcc/lccmodule!getModuleAllData.action',{moduleid:moduleid});
	moduleobject.oldmodulealldata=data;
	var stagelevel=data.stagelevel;
	initgraph();
	graph.getModel().beginUpdate();
	try
	{	
		readtest(graph,stagelevel.xmldata);	
	}
	finally
	{
		// Updates the display
	 
		graph.getModel().endUpdate();
		
	}
	var cells =graph.getChildCells();
	wholelevel.getcurrentlevel().cells=cells;
	//wholelevel.getcurrentlevel().moduleid=moduleid;
	//savecells();
	if(cells.length>0){
	var stages=[];
	var components=[];
	for (var i=0;i<cells.length;i++)
	{
	  var style =  graph.model.getStyle(cells[i]);
	  if(style=='process'){
		var cell=cells[i];
	 	var levelmodule=wholelevel.addlevelmodule(cell);
	 	var process=getProcess(stagelevel,cell.getId());
	    levelmodule.levelmoduleobject.processid=cell.getId();
	    levelmodule.levelmoduleobject.processname=process.processname;
		levelmodule.levelmoduleobject.processnote=process.processnote;
		levelmodule.levelmoduleobject.inputmaterial=process.inputmaterial;
		levelmodule.levelmoduleobject.outputmaterial=process.outputmaterial;
		levelmodule.levelmoduleobject.knowledge=process.knowledge;
		levelmodule.levelmoduleobject.type=style;
	    var stage={};
	    stage.name=process.processname;
	    stage.id=cell.getId();
	    stage.stage=process.processnote;
	    stages.push(stage);
        var label =  graph.convertValueToString(cells[i]);
 		var nodelabel =  label.slice(0,label.length);
			var newlabel = label.replace(nodelabel,
	     		    		'<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;height:100px;background:#00CCFF;opacity:100">'+
	 						'<table style=" margin: auto;padding:0px 0px 0px 0px;width:180px;height:100px;">'+
	 						 '<tr>'+
	 	                    	' <td align="center">'+levelmodule.levelmoduleobject.processname+'</td>'+
	 	                    '</tr>'+
	 		                '</table>'+
	 		                '</div>');
       	 graph.labelChanged(cells[i],newlabel,mxEvent.LABEL_CHANGED);
	  }
	  
	}
	 moduleobj.stages=stages;
	 refreshcompmodule(moduleobj);
   }	
}
function getProcess(level,id){
   var processes=level.cellcollection;
   var length=processes.length;
   for(var i=0;i<length;i++ ){
	   var process=processes[i];
	   if(process.id==id){
		   return process;
	   }
   }
   return null;
	
}
function getLevel(id){
	var level=wholelevel.getcurrentlevel();
    var oldalllevels=moduleobject.oldmodulealldata.alllevels;
    var length=oldalllevels.length;
    var levelid=level.levelid+'_'+id;
    for(var i=0;i<length;i++){
    	  var oldlevel=oldalllevels[i];
    	  if(levelid==oldlevel.levelid){
    		  return oldlevel;
    	  }
    }
    return null;
}
function getLevelBylevelid(levelid){
	var oldalllevels=moduleobject.oldmodulealldata.alllevels;
	var length=oldalllevels.length;
	for(var i=0;i<length;i++){
  	  var oldlevel=oldalllevels[i];
  	  if(levelid==oldlevel.levelid){
  		  return oldalllevels[i];
  	  }
  }
  return null;
}
function removeLevelBylevelid(levelid){
	
	var oldalllevels=moduleobject.oldmodulealldata.alllevels;
	var length=oldalllevels.length;
	for(var i=0;i<length;i++){
  	  var oldlevel=oldalllevels[i];
  	  if(levelid==oldlevel.levelid){
  	  }
  }
}
function getLevelModule(level,cell){
    var modules=level.levelmodules;
    for(var i=0;i<modules.length;i++){
	       if(modules[i].levelmoduleobject.cellid==cell.getId()){
			    return modules[i];
	    	}
		}
    return null;
}
function showstagemodule(moduleid,moduleobj){
    wholelevel.getcurrentlevel().moduleid=moduleid;  
	currentmoduleid=moduleid;
	var graph=editor.graph;
	initgraph();
	graph.getModel().beginUpdate();
	try
	{	
		read(graph,basePath+"lcc/lccmodule!downloadXML.action?moduleid="+currentmoduleid);	
	}
	finally
	{
		// Updates the display
	 
		graph.getModel().endUpdate();
		
	}
	var cells =graph.getChildCells();
	wholelevel.getcurrentlevel().cells=cells;
	wholelevel.getcurrentlevel().moduleid=moduleid;
	savecells();
	var stages=[];
	if(cells.length>0){
	for (var i=0;i<cells.length;i++)
	{
	  var style =  graph.model.getStyle(cells[i]);
	  if(style=='process'){
	    var data= cims201.utils.getData(basePath+'lcc/lccmodule!getmoduleprocesscontent.action',{moduleid:currentmoduleid,processid:cells[i].getId()});
	 	var levelmodule=wholelevel.addlevelmodule(cells[i]);
	 	var stage={};
	 	stage.name=data.name;
	 	stage.stage=data.note;
	 	stages.push(stage);
	    levelmodule.levelmoduleobject.processid=data.id;
	 	levelmodule.levelmoduleobject.processname=data.name;
   		levelmodule.levelmoduleobject.processnote=data.note;
  	    levelmodule.levelmoduleobject.id=data.id;
		levelmodule.levelmoduleobject.processname=data.name;
		levelmodule.levelmoduleobject.processnote=data.note;
		levelmodule.levelmoduleobject.inputmaterial=data.inputmaterial;
		levelmodule.levelmoduleobject.outputmaterial=data.outputmaterial;
		levelmodule.levelmoduleobject.type=style;
        var label =  graph.convertValueToString(cells[i]);
 		var nodelabel =  label.slice(0,label.length);
			var newlabel = label.replace(nodelabel,
	     		    		'<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;height:100px;background:#00CCFF;opacity:100">'+
	 						'<table style=" margin: auto;padding:0px 0px 0px 0px;width:180px;height:100px;">'+
	 						 '<tr>'+
	 	                    	' <td align="center">'+levelmodule.levelmoduleobject.processname+'</td>'+
	 	                    '</tr>'+
	 		                '</table>'+
	 		                '</div>');
       	 graph.labelChanged(cells[i],newlabel,mxEvent.LABEL_CHANGED);
	  }
	}
	}
   moduleobj.stages=stages;
   refreshcompmodule(moduleobj);
   return cells;
}