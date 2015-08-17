var stepcount=0;
var data=[{id: 'stepone', url: 'module2.htm',index:0, func:getstepone,name: '1.基本信息'},
          {id: 'steptwo', url: 'module3.htm',index:1,func:getsteptwo, name: '2.输入资源'},
          {id: 'stepthree', url: 'module3.htm',index:2,func:getstepthree,name: '3.输出资源'}
          ];
//数据的备份
var processnamebackup=null;
var processnotebackup=null;
var inputmaterialbackup=null;
var outputmaterialbackup=null;
var kowledgebackup=null;

var stepdata = new Edo.data.DataTable().set('data', data);
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
function dataBackUp(){
	processnamebackup=levelmodule.levelmoduleobject.processname;
	processnotebackup=levelmodule.levelmoduleobject.processnote;
    inputmaterialbackup=cloneFun(levelmodule.levelmoduleobject.inputmaterial);
    outputmaterialbackup=cloneFun(levelmodule.levelmoduleobject.outputmaterial);
}
function getprocessdetaildefine(){
	Edo.build(
			{
				id:'processmain',
				type: 'app',
				width: '100%',
				layout: 'vertical',
				render: document.getElementById('detaildiv'),	
				style:'background:#B5E3E0',
				padding:[0,0,0,0],
				children:[
	                      //顶栏描述
				          {
				        	  type: 'ct',
				        	  width: '100%',
				        	  height: 30, 
				        	  layout: 'horizontal',	
				        	  padding:[0,0,0,0],
				        	  children:[
				        	            {
				        	              type:   'label',width:200,height: '100%',
				      		              style:  'font-size:16px;font-family:微软雅黑, 宋体, Verdana;padding-left:10px;padding-top:10px;font-weight:bold; ',
				      		              text: '过程信息定义'
				        	            },
				        	            {
				        	            	type:'space',width:500,height: '100%',	
				        	            },
				        	            {
				        	            	type: 'label', text: '退出', style:  'font-size:12px;cursor:pointer;padding-top:10px;font-weight:bold; ',onclick: function(e){
			        	            		if(!cell.isedit){
			        	            			levelmodule.levelmoduleobject.processname=processnamebackup;
			        		       		        levelmodule.levelmoduleobject.processnote=processnotebackup;
			        		       		        levelmodule.levelmoduleobject.knowledge=null;
			        		       		        levelmodule.levelmoduleobject.inputmaterial=inputmaterialbackup;
			        		       		        levelmodule.levelmoduleobject.outputmaterial=outputmaterialbackup;
			        		       		        levelmodule.levelmoduleobject.evaluationmethod=null;
			        	            		}
				        	            	var c=document.getElementById('detaildiv');
								        	c.style.width='0px';
								        	resetm2();
								        	removeselected();
								        	}
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
				                        	id:'processleftPanel',
				                        	type: 'panel',
				                            title: '导航列表',
				                            width: 150,
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
		                                    	  type: 'table', 
		                                    	  id:'steptable',
			                                      autoColumns: true, 
			                                      headerVisible: false,
			                                      width: '100%', height: '100%',
			                                      style:'border:0;',
			                                      verticalLine: false, 
			                                      horizontalLine: false, 
			                                      rowHeight: 25,
			                                      columns: [
	                                                 {
	                                            	 header: '导航树',
	                                                 dataIndex: 'url',
	                                                 renderer: function(v, r){
	                                                    return (r.checked?'<font color="red">'+r.name+'</font>':r.name);	}
	                                                }],
				                                    data:stepdata,
	                                  	             onselectionchange: function(e){  
			  	                                        var r = e.selected;
			  	                                        if(r){
			  	                                        	openNewTab(r);
			  	                                            mainTabBar.set('selectedIndex', mainTabBar.children.length);                                            
			  	                                        }
			  	                                    }
					                                      }
					                                    ]
				                        },
				                        
				                        //右主界面
				                        {
				                        	id:'processmainPanel',
				                        	type: 'ct',width: '100%',height: '100%',verticalGap: 0,padding:[0,0,0,0],
				                        	children:[
				                        		{id:'mainTabBar',type: 'tabbar',selectedIndex: 0,border: [0,0,0,0],padding:[0,0,0,0],width: '100%',
				                        		onselectionchange: function(e){        
				                                    mainTabContent.set('selectedIndex', e.index);
				                                    stepcount=e.index;
				                                  }
				                        	    },
				                        	    {
			                        	    	id: 'mainTabContent',selectedIndex: 0,layout: 'viewstack',type: 'box',padding:[0,0,0,0],
			                        	    	border: [1,1,1,1],width: '100%',height: '100%',
			                        	    	onselectionchange: function(e){
			                                        alert('content-selected');}
				                        	    }
				                        	   
				                        	]
				                        }
				                        ]
				          }
				          ]
			});
	openNewTab(stepdata.source[0]);
	updatesteptabledata('stepone');
	
}
function updatesteptabledata(index){
	steptable.data.beginChange();
	steptable.data.source.each(function(r){     
        if(r.id==index){
        	steptable.data.source.each(function(r1){     
        		steptable.data.update(r1,'checked',false);
        	});
        	steptable.data.update(r,'checked',true);
        	steptable.data.endChange();
        	return;
        };
    });
}
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
    
    var content =mainTabContent.addChildAt(idx,
      {
        id:'cont_'+id,type:"box",width: '100%',height: '100%',style: 'border:0;',padding:[0,0,0,0]
      }
    );    
   content.addChild(new r.func());
  };
  mainTabBar.set('selectedItem', c);
    
};
function removeselected(){
	 mainTabContent.getChildAt(mainTabContent.selectedIndex).destroy();
	 mainTabBar.getChildAt(mainTabBar.selectedIndex).destroy();
    
}

