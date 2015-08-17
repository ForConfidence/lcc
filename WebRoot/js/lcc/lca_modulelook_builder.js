var productcell=null;
var productobject=null;
function getmoduletreegraph(r){
	 var graph=editor.graph;
	 var model=graph.getModel();
 	 model.clear();
     var parent = graph.getDefaultParent();
     var w = graph.container.offsetWidth;  
	productcell = addnewprocess('<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;height:100px;background:#00CCFF;opacity:100">'+
			'<table style=" margin: auto;padding:0px 0px 0px 0px;width:180px;height:100px;">'+
                '<tr>'+
                    ' <td align="center">产品名称'+r.name+'</td>'+
                '</tr>'+
                '</table>'+
                '</div>', w/2 - 30, 50, 180, 100,'product');
	 var rootcell=productcell;
	 getallmodule(rootcell,r);
	 productobject=r;
	
}
function getallmodule(rootcell,r){
	var moduledata= cims201.utils.getData(basePath+'lcc/lccmodule!getModuletree.action',{componentid:r.id});
	 for(var i=0;i<moduledata.length;i++){
	 		var v1=null;
			 v1= addnewprocess('<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;height:100px;background:green;opacity:100">'+
						'<table style=" margin: auto;padding:0px 0px 0px 0px;width:180px;height:100px;">'+
						'<tr>'+
	                    ' <td align="center">模型名称：'+moduledata[i].name+'</td>'+
		                '</tr>'+
		                '<tr>'+
		                ' <td align="center">版本号：'+moduledata[i].Version+'</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', null, null, 180, 100,'version',rootcell);
			 v1.moduleid=moduledata[i].id;
			 v1.componentid=moduledata[i].componentid;
		 }
}
function addnewprocess(label,x,y,width,height,type,previous){
	var graph=editor.graph;
	var model = graph.getModel();  
	var parent = editor.graph.getDefaultParent();
	 model.beginUpdate();  
    try  
    {  
		var v = graph.insertVertex(parent,null, label, x, y, width, height,type);
		var e1=graph.insertEdge(parent, null, '', previous,v);
	}  
    finally  
    {  
        model.endUpdate();  
    }  
	return v;
	}