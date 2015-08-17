//echarts开始——柱状图
		// 路径配置
        require.config({
            paths: {
                echarts: 'js/echarts-2.2.2/build/dist'
            }
        });
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载，可以加载多个！！
                'echarts/chart/line',
                'echarts/chart/scatter',
                'echarts/chart/k',
                'echarts/chart/pie',
                'echarts/chart/radar',
                'echarts/chart/chord',
                'echarts/chart/force',
                'echarts/chart/map',
                'echarts/chart/gauge',
                'echarts/chart/funnel',
                'echarts/chart/eventRiver',
                'echarts/chart/treemap',
                'echarts/chart/venn'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表，同一页面可在多个dom上init出多个图表,theme为可选的主题
                var myChart = ec.init(document.getElementById('main'),'macarons'); 
                //myChart.showLoading({text: '正在努力的读取数据中...'  });
                //属性值设置
                var option = {
                	title :{
                		//此处为图标的名称!!!!!!!!!text应该为xx.text或者xx.value
        				text : '',
        				x:'center',
        				y:'bottom',
        				textStyle:{
    						fontSize: 18,
    						fontWeight: 'bolder',
    						color: '#333'
						},
						padding:0
    				},
    				calculable : true,
    				tooltip : {
        				trigger: 'axis',
        				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        				}
    				},
    				toolbox: {
        				show : true,
       					orient: 'vertical',
        				x: 'right',
        				y: 'center',
        				feature : {
            						mark : {show: true},
            						dataView : {show: true, readOnly: false},
            						magicType: {show: true, type: ['line', 'bar','scatter','k','pie']},
           						 	restore : {show: true},
            						saveAsImage : {show: true}
        				}
    				},
                    legend: {
                    	x:'right',
                    	//此处为图标的图例!!!!!!!!!data应该为阶段或者过程表示：？？？？
        				data:[]
    				},
                    xAxis : [
        					{
        					//此处为图标的x轴列名!!!!!!!!!data应该为阶段或者过程名称：？？？？
            				type : 'category',
            				axisLabel:{'interval':0},
            				//data : [],
            				name:'环境影响类别'
        					}
    						],
    				yAxis : [
        					{
        					//此处为图标的y轴列名!!!!!!!!!data应该为阶段或者过程名称：？？？？
            				type : 'value',
            				name:'环境影响值'
        					}
    						],
    			    series : [
    			              ]
                };
				myChart.setOption(option);
				dataGetAndSet(option);
            }
        );
//echarts结束——柱状图
var data = cims201.utils.getData("lcc/lccmodule!doCalculate1.action",{lciamethod:lciamethod,impactcategory:impactcategory,moduleid:moduleid,datasetid:newdatasetid});

var processnamelist = new Array();
var nameList={}; 
var valueList={};

function addnewbar(data) {
	for(var j=0;j<data.length;j++){
		//processnamelist.push(data[j].name);
		var impactnamelist = new Array();
		var impactvaluelist = new Array();
		var result = eval(data[j].result);
		for(var index in result){
			impactnamelist.push(index);
			impactvaluelist.push(result[index]);
		}
		nameList.j=impactnamelist;
		valueList.j=impactvaluelist;
	}
}

function dataGetAndSet(option) {
	var myChart = require('echarts').init(document.getElementById('main'),'macarons');
	
	option.title.text=modulename+':生命周期环境影响评价结果';
	option.legend.data=processnamelist;
	//xAxis设置
	for(var p in nameList) {
		option.xAxis = [
		    			{
		    				type : 'category',
		    				axisLabel:{'interval':0},
		    				data : nameList[p],
		    				name:'环境影响类别'
		    			}
		    			];
	}
	for(var j=0;j<data.length;j++) {
//		option.series[j].name=processnamelist[j];
//		option.series[j].type='bar';
//		var result = eval(data[j].result);
//		option.series[j].data=[1,2,3];
		processnamelist.push(data[j].name);
		var impactnamelist = new Array();
		var impactvaluelist = new Array();
		var result = eval(data[j].result);
		for(var index in result){
			impactnamelist.push(index);
			impactvaluelist.push(result[index]);
		}
		nameList.j=impactnamelist;
		valueList.j=impactvaluelist;
		option.series.push(
				{
					name:processnamelist[j],
					type:'bar',
					data:impactvaluelist
				}
		);
	}
	//myChart.hideLoading();
	myChart.setOption(option);
}

        
