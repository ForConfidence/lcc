function createBenefitHome() {
	
	var product1 =Edo.create({
	    type: 'box', 
	    id: 'product1',
	    border: [0,0,0,0],
	    padding: [10,0,0,0],
		//width: '100%',
        //height: '100%',
		verticalScrollPolicy: 'auto',
		layout: 'vertical',
	    children: [
	        
	        {
				type: 'formitem',
				layout: 'horizontal',						
				label: '产品1名称:',
				labelStyle: 'font-weight:bold;font-size:16px;',
				labelWidth: 100,
				padding: [10,0,0,0],
	            children: [
	                {
	                    type: 'text'
	                }
	            ],
	        },
	        {
	        	type: 'formitem',
				layout: 'horizontal',
	            label: '产品1型号:',
	            labelAlign: 'right',
	            labelStyle: 'font-weight:bold;font-size:16px;',
				labelWidth: 100,
				padding: [10,0,0,0],
	            children: [
	                {
	                    type: 'text'
	                }
	            ],
	        },
	        {
	        	type: 'formitem',
				layout: 'horizontal',
	            label: '公司名称:',
	            labelAlign: 'right',
	            labelStyle: 'font-weight:bold;font-size:16px;',
				labelWidth: 100,
				padding: [10,0,0,0],
	            children: [
	                {
	                    type: 'text'
	                }
	            ],
	        }
	    ],
	    
	});
	
	var product2 =Edo.create({
	    type: 'box', 
	    id: 'product2',
	    border: [0,0,0,0],
	    padding: [10,0,0,40],
		//width: '100%',
        //height: '100%',
		verticalScrollPolicy: 'auto',
		layout: 'vertical',
	    children: [
	        
	        {
				type: 'formitem',
				layout: 'horizontal',						
				label: '产品2名称:',
				labelStyle: 'font-weight:bold;font-size:16px;',
				labelWidth: 100,
				padding: [10,0,0,0],
	            children: [
	                {
	                    type: 'text'
	                }
	        
	            ],
	        },
	        {
	        	type: 'formitem',
				layout: 'horizontal',
	            label: '产品2型号:',
	            labelAlign: 'right',
	            labelStyle: 'font-weight:bold;font-size:16px;',
				labelWidth: 100,
				padding: [10,0,0,0],
	            children: [
	                {
	                    type: 'text'
	                }
	            ],
	        },
	        {
	        	type: 'formitem',
				layout: 'horizontal',
	            label: '公司名称:',
	            labelAlign: 'right',
	            labelStyle: 'font-weight:bold;font-size:16px;',
				labelWidth: 100,
				padding: [10,0,0,0],
	            children: [
	                {
	                    type: 'text'
	                }
	            ],
	        }
	    ],
	    
	});
	
	var inputbuttons =Edo.create({
        		type: 'box',
        		id: 'inputbuttons',
        		border: [0,0,0,0],
	        	padding: [10,0,0,10],
	        	layout: 'vertical',
	        	horizontalAlign: 'center', 
	    		verticalGap:10,
        		children: [
		        	{
			        	type: 'button',
			        	text: '模块化设计效益评价参数输入',
			        	onclick: function(e){
//			        		var product1_data = product1.getForm();
//			        		var products = Edo.util.Json.encode(product1_data);
//			        		cims201.utils.getData('product/product!mde.action', 
//									{products: products}
//								);
							openNewTab('cims201_mde', 'parameterSelect', 
										"<div class=cims201_tab_font align=center>效益评价参数选择</div>", {products: products,btIcon:'cims201_statistics_icon_statisticswhole_small'});
							
	        			}   
	        		},
		        	{
			        	type: 'button',
			        	text: '模块化设计程度评价参数输入',
			        	onclick: function(e){
			        		var o = this.parent.parent.getForm();
			        		var products = Edo.util.Json.encode(o);
//							alert(products); //可以用ajax发送到服务端
							cims201.utils.getData('product/product!mde.action', 
								{products: products}
							);
							openNewTab('showMdeResult', 'mdeResult', 
									"<div class=cims201_tab_font align=center>结果输出</div>", {products: products,btIcon:'cims201_statistics_icon_statisticswhole_small'});
	        			}   
	        		},
		        	{
			        	type: 'button',
			        	text: '模块化设计综合评价',
			        	onclick: function(e){
			        		var o = this.parent.parent.getForm();
			        		var products = Edo.util.Json.encode(o);
//							alert(products); //可以用ajax发送到服务端
							cims201.utils.getData('product/product!mde.action', 
								{products: products}
							);
							openNewTab('showMdeResult', 'mdeResult', 
									"<div class=cims201_tab_font align=center>结果输出</div>", {products: products,btIcon:'cims201_statistics_icon_statisticswhole_small'});
	        			}   
	        		}
	        	]
	        }
        );	


	var inputproducts = Edo.create({
		type: 'box',
		id: 'inputproducts',
		border : [0,0,0,0],
		padding : [0,0,0,0],
		width: '100%',
        height: '50%',
		//render: document.body,
		verticalScrollPolicy: 'auto',
		layout: 'horizontal',
		horizontalAlign: 'center', 
		children: [
					(product1),
					(product2),
		          ]
	});    	   	
	
	var inputbox = Edo.create({
		type: 'box',
		id: 'inputbox',
		border : [0,0,0,0],
		padding : [0,0,0,0],
		width: '100%',
        height: '100%',
		//render: document.body,
		verticalScrollPolicy: 'auto',
		layout: 'vertical',
		verticalGap:0,
		horizontalAlign: 'center', 
		children: [
		           {		        	   
		        	   type:'text',
		        	   border : [0,0,0,0],
		        	   padding : [0,0,0,0],
		        	   style:'border:0px;',
		        	   textStyle:'font-weight:bold;font-size:20px;',
		        	   readOnly:true,
		        	   text:'工业节能和综合利用设备模块化设计评价',
		        	   width:400,
		        	   height:200,
		        	   horizontalAlign: 'center', 
		           },
				   (inputproducts),
				   (inputbuttons),
		          ]
	});    	   	
	
	this.getBenefitHome = function() {
		return inputbox;
	}
}
