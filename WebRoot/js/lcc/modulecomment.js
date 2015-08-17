
var comment=new createModuleCommentPanel(branchid);
comment.search({branchid:branchid},"comment/modulecomment!listComment.action");
var commentcontent=comment.getComment();
var moduledetail=cims201.utils.getData('lcc/lccmodule!getModuledetail.action',{branchid:branchid,moduleid:moduleid});
var ratingdata=cims201.utils.getData('comment/modulecomment!getRating.action',{branchid:branchid});
var resultscore=null;

function starJudge(index){	
	if(index){
		score=index;
		if(index == 5){
			module_view_score_judge.set('text','力荐');
		}else if(index == 4){
			module_view_score_judge.set('text','推荐');
		}else if(index == 3){
			module_view_score_judge.set('text','还行');
		}else if(index == 2){
			module_view_score_judge.set('text','较差');
		}else if(index == 1){
			module_view_score_judge.set('text','很差');
		}
	}
	
	    var res = cims201.utils.getData('comment/modulecomment!rating.action',{branchid:branchid, score:index});
		if(res.isSupport == true || res.isSupport == 'true' || res.isSupport == 1){
			Edo.get('totalscore_'+branchid).set('text','<span class="module_view_bigscore">'+index+'</span>');
			Edo.get('module_score_notice_'+branchid).set('text','<font color="#FF0000">您已经进行评分:</font>');
		    Edo.MessageBox.alert("提示", "评价成功", null);
		    resultscore=index;
		    getresultstar(resultscore,module_score_star);
		}
		/*else{
			Edo.MessageBox.alert("提示", "您已经评价过该知识了", null);
		}	*/
	
}
function onStarView(index){
	if(index){
		if(index == 5){
			module_view_score_judge.set('text','力荐');
		}else if(index == 4){
			module_view_score_judge.set('text','推荐');
		}else if(index == 3){
			module_view_score_judge.set('text','还行');
		}else if(index == 2){
			module_view_score_judge.set('text','较差');
		}else if(index == 1){
			module_view_score_judge.set('text','很差');
		}
	}
}
var module_score_star;
if(ratingdata.isSupport=="1"){
	resultscore=ratingdata.score;
	module_score_star=getresultstar();
}else{
	module_score_star=new starJudge_big(onStarView,starJudge,0).getBigStar();
}

var starbox=Edo.create({
	type:'box',
	border:[0,0,0,0],
	width:'100%',
	layout:'horizontal',
	children:[
	          {
	        	  id:'module_score_notice_'+branchid,
	        	  type:'label',
	        	  text:'<font color="#FF0000">您可以进行评分:</font>'
	          },
	          module_score_star,
	          {
	        	  id:'module_view_score_judge',
	        	  type:'label',
	        	  
	          },
	          {
	        	  id:'totalscore_'+branchid,
	        	  type:'label',
	        	  
	          }
	          
	      
	          ]
});
if(ratingdata.isSupport=="1"){
	Edo.get('module_score_notice_'+branchid).set('text','<font color="#FF0000">您已经进行评分:</font>');
	Edo.get('totalscore_'+branchid).set('text','<span class="module_view_bigscore">'+resultscore+'</span>');
}


