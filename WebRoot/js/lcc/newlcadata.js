
var qiche1Data = new Edo.data.DataTable().set('data', Qiche1);
var positionData = new Edo.data.DataTree(Positions);
var moduleid=null;
var moduledata= cims201.utils.getData(basePath+'lcc/lccmodule!getModuletree.action',{componentid:null});
Edo.build(
		{
			type: 'app',render: document.body,width: '100%',height: '100%',layout: 'horizontal',padding:[0,0,0,0],
			children:[
             
                               {id: 'leftPanel',type: 'panel',title: '模板及相应数据列表',width: '100%',height: '100%',padding:[0,0,0,0],
                            	   border:[0,1,0,0],verticalGap:'0',
                                children: [
                                           
                                       {type:'box',width: '100%',padding:[5,0,5,5],horizontalGap:'5',
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
												    	/*for(var s in e){
												    		alert(s)
												    		alert(e[s])
												    		
												    	}*/
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
												    	/*for(var s in e){
												    		alert(s)
												    		alert(e[s])
												    		
												    	}*/
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
										    width:'100%',
										    cls: 'e-toolbar',
										    children: [
										            {type: 'button',
										            text: '根据所选数据修改创建',
										            onclick: function(e){
										            	var r = moduletree.getSelected();
										            	 if(r&&r.Version!=null){
										            		 parent.openNewTab2({id: 'lcamodulemanageCT', url: '', name: '创建数据'},{moduleid:r.id,productid:r.componentid})
										            		// window.open('js/lcc/qiche/qiche1_1.jsp?moduleid='+r.moduleid)
											                }else{
											                	alert('请选择一个模板！')
											                }
										            	
										            }   
										            
										        },
										        {
										            type: 'button',
										            text: '全新数据创建',
										            onclick: function(e){
										            	var r = moduletree.getSelected();
										                if(r){
										                	parent.openNewTab2({id: 'comment', url: '', name: '评价模板'},{})
												            //window.open('js/lcc/qiche/qiche1_1.jsp?moduleid='+r.moduleid)
										                }else{
										                    alert("请选择模板");
										                }
										              
										            }                
										            
										        },
										        ]
                                       	},
                                       	{type:'box',width: '100%',padding:[5,0,0,5],verticalGap:'10',
                                      	   border:[0,0,0,0],layout: 'horizontal',
                                      	   children:[
                                        {
					                	    type: 'tree',
						   			        width: '50%',
						   			        height: 300,
						   			        autoColumns:true,
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
									                    url: basePath+'lcc/lccmodule!getModuletree.action',
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
														        url: basePath+'lcc/lccmodule!getmoduleComponentsList.action',
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
									        },
									        columns:[
									            {   
									                enableDragDrop: true,
									                dataIndex: "name"
									            
						                        }
									            ],
						                     data:moduledata
									           
						            },
						            {
				                	    type: 'tree',
					   			        width: '50%',
					   			        height: 300,
					   			        autoColumns:true,
					   			        horizontalScrollPolicy:'off',
					   			        id: 'datatree',
					   			        enabelCellSelect: false,
								        enableDragDrop: true,
								        showHeader: false,
								        onbodymousedown: function(e){
								        },
								        columns:[
								            {
									            header: '数据集名称',
									            dataIndex: 'name',
									        },
									        {
									            header: '所属模板名称',
									            dataIndex: 'module',
									        },
									        {
									            header: '使用次数',
									            dataIndex: 'useamount',
									        },
									        {
									            header: '创建人',
									            dataIndex: 'person',
									        }
								            ],
					                     data:[{name:'数据集1',module:'汽轮机模板1',useamount:30,person:'王涛',children:[]},
					                         {name:'数据集2',module:'汽轮机模板1',useamount:12,person:'admin',children:[]},
					                         {name:'数据集3',module:'汽轮机模板1',useamount:20,person:'黄易',children:[]},{name:'模板自带数据集',module:'汽轮机模板1',useamount:20,person:'黄易',children:[]}
					                         ]
								           
					            }
						            ]},
						           /* {type:'box',width: '100%',padding:[5,0,0,5],verticalGap:'10',
                                 	   border:[0,0,0,0],layout: 'vertical',
                                 	   children:[
											{type : 'formitem',label : '模板名称:',labelWidth : 80,labelAlign : 'left',
											    children : [{type : 'label',width : 150,id : 'modulename'},{type : 'text',visible:false,width : 150,id : 'moduleid'}]
											},
											{type : 'formitem',label : '产品名称:',labelWidth : 80,labelAlign : 'left',
											children : [{type : 'label',width : 150,id : 'productname'}]
											},
											{type : 'formitem',label : '版本:',labelWidth : 80,labelAlign : 'left',
											children : [{type : 'label',width : 150,id : 'version'}]
											},
											{type : 'formitem',label : '构建人:',labelWidth : 80,labelAlign : 'left',
											children : [{type : 'label',width : 150,id : 'creatername'},{type : 'text',visible:false,width : 150,id : 'createrid'}]
											},
											{type : 'formitem',label : '构建时间:',labelWidth : 80,labelAlign : 'left',
											children : [{type : 'label',width : 150,id : 'createdate'}]
											},
											{type : 'formitem',label : '评分:',labelWidth : 80,labelAlign : 'left',
												children : [{type : 'label',width : 150,id : 'score'}]
												}
											
                                 	             ]
						            },*/
						            {
									    type: 'box',
									    width: '100%',
									    layout: 'horizontal',
									    padding:[10,0,0,0],border:[0,0,0,0],
									    children:[
								          {	type : 'formitem',label : '模型名称:',labelWidth : 100,labelAlign : 'center',
								       	    children : [{type : 'label',width : 200,id : 'modulename',text:'汽轮机模板1'}]
								       	},
								       	{type : 'formitem',label : '产品或零部件名称:',labelWidth : 110,labelAlign : 'center',
											children : [{type : 'label',width : 200,id : 'productname',text:'汽轮机'}]
											},
									              ]
								  },
								  {
								  	    type: 'box',
								  	    width: '100%',
								  	    layout: 'horizontal',
								  	    padding:[0,0,0,0],border:[0,0,0,0],
								  	    children:[
										{type : 'formitem',label : '版本:',labelWidth : 100,labelAlign : 'center',
											children : [{type : 'label',width : 200,id : 'version',text:'1'}]
											},
										{type : 'formitem',label : '评分:',labelWidth : 100,labelAlign : 'center',
											children : [{type : 'label',width : 200,id : 'score',text:'4.8'}]
											}      
								  	              ]
								      },
								  {
								  	    type: 'box',
								  	    width: '100%',
								  	    layout: 'horizontal',
								  	    padding:[0,0,0,0],border:[0,0,0,0],
								  	    children:[
										{type : 'formitem',label : '构建人:',labelWidth : 100,labelAlign : 'center',
											children : [{type : 'label',width : 200,id : 'creatername',text:'admin'},{type : 'text',visible:false,width : 150,id : 'createrid'}]
											},
										{type : 'formitem',label : '构建时间:',labelWidth : 100,labelAlign : 'center',
											children : [{type : 'label',width : 200,id : 'createdate',text:'2014-12-1 12:36:14.856000'}]
											}
								  	              ]
							      }
                                          ]
                            }
                               
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
