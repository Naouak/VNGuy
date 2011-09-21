YUI.add("vn-main",function(Y){
	var VN = Y.VN;

	function VNMain(){
		VNMain.superclass.constructor.apply(this, arguments);
	}

	VNMain.ATTRS = {
		ScriptReader: {
			value: undefined
		},
		EventList: {
			value: undefined
		},
		UserInterface: {
			value: undefined
		}
	}

	Y.extend(VNMain,Y.Base,{
		initializer: function(){
			var ui = new VN.UserInterface();
			ui.render();
			var el = new VN.EventList({
				UserInterface: ui
			});
			var sr = new VN.ScriptReader();

			sr.on("newEvent",Y.bind(el.newEvent,el));
			el.on("requestEvent",Y.bind(sr.requestEvent,sr));
			el.on("stackScript",Y.bind(sr.stackScript,sr));
			sr.on("scriptLoaded",Y.bind(el.scriptLoaded,el));

		}
	});

	Y.namespace("VN").Main = VNMain;

},"0.0.1",{requires:["vn-eventlist","vn-event","vn-scriptreader","vn-userinterface"]});