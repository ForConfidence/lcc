var leftpaneldiv=document.getElementById('leftpanel');
var builderdiv=document.getElementById('builder');
var detaildiv=document.getElementById('detaildiv');
var taskdetail= cims201.utils.getData("../lcc/task!getMytaskdetail.action",{taskid:taskid});
var moduleobj={
		moduleid:taskdetail.moduleid,
		compname:taskdetail.compname,
		processid:taskdetail.processid,
		taskid:taskid,
		taskname:taskdetail.name
}
function gettaskdetail(){
	aa.initmodule(moduleobj);
}
var cell=null;
var levelmodule=null;
Edo.create({
	  type: 'ct',
	  height: '40', 
	  layout: 'horizontal',
	  render:document.getElementById('topbar'),
	  children:[
	            {
	              type:   'label',width:200,height: '100%',
	              style:  'font-size:20px;padding:5px;padding-top:8px;font-family:微软雅黑, 宋体, Verdana;font-weight:bold; ',
	              text: '执行模板创建任务'
	            },
	            {
	            	type:'space',width:1000,height: '100%',	
	            },
	            {
	            	type: 'label', text: '您好, 王涛 <a href="#" style="color:black;text-decoration:none;">退出</a>'
	            }
	            ]
          });
Edo.create(
		{
        	id:'leftPanel',
        	type: 'panel',
            title: '任务详细信息',
            width: 260,
            height: 600,
            verticalGap:'10',
            border:[1,0,0,0],
		    padding:[10,0,0,10],
            collapseProperty: 'width',
            enableCollapse: true,
            layout:'vertical',
            render:document.getElementById('leftpanel'),
            titlebar:[
                      {
                          cls:'e-titlebar-toggle-west',
                          icon: 'button',
                          onclick: function(e){
                        	  leftpaneldiv.style.width='0px';
                        	  builderdiv.style.left='0px';
                        	  if( detaildiv.style.width!='0px'){
                        		  detaildiv.style.width=builderdiv.offsetWidth-40;
                        	  }
                        	  createsb();
                        	  resetm1();
                        	  
                        	  }
                      }
                      ],
            children:[
					{type : 'formitem',label : '任务名称:',labelWidth : 80,labelAlign : 'left',
						    children : [{type : 'text',width : 150,text:taskdetail.name,id : 'taskname'}]
				    },
				    {type : 'formitem',label : '构建零件:',labelWidth : 80,labelAlign : 'left',
					    children : [{type : 'text',width : 150,id : 'compname',text:taskdetail.compname}]
				    },
				    {type : 'formitem',label : '执行人:',labelWidth : 80,labelAlign : 'left',
					    children : [{type : 'text',width : 150,text:taskdetail.Carrier,id : 'processperson'}]
				    },
				    {type : 'formitem',label : '模型编号:',labelWidth : 80,labelAlign : 'left',
					    children : [{type : 'text',width : 150,text:taskdetail.moduleid,id : 'moduleid'}]
				    },
				    {type : 'formitem',label : '创建时间:',labelWidth : 80,labelAlign : 'left',
					    children : [{type : 'text',width : 150,text:taskdetail.Createdate,id : 'createdate'}]
				    }
					                      
           
                        ]
		});

function createsb(){
	 var sb=document.getElementById('stagebutton');
	 sb.style.width='20px';
	 sb.style.height='150px';
	 var e = document.createElement("input");  
    e.type = "button";
    //e.style.top='200px';
    e.style.width='20px';
    //e.style.height='400px';
    e.style.left='0px';
    e.style.position='absolute';
    e.value = '查\n看\n任\n务\n详\n情\n';  
    e.onclick=function(){
   	 sb.removeChild(e);
   	if( detaildiv.style.width!='0px'){
   		movep1();
   	}else{
   		movep();
   		
   	}
   	
   	
    }
    sb.appendChild(e);
}
//a.addEventListener('mouseover', movep, false);
var t1;
var m1=0;
 //展开零件信息panel
function movep(){ 
	if(m1<260){
	     m1=m1+20;
		 leftpaneldiv.style.width=m1;
		 builderdiv.style.left=m1;
		 t1=setTimeout('movep()',10);

	}
}
function movep1(){
	if(m1<260){
	 m1=m1+20;
	 leftpaneldiv.style.width=m1;
	 detaildiv.style.width=detaildiv.offsetWidth-20;
	 builderdiv.style.left=m1;
	 t1=setTimeout('movep1()',10);

	}
}
function resetm1(){
	m1=0;
}
var t2;
var m2=0;
function movec(width){ 
	 if(m2<width){
	 m2=m2+40;
	 detaildiv.style.width=m2;
	 t2=setTimeout('movec('+width+')',8);
}
}
function resetm2(){
m2=0;
}
function showdetail(editcell,module){
	movec(builderdiv.offsetWidth-40);
	cell=editcell;
	levelmodule=module;
	if(!Edo.get('processmain')){
		new getprocessdetaildefine();
		
	}else{
		openNewTab(stepdata.source[0]);
		updatesteptabledata('stepone');
	}
	
}