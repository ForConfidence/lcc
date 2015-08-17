//var qiche1Data = new Edo.data.DataTable().set('data', Qiche1);
//var positionData = new Edo.data.DataTree(Positions);
var moduleid=null;
var moduledata= cims201.utils.getData('lcc/lccmodule!getModuletree.action',{componentid:null});
var productdata=cims201.utils.getData('lcc/lccmodule!getComponentList.action',{parentId:'0'});
Edo.build(
		{
			type: 'app',render: document.body,width: '100%',height: '100%',layout: 'horizontal',padding:[0,0,0,0],
			children:[
                     {type: 'ct',width: '100%',height: '100%',padding:[0,0,0,0],
                    				border:[0,0,0,0],
                      children:[
                            
                                      /* {type:'box',width: '100%',padding:[5,0,5,5],horizontalGap:'5',
                                    	   border:[0,0,0,0],layout: 'horizontal',
                                    	   children:[
												{type:'label',text:'按'},        
												{
													type : 'combo',
													//width : 300,
													displayField : 'name',
													valueField : 'id',
													data : [
													        {stage:'design',name:'产品'},{stage:'manufacture',name:'用户'},{stage:'use',name:'使用'},{stage:'recycle',name:'回收'}
													        ],
												    onselectionchange:function(e){  
												    	for(var s in e){
												    		alert(s)
												    		alert(e[s])
												    		
												    	}
												    	var a=false;
												    	stagetable.data.source.each(function(r){        
												            if(r.name==e.selectedItem.name){
												            	a=true;
												            	return ;
												            };
												        });
												    	if(!a)
														{
														stagetable.data.insert(stagetable.data.source.length,e.selectedItem);
														}else{
															alert('重复定义阶段！')
														}
												        
												
												}
												},
												{type:'label',text:'归类'},
												{type:'Split',width:30},
                            	             	{type:'label',text:'根据'},        
												{
													type : 'combo',
													//width : 300,
													displayField : 'name',
													valueField : 'id',
													data : [
													        {stage:'design',name:'设计'},{stage:'manufacture',name:'制造'},{stage:'use',name:'使用'},{stage:'recycle',name:'回收'}
													        ],
												    onselectionchange:function(e){  
												    	for(var s in e){
												    		alert(s)
												    		alert(e[s])
												    		
												    	}
												    	var a=false;
												    	stagetable.data.source.each(function(r){        
												            if(r.name==e.selectedItem.name){
												            	a=true;
												            	return ;
												            };
												        });
												    	if(!a)
														{
														stagetable.data.insert(stagetable.data.source.length,e.selectedItem);
														}else{
															alert('重复定义阶段！')
														}
												        
												
												}
												},
												{
													type:'Search',
													ontrigger: function(e){
												        this.set('clearVisible', true);
												        alert("查询");
												    },
												    oncleartrigger: function(e){
												        alert("清除查询");
												    }
												}
											    
												
            	                              ]
                                       	},*/
                                      /* 	{
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
                                        },*/
                                       	
                               	  {	   type:'box',
                                       layout:'horizontal',
                                       width:'100%',
                                       height: 450,
                                       padding:[0,0,0,0],
                               	       children:[
                               	                
                               	              {id: 'leftPanel',type: 'panel',title: '产品列表',width: 300,height: '100%',padding:[0,0,0,0],
                                           	   border:[0,1,0,0],verticalGap:'0',  
                                           	   children:[

													{
														id: 'producttable', type: 'table', width: '100%', height: '100%',
													    horizontalScrollPolicy:'off',headerVisible: false,
													    columns:[
														 {header:'产品',dataIndex: 'name',headerAlign: 'center',width:300,align: 'center'},
													     ],
													     data:productdata,
													     onclick: function(e){
													    	        var row = this.getSelected();
													    	        if(!row){
													    	        	return;
													    	        }
			       									                Edo.util.Ajax.request({
			       									                    //url: 'nodes.txt',
			       									                    url: 'lcc/lccmodule!getModuleListByProduct.action',
			       									                    params: {
			       									                        componentid: row.id   //传递父节点的Name(也可以是ID)
			       									                    },
			       									                    defer: 200,
			       									                    onSuccess: function(text){
			       									                        var data = Edo.util.Json.decode(text);
			       									                        branchtable.set('data',data);
			       									                    }
			       									                });
												              
												            } 
													     
													     
													} 
												                                           	             
                                           	             
                                           	             
	                               	         /*      {
	       					                	    type: 'tree',
	       						   			        width: '100%',
	       						   			        height: '100%',
	       						   			        autoColumns:true,
	       						   			        style:'border-right:0',
	       						   			        horizontalScrollPolicy:'off',
	       						   			        headerVisible: false,
	       						   			        verticalLine:false,
	       						   			        horizontalLine:false,
	       						   			        id: 'moduletree',
	       						   			        enabelCellSelect: false,
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
	       									        onbodymousedown: function(e){
	       									        	var r = moduletree.getSelected();
	       								            	 if(r&&r.Version!=null){
	       								            		 Edo.get('componentmodelTree').set('data', []);
	       											        	moduleid=r.id;
	       											        	 Edo.util.Ajax.request({
	       														        type: 'post',        
	       														        url: 'lcc/lccmodule!getmoduleComponentsList.action',
	       														        params: {
	       													                parentId: null,   //传递父节点的Name(也可以是ID)
	       													                id:r.componentid,
	       													                moduleid:r.id
	       													            },
	       														        onSuccess: function(text){
	       														           // alert(text);
	       														            var data = Edo.util.Json.decode(text);
	       														            Edo.get('componentmodelTree').set('data', data);
	       														        }
	       														        
	       														    });
	       									                }
	       								            	 
	       								            	 //加载模板分支
	       								            	 var r = this.getSelected();
	       								            	 if(r==undefined||r.uuid==null){
	       								            		 return;
	       								            	 }
	       								             	Edo.util.Ajax.request({
	       								             	    type: 'post',        
	       								             	    url: 'lcc/lccmodule!getModuleBranchByParent.action',
	       								             	    params: {
	       								             	    	superparentmoduleUUID: r.uuid  //传递父节点的Name(也可以是ID)
	       								             	    },
	       								             	    onSuccess: function(text){
	       								             	        var data = Edo.util.Json.decode(text);
	       								             	        Edo.get('branchtable').set('data', data);
	       								             	    }
	       								             	    
	       								             	});
	       								            	 
	       									        },
	       									        columns:[
	       									            {   
	       									                enableDragDrop: true,
	       									                dataIndex: "name"
	       									            
	       						                        }
	       									            ],
	       						                     data:moduledata
	       									           
	       						            }*/
		                   	               ]
		                               	},
		                               	
		                                {id: 'rightpanel',type: 'panel',title: '模板列表',width: '100%',height: '100%',padding:[0,0,0,0],
                                        	   border:[0,1,0,0],verticalGap:'0',
                                        	   children:[
			       						            {   type:'box',
			       						            	layout:'vertical',
			       						            	width:'100%',
			       						            	height: '100%',
			       						            	padding:[0,0,0,0],
			       						            	children:[
																{
																	type: 'group',
																    layout: 'horizontal',
																    width:'100%',
																    cls: 'e-toolbar',
																    children: [
																		{
																		    type: 'button',
																		    text: '评分从高到低',
																		    onclick: function(e){
																		    	
																		    	
																		    }                
																		    
																		}, 
																		{
																		    type: 'button',
																		    text: '评分从低到高',
																		    onclick: function(e){
																		    	
																		    	
																		    }                
																		    
																		},
																		
																		{
																		    type: 'button',
																		    text: '使用次数从高到低',
																		    onclick: function(e){
																		    	
																		    	
																		    }                
																		    
																		},
																		{
																		    type: 'button',
																		    text: '使用次数从低到高',
																		    onclick: function(e){
																		    	
																		    	
																		    }                
																		    
																		},
																		{
																		    type: 'button',
																		    text: '最新创建',
																		    onclick: function(e){
																		    	
																		    	
																		    }                
																		    
																		},
																		{type:'Split',width:30},
																		/*{
																            type: 'button',
																            text: '查看模板相关信息',
																            onclick: function(e){
																            	var r = moduletree.getSelected();
																            	 if(r&&r.Version!=null){
																            		 parent.openNewTab2({id: 'lcamoduledetail', url: '', name: '模型相关信息'},{})
																            		// window.open('js/lcc/qiche/qiche1_1.jsp?moduleid='+r.moduleid)
																	                }else{
																	                	alert('请选择产品的一个模板！')
																	                }
																            	
																            }                
																            
																        },*/
																        {
																            type: 'button',
																            text: '查看模板图',
																            onclick: function(e){
																            	var pr=producttable.getSelected()
																            	var r= branchtable.getSelected();
																            	 if(r){
																            		 parent.openNewTab2({id: 'modulecheckCT', url: '', name: '模板图管理'},{moduleid:r.moduleid,branchid:r.id,componentid:pr.id})
																            		// window.open('js/lcc/qiche/qiche1_1.jsp?moduleid='+r.moduleid)
																	                }else{
																	                	Edo.MessageBox.alert('警告','请选择一个模板');
																	                }
																            	
																            }                
																            
																        },
																        {
																            type: 'button',
																            text: '评价模板',
																            onclick: function(e){
																            	var r=branchtable.getSelected();
																                if(r){
																                	parent.openNewTab2({id: 'modulecomment', url: '', name: '评价模板'},{moduleid:r.moduleid,branchid:r.id})
																		            //window.open('js/lcc/qiche/qiche1_1.jsp?moduleid='+r.moduleid)
																                }else{
																                	Edo.MessageBox.alert('警告','请选择一个模板');
																                }
																              
																            }                
																            
																        }
																        
								       				     	
																        
																        ]
																	},
																	{
							       				     					id: 'branchtable', type: 'table', width: '100%', height: '100%',
							       				     				    horizontalScrollPolicy:'off',
							       				     				    columns:[
							       				     					 {header:'名称',dataIndex: 'name',headerAlign: 'center',width:250,align: 'center'},
							       				     					 {header:'创建时间',dataIndex: 'createdate',headerAlign: 'center',width:200,align: 'center'},
							       				     					 {header:'评价次数',dataIndex: 'commentcount',headerAlign: 'center',width:200,align: 'center'},
							       				     					 {header:'评分次数',dataIndex: 'ratecount',headerAlign: 'center',width:200,align: 'center'},
							       				     				     {header:'评分',dataIndex: 'score',headerAlign: 'center',width:200,align: 'center'}
							       				     				     ],
								       				     				 onbodymousedown: function(e){
								 									    	var r = this.getSelected();
								 									    	var rp=producttable.getSelected();
								 									    	if(r){
								 									    		modulename.set('text',r.name);
								 									    		productname.set('text',rp.name);
								 									    		score.set('text',r.score);
								 									    		creatername.set('text',r.creatername);
								 									    		createdate.set('text',r.createdate);
								 									    	}
								 									    	
								 									    	
								 									    }
							       				     				}
			       						            	          
							            	            ]
			       						            	
			       						            }
       						            ]
		                               	
		                                }
       				     				
                               	              
                       	              ]
                              
                                  },

 						          {
 									    type: 'box',
 									    width: '100%',
 									    layout: 'horizontal',
 									    padding:[0,0,0,0],border:[0,0,0,0],
 									    children:[
 								          {	type : 'formitem',label : '模型名称:',labelWidth : 100,labelAlign : 'center',
 								       	    children : [{type : 'label',width : 200,id : 'modulename',text:''}]
 								       	},
 								       	{type : 'formitem',label : '产品或零部件名称:',labelWidth : 110,labelAlign : 'center',
 											children : [{type : 'label',width : 200,id : 'productname',text:''}]
 											},
 									              ]
 								  },
								  {
								  	    type: 'box',
								  	    width: '100%',
								  	    layout: 'horizontal',
								  	    padding:[0,0,0,0],border:[0,0,0,0],
								  	    children:[
										{type : 'formitem',label : '构建人:',labelWidth : 100,labelAlign : 'center',
											children : [{type : 'label',width : 200,id : 'creatername',text:''},{type : 'text',visible:false,width : 150,id : 'createrid'}]
											},
										{type : 'formitem',label : '评分:',labelWidth : 100,labelAlign : 'center',
											children : [{type : 'label',width : 200,id : 'score',text:''}]
											}      
								  	              ]
								      },
								  {
								  	    type: 'box',
								  	    width: '100%',
								  	    layout: 'horizontal',
								  	    padding:[0,0,0,0],border:[0,0,0,0],
								  	    children:[
										{type : 'formitem',label : '构建时间:',labelWidth : 100,labelAlign : 'center',
											children : [{type : 'label',width : 200,id : 'createdate',text:''}]
											}
								  	              ]
							      }
                            ]
                     }
                 /*    {
                         id:'mainPanel',type: 'ct',width:260,height: '100%',collapseProperty: 'width',
            	         enableCollapse: true,splitRegion: 'east',splitPlace: 'before',verticalGap: 0,padding:[0,0,0,0],layout: 'horizontal', border:[0,0,0,0],
                         children:[
                                   {type: 'panel',title: '主结构模板树',width: 260,height: '100%',padding:[0,0,0,0],verticalGap:'0',border:[0,1,1,1],
                                    children: [
										{type:'box',width: '100%',padding:[5,0,5,5],horizontalGap:'0',
											   border:[0,0,0,0],layout: 'horizontal',
											   children:[
										      	{type:'label',text:'按'},        
													{
														type : 'combo',
														displayField : 'name',
														valueField : 'id',
														data : [
														        {stage:'design',name:'设计'},{stage:'manufacture',name:'制造'},{stage:'use',name:'使用'},{stage:'recycle',name:'回收'}
														        ],
													    onselectionchange:function(e){  
													    	for(var s in e){
													    		alert(s)
													    		alert(e[s])
													    		
													    	}
													    	var a=false;
													    	stagetable.data.source.each(function(r){        
													            if(r.name==e.selectedItem.name){
													            	a=true;
													            	return ;
													            };
													        });
													    	if(!a)
															{
															stagetable.data.insert(stagetable.data.source.length,e.selectedItem);
															}else{
																alert('重复定义阶段！')
															}
													        
													
													}
													},
													{
														type:'Search',
														ontrigger: function(e){
													        this.set('clearVisible', true);
													        alert("查询");
													    },
													    oncleartrigger: function(e){
													        alert("清除查询");
													    }
													}
												    
													
										       ]
											},
											{
												type: 'group',
											    layout: 'horizontal',
											    cls: 'e-toolbar',
											    children: [
											        {
											            type: 'button',
											            text: '查看零部件模板图',
											            onclick: function(e){
											            	var r = moduletree.getSelected();
											            	 if(r&&r.Version!=null){
											            		 parent.openNewTab2({id: 'lcamodulemanageCT', url: '', name: '模板图管理'},{moduleid:r.id,productid:r.componentid})
											            		// window.open('js/lcc/qiche/qiche1_1.jsp?moduleid='+r.moduleid)
												                }else{
												                	alert('请选择产品的一个模板！')
												                }
											            	
											            }                
											            
											        },
											        {
											            type: 'button',
											            text: '查看零部件模板数据集',
											            onclick: function(e){
											            	var r = moduletree.getSelected();
											            	 if(r&&r.Version!=null){
											            		 parent.openNewTab2({id: 'lcamodulemanageCT', url: '', name: '模板图管理'},{moduleid:r.id,productid:r.componentid})
											            		// window.open('js/lcc/qiche/qiche1_1.jsp?moduleid='+r.moduleid)
												                }else{
												                	alert('请选择产品的一个模板！')
												                }
											            	
											            }                
											            
											        }]
	                                       	},
                                       	{
									    
									    type: 'tree',
									    width: 260,
									    height: 300,
									    autoColumns:true,
									    headerVisible: false,
									    verticalLine:false,
									    style:'border-left:0',
									    horizontalLine:false,
									    horizontalScrollPolicy:'off',
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
									                url: 'lcc/lccmodule!getmoduleComponentsList.action',
									                params: {
									                	moduleid:moduleid,
									                    parentId: row.id   //传递父节点的Name(也可以是ID)
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
									},
									{type:'box',width: '100%',padding:[5,0,0,5],verticalGap:'10',
	                                 	   border:[0,0,0,0],layout: 'vertical',
	                                 	   children:[
												{type : 'formitem',label : '零部件名称:',labelWidth : 80,labelAlign : 'left',
												children : [{type : 'label',width : 150,id : 'componentname'}]
												},
												{type : 'formitem',label : '版本:',labelWidth : 80,labelAlign : 'left',
												children : [{type : 'label',width : 150,id : 'compversion'}]
												},
												{type : 'formitem',label : '构建人:',labelWidth : 80,labelAlign : 'left',
												children : [{type : 'label',width : 150,id : 'compcreatername'},{type : 'text',visible:false,width : 150,id : 'compcreaterid'}]
												},
												{type : 'formitem',label : '构建时间:',labelWidth : 80,labelAlign : 'left',
												children : [{type : 'label',width : 150,id : 'compcreatedate'}]
												},
												{type : 'formitem',label : '评分:',labelWidth : 80,labelAlign : 'left',
													children : [{type : 'label',width : 150,id : 'compscore'}]
													}
	                                 	             ]
							            }
									]
                               }
                               
                              
                   {
                     id:'mainTabBar',type: 'tabbar',selectedIndex: 0,border: [0,0,1,0],
                     onselectionchange: function(e){                
                       mainTabContent.set('selectedIndex', e.index);
                     },
                     children: [
                       {index:0,type: 'button',text: '主页'}
                     ]
                   },
                   {
                     id: 'mainTabContent',selectedIndex: 0,layout: 'viewstack',type: 'box',border: [0,1,1,1],width: '100%',height: '100%',verticalScrollPolicy: 'auto',
                     onselectionchange: function(e){
                       alert('content-selected');
                     },
                     children: [                    
                         {id: 'mainModule',type:"module",width: '100%',height: '100%', style: 'border:0'}
                     ]
                   }
                   ]
                     }*/
			         ]
		}
);
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
    module.load('js/lcc/qiche/'+r.id+'.jsp');   
  };
  mainTabBar.set('selectedItem', c);
    
};
