var newalldata;
var newmoduleid;
var newdatasetUUID;
var newdatasetid;
function getstepfour(){
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
					{
					    type:"module",width: '100%',height: '100%',style: 'border:0',
					    src:'lcc/indexpage!solutionbuilderCT.action?moduleid='+solution.moduleid+'&componentid='+solution.componentid+'&branchid='+solution.branchid
					}
			]});
	return evaluationbox;

	
	}
function gofour(){
	 removeselected();
	openNewTab(stepdata.source[2]);
}
function gosix(alldata){
	newalldata = alldata;
	alert('用的是我');
	alert(Edo.util.JSON.encode(newalldata));
	removeselected();
	openNewTab(stepdata.source[4]);
}
function getModeleidandatasetUUID(a,b,c) {
	newmoduleid = a;
	newdatasetUUID = b;
	newdatasetid=c;
	alert('狗屁');
	alert(newmoduleid);
	alert(newdatasetUUID);
	alert(newdatasetid);
}

