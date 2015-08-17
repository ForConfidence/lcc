function createMdeResult(products) {
	
	var data = cims201.utils.getData_Async('product/mde!mdeoutput.action',{products:products},function(text){
		var data;
		if(text == null || text == '') {
			data = null;
		} else {
			data = Edo.util.Json.decode(text);
		}
		centerPanel.addChild({
					type: 'panel',
					title:'<span class="cims201_con_font">评价结果</span>',
					border: [0,0,0,0],
					padding: [0,0,0,0],
					width: '100%',
					height: 210,
					layout: 'vertical',
					verticalScrollPolicy:'off',	
					children: [
			           {	type: 'label', style: 'padding-left:50px;padding-top:5px;font-weight:bold;font-size:15px;', text: '★  产品【】的模块化设计评价结果：'},
			           {	type: 'label', style: 'padding-left:60px;padding-top:5px;font-weight:bold;font-size:14px;', text: '▶  模块化设计效益评价：' },
			           {	type: 'label', style: 'padding-left:60px;padding-top:5px;font-weight:bold;font-size:14px;', text: '▶  模块化设计程度评价：' },
			           {	type: 'label', style: 'padding-left:60px;padding-top:5px;font-weight:bold;font-size:14px;', text: '▶  全生命周期成本评价：' },
			           {	type: 'label', style: 'padding-left:60px;padding-top:5px;font-weight:bold;font-size:14px;', text: '▶  模块化设计评价：'},
			           {	type: 'label', style: 'padding-left:60px;padding-top:5px;font-weight:bold;font-size:14px;', text: '▶  效费比：'}
					]
		});
	});
	
	var centerPanel = Edo.create({
		width: '40%',
		height: '100%',
		border: [0,0,0,0],
		padding: [0,0,0,0],
		layout: 'vertical', 		
		children: []
	});
	
	var rightPanel = Edo.create({
		type: 'panel',
		title:'<span class="cims201_con_font">图表分析</span>',
		type: 'box',
		width: '60%',
		height: '100%',
		border: [1,1,1,0],
		padding: [0,0,0,0],
		layout: 'vertical', 
		verticalAlign:'center',
		verticalScrollPolicy:'off',	
		children: [	new mdeAnalysis(products)]
	});
	
	var output = Edo.create({
		type: 'box',
		border: [0,0,0,0], 
	    padding: [0,0,0,0], 
	    width: '100%',
	    height: '100%',
	    layout: 'horizontal',
		children: [centerPanel,rightPanel]
	});
	
	this.getMdeResult = function() {
		return output;
	}
}

