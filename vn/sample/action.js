YUI.add("Action",function(Y){
    function Event(){
        Event.superclass.constructor.apply(this,arguments);
    }

	Event.NAME = "Action";

	Event.ATTRS = {
		UI: {
			value: undefined
		},
		clickWait: {
			value: false
		}
	}

    Y.extend(Event, Y.VN.Event, {
		initializer: function(){
			this.publish("clickAction",{
				emitFacade: false
			});
		},
		addToUI: function(UI){
			this.set("UI",UI);
			var cb = UI.get("contentBox");
			var n = Y.Node.create("<div style='position: relative;z-index:10000;top:0%;bottom:0%;left:0%;right:0%;width:100%;height:100%'></div>");
			cb.append(n);
			n.on("click",Y.bind(this.click,this));
		},
		removeFromUI: function(){
		},
		addToList: function(EventList){
			EventList.registerEvent("action",this);
		},
		removeFromList: function(){
		},
		destroy: function(){
		},
		hasFinished: function(){
			return false;
		},
		waitForClick: function(){
			this.set("clickWait",true);
		},
		isBlocking: function(){
			if(this.get("clickWait"))
				return true;
			return false;
		},
		click: function(){
			this.set("clickWait",false);
			this.fire("clickAction");
		}
    });

    Y.namespace("VNEvent").Action = Event;

	function Event2(){
        Event2.superclass.constructor.apply(this,arguments);
    }

	Event2.ATTRS = {
	}

	Event2.NAME = "ClickWait";

    Y.extend(Event2, Y.VN.Event, {
		addToList: function(evt){
			var a = evt.get("registeredEvents")["action"];
			Y.bind(a.waitForClick,a)();
		},
		hasFinished: function(){
			return true;
		}
    });

	Y.namespace("VNEvent").ClickWait = Event2;


},"0.0.1",{requires:["vn-event"]});