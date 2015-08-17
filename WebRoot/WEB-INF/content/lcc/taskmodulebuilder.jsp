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
		<%-- <script src="<%=basePath%>js/lcc/lca_moduledefine_builder.js" type="text/javascript"></script> --%>
		<%-- <script src="<%=basePath%>js/lcc/nodelist.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lcc/moduledefine.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lcc/pdm_moduledefine.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lcc/lca_moduledefine.js" type="text/javascript"></script> --%>
		
	<script type="text/javascript">
    	//定义模型对象
    	var moduleobject={
    	    taskid:null,
			moduleid:null,
			processid:null,
			compname:null,
			modulename:null,
			modulenote:null,
		    moduletype:null,
		    issaved:false
		}
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
		this.alllevels=new Array();
		}
		alllevel.prototype.constructor = alllevel;
		alllevel.prototype.rootlevel=null;
		alllevel.prototype.currentlevel=null;
		alllevel.prototype.alllevels=null;
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
    	function initmodule(moduleobj){
    		moduleobject.moduletype='LCA';
    		moduleobject.taskid=moduleobj.taskid;
	    	moduleobject.moduleid=moduleobj.moduleid;
			moduleobject.compname=moduleobj.compname;
			moduleobject.processid=moduleobj.processid;
   			moduleobject.issaved=false;
   			wholelevel.rootlevel.levelid='level_stage'+'_'+moduleobj.processid;
   			wholelevel.rootlevel.parentcellid=moduleobj.processid;
   	        
    	}
    	function initmoduleobject(){
	    	
   			moduleobject.taskid=null;
			moduleobject.moduleid=null;
			moduleobject.processid=null;
			moduleobject.compname=null;
			moduleobject.modulename=null;
			moduleobject.modulenote=null;
		    moduleobject.moduletype=null;
		    moduleobject.issaved=false;
   			
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
   	        	    text:'请先保存在建模型'
   	        	    });
        	    var func=function(){
        	    editor.execute('savemodule');
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
	/* 	function initmodule(moduleobj){
			if(moduleobj.moduletype=='PDM'){
				
			}else{
			moduleobject.productid=moduleobj.productid;
			}
			
			moduleobject.versionid=moduleobj.versionid;
			moduleobject.modulename=moduleobj.modulename;
			moduleobject.modulenote=moduleobj.modulenote;
			moduleobject.moduletype=moduleobj.moduletype;
			moduleobject.modulebuilttype=moduleobj.modulebuilttype;
			moduleobject.stages=null;
		} */
		//零件模型初始化时操作
		function refreshcompmodule(moduleobj)
		{
			moduleobject.components=moduleobj.components;
     		/* moduleobject.modulename=moduleobj.modulename;
     		moduleobject.modulenote=moduleobj.modulenote; */
     		moduleobject.stages=moduleobj.stages;
		}
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
		//定义编辑器
		var editor=null;
		
		//定义右键菜单
	    var popmenu=new mxPopupMenu();
	    popmenu.init();
	    var groupfunc=function(){
	    	editor.execute('groupOrUngroup');
	    };
	    var exitgroupfunc=function(){
	    	editor.execute('exitGroup');
	    	tr1.hidden=true;
	    };
	    var entergroupfunc=function(){
	    	editor.execute('enterGroup');
	    	tr1.hidden=false;
	    };
	    var deletefunc=function(){
	    	editor.execute('delete');
	    };
	    var copyfunc=function(){
	    	editor.execute('copy');
	    	tr.hidden=false;
	    };
	    var cutfunc=function(){
	    	editor.execute('cut');
	    	tr.hidden=false;
	    };
	    var pastefun=function(){
	    	editor.execute('paste');
	    	tr.hidden=true;
	    };
	    var tr=popmenu.addItem ('删除', '../js/lcc/images/delete.gif', deletefunc, popmenu);
        popmenu.addItem ('复制', '../js/lcc/images/copy.gif', copyfunc, popmenu);
        popmenu.addItem ('剪切','../js/lcc/images/cut.gif', cutfunc, popmenu);
        popmenu.addItem ('构建组', '../js/lcc/img/group.png', groupfunc, popmenu); 
        popmenu.addItem ('进入组', '../js/lcc/img/groupin.gif', entergroupfunc, popmenu);
        var  popmenu2=new mxPopupMenu();
	    popmenu2.init();
	    var tr=popmenu2.addItem ('粘贴', '../js/lcc/images/paste.gif', pastefun, popmenu2);
	    tr.hidden=true;
        var tr1=popmenu2.addItem ('跳出组', '../js/lcc/img/groupout.gif', exitgroupfunc, popmenu2);
        tr1.hidden=true;
        
        //文档初始化主方法
		function main(container, outline, toolbar, modelbar,sidebar, status)
		{
	
				editor = new mxEditor();
				var graph = editor.graph;
				var model = graph.getModel();
				parent.gettaskdetail();
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

				graph.isValidDropTarget = function(cell, cells, evt)
				{
					return this.isSwimlane(cell);
				};
				
				graph.isValidRoot = function(cell)
				{
					return this.isValidDropTarget(cell);
				}

				graph.isCellSelectable = function(cell)
				{
					return !this.isCellLocked(cell);
				};

				graph.getLabel = function(cell)
				{
					var tmp = mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
					
					if (this.isCellLocked(cell))
					{
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

				graph.isHtmlLabel = function(cell)
				{
					return !this.isSwimlane(cell);
				}
				//创建下拉菜单
				graph.panningHandler.factoryMethod = function(menu, cell, evt)  
                {  
                    return createPopupMenu(graph, menu, cell, evt);  
                };
				//定义双击事件
				graph.dblClick = function(evt, cell)
				{    
					mxEvent.consume(evt);
				};
				graph.setConnectable(true);
				configureStylesheet(graph);
				var spacer = document.createElement('div');
				spacer.style.display = 'inline';
				spacer.style.padding = '8px';
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

				editor.addAction('savemodule', function(editor, cell)
				{   
				    var graph=editor.graph;
					var cells =  graph.getChildCells();
					var alllevels=wholelevel.alllevels;
					if(cells.length>0&&!moduleobject.issaved){
						alert('确定保存文件？');
						/* savecells();
					   	for(var j=0;j<alllevels.length;j++){
					   	   var level=alllevels[j];
					       var modules=level.levelmodules;
					       for(var i=0;i<modules.length;i++){
						       if( modules[i].levelmoduleobject.type=='process'){
						            var cell={};
						      		cell.processname=modules[i].levelmoduleobject.processname;
						        	cell.processnote=modules[i].levelmoduleobject.processnote;
						            cell.id=modules[i].levelmoduleobject.cellid;
						            cell.knowledge=modules[i].levelmoduleobject.knowledge;
						            cell.inputmaterial=modules[i].levelmoduleobject.inputmaterial;
						            cell.outputmaterial=modules[i].levelmoduleobject.outputmaterial;
						            cellcollection.push(cell);
				       	   		}
			       	 		}
			       	 	   var levelid=level.levelid;
				       	   var parentlevelid=level.parentlevelid;
				       	   var xmldata = level.xml;
			       	       var parentcellid=level.parentcellid;
			       	       var datasetUUID=null;
			       	       if(j==0){
			       	             
		       	       	   		datasetisassigned=0;
			       	       }else{
			       	            datasetUUID=moduleobject.datasetUUID;
			       	            datasetisassigned=1;
			       	       }
			       	       
				       	   var data= cims201.utils.getData(basePath+'lcc/lccmodule!addlevelmodule.action',{datasetisassigned:datasetisassigned,datasetUUID:datasetUUID,levelid:levelid,parentcellid:parentcellid,taskid:moduleobject.taskid,parentlevelid:parentlevelid,cellcollection:cellcollection,xmldata:xmldata});
				       	   
				       	   if(datasetisassigned==0){
								alert('已完成第一个，赋值');
								moduleobject.datasetUUID=data.datasetUUID;
							}
				       	   cellcollection=new Array;
						}
						 */
						
						
						savecells();
				        var alldata={};
				        alldata.alllevels=new Array();
				        var alllevels=wholelevel.alllevels;
				      	for(var j=0;j<alllevels.length;j++){
				      		var level=alllevels[j];
				      		var newlevel=getnewlevel();
				      		newlevel.xmldata=level.xml;
				      		newlevel.levelid=level.levelid;
				      		newlevel.type=level.type;
			      		    var modules=level.levelmodules;
					        for(var i=0;i<modules.length;i++){
						       if( modules[i].levelmoduleobject.type=='process'){
						            var cell={};
						      		cell.processname=modules[i].levelmoduleobject.processname;
						        	cell.processnote=modules[i].levelmoduleobject.processnote;
						            cell.id=modules[i].levelmoduleobject.cellid;
						            cell.knowledge=modules[i].levelmoduleobject.knowledge;
						            cell.inputmaterial=modules[i].levelmoduleobject.inputmaterial;
						            cell.outputmaterial=modules[i].levelmoduleobject.outputmaterial;
						            cellcollection.push(cell);
				       	   		}
			       	 		}
			       	 		newlevel.cellcollection=cellcollection;
				       	    newlevel.parentlevelid=level.parentlevelid;
				       	    newlevel.parentcellid=level.parentcellid;
				       	    alldata.alllevels.push(newlevel);
					       	   
				      		 cellcollection=new Array();
				      		
				      	}
					    var data= cims201.utils.getData(basePath+'lcc/lccmodule!taskCommitBuildModule.action',{taskid:moduleobject.taskid,alldata:alldata});
						
						
					}else if(moduleobject.issaved){
					
					    alert('已完成保存操作，无需重复!');
					
					}else if(cells.length==0){
						alert('请完成流程图再保存!');
						return null;
					}
					if(data==null){
					  	alert('保存成功！');
					  	cellcollection=null;
						cellcollection=new Array;
						initgraph();
						initlevel();
					}
					
				});
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
			  
			        /* {type: 'button', text: '新增零部件模型',width:120,height:35,style:'border-radius:10px;',onclick: function(e){
			           if(moduleobject.stages&&moduleobject.issaved){
				        	window.parent.createcompmodule();
			   				var graph=editor.graph;
			   	        	var model=graph.getModel();
			   	        	model.clear();
			   	        	initmoduleobject();
		   	        	}else{ 
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
	   	         			var win=cims201.utils.getWin(300,100,'模型保存',[label,toolbar]);
			             	win.show('center', 'middle', true);
			             	alert('请先保存所建模型！');
		   	        	}
		   	        	}
		   	        }, */
			        {type: 'button', text: '保存模型',width:100,height:35,style:'border-radius:10px;',onclick: function(e){editor.execute('savemodule');}},
			        {type: 'button', text: '清空模型',width:100,height:35,style:'border-radius:10px;',onclick: function(e){clearmodule();}},
			        /* {type: 'button', text: '导出',width:70,height:35,style:'border-radius:10px;',onclick: function(e){editor.execute('export');}}, */
			        //{type: 'split'}, 
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
			addSidebarIcon(null,graph, sidebar, '<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;background:#00CCFF;height:100px;opacity:100;border:0px">'+
					'<table style=" margin: auto;width:180px;height:100px;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
	                    	' <td align="center">新节点</td>'+
	                    '</tr>'+
		                '</table>'+
		                '</div>', '../js/lcc/img/cell.png','process');
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
		
      
		mxEvent.addListener(graph.container, 'contextmenu',
                  function(e) {
              var cell=editor.graph.getSelectionCell();
              var x=mxEvent.getClientX(e);
              var y=mxEvent.getClientY(e);
              //判端右击事件是否在流程cell上
              if(cell==null){
               
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
			/* var parent = graph.getDefaultParent(); */
			/* var start = graph.insertVertex(parent,null, '', 20, 220, 80, 80,'start');
			var v1 = graph.insertVertex(parent,null, '', 150, 200, 120, 120,'process');
			var e1=graph.insertEdge(parent, id, '', start, v1,'crossover');
			var v2 = graph.insertVertex(parent,null, '', 300, 200, 120, 120,'process');
			var e2=graph.insertEdge(parent, id, '', v1, v2, 'crossover');
			var v3 = graph.insertVertex(parent,null, '', 450, 200, 120, 120,'process');
			var e3=graph.insertEdge(parent, id, '', v2, v3, 'crossover');
			var v4 = graph.insertVertex(parent,null, '', 600, 200, 120, 120,'process');
			var e4=graph.insertEdge(parent, id, '', v3, v4, 'crossover');
			var end = graph.insertVertex(parent,null, '', 770, 220, 80, 80,'end');
			var e4=graph.insertEdge(parent, id, '', v4, end, 'crossover'); */
		};
		var wholelevel =null;
		var rootlevell=null;
		initlevel();
		function initlevel(){
			wholelevel =new alllevel();   
			rootlevell=new level();
			rootlevell.type='processlevel';
			wholelevel.setrootlevel(rootlevell);
		    rootlevell.parentlevelid='level_stage';
		    wholelevel.setcurrentlevel(rootlevell);
		}
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
			       		
		function editcell(cell,processname){
						    var label =  editor.graph.convertValueToString(cell);
							var nodelabel =  label.slice(0,label.length);
			    		    var newlabel = label.replace(nodelabel,
			    		    '<div style="margin:0px;padding:40px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
								'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
					                '<tr>'+
					                    ' <td align="center">'+processname+'</td>'+
					                '</tr>'+
					                '</table>'+
					                '</div>');
							 editor.graph.labelChanged(cell,newlabel,mxEvent.LABEL_CHANGED);
							
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
		//获取不同类型的节点
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
		//添加节点图标
		function addSidebarIcon(nodeid,graph, sidebar, label, image,prompt,title)
		{
			// Function that is executed when the image is dropped on
			// the graph. The cell argument y
				var parent = graph.getDefaultParent();
				var model = graph.getModel();
				var v1 = null;
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
					}
						
					finally
					{
						model.endUpdate();
					}
						var levelmodule=wholelevel.addlevelmodule(v1);
              			levelmodule.levelmoduleobject.type=prompt;
				    	graph.setSelectionCell(v1);
						v1.nodeid=nodeid;
				};
			// Creates the image which is used as the sidebar icon (drag source)
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
			var dragElt = document.createElement('div');
			dragElt.style.border = 'dashed black 1px';
			dragElt.style.width = '120px';
			dragElt.style.height = '120px';
			  					
			// Creates the image which is used as the drag icon (preview)
			var ds = mxUtils.makeDraggable(img, graph, funct, dragElt, 0, 0, true, true);
			ds.setGuidesEnabled(true);
		};
		
		//设置不同类型节点样式
		function configureStylesheet(graph)
		{
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
			graph.getStylesheet().putDefaultEdgeStyle(style);
			
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
			
		};
		
		   function createPopupMenu(graph, menu, cell, evt)  
		{  
		    var model = graph.getModel(); 
		    var level=wholelevel.getcurrentlevel();
			   if (cell != null){
				   if (model.isVertex(cell)&&cell.getStyle()=='process'){
						       	        menu.addItem('编辑下一层', null, function()  
								            {  
								            	 var cell=editor.graph.getSelectionCell();
											       if(cell!=null&&editor.graph.model.getStyle(cell)=='process'){
												          var level=wholelevel.getcurrentlevel();
													       var modules=level.levelmodules;
													       level.cells=editor.graph.getChildCells();
													       for(var i=0;i<modules.length;i++){
														       if(modules[i].levelmoduleobject.cellid==cell.getId()){
														         savecells();
														            if(modules[i].childlevel!=null){
														             initgraph();
														            var childlevel=modules[i].childlevel;
														             var cells=childlevel.cells;
														             editor.graph.addCells(cells);
														             wholelevel.setcurrentlevel(childlevel);
														            }else{
														            var level=wholelevel.addlevel(modules[i]);
														            level.type='processlevel';
														            initgraph();
														       		} 
														       		break;
														       }
													       		
													       }
											       }
											       
											         var cell=editor.graph.getSelectionCell();
					       if(cell!=null&&editor.graph.model.getStyle(cell)=='process'){
						           var level=wholelevel.getcurrentlevel();
							       var modules=level.levelmodules;
							       level.cells=editor.graph.getChildCells();
							       for(var i=0;i<modules.length;i++){
								       if(modules[i].levelmoduleobject.cellid==cell.getId()){
								       savecells();
								      		 var childlevel=modules[i].childlevel;
								            if(childlevel!=null){
								             initgraph();
						                     
								           /*  
								            var childmodules=childlevel.levelmodules;
								            var cells=[];
								             for(var j=0;j<childmodules.length;j++){
								             var cell=childmodules[j].levelmoduleobject.cell;
								             cells.push(cell)
								             } */
								             editor.graph.addCells(childlevel.cells);
								             wholelevel.setcurrentlevel(childlevel);
								            }else{
								            wholelevel.addlevel(modules[i]);
								            initgraph();
								            var level2=wholelevel.getcurrentlevel();
								       		} 
								       		return null;
								       }
							       		
							       }
					       }
											       
											       
											       
											       
											       
											       
											       
								            }
								            ); 
						                 menu.addItem('复制', null, function(){  
							                copyfunc();
							            }
							            ); 
							             menu.addItem('剪切', null, function(){  
							                cutfunc();
							            }
							            );
							            menu.addItem('删除', null, function(){  
							                deletefunc();
							            }
							            );
					  }
				   }else{
									    menu.addItem('粘贴', null, function()  
							            {  
							                pastefun();
							            });
				   }
			   if(level.type=='processlevel'){
				   if (cell != null){
							             menu.addItem('编辑过程信息', null, function(){  
							            	   var cell=editor.graph.getSelectionCell();
										       if(cell!=null){
											        var label = graph.model.getStyle(cell);
													if(label=='process'){
													   var level=wholelevel.getcurrentlevel();
												       var modules=level.levelmodules;
												       for(var i=0;i<modules.length;i++){
													       if(modules[i].levelmoduleobject.cellid==cell.getId()){
															    parent.showdetail(cell,modules[i]);
													    	}
														}
										            } 
										       }
						            		
							            }
							            );
							               
							            
							              
					       	    }else{
							        if(level.parentlevelid!='level_stage'){
								         menu.addItem('返回上一层', null, function()  
						              			    {  
										          	returntoparentlevel();
										            }
										            );
							        }
				       		}
			       		}
		};
		
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
		style="position:absolute;white-space:nowrap;overflow:hidden;top:5px;left:200px;height:40px;right:0px;padding:0px">
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
