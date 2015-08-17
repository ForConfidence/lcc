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
	initlevel();
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
	 //moduleobj.stages=stages;
	// refreshcompmodule(moduleobj);
   }	
}
function deliverOldModule(moduleobj){
	moduleobject.oldmoduleid=moduleobj.oldmoduleid;
	moduleobject.productid=moduleobj.productid;
	moduleobject.oldbranchUUID=moduleobj.oldbranchUUID;
	moduleobject.oldsupermoduleid=moduleobj.oldsupermoduleid;
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
