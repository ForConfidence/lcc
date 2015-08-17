function createNav_ModManageAccordin(){
	var myModManageAccordin = Edo.create({
			id:'leftPanel',
			type:'panel',
			title:'<div class=cims201_tab_font align=center>导航列表</div>',
			width: '100%',
            height: '95%',
            border:[0,0,0,0],
		    padding:[3,0,0,3],
            collapseProperty: 'width',
            enableCollapse: true,
            splitRegion: 'west',
            splitPlace: 'after',
            layout:'vertical',
            verticalGap: 0,
           	children:[
				{
				    type: 'panel',
				    width: '100%',height: '100%',
				    enableCollapse: true,
				    expanded: false,    
				    onclick: onPanelClick,   
				    title: '任务管理',
				    border:[0,0,0,0],
				    padding:[0,0,0,0],
				    titlebar:[{
				        cls:'e-titlebar-accordion',
				        onclick: toggle
				    }],
				    children: [
				        {
				    		id: 'task', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){	
					        	if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					           
					        }
				    	}
				    ]
				},     
                {
		            type: 'panel',
		            width: '100%',
		            height: '100%',              
		            title: '编码管理系统',
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            enableCollapse: true,
		            onclick: onPanelClick,                                           
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children:[
		            	{
		            		id: 'bmgl', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){	
					        	if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					           
					        }
		            	}				            
		            ]
		        },
		        {
		            type: 'panel',
		            width: '100%',height: '100%',
		            enableCollapse: true,
		            expanded: false,    
		            onclick: onPanelClick,   
		            title: '模块管理系统',
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children: [
		                {
		            		id: 'mkgl', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){
					  			if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					  		}
		            	}
		            ]
		        },
		        {
		            type: 'panel',
		            width: '100%',height: '100%',
		            enableCollapse: true,
		            expanded: false,    
		            onclick: onPanelClick,   
		            title: '事物特性管理',
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children: [
		                {
		            		id: 'smlgl', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){
					  			openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					  		}
		            	}
		            ]
		        },
		        {
		            type: 'panel',
		            width: '100%',height: '100%',
		            enableCollapse: true,
		            expanded: false,    
		            onclick: onPanelClick,   
		            title: '配置需求管理',
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children: [
		                {
		            		id: 'pzxqgl', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){}
		            	}
		            ]
		        },
		        {
		            type: 'panel',
		            width: '100%',height: '100%',
		            enableCollapse: true,
		            expanded: false,    
		            onclick: onPanelClick,   
		            title: '模块配置设计',
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children: [
		                {
		            		id: 'mkpzsj', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){}
		            	}
		            ]
		        },
		        {
		            type: 'panel',
		            width: '100%',height: '100%',
		            enableCollapse: true,
		            expanded: false,    
		            onclick: onPanelClick,   
		            title: '流程模板管理',
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children: [
		                {
		            		id: 'lcmbgl', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){	
					        	if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					           
					        }
		            	}
		            ]
		        }
           	]
	});
	var bmgldata =[
			{id:001,index:'CodeClassDefi',name:'零部件分类定义'},
			{id:002,index:'CodeClassRuleManage',name:'分类编码规则管理'},
			{id:003,index:'CodeClassManage',name:'编码大类管理'},
			{id:004,index:'CodeClassStructManage',name:'零部件分类结构管理'}
		];
	var taskdata =[
	   			{id:001,index:'mytask',name:'我的任务'}
	   		];
	var mkgldata =[
			{id:005,index:'StructUpload',name:'分类主模型及图文档管理'},
			{id:006,index:'PartInstanceRg',name:'零部件实例注册'},
			{id:007,index:'PartUpload',name:'零部件实例图文档管理'},
			{id:008,index:'DocTypeManage',name:'主模型及图文档类型管理'},
			{id:009,index:'PartCreate',name:'创建零部件'},
			{id:010,index:'ModInterface',name:'模块接口管理'},
			{id:011,index:'ModLookup',name:'模块库查看'}
		];
		
	var smldata =[
			{id:012,index:'SMLParamPool',name:'事物特性参数池'},
			{id:013,index:'SMLParamPool_view',name:'事物特性参数池浏览'},
			{id:014,index:'SMLCodePool',name:'事物特性编码管理'},
			{id:015,index:'SMLCodePool_view',name:'事物特性编码浏览'},
			{id:016,index:'SMLPoolManage',name:'事物特性池管理'},
			{id:017,index:'SMLPoolManage_view',name:'事物特性池浏览'},
			{id:018,index:'SMLModeling',name:'事物特性建模'},
			{id:019,index:'SMLEdit',name:'事物特性编辑'},
			{id:020,index:'SMLEdit_view',name:'事物特性浏览'}
		];
	var lcmbdata = [
			{id:021,index:'TemplateCreate',name:'模板创建'},
			{id:022,index:'TemplateManage',name:'模板管理'}
		];

	Edo.get('bmgl').set('data',bmgldata);
	Edo.get('mkgl').set('data',mkgldata);
	Edo.get('smlgl').set('data',smldata);
	Edo.get('lcmbgl').set('data',lcmbdata);
	Edo.get('task').set('data',taskdata);
	
	this.getModManageAccordin = function(){
		return myModManageAccordin;
	}; 
	

	
}

function onPanelClick(e){
    if(e.within(this.headerCt)){
        var panel = this;
        var accordion = panel.parent;
        accordion.getChildren().each(function(child){
            if(panel != child) child.collapse();
        });
        panel.toggle();
    }
}

function toggle(e){
    var panel = this.parent.owner;
    var accordion = panel.parent;
    accordion.getChildren().each(function(child){
        if(panel != child) child.collapse();
    });
    panel.toggle();
}