Edo.build({
	type: 'box',
	 id:'newproject',
	 render: document.body,
    width: 1050, height: 525,
    layout: 'horizontal',
    children:[
        {                
            type: 'ct',
            width: '735',
            height: '520',
            collapseProperty: 'width',
            enableCollapse: false,
            splitRegion: 'west',
            splitPlace: 'after',
            children: [
                {
                    type: 'panel',
                    title:'请您填写所建项目目标和范围定义',
                    width: '100%',
                    height: '100%',
                    children: [
                               {
                            	   type: 'formitem',
                            	    label: '新建项目名称(<span style="color:red;">*</span>):',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'projectname', 
                            	            valid: noEmpty,
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '执行单位及人员(<span style="color:red;">*</span>):',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'companyname', 
                            	            valid: noEmpty,
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '委托方及委托目的:',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'comapanyfrom', 
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '预期目标及应用目的:',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'forwardgoal'
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '研究对象总体描述(<span style="color:red;">*</span>):',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'projectdesc', 
                            	            valid: noEmpty
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '技术代表性:',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'techrepre'
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '时间代表性:',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'timerepre' 
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '地域代表性:',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'locationrepre' 
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '使用者代表性:',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'userrepre'
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '功能单元(<span style="color:red;">*</span>):',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'projectunit', 
                            	            valid: noEmpty
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '研究对象范围(<span style="color:red;">*</span>):',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'projectscope', 
                            	            valid: noEmpty
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	   
                            	    label: '选择环境影响类别(<span style="color:red;">*</span>):',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children:[
                            	                {type: 'checkgroup', 
                            	                 id: 'impactcategory',              
                            	                 repeatDirection: 'horizontal',
                                                 repeatItems:'6',
                            	                 valueField: 'text',
                            	                    data: [
                            	                        {text: '地球生态毒性', },
                            	                        {text: '酸化潜势', },
                            	                        {text: '淡水水生生态毒性', },
                            	                        {text: '人类毒性', },
                            	                        {text: '光化学氧化', },
                            	                        {text: '全球气候变化', },
                            	                        {text: '臭氧层破坏', },
                            	                        {text: '富营养化', },
                            	                        {text: '海洋水生生态毒性', },
                            	                        {text: '化石资源消耗', },
                            	                        {text: '初级资源消耗', }
                            	                    ]
                            	                }
                            	            ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '取舍原则(<span style="color:red;">*</span>):',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'getrule', 
                            	            valid: noEmpty
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '假设(<span style="color:red;">*</span>):',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'assumption', 
                            	            valid: noEmpty
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '数据集描述(<span style="color:red;">*</span>):',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children: [
                            	        {
                            	            type: 'text',
                            	            width:'550',
                            	            id: 'datadesc', 
                            	            valid: noEmpty
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '建立时间(<span style="color:red;">*</span>):',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	   
                            	    children:[{type: 'date', id: 'buildtime', required: false}]
                               },
                               {
                                   type: 'formitem',layout:'horizontal', padding: [8,0,8, 0],
                                   children:[
                                       {id: 'submitBtn', type: 'button', text: '提交'},
                                       {type: 'space', width: 5},
                                       {type: 'label', text: '<a href="javascript:resetForm();">重置</a>'},
                                       {type: 'space', width: 5},
                                       {id: '', type: 'button', text: '另存为',
                                    	   onclick: function(e){
                                    		   
                                           }
                                       },
                                       {type: 'space', width: 5},
                                       {id: '', type: 'button', text: '下一步',
                                    	   onclick: function(e){
                                    		   
                                           }
                                       },
                                       {type: 'label', text: '<a href="zwjaction/bom!start.action">查询汽轮机组BOM</a>'},
                                       {type: 'label', text: '<a href="zwjaction/bom!doGongyi.action">查询机组工艺数据</a>'},
                                       {type: 'label', text: '<a href="zwjaction/materialandcategory!setUuid.action">设置UUID</a>'},
                                       {type: 'label', text: '<a href="zwjaction/dataset!setFactors.action">设置影响因子</a>'},
                                       {type: 'label', text: '<a href="zwjaction/dataset!setFactorlist.action">设置影响因子值</a>'}
                                   ]
                               }
                           ]
                }
            ]
        },
        {
            type: 'box',
            width: '315',
            height: '520',
            collapseProperty: 'width',
            enableCollapse: false,
            splitRegion: 'east',
            splitPlace: 'before',
            children:[
                      {type: 'label', text: ''},
                      {type: 'label', text: '请填写欲建项目的名称！'},
                      {type: 'label', text: '请填写执行LCA项目的具体单位名称及负责人员！'},
                      {type: 'label', text: '请填写委托执行LCA项目的单位名称及预期目的！'},
                      {type: 'label', text: '请填写执行LCA项目欲取得的结果和应用目的！'},
                      {type: 'label', text: '请填写执行LCA分析的对象的总体描述！'},
                      {type: 'label', text: '请填写研究对象的具体技术条件和参数说明！'},
                      {type: 'label', text: '请填写研究对象的具体生命周期的应用时间！'},
                      {type: 'label', text: '请填写研究对象的具体使用环境或地域特征！'},
                      {type: 'label', text: '请填写研究对象所使用者的工况特征或技术需求！'},
                      {type: 'label', text: '请填写执行LCA项目的总体功能单元(定量描述)！'},
                      {type: 'label', text: '请填写研究对象的具体研究范围和系统边界！'},
                      {type: 'label', text: '请选择研究对象的具体环境影响类别(可多选)！'},
                      {type: 'label', text: '请填写具体数据、过程的取舍原准则！'},
                      {type: 'label', text: '请填写执行LCA项目需要建立的一些假设条件！'},
                      {type: 'label', text: '请对执行LCA项目过程的数据集作整体描述！'},
                      {type: 'label', text: '请填写项目开始时间！'},
                      {type: 'label', text: '<a href="zwjaction/goaldefinition!getGoaldefinition1.action">参考模板</a>'}
                      //{type: 'label', text: '<a href="javascript:addWindow();">弹出模板</a>'}
                  ]
        }
    ]
});

function getreferencemodule(){
document.location.href="zwjaction/goaldefinition!getGoaldefinition.action";
}

//事件监听
submitBtn.on('click', function(e){
    //验证表单
    if(newproject.valid()){
        var o = newproject.getForm();    //获取表单值
        var json = Edo.util.Json.encode(o);
        alert(json);  //可以用ajax发送到服务端
       
        //alert(impactcategory.getValue());
        var data = cims201.utils.getData("zwjaction/goaldefinition!saveGoaldefinition.action",{projectname:projectname.text,
        	companyname:companyname.text,comapanyfrom:comapanyfrom.text,forwardgoal:forwardgoal.text,projectdesc:projectdesc.text,
        	techrepre:techrepre.text,timerepre:timerepre.text,locationrepre:locationrepre.text,userrepre:userrepre.text,
        	projectunit:projectunit.text,projectscope:projectscope.text,impactcategory:impactcategory.getValue(),getrule:getrule.text,
        	assumption:assumption.text,datadesc:datadesc.text,buildtime:buildtime.text});
    }
});

function resetForm(){
	Edo.get('newproject').reset();
}

//function addWindow() {
//	var win = new Edo.containers.Window();
//
//	win.set('title', '目标和范围定义参考模板');
//	win.set('titlebar',
//	    [      //头部按钮栏
//	        {
//	            cls: 'e-titlebar-close',
//	            onclick: function(e){
//	                //this是按钮
//	                //this.parent是按钮的父级容器, 就是titlebar对象
//	                //this.parent.owner就是
//	                this.parent.owner.hide();       //hide方法
//	            }
//	        }
//	    ]
//	);
//
//	win.addChild({
//	    type: 'box',
//	    width: '100%',
//	    height: '100%',    
//	    children: [
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''},
//	               {type: 'label', text: ''}
//	    ]
//	});
//
//	//show方法
//	win.show(500, 0, true);       //true是遮罩, false不遮罩
//}

//表单验证器函数
function noEmpty(v){
    if(v == "") return "不能为空";
}