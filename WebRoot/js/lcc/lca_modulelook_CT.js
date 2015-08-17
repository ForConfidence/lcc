var moduleobj={
		moduleid:null,
		modulename:null,
		Createdate:null,
		Version:null,
		createuserid:null
		}
function createcompmodule(width){
	var sb=document.getElementById('stagebutton');
	sb.style.width='0px';
	movep(width);
}
var c=document.getElementById('moduledefineContainer');
var t;
var m=0;
//展开模型信息panel
function move(){ 
	     if(m<200){
	         m=m+10;
			 c.style.width=m;
			 t=setTimeout('move()',10);
	     }
     	
}
//重置宽度计数m
function resetm(){
	m=0;
}
var a=document.getElementById('productContainer');
//a.addEventListener('mouseover', movep, false);
var t1;
var m1=0;
 //展开零件信息panel
function movep(width){ 
		if(m1<width){
     m1=m1+20;
	 a.style.width=m1;
	 t1=setTimeout('movep('+width+')',1);

	}
}
function resetm1(){
	m1=0;
}
   //创建查看模型信息按钮
function createmb(){
    var mb=document.getElementById('modulebutton');
	 mb.style.width='20px';
	 mb.style.height='100px';
	 var e1 = document.createElement("input");  
     e1.type = "button";
     //e.style.top='200px';
     e1.style.width='20px';
     e1.style.height='100px';
     e1.style.right='0px';
     e1.style.position='absolute';
     e1.value = '查\n看\n模\n型\n';  
     e1.onclick=function(){
    	 mb.removeChild(e1);
    	 move();
     }
     mb.appendChild(e1);	
}
//构建零部件树信息
function lcatreedivdefine(){
   var a=document.getElementById('productContainer');
   a.style.width=0;
    Edo.create(
		              
    {
    id:'treect',
    type: 'panel',
   	title: '选择产品类别',
    width: 300,
    height: 600,
    verticalGap:'0',
    horizontalGap:'0',
		padding:[0,0,0,0],
	render: a,
    collapseProperty: 'width',
    enableCollapse: true,
    layout:'horizontal',
    titlebar:[
       {
        cls:'e-titlebar-toggle-west',
        icon: 'button',
			onclick: function(e){
            if(a.style.width!="0px"){
            a.style.width="0px";
            resetm1();
            createsb();
        	}
        }
        }
    ]
          }
		        
    );

   }
var b=document.getElementById('builder');
var t2;
var m2=0;
var componentTree = Edo.create({
    type: 'tree',
    width: '100%',
    height: '100%',
    horizontalScrollPolicy:'off',
    verticalLine:false,
    horizontalLine:false,
    id: 'componentTree',
    onbodymousedown: function(e){
    	var r = this.getSelected();
    	aa.getmoduletreegraph(r)
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
}); 
Edo.util.Ajax.request({
    type: 'post',        
    url: basePath+'lcc/lccmodule!getComponentList.action',
    params: {
        parentId: '0'   //传递父节点的Name(也可以是ID)
    },
    onSuccess: function(text){
        var data = Edo.util.Json.decode(text);
       
        Edo.get('componentTree').set('data', data);
    }
    
});
function createsb(){
	 var sb=document.getElementById('stagebutton');
	 sb.style.width='20px';
	 sb.style.height='100px';
	 var e = document.createElement("input");  
   e.type = "button";
   //e.style.top='200px';
   e.style.width='20px';
   e.style.height='100px';
   e.style.left='0px';
   e.style.position='absolute';
   e.value = '选\n择\n产\n品\n';  
   e.onclick=function(){
  	 sb.removeChild(e);
  	 movep(300);
   }
   sb.appendChild(e);
}
new lcatreedivdefine();
Edo.get('treect').addChild(componentTree);
/*createcompmodule(300);*/
createsb()
//bbl
