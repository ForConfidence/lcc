function getstepseven(){
	var evaluationbox = Edo.build(
			
		    {
		    	type: 'box',
		    	width: 1100,
		    	height:'100%',
		    	border: [0,0,0,0],
		    	padding: [0,0,0,0],
		    	layout: 'vertical',
		    	verticalGap:'0',
		    	/*verticalAlign:'middle',
		    	horizontalAlign:'center',*/
		    	//style: 'background:white;',
		   	    children: [
						{id:'mainTabBar2',type: 'tabbar',selectedIndex: 0,border: [0,0,0,0],padding:[5,0,0,0],
			onselectionchange: function(e){        
		        mainTabContent2.set('selectedIndex', e.index);
		      },
		      children: [
				{type: 'button',width: 100, text: '计算模板评价', icon: 'e-icon-design'},
				{type: 'button',width: 120, text: '计算数据评价', icon: 'e-icon-manufacture'}
		               ]
		    },
	    {
	    	id: 'mainTabContent2',selectedIndex: 0,layout: 'viewstack',type: 'box',padding:[5,0,0,0],
	    	border: [1,0,1,1],width: '100%',height: '100%',verticalScrollPolicy: 'auto',verticalGap:'0',
	    	onselectionchange: function(e){
                alert('content-selected');},
            children: [
				{
				 type:"module",width: 900,height: '100%',style: 'border:0;',src:'js/lcc/goaldefinition.js'
				  },
			  {
			      type:"module",width:900,height: '100%',style: 'border:0;',src:'js/lcc/goaldefinition.js'
			    }
                       
                       
                       ]},
                       
					{
						type:'box',layout:'horizontal',width:'100%',padding:[10,0,0,0],border: [0,0,0,0],
						children:[
							{type: 'button',text: '上一步',style:'margin-left:100px;',width:80,height: 30,onclick: function(e){
									removeselected();
									openNewTab(stepdata.source[5]);
						        	}},
						        	 {type: 'button',text: '完成',width:80,height: 30,style:'margin-left:120px;',onclick: function(e){
								        	var c=document.getElementById('detaildiv');
								        	/*aa.refreshcelllabel(cell,levelmodule);
								        	c.style.width='0px';
								        	resetm2();
								        	cell.isedit=true;*/
								        	removeselected();
								        	}}

						]
	   	   	    	}
	   	   	      
					
			]});
	return evaluationbox;

	
	}
