//已经在jsp页面获得goal对象（长字符串）
//alert(goal.projectname);

//利用ajax获取后台的值
var goal = cims201.utils.getData("zwjaction/goaldefinition!getGoaldefinition.action",{});
//alert(goal.projectname);

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
                            	            text: goal.projectname
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
                            	            text: goal.companyname
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
                            	            text: goal.comapanyfrom
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
                            	            id: 'forwardgoal',
                            	            text: goal.forwardgoal
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
                            	            valid: noEmpty,
                            	            text: goal.projectdesc
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
                            	            id: 'techrepre',
                            	            text: goal.techrepre
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
                            	            id: 'timerepre' ,
                            	            text: goal.timerepre
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
                            	            id: 'locationrepre',
                            	            text: goal.locationrepre
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
                            	            id: 'userrepre',
                            	            text: goal.userrepre
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
                            	            valid: noEmpty,
                            	            text: goal.projectunit
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
                            	            valid: noEmpty,
                            	            text: goal.projectscope
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
                            	                    ],
                            	                text: goal.impactcategory
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
                            	            valid: noEmpty,
                            	            text: goal.getrule
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
                            	            valid: noEmpty,
                            	            text: goal.assumption
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
                            	            valid: noEmpty,
                            	            text: goal.datadesc
                            	        }
                            	    ]
                               },
                               {
                            	   type: 'formitem',
                            	    label: '建立时间(<span style="color:red;">*</span>):',
                            	    labelWidth: 150,
                            	    style: 'background:#ccc',
                            	    children:[{type: 'date', id: 'buildtime', required: false,date: goal.buildtime}]
                            	    
                               }
                           ]
                }
            ]
        },
    ]
});

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


//表单验证器函数
function noEmpty(v){
    if(v == "") return "不能为空";
}