function mdeAnalysis(data,select) {
	var outPanel = null;
	var analysis = Edo.create({
		type: 'box',
    	width: '100%',
    	height: '100%',
    	border: [0,0,0,0],
    	padding: [0,0,0,0],
    	layout: 'vertical',
    	verticalAlign:'center',
    	verticalScrollPolicy: 'off',
    	children: [
			{
				type: 'module',
				width: '100%',
				height: '100%',
		   		border: [0,0,0,0],
		   		src: 'product/mderesult!'+select+'.action?data=' + data
					+ '&screenwidth='+cims201.utils.getScreenSize().width+'&screenheight='+cims201.utils.getScreenSize().height
			}
		]
	});
	outPanel = Edo.create({
		type: 'box',
		width: '100%',
		height: '100%',
		border: [0,0,0,0],
		padding: [0,0,0,0],
		layout: 'vertical',
		verticalScrollPolicy: 'auto',
		children: [
			analysis
		]
	});
	
	return outPanel;
}
//构建程度评价结果页面
function createDegreeresultbox(data){
	var arr = data.toString().split(',');
	var centerPanel = Edo.create({
		type: 'box',
		width: '40%',
		height: '100%',
		border: [0,0,0,0],
		padding: [0,0,0,0],
		layout: 'vertical', 
		children: []
	});

	centerPanel.addChild({
		type: 'panel',
		title:'<span class="cims201_con_font">模块化程度评价结果</span>',
		border: [1,1,1,1],
		padding: [0,0,0,0],
		width: '100%',
		height: '50%',
		layout: 'vertical',
		horizontalAlign:'left',
		verticalScrollPolicy:'off',	
		children: [
           {	type: 'label', style: 'padding-left:40px;padding-top:10px;font-weight:bold;font-size:20px;font-family:微软雅黑;', text: '★  模块化设计程度评价：&nbsp<font color="blue">'+arr[0]+'</font>'},
           {	type: 'label', style: 'padding-left:60px;padding-top:10px;font-size:18px;font-family:微软雅黑;', text: '▶  模块独立性分析：&nbsp<font color="blue">'+arr[1]+'</font>'},
           {	type: 'label', style: 'padding-left:60px;padding-top:10px;font-size:18px;font-family:微软雅黑;', text: '▶  模块重用性分析：&nbsp<font color="blue">'+arr[2]+'</font>'},
           {	type: 'label', style: 'padding-left:60px;padding-top:10px;font-size:18px;font-family:微软雅黑;', text: '▶  模块封装性评价：&nbsp<font color="blue">'+arr[3]+'</font>'},
           {	type: 'label', style: 'padding-left:60px;padding-top:10px;font-size:18px;font-family:微软雅黑;', text: '▶  模块可靠性评价：&nbsp<font color="blue">'+arr[4]+'</font>'},
           {	type: 'label', style: 'padding-left:60px;padding-top:10px;font-size:18px;font-family:微软雅黑;', text: '▶  接口集成性评价：&nbsp<font color="blue">'+arr[5]+'</font>'}					       
		]
	});	

	centerPanel.addChild({
		type: 'panel',
		title:'<span class="cims201_con_font">结果分析</span>',
		border: [1,1,1,1],
		padding: [0,0,0,0],
		width: '100%',
		height : '50%',
		layout: 'vertical',
		horizontalAlign:'left',
		verticalScrollPolicy:'off',
		children: [
           {	type: 'label', style: 'padding-left:40px;padding-top:10px;font-weight:bold;font-size:18px;font-family:微软雅黑;', text:'产品2比产品1模块化设计程度<font color="red">'+compare(arr[0])+'%</font>，其中：'},
           {	type: 'label', style: 'padding-left:60px;padding-top:10px;font-size:16px;font-family:微软雅黑;', text: '产品2比产品1模块独立性程度<font color="red">'+compare(arr[1])+'%(权重为'+arr[6]+')</font>,'},
           {	type: 'label', style: 'padding-left:60px;padding-top:10px;font-size:16px;font-family:微软雅黑;', text: '产品2比产品1模块可重用性程度<font color="red">'+compare(arr[2])+'%(权重为'+arr[7]+')</font>,'},
           {	type: 'label', style: 'padding-left:60px;padding-top:10px;font-size:16px;font-family:微软雅黑;', text: '产品2比产品1模块封装性程度<font color="red">'+compare(arr[3])+'%(权重为'+arr[8]+')</font>,' },
           {	type: 'label', style: 'padding-left:60px;padding-top:10px;font-size:16px;font-family:微软雅黑;', text: '产品2比产品1模块可靠性程度<font color="red">'+compare(arr[4])+'%(权重为'+arr[9]+')</font>,'},
           {	type: 'label', style: 'padding-left:60px;padding-top:10px;font-size:16px;font-family:微软雅黑;', text: '产品2比产品1接口集成性程度<font color="red">'+compare(arr[5])+'%(权重为'+arr[10]+')</font>.'}					       
		]
	});	

		
	var rightPanel = Edo.create({
		type: 'panel',
		title:'<span class="cims201_con_font">图表展示</span>',	
		width: '60%',
		height: '100%',
		border: [0,0,0,0],
		padding: [0,0,0,0],
		layout: 'vertical', 
		verticalAlign:'center',
		verticalScrollPolicy:'off',
		children: [	new mdeAnalysis(data,'degreeChart')]
//		children: []
	});
	
	var degreeResultBox = Edo.create({
		type: 'box',
		border: [0,0,0,0], 
	    padding: [0,0,0,0], 
	    width: '100%',
	    height: '100%',
	    layout: 'horizontal',
		children: [centerPanel,rightPanel]
	});
	
	this.getDegreeResult = function() {
		return degreeResultBox;
	}
	function compare(numstr){
		if(Number(numstr)>0)
			return "高"+(Number(numstr)*100).toFixed(2);
		else
			return "低"+(0-(Number(numstr)*100)).toFixed(2);
	}
	
}
//构建效益评价结果页面
function createBenefitresultbox(data){
	var arr = data.toString().split(',');
	var centerPanel = Edo.create({
		type: 'box',
		width: '40%',
		height: '100%',
		border: [0,0,0,0],
		padding: [0,0,0,0],
		layout: 'vertical', 
		align : 'center',
		children: []
	});

	centerPanel.addChild({
		type: 'panel',
		title:'<span class="cims201_con_font">模块化效益评价结果</span>',	
		verticalScrollPolicy:'off',
		border: [1,1,1,1],
		padding: [0,0,0,0],
		width: '100%',
		height: '50%',
		layout: 'vertical',
		children: [
           {	type: 'label', style: 'padding-left:20px;padding-top:10px;font-weight:bold;font-size:20px;font-family:微软雅黑;', text: '★  模块化设计效益评价：&nbsp<font color="blue">'+(0-Number(arr[5]))+'</font>'},
           {	type: 'label', style: 'padding-left:30px;padding-top:10px;font-size:18px;font-family:微软雅黑;', text: '▶  企业反应时间（T）：&nbsp<font color="blue">'+arr[0]+'</font>'},
           {	type: 'label', style: 'padding-left:30px;padding-top:10px;font-size:18px;font-family:微软雅黑;', text: '▶  产品质量问题（Q）：&nbsp<font color="blue">'+arr[1]+'</font>'},
           {	type: 'label', style: 'padding-left:30px;padding-top:10px;font-size:18px;font-family:微软雅黑;', text: '▶  产品成本（C）：&nbsp<font color="blue">'+arr[2]+'</font>'},
           {	type: 'label', style: 'padding-left:30px;padding-top:10px;font-size:18px;font-family:微软雅黑;', text: '▶  用户多样化需求（U）：&nbsp<font color="blue">'+arr[3]+'</font>'},
           {	type: 'label', style: 'padding-left:30px;padding-top:10px;font-size:18px;font-family:微软雅黑;', text: '▶  产品和过程环境友好性（E）：&nbsp<font color="blue">'+arr[4]+'</font>'}					       
		]
	});	
	centerPanel.addChild({
		type: 'panel',
		title:'<span class="cims201_con_font">结果分析</span>',	
		verticalScrollPolicy:'off',
		border: [1,1,1,1],
		padding: [0,0,0,0],
		width: '100%',
		height : '50%',
		layout: 'vertical',
		children: [
           {	type: 'label', style: 'padding-left:20px;padding-top:10px;font-weight:bold;font-size:18px;font-family:微软雅黑;', text:'产品2比产品1模块化设计效益<font color="red">'+compare(arr[5],'B')+'%</font>，其中：'},
           {	type: 'label', style: 'padding-left:30px;padding-top:10px;font-size:16px;font-family:微软雅黑;', text: '产品2相对于产品1反应时间<font color="red">'+compare(arr[0],'T')+'%(权重为'+arr[6]+')</font>,' },
           {	type: 'label', style: 'padding-left:30px;padding-top:10px;font-size:16px;font-family:微软雅黑;', text: '产品2相对于产品1质量问题<font color="red">'+compare(arr[1],'Q')+'%(权重为'+arr[7]+')</font>,'},
           {	type: 'label', style: 'padding-left:30px;padding-top:10px;font-size:16px;font-family:微软雅黑;', text: '产品2相对于产品1总成本<font color="red">'+compare(arr[2],'C')+'%(权重为'+arr[8]+')</font>,'},
           {	type: 'label', style: 'padding-left:30px;padding-top:10px;font-size:16px;font-family:微软雅黑;', text: '产品2相对于产品1多样化程度<font color="red">'+compare(arr[3],'U')+'%(权重为'+arr[9]+')</font>,'},
           {	type: 'label', style: 'padding-left:30px;padding-top:10px;font-size:16px;font-family:微软雅黑;', text: '产品2相对于产品1环境污染<font color="red">'+compare(arr[4],'E')+'%(权重为'+arr[10]+')</font>.'}					       
		]
	});	

		
	var rightPanel = Edo.create({
		type: 'panel',
		title:'<span class="cims201_con_font">图表展示</span>',	
		verticalScrollPolicy:'off',
		width: '60%',
		height: '100%',
		border: [0,0,0,0],
		padding: [0,0,0,0],
		layout: 'vertical', 
		verticalAlign:'center',
		children: [	new mdeAnalysis(data,'benefitChart')]
	});
	
	var degreeResultBox = Edo.create({
		type: 'box',
		border: [0,0,0,0], 
	    padding: [0,0,0,0], 
	    width: '100%',
	    height: '100%',
	    layout: 'horizontal',
		children: [centerPanel,rightPanel]
	});
	
	this.getBenefitResult = function() {
		return degreeResultBox;
	}
	function compare(numstr,index){
		switch(index){
			case 'B' : {
				if(Number(numstr)>0)
					return "低"+(Number(numstr)*100).toFixed(2);
				else
					return "高"+(0-(Number(numstr)*100)).toFixed(2);
			}
			case 'T' : {
				if(Number(numstr)>0)
					return "变长"+(Number(numstr)*100).toFixed(2);
				else
					return "缩短"+(0-(Number(numstr)*100)).toFixed(2);
			}
			case 'Q' : {
				if(Number(numstr)>0)
					return "增加"+(Number(numstr)*100).toFixed(2);
				else
					return "减少"+(0-(Number(numstr)*100)).toFixed(2);		
						}
			case 'C' : {
				if(Number(numstr)>0)
					return "增加"+(Number(numstr)*100).toFixed(2);
				else
					return "降低"+(0-(Number(numstr)*100)).toFixed(2);
			}
			case 'U' : {
				if(Number(numstr)>0)
					return "提高"+(Number(numstr)*100).toFixed(2);
				else
					return "降低"+(0-(Number(numstr)*100)).toFixed(2);
			}
			case 'E' : {
				if(Number(numstr)>0)
					return "提高"+(Number(numstr)*100).toFixed(2);
				else
					return "降低"+(0-(Number(numstr)*100)).toFixed(2);
			}
		}
		
	}
	
}