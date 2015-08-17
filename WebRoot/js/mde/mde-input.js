function mdeinput(productnumber,callback) {
	var mdeInput = 
		Edo.create({
			type: 'box',
			border : [0,0,0,0],
			padding : [0,0,0,0],
			verticalScrollPolicy: 'auto',
			layout: 'vertical',
			children: [
				{
					type: 'formitem',
					layout: 'horizontal',						
					label: '一、模块化效益评价参数',
					labelStyle: 'font-weight:bold;font-size:14px;',
					labelWidth: 180,
					children : [
						{	type: 'label', width: 40, text: '  权重：'},
						{	type: 'text', width: 30, id: 'mkhxypjcssrqz'}							
					]
				},
				{
					type: 'formitem',
					layout: 'horizontal',	
					padding: [0,0,0,10],
					label: '1.1 全生命周期成本参数',
					labelStyle: 'font-weight:bold;font-size:13px;',
					labelWidth: 165,
					children : [
					            {	type: 'label', width: 40, text: '  权重：'},
					            {	type: 'text', width: 30, id: 'qsmzqcbcssrqz'}							
					]
				},
				{
					type: 'box',
					layout: 'vertical',
					border: [0,0,0,0],
					padding : [0,0,0,0],
					children: [
					           {
					        	   type: 'box',
					        	   layout: 'horizontal',
					        	   border: [0,0,0,0],
					        	   padding : [0,0,0,0],
					        	   children: [{
										type: 'formitem',
										layout: 'horizontal',
										padding: [0,0,0,20],
										label: '投资成本：',
										labelWidth: 70,
										children : [
											{	type: 'text', width: 60, id: 'tzcb'},
											{	type: 'label', width: 50, text: '元, 权重：'},
											{	type: 'text', width: 30, id: 'tzcbqz'}							
										]
									},
									{
										type: 'formitem',
										layout: 'horizontal',
										padding: [0,0,0,10],
										label: '运行成本：',
										labelWidth: 70,
										children : [
											{	type: 'text', width: 60, id: 'yxcb'},
											{	type: 'label', width: 50, text: '元, 权重：'},
											{	type: 'text', width: 30, id: 'yxcbqz'}							
										]
									},
									{
										type: 'formitem',
										layout: 'horizontal',
										padding: [0,0,0,10],
										label: '维修成本：',
										labelWidth: 70,
										children : [
											{	type: 'text', width: 60, id: 'wxcb'},
											{	type: 'label', width: 50, text: '元, 权重：'},
											{	type: 'text', width: 30, id: 'wxcbqz'}							
										]
									}]
					           },
					           {
					        	   type: 'box',
					        	   layout: 'horizontal',
					        	   padding : [0,0,0,0],
					        	   border: [0,0,0,0],
					        	   children: [{
										type: 'formitem',
										layout: 'horizontal',
										padding: [0,0,0,20],
										label: '故障成本：',
										labelWidth: 70,
										children : [
											{	type: 'text', width: 60, id: 'gzcb'},
											{	type: 'label', width: 50, text: '元, 权重：'},
											{	type: 'text', width: 30, id: 'gzcbqz'}							
										]
									},
									{
										type: 'formitem',
										layout: 'horizontal',
										padding: [0,0,0,10],
										label: '回收成本：',
										labelWidth: 70,
										children : [
											{	type: 'text', width: 60, id: 'hscb'},
											{	type: 'label', width: 50, text: '元, 权重：'},
											{	type: 'text', width: 30, id: 'hscbqz'}							
										]
									}]					           
					           }
					]
				},
				{
					type: 'formitem',
					layout: 'horizontal',
					padding: [0,0,0,10],
					label: '1.2 产品质量参数',
					labelStyle: 'font-weight:bold;font-size:13px;',
					labelWidth: 125,
					children : [
						{	type: 'label', width: 40, text: '  权重：'},
						{	type: 'text', width: 30, id: 'cpzlcssrqz'}							
					]
				},
				{
					type: 'box',
					layout: 'vertical',
					border: [0,0,0,0],
					padding : [0,0,0,0],
					children: [
					           {
					        	   type: 'box',
					        	   layout: 'horizontal',
					        	   border: [0,0,0,0],
					        	   padding : [0,0,0,0],
					        	   children: [
										{
											type: 'formitem',
											layout: 'horizontal',
											padding: [0,0,0,20],
											label: '部件性能实验项目合格率：',
											labelWidth: 150,
											children : [
												{	type: 'text', width: 60, id: 'bjxnsyxmhgl'},
												{	type: 'label', width: 40, text: ', 权重：'},
												{	type: 'text', width: 30, id: 'bjxnsyxmhglqz'}							
											]
										},
										{
											type: 'formitem',
											layout: 'horizontal',
											padding: [0,0,0,10],
											label: '产品主件主项合格率：',
											labelWidth: 130,
											children : [
												{	type: 'text', width: 60, id: 'cpzjzxhgl'},
												{	type: 'label', width: 40, text: ', 权重：'},
												{	type: 'text', width: 30, id: 'cpzjzxhglqz'}							
											]
										}
					        	   ]
					           },
					           {
									type: 'formitem',
									layout: 'horizontal',
									padding: [0,0,0,20],
									label: '总装合格率：',
									labelWidth: 80,
									children : [
										{	type: 'text', width: 60, id: 'zzhgl'},
										{	type: 'label', width: 40, text: ', 权重：'},
										{	type: 'text', width: 30, id: 'zzhglqz'}							
									]
					           }   
					]
				},
				{
					type: 'formitem',
					layout: 'horizontal',	
					padding: [0,0,0,10],
					label: '1.3 企业反映速度参数',
					labelStyle: 'font-weight:bold;font-size:13px;',
					labelWidth: 150,
					children : [
						{	type: 'label', width: 40, text: '  权重：'},
						{	type: 'text', width: 30, id: 'qyfysdcssrqz'}							
					]
				},
				{
					type: 'box',
					layout: 'vertical',
					border: [0,0,0,0],
					padding : [0,0,0,0],
					children: [
					           {
					        	   type: 'box',
					        	   layout: 'horizontal',
					        	   border: [0,0,0,0],
					        	   padding : [0,0,0,0],
					        	   children: [
										{
											type: 'formitem',
											layout: 'horizontal',
											padding: [0,0,0,20],
											label: '产品设计周期：',
											labelWidth: 90,
											children : [
												{	type: 'text', width: 60, id: 'cpsjzq'},
												{	type: 'label', width: 50, text: '天, 权重：'},
												{	type: 'text', width: 30, id: 'cpsjzqqz'}							
											]
										},
										{
											type: 'formitem',
											layout: 'horizontal',
											padding: [0,0,0,10],
											label: '零部件制造周期：',
											labelWidth: 105,
											children : [
												{	type: 'text', width: 60, id: 'lbjzzzq'},
												{	type: 'label', width: 50, text: '天, 权重：'},
												{	type: 'text', width: 30, id: 'lbjzzzqqz'}							
											]
										}
					        	   ]
					           },
					           {
									type: 'formitem',
									layout: 'horizontal',
									padding: [0,0,0,20],
									label: '产品装配周期：',
									labelWidth: 90,
									children : [
										{	type: 'text', width: 60, id: 'cpzpzq'},
										{	type: 'label', width: 50, text: '天, 权重：'},
										{	type: 'text', width: 30, id: 'cpzpzqqz'}							
									]
					           }
					]
				},
				{
					type: 'formitem',
					layout: 'horizontal',						
					label: '1.4 产品多样化需求参数',
					padding: [0,0,0,10],
					labelStyle: 'font-weight:bold;font-size:13px;',
					labelWidth: 165,
					children : [
						{	type: 'label', width: 40, text: '  权重：'},
						{	type: 'text', width: 30, id: 'cpdyhxqcssrqz'}							
					]
				},
				{
					type: 'box',
					layout: 'horizontal',
					border: [0,0,0,0],
					padding : [0,0,0,0],
					children: [
						{
							type: 'formitem',
							layout: 'horizontal',	
							padding: [0,0,0,20],
							label: '产品个性化配置率：',
							labelWidth: 115,
							children : [
								{	type: 'text', width: 60, id: 'cpgxhpzl'},
								{	type: 'label', width: 40, text: ', 权重：'},
								{	type: 'text', width: 30, id: 'cpgxhpzlqz'}							
							]
						},
						{
							type: 'formitem',
							layout: 'horizontal',
							padding: [0,0,0,10],
							label: '用户满意率：',
							labelWidth: 80,
							children : [
								{	type: 'text', width: 60, id: 'yhmyl'},
								{	type: 'label', width: 40, text: ', 权重：'},
								{	type: 'text', width: 30, id: 'yhmylqz'}							
							]
						}
					]
				},
				{
					type: 'formitem',
					layout: 'horizontal',
					padding: [0,0,0,10],
					label: '1.5 产品和过程环境友好性参数',
					labelStyle: 'font-weight:bold;font-size:13px;',
					labelWidth: 205,
					children : [
						{	type: 'label', width: 40, text: '  权重：'},
						{	type: 'text', width: 30, id: 'cphgchjyhxcssrqz'}							
					]
				},
				{
					type: 'box',
					layout: 'horizontal',
					border: [0,0,0,0],
					padding : [0,0,0,0],
					children: [
						{
							type: 'formitem',
							layout: 'horizontal',	
							padding: [0,0,0,20],
							label: '设备运行效率：',
							labelWidth: 90,
							children : [
								{	type: 'text', width: 60, id: 'sbyxxl'},
								{	type: 'label', width: 40, text: ', 权重：'},
								{	type: 'text', width: 30, id: 'sbyxxlqz'}							
							]
						},
						{
							type: 'formitem',
							layout: 'horizontal',
							padding: [0,0,0,10],
							label: '材料回收利用效率：',
							labelWidth: 115,
							children : [
								{	type: 'text', width: 60, id: 'clhslyxl'},
								{	type: 'label', width: 40, text: ', 权重：'},
								{	type: 'text', width: 30, id: 'clhslyxlqz'}							
							]
						}  
					]
				},
				{
					type: 'formitem',
					layout: 'horizontal',						
					label: '二、模块化程度评价参数',
					labelStyle: 'font-weight:bold;font-size:14px;',
					labelWidth: 180,
					children : [
						{	type: 'label', width: 40, text: '  权重：'},
						{	type: 'text', width: 30, id: 'mkhcdpjcssrqz'}							
					]
				},
				{
					type: 'box',
					layout: 'vertical',
					border: [0,0,0,0],
					padding : [0,0,0,0],
					children: [
					           {
					        	   type: 'box',
					        	   layout: 'horizontal',
					        	   border: [0,0,0,0],
					        	   padding : [0,0,0,0],
					        	   children: [
										{
											type: 'formitem',
											layout: 'horizontal',
											padding: [0,0,0,20],
											label: '独立模块占有率：',
											labelWidth: 105,
											children : [
												{	type: 'text', width: 60, id: 'dlmkzyl'},
												{	type: 'label', width: 40, text: ', 权重：'},
												{	type: 'text', width: 30, id: 'dlmkzylqz'}							
											]
										},
										{
											type: 'formitem',
											layout: 'horizontal',
											padding: [0,0,0,10],
											label: '模块可重用率：',
											labelWidth: 90,
											children : [
												{	type: 'text', width: 60, id: 'mkkcyl'},
												{	type: 'label', width: 40, text: ', 权重：'},
												{	type: 'text', width: 30, id: 'mkkcylqz'}							
											]
										}
					        	   ]
					           },
					           {
					        	   type: 'box',
					        	   layout: 'horizontal',
					        	   border: [0,0,0,0],
					        	   padding : [0,0,0,0],
					        	   children: [
										{
											type: 'formitem',
											layout: 'horizontal',
											padding: [0,0,0,20],
											label: '接口种类与模块种类比值：',
											labelWidth: 150,
											children : [
												{	type: 'text', width: 60, id: 'jkzlymkzlbz'},
												{	type: 'label', width: 40, text: ', 权重：'},
												{	type: 'text', width: 30, id: 'jkzlymkzlbzqz'}							
											]
										},
										{
											type: 'formitem',
											layout: 'horizontal',	
											padding: [0,0,0,10],
											label: '接口系统成本占总成本比例：',
											labelWidth: 165,
											children : [
												{	type: 'text', width: 60, id: 'jkxtcbzzcbbl'},
												{	type: 'label', width: 40, text: ', 权重：'},
												{	type: 'text', width: 30, id: 'jkxtcbzzcbblqz'}							
											]
										}
					        	   ]
					           }
					]
				},
		        {
		            type: 'formitem',layout:'horizontal', padding: [8,0,8,200],
		            children:[
		                {id: 'submitBtn', type: 'button', text: '保存数据'},
		                {type: 'space', width: 10},
		                {type: 'label', text: '<a href="javascript:resetForm();">重置</a>'}
		            ]
		        }

			]
		});
	
	submitBtn.on('click', function(e) {
		// 验证表单
		if (mdeInput.valid()) {
			var o = mdeInput.getForm(); // 获取表单值
			var formvalue = Edo.util.Json.encode(o);
			alert(formvalue); //可以用ajax发送到服务端
			cims201.utils.getData('product/product!save.action', {
				formvalue: formvalue,productNumber: productnumber
			});
			callback();
		}
	});
	
	function resetForm(){
		mdeInput.reset();
	}
	
	this.getMdeInput = function() {
		return mdeInput;
	}
}