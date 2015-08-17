//var newnewalldata;
//var datareusltname = new Array();
//var datareusltvalue = new Array();
//var processnamelist = new Array();
//function addnewbar(data) {
//	//alert('ok');
//	for(var j=0;j<data.length;j++){
//		var str = data[j].name;
//		var bar = Edo.create(
//				{id:data[j].eng,type:'button',width:'120',text:data[j].name}
//		);
//		Edo.get('processTabBar').addChild(bar);
//		
//		var result = eval(data[j].result);
//		for(var index in result){
//			datareusltname.add(index);
//			datareusltvalue.add(result[index]);
//		}
//		alert(datareusltname); 
//		processnamelist.add(data[j].name);
//	}
//} 

function getstepsix(){
	//alert(newalldata);
	//newnewalldata=Edo.util.JSON.decode(newalldata);
	var resultbox = Edo.build(
		{
	    	type: 'box',
	    	width: 1100,
	    	height:'100%',
	    	border: [0,0,0,0],
	    	padding: [0,0,0,0],
	    	layout: 'horizontal',
	    	horizontalGap:'0',
	    	/*verticalAlign:'middle',
	    	horizontalAlign:'center',*/
	    	//style: 'background:white;',
	   	    children: [
	   	               
	   	               
{
    
    type: 'tree',
    width: 200,
    height:'100%',
    style:'border-left:0',
    autoColumns:true,
    headerVisible: false,
    verticalLine:false,
    horizontalLine:false,
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
                	moduleid:solution.moduleid,
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
{
	type: 'box',
	width: '100%',
	height:'100%',
	border: [0,0,0,0],
	padding: [0,0,0,0],
	layout: 'vertical',
	verticalGap:'0',
	/*verticalAlign:'middle',
	horizontalAlign:'center',*/
	//style: 'background:white;',
	    children: [	
	               {type:'ct',width:'100%',height:'10%',layout:'vertical',
	            	   children:[
	                             {type:'label',text:'研究对象'+newalldata.modulename,width:'50%',height:'50%'},
	                             {type:'ct',width:'100%',height:'50%',layout:'horizontal',
	                              children:[
	                                        {type:'label',text:'请选择LCIA方法'},
	                                        {type:'combo',id:'lciamethod',width:'130',displayField: 'label', 
	            				       			valueField: 'value',
	                                         data:[
	                                               {label: 'CML', value: '1'},
	                                               {label: 'Eco-indicator', value: '2'}
	                                               ]
	                                        },
	                                        {type: 'split'},
	                                        {type:'label',text:'请选择影响指标'},
	                                        {type:'combo',id:'impactcategory',width:'130',displayField: 'label', 
	            				       			valueField: 'value',
	                                         data:[
	                                               {label: '环境影响总值', value: '1'},
	                                               {label: '碳足迹', value: '2'}
	                                               ]
	                                        },
	                                        {type: 'split'},
	                                        {type:'button',text:'开始计算',
	                                        	onclick: function() {
	                                        		if(Edo.get('processTabBar').numChildren()>1) {
	                                        			alert('已计算，如需计算请点击重新计算！');
	                                        		}else {
	                                        			if((Edo.get('lciamethod').text!="")&&(Edo.get('impactcategory').text!="")){
	                                        				alert(Edo.get('lciamethod').getValue());
	                                        				alert(Edo.get('impactcategory').getValue());
	                                        				alert(newdatasetUUID);
	                                        				alert(newmoduleid);
	                                        				/*var data = cims201.utils.getData("lcc/lccmodule!doCalculate1.action",
	                                        						{lciamethod:Edo.get('lciamethod').getValue(),impactcategory:Edo.get('impactcategory').getValue(),moduleid:newmoduleid,datasetUUID:newdatasetUUID});*/
	                                        				//alert('ok'+data.length);
	                                        				Edo.get('everyprocessResult').set("src",'lcc/indexpage!lcaReport.action?lciamethod="'+Edo.get('lciamethod').getValue()+'"'+'&impactcategory='+Edo.get('impactcategory').getValue()+
	                                        						'&moduleid='+newmoduleid+'&newdatasetid='+newdatasetid+'&modulename='+newalldata.modulename);
	                                        				//addnewbar(data);
	                                        			}else {
	                                        				alert('请填写完整！');
	                                        			}
	                                        		}
	                                        	}
	                                        },
	                                        {type: 'split'},
	                                        {type:'button',text:'重新计算'},
	                                        {type: 'split'},
	                                        {type:'search', width:'130',
	            					        	id: 'searchfactor',
	            					        	ontrigger: function(e){
	            					            this.set('clearVisible', true);
	            					            	if(Edo.get('searchfactor').getValue()!=""){
	            					            		
	            					            	}else{
	            					            		alert('请选择搜索内容！');
	            					            	}
	            					        	},
	            					        	oncleartrigger: function(e){
	            					        		Edo.get('searchfactor').resetValue();
	            					        	}
	            					        }
	                                        ]	 
	                             }
	                            ]},
	               {type:'box',width:'100%',height:'85%',
	            	   children:[
	            	             {id:'processTabBar',type: 'tabbar',selectedIndex: 0,border: [0,0,0,0],padding:[5,0,0,0],
	            	            	 onselectionchange: function(e){      
	            	            		 alert('ok');
	            	            		//mainTabContent2.set('selectedIndex', e.index);
	            	            		
	            	            	 },
	            	            	 children:[
	            	            	           {type: 'button',id:'allprocess',width: 120, text: '评价结果显示', icon: 'e-icon-recycle',
	            	            	           }
	            	            	           ]
	            	             },
	            	             {
	            	            	id: 'everyprocessResult',type:'module',width: '100%',height: '100%',border:[0,0,0,0],padding:[0,0,0,0],verticalScrollPolicy: 'off'
	            	        		
	            	             }
	            	             ]
	               },
	               {
						type:'box',layout:'horizontal',width:'100%',padding:[0,0,0,0],border: [0,0,0,0],height:'5%',
						children:[
							{type: 'button',text: '上一步',style:'margin-left:400px;',width:80,height: 30,onclick: function(e){
								removeselected();
									openNewTab(stepdata.source[4]);
						        	}},
					        {type: 'button',text: '下一步',width:80,height: 30,style:'margin-left:420px;',onclick: function(e){
					        	removeselected();
						       	 openNewTab(stepdata.source[6]);
					        	}
					        }
						]
	   	   	       }
	              ]
}

	   	               
	   	               ]}
		
		
		
		    );
Edo.util.Ajax.request({
    type: 'post',        
    url: 'lcc/lccmodule!getmoduleComponentsList.action',
    params: {
       parentId: null,   //传递父节点的Name(也可以是ID)
       id:solution.componentid,
       moduleid:solution.moduleid
   },
    onSuccess: function(text){
       // alert(text);
        var data = Edo.util.Json.decode(text);
        Edo.get('componentmodelTree').set('data', data);
    }
    
});
	return resultbox;

	
	}
