Edo.build(
		{
			id:'main',
			type: 'app',
			width: '100%',
			height: '100%',
			layout: 'vertical',
			render: document.body,	
			padding:0,
			children:[
                      //顶栏描述

			          {	id:'navBtns',
                type: 'box',border:[0,0,0,0],padding: [0,0,0,0],width: '100%',height: '76', layout: 'horizontal',titleIcon:'',
                bodyCls: 'cims201_topbar_bg',
                children:[
                              
	                {   
	                
	                	
					    type: 	'label',width: 	'100%', height: '100%',
					    //style:	'font-size:20px;padding:5px;padding-top:8px;font-family:微软雅黑, 宋体, Verdana;font-weight:bold; ',    
					    text: '<div class="cims201_topbar_bg"></div>'
	                },
	                
	                {
	                	type: 'label', height:76, style: 'font-size:13px;padding-left:2px; padding-right:2px;padding-top:50px;font-weight:bold;', text: '欢迎您，张武杰!'
	                },
	               
	                {

	                    type: 'label', height:76, style: 'padding-left:2px; padding-right:2px;padding-top:5px;', text: '<a href=""><div class="cims201_topbar_icon">&nbsp;<image height=45 width=45 src=css/images/home2.png><br>&nbsp;系统主页</div></a>'

	                },
	                {

	                    type: 'label', height:76, style: 'padding-left:2px; padding-right:2px;padding-top:5px;', text: '<a href=javascript:navManager("user");><div  class="cims201_topbar_icon">&nbsp;<image height=45 width=45 src=css/images/per.png><br>&nbsp;用户中心</div></a>'

	                },
	                
	                {

	                    type: 'label', height:76, style: 'padding-left:2px; padding-right:2px;padding-top:5px;', text: '<a href=javascript:navManager("knowledge");><div class="cims201_topbar_icon">&nbsp;<img style=height:45px  src=css/images/ku.png><br>&nbsp;知识仓库</div></a>'

	                },
	                
	                //陈谦庄 模块化
	                {
	                	type:'label',height:76,style:'padding-left:2px;pading-right:2px;padding-top:5px;',text:'<a href=javascript:navManager("ModManage")><div class="cims201_topbar_icon">&nbsp;<img style=height:45px  src=css/images/creatkgroup.gif><br>组织管理</div></a>'
	                },
	                
	                {
	                    type: 'label', height:76, style: 'padding-left:2px; padding-right:2px;padding-top:5px;', text: '<a href="<%=basePath%>j_spring_security_logout"><div class="cims201_topbar_icon">&nbsp;<image style=height:45px  src="css/images/exit.png"><br>&nbsp;&nbsp;&nbsp;退出&nbsp;</div></a>'
	                }
                ]
            },

			         
			          //主界面
			          {
			        	  type: 'ct',
			              width: '100%',
			              height: '100%',
			              layout: 'horizontal',
			              padding:0,
			              children:[
                                    //左侧边
			                        {
			                        	id:'leftPanel',
			                        	type: 'panel',
			                            title: '<a class="lca_main_nav">导航列表</a>',
			                            width: '260',
			                            height: '100%',
			                            verticalGap:'0',
			        				    padding:[0,0,0,0],
			                            collapseProperty: 'width',
			                            enableCollapse: true,
			                            splitRegion: 'west',
			                            splitPlace: 'after',
			                            layout:'vertical',
			                            titlebar:[
			                                      {
			                                          cls:'e-titlebar-toggle-west',
			                                          icon: 'button',
			                                          onclick: function(e){this.parent.owner.toggle();}
			                                      }
			                                      ],
			                            children:[
			                                      {			         	                                    	 	                                    	
			                                    	    type: 'panel',


				  			                            title: '<a class="lca_main_paneltitle">产品LCA模型模块</a>',

				  			                            width: '100%',
				  			                            height: '100%',
				  			                            enableCollapse: true,
				  			                            onclick: onPanelClick,  
				  			                            expanded:false,
				  			                            titlebar:[{
				  			                            cls:'e-titlebar-accordion',
				  			                            onclick: toggle}],
				  			                            children:[
				  			                                      {
				  			                                    	  type: 'table', 
					  			                                      autoColumns: true, 
					  			                                      headerVisible: false,
					  			                                      width: '100%', height: '100%',
					  			                                      style:'border:0;',
					  			                                      verticalLine: false, 
					  			                                      horizontalLine: false, 
					  			                                      rowHeight: 30,
					  			                                      columns: [
								                                                {								                                                	header: '导航树',
								                                                    dataIndex: 'url',
								                                                    renderer: function(v, r){
								                                                    	//return '<a href="javascript:mainModule.load(\"'+r.url+'\")">'+r.name+'</a>';
								                                                        return '<a class="lca_main_panelcontent">'+r.name+'</a>';	}
								                                                }],
								                                    data:[{id: 'modulebuilderCT', url: '', name: '产品生命周期模型新建'},
						                                    	           /*  {id: 'test', url: 'module6.htm', name: '流程模版管理'},
						                                    	             {id: 'nodemanage', url: 'module6.htm', name: '流程节点管理'},*/

						                                    	             {id: 'modulecheck', url: 'module6.htm', name: '产品生命周期模型查看'},
						                                    	             /*{id: 'modulelookCT', url: 'module6.htm', name: '产品生命周期模型管理'}*/],

						                                    	             onselectionchange: function(e){  
										  	                                        var r = e.selected;
										  	                                        //console.log(r);
										  	                                        //console.log(mainTabBar.children.length);
										  	                                        if(r){
										  	                                        	openNewTab(r);
										  	                                        }
										  	                                    }
				  			                                      }
				  			                                      ],			                              			                                    
					                                       },
					                                       {			         	                                    	 	                                    	
					                                    	    type: 'panel',


						  			                            title: '<a class="lca_main_paneltitle">产品LCA计算方案模块</a>',

						  			                            width: '100%',
						  			                            height: '100%',
						  			                            enableCollapse: true,
						  			                            onclick: onPanelClick,  
						  			                            expanded:false,
						  			                            titlebar:[{
						  			                            cls:'e-titlebar-accordion',
						  			                            onclick: toggle}],
						  			                            children:[
						  			                                      {
						  			                                    	  type: 'table', 
							  			                                      autoColumns: true, 
							  			                                      headerVisible: false,
							  			                                      width: '100%', height: '100%',
							  			                                      style:'border:0;',
							  			                                      verticalLine: false, 
							  			                                      horizontalLine: false, 
							  			                                      rowHeight: 30,
							  			                                      columns: [
										                                                {								                                                	header: '导航树',
										                                                    dataIndex: 'url',
										                                                    renderer: function(v, r){
										                                                    	//return '<a href="javascript:mainModule.load(\"'+r.url+'\")">'+r.name+'</a>';
										                                                    	return '<a class="lca_main_panelcontent">'+r.name+'</a>';	}
										                                                }],
										                                    data:[{id: 'lcasolution', url: '', name: '产品生命周期计算方案新建'},
										                                        /*  {id: 'comment', url: '', name: '评价'},*/
								                                    	           /*  {id: 'test', url: 'module6.htm', name: '流程模版管理'},
								                                    	             {id: 'nodemanage', url: 'module6.htm', name: '流程节点管理'},*/
								                                    	             {id: 'lcasolutionmanage', url: 'module6.htm', name: '产品生命周期计算方案管理'}],
								                                    	             onselectionchange: function(e){  
												  	                                        var r = e.selected;
												  	                                        //console.log(r);
												  	                                        //console.log(mainTabBar.children.length);
												  	                                        if(r){
												  	                                        	openNewTab(r);
												  	                                        }
												  	                                    }
						  			                                      }
						  			                                      ],			                              			                                    
							                                       },
//							                                       {			         	                                    	 	                                    	
//							                                    	    type: 'panel',
//								  			                            title: '<a class="lca_main_paneltitle">模型与知识</a>',
//								  			                            width: '100%',
//								  			                            height: '100%',
//								  			                            enableCollapse: true,
//								  			                            onclick: onPanelClick,  
//								  			                            expanded:false,
//								  			                            titlebar:[{
//								  			                            cls:'e-titlebar-accordion',
//								  			                            onclick: toggle}],
//								  			                            children:[
//								  			                                      {
//								  			                                    	  type: 'table', 
//									  			                                      autoColumns: true, 
//									  			                                      headerVisible: false,
//									  			                                      width: '100%', height: '100%',
//									  			                                      style:'border:0;',
//									  			                                      verticalLine: false, 
//									  			                                      horizontalLine: false, 
//									  			                                      rowHeight: 30,
//									  			                                      columns: [
//												                                                {								                                                	header: '导航树',
//												                                                    dataIndex: 'url',
//												                                                    renderer: function(v, r){
//												                                                    	//return '<a href="javascript:mainModule.load(\"'+r.url+'\")">'+r.name+'</a>';
//												                                                    	return '<a class="lca_main_panelcontent">'+r.name+'</a>';	}
//												                                                }],
//												                                    data:[{id: 'lcadatacomment', url: '', name: 'lca计算数据查看及评价'},
//												                                          {id: 'newlcadata', url: '', name: '新建lca计算数据'}],
//												                                          
//										                                    	             onselectionchange: function(e){  
//														  	                                        var r = e.selected;
//														  	                                        //console.log(r);
//														  	                                        //console.log(mainTabBar.children.length);
//														  	                                        if(r){
//														  	                                        	openNewTab(r);
//														  	                                        }
//														  	                                    }
//								  			                                      }
//								  			                                      ],			                              			                                    
//							                                       },
//							                                       {			         	                                    	 	                                    	
//							                                    	    type: 'panel',
//								  			                            title: '物资名录',
//								  			                            width: '100%',
//								  			                            height: '100%',
//								  			                            enableCollapse: true,
//								  			                            onclick: onPanelClick,  
//								  			                            expanded:false,
//								  			                            titlebar:[{
//								  			                            cls:'e-titlebar-accordion',
//								  			                            onclick: toggle}],
//								  			                            children:[
//								  			                                      {
//								  			                                    	  type: 'table', 
//									  			                                      autoColumns: true, 
//									  			                                      headerVisible: false,
//									  			                                      width: '100%', height: '100%',
//									  			                                      style:'border:0;',
//									  			                                      verticalLine: false, 
//									  			                                      horizontalLine: false, 
//									  			                                      rowHeight: 30,
//									  			                                      columns: [
//												                                                {								                                                	header: '导航树',
//												                                                    dataIndex: 'url',
//												                                                    renderer: function(v, r){
//												                                                    	//return '<a href="javascript:mainModule.load(\"'+r.url+'\")">'+r.name+'</a>';
//												                                                        return r.name;	}
//												                                                }],
//												                                    data:[{id: 'basedatamanage', url: '', name: '基础物质管理'}
//										                                    	         ],
//										                                    	             onselectionchange: function(e){  
//														  	                                        var r = e.selected;
//														  	                                        //console.log(r);
//														  	                                        //console.log(mainTabBar.children.length);
//														  	                                        if(r){
//														  	                                        	openNewTab(r);
//														  	                                        }
//														  	                                    }
//								  			                                      }
//								  			                                      ],			                              			                                    
//									                                       },
//									                                       {			         	                                    	 	                                    	
//									                                    	    type: 'panel',
//										  			                            title: '评价方法与指标',
//										  			                            width: '100%',
//										  			                            height: '100%',
//										  			                            enableCollapse: true,
//										  			                            onclick: onPanelClick,  
//										  			                            expanded:false,
//										  			                            titlebar:[{
//										  			                            cls:'e-titlebar-accordion',
//										  			                            onclick: toggle}],
//										  			                            children:[
//										  			                                      {
//										  			                                    	  type: 'table', 
//											  			                                      autoColumns: true, 
//											  			                                      headerVisible: false,
//											  			                                      width: '100%', height: '100%',
//											  			                                      style:'border:0;',
//											  			                                      verticalLine: false, 
//											  			                                      horizontalLine: false, 
//											  			                                      rowHeight: 30,
//											  			                                      columns: [
//														                                                {								                                                	header: '导航树',
//														                                                    dataIndex: 'url',
//														                                                    renderer: function(v, r){
//														                                                    	//return '<a href="javascript:mainModule.load(\"'+r.url+'\")">'+r.name+'</a>';
//														                                                        return r.name;	}
//														                                                }],
//														                                    data:[{id: 'evaluationmethodsmanage', url: 'module6.htm', name: '评价方法管理'}],
//												                                    	             onselectionchange: function(e){  
//																  	                                        var r = e.selected;
//																  	                                        //console.log(r);
//																  	                                        //console.log(mainTabBar.children.length);
//																  	                                        if(r){
//																  	                                        	openNewTab(r);
//																  	                                        }
//																  	                                    }
//										  			                                      }
//										  			                                      ],			                              			                                    
//											                                       },
	                                      {			         	                                    	 	                                    	
	                                    	    type: 'panel',
		  			                            title: '<a class="lca_main_paneltitle">组织与人员</a>',
		  			                            width: '100%',
		  			                            height: '100%',
		  			                            enableCollapse: true,
		  			                            onclick: onPanelClick, 
		  			                            padding:0,
		  			                            expanded:false,
		  			                            titlebar:[{
		  			                            cls:'e-titlebar-accordion',
		  			                            onclick: toggle}],
		  			                            children:[
		  			                                      {
		  			                                    	  type: 'table', 
			  			                                      autoColumns: true, 
			  			                                      headerVisible: false,
			  			                                      width: '100%', height: '100%',
			  			                                      style:'border:0;',
			  			                                      verticalLine: false, 
			  			                                      horizontalLine: false, 
			  			                                      rowHeight: 30,
			  			                                      columns: [
						                                                {
						                                                	header: '导航树',
						                                                    dataIndex: 'url',
						                                                    renderer: function(v, r){
						                                                    	//return '<a href="javascript:mainModule.load(\"'+r.url+'\")">'+r.name+'</a>';
						                                                    	return '<a class="lca_main_panelcontent">'+r.name+'</a>';	}
						                                                }],
						                                        data:[{id: 'myjob', url: 'module2.htm', name: '我的任务'},
			                                    	             {id: 'clerk', url: 'module3.htm', name: '人员管理'},
			                                    	             {id: 'department', url: 'module3.htm', name: '组织管理'},
			                                    	             {id: 'privilege', url: 'module3.htm', name: '角色管理'},
			                                    	             {id: 'role', url: 'module3.htm', name: '权限管理'},
			                                    	             {id: 'tasktree', url: 'module3.htm', name: '功能模块管理'},
			                                    	             {id: 're', url: 'module3.htm', name: '工作界面'},],
			                                    	             onselectionchange: function(e){  
							  	                                        var r = e.selected;
							  	                                        //console.log(r);
							  	                                        //console.log(mainTabBar.children.length);
							  	                                        if(r){
							  	                                        	openNewTab(r);
							  	                                        }
							  	                                    }
		  			                                      }
		  			                                      ],			                              			                                    
			                                       },
			                                     //张武杰基础数据目录编写start
	  			                                   
								                     //重新开始-----
			                                       {			         	                                    	 	                                    	
			                                    	    type: 'panel',
				  			                            title: '<a class="lca_main_paneltitle">基础数据和方法管理</a>',
				  			                            width: '100%',
				  			                            height: '100%',
				  			                            enableCollapse: true,
				  			                            onclick: onPanelClick,  
				  			                            expanded:false,
				  			                            titlebar:[{
				  			                            cls:'e-titlebar-accordion',
				  			                            onclick: toggle}],
				  			                            children:[
				  			                                      {
				  			                                    	  type: 'table', 
					  			                                      autoColumns: true, 
					  			                                      headerVisible: false,
					  			                                      width: '100%', height: '100%',
					  			                                      style:'border:0;',
					  			                                      verticalLine: false, 
					  			                                      horizontalLine: false, 
					  			                                      rowHeight: 30,
					  			                                      columns: [
								                                                {								                                                	header: '导航树',
								                                                    dataIndex: 'url',
								                                                    renderer: function(v, r){
								                                                    	//return '<a href="javascript:mainModule.load(\"'+r.url+'\")">'+r.name+'</a>';
								                                                    	return '<a class="lca_main_panelcontent">'+r.name+'</a>';	}
								                                                }],
								                                    data:[
								                                          //{id: 'zwjbasecategory', url: '', name: '介绍&&帮助'},
								                                          {id: 'goalDefinition', url: '', name: '目标和范围定义'},
								                                          {id: 'graphDraw', url: '', name: '产品BOM结构'},
								                                          {id: 'lcidataCollect', url: '', name: '基本物质名录'},
								                                          {id: 'lcidataCalculte', url: '', name: '清单数据集名录'},
								                                          {id: 'lciaCalculate', url: '', name: '环境影响评价方法'},
								                                          {id: 'lcidataUnit', url: '', name: '统一单位管理'},
								                                          {id: 'lcaReport', url: '', name: '生成环境影响报告'},
						                                    	         ],
						                                    	         
						                                    	             onselectionchange: function(e){  
										  	                                        var r = e.selected;
										  	                                        //console.log(r);
										  	                                        //console.log(mainTabBar.children.length);
										  	                                        if(r){
										  	                                        	openNewTab(r);
										  	                                        }
										  	                                    }
				  			                                      },
				  			                                      
				  			                                      ],			                              			                                    
					                                       }
			                                       /*,
			                                       {			         	                                    	 	                                    	
			                                    	    type: 'panel',
				  			                            title: '关联知识',
				  			                            width: '100%',
				  			                            height: '100%',
				  			                            enableCollapse: true,
				  			                            onclick: onPanelClick,  
				  			                            expanded:false,
				  			                            titlebar:[{
				  			                            cls:'e-titlebar-accordion',
				  			                            onclick: toggle}],
				  			                            children:[
				  			                                      {
				  			                                    	  type: 'table', 
					  			                                      autoColumns: true, 
					  			                                      headerVisible: false,
					  			                                      width: '100%', height: '100%',
					  			                                      style:'border:0;',
					  			                                      verticalLine: false, 
					  			                                      horizontalLine: false, 
					  			                                      rowHeight: 30,
					  			                                      columns: [
								                                                {								                                                	header: '导航树',
								                                                    dataIndex: 'url',
								                                                    renderer: function(v, r){
								                                                    	//return '<a href="javascript:mainModule.load(\"'+r.url+'\")">'+r.name+'</a>';
								                                                        return r.name;	}
								                                                }],
								                                    data:[{id: 'modulebuilderCT', url: '', name: '知识搜索'},
						                                    	             {id: 'test', url: 'module6.htm', name: '流程模版管理'},
						                                    	             {id: 'nodemanage', url: 'module6.htm', name: '流程节点管理'},
						                                    	             {id: 'modulecheck', url: 'module6.htm', name: '知识浏览'}],
						                                    	             onselectionchange: function(e){  
										  	                                        var r = e.selected;
										  	                                        //console.log(r);
										  	                                        //console.log(mainTabBar.children.length);
										  	                                        if(r){
										  	                                        	openNewTab(r);
										  	                                        }
										  	                                    }
				  			                                      }
				  			                                      ],			                              			                                    
					                                       }*/
			                                      /* {			         	                                    	 	                                    	
			                                    	    type: 'panel',
				  			                            title: '流程节点库',
				  			                            width: '100%',
				  			                            height: '100%',
				  			                            enableCollapse: true,
				  			                            onclick: onPanelClick,    
				  			                            expanded:false,                                      
				  			                            titlebar:[{
				  			                            cls:'e-titlebar-accordion',
				  			                            onclick: toggle}],
				  			                            children:[
				  			                                      {
				  			                                    	  type: 'table', 
					  			                                      autoColumns: true, 
					  			                                      headerVisible: false,
					  			                                      width: '100%', height: '100%',
					  			                                      style:'border:0;',
					  			                                      verticalLine: false, 
					  			                                      horizontalLine: false, 
					  			                                      rowHeight: 30,
					  			                                      columns: [
								                                                {								                                                	header: '导航树',
								                                                    dataIndex: 'url',
								                                                    renderer: function(v, r){
								                                                    	//return '<a href="javascript:mainModule.load(\"'+r.url+'\")">'+r.name+'</a>';
								                                                        return r.name;	}
								                                                }],
								                                    data:[{id:'moudeldevelop',url:'',name:'模块化开发'},
						                                    	             {id:'moudelcreat',url:'',name:'模块化平台搭建'},
						                                    	             {id:'moudeluse',url:'',name:'模块运用'},],
						                                    	             onselectionchange: function(e){  
										  	                                        var r = e.selected;
										  	                                        //console.log(r);
										  	                                        //console.log(mainTabBar.children.length);
										  	                                        if(r){
										  	                                        	openNewTab(r);
										  	                                        }
										  	                                    }
				  			                                      }
				  			                                      ],			                              			                                    
					                                       },*/
					                                      /*
							                                       {			         	                                    	 	                                    	
							                                    	    type: 'panel',
								  			                            title: '项目任务管理',
								  			                            width: '100%',
								  			                            height: '100%',
								  			                            enableCollapse: true,
								  			                            onclick: onPanelClick,
								  			                            expanded:false,
								  			                            titlebar:[{
								  			                            cls:'e-titlebar-accordion',
								  			                            onclick: toggle}],
								  			                            children:[
								  			                                      {
								  			                                    	  type: 'table', 
									  			                                      autoColumns: true, 
									  			                                      headerVisible: false,
									  			                                      width: '100%', height: '100%',
									  			                                      style:'border:0;',
									  			                                      verticalLine: false, 
									  			                                      horizontalLine: false, 
									  			                                      rowHeight: 30,
									  			                                      columns: [
												                                                {								                                                	header: '导航树',
												                                                    dataIndex: 'url',
												                                                    renderer: function(v, r){
												                                                    	//return '<a href="javascript:mainModule.load(\"'+r.url+'\")">'+r.name+'</a>';
												                                                        return r.name;	}
												                                                }],
												                                    data:[{id: 'projectbuilder', url: 'module8.htm', name: '项目创建'},
										                                    	             {id: 'projectmanage', url: 'module8.htm', name: '项目管理'},
										                                    	             {id: 'id8', url: 'module8.htm', name: '任务分配'},],
										                                    	             onselectionchange: function(e){  
														  	                                        var r = e.selected;
														  	                                        //console.log(r);
														  	                                        //console.log(mainTabBar.children.length);
														  	                                        if(r){
														  	                                           openNewTab(r);
														  	                                        }
														  	                                    }
								  			                                      }
								  			                                      ],			                              			                                    
									                                       }*/
									                                       
			                                   
			                                    	          ],			                            
			                                       },
			                                       //右主界面
			                        {
			                        	id:'mainPanel',
			                        	type: 'ct',width: '100%',height: '100%',verticalGap: 0,padding:[0,0,0,0],
			                        	children:[
			                        		{id:'mainTabBar',type: 'tabbar',selectedIndex: 0,height:30,border: [0,0,0,0],padding:[0,0,0,0],
			                        		onselectionchange: function(e){        
			                                    mainTabContent.set('selectedIndex', e.index);
			                                  },
			                                  children: [
			                                             {id:"tbar_myjob",index:0,type: 'button',text:'主页'}		                                       
			                                           ]
			                        	    },
			                        	{
			                        	    	id: 'mainTabContent',selectedIndex: 0,layout: 'viewstack',type: 'box',padding:[0,0,0,0],
			                        	    	border: [1,0,1,1],width: '100%',height: '100%',
			                        	    	onselectionchange: function(e){
			                                        alert('content-selected');},
			                                    children: [{id: 'cont_job',type:"module",src:'lcc/indexpage!myjob.action',width: '100%',height: '100%', style: 'border:0'
			                                    }]  
			                        	}]
			                        }
			                        ]
			          }
			          ]
		});
