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

		<script src="<%=basePath%>js/edo/edo.js" type="text/javascript"></script>
		<script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lcalccutils.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lcc/lca_modulecheck_builder.js" type="text/javascript"></script>
		
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
		function level(type){
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
		
		//定义流程数组
		var cellcollection=new Array();
		//从父窗口初始化产品模型时调用此方法，根据模型类型不同初始化也不同
		function initmodule(moduleobj){
			moduleobject.productid=moduleobj.productid;
			moduleobject.productname=moduleobj.productname;
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
			         {type: 'button', text: '放大',width:70,height:35,style:'border-radius:10px;',onclick: function(e){editor.execute('zoomIn');}},
			        {type: 'button', text: '缩小',width:70,height:35,style:'border-radius:10px;',onclick: function(e){editor.execute('zoomOut');}}
			            
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
		//bbl511
        function createPopupMenu(graph, menu, cell, evt)  
		{  
		    var model = graph.getModel(); 
		    var level=wholelevel.getcurrentlevel();
		    if (cell != null){
				   if (model.isVertex(cell)&&cell.getStyle()=='process'){
						       	        menu.addItem('查看子层模板', null, function()  
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
										      	     Edo.MessageBox.alert('警告','不存在子层模板！');
										      	   }
											       if(isExist){
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
					        
					       			    menu.addItem('返回上一层模板', null, function()  
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