Edo.build(
		{
			type: 'app',render: document.body,width: '100%',height:'100%',layout: 'vertical',padding:[0,0,0,0],verticalGaP:'0',
			children:[
					{
						    type: 'box',
						    width: '100%',
						    layout: 'horizontal',
						    padding:[10,0,0,0],border:[0,0,0,0],
						    children:[
					          {	type : 'formitem',label : '模板名称:',labelWidth : 100,labelAlign : 'center',
					       	    children : [{type : 'label',width : 200,id : 'modulename',text:moduledetail.name}]
					       	},
					       	{	type : 'formitem',label : '模板创建人:',labelWidth : 100,labelAlign : 'center',
					           	    children : [{type : 'label',width : 200,id : 'createuserid',text:moduledetail.creater}]
			           	    },
			           	    {	type : 'formitem',label : '版本:',labelWidth : 100,labelAlign : 'center',
				           	    children : [{type : 'label',width : 200,id : 'branchUUID',text:moduledetail.branchUUID}]
			           	    }
						              ]
					  },
					  {
					  	    type: 'box',
					  	    width: '100%',
					  	    layout: 'horizontal',
					  	    padding:[0,0,0,0],border:[0,0,0,0],
					  	    children:[
							{	type : 'formitem',label : '创建时间:',labelWidth : 100,labelAlign : 'center',
								    children : [{type : 'label',width : 200,id : 'date',text:moduledetail.createdate}]
								        } 
							  /* {	type : 'formitem',label : '版本号:',labelWidth : 100,labelAlign : 'center',
							   	    children : [{type : 'label',width : 200,id : 'version',text:'1'}]
							   	    } */   
					  	              ]
					      },
					  {
					  	    type: 'box',
					  	    width: '100%',
					  	    layout: 'horizontal',
					  	    padding:[0,0,0,0],border:[0,0,0,0],
					  	    children:[
							{	type : 'formitem',label : '模板评分:',labelWidth : 100,labelAlign : 'center',
								    children : [{type : 'label',width : 200,id : 'score',text:'4.8'}]
						    },
							
						    starbox
					  	              ]
				      },
				    {type: 'panel',title: '用户评价列表',width: '100%',padding:[0,0,0,0],
                   	   border:[1,0,0,0],verticalGap:'0',
                       children: [
								/*	{
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
												    text: '按时间',
												    onclick: function(e){
												    	
												    	
												    }                
												    
												}
										        ]
                           	}, */ 
                           	commentcontent
						/*	{
							 id: 'commenttable',
							 type: 'table',
							 style:'border-left:0',
							 width: '100%',
							 height:150,
							 editAction: 'click',
							 //data: qiche1Data,
							 verticalScrollPolicy:'auto',
							 columns:[
							     Edo.lists.Table.createMultiColumn(),
							     {header: '用户', dataIndex: 'person', width: '150',headerAlign: 'center',align: 'center'},        
							     {header: '评分', dataIndex: 'score', type: 'text', width: '150',headerAlign: 'center',align: 'center'},
							     {header: '评价时间', dataIndex: 'time', editor: 'text', width: '150',headerAlign: 'center',align: 'center'},
							     {header: '评语', dataIndex: 'detail', editor: 'text', width: '300',headerAlign: 'center',align: 'center'},
							     {header:'操作',dataIndex: 'updatetime', width: '150',headerAlign: 'center',align: 'center',
		                        	 renderer: function(v, r){
					                    	return '<span style="cursor: pointer;" onclick="">查看评价详情</span>';
					                    }
		                        	 }
							     
							 ],
							 data:[{person:'王涛',score:5,time:'2014-12-01 13:11:01',detail:''},{person:'吴征',score:5,time:'2014-12-01 13:11:30',detail:'用起来很方便'},{person:'刘能',score:4,time:'2014-12-01 13:12:11',detail:'有些数据不够准确'},{person:'张俊',score:4,time:'2014-12-01 13:13:24'},
		                           	{person:'李飞',score:4.5,time:'2014-12-01 13:15:04',detail:'模板比较不错'},
		                           	{person:'张楚',score:4.5,time:'2014-12-01 13:17:09',detail:'很好用'},
		                           	{person:'黄易',score:5,time:'2014-12-01 13:17:21',detail:''},
		                           	{person:'路飞',score:4.5,time:'2014-12-01 13:18:33'},
		                           	{person:'张帅',score:5,time:'2014-12-01 13:22:05'},
		                           	{person:'程飞',score:4,time:'2014-12-01 13:36:22'}]
							}*/
								]
				      }/*,
				      {type: 'panel',title: '我的评价',width: '100%',height: '100%',padding:[0,0,0,10],verticalScrollPolicy:'auto',
	                   	   border:[1,0,0,0],verticalGap:'0',
	                       children: [
		                     {
		     	                type: 'box',
		     	                width: '100%',
		     	               padding:[0,0,0,0],
		                   	   border:[0,0,0,0],
		                   	   layout:'horizontal',
		     	                children:[
		                          	{type:'label',width: 100,text:'模板准确性:'},       
		     				        {   
		     				        	type:'RadioGroup', 
		     				            repeatDirection: 'horizontal',
		     				            repeatItems: 5,
		     				            repeatLayout: 'table',       
		     				            itemWidth: '100px',
		     				            valueField: 'value',
		     				            data: [
		     				                {text: '1分', value: 1},
		     				                {text: '2分', value: 2},
		     				                {text: '3分', value: 3},
		     				                {text: '4分', value: 4},
		     				                {text: '5分', value: 5}
		     				            ]
		     				        }]
		     		        },
		     		       {
		     	                type: 'box',
		     	                width: '100%',
		     	               padding:[0,0,0,0],
		                   	   border:[0,0,0,0],
		                   	   layout:'horizontal',
		     	                children:[
		                          	{type:'label',width: 100,text:'模板易用性:'},  
		     				        {   
		     				        	type:'RadioGroup', 
		     				            repeatDirection: 'horizontal',
		     				            repeatItems: 5,
		     				            repeatLayout: 'table',       
		     				            itemWidth: '100px',
		     				            valueField: 'value',
		     				            data: [
		     				                {text: '1分', value: 1},
		     				                {text: '2分', value: 2},
		     				                {text: '3分', value: 3},
		     				                {text: '4分', value: 4},
		     				                {text: '5分', value: 5}
		     				            ]
		     				        }]
		     		        },
		     		       {
		     	                type: 'box',
		     	                width: '100%',
		     	               padding:[0,0,0,0],
		                   	   border:[0,0,0,0],
		                   	   layout:'horizontal',
		     	                children:[
		                          	{type:'label',width: 100,text:'默认数据准确性:'},  
		     				        {   
		     				        	type:'RadioGroup', 
		     				            repeatDirection: 'horizontal',
		     				            repeatItems: 5,
		     				            repeatLayout: 'table',       
		     				            itemWidth: '100px',
		     				            valueField: 'value',
		     				            data: [
		     				                {text: '1分', value: 1},
		     				                {text: '2分', value: 2},
		     				                {text: '3分', value: 3},
		     				                {text: '4分', value: 4},
		     				                {text: '5分', value: 5}
		     				            ]
		     				        }]
		     		        },
		     		       {
		     	                type: 'box',
		     	                width: '100%',
		     	               padding:[0,0,0,0],
		                   	   border:[0,0,0,0],
		                   	   layout:'horizontal',
		     	                children:[
		                          	{type:'label',width: 100,text:'模板知识:'},  
		     				        {   
		     				        	type:'RadioGroup', 
		     				            repeatDirection: 'horizontal',
		     				            repeatItems: 5,
		     				            repeatLayout: 'table',       
		     				            itemWidth: '100px',
		     				            valueField: 'value',
		     				            data: [
		     				                {text: '1分', value: 1},
		     				                {text: '2分', value: 2},
		     				                {text: '3分', value: 3},
		     				                {text: '4分', value: 4},
		     				                {text: '5分', value: 5}
		     				            ]
		     				        }]
		     		        },
		     		       {
		     	                type: 'ct',
		     	                width: '100%',
		     	               padding:[20,0,0,0],
		                   	  // border:[0,0,0,0],
		                   	   layout:'horizontal',
		     	               children:[
		                          	{type:'label',width: 100,text:'文字点评:'},  
		     				        {   
		     				        	type:'textarea', 
		     				        	width: 500,
		     				            height: 60
		     				            
		     				        },
		     				       {type: 'button',text: '提交',style:'margin-left:20px;margin-top:20px;'}]
		     		        }
		     		       ]
				      }*/
     		        ]
				      
		}
                   
);
if(ratingdata.isSupport=="1"){
	setscore(resultscore,module_score_star);
}