function toggle(e){
    var panel = this.parent.owner;
    var accordion = panel.parent;
    accordion.getChildren().each(function(child){
        if(panel != child) child.collapse();
    });
    panel.toggle();
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
function openModule(src){
    alert(src);
}

//打开新的选项卡
function openNewTab(r){	
  var id = r.id;
  var idx  = mainTabBar.children.length;
  var c = Edo.get("tbar_"+id);
  if(c==null){
    c = mainTabBar.addChildAt(idx,
      {id:'tbar_'+id,type: 'button',text:r.name,arrowMode: 'close',
          onarrowclick:function(e){
          //根据idx, 删除对应的容器
          var c = Edo.get('cont_'+id);          
          c.destroy();
          //选中原来Index处          
          var tabitem = mainTabBar.getChildAt(mainTabBar.selectedIndex);          
          if(!tabitem){
              tabitem = mainTabBar.getChildAt(mainTabBar.selectedIndex-1);               
          }          
          mainTabBar.set('selectedItem', tabitem);        
        }
      }
    );
    var module = mainTabContent.addChildAt(idx,
      {
        id:'cont_'+id,type:"module",width: '100%',height: '100%',style: 'border:0'
      }
    );    
    var url='lcc/indexpage!'+id+'.action';
    module.load(url);   
  };
  mainTabBar.set('selectedItem', c);
    
};
function openNewTab2(r,param){	
	  var id = r.id;
	  var idx  = mainTabBar.children.length;
	  var c = Edo.get("tbar_"+id);
	  if(c==null){
	    c = mainTabBar.addChildAt(idx,
	      {id:'tbar_'+id,type: 'button',text:r.name,arrowMode: 'close',
	          onarrowclick:function(e){
	          //根据idx, 删除对应的容器
	          var c = Edo.get('cont_'+id);          
	          c.destroy();
	          //选中原来Index处          
	          var tabitem = mainTabBar.getChildAt(mainTabBar.selectedIndex);          
	          if(!tabitem){
	              tabitem = mainTabBar.getChildAt(mainTabBar.selectedIndex-1);               
	          }          
	          mainTabBar.set('selectedItem', tabitem);        
	        }
	      }
	    );
	    var module = mainTabContent.addChildAt(idx,
	      {
	        id:'cont_'+id,type:"module",width: '100%',height: '100%',style: 'border:0;'
	      }
	    );    
	    //var url='js/lcc/'+r.id+'.jsp?';
	    var url='lcc/indexpage!'+id+'.action?';
	    for(var s in param)
	    	{
	    	url=url+s+'='+param[s]+'&';
	    	}
	    url=url.substring(0, url.length-1);
	    module.load(url);   
	  };
	  mainTabBar.set('selectedItem', c);
	    
	};