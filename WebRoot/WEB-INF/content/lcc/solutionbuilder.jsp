<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<html>
<head>
	<title>新建模型</title>
	<style type="text/css" media="screen">
		BODY {
			font-family: Arial;
		}
		H1 {
			font-size: 18px;
		}
		H2 {
			font-size: 16px;
		}
		.skin {
            width : 100px;
            border : 1px solid gray;
            padding : 2px;
            visibility : hidden;
            position : absolute;
        }
        div.menuitems {
            margin : 1px 0;
        }
        div.menuitems a {
            text-decoration : none;
        }
        div.menuitems:hover {
            background-color : #c0c0c0;
        }
		
	</style>
	<!-- Sets the basePath for the library if not in same directory -->
	<script type="text/javascript">
		var basePath='<%=basePath%>';
		var mxBasePath=basePath+'/js/lcc';
	</script>
	<!-- Loads and initializes the library -->
	<script type="text/javascript" src="<%=basePath%>js/lcc/flow/mxclient1.8goo.js"></script>
	<link rel="stylesheet" type="text/css"
			href="<%=basePath%>css/welcome.css">
		<link href="<%=basePath%>js/edo/res/css/edo-all.css" rel="stylesheet"
			type="text/css" />
		<link href="<%=basePath%>css/icon.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" src="<%=basePath%>js/lcc/echarts.js"></script>
		<script src="<%=basePath%>js/edo/edo.js" type="text/javascript"></script>
		<script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lcalccutils.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lcc/lca_solutionbuilder_builder.js" type="text/javascript"></script>
		
	<script type="text/javascript">
		// Program starts here. Creates a sample graph in the
		// DOM node with the specified ID. This function is invoked
		// from the onLoad event handler of the document (see below).
		function levelmodule(level,cell){
			this.level=level;
			
			this.levelmoduleobject={
			cellid:cell.getId(),
			type:null,
			processname:null,
			processnote:null,
			knowledge:null,
			inputmaterial:null,
			outputmaterial:null,
			evaluationmethod:null,
			};
			this.childlevel=null;
		}
		levelmodule.prototype.constructor = levelmodule;
		levelmodule.prototype.createlavelid=function(){
		
		}
		function alllevel(){
		}
		alllevel.prototype.constructor = alllevel;
		alllevel.prototype.rootlevel=null;
		alllevel.prototype.currentlevel=null;
		alllevel.prototype.alllevels=new Array();
		alllevel.prototype.setrootlevel=function(rootlevel){
			this.rootlevel=rootlevel;
			this.alllevels.add(rootlevel);
		};
		alllevel.prototype.getcurrentlevel=function(){
			return this.currentlevel;
		};
		alllevel.prototype.setcurrentlevel=function(level){
			this.currentlevel=level;
		};
		alllevel.prototype.addlevel=function(levelmodule){
			var newlevel=new level();
			var parentlevel=this.getcurrentlevel();
			newlevel.setparentlevel(parentlevel);
			newlevel.parentcellid=levelmodule.levelmoduleobject.cellid;
			levelmodule.childlevel=newlevel;
			newlevel.levelid=parentlevel.levelid+'_'+levelmodule.levelmoduleobject.cellid;
			newlevel.parentlevelid=parentlevel.levelid;
			this.alllevels.add(newlevel);
			this.setcurrentlevel(newlevel);
			return newlevel;
		 
		};
		alllevel.prototype.addlevelmodule=function(cell){
			return this.currentlevel.addlevelmodule(cell);
		};
		function level(){
		    this.parentcellid=null;
			this.levelmodules=new Array();
			this.cells=null;
			this.levelid=null;
			this.parentlevelid=null;
			this.parentlevel=null;
			this.xml=null;
			this.type=null;
		}
		level.prototype.constructor = level;
		level.prototype.addlevelmodule=function(cell){
		    var newlevelmodule=new levelmodule(this,cell);
			this.levelmodules.add(newlevelmodule);
			return newlevelmodule;
		}
		level.prototype.setparentlevel=function(level){
			this.parentlevel=level;
		}
		level.prototype.getparentlevel=function(){
			return this.parentlevel;
		}
		/* //var alllevel=new Array();
		var levelindex=0;
		var parentcellid=null; */
		var datasetid = null;
		var newdatasetUUID=null;
		var moduleobject={
			versionid:null,
			oldmoduleid:null,
			oldsupermoduleid:null,
			oldbuildtype:null,
			oldmodulealldata:null,
			productid:null,
			productdname:null,
			modulename:null,
			modulenote:null,
		    buildtype:null,
		    issaved:false,
		    supermoduleid:null,
		    branchUUID:null,
		    datasetUUID:null,
		    superisassigned:0,
		}
    	function initmoduleobject(){
	    	moduleobject.components=null;
			moduleobject.stages=null;
			moduleobject.componentstageslist=null;
			moduleobject.stagecomponentslist=null;
   			moduleobject.issaved=false;
   			moduleobject.modulename=null;
   			moduleobject.modulenote=null;
   			
    	}
    	function clearmodule(){
    		initgraph();
    		initmoduleobject();
    		parent.clearcompmodule();
    	}
		function initgraph(){
	 		var graph=editor.graph;
        	var model=graph.getModel();
        	model.clear();
   		}
   		function getrootcells(){
	 		var cells =  editor.graph.getChildCells();
        	alert(cells.length);
   		}
   		function judgesave(){
   		if(moduleobject.stages&&!moduleobject.issaved){
   			return false;
   		}else{
   		    return true;
   		}
   		
   		}
   		function askifsave(callback){
  				var label=Edo.create({
   	        	    type:'label',
   	        	    text:'请先保存数据'
   	        	    });
        	    var func=function(){
        	    editor.execute('savesolutiondata');
           		}
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
					            callback();
					            this.parent.parent.parent.destroy();
					
					            }
					        }
					    ]
					});
	         	var win=cims201.utils.getWin(300,100,'模型保存',[label,toolbar]);
             	win.show('center', 'middle', true);
   		}
		
		//定义流程数组
		var cellcollection=new Array();
		//从父窗口初始化产品模型时调用此方法，根据模型类型不同初始化也不同
		function initmodule(moduleobj){
			moduleobject.productid=moduleobj.productid;
			moduleobject.productname=moduleobj.productname;
			moduleobject.versionid=moduleobj.versionid;
			moduleobject.modulename=moduleobj.modulename;
			moduleobject.modulenote=moduleobj.modulenote;
			moduleobject.buildtype=moduleobj.buildtype;
			/* alert(moduleobject.productid);
			alert(moduleobject.productname)
			alert(moduleobject.versionid)
			alert(moduleobject.modulename)
			alert(moduleobject.modulenote) */
			
			/* moduleobject.componentname=null;
			moduleobject.componentid=null; */
			moduleobject.stages=null;
		}
		
		function defineOldBuildType(type){
		    moduleobject.oldbuildtype=type;
		}
		//零件模型初始化时操作
		function refreshcompmodule(moduleobj)
		{
			moduleobject.components=moduleobj.components;
			
     		/* moduleobject.modulename=moduleobj.modulename;
     		moduleobject.modulenote=moduleobj.modulenote; */
     		moduleobject.stages=moduleobj.stages;
     		
     	    moduleobject.componentstageslist=[];
			for(var i=0;i<moduleobject.components.length;i++)
			{
			var b={};
			b.component=moduleobject.components[i];
			b.stages=[];
			var proto=moduleobject.stages;
			alert(proto.length)
			for (var j=0;j<proto.length;j++){
				var a={};
				for(var p in proto[j]){
					  a[p]=proto[j][p];
					 }
				b.stages.push(a);
			}
			moduleobject.componentstageslist.add(b);
			}
			
			
			
     		moduleobject.stagecomponentslist=[];
			for(var l=0;l<moduleobject.stages.length;l++)
			{
			var b={};
			b.stage=moduleobject.stages[l];
			b.components=[];
			var proto=moduleobject.components;
			for (var k=0;k<proto.length;k++){
				var a={};
				for(var p in proto[k]){
					  a[p]=proto[k][p];
					 }
				b.components.push(a);
			}
			moduleobject.stagecomponentslist.add(b);
			} 
			
		}
		//定义编辑器
		var editor=null;
		
		//定义右键菜单
	  /*   var popmenu=new mxPopupMenu();
	    popmenu.init(); */
	    var groupfunc=function(){
	    	editor.execute('groupOrUngroup');
	    };
	    var exitgroupfunc=function(){
	    	editor.execute('exitGroup');
	    	//tr1.hidden=true;
	    };
	    var entergroupfunc=function(){
	    	editor.execute('enterGroup');
	    	//tr1.hidden=false;
	    };
	    var deletefunc=function(){
	    	editor.execute('delete');
	    };
	    var copyfunc=function(){
	    	editor.execute('copy');
	    	//tr.hidden=false;
	    };
	    var cutfunc=function(){
	    	editor.execute('cut');
	    	//tr.hidden=false;
	    };
	    var pastefun=function(){
	    	editor.execute('paste');
	    	//tr.hidden=true;
	    };
	 /*    var tr=popmenu.addItem ('删除', 'images/delete.gif', deletefunc, popmenu);
        popmenu.addItem ('复制', 'images/copy.gif', copyfunc, popmenu);
        popmenu.addItem ('剪切','images/cut.gif', cutfunc, popmenu);
        popmenu.addItem ('构建组', 'img/group.png', groupfunc, popmenu); 
        popmenu.addItem ('进入组', 'img/groupin.gif', entergroupfunc, popmenu);
        var  popmenu2=new mxPopupMenu();
	    popmenu2.init();
	    var tr=popmenu2.addItem ('粘贴', 'images/paste.gif', pastefun, popmenu2);
	    tr.hidden=true;
        var tr1=popmenu2.addItem ('跳出组', 'img/groupout.gif', exitgroupfunc, popmenu2);
        tr1.hidden=true; */
        
		function main(container, outline, toolbar, modelbar,sidebar, status)
		{
	
				editor = new mxEditor();
				var graph = editor.graph;
				var model = graph.getModel();
				//alert(mxUtils.getFunctionName(graph.constructor));

				// Disable highlight of cells when dragging from toolbar
				graph.setDropEnabled(false);

				// Uses the port icon while connections are previewed
				graph.connectionHandler.getConnectImage = function(state)
				{
					return new mxImage(state.style[mxConstants.STYLE_IMAGE], 16, 16);
				};

				// Centers the port icon on the target port
				graph.connectionHandler.targetConnectImage = true;

				// Does not allow dangling edges
				graph.setAllowDanglingEdges(false);

				// Sets the graph container and configures the editor
				editor.setGraphContainer(container);
				var config = mxUtils.load(
					'../js/lcc/editors/config/keyhandler-commons.xml').
					getDocumentElement();
				editor.configure(config);
				
				// Defines the default group to be used for grouping. The
				// default group is a field in the mxEditor instance that
				// is supposed to be a cell which is cloned for new cells.
				// The groupBorderSize is used to define the spacing between
				// the children of a group and the group bounds.
				var group = new mxCell('Group', new mxGeometry(), 'group');
				group.setVertex(true);
				group.setConnectable(false);
				editor.defaultGroup = group;
				editor.groupBorderSize = 20;

				// Disables drag-and-drop into non-swimlanes.
				graph.isValidDropTarget = function(cell, cells, evt)
				{
					return this.isSwimlane(cell);
				};
				
				// Disables drilling into non-swimlanes.
				graph.isValidRoot = function(cell)
				{
					return this.isValidDropTarget(cell);
				}

				// Does not allow selection of locked cells
				graph.isCellSelectable = function(cell)
				{
					return !this.isCellLocked(cell);
				};

				// Returns a shorter label if the cell is collapsed and no
				// label for expanded groups
				graph.getLabel = function(cell)
				{
					var tmp = mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
					
					if (this.isCellLocked(cell))
					{
						// Returns an empty label but makes sure an HTML
						// element is created for the label (for event
						// processing wrt the parent label)
						return '';
					}
					else if (this.isCellCollapsed(cell))
					{
						var index = tmp.indexOf('</h1>');
						
						if (index > 0)
						{
							tmp = tmp.substring(0, index+5);
						}
					}
					
					return tmp;
				}
           		
				// Disables HTML labels for swimlanes to avoid conflict
				// for the event processing on the child cells. HTML
				// labels consume events before underlying cells get the
				// chance to process those events.
				//
				// NOTE: Use of HTML labels is only recommended if the specific
				// features of such labels are required, such as special label
				// styles or interactive form fields. Otherwise non-HTML labels
				// should be used by not overidding the following function.
				// See also: configureStylesheet.
				graph.isHtmlLabel = function(cell)
				{
					return !this.isSwimlane(cell);
				}
				// To disable the folding icon, use the following code:
				/*graph.isCellFoldable = function(cell)
				{
					return false;
				}*/
				//创建下拉菜单
				graph.panningHandler.factoryMethod = function(menu, cell, evt)  
                {  
                    return createPopupMenu(graph, menu, cell, evt);  
                }; 
				graph.dblClick = function(evt, cell)
				{    
				var label =  graph.model.getStyle(cell);
				var type=null;
				if(label==null){
				return null;
				}
				if(moduleobject.buildtype=='simple')
				{
				return null;
				}
				if(label=='process'){
				type='process';
				}else{
				var endindex=label.indexOf(';');
				type=label.substring(0,endindex);
				}
				
					// Do not fire a DOUBLE_CLICK event here as mxEditor will
					// consume the event and start the in-place editor.
					if (this.isEnabled() &&
						!mxEvent.isConsumed(evt) &&
						cell != null &&
						this.isCellEditable(cell))
					{
						if (this.model.isEdge(cell) ||
							!this.isHtmlLabel(cell))
						{
							this.startEditingAtCell(cell);
						}
						else
						{
						if(type=='process'){
						new lcaProcessDefine(cell,graph);
						
						}
						 
						}
					}

					// Disables any default behaviour for the double click
					mxEvent.consume(evt);
				};

				// Enables new connections
				graph.setConnectable(true);

				// Adds all required styles to the graph (see below)
				configureStylesheet(graph);

				// Adds sidebar icons.
				//
				// NOTE: For non-HTML labels a simple string as the third argument
				// and the alternative style as shown in configureStylesheet should
				// be used. For example, the first call to addSidebar icon would
				// be as follows:
				// addSidebarIcon(graph, sidebar, 'Website', 'img/earth.png');
				
				

				
				// Creates a new DIV that is used as a toolbar and adds
				// toolbar buttons.
				var spacer = document.createElement('div');
				spacer.style.display = 'inline';
				spacer.style.padding = '8px';
				
				//addToolbarButton(editor, toolbar, 'groupOrUngroup', '构建组', 'img/group.png');
				
				// Defines a new action for deleting or ungrouping
				editor.addAction('groupOrUngroup', function(editor, cell)
				{
					cell = cell || editor.graph.getSelectionCell();
					if (cell != null && editor.graph.isSwimlane(cell))
					{
						editor.execute('ungroup', cell);
					}
					else
					{
						editor.execute('group');
					}
				});

				
				
				//toolbar.appendChild(spacer.cloneNode(true));
				//addToolbarButton(editor, toolbar, 'delete', '删除', 'img/delete2.png');
				//addToolbarButton(editor, toolbar, 'cut', '剪切', 'img/cut.png');
				//addToolbarButton(editor, toolbar, 'copy', '复制', 'img/copy.png');
				//addToolbarButton(editor, toolbar, 'paste', '粘贴', 'img/paste.png');

				//toolbar.appendChild(spacer.cloneNode(true));
				
				//addToolbarButton(editor, toolbar, 'undo', '', 'img/undo.png');
				//addToolbarButton(editor, toolbar, 'redo', '', 'img/redo.png');
				
				//toolbar.appendChild(spacer.cloneNode(true));
				
				/* addToolbarButton(editor, toolbar, 'show', 'Show', 'img/camera.png');
				addToolbarButton(editor, toolbar, 'print', 'Print', 'img/printer.png'); */
				
				//toolbar.appendChild(spacer.cloneNode(true));

				// Defines a new export action
				editor.addAction('savesolutiondata', function(editor, cell)
				{ 
				    var graph=editor.graph;
					var cells =  graph.getChildCells();
					/* if(cells.length>0&&moduleobject.stage!=null){ */
					if(cells.length>0&&!moduleobject.issaved){
							   savecells();
							   alert('老的保存');
								var alllevels=wholelevel.alllevels;
								var alldata=moduleobject.oldmodulealldata;
								var moduleid=moduleobject.oldmoduleid;
								//var modulename = moduleobject.modulename;
						        //alldata.modulename=Edo.get('mdname').text;
						        //alldata.modulenote=Edo.get('mdnote').text;
						        alldata.productid=moduleobject.productid;
						        alldata.buildtype=moduleobject.buildtype;
						        alldata.moduleid=moduleobject.oldmoduleid;
						        alldata.modulename=moduleobject.modulename;
						        alldata.datasetUUID=moduleobject.datasetUUID;
						      	for(var j=0;j<alllevels.length;j++){
						      		var level=alllevels[j];
						      		var levelid=level.levelid;
						      		var oldlevel=getLevelBylevelid(levelid);
						      	    var newlevel=getnewlevel();
						      		newlevel.xmldata=level.xml;
						      		newlevel.levelid=level.levelid;
						      		newlevel.type=level.type;
						      		if(level.type=='stagelevel'){
							      		  oldlevel=alldata.stagelevel;
							      		  newlevel.cellcollection=moduleobject.componentstageslist;
						      		}else{
						      		    var modules=level.levelmodules;
								        for(var i=0;i<modules.length;i++){
									       if( modules[i].levelmoduleobject.type=='process'){
									            var cell={};
									      		cell.processname=modules[i].levelmoduleobject.processname;
									        	cell.processnote=modules[i].levelmoduleobject.processnote;
									            cell.id=modules[i].levelmoduleobject.cellid;
									            alert(cell.id);
									            cell.knowledge=modules[i].levelmoduleobject.knowledge;
									            cell.inputmaterial=modules[i].levelmoduleobject.inputmaterial;
									            cell.outputmaterial=modules[i].levelmoduleobject.outputmaterial;
									            alert(Edo.util.JSON.encode(cell.inputmaterial));
									            alert(Edo.util.JSON.encode(cell.outputmaterial));
									            cellcollection.push(cell);
							       	   		}
						       	 		}
						       	 		newlevel.cellcollection=cellcollection;
							       	    newlevel.parentlevelid=level.parentlevelid;
							       	    newlevel.parentcellid=level.parentcellid;
						      		}
						      		if(oldlevel!=null){
						      		alert(oldlevel.levelid)
						      		    if(level.type=='stagelevel'){
						      		    	alldata.stagelevel=newlevel;
						      		    }else{
						      		       alldata.alllevels.remove(oldlevel);
						      		       alldata.alllevels.push(newlevel);
						      		    }
						      			
						      		}else{
						      		   alldata.alllevels.push(newlevel);
						      		}
						      	    cellcollection=new Array();
						      	}
						      	 	//传递原始模板的顶级id
						       var oldsupermoduleid=moduleobject.oldsupermoduleid;
						       alldata.oldsupermoduleid=oldsupermoduleid;
						       alert(Edo.util.JSON.encode(alldata));
						       var data= cims201.utils.getData(basePath+'lcc/lccmodule!savealldata1.action',{alldata:alldata});
							   alert('粪');
							   alert(alldata.modulename);
						       alert(moduleid);
							   alert(data.newdatasetUUID);
							   alert(data.datasetid);//已传到！
							   newdatasetUUID = data.newdatasetUUID;
							   datasetid = data.datasetid;
							   parent.parent.getModeleidandatasetUUID(moduleid,data.newdatasetUUID,data.datasetid);
					}else if(cells.length==0){
						alert('请完成流程图再保存!');
						return null;
					}
				});
				function cloneFun(obj){
					  if(!obj||"object" != typeof obj){
					    return null;
					  }
					  var result = (obj instanceof Array)?[]:{};
					  for(var i in obj){
					    result[i] = ("object" != typeof obj[i])?obj[i]:cloneFun(obj[i]);
					  }
					  return result;
				}
				function getnewlevel(){
					
					
					  var level={
					  levelid:null,
					  parentlevelid:null,
					  parentcellid:null,
					  xmldata:null
					
					  };
					  return level;
					}
				editor.addAction('export', function(editor, cell)
				{ 
					var textarea = document.createElement('textarea');
					textarea.style.width = '400px';
					textarea.style.height = '400px';
					var enc = new mxCodec(mxUtils.createXmlDocument());
					var node = enc.encode(editor.graph.getModel());
					textarea.value = mxUtils.getPrettyXml(node);
					showModalWindow(graph, 'XML', textarea, 410, 440);
				
				    
				});
				var outln = new mxOutline(graph, outline);
				var menubar= Edo.create({
				type: 'box',
				id:'menubox',
				width: '100%',
				height:40,
			    layout: 'horizontal',
			    padding:[0,0,0,0], //横向布局
			    border: [0,0,0,0],
			    render:toolbar,
			    children: [
			     /* {type: 'button', width:60,height:30,text: '新增', arrowMode: 'menu',style:'background:CCFF00',
			            menu: [
			                {type: 'button', text: 'LCA模板',onclick: function(e){
			                	moduleobject=new moduledefine('LCA');
			                }
			                	},
			                {type: 'button', text: 'LCC模板',onclick: function(e){
			                	moduleobject=new moduledefine('LCC');
			                }
			                	},
			                {type: 'button', text: 'PDM模板',onclick: function(e){
			                	moduleobject=new moduledefine('PDM');
			                }
			                	}
			            ]
			        },  */                       
			       /*  {type: 'button', text: '新增零部件模型',width:120,height:35,style:'border-radius:10px;',onclick: function(e){
			            if(moduleobject.issaved){
				        	window.parent.createcompmodule();
			   				var graph=editor.graph;
			   	        	var model=graph.getModel();
			   	        	model.clear();
			   	        	moduleobject.componentname=null;
							moduleobject.componentid=null;
							moduleobject.stage=null;
							moduleobject.modulename=null;
			     			moduleobject.modulenote=null;
			     			moduleobject.issaved=false;
		   	        	}else if(moduleobject.stage!=null){ 
		   	        	    var label=Edo.create({
		   	        	    type:'label',
		   	        	    text:'是否保存模型信息?'
		   	        	    });
		   	        	    var func=function(){
		   	        	    editor.execute('savemodule');
		   	        	    window.parent.createcompmodule();
			   				var graph=editor.graph;
			   	        	var model=graph.getModel();
			   	        	model.clear();
			   	        	moduleobject.componentname=null;
							moduleobject.componentid=null;
							moduleobject.stage=null;
							moduleobject.modulename=null;
			     			moduleobject.modulenote=null;
			     			moduleobject.issaved=false;
			           		}
			           		var toolbar=new gettoolbar(null,func);
	   	         			var win=cims201.utils.getWin(400,200,'模型保存',[label,toolbar]);
			            
		   	        	}else{
	   	        			window.parent.createcompmodule();
			   				var graph=editor.graph;
			   	        	var model=graph.getModel();
			   	        	model.clear();
		   	        	}
		   	        	}
		   	        }, */
			        {type: 'button', text: '保存计算数据',width:100,height:35,style:'border-radius:10px;',onclick: function(e){editor.execute('savesolutiondata');}},
			        {type: 'button', text: '清空模型',width:100,height:35,style:'border-radius:10px;',onclick: function(e){
			         cells =  editor.graph.getChildCells();clearmodule();}},
			        /* {type: 'button', text: '打开',width:70,height:35,style:'border-radius:10px;',onclick: function(e){editor.graph.addCells(cells);}}, */
			        {type: 'button', text: '放大',width:70,height:35,style:'border-radius:10px;',onclick: function(e){editor.execute('zoomIn');}},
			        {type: 'button', text: '缩小',width:70,height:35,style:'border-radius:10px;',onclick: function(e){editor.execute('zoomOut');}},
			        {type: 'button', text: '上一步',width:70,height:35,style:'border-radius:10px;',
			        	onclick: function(e){
   		//调用父容器的js
			        		parent.parent.gofour();

			        	}
			        },
			        {type: 'button', text: '下一步',width:70,height:35,style:'border-radius:10px;',
			        	onclick: function(e){
			        		//调用父容器的js
			        		var alldata=moduleobject.oldmodulealldata;
			        		var moduleid=moduleobject.oldmoduleid;
			        		var datasetUUID=moduleobject.datasetUUID;
			        		//alert(Edo.util.JSON.encode(alldata));
			        		//alert(moduleid);
			        		//alert(datasetUUID);
			        		if(newdatasetUUID==null||datasetid==null) {
			        			alert('请先保存数据！');
			        		}else {
			        			parent.parent.getModeleidandatasetUUID(moduleid,newdatasetUUID,datasetid);
			        			parent.parent.gosix(alldata);
			        		}
			        	}
			        }
			        ]
				});
		
		    function toggle(e){

			    var panel = this.parent.owner;
			    var accordion = panel.parent;
			    accordion.getChildren().each(function(child){
			        if(panel != child) child.collapse();
			    });
			    panel.toggle()
			}
			
			function onPanelClick(e){
			    if(e.within(this.headerCt)){
			        var panel = this;
			        var accordion = panel.parent;
			        accordion.getChildren().each(function(child){
			            if(panel != child) child.collapse();
			        });
			        panel.toggle();
			    }
			}
		   // var data= cims201.utils.getData(basePath+'node/node!getnodelist.action',{});
		    addSidebarIcon(null,graph, sidebar, null, '../js/lcc/img/start.png','start');
		    var br = document.createElement('br');
			sidebar.appendChild(br);
			addSidebarIcon(null,graph, sidebar, null, '../js/lcc/img/cell.png','process');
			 var br = document.createElement('br');
			sidebar.appendChild(br);
			addSidebarIcon(null,graph, sidebar, null, '../js/lcc/img/stop.png','end');
			  /*  editor.setToolbarContainer(sidebar);
                 editor.toolbar.addMode('ss', 'img/earth.png', null, null);
                  var combo=editor.toolbar.addCombo();
                 editor.toolbar.addOption(combo,'ss','dd');
                 editor.toolbar.addOption(combo,'ss','dd'); */
                 // addOption
		/* var producttreebox = Edo.create({
			type:'box',
			width: 160,
			render:sidebartree,
			height:550,
			padding:0,
			style:'border:0;',
			children:[
				{type: 'box',
				id:'lcacompcontent',
          	 	width: '100%',
          	 	height: '25%',
		    	visible:false,
	    		children:[
			        {type : 'label',text : '产品名称:'},
	          		{type : 'text',id : 'pdmdname'},
	          		{type : 'label',text : '正在构建对象:'},
	          		{type : 'text',id : 'compname'}
          		]},
          		
	          			{
			            type: 'panel',padding:0,
			            id:'producttree',
			            headerVisible:false,
			            width: '100%',height: '60%',  
			            title: '<span style="font-size:13px">产品结构</span>',
			            enableCollapse: true,
			            expanded: false, 
			            onclick: onPanelClick, 
			            visible:false,                                          
			            titlebar:[{
			                cls:'e-titlebar-accordion',
			                onclick: toggle
			            }]
			        	},
				        {
				            type: 'panel',padding:0,
				            id:'nodetree',
				            width: '100%',height: '60%',    
				            headerVisible:false,          
				            enableCollapse: true,
				            expanded: true, 
				            onclick: onPanelClick,                                           
				            titlebar:[{
				                cls:'e-titlebar-accordion',
				                onclick: toggle
				                
				            }],
				            children: [
					                {type: 'table',id:'nodelist', autoColumns: true,headerVisible: false,width: '100%', height: '100%',verticalLine: false, horizontalLine: false, //rowHeight: 25,
					                    onselectionchange: function(e){	
					                        var nodetype= moduletype;
					                       // var nodetype='PDM';
								            getcollection(graph,modelbar,nodetype,e.selected.name);
								        },
					                    rowHeight: 20,
					                    columns: [
					                        {   
					                            renderer: function(v, r){
					                          
					                                return r.name;
					                            }
					                          
					                        }
					                    ],
					                    data:data
					                 
				            }]
				          
				        }
				
			]}); */
		
		 
	/* 	document.oncontextmenu = function(){
        	if(editor.graph.getSelectionCell()!=null){
        	editor.toolbar
        	}else{
        	alert('b');
        	}
		}; */
		
      
		/* mxEvent.addListener(graph.container, 'contextmenu',
                  function(e) {
              var cell=editor.graph.getSelectionCell();
              var x=mxEvent.getClientX(e);
              var y=mxEvent.getClientY(e);
              if(cell==null){
               
              //alert(v1.getGeometry().x);
              	  if(popmenu2.isMenuShowing){
		      		 popmenu2.hideMenu();
		          }
		          if(popmenu.isMenuShowing){
		      		 popmenu.hideMenu();
		          }
		          var offset = mxUtils.getOffset(graph.container);
                  popmenu2.div.style.left = x+ 'px';
       			  popmenu2.div.style.top = y+'px';
                  popmenu2.showMenu();
              }else{
                  if(popmenu.isMenuShowing){
		      		 popmenu.hideMenu();
		          }
		          if(popmenu2.isMenuShowing){
				        popmenu2.hideMenu();
			      }
                  //var offset = mxUtils.getOffset(graph.container);
                  popmenu.div.style.left =  x+cell.getGeometry().width/2 +'px';
       			  popmenu.div.style.top = y +'px';
                  popmenu.showMenu();
              
              }
                });	
		
		
		  mxEvent.addListener(graph.container, 'click', 
				    function(evt) {
				        if(popmenu.isMenuShowing){
				        popmenu.hideMenu();
				        }
				         if(popmenu2.isMenuShowing){
				        popmenu2.hideMenu();
				        }
				        mxEvent.consume(evt);
				    });	
		 */
		
		
		
		
		
			// Checks if the browser is supported
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				// Assigns some global constants for general behaviour, eg. minimum
				// size (in pixels) of the active region for triggering creation of
				// new connections, the portion (100%) of the cell area to be used
				// for triggering new connections, as well as some fading options for
				// windows and the rubberband selection.
				mxConstants.MIN_HOTSPOT_SIZE = 16;
				mxConstants.DEFAULT_HOTSPOT = 1;
				
				// Enables guides
				mxGraphHandler.prototype.guidesEnabled = true;

			    // Alt disables guides
			    mxGuide.prototype.isEnabledForEvent = function(evt)
				{
					return !mxEvent.isAltDown(evt);
				};

				// Enables snapping waypoints to terminals
				mxEdgeHandler.prototype.snapToTerminals = true;

				// Workaround for Internet Explorer ignoring certain CSS directives
				if (mxClient.IS_QUIRKS)
				{
					document.body.style.overflow = 'hidden';
					new mxDivResizer(container);
					new mxDivResizer(outline);
					new mxDivResizer(toolbar);
					//new mxDivResizer(modelbar);
					new mxDivResizer(status);
				}
				
				// Creates a wrapper editor with a graph inside the given container.
				// The editor is used to create certain functionality for the
				// graph, such as the rubberband selection, but most parts
				// of the UI are custom in this example.
				
				

				// To show the img in the outline, uncomment the following code
				//outln.outline.labelsVisible = true;
				//outln.outline.setHtmlLabels(true);
				
				// Fades-out the splash screen after the UI has been loaded.
				var splash = document.getElementById('splash');
				if (splash != null)
				{
					try
					{
						mxEvent.release(splash);
						mxEffects.fadeOut(splash, 100, true);
					}
					catch (e)
					{
					
						// mxUtils is not available (library not loaded)
						splash.parentNode.removeChild(splash);
					}
				}
			}
		};
		//创建下一层模型
		var wholelevel =null;
		var rootlevell=null;;
		initlevel();
		function initlevel(){

			wholelevel =new alllevel();   
			wholelevel.alllevels=new Array();
			rootlevell=new level();
			rootlevell.type='stagelevel';
			wholelevel.setrootlevel(rootlevell);
			rootlevell.levelid='level_stage';
			rootlevell.parentlevelid='0';
			wholelevel.setcurrentlevel(rootlevell);
		}
		function createnextlevelmodule(){
		
		 var id=cell.getId();
		  parentcellid=id;
		 var index=levelindex+1;
		/*  var levelid='level'+index */
		 var levelparentidcells='cell'+index+'_'+id;
		 var levelid='level'+index;
		 var cells =  editor.graph.getChildCells();
		 alert(alllevel.levelid);
		 if(alllevel.levelindexsign==undefined){
		 alllevel.levelid={};
		 }
		 alllevel.levelid.levelparentidcells=new Array();
		 clearmodule();
		}
		function createcellobject(levelindex,cell)
		{
		var a={};
		var id=cell.getId()
		var index='cell'+levelindex+'_'+id;
		a.cell=cell;
		a.children=new Array();
		}
		function addToolbarButton(editor, toolbar, action, label, image, isTransparent)
		{
			var button = document.createElement('button');
			button.style.fontSize = '10';
			if (image != null)
			{
				var img = document.createElement('img');
				img.setAttribute('src', image);
				img.style.width = '16px';
				img.style.height = '16px';
				img.style.verticalAlign = 'middle';
				img.style.marginRight = '2px';
				button.appendChild(img);
			}
			if (isTransparent)
			{
				button.style.background = 'transparent';
				button.style.color = '#FFFFFF';
				button.style.border = 'none';
			}
			mxEvent.addListener(button, 'click', function(evt)
			{
				editor.execute(action);
			});
			mxUtils.write(button, label);
			toolbar.appendChild(button);
		};
		function refreshcelllabel(cell,levelmodule){
		var label =  editor.graph.convertValueToString(cell);
    		    var nodelabel =  label.slice(0,label.length);
    		    var newlabel = label.replace(nodelabel,
    		    '<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;background:#00CCFF;height:100px;opacity:100;border:0px">'+
					'<table style=" margin: auto;width:180px;height:100px;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
	                    	' <td align="center">'+levelmodule.levelmoduleobject.processname+'<img src="../js/lcc/img/check.png" />'+'</td>'+
	                    '</tr>'+
		                '</table>'+
		                '</div>');
		                 editor.graph.labelChanged(cell,newlabel,mxEvent.LABEL_CHANGED);
		
		}
		function refreshDataOfProcess(levelmodule){
		   
			var cellid=levelmodule.levelmoduleobject.cellid;
			var level=getLevelBylevelid(wholelevel.getcurrentlevel().levelid);
			var process=getProcess(level,cellid);
		    process.processname=levelmodule.levelmoduleobject.processname;
			process.processnote=levelmodule.levelmoduleobject.processnote;
			process.inputmaterial=levelmodule.levelmoduleobject.inputmaterial;
			process.outputmaterial=levelmodule.levelmoduleobject.outputmaterial;
		
		}
		function createPopupMenu(graph, menu, cell, evt)  
		{  
		    var model = graph.getModel(); 
		    var level=wholelevel.getcurrentlevel();
		    if (cell != null){
				   if (model.isVertex(cell)&&cell.getStyle()=='process'){
						       	        menu.addItem('编辑下一层', null, function()  
								            {  
											       var cell=editor.graph.getSelectionCell();
											       var isExist=false;
											       var existLevel=null;
											       savecells();
											       //514
											       var oldlevel=getLevel(cell.getId());
											      // alert(cell.getStyle())
												   var module=getLevelModule(wholelevel.getcurrentlevel(),cell);
												   if(module==null){
												      return;
												   }
										      	   if(oldlevel!=null){
										      	        var newlevel=wholelevel.addlevel(module);
											            newlevel.type='processlevel';
											      	    initgraph();
											           	  var graph=editor.graph;
														  graph.getModel().beginUpdate();
														  try
														  {	
														 	 readtest(graph,oldlevel.xmldata);	
														  }
														  finally
														  {
															// Updates the display
														 
															graph.getModel().endUpdate();
															
														  }
														    isExist=true;
														    existLevel=oldlevel;
										      	   }else{
										      	  	 alert("不存在子层模板!");
										      	        
										      	   
										      	   
										      	   }
											       if(isExist){
													//wholelevel.getcurrentlevel().moduleid=moduleid;
													//savecells();
													var cells =graph.getChildCells();
													if(cells.length>0){
														for (var i=0;i<cells.length;i++)
														{
														  var style =  graph.model.getStyle(cells[i]);
														  if(style=='process'){
														 	var levelmodule=wholelevel.addlevelmodule(cells[i]);
														 	var process=getProcess(oldlevel,cells[i].getId());
														 	levelmodule.levelmoduleobject.processname=process.processname;
														 	
			                                                levelmodule.levelmoduleobject.processnote=process.processnote;
															levelmodule.levelmoduleobject.inputmaterial=process.inputmaterial;
															levelmodule.levelmoduleobject.outputmaterial=process.outputmaterial;
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
											     }
											       
								            }); 
					  }
				   }
				   
			   if(level.type=='processlevel'){
				   if (cell != null){
							             menu.addItem('查看过程信息', null, function(){  
							            	   var cell=editor.graph.getSelectionCell();
										       if(cell!=null){
											        var label =  graph.model.getStyle(cell);
													if(label=='process'){
													   var level=wholelevel.getcurrentlevel();
													   var module=getLevelModule(level,cell);
													   if(module!=null){
													   parent.showdetail(cell,module);
													   }
										            } 
										       }
						            		
							            }
							            );
							               
							            
							              
					       	    }else{
					        
					       			    menu.addItem('返回上一层', null, function()  
			              			    {  
							          	returntoparentlevel();
							            }
							            );
							       	   
					        
					        
				       		}
			       		}
	           
		      
		};
		function savecells(){
			var cells = editor.graph.getChildCells();
			 wholelevel.getcurrentlevel().cells=cells;
			 if(cells.length>0){
			var enc = new mxCodec(mxUtils.createXmlDocument());
			var node = enc.encode(editor.graph.getModel());
			var xmldata = mxUtils.getPrettyXml(node);
			wholelevel.getcurrentlevel().xml=xmldata;
		}
		}
		function returntoparentlevel(){
			var level3=wholelevel.getcurrentlevel();
			var graph=editor.graph;
			var cells =  graph.getChildCells();
			level3.cells=cells;
			if(cells.length>0){
				var enc = new mxCodec(mxUtils.createXmlDocument());
				var node = enc.encode(graph.getModel());
				var xmldata = mxUtils.getPrettyXml(node);
				level3.xml=xmldata;
			}
		   initgraph();
     	   var parentlevel=level3.getparentlevel();
            var parentcells=parentlevel.cells;
            editor.graph.addCells(parentcells);
            wholelevel.setcurrentlevel(parentlevel);
		}
		function showModalWindow(graph, title, content, width, height)
		{
			
			var x = Math.max(0, document.body.scrollWidth/2-width/2);
			var y = Math.max(10, (document.body.scrollHeight ||
						document.documentElement.scrollHeight)/2-height*2/3);
			var wnd = new mxWindow(title, content, x, y, width, height, false, true);
			wnd.setClosable(true);
			
			// Fades the background out after after the window has been closed
			wnd.addListener(mxEvent.DESTROY, function(evt)
			{
				graph.setEnabled(true);
			});
			graph.setEnabled(false);
			graph.tooltipHandler.hide();
			wnd.setVisible(true);
			return wnd;
		};
		function getcollection(graph,sidebar,nodetype,nodecategory){
			 var datas= cims201.utils.getData(basePath+'node/node!getNodeListByType.action',{nodetype:nodetype,nodecategory:nodecategory});
			 for(i=0;i<datas.length;i++){
			            var id=datas[i].id
						var image=datas[i].img;
						var label=datas[i].label;
						var prompt=datas[i].nodedrawtype;
						var description=datas[i].description;
						addSidebarIcon(id,graph, sidebar, label, image,prompt,description)
			}
		}
		var x=null;
		function addSidebarIcon(nodeid,graph, sidebar, label, image,prompt,title)
		{
			// Function that is executed when the image is dropped on
			// the graph. The cell argument y
				var parent = graph.getDefaultParent();
				var model = graph.getModel();
				//alert(parent.getId());
				var funct = function(graph, evt, cell, x, y)
			        {
			  		var parent = graph.getDefaultParent();
					var model = graph.getModel();
					var v1 = null;
					model.beginUpdate();
					try
					{
						// NOTE: For non-HTML labels the image must be displayed via the style
						// rather than the label markup, so use 'image=' + image for the style.
						// as follows: v1 = graph.insertVertex(parent, null, label,
						// pt.x, pt.y, 120, 120, 'image=' + image);
						
						if('process'==prompt){
							v1 = graph.insertVertex(parent,null, label, x, y, 180, 100,prompt);
							v1.setConnectable(true);
							v1.geometry.alternateBounds = new mxRectangle(0, 0, 90, 50);
						}else{
							v1 = graph.insertVertex(parent,null, label, x, y, 80, 80,prompt);
							v1.setConnectable(true);
							v1.geometry.alternateBounds = new mxRectangle(0, 0, 80, 60);
						}
							
						// Adds the ports at various relative locations
				//		var func = graph.insertVertex(v1,null, 'func', 120, 1, 12, 12,
				//				'func;image=img/flash.png;spacingLeft=18', true);
				//		func.geometry.offset = new mxPoint(-8, -8);
			
				//		var input = graph.insertVertex(v1,null, 'Input', 1, 120, 12, 12,
				//				'input;image=img/check.png;align=right;imageAlign=right;spacingRight=18', true);
				//		input.geometry.offset = new mxPoint(-6, -4);
						
						/* var port = graph.insertVertex(v1, null, 'Error', 119, 1, 16, 16,
								'port;image=img/error.png;spacingLeft=18', true);
						port.geometry.offset = new mxPoint(-8, -8); */
	
				//		var output = graph.insertVertex(v1,null, 'output', 120, 120, 12, 12,
				//				'output;image=img/information.png;spacingLeft=18', true);
				//		output.geometry.offset = new mxPoint(-8, -4);
					}
					finally
					{
						model.endUpdate();
					}
				  	graph.setSelectionCell(v1);
              		/* if(prompt=='process'){
              		wholelevel.addlevelmodule(v1);
              		} */
					var levelmodule=wholelevel.addlevelmodule(v1);
             	    levelmodule.levelmoduleobject.type=prompt;
			    	graph.setSelectionCell(v1);
					v1.nodeid=nodeid;
					
				};
			// Creates the image which is used as the sidebar icon (drag source)
		/* 	if(!modelbar.hasChildNodes())
			{ */
			var img = document.createElement('img');
			if(image==null){
			img.setAttribute('src', '../js/lcc/img/gear.png');
			}else{
			img.setAttribute('src', image);
			}
			img.style.width = '50px';
			img.style.height = '50px';
			img.title = title;
			
			sidebar.appendChild(img);
			//}
			
			var dragElt = document.createElement('div');
			dragElt.style.border = 'dashed black 1px';
			dragElt.style.width = '120px';
			dragElt.style.height = '120px';
			  					
			// Creates the image which is used as the drag icon (preview)
			var ds = mxUtils.makeDraggable(img, graph, funct, dragElt, 0, 0, true, true);
			ds.setGuidesEnabled(true);
		};
		
		function configureStylesheet(graph)
		{
			/* var style = graph.getStylesheet().getDefaultVertexStyle();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
			style[mxConstants.STYLE_FONTSIZE] = 11;
			style[mxConstants.STYLE_STARTSIZE] = 22;
			style[mxConstants.STYLE_HORIZONTAL] = false;
			style[mxConstants.STYLE_FONTCOLOR] = 'black';
			style[mxConstants.STYLE_FILLCOLOR] = '#eeeeee';
			delete style[mxConstants.STYLE_FILLCOLOR];
			delete style[mxConstants.STYLE_FONTSIZE];

			style = mxUtils.clone(style);
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = 'center';
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_HORIZONTAL] = true;
			style[mxConstants.STYLE_FONTSIZE] = 20;
			style[mxConstants.STYLE_FILLCOLOR] = '#00CCFF';
			style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#00CCFF';
			style[mxConstants.STYLE_SPACING_RIGHT] = 0;
			style[mxConstants.STYLE_SPACING_TOP] = 0;
			style[mxConstants.STYLE_IMAGE] = 'img/connect.png';
			delete style[mxConstants.STYLE_STARTSIZE];
			graph.getStylesheet().putCellStyle('process', style); */
			
			var style = graph.getStylesheet().getDefaultVertexStyle();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
			style[mxConstants.STYLE_FONTSIZE] = 11;
			style[mxConstants.STYLE_STARTSIZE] = 22;
			style[mxConstants.STYLE_HORIZONTAL] = false;
			style[mxConstants.STYLE_FONTCOLOR] = 'black';
			style[mxConstants.STYLE_FILLCOLOR] = '#eeeeee';
			delete style[mxConstants.STYLE_FILLCOLOR];
			delete style[mxConstants.STYLE_FONTSIZE];

			style = mxUtils.clone(style);
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = 'center';
			style[mxConstants.STYLE_ROUNDED] = false;
			style[mxConstants.STYLE_HORIZONTAL] = true;
			style[mxConstants.STYLE_FONTSIZE] = 20;
			style[mxConstants.STYLE_FILLCOLOR] = '#00CCFF';
			style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#00CCFF';
			style[mxConstants.STYLE_SPACING_RIGHT] = 0;
			style[mxConstants.STYLE_SPACING_TOP] = 0;
			style[mxConstants.STYLE_IMAGE] = '../js/lcc/img/connect.png';
			delete style[mxConstants.STYLE_STARTSIZE];
			graph.getStylesheet().putCellStyle('process', style);
			
			style = mxUtils.clone(style);
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_TRIANGLE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
			style[mxConstants.STYLE_FILLCOLOR] = '#8FBC8F';
			style[mxConstants.STYLE_FONTSIZE] = 14;
			style[mxConstants.STYLE_SPACING_TOP] = 20;
			style[mxConstants.STYLE_SPACING_RIGHT] = 27;
			style[mxConstants.STYLE_IMAGE] = '../js/lcc/img/connect.png';
			delete style[mxConstants.STYLE_ROUNDED];
			graph.getStylesheet().putCellStyle('start', style);
											
			style = mxUtils.clone(style);
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RhombusPerimeter;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
			style[mxConstants.STYLE_SPACING_TOP] = 18;
			style[mxConstants.STYLE_SPACING_RIGHT] = 0;
			style[mxConstants.STYLE_IMAGE] = '../js/lcc/img/connect.png';
			style[mxConstants.STYLE_FILLCOLOR] = '#FFFFE0';
			graph.getStylesheet().putCellStyle('condition', style);
							
			style = mxUtils.clone(style);
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_DOUBLE_ELLIPSE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
			style[mxConstants.STYLE_SPACING_TOP] = 18;
			style[mxConstants.STYLE_FONTSIZE] = 14;
			//style[mxConstants.STYLE_FONTSTYLE] = 1;
			style[mxConstants.STYLE_FILLCOLOR] = '#F4A460';
			delete style[mxConstants.STYLE_SPACING_RIGHT];
			style[mxConstants.STYLE_IMAGE] = '../js/lcc/img/stop.png';
			graph.getStylesheet().putCellStyle('end', style);
			
			
			style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
			style[mxConstants.STYLE_FILLCOLOR] = '#00CCFF';
			style[mxConstants.STYLE_GRADIENTCOLOR] = '#00CCFF';
			style[mxConstants.STYLE_STROKECOLOR] = '#00CCFF';
			style[mxConstants.STYLE_FONTCOLOR] = 'black';
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_OPACITY] = '100';
			style[mxConstants.STYLE_STARTSIZE] = '30';
			style[mxConstants.STYLE_FONTSIZE] = '12';
			style[mxConstants.STYLE_FONTSTYLE] = 1;
			graph.getStylesheet().putCellStyle('group', style);

			var style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_OPACITY] = '80';
			style[mxConstants.STYLE_FONTSIZE] = '12';
			style[mxConstants.STYLE_FONTSTYLE] = 0;
			style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
			style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
			graph.getStylesheet().putDefaultVertexStyle(style);
			
			
			
			style = graph.getStylesheet().getDefaultEdgeStyle();  
            style = mxUtils.clone(style);
			style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
			style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_BLOCK;
			style[mxConstants.STYLE_ROUNDED] = true;  
            style[mxConstants.STYLE_STROKEWIDTH] = 3;  
            style[mxConstants.STYLE_EXIT_PERIMETER] = 0; // disabled  
            style[mxConstants.STYLE_ENTRY_PERIMETER] = 0; // disabled  
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_FONTCOLOR] = 'black';
			style[mxConstants.STYLE_STROKECOLOR] = 'black';
			/* style[mxConstants.STYLE_DASHED] = true;
			style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_OPEN;
			style[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_OVAL; */
			graph.getStylesheet().putCellStyle('crossover', style);
			
		};
		function chooseprocess(e)
		{
		for(var s in e)
		{alert(s)
		alert(e[s])
		}
		/* alert(cell.ischecked)
		cell.ischecked=!cell.ischecked;
 */		//document.getElementById('check'+stage).click()
		}
		function drawstage(moduleobj){
		     var graph=editor.graph;
		     var stages=moduleobj.stages;
		     var parent = graph.getDefaultParent();
			 var start = graph.insertVertex(parent,null, '', 20, 205, 90, 90,'start');
			 var levelmodule=wholelevel.addlevelmodule(start);
             levelmodule.levelmoduleobject.type='start';
			 var previous=start;
			 var cells=[];
			 for(var i=0;i<stages.length;i++){
		 		var v1=null;
				 v1= graph.insertVertex(parent,null,'<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;height:100px;background:#00CCFF;opacity:100">'+
								'<table style=" margin: auto;padding:0px 0px 0px 0px;width:180px;height:100px;">'+
								  '<tr>'+
			                      ' <td align="center">'+stages[i].name+'</td>'+
			                	  '</tr>'+
				                '</table>'+
				                '</div>'
				              /*   '<div style="margin:0px;padding:40px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                    ' <td align="center">'+stages[i].name+'</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>' */, (i+1)*220-20, 200, 180, 100,'process');
            	 levelmodule=wholelevel.addlevelmodule(v1);
             	 levelmodule.levelmoduleobject.type='process';
             	 levelmodule.levelmoduleobject.processname=stages[i].name;
             	 levelmodule.levelmoduleobject.processnote=stages[i].stage;
				 v1.stagename=stages[i].name;
				 v1.stage=stages[i].stage;
				 stages[i].id=v1.getId();
				 var e1=graph.insertEdge(parent, null, '', previous, v1,'crossover');
				 previous=v1;
				 cells.push(v1);
				 }
				 var end = graph.insertVertex(parent,null, '', (stages.length+1)*220+20, 205, 90, 90,'end');
				 levelmodule=wholelevel.addlevelmodule(end);
             	 levelmodule.levelmoduleobject.type='end';
			     var e1=graph.insertEdge(parent, null, '', previous, end, 'crossover');
			     savecells();
		/* 	     if(moduleobject.buildtype=='new_simplebuild'){
			         var stages=moduleobject.stages;
			         var length=stages.length;
			         var newstages=[];
			         for(var i=0;i<length;i++){
			            var newstage={};
			            for(var j=0;j<cells.length;j++){
			               if(cells[j].stage==stages[i].stage){
			               var cellid=cells[j].getId();
			               newstage.id=cellid;
			               newstage.stage=stages[i].stage;
			               newstage.name=stages[i].name;
			               cells.remove(cells[j]);
			               break;
			               }
			            }
			             newstages.push(newstage);  
			         }
			         var compstagelist=moduleobject.componentstageslist;
			         var length=compstagelist.length;
			         for(var i=0;i<length;i++ ){
				         var clonestages=cloneStage(newstages);
				         compstagelist[i].stages=clonestages;
			         }
			      
			      } */
				 
			 
		}
		function cloneStage(stages)
		{   var clonestages=[];
			for (var j=0;j<stages.length;j++){
					var a={};
					for(var p in stages[j]){
						  a[p]=stages[j][p];
						 }
					clonestages.push(a);
				}
		    return clonestages;
		}
		
		
		function read(graph, filename)
			{
				var req = mxUtils.load(filename);
				var root = req.getDocumentElement();
				root.get
			
				 var dec = new mxCodec(root.ownerDocument);
				 dec.decode(root, graph.getModel());
				 
					
			};
			function readtest(graph, filename)
			{
				 var root = String2XML(filename).documentElement;
				 var dec = new mxCodec(root.ownerDocument);
				 dec.decode(root, graph.getModel());
				 
					
			};
			function String2XML(xmlstring) { 
			// for IE 
				if (window.ActiveXObject) { 
				var xmlobject = new ActiveXObject("Microsoft.XMLDOM"); 
				xmlobject.async = "false"; 
				xmlobject.loadXML(xmlstring); 
				return xmlobject; 
				} 
				// for other browsers 
				else { 
				var parser = new DOMParser(); 
				var xmlobject = parser.parseFromString(xmlstring, "text/xml"); 
				return xmlobject; 
				} 
			} 
			//convert xml object to string 
			function XML2String(xmlObject) { 
			// for IE 
			if (window.ActiveXObject) { 
			return xmlobject.xml; 
			} 
			// for other browsers 
			else { 
			return (new XMLSerializer()).serializeToString(xmlobject); 
			} 
			}
			function datasetSetuuid(datasetUUID) {
				alert(datasetUUID);	
				alert('传功来了');
				moduleobject.datasetUUID=datasetUUID;
			}
	</script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main(document.getElementById('graphContainer'),
			document.getElementById('outlineContainer'),
		 	document.getElementById('toolbarContainer'),
			document.getElementById('modelbarContainer'),
			document.getElementById('sidebartree'),
			document.getElementById('statusContainer'));" style="margin:0px;background:-webkit-gradient(linear, 0 0, 0 100%, from(#2894FF), to(#B5E3E0));">
	
	<!-- Creates a container for the splash screen -->
	<div id="splash"
		style="position:absolute;top:0px;left:0px;width:100%;height:100%;background:white;z-index:1;">
		<center id="splash" style="padding-top:230px;">
			<img src="../js/lcc/img/loading.gif">
		</center>
	</div>
	
	<!-- Creates a container for the sidebar -->
	<div id="toolbarContainer"
		style="position:absolute;white-space:nowrap;overflow:hidden;top:5px;left:200px;max-width:500px;width:500px;max-height:40px;height:40px;right:0px;padding:0px">
	</div>
<!--     <div id="modelbarContainer"
		style="position:absolute;overflow:hidden;top:5px;left:500px;max-height:40px;height:40px;padding:5px;right:0px;">
	</div> -->
	<!-- Creates a container for the toolboox -->
	<div id="sidebartree"
		style="position:absolute;text-align:center;overflow:hidden;top:45px;left:0px;bottom:0px;max-width:160px;width:160px;padding-top:5px;padding-left:0px;">
	</div>
	<!-- Creates a container for the graph -->
	<div id="graphContainer"
		style="position:absolute;border-radius:1em;overflow:hidden;top:50px;left:160px;bottom:0px;right:0px;cursor:default;background:F3F6FB;">
	</div>

	<!-- Creates a container for the outline -->
	<div id="outlineContainer"
		style="position:absolute;overflow:hidden;top:45px;right:0px;width:200px;height:140px;background:transparent;border-style:solid;border-color:black;">
	</div>
</body>
</html>
