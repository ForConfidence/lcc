function productinput(callback) {
	// 创建用户输入面板
	var iproduct = Edo.create({
				type : 'box',
				padding : 10,
				border: [0,0,0,0],
				width : 430,
				children : [
				       {
							type : 'formitem',
							padding : [0,0,5,0],
							label : '产品型号<span style="color:red;">*</span>:',
							labelWidth : 90,
							children : [{
										type : 'text',
										width : 300,
										id : 'code',
										valid: noEmpty
									}]
						}, {
							type : 'formitem',
							padding : [5,0,5,0],
							label : '产品名称<span style="color:red;">*</span>:',
							labelWidth : 90,
							children : [{
										type : 'text',
										width : 300,
										id : 'name',
										valid: noEmpty
									}]
						}, {
							type : 'formitem',
							padding : [5,0,5,0],
							label : '公司名称<span style="color:red;">*</span>:',
							labelWidth : 90,
							children : [{
										type : 'text',
										width : 300,
										id : 'company',
										valid: noEmpty
									}]
						},
						{
							type : 'formitem',
							layout : 'horizontal',
							padding : [20, 0, 8, 0],
							children : [

							{
										type : 'space',
										width : 120
									}, {
										id : 'submitBtnProduct',
										type : 'button',
										text : '提交表单'
									}
							]
						}]
			});

	// 事件监听
	submitBtnProduct.on('click', function(e) {
				// 验证表单
				if (iproduct.valid()) {
					var o = iproduct.getForm(); // 获取表单值
					var json = Edo.util.Json.encode(o);
					cims201.utils.getData('product/product!save.action', {
								json : json
							});
					callback();
				}
			});

	this.getProductinput = function() {
		return iproduct;
	}

}
