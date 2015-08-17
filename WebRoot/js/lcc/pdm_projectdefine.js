
var moduleid;
var cellcollection=new Array();
function getPDMprojectdefine(){
	var func=function(id){
		projectobjectdefine.projectname=Edo.get('pjname').text;
		projectobjectdefine.projectdetail=Edo.get('pjdetail').text;
		projectobjectdefine.starttime=Edo.get('starttime').text;
		projectobjectdefine.finishtime=Edo.get('finishtime').text;
		var moduledata= cims201.utils.getData('module/module!getModuletreebytype.action',{moduletype:'PDM'});
	    Edo.get('moduletree').set('data',moduledata);
 	}
	    var content=new getprojectdef();
	    var toolbar=new gettoolbar(null,func);
 	    var win=cims201.utils.getWin(400,200,'填写项目信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	    
		   
}

function getprojectdef(){
	
	var content = Edo.create(
	    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
       	    children: [
       	    //				           
       	    {	type : 'formitem',label : '项目名称:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'pjname'}]
       	    },
       	    {	type : 'formitem',label : '项目备注:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'pjdetail'}]
       	    },
       	    {	type : 'formitem',label : '开始时间:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'date',width : 200,id : 'starttime'}]
       	    },
       	    {	type : 'formitem',label : '结束时间:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'date',width : 200,id : 'finishtime'}]
       	    }
       	   
       	    ]
       	});
       	return content;
       	
       	}