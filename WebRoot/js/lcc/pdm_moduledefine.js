

function getPDMmoduledefine(){
	var func=function(id){
		moduleobj.modulename=Edo.get('mdname').text;
		moduleobj.modulenote=Edo.get('mdnote').text;
 	}
	    var content=new getprojectdef();
	    var toolbar=new gettoolbar2(null,func);
 	    var win=cims201.utils.getWin(400,200,'填写模板信息',[content,toolbar]);
	    win.show('center', 'middle', true);
		   
}

function gettoolbar2(id,func){
    var toolbar = Edo.create(
    {type: 'ct',
    cls: 'e-dialog-toolbar',
    width: '100%',
    layout: 'horizontal',
    height: '30%',
    horizontalAlign: 'center',
    verticalAlign: 'middle',
    horizontalGap: 10,
    children: [
               
        {
            type: 'button',
            text: '确定',
            minWidth: 70,
            onclick: function(e){
            if(func==undefined){
            }else{
            func(id);
            }
            this.parent.parent.parent.destroy();
            new modulepaneldefine();
            createmb();
            delivermoduleobject();
            }
        },{
            type: 'button',
            text: '取消',
            minWidth: 70,
            onclick: function(e){
            this.parent.parent.parent.destroy();

            }
        }
    ]
});
return toolbar;
}
function getprojectdef(){
	
	var content = Edo.create(
	    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
       	    children: [
       	    //				           
       	    {	type : 'formitem',label : '模板名称:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'mdname'}]
       	    },
       	    {	type : 'formitem',label : '模板备注:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'mdnote'}]
       	    }
       	   
       	    ]
       	});
       	return content;
       	
       	}