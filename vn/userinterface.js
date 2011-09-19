YUI.add("vn-userinterface",function(Y){
	function UserInterface(){
		UserInterface.superclass.constructor.apply(this, arguments);
	}

	UserInterface.NAME = "VNUI";
	UserInterface.ATTRS = {
	}

	Y.extend(UserInterface, Y.Widget,{
		renderUI: function(){
			var cb = this.get("contentBox");
			cb.setStyle("width","1024");
			cb.setStyle("height","768");
			cb.setStyle("border","solid black 1px");
			cb.setStyle("margin","auto");
			cb.setStyle("position","relative");
			cb.setStyle("overflow","hidden");
		},
		bindUI: function(){

		},
		syncUI: function(){

		}
	});

	Y.namespace("VN").UserInterface = UserInterface;

},"0.0.1",{requires:["widget"]});