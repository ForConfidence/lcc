function createIndexSelectHome() {
		
	
	var parameterbox = Edo.create({
		type: 'box',
		id: 'parameterbox',
		border : [0,0,0,0],
		padding : [0,0,0,0],
		width: '100%',
        height: '50%',
		//render: document.body,
		verticalScrollPolicy: 'auto',
		layout: 'horizontal',
		horizontalAlign: 'center', 
		children: [
					{
		        	   type:'text',
		        	   style:'border:0px;',
		        	   textStyle:'font-weight:bold;font-size:20px;',
		        	   readOnly:true,
		        	   text:'提高企业反映速度（T）',
		        	   width:400,
		        	   height:200,
		        	   horizontalAlign: 'center'
					},
					(tree),
		          ]
	});    	   	
	
	var buttons =Edo.create({
		type: 'box',
		id: 'buttons',
		border: [0,0,0,0],
    	padding: [10,0,0,10],
    	layout: 'vertical',
    	horizontalAlign: 'center', 
		verticalGap:10,
		children: [
        	{
	        	type: 'button',
	        	text: '全选',
	        	onclick: function(e){
	        		alter("全选");
					
    			}   
    		},
    		{
	        	type: 'button',
	        	text: '反选',
	        	onclick: function(e){
	        		alter("反选");
					
    			}   
    		},
    		{
	        	type: 'button',
	        	text: '重置',
	        	onclick: function(e){
	        		alter("重置");
					
    			}   
    		},
    		{
	        	type: 'button',
	        	text: '提交',
	        	onclick: function(e){
	        		alter("提交");
					
    			}   
    		},
    	]
    }
);	
	
	var inputbox = Edo.create({
		type: 'box',
		id: 'inputbox',
		border : [1,1,1,1],
		padding : [0,0,0,0],
		width: '100%',
        height: '100%',
		//render: document.body,
		verticalScrollPolicy: 'auto',
		layout: 'vertical',
		children: [
		           {
		        	   type:'text',
		        	   style:'border:0px;',
		        	   textStyle:'font-weight:bold;font-size:20px;',
		        	   readOnly:true,
		        	   text:'模块化设计效益评价',
		        	   width:400,
		        	   height:200,
		        	   horizontalAlign: 'center'
		           },
		           {
		        	   type:'text',
		        	   style:'border:0px;',
		        	   textStyle:'font-weight:font-size:10px;',
		        	   readOnly:true,
		        	   text:'（请选择与产品相关的模块化效益评价参数）',
		        	   width:400,
		        	   height:100,
		        	   horizontalAlign: 'center' 
		           },
		           (parameterbox),
		           (buttons),
		           ]
	});    	   	
	
	this.getIndexSelectHome = function() {
		return inputbox;
	}
}