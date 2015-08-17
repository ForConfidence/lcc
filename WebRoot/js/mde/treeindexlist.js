/**
指标树界面
*/
function createTreeIndexList(product1Id, product2Id){
	var currentNode;	
	var currentNodes = new Array();	
	var selectedindexs = new Array();
	
	
	//从指标树接收数据
	var indextreeData = cims201.utils.getData('product/mdeindex!listTreeIndexNodes.action',{treeType:"indexTree"});
	var treeColumns = [
	                   {
					      header: '指标名称',
					      dataIndex: 'nodeName',
					      //复选框
					      //renderer:renderCascadeTree
					      renderer:function(v,r){
					    	  return '<div class="e-tree-checkbox"><div class="e-tree-check-icon  '+(r.checked ? 'e-table-checked' : '')+'"></div>'+v+'</div>';
					      }
					      
	                   	}							 				 
					 ];						 
	var myIndexTree = new createTree({},treeColumns,indextreeData,'multi',[],[],indexTreeSelectEvent,null);
	
	var myTree = myIndexTree.getMyTree();
	
	setDefaultTreeSelect();
	
	function setDefaultTreeSelect(){
		//设置初始选中
		var idSels = ['71', '1', '2', '3', '4', '5'];
	    var sels = [];
	    for(var i=0,l=idSels.length; i<l; i++){
	         var o = myTree.data.find({id: idSels[i]});
	         if(!o) continue;
	         sels.add(o);                
	         //加入指标选择结果集合
	         selectedindexs.add(o);
	         //并且展开选中的节点
	         var p = myTree.data.findParent(o);
	         myTree.data.expand(p);
	    }
	    //2.选中节点集合
	    setTreeSelect(myTree,sels, true, false ,'multi');
	};
	
	var treeIndex = Edo.create({                    
		type: 'box',        
	    width: '90%',
	    height: '100%',
	    border: [1,1,1,1],  
	    padding: [0,0,0,0],    						   
	    children: [
	       myIndexTree.getTree()
	    ]
     });
	
	var treebuttons = Edo.create({
		type: 'box',
		width: '100%',
	    height: '8%',
	    layout: 'horizontal', 
	    horizontalAlign:'center',
	    border:[0,0,0,0],
	    children: [
		{
		    type:'button',
		    text:'推荐',
		    width:60,
		    onclick:function(e){ 
		   	 selectedindexs = new Array();
		   	 //选中节点集合
		   	 var allsels = [];
		   	 for(var i=0; i<myTree.data.source.length; i++){
		   		 var ok = myTree.data.source[i];
		   		 if(!ok) continue;
		   		 //截图需要暂时修改！2013-1-22
		   		 if(ok.id!='73' & ok.id!='72' & ok.id!='66' & ok.id!='67' & ok.id!='68' & ok.id!='69' & ok.id!='70' & ok.id!='8'& ok.id!='10'& ok.id!='12'& ok.id!='16'& ok.id!='17'& ok.id!='18'& ok.id!='19'& ok.id!='22'& ok.id!='23'&  ok.id!='25'& ok.id!='26'& ok.id!='28' & ok.id!='29' & ok.id!='30'& ok.id!='31'	& ok.id!='34'& ok.id!='39'& ok.id!='40'& ok.id!='42'& ok.id!='43' & ok.id!='44'& ok.id!='47'& ok.id!='48'& ok.id!='50'& ok.id!='51'& ok.id!='52'& ok.id!='55'& ok.id!='57'& ok.id!='58'& ok.id!='60'& ok.id!='61'& ok.id!='63'& ok.id!='64'& ok.id!='65'){        			 
		   			 allsels.add(ok); 
		   			 //加入指标选择结果集合
		   			 selectedindexs.add(ok);
		   			 //并且展开选中的节点
		   			 var p = myTree.data.findParent(ok);
		   			 myTree.data.expand(p);
		   		 }
		   	 };
		   	    //2.选中节点集合
		   	 setTreeSelect(myTree,allsels, true, false ,'multi');
		   	 //Edo.MessageBox.alert("提示", "您选择了全部评价指标！");
		    }
		  },
	       {
	         type:'button',
	         text:'全选',
//	         text:'Check All',
	         width:60,
	         onclick:function(e){ 
	        	 selectedindexs = new Array();
	        	 //选中节点集合
	        	 var allsels = [];
	        	 for(var i=0; i<myTree.data.source.length; i++){
	        		 var ok = myTree.data.source[i];
	        		 if(!ok) continue;
	        		 //截图需要暂时修改！2013-1-22
//	        		 if(ok.id!='73' & ok.id!='72' & ok.id!='66' & ok.id!='67' & ok.id!='68' & ok.id!='69' & ok.id!='70' & ok.id!='8'& ok.id!='10'& ok.id!='12'& ok.id!='16'& ok.id!='17'& ok.id!='18'& ok.id!='19'& ok.id!='22'& ok.id!='23'&  ok.id!='25'& ok.id!='26'& ok.id!='28' & ok.id!='29' & ok.id!='30'& ok.id!='31'	& ok.id!='34'& ok.id!='39'& ok.id!='40'& ok.id!='42'& ok.id!='43' & ok.id!='44'& ok.id!='47'& ok.id!='48'& ok.id!='50'& ok.id!='51'& ok.id!='52'& ok.id!='55'& ok.id!='57'& ok.id!='58'& ok.id!='60'& ok.id!='61'& ok.id!='63'& ok.id!='64'& ok.id!='65'){        			 
	        			 allsels.add(ok); 
	        			 //加入指标选择结果集合
	        			 selectedindexs.add(ok);
	        			 //并且展开选中的节点
	        			 var p = myTree.data.findParent(ok);
	        			 myTree.data.expand(p);
//	        		 }
	        	 };
	        	    //2.选中节点集合
	        	 setTreeSelect(myTree,allsels, true, false ,'multi');	        	 
	        	 //Edo.MessageBox.alert("提示", "您选择了全部评价指标！");
	         }
	       },
	       {
	        type: 'button',
	        text: '重置',
	        width:60,
	        onclick:function(e){
	        	selectedindexs = new Array();
	        	//选中节点集合
	        	 var allsels = [];
	        	 for(var i=0; i<myTree.data.source.length; i++){
	        		 var ok = myTree.data.source[i];
	        		 if(!ok) continue;
	        		 allsels.add(ok); 	        		 
	        		//并且展开选中的节点
	       	         var p = myTree.data.findParent(ok);
	       	         myTree.data.expand(p);
	        	 };
	        	    //2.去除选中节点集合
	        	 setTreeSelect(myTree,allsels, false, false ,'multi');	        	 
	        	 //Edo.MessageBox.alert("提示", "重置！");
	        	 //设置初始选中
	        	 setDefaultTreeSelect();
	        }
	    }]
	});
	
	var panelbuttons = Edo.create({
		type: 'box',
		width: '100%',
	    height: '8%',
	    layout: 'horizontal', 
	    horizontalAlign:'center',
	    border:[0,0,0,0],
	    padding:[10,0,0,0],
	    children: [
						{
						 type: 'button',
						 width:60,
						 text: '上一步',
						 onclick: function(e){
								openNewTab('benefit', 'benefit', 
										"<div class=cims201_tab_font align=center>选择产品</div>", {btIcon:'cims201_statistics_icon_statisticswhole_small'});
						 }
						},
						{
						 type: 'button',
						 width:60,
						 text: '下一步',
						 onclick: function(e){
							//selectedindexs = new Array();
						 	selectedindexs.add(myIndexTree.getCurrentNodes());
						 	var benefitindexformvalue = Edo.util.Json.encode(selectedindexs); 
						    //alert(benefitindexformvalue); 
						 	//case1:保存用户所选指标
						//		cims201.utils.getData('product/mderesult!saveBenefitIndex.action', {
						//			benefitindexformvalue: benefitindexformvalue, product1Id: product1Id, product2Id: product2Id
						//		});
						//		openNewTab('weightInput', 'weightInput', 
						//				"<div class=cims201_tab_font align=center>权重分布</div>", {product1Id: product1Id, product2Id: product2Id,btIcon:'cims201_statistics_icon_statisticswhole_small'});
						 	//case2:不保存，传到权重分布页面
						 	
							//同样的两个产品只保留一次评价记录，暂时方案：清空result历史记录
							cims201.utils.getData('product/mderesult!already.action',{product1Id:product1Id, product2Id:product2Id});
						 	openNewTab('weightInput', 'weightInput', 
						 				"<div class=cims201_tab_font align=center>分配权重</div>", {benefitindexformvalue: benefitindexformvalue,product1Id: product1Id, product2Id: product2Id,btIcon:'cims201_statistics_icon_statisticswhole_small'});

						 	
						 		
						 }
						}
						
	               ]
	});
	
	var treeindexshow = Edo.create({
	    type: 'panel', 
	    title:'<span class="cims201_con_font">指标说明</span>',        
	    width:'100%',
	    height:'40%',
	    border: [1,1,1,1],  
	    padding: [0,0,0,0],  
	    horizontalScrollPolicy:'on',						    
	    children: []
	});
	var indexhistory = Edo.create({
	    type: 'panel', 
	    title:'<span class="cims201_con_font">指标历史权重</span>',        
	    width:'100%',
	    height:'60%',
	    border: [1,1,1,1],  
	    padding: [0,0,0,0],  
	    horizontalScrollPolicy:'on',						    
	    children: []
	});

	
	var treeIndexInput = Edo.build({
		type:'box',
		width:'100%',
  		height: '100%',
  	    verticalGap: 0, 
  	    border: [0,0,0,0],	
  	    padding:[0,0,0,0],
		children:[
		          {
		        	type: 'box', 
		      		width:'100%',
		      		height: '90%',
		      	    horizontalAlign:'center',
		      	    border: [0,0,0,0],	
		      	    padding:[0,0,0,0],
		      	    children:[
		                  {
		                          type: 'box', 
		      					  border: [0,0,0,0],
		      					  padding: [0,0,0,0],
		      					  width:'100%',
		      					  height: '100%',
		      					  layout: 'horizontal', 
		      					  horizontalGap:15,   
		      					  children: [	 
		      									{                    
		      										type: 'panel', 
		      									    title:'<span class="cims201_con_font">评价指标</span>',        
		      									    width: '30%',
		      									    height: '100%',
		      									    border: [1,1,1,1],  
		      									    padding: [0,0,0,0],    
		      									    layout: 'vertical', 
		      									    children: [
		      									               	treeIndex,
		      									               	treebuttons
		      									    ]
		      									 },					             	 
		      								     {
		      								     	 type: 'ct', 
		      										 border: [0,0,0,0],
		      										 padding: [0,0,0,0],
		      										 width:'70%',
		      										 height: '100%',
		      										 children: [
		      										             treeindexshow,
		      										             indexhistory		      										 		      												 
		      												 ]
		      								     }
		      								     
		      					            ]	
		                   },
		                   panelbuttons
		                  ]
		          }
		          
		          ]	
	    
	        });

	//指标说明
	function indexTreeSelectEvent(cn){
		treeindexshow.removeAllChildren();
    	currentNode = cn.id;    	
    	
    	var selecttree = cims201.utils.getData('product/mdeindex!listTreeIndex.action',{json:currentNode});
        
        var label_str = '';
//	 		label_str += '<a href=javascript:showHisInfo("'+selecttree.id+'","'+selecttree.nodeName+'");>';		 		
	 		label_str += '<a href=#';		 		
	   		label_str += '查看指标选择历史记录';
	   		label_str += '&nbsp</a>';								
        var oneTreeNode = Edo.create({			
    		 	type:'box',
				width:'100%',
				height:'100%',
    		 	layout: 'horizontal',  
    		 	//render:'treeindexshow',
    		 	children:[
    				 {type:'box',
    				 width:'100%',
    				 height:'100%',
    		 	     border: [1,1,1,1],
    			     padding: [2,2,2,2],
    			     verticalGap: 2, 
    			     layout: 'vertical',  
    		 		 children: [					
									{type:'label',text:'指标代号：'+selecttree.code},
									{type:'label',text:'指标名称：'+selecttree.nodeName},
									{type:'label',text:'指标说明：'+selecttree.nameForDetail},
									{type:'label',text:'备注：'+selecttree.nodeDescription},
									{type:'label',text:label_str}
    					]
    		 		 }	
    		 		]
    		 	
    		 	});	
        treeindexshow.set('title','<span style="color:red;">'+'['+selecttree.nodeName+']'+'</span>'+'<span class="cims201_con_font">指标说明</span>');
        treeindexshow.addChild(oneTreeNode);
        
        //指标历史权重
        indexhistory.removeAllChildren();
        var mySelectTreeHistoryList = createIndexHistorylist(cn.id);  
        indexhistory.set('title','<span style="color:red;">'+'['+selecttree.nodeName+']'+'</span>'+'<span class="cims201_con_font">指标历史记录</span>');
        indexhistory.addChild(mySelectTreeHistoryList);    
        
	}
	
	function createIndexHistorylist(nodeid){
//		var queryForm = {name:treetype,value:nodeid};		     
//		var searchlist = {searchlist: [queryForm]};
//	 	var queryFormStr = Edo.util.Json.encode(searchlist);
        var myTable = new createIndexHistoryList_table('product/mdeindex!indexHistorySearch.action',{json:nodeid}, [], []);
        var myklist = myTable.getIndexHistoryList().getTable();	
 	   
	    return myklist;
   
	};
	
	//指标历史列表
	function createIndexHistoryList_table(url, params, btNames, btFunctions){

		var myColumns = [
				 {
	             headerText: '序号',
//	             dataIndex: 'titleName',
	             headerAlign: 'center',  
	             width: '4%',               
	             align: 'center',
	             renderer: function(v, r, c, i, data, t){
	             	var outStr = i+1;
	             	return outStr;
	             }
	             },
	         		
				{header: '产品1', dataIndex: 'productaName',width:'20%', headerAlign: 'center',align:'center',
	                 renderer: function(v,r){
	                     	var title_outStr = '';
					if(v){
						if(v.length > 10){
							title_outStr += v.substring(0,10)+'...';
						}else{
							title_outStr += v;
						}
		             	var outStr = '';
		             	outStr += title_outStr;
	             	}
	             	return outStr;
	                }    
	                },                  
	                {header: '产品2', dataIndex: 'productbName',width:'20%', headerAlign: 'center',align:'center',                   
	                	renderer: function(v,r){
	                     	var title_outStr = '';
						if(v){
							if(v.length > 10){
								title_outStr += v.substring(0,10)+'...';
							}else{
								title_outStr += v;
							}
			             	var outStr = '';
			             	outStr += title_outStr;
		             	}
		             	return outStr;
	                	}    
	                },       
	                {header: '指标权重', dataIndex: 'indexWeight',width:'10%' ,headerAlign: 'center',align:'center',
	                	renderer: function(v){             
	                		return v;
	                	}                             
	                },       
	                {header: '产品1指标值', dataIndex: 'productaValue',width:'10%', headerAlign: 'center',align:'center', renderer:function(v){                            	
	                	return v;
	                }},
	                {header: '产品2指标值', dataIndex: 'productbValue',width:'10%' ,headerAlign: 'center',align:'center',
	                  renderer: function(v){             
	                   		return v;
	                   }                             
	                },       
	               
	                {header: '相对值', dataIndex: 'relativeValue',width:'10%' ,headerAlign: 'center',align:'center',
	                	renderer: function(v){             
	                		return v;
	                	}                             
	                },       
	                {header: '评价时间', dataIndex: 'createTime',width:'16%', headerAlign: 'center',align:'center',
	                	renderer: function(v){             
	                		return v;
	                	}                          
	                }
	                
	         
	     ];

		var myTable = new createTable({},'100%','100%','指标历史记录',myColumns,btNames,btFunctions,url, params,true,null);
		
		this.getIndexHistoryList = function(){
			return myTable;
		};
	};
	
	this.gettreeIndexInput=function(){
		return treeIndexInput;
	};

}